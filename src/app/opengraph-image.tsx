import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "밀도 | 자영업자 패키지 & 고도 개발 파트너";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        background: "#f5f5f0",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #d1d1c7 2%, transparent 0%), radial-gradient(circle at 75px 75px, #d1d1c7 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          opacity: 0.2,
        }}
      />

      {/* Logo Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 30,
          zIndex: 10,
        }}
      >
        <div style={{ fontSize: 90, fontWeight: 900, color: "#1c1c1b", display: "flex" }}>
          밀도
          <span
            style={{
              fontSize: 40,
              color: "#4a5d44",
              marginLeft: 10,
              marginTop: 15,
              fontWeight: 700,
            }}
          >
            software
          </span>
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 42,
          color: "#5a5a55",
          fontWeight: 600,
          textAlign: "center",
          maxWidth: 900,
          marginBottom: 60,
          lineHeight: 1.4,
          zIndex: 10,
        }}
      >
        자영업자 웹 & 예약 패키지
        <br />
        그리고 고도 개발 파트너
      </div>

      {/* Cards Config */}
      <div style={{ display: "flex", gap: 30, zIndex: 10 }}>
        {/* Local Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "white",
            padding: "20px 40px",
            borderRadius: 24,
            border: "4px solid #4a5d44",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <span style={{ fontSize: 24, color: "#4a5d44", fontWeight: 800 }}>LOCAL</span>
          <span style={{ fontSize: 32, fontWeight: 800, marginTop: 5, color: "#1c1c1b" }}>
            자영업 패키지
          </span>
        </div>

        {/* Advanced Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "white",
            padding: "20px 40px",
            borderRadius: 24,
            border: "1px solid #d1d1c7",
            boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
          }}
        >
          <span style={{ fontSize: 24, color: "#2e3a45", fontWeight: 700 }}>ADVANCED</span>
          <span style={{ fontSize: 32, fontWeight: 700, marginTop: 5, color: "#1c1c1b" }}>
            고도 개발
          </span>
        </div>

        {/* Automation Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "white",
            padding: "20px 40px",
            borderRadius: 24,
            border: "1px solid #d1d1c7",
            boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
          }}
        >
          <span style={{ fontSize: 24, color: "#1e429f", fontWeight: 700 }}>AUTOMATION</span>
          <span style={{ fontSize: 32, fontWeight: 700, marginTop: 5, color: "#1c1c1b" }}>
            업무 자동화
          </span>
        </div>
      </div>
    </div>,
    // ImageResponse options
    {
      ...size,
    },
  );
}
