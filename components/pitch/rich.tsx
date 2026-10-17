import { Fragment, type ReactNode } from "react";

/**
 * Texto del pitch listo para "escribirse": cada palabra (o letra, en los títulos) va en su
 * propio <span> para que el tentáculo la escriba una por una.
 *
 *   *palabras*  → resaltado con rotulador (.mk)
 *   [[dato]]    → dato por confirmar (.pending)
 */
type Unit = "chars" | "words";

const TOKEN = /\*([^*]+)\*|\[\[([^\]]+)\]\]/g;

export function Rich({ text, unit = "words" }: { text: string; unit?: Unit }) {
  return <>{parse(text, unit, "r")}</>;
}

/** Texto plano, sin marcas (para el guion, títulos de pestaña y lectores de pantalla). */
export function plain(text: string): string {
  return text.replace(TOKEN, (_, mark: string | undefined, pending: string | undefined) => mark ?? pending ?? "");
}

function parse(text: string, unit: Unit, key: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let n = 0;
  for (const match of text.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) out.push(...words(text.slice(last, index), unit, `${key}-${n++}`));
    const [, mark, pending] = match;
    if (mark !== undefined) {
      out.push(
        <span key={`${key}-${n++}`} className="mk">
          {parse(mark, unit, `${key}-m${n}`)}
        </span>,
      );
    } else {
      out.push(
        <span key={`${key}-${n++}`} className="pending" title="Dato por confirmar">
          {words(pending ?? "", unit, `${key}-p${n}`)}
        </span>,
      );
    }
    last = index + match[0].length;
  }
  if (last < text.length) out.push(...words(text.slice(last), unit, `${key}-${n++}`));
  return out;
}

/** Palabras separadas por espacios normales (así el texto sigue partiéndose en líneas). */
function words(text: string, unit: Unit, key: string): ReactNode[] {
  return text.split(/(\s+)/).map((part, i) => {
    if (!part) return null;
    if (/^\s+$/.test(part)) return <Fragment key={`${key}-${i}`}> </Fragment>;
    if (unit === "words") {
      return (
        <span key={`${key}-${i}`} className="w">
          {part}
        </span>
      );
    }
    return (
      <span key={`${key}-${i}`} className="wd">
        {Array.from(part).map((char, j) => (
          <span key={j} className="c">
            {char}
          </span>
        ))}
      </span>
    );
  });
}
