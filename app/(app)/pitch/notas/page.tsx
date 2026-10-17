import type { Metadata } from "next";
import { Notes } from "@/components/pitch/Notes";
import deck from "@/content/pitch/es";
import { plain } from "@/components/pitch/rich";

// Ventana del presentador: guion, tiempos y controles. Se abre con la tecla P desde /pitch.
export const metadata: Metadata = {
  title: "Notas del pitch",
  robots: { index: false, follow: false },
};

export default function PitchNotesPage() {
  const slides = deck.slides.map((slide) => ({
    id: slide.id,
    section: slide.section,
    title: plain(slide.title),
    seconds: slide.seconds,
    script: slide.script,
  }));
  return <Notes slides={slides} />;
}
