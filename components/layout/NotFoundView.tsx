import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Cloud, Sparkle } from "@/components/doodles";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

/** Página «no encontrada», igual para el sitio y para los enlaces personales. */
export function NotFoundView({ locale, t }: { locale: Locale; t: Dictionary["notFound"] }) {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <Logo />
      <div className="relative">
        <Cloud className="h-28 w-28 text-ink-400" />
        <Sparkle className="absolute -right-4 -top-2 h-7 w-7 animate-wiggle text-ochre" />
      </div>
      <h1 className="display text-6xl">{t.title}</h1>
      <p className="text-lg leading-snug">{t.text}</p>
      <Link href={href("home", locale)} className="btn btn-primary">
        {t.back}
      </Link>
    </main>
  );
}
