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
import type { Dictionary } from "@/i18n/dictionaries/es";
import { fill } from "@/i18n/fill";
import { ApiError, signerApi } from "@/lib/signer/api";
import { openKey, sealKey } from "@/lib/signer/envelope";
import type { ActionView, TypedDataJson } from "@/lib/signer/types";
import { assert, authenticate, createPasskey, webAuthnAvailable } from "@/lib/signer/webauthn";

/**
 * Página de confirmación de Optipagos (/w/:token): crear la billetera, confirmar un envío o
 * mostrar la clave.
 *
 * Hay dos clases de billetera (`custody` en la respuesta del servidor):
 *
 *  - Clave propia (PASSKEY_PRF). Aquí —y solo aquí— existe la clave sin cifrar: en la memoria
 *    del navegador y durante lo que dura una firma. El servidor recibe únicamente la aserción
 *    del dispositivo, la dirección, el sobre cifrado y las firmas.
 *  - Cuenta de contrato (TILCAI_SCA). No hay clave: la dueña de la cuenta es la passkey del
 *    teléfono y la huella sobre el reto del servidor es la firma que comprueba la red.
 */

/** Iconos doodle que el servidor entrega ya dibujados (ver app/w/[token]/page.tsx). */
export type SignerIcons = Record<
  "fingerprint" | "lock" | "zap" | "tick" | "cross" | "clock" | "caution" | "key" | "wallet" | "send",
  ReactNode
>;

type Texts = Dictionary["signer"];

interface SignerProps {
  token: string;
  icons: SignerIcons;
  /** Enlace para volver al chat de Optipagos. */
  chatUrl: string;
  /** Textos de la página en el idioma de la persona. */
  t: Texts;
  /** Texto del botón para volver al chat. */
  backLabel: string;
}

type Tone = "cream" | "honey" | "ink";

// ── Mensajes ─────────────────────────────────────────────────────────────────

/** Traduce cualquier fallo a una frase que le sirva a la persona, sin tecnicismos. */
function friendly(error: unknown, m: Texts["errors"]): string {
  const e = error as { name?: string; code?: string };
  if (e.name === "NotAllowedError") return m.notAllowed;
  if (e.name === "InvalidStateError") return m.alreadyRegistered;
  if (e.name === "SecurityError") return m.security;
  if (e.name === "OperationError" || e.name === "WrongDevice") return m.wrongDevice;
  if (e.name === "PrfUnsupported") return m.unsupported;

  const code = error instanceof ApiError ? error.code : e.code;
  switch (code) {
    case "ACTION_EXPIRED":
      return m.expired;
    case "ACTION_CLOSED":
      return m.closed;
    case "NOT_FOUND":
      return m.notFound;
    case "PASSKEY_REJECTED":
      return m.passkeyRejected;
    case "SIGNATURE_INVALID":
      return m.signatureInvalid;
    case "INSUFFICIENT_FUNDS":
      return m.insufficientFunds;
    case "LIMIT_EXCEEDED":
      return m.limitExceeded;
    case "GOOGLE_REQUIRED":
      return m.googleRequired;
    case "CONFLICT":
      return m.conflict;
    case "WALLET_ACTIVATING":
      return m.walletActivating;
    case "RAIL_UNAVAILABLE":
    case "RAIL_REJECTED":
      return m.railUnavailable;
  }
  if (error instanceof TypeError) return m.offline;
  return m.generic;
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

function BackToChat({
  href,
  label,
  primary = true,
}: {
  href: string;
  label: string;
  primary?: boolean;
}) {
  return (
    <a href={href} className={`btn btn-block ${primary ? "btn-primary" : ""}`}>
      {label}
    </a>
  );
}

// ── Componente ───────────────────────────────────────────────────────────────

export function Signer({ token, icons, chatUrl, t, backLabel }: SignerProps) {
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
      if (alive.current) setLoadError(friendly(error, t.errors));
    }
  }, [api, t]);

  // Primera carga del enlace.
  useEffect(() => {
    alive.current = true;
    api.view().then(
      (first) => alive.current && setView(first),
      (error: unknown) => alive.current && setLoadError(friendly(error, t.errors)),
    );
    return () => {
      alive.current = false;
    };
  }, [api, t]);

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
        if (alive.current) setFeedback(friendly(error, t.errors));
      } finally {
        if (alive.current) setBusy(null);
      }
    },
    [t],
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
    run(t.progress.preparing, async (progress) => {
      const contract = current.custody === "TILCAI_SCA";
      if (current.passkeys === 0) {
        progress(t.progress.registering);
        const registration = await createPasskey(await api.options("register"), {
          es256Only: contract,
        });
        await api.registerPasskey(registration);
      }
      progress(t.progress.fingerprint);
      if (contract) {
        // Cuenta de contrato: basta la huella. El servidor pide la cuenta con la llave pública
        // del teléfono; aquí no se genera ni se guarda ninguna clave.
        const assertion = await assert(await api.options("authenticate"));
        progress(t.progress.creating);
        await api.createWallet({ assertion });
        await refresh();
        return;
      }
      const { assertion, prfOutput } = await authenticate(await api.options("authenticate"));

      progress(t.progress.creating);
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
    run(t.progress.fingerprint, async (progress) => {
      const typedData = current.send?.typedData;
      if (!typedData) throw new ApiError("ACTION_CLOSED", "");
      if (current.custody === "TILCAI_SCA") {
        // El reto que entrega el servidor es este envío: la huella lo firma y eso es todo.
        const assertion = await assert(await api.options("authenticate"));
        progress(t.progress.sending);
        setView(await api.signTransfer({ assertion }));
        return;
      }
      const { account, assertion, key } = await unlock(current);
      progress(t.progress.confirming);
      const signature = await account.signTypedData(toViem(typedData));
      key.fill(0);
      progress(t.progress.sending);
      setView(await api.signTransfer({ assertion, signature }));
    });

  const cancel = () =>
    run(t.progress.cancelling, async () => {
      setView(await api.cancel());
    });

  const revealKey = (current: ActionView) =>
    run(t.progress.fingerprint, async () => {
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
      setFeedback(t.key.copyFailed);
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
      {t.unsupported}
    </Notice>
  ) : null;
  const back = (primary = true) => <BackToChat href={chatUrl} label={backLabel} primary={primary} />;

  if (loadError) {
    return (
      <Card icon={icons.clock} chipTone="cream" title={t.unavailable}>
        <p className="text-lg leading-snug">{loadError}</p>
        {back()}
      </Card>
    );
  }

  if (!view) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-24" role="status">
        <Scribble className="h-14 w-14" />
        <p className="hand text-2xl">{t.opening}</p>
      </div>
    );
  }

  const name = firstName(view.user.name);
  const who = (
    <>
      {name ? fill(t.helloName, { name }) : t.hello}{" "}
      <span className="opacity-70">· {view.user.phone}</span>
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
            title={t.wallet.readyTitle}
            eyebrow={name ? fill(t.wallet.wellDoneName, { name }) : t.wallet.wellDone}
          >
            <p className="text-lg leading-snug">{t.wallet.readyText}</p>
            {back()}
          </Card>
        </div>
      );
    }
    if (view.status !== "PENDING") {
      return (
        <Card icon={icons.clock} chipTone="cream" title={t.expired}>
          <p className="text-lg leading-snug">
            {t.wallet.expiredBefore}{" "}
            <strong className="hand text-xl">{t.wallet.expiredWord}</strong>{" "}
            {t.wallet.expiredAfter}
          </p>
          {back()}
        </Card>
      );
    }

    const needsGoogle = view.google.required && !view.google.linked;
    return (
      <Card icon={icons.wallet} title={t.wallet.title} eyebrow={who}>
        <ul className="flex flex-col gap-3">
          {(
            [
              [icons.fingerprint, t.wallet.points[0]],
              [icons.lock, t.wallet.points[1]],
              [icons.zap, t.wallet.points[2]],
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
            {t.wallet.googleLinked}
          </Notice>
        ) : google && google !== "cancelled" ? (
          <Notice kind="error" icon={icons.caution}>
            {t.wallet.googleFailed}
          </Notice>
        ) : null}

        {view.google.enabled ? (
          <div className="doodle-box tone-shell flat flex flex-col gap-3 p-4">
            {view.google.linked ? (
              <p className="leading-snug">
                {t.wallet.googleAccount} <strong>{view.google.linked}</strong>
              </p>
            ) : (
              <>
                <p className="leading-snug">
                  {needsGoogle ? t.wallet.googleRequired : t.wallet.googleOptional}
                </p>
                <a href={api.googleUrl()} className="btn btn-sm">
                  {t.wallet.googleContinue}
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
            {busy ?? (view.passkeys > 0 ? t.wallet.continue : t.wallet.create)}
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
        <Card icon={icons.send} title={t.send.title} eyebrow={who}>
          <div>
            <p className="hand text-xl opacity-80">{t.send.about}</p>
            {amount}
          </div>
          <dl className="doodle-box tone-shell flat flex flex-col gap-2 p-4 text-[0.98rem]">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="opacity-70">{t.send.to}</dt>
              <dd className="text-right font-bold [overflow-wrap:anywhere]">
                {send.summary.recipient}
              </dd>
            </div>
            <hr className="dash-rule" />
            <div className="flex items-baseline justify-between gap-4">
              <dt className="opacity-70">{t.send.fee}</dt>
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
              {busy ?? t.send.confirm}
            </button>
          ) : null}
          <button
            type="button"
            className="btn btn-ghost btn-block"
            disabled={busy !== null}
            onClick={() => void cancel()}
          >
            {t.send.cancel}
          </button>
          {problem}
        </Card>
      );
    }

    if (view.status === "CANCELLED") {
      return (
        <Card icon={icons.cross} chipTone="cream" title={t.send.cancelledTitle}>
          <p className="text-lg leading-snug">{t.send.cancelledText}</p>
          {back()}
        </Card>
      );
    }
    if (view.status === "EXPIRED") {
      return (
        <Card icon={icons.clock} chipTone="cream" title={t.expired}>
          <p className="text-lg leading-snug">{t.send.expiredText}</p>
          {back()}
        </Card>
      );
    }
    if (send.status === "CONFIRMED") {
      return (
        <div className="relative">
          <Celebrate />
          <Card icon={icons.tick} title={t.send.sentTitle} eyebrow={t.send.sentEyebrow}>
            <div>
              {amount}
              <p className="mt-1 text-lg leading-snug">
                {t.send.arrivedBefore} {recipient}
                {t.send.arrivedAfter}
              </p>
            </div>
            {send.transferId ? (
              <Link href={`/c/${send.transferId}`} className="btn btn-primary btn-block">
                {t.send.receipt}
              </Link>
            ) : null}
            {back(!send.transferId)}
          </Card>
        </div>
      );
    }
    if (send.status === "FAILED" || view.status === "FAILED") {
      return (
        <Card icon={icons.caution} chipTone="cream" title={t.send.failedTitle}>
          <p className="text-lg leading-snug">{t.send.failedText}</p>
          {back()}
        </Card>
      );
    }
    return (
      <Card icon={<Scribble />} title={t.send.sendingTitle} eyebrow={t.send.sendingEyebrow}>
        <div>
          {amount}
          <p className="mt-1 text-lg leading-snug">
            {t.send.onItsWayBefore} {recipient}
            {t.send.onItsWayAfter}
          </p>
        </div>
        {back(false)}
      </Card>
    );
  }

  // Ver la clave ---------------------------------------------------------------
  if (view.type === "EXPORT_KEY") {
    if (secret) {
      return (
        <Card icon={icons.key} title={t.key.title}>
          <Notice kind="warn" icon={icons.caution}>
            {t.key.warning}
          </Notice>
          <code className="doodle-box tone-shell flat block select-all p-4 font-mono text-sm leading-relaxed [overflow-wrap:anywhere]">
            {secret}
          </code>
          <button type="button" className="btn btn-block" onClick={() => void copySecret()}>
            {copied ? t.key.copied : t.key.copy}
          </button>
          <p className="hand text-center text-lg opacity-80">{t.key.keepSafe}</p>
          {problem}
        </Card>
      );
    }
    if (view.custody === "TILCAI_SCA") {
      // Una cuenta de contrato no tiene clave privada: no hay nada que mostrar.
      return (
        <Card icon={icons.key} chipTone="cream" title={t.key.noKeyTitle}>
          <p className="text-lg leading-snug">{t.key.noKeyText}</p>
          {back()}
        </Card>
      );
    }
    if (view.status !== "PENDING") {
      return (
        <Card icon={icons.key} chipTone="cream" title={t.key.usedTitle}>
          <p className="text-lg leading-snug">{t.key.usedText}</p>
          {back()}
        </Card>
      );
    }
    return (
      <Card icon={icons.key} title={t.key.title} eyebrow={who}>
        <p className="text-lg leading-snug">{t.key.intro}</p>
        {unsupported}
        {supported ? (
          <button
            type="button"
            className="btn btn-primary btn-block"
            disabled={busy !== null}
            onClick={() => void revealKey(view)}
          >
            {busy ? spinner : null}
            {busy ?? t.key.show}
          </button>
        ) : null}
        {problem}
      </Card>
    );
  }

  return (
    <Card icon={icons.caution} chipTone="cream" title={t.unavailable}>
      <p className="text-lg leading-snug">{t.unavailableText}</p>
      {back()}
    </Card>
  );
}
