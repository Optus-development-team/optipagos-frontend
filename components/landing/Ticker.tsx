import { Sparkle } from "@/components/doodles";
import { Marquee } from "@/components/ui/Marquee";
import type { Dictionary } from "@/i18n/dictionaries";

/** Cinta inclinada con las promesas del producto, deslizándose sin parar. */
export function Ticker({ t }: { t: Dictionary["ticker"] }) {
  return (
    <div className="-my-6 overflow-hidden py-6" aria-label={t.label}>
      <Marquee className="-mx-4 -rotate-[1.4deg] border-y-[2.5px] border-ink bg-ink py-3 text-cream">
        {t.words.map((word) => (
          <span key={word} className="flex items-center">
            <span className="display px-6 text-4xl sm:text-5xl">{word}</span>
            <Sparkle className="h-7 w-7 flex-none animate-twinkle text-honey" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
