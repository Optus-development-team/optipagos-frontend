/**
 * Sobre de la clave privada (esquema prf-hkdf-sha256-aes256gcm-v1).
 *
 *   salida PRF de la passkey (32 bytes, solo existe en el dispositivo del usuario)
 *     └─ HKDF-SHA256(salt = hkdfSalt, info = "optus-pay/wallet-key/v1") → clave AES-256
 *          └─ AES-GCM(iv, AAD = dirección) → ciphertext (clave privada + etiqueta)
 *
 * El servidor guarda hkdfSalt, iv y ciphertext; sin la salida PRF no puede descifrar.
 * Solo usa WebCrypto. optipagos-backend conserva una copia de referencia para sus pruebas
 * (test/support/envelope.ts): ambas deben producir sobres idénticos.
 *
 * La etiqueta `info` lleva el nombre anterior del producto a propósito: forma parte de la
 * derivación de la clave y cambiarla dejaría sin abrir las billeteras ya creadas.
 */
export const ENVELOPE_SCHEME = 'prf-hkdf-sha256-aes256gcm-v1';
const INFO = new TextEncoder().encode('optus-pay/wallet-key/v1');

export interface Envelope {
  hkdfSalt: string;
  iv: string;
  ciphertext: string;
}

export function toBase64Url(data: ArrayBuffer | Uint8Array): string {
  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function fromBase64Url(value: string): Uint8Array<ArrayBuffer> {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64 + '==='.slice((base64.length + 3) % 4));
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

type Bytes = ArrayBuffer | Uint8Array<ArrayBuffer>;

async function wrappingKey(prfOutput: Bytes, hkdfSalt: Uint8Array<ArrayBuffer>) {
  const ikm = await crypto.subtle.importKey('raw', prfOutput, 'HKDF', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'HKDF', hash: 'SHA-256', salt: hkdfSalt, info: INFO },
    ikm,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

const aad = (address: string): Uint8Array<ArrayBuffer> => {
  const encoded = new TextEncoder().encode(address.toLowerCase());
  const out = new Uint8Array(new ArrayBuffer(encoded.length));
  out.set(encoded);
  return out;
};

/** Cifra la clave privada (32 bytes) con la salida PRF de la passkey. */
export async function sealKey(
  privateKey: Uint8Array<ArrayBuffer>,
  prfOutput: Bytes,
  address: string,
): Promise<Envelope> {
  if (privateKey.length !== 32) throw new Error('La clave privada debe tener 32 bytes');
  const hkdfSalt = crypto.getRandomValues(new Uint8Array(new ArrayBuffer(32)));
  const iv = crypto.getRandomValues(new Uint8Array(new ArrayBuffer(12)));
  const key = await wrappingKey(prfOutput, hkdfSalt);
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv, additionalData: aad(address) },
    key,
    privateKey,
  );
  return {
    hkdfSalt: toBase64Url(hkdfSalt),
    iv: toBase64Url(iv),
    ciphertext: toBase64Url(ciphertext),
  };
}

/** Descifra el sobre. Falla si la salida PRF no es la de la passkey que lo cifró. */
export async function openKey(
  envelope: Envelope,
  prfOutput: Bytes,
  address: string,
): Promise<Uint8Array<ArrayBuffer>> {
  const key = await wrappingKey(prfOutput, fromBase64Url(envelope.hkdfSalt));
  const plain = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: fromBase64Url(envelope.iv), additionalData: aad(address) },
    key,
    fromBase64Url(envelope.ciphertext),
  );
  return new Uint8Array(plain);
}
