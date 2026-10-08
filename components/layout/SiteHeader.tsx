import Link from "next/link";
import { MdWhatsapp } from "react-icons/md";
import { Logo } from "@/components/brand/Logo";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import { LangSwitch } from "./LangSwitch";

/** Cabecera del sitio. Vive en el layout: no se mueve al cambiar de página. */
export function SiteHeader({ locale, nav }: { locale: Locale; nav: Dictionary["nav"] }) {
  const home = href("home", locale);
  const links = [nav.how, nav.features, nav.safety, nav.beta];

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-5">
      <Link href={home} aria-label={nav.home} className="transition-transform hover:-rotate-2">
        <Logo />
      </Link>
      <nav aria-label={nav.sections} className="hand hidden items-center gap-7 text-xl lg:flex">
        {links.map((link) => (
          <Link key={link.id} href={`${home}#${link.id}`} className="nav-link">
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        {/* En pantallas angostas el selector de idioma está en el pie. */}
        <LangSwitch locale={locale} label={nav.language} className="max-sm:hidden" />
        <a href={site.whatsappUrl()} className="btn btn-primary btn-sm">
          <MdWhatsapp className="h-5 w-5" aria-hidden="true" />
          <span className="whitespace-nowrap">
            {nav.open}
            <span className="hidden sm:inline">{nav.openSuffix}</span>
          </span>
        </a>
      </div>
    </header>
  );
}
