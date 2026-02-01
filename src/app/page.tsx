import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen pt-20 pb-32">
      {/* Hero Section - Editorial Style */}
      <section className="container mx-auto px-6 max-w-container mb-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start pt-16 lg:pt-32">
          {/* Left: Typography Heavy */}
          <div className="flex-1 space-y-10">
            <div className="inline-block px-3 py-1 border border-text-primary/30 rounded-full text-xs font-medium tracking-wide mb-4">
              SOFTWARE PARTNER
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-text-primary text-balance-kor">
              가게는 단골을,
              <br />
              제품은 출시를.
            </h1>
            <p className="text-xl text-text-secondary max-w-lg leading-relaxed text-balance-kor">
              밀도는 자영업자 웹·예약 패키지와 고도 개발을 함께 하는 소프트웨어 파트너입니다.
              <br />
              개인 프리랜서가 아닌, 체계적인 팀으로서 당신의 비즈니스를 돕습니다.
            </p>
          </div>

          {/* Right: Service Cards / Navigation */}
          {/* Right: Service Cards / Navigation */}
          <div className="flex-1 w-full grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:mt-24">
            {/* Card 1: Dangol */}
            <Link
              href="/local"
              className="group flex flex-col justify-between p-6 bg-white border border-border rounded-xl hover:border-dangol transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md min-h-[240px]"
            >
              <div>
                <div className="mb-4 flex justify-between items-start">
                  <span className="text-dangol font-bold text-xs tracking-uppercase border-b border-dangol/20 pb-1">
                    LOCAL
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-dangol transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-text-primary">자영업 패키지</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  매장 홍보용 웹사이트,
                  <br />
                  예약 시스템 연동.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-semibold text-text-primary group-hover:text-dangol transition-colors">
                자세히 보기 <ArrowRight className="ml-1 w-3 h-3" />
              </div>
            </Link>

            {/* Card 2: Labs */}
            <Link
              href="/advanced"
              className="group flex flex-col justify-between p-6 bg-[#2E3A45] border border-transparent rounded-xl hover:bg-[#252f38] transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md min-h-[240px]"
            >
              <div>
                <div className="mb-4 flex justify-between items-start">
                  <span className="text-white/60 font-bold text-xs tracking-uppercase border-b border-white/20 pb-1">
                    ADVANCED
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">고도 개발</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  MVP, Admin,
                  <br />
                  운영 시스템 구축.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-semibold text-white group-hover:text-white/90 transition-colors">
                자세히 보기 <ArrowRight className="ml-1 w-3 h-3" />
              </div>
            </Link>

            {/* Card 3: Automation */}
            <Link
              href="/automation"
              className="group flex flex-col justify-between p-6 bg-white border border-border rounded-xl hover:border-automation transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md min-h-[240px]"
            >
              <div>
                <div className="mb-4 flex justify-between items-start">
                  <span className="text-automation font-bold text-xs tracking-uppercase border-b border-automation/20 pb-1">
                    AUTOMATION
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-automation/40 group-hover:text-automation transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-text-primary">업무 자동화</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  엑셀, 크롤링, 챗봇.
                  <br />
                  반복 업무 제거.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-semibold text-text-primary group-hover:text-automation transition-colors">
                자세히 보기 <ArrowRight className="ml-1 w-3 h-3" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust / Process Section - Clean Grid */}
      <section className="border-t border-border bg-surface py-24">
        <div className="container mx-auto px-6 max-w-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-4">정돈된 프로세스</h2>
              <p className="text-text-secondary max-w-md">
                복잡한 소통 대신, 명확한 문서와 일정으로 대화합니다.
                <br />
                밀도는 당신이 결과물에만 집중할 수 있도록 돕습니다.
              </p>
            </div>
            <Link
              href="/process"
              className="text-sm font-semibold border-b border-text-primary pb-0.5 hover:text-dangol hover:border-dangol transition-colors"
            >
              전체 과정 자세히 보기
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border border border-border">
            {[
              { title: "명확한 산출물", desc: "소스코드/계정 소유권 이전" },
              { title: "투명한 소통", desc: "주 단위 진행 상황 리포트" },
              { title: "확실한 납기", desc: "약속된 일정 준수 및 보상" },
              { title: "운영/유지보수", desc: "오픈 후에도 든든한 파트너" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-base p-8 hover:bg-white transition-colors h-48 flex flex-col justify-between group"
              >
                <span className="text-xs font-mono text-text-secondary/50">0{idx + 1}</span>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-text-primary group-hover:text-dangol transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
