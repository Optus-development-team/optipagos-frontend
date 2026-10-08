import type { InfoPages } from "./types";

/** The same pages in English. Keep the shape identical to es.ts (see types.ts). */
const pages: InfoPages = {
  people: {
    label: "Who it's for",
    icon: "user",
    eyebrow: "who it's for",
    title: "Made for you and your business",
    description:
      "Optipagos is for people who want to move and protect their digital dollars without apps or paperwork: individuals, freelancers and small businesses that sell on WhatsApp.",
    lead: "Two groups of people drive us: those who want to protect their money and those who need to get paid without scares.",
    sections: [
      {
        title: "People and freelancers",
        text: "People who earn or save in dollars and don't want the hassle.",
        items: [
          {
            title: "Who you are",
            text: "A freelancer, a young professional, a remote worker, or just someone who wants inflation and devaluation to eat less of their savings.",
          },
          {
            title: "What you need",
            text: "To send, receive and keep digital dollars (USDC) instantly, with no app downloads, no bank paperwork and no sending fees.",
          },
          {
            title: "What we give you",
            text: "A wallet inside WhatsApp. You write like you would to a friend and confirm with your fingerprint or face.",
          },
        ],
      },
      {
        title: "Small businesses and services",
        text: "Those who already serve and sell on WhatsApp every day.",
        items: [
          {
            title: "Who you are",
            text: "A corner shop, a startup, a restaurant or an independent professional who gets paid through digital channels.",
          },
          {
            title: "What you need",
            text: "To get paid in the same chat where you talk to your customer, know instantly that you were paid, and avoid scams with fake screenshots.",
          },
          {
            title: "What we give you",
            text: "A QR payment your customer confirms with their fingerprint or face. If it's confirmed, it's paid. No screenshots involved.",
          },
        ],
      },
      {
        title: "What we heard on the street",
        text: "We talked to people and shops before building. This is what came up most:",
        items: [
          {
            title: "“Not another app”",
            text: "Downloading apps, remembering passwords and dealing with outages is what holds people back most. They want to use the app they already use every day.",
          },
          {
            title: "“I'm afraid of being scammed”",
            text: "Screenshots and loose receipts breed distrust. Trust goes up when every operation is confirmed with a fingerprint or face.",
          },
          {
            title: "“I want to protect my money”",
            text: "They want to keep their money in digital dollars, but high fees, waiting times and exchange-rate gaps hold them back.",
          },
        ],
      },
    ],
    cta: {
      title: "Sound familiar?",
      text: "We're testing with a small group. Join the closed beta and tell us how you'd use it.",
    },
  },

  expansion: {
    label: "Expansion",
    icon: "globe",
    eyebrow: "where we're headed",
    title: "From Bolivia to the whole region",
    description:
      "What Optipagos needs to reach another country: local partners to move in and out of local currency, following each place's rules, and a chat adapted to its people.",
    lead: "We started in Bolivia, but the idea works wherever there's WhatsApp and a wish to move dollars without hassle. Reaching a new country takes three things.",
    sections: [
      {
        title: "Three pieces to open a country",
        items: [
          {
            title: "1. Local money in and out",
            text: "Partnerships with payment apps, collection services or banks in the country to swap local currency for digital dollars (USDC) and back, with no hassle.",
          },
          {
            title: "2. Rules and permits",
            text: "We follow each country's laws, including the checks that confirm who each person is and prevent money laundering, always alongside local partners licensed to operate.",
          },
          {
            title: "3. A chat that sounds local",
            text: "We set up WhatsApp Business with local numbers and adapt the bot's language so it sounds natural in each country.",
          },
        ],
      },
      {
        title: "Feet on the ground, today",
        text: "We're in an early demo in Bolivia. We learn here first with a small group, and only then open new countries, with partners and permits in order.",
      },
    ],
    cta: {
      title: "Have a contact in another country?",
      text: "If you run a payment app, a collection service or a community and want to open Optipagos in your country, write to us.",
    },
  },

  gtm: {
    label: "How we grow",
    icon: "zap",
    eyebrow: "how we reach people",
    title: "We grow chat by chat",
    description:
      "Optipagos' go-to-market strategy: every payment invites a new user, partnerships with businesses that already sell on WhatsApp, and communities of people who protect their money in dollars.",
    lead: "We don't buy ads to get downloads: we grow because every payment reaches someone who doesn't use us yet.",
    sections: [
      {
        title: "Three ways to grow",
        items: [
          {
            title: "Every payment is an invitation",
            text: "When you send or request dollars from someone who doesn't use Optipagos yet, they receive the money right in their chat and become a user instantly.",
          },
          {
            title: "Businesses already selling on WhatsApp",
            text: "We sign up small businesses and professionals with a QR payment their customer confirms with a fingerprint or face. Their customers pay through it, and every customer is a new user.",
          },
          {
            title: "Communities that protect their money",
            text: "Partnerships with communities of remote workers, freelancers and importers who are already looking to keep their money in digital dollars.",
          },
        ],
      },
      {
        title: "Compared to the alternatives",
        text: "We compare ourselves with banks starting to offer digital dollars, crypto wallets like Binance or Airtm, and bank gateways. Here's how we differ:",
        items: [
          {
            title: "Zero new apps",
            text: "Others ask you to download heavy apps and go through paperwork. Optipagos lives in WhatsApp.",
          },
          {
            title: "Fingerprint or face on every payment",
            text: "No more fake receipts: nothing leaves without your confirmation.",
          },
          {
            title: "As easy as a message",
            text: "Moving digital dollars feels just like sending a message.",
          },
        ],
      },
    ],
    cta: {
      title: "Be among the first",
      text: "If you run a business that sells on WhatsApp or belong to a community, join the closed beta.",
    },
  },

  players: {
    label: "Partners",
    icon: "link",
    eyebrow: "who we build it with",
    title: "One team, several partners",
    description:
      "Optipagos' partners: Meta's WhatsApp Business, digital dollar providers, fingerprint and face security, and partners to put money in and take it out.",
    lead: "Moving money by chat without hassle takes several pieces. These are the ones that make Optipagos possible.",
    sections: [
      {
        title: "Today's problem",
        text: "Traditional intermediaries and complicated apps add fees and hurdles for anyone who just wants to protect their money. That's where we come in.",
      },
      {
        title: "Who makes the solution possible",
        items: [
          {
            title: "Your usual chat",
            text: "WhatsApp Business, by Meta, is the front door: the chat you already use, nothing to download.",
            links: [
              { name: "WhatsApp Business", url: "https://business.whatsapp.com/", logo: "whatsapp" },
              { name: "Meta", url: "https://about.meta.com/", logo: "meta" },
            ],
          },
          {
            title: "Digital dollars",
            text: "Digital-dollar (USDC) networks and services to move and protect your money instantly.",
            links: [
              { name: "Avalanche", url: "https://www.avax.network/", logo: "avalanche" },
              { name: "Stellar", url: "https://stellar.org/", logo: "stellar" },
              { name: "Aave", url: "https://aave.com/", logo: "aave" },
              { name: "Blend", url: "https://blend.capital/", logo: "blend" },
            ],
          },
          {
            title: "Shopping between assistants",
            text: "Tilcai connects the assistants of people and businesses to look up, book and buy with clear terms, limited permissions and payments on Stellar. It is a project in development.",
            links: [{ name: "Tilcai", url: "https://tilcai.vercel.app/en", logo: "tilcai" }],
          },
          {
            title: "Fingerprint and face security",
            text: "Your phone's own technology confirms that every payment is authorised by its owner, so scams end.",
          },
          {
            title: "Putting money in and taking it out",
            text: "Local partners that let you put local currency in your wallet and take it out whenever you like.",
          },
        ],
      },
      {
        title: "Behind it all, Optus",
        text: "Optipagos is a brand of Optus, a Bolivian technology team based in La Paz.",
      },
    ],
    cta: {
      title: "Want to be a partner?",
      text: "If your business fits one of these pieces, let's talk.",
    },
  },

  revenue: {
    label: "How we earn",
    icon: "coin",
    eyebrow: "business model",
    title: "We only earn when you win",
    description:
      "Optipagos' model: no subscriptions or monthly fees, sending and receiving is free, and we only charge a small fee when you put money in or take it out.",
    lead: "No monthly fees, no fixed charges and no fine print. If you don't use Optipagos, you pay nothing.",
    sections: [
      {
        title: "What's free",
        items: [
          {
            title: "Creating your wallet",
            text: "It costs nothing and there's no subscription.",
          },
          {
            title: "Sending and receiving",
            text: "Moving digital dollars over WhatsApp has no fee.",
          },
        ],
      },
      {
        title: "The only thing we charge today",
        items: [
          {
            title: "Putting money in and taking it out",
            text: "A fee between 0.5% and 1% (never more than 1.5%) when you move from your bank account to digital dollars and back. These are the planned rates during the demo.",
          },
        ],
      },
      {
        title: "What's coming",
        text: "These ideas aren't available yet. We mention them to be transparent about where we're headed:",
        items: [
          {
            title: "Savings that earn",
            text: "Putting your dollars to work. Optipagos would keep only a small share of what you earn, and the rest would be yours.",
            soon: true,
          },
          {
            title: "Digital pasanaku",
            text: "Automated savings circles among friends and family, with a very small fee for the service.",
            soon: true,
          },
          {
            title: "Payments for shops",
            text: "Processing your business's payments with a very small fee, and the option to give part back to your customer.",
            soon: true,
          },
          {
            title: "A record to access credit",
            text: "We're exploring ways for people without access to banking to show their payment history and get small loans. It's an idea under study.",
            soon: true,
          },
        ],
      },
    ],
    cta: {
      title: "Try it, no strings attached",
      text: "Join the closed beta and help us set fair rates.",
    },
  },
};

export default pages;
