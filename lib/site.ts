/**
 * Datos públicos del sitio y de las direcciones del producto:
 *
 *   sitio  https://optipagos.optus.lat        (NEXT_PUBLIC_SITE_URL)
 *   API    https://api.optipagos.optus.lat    (NEXT_PUBLIC_API_URL)
 *
 * En local o detrás de un único túnel NEXT_PUBLIC_API_URL queda vacía: el navegador llama
 * a /api/v1 en este mismo sitio y Next lo reenvía al backend (ver next.config.ts).
 */
const trim = (url: string): string => url.replace(/\/+$/, "");

const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");

export const site = {
  name: "Optipagos",
  tagline: "Tu plata viaja por WhatsApp",
  description:
    "Envía, recibe y cobra dólares digitales chateando por WhatsApp. Sin instalar nada y protegido con tu huella.",

  /** URL pública del sitio, sin barra final. */
  url: trim(process.env.NEXT_PUBLIC_SITE_URL || "https://optipagos.optus.lat"),

  /**
   * Base de la API para el navegador. Vacía = mismo origen (Next reenvía /api/v1 al backend).
   * Con dominio propio para la API: "https://api.optipagos.optus.lat".
   */
  apiUrl: trim(process.env.NEXT_PUBLIC_API_URL ?? ""),

  /** Número de WhatsApp de Optipagos en formato internacional, sin "+". Vacío si no se configuró. */
  whatsappNumber: number,
  /** "+591 77379190" para mostrar. */
  whatsappDisplay: number
    ? number.startsWith("591")
      ? `+591 ${number.slice(3)}`
      : `+${number}`
    : "",
  /** Enlace que abre el chat con un mensaje ya escrito. */
  whatsappUrl(text = "hola"): string {
    const query = `?text=${encodeURIComponent(text)}`;
    return number ? `https://wa.me/${number}${query}` : `https://wa.me/${query}`;
  },
  /** Enlace para volver al chat sin escribir nada. */
  chatUrl(): string {
    return number ? `https://wa.me/${number}` : "https://wa.me/";
  },

  /** Optus, la empresa detrás de Optipagos. */
  optus: {
    name: "Optus",
    url: "https://optus.lat",
    email: "optus.aut@gmail.com",
    location: "La Paz, Bolivia",
    social: [
      { name: "Instagram", icon: "instagram", url: "https://www.instagram.com/optusaut/" },
      { name: "Facebook", icon: "facebook", url: "https://www.facebook.com/optusteam" },
      { name: "X", icon: "twitter", url: "https://x.com/OptusAut" },
      { name: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/company/optus-aut/" },
    ],
  },
} as const;

/** URL absoluta de una ruta del sitio. */
export const absoluteUrl = (path = "/"): string => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
