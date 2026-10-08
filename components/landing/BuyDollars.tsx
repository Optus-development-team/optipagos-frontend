import { Burst, CurlyArrow, Sparkle, Star } from "@/components/doodles";
import { DoodleIcon, type DoodleIconName } from "@/components/icons";
import { NotchCard } from "@/components/ui/NotchCard";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

// Icono de cada paso; los textos vienen del diccionario, en el mismo orden.
const icons: DoodleIconName[] = ["cash", "qr", "coin"];

/** Compra de dólares digitales con bolivianos (Bs) pagando un QR Simple desde el banco. */
export function BuyDollars({ t, betaId }: { t: Dictionary["buy"]; betaId: string }) {
  return (
    <section id={t.id} className="scroll-mt-8">
      <Reveal effect="pop">
        <NotchCard
          corner="tr"
          tone="shell"
          notch={[92, 92]}
          chip={
            <span className="chip-tile tone-honey boil">
              <DoodleIcon name="qr" className="h-11 w-11" />
            </span>
          }
        >
          <div className="relative px-6 pb-10 pt-8 sm:px-12 sm:pb-12">
            {/* Adornos con movimiento continuo, sin depender del scroll */}
            <Sparkle className="absolute right-8 top-28 hidden h-8 w-8 animate-twinkle text-honey sm:block" />
            <Star className="absolute bottom-10 right-12 hidden h-6 w-6 animate-twinkle text-ink-400 [animation-delay:-1.4s] md:block" />
            <Burst className="absolute left-3 top-1/2 hidden h-7 w-7 animate-sway text-ochre lg:block" />
            <div className="pr-[88px]">
              <span className="pill honey animate-sway">{t.badge}</span>
              <p className="hand mt-3 text-2xl text-ink-600">{t.eyebrow}</p>
              <h2 className="display text-5xl sm:text-7xl">{t.title}</h2>
              <p className="mt-4 max-w-2xl text-xl leading-snug">{t.text}</p>
            </div>

            <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
              {t.steps.map((step, index) => (
                <li key={step.title} className="doodle-box relative flex flex-col p-6 pt-8">
                  <span
                    className="display absolute -top-5 left-5 grid h-12 w-12 place-items-center rounded-full border-[2.5px] border-ink bg-honey text-3xl"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  {index < t.steps.length - 1 ? (
                    <CurlyArrow className="draw absolute -right-9 top-8 z-10 hidden h-12 w-14 text-ochre md:block" />
                  ) : null}
                  <DoodleIcon
                    name={icons[index]}
                    className="h-14 w-14 animate-float [animation-duration:5s]"
                    style={{ animationDelay: `${index * -1.7}s` }}
                  />
                  <h3 className="display mt-3 text-3xl">{step.title}</h3>
                  <p className="mt-2 text-lg leading-snug">{step.text}</p>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a href={`#${betaId}`} className="btn btn-primary">
                {t.cta}
              </a>
              <p className="hand text-xl text-ink-600">{t.note}</p>
            </div>
          </div>
        </NotchCard>
      </Reveal>
    </section>
  );
}
