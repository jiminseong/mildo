"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BookOpen, Menu, X } from "lucide-react";
import { useDemoContext } from "../context/DemoContext";

const NAV_ITEMS = [
  { href: "/", label: "소개" },
  { href: "/student/learning", label: "학습 및 진단" },
  { href: "/student/workshop", label: "아이디어 제작 및 고도화" },
  { href: "/board", label: "아이디어 게시판" },
  { href: "/admin", label: "운영 관리" },
  { href: "/guide", label: "이용 안내" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { state, handleLogout } = useDemoContext();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1520px] items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white shadow-sm shadow-primary/20 transition-transform group-hover:scale-105">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display text-sm font-bold tracking-tight text-foreground">
              인벤티브
            </p>
            <p className="text-[11px] tracking-wide text-muted">세상을 바꾸는 나의 첫 발명</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-2 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white! shadow-md shadow-primary/20"
                    : "text-muted hover:bg-surface hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          {state.sessionVerified ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-600">
                <span className="font-bold text-primary">{state.student.name}</span> 학생님
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-muted hover:text-red-500 transition-colors cursor-pointer"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-muted hover:text-foreground transition-colors"
              >
                로그인
              </Link>
              <Link
                href="/login"
                className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white! shadow-md shadow-primary/20 transition-all hover:bg-primary-hover hover:shadow-lg hover:-translate-y-0.5"
              >
                시작하기
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-xl p-2 text-muted transition-colors hover:bg-surface hover:text-foreground md:hidden"
          aria-label="메뉴"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="absolute w-full border-t border-line bg-white/95 shadow-lg backdrop-blur-md md:hidden">
          <div className="mx-auto flex flex-col gap-2 px-5 py-4">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-xl px-4 py-3 text-[15px] font-semibold transition-colors ${
                    isActive
                      ? "bg-primary text-white! shadow-sm shadow-primary/20"
                      : "text-muted hover:bg-surface hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4">
              {state.sessionVerified ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="rounded-xl bg-surface px-4 py-3 text-center text-[15px] font-semibold text-red-500 transition-colors hover:bg-line"
                >
                  로그아웃
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl bg-surface px-4 py-3 text-center text-[15px] font-semibold text-foreground transition-colors hover:bg-line"
                  >
                    로그인
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl bg-primary px-4 py-3 text-center text-[15px] font-bold text-[#ffffff]! shadow-md shadow-primary/20 transition-colors hover:bg-primary-hover"
                  >
                    시작하기
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
