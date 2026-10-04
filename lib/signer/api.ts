import type { ActionView } from "./types";
import type { ServerOptions } from "./webauthn";

/** Error de la API con el código estable que devuelve optipagos-backend. */
export class ApiError extends Error {
  constructor(
    readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Cliente de la API de acciones (`/api/v1/actions/:token`). Las llamadas van al mismo origen:
 * Next las reenvía a optipagos-backend, así que no hay CORS ni terceros de por medio.
 */
export function signerApi(token: string) {
  const base = `/api/v1/actions/${encodeURIComponent(token)}`;

  async function call<T>(path: string, body?: unknown): Promise<T> {
    const res = await fetch(`${base}${path}`, {
      method: body === undefined ? "GET" : "POST",
      cache: "no-store",
      headers: {
        accept: "application/json",
        "ngrok-skip-browser-warning": "true",
        ...(body === undefined ? {} : { "content-type": "application/json" }),
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
    const json = (await res.json().catch(() => null)) as
      | (T & { error?: { code: string; message: string } })
      | null;
    if (!res.ok || !json) {
      throw new ApiError(
        json?.error?.code ?? `HTTP_${res.status}`,
        json?.error?.message ?? `Error ${res.status}`,
      );
    }
    return json;
  }

  return {
    view: () => call<ActionView>(""),
    options: (purpose: "register" | "authenticate") =>
      call<ServerOptions>("/webauthn/options", { purpose }),
    registerPasskey: (registration: unknown) => call<unknown>("/passkeys", registration),
    createWallet: (payload: unknown) => call<{ address: string }>("/wallet", payload),
    signTransfer: (payload: unknown) => call<ActionView>("/transfer", payload),
    exportKey: (payload: unknown) => call<{ ok: boolean }>("/export", payload),
    cancel: () => call<ActionView>("/cancel", {}),
    googleUrl: () => `/api/v1/auth/google/start?token=${encodeURIComponent(token)}`,
  };
}

export type SignerApi = ReturnType<typeof signerApi>;
