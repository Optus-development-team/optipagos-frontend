import { lang } from "next/root-params";
import { NotFoundView } from "@/components/layout/NotFoundView";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function NotFound() {
  const current = await lang();
  const locale = isLocale(current) ? current : defaultLocale;
  return <NotFoundView locale={locale} t={(await getDictionary(locale)).notFound} />;
}
