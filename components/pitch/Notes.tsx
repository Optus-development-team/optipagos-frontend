"use client";

import { useEffect, useRef, useState } from "react";
import { CHANNEL, clock, type DeckMessage } from "./sync";
import "./pitch.css";

interface NoteSlide {
  id: string;
  section: string;
  title: string;
  seconds: number;
  script: string;
}

/**
 * Ventana del presentador (/pitch/notas): sigue al pitch abierto en otra ventana del mismo
 * navegador y también lo controla (flechas, espacio, T reinicia el tiempo, A automático).
 */
export function Notes({ slides }: { slides: NoteSlide[] }) {
  const [state, setState] = useState<Extract<DeckMessage, { type: "state" }> | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const channel = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    const bc = new BroadcastChannel(CHANNEL);
    channel.current = bc;
    bc.onmessage = (event: MessageEvent<DeckMessage>) => {
      if (event.data.type === "state") setState(event.data);
    };
    bc.postMessage({ type: "hello" } satisfies DeckMessage);
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => {
      bc.close();
      window.clearInterval(id);
    };
  }, []);

  const send = (msg: DeckMessage) => channel.current?.postMessage(msg);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const msg: DeckMessage | undefined =
        key === "arrowright" || key === " " || key === "pagedown" || key === "enter"
          ? { type: "next" }
          : key === "arrowleft" || key === "pageup" || key === "backspace"
            ? { type: "prev" }
            : key === "t"
              ? { type: "timer" }
              : key === "a"
                ? { type: "auto" }
                : undefined;
      if (!msg) return;
      event.preventDefault();
      channel.current?.postMessage(msg);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const planned = slides.reduce((sum, s) => sum + s.seconds, 0);
  if (!state) {
    return (
      <main className="notes-window">
        <p className="notes-wait">Abre /pitch en otra ventana de este navegador y presiona P.</p>
      </main>
    );
  }
  const slide = slides[state.index];
  const next = slides[state.index + 1];
  const elapsed = now - state.startedAt;
  const slideElapsed = now - state.slideAt;
  // Cuánto debería llevar al terminar esta diapositiva, según el guion.
  const target = slides.slice(0, state.index + 1).reduce((sum, s) => sum + s.seconds, 0) * 1000;

  return (
    <main className="notes-window">
      <header className="notes-top">
        <span className="kicker">{slide.section}</span>
        <span className="notes-count">
          {state.index + 1} / {slides.length}
        </span>
      </header>
      <h1 className="notes-title">{slide.title}</h1>
      <p className="notes-body">{slide.script}</p>
      <dl className="notes-clocks">
        <div className={slideElapsed > slide.seconds * 1000 ? "is-late" : ""}>
          <dt>esta diapositiva</dt>
          <dd>
            {clock(slideElapsed)} <small>/ {clock(slide.seconds * 1000)}</small>
          </dd>
        </div>
        <div className={elapsed > target ? "is-late" : ""}>
          <dt>total</dt>
          <dd>
            {clock(elapsed)} <small>/ {clock(planned * 1000)}</small>
          </dd>
        </div>
      </dl>
      {next && (
        <p className="notes-next">
          Sigue: <b>{next.title}</b>
        </p>
      )}
      <nav className="notes-controls">
        <button type="button" className="btn btn-sm" onClick={() => send({ type: "prev" })}>
          ← Anterior
        </button>
        <button type="button" className="btn btn-sm btn-primary" onClick={() => send({ type: "next" })}>
          Siguiente →
        </button>
        <button type="button" className="btn btn-sm" onClick={() => send({ type: "timer" })}>
          Reiniciar tiempo
        </button>
        <button type="button" className="btn btn-sm" onClick={() => send({ type: "auto" })}>
          {state.auto ? "Detener automático" : "Automático"}
        </button>
      </nav>
    </main>
  );
}
