// Prueba de extremo a extremo de la página de firma (/w/:token) en un navegador real, con un
// autenticador virtual de Chromium en el lugar de la huella del teléfono.
//
// Sirve para lo que una passkey simulada en Node no puede probar: que lo que produce el
// navegador (clientDataJSON, authenticatorData y la firma) lo acepta el backend y, con una
// billetera de contrato (TILCAI_SCA), la propia red, que comprueba esa firma en la cadena.
//
//   # backend de pruebas con el canal de desarrollo y este sitio como origen de las passkeys:
//   #   PUBLIC_BASE_URL=http://localhost:3312 DEV_CHANNEL_ENABLED=true WHATSAPP_MODE=console …
//   # este sitio apuntando a ese backend:
//   #   BACKEND_URL=http://127.0.0.1:3299 NEXT_PUBLIC_API_URL= next build && next start -p 3312
//   E2E_FUNDER_PRIVATE_KEY=0x… node scripts/e2e-firma.mjs
//
// Variables: E2E_SITE_URL (http://localhost:3312), E2E_BACKEND_URL (http://127.0.0.1:3299),
// E2E_RPC_URL (Fuji), E2E_USDC (USDC de Fuji), E2E_SHOTS (carpeta para capturas, opcional).
// Mueve 0.05 USDC de testnet desde E2E_FUNDER_PRIVATE_KEY (que paga su gas) y los devuelve.
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";
import { createPublicClient, createWalletClient, erc20Abi, formatUnits, getAddress, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";

const SITE = (process.env.E2E_SITE_URL ?? "http://localhost:3312").replace(/\/+$/, "");
const BACKEND = (process.env.E2E_BACKEND_URL ?? "http://127.0.0.1:3299").replace(/\/+$/, "");
const RPC = process.env.E2E_RPC_URL ?? "https://api.avax-test.network/ext/bc/C/rpc";
const USDC = getAddress(process.env.E2E_USDC ?? "0x5425890298aed601595a70AB815c96711a31Bc65");
const SHOTS = process.env.E2E_SHOTS ?? "";
const AMOUNT = 50_000n; // 0.05 USDC
const PHONE = `+5917${Date.now().toString().slice(-7)}`;

const raw = (process.env.E2E_FUNDER_PRIVATE_KEY ?? process.env.PRIVATE_KEY_MOCK ?? "").replace(/^['"]|['"]$/g, "");
if (!raw) throw new Error("Define E2E_FUNDER_PRIVATE_KEY");
const funder = privateKeyToAccount(raw.startsWith("0x") ? raw : `0x${raw}`);
const chain = createPublicClient({ transport: http(RPC) });
const wallet = createWalletClient({ account: funder, transport: http(RPC) });
const balanceOf = (address) =>
  chain.readContract({ address: USDC, abi: erc20Abi, functionName: "balanceOf", args: [getAddress(address)] });

function check(condition, label) {
  if (!condition) throw new Error(`✗ ${label}`);
  console.log(`   ✓ ${label}`);
}

async function waitFor(label, fn, timeoutMs = 120_000) {
  const start = Date.now();
  for (;;) {
    const value = await fn();
    if (value) {
      console.log(`   ⏱  ${label}: ${((Date.now() - start) / 1000).toFixed(1)} s`);
      return value;
    }
    if (Date.now() - start > timeoutMs) throw new Error(`timeout esperando: ${label}`);
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
}

/** Escribe al bot por el canal de desarrollo y devuelve sus respuestas. */
async function say(text) {
  const res = await fetch(`${BACKEND}/api/v1/dev/messages`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ from: PHONE, text, name: "Ana Quispe" }),
  });
  if (!res.ok) throw new Error(`dev/messages → ${res.status} ${await res.text()}`);
  return (await res.json()).replies;
}

const tokenOf = (url) => url.split("/w/")[1];
const view = async (url) => (await fetch(`${BACKEND}/api/v1/actions/${tokenOf(url)}`)).json();

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 420, height: 900 }, locale: "es-BO" });
const page = await context.newPage();
const problems = [];
page.on("pageerror", (error) => problems.push(String(error)));

// La "huella": un autenticador de plataforma que verifica al usuario en cada uso.
const cdp = await context.newCDPSession(page);
await cdp.send("WebAuthn.enable");
await cdp.send("WebAuthn.addVirtualAuthenticator", {
  options: {
    protocol: "ctap2",
    transport: "internal",
    hasResidentKey: true,
    hasUserVerification: true,
    isUserVerified: true,
    automaticPresenceSimulation: true,
    hasPrf: true,
  },
});

let shot = 0;
async function capture(name) {
  if (!SHOTS) return;
  mkdirSync(SHOTS, { recursive: true });
  await page.screenshot({ path: `${SHOTS}/${String(++shot).padStart(2, "0")}-${name}.png`, fullPage: true });
}

/** Abre un enlace del bot y pulsa su botón principal (crear la billetera o confirmar el envío). */
async function confirm(url, name) {
  await page.goto(url, { waitUntil: "networkidle" });
  const button = page.locator("button.btn-primary");
  await button.waitFor({ timeout: 20_000 });
  await capture(`${name}-antes`);
  await button.click();
}

/** Pide un envío al bot, lo confirma en la página con la huella y espera a que llegue. */
async function send(amountAtomic, to, name) {
  const [sign] = await say(`enviar ${formatUnits(amountAtomic, 6)} a ${to}`);
  if (!sign?.url) throw new Error(`el bot no entregó el enlace: ${JSON.stringify(sign)}`);
  const before = await balanceOf(to);
  await confirm(sign.url, name);
  await waitFor("envío confirmado en la red", async () => (await view(sign.url)).send?.status === "CONFIRMED");
  await page.waitForTimeout(3000); // la página consulta cada 2,5 s y muestra «Enviado»
  await capture(`${name}-despues`);
  check((await balanceOf(to)) - before === amountAtomic, `llegaron ${formatUnits(amountAtomic, 6)} USDC a ${to}`);
  return sign.url;
}

let address = "";
try {
  console.log(`1) ${PHONE} pide su billetera y la crea en la página con la huella`);
  const [welcome] = await say("hola");
  check(welcome?.url?.startsWith(`${SITE}/w/`), `el enlace abre este sitio: ${welcome?.url}`);
  const before = await view(welcome.url);
  console.log(`   billetera: ${before.custody} · entorno ${before.environment} (${before.network})`);
  await confirm(welcome.url, "crear");
  const created = await waitFor("billetera creada", async () => {
    const current = await view(welcome.url);
    return current.status === "COMPLETED" && current.wallet ? current : null;
  });
  address = created.wallet.address;
  await page.waitForTimeout(1000);
  await capture("crear-despues");
  console.log(`   👛 ${address} (${created.wallet.custody})`);
  check(created.wallet.custody === before.custody, "la billetera es del tipo que anuncia el entorno");
  if (before.custody === "TILCAI_SCA") {
    await waitFor("la cuenta está desplegada", async () => {
      const code = await chain.getCode({ address: getAddress(address) });
      return code && code !== "0x";
    });
  }

  console.log("2) Recibe 0.05 USDC");
  const hash = await wallet.writeContract({ chain: null, address: USDC, abi: erc20Abi, functionName: "transfer", args: [getAddress(address), AMOUNT] });
  await chain.waitForTransactionReceipt({ hash });
  check((await balanceOf(address)) === AMOUNT, "saldo en la red = 0.05 USDC");

  console.log("3) Envía 0.02 USDC confirmando en la página: la firma sale del navegador");
  await send(20_000n, funder.address, "enviar");
  check((await chain.getBalance({ address: getAddress(address) })) === 0n, "la billetera no necesitó AVAX: el relayer pagó el gas");

  console.log("4) Devuelve el resto con otra firma");
  await send(30_000n, funder.address, "devolver");
  check((await balanceOf(address)) === 0n, "la billetera quedó en cero");
  check(problems.length === 0, `sin errores de JavaScript en la página${problems.length ? `: ${problems.join(" | ")}` : ""}`);
  console.log("\n✅ Página de firma verificada en el navegador");
} catch (error) {
  console.error(`\n❌ ${error.message}`);
  if (problems.length) console.error(`   errores de la página: ${problems.join(" | ")}`);
  await capture("fallo").catch(() => {});
  if (address) {
    const left = await balanceOf(address).catch(() => 0n);
    if (left > 0n) console.error(`   ⚠ quedaron ${formatUnits(left, 6)} USDC de testnet en ${address}`);
  }
  process.exitCode = 1;
} finally {
  await browser.close();
}
