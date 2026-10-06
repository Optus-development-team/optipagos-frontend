import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RootShell } from "@/components/layout/RootShell";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/request";
import { baseMetadata, baseViewport } from "@/lib/metadata";
import "../globals.css";

// Layout raíz de los enlaces personales (/w/:token, /c/:id) y de las tarjetas del bot. Sus
// direcciones no llevan el idioma: se toma el guardado o el del navegador en cada visita.
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  return baseMetadata(locale, await getDictionary(locale));
}

export const viewport = baseViewport;

export default async function AppRootLayout({ children }: { children: ReactNode }) {
  return <RootShell locale={await getRequestLocale()}>{children}</RootShell>;
}
