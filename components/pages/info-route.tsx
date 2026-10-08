import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoPageView } from "@/components/pages/InfoPageView";
import { infoPages, type InfoKey } from "@/content/pages";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternates } from "@/lib/seo";

/** Metadatos de una página informativa: título, descripción e idiomas alternos. */
export async function infoMetadata(key: InfoKey, params: Promise<{ lang: string }>): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { label, description } = infoPages[lang][key];
  return { title: label, description, alternates: alternates(key, lang) };
}

/** Cuerpo de la ruta de una página informativa. */
export async function InfoRoute({ pageKey, params }: { pageKey: InfoKey; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return <InfoPageView page={infoPages[lang][pageKey]} current={pageKey} locale={lang} dict={dict} />;
}
