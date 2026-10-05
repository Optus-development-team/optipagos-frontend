import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { Logo } from "@/components/brand/Logo";
import { OptusMark } from "@/components/brand/marks";
import { Squiggle } from "@/components/doodles";
import { DoodleIcon, type DoodleIconName } from "@/components/icons";
import { site } from "@/lib/site";

const product = [
  { href: "/#como-funciona", label: "Cómo funciona" },
  { href: "/#que-puedes-hacer", label: "Qué puedes hacer" },
  { href: "/#seguridad", label: "Seguridad" },
  { href: "/#preguntas", label: "Preguntas" },
];

const legal = [
  { href: "/privacidad", label: "Política de privacidad" },
  { href: "/terminos", label: "Términos de servicio" },
];

/** Pie del sitio: navegación, páginas legales, contacto, redes y la marca madre. */
export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-5 pb-10">
      <Squiggle className="draw mx-auto mb-10 h-5 w-40 text-ink-300" />

      <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" aria-label="Optipagos, inicio">
            <Logo />
          </Link>
          <p className="mt-3 max-w-xs leading-snug opacity-80">
            Tu billetera de dólares digitales dentro de WhatsApp. Simple, rápida y solo tuya.
          </p>
          <a href={site.whatsappUrl()} className="btn btn-primary btn-sm mt-5">
            <DoodleIcon name="whatsapp" className="h-5 w-5" />
            Escríbenos
          </a>
        </div>

        <nav aria-label="Optipagos">
          <h2 className="display text-2xl">Optipagos</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {product.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline hover:decoration-wavy">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal y ayuda">
          <h2 className="display text-2xl">Legal y ayuda</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline hover:decoration-wavy">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.optus.email}`}
                className="hover:underline hover:decoration-wavy"
              >
                {site.optus.email}
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="display text-2xl">Síguenos</h2>
          <ul className="mt-3 flex flex-wrap gap-3">
            {site.optus.social.map((network) => (
              <li key={network.name}>
                <a
                  href={network.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.optus.name} en ${network.name}`}
                  title={network.name}
                  className="chip-tile !h-12 !w-12"
                >
                  <DoodleIcon name={network.icon as DoodleIconName} className="h-6 w-6" />
                </a>
              </li>
            ))}
          </ul>
          <a
            href={site.optus.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link mt-5 inline-flex items-center gap-1"
          >
            Conoce Optus
            <MdArrowOutward className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      <hr className="dash-rule my-8" />

      <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
        <a
          href={site.optus.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3"
          aria-label="Ir a optus.lat"
        >
          <OptusMark className="h-9 w-auto" />
          <span className="opacity-80">
            Optipagos es una marca perteneciente a <strong>Optus</strong>.
          </span>
        </a>
        <p className="hand text-base opacity-60">
          © {new Date().getFullYear()} Optus · {site.optus.location}
        </p>
      </div>
    </footer>
  );
}
