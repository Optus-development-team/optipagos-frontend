import type { Metadata, Viewport } from "next";
import { localeTags, locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";

/** Metadatos comunes a todas las páginas, en el idioma indicado. */
export function baseMetadata(locale: Locale, dict: Dictionary): Metadata {
  const title = `${site.name} · ${dict.meta.tagline}`;
  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s · ${site.name}` },
    description: dict.meta.description,
    applicationName: site.name,
    keywords: dict.meta.keywords,
    authors: [{ name: site.optus.name, url: site.optus.url }],
    creator: site.optus.name,
    publisher: site.optus.name,
    category: "finance",
    // La tarjeta de vista previa (app/opengraph-image.png) la captura `npm run cards`.
    openGraph: {
      type: "website",
      locale: localeTags[locale].og,
      alternateLocale: locales.filter((other) => other !== locale).map((other) => localeTags[other].og),
      siteName: site.name,
      title,
      description: dict.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: dict.meta.description,
      site: "@OptusAut",
      creator: "@OptusAut",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    formatDetection: { telephone: false, address: false, email: false },
  };
}

export const baseViewport: Viewport = {
  themeColor: "#f0ead6",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
