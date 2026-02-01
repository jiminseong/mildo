import { ArrowRight, Bot, Database, FileSpreadsheet, Zap } from "lucide-react";

export default function AutomationPage() {
  return (
    <main className="min-h-screen pt-24 pb-32">
      {/* Hero */}
      <section className="container mx-auto px-6 max-w-container mb-24">
        <div className="max-w-3xl">
          <span className="text-automation font-bold text-sm tracking-wide uppercase mb-4 block">
            WORKFLOW AUTOMATION
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-text-primary leading-[1.1] mb-8 text-balance-kor">
            단순 반복 업무,
            <br />
            이제 <span className="text-automation">기술에게</span> 맡기세요.
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-2xl text-balance-kor">
            사람은 창의적인 일에, 반복되는 일은 봇(Bot)에게.
            <br />월 100시간의 여유를 찾아드리는 밀도의 자동화 솔루션입니다.
          </p>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="container mx-auto px-6 max-w-container mb-32">
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: FileSpreadsheet,
              title: "엑셀/구글시트 자동화",
              desc: "매일 반복되는 '복사 붙여넣기' 지옥에서 탈출하세요. 복잡한 수식 없이도 데이터가 자동으로 정리됩니다.",
              examples: ["주문 내역 자동 취합", "일일 매출 보고서 생성", "재고 관리 자동화"],
            },
            {
              icon: Bot,
              title: "알림 봇 (Slack/Kakao)",
              desc: "중요한 알림을 놓치지 마세요. 매출 발생, 문의 접수, 서버 오류 등을 실시간으로 메신저로 받아봅니다.",
              examples: [
                "매출 발생 시 슬랙 알림",
                "Notion 변경 사항 슬랙 전송",
                "고객 문의 카카오톡 알림",
              ],
            },
            {
              icon: Database,
              title: "데이터 수집 (Crawling)",
              desc: "웹상의 정보를 자동으로 긁어옵니다. 경쟁사 가격 모니터링, 뉴스 수집 등 필요한 모든 데이터를 확보하세요.",
              examples: ["경쟁사 상품 가격 추적", "부동산 매물 정보 수집", "키워드 뉴스 모니터링"],
            },
            {
              icon: Zap,
              title: "맞춤형 RPA 툴",
              desc: "우리 회사에만 있는 독특한 업무 프로세스. 딱 맞는 작은 소프트웨어를 만들어 해결해 드립니다.",
              examples: [
                "이미지 일괄 리사이징/워터마크",
                "PDF 텍스트 추출/변환",
                "사내 양식 자동 완성",
              ],
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-surface p-8 md:p-10 rounded-2xl border border-border hover:border-automation/30 transition-colors group"
            >
              <div className="w-12 h-12 bg-automation/5 rounded-lg flex items-center justify-center mb-6 text-automation group-hover:bg-automation group-hover:text-white transition-colors">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-text-primary">{item.title}</h3>
              <p className="text-text-secondary leading-relaxed mb-6 text-balance-kor">
                {item.desc}
              </p>
              <ul className="space-y-2">
                {item.examples.map((ex) => (
                  <li key={ex} className="flex items-center gap-2 text-sm text-text-secondary/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-automation/40" />
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison / Benefit */}
      <section className="bg-text-primary py-24 text-white">
        <div className="container mx-auto px-6 max-w-container">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">도입 전 vs 도입 후</h2>
              <p className="text-white/60 text-lg leading-relaxed">
                자동화는 비용이 아닙니다.
                <br />
                가장 확실한 <span className="text-automation font-bold">시간 투자</span>입니다.
              </p>
            </div>

            <div className="flex-1 w-full grid gap-4">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex items-center justify-between">
                <span className="text-white/60">기존 업무 시간</span>
                <span className="text-xl font-bold text-white/40 line-through">일 4시간</span>
              </div>
              <div className="bg-automation p-6 rounded-xl border border-automation flex items-center justify-between shadow-lg shadow-automation/20">
                <span className="text-white font-bold">도입 후 업무 시간</span>
                <span className="text-2xl font-bold text-white">일 5분</span>
              </div>
              <div className="mt-2 text-right text-sm text-white/60">
                * 실제 클라이언트(쇼핑몰 A사) 사례 기준
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 max-w-container mt-32 text-center">
        <h2 className="text-2xl font-bold mb-6">반복 업무가 고민이신가요?</h2>
        <p className="text-text-secondary mb-8">
          어떤 업무를 자동화할 수 있을지 무료로 진단해 드립니다.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-automation text-white font-bold rounded-lg hover:bg-automation-hover transition-colors shadow-lg shadow-automation/20"
        >
          자동화 가능 여부 문의하기 <ArrowRight className="w-4 h-4" />
        </a>
      </section>
    </main>
  );
}
