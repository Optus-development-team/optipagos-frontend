import type { ReactNode } from "react";
import { OptipagosMark } from "@/components/brand/marks";
import {
  Burst,
  Cloud,
  Coin,
  CurlyArrow,
  Heart,
  PaperPlane,
  Sparkle,
  Squiggle,
  Star,
  Sun,
  Underline,
} from "@/components/doodles";
import { DoodleIcon, type DoodleIconName } from "@/components/icons";
import { NotchCard } from "@/components/ui/NotchCard";

/**
 * Tarjetas de WhatsApp de Optipagos.
 *
 * Son las imágenes que acompañan a los mensajes del bot (bienvenida, billetera lista,
 * confirmar envío, pago enviado, dinero recibido) y la tarjeta de vista previa del sitio.
 * Se dibujan con los mismos componentes de la web, se muestran en /tarjetas/<nombre> y
 * `npm run cards` las captura como PNG en esta misma carpeta (assets/whatsapp/<nombre>.png).
 * El backend las pide por /media/whatsapp/<nombre>.png, las sube una vez a WhatsApp y
 * reutiliza su media id.
 *
 * Medida: 1200 × 630 (1.91:1), la que WhatsApp muestra completa en el encabezado de un
 * mensaje y la estándar de las vistas previas de enlaces.
 */
export const CARD_SIZE = { width: 1200, height: 630 } as const;

interface CardSpec {
  tone: "cream" | "ink" | "honey";
  chip: DoodleIconName;
  eyebrow: string;
  title: ReactNode;
  /** Tamaño del título si el texto necesita menos cuerpo para caber en dos líneas. */
  titleSize?: string;
  note: string;
  art: ReactNode;
}

/** El pajarito, grande, con sus garabatos alrededor. */
function Mascot({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <OptipagosMark className="h-[330px] w-[330px]" />
      <Sparkle className="absolute -left-10 top-4 h-14 w-14" />
      <Star className="absolute -right-6 bottom-10 h-11 w-11" />
      <Burst className="absolute -right-12 top-16 h-14 w-14 -scale-x-100" />
    </div>
  );
}

/** Icono doodle dentro de un sello redondo. */
function Seal({ icon, className = "" }: { icon: DoodleIconName; className?: string }) {
  return (
    <span
      className={`grid h-[300px] w-[300px] place-items-center rounded-full border-[6px] border-ink bg-honey text-ink ${className}`}
    >
      <DoodleIcon name={icon} className="h-[170px] w-[170px]" />
    </span>
  );
}

const marked = (word: string, color = "text-honey") => (
  <span className="relative inline-block whitespace-nowrap">
    {word}
    <Underline className={color} />
  </span>
);

export const cards = {
  bienvenida: {
    tone: "cream",
    chip: "wave",
    eyebrow: "hola, soy",
    title: <span className="wordmark normal-case tracking-normal">optipagos</span>,
    note: "tu billetera de dólares digitales en WhatsApp",
    art: <Mascot />,
  },
  "billetera-lista": {
    tone: "honey",
    chip: "tick",
    eyebrow: "bien hecho",
    title: (
      <>
        ¡Billetera
        <br />
        {marked("lista", "text-ink")}!
      </>
    ),
    note: "ya puedes recibir y enviar dinero",
    art: (
      <div className="relative">
        <Seal icon="wallet" className="!bg-cream" />
        <Sparkle className="absolute -left-12 -top-2 h-16 w-16" />
        <Heart className="absolute -right-8 bottom-2 h-12 w-12 rotate-12" />
      </div>
    ),
  },
  "confirmar-envio": {
    tone: "cream",
    chip: "lock",
    eyebrow: "un toque y listo",
    titleSize: "text-[112px]",
    title: (
      <>
        Confirma con
        <br />
        tu {marked("huella")}
      </>
    ),
    note: "solo tú puedes autorizar este envío",
    art: (
      <div className="relative">
        <Seal icon="fingerprint" />
        <CurlyArrow className="absolute -left-24 top-24 h-24 w-28 text-ochre" />
        <Sparkle className="absolute -right-8 -top-4 h-14 w-14" />
      </div>
    ),
  },
  "pago-enviado": {
    tone: "ink",
    chip: "tick",
    eyebrow: "listo",
    title: (
      <>
        ¡Pago
        <br />
        {marked("enviado")}!
      </>
    ),
    note: "tu dinero ya llegó a su destino",
    art: (
      <div className="relative text-honey">
        <PaperPlane className="h-[300px] w-[300px] -rotate-6" strokeWidth={3.5} />
        <Squiggle className="absolute -left-24 bottom-12 h-10 w-44 text-cream" strokeWidth={3} />
        <Cloud className="absolute -right-6 -top-6 h-24 w-24 text-ink-300" />
      </div>
    ),
  },
  "dinero-recibido": {
    tone: "honey",
    chip: "coin",
    eyebrow: "buenas noticias",
    title: (
      <>
        ¡Te llegó
        <br />
        {marked("dinero", "text-ink")}!
      </>
    ),
    note: "ya está en tu billetera",
    art: (
      <div className="relative">
        <Coin className="h-[280px] w-[280px]" strokeWidth={3.5} />
        <Coin className="absolute -left-24 bottom-0 h-28 w-28 -rotate-12" />
        <Sun className="absolute -right-10 -top-8 h-24 w-24" />
      </div>
    ),
  },
  /** Vista previa del enlace del sitio (Open Graph). */
  og: {
    tone: "cream",
    chip: "send",
    eyebrow: "optipagos",
    titleSize: "text-[96px]",
    title: (
      <>
        Tu plata viaja
        <br />
        por {marked("WhatsApp")}
      </>
    ),
    note: "envía, recibe y cobra dólares digitales chateando",
    art: <Mascot />,
  },
} satisfies Record<string, CardSpec>;

export type CardName = keyof typeof cards;

export const cardNames = Object.keys(cards) as CardName[];

export function WhatsAppCard({ name }: { name: CardName }) {
  const card: CardSpec = cards[name];
  const dark = card.tone === "ink";
  return (
    <div
      id="tarjeta"
      className="relative overflow-hidden bg-shell p-9 text-ink [background-image:radial-gradient(rgb(0_65_106/0.12)_1.6px,transparent_1.8px)] [background-size:30px_30px]"
      style={CARD_SIZE}
    >
      <NotchCard
        corner="tr"
        tone={card.tone}
        notch={[150, 150]}
        radius={48}
        className="h-full [--gap:18px]"
        chip={
          <span className={`chip-tile ${dark ? "tone-honey" : card.tone === "honey" ? "tone-ink" : "tone-honey"}`}>
            <DoodleIcon name={card.chip} className="h-[72px] w-[72px]" />
          </span>
        }
      >
        <div className="flex h-full items-center gap-6 px-16">
          <div className="flex min-w-0 flex-1 flex-col">
            <p className={`hand text-[46px] leading-none ${dark ? "text-honey" : "text-ink-600"}`}>
              {card.eyebrow}
            </p>
            <h1 className={`display mt-3 leading-[0.9] ${card.titleSize ?? "text-[132px]"}`}>
              {card.title}
            </h1>
            <p className="hand mt-7 max-w-[560px] text-[40px] leading-[1.05] opacity-90">
              {card.note}
            </p>
          </div>
          <div className="flex w-[400px] flex-none items-center justify-center pt-16">
            {card.art}
          </div>
        </div>
      </NotchCard>
    </div>
  );
}
