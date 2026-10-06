import { MdExpandMore } from "react-icons/md";
import { Flower } from "@/components/doodles";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

/** Las mismas preguntas, para que los buscadores puedan mostrarlas. */
export const faqJsonLd = (t: Dictionary["faq"]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: t.questions.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
});

export function Faq({ t, id }: { t: Dictionary["faq"]; id: string }) {
  return (
    <section id={id} className="scroll-mt-8">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <Reveal effect="left">
          <p className="hand text-2xl text-ink-600">{t.eyebrow}</p>
          <h2 className="display text-6xl sm:text-7xl">{t.title}</h2>
          <Flower className="mt-6 h-24 w-24 animate-wiggle text-ochre" />
        </Reveal>

        <div className="flex flex-col gap-4">
          {t.questions.map((item, index) => (
            <Reveal key={item.q} delay={index * 70}>
              <details className="doodle-box flat group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <MdExpandMore
                    className="h-7 w-7 flex-none transition-transform duration-300 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="details-body mt-3 text-lg leading-snug">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
