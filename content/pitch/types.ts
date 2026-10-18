import type { DoodleName } from "@/components/pitch/art";

/**
 * Forma de las diapositivas del pitch (/pitch). El texto vive en content/pitch/es.ts y el
 * motor (components/pitch) solo lo dibuja: cambiar el texto no requiere tocar código.
 *
 * Marcas dentro de cualquier texto:
 *   *palabras*   se resaltan con rotulador miel
 *   [[dato]]     dato por confirmar: sale con borde punteado y la etiqueta «por confirmar»
 */

/** Plantillas de diapositiva (ver components/pitch/Slide.tsx). */
export type PitchLayout =
  | "cover"
  | "cards"
  | "steps"
  | "checklist"
  | "stats"
  | "compare"
  | "roadmap"
  | "funds"
  | "team"
  | "closing";

export interface PitchItem {
  title: string;
  text?: string;
  /** Garabato que lo acompaña (components/pitch/art.ts). */
  doodle?: DoodleName;
  /** Cifra grande (stats, funds) o momento (roadmap). */
  value?: string;
  /** Fuente de la cifra, en letra chica. */
  source?: string;
  /** Foto (team), ruta dentro de /public. */
  photo?: string;
  /** Porcentaje para el gráfico de uso de fondos. */
  share?: number;
  /** Destacado (comparación: nuestra fila). */
  highlight?: boolean;
  /** Celdas de la comparación: true = sí, false = no, texto = matiz. */
  cells?: (boolean | string)[];
}

/** Qué hacen los teléfonos 3D mientras se ve esta diapositiva. */
export interface PhoneCue {
  /** Video que se reproduce: el registro o la compra y el envío (dos teléfonos a la vez). */
  scene: "registro" | "envio";
  /** Posición: grande junto al texto o más chicos a un costado. */
  pose: "hero" | "side";
  /**
   * Segundo del video (del iPhone) que se muestra en el PDF. En vivo el video sigue
   * corriendo de una diapositiva a otra mientras la escena no cambie.
   */
  poster: number;
}

export interface PitchSlide {
  /** Identificador estable (no se muestra). */
  id: string;
  /** Sección del pitch, en la etiqueta de arriba. */
  section: string;
  layout: PitchLayout;
  /** Segundos que debería durar al hablar. La suma de todas = 3 minutos. */
  seconds: number;
  title: string;
  lead?: string;
  items?: PitchItem[];
  /** Encabezados de columna (compare). */
  columns?: string[];
  /** Garabatos grandes de la ilustración (cover, closing). */
  art?: DoodleName[];
  /** Nota escrita a mano en una esquina. */
  note?: string;
  /** Letra chica al pie (fuentes). */
  footnote?: string;
  /** Teléfonos con la demo de fondo. */
  phones?: PhoneCue;
  /** Guion del presentador (vista de notas, tecla N). */
  script: string;
}

/** Videos de la demo y cómo se reproducen en vivo. */
export interface PitchVideos {
  registro: VideoClip;
  envio: VideoClip & {
    /** El video del Android (quien recibe), que corre a la par del iPhone. */
    android: string;
    /** Segundos que el video del Android va por detrás del del iPhone. */
    androidOffset: number;
  };
}

export interface VideoClip {
  /** Video del iPhone, ruta dentro de /public. */
  src: string;
  /** Tramo que se reproduce (segundos del video). */
  start: number;
  end: number;
  /** Velocidad: el tramo completo dura (end - start) / rate segundos. */
  rate: number;
}

export interface PitchDeck {
  title: string;
  /** Dirección que se muestra en las diapositivas. */
  url: string;
  /** Enlace del QR de cierre. */
  whatsappUrl: string;
  /** Correo de contacto, al pie del cierre. */
  email?: string;
  /** Logos de la incubadora y aliados (en la portada y el cierre). */
  sponsors: { name: string; logo?: string }[];
  videos: PitchVideos;
  slides: PitchSlide[];
}
