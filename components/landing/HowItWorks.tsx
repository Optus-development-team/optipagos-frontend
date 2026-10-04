import { CurlyArrow, Squiggle } from "@/components/doodles";
import { DoodleIcon, type DoodleIconName } from "@/components/icons";

const steps: Array<{ icon: DoodleIconName; title: string; text: string; tilt: string }> = [
  {
    icon: "message",
    title: "Escribe «hola»",
    text: "Abre WhatsApp y saluda a Optipagos. Te responde al toque con los pasos.",
    tilt: "-rotate-1",
  },
  {
    icon: "fingerprint",
    title: "Crea tu billetera",
    text: "Un toque con tu huella o tu rostro y listo. Sin contraseñas que recordar.",
    tilt: "rotate-1",
  },
  {
    icon: "send",
    title: "Mueve tu plata",
    text: "Envía a otros números, cobra con un QR y revisa tu saldo cuando quieras.",
    tilt: "-rotate-1",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="hand text-2xl text-ink-600">en tres pasos</p>
        <h2 className="display text-6xl sm:text-7xl">Así de fácil</h2>
        <Squiggle className="mx-auto mt-3 h-5 w-32 text-honey" />
      </div>

      <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
        {steps.map((step, index) => (
          <li key={step.title} className={`doodle-box relative p-6 pt-9 ${step.tilt}`}>
            <span
              className="display absolute -top-6 left-5 grid h-14 w-14 place-items-center rounded-full border-[2.5px] border-ink bg-honey text-4xl"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            {index < steps.length - 1 ? (
              <CurlyArrow className="absolute -right-9 top-8 z-10 hidden h-12 w-14 text-ochre md:block" />
            ) : null}
            <DoodleIcon name={step.icon} className="h-16 w-16" />
            <h3 className="display mt-4 text-4xl">{step.title}</h3>
            <p className="mt-2 text-lg leading-snug">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
