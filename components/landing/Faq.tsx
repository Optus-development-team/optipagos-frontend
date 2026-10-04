import { MdExpandMore } from "react-icons/md";
import { Flower } from "@/components/doodles";

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
    a: "Escribe, por ejemplo, «enviar 10 a +591 7123 4567». Te mostramos el resumen, lo confirmas con tu huella y listo. Si esa persona todavía no usa Optipagos, solo tiene que escribirnos «hola».",
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

export function Faq() {
  return (
    <section id="preguntas" className="scroll-mt-8">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div>
          <p className="hand text-2xl text-ink-600">por si acaso</p>
          <h2 className="display text-6xl sm:text-7xl">Preguntas de siempre</h2>
          <Flower className="mt-6 h-24 w-24 animate-wiggle text-ochre" />
        </div>

        <div className="flex flex-col gap-4">
          {questions.map((item) => (
            <details key={item.q} className="doodle-box flat group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                {item.q}
                <MdExpandMore
                  className="h-7 w-7 flex-none transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 text-lg leading-snug">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
