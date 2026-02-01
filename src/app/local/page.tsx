import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export default function LocalPage() {
  const packages = [
    {
      name: "START",
      desc: "홍보가 필요한 초기 매장",
      price_range: "30~50만 원",
      features: [
        "1페이지 랜딩 웹사이트",
        "지도/메뉴/영업시간 안내",
        "기본 SEO (검색 최적화)",
        "도메인 연결 지원",
      ],
      recommended: false,
    },
    {
      name: "GROW",
      desc: "고객 관리가 필요한 매장",
      price_range: "60~100만 원",
      features: [
        "예약/상담 폼 연동",
        "인스타그램/블로그 리뷰 섹션",
        "프로모션/이벤트 팝업",
        "방문자 통계 제공",
      ],
      recommended: true,
    },
    {
      name: "PRO",
      desc: "확장이 필요한 브랜드",
      price_range: "120만 원~",
      features: [
        "고객 알림톡 자동화",
        "블로그/공지사항 관리 기능",
        "다지점(프랜차이즈) 확장 구조",
        "맞춤 기능 추가 개발",
      ],
      recommended: false,
    },
  ];

  return (
    <main className="min-h-screen pt-24 pb-32">
      {/* Hero Section */}
      <section className="container mx-auto px-6 max-w-container mb-24">
        <div className="max-w-3xl">
          <span className="text-dangol font-bold text-sm tracking-wide uppercase mb-4 block">
            LOCAL PACKAGE
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-text-primary leading-[1.1] mb-8 text-balance-kor">
            내 가게에 꼭 필요한
            <br />
            <span className="text-text-secondary">웹사이트와 예약 시스템</span>
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-2xl text-balance-kor">
            복잡한 기능은 빼고, 손님이 궁금해하는 정보와 예약 버튼만 남깁니다. 네이버 지도,
            카카오톡, 전화 연결까지 한 번에 해결하세요.
          </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="container mx-auto px-6 max-w-container">
        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative flex flex-col p-8 rounded-2xl transition-all duration-300 ${
                pkg.recommended
                  ? "bg-white border-2 border-dangol shadow-lg scale-[1.02] z-10"
                  : "bg-surface border border-border hover:border-dangol/50"
              }`}
            >
              {pkg.recommended && (
                <span className="absolute -top-4 left-8 bg-dangol text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Most Popular
                </span>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-text-primary mb-2">{pkg.name}</h3>
                <p className="text-sm text-text-secondary">{pkg.desc}</p>
              </div>

              <div className="mb-8 pb-8 border-b border-border border-dashed">
                <span className="text-3xl font-bold text-text-primary block mb-1">
                  {pkg.price_range}
                </span>
                <span className="text-xs text-text-secondary">
                  * VAT 별도 / 작업 범위에 따라 변동
                </span>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-text-primary">
                    <Check className="w-5 h-5 text-dangol shrink-0" />
                    <span className="text-balance-kor">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact?type=local"
                className={`w-full py-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  pkg.recommended
                    ? "bg-dangol text-white hover:bg-dangol-hover shadow-md hover:shadow-lg"
                    : "bg-white border border-border text-text-primary hover:border-text-primary hover:bg-gray-50"
                }`}
              >
                {pkg.name} 패키지 상담하기 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container mx-auto px-6 max-w-container mt-32 text-center">
        <h2 className="text-2xl font-bold mb-6">어떤 패키지가 맞을지 고민되시나요?</h2>
        <p className="text-text-secondary mb-8">
          업종과 예산을 알려주시면 가장 효율적인 구성을 제안해 드립니다.
        </p>
        <Link
          href="/contact?type=local"
          className="inline-flex items-center justify-center px-8 py-4 bg-text-primary text-white font-bold rounded-lg hover:bg-dangol transition-colors"
        >
          무료 견적 상담 받기
        </Link>
      </section>
    </main>
  );
}
