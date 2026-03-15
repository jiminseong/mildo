import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PortfolioItem } from "@/lib/data";
import type { PortfolioPresentation } from "@/lib/portfolio-content";

function getCategoryLabel(category: PortfolioItem["category"]) {
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
}

export function PortfolioCard({
  item,
  presentation,
}: {
  item: PortfolioItem;
  presentation: PortfolioPresentation;
}) {
  const commonProps = {
    href: `/portfolio/${item.id}`,
    className: "group block h-full",
  };

  switch (presentation.mood) {
    case "heritage":
      return (
        <Link {...commonProps}>
          <article className="flex h-full flex-col overflow-hidden rounded-[32px] border border-[#d8c3ae] bg-[#f6efe5] shadow-[0_18px_60px_rgba(63,33,24,0.1)] transition-transform duration-300 group-hover:-translate-y-1">
            <div className="border-b border-[#d8c3ae] bg-[#5a2f24] px-6 py-5 text-[#f7ead8]">
              <p className="text-xs font-semibold tracking-[0.2em]">{presentation.한줄요약}</p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight">{item.title}</h3>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={item.imageSrc} alt={item.imageAlt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="grid flex-1 gap-4 px-6 py-5">
              <p className="text-sm leading-7 text-[#5b4638]">{item.summary}</p>
              <div className="grid grid-cols-3 gap-3 text-center">
                {presentation.지표.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-[#dccab8] bg-white px-3 py-3">
                    <p className="text-[11px] text-[#8b6b58]">{stat.label}</p>
                    <p className="mt-1 text-sm font-semibold text-[#2e1d14]">{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm font-medium text-[#3f291d]">
                <span>{getCategoryLabel(item.category)}</span>
                <span className="inline-flex items-center gap-2">
                  자세히 보기
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </article>
        </Link>
      );
    case "performance":
      return (
        <Link {...commonProps}>
          <article className="flex h-full flex-col overflow-hidden rounded-[32px] border border-[#243327] bg-[#131a14] text-white shadow-[0_18px_60px_rgba(11,18,12,0.24)] transition-transform duration-300 group-hover:-translate-y-1">
            <div className="grid gap-5 px-6 py-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-[#8fc77d]">{presentation.한줄요약}</p>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight">{item.title}</h3>
                </div>
                <div className="rounded-2xl border border-white/10 px-4 py-3 text-right">
                  <p className="text-[11px] text-white/55">장비 수</p>
                  <p className="mt-1 text-3xl font-semibold text-[#a3ff84]">{presentation.지표[0]?.value}</p>
                </div>
              </div>
              <p className="text-sm leading-7 text-white/72">{item.summary}</p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden border-y border-white/10">
              <Image src={item.imageSrc} alt={item.imageAlt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="mt-auto grid gap-3 px-6 py-5">
              <div className="grid grid-cols-2 gap-3">
                {presentation.지표.slice(1).map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-white/6 px-4 py-3">
                    <p className="text-[11px] text-white/55">{stat.label}</p>
                    <p className="mt-1 text-sm font-semibold">{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-white">
                <span>{getCategoryLabel(item.category)}</span>
                <span className="inline-flex items-center gap-2 text-[#a3ff84]">
                  자세히 보기
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </article>
        </Link>
      );
    case "ecosystem":
      return (
        <Link {...commonProps}>
          <article className="flex h-full flex-col overflow-hidden rounded-[32px] border border-[#d7dde7] bg-[#eff2f6] shadow-[0_18px_60px_rgba(38,48,61,0.12)] transition-transform duration-300 group-hover:-translate-y-1">
            <div className="grid gap-4 px-6 py-6">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#324155]">생산성</span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#324155]">웰니스</span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#324155]">브랜드 웹</span>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-[#5d7088]">{presentation.한줄요약}</p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight text-[#16202d]">{item.title}</h3>
              </div>
              <p className="text-sm leading-7 text-[#506173]">{item.summary}</p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden border-y border-[#d7dde7] bg-white">
              <Image src={item.imageSrc} alt={item.imageAlt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="grid flex-1 gap-3 px-6 py-5">
              <div className="grid grid-cols-3 gap-3">
                {presentation.지표.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-[#d7dde7] bg-white px-3 py-3">
                    <p className="text-[11px] text-[#708298]">{stat.label}</p>
                    <p className="mt-1 text-sm font-semibold text-[#16202d]">{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm font-medium text-[#1c2633]">
                <span>{getCategoryLabel(item.category)}</span>
                <span className="inline-flex items-center gap-2">
                  자세히 보기
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </article>
        </Link>
      );
    case "operations":
      return (
        <Link {...commonProps}>
          <article className="flex h-full flex-col overflow-hidden rounded-[32px] border border-[#282119] bg-[#12100d] text-white shadow-[0_18px_60px_rgba(10,9,7,0.28)] transition-transform duration-300 group-hover:-translate-y-1">
            <div className="border-b border-dashed border-[#5a4834] px-6 py-5">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#f7c85a]">{presentation.한줄요약}</p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight">{item.title}</h3>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={item.imageSrc} alt={item.imageAlt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="grid flex-1 gap-4 px-6 py-5">
              <div className="grid grid-cols-3 gap-3">
                {presentation.지표.map((stat, index) => (
                  <div key={stat.label} className={`rounded-2xl px-3 py-3 ${index === 0 ? "bg-[#f7c85a] text-[#1c160f]" : "bg-white/7 text-white"}`}>
                    <p className="text-[11px]">{stat.label}</p>
                    <p className="mt-1 text-sm font-semibold">{stat.value}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm leading-7 text-white/72">{item.summary}</p>
              <div className="flex items-center justify-between text-sm">
                <span>{getCategoryLabel(item.category)}</span>
                <span className="inline-flex items-center gap-2 text-[#f7c85a]">
                  자세히 보기
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </article>
        </Link>
      );
    case "editorial":
      return (
        <Link {...commonProps}>
          <article className="flex h-full flex-col overflow-hidden rounded-[32px] border border-[#ddd8d2] bg-white shadow-[0_18px_60px_rgba(34,28,24,0.08)] transition-transform duration-300 group-hover:-translate-y-1">
            <div className="grid gap-4 px-6 py-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-semibold tracking-[0.2em] text-[#82746b]">{presentation.한줄요약}</p>
                <span className="text-xs text-[#9b8c82]">{item.duration}</span>
              </div>
              <h3 className="max-w-[18ch] text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#161312]">
                {item.title}
              </h3>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden border-y border-[#eee8e2]">
              <Image src={item.imageSrc} alt={item.imageAlt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="grid flex-1 gap-4 px-6 py-5">
              <p className="text-sm leading-7 text-[#5f5752]">{item.summary}</p>
              <div className="grid grid-cols-3 gap-3">
                {presentation.지표.map((stat) => (
                  <div key={stat.label} className="border-t border-[#1c1715] pt-3">
                    <p className="text-[11px] text-[#8f837b]">{stat.label}</p>
                    <p className="mt-1 text-sm font-semibold text-[#161312]">{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm font-medium text-[#161312]">
                <span>{getCategoryLabel(item.category)}</span>
                <span className="inline-flex items-center gap-2">
                  자세히 보기
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </article>
        </Link>
      );
  }
}
