import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos de servicio",
  description:
    "Las reglas para usar Optipagos: qué es, qué responsabilidades tienes con tu billetera y qué puedes esperar de nosotros.",
  alternates: { canonical: "/terminos" },
};

const mail = <a href={`mailto:${site.optus.email}`}>{site.optus.email}</a>;

const sections: LegalSection[] = [
  {
    id: "que-es",
    title: "Qué es Optipagos",
    body: (
      <>
        <p>
          Optipagos es una billetera de dólares digitales que se usa desde WhatsApp. Es una marca
          perteneciente a Optus, con domicilio en {site.optus.location}. Al crear tu billetera o
          usar el servicio aceptas estos términos y la{" "}
          <Link href="/privacidad">política de privacidad</Link>.
        </p>
        <p>
          Optipagos <strong>no es un banco</strong> ni una entidad financiera, y lo que guardas en
          tu billetera no es un depósito bancario.
        </p>
      </>
    ),
  },
  {
    id: "tu-billetera",
    title: "Tu billetera es tuya",
    body: (
      <>
        <p>
          La billetera se crea en tu teléfono y se protege con tu huella o tu rostro. Eso significa
          que <strong>solo tú puedes mover tu dinero</strong>: nosotros no lo guardamos, no podemos
          enviarlo en tu nombre y tampoco podemos congelarlo ni devolverlo.
        </p>
        <p>También significa que su cuidado depende de ti:</p>
        <ul>
          <li>Mantén tu teléfono protegido y no dejes que otra persona registre su huella en él.</li>
          <li>
            Si pides tu clave con «exportar clave», guárdala en un lugar seguro y no la compartas.
            Quien la tenga puede usar tu dinero.
          </li>
          <li>
            Si pierdes el acceso a tu teléfono y no tienes una copia de tu clave, no podremos
            recuperar tu billetera ni tu dinero.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "quien-puede-usarlo",
    title: "Quién puede usarlo",
    body: (
      <ul>
        <li>Debes ser mayor de 18 años y tener capacidad para contratar.</li>
        <li>Debes usar un número de WhatsApp que sea tuyo.</li>
        <li>Debes usar el servicio para fines lícitos y cumplir las normas que te apliquen.</li>
      </ul>
    ),
  },
  {
    id: "dolares-digitales",
    title: "Los dólares digitales",
    body: (
      <>
        <p>
          En Optipagos se usan dólares digitales llamados USDC, emitidos por un tercero
          independiente de Optus. Su valor busca mantenerse igual al del dólar estadounidense, pero
          esa equivalencia depende de su emisor y no la garantizamos.
        </p>
        <p>
          No ofrecemos cambio a bolivianos ni a otras monedas, ni asesoría financiera, tributaria o
          de inversión. Eres responsable de cumplir tus obligaciones tributarias.
        </p>
      </>
    ),
  },
  {
    id: "envios",
    title: "Envíos, cobros y comprobantes",
    body: (
      <ul>
        <li>
          Cada envío te muestra el monto y el destinatario antes de confirmarlo. Revísalos: una vez
          confirmado con tu huella, el envío <strong>no se puede deshacer</strong>.
        </li>
        <li>
          Si envías a una dirección externa equivocada o que no admite estos dólares digitales, el
          dinero puede perderse sin que podamos recuperarlo.
        </li>
        <li>Puede haber límites por operación, que te indicaremos en el chat.</li>
        <li>
          Hoy enviar no tiene comisión. Si eso cambia, te avisaremos antes y siempre verás el costo
          antes de confirmar.
        </li>
        <li>
          Los comprobantes informan lo ocurrido en tu billetera; no son facturas ni documentos
          fiscales.
        </li>
      </ul>
    ),
  },
  {
    id: "disponibilidad",
    title: "Disponibilidad del servicio",
    body: (
      <p>
        Trabajamos para que Optipagos esté disponible siempre, pero depende de WhatsApp y de redes
        y servicios de terceros que pueden demorarse o fallar. Podemos pausar el servicio para
        mantenimiento o por seguridad. Aunque el servicio no esté disponible, tu dinero sigue en tu
        billetera y puedes usarlo con tu clave en otra aplicación compatible.
      </p>
    ),
  },
  {
    id: "usos-prohibidos",
    title: "Lo que no está permitido",
    body: (
      <ul>
        <li>Usar Optipagos para actividades ilegales, fraudes o lavado de dinero.</li>
        <li>Hacerte pasar por otra persona o usar un número que no es tuyo.</li>
        <li>Intentar vulnerar la seguridad del servicio o interferir con su funcionamiento.</li>
        <li>Usar medios automáticos para enviar mensajes en masa al servicio.</li>
      </ul>
    ),
  },
  {
    id: "suspension",
    title: "Suspensión",
    body: (
      <p>
        Podemos limitar o suspender tu acceso al chat si incumples estos términos, si detectamos un
        riesgo para ti o para otros, o si una norma nos lo exige. La suspensión afecta al uso del
        servicio por WhatsApp; no nos da acceso a tu billetera ni a tu dinero.
      </p>
    ),
  },
  {
    id: "responsabilidad",
    title: "Responsabilidad",
    body: (
      <>
        <p>
          El servicio se ofrece tal como está. En la medida que la ley lo permita, Optus no
          responde por pérdidas causadas por:
        </p>
        <ul>
          <li>La pérdida, el robo o el mal uso de tu teléfono o de tu clave.</li>
          <li>Envíos confirmados por ti a destinatarios o direcciones equivocadas.</li>
          <li>Fallas de WhatsApp, de redes o de servicios de terceros.</li>
          <li>Cambios en el valor o la disponibilidad de los dólares digitales.</li>
        </ul>
        <p>Nada de esto limita los derechos que la ley te reconoce como consumidor.</p>
      </>
    ),
  },
  {
    id: "cambios",
    title: "Cambios en estos términos",
    body: (
      <p>
        Podemos actualizar estos términos. Si el cambio es importante te lo avisaremos por WhatsApp
        o en este sitio antes de que entre en vigencia. Si sigues usando Optipagos después de esa
        fecha, se entiende que aceptas la nueva versión.
      </p>
    ),
  },
  {
    id: "ley-y-contacto",
    title: "Ley aplicable y contacto",
    body: (
      <>
        <p>
          Estos términos se rigen por las leyes del Estado Plurinacional de Bolivia. Cualquier
          diferencia se resolverá ante los tribunales competentes de La Paz, Bolivia.
        </p>
        <p>
          ¿Dudas o reclamos? Escríbenos a {mail} o por WhatsApp. Queremos resolverlo contigo
          primero.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      icon="contract"
      eyebrow="las reglas, sin letra chica"
      title="Términos de servicio"
      summary={[
        "Tu billetera es tuya: solo tú puedes mover tu dinero, y nosotros no podemos recuperarlo por ti.",
        "Los envíos confirmados con tu huella no se pueden deshacer. Revisa siempre el monto y el destinatario.",
        "Optipagos no es un banco y hoy enviar no tiene comisión.",
      ]}
      updated="5 de octubre de 2026"
      sections={sections}
      other={{ href: "/privacidad", label: "Ver la política de privacidad" }}
    />
  );
}
