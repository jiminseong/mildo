import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "밀도 | 자영업자 패키지 & 고도 개발 파트너",
  description:
    "밀도는 자영업자 웹·예약 패키지와 고도 개발을 함께 하는 소프트웨어 파트너입니다. 30초 안에 내게 필요한 솔루션을 확인하세요.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "밀도 | 자영업자 패키지 & 고도 개발 파트너",
    description: "정돈된 프로세스로 필요한 결과물을 만듭니다.",
    locale: "ko_KR",
    type: "website",
  },
};

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EventBanner } from "@/components/layout/EventBanner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased text-text-primary bg-base font-sans">
        <EventBanner />
        <Header />
        <div className="">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
