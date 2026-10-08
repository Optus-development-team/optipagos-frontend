/**
 * Idiomas del sitio y sus direcciones públicas.
 *
 *   español (por defecto)   /            /privacidad       /terminos
 *   inglés                  /en          /en/privacy       /en/terms
 *
 * Igual con personas, expansion, gtm, actores y recaudacion (en inglés: people, expansion,
 * gtm, players, revenue).
 *
 * Las páginas del sitio viven en app/[lang]/… y proxy.ts traduce entre ambas. Las páginas
 * de los enlaces personales (/w/:token, /c/:id) no cambian de dirección: toman el idioma
 * guardado o el del navegador (ver i18n/request.ts).
 */
export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const isLocale = (value: string | undefined): value is Locale =>
  locales.includes(value as Locale);

/** Cookie donde proxy.ts recuerda el idioma elegido. */
export const LOCALE_COOKIE = "lang";

/** Segmento interno (bajo app/[lang]) de cada página. */
const segments = {
  home: "",
  privacy: "/privacy",
  terms: "/terms",
  people: "/people",
  expansion: "/expansion",
  gtm: "/gtm",
  players: "/players",
  revenue: "/revenue",
} as const;
export type RouteKey = keyof typeof segments;

/** Direcciones en español que no coinciden con el segmento interno. */
const spanishPaths: Record<string, string> = {
  "/privacy": "/privacidad",
  "/terms": "/terminos",
  "/people": "/personas",
  "/players": "/actores",
  "/revenue": "/recaudacion",
};
const internalPaths: Record<string, string> = Object.fromEntries(
  Object.entries(spanishPaths).map(([internal, spanish]) => [spanish, internal]),
);

/** "/privacidad" → "/privacy"; "/" → "". Lo desconocido pasa tal cual. */
export const toInternalPath = (path: string): string =>
  path === "/" ? "" : (internalPaths[path] ?? path);

/** "/privacy" → "/privacidad"; "" → "/". */
export const toSpanishPath = (internal: string): string =>
  internal === "" ? "/" : (spanishPaths[internal] ?? internal);

/** Dirección pública de una página en un idioma. */
export function href(route: RouteKey, locale: Locale, hash = ""): string {
  const path = locale === "es" ? toSpanishPath(segments[route]) : `/en${segments[route]}`;
  return `${path}${hash}`;
}

/** Primer idioma admitido de una cabecera Accept-Language, por orden de preferencia. */
export function fromAcceptLanguage(header: string | null | undefined): Locale {
  if (!header) return defaultLocale;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, quality] = part.trim().split(";q=");
      return { language: tag.toLowerCase().split("-")[0], quality: quality ? Number(quality) : 1 };
    })
    .filter((entry) => !Number.isNaN(entry.quality))
    .sort((a, b) => b.quality - a.quality);
  return ranked.map((entry) => entry.language).find(isLocale) ?? defaultLocale;
}

/** Código para Open Graph, `hreflang` y formato de fechas. */
export const localeTags: Record<
  Locale,
  { og: string; hreflang: string; label: string; intl: string }
> = {
  es: { og: "es_BO", hreflang: "es", label: "Español", intl: "es-BO" },
  en: { og: "en_US", hreflang: "en", label: "English", intl: "en-US" },
};
