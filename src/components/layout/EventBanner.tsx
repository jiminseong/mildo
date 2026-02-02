"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function EventBanner() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent hydration mismatch by waiting for mount
  if (!isMounted) return null;

  // Don't show banner on contact page to prevent distraction/data loss
  if (!isOpen || pathname === "/contact") return null;

  return (
    <div className="bg-accent text-white px-4 py-3 relative z-50">
      <div className="container mx-auto max-w-container px-6  flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide">
            설연휴 이벤트
          </span>
          <p className="font-medium">
            2/1~3/31 선착순 마감 5건 임박!{" "}
            <span className="font-bold border-b border-white/50">자영업 START 패키지</span> 무료
            이벤트를 놓치지 마세요.
          </p>{" "}
          <Link
            href="/contact"
            className="flex items-center gap-1 font-bold underline decoration-white/50 hover:decoration-white transition-all text-sm whitespace-nowrap"
          >
            혜택받고 상담하기 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors sm:static sm:translate-y-0"
          aria-label="Close banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
