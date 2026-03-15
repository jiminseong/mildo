"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import FadeUp from "@/components/FadeUp";
import { cases, getLawyerById } from "@/lib/legal-data";

export default function CasesPage() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("전체");
  const featuredCases = cases.slice(0, 3);

  const filtered = useMemo(() => {
    return cases.filter((item) => {
      const byCategory = category === "전체" || item.category === category;
      const byKeyword =
        keyword.trim().length === 0 ||
        item.title.includes(keyword) ||
        item.summary.includes(keyword) ||
        item.resultTag.includes(keyword);
      return byCategory && byKeyword;
    });
  }, [category, keyword]);

  return (
    <main className="law-container py-16">
      <header className="law-card p-6 md:p-8">
        <p className="text-xs font-semibold tracking-[0.12em] text-[#223558]">법무법인 한결</p>
        <h1 className="mt-3 text-4xl leading-tight font-bold">성공 사례 소개</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-700">
          초기 대응 전략이 실제 결과에 어떻게 연결됐는지, 사건 유형별 핵심 쟁점과 대응 포인트를
          요약해 소개합니다.
        </p>
        <div className="mt-5 flex flex-wrap gap-2 text-xs text-stone-600">
          <span className="rounded-full border border-[#d7cfc2] bg-[#fff8e8] px-3 py-1">
            전체 사례 {cases.length}건
          </span>
          <span className="rounded-full border border-[#d7cfc2] bg-[#fff8e8] px-3 py-1">
            대표 사례 {featuredCases.length}건
          </span>
          <span className="rounded-full border border-[#d7cfc2] bg-[#fff8e8] px-3 py-1">
            업데이트 {cases[0]?.publishedAt ?? "-"}
          </span>
        </div>
      </header>

      <section className="mt-8 law-card p-5">
        <div className="grid gap-3 md:grid-cols-[1fr_180px]">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="사건명, 결과 태그 검색"
            className="rounded-lg border border-[#d7cfc2] bg-white px-4 py-3 text-sm outline-none"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-[#d7cfc2] bg-white px-4 py-3 text-sm outline-none"
          >
            <option>전체</option>
            <option>성범죄</option>
            <option>마약</option>
          </select>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {filtered.map((item, index) => {
          const lawyer = getLawyerById(item.lawyerId);

          return (
            <FadeUp key={item.slug} delay={index * 0.04}>
              <article className="law-card p-5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="law-tag">{item.resultTag}</span>
                  <span className="text-stone-500">{item.category}</span>
                </div>
                <h2 className="mt-3 text-xl font-bold">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-stone-700">{item.summary}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-stone-500">
                  {lawyer ? (
                    <Image
                      src={lawyer.image}
                      alt={`${lawyer.name} 프로필`}
                      width={24}
                      height={24}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : null}
                  <p>담당변호사: {item.lawyer}</p>
                </div>
                <Link
                  href={`/cases/${item.slug}`}
                  className="mt-3 inline-block text-sm font-semibold text-[#223558]"
                >
                  상세 보기
                </Link>
              </article>
            </FadeUp>
          );
        })}
      </section>
    </main>
  );
}
