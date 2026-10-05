"use client";

import { useState, type ReactNode } from "react";
import { Scribble } from "@/components/doodles";

interface ShareReceiptProps {
  /** Imagen del comprobante que genera el sitio (/c/:id/imagen). */
  imageUrl: string;
  fileName: string;
  text: string;
  shareIcon: ReactNode;
}

/**
 * Comparte el comprobante como imagen (hoja de compartir del teléfono: WhatsApp, correo…).
 * Donde el navegador no puede compartir archivos, lo descarga.
 */
export function ShareReceipt({ imageUrl, fileName, text, shareIcon }: ShareReceiptProps) {
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
        setNote("Guardamos la imagen en tus descargas.");
      }
    } catch (error) {
      // Cerrar la hoja de compartir no es un error.
      if ((error as { name?: string }).name !== "AbortError") {
        setNote("No pudimos preparar la imagen. Inténtalo otra vez.");
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
        {busy ? "Preparando…" : "Compartir comprobante"}
      </button>
      {note ? (
        <p className="hand text-center text-lg opacity-80" role="status">
          {note}
        </p>
      ) : null}
    </>
  );
}
