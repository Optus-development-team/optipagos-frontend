import { MdArrowOutward } from "react-icons/md";
import { Brandify } from "@/components/brand/Brandify";
import { OptusMark } from "@/components/brand/marks";
import { Burst, Swirl } from "@/components/doodles";
import { DoodleIcon, type DoodleIconName } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { fill, type Dictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";

/** Quién está detrás: Optus, con sus redes y el enlace a optus.lat. */
export function AboutOptus({ t }: { t: Dictionary["about"] }) {
  return (
    <section id="optus" className="scroll-mt-8">
      <Reveal effect="tilt">
        <div className="doodle-box lively relative grid items-center gap-8 px-6 py-9 sm:px-12 md:grid-cols-[auto_1fr_auto]">
          <Swirl className="absolute right-5 top-4 hidden h-12 w-12 animate-spin-slow text-ink-200 sm:block" />
          <div className="relative mx-auto md:mx-0">
            <OptusMark className="h-20 w-auto animate-float sm:h-24" />
            <Burst className="absolute -right-7 -top-3 h-8 w-8 -scale-x-100 text-ochre" />
          </div>

          <div>
            <p className="hand text-2xl text-ink-600">{t.eyebrow}</p>
            <h2 className="display text-5xl sm:text-6xl">
              <Brandify>{t.title}</Brandify>
            </h2>
            <p className="mt-3 max-w-xl text-lg leading-snug">
              <Brandify>{t.text}</Brandify>
            </p>
            <ul className="mt-5 flex flex-wrap items-center gap-3">
              {site.optus.social.map((network) => (
                <li key={network.name}>
                  <a
                    href={network.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={fill(t.socialAria, { company: site.optus.name, network: network.name })}
                    title={network.name}
                    className="chip-tile !h-12 !w-12"
                  >
                    <DoodleIcon name={network.icon as DoodleIconName} className="h-6 w-6" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <a
            href={site.optus.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-honey justify-self-start md:justify-self-end"
          >
            <Brandify>{t.visit}</Brandify>
            <MdArrowOutward className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
