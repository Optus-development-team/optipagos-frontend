import Link from "next/link";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

/** Franja sobre la cabecera: avisa que Optipagos es una demo temprana y lleva a la beta. */
export function DemoBanner({ locale, t, betaId }: { locale: Locale; t: Dictionary["demo"]; betaId: string }) {
  return (
    <div className="bg-ink text-cream">
      <p className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 py-2 text-center">
        <span className="pill honey !py-0 text-base">{t.badge}</span>
        <span>{t.text}</span>
        <Link href={href("home", locale, `#${betaId}`)} className="link text-honey">
          {t.cta}
        </Link>
      </p>
    </div>
  );
}
