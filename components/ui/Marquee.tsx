import type { ReactNode } from "react";

/**
 * Cinta que se desliza sin parar. El contenido se repite para que el bucle no tenga corte;
 * la copia es decorativa para los lectores de pantalla.
 */
export function Marquee({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`marquee ${className}`}>
      <div className="marquee-track">
        <div className="marquee-group">{children}</div>
        <div className="marquee-group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
