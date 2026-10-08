import type { Metadata } from "next";
import { InfoRoute, infoMetadata } from "@/components/pages/info-route";

export const generateMetadata = ({ params }: PageProps<"/[lang]/people">): Promise<Metadata> =>
  infoMetadata("people", params);

export default function Page({ params }: PageProps<"/[lang]/people">) {
  return <InfoRoute pageKey="people" params={params} />;
}
