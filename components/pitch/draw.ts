import { createTimeline, type Timeline } from "animejs";

/**
 * Anima una diapositiva al estilo «draw my life»: recorre los [data-anim] en el orden del
 * documento y el tentáculo dibuja los trazos y escribe el texto (ver Slide.tsx).
 */

/** Hacia dónde apunta la punta del rotulador, en coordenadas del lienzo (1920 × 1080). */
export interface Pen {
  to(x: number, y: number): void;
  rest(): void;
}

/** Convierte coordenadas de la pantalla a las del lienzo, que está escalado. */
export type ToStage = (x: number, y: number) => [number, number];

const DRAW_SPEED = 0.9; // ms por píxel de trazo
const CHAR_MS = 26;
const WORD_MS = 70;

export function drawSlide(
  root: HTMLElement,
  { pen, toStage, budget }: { pen: Pen; toStage: ToStage; budget: number },
): Timeline {
  const tl = createTimeline({ autoplay: false, onComplete: () => pen.rest() });
  const scale = () => {
    const [x0] = toStage(0, 0);
    const [x1] = toStage(100, 0);
    return (x1 - x0) / 100;
  };

  for (const el of root.querySelectorAll<HTMLElement | SVGSVGElement>("[data-anim]")) {
    const kind = el.dataset.anim;
    if (kind === "draw") addDrawing(tl, el as SVGSVGElement, pen, toStage, scale());
    else if (kind === "write") addWriting(tl, el as HTMLElement, pen, toStage);
    else if (kind === "pop") {
      tl.add(
        el,
        {
          opacity: [0, 1],
          scale: [0.6, 1],
          duration: 420,
          ease: "outBack(2)",
          onBegin: () => {
            const r = el.getBoundingClientRect();
            pen.to(...toStage(r.left + r.width / 2, r.top + r.height / 2));
          },
        },
        "-=60",
      );
    } else if (kind === "fade") {
      tl.add(el, { opacity: [0, 1], duration: 500, ease: "out(2)" }, "-=200");
    }
  }

  // El ritmo de cada diapositiva no depende de cuánto texto tenga: si se pasa, se acelera.
  if (tl.duration > budget) tl.stretch(budget);
  return tl;
}

function addDrawing(tl: Timeline, svg: SVGSVGElement, pen: Pen, toStage: ToStage, scale: number) {
  const fills = svg.querySelectorAll<SVGPathElement>("path.fill");
  for (const path of svg.querySelectorAll<SVGPathElement>("path:not(.fill)")) {
    const length = path.getTotalLength();
    if (!length) continue;
    path.style.strokeDasharray = `${length} ${length}`;
    path.style.strokeDashoffset = `${length}`;
    const ctm = path.getScreenCTM();
    const onScreen = length * Math.hypot(ctm?.a ?? 1, ctm?.b ?? 0);
    const pixels = onScreen / (scale || 1);
    tl.add(
      path,
      {
        strokeDashoffset: [length, 0],
        duration: Math.min(1100, Math.max(140, pixels * DRAW_SPEED)),
        ease: "inOut(1.3)",
        onUpdate: () => {
          const drawn = length - (parseFloat(path.style.strokeDashoffset) || 0);
          const matrix = path.getScreenCTM();
          if (!matrix) return;
          const point = path.getPointAtLength(Math.max(0, Math.min(length, drawn)));
          const screen = new DOMPoint(point.x, point.y).matrixTransform(matrix);
          pen.to(...toStage(screen.x, screen.y));
        },
      },
      "+=40",
    );
  }
  if (fills.length) tl.add(fills, { opacity: [0, 1], duration: 380, ease: "out(2)" }, "-=120");
}

function addWriting(tl: Timeline, el: HTMLElement, pen: Pen, toStage: ToStage) {
  const chars = el.querySelectorAll<HTMLElement>(".c");
  const units = chars.length ? chars : el.querySelectorAll<HTMLElement>(".w");
  const ms = chars.length ? CHAR_MS : WORD_MS;
  units.forEach((unit, i) => {
    tl.add(
      unit,
      {
        opacity: [0, 1],
        translateY: [10, 0],
        duration: ms * 2.2,
        ease: "out(3)",
        onUpdate: (self) => {
          const r = unit.getBoundingClientRect();
          pen.to(...toStage(r.left + r.width * self.progress, r.bottom - r.height * 0.18));
        },
      },
      i === 0 ? "+=60" : `-=${ms * 1.2}`,
    );
  });
  for (const mark of el.querySelectorAll<HTMLElement>(".mk")) {
    tl.add(
      mark,
      {
        backgroundSize: ["0% 42%", "100% 42%"],
        duration: 420,
        ease: "inOut(2)",
        onUpdate: (self) => {
          const r = mark.getBoundingClientRect();
          pen.to(...toStage(r.left + r.width * self.progress, r.bottom - r.height * 0.12));
        },
      },
      "+=40",
    );
  }
}

/** Deja la diapositiva dibujada del todo, sin animar (PDF, volver atrás). */
export function settle(root: HTMLElement) {
  for (const path of root.querySelectorAll<SVGPathElement>("[data-anim=draw] path")) {
    path.style.strokeDasharray = "";
    path.style.strokeDashoffset = "";
    path.style.opacity = "";
  }
}
