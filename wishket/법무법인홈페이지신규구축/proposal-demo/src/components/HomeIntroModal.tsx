"use client";

import { useState } from "react";

const STORAGE_KEY = "hankyul-home-intro-modal-seen";

export default function HomeIntroModal() {
  const [open, setOpen] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const seen = window.sessionStorage.getItem(STORAGE_KEY);
    if (seen) {
      return false;
    }

    window.sessionStorage.setItem(STORAGE_KEY, "1");
    return true;
  });

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-2xl border border-[#d7cfc2] bg-[#fffdf8] p-6 md:p-8">
        <p className="text-xs font-semibold tracking-[0.12em] text-[#223558]">DEMO INTRO</p>
        <h2 className="mt-3 text-2xl font-bold text-[#1f2430] md:text-3xl">
          법무법인 한결 데모 안내
        </h2>
        <p className="mt-4 text-sm leading-7 text-stone-700">
          이 사이트는 제안/시연용 데모입니다. 실제 사건 데이터가 아닌 예시 콘텐츠와 더미 연락처를
          사용하며, 정보 구조와 전환 흐름을 검토하기 위한 목적에 맞춰 구성했습니다.
        </p>
        <ul className="mt-4 list-disc pl-5 text-sm leading-7 text-stone-700">
          <li>홈에서 신뢰 형성 순서(히어로 → 긴급 대응 → 성공사례)를 확인할 수 있습니다.</li>
          <li>CMS 데모는 로컬스토리지 기반으로 콘텐츠 등록/수정/삭제를 체험할 수 있습니다.</li>
          <li>브랜드 톤과 문구, 레이아웃은 피드백에 따라 즉시 조정 가능합니다.</li>
        </ul>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="law-btn-primary px-5 py-3 text-sm font-semibold"
          >
            데모 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
