import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal/LegalPage";
import { privacy } from "@/content/legal/privacy";
import { href, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternates } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { title, description } = privacy[lang];
  return { title, description, alternates: alternates("privacy", lang) };
}

export default async function Page({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { legal } = await getDictionary(lang);
  const document = privacy[lang];

  return (
    <LegalPage
      icon="shield"
      eyebrow={document.eyebrow}
      title={document.title}
      summary={document.summary}
      updated={document.updated}
      sections={document.sections}
      other={{ href: href("terms", lang), label: legal.seeTerms }}
      labels={legal}
    />
  );
}
