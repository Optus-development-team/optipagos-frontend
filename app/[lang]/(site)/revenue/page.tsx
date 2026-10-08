import type { Metadata } from "next";
import { InfoRoute, infoMetadata } from "@/components/pages/info-route";

export const generateMetadata = ({ params }: PageProps<"/[lang]/revenue">): Promise<Metadata> =>
  infoMetadata("revenue", params);

export default function Page({ params }: PageProps<"/[lang]/revenue">) {
  return <InfoRoute pageKey="revenue" params={params} />;
}
