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
          background: "#24382E",
          color: "#F6F3EE",
          padding: "64px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 22, letterSpacing: "0.22em", textTransform: "uppercase", color: "#D9D1C3" }}>
            Coming September 2026 · Northwest Brampton
          </div>
          <div style={{ fontSize: 72, lineHeight: 1.05, maxWidth: 980 }}>
            Cornerstone by Primont in Brampton
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#EFE8DC" }}>
          <span>Townhomes & detached homes · From the $600s</span>
          <span>Independent information resource</span>
        </div>
      </div>
    ),
    size,
  );
}
