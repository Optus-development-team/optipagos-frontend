"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { bytesToHex, hexToBytes } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import Link from "next/link";
import { Scribble } from "@/components/doodles";
import { Celebrate } from "@/components/ui/Celebrate";
import { NotchCard } from "@/components/ui/NotchCard";
import { ApiError, signerApi } from "@/lib/signer/api";
import { openKey, sealKey } from "@/lib/signer/envelope";
import type { ActionView, TypedDataJson } from "@/lib/signer/types";
import { authenticate, createPasskey, webAuthnAvailable } from "@/lib/signer/webauthn";

/**
 * Página de confirmación de Optipagos (/w/:token): crear la billetera, confirmar un envío o
 * mostrar la clave.
 *
 * Aquí —y solo aquí— existe la clave de la billetera sin cifrar: en la memoria del navegador
 * del usuario y durante lo que dura una firma. El servidor recibe únicamente la aserción del
 * dispositivo, la dirección, el sobre cifrado y las firmas.
 */

/** Iconos doodle que el servidor entrega ya dibujados (ver app/w/[token]/page.tsx). */
export type SignerIcons = Record<
  "fingerprint" | "lock" | "zap" | "tick" | "cross" | "clock" | "caution" | "key" | "wallet" | "send",
  ReactNode
>;

interface SignerProps {
  token: string;
  icons: SignerIcons;
  /** Enlace para volver al chat de Optipagos. */
  chatUrl: string;
}

type Tone = "cream" | "honey" | "ink";

// ── Mensajes ─────────────────────────────────────────────────────────────────

/** Traduce cualquier fallo a una frase que le sirva a la persona, sin tecnicismos. */
function friendly(error: unknown): string {
  const e = error as { name?: string; code?: string };
  if (e.name === "NotAllowedError")
    return "No pudimos leer tu huella o rostro, o se acabó el tiempo. Inténtalo otra vez.";
  if (e.name === "InvalidStateError") return "Este teléfono ya está registrado en tu cuenta.";
  if (e.name === "SecurityError")
    return "Este enlace no se puede abrir aquí. Ábrelo con el botón que te enviamos por WhatsApp.";
  if (e.name === "OperationError" || e.name === "WrongDevice")
    return "Con este teléfono no se puede abrir tu billetera. Usa el mismo con el que la creaste.";
  if (e.name === "PrfUnsupported")
    return "Este teléfono o navegador todavía no es compatible. Prueba con Chrome o Safari actualizados.";

  const code = error instanceof ApiError ? error.code : e.code;
  switch (code) {
    case "ACTION_EXPIRED":
      return "El enlace venció. Pide uno nuevo por WhatsApp.";
    case "ACTION_CLOSED":
      return "Este enlace ya se usó.";
    case "NOT_FOUND":
      return "No encontramos este enlace. Pide uno nuevo por WhatsApp.";
    case "PASSKEY_REJECTED":
      return "No pudimos verificar tu huella o rostro. Inténtalo otra vez.";
    case "SIGNATURE_INVALID":
      return "No pudimos confirmar la operación. Inténtalo otra vez.";
    case "INSUFFICIENT_FUNDS":
      return "No tienes saldo suficiente para este envío.";
    case "LIMIT_EXCEEDED":
      return "Ese monto supera el límite por envío.";
    case "GOOGLE_REQUIRED":
      return "Primero vincula tu cuenta de Google.";
    case "CONFLICT":
      return "Esto ya estaba hecho. Vuelve a WhatsApp para continuar.";
    case "RAIL_UNAVAILABLE":
    case "RAIL_REJECTED":
      return "Ahora mismo no podemos completar el envío. Tu dinero está a salvo; inténtalo en unos minutos.";
  }
  if (error instanceof TypeError) return "Sin conexión. Revisa tu internet e inténtalo de nuevo.";
  return "Algo salió mal. Inténtalo otra vez.";
}

/** Convierte los datos EIP-712 (uint256 como texto) al formato de viem. */
function toViem(td: TypedDataJson) {
  const uint = new Set(
    td.types[td.primaryType].filter((f) => f.type.startsWith("uint")).map((f) => f.name),
  );
  const message: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(td.message)) message[k] = uint.has(k) ? BigInt(v) : v;
  return { domain: td.domain, types: td.types, primaryType: td.primaryType, message } as Parameters<
    ReturnType<typeof privateKeyToAccount>["signTypedData"]
  >[0];
}

const firstName = (name: string | null): string => (name ?? "").trim().split(/\s+/)[0] ?? "";

// Datos que solo existen en el navegador (no cambian mientras la página está abierta).
const never = () => () => {};
const googleNotice = () => new URLSearchParams(window.location.search).get("google");

// ── Piezas de interfaz ───────────────────────────────────────────────────────

function Card({
  icon,
  tone = "cream",
  chipTone = "honey",
  eyebrow,
  title,
  children,
}: {
  icon: ReactNode;
  tone?: Tone;
  chipTone?: "honey" | "ink" | "cream";
  eyebrow?: ReactNode;
  title: string;
  children?: ReactNode;
}) {
  return (
    <NotchCard
      corner="tr"
      tone={tone}
      notch={[80, 80]}
      className="animate-pop"
      chip={
        <span className={`chip-tile ${chipTone === "cream" ? "" : `tone-${chipTone}`}`}>
          <span className="block h-9 w-9 [&>svg]:h-full [&>svg]:w-full">{icon}</span>
        </span>
      }
    >
      <div className="px-6 pb-7 pt-6">
        <div className="flex min-h-[58px] flex-col justify-center pr-[70px]">
          {eyebrow ? <p className="hand text-lg leading-tight opacity-80">{eyebrow}</p> : null}
          <h1 className="display text-[2.6rem]">{title}</h1>
        </div>
        <div className="mt-5 flex flex-col gap-4">{children}</div>
      </div>
    </NotchCard>
  );
}

function Notice({
  kind,
  icon,
  children,
}: {
  kind: "ok" | "warn" | "error" | "info";
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      className={`alert ${kind === "info" ? "" : `alert-${kind}`}`}
      role={kind === "error" ? "alert" : "status"}
    >
      {icon}
      <p className="text-[0.95rem] leading-snug">{children}</p>
    </div>
  );
}

function BackToChat({ href, primary = true }: { href: string; primary?: boolean }) {
  return (
    <a href={href} className={`btn btn-block ${primary ? "btn-primary" : ""}`}>
      Volver a WhatsApp
    </a>
  );
}

// ── Componente ───────────────────────────────────────────────────────────────

export function Signer({ token, icons, chatUrl }: SignerProps) {
  const api = useMemo(() => signerApi(token), [token]);
  const [view, setView] = useState<ActionView | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const supported = useSyncExternalStore(never, webAuthnAvailable, () => true);
  const google = useSyncExternalStore(never, googleNotice, () => null);
  const alive = useRef(true);

  const refresh = useCallback(async () => {
    try {
      const next = await api.view();
      if (!alive.current) return;
      setView(next);
      setLoadError(null);
    } catch (error) {
      if (alive.current) setLoadError(friendly(error));
    }
  }, [api]);

  // Primera carga del enlace.
  useEffect(() => {
    alive.current = true;
    api.view().then(
      (first) => alive.current && setView(first),
      (error: unknown) => alive.current && setLoadError(friendly(error)),
    );
    return () => {
      alive.current = false;
    };
  }, [api]);

  // Mientras el envío viaja, se consulta hasta que termine.
  const sendStatus = view?.send?.status ?? null;
  const inFlight =
    view?.type === "SEND_TRANSFER" &&
    view.status === "COMPLETED" &&
    sendStatus !== "CONFIRMED" &&
    sendStatus !== "FAILED";
  useEffect(() => {
    if (!inFlight) return;
    const timer = window.setInterval(() => void refresh(), 2500);
    return () => window.clearInterval(timer);
  }, [inFlight, refresh]);

  /** Corre una acción mostrando el progreso en el botón y el fallo, si lo hay, debajo. */
  const run = useCallback(
    async (label: string, task: (progress: (text: string) => void) => Promise<void>) => {
      setFeedback(null);
      setBusy(label);
      try {
        await task((text) => alive.current && setBusy(text));
      } catch (error) {
        if (alive.current) setFeedback(friendly(error));
      } finally {
        if (alive.current) setBusy(null);
      }
    },
    [],
  );

  /** Abre la billetera con la huella: devuelve la cuenta lista para firmar. */
  const unlock = useCallback(
    async (current: ActionView) => {
      const opts = await api.options("authenticate");
      const { assertion, prfOutput } = await authenticate(opts);
      const envelope = opts.envelopes[assertion.credentialId];
      if (!envelope || !current.wallet) throw Object.assign(new Error(), { name: "WrongDevice" });
      const key = await openKey(envelope, prfOutput, current.wallet.address);
      const account = privateKeyToAccount(bytesToHex(key));
      if (account.address.toLowerCase() !== current.wallet.address.toLowerCase()) {
        key.fill(0);
        throw Object.assign(new Error(), { name: "WrongDevice" });
      }
      return { account, assertion, key };
    },
    [api],
  );

  const createWallet = (current: ActionView) =>
    run("Preparando…", async (progress) => {
      if (current.passkeys === 0) {
        progress("Registrando tu teléfono…");
        const registration = await createPasskey(await api.options("register"));
        await api.registerPasskey(registration);
      }
      progress("Confirma con tu huella…");
      const { assertion, prfOutput } = await authenticate(await api.options("authenticate"));

      progress("Creando tu billetera…");
      const privateKey = generatePrivateKey();
      const account = privateKeyToAccount(privateKey);
      const keyBytes = hexToBytes(privateKey) as Uint8Array<ArrayBuffer>;
      const envelope = await sealKey(keyBytes, prfOutput, account.address);
      keyBytes.fill(0);
      const proof = await account.signMessage({
        message: (current.proofMessageTemplate ?? "").replace(
          "{address}",
          account.address.toLowerCase(),
        ),
      });
      await api.createWallet({ assertion, address: account.address, envelope, proof });
      await refresh();
    });

  const signTransfer = (current: ActionView) =>
    run("Confirma con tu huella…", async (progress) => {
      const typedData = current.send?.typedData;
      if (!typedData) throw new ApiError("ACTION_CLOSED", "");
      const { account, assertion, key } = await unlock(current);
      progress("Confirmando…");
      const signature = await account.signTypedData(toViem(typedData));
      key.fill(0);
      progress("Enviando…");
      setView(await api.signTransfer({ assertion, signature }));
    });

  const cancel = () =>
    run("Cancelando…", async () => {
      setView(await api.cancel());
    });

  const revealKey = (current: ActionView) =>
    run("Confirma con tu huella…", async () => {
      const { assertion, key } = await unlock(current);
      const hex = bytesToHex(key);
      key.fill(0);
      await api.exportKey({ assertion });
      setSecret(hex);
    });

  const copySecret = async () => {
    if (!secret) return;
    try {
      await navigator.clipboard.writeText(secret);
      setCopied(true);
    } catch {
      setFeedback("No se pudo copiar. Mantén presionada la clave para copiarla.");
    }
  };

  // ── Pantallas ──────────────────────────────────────────────────────────────

  const spinner = <Scribble className="h-5 w-5" />;
  const problem = feedback ? (
    <Notice kind="error" icon={icons.caution}>
      {feedback}
    </Notice>
  ) : null;
  const unsupported = !supported ? (
    <Notice kind="warn" icon={icons.caution}>
      Este enlace no se puede usar desde aquí. Ábrelo en tu teléfono con el botón que te enviamos
      por WhatsApp.
    </Notice>
  ) : null;

  if (loadError) {
    return (
      <Card icon={icons.clock} chipTone="cream" title="Enlace no disponible">
        <p className="text-lg leading-snug">{loadError}</p>
        <BackToChat href={chatUrl} />
      </Card>
    );
  }

  if (!view) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-24" role="status">
        <Scribble className="h-14 w-14" />
        <p className="hand text-2xl">Abriendo…</p>
      </div>
    );
  }

  const name = firstName(view.user.name);
  const who = (
    <>
      {name ? `Hola, ${name}` : "Hola"} <span className="opacity-70">· {view.user.phone}</span>
    </>
  );

  // Crear billetera ------------------------------------------------------------
  if (view.type === "CREATE_WALLET") {
    if (view.wallet || view.status === "COMPLETED") {
      return (
        <div className="relative">
          <Celebrate />
          <Card
            icon={icons.tick}
            title="¡Billetera lista!"
            eyebrow={name ? `Bien hecho, ${name}` : "Bien hecho"}
          >
            <p className="text-lg leading-snug">
              Ya puedes recibir y enviar dinero. Vuelve a WhatsApp: ahí te esperan los primeros
              pasos.
            </p>
            <BackToChat href={chatUrl} />
          </Card>
        </div>
      );
    }
    if (view.status !== "PENDING") {
      return (
        <Card icon={icons.clock} chipTone="cream" title="El enlace venció">
          <p className="text-lg leading-snug">
            Escribe <strong className="hand text-xl">hola</strong> por WhatsApp y te enviamos uno
            nuevo.
          </p>
          <BackToChat href={chatUrl} />
        </Card>
      );
    }

    const needsGoogle = view.google.required && !view.google.linked;
    return (
      <Card icon={icons.wallet} title="Crea tu billetera" eyebrow={who}>
        <ul className="flex flex-col gap-3">
          {(
            [
              [icons.fingerprint, "Se abre con tu huella o tu rostro. Sin contraseñas."],
              [icons.lock, "Solo tú puedes mover tu dinero. Nadie más."],
              [icons.zap, "Queda lista en menos de un minuto."],
            ] as const
          ).map(([icon, text]) => (
            <li key={text} className="flex items-center gap-3">
              <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-honey-100 [&>svg]:h-6 [&>svg]:w-6">
                {icon}
              </span>
              <span className="leading-snug">{text}</span>
            </li>
          ))}
        </ul>

        {google === "linked" ? (
          <Notice kind="ok" icon={icons.tick}>
            Tu cuenta de Google quedó vinculada.
          </Notice>
        ) : google && google !== "cancelled" ? (
          <Notice kind="error" icon={icons.caution}>
            No pudimos vincular tu cuenta de Google. Inténtalo otra vez.
          </Notice>
        ) : null}

        {view.google.enabled ? (
          <div className="doodle-box tone-shell flat flex flex-col gap-3 p-4">
            {view.google.linked ? (
              <p className="leading-snug">
                Cuenta de Google vinculada: <strong>{view.google.linked}</strong>
              </p>
            ) : (
              <>
                <p className="leading-snug">
                  {needsGoogle
                    ? "Vincula tu cuenta de Google para identificarte y poder recuperar tu acceso."
                    : "Si quieres, vincula tu cuenta de Google para recuperar tu acceso si cambias de número."}
                </p>
                <a href={api.googleUrl()} className="btn btn-sm">
                  Continuar con Google
                </a>
              </>
            )}
          </div>
        ) : null}

        {unsupported}
        {needsGoogle || !supported ? null : (
          <button
            type="button"
            className="btn btn-primary btn-block"
            disabled={busy !== null}
            onClick={() => void createWallet(view)}
          >
            {busy ? spinner : null}
            {busy ?? (view.passkeys > 0 ? "Continuar con mi huella" : "Crear mi billetera")}
          </button>
        )}
        {problem}
      </Card>
    );
  }

  // Enviar ---------------------------------------------------------------------
  if (view.type === "SEND_TRANSFER" && view.send) {
    const send = view.send;
    const amount = (
      <p className="display flex items-baseline gap-2 text-7xl">
        {send.amount}
        <span className="text-3xl opacity-70">USDC</span>
      </p>
    );
    const recipient = <strong>{send.summary.recipient}</strong>;

    if (view.status === "PENDING") {
      return (
        <Card icon={icons.send} title="Confirma tu envío" eyebrow={who}>
          <div>
            <p className="hand text-xl opacity-80">Vas a enviar</p>
            {amount}
          </div>
          <dl className="doodle-box tone-shell flat flex flex-col gap-2 p-4 text-[0.98rem]">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="opacity-70">Para</dt>
              <dd className="text-right font-bold [overflow-wrap:anywhere]">
                {send.summary.recipient}
              </dd>
            </div>
            <hr className="dash-rule" />
            <div className="flex items-baseline justify-between gap-4">
              <dt className="opacity-70">Comisión</dt>
              <dd className="text-right font-bold">{send.summary.fee}</dd>
            </div>
          </dl>
          {unsupported}
          {supported ? (
            <button
              type="button"
              className="btn btn-primary btn-block"
              disabled={busy !== null}
              onClick={() => void signTransfer(view)}
            >
              {busy ? spinner : <span className="h-6 w-6 [&>svg]:h-full [&>svg]:w-full">{icons.fingerprint}</span>}
              {busy ?? "Confirmar con mi huella"}
            </button>
          ) : null}
          <button
            type="button"
            className="btn btn-ghost btn-block"
            disabled={busy !== null}
            onClick={() => void cancel()}
          >
            Cancelar envío
          </button>
          {problem}
        </Card>
      );
    }

    if (view.status === "CANCELLED") {
      return (
        <Card icon={icons.cross} chipTone="cream" title="Envío cancelado">
          <p className="text-lg leading-snug">No se movió dinero. Todo sigue en tu billetera.</p>
          <BackToChat href={chatUrl} />
        </Card>
      );
    }
    if (view.status === "EXPIRED") {
      return (
        <Card icon={icons.clock} chipTone="cream" title="El enlace venció">
          <p className="text-lg leading-snug">
            No se movió dinero. Pide el envío otra vez por WhatsApp.
          </p>
          <BackToChat href={chatUrl} />
        </Card>
      );
    }
    if (send.status === "CONFIRMED") {
      return (
        <div className="relative">
          <Celebrate />
          <Card icon={icons.tick} title="¡Enviado!" eyebrow="Listo">
            <div>
              {amount}
              <p className="mt-1 text-lg leading-snug">Ya le llegó a {recipient}.</p>
            </div>
            {send.transferId ? (
              <Link href={`/c/${send.transferId}`} className="btn btn-primary btn-block">
                Ver comprobante
              </Link>
            ) : null}
            <BackToChat href={chatUrl} primary={!send.transferId} />
          </Card>
        </div>
      );
    }
    if (send.status === "FAILED" || view.status === "FAILED") {
      return (
        <Card icon={icons.caution} chipTone="cream" title="No se pudo enviar">
          <p className="text-lg leading-snug">
            Tu dinero sigue en tu billetera. Inténtalo otra vez desde WhatsApp.
          </p>
          <BackToChat href={chatUrl} />
        </Card>
      );
    }
    return (
      <Card icon={<Scribble />} title="Enviando…" eyebrow="Ya confirmaste">
        <div>
          {amount}
          <p className="mt-1 text-lg leading-snug">
            Va en camino a {recipient}. Te avisamos por WhatsApp apenas llegue.
          </p>
        </div>
        <BackToChat href={chatUrl} primary={false} />
      </Card>
    );
  }

  // Ver la clave ---------------------------------------------------------------
  if (view.type === "EXPORT_KEY") {
    if (secret) {
      return (
        <Card icon={icons.key} title="Tu clave">
          <Notice kind="warn" icon={icons.caution}>
            No la compartas con nadie. Quien tenga esta clave puede usar tu dinero.
          </Notice>
          <code className="doodle-box tone-shell flat block select-all p-4 font-mono text-sm leading-relaxed [overflow-wrap:anywhere]">
            {secret}
          </code>
          <button type="button" className="btn btn-block" onClick={() => void copySecret()}>
            {copied ? "Copiada" : "Copiar"}
          </button>
          <p className="hand text-center text-lg opacity-80">
            Guárdala en un lugar seguro y cierra esta página.
          </p>
          {problem}
        </Card>
      );
    }
    if (view.status !== "PENDING") {
      return (
        <Card icon={icons.key} chipTone="cream" title="Enlace usado">
          <p className="text-lg leading-snug">
            Si necesitas ver tu clave otra vez, pídela de nuevo por WhatsApp.
          </p>
          <BackToChat href={chatUrl} />
        </Card>
      );
    }
    return (
      <Card icon={icons.key} title="Tu clave" eyebrow={who}>
        <p className="text-lg leading-snug">
          Vas a ver la clave de tu billetera para llevarla a otra aplicación. Asegúrate de que
          nadie más esté mirando tu pantalla.
        </p>
        {unsupported}
        {supported ? (
          <button
            type="button"
            className="btn btn-primary btn-block"
            disabled={busy !== null}
            onClick={() => void revealKey(view)}
          >
            {busy ? spinner : null}
            {busy ?? "Mostrar mi clave"}
          </button>
        ) : null}
        {problem}
      </Card>
    );
  }

  return (
    <Card icon={icons.caution} chipTone="cream" title="Enlace no disponible">
      <p className="text-lg leading-snug">
        Esto no se puede hacer desde aquí. Pide un enlace nuevo por WhatsApp.
      </p>
      <BackToChat href={chatUrl} />
    </Card>
  );
}
