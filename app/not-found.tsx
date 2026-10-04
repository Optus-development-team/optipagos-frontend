import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Cloud, Sparkle } from "@/components/doodles";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <Logo />
      <div className="relative">
        <Cloud className="h-28 w-28 text-ink-400" />
        <Sparkle className="absolute -right-4 -top-2 h-7 w-7 animate-wiggle text-ochre" />
      </div>
      <h1 className="display text-6xl">Por aquí no es</h1>
      <p className="text-lg leading-snug">
        No encontramos esta página. Si venías a confirmar algo, abre el enlace desde tu chat de
        WhatsApp.
      </p>
      <Link href="/" className="btn btn-primary">
        Ir al inicio
      </Link>
    </main>
  );
}
