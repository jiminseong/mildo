import { ArrowRight, Code2, Database, LayoutDashboard, Terminal } from "lucide-react";

export default function AdvancedPage() {
  return (
    <main className="min-h-screen pt-24 pb-32 bg-[#F5F5F0]">
      {/* Hero Section */}
      <section className="container mx-auto px-6 max-w-[1400px] mb-24">
        <div className="max-w-3xl">
          <span className="text-labs font-bold text-sm tracking-wide uppercase mb-4 block">
            ADVANCED DEVELOPMENT
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-text-primary leading-[1.1] mb-8 text-balance-kor">
            아이디어를
            <br />
            <span className="text-labs">살아있는 제품</span>으로
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-2xl text-balance-kor">
            MVP 제작부터 운영 가능한 어드민 시스템까지.
            <br />
            초기 스타트업과 사내 벤처를 위한 믿을 수 있는 기술 파트너입니다.
          </p>
        </div>
      </section>

      {/* Scope Grid */}
      <section className="container mx-auto px-6 max-w-[1400px] mb-32">
        <div className="grid md:grid-cols-2 gap-px bg-border border-y border-border">
          <div className="bg-base p-12 hover:bg-white transition-colors group border-r border-border md:border-r-0">
            <div className="w-12 h-12 bg-labs/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-labs group-hover:text-white transition-colors text-labs">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-text-primary">MVP / 프로토타입</h3>
            <ul className="space-y-3 text-text-secondary text-sm">
              <li>• 핵심 가설 검증을 위한 기능 구현</li>
              <li>• 2~4주 이내의 빠른 개발 주기</li>
              <li>• 확장성을 고려한 데이터베이스 설계</li>
            </ul>
          </div>

          <div className="bg-base p-12 hover:bg-white transition-colors group">
            <div className="w-12 h-12 bg-labs/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-labs group-hover:text-white transition-colors text-labs">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-text-primary">관리자 / 백오피스</h3>
            <ul className="space-y-3 text-text-secondary text-sm">
              <li>• 데이터 관리 및 정산 시스템</li>
              <li>• 회원 관리 및 권한(RBAC) 설정</li>
              <li>• 운영 효율화를 위한 자동화 도구</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tech & Process */}
      <section className="container mx-auto px-6 max-w-[1400px]">
        <div className="bg-[#2E3A45] rounded-3xl p-8 md:p-16 text-white overflow-hidden relative">
          <div className="grid md:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 className="text-3xl font-bold mb-8">Technology</h2>
              <p className="text-white/70 mb-8 leading-relaxed">
                최신 기술 스택을 사용하여 안정적이고 빠른 서비스를 만듭니다. 유행을 쫓기보다 검증된
                기술을 선호합니다.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <Code2 className="w-4 h-4" /> Frontend
                  </h4>
                  <p className="text-sm text-white/60">
                    Next.js (App Router), React, TypeScript, Tailwind CSS
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <Database className="w-4 h-4" /> Backend
                  </h4>
                  <p className="text-sm text-white/60">
                    Supabase, Prisma, PostgreSQL, Serverless Functions
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-16">
              <h2 className="text-3xl font-bold mb-8">Process</h2>
              <ul className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "요구사항 구체화",
                    desc: "추상적인 아이디어를 기능 명세서로 변환",
                  },
                  { step: "02", title: "스프린트 개발", desc: "주 단위 배포 및 피드백 루프" },
                  { step: "03", title: "QA 및 안정화", desc: "버그 수정 및 사용성 테스트" },
                  { step: "04", title: "이관 및 교육", desc: "소스코드 원본 전달 및 운영 가이드" },
                ].map((item) => (
                  <li key={item.step} className="flex gap-4">
                    <span className="font-mono text-white/40 pt-1">{item.step}</span>
                    <div>
                      <strong className="block text-lg font-bold mb-1">{item.title}</strong>
                      <span className="text-sm text-white/60">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 max-w-[1400px] mt-32 flex justify-end">
        <button className="group flex items-center gap-4 text-2xl md:text-4xl font-bold text-text-primary hover:text-labs transition-colors">
          프로젝트 문의하기
          <span className="w-12 h-12 rounded-full bg-labs text-white flex items-center justify-center group-hover:scale-110 transition-transform">
            <ArrowRight className="w-6 h-6" />
          </span>
        </button>
      </section>
    </main>
  );
}
