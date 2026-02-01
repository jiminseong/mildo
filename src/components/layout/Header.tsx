import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-base/90 backdrop-blur-sm border-b border-border py-4">
      <div className="container mx-auto px-6 max-w-container flex items-center justify-between">
        {/* Logo - Text based, strong typography */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-text-primary z-50 relative group"
        >
          밀도<span className="text-dangol text-xs align-top ml-1">software</span>
        </Link>

        {/* Desktop Nav - Minimal and clean */}
        <nav className="hidden md:flex items-center gap-10 text-[15px] font-medium text-text-secondary">
          <Link href="/local" className="hover:text-dangol transition-colors">
            자영업 패키지
          </Link>
          <Link href="/advanced" className="hover:text-labs transition-colors">
            고도 개발
          </Link>
          <Link href="/automation" className="hover:text-automation transition-colors">
            업무 자동화
          </Link>
          <div className="h-4 w-px bg-border mx-2" />
          <Link href="/portfolio" className="hover:text-text-primary transition-colors">
            포트폴리오
          </Link>
          <Link href="/process" className="hover:text-text-primary transition-colors">
            진행방식
          </Link>
          <Link
            href="/contact"
            className="ml-4 flex items-center gap-2 px-5 py-2.5 rounded-full bg-text-primary text-base font-medium text-white hover:bg-dangol transition-colors group"
          >
            문의하기
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
