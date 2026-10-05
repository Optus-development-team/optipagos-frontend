import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cardNames, type CardName } from "@/assets/whatsapp/cards";

/**
 * Sirve las tarjetas capturadas (assets/whatsapp/<nombre>.png). optipagos-backend las pide
 * aquí, las sube a WhatsApp y guarda su media id; con el ETag sabe si cambiaron.
 */
export async function GET(request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const card = name.replace(/\.png$/, "") as CardName;
  if (!cardNames.includes(card)) return new Response("No existe", { status: 404 });

  let png: Buffer;
  try {
    png = await readFile(join(process.cwd(), "assets", "whatsapp", `${card}.png`));
  } catch {
    return new Response("Tarjeta sin capturar: ejecuta npm run cards", { status: 404 });
  }
  const etag = `"${createHash("sha256").update(png).digest("hex").slice(0, 32)}"`;
  const headers = {
    ETag: etag,
    "Cache-Control": "public, max-age=300, must-revalidate",
  };
  if (request.headers.get("if-none-match") === etag) {
    return new Response(null, { status: 304, headers });
  }
  return new Response(new Uint8Array(png), {
    headers: { ...headers, "Content-Type": "image/png", "Content-Length": String(png.length) },
  });
}
