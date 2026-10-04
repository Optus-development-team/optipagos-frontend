/** Datos públicos del sitio. El número sale de NEXT_PUBLIC_WHATSAPP_NUMBER (solo dígitos). */
const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");

export const site = {
  name: "Optipagos",
  /** Número de WhatsApp de Optipagos en formato internacional, sin "+". Vacío si no se configuró. */
  whatsappNumber: number,
  /** Enlace que abre el chat con un mensaje ya escrito. */
  whatsappUrl(text = "hola"): string {
    const query = `?text=${encodeURIComponent(text)}`;
    return number ? `https://wa.me/${number}${query}` : `https://wa.me/${query}`;
  },
  /** Enlace para volver al chat sin escribir nada. */
  chatUrl(): string {
    return number ? `https://wa.me/${number}` : "https://wa.me/";
  },
};
