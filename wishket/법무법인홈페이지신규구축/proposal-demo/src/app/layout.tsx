import type { Metadata } from "next";
import Link from "next/link";
import { officeInfo } from "@/lib/legal-data";
import BackButton from "@/components/BackButton";
import "./globals.css";

export const metadata: Metadata = {
  title: "법무법인 한결 | 형사 특화 법률서비스",
  description: "성범죄·마약 사건 대응 전문 법무법인 제안용 데모",
  icons: {
    icon: "/icon",
    shortcut: "/icon",
    apple: "/icon",
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
        <header className="sticky top-0 z-50 border-b border-[#2e3a50] bg-[#101a2b]/95 text-stone-100 backdrop-blur">
          <div className="law-container flex min-h-[72px] items-center justify-between gap-4 py-3">
            <div className="flex items-center gap-3">
              <BackButton />
              <Link href="/" className="text-sm font-semibold tracking-[0.08em] text-amber-200">
                {officeInfo.name}
              </Link>
            </div>

            <nav className="flex flex-wrap items-center justify-end gap-2 text-xs md:text-sm">
              <Link
                href="/about"
                className="border border-transparent px-3 py-2 hover:border-amber-200/50"
              >
                소개
              </Link>
              <Link
                href="/practice"
                className="border border-transparent px-3 py-2 hover:border-amber-200/50"
              >
                전문분야
              </Link>
              <Link
                href="/cases"
                className="border border-transparent px-3 py-2 hover:border-amber-200/50"
              >
                성공사례
              </Link>
              <Link
                href="/consultation"
                className="border border-transparent px-3 py-2 hover:border-amber-200/50"
              >
                상담신청
              </Link>
              <Link href="/cms" className="border border-amber-200/70 px-3 py-2 text-amber-100">
                CMS 데모
              </Link>
            </nav>
          </div>
        </header>

        {children}

        <footer className="border-t border-[#d7cfc2] bg-[#fffdf8] py-10">
          <div className="law-container text-sm leading-7 text-stone-700">
            <p className="text-base font-semibold text-[#1f2430]">{officeInfo.name}</p>
            <p>
              대표번호: {officeInfo.phone} | 주소: {officeInfo.address}
            </p>
            <p>광고책임변호사: 김아무개 | 사업자등록번호: 123-45-67890</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
