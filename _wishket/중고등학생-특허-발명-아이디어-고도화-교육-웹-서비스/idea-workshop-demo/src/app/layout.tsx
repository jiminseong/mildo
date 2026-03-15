import type { Metadata } from "next";
import "./globals.css";
import { ClientLayout } from "./client-layout";

export const metadata: Metadata = {
  title: "인벤티브 — 세상을 바꾸는 발명의 시작",
  description:
    "차세대 발명가를 위한 아이디어 고도화 플랫폼. 체계적인 단계별 학습과 집단 지성을 통해 상상 속 아이디어를 혁신적인 특허로 만듭니다.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="font-pretendard antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
