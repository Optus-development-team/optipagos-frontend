import { CurlyArrow, Squiggle } from "@/components/doodles";
import { DoodleIcon, type DoodleIconName } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

// Icono e inclinación de cada paso; los textos vienen del diccionario, en el mismo orden.
const looks: Array<{ icon: DoodleIconName; tilt: string }> = [
  { icon: "message", tilt: "-rotate-1" },
  { icon: "fingerprint", tilt: "rotate-1" },
  { icon: "send", tilt: "-rotate-1" },
];

export function HowItWorks({ t, id }: { t: Dictionary["how"]; id: string }) {
  const steps = t.steps.map((step, index) => ({ ...step, ...looks[index] }));

  return (
    <section id={id} className="scroll-mt-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="hand text-2xl text-ink-600">{t.eyebrow}</p>
        <h2 className="display text-6xl sm:text-7xl">{t.title}</h2>
        <Squiggle className="draw mx-auto mt-3 h-5 w-32 text-honey" />
      </Reveal>

      <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
        {steps.map((step, index) => (
          <Reveal as="li" key={step.title} effect="tilt" delay={index * 140}>
            <div className={`doodle-box lively relative h-full p-6 pt-9 ${step.tilt}`}>
              <span
                className="display absolute -top-6 left-5 grid h-14 w-14 place-items-center rounded-full border-[2.5px] border-ink bg-honey text-4xl"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              {index < steps.length - 1 ? (
                <CurlyArrow className="draw absolute -right-9 top-8 z-10 hidden h-12 w-14 text-ochre md:block" />
              ) : null}
              <DoodleIcon name={step.icon} className="lively-icon h-16 w-16" />
              <h3 className="display mt-4 text-4xl">{step.title}</h3>
              <p className="mt-2 text-lg leading-snug">{step.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
