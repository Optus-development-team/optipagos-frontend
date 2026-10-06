import { NotFoundView } from "@/components/layout/NotFoundView";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/request";

export default async function NotFound() {
  const locale = await getRequestLocale();
  return <NotFoundView locale={locale} t={(await getDictionary(locale)).notFound} />;
}
