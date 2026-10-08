import localFont from "next/font/local";
import { Baumans, Bebas_Neue, DM_Sans, Patrick_Hand } from "next/font/google";

// Baumans es la tipografía del logo; el resto acompaña a las referencias de assets/inspo:
// títulos condensados en mayúsculas, texto geométrico y notas escritas a mano.
const baumans = Baumans({ variable: "--font-baumans", weight: "400", subsets: ["latin"] });
const bebas = Bebas_Neue({ variable: "--font-bebas", weight: "400", subsets: ["latin"] });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });
const patrick = Patrick_Hand({ variable: "--font-patrick", weight: "400", subsets: ["latin"] });

// Varela Round es la tipografía del nombre «Optus» (la misma de optus.lat).
const varela = localFont({
  src: "../assets/fonts/VarelaRound/VarelaRound-Regular.ttf",
  variable: "--font-varela",
  weight: "400",
  display: "swap",
});

/** Clases que declaran las variables CSS de las tipografías. */
export const fontVariables = `${baumans.variable} ${bebas.variable} ${dmSans.variable} ${patrick.variable} ${varela.variable}`;
