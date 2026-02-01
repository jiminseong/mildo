export default function LocalPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="text-dangol font-bold text-lg mb-2 block">자영업 패키지</span>
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-text-primary">
          내 가게에 꼭 필요한
          <br />
          웹사이트와 예약 시스템
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          복잡한 기능은 빼고, 손님이 궁금해하는 정보와 예약 버튼만 남깁니다.
          <br />
          네이버 지도, 카카오톡, 전화 연결까지 한 번에 해결하세요.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            name: "START",
            desc: "홍보가 필요한 초기 매장",
            price: "합리적인 시작",
            features: ["1페이지 랜딩", "지도/메뉴/영업시간 안내", "기본 SEO (검색 최적화)"],
          },
          {
            name: "GROW",
            desc: "고객 관리가 필요한 매장",
            price: "가장 인기",
            features: [
              "예약/상담 폼 연동",
              "리뷰/후기 섹션",
              "프로모션/이벤트 영역",
              "방문자 분석",
            ],
            highlight: true,
          },
          {
            name: "PRO",
            desc: "확장이 필요한 브랜드",
            price: "전문적인 운영",
            features: [
              "자동화 (알림톡 등)",
              "블로그/공지 관리",
              "다지점 확장 구조",
              "맞춤 기능 개발",
            ],
          },
        ].map((pkg) => (
          <div
            key={pkg.name}
            className={`p-8 rounded-xl border ${
              pkg.highlight
                ? "border-dangol bg-dangol-light/30 shadow-md scale-105"
                : "border-border bg-surface"
            }`}
          >
            <h3 className="text-xl font-bold mb-2 text-text-primary">{pkg.name}</h3>
            <p className="text-sm text-text-secondary mb-4">{pkg.desc}</p>
            <div className="text-2xl font-bold mb-8 text-dangol">{pkg.price}</div>
            <ul className="space-y-3 text-sm text-text-secondary">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="text-dangol">✓</span> {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <button className="bg-dangol text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-dangol-hover transition-all shadow-sm hover:scale-[1.02]">
          내 매장에 맞는 패키지 상담하기
        </button>
      </div>
    </div>
  );
}
