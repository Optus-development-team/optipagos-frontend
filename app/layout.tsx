import type { Metadata, Viewport } from "next";
import { Baumans, Bebas_Neue, DM_Sans, Patrick_Hand } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

// Baumans es la tipografía del logo; el resto acompaña a las referencias de assets/inspo:
// títulos condensados en mayúsculas, texto geométrico y notas escritas a mano.
const baumans = Baumans({ variable: "--font-baumans", weight: "400", subsets: ["latin"] });
const bebas = Bebas_Neue({ variable: "--font-bebas", weight: "400", subsets: ["latin"] });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });
const patrick = Patrick_Hand({ variable: "--font-patrick", weight: "400", subsets: ["latin"] });

const title = `${site.name} · ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Optipagos",
    "billetera en WhatsApp",
    "enviar dinero por WhatsApp",
    "dólares digitales",
    "USDC Bolivia",
    "cobrar con QR",
    "pagos por WhatsApp",
    "Optus",
  ],
  authors: [{ name: site.optus.name, url: site.optus.url }],
  creator: site.optus.name,
  publisher: site.optus.name,
  category: "finance",
  // La tarjeta de vista previa (app/opengraph-image.png) la captura `npm run cards`.
  openGraph: {
    type: "website",
    locale: "es_BO",
    siteName: site.name,
    title,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
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

export const viewport: Viewport = {
  themeColor: "#f0ead6",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${baumans.variable} ${bebas.variable} ${dmSans.variable} ${patrick.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        {/* Temblor de rotulador: lo usan los contornos vía filter: url(#doodle) */}
        <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
          <defs>
            <filter id="doodle" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.022"
                numOctaves="2"
                seed="7"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="3.2"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
            {/* Igual que #doodle, pero el trazo "hierve": la semilla cambia cada 280 ms */}
            <filter id="doodle-boil" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="7" result="noise">
                <animate
                  attributeName="seed"
                  values="7;11;23;7"
                  dur="0.84s"
                  calcMode="discrete"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="3.2"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
