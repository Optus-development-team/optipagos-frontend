"use client";

import { useState, type ReactNode } from "react";
import { Scribble } from "@/components/doodles";

interface ShareReceiptProps {
  /** Imagen del comprobante que genera el sitio (/c/:id/imagen). */
  imageUrl: string;
  fileName: string;
  text: string;
  shareIcon: ReactNode;
  /** Textos del botón y de los avisos, en el idioma de la persona. */
  labels: { share: string; preparing: string; saved: string; failed: string };
}

/**
 * Comparte el comprobante como imagen (hoja de compartir del teléfono: WhatsApp, correo…).
 * Donde el navegador no puede compartir archivos, lo descarga.
 */
export function ShareReceipt({ imageUrl, fileName, text, shareIcon, labels }: ShareReceiptProps) {
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  async function share() {
    setBusy(true);
    setNote(null);
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error("sin imagen");
      const file = new File([await response.blob()], fileName, { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text });
      } else {
        const url = URL.createObjectURL(file);
        const link = Object.assign(document.createElement("a"), { href: url, download: fileName });
        link.click();
        URL.revokeObjectURL(url);
        setNote(labels.saved);
      }
    } catch (error) {
      // Cerrar la hoja de compartir no es un error.
      if ((error as { name?: string }).name !== "AbortError") {
        setNote(labels.failed);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary btn-block"
        disabled={busy}
        onClick={() => void share()}
      >
        {busy ? (
          <Scribble className="h-5 w-5" />
        ) : (
          <span className="h-6 w-6 [&>svg]:h-full [&>svg]:w-full">{shareIcon}</span>
        )}
        {busy ? labels.preparing : labels.share}
      </button>
      {note ? (
        <p className="hand text-center text-lg opacity-80" role="status">
          {note}
        </p>
      ) : null}
    </>
  );
}
