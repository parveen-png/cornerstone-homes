import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Cornerstone Brampton by Primont Homes — independent project updates";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1B3D2E",
          color: "#FFFCF7",
          padding: "64px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 20, letterSpacing: "0.22em", textTransform: "uppercase", color: "#E8D5A3" }}>
            Coming September 2026 · Northwest Brampton
          </div>
          <div style={{ fontSize: 68, lineHeight: 1.08, maxWidth: 980, fontWeight: 600 }}>
            Cornerstone by Primont in Brampton
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#E8E2D4" }}>
          <span>Townhomes & detached homes · From the $600s</span>
          <span>Independent information resource</span>
        </div>
      </div>
    ),
    size,
  );
}
