import type { NextConfig } from "next";

// optipagos-backend solo expone la API. Este sitio es la puerta pública: sirve las páginas y
// reenvía al backend únicamente lo que el público necesita. El resto de la API (canal de
// desarrollo, estado del servicio, Swagger) no sale por aquí: se consulta directo en el backend.
const backend = (process.env.BACKEND_URL ?? "http://127.0.0.1:3200").replace(/\/+$/, "");
const forwarded = [
  "actions", // API de la página de confirmación /w/:token
  "auth", // vínculo con Google (inicio y callback)
  "webhooks", // mensajes entrantes de WhatsApp
];

const devOrigins = (process.env.DEV_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  poweredByHeader: false,
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
