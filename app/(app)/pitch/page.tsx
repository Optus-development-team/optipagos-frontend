import type { Metadata } from "next";
import { Deck } from "@/components/pitch/Deck";
import deck from "@/content/pitch/es";

// Pitch animado de Optipagos (3 minutos). El texto está en content/pitch/es.ts.
//
//   /pitch               en vivo: → avanza, N notas, P ventana de notas, F pantalla completa
//   /pitch?s=4           empieza en la diapositiva 4
//   /pitch?auto          avanza sola con los tiempos del guion (para ensayar)
//   /pitch?static&s=4    la diapositiva 4 ya dibujada, sin animar (la usa `npm run pitch:pdf`)
export const metadata: Metadata = {
  title: "Pitch",
  robots: { index: false, follow: false },
};

export default async function PitchPage({ searchParams }: PageProps<"/pitch">) {
  const params = await searchParams;
  const start = Number(Array.isArray(params.s) ? params.s[0] : params.s) || 1;
  return (
    <Deck deck={deck} mode={{ still: "static" in params, start: start - 1, auto: "auto" in params }} />
  );
}
