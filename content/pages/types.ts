import type { DoodleIconName } from "@/components/icons";

/** Logos de aliados que se muestran en las tarjetas (ver components/pages/ActorLogo.tsx). */
export type ActorLogoName = "whatsapp" | "meta" | "avalanche" | "stellar" | "aave" | "blend" | "tilcai";

export interface InfoLink {
  name: string;
  url: string;
  logo: ActorLogoName;
}

export interface InfoItem {
  title: string;
  text: string;
  /** Idea que aún no está disponible (se marca como «pronto»). */
  soon?: boolean;
  /** Aliados con su logo y enlace a su sitio. */
  links?: InfoLink[];
}

export interface InfoSection {
  title: string;
  text?: string;
  items?: InfoItem[];
}

export interface InfoPage {
  /** Nombre corto para el menú y el pie. */
  label: string;
  icon: DoodleIconName;
  eyebrow: string;
  title: string;
  /** Descripción para buscadores y vistas previas. */
  description: string;
  lead: string;
  sections: InfoSection[];
  cta: { title: string; text: string };
}

/** Páginas informativas, por clave de ruta (ver i18n/config.ts). */
export interface InfoPages {
  people: InfoPage;
  expansion: InfoPage;
  gtm: InfoPage;
  players: InfoPage;
  revenue: InfoPage;
}

export type InfoKey = keyof InfoPages;
export const infoKeys: InfoKey[] = ["people", "expansion", "gtm", "players", "revenue"];
