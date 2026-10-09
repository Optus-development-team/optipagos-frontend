/** Datos EIP-712 tal como los entrega el backend (los uint256 llegan como texto). */
export interface TypedDataJson {
  domain: { name: string; version: string; chainId: number; verifyingContract: string };
  types: Record<string, Array<{ name: string; type: string }>>;
  primaryType: string;
  message: Record<string, string>;
}

export type WalletCustody = "PASSKEY_PRF" | "TILCAI_SCA";

/** Respuesta de GET /api/v1/actions/:token. */
export interface ActionView {
  id: string;
  type: "CREATE_WALLET" | "SEND_TRANSFER" | "EXPORT_KEY" | "ADD_PASSKEY";
  status: "PENDING" | "COMPLETED" | "CANCELLED" | "EXPIRED" | "FAILED";
  expiresAt: string;
  user: { name: string | null; phone: string };
  /** Entorno del enlace: `testnet` (número de la demo) o `mainnet` (número de producción). */
  environment: "testnet" | "mainnet";
  /**
   * Cómo firma la billetera (o cómo se creará).
   *  - PASSKEY_PRF: una clave propia que este navegador descifra con la huella.
   *  - TILCAI_SCA: una cuenta de contrato cuya dueña es la passkey; no hay clave: la huella
   *    sobre el reto del servidor es la firma.
   */
  custody: WalletCustody;
  wallet: { address: string; custody: WalletCustody; state: "DEPLOYING" | "ACTIVE" } | null;
  passkeys: number;
  google: { enabled: boolean; required: boolean; linked: string | null };
  explorerUrl: string;
  proofMessageTemplate?: string;
  send?: {
    /** Id del movimiento: su comprobante está en /c/:transferId. */
    transferId?: string;
    summary: { amount: string; recipient: string; network: string; fee: string };
    typedData: TypedDataJson | null;
    amount: string;
    toAddress: string | null;
    status: string | null;
    explorerUrl: string | null;
    destinationExplorerUrl: string | null;
    failureReason: string | null;
  };
}
