import Image from "next/image";
import { SiMeta, SiStellar, SiWhatsapp } from "react-icons/si";
import type { ActorLogoName } from "@/content/pages";

/** Logo de un aliado: los de react-icons se pintan con el color del texto; el resto son archivos de public/logos. */
export function ActorLogo({ name, className = "h-8 w-8" }: { name: ActorLogoName; className?: string }) {
  switch (name) {
    case "whatsapp":
      return <SiWhatsapp className={className} aria-hidden="true" />;
    case "meta":
      return <SiMeta className={className} aria-hidden="true" />;
    case "stellar":
      return <SiStellar className={className} aria-hidden="true" />;
    default:
      return (
        <Image
          src={`/logos/${name}.${name === "tilcai" ? "png" : "svg"}`}
          alt=""
          width={64}
          height={64}
          unoptimized
          className={`${className} object-contain ${name === "tilcai" ? "rounded-md" : ""}`}
        />
      );
  }
}
