"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "회사소개" },
  { href: "/products", label: "사업소개" },
  { href: "/products", label: "제품소개" }, /* Usually maps to same or different page */
  { href: "/contact", label: "고객센터" },
  { href: "/admin", label: "Admin" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground">
      {!isHome && <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)] z-[-1]" />}
      
      <header
        className={clsx(
          "fixed top-0 z-50 w-full transition-all duration-500",
          scrolled || !isHome
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200 py-3"
            : "bg-transparent py-6"
        )}
      >
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 md:px-12 transition-all">
          <Link
            href="/"
            className={clsx(
              "font-heading text-2xl font-black tracking-tight flex items-center gap-3 transition-colors duration-500",
              scrolled || !isHome ? "text-(--corp-primary-900)" : "text-white drop-shadow-md"
            )}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className={clsx(
                "h-8 w-8 transition-colors duration-500",
                scrolled || !isHome ? "text-(--corp-accent-500)" : "text-white"
              )}
            >
              {/* distinct icon for Dareun Chemicals (e.g. leaf/atom combo) */}
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-3H8v-3h3v-3h3v3h3v3h-3v3h-3z" />
            </svg>
            다른화학(주)
          </Link>
          <div className="hidden md:flex flex-wrap gap-8 text-[15px] font-semibold tracking-wide">
            {navItems.map((item, i) => {
              const isActive = pathname === item.href && item.href !== "/products";
              const isDarkHeader = scrolled || !isHome;

              let linkClass = "text-white/80 hover:text-white drop-shadow-sm";
              if (isActive && isDarkHeader) {
                linkClass = "text-(--corp-primary-900) after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-(--corp-primary-900)";
              } else if (isActive && !isDarkHeader) {
                linkClass = "text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-white";
              } else if (!isActive && isDarkHeader) {
                linkClass = "text-gray-500 hover:text-(--corp-primary-900)";
              }

              return (
                <Link
                  key={`${item.href}-${i}`}
                  href={item.href}
                  className={clsx(
                    "relative py-2 transition-colors duration-300 font-heading",
                    linkClass
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          {/* Mobile menu button */}
          <button className="md:hidden">
            <svg
              className={clsx(
                "w-6 h-6",
                scrolled || !isHome ? "text-gray-900" : "text-white"
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </header>
      
      <main className={clsx("relative z-10 w-full", !isHome && "mx-auto max-w-6xl px-4 py-32 md:px-6 md:py-40")}>
        {children}
      </main>

      <footer className="relative z-10 border-t border-(--corp-line) bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 md:px-12 py-12 text-sm text-(--corp-muted)">
          <div className="font-heading text-xl font-bold text-(--corp-primary-900) mb-2">다른화학(주)</div>
          <div className="flex flex-col md:flex-row md:gap-12 gap-4 text-gray-500">
            <p>경기도 성남시 분당구 판교로 123 다른타워 8층</p>
            <p>대표번호 031-123-4567</p>
            <p>이메일 hello@dareun-chem.com</p>
          </div>
          <p className="mt-8 text-xs text-gray-400">© 2026 Dareun Chemicals Co., Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
