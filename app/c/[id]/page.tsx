import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandFooter } from "@/components/brand/BrandFooter";
import { Logo } from "@/components/brand/Logo";
import { Sparkle, Squiggle } from "@/components/doodles";
import { DoodleIcon } from "@/components/icons";
import { AutoRefresh } from "@/components/receipt/AutoRefresh";
import { ShareReceipt } from "@/components/receipt/ShareReceipt";
import { Celebrate } from "@/components/ui/Celebrate";
import { NotchCard } from "@/components/ui/NotchCard";
import { PageTransition } from "@/components/ui/PageTransition";
import { getReceipt } from "@/lib/backend";
import { receiptDate, receiptTitle } from "@/lib/receipt/format";
import { absoluteUrl, site } from "@/lib/site";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const receipt = await getReceipt(id).catch(() => null);
  if (!receipt) return { title: "Comprobante", robots: { index: false, follow: false } };
  const { title } = receiptTitle(receipt);
  const description = `${receipt.amount} ${receipt.currency} · de ${receipt.from} para ${receipt.to} · ${receiptDate(receipt)}`;
  const image = absoluteUrl(`/c/${receipt.id}/imagen`);
  return {
    title: `${title} · ${receipt.amount} ${receipt.currency}`,
    description,
    robots: { index: false, follow: false },
    alternates: { canonical: `/c/${receipt.id}` },
    openGraph: {
      title: `${title} · ${receipt.amount} ${receipt.currency}`,
      description,
      url: `/c/${receipt.id}`,
      images: [{ url: image, width: 1200, height: 630, alt: `Comprobante ${receipt.reference}` }],
    },
    twitter: { card: "summary_large_image", images: [image] },
  };
}

export default async function ReceiptPage({ params }: Props) {
  const { id } = await params;
  const receipt = await getReceipt(id);
  if (!receipt) notFound();

  const { title, eyebrow } = receiptTitle(receipt);
  const done = receipt.status === "CONFIRMED";
  const failed = receipt.status === "FAILED";
  const image = `/c/${receipt.id}/imagen`;

  return (
    <PageTransition className="relative mx-auto flex w-full max-w-md flex-1 flex-col px-5 pb-8 pt-6">
      <Sparkle className="absolute right-4 top-24 h-7 w-7 animate-wiggle text-ochre" />
      {receipt.status === "SUBMITTED" ? <AutoRefresh everyMs={4000} /> : null}

      <header className="flex items-center justify-between">
        <Link href="/" aria-label="Optipagos, inicio">
          <Logo size="sm" />
        </Link>
        <Squiggle className="h-4 w-20 text-ink-400" />
      </header>

      <main className="relative flex flex-1 flex-col justify-center py-8">
        {done ? <Celebrate /> : null}
        <NotchCard
          corner="tr"
          notch={[80, 80]}
          className="animate-pop"
          chip={
            <span className={`chip-tile ${failed ? "" : "tone-honey"}`}>
              <DoodleIcon
                name={done ? "tick" : failed ? "caution" : "clock"}
                className="h-9 w-9"
              />
            </span>
          }
        >
          <div className="px-6 pb-7 pt-6">
            <div className="flex min-h-[58px] flex-col justify-center pr-[70px]">
              <p className="hand text-lg leading-tight opacity-80">
                {eyebrow} · {receipt.reference}
              </p>
              <h1 className="display text-[2.6rem]">{title}</h1>
            </div>

            <p className="display mt-5 flex items-baseline gap-2 text-7xl">
              {receipt.amount}
              <span className="text-3xl opacity-70">{receipt.currency}</span>
            </p>

            <dl className="doodle-box tone-shell flat mt-5 flex flex-col gap-2 p-4 text-[0.98rem]">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="opacity-70">De</dt>
                <dd className="text-right font-bold [overflow-wrap:anywhere]">{receipt.from}</dd>
              </div>
              <hr className="dash-rule" />
              <div className="flex items-baseline justify-between gap-4">
                <dt className="opacity-70">Para</dt>
                <dd className="text-right font-bold [overflow-wrap:anywhere]">{receipt.to}</dd>
              </div>
              <hr className="dash-rule" />
              <div className="flex items-baseline justify-between gap-4">
                <dt className="opacity-70">Fecha</dt>
                <dd className="text-right font-bold">{receiptDate(receipt)}</dd>
              </div>
              {receipt.memo ? (
                <>
                  <hr className="dash-rule" />
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="opacity-70">Concepto</dt>
                    <dd className="text-right font-bold [overflow-wrap:anywhere]">{receipt.memo}</dd>
                  </div>
                </>
              ) : null}
            </dl>

            <div className="mt-5 flex flex-col gap-3">
              {failed ? (
                <p className="text-lg leading-snug">
                  Este pago no se completó y no se movió dinero. Puedes intentarlo otra vez desde
                  WhatsApp.
                </p>
              ) : (
                <ShareReceipt
                  imageUrl={image}
                  fileName={`comprobante-${receipt.reference}.png`}
                  text={`${title}: ${receipt.amount} ${receipt.currency} de ${receipt.from} para ${receipt.to}.`}
                  shareIcon={<DoodleIcon name="send" />}
                />
              )}
              <a href={site.chatUrl()} className="btn btn-block">
                Volver a WhatsApp
              </a>
              {receipt.verifyUrl ? (
                <a
                  href={receipt.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="link self-center text-sm opacity-80"
                >
                  Verificar este pago
                </a>
              ) : null}
            </div>
          </div>
        </NotchCard>
      </main>

      <BrandFooter compact />
    </PageTransition>
  );
}
