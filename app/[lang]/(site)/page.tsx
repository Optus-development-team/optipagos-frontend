import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutOptus } from "@/components/landing/AboutOptus";
import { BetaSignup } from "@/components/landing/BetaSignup";
import { BuyDollars } from "@/components/landing/BuyDollars";
import { Faq, faqJsonLd } from "@/components/landing/Faq";
import { Features } from "@/components/landing/Features";
import { FinalCta } from "@/components/landing/FinalCta";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Safety } from "@/components/landing/Safety";
import { Ticker } from "@/components/landing/Ticker";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageTransition } from "@/components/ui/PageTransition";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternates, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? { alternates: alternates("home", lang) } : {};
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { nav } = dict;

  return (
    <PageTransition>
      <JsonLd
        data={[organizationJsonLd(dict), websiteJsonLd(lang, dict), faqJsonLd(dict.faq)]}
      />
      <main className="flex flex-1 flex-col gap-20 pb-20 sm:gap-28">
        <div className="mx-auto w-full max-w-6xl px-5">
          <Hero t={dict.hero} nav={nav} />
        </div>
        <Ticker t={dict.ticker} />
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-5 sm:gap-28">
          <HowItWorks t={dict.how} id={nav.how.id} />
          <Features t={dict.features} id={nav.features.id} />
          <BuyDollars t={dict.buy} betaId={dict.beta.id} />
          <Safety t={dict.safety} id={nav.safety.id} />
          <Faq t={dict.faq} id={nav.faq.id} />
          <BetaSignup t={dict.beta} />
          <AboutOptus t={dict.about} />
          <FinalCta t={dict.finalCta} openAria={nav.openAria} betaId={nav.beta.id} />
        </div>
      </main>
    </PageTransition>
  );
}
