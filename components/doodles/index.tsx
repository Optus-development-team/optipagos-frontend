import type { SVGProps } from "react";

/**
 * Garabatos decorativos dibujados "a rotulador": un solo trazo redondeado, sin relleno.
 * Toman el color de `currentColor`, así que se pintan con cualquier tono de la paleta.
 */
type DoodleProps = SVGProps<SVGSVGElement>;

function Stroke({ children, viewBox = "0 0 100 100", strokeWidth = 4, ...props }: DoodleProps) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function Sparkle(props: DoodleProps) {
  return (
    <Stroke {...props}>
      <path d="M50 8 C54 34 66 46 92 50 C66 55 55 66 51 92 C46 66 34 55 8 51 C34 46 46 34 50 8 Z" />
    </Stroke>
  );
}

export function Star(props: DoodleProps) {
  return (
    <Stroke {...props}>
      <path d="M50 9 L61 36 L91 39 L68 58 L76 88 L50 72 L24 89 L33 58 L9 41 L39 37 Z" />
    </Stroke>
  );
}

export function Heart(props: DoodleProps) {
  return (
    <Stroke {...props}>
      <path d="M50 84 C20 62 8 44 12 28 C16 12 38 10 50 30 C62 10 84 12 88 28 C92 44 80 62 50 84 Z" />
    </Stroke>
  );
}

export function Cloud(props: DoodleProps) {
  return (
    <Stroke {...props}>
      <path d="M26 70 C10 70 6 52 20 46 C16 30 36 22 44 34 C50 18 76 20 76 40 C92 38 96 62 80 68 C70 72 40 72 26 70 Z" />
    </Stroke>
  );
}

export function PaperPlane(props: DoodleProps) {
  return (
    <Stroke {...props}>
      <path d="M8 46 L92 12 L62 88 L46 57 Z" />
      <path d="M46 57 L92 12" />
      <path d="M46 57 L44 78 L54 68" />
    </Stroke>
  );
}

export function Coin(props: DoodleProps) {
  return (
    <Stroke {...props}>
      <path d="M50 10 C74 9 91 27 90 50 C89 74 72 91 49 90 C26 89 9 72 10 49 C11 27 27 11 50 10 Z" />
      <path d="M61 38 C56 30 40 30 39 41 C38 52 62 48 61 60 C60 71 43 70 38 62" />
      <path d="M50 25 L50 75" />
    </Stroke>
  );
}

export function Bolt(props: DoodleProps) {
  return (
    <Stroke {...props}>
      <path d="M56 7 L24 52 L47 54 L38 93 L78 43 L53 41 Z" />
    </Stroke>
  );
}

export function Swirl(props: DoodleProps) {
  return (
    <Stroke {...props}>
      <path d="M50 50 C50 42 62 42 62 52 C62 66 40 66 38 50 C36 30 66 26 74 46 C82 68 60 86 40 80 C20 74 14 50 24 34" />
    </Stroke>
  );
}

/** Flor sonriente, como las de la hoja de garabatos. */
export function Flower(props: DoodleProps) {
  return (
    <Stroke {...props}>
      <path d="M50 20 A12.5 12.5 0 0 1 71.2 28.8 A12.5 12.5 0 0 1 80 50 A12.5 12.5 0 0 1 71.2 71.2 A12.5 12.5 0 0 1 50 80 A12.5 12.5 0 0 1 28.8 71.2 A12.5 12.5 0 0 1 20 50 A12.5 12.5 0 0 1 28.8 28.8 A12.5 12.5 0 0 1 50 20 Z" />
      <path d="M41 44 L41 47 M59 44 L59 47" />
      <path d="M40 56 C45 63 55 63 60 56" />
    </Stroke>
  );
}

export function Sun(props: DoodleProps) {
  return (
    <Stroke {...props}>
      <path d="M50 28 C63 27 73 37 72 50 C71 63 62 73 49 72 C37 71 27 62 28 49 C29 37 38 29 50 28 Z" />
      <path d="M79.7 54.2 L93.6 56.1 M71.6 70.8 L78.8 77.8 M55.2 79.5 L57.6 93.3 M36.8 77 L32.5 86 M23.5 64.1 L11.2 70.7 M20.3 45.8 L10.4 44.4 M28.4 29.2 L18.3 19.4 M44.8 20.5 L43.1 10.6 M63.2 23 L69.3 10.5 M76.5 35.9 L85.3 31.2" />
    </Stroke>
  );
}

/** Tres rayitas de énfasis. */
export function Burst(props: DoodleProps) {
  return (
    <Stroke viewBox="0 0 40 40" {...props}>
      <path d="M6 8 L18 14 M4 21 L17 21 M7 34 L18 27" />
    </Stroke>
  );
}

export function Squiggle(props: DoodleProps) {
  return (
    <Stroke viewBox="0 0 120 24" {...props}>
      <path d="M4 14 C12 2 20 2 28 13 S44 24 52 12 S68 2 76 13 S92 24 100 12 S112 4 116 10" />
    </Stroke>
  );
}

/** Flecha con rizo, para notas a mano. */
export function CurlyArrow(props: DoodleProps) {
  return (
    <Stroke viewBox="0 0 100 80" {...props}>
      <path d="M8 20 C30 4 58 6 62 28 C65 46 40 50 38 36 C36 22 62 20 76 40 C82 49 86 58 88 68" />
      <path d="M71 62 L89 70 L94 51" />
    </Stroke>
  );
}

/** Subrayado de rotulador: se estira al ancho del texto que envuelve. */
export function Underline({ className = "", ...props }: DoodleProps) {
  return (
    <Stroke
      viewBox="0 0 200 20"
      preserveAspectRatio="none"
      strokeWidth={5}
      className={`pointer-events-none absolute -bottom-[0.14em] left-0 h-[0.26em] w-full ${className}`}
      {...props}
    >
      <path d="M3 12 C40 5 80 4 120 8 S180 14 197 7" vectorEffect="non-scaling-stroke" />
      <path d="M14 17 C60 12 120 12 172 15" vectorEffect="non-scaling-stroke" />
    </Stroke>
  );
}

/** Círculo garabateado que gira: indicador de espera. */
export function Scribble({ className = "", ...props }: DoodleProps) {
  return (
    <Stroke strokeWidth={6} className={`animate-spin [animation-duration:1.4s] ${className}`} {...props}>
      <path
        d="M50 12 C72 11 89 28 88 50 C87 72 70 89 49 88 C28 87 11 70 12 49 C13 30 26 15 44 12"
        pathLength={100}
        strokeDasharray="62 38"
      />
    </Stroke>
  );
}
