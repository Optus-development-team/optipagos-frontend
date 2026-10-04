import type { ReactNode } from "react";
import { MdArrowOutward } from "react-icons/md";
import { Coin, PaperPlane, Sparkle, Sun } from "@/components/doodles";
import { DoodleIcon, type DoodleIconName } from "@/components/icons";
import { NotchCard } from "@/components/ui/NotchCard";

interface Feature {
  icon: DoodleIconName;
  title: string;
  text: string;
  examples: string[];
  tone: "ink" | "cream" | "honey";
  corner: "tr" | "tl" | "br" | "bl";
  doodle: ReactNode;
}

const features: Feature[] = [
  {
    icon: "send",
    title: "Enviar",
    text: "Manda dinero a otro número de WhatsApp en segundos, a cualquier hora.",
    examples: ["enviar 10 a +591 7123 4567"],
    tone: "ink",
    corner: "tr",
    doodle: <PaperPlane className="h-9 w-9" />,
  },
  {
    icon: "cash",
    title: "Cobrar",
    text: "Crea un QR con el monto y compártelo. Te avisamos apenas te paguen.",
    examples: ["cobrar 25 por almuerzo"],
    tone: "cream",
    corner: "tr",
    doodle: <Coin className="h-9 w-9" />,
  },
  {
    icon: "wallet",
    title: "Recibir",
    text: "Tu QR personal, siempre a mano, para que te envíen cuando quieran.",
    examples: ["recibir"],
    tone: "honey",
    corner: "tr",
    doodle: <Sun className="h-10 w-10" />,
  },
  {
    icon: "list",
    title: "Tu saldo",
    text: "Mira cuánto tienes y todos tus movimientos, sin salir del chat.",
    examples: ["saldo", "movimientos"],
    tone: "cream",
    corner: "tr",
    doodle: <Sparkle className="h-9 w-9" />,
  },
];

export function Features() {
  return (
    <section id="que-puedes-hacer" className="scroll-mt-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="hand text-2xl text-ink-600">qué puedes hacer</p>
          <h2 className="display text-6xl sm:text-7xl">Todo desde el chat</h2>
        </div>
        <p className="max-w-sm text-lg leading-snug">
          Escribe como le escribirías a un amigo. Estos son algunos mensajes que Optipagos
          entiende.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <NotchCard
            key={feature.title}
            corner={feature.corner}
            tone={feature.tone}
            notch={[84, 84]}
            chip={
              <span
                className={`chip-tile ${feature.tone === "ink" ? "tone-honey" : feature.tone === "honey" ? "tone-ink" : ""}`}
              >
                {feature.doodle}
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
        ))}
      </div>
    </section>
  );
}
