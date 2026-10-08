import type { InfoPages } from "./types";

/**
 * Páginas informativas en español: para quién es Optipagos, cómo crece, cómo se gana y con
 * quién se construye. Adaptadas del documento del programa Incuba Unión Tecnológico 3.0
 * a un lenguaje comercial. Optipagos está en demo temprana: lo que aún no existe va marcado.
 */
const pages: InfoPages = {
  people: {
    label: "Para quién",
    icon: "user",
    eyebrow: "para quién es",
    title: "Hecho para ti y tu negocio",
    description:
      "Optipagos es para quienes quieren mover y cuidar sus dólares digitales sin apps ni trámites: personas, freelancers y pequeños negocios que venden por WhatsApp.",
    lead: "Dos grupos de personas nos mueven: quienes quieren cuidar su plata y quienes necesitan cobrar sin sustos.",
    sections: [
      {
        title: "Personas y freelancers",
        text: "Gente que cobra o ahorra en dólares y no quiere complicarse.",
        items: [
          {
            title: "Quién eres",
            text: "Freelancer, profesional joven, trabajas en remoto o simplemente quieres que la inflación y la devaluación te coman menos ahorro.",
          },
          {
            title: "Lo que necesitas",
            text: "Enviar, recibir y guardar dólares digitales (USDC) al instante, sin descargar apps, sin burocracia de banco y sin comisiones de envío.",
          },
          {
            title: "Lo que te damos",
            text: "Una billetera dentro de WhatsApp. Escribes como a un amigo y confirmas con tu huella o tu rostro.",
          },
        ],
      },
      {
        title: "Pequeños negocios y servicios",
        text: "Quienes ya atienden y venden por WhatsApp todos los días.",
        items: [
          {
            title: "Quién eres",
            text: "Una tienda de barrio, un emprendimiento, un restaurante o un profesional independiente que cobra por canales digitales.",
          },
          {
            title: "Lo que necesitas",
            text: "Cobrar en el mismo chat donde hablas con tu cliente, saber al instante que te pagaron y no caer en estafas con capturas falsas.",
          },
          {
            title: "Lo que te damos",
            text: "Un cobro con QR que el cliente confirma con su huella o rostro. Si hay confirmación, hay pago. Sin capturas de por medio.",
          },
        ],
      },
      {
        title: "Lo que escuchamos en la calle",
        text: "Hablamos con personas y comercios antes de construir. Esto fue lo que más se repitió:",
        items: [
          {
            title: "«Otra app, no»",
            text: "Descargar aplicaciones, recordar contraseñas y lidiar con caídas es lo que más frena a la gente. Quieren usar la app que ya usan todos los días.",
          },
          {
            title: "«Me da miedo que me estafen»",
            text: "Las capturas y los comprobantes sueltos generan desconfianza. La confianza sube cuando cada operación se confirma con huella o rostro.",
          },
          {
            title: "«Quiero cuidar mi plata»",
            text: "Quieren resguardar su dinero en dólares digitales, pero las comisiones altas, las esperas y las diferencias en el tipo de cambio los frenan.",
          },
        ],
      },
    ],
    cta: {
      title: "¿Te suena familiar?",
      text: "Estamos probando con un grupo pequeño. Súmate a la beta cerrada y cuéntanos cómo lo usarías.",
    },
  },

  expansion: {
    label: "Expansión",
    icon: "globe",
    eyebrow: "hacia dónde vamos",
    title: "De Bolivia a toda la región",
    description:
      "Qué necesita Optipagos para llegar a otro país: socios locales para entrar y salir de moneda local, respeto a las normas de cada lugar y un chat adaptado a su gente.",
    lead: "Nacimos en Bolivia, pero la idea sirve donde haya WhatsApp y ganas de mover dólares sin complicaciones. Para llegar a un país nuevo hacen falta tres cosas.",
    sections: [
      {
        title: "Tres piezas para abrir un país",
        items: [
          {
            title: "1. Entrada y salida de dinero local",
            text: "Alianzas con apps de pago, servicios de cobro o bancos del país para cambiar moneda local por dólares digitales (USDC) y volver, sin trabas.",
          },
          {
            title: "2. Reglas y permisos",
            text: "Cumplimos las leyes de cada país, incluidos los controles para saber quién es cada persona y evitar el lavado de dinero, siempre junto a socios locales con permiso para operar.",
          },
          {
            title: "3. Un chat que habla como allá",
            text: "Activamos WhatsApp Business con números locales y adaptamos el lenguaje del bot para que suene natural en cada país.",
          },
        ],
      },
      {
        title: "Hoy, con los pies en la tierra",
        text: "Estamos en demo temprana en Bolivia. Primero aprendemos aquí con un grupo pequeño y recién después abrimos nuevos países, con socios y permisos en regla.",
      },
    ],
    cta: {
      title: "¿Tienes un contacto en otro país?",
      text: "Si tienes una app de pagos, un servicio de cobro o una comunidad y quieres abrir Optipagos en tu país, escríbenos.",
    },
  },

  gtm: {
    label: "Cómo crecemos",
    icon: "zap",
    eyebrow: "cómo llegamos a la gente",
    title: "Crecemos de chat en chat",
    description:
      "La estrategia de salida al mercado de Optipagos: cada pago invita a un nuevo usuario, alianzas con negocios que ya venden por WhatsApp y comunidades de personas que cuidan su dinero en dólares.",
    lead: "No compramos anuncios para que nos descarguen: crecemos porque cada pago le llega a alguien que todavía no nos usa.",
    sections: [
      {
        title: "Tres formas de crecer",
        items: [
          {
            title: "Cada pago es una invitación",
            text: "Cuando envías o pides dólares a alguien que aún no usa Optipagos, esa persona recibe el dinero directo en su chat y se vuelve usuaria al instante.",
          },
          {
            title: "Negocios que ya venden por WhatsApp",
            text: "Sumamos pequeños negocios y profesionales con un cobro por QR que el cliente confirma con su huella o rostro. Sus clientes pagan por ahí, y cada cliente es un nuevo usuario.",
          },
          {
            title: "Comunidades que cuidan su dinero",
            text: "Alianzas con comunidades de trabajadores remotos, freelancers e importadores que ya buscan resguardar su plata en dólares digitales.",
          },
        ],
      },
      {
        title: "Frente a las alternativas",
        text: "Nos comparamos con bancos que empiezan a ofrecer dólares digitales, billeteras cripto como Binance o Airtm y pasarelas bancarias. Así nos diferenciamos:",
        items: [
          {
            title: "Cero apps nuevas",
            text: "Otros piden descargar apps pesadas y hacer trámites. Optipagos vive en WhatsApp.",
          },
          {
            title: "Huella o rostro en cada pago",
            text: "Se acabaron los comprobantes falsos: nada sale sin que tú lo confirmes.",
          },
          {
            title: "Tan fácil como un mensaje",
            text: "Mover dólares digitales se siente igual que mandar un mensaje.",
          },
        ],
      },
    ],
    cta: {
      title: "Sé de los primeros",
      text: "Si tienes un negocio que vende por WhatsApp o formas parte de una comunidad, entra a la beta cerrada.",
    },
  },

  players: {
    label: "Aliados",
    icon: "link",
    eyebrow: "con quién lo construimos",
    title: "Un equipo, varios aliados",
    description:
      "Los aliados de Optipagos: WhatsApp Business de Meta, proveedores de dólares digitales, seguridad con huella y rostro y aliados para poner y sacar dinero.",
    lead: "Mover plata por chat sin enredos requiere varias piezas. Estas son las que hacen posible Optipagos.",
    sections: [
      {
        title: "El problema de hoy",
        text: "Los intermediarios tradicionales y las aplicaciones complicadas ponen comisiones y trabas a quien solo quiere cuidar su dinero. Ahí entramos.",
      },
      {
        title: "Quiénes hacen posible la solución",
        items: [
          {
            title: "Tu chat de siempre",
            text: "WhatsApp Business, de Meta, es la puerta de entrada: el chat que ya usas, sin descargar nada.",
            links: [
              { name: "WhatsApp Business", url: "https://business.whatsapp.com/", logo: "whatsapp" },
              { name: "Meta", url: "https://about.meta.com/", logo: "meta" },
            ],
          },
          {
            title: "Dólares digitales",
            text: "Redes y servicios de dólares digitales (USDC) para mover y resguardar tu dinero al instante.",
            links: [
              { name: "Avalanche", url: "https://www.avax.network/", logo: "avalanche" },
              { name: "Stellar", url: "https://stellar.org/", logo: "stellar" },
              { name: "Aave", url: "https://aave.com/", logo: "aave" },
              { name: "Blend", url: "https://blend.capital/", logo: "blend" },
            ],
          },
          {
            title: "Compras entre asistentes",
            text: "Tilcai conecta a los asistentes de personas y negocios para consultar, reservar y comprar con condiciones claras, permisos limitados y pagos en Stellar. Es un proyecto en desarrollo.",
            links: [{ name: "Tilcai", url: "https://tilcai.vercel.app/es", logo: "tilcai" }],
          },
          {
            title: "Seguridad con huella y rostro",
            text: "La tecnología de tu teléfono confirma que cada pago lo autoriza su dueño, y así se acaban las estafas.",
          },
          {
            title: "Poner y sacar dinero",
            text: "Aliados locales que te permiten poner moneda local en tu billetera y sacarla cuando quieras.",
          },
        ],
      },
      {
        title: "Detrás de todo, Optus",
        text: "Optipagos es una marca de Optus, un equipo boliviano de tecnología con sede en La Paz.",
      },
    ],
    cta: {
      title: "¿Quieres ser aliado?",
      text: "Si tu negocio encaja en alguna de estas piezas, conversemos.",
    },
  },

  revenue: {
    label: "Cómo ganamos",
    icon: "coin",
    eyebrow: "modelo de negocio",
    title: "Solo ganamos cuando tú ganas",
    description:
      "El modelo de Optipagos: sin suscripciones ni cuotas mensuales, enviar y recibir es gratis y solo cobramos una comisión pequeña al poner o sacar dinero.",
    lead: "Sin mensualidades, sin cuotas fijas y sin letra chica. Si no usas Optipagos, no pagas nada.",
    sections: [
      {
        title: "Lo que es gratis",
        items: [
          {
            title: "Crear tu billetera",
            text: "No cuesta nada y no hay suscripción.",
          },
          {
            title: "Enviar y recibir",
            text: "Mover dólares digitales por WhatsApp no tiene comisión.",
          },
        ],
      },
      {
        title: "Lo único que cobramos hoy",
        items: [
          {
            title: "Poner y sacar dinero",
            text: "Una comisión entre 0,5 % y 1 % (nunca más de 1,5 %) cuando pasas de tu cuenta bancaria a dólares digitales y viceversa. Son las tarifas previstas durante la demo.",
          },
        ],
      },
      {
        title: "Lo que viene",
        text: "Estas ideas todavía no están disponibles. Las mencionamos para ser transparentes con hacia dónde vamos:",
        items: [
          {
            title: "Ahorro que rinde",
            text: "Poder poner tus dólares a trabajar. Optipagos se quedaría solo con una parte pequeña de lo que ganes, y el resto sería tuyo.",
            soon: true,
          },
          {
            title: "Pasanaku digital",
            text: "Rondas de ahorro entre amigos y familia automatizadas, con una comisión muy pequeña por el servicio.",
            soon: true,
          },
          {
            title: "Cobros para comercios",
            text: "Procesar los cobros de tu negocio con una comisión muy pequeña, y la posibilidad de devolver una parte a tu cliente.",
            soon: true,
          },
          {
            title: "Historial para acceder a crédito",
            text: "Exploramos que quienes hoy no tienen acceso a la banca puedan demostrar su historial de pagos y conseguir pequeños préstamos. Es una idea en estudio.",
            soon: true,
          },
        ],
      },
    ],
    cta: {
      title: "Pruébalo sin compromiso",
      text: "Únete a la beta cerrada y ayúdanos a definir las tarifas justas.",
    },
  },
};

export default pages;
