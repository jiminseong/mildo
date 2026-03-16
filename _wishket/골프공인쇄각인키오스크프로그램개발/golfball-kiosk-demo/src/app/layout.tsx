import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Golfball Kiosk Demo",
  description: "골프공 인쇄/각인 키오스크 데모",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
