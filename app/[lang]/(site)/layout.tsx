import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/** Marco de las páginas públicas: la cabecera y el pie se quedan; el contenido cambia. */
export default async function SiteLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <SiteHeader locale={lang} nav={dict.nav} />
      {children}
      <SiteFooter locale={lang} dict={dict} />
    </>
  );
}
