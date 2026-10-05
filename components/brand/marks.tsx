import type { SVGProps } from "react";
import { OPTIPAGOS_MARK, OPTUS_MARK } from "./paths";

/**
 * Marcas de Optipagos y Optus. Se pintan con `currentColor` para poder usarlas en cualquier
 * color de la paleta.
 */

/** Mascota de Optipagos: el pajarito con sombrero. */
export function OptipagosMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox={OPTIPAGOS_MARK.viewBox} fill="currentColor" aria-hidden="true" {...props}>
      <path transform={OPTIPAGOS_MARK.transform} d={OPTIPAGOS_MARK.d} />
    </svg>
  );
}

/** Marca de Optus (la empresa detrás de Optipagos). */
export function OptusMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox={OPTUS_MARK.viewBox} fill="currentColor" aria-hidden="true" {...props}>
      <path transform={OPTUS_MARK.transform} d={OPTUS_MARK.d} />
    </svg>
  );
}
