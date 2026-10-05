import type { Receipt } from "@/lib/backend";

/** Textos del comprobante según su estado. Sirven igual para quien envía y para quien recibe. */
export function receiptTitle(receipt: Receipt): { title: string; eyebrow: string } {
  if (receipt.status === "CONFIRMED") return { title: "Pago completado", eyebrow: "comprobante" };
  if (receipt.status === "SUBMITTED") return { title: "Pago en camino", eyebrow: "ya casi" };
  return { title: "Pago no completado", eyebrow: "sin movimiento de dinero" };
}

/** "5 oct 2026 · 08:15" en hora de Bolivia. */
export function receiptDate(receipt: Receipt): string {
  const date = new Date(receipt.confirmedAt ?? receipt.createdAt);
  const day = new Intl.DateTimeFormat("es-BO", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "America/La_Paz",
  })
    .format(date)
    .replace(/\./g, "");
  const time = new Intl.DateTimeFormat("es-BO", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/La_Paz",
  }).format(date);
  return `${day} · ${time}`;
}
