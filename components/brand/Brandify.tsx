import { Fragment } from "react";

/**
 * Pinta la palabra «Optus» (y optus.lat) con la tipografía de la marca, Varela Round.
 * Se usa en los textos que vienen de los diccionarios: <Brandify>{texto}</Brandify>.
 */
export function Brandify({ children }: { children: string }) {
  return children.split(/(\boptus\b)/gi).map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className="optus-word">
        {part}
      </span>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}
