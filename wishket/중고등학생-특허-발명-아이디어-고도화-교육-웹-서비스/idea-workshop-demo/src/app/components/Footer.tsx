"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="footer-bar">
      <div className="mx-auto max-w-[1520px] px-5 py-10 md:px-7 md:py-14">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Branding */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-foreground text-white">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold tracking-[-0.02em] text-foreground">인벤티브</p>
                <p className="text-[11px] tracking-[0.02em] text-muted-foreground">
                  세상을 바꾸는 나의 첫 발명
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-7 text-muted-foreground">
              인벤티브는 학생들의 창의적인 아이디어를 체계적으로 구체화하고, 선생님의 효율적인
              관리를 돕는 혁신적인 에듀테크 서비스입니다.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              서비스
            </p>
            <nav className="mt-4 flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                소개
              </Link>
              <Link
                href="/student"
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                아이디어 만들기
              </Link>
              <Link
                href="/admin"
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                운영 관리
              </Link>
              <Link
                href="/guide"
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                이용 안내
              </Link>
            </nav>
          </div>

          {/* Info */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              지원 환경
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["PC 웹", "태블릿", "모바일", "반응형"].map((env) => (
                <span
                  key={env}
                  className="inline-flex rounded-full border border-border bg-white px-3 py-1.5 text-[12px] font-medium text-foreground"
                >
                  {env}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              학생의 개인정보는 운영자만 확인할 수 있으며, 익명 게시판에서는 발명가 번호만
              노출됩니다.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
          <p className="text-[12px] text-muted-foreground">
            © 2025 인벤티브(Inventive). All rights reserved.
          </p>
          <p className="text-[12px] text-muted-foreground">
            차세대 발명가를 위한 아이디어 고도화 플랫폼
          </p>
        </div>
      </div>
    </footer>
  );
}
