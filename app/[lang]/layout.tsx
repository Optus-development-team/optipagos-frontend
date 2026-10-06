import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RootShell } from "@/components/layout/RootShell";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { baseMetadata, baseViewport } from "@/lib/metadata";
import "../globals.css";

// Layout raíz del sitio (portada y páginas legales): una versión estática por idioma.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? baseMetadata(lang, await getDictionary(lang)) : {};
}

export const viewport = baseViewport;

export default async function SiteRootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <RootShell locale={lang}>{children}</RootShell>;
}
