import { OptusMark } from "./marks";

/** Pie de marca: Optipagos pertenece a Optus. */
export function BrandFooter({ compact = false }: { compact?: boolean }) {
  return (
    <footer
      className={`flex flex-col items-center gap-2 text-center ${compact ? "text-sm" : "text-base"}`}
    >
      <OptusMark className={compact ? "h-7 w-auto" : "h-10 w-auto"} />
      <p className="opacity-80">
        Optipagos es una marca perteneciente a <strong>Optus</strong>.
      </p>
    </footer>
  );
}
