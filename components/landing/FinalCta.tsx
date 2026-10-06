import { MdArrowOutward, MdWhatsapp } from "react-icons/md";
import { OptipagosMark } from "@/components/brand/marks";
import { Cloud, Sparkle, Star } from "@/components/doodles";
import { NotchCard } from "@/components/ui/NotchCard";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";

export function FinalCta({ t, openAria }: { t: Dictionary["finalCta"]; openAria: string }) {
  return (
    <section>
      <Reveal effect="pop">
      <NotchCard
        corner="br"
        tone="honey"
        notch={[96, 96]}
        chip={
          <a
            href={site.whatsappUrl()}
            className="chip-tile tone-ink boil"
            aria-label={openAria}
          >
            <MdArrowOutward className="h-9 w-9" aria-hidden="true" />
          </a>
        }
      >
        <div className="relative grid items-center gap-8 px-6 pb-12 pt-9 sm:px-12 md:grid-cols-[1fr_auto]">
          <Cloud className="absolute right-8 top-5 hidden h-16 w-16 animate-drift text-ink-400 md:block" />
          <div>
            <p className="hand text-2xl text-ink-600">{t.eyebrow}</p>
            <h2 className="display text-6xl sm:text-8xl">{t.title}</h2>
            <p className="mt-4 max-w-xl text-xl leading-snug">
              {t.text}
            </p>
            <a href={site.whatsappUrl()} className="btn btn-primary mt-7">
              <MdWhatsapp className="h-6 w-6" aria-hidden="true" />
              {t.cta}
            </a>
          </div>
          <div className="relative mx-auto mr-0 hidden pr-16 md:block">
            <OptipagosMark className="h-52 w-52 animate-float" />
            <Sparkle className="absolute -left-4 top-2 h-8 w-8 animate-twinkle text-ink" />
            <Star className="absolute bottom-6 right-8 h-6 w-6 text-ink-600" />
          </div>
        </div>
      </NotchCard>
      </Reveal>
    </section>
  );
}
