import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #18181b 0%, #09090b 60%, #042f2e 100%)",
          borderRadius: "18px",
          border: "1px solid rgba(45, 212, 191, 0.3)",
          boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.25), 0 8px 20px rgba(13, 148, 136, 0.4)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient Backlight Flare */}
        <div
          style={{
            position: "absolute",
            top: "-12px",
            left: "-12px",
            width: "48px",
            height: "48px",
            background: "radial-gradient(circle, rgba(45, 212, 191, 0.5) 0%, rgba(0,0,0,0) 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Diagonal Glass Reflection Beam */}
        <div
          style={{
            position: "absolute",
            top: "-20px",
            left: "-20px",
            width: "100px",
            height: "20px",
            background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)",
            transform: "rotate(-45deg)",
          }}
        />

        {/* Outer Bevel Shadow Layer for 'R' */}
        <span
          style={{
            position: "absolute",
            fontSize: 44,
            fontWeight: 900,
            fontFamily: "system-ui, -apple-system, sans-serif",
            letterSpacing: "-0.06em",
            color: "rgba(4, 47, 46, 0.8)",
            marginTop: "2px",
            marginLeft: "2px",
          }}
        >
          R
        </span>

        {/* Foreground 3D Gradient 'R' */}
        <span
          style={{
            fontSize: 44,
            fontWeight: 900,
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            letterSpacing: "-0.06em",
            background: "linear-gradient(180deg, #5eead4 0%, #14b8a6 50%, #0f766e 100%)",
            backgroundClip: "text",
            color: "transparent",
            position: "relative",
            zIndex: 10,
          }}
        >
          R
        </span>
      </div>
    ),
    { ...size }
  );
}

