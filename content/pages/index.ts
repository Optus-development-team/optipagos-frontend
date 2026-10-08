import type { Locale } from "@/i18n/config";
import en from "./en";
import es from "./es";
import type { InfoPages } from "./types";

export { infoKeys } from "./types";
export type { InfoKey, InfoPage, InfoPages } from "./types";

/** Páginas informativas de cada idioma. */
export const infoPages: Record<Locale, InfoPages> = { es, en };
