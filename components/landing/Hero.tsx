import { MdArrowOutward, MdWhatsapp } from "react-icons/md";
import { OptipagosMark } from "@/components/brand/marks";
import { Burst, CurlyArrow, Heart, Sparkle, Star, Underline } from "@/components/doodles";
import { DoodleIcon } from "@/components/icons";
import { NotchCard } from "@/components/ui/NotchCard";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="grid items-stretch gap-6 pt-2 lg:grid-cols-[1.12fr_0.88fr]">
      {/* Mensaje principal */}
      <NotchCard
        corner="tr"
        notch={[96, 96]}
        className="animate-rise"
        chip={
          <a
            href={site.whatsappUrl()}
            className="chip-tile tone-honey boil"
            aria-label="Abrir Optipagos en WhatsApp"
          >
            <MdArrowOutward className="h-9 w-9" aria-hidden="true" />
          </a>
        }
      >
        <div className="flex h-full flex-col px-6 pb-8 pt-7 sm:px-10 sm:pb-10 sm:pt-9">
          <div className="flex min-h-[64px] flex-wrap content-start items-start gap-2 pr-[88px]">
            <span className="pill animate-sway">Sin instalar nada</span>
            <span className="pill honey animate-sway [animation-delay:-3s]">Desde tu WhatsApp</span>
          </div>

          <h1 className="display mt-6 text-[clamp(3.6rem,11vw,7rem)]">
            Tu plata viaja por{" "}
            <span className="relative inline-block whitespace-nowrap">
              WhatsApp
              <Underline className="draw text-honey [--draw-delay:0.7s]" />
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
            <CurlyArrow className="draw h-12 w-14 -rotate-[100deg] -scale-x-100 text-ochre [--draw-delay:1.4s]" />
            <span className="-rotate-2">solo escribe «hola»</span>
          </p>
        </div>
      </NotchCard>

      {/* El chat, dibujado */}
      <NotchCard
        corner="bl"
        tone="ink"
        notch={[188, 68]}
        className="animate-rise [animation-delay:0.15s]"
        chip={
          <span className="chip-tile px-2 text-xl">
            {site.whatsappDisplay || "en WhatsApp"}
          </span>
        }
      >
        <div className="relative flex h-full flex-col px-5 pb-[92px] pt-7 sm:px-7">
          <Sparkle className="absolute right-5 top-5 h-8 w-8 animate-twinkle text-honey" />
          <Star className="absolute bottom-24 right-6 h-6 w-6 animate-twinkle text-ink-300 [animation-delay:-1.2s]" />
          <Heart className="absolute bottom-5 right-24 hidden h-6 w-6 -rotate-12 animate-hop text-honey sm:block" />

          <div className="flex items-center gap-3">
            <span className="grid h-14 w-14 flex-none animate-float place-items-center rounded-full bg-honey text-ink">
              <OptipagosMark className="h-10 w-10" />
            </span>
            <div className="leading-tight">
              <p className="wordmark text-3xl">optipagos</p>
              <p className="hand text-lg text-ink-200">tu billetera en el chat</p>
            </div>
          </div>

          <div className="chat-in mt-6 flex flex-1 flex-col justify-center gap-3">
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

      <p className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-center lg:col-span-2">
        <strong>Ideal para:</strong>
        {["Mandar plata a la familia", "Cobrar en tu negocio", "Dividir cuentas"].map((use) => (
          <span key={use} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-ink" aria-hidden="true" />
            {use}
          </span>
        ))}
      </p>
    </section>
  );
}
