"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Effect = "up" | "pop" | "left" | "right" | "tilt";

interface RevealProps {
  children: ReactNode;
  /** Cómo entra: sube, salta, llega de un lado o se endereza. */
  effect?: Effect;
  /** Retraso en milisegundos, para escalonar elementos vecinos. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}

/**
 * Hace que su contenido aparezca al entrar en pantalla. Sin JavaScript (o con "reducir
 * movimiento") el contenido simplemente está ahí: solo se oculta lo que aún no se ha visto.
 */
export function Reveal({ children, effect = "up", delay = 0, className = "", as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // Lo que ya está a la vista al cargar no se oculta: evita parpadeos.
    if (node.getBoundingClientRect().top < window.innerHeight * 0.92) {
      node.dataset.reveal = "in";
      return;
    }
    node.dataset.reveal = "out";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.dataset.reveal = "in";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as "div";
  return (
    <Tag
      ref={ref as never}
      className={`reveal reveal-${effect} ${className}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
