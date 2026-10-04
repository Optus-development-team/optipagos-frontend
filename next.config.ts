import type { NextConfig } from "next";

// optipagos-backend solo expone la API. Este sitio es la puerta pública: sirve las páginas y
// reenvía /api/v1/* al backend (página de firma, webhook de WhatsApp, callback de Google).
const backend = (process.env.BACKEND_URL ?? "http://127.0.0.1:3200").replace(/\/+$/, "");

const devOrigins = (process.env.DEV_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  poweredByHeader: false,
  ...(devOrigins.length ? { allowedDevOrigins: devOrigins } : {}),

  async rewrites() {
    return [{ source: "/api/v1/:path*", destination: `${backend}/api/v1/:path*` }];
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
