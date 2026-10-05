import { MdExpandMore } from "react-icons/md";
import { Flower } from "@/components/doodles";
import { Reveal } from "@/components/ui/Reveal";

const questions: Array<{ q: string; a: string }> = [
  {
    q: "¿Qué son los dólares digitales?",
    a: "Son dólares en formato digital (se llaman USDC): cada uno vale un dólar. Los guardas en tu billetera y los envías al instante, a cualquier hora.",
  },
  {
    q: "¿Tengo que instalar algo?",
    a: "No. Todo pasa en tu WhatsApp de siempre. Solo abrirás un enlace para confirmar con tu huella o tu rostro cuando crees tu billetera o envíes dinero.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Crear tu billetera es gratis y enviar dinero no tiene comisión.",
  },
  {
    q: "¿Cómo le envío a alguien?",
    a: "Escribe, por ejemplo, «enviar 10 a +591 7123 4567». Te llega el resumen con un enlace, lo confirmas con tu huella y listo. Si esa persona todavía no usa Optipagos, solo tiene que escribirnos «hola».",
  },
  {
    q: "¿Me dan un comprobante?",
    a: "Sí. Cada vez que envías o recibes dinero te llega el comprobante por WhatsApp, con su imagen para compartir y un enlace para verlo cuando quieras.",
  },
  {
    q: "¿Y si alguien agarra mi teléfono?",
    a: "Sin tu huella o tu rostro no se puede enviar nada. Los mensajes solos no mueven dinero: cada envío necesita que tú lo confirmes.",
  },
  {
    q: "¿Puedo llevarme mi dinero a otro lado?",
    a: "Sí. Tu billetera es tuya: escribe «exportar clave» y te la llevas a otra aplicación cuando quieras. Guarda esa clave en un lugar seguro y no la compartas.",
  },
];

/** Las mismas preguntas, para que los buscadores puedan mostrarlas. */
export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: questions.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export function Faq() {
  return (
    <section id="preguntas" className="scroll-mt-8">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <Reveal effect="left">
          <p className="hand text-2xl text-ink-600">por si acaso</p>
          <h2 className="display text-6xl sm:text-7xl">Preguntas de siempre</h2>
          <Flower className="mt-6 h-24 w-24 animate-wiggle text-ochre" />
        </Reveal>

        <div className="flex flex-col gap-4">
          {questions.map((item, index) => (
            <Reveal key={item.q} delay={index * 70}>
              <details className="doodle-box flat group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <MdExpandMore
                    className="h-7 w-7 flex-none transition-transform duration-300 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="details-body mt-3 text-lg leading-snug">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
