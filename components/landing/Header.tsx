import Link from "next/link";
import { MdWhatsapp } from "react-icons/md";
import { Logo } from "@/components/brand/Logo";
import { site } from "@/lib/site";

const links = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#que-puedes-hacer", label: "Qué puedes hacer" },
  { href: "#seguridad", label: "Seguridad" },
  { href: "#preguntas", label: "Preguntas" },
];

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-5">
      <Link href="/" aria-label="Optipagos, inicio">
        <Logo />
      </Link>
      <nav aria-label="Secciones" className="hand hidden items-center gap-7 text-xl lg:flex">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="hover:underline hover:decoration-wavy">
            {link.label}
          </a>
        ))}
      </nav>
      <a href={site.whatsappUrl()} className="btn btn-primary btn-sm">
        <MdWhatsapp className="h-5 w-5" aria-hidden="true" />
        <span className="whitespace-nowrap">
          Abrir<span className="hidden sm:inline"> en WhatsApp</span>
        </span>
      </a>
    </header>
  );
}
