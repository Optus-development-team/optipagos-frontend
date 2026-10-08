import type { Metadata } from "next";
import { InfoRoute, infoMetadata } from "@/components/pages/info-route";

export const generateMetadata = ({ params }: PageProps<"/[lang]/gtm">): Promise<Metadata> =>
  infoMetadata("gtm", params);

export default function Page({ params }: PageProps<"/[lang]/gtm">) {
  return <InfoRoute pageKey="gtm" params={params} />;
}
