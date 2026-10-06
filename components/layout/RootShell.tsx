import type { ReactNode } from "react";
import { localeTags, type Locale } from "@/i18n/config";
import { fontVariables } from "@/lib/fonts";

/**
 * <html> y <body> comunes a los dos layouts raíz: el del sitio (app/[lang]) y el de los
 * enlaces personales (app/(app)). Solo cambia el idioma.
 */
export function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={localeTags[locale].hreflang} className={`${fontVariables} h-full antialiased`}>
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
