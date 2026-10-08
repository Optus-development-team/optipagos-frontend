"use server";

export type BetaField = "name" | "email" | "phone" | "use" | "consent";

export interface BetaState {
  status: "idle" | "ok" | "error";
  /** Campos con problema (la página los traduce) o «generic» si falló el envío. */
  errors: (BetaField | "generic")[];
  /** Lo que la persona ya escribió, para no perderlo si hay un error. */
  values: { name: string; email: string; phone: string; use: string };
}

const uses = ["personal", "business", "both"];
const text = (data: FormData, key: string, max: number) =>
  String(data.get(key) ?? "").trim().slice(0, max);

/**
 * Registro en la lista de la beta cerrada. Valida en el servidor y agrega una fila a una hoja
 * de Google Sheets mediante un Apps Script publicado como aplicación web (ver
 * docs/beta-google-sheets.md). La dirección y la clave nunca llegan al navegador.
 */
export async function joinBeta(_previous: BetaState, data: FormData): Promise<BetaState> {
  const values = {
    name: text(data, "name", 120),
    email: text(data, "email", 200).toLowerCase(),
    phone: text(data, "phone", 30),
    use: text(data, "use", 20),
  };

  // Campo oculto que solo llenan los robots: se responde «ok» sin guardar nada.
  if (text(data, "website", 200)) return { status: "ok", errors: [], values };

  const errors: BetaState["errors"] = [];
  if (values.name.length < 2) errors.push("name");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) errors.push("email");
  if (!/^\+?[\d\s()-]{7,20}$/.test(values.phone) || values.phone.replace(/\D/g, "").length < 7) {
    errors.push("phone");
  }
  if (!uses.includes(values.use)) errors.push("use");
  if (data.get("consent") !== "on") errors.push("consent");
  if (errors.length) return { status: "error", errors, values };

  const url = process.env.BETA_SHEET_URL;
  if (!url) {
    console.error("beta signup failed: BETA_SHEET_URL no está definida");
    return { status: "error", errors: ["generic"], values };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "text/plain;charset=utf-8" }, // Apps Script lee el cuerpo igual
      body: JSON.stringify({
        secret: process.env.BETA_SHEET_SECRET ?? "",
        ...values,
        phone: values.phone.replace(/[^\d+]/g, ""),
      }),
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    const result = (await res.json()) as { ok?: boolean };
    if (!res.ok || !result.ok) throw new Error(`HTTP ${res.status}`);
  } catch (error) {
    console.error("beta signup failed:", error);
    return { status: "error", errors: ["generic"], values };
  }
  return { status: "ok", errors: [], values };
}
