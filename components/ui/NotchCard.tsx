import type { CSSProperties, ReactNode } from "react";

type Corner = "tr" | "tl" | "br" | "bl";
type Tone = "cream" | "ink" | "honey" | "shell";

interface NotchCardProps {
  /** Esquina donde va el recorte. */
  corner?: Corner;
  tone?: Tone;
  /** Lo que ocupa el recorte: normalmente una ficha (`chip-tile`). */
  chip?: ReactNode;
  /** Tamaño del recorte en px (ancho × alto). */
  notch?: [number, number];
  /** Radio de las esquinas en px. */
  radius?: number;
  className?: string;
  children: ReactNode;
}

/**
 * Tarjeta con una esquina recortada donde encaja una ficha (el lenguaje de formas de
 * assets/inspo/shapes.jpg). La silueta se arma con tres piezas y un contorno de rotulador;
 * el contenido va encima, sin deformarse.
 */
export function NotchCard({
  corner = "tr",
  tone = "cream",
  chip,
  notch,
  radius,
  className = "",
  children,
}: NotchCardProps) {
  const style = {
    ...(notch ? { "--nw": `${notch[0]}px`, "--nh": `${notch[1]}px` } : {}),
    ...(radius ? { "--r": `${radius}px` } : {}),
  } as CSSProperties;

  return (
    <div className={`notch notch-${corner} tone-${tone} ${className}`} style={style}>
      <div className="notch-bg" aria-hidden="true">
        <i className="na" />
        <i className="nb" />
        <i className="nc" />
      </div>
      {chip ? <div className="notch-chip">{chip}</div> : null}
      {children}
    </div>
  );
}
