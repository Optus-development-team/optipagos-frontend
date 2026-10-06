import type { LegalDocument, LegalSection } from "@/components/legal/LegalPage";
import type { Locale } from "@/i18n/config";
import { site } from "@/lib/site";

/** Política de privacidad, en cada idioma. La página (app/[lang]/(site)/privacy) solo la pinta. */
const mail = <a href={`mailto:${site.optus.email}`}>{site.optus.email}</a>;

const sectionsEs: LegalSection[] = [
  {
    id: "quienes-somos",
    title: "Quiénes somos",
    body: (
      <>
        <p>
          Optipagos es una marca perteneciente a Optus, con domicilio en {site.optus.location}. Optus
          es responsable de los datos personales que se tratan al usar Optipagos por WhatsApp y en
          este sitio.
        </p>
        <p>Para cualquier consulta sobre tus datos puedes escribirnos a {mail}.</p>
      </>
    ),
  },
  {
    id: "datos",
    title: "Qué datos usamos",
    body: (
      <>
        <p>Solo usamos lo necesario para que el servicio funcione:</p>
        <ul>
          <li>
            <strong>Tu número de WhatsApp y tu nombre de perfil</strong>, que recibimos cuando nos
            escribes.
          </li>
          <li>
            <strong>Tus mensajes con Optipagos</strong>: lo que nos escribes y lo que te
            respondemos, para atender tus pedidos y avisarte de tus operaciones.
          </li>
          <li>
            <strong>Los datos de tu billetera</strong>: su dirección pública y tus movimientos
            (monto, fecha y con quién fue cada envío, cobro o pago recibido).
          </li>
          <li>
            <strong>Los datos para abrirla con tu huella o tu rostro</strong>: una llave pública de
            tu teléfono y la clave de tu billetera cifrada, que solo tu teléfono puede abrir.
          </li>
          <li>
            <strong>Tu correo de Google</strong>, únicamente si decides vincular tu cuenta.
          </li>
          <li>
            <strong>Registros de seguridad</strong>: fecha y hora de las acciones importantes
            (crear la billetera, confirmar un envío, ver tu clave).
          </li>
        </ul>
        <h3>Lo que nunca recibimos</h3>
        <ul>
          <li>Tu huella o tu rostro: no salen de tu teléfono.</li>
          <li>La clave de tu billetera sin cifrar: solo existe en tu teléfono.</li>
        </ul>
      </>
    ),
  },
  {
    id: "para-que",
    title: "Para qué los usamos",
    body: (
      <ul>
        <li>Crear tu billetera y permitirte enviar, recibir y cobrar.</li>
        <li>Avisarte por WhatsApp de lo que pasa con tu dinero y entregarte tus comprobantes.</li>
        <li>Proteger tu cuenta y prevenir fraudes o usos indebidos.</li>
        <li>Atender tus consultas y mejorar el servicio.</li>
        <li>Cumplir las obligaciones legales que nos correspondan.</li>
      </ul>
    ),
  },
  {
    id: "registro-publico",
    title: "Movimientos y registro público",
    body: (
      <>
        <p>
          Los envíos de dólares digitales quedan anotados en un registro público que no depende de
          nosotros y que no se puede modificar ni borrar. En ese registro figuran direcciones de
          billeteras, montos y fechas, pero no tu nombre ni tu número de teléfono.
        </p>
        <p>
          Cada movimiento tiene además un <strong>comprobante</strong> con un enlace propio.
          Cualquier persona que tenga ese enlace puede verlo: muestra el monto, la fecha y los
          nombres visibles de quien envía y quien recibe (los teléfonos aparecen ocultos en parte).
          Compártelo solo con quien quieras que lo vea.
        </p>
      </>
    ),
  },
  {
    id: "con-quien",
    title: "Con quién los compartimos",
    body: (
      <>
        <p>No vendemos tus datos. Los compartimos solo con quienes hacen posible el servicio:</p>
        <ul>
          <li>
            <strong>Meta (WhatsApp)</strong>, por donde viajan tus mensajes con Optipagos.
          </li>
          <li>
            <strong>Proveedores de infraestructura</strong> que alojan el servicio y su base de
            datos, y que tratan los datos siguiendo nuestras instrucciones.
          </li>
          <li>
            <strong>Google</strong>, únicamente si vinculas tu cuenta para recuperar el acceso.
          </li>
          <li>
            <strong>Autoridades</strong>, cuando una norma o una orden válida nos obligue.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cuanto-tiempo",
    title: "Cuánto tiempo los guardamos",
    body: (
      <p>
        Guardamos tus datos mientras uses Optipagos y, después, el tiempo que exijan las normas
        aplicables o que haga falta para resolver reclamos. Lo anotado en el registro público de
        movimientos permanece ahí de forma indefinida, porque nadie puede eliminarlo.
      </p>
    ),
  },
  {
    id: "tus-derechos",
    title: "Tus derechos",
    body: (
      <>
        <p>Puedes pedirnos en cualquier momento:</p>
        <ul>
          <li>Saber qué datos tuyos tenemos y recibir una copia.</li>
          <li>Corregir datos que estén mal.</li>
          <li>Eliminar los datos que guardamos sobre ti, salvo los que debamos conservar por ley.</li>
          <li>Desvincular tu cuenta de Google.</li>
        </ul>
        <p>
          Escríbenos a {mail} desde un medio que nos permita confirmar que eres tú. Respondemos en un
          plazo razonable. Recuerda que tu billetera es tuya: antes de pedir que eliminemos tus
          datos, llévate tu clave escribiendo «exportar clave», porque sin ella no podremos
          ayudarte a recuperar tu dinero.
        </p>
      </>
    ),
  },
  {
    id: "seguridad",
    title: "Cómo los protegemos",
    body: (
      <p>
        La clave de tu billetera se guarda cifrada y solo tu teléfono puede abrirla. Cada operación
        sensible se confirma con tu huella o tu rostro mediante un enlace de un solo uso que vence
        a los pocos minutos. Aun así, ningún sistema es infalible: cuida tu teléfono y no compartas
        tu clave con nadie. Optipagos nunca te la pedirá.
      </p>
    ),
  },
  {
    id: "sitio",
    title: "Este sitio web",
    body: (
      <p>
        Este sitio no usa cookies de publicidad ni herramientas que te sigan por otras páginas.
        Solo guarda una cookie propia, «lang», para recordar el idioma que elegiste. Las páginas
        para confirmar operaciones funcionan sin servicios de terceros.
      </p>
    ),
  },
  {
    id: "menores",
    title: "Menores de edad",
    body: (
      <p>
        Optipagos está pensado para personas mayores de 18 años. Si crees que un menor nos ha dado
        sus datos, escríbenos y los eliminaremos.
      </p>
    ),
  },
  {
    id: "cambios",
    title: "Cambios en esta política",
    body: (
      <p>
        Si cambiamos algo importante te lo avisaremos por WhatsApp o en este sitio antes de que
        entre en vigencia. La fecha de arriba indica la versión vigente.
      </p>
    ),
  },
];

const sectionsEn: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          Optipagos is a brand owned by Optus, based in {site.optus.location}. Optus is responsible
          for the personal data processed when you use Optipagos over WhatsApp and on this site.
        </p>
        <p>For any question about your data you can write to us at {mail}.</p>
      </>
    ),
  },
  {
    id: "data",
    title: "What data we use",
    body: (
      <>
        <p>We only use what the service needs in order to work:</p>
        <ul>
          <li>
            <strong>Your WhatsApp number and profile name</strong>, which we receive when you
            write to us.
          </li>
          <li>
            <strong>Your messages with Optipagos</strong>: what you write to us and what we reply,
            to handle your requests and tell you about your operations.
          </li>
          <li>
            <strong>Your wallet data</strong>: its public address and your activity (amount, date
            and who each transfer, charge or incoming payment was with).
          </li>
          <li>
            <strong>The data needed to open it with your fingerprint or your face</strong>: a
            public key from your phone and your wallet&apos;s key in encrypted form, which only
            your phone can open.
          </li>
          <li>
            <strong>Your Google email</strong>, only if you decide to link your account.
          </li>
          <li>
            <strong>Security logs</strong>: date and time of important actions (creating the
            wallet, confirming a transfer, viewing your key).
          </li>
        </ul>
        <h3>What we never receive</h3>
        <ul>
          <li>Your fingerprint or your face: they never leave your phone.</li>
          <li>Your wallet&apos;s unencrypted key: it only exists on your phone.</li>
        </ul>
      </>
    ),
  },
  {
    id: "purposes",
    title: "What we use it for",
    body: (
      <ul>
        <li>Creating your wallet and letting you send, receive and collect money.</li>
        <li>Telling you on WhatsApp what happens with your money and giving you your receipts.</li>
        <li>Protecting your account and preventing fraud or misuse.</li>
        <li>Answering your questions and improving the service.</li>
        <li>Meeting the legal obligations that apply to us.</li>
      </ul>
    ),
  },
  {
    id: "public-record",
    title: "Activity and the public record",
    body: (
      <>
        <p>
          Transfers of digital dollars are written to a public record that does not depend on us
          and cannot be changed or erased. That record shows wallet addresses, amounts and dates,
          but not your name or your phone number.
        </p>
        <p>
          Each transaction also has a <strong>receipt</strong> with its own link. Anyone who has
          that link can view it: it shows the amount, the date and the visible names of the sender
          and the recipient (phone numbers are partly hidden). Share it only with the people you
          want to see it.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    body: (
      <>
        <p>We do not sell your data. We share it only with those who make the service possible:</p>
        <ul>
          <li>
            <strong>Meta (WhatsApp)</strong>, which carries your messages with Optipagos.
          </li>
          <li>
            <strong>Infrastructure providers</strong> that host the service and its database, and
            that process data following our instructions.
          </li>
          <li>
            <strong>Google</strong>, only if you link your account to recover access.
          </li>
          <li>
            <strong>Authorities</strong>, when a law or a valid order requires it.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <p>
        We keep your data while you use Optipagos and, afterwards, for as long as the applicable
        rules require or as needed to resolve claims. What is written to the public record of
        transactions stays there indefinitely, because nobody can delete it.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>You can ask us at any time to:</p>
        <ul>
          <li>Know what data of yours we hold and receive a copy.</li>
          <li>Correct data that is wrong.</li>
          <li>Delete the data we keep about you, except what we must keep by law.</li>
          <li>Unlink your Google account.</li>
        </ul>
        <p>
          Write to us at {mail} from a channel that lets us confirm it is you. We reply within a
          reasonable time. Remember that your wallet is yours: before asking us to delete your
          data, take your key with you by writing «exportar clave», because without it we will not
          be able to help you recover your money.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "How we protect it",
    body: (
      <p>
        Your wallet&apos;s key is stored encrypted and only your phone can open it. Every
        sensitive operation is confirmed with your fingerprint or your face through a single-use
        link that expires within a few minutes. Even so, no system is infallible: look after your
        phone and do not share your key with anyone. Optipagos will never ask you for it.
      </p>
    ),
  },
  {
    id: "website",
    title: "This website",
    body: (
      <p>
        This site does not use advertising cookies or tools that follow you across other pages. It
        only stores one first-party cookie, “lang”, to remember the language you chose. The pages
        for confirming operations work without third-party services.
      </p>
    ),
  },
  {
    id: "minors",
    title: "Minors",
    body: (
      <p>
        Optipagos is intended for people over 18. If you believe a minor has given us their data,
        write to us and we will delete it.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        If we change something important we will let you know on WhatsApp or on this site before
        it takes effect. The date above shows the current version.
      </p>
    ),
  },
];

export const privacy: Record<Locale, LegalDocument> = {
  es: {
    title: "Política de privacidad",
    description:
      "Qué datos usa Optipagos, para qué, con quién se comparten y cómo pedir que se corrijan o eliminen.",
    eyebrow: "tus datos, claros",
    summary: [
      "Usamos tu número de WhatsApp, tus mensajes con Optipagos y los movimientos de tu billetera para que el servicio funcione.",
      "Tu huella, tu rostro y la clave de tu billetera nunca salen de tu teléfono.",
      "No vendemos tus datos ni usamos publicidad que te rastree.",
    ],
    updated: "5 de octubre de 2026",
    sections: sectionsEs,
  },
  en: {
    title: "Privacy policy",
    description:
      "What data Optipagos uses, what for, who it is shared with and how to ask for it to be corrected or deleted.",
    eyebrow: "your data, made clear",
    summary: [
      "We use your WhatsApp number, your messages with Optipagos and your wallet activity so the service can work.",
      "Your fingerprint, your face and your wallet's key never leave your phone.",
      "We do not sell your data or use advertising that tracks you.",
    ],
    updated: "October 5, 2026",
    sections: sectionsEn,
  },
};
