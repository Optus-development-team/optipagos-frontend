import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { BrandFooter } from "@/components/brand/BrandFooter";
import { Logo } from "@/components/brand/Logo";
import { Sparkle, Squiggle, Star } from "@/components/doodles";
import { DoodleIcon } from "@/components/icons";
import { Signer, type SignerIcons } from "@/components/signer/Signer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Confirma con tu huella",
  robots: { index: false, follow: false },
};

// Los iconos doodle se dibujan aquí, en el servidor, y viajan ya listos al componente cliente.
const icons: SignerIcons = {
  fingerprint: <DoodleIcon name="fingerprint" />,
  lock: <DoodleIcon name="lock" />,
  zap: <DoodleIcon name="zap" />,
  tick: <DoodleIcon name="tick" />,
  cross: <DoodleIcon name="cross" />,
  clock: <DoodleIcon name="clock" />,
  caution: <DoodleIcon name="caution" />,
  key: <DoodleIcon name="key" />,
  wallet: <DoodleIcon name="wallet" />,
  send: <DoodleIcon name="send" />,
};

export default async function SignerPage({ params }: { params: Promise<{ token: string }> }) {
  // Cada visita se renderiza al momento: la página lleva un nonce de CSP por petición.
  await connection();
  const { token } = await params;
  if (!/^[A-Za-z0-9_-]{16,128}$/.test(token)) notFound();

  return (
    <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col px-5 pb-8 pt-6">
      <Sparkle className="absolute right-4 top-24 h-7 w-7 animate-wiggle text-ochre" />
      <Star className="absolute left-2 top-[46%] hidden h-6 w-6 text-ink-400 sm:block" />

      <header className="flex items-center justify-between">
        <Logo size="sm" />
        <Squiggle className="h-4 w-20 text-ink-400" />
      </header>

      <main className="flex flex-1 flex-col justify-center py-8">
        <Signer token={token} icons={icons} chatUrl={site.chatUrl()} />
      </main>

      <BrandFooter compact />
    </div>
  );
}
