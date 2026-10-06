import Link from "next/link";
import type { ReactNode } from "react";
import { Sparkle, Squiggle } from "@/components/doodles";
import { DoodleIcon, type DoodleIconName } from "@/components/icons";
import { NotchCard } from "@/components/ui/NotchCard";
import { PageTransition } from "@/components/ui/PageTransition";
import { Reveal } from "@/components/ui/Reveal";
import { fill, type Dictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";

export interface LegalSection {
  id: string;
  title: string;
  body: ReactNode;
}

/** Una página legal completa en un idioma (ver content/legal). */
export interface LegalDocument {
  title: string;
  description: string;
  eyebrow: string;
  /** Resumen en lenguaje llano, antes del texto completo. */
  summary: string[];
  updated: string;
  sections: LegalSection[];
}

interface LegalPageProps {
  icon: DoodleIconName;
  eyebrow: string;
  title: string;
  /** Resumen en lenguaje llano, antes del texto completo. */
  summary: string[];
  updated: string;
  sections: LegalSection[];
  /** La otra página legal, para enlazarla al final. */
  other: { href: string; label: string };
  labels: Dictionary["legal"];
}

/** Marco común de las páginas legales: resumen, índice y texto, con el mismo trazo del sitio. */
export function LegalPage({
  icon,
  eyebrow,
  title,
  summary,
  updated,
  sections,
  other,
  labels,
}: LegalPageProps) {
  return (
    <PageTransition>
      <main className="mx-auto w-full max-w-4xl px-5 pb-20 pt-2">
        <NotchCard
          corner="tr"
          tone="honey"
          notch={[92, 92]}
          className="animate-rise"
          chip={
            <span className="chip-tile tone-ink boil">
              <DoodleIcon name={icon} className="h-11 w-11" />
            </span>
          }
        >
          <div className="relative px-6 pb-9 pt-8 sm:px-12">
            <Sparkle className="absolute bottom-6 right-8 hidden h-8 w-8 animate-twinkle sm:block" />
            <p className="hand pr-[84px] text-2xl text-ink-600">{eyebrow}</p>
            <h1 className="display pr-[84px] text-6xl sm:text-7xl">{title}</h1>
            <ul className="mt-6 flex flex-col gap-2">
              {summary.map((line) => (
                <li key={line} className="flex items-start gap-3 text-lg leading-snug">
                  <DoodleIcon name="tick" className="mt-1.5 h-4 w-5 flex-none" />
                  {line}
                </li>
              ))}
            </ul>
            <p className="hand mt-6 text-lg opacity-70">{fill(labels.effective, { date: updated })}</p>
          </div>
        </NotchCard>

        <nav aria-label={labels.contents} className="mt-8 flex flex-wrap gap-2">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="pill hover:bg-honey">
              {section.title}
            </a>
          ))}
        </nav>

        <Reveal>
          <article className="doodle-box prose-doodle mt-8 px-6 pb-10 pt-2 sm:px-12">
            {sections.map((section, index) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2 id={section.id}>
                  {index + 1}. {section.title}
                </h2>
                {section.body}
              </section>
            ))}
          </article>
        </Reveal>

        <Squiggle className="draw mx-auto mt-12 h-5 w-32 text-honey" />
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href={other.href} className="btn">
            {other.label}
          </Link>
          <a href={site.whatsappUrl("Hola, tengo una consulta")} className="btn btn-primary">
            {labels.ask}
          </a>
        </div>
      </main>
    </PageTransition>
  );
}
