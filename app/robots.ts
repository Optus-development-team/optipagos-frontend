import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Rutas internas. Los enlaces personales (/w/ y /c/) no se bloquean aquí: llevan
        // "noindex" y así las apps de mensajería pueden mostrar su vista previa.
        disallow: ["/tarjetas/", "/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
