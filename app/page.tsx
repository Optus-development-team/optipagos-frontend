import { BrandFooter } from "@/components/brand/BrandFooter";
import { Faq } from "@/components/landing/Faq";
import { Features } from "@/components/landing/Features";
import { FinalCta } from "@/components/landing/FinalCta";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Safety } from "@/components/landing/Safety";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-20 px-5 pb-20 sm:gap-28">
        <Hero />
        <HowItWorks />
        <Features />
        <Safety />
        <Faq />
        <FinalCta />
      </main>
      <div className="mx-auto w-full max-w-6xl px-5 pb-10">
        <hr className="dash-rule mb-8" />
        <BrandFooter />
        <p className="hand mt-3 text-center text-base opacity-60">© 2026 Optus</p>
      </div>
    </>
  );
}
