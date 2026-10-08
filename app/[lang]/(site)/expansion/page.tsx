import type { Metadata } from "next";
import { InfoRoute, infoMetadata } from "@/components/pages/info-route";

export const generateMetadata = ({ params }: PageProps<"/[lang]/expansion">): Promise<Metadata> =>
  infoMetadata("expansion", params);

export default function Page({ params }: PageProps<"/[lang]/expansion">) {
  return <InfoRoute pageKey="expansion" params={params} />;
}
