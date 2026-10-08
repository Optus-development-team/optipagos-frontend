<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Historial de prompts y salidas

Cada prompt del usuario y la salida del agente se registran en `PROMPT_HISTORY.md`, en orden cronológico (lo más antiguo arriba), para poder trazar quién pidió qué y cuándo.

- Antes de cerrar cada respuesta, agrega una entrada al final de `PROMPT_HISTORY.md`. Una entrada por prompt.
- Formato de la entrada: encabezado `## <timestamp ISO 8601 con zona> · <usuario>`, luego `**Prompt**` con el texto del usuario (literal, sin recortar; cita los adjuntos por nombre) y `**Salida del agente**` con lo que se hizo: archivos creados o modificados, decisiones, verificaciones y lo que quedó pendiente.
- Usuario: el de `git config user.name`. Timestamp: la hora real (`date -Is`), nunca estimada.
- No reescribas ni borres entradas anteriores; solo agrega. No registres secretos, claves ni datos personales de terceros.
- Los commits que cambien código deben incluir la entrada correspondiente del historial.
