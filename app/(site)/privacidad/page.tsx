import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Qué datos usa Optipagos, para qué, con quién se comparten y cómo pedir que se corrijan o eliminen.",
  alternates: { canonical: "/privacidad" },
};

const mail = <a href={`mailto:${site.optus.email}`}>{site.optus.email}</a>;

const sections: LegalSection[] = [
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
        Este sitio no usa cookies de publicidad ni herramientas que te sigan por otras páginas. Las
        páginas para confirmar operaciones funcionan sin servicios de terceros.
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

export default function PrivacyPage() {
  return (
    <LegalPage
      icon="shield"
      eyebrow="tus datos, claros"
      title="Política de privacidad"
      summary={[
        "Usamos tu número de WhatsApp, tus mensajes con Optipagos y los movimientos de tu billetera para que el servicio funcione.",
        "Tu huella, tu rostro y la clave de tu billetera nunca salen de tu teléfono.",
        "No vendemos tus datos ni usamos publicidad que te rastree.",
      ]}
      updated="5 de octubre de 2026"
      sections={sections}
      other={{ href: "/terminos", label: "Ver los términos de servicio" }}
    />
  );
}
