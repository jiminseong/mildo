import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

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
          background: "linear-gradient(145deg, #101a2b, #223558)",
          border: "2px solid #c8a56a",
          color: "#f3e4c6",
          fontSize: 30,
          fontWeight: 800,
          letterSpacing: -1,
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        HK
      </div>
    ),
    {
      ...size,
    },
  );
}
