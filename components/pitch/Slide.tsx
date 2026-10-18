"use client";

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { OPTIPAGOS_MARK } from "@/components/brand/paths";
import type { PitchDeck, PitchItem, PitchSlide } from "@/content/pitch/types";
import { art, type DoodleName } from "./art";
import { Rich } from "./rich";

/**
 * Una diapositiva del pitch en su lienzo de 1920 × 1080. Solo marca qué se anima y en qué
 * orden (atributo data-anim, en el orden del documento); components/pitch/draw.ts lo anima:
 *
 *   draw   el tentáculo dibuja los trazos del SVG
 *   write  el tentáculo escribe las letras (.c) o palabras (.w)
 *   pop    aparece con un saltito
 *   fade   aparece sin que el tentáculo lo toque
 */
export function Slide({
  slide,
  deck,
  index,
  total,
}: {
  slide: PitchSlide;
  deck: PitchDeck;
  index: number;
  total: number;
}) {
  const body = layouts[slide.layout](slide, deck);
  const framed = slide.layout !== "cover" && slide.layout !== "closing";
  return (
    <section
      className={`slide layout-${slide.layout}${slide.phones ? " has-phones" : ""}`}
      aria-roledescription="diapositiva"
      aria-label={`${index + 1} de ${total}`}
    >
      {framed && (
        <header className="slide-head">
          <span className="kicker" data-anim="pop">
            {slide.section}
          </span>
          <h1 className="slide-title" data-anim="write">
            <Rich text={slide.title} unit="chars" />
          </h1>
          {slide.lead && (
            <p className="slide-lead" data-anim="write">
              <Rich text={slide.lead} />
            </p>
          )}
        </header>
      )}
      {body}
      {slide.note && (
        <p className="slide-note" data-anim="write">
          <Doodle name="arrow" className="note-arrow" />
          <span>
            <Rich text={slide.note} />
          </span>
        </p>
      )}
      {slide.footnote && <p className="slide-footnote">{slide.footnote}</p>}
      <span className="slide-url">{deck.url} ↘</span>
      <span className="slide-count">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </section>
  );
}

const layouts: Record<PitchSlide["layout"], (slide: PitchSlide, deck: PitchDeck) => ReactNode> = {
  cover: (slide, deck) => (
    <>
      <div className="cover-text">
        <BrandLockup />
        <h1 className="cover-title" data-anim="write">
          <Rich text={slide.title} unit="chars" />
        </h1>
        {slide.lead && (
          <p className="cover-lead" data-anim="write">
            <Rich text={slide.lead} />
          </p>
        )}
      </div>
      <div className="cover-art">
        {slide.art?.map((name, i) => <Doodle key={name} name={name} className={`art art-${i}`} />)}
      </div>
      <Sponsors deck={deck} />
    </>
  ),

  closing: (slide, deck) => (
    <>
      <div className="closing-main">
        <BrandLockup />
        <h1 className="cover-title" data-anim="write">
          <Rich text={slide.title} unit="chars" />
        </h1>
        {slide.lead && (
          <p className="cover-lead" data-anim="write">
            <Rich text={slide.lead} />
          </p>
        )}
        <p className="closing-url" data-anim="write">
          <Rich text={deck.url} />
        </p>
        {deck.email && (
          <p className="closing-email" data-anim="write">
            <Rich text={deck.email} />
          </p>
        )}
      </div>
      <figure className="closing-qr" data-anim="pop">
        {/* eslint-disable-next-line @next/next/no-img-element -- lienzo fijo, sin optimizar */}
        <img src="/pitch/qr-whatsapp.svg" alt="QR para escribir «hola» a Optipagos por WhatsApp" />
        <figcaption>escanea y escribe «hola»</figcaption>
      </figure>
      {slide.art?.map((name, i) => <Doodle key={name} name={name} className={`art art-${i}`} />)}
      <Sponsors deck={deck} />
    </>
  ),

  cards: (slide) => (
    <ul className="cards">
      {slide.items?.map((item) => (
        <li key={item.title} className="card">
          <Frame />
          {item.doodle && <Doodle name={item.doodle} className="card-doodle" />}
          {item.value && (
            <p className="card-value" data-anim="write">
              <Rich text={item.value} unit="chars" />
            </p>
          )}
          <div>
            <h2 className="card-title" data-anim="write">
              <Rich text={item.title} />
            </h2>
            {item.text && (
              <p className="card-text" data-anim="write">
                <Rich text={item.text} />
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  ),

  steps: (slide) => (
    <ol className="steps">
      {slide.items?.map((item, i) => (
        <li key={item.title} className="step">
          <span className="step-num" data-anim="pop">
            {i + 1}
          </span>
          {item.doodle && <Doodle name={item.doodle} className="step-doodle" />}
          <div>
            <h2 className="step-title" data-anim="write">
              <Rich text={item.title} />
            </h2>
            {item.text && (
              <p className="step-text" data-anim="write">
                <Rich text={item.text} />
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  ),

  checklist: (slide) => (
    <ul className="checklist">
      {slide.items?.map((item) => (
        <li key={item.title} className="check-row">
          {item.doodle && <Doodle name={item.doodle} className="check-doodle" />}
          <div>
            <h2 className="check-title" data-anim="write">
              <Rich text={item.title} />
            </h2>
            {item.text && (
              <p className="check-text" data-anim="write">
                <Rich text={item.text} />
              </p>
            )}
          </div>
          <Doodle name="check" className="check-tick" />
        </li>
      ))}
    </ul>
  ),

  stats: (slide) => (
    <ul className="stats">
      {slide.items?.map((item) => (
        <li key={item.title} className="stat">
          {item.doodle && <Doodle name={item.doodle} className="stat-doodle" />}
          {item.value && (
            <p className="stat-value" data-anim="write">
              <span className="mk">
                <Rich text={item.value} unit="chars" />
              </span>
            </p>
          )}
          <p className="stat-title" data-anim="write">
            <Rich text={item.title} />
          </p>
          {item.source && (
            <p className="stat-source" data-anim="fade">
              {item.source}
            </p>
          )}
        </li>
      ))}
    </ul>
  ),

  compare: (slide) => (
    <div className="compare" style={{ "--cols": slide.columns?.length ?? 1 } as CSSProperties}>
      <div className="compare-row compare-head">
        <span />
        {slide.columns?.map((column) => (
          <span key={column} className="compare-col" data-anim="write">
            <Rich text={column} />
          </span>
        ))}
      </div>
      {slide.items?.map((item) => (
        <div key={item.title} className={`compare-row${item.highlight ? " is-us" : ""}`}>
          {item.highlight && <Frame />}
          <span className="compare-name" data-anim="write">
            <Rich text={item.title} />
          </span>
          {item.cells?.map((cell, i) => (
            <span key={i} className="compare-cell">
              {cell === true && <Doodle name="check" className="cell-yes" />}
              {cell === false && <Doodle name="cross" className="cell-no" />}
              {typeof cell === "string" && (
                <span className="cell-text" data-anim="write">
                  <Rich text={cell} />
                </span>
              )}
            </span>
          ))}
        </div>
      ))}
    </div>
  ),

  roadmap: (slide) => {
    const items = slide.items ?? [];
    // Camino ondulado de lado a lado; los hitos se reparten a lo ancho.
    const road = "M20 150 C200 40 360 260 560 150 S920 40 1120 150 S1480 260 1680 120";
    return (
      <div className="roadmap">
        <svg className="road" viewBox="0 0 1700 300" data-anim="draw" aria-hidden="true">
          <path d={road} />
        </svg>
        <ol className="milestones" style={{ "--n": items.length } as CSSProperties}>
          {items.map((item, i) => (
            <li key={item.title} className={`milestone${i % 2 ? " is-low" : ""}`}>
              <Doodle name={i === items.length - 1 ? "globe" : "pin"} className="milestone-pin" />
              <p className="milestone-when" data-anim="write">
                <Rich text={item.value ?? ""} />
              </p>
              <h2 className="milestone-title" data-anim="write">
                <Rich text={item.title} />
              </h2>
              {item.text && (
                <p className="milestone-text" data-anim="write">
                  <Rich text={item.text} />
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    );
  },

  funds: (slide) => {
    const items = slide.items ?? [];
    const total = items.reduce((sum, item) => sum + (item.share ?? 0), 0) || 1;
    const r = 150;
    const circumference = 2 * Math.PI * r;
    let start = 0;
    return (
      <div className="funds">
        <svg className="donut" viewBox="0 0 400 400" data-anim="draw" aria-hidden="true">
          {items.map((item, i) => {
            const length = ((item.share ?? 0) / total) * circumference;
            const arc = arcPath(200, 200, r, start, start + length / r);
            start += length / r;
            return <path key={item.title} d={arc} className={`slice slice-${i % 4}`} />;
          })}
        </svg>
        <ul className="legend">
          {items.map((item, i) => (
            <li key={item.title} className="legend-row">
              <span className={`swatch slice-${i % 4}`} data-anim="pop" />
              {item.value && (
                <span className="legend-value" data-anim="write">
                  <Rich text={item.value} unit="chars" />
                </span>
              )}
              <span className="legend-title" data-anim="write">
                <Rich text={item.title} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  },

  team: (slide) => (
    <ul className="team">
      {slide.items?.map((item, i) => <Member key={item.title} item={item} tilt={i % 2 ? 2 : -2} />)}
    </ul>
  ),
};

function Member({ item, tilt }: { item: PitchItem; tilt: number }) {
  return (
    <li className="member" style={{ "--tilt": `${tilt}deg` } as CSSProperties}>
      <div className="member-photo">
        <Frame />
        {item.photo ? (
          // eslint-disable-next-line @next/next/no-img-element -- lienzo fijo, sin optimizar
          <img src={item.photo} alt="" data-anim="fade" />
        ) : (
          <Doodle name="users" className="member-doodle" />
        )}
      </div>
      <h2 className="member-name" data-anim="write">
        <Rich text={item.title} />
      </h2>
      {item.text && (
        <p className="member-role" data-anim="write">
          <Rich text={item.text} />
        </p>
      )}
      {item.value && (
        <p className="member-hours" data-anim="fade">
          {item.value}
        </p>
      )}
    </li>
  );
}

/** Logo de Optipagos: el tentáculo lo repasa y luego se rellena. */
function BrandLockup() {
  return (
    <div className="brand">
      <svg className="brand-mark" viewBox={OPTIPAGOS_MARK.viewBox} data-anim="draw" aria-hidden="true">
        <path className="fill" transform={OPTIPAGOS_MARK.transform} d={OPTIPAGOS_MARK.d} />
        <path transform={OPTIPAGOS_MARK.transform} d={OPTIPAGOS_MARK.d} />
      </svg>
      <span className="brand-word" data-anim="write">
        <Rich text="optipagos" unit="chars" />
      </span>
    </div>
  );
}

function Sponsors({ deck }: { deck: PitchDeck }) {
  return (
    <ul className="sponsors" data-anim="fade">
      {deck.sponsors.map((sponsor) => (
        <li key={sponsor.name} className="sponsor">
          {sponsor.logo ? (
            // eslint-disable-next-line @next/next/no-img-element -- lienzo fijo, sin optimizar
            <img src={sponsor.logo} alt={sponsor.name} />
          ) : (
            <span>{sponsor.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function Doodle({ name, className = "" }: { name: DoodleName; className?: string }) {
  return (
    <svg className={`doodle ${className}`} viewBox="0 0 100 100" data-anim="draw" aria-hidden="true">
      {art[name].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

/**
 * Marco dibujado a mano del tamaño de su caja. Se mide antes de pintar (y antes de que
 * draw.ts lea los trazos) para que el rotulador tenga el mismo grosor en todos los lados.
 */
function Frame() {
  const ref = useRef<SVGSVGElement>(null);
  useLayoutEffect(() => {
    const svg = ref.current;
    const box = svg?.parentElement;
    if (!svg || !box) return;
    const w = box.offsetWidth;
    const h = box.offsetHeight;
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    const d = framePath(w, h);
    svg.querySelectorAll("path").forEach((path) => path.setAttribute("d", d));
  }, []);
  return (
    <svg ref={ref} className="frame" viewBox="0 0 100 100" data-anim="draw" aria-hidden="true">
      <path className="fill" d={framePath(100, 100)} />
      <path d={framePath(100, 100)} />
    </svg>
  );
}

/** Rectángulo con los lados un poco curvos y la esquina final que se pasa de largo. */
function framePath(w: number, h: number): string {
  const p = (x: number, y: number) => `${x.toFixed(1)} ${y.toFixed(1)}`;
  return [
    `M${p(10, 9)}`,
    `C${p(w * 0.32, 4)} ${p(w * 0.68, 8)} ${p(w - 7, 6)}`,
    `C${p(w - 4, h * 0.34)} ${p(w - 8, h * 0.68)} ${p(w - 6, h - 7)}`,
    `C${p(w * 0.66, h - 3)} ${p(w * 0.34, h - 8)} ${p(7, h - 6)}`,
    `C${p(4, h * 0.66)} ${p(8, h * 0.32)} ${p(6, 4)}`,
  ].join(" ");
}

/** Arco de circunferencia (radianes, empezando arriba y en sentido horario). */
function arcPath(cx: number, cy: number, r: number, from: number, to: number): string {
  const point = (angle: number) => [cx + r * Math.sin(angle), cy - r * Math.cos(angle)];
  const [x1, y1] = point(from);
  const [x2, y2] = point(Math.max(from, to - 0.02));
  const large = to - from > Math.PI ? 1 : 0;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}
