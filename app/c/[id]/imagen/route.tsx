import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getReceipt } from "@/lib/backend";
import { receiptDate, receiptTitle } from "@/lib/receipt/format";
import { OPTIPAGOS_MARK } from "@/components/brand/paths";

/**
 * Imagen del comprobante de un movimiento (1200 × 630).
 *
 * Se genera aquí, en el frontend, con los datos de GET /api/v1/receipts/:id. La usan:
 *  - el bot: optipagos-backend la descarga, la sube a WhatsApp y la envía como encabezado
 *    del mensaje "Envío completado" / "Recibiste dinero";
 *  - la página /c/:id: para compartirla o descargarla y como vista previa del enlace.
 */
const INK = "#00416a";
const SHELL = "#f0ead6";
const CREAM = "#fbf8ee";
const HONEY = "#f2c96b";
const MOSS = "#2f7f6f";
const CLAY = "#c5603c";

const font = (folder: string, file: string) =>
  readFile(join(process.cwd(), "assets", "fonts", folder, file));

// Tipografías de Google Fonts guardadas en assets/fonts (el generador necesita los TTF).
const fonts = Promise.all([
  font("BebasNeue", "BebasNeue-Regular.ttf"),
  font("DMSans", "DMSans-Regular.ttf"),
  font("DMSans", "DMSans-Bold.ttf"),
  font("PatrickHand", "PatrickHand-Regular.ttf"),
  font("Baumans", "Baumans-Regular.ttf"),
]);

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <span style={{ fontFamily: "Patrick Hand", fontSize: 30, opacity: 0.7 }}>{label}</span>
      <span
        style={{
          fontFamily: "DM Sans",
          fontWeight: 700,
          fontSize: 34,
          lineHeight: 1.15,
          maxWidth: 300,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const receipt = await getReceipt(id).catch(() => undefined);
  if (receipt === undefined) return new Response("Comprobante no disponible", { status: 502 });
  if (!receipt) return new Response("Comprobante no encontrado", { status: 404 });

  const { title } = receiptTitle(receipt);
  const done = receipt.status === "CONFIRMED";
  const failed = receipt.status === "FAILED";
  const badge = done ? MOSS : failed ? CLAY : INK;
  const [bebas, dmSans, dmSansBold, patrick, baumans] = await fonts;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 36,
          backgroundColor: SHELL,
          backgroundImage: `radial-gradient(circle at 15px 15px, rgba(0,65,106,0.14) 1.6px, transparent 2px)`,
          backgroundSize: "30px 30px",
          color: INK,
        }}
      >
        {/* Sombra de rotulador */}
        <div
          style={{
            position: "absolute",
            left: 48,
            top: 50,
            width: 742,
            height: 546,
            borderRadius: "44px 54px 40px 58px",
            backgroundColor: HONEY,
          }}
        />
        {/* Tarjeta del comprobante */}
        <div
          style={{
            width: 742,
            height: 546,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "38px 46px 36px",
            borderRadius: "44px 54px 40px 58px",
            border: `5px solid ${INK}`,
            backgroundColor: CREAM,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: "Patrick Hand", fontSize: 34, opacity: 0.75 }}>
                comprobante · {receipt.reference}
              </span>
              <span
                style={{
                  fontFamily: "Bebas Neue",
                  fontSize: 76,
                  lineHeight: 1,
                  textTransform: "uppercase",
                }}
              >
                {title}
              </span>
            </div>
            <div
              style={{
                width: 92,
                height: 92,
                borderRadius: 46,
                border: `5px solid ${INK}`,
                backgroundColor: badge,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="54" height="54" viewBox="0 0 100 100" fill="none">
                <path
                  d={
                    done
                      ? "M18 54 C28 62 34 70 42 80 C54 54 68 36 86 20"
                      : failed
                        ? "M24 24 L76 76 M76 24 L24 76"
                        : "M50 22 L50 52 L70 62"
                  }
                  stroke={CREAM}
                  strokeWidth="11"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ fontFamily: "Bebas Neue", fontSize: 178, lineHeight: 0.9 }}>
              {receipt.amount}
            </span>
            <span
              style={{ fontFamily: "Bebas Neue", fontSize: 70, marginLeft: 16, opacity: 0.65 }}
            >
              {receipt.currency}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              paddingTop: 22,
              borderTop: `4px dashed rgba(0,65,106,0.35)`,
            }}
          >
            <Row label="de" value={receipt.from} />
            <Row label="para" value={receipt.to} />
          </div>

          <span style={{ fontFamily: "Patrick Hand", fontSize: 32, opacity: 0.8 }}>
            {receiptDate(receipt)}
            {receipt.memo ? ` · ${receipt.memo}` : ""}
          </span>
        </div>

        {/* Marca */}
        <div
          style={{
            flex: 1,
            marginLeft: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50px 42px 56px 44px",
            backgroundColor: INK,
            color: CREAM,
          }}
        >
          <svg width="218" height="218" viewBox={OPTIPAGOS_MARK.viewBox} fill={HONEY}>
            <path transform={OPTIPAGOS_MARK.transform} d={OPTIPAGOS_MARK.d} />
          </svg>
          <span style={{ fontFamily: "Baumans", fontSize: 64, marginTop: 6 }}>optipagos</span>
          <span style={{ fontFamily: "Patrick Hand", fontSize: 30, color: HONEY }}>
            tu plata, por WhatsApp
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Bebas Neue", data: bebas, weight: 400, style: "normal" },
        { name: "DM Sans", data: dmSans, weight: 400, style: "normal" },
        { name: "DM Sans", data: dmSansBold, weight: 700, style: "normal" },
        { name: "Patrick Hand", data: patrick, weight: 400, style: "normal" },
        { name: "Baumans", data: baumans, weight: 400, style: "normal" },
      ],
      headers: {
        // Un comprobante confirmado ya no cambia; los demás se regeneran en cada visita.
        "Cache-Control": done ? "public, max-age=3600" : "no-store",
        "X-Robots-Tag": "noindex",
      },
    },
  );
}
