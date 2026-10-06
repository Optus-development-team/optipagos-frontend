"use client";

import { usePathname } from "next/navigation";
import { locales, localeTags, toInternalPath, type Locale } from "@/i18n/config";

/**
 * Selector de idioma. Enlaza a la misma página en el otro idioma con el prefijo explícito
 * (/es/…, /en/…) para que proxy.ts guarde la elección; por eso son <a> y no <Link>.
 */
export function LangSwitch({
  locale,
  label,
  className = "",
}: {
  locale: Locale;
  label: string;
  className?: string;
}) {
  // La URL puede llegar como /privacidad (navegador) o /es/privacy (prerender): ambas dan
  // el mismo segmento interno, así que servidor y cliente pintan lo mismo.
  const pathname = usePathname().replace(/^\/(es|en)(?=\/|$)/, "") || "/";
  const internal = toInternalPath(pathname.replace(/\/+$/, "") || "/");

  return (
    <nav aria-label={label} className={`lang-switch hand ${className}`}>
      {locales.map((code) => (
        <a
          key={code}
          href={`/${code}${internal}`}
          hrefLang={localeTags[code].hreflang}
          lang={localeTags[code].hreflang}
          aria-current={code === locale ? "true" : undefined}
          title={localeTags[code].label}
        >
          {code}
        </a>
      ))}
    </nav>
  );
}
