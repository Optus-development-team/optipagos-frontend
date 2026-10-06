import "server-only";
import { cookies, headers } from "next/headers";
import { LOCALE_COOKIE, fromAcceptLanguage, isLocale, type Locale } from "./config";

/**
 * Idioma de las páginas que no llevan el idioma en la dirección (/w/:token, /c/:id): el que
 * la persona eligió en el sitio o, si nunca eligió, el de su navegador.
 */
export async function getRequestLocale(): Promise<Locale> {
  const saved = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (isLocale(saved)) return saved;
  return fromAcceptLanguage((await headers()).get("accept-language"));
}
