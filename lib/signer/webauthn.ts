import { fromBase64Url, toBase64Url } from './envelope';

/** Opciones que entrega POST /actions/:token/webauthn/options. */
export interface ServerOptions {
  purpose: 'register' | 'authenticate';
  challenge: string;
  timeoutMs: number;
  rp: { name: string };
  user: { id: string; name: string; displayName: string };
  credentials: Array<{ id: string; transports: string[] }>;
  prfSalts: Record<string, string>;
  envelopes: Record<string, { scheme: string; hkdfSalt: string; iv: string; ciphertext: string }>;
}

export interface AssertionPayload {
  credentialId: string;
  clientDataJSON: string;
  authenticatorData: string;
  signature: string;
}

interface PrfResults {
  prf?: { enabled?: boolean; results?: { first?: ArrayBuffer } };
}

const descriptors = (credentials: ServerOptions['credentials']): PublicKeyCredentialDescriptor[] =>
  credentials.map((c) => ({
    type: 'public-key',
    id: fromBase64Url(c.id),
    ...(c.transports.length ? { transports: c.transports as AuthenticatorTransport[] } : {}),
  }));

export const webAuthnAvailable = (): boolean =>
  typeof window !== 'undefined' &&
  window.isSecureContext &&
  typeof window.PublicKeyCredential !== 'undefined' &&
  Boolean(navigator.credentials);

/** Crea la passkey del dispositivo pidiendo la extensión PRF. */
export async function createPasskey(options: ServerOptions) {
  const credential = (await navigator.credentials.create({
    publicKey: {
      challenge: fromBase64Url(options.challenge),
      rp: { name: options.rp.name, id: window.location.hostname },
      user: {
        id: fromBase64Url(options.user.id),
        name: options.user.name,
        displayName: options.user.displayName,
      },
      pubKeyCredParams: [
        { type: 'public-key', alg: -7 },
        { type: 'public-key', alg: -257 },
      ],
      authenticatorSelection: { userVerification: 'required', residentKey: 'preferred' },
      excludeCredentials: descriptors(options.credentials),
      attestation: 'none',
      timeout: options.timeoutMs,
      extensions: { prf: {} },
    },
  })) as PublicKeyCredential;
  const response = credential.response as AuthenticatorAttestationResponse;
  const publicKey = response.getPublicKey();
  if (!publicKey)
    throw Object.assign(new Error('El navegador no entregó la llave del dispositivo.'), {
      name: 'PrfUnsupported',
    });
  const extensions = credential.getClientExtensionResults() as PrfResults;
  return {
    credentialId: toBase64Url(credential.rawId),
    clientDataJSON: toBase64Url(response.clientDataJSON),
    publicKey: toBase64Url(publicKey),
    publicKeyAlgorithm: response.getPublicKeyAlgorithm(),
    authenticatorData: toBase64Url(response.getAuthenticatorData()),
    transports: response.getTransports(),
    prfEnabled: extensions.prf?.enabled === true,
  };
}

/**
 * Autentica con la passkey y evalúa PRF con el salt de cada credencial. Devuelve la aserción
 * (para el servidor) y la salida PRF (que nunca sale del navegador).
 */
export async function authenticate(
  options: ServerOptions,
): Promise<{ assertion: AssertionPayload; prfOutput: ArrayBuffer }> {
  const evalByCredential: Record<string, { first: BufferSource }> = {};
  for (const c of options.credentials) {
    if (options.prfSalts[c.id])
      evalByCredential[c.id] = { first: fromBase64Url(options.prfSalts[c.id]) };
  }
  const credential = (await navigator.credentials.get({
    publicKey: {
      challenge: fromBase64Url(options.challenge),
      rpId: window.location.hostname,
      allowCredentials: descriptors(options.credentials),
      userVerification: 'required',
      timeout: options.timeoutMs,
      extensions: { prf: { evalByCredential } },
    },
  })) as PublicKeyCredential;
  const response = credential.response as AuthenticatorAssertionResponse;
  const prfOutput = (credential.getClientExtensionResults() as PrfResults).prf?.results?.first;
  if (!prfOutput) {
    throw Object.assign(
      new Error('Este dispositivo no puede proteger la billetera con huella o rostro.'),
      { name: 'PrfUnsupported' },
    );
  }
  return {
    assertion: {
      credentialId: toBase64Url(credential.rawId),
      clientDataJSON: toBase64Url(response.clientDataJSON),
      authenticatorData: toBase64Url(response.authenticatorData),
      signature: toBase64Url(response.signature),
    },
    prfOutput,
  };
}
