import { Burst, Heart, Swirl } from "@/components/doodles";
import { DoodleIcon, type DoodleIconName } from "@/components/icons";
import { NotchCard } from "@/components/ui/NotchCard";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

// Icono de cada punto; los textos vienen del diccionario, en el mismo orden.
const icons: DoodleIconName[] = ["fingerprint", "lock", "key"];

export function Safety({ t, id }: { t: Dictionary["safety"]; id: string }) {
  const points = t.points.map((point, index) => ({ ...point, icon: icons[index] }));

  return (
    <section id={id} className="scroll-mt-8">
      <Reveal effect="pop">
      <NotchCard
        corner="tl"
        tone="ink"
        notch={[92, 92]}
        chip={
          <span className="chip-tile tone-honey boil">
            <DoodleIcon name="shield" className="h-11 w-11 animate-sway" />
          </span>
        }
      >
        <div className="relative px-6 pb-10 pt-8 sm:px-12 sm:pb-12">
          <Swirl className="absolute right-6 top-6 hidden h-16 w-16 animate-spin-slow text-ink-500 sm:block" />
          <Heart className="absolute bottom-6 right-10 hidden h-7 w-7 rotate-12 animate-hop text-honey md:block" />

          <div className="pl-[88px] sm:pl-[72px]">
            <p className="hand text-2xl text-honey">{t.eyebrow}</p>
            <h2 className="display text-5xl sm:text-7xl">{t.title}</h2>
          </div>

          <ul className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            {points.map((point, index) => (
              <li
                key={point.title}
                className="relative animate-float [animation-duration:7s]"
                style={{ animationDelay: `${index * -2.3}s` }}
              >
                <span className="grid h-20 w-20 place-items-center rounded-full bg-cream text-ink">
                  <DoodleIcon name={point.icon} className="h-11 w-11" />
                </span>
                <h3 className="display mt-4 flex items-center gap-2 text-4xl">
                  {point.title}
                  <Burst className="h-6 w-6 flex-none -scale-x-100 text-honey" />
                </h3>
                <p className="mt-2 text-lg leading-snug text-ink-100">{point.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </NotchCard>
      </Reveal>
    </section>
  );
}
