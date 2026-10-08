"use server";

import { backendUrl } from "@/lib/backend";

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
 * Registro en la lista de la beta cerrada. Valida en el servidor y lo envía al backend
 * (POST /api/v1/beta/signups); la página solo pinta el resultado.
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

  try {
    const res = await fetch(`${backendUrl}/api/v1/beta/signups`, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({ ...values, phone: values.phone.replace(/[^\d+]/g, "") }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (error) {
    console.error("beta signup failed:", error);
    return { status: "error", errors: ["generic"], values };
  }
  return { status: "ok", errors: [], values };
}
