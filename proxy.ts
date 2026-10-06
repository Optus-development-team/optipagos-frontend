import { NextResponse, type NextRequest } from "next/server";
import {
  LOCALE_COOKIE,
  fromAcceptLanguage,
  isLocale,
  toInternalPath,
  toSpanishPath,
  type Locale,
} from "@/i18n/config";

/**
 * Dos trabajos, según la dirección:
 *
 *  - /w/:token (página de firma): cabeceras de seguridad estrictas.
 *  - El sitio (portada y páginas legales): idiomas.
 *
 * El resto (comprobantes, tarjetas, imágenes, API) no pasa por aquí: ver `config.matcher`.
 */
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/w/")) return signerHeaders(request);
  return localeRouting(request);
}

/**
 * Página de firma (/w/:token): es el único lugar donde la clave de la billetera existe sin
 * cifrar (en la memoria del navegador, lo que dura una firma). Por eso se sirve con una CSP
 * estricta con nonce, sin terceros, sin caché y sin filtrar el enlace por el Referer.
 */
function signerHeaders(request: NextRequest) {
  // Las precargas del enrutador no llevan la página: se dejan pasar sin tocar.
  if (
    request.headers.has("next-router-prefetch") ||
    request.headers.get("purpose") === "prefetch"
  ) {
    return NextResponse.next();
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const dev = process.env.NODE_ENV === "development";
  // Con la API en su propio dominio, la página la llama directamente.
  const api = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${dev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `connect-src 'self'${api ? ` ${new URL(api).origin}` : ""}${dev ? " ws: wss:" : ""}`,
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

/**
 * Idiomas: el español se sirve sin prefijo (optipagos.optus.lat/) y el inglés bajo /en.
 *
 *   /            → se muestra app/[lang] con lang=es (sin cambiar la URL)
 *   /en/…        → inglés
 *   /es/…        → guarda «español» y redirige a la URL sin prefijo
 *
 * La primera visita sin idioma guardado respeta el idioma del navegador.
 */
function localeRouting(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const [, first, ...rest] = path.split("/");
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;

  if (first === "en") {
    const internal = toInternalPath(rest.length ? `/${rest.join("/")}` : "/");
    if (`/en${internal}` !== path) return redirect(request, `/en${internal}`, 308);
    const response = NextResponse.next();
    if (saved !== "en") remember(response, "en");
    return response;
  }

  if (first === "es") {
    const internal = toInternalPath(rest.length ? `/${rest.join("/")}` : "/");
    return remember(redirect(request, toSpanishPath(internal), 307), "es");
  }

  const internal = toInternalPath(path);
  const preferred = isLocale(saved)
    ? saved
    : fromAcceptLanguage(request.headers.get("accept-language"));
  if (preferred === "en") return redirect(request, `/en${internal}`, 307);

  const canonical = toSpanishPath(internal);
  if (canonical !== path) return redirect(request, canonical, 308);

  const url = request.nextUrl.clone();
  url.pathname = `/es${internal}`;
  return NextResponse.rewrite(url);
}

function redirect(request: NextRequest, pathname: string, status: 307 | 308) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.redirect(url, status);
}

function remember(response: NextResponse, locale: Locale) {
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  // Todo menos los internos de Next, la API, las imágenes y tarjetas del bot, los comprobantes
  // (/c/…), el icono generado y los archivos con extensión (iconos, robots.txt, imágenes…).
  matcher: ["/((?!_next/|api/|media/|c/|tarjetas/|apple-icon|.*\\.[a-zA-Z0-9]+$).*)"],
};
