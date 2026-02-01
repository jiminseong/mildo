import {
  ArrowDown,
  CheckCircle2,
  MessageSquare,
  MonitorPlay,
  ScrollText,
  Users,
} from "lucide-react";

export default function ProcessPage() {
  const steps = [
    {
      step: "01",
      icon: MessageSquare,
      title: "문의 및 상담",
      desc: "홈페이지 폼을 통해 프로젝트 내용을 남겨주시면, 담당자가 요구사항을 분석하여 1차 상담을 진행합니다.",
      detail: ["유선/화상 미팅", "레퍼런스 확인", "예산 및 일정 논의"],
    },
    {
      step: "02",
      icon: ScrollText,
      title: "기획 및 견적",
      desc: "구체적인 기능 명세와 화면 설계를 확정하고, 이에 따른 정확한 견적서와 개발 일정을 제안합니다.",
      detail: ["기능 상세 정의서", "화면 기획(Wireframe)", "최종 견적서 발송"],
    },
    {
      step: "03",
      icon: Code2Icon, // Placeholder, custom icon below
      title: "디자인 & 개발",
      desc: "확정된 기획을 바탕으로 UI 디자인과 실제 개발을 진행합니다. 진행 상황은 주 단위로 투명하게 공유됩니다.",
      detail: ["UI/UX 디자인 시안", "프론트엔드/백엔드 개발", "중간 산출물 공유"],
    },
    {
      step: "04",
      icon: CheckCircle2,
      title: "테스트 및 수정",
      desc: "개발 완료 후 철저한 기능 테스트를 거칩니다. 클라이언트 피드백을 반영하여 완성도를 높입니다.",
      detail: ["QA 테스트", "버그 수정", "최종 컴펌"],
    },
    {
      step: "05",
      icon: MonitorPlay,
      title: "오픈 및 이관",
      desc: "실제 도메인에 서비스를 배포하고 검색 엔진 등록 등 오픈에 필요한 제반 작업을 지원합니다.",
      detail: ["도메인/서버 연결", "SEO 기본 설정", "관리자 계정 전달"],
    },
    {
      step: "06",
      icon: Users,
      title: "유지보수",
      desc: "오픈 이후에도 안정적인 운영을 돕습니다. 간단한 텍스트/이미지 수정부터 기능 추가까지 함께합니다.",
      detail: ["버그 모니터링", "정기 유지보수(옵션)", "추가 개발 지원"],
    },
  ];

  return (
    <main className="min-h-screen pt-24 pb-32">
      {/* Hero */}
      <section className="container mx-auto px-6 max-w-[1400px] mb-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary">진행 방식</h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto text-balance-kor">
          밀도는 체계적인 프로세스로 리스크를 줄이고, 약속된 결과물을 만듭니다.
          <br />
          복잡한 개발 용어 대신 명확한 문서와 일정으로 소통합니다.
        </p>
      </section>

      {/* Steps Vertical Timeline for Mobile, Grid for Desktop */}
      <section className="container mx-auto px-6 max-w-[1000px]">
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {steps.map((item, idx) => {
            const Icon = item.icon === Code2Icon ? Users : item.icon; // Quick fix for icon variable
            return (
              <div
                key={idx}
                className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${idx % 2 === 0 ? "" : ""}`}
              >
                {/* Center Icon */}
                <div className="absolute left-0 md:left-1/2 -ml-0 md:-ml-6 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-base shadow-sm bg-white z-10 group-hover:border-dangol group-hover:scale-110 transition-all">
                  <span className="text-sm font-bold text-text-secondary group-hover:text-dangol">
                    {item.step}
                  </span>
                </div>

                {/* Content Card */}
                <div className="w-full md:w-[45%] pl-16 md:pl-0 md:group-odd:pl-8 md:group-even:pr-8 md:group-odd:text-left md:group-even:text-right">
                  <div className="bg-surface p-8 rounded-xl border border-border group-hover:border-text-primary/20 transition-colors">
                    <h3 className="text-xl font-bold mb-3 text-text-primary flex items-center gap-2 md:group-even:justify-end">
                      <span className="md:hidden text-dangol">{item.step}.</span> {item.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4 text-balance-kor">
                      {item.desc}
                    </p>
                    <ul
                      className={`text-xs text-text-secondary/70 space-y-1 ${idx % 2 !== 0 ? "md:items-end md:flex md:flex-col" : ""}`}
                    >
                      {item.detail.map((d) => (
                        <li key={d} className="flex items-center gap-1">
                          • {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Empty Space for Grid alignment */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-6 max-w-[1400px] mt-32 text-center">
        <div className="bg-dangol/5 rounded-2xl p-12">
          <h2 className="text-2xl font-bold mb-4">개발, 어렵게 느끼지 마세요.</h2>
          <p className="text-text-secondary mb-8">
            밀도가 기획부터 오픈까지 친절하게 안내해 드립니다.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-dangol text-white font-bold rounded-lg hover:bg-dangol-hover transition-colors"
          >
            프로젝트 문의하기
          </a>
        </div>
      </section>
    </main>
  );
}

// Icon placeholder fix
const Code2Icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-code-2"
  >
    <path d="m18 16 4-4-4-4" />
    <path d="m6 8-4 4 4 4" />
    <path d="m14.5 4-5 16" />
  </svg>
);
