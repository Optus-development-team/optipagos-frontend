import type { Pen } from "./draw";

/**
 * El tentáculo del logo de Optipagos haciendo de mano: sale por abajo a la derecha,
 * sostiene un rotulador y lo lleva a donde draw.ts le indica. Se dibuja en un <svg> de
 * 1920 × 1080 que cubre el lienzo.
 */
const NS = "http://www.w3.org/2000/svg";
const SAMPLES = 44;
/** Donde descansa, fuera de cuadro. */
const REST: Point = [2150, 1320];

type Point = [number, number];

export class Tentacle implements Pen {
  private target: Point = [...REST];
  private tip: Point = [...REST];
  private velocity: Point = [0, 0];
  private frame = 0;
  private last = 0;
  private readonly started = performance.now();
  private readonly body: SVGPathElement;
  private readonly vein: SVGPathElement;
  private readonly suckers: SVGGElement;
  private readonly curl: SVGPathElement;
  private readonly pen: SVGGElement;

  constructor(private readonly svg: SVGSVGElement) {
    const el = <K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string>) => {
      const node = document.createElementNS(NS, tag);
      for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
      return node;
    };
    this.pen = el("g", { class: "t-pen" });
    this.pen.append(
      el("rect", { x: "-11", y: "18", width: "22", height: "128", rx: "8", class: "t-pen-body" }),
      el("rect", { x: "-12", y: "112", width: "24", height: "40", rx: "9", class: "t-pen-cap" }),
      el("path", { d: "M-9 20 L0 -2 L9 20 Z", class: "t-pen-nib" }),
    );
    this.body = el("path", { class: "t-body" });
    this.suckers = el("g", { class: "t-suckers" });
    this.vein = el("path", { class: "t-vein" });
    this.curl = el("path", { class: "t-curl" });
    svg.append(this.pen, this.body, this.suckers, this.vein, this.curl);
    this.frame = requestAnimationFrame(this.tick);
  }

  to(x: number, y: number) {
    this.target = [x, y];
  }

  rest() {
    this.target = [...REST];
  }

  /** Coloca el tentáculo sin animar (para el PDF). */
  place(x: number, y: number) {
    this.target = [x, y];
    this.tip = [x, y];
    this.velocity = [0, 0];
    this.render(0);
  }

  dispose() {
    cancelAnimationFrame(this.frame);
    this.svg.replaceChildren();
  }

  private tick = (now: number) => {
    const dt = Math.min(0.05, this.last ? (now - this.last) / 1000 : 0.016);
    this.last = now;
    // Sigue al objetivo con un poco de retraso, como algo blando.
    const follow = 1 - Math.pow(1 - 0.32, dt * 60);
    const nx = this.tip[0] + (this.target[0] - this.tip[0]) * follow;
    const ny = this.tip[1] + (this.target[1] - this.tip[1]) * follow;
    this.velocity = [(nx - this.tip[0]) / Math.max(dt, 0.001), (ny - this.tip[1]) / Math.max(dt, 0.001)];
    this.tip = [nx, ny];
    this.render((now - this.started) / 1000);
    this.frame = requestAnimationFrame(this.tick);
  };

  private render(time: number) {
    const nib = this.tip;
    // La base sale por abajo, más a la derecha cuanto más a la derecha esté la punta.
    const base: Point = [Math.min(2080, 1380 + nib[0] * 0.38), 1190];
    // El rotulador apunta hacia la base, algo inclinado como en una mano.
    const toBase = norm([base[0] - nib[0], base[1] - nib[1]]);
    const axis = norm([toBase[0] * 0.55 + 0.42, toBase[1] * 0.55 + 0.8]);
    const grip: Point = [nib[0] + axis[0] * 92, nib[1] + axis[1] * 92];
    const angle = (Math.atan2(axis[1], axis[0]) * 180) / Math.PI - 90;
    this.pen.setAttribute("transform", `translate(${nib[0]} ${nib[1]}) rotate(${angle})`);

    const dist = Math.hypot(grip[0] - base[0], grip[1] - base[1]);
    const sway = Math.sin(time * 1.4) * 26;
    const lag: Point = [clamp(this.velocity[0] * -0.05, -160, 160), clamp(this.velocity[1] * -0.05, -160, 160)];
    const c1: Point = [base[0] - 40 + sway, base[1] - dist * 0.5];
    const c2: Point = [
      grip[0] + axis[0] * dist * 0.38 + lag[0] - sway * 0.6,
      grip[1] + axis[1] * dist * 0.38 + lag[1],
    ];

    const left: Point[] = [];
    const right: Point[] = [];
    const center: Point[] = [];
    const normals: Point[] = [];
    const widths: number[] = [];
    for (let i = 0; i <= SAMPLES; i++) {
      const t = i / SAMPLES;
      const p = bezier(base, c1, c2, grip, t);
      const d = norm(bezierTangent(base, c1, c2, grip, t));
      const n: Point = [-d[1], d[0]];
      const w = 92 * Math.pow(1 - t, 0.8) + 14;
      center.push(p);
      normals.push(n);
      widths.push(w);
      left.push([p[0] + (n[0] * w) / 2, p[1] + (n[1] * w) / 2]);
      right.push([p[0] - (n[0] * w) / 2, p[1] - (n[1] * w) / 2]);
    }
    const tipCap = center[SAMPLES];
    const d =
      `M${fmt(left[0])}` +
      left.slice(1).map((p) => ` L${fmt(p)}`).join("") +
      ` Q${fmt([tipCap[0] - axis[0] * 14, tipCap[1] - axis[1] * 14])} ${fmt(right[SAMPLES])}` +
      right
        .slice(0, SAMPLES)
        .reverse()
        .map((p) => ` L${fmt(p)}`)
        .join("") +
      " Z";
    this.body.setAttribute("d", d);

    // La línea fina del logo, corriendo por dentro del tentáculo.
    const vein = center
      .slice(3, SAMPLES - 4)
      .map((p, i) => {
        const k = i + 3;
        const off = widths[k] * 0.24;
        return `${i ? "L" : "M"}${fmt([p[0] + normals[k][0] * off, p[1] + normals[k][1] * off])}`;
      })
      .join(" ");
    this.vein.setAttribute("d", vein);

    // Ventosas por el lado de abajo.
    const suckers: string[] = [];
    for (let k = 5; k < SAMPLES - 5; k += 3) {
      const p = center[k];
      const off = widths[k] * 0.27;
      const r = widths[k] * 0.17;
      suckers.push(
        `<ellipse cx="${(p[0] - normals[k][0] * off).toFixed(1)}" cy="${(p[1] - normals[k][1] * off).toFixed(1)}" rx="${r.toFixed(1)}" ry="${(r * 0.8).toFixed(1)}"/>`,
      );
    }
    this.suckers.innerHTML = suckers.join("");

    // La punta se enrosca alrededor del rotulador.
    const perp: Point = [-axis[1], axis[0]];
    const a: Point = [grip[0] + perp[0] * 18 - axis[0] * 10, grip[1] + perp[1] * 18 - axis[1] * 10];
    const b: Point = [grip[0] - perp[0] * 18 - axis[0] * 22, grip[1] - perp[1] * 18 - axis[1] * 22];
    const end: Point = [grip[0] + perp[0] * 14 - axis[0] * 40, grip[1] + perp[1] * 14 - axis[1] * 40];
    this.curl.setAttribute(
      "d",
      `M${fmt(grip)} Q${fmt(a)} ${fmt([grip[0] - axis[0] * 16, grip[1] - axis[1] * 16])} T${fmt(b)} Q${fmt([b[0] - axis[0] * 10, b[1] - axis[1] * 10])} ${fmt(end)}`,
    );
  }
}

const fmt = (p: Point) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const norm = (v: Point): Point => {
  const l = Math.hypot(v[0], v[1]) || 1;
  return [v[0] / l, v[1] / l];
};
const bezier = (p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point => {
  const u = 1 - t;
  return [
    u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
    u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
  ];
};
const bezierTangent = (p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point => {
  const u = 1 - t;
  return [
    3 * u * u * (p1[0] - p0[0]) + 6 * u * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0]),
    3 * u * u * (p1[1] - p0[1]) + 6 * u * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1]),
  ];
};
