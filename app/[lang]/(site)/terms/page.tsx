import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal/LegalPage";
import { terms } from "@/content/legal/terms";
import { href, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternates } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/terms">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { title, description } = terms[lang];
  return { title, description, alternates: alternates("terms", lang) };
}

export default async function Page({ params }: PageProps<"/[lang]/terms">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { legal } = await getDictionary(lang);
  const document = terms[lang];

  return (
    <LegalPage
      icon="contract"
      eyebrow={document.eyebrow}
      title={document.title}
      summary={document.summary}
      updated={document.updated}
      sections={document.sections}
      other={{ href: href("privacy", lang), label: legal.seePrivacy }}
      labels={legal}
    />
  );
}
