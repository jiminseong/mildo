"use client";

import Link from "next/link";
import { ArrowRight, Shield, Lightbulb, MessageSquare, Users, BookOpen, Award } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col overflow-hidden pb-16">
      {/* Hero Section */}
      <section className="relative px-5 pt-16 pb-24 md:px-10 md:pt-24 lg:pt-32">
        {/* Abstract shapes behind hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-blue-400/20 to-sky-300/20 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="mx-auto max-w-5xl text-center fade-in-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/50 bg-blue-50/50 px-4 py-1.5 text-sm font-medium text-blue-600 shadow-sm backdrop-blur-md mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            중고등학생 특허·발명 아이디어 고도화 교육
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            실물 교보재를 <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
              직관적인 웹 학습 도구
            </span>
            로
          </h1>

          <p className="mt-8 mx-auto max-w-2xl text-lg text-slate-600 leading-relaxed md:text-xl">
            학생은 단계별 가이드를 통해 아이디어를 체계적으로 정리하고, 익명 피드백으로 성장합니다.
            관리자는 간편한 승인 절차로 전체 교육 품질을 관리하세요.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="btn-premium btn-primary w-full sm:w-auto">
              학습 시작하기 <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/guide" className="btn-premium btn-secondary w-full sm:w-auto">
              이용 안내 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlight Cards */}
      <section className="px-5 md:px-10 mt-4 relative z-10">
        <div className="mx-auto max-w-[1520px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in-up delay-200">
            {[
              {
                title: "15단계 아이디어 고도화",
                desc: "로그인부터 최종 퀴즈까지, 단계별 입력과 피드백을 통해 아이디어를 발전시킵니다.",
                label: "학습 과정",
                color: "text-blue-600",
                bg: "bg-blue-50/50",
              },
              {
                title: "실시간 연동",
                desc: "학생이 과제를 제출하면 운영자가 즉시 확인하고, 승인 결과가 즉각 반영됩니다.",
                label: "핵심 기능",
                color: "text-sky-600",
                bg: "bg-sky-50/50",
              },
              {
                title: "모든 기기 지원",
                desc: "PC, 태블릿, 모바일 등 어떤 환경에서든 동일한 프리미엄 학습 경험을 제공합니다.",
                label: "지원 환경",
                color: "text-indigo-600",
                bg: "bg-indigo-50/50",
              },
            ].map((card, i) => (
              <div key={card.title} className="glass-card p-8">
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${card.bg} ${card.color} mb-4`}
                >
                  {card.label}
                </span>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{card.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Features */}
      <section className="px-5 md:px-10 mt-32 relative">
        <div className="mx-auto max-w-[1520px]">
          <div className="text-center mb-16 fade-in-up delay-300">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              핵심 프로세스
            </h2>
            <p className="mt-4 text-slate-600 text-lg">완성도 높은 결과물을 위한 체계적인 기능</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 fade-in-up delay-300">
            {[
              {
                icon: Shield,
                title: "발명가 번호 익명성",
                desc: "학생 실명은 운영자만 확인하며, 게시판과 피드백은 발명가 번호로 철저히 익명 처리됩니다.",
                color: "text-emerald-500",
                bg: "bg-emerald-50",
              },
              {
                icon: Lightbulb,
                title: "카드 기반 아이디어 구체화",
                desc: "과학 원리, 기술 요소, 발명 원리 등 검증된 요소 카드를 선택해 아이디어를 입체적으로 구체화합니다.",
                color: "text-amber-500",
                bg: "bg-amber-50",
              },
              {
                icon: MessageSquare,
                title: "상호 피드백 교환",
                desc: "타 학생의 아이디어에 자유롭게 피드백을 남기고, 받은 피드백을 수용하여 더 나은 산출물을 만듭니다.",
                color: "text-blue-500",
                bg: "bg-blue-50",
              },
              {
                icon: Users,
                title: "운영자 다이렉트 승인",
                desc: "중간·최종 단계에서 제출된 내역을 운영자가 반려하거나 통과시키며 다음 단계로 진입을 제어합니다.",
                color: "text-violet-500",
                bg: "bg-violet-50",
              },
              {
                icon: BookOpen,
                title: "15단계 체계적 학습 락",
                desc: "건너뛰는 과정 없이 순차적으로 단계가 열리는 시스템을 통해 밀착 가이드 경험을 제공합니다.",
                color: "text-rose-500",
                bg: "bg-rose-50",
              },
              {
                icon: Award,
                title: "상세한 결과 요약 대시보드",
                desc: "발명가 번호, 아이디어 발전 내역, 획득한 카드, 퀴즈 점수 등을 한눈에 파악할 수 있습니다.",
                color: "text-sky-500",
                bg: "bg-sky-50",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-[1.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${f.bg} mb-6 transition-transform group-hover:scale-110`}
                >
                  <f.icon className={`h-6 w-6 ${f.color}`} />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-slate-800 mb-3">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 md:px-10 mt-32 mb-10 text-center fade-in-up delay-300">
        <div className="mx-auto max-w-[1520px]">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-900 px-6 py-20 md:py-24">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.15),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.15),transparent_40%)]" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
                당신의 아이디어를 실현할 시간
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-10">
                15단계의 직관적인 프로세스로 체계적인 결과물을 도출해 보세요.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-slate-900 px-8 py-4 text-base font-bold transition-transform hover:-translate-y-1 hover:shadow-xl"
                >
                  학습 시작하기 <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 text-white border border-white/20 px-8 py-4 text-base font-bold transition-all hover:bg-white/20 hover:-translate-y-1"
                >
                  운영 관리
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
