import type { ReactNode } from "react";
import { MdArrowOutward } from "react-icons/md";
import { Coin, PaperPlane, Sparkle, Sun } from "@/components/doodles";
import { DoodleIcon, type DoodleIconName } from "@/components/icons";
import { NotchCard } from "@/components/ui/NotchCard";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

interface Look {
  icon: DoodleIconName;
  tone: "ink" | "cream" | "honey";
  corner: "tr" | "tl" | "br" | "bl";
  doodle: ReactNode;
}

// Aspecto de cada tarjeta; los textos vienen del diccionario, en el mismo orden.
const looks: Look[] = [
  { icon: "send", tone: "ink", corner: "tr", doodle: <PaperPlane className="h-9 w-9" /> },
  { icon: "cash", tone: "cream", corner: "tr", doodle: <Coin className="h-9 w-9" /> },
  { icon: "wallet", tone: "honey", corner: "tr", doodle: <Sun className="h-10 w-10" /> },
  { icon: "list", tone: "cream", corner: "tr", doodle: <Sparkle className="h-9 w-9" /> },
];

export function Features({ t, id }: { t: Dictionary["features"]; id: string }) {
  const features = t.items.map((item, index) => ({ ...item, ...looks[index] }));

  return (
    <section id={id} className="scroll-mt-8">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="hand text-2xl text-ink-600">{t.eyebrow}</p>
          <h2 className="display text-6xl sm:text-7xl">{t.title}</h2>
        </div>
        <p className="max-w-sm text-lg leading-snug">
          {t.lead}
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {features.map((feature, index) => (
          <Reveal
            key={feature.title}
            effect={index % 2 === 0 ? "left" : "right"}
            delay={(index % 2) * 120}
          >
          <NotchCard
            corner={feature.corner}
            tone={feature.tone}
            notch={[84, 84]}
            className="lively h-full"
            chip={
              <span
                className={`chip-tile ${feature.tone === "ink" ? "tone-honey" : feature.tone === "honey" ? "tone-ink" : ""}`}
              >
                <span className="lively-icon block">{feature.doodle}</span>
              </span>
            }
          >
            <div className="flex h-full flex-col px-6 pb-7 pt-6 sm:px-8">
              <div className="flex min-h-[64px] items-center gap-4 pr-[76px]">
                <DoodleIcon name={feature.icon} className="h-14 w-14 flex-none" />
                <h3 className="display text-5xl">{feature.title}</h3>
              </div>
              <p className="mt-4 text-lg leading-snug">{feature.text}</p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <MdArrowOutward className="h-5 w-5 flex-none rotate-90 opacity-70" aria-hidden="true" />
                {feature.examples.map((example) => (
                  <span key={example} className="bubble me !ml-0 !max-w-full">
                    {example}
                  </span>
                ))}
              </div>
            </div>
          </NotchCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
