import Link from "next/link";
import { Brandify } from "@/components/brand/Brandify";
import { ActorLogo } from "@/components/pages/ActorLogo";
import { Squiggle, Sparkle } from "@/components/doodles";
import { DoodleIcon } from "@/components/icons";
import { NotchCard } from "@/components/ui/NotchCard";
import { PageTransition } from "@/components/ui/PageTransition";
import { Reveal } from "@/components/ui/Reveal";
import type { InfoKey, InfoPage } from "@/content/pages";
import { infoKeys, infoPages } from "@/content/pages";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

/** Marco común de las páginas informativas (/personas, /expansion, /gtm, /actores, /recaudacion). */
export function InfoPageView({
  page,
  current,
  locale,
  dict,
}: {
  page: InfoPage;
  current: InfoKey;
  locale: Locale;
  dict: Dictionary;
}) {
  const others = infoKeys.filter((key) => key !== current);
  const pages = infoPages[locale];

  return (
    <PageTransition>
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-14 px-5 pb-20 pt-2">
        <NotchCard
          corner="tr"
          tone="honey"
          notch={[92, 92]}
          className="animate-rise"
          chip={
            <span className="chip-tile tone-ink boil">
              <DoodleIcon name={page.icon} className="h-11 w-11" />
            </span>
          }
        >
          <div className="relative px-6 pb-10 pt-8 sm:px-12">
            <Sparkle className="absolute bottom-6 right-8 hidden h-8 w-8 animate-twinkle sm:block" />
            <p className="hand pr-[84px] text-2xl text-ink-600">{page.eyebrow}</p>
            <h1 className="display pr-[84px] text-6xl sm:text-8xl">{page.title}</h1>
            <p className="mt-5 max-w-2xl text-xl leading-snug">{page.lead}</p>
          </div>
        </NotchCard>

        {page.sections.map((section) => (
          <Reveal key={section.title} as="section">
            <h2 className="display text-4xl sm:text-5xl">
              <Brandify>{section.title}</Brandify>
            </h2>
            {section.text && (
              <p className="mt-3 max-w-2xl text-lg leading-snug">
                <Brandify>{section.text}</Brandify>
              </p>
            )}
            {section.items && (
              <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item) => (
                  <li key={item.title} className="doodle-box flex flex-col px-5 pb-6 pt-5">
                    {item.soon && <span className="pill honey mb-3 self-start">{dict.pageLabels.soon}</span>}
                    <h3 className="display text-3xl">{item.title}</h3>
                    <p className="mt-2 text-lg leading-snug">
                      <Brandify>{item.text}</Brandify>
                    </p>
                    {item.links && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {item.links.map((link) => (
                          <li key={link.name}>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="pill hover:bg-honey"
                              aria-label={`${link.name} (${dict.pageLabels.opensNew})`}
                            >
                              <ActorLogo name={link.logo} className="h-5 w-5" />
                              {link.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}

        <Reveal effect="pop">
          <NotchCard corner="br" tone="ink" notch={[92, 92]}>
            <div className="px-6 pb-10 pt-8 sm:px-12">
              <h2 className="display text-5xl sm:text-6xl">{page.cta.title}</h2>
              <p className="mt-3 max-w-xl text-xl leading-snug text-ink-100">{page.cta.text}</p>
              <Link
                href={href("home", locale, `#${dict.beta.id}`)}
                className="btn btn-primary mt-6"
              >
                {dict.demo.cta}
              </Link>
            </div>
          </NotchCard>
        </Reveal>

        <nav aria-label={dict.explore.title}>
          <Squiggle className="draw mx-auto mb-6 h-5 w-32 text-honey" />
          <h2 className="display text-center text-3xl">{dict.explore.title}</h2>
          <ul className="mt-4 flex flex-wrap justify-center gap-3">
            {others.map((key) => (
              <li key={key}>
                <Link href={href(key, locale)} className="pill hover:bg-honey">
                  {pages[key].label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </PageTransition>
  );
}
