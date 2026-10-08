import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { Brandify } from "@/components/brand/Brandify";
import { Logo } from "@/components/brand/Logo";
import { OptusMark } from "@/components/brand/marks";
import { Squiggle } from "@/components/doodles";
import { DoodleIcon, type DoodleIconName } from "@/components/icons";
import { infoKeys, infoPages } from "@/content/pages";
import { href, type Locale } from "@/i18n/config";
import { fill, type Dictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import { LangSwitch } from "./LangSwitch";

/** Pie del sitio: navegación, páginas legales, contacto, redes y la marca madre. */
export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { nav, footer } = dict;
  const home = href("home", locale);
  const product = [nav.how, nav.features, nav.safety, nav.faq, nav.beta];
  const legal = [
    { href: href("privacy", locale), label: footer.privacy },
    { href: href("terms", locale), label: footer.terms },
  ];

  return (
    <footer className="mx-auto w-full max-w-6xl px-5 pb-10">
      <Squiggle className="draw mx-auto mb-10 h-5 w-40 text-ink-300" />

      <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr_1.2fr]">
        <div>
          <Link href={home} aria-label={nav.home}>
            <Logo />
          </Link>
          <p className="mt-3 max-w-xs leading-snug opacity-80">
            {footer.tagline}
          </p>
          <a href={site.whatsappUrl()} className="btn btn-primary btn-sm mt-5">
            <DoodleIcon name="whatsapp" className="h-5 w-5" />
            {footer.write}
          </a>
        </div>

        <nav aria-label="Optipagos">
          <h2 className="display text-2xl">Optipagos</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {product.map((item) => (
              <li key={item.id}>
                <Link href={`${home}#${item.id}`} className="hover:underline hover:decoration-wavy">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={dict.explore.title}>
          <h2 className="display text-2xl">{dict.explore.title}</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {infoKeys.map((key) => (
              <li key={key}>
                <Link href={href(key, locale)} className="hover:underline hover:decoration-wavy">
                  {infoPages[locale][key].label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={footer.legalTitle}>
          <h2 className="display text-2xl">{footer.legalTitle}</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline hover:decoration-wavy">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.optus.email}`}
                className="hover:underline hover:decoration-wavy"
              >
                {site.optus.email}
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="display text-2xl">{footer.follow}</h2>
          <ul className="mt-3 flex flex-wrap gap-3">
            {site.optus.social.map((network) => (
              <li key={network.name}>
                <a
                  href={network.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={fill(dict.about.socialAria, { company: site.optus.name, network: network.name })}
                  title={network.name}
                  className="chip-tile !h-12 !w-12"
                >
                  <DoodleIcon name={network.icon as DoodleIconName} className="h-6 w-6" />
                </a>
              </li>
            ))}
          </ul>
          <a
            href={site.optus.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link mt-5 inline-flex items-center gap-1"
          >
            <Brandify>{footer.meetOptus}</Brandify>
            <MdArrowOutward className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      <hr className="dash-rule my-8" />

      <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
        <a
          href={site.optus.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3"
          aria-label={footer.goToOptus}
        >
          <OptusMark className="h-9 w-auto" />
          <span className="opacity-80">
            {footer.brandLead} <strong className="optus-word">Optus</strong>.
          </span>
        </a>
        <div className="flex items-center gap-4">
          <LangSwitch locale={locale} label={nav.language} />
          <p className="hand text-base opacity-60">
            © {new Date().getFullYear()} <span className="optus-word">Optus</span> · {site.optus.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
