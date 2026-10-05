import { absoluteUrl, site } from "@/lib/site";

/** Optus como organización y Optipagos como su marca. */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organizacion"),
  name: site.name,
  url: site.url,
  logo: absoluteUrl("/icon.svg"),
  description: site.description,
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
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#sitio"),
  name: site.name,
  url: site.url,
  inLanguage: "es-BO",
  description: site.description,
  publisher: { "@id": absoluteUrl("/#organizacion") },
};
