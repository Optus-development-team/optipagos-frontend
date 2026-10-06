import { localeTags, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import type { Receipt } from "@/lib/backend";

type ReceiptTexts = Dictionary["receipt"];

/** Textos del comprobante según su estado. Sirven igual para quien envía y para quien recibe. */
export function receiptTitle(
  receipt: Receipt,
  t: ReceiptTexts["status"],
): { title: string; eyebrow: string } {
  if (receipt.status === "CONFIRMED") return t.confirmed;
  if (receipt.status === "SUBMITTED") return t.submitted;
  return t.failed;
}

/** "5 oct 2026 · 08:15" (o "Oct 5, 2026 · 08:15") en hora de Bolivia. */
export function receiptDate(receipt: Receipt, locale: Locale = "es"): string {
  const date = new Date(receipt.confirmedAt ?? receipt.createdAt);
  const tag = localeTags[locale].intl;
  const day = new Intl.DateTimeFormat(tag, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "America/La_Paz",
  })
    .format(date)
    .replace(/\./g, "");
  const time = new Intl.DateTimeFormat(tag, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/La_Paz",
  }).format(date);
  return `${day} · ${time}`;
}
