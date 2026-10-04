import { MdArrowOutward, MdWhatsapp } from "react-icons/md";
import { OptipagosMark } from "@/components/brand/marks";
import { Burst, CurlyArrow, Heart, Sparkle, Star, Underline } from "@/components/doodles";
import { DoodleIcon } from "@/components/icons";
import { NotchCard } from "@/components/ui/NotchCard";
import { site } from "@/lib/site";

/** "+591 77379190" a partir de los dígitos configurados. */
function prettyNumber(digits: string): string {
  if (!digits) return "en WhatsApp";
  return digits.startsWith("591") ? `+591 ${digits.slice(3)}` : `+${digits}`;
}

export function Hero() {
  return (
    <section className="grid items-stretch gap-6 pt-2 lg:grid-cols-[1.12fr_0.88fr]">
      {/* Mensaje principal */}
      <NotchCard
        corner="tr"
        notch={[96, 96]}
        chip={
          <a
            href={site.whatsappUrl()}
            className="chip-tile tone-honey"
            aria-label="Abrir Optipagos en WhatsApp"
          >
            <MdArrowOutward className="h-9 w-9" aria-hidden="true" />
          </a>
        }
      >
        <div className="flex h-full flex-col px-6 pb-8 pt-7 sm:px-10 sm:pb-10 sm:pt-9">
          <div className="flex min-h-[64px] flex-wrap content-start items-start gap-2 pr-[88px]">
            <span className="pill">Sin instalar nada</span>
            <span className="pill honey">Desde tu WhatsApp</span>
          </div>

          <h1 className="display mt-6 text-[clamp(3.6rem,11vw,7rem)]">
            Tu plata viaja por{" "}
            <span className="relative inline-block whitespace-nowrap">
              WhatsApp
              <Underline className="text-honey" />
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed sm:text-xl">
            Envía, recibe y cobra dólares digitales chateando. Sin apps nuevas, sin filas y sin
            enredos.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
            <a href={site.whatsappUrl()} className="btn btn-primary">
              <MdWhatsapp className="h-6 w-6" aria-hidden="true" />
              Empezar en WhatsApp
            </a>
            <a href="#como-funciona" className="btn btn-ghost">
              Cómo funciona
            </a>
          </div>

          <p className="hand mt-7 flex items-end gap-2 text-2xl text-ink-600">
            <CurlyArrow className="h-12 w-14 -rotate-[100deg] -scale-x-100 text-ochre" />
            <span className="-rotate-2">solo escribe «hola»</span>
          </p>
        </div>
      </NotchCard>

      {/* El chat, dibujado */}
      <NotchCard
        corner="bl"
        tone="ink"
        notch={[188, 68]}
        chip={<span className="chip-tile px-2 text-xl">{prettyNumber(site.whatsappNumber)}</span>}
      >
        <div className="relative flex h-full flex-col px-5 pb-[92px] pt-7 sm:px-7">
          <Sparkle className="absolute right-5 top-5 h-8 w-8 animate-wiggle text-honey" />
          <Star className="absolute bottom-24 right-6 h-6 w-6 text-ink-300" />
          <Heart className="absolute bottom-5 right-24 hidden h-6 w-6 -rotate-12 text-honey sm:block" />

          <div className="flex items-center gap-3">
            <span className="grid h-14 w-14 flex-none place-items-center rounded-full bg-honey text-ink">
              <OptipagosMark className="h-10 w-10" />
            </span>
            <div className="leading-tight">
              <p className="wordmark text-3xl">optipagos</p>
              <p className="hand text-lg text-ink-200">tu billetera en el chat</p>
            </div>
          </div>

          <div className="mt-6 flex flex-1 flex-col justify-center gap-3">
            <p className="bubble me">enviar 20 a +591 7123 4567</p>
            <p className="bubble flex items-center gap-2">
              <DoodleIcon name="fingerprint" className="h-7 w-5 flex-none" />
              Confirma con tu huella
            </p>
            <p className="bubble flex items-center gap-2">
              <DoodleIcon name="tick" className="h-5 w-6 flex-none text-moss" />
              Listo. Enviaste 20 USDC
            </p>
            <p className="bubble me">saldo</p>
            <p className="bubble flex items-center gap-2">
              <DoodleIcon name="coin" className="h-6 w-6 flex-none" />
              Tu saldo es 80 USDC
            </p>
          </div>
          <Burst className="absolute -left-1 top-[42%] hidden h-8 w-8 text-honey sm:block" />
        </div>
      </NotchCard>

      {/* Tira de etiquetas, como en la referencia de formas */}
      <div className="flex flex-col items-center gap-4 lg:col-span-2">
        <ul className="flex flex-wrap justify-center gap-2.5">
          {["Rápido", "Simple", "Seguro", "Tuyo"].map((word) => (
            <li key={word} className="pill text-xl">
              {word}
            </li>
          ))}
        </ul>
        <p className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-center">
          <strong>Ideal para:</strong>
          {["Mandar plata a la familia", "Cobrar en tu negocio", "Dividir cuentas"].map((use) => (
            <span key={use} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-ink" aria-hidden="true" />
              {use}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
