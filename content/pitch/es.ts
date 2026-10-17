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
  sponsors: [
    { name: "Incuba Unión 3.0", logo: "/pitch/logos/incuba-union.png" },
    { name: "Banco Unión", logo: "/pitch/logos/banco-union.png" },
    { name: "Emprender Futuro", logo: "/pitch/logos/emprender-futuro.png" },
    { name: "Link Space" },
  ],
  videos: {
    // Fabri se registra desde su iPhone.
    registro: { src: "/pitch/video/registro-iphone.mp4", start: 1, end: 62, rate: 3.2 },
    // Fabri compra 5 USDC con un QR Simple y se los envía a Saúl, que los recibe en su Android.
    envio: {
      src: "/pitch/video/envio-iphone.mp4",
      android: "/pitch/video/recibe-android.mp4",
      androidOffset: 2.5,
      start: 8,
      end: 150,
      rate: 3,
    },
  },
  slides: [
    {
      id: "gancho",
      section: "optipagos",
      layout: "cover",
      seconds: 14,
      title: "¿Alguna vez te pagaron con una *captura falsa*?",
      lead: "Tu plata viaja por WhatsApp",
      art: ["bubble", "receipt"],
      script:
        "¿Alguna vez les pagaron con una captura de pantalla… y después descubrieron que era falsa? En Bolivia, cobrar sin sustos y cuidar tus dólares se volvió un trámite. Somos Optipagos.",
    },
    {
      id: "problema",
      section: "el problema",
      layout: "cards",
      seconds: 18,
      title: "Lo que escuchamos *en la calle*",
      lead: "Salimos a hablar con personas y comercios antes de construir. Tres frases se repitieron una y otra vez:",
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
        "Salimos a la calle, a la zona de San Francisco, y escuchamos tres frases una y otra vez: «otra app, no», «me da miedo que me estafen» y «quiero cuidar mi plata». Hoy cuidar tus dólares es como hacer fila en el banco… pero desde el celular.",
    },
    {
      id: "solucion",
      section: "la solución",
      layout: "steps",
      seconds: 19,
      title: "Una billetera de dólares *dentro de WhatsApp*",
      lead: "Enviar plata se siente igual que mandar un audio.",
      items: [
        { doodle: "chat", title: "Escribe «hola»", text: "Al chat de Optipagos. Sin descargar nada." },
        { doodle: "fingerprint", title: "Tu huella es la llave", text: "Creas tu billetera con tu huella o tu rostro." },
        { doodle: "plane", title: "Mueve tu plata", text: "Compra, envía y cobra dólares digitales (USDC)." },
      ],
      phones: { scene: "registro", pose: "hero", poster: 30 },
      script:
        "Optipagos es una billetera de dólares digitales que vive dentro de WhatsApp. Escribes «hola», creas tu billetera con tu huella o tu rostro, y listo. Detrás de mí, Fabri se está registrando de verdad, en menos de un minuto.",
    },
    {
      id: "valor",
      section: "propuesta de valor",
      layout: "checklist",
      seconds: 16,
      title: "Simple, seguro *y tuyo*",
      items: [
        { doodle: "phone", title: "Cero apps nuevas", text: "Todo pasa en el chat que ya usas." },
        { doodle: "shield", title: "Huella o rostro en cada pago", text: "Adiós a las capturas falsas: nada sale sin ti." },
        { doodle: "coin", title: "Enviar y recibir es gratis", text: "Sin comisión de envío." },
        { doodle: "key", title: "Tu billetera es tuya", text: "Ni nosotros podemos mover tu dinero." },
      ],
      phones: { scene: "envio", pose: "hero", poster: 50 },
      script:
        "Ahora Fabri compra cinco dólares con un QR Simple desde su banco y se los envía a Saúl. Sin app nueva, cada envío se confirma con la huella, enviar es gratis y la billetera es solo tuya.",
    },
    {
      id: "mercado",
      section: "mercado objetivo",
      layout: "stats",
      seconds: 16,
      title: "Para quien ya *vive en WhatsApp*",
      lead: "Freelancers y personas que cobran o ahorran en dólares, y pequeños negocios que venden por chat.",
      items: [
        {
          value: "9 M",
          title: "bolivianos usan internet",
          source: "DataReportal, Digital 2026",
        },
        {
          value: "USD 294 M",
          title: "en activos virtuales en el 1.er semestre de 2025: más de 6 veces que en 2024",
          source: "Banco Central de Bolivia",
        },
        {
          value: "USD 757 M",
          title: "en remesas entre enero y julio de 2025",
          source: "Banco Central de Bolivia",
        },
      ],
      phones: { scene: "envio", pose: "side", poster: 96 },
      script:
        "¿Para quién? Para freelancers y personas que cobran o ahorran en dólares, y para pequeños negocios que ya venden por WhatsApp. Y el mercado ya se mueve: las operaciones con activos virtuales en Bolivia se multiplicaron por seis en un año.",
    },
    {
      id: "modelo",
      section: "modelo de negocio",
      layout: "cards",
      seconds: 15,
      title: "Solo ganamos *cuando tú ganas*",
      items: [
        { doodle: "heart", title: "Gratis", text: "Crear tu billetera, enviar y recibir. Sin mensualidades." },
        {
          doodle: "bag",
          value: "0,5 – 1 %",
          title: "Al poner o sacar dinero",
          text: "Cuando pasas de bolivianos a dólares digitales y viceversa. Nunca más de 1,5 %.",
        },
        {
          doodle: "rocket",
          title: "Lo que viene",
          text: "Ahorro que rinde, pasanaku digital y cobros para comercios.",
        },
      ],
      note: "una casa de cambio… que vive en tu chat",
      phones: { scene: "envio", pose: "side", poster: 138 },
      script:
        "Crear la billetera, enviar y recibir es gratis. Ganamos solo cuando pones o sacas dinero: entre medio y uno por ciento. Después vienen el ahorro que rinde, el pasanaku digital y los cobros para comercios.",
    },
    {
      id: "traccion",
      section: "tracción",
      layout: "stats",
      seconds: 15,
      title: "Construido de cero, *en dos semanas*",
      items: [
        {
          doodle: "hourglass",
          value: "2 semanas",
          title: "para tener la web y el bot de WhatsApp funcionando, con huella y rostro",
        },
        { doodle: "users", value: "20", title: "personas anotadas en la demo después de nuestras entrevistas" },
        { doodle: "trophy", value: "2.º lugar", title: "mundial en Hack2Build: Payments x402 de Avalanche (2025)" },
      ],
      note: "contamos como usuario a quien hace su primer envío real",
      script:
        "En dos semanas pusimos en marcha la web y el bot de WhatsApp, con huella y rostro. Veinte personas ya se anotaron para la demo tras nuestras entrevistas, y solo contamos como usuario a quien hace su primer envío real.",
    },
    {
      id: "competencia",
      section: "competencia",
      layout: "compare",
      seconds: 15,
      title: "Donde *ya está* la gente",
      columns: ["Sin descargar nada", "En dólares", "Se usa chateando", "Huella en cada pago"],
      items: [
        { title: "Optipagos", highlight: true, cells: [true, true, true, true] },
        { title: "Bancos con dólares digitales", cells: [false, true, false, "según el banco"] },
        { title: "Binance, Airtm", cells: [false, true, false, false] },
        { title: "QR bancario", cells: [false, false, false, "según el banco"] },
      ],
      script:
        "Los bancos empiezan a ofrecer dólares digitales, y existen Binance o Airtm, pero todos te piden otra app, trámites y contraseñas. Nosotros estamos donde ya está la gente: en WhatsApp, con la huella como llave.",
    },
    {
      id: "crecimiento",
      section: "plan de crecimiento",
      layout: "roadmap",
      seconds: 15,
      title: "Crecemos *de chat en chat*",
      lead: "Cada pago a alguien que aún no nos usa es una invitación.",
      items: [
        { value: "Hoy", title: "Demo temprana", text: "Beta cerrada en La Paz." },
        { value: "Próximo", title: "Comercios y comunidades", text: "San Francisco y freelancers: meta de [[N]] usuarios." },
        { value: "Luego", title: "Aliado local", text: "Poner y sacar dinero: primeras comisiones." },
        { value: "Después", title: "Otro país", text: "Con socios locales y permisos en regla." },
      ],
      script:
        "Crecemos de chat en chat: cada pago a alguien que no nos usa es una invitación. Primero, comercios de San Francisco y comunidades de freelancers; luego, un aliado para poner y sacar dinero; y después, otros países de la región.",
    },
    {
      id: "inversion",
      section: "inversión y uso de fondos",
      layout: "funds",
      seconds: 12,
      title: "Buscamos *[[monto]]* para 12 meses",
      items: [
        { title: "Aliados y permisos para poner y sacar dinero", share: 35, value: "[[35 %]]" },
        { title: "Seguridad y producto", share: 25, value: "[[25 %]]" },
        { title: "Sumar comercios en la calle", share: 25, value: "[[25 %]]" },
        { title: "Operación y soporte", share: 15, value: "[[15 %]]" },
      ],
      script:
        "Buscamos [monto] para los próximos doce meses: aliados y permisos para poner y sacar dinero, seguridad, y salir a la calle a sumar comercios.",
    },
    {
      id: "equipo",
      section: "equipo",
      layout: "team",
      seconds: 16,
      title: "Cuatro devs bolivianos que *construyen rápido*",
      items: [
        { photo: "/pitch/equipo/franco.jpg", title: "Franco Ayala", text: "APIs e integraciones", value: "20–25 h/semana" },
        { photo: "/pitch/equipo/erick.jpg", title: "Erick Poma", text: "Backend e infraestructura", value: "20–25 h/semana" },
        { photo: "/pitch/equipo/fabricio.jpg", title: "Fabricio Echeverría", text: "Producto y diseño", value: "20–25 h/semana" },
        { photo: "/pitch/equipo/saul.jpg", title: "Saúl Choquehuanca", text: "Backend y blockchain", value: "20–25 h/semana" },
      ],
      note: "2.º lugar mundial en pagos con Avalanche · ganadores INNOVA San Andrés 6.0",
      script:
        "Somos cuatro desarrolladores bolivianos: Franco en APIs, Erick en backend e infraestructura, Fabri en producto y diseño, y yo, Saúl, en backend y blockchain. Fuimos segundos en el hackathon mundial de pagos de Avalanche. Construimos rápido, y de cero.",
    },
    {
      id: "cierre",
      section: "optipagos",
      layout: "closing",
      seconds: 9,
      title: "Tu plata viaja *por WhatsApp*",
      lead: "Escribe «hola» y pruébalo hoy",
      art: ["heart", "sparkle"],
      script: "Optipagos: tu plata viaja por WhatsApp. Escríbannos «hola» y pruébenlo hoy. ¡Gracias!",
    },
  ],
};

export default deck;
