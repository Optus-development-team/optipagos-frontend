import Link from "next/link";
import type { LegalDocument, LegalSection } from "@/components/legal/LegalPage";
import { href, type Locale } from "@/i18n/config";
import { site } from "@/lib/site";

/** Términos de servicio, en cada idioma. La página (app/[lang]/(site)/terms) solo los pinta. */
const mail = <a href={`mailto:${site.optus.email}`}>{site.optus.email}</a>;

const sectionsEs: LegalSection[] = [
  {
    id: "que-es",
    title: "Qué es Optipagos",
    body: (
      <>
        <p>
          Optipagos es una billetera de dólares digitales que se usa desde WhatsApp. Es una marca
          perteneciente a Optus, con domicilio en {site.optus.location}. Al crear tu billetera o
          usar el servicio aceptas estos términos y la{" "}
          <Link href={href("privacy", "es")}>política de privacidad</Link>.
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

const sectionsEn: LegalSection[] = [
  {
    id: "what-it-is",
    title: "What Optipagos is",
    body: (
      <>
        <p>
          Optipagos is a digital-dollar wallet that you use from WhatsApp. It is a brand owned by
          Optus, based in {site.optus.location}. By creating your wallet or using the service you
          accept these terms and the <Link href={href("privacy", "en")}>privacy policy</Link>.
        </p>
        <p>
          Optipagos <strong>is not a bank</strong> or a financial institution, and what you keep in
          your wallet is not a bank deposit.
        </p>
      </>
    ),
  },
  {
    id: "your-wallet",
    title: "Your wallet is yours",
    body: (
      <>
        <p>
          The wallet is created on your phone and protected with your fingerprint or your face.
          That means <strong>only you can move your money</strong>: we do not hold it, we cannot
          send it on your behalf, and we cannot freeze or return it either.
        </p>
        <p>It also means that looking after it is up to you:</p>
        <ul>
          <li>Keep your phone protected and do not let anyone else register their fingerprint on it.</li>
          <li>
            If you ask for your key with «exportar clave», keep it somewhere safe and do not share
            it. Whoever has it can use your money.
          </li>
          <li>
            If you lose access to your phone and have no copy of your key, we will not be able to
            recover your wallet or your money.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "who-can-use-it",
    title: "Who can use it",
    body: (
      <ul>
        <li>You must be over 18 and legally able to enter into a contract.</li>
        <li>You must use a WhatsApp number that is yours.</li>
        <li>You must use the service for lawful purposes and follow the rules that apply to you.</li>
      </ul>
    ),
  },
  {
    id: "digital-dollars",
    title: "Digital dollars",
    body: (
      <>
        <p>
          Optipagos uses digital dollars called USDC, issued by a third party independent of Optus.
          Their value aims to stay equal to that of the US dollar, but that parity depends on the
          issuer and we do not guarantee it.
        </p>
        <p>
          We do not offer exchange into bolivianos or other currencies, nor financial, tax or
          investment advice. You are responsible for meeting your tax obligations.
        </p>
      </>
    ),
  },
  {
    id: "transfers",
    title: "Transfers, charges and receipts",
    body: (
      <ul>
        <li>
          Every transfer shows you the amount and the recipient before you confirm it. Check them:
          once confirmed with your fingerprint, the transfer <strong>cannot be undone</strong>.
        </li>
        <li>
          If you send to an external address that is wrong or that does not support these digital
          dollars, the money may be lost without us being able to recover it.
        </li>
        <li>There may be limits per operation, which we will tell you about in the chat.</li>
        <li>
          Today sending has no fee. If that changes, we will let you know beforehand and you will
          always see the cost before confirming.
        </li>
        <li>
          Receipts report what happened in your wallet; they are not invoices or tax documents.
        </li>
      </ul>
    ),
  },
  {
    id: "availability",
    title: "Service availability",
    body: (
      <p>
        We work to keep Optipagos available at all times, but it depends on WhatsApp and on
        third-party networks and services that can be delayed or fail. We may pause the service
        for maintenance or for security. Even when the service is unavailable, your money is still
        in your wallet and you can use it with your key in another compatible app.
      </p>
    ),
  },
  {
    id: "prohibited-uses",
    title: "What is not allowed",
    body: (
      <ul>
        <li>Using Optipagos for illegal activities, fraud or money laundering.</li>
        <li>Impersonating someone else or using a number that is not yours.</li>
        <li>Trying to breach the security of the service or interfere with how it works.</li>
        <li>Using automated means to send bulk messages to the service.</li>
      </ul>
    ),
  },
  {
    id: "suspension",
    title: "Suspension",
    body: (
      <p>
        We may limit or suspend your access to the chat if you breach these terms, if we detect a
        risk to you or to others, or if a law requires it. Suspension affects the use of the
        service over WhatsApp; it does not give us access to your wallet or your money.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Liability",
    body: (
      <>
        <p>
          The service is provided as is. To the extent the law allows, Optus is not liable for
          losses caused by:
        </p>
        <ul>
          <li>The loss, theft or misuse of your phone or your key.</li>
          <li>Transfers you confirmed to the wrong recipients or addresses.</li>
          <li>Failures of WhatsApp, networks or third-party services.</li>
          <li>Changes in the value or availability of digital dollars.</li>
        </ul>
        <p>None of this limits the rights the law gives you as a consumer.</p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these terms. If the change is important we will let you know on WhatsApp or
        on this site before it takes effect. If you keep using Optipagos after that date, you are
        understood to accept the new version.
      </p>
    ),
  },
  {
    id: "law-and-contact",
    title: "Governing law and contact",
    body: (
      <>
        <p>
          These terms are governed by the laws of the Plurinational State of Bolivia. Any dispute
          will be resolved before the competent courts of La Paz, Bolivia.
        </p>
        <p>
          Questions or complaints? Write to us at {mail} or on WhatsApp. We want to sort it out
          with you first.
        </p>
      </>
    ),
  },
];

export const terms: Record<Locale, LegalDocument> = {
  es: {
    title: "Términos de servicio",
    description:
      "Las reglas para usar Optipagos: qué es, qué responsabilidades tienes con tu billetera y qué puedes esperar de nosotros.",
    eyebrow: "las reglas, sin letra chica",
    summary: [
      "Tu billetera es tuya: solo tú puedes mover tu dinero, y nosotros no podemos recuperarlo por ti.",
      "Los envíos confirmados con tu huella no se pueden deshacer. Revisa siempre el monto y el destinatario.",
      "Optipagos no es un banco y hoy enviar no tiene comisión.",
    ],
    updated: "5 de octubre de 2026",
    sections: sectionsEs,
  },
  en: {
    title: "Terms of service",
    description:
      "The rules for using Optipagos: what it is, what responsibilities you have for your wallet and what you can expect from us.",
    eyebrow: "the rules, no fine print",
    summary: [
      "Your wallet is yours: only you can move your money, and we cannot recover it for you.",
      "Transfers confirmed with your fingerprint cannot be undone. Always check the amount and the recipient.",
      "Optipagos is not a bank and today sending has no fee.",
    ],
    updated: "October 5, 2026",
    sections: sectionsEn,
  },
};
