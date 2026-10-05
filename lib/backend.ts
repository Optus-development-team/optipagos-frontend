import "server-only";

/**
 * Acceso al backend desde el servidor de Next (páginas e imágenes de comprobantes).
 * BACKEND_URL es la dirección directa del backend; si no está, se usa la pública de la API.
 */
const trim = (url: string): string => url.replace(/\/+$/, "");

export const backendUrl = trim(
  process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3200",
);

/** Comprobante de un movimiento, tal como lo entrega GET /api/v1/receipts/:id. */
export interface Receipt {
  id: string;
  reference: string;
  direction: "OUTBOUND" | "INBOUND";
  status: "CONFIRMED" | "SUBMITTED" | "FAILED";
  amount: string;
  currency: "USDC";
  from: string;
  to: string;
  memo: string | null;
  createdAt: string;
  confirmedAt: string | null;
  verifyUrl: string | null;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Devuelve el comprobante o null si no existe (o el id no tiene forma de id). */
export async function getReceipt(id: string): Promise<Receipt | null> {
  if (!UUID.test(id)) return null;
  const res = await fetch(`${backendUrl}/api/v1/receipts/${id}`, {
    cache: "no-store",
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(8000),
  });
  if (res.status === 404 || res.status === 400) return null;
  if (!res.ok) throw new Error(`Comprobante no disponible (HTTP ${res.status})`);
  return (await res.json()) as Receipt;
}
