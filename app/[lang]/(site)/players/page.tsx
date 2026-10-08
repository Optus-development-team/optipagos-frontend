import type { Metadata } from "next";
import { InfoRoute, infoMetadata } from "@/components/pages/info-route";

export const generateMetadata = ({ params }: PageProps<"/[lang]/players">): Promise<Metadata> =>
  infoMetadata("players", params);

export default function Page({ params }: PageProps<"/[lang]/players">) {
  return <InfoRoute pageKey="players" params={params} />;
}
