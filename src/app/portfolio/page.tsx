"use client";

import { useState } from "react";
import { portfolioData, type PortfolioItem } from "@/lib/data";
import { getPortfolioPresentation } from "@/lib/portfolio-content";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";

export default function PortfolioPage() {
  type PortfolioFilter = "all" | PortfolioItem["category"];

  const [filter, setFilter] = useState<PortfolioFilter>("all");

  const filters: Array<{ key: PortfolioFilter; label: string }> = [
    { key: "all", label: "전체" },
    { key: "local", label: "자영업 패키지" },
    { key: "advanced", label: "고도 개발" },
    { key: "automation", label: "업무 자동화" },
  ];

  const filteredData =
    filter === "all" ? portfolioData : portfolioData.filter((item) => item.category === filter);

  return (
    <div className="min-h-screen bg-[#f6f2eb] pb-24 pt-24">
      <div className="mx-auto max-w-[1360px] px-6">
        <div className="rounded-[40px] border border-[#e3ddd5] bg-white px-8 py-10 shadow-[0_18px_60px_rgba(31,27,22,0.08)] md:px-10">
          <p className="text-xs font-semibold tracking-[0.24em] text-[#8b8077]">작업 사례 모음</p>
          <h1 className="mt-4 max-w-[14ch] text-4xl font-semibold leading-[1.04] tracking-[-0.06em] text-[#171311] md:text-6xl">
            작업 성격이 다른 만큼
            <br />
            포트폴리오도 같은 화면으로 보여주지 않습니다
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#665d56] md:text-lg">
            외식 브랜드, 체육관, 앱 제품군, 키오스크, 이커머스는 보는 기준이 다릅니다. 각 프로젝트의 성격이 먼저 드러나도록 카드와 상세 화면을 모두 다르게 구성했습니다.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((btn) => (
            <button
              key={btn.key}
              onClick={() => setFilter(btn.key)}
              className={`rounded-full px-5 py-3 text-sm font-medium transition-all ${
                filter === btn.key
                  ? "bg-[#171311] text-white"
                  : "border border-[#ddd6cd] bg-white text-[#5e5650] hover:border-[#bfb6ab]"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredData.map((item) => (
            <PortfolioCard
              key={item.id}
              item={item}
              presentation={getPortfolioPresentation(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
