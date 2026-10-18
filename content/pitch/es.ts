import type { PitchDeck } from "./types";

/**
 * Pitch de Optipagos para Incuba Unión Tecnológico 3.0 (3 minutos).
 *
 * Fuentes: el documento «Programa Incuba Unión Tecnológico 3 - LINK SPACE», las páginas de
 * optipagos.optus.lat (/personas, /expansion, /gtm, /actores, /recaudacion) y optus.lat.
 * Las cifras de mercado son públicas y llevan su fuente al pie.
 *
 * Para editar:
 *   - `seconds` de todas las diapositivas suma 180. Si alargas un guion, recorta otro.
 *   - *palabras* se resaltan; [[dato]] sale marcado «por confirmar» hasta que lo reemplaces.
 *   - El guion (`script`) se ve con la tecla N o en la ventana de notas (tecla P).
 */
const deck: PitchDeck = {
  title: "Optipagos · Pitch",
  url: "optipagos.optus.lat",
  whatsappUrl: "https://wa.me/59177379190?text=hola",
  email: "ventas@optus.lat",
  sponsors: [
    { name: "Incuba Unión 3.0", logo: "/pitch/logos/incuba-union.png" },
    { name: "Banco Unión", logo: "/pitch/logos/banco-union.png" },
    { name: "Emprender Futuro", logo: "/pitch/logos/emprender-futuro.png" },
    { name: "Link Space", logo: "/pitch/logos/link-space.png" },
  ],
  videos: {
    // Fabri se registra desde su iPhone (corre durante «solución» y «oportunidad»).
    registro: { src: "/pitch/video/registro-iphone.mp4", start: 1, end: 62, rate: 2.1 },
    // Fabri compra 5 USDC con un QR Simple y se los envía a Saúl, que los recibe en su Android
    // (corre durante «propuesta de valor», «mercado» y «modelo de negocio»).
    envio: {
      src: "/pitch/video/envio-iphone.mp4",
      android: "/pitch/video/recibe-android.mp4",
      androidOffset: 2.5,
      start: 8,
      end: 150,
      rate: 3.2,
    },
  },
  slides: [
    {
      id: "gancho",
      section: "optipagos",
      layout: "cover",
      seconds: 20,
      title: "Mi abuela quiere *comprar dólares*",
      lead: "…y no es la única",
      art: ["bubble", "coin"],
      script:
        "(Al teléfono) ¿Aló, abuelita? ¿Que quieres comprar dólares porque el dólar sigue subiendo? No, no vayas a hacer fila… ya, yo te enseño. (Al público) Ay… ¿mi micrófono estaba abierto? Bueno… mi abuela no es la única: miles de bolivianos quieren cuidar su plata en dólares y no saben cómo. Somos Optipagos.",
    },
    {
      id: "problema",
      section: "el problema",
      layout: "cards",
      seconds: 15,
      title: "Lo que escuchamos *en la calle*",
      lead: "Salimos a hablar con personas y comercios de la ciudad de La Paz antes de construir. Tres frases se repitieron una y otra vez:",
      items: [
        {
          doodle: "apps",
          title: "«Otra app, no»",
          text: "Descargar, recordar contraseñas y lidiar con caídas frena a la gente.",
        },
        {
          doodle: "receipt",
          title: "«Me da miedo que me estafen»",
          text: "Las capturas y los comprobantes sueltos no dan confianza.",
        },
        {
          doodle: "piggy",
          title: "«Quiero cuidar mi plata»",
          text: "Comisiones altas, esperas y un tipo de cambio que cambia cada día.",
        },
      ],
      note: "cuidar tus dólares hoy es como hacer fila en el banco… desde el celular",
      script:
        "Salimos a las calles de La Paz y escuchamos tres frases una y otra vez: «otra app, no», «me da miedo que me estafen» y «quiero cuidar mi plata». Cuidar tus dólares hoy es hacer fila en el banco… desde el celular.",
    },
    {
      id: "solucion",
      section: "la solución",
      layout: "steps",
      seconds: 15,
      title: "Una billetera de dólares *dentro de WhatsApp*",
      lead: "Enviar plata se siente igual que mandar un audio.",
      items: [
        { doodle: "chat", title: "Escribe «hola»", text: "Al chat de Optipagos. Sin descargar nada." },
        { doodle: "fingerprint", title: "Tu huella es la llave", text: "Creas tu billetera con tu huella o tu rostro." },
        { doodle: "plane", title: "Mueve tu plata", text: "Compra, envía y cobra dólares digitales (USDC)." },
      ],
      phones: { scene: "registro", pose: "hero", poster: 30 },
      script:
        "Optipagos es una billetera de dólares digitales dentro de WhatsApp. Escribes «hola», creas tu billetera con tu huella o tu rostro, y listo. Detrás de mí, Fabri se está registrando de verdad.",
    },
    {
      id: "oportunidad",
      section: "la oportunidad",
      layout: "cards",
      seconds: 15,
      title: "Todos quieren dólares, *nadie se los hace fácil*",
      items: [
        {
          doodle: "bank",
          title: "El dólar escasea",
          text: "Cuesta conseguirlo en el banco y el tipo de cambio sigue subiendo.",
        },
        {
          doodle: "check",
          title: "Ya está permitido",
          text: "Desde 2024 el Banco Central permite operar con activos virtuales.",
        },
        {
          doodle: "key",
          title: "La cripto asusta",
          text: "Exchanges, contraseñas y frases secretas: no es para tu abuela.",
        },
      ],
      note: "somos la puerta fácil entre bolivianos y dólares digitales",
      phones: { scene: "registro", pose: "side", poster: 50 },
      script:
        "La oportunidad: el dólar escasea y sube, desde 2024 el Banco Central permite los activos virtuales, pero las apps cripto asustan. Nosotros somos la puerta fácil entre bolivianos y dólares digitales.",
    },
    {
      id: "valor",
      section: "propuesta de valor",
      layout: "checklist",
      seconds: 13,
      title: "Simple, seguro *y tuyo*",
      items: [
        { doodle: "phone", title: "Cero apps nuevas", text: "Todo pasa en el chat que ya usas." },
        { doodle: "shield", title: "Huella o rostro en cada pago", text: "Nada sale de tu billetera sin ti." },
        { doodle: "coin", title: "Enviar y recibir es gratis", text: "Sin comisión de envío." },
        { doodle: "key", title: "Tu billetera es tuya", text: "Ni nosotros podemos mover tu dinero." },
      ],
      phones: { scene: "envio", pose: "hero", poster: 50 },
      script:
        "Ahora Fabri compra cinco dólares con un QR Simple y se los envía a Saúl. Sin app nueva, cada envío se confirma con huella o rostro, y la billetera es solo tuya.",
    },
    {
      id: "mercado",
      section: "mercado objetivo",
      layout: "stats",
      seconds: 16,
      title: "Para quien quiere *cuidar su plata*",
      lead: "Personas que ya quieren ahorrar en dólares pero no saben cómo, quienes reciben o envían dólares, y negocios que venden por chat.",
      items: [
        {
          value: "USD 294 M",
          title: "en cripto por plataformas como Binance en el 1.er semestre de 2025: 6 veces más que en 2024",
          source: "Banco Central de Bolivia",
        },
        {
          value: "Bs 611 M",
          title: "en 10.193 operaciones cripto pagadas desde el banco, con QR y transferencias (jul. 2024 – may. 2025)",
          source: "ASFI, vía Banco Central de Bolivia",
        },
        {
          value: "USD 757 M",
          title: "en remesas entre enero y julio de 2025",
          source: "Banco Central de Bolivia",
        },
      ],
      phones: { scene: "envio", pose: "side", poster: 96 },
      script:
        "¿Para quién? Para quien ya quiere ahorrar en dólares y no sabe cómo, y para negocios que venden por WhatsApp. En un año, la cripto en Bolivia se multiplicó por seis, y ya se paga con QR desde el banco.",
    },
    {
      id: "modelo",
      section: "modelo de negocio",
      layout: "checklist",
      seconds: 16,
      title: "Solo ganamos *cuando tú ganas*",
      items: [
        {
          doodle: "heart",
          title: "Empezar es gratis",
          text: "Billetera, envíos y cobros. Al inicio, nosotros pagamos las comisiones.",
        },
        {
          doodle: "bag",
          title: "0,5 – 1 % al meter o sacar dinero",
          text: "Cuando cambias bolivianos a dólares, o al revés.",
        },
        {
          doodle: "piggy",
          title: "Una parte de lo que gana tu ahorro",
          text: "Tu dinero crece ahorrando solo o en un pasanaku digital; nos quedamos una parte.",
        },
        {
          doodle: "chart",
          title: "Tu buen historial vale",
          text: "Con tu permiso, mostramos a los bancos que pagas bien, para que te presten.",
        },
      ],
      phones: { scene: "envio", pose: "side", poster: 138 },
      script:
        "Empezar es gratis: al inicio, las comisiones las pagamos nosotros. Ganamos entre medio y uno por ciento al meter o sacar dinero, una parte de lo que gana tu ahorro o tu pasanaku, y ayudando a que los bancos te presten gracias a tu buen historial.",
    },
    {
      id: "traccion",
      section: "tracción",
      layout: "stats",
      seconds: 17,
      title: "De Optimypes a *Optipagos*",
      lead: "Con Optimypes, la gente le tenía miedo a los activos digitales: las plataformas eran muy complicadas. Por eso cambiamos.",
      items: [
        {
          doodle: "users",
          value: "89 %",
          title: "no se anima al dólar digital por miedo o apps difíciles",
          source: "encuesta, 28 respuestas",
        },
        {
          doodle: "laptop",
          value: "61 %",
          title: "sale de WhatsApp a la app del banco para cobrar",
          source: "encuesta, 28 respuestas",
        },
        {
          doodle: "check",
          value: "71 %",
          title: "quiere unirse a la beta",
          source: "encuesta, 20 de 28",
        },
        {
          doodle: "megaphone",
          value: "100 %",
          title: "de los entrevistados no lo usó por miedo",
          source: "entrevistas en vivo",
        },
      ],
      note: "validado por Renán Huayta, CEO de Tu Cuate, y una entidad financiera ya mostró interés",
      script:
        "Con Optimypes vimos que la gente le temía a los activos digitales: plataformas muy complicadas. Nueve de cada diez encuestados no se anima, y seis de cada diez sale de WhatsApp para cobrar. Siete de cada diez quiere entrar a la beta. Por eso nació Optipagos. El CEO de Tu Cuate nos validó… y una entidad financiera ya quiere usarnos.",
    },
    {
      id: "competencia",
      section: "competencia",
      layout: "compare",
      seconds: 12,
      title: "Donde *ya está* la gente",
      columns: ["Sin descargar nada", "En dólares", "Se usa chateando", "Huella o rostro en cada pago"],
      items: [
        { title: "Optipagos", highlight: true, cells: [true, true, true, true] },
        { title: "Bancos con dólares digitales", cells: [false, true, false, "según el banco"] },
        { title: "Binance, Airtm, Meru", cells: [false, true, false, false] },
        { title: "QR bancario", cells: [false, false, false, "según el banco"] },
      ],
      script:
        "Bancos, Binance, Airtm o Meru te piden otra app, trámites y contraseñas. Nosotros estamos donde ya está la gente: en WhatsApp, con tu huella o tu rostro como llave.",
    },
    {
      id: "crecimiento",
      section: "plan de crecimiento",
      layout: "roadmap",
      seconds: 12,
      title: "Crecemos *de chat en chat*",
      lead: "Cada pago a alguien que aún no nos usa es una invitación.",
      items: [
        { value: "Hoy", title: "Demo temprana", text: "Beta cerrada con quienes se anotaron." },
        {
          value: "Próximo",
          title: "Ciudad de La Paz",
          text: "Gente que quiere ahorrar y mover dólares: meta de 800 usuarios activos.",
        },
        { value: "Luego", title: "Aliado local", text: "Para mover bolivianos, no solo recibirlos." },
        { value: "Después", title: "Otro país", text: "Con socios locales y permisos en regla." },
      ],
      script:
        "Crecemos de chat en chat. Primero, la ciudad de La Paz: gente que quiere ahorrar y mover dólares. Luego, un aliado para mover bolivianos, no solo recibirlos. Y después, otros países.",
    },
    {
      id: "inversion",
      section: "inversión y uso de fondos",
      layout: "funds",
      seconds: 11,
      // Modelo financiero de Optus (OPTUS_MODELO_CORREGIDO.xlsx, resumido en el dossier de
      // Notion): máximo déficit de caja en 12 meses (Bs 16.078) más un colchón de 20 %.
      title: "Buscamos *Bs 19.293* para 12 meses",
      items: [
        { title: "Capital de trabajo: equipo, WhatsApp y anuncios mientras crecen las comisiones", share: 60, value: "60 %" },
        { title: "Formalización: SEPREC, SENAPI y arranque", share: 23, value: "23 %" },
        { title: "Colchón de seguridad", share: 17, value: "17 %" },
      ],
      script:
        "Buscamos diecinueve mil trescientos bolivianos para doce meses: sostener al equipo, WhatsApp y anuncios mientras crecen las comisiones, formalizar la empresa y un colchón de seguridad.",
    },
    {
      id: "equipo",
      section: "equipo",
      layout: "team",
      seconds: 10,
      title: "Un equipo boliviano que *construye rápido*",
      items: [
        { photo: "/pitch/equipo/fabricio.jpg", title: "Fabricio Echeverría", text: "*CEO* · producto y diseño", value: "20–25 h/semana" },
        { photo: "/pitch/equipo/saul.jpg", title: "Saúl Choquehuanca", text: "*CTO* · backend y blockchain", value: "20–25 h/semana" },
        { photo: "/pitch/equipo/erick.jpg", title: "Erick Poma", text: "*CFO* · finanzas e infraestructura", value: "20–25 h/semana" },
        { photo: "/pitch/equipo/franco.jpg", title: "Franco Ayala", text: "*CMO* · marketing y alianzas", value: "20–25 h/semana" },
      ],
      note: "subcampeones mundiales en pagos con Avalanche · ganadores INNOVA San Andrés 6.0",
      script:
        "Fabri, nuestro CEO; yo, Saúl, CTO; Erick, finanzas; y Franco, marketing. Subcampeones mundiales del hackathon de pagos de Avalanche. Construimos rápido, y de cero.",
    },
    {
      id: "cierre",
      section: "optipagos",
      layout: "closing",
      seconds: 8,
      title: "Tu plata viaja *por WhatsApp*",
      lead: "Escribe «hola» y pruébalo hoy",
      art: ["heart", "sparkle"],
      script:
        "Para que tu abuela, y tú, cuiden su plata en dólares: Optipagos. Escríbannos «hola», o a ventas@optus.lat. ¡Gracias!",
    },
  ],
};

export default deck;
