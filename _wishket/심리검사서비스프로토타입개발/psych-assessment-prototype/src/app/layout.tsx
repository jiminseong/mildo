import type { Metadata } from "next";
import Link from "next/link";
import DemoInfoModal from "./DemoInfoModal";
import "./globals.css";

export const metadata: Metadata = {
  title: "심리검사 서비스 프로토타입",
  description: "연구과제용 웹 심리검사 프로토타입",
  icons: {
    icon: "/favicon.svg?v=2",
    shortcut: "/favicon.svg?v=2",
    apple: "/favicon.svg?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <header className="border-b border-[#d1d5db] bg-white">
          <div className="container flex min-h-[64px] items-center justify-between gap-3 py-3">
            <Link href="/" className="text-sm font-semibold tracking-[0.04em] text-[#1d4ed8]">
              PSYCH PROTOTYPE
            </Link>
            <nav className="flex flex-wrap gap-2 text-xs md:text-sm">
              <Link href="/assessment" className="border border-[#d1d5db] px-3 py-2">
                검사 진행
              </Link>
              <Link href="/report/sample" className="border border-[#d1d5db] px-3 py-2">
                결과 보기
              </Link>
              <Link href="/admin/logs" className="border border-[#d1d5db] px-3 py-2">
                관리자 로그
              </Link>
            </nav>
          </div>
        </header>

        <DemoInfoModal />
        {children}
      </body>
    </html>
  );
}
