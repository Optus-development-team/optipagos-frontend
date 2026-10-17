#!/usr/bin/env node
/**
 * Exporta el pitch (/pitch) a PDF, una página por diapositiva, igual a como se ve en vivo.
 *
 *   npm run dev                      # o npm run build && npm start
 *   npm run pitch:pdf                # → public/pitch/optipagos-pitch.pdf
 *
 * Abre cada diapositiva con /pitch?static&s=<n> (ya dibujada, con los teléfonos mostrando el
 * cuadro `poster` de content/pitch/es.ts), la captura y junta las capturas en un PDF de
 * 1920 × 1080. Necesita Google Chrome: el Chromium de Playwright no reproduce H.264 y los
 * teléfonos saldrían en negro.
 *
 * Variables: PITCH_BASE_URL (por defecto http://localhost:3000) y CHROME_PATH para usar otro
 * Chrome en vez del instalado en el sistema.
 */
import { mkdir, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const base = (process.env.PITCH_BASE_URL ?? "http://localhost:3000").replace(/\/+$/, "");
const out = join(root, "public", "pitch", "optipagos-pitch.pdf");

const browser = await chromium.launch({
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: "chrome" }),
  // WebGL sin tarjeta de video (los teléfonos 3D).
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
try {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1.5 });
  const shots = [];
  let total = 1;
  for (let n = 1; n <= total; n++) {
    const response = await page.goto(`${base}/pitch?static&s=${n}`, { waitUntil: "load", timeout: 120_000 });
    if (!response?.ok()) throw new Error(`diapositiva ${n}: HTTP ${response?.status()} en ${base}`);
    // El indicador de Next en desarrollo no va en el PDF.
    await page.addStyleTag({ content: "nextjs-portal { display: none !important; }" });
    await page.waitForFunction(() => document.documentElement.dataset.pitchReady === "1", null, {
      timeout: 60_000,
    });
    total = Number(await page.evaluate(() => document.documentElement.dataset.pitchTotal)) || total;
    await page.waitForTimeout(250);
    shots.push(await page.screenshot({ type: "jpeg", quality: 88 }));
    console.log(`✓ diapositiva ${n}/${total}`);
  }

  const pages = shots
    .map((shot) => `<img src="data:image/jpeg;base64,${shot.toString("base64")}">`)
    .join("");
  await page.setContent(
    `<!doctype html><style>@page{size:1920px 1080px;margin:0}html,body{margin:0}img{display:block;width:1920px;height:1080px;break-after:page}</style>${pages}`,
  );
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, await page.pdf({ width: "1920px", height: "1080px", printBackground: true }));
  const { size } = await stat(out);
  console.log(`✓ ${out.replace(`${root}/`, "")}  ${(size / 1024 / 1024).toFixed(1)} MB`);
} finally {
  await browser.close();
}
