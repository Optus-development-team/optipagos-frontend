import { ImageResponse } from "next/og";
import { OPTIPAGOS_MARK } from "@/components/brand/paths";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Icono para la pantalla de inicio: el pajarito sobre cáscara de huevo. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0ead6",
        }}
      >
        <svg width="132" height="132" viewBox={OPTIPAGOS_MARK.viewBox} fill="#00416a">
          <path transform={OPTIPAGOS_MARK.transform} d={OPTIPAGOS_MARK.d} />
        </svg>
      </div>
    ),
    size,
  );
}
