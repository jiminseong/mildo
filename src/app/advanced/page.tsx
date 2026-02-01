export default function AdvancedPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="text-labs font-bold text-lg mb-2 block">고도 개발</span>
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-text-primary">
          MVP 제작부터
          <br />
          운영 시스템 구축까지
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          초기 스타트업, 사내 신규 프로젝트를 위한 전문 개발 파트너입니다.
          <br />
          출시와 운영이 가능한, 살아있는 코드를 만듭니다.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="space-y-8">
          <div className="bg-surface p-8 rounded-xl border border-border">
            <h3 className="text-xl font-bold mb-4 text-text-primary">제공 분야</h3>
            <ul className="space-y-3 text-text-secondary">
              <li className="flex items-start gap-3">
                <span className="text-labs font-bold mt-1">01</span>
                <div>
                  <strong className="block text-text-primary">MVP / 프로토타입</strong>
                  <span className="text-sm">핵심 가설 검증을 위한 빠르고 단단한 제품</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-labs font-bold mt-1">02</span>
                <div>
                  <strong className="block text-text-primary">웹 어플리케이션</strong>
                  <span className="text-sm">React/Next.js 기반의 고성능 웹 서비스</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-labs font-bold mt-1">03</span>
                <div>
                  <strong className="block text-text-primary">관리자(Admin) / 백오피스</strong>
                  <span className="text-sm">데이터 관리, 정산, 운영 효율화 시스템</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-labs-light/20 p-8 rounded-xl border border-labs/10">
          <h3 className="text-xl font-bold mb-4 text-text-primary">기술 스택 & 프로세스</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-labs mb-2">Tech Stack</h4>
              <p className="text-sm text-text-secondary">
                Next.js, TypeScript, Tailwind CSS, Supabase, Vercel
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-labs mb-2">Process</h4>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>1. 요구사항 상세 정의 (기능 명세)</li>
                <li>2. 주 단위 스프린트 & 진행 상황 공유</li>
                <li>3. 테스트 및 QA</li>
                <li>4. 소스코드 이관 및 운영 가이드 제공</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 text-center">
        <button className="bg-labs text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-labs-hover transition-all shadow-sm hover:scale-[1.02]">
          개발 요구사항 상담하기
        </button>
      </div>
    </div>
  );
}
