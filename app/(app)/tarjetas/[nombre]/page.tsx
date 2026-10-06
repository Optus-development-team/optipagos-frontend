import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cardNames, WhatsAppCard, type CardName } from "@/assets/whatsapp/cards";

// Lienzo de las tarjetas de WhatsApp: `npm run cards` abre cada una y la captura como PNG.
export const metadata: Metadata = {
  title: "Tarjetas de WhatsApp",
  robots: { index: false, follow: false },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return cardNames.map((nombre) => ({ nombre }));
}

export default async function CardPage({ params }: { params: Promise<{ nombre: string }> }) {
  const { nombre } = await params;
  if (!cardNames.includes(nombre as CardName)) notFound();
  return <WhatsAppCard name={nombre as CardName} />;
}
