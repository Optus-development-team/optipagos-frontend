/** Datos EIP-712 tal como los entrega el backend (los uint256 llegan como texto). */
export interface TypedDataJson {
  domain: { name: string; version: string; chainId: number; verifyingContract: string };
  types: Record<string, Array<{ name: string; type: string }>>;
  primaryType: string;
  message: Record<string, string>;
}

/** Respuesta de GET /api/v1/actions/:token. */
export interface ActionView {
  id: string;
  type: "CREATE_WALLET" | "SEND_TRANSFER" | "EXPORT_KEY" | "ADD_PASSKEY";
  status: "PENDING" | "COMPLETED" | "CANCELLED" | "EXPIRED" | "FAILED";
  expiresAt: string;
  user: { name: string | null; phone: string };
  wallet: { address: string } | null;
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
