"use client";

import { animate, type Timeline } from "animejs";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { PitchDeck } from "@/content/pitch/types";
import { drawSlide, settle, type ToStage } from "./draw";
import type { PhoneStage } from "./phones";
import { plain } from "./rich";
import { Slide } from "./Slide";
import { Tentacle } from "./tentacle";
import { clock, CHANNEL, type DeckMessage } from "./sync";
import "./pitch.css";

export interface DeckMode {
  /** Sin animaciones: la diapositiva ya dibujada (para el PDF). */
  still: boolean;
  /** Diapositiva inicial (desde 0). */
  start: number;
  /** Avanza sola según los segundos de cada diapositiva. */
  auto: boolean;
}

interface View {
  index: number;
  /** Cambia en cada visita: la diapositiva se vuelve a montar y a dibujar. */
  visit: number;
  leaving: { index: number; visit: number; back: boolean } | null;
  back: boolean;
}

/**
 * El pitch: un lienzo de 1920 × 1080 que se escala a la pantalla, con las diapositivas, los
 * teléfonos 3D y el tentáculo encima. Teclas: → / espacio avanzar, ← volver, F pantalla
 * completa, N notas, P ventana de notas, A automático, T reiniciar el tiempo, R redibujar,
 * H ocultar la barra.
 */
export function Deck({ deck, mode }: { deck: PitchDeck; mode: DeckMode }) {
  const total = deck.slides.length;
  const clamp = useCallback((i: number) => Math.min(total - 1, Math.max(0, i)), [total]);
  const [view, setView] = useState<View>(() => ({ index: clamp(mode.start), visit: 0, leaving: null, back: false }));
  const [scale, setScale] = useState(1);
  const [ready, setReady] = useState(false);
  const [hud, setHud] = useState(!mode.still);
  const [notes, setNotes] = useState(false);
  const [help, setHelp] = useState(!mode.still);
  const [auto, setAuto] = useState(mode.auto);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [slideAt, setSlideAt] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());

  const stageRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLDivElement>(null);
  const leavingRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const penRef = useRef<SVGSVGElement>(null);
  const tentacle = useRef<Tentacle | null>(null);
  const phones = useRef<PhoneStage | null>(null);
  const timeline = useRef<Timeline | null>(null);
  const viewRef = useRef(view);
  useEffect(() => {
    viewRef.current = view;
  }, [view]);

  const slide = deck.slides[view.index];

  const go = useCallback(
    (next: number, replay = false) =>
      setView((v) => {
        const index = clamp(next);
        if (index === v.index && !replay) return v;
        const back = index < v.index;
        return { index, visit: v.visit + 1, back, leaving: replay ? null : { index: v.index, visit: v.visit, back } };
      }),
    [clamp],
  );
  const step = useCallback((delta: number) => setView((v) => {
    const index = clamp(v.index + delta);
    if (index === v.index) return v;
    const back = delta < 0;
    return { index, visit: v.visit + 1, back, leaving: { index: v.index, visit: v.visit, back } };
  }), [clamp]);

  const toStage = useCallback<ToStage>((x, y) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return [x, y];
    const s = rect.width / 1920;
    return [(x - rect.left) / s, (y - rect.top) / s];
  }, []);

  // El lienzo ocupa la pantalla sin deformarse.
  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  // Las fuentes primero: los marcos se miden con el texto ya en su sitio.
  useEffect(() => {
    let alive = true;
    document.fonts.ready.then(() => alive && setReady(true));
    return () => {
      alive = false;
    };
  }, []);

  // Tentáculo y teléfonos viven lo que dura la página.
  useLayoutEffect(() => {
    if (!ready || !penRef.current) return;
    const pen = new Tentacle(penRef.current);
    tentacle.current = pen;
    return () => {
      pen.dispose();
      tentacle.current = null;
    };
  }, [ready]);

  useEffect(() => {
    if (!ready || !canvasRef.current) return;
    let stage: PhoneStage | null = null;
    let alive = true;
    import("./phones").then(({ PhoneStage }) => {
      if (!alive || !canvasRef.current) return;
      stage = new PhoneStage(canvasRef.current, deck.videos);
      phones.current = stage;
      void applyPhones(stage, deck.slides[viewRef.current.index].phones, mode.still);
    });
    return () => {
      alive = false;
      stage?.dispose();
      phones.current = null;
    };
    // Solo al montar: los cambios de diapositiva se aplican en el efecto de abajo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  useEffect(() => {
    phones.current?.setPixelRatio(Math.min(2, window.devicePixelRatio * scale));
  }, [scale, ready]);

  // Cada diapositiva nueva: el tentáculo la dibuja (o aparece hecha si se vuelve atrás).
  useLayoutEffect(() => {
    const root = currentRef.current;
    const pen = tentacle.current;
    if (!ready || !root || !pen) return;
    timeline.current?.complete(true);
    timeline.current = null;
    setSlideAt(Date.now());

    if (mode.still || view.back) {
      root.dataset.state = "done";
      settle(root);
      pen.rest();
    } else {
      root.dataset.state = "drawing";
      const budget = Math.min(6500, deck.slides[view.index].seconds * 380);
      const tl = drawSlide(root, { pen, toStage, budget });
      timeline.current = tl;
      const delay = window.setTimeout(() => tl.play(), view.visit ? 420 : 700);
      return () => window.clearTimeout(delay);
    }
  }, [ready, view.index, view.visit, view.back, mode.still, deck.slides, toStage]);

  useEffect(() => {
    if (!ready || !phones.current) return;
    void applyPhones(phones.current, slide.phones, mode.still);
  }, [ready, slide.phones, mode.still, view.index]);

  // La que se va sale de lado, como una hoja que se retira.
  useEffect(() => {
    const el = leavingRef.current;
    const leaving = view.leaving;
    if (!el || !leaving) return;
    const dir = leaving.back ? 1 : -1;
    const anim = animate(el, {
      translateX: [0, dir * 320],
      rotate: [0, dir * 4],
      opacity: [1, 0],
      duration: 520,
      ease: "in(2)",
    });
    anim.then(() =>
      setView((v) => (v.leaving?.visit === leaving.visit ? { ...v, leaving: null } : v)),
    );
    return () => {
      anim.cancel();
    };
  }, [view.leaving]);

  // Listo para capturar (PDF): fuentes, imágenes y teléfonos en su sitio.
  useEffect(() => {
    if (!mode.still || !ready) return;
    let alive = true;
    (async () => {
      const images = Array.from(stageRef.current?.querySelectorAll("img") ?? []);
      await Promise.all(images.map((img) => img.decode().catch(() => undefined)));
      if (slide.phones) {
        while (alive && !phones.current) await new Promise((r) => setTimeout(r, 50));
        await phones.current?.setCue(slide.phones, true);
      }
      if (!alive) return;
      document.documentElement.dataset.pitchTotal = String(total);
      document.documentElement.dataset.pitchReady = "1";
    })();
    return () => {
      alive = false;
    };
  }, [mode.still, ready, slide.phones, total]);

  // Estado más reciente para el reloj y la ventana de notas.
  const channel = useRef<BroadcastChannel | null>(null);
  const live = useRef({ index: view.index, startedAt, slideAt, auto });
  const stateMessage = (): DeckMessage => ({ type: "state", ...live.current });
  useEffect(() => {
    live.current = { index: view.index, startedAt, slideAt, auto };
    channel.current?.postMessage({ type: "state", ...live.current } satisfies DeckMessage);
  }, [view.index, startedAt, slideAt, auto]);

  // Reloj: tiempo total, por diapositiva y modo automático.
  useEffect(() => {
    if (mode.still) return;
    const id = window.setInterval(() => {
      const t = Date.now();
      setNow(t);
      const state = live.current;
      if (state.auto && state.index < total - 1 && t - state.slideAt >= deck.slides[state.index].seconds * 1000) {
        state.slideAt = t;
        step(1);
      }
    }, 250);
    return () => window.clearInterval(id);
  }, [mode.still, deck.slides, total, step]);

  useEffect(() => {
    if (!help) return;
    const id = window.setTimeout(() => setHelp(false), 6000);
    return () => window.clearTimeout(id);
  }, [help]);

  // Ventana de notas (tecla P): se sincroniza por BroadcastChannel.
  useEffect(() => {
    if (mode.still || typeof BroadcastChannel === "undefined") return;
    const bc = new BroadcastChannel(CHANNEL);
    channel.current = bc;
    bc.onmessage = (event: MessageEvent<DeckMessage>) => {
      const msg = event.data;
      if (msg.type === "next") step(1);
      else if (msg.type === "prev") step(-1);
      else if (msg.type === "go") go(msg.index);
      else if (msg.type === "timer") setStartedAt(Date.now());
      else if (msg.type === "auto") setAuto((a) => !a);
      else if (msg.type === "hello") bc.postMessage(stateMessage());
    };
    return () => {
      bc.close();
      channel.current = null;
    };
  }, [mode.still, step, go]);


  // Teclado y clic.
  useEffect(() => {
    if (mode.still) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const key = event.key.toLowerCase();
      const actions: Record<string, () => void> = {
        arrowright: () => step(1),
        pagedown: () => step(1),
        " ": () => step(1),
        enter: () => step(1),
        arrowleft: () => step(-1),
        pageup: () => step(-1),
        backspace: () => step(-1),
        home: () => go(0),
        end: () => go(total - 1),
        f: () => toggleFullscreen(),
        n: () => setNotes((v) => !v),
        h: () => setHud((v) => !v),
        a: () => setAuto((v) => !v),
        t: () => setStartedAt(Date.now()),
        r: () => go(viewRef.current.index, true),
        p: () => window.open("/pitch/notas", "optipagos-notas", "popup,width=980,height=760"),
        "?": () => setHelp((v) => !v),
      };
      const action = actions[key];
      if (!action) return;
      event.preventDefault();
      action();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode.still, step, go, total]);

  const elapsed = now - startedAt;
  const planned = deck.slides.reduce((sum, s) => sum + s.seconds, 0);
  const slideElapsed = now - slideAt;

  return (
    <div className={`pitch${mode.still ? " is-still" : ""}`}>
      <div className="pitch-frame" style={{ width: 1920 * scale, height: 1080 * scale }}>
        <div
          ref={stageRef}
          className="pitch-stage"
          style={{ transform: `scale(${scale})` }}
          onClick={mode.still ? undefined : () => step(1)}
        >
          <div className="paper" />
          {ready && view.leaving && (
            <div
              ref={leavingRef}
              key={`s${view.leaving.index}-${view.leaving.visit}`}
              className="slide-holder is-leaving"
              data-state="done"
            >
              <Slide slide={deck.slides[view.leaving.index]} deck={deck} index={view.leaving.index} total={total} />
            </div>
          )}
          {ready && (
            <div
              ref={currentRef}
              key={`s${view.index}-${view.visit}`}
              className={`slide-holder${slide.phones ? ` scene-${slide.phones.scene} pose-${slide.phones.pose}` : ""}`}
              data-state="drawing"
            >
              <Slide slide={slide} deck={deck} index={view.index} total={total} />
            </div>
          )}
          <canvas ref={canvasRef} className="phones" aria-hidden="true" />
          <svg ref={penRef} className="tentacle" viewBox="0 0 1920 1080" aria-hidden="true" />
        </div>
      </div>

      {hud && (
        <div className="hud" aria-hidden="true">
          <div className="hud-bar">
            {deck.slides.map((s, i) => (
              <span
                key={s.id}
                style={{ flexGrow: s.seconds }}
                className={i < view.index ? "is-done" : i === view.index ? "is-now" : ""}
              >
                {i === view.index && (
                  <i style={{ width: `${Math.min(100, (slideElapsed / (s.seconds * 1000)) * 100)}%` }} />
                )}
              </span>
            ))}
          </div>
          <p className="hud-text">
            {view.index + 1}/{total} · {slide.section} · <b className={elapsed > planned * 1000 ? "is-late" : ""}>{time(elapsed)}</b> / {time(planned * 1000)}
            {auto && " · automático"}
          </p>
        </div>
      )}

      {notes && (
        <aside className="notes-panel">
          <p className="notes-meta">
            <b>{slide.section}</b> · {time(slideElapsed)} / {time(slide.seconds * 1000)}
            {view.index < total - 1 && <> · sigue: {plain(deck.slides[view.index + 1].title)}</>}
          </p>
          <p className="notes-script">{slide.script}</p>
        </aside>
      )}

      {help && (
        <p className="help">
          → espacio avanzar · ← volver · F pantalla completa · N notas · P ventana de notas · A automático ·
          T reiniciar tiempo · R redibujar · H ocultar barra
        </p>
      )}
    </div>
  );
}

async function applyPhones(stage: PhoneStage, cue: PitchDeck["slides"][number]["phones"], still: boolean) {
  if (still) return; // en modo PDF lo hace el efecto de «listo para capturar»
  await stage.setCue(cue);
}

function toggleFullscreen() {
  if (document.fullscreenElement) void document.exitFullscreen();
  else void document.documentElement.requestFullscreen().catch(() => undefined);
}

const time = clock;
