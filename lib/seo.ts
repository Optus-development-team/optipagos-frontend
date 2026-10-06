import type { Metadata } from "next";
import { href, locales, localeTags, type Locale, type RouteKey } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { absoluteUrl, site } from "@/lib/site";

/** `canonical` y `hreflang` de una página: cada idioma apunta a su versión y x-default al español. */
export function alternates(route: RouteKey, locale: Locale): NonNullable<Metadata["alternates"]> {
  return {
    canonical: href(route, locale),
    languages: {
      ...Object.fromEntries(locales.map((code) => [localeTags[code].hreflang, href(route, code)])),
      "x-default": href(route, "es"),
    },
  };
}

/** Optus como organización y Optipagos como su marca. */
export const organizationJsonLd = (dict: Dictionary) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organizacion"),
  name: site.name,
  url: site.url,
  logo: absoluteUrl("/icon.svg"),
  description: dict.meta.description,
  email: site.optus.email,
  areaServed: "BO",
  parentOrganization: {
    "@type": "Organization",
    name: site.optus.name,
    url: site.optus.url,
    sameAs: site.optus.social.map((network) => network.url),
  },
  ...(site.whatsappNumber
    ? {
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          telephone: `+${site.whatsappNumber}`,
          availableLanguage: "es",
        },
      }
    : {}),
});

export const websiteJsonLd = (locale: Locale, dict: Dictionary) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#sitio"),
  name: site.name,
  url: absoluteUrl(href("home", locale)),
  inLanguage: localeTags[locale].intl,
  description: dict.meta.description,
  publisher: { "@id": absoluteUrl("/#organizacion") },
});
