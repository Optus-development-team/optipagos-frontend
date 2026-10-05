#!/usr/bin/env node
/**
 * Captura las tarjetas de WhatsApp como PNG.
 *
 *   npm run build && npm start        # el sitio en marcha (o npm run dev)
 *   npm run cards                     # → assets/whatsapp/<nombre>.png y la vista previa del sitio
 *
 * Abre /tarjetas/<nombre> en un navegador sin interfaz (1200 × 630) y guarda la captura.
 * optipagos-backend detecta el cambio por el ETag y vuelve a subir la imagen a WhatsApp.
 *
 * Variables: CARDS_BASE_URL (por defecto http://localhost:3000) y CHROME_PATH si quieres usar
 * un Chrome/Chromium ya instalado en vez del de Playwright (`npx playwright install chromium`).
 */
import { copyFile, mkdir, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const base = (process.env.CARDS_BASE_URL ?? "http://localhost:3000").replace(/\/+$/, "");
const out = join(root, "assets", "whatsapp");
const names = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["bienvenida", "billetera-lista", "confirmar-envio", "pago-enviado", "dinero-recibido", "og"];

await mkdir(out, { recursive: true });
const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {},
);
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
    // Sin animaciones: la captura siempre sale igual.
    reducedMotion: "reduce",
  });
  for (const name of names) {
    const response = await page.goto(`${base}/tarjetas/${name}`, { waitUntil: "networkidle" });
    if (!response?.ok()) throw new Error(`${name}: HTTP ${response?.status()} en ${base}`);
    await page.evaluate(() => document.fonts.ready);
    const file = join(out, `${name}.png`);
    await page.locator("#tarjeta").screenshot({ path: file, type: "png" });
    const { size } = await stat(file);
    console.log(`✓ ${name}.png  ${(size / 1024).toFixed(0)} kB`);
  }
  if (names.includes("og")) {
    for (const file of ["opengraph-image.png", "twitter-image.png"]) {
      await copyFile(join(out, "og.png"), join(root, "app", file));
    }
    console.log("✓ app/opengraph-image.png y app/twitter-image.png (vista previa del enlace)");
  }
} finally {
  await browser.close();
}
