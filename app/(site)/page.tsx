import type { Metadata } from "next";
import { AboutOptus } from "@/components/landing/AboutOptus";
import { Faq, faqJsonLd } from "@/components/landing/Faq";
import { Features } from "@/components/landing/Features";
import { FinalCta } from "@/components/landing/FinalCta";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Safety } from "@/components/landing/Safety";
import { Ticker } from "@/components/landing/Ticker";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageTransition } from "@/components/ui/PageTransition";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <PageTransition>
      <JsonLd data={[organizationJsonLd, websiteJsonLd, faqJsonLd]} />
      <main className="flex flex-1 flex-col gap-20 pb-20 sm:gap-28">
        <div className="mx-auto w-full max-w-6xl px-5">
          <Hero />
        </div>
        <Ticker />
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-5 sm:gap-28">
          <HowItWorks />
          <Features />
          <Safety />
          <Faq />
          <AboutOptus />
          <FinalCta />
        </div>
      </main>
    </PageTransition>
  );
}
