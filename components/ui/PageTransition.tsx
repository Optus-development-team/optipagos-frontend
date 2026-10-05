import { ViewTransition, type ReactNode } from "react";

/**
 * Transición entre páginas: la hoja que sale se levanta y la nueva entra con un pequeño
 * rebote, como pasar la página de un cuaderno (ver ::view-transition-* en globals.css).
 * Envuelve el contenido de cada página; lo que vive en un layout (cabecera, pie) no se mueve.
 */
export function PageTransition({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div className={className}>{children}</div>
    </ViewTransition>
  );
}
