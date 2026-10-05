import type { NextConfig } from "next";

// optipagos-backend solo expone la API. Este sitio sirve las páginas y, cuando la API no
// tiene dominio propio, reenvía al backend lo que el público necesita. El resto de la API
// (canal de desarrollo, estado del servicio, Swagger) no sale por aquí.
//
// Con la API en su propio dominio (NEXT_PUBLIC_API_URL=https://api.optipagos.optus.lat) el
// navegador la llama directamente; los reenvíos quedan como respaldo y para el webhook.
const backend = (
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:3200"
).replace(/\/+$/, "");
const forwarded = [
  "actions", // API de la página de confirmación /w/:token
  "auth", // vínculo con Google (inicio y callback)
  "webhooks", // mensajes entrantes de WhatsApp
  "receipts", // datos de los comprobantes /c/:id
];

const devOrigins = (process.env.DEV_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Permite compilar una copia de pruebas sin tocar la que está en servicio.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Archivos que las rutas leen del disco en tiempo de ejecución.
  outputFileTracingIncludes: {
    "/media/whatsapp/[name]": ["./assets/whatsapp/*.png"],
    "/c/[id]/imagen": ["./assets/fonts/**/*.ttf"],
  },
  ...(devOrigins.length ? { allowedDevOrigins: devOrigins } : {}),

  async rewrites() {
    return forwarded.map((area) => ({
      source: `/api/v1/${area}/:path*`,
      destination: `${backend}/api/v1/${area}/:path*`,
    }));
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
