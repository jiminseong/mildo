"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { portfolioData, type PortfolioItem } from "@/lib/data";

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

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "local":
        return "자영업 패키지";
      case "advanced":
        return "고도 개발";
      case "automation":
        return "업무 자동화";
      default:
        return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "local":
        return "text-dangol";
      case "advanced":
        return "text-labs";
      case "automation":
        return "text-automation";
      default:
        return "text-text-secondary";
    }
  };

  return (
    <div className="container mx-auto px-6 max-w-container py-24 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-text-primary">Portfolio</h1>
        <p className="text-text-secondary">밀도 소프트웨어가 만들어온 가치 있는 결과물들입니다.</p>
      </div>

      {/* Filters */}
      <div className="flex justify-center gap-2 mb-12 flex-wrap">
        {filters.map((btn) => (
          <button
            key={btn.key}
            onClick={() => setFilter(btn.key)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
              filter === btn.key
                ? "bg-text-primary text-white"
                : "bg-surface text-text-secondary hover:bg-border"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredData.map((item) => (
          <Link href={`/portfolio/${item.id}`} key={item.id} className="group cursor-pointer">
            <div
              className="aspect-video rounded-xl mb-4 border border-border overflow-hidden relative bg-surface"
            >
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="space-y-2">
              <span className={`text-xs font-bold ${getCategoryColor(item.category)}`}>
                {getCategoryLabel(item.category)}
              </span>
              <h3 className="text-xl font-bold text-text-primary group-hover:text-text-secondary transition-colors line-clamp-1">
                {item.title}
              </h3>
              <p className="text-sm text-text-secondary line-clamp-2">{item.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
