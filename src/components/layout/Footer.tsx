"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface py-12 border-t border-border">
      <div className="container mx-auto px-6 max-w-container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-text-primary">밀도 소프트웨어</h2>
          <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
            밀도는 자영업자 웹·예약 패키지와 고도 개발을 함께 하는 소프트웨어 파트너입니다.
            <br />
            정돈된 프로세스로 필요한 결과물을 만듭니다.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-text-primary">Service</h3>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li>
              <Link href="/local" className="hover:text-text-primary transition-colors">
                자영업 패키지
              </Link>
            </li>
            <li>
              <Link href="/advanced" className="hover:text-text-primary transition-colors">
                고도 개발
              </Link>
            </li>
            <li>
              <Link href="/automation" className="hover:text-text-primary transition-colors">
                업무 자동화
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-text-primary transition-colors">
                포트폴리오
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-text-primary">Contact</h3>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li>
              <Link href="/faq" className="hover:text-text-primary transition-colors">
                자주 묻는 질문 (FAQ)
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-text-primary transition-colors">
                문의하기
              </Link>
            </li>

            <li>
              <a
                href="mailto:contact@mildo.com"
                className="hover:text-text-primary transition-colors"
              >
                contact@mildo.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 max-w-container mt-12 pt-8 border-t border-border/50 text-xs text-text-secondary text-center md:text-left">
        © 2026 Mildo Software. All rights reserved.
      </div>
    </footer>
  );
}
