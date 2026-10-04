import type { Metadata, Viewport } from "next";
import { Baumans, Bebas_Neue, DM_Sans, Patrick_Hand } from "next/font/google";
import "./globals.css";

// Baumans es la tipografía del logo; el resto acompaña a las referencias de assets/inspo:
// títulos condensados en mayúsculas, texto geométrico y notas escritas a mano.
const baumans = Baumans({ variable: "--font-baumans", weight: "400", subsets: ["latin"] });
const bebas = Bebas_Neue({ variable: "--font-bebas", weight: "400", subsets: ["latin"] });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });
const patrick = Patrick_Hand({ variable: "--font-patrick", weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Optipagos · Tu plata, por WhatsApp",
    template: "%s · Optipagos",
  },
  description:
    "Envía, recibe y cobra dólares digitales chateando por WhatsApp. Sin instalar nada y protegido con tu huella.",
  applicationName: "Optipagos",
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
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
