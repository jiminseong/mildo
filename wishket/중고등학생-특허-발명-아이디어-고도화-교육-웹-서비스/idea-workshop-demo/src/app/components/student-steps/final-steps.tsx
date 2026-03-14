"use client";

import Link from "next/link";
import {
  Check,
  CheckCircle2,
  Key,
  ShieldCheck,
  MonitorPlay,
  Trophy,
  ArrowRight,
  Search,
  Layers,
  Sparkles,
  FileText,
  BadgeCheck,
  Zap,
} from "lucide-react";
import { QUIZ_QUESTIONS } from "../../demo-data";
import { phaseLabel, statusLabel } from "../../context/DemoContext";
import { launchCompletionCelebration } from "../../lib/launch-celebration";
import { Panel } from "../ui";
import type { StudentStepProps } from "./types";

const DUST_PARTICLES = [
  { left: "8%", top: "12%", size: 12, delay: "0.02s", duration: "1.45s" },
  { left: "16%", top: "26%", size: 10, delay: "0.14s", duration: "1.55s" },
  { left: "24%", top: "8%", size: 16, delay: "0.08s", duration: "1.8s" },
  { left: "34%", top: "18%", size: 9, delay: "0.22s", duration: "1.5s" },
  { left: "43%", top: "10%", size: 14, delay: "0.18s", duration: "1.7s" },
  { left: "56%", top: "14%", size: 18, delay: "0.26s", duration: "1.9s" },
  { left: "67%", top: "9%", size: 12, delay: "0.12s", duration: "1.55s" },
  { left: "74%", top: "22%", size: 10, delay: "0.3s", duration: "1.65s" },
  { left: "82%", top: "16%", size: 15, delay: "0.16s", duration: "1.82s" },
  { left: "90%", top: "28%", size: 11, delay: "0.24s", duration: "1.58s" },
  { left: "28%", top: "34%", size: 8, delay: "0.34s", duration: "1.4s" },
  { left: "62%", top: "32%", size: 9, delay: "0.38s", duration: "1.48s" },
] as const;

export function Step14({ ctx, state }: StudentStepProps) {
  const handleComplete = () => {
    const isEveryQuestionAnswered = !state.idea.quizAnswers.some((answer) => answer === null);

    if (isEveryQuestionAnswered) {
      void launchCompletionCelebration();
    }

    ctx.handleQuizSubmit();
  };

  return (
    <Panel
      eyebrow="12단계"
      title="마무리 퀴즈"
      description="전체 학습 과정을 복습하고 주요 개념을 퀴즈로 확인하며 마무리합니다."
    >
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[2.5rem] bg-slate-900 p-10 text-white shadow-2xl">
          <p className="mb-4 text-xs font-black uppercase tracking-widest text-primary">최종 단계</p>
          <h3 className="mb-6 text-4xl font-black leading-tight tracking-tight">
            수고하셨습니다,
            <br />
            발명가님!
          </h3>
          <div className="mb-10 h-1.5 w-20 rounded-full bg-primary" />
          <p className="mb-12 text-lg leading-relaxed text-slate-400">
            아이디어가 최종안까지 완벽하게 정리되었습니다. 마지막으로 핵심 원리들을 퀴즈를 통해
            복습하며 과정을 마무리해 주세요.
          </p>
          <div className="space-y-4">
            {[
              { icon: Trophy, text: "최종 고도화 승인 완료" },
              { icon: MonitorPlay, text: "동영상 강의 학습 완료" },
              { icon: Sparkles, text: "아이디어 캔버스 자산화" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-4 rounded-2xl bg-white/5 p-4 transition-all hover:bg-white/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="font-bold text-slate-200">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-6">
            {QUIZ_QUESTIONS.map((q, i) => (
              <div
                key={q.id}
                className="rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-sm font-black text-slate-900">
                    Q{i + 1}
                  </span>
                  <p className="text-xl font-black text-slate-900">{q.question}</p>
                </div>
                <div className="grid gap-3">
                  {q.options.map((option, optionIndex) => {
                    const isSelected = state.idea.quizAnswers[i] === optionIndex;
                    return (
                      <button
                        id={`quiz-option-${i}-${optionIndex}`}
                        key={option}
                        type="button"
                        onClick={() => ctx.handleQuizAnswer(i, optionIndex)}
                        className={`group flex items-center justify-between rounded-2xl border-2 px-6 py-4 text-left font-bold transition-all ${
                          isSelected
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-slate-50 bg-slate-50 text-slate-600 hover:border-slate-200 hover:bg-white"
                        }`}
                      >
                        <span>{option}</span>
                        <div
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                            isSelected ? "border-primary bg-primary text-white" : "border-slate-200"
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3 stroke-4" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[2.5rem] bg-indigo-600 p-8 shadow-xl shadow-indigo-100">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="text-white">
                <h4 className="text-xl font-black">모든 답변을 완료했나요?</h4>
                <p className="text-sm font-medium text-indigo-100/80">
                  정확한 정보를 입력했는지 다시 한번 확인해 주세요.
                </p>
              </div>
              <button
                type="button"
                onClick={handleComplete}
                className="flex items-center gap-2 rounded-2xl bg-white px-10 py-5 font-black text-indigo-600 shadow-lg shadow-black/10 transition-all hover:bg-slate-50 hover:shadow-xl active:scale-95"
              >
                <span>학습 종료 및 결과 확인</span>
                <CheckCircle2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

export function Step15({ state, currentLevel }: StudentStepProps) {
  return (
    <Panel
      eyebrow="최종 단계"
      title="워크숍 익스피리언스 완료"
      description="발명가님의 열정과 노력이 담긴 고도화 학습 결과 리포트입니다."
    >
      <div className="relative mx-auto max-w-6xl overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          <div className="celebration-glow absolute left-[8%] top-2 h-40 w-40 rounded-full bg-cyan-300/20" />
          <div className="celebration-glow absolute left-[38%] top-0 h-56 w-56 rounded-full bg-indigo-300/20 [animation-delay:120ms]" />
          <div className="celebration-glow absolute right-[10%] top-6 h-44 w-44 rounded-full bg-amber-200/25 [animation-delay:220ms]" />
          {DUST_PARTICLES.map((particle, index) => (
            <span
              key={`${particle.left}-${particle.top}-${index}`}
              className="celebration-dust absolute rounded-full bg-white/70"
              style={{
                left: particle.left,
                top: particle.top,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
              }}
            />
          ))}
        </div>

        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "발명가 식별번호",
              value: state.student.inventorNumber,
              icon: Key,
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              label: "현재 아이디어 단계",
              value: phaseLabel(currentLevel),
              icon: Trophy,
              color: "text-amber-600",
              bg: "bg-amber-50",
            },
            {
              label: "취득 점수",
              value: `${state.idea.quizScore ?? 0} / ${QUIZ_QUESTIONS.length}`,
              icon: Sparkles,
              color: "text-indigo-600",
              bg: "bg-indigo-50",
            },
            {
              label: "운영자 인가 상태",
              value: statusLabel(state.gate2Status),
              icon: ShieldCheck,
              color: "text-emerald-600",
              bg: "bg-emerald-50",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-4xl border border-slate-200 bg-white p-8 transition-all hover:shadow-lg"
            >
              <div
                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${stat.bg} ${stat.color}`}
              >
                <stat.icon className="h-7 w-7" />
              </div>
              <p className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">
                {stat.label}
              </p>
              <h4 className="text-2xl font-black text-slate-900">{stat.value}</h4>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-sm">
            <div className="mb-10 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
                <Layers className="h-7 w-7" />
              </div>
              <h4 className="text-2xl font-black text-slate-900">선택된 발명 아카이브</h4>
            </div>

            <div className="space-y-8">
              {[
                {
                  label: "과학/기술 원리",
                  items: [...state.idea.selectedScience, ...state.idea.selectedTech],
                  icon: Search,
                  color: "bg-blue-500",
                },
                {
                  label: "발명 및 질문",
                  items: [...state.idea.selectedInvention, ...state.idea.selectedQuestion],
                  icon: Zap,
                  color: "bg-amber-500",
                },
              ].map((group) => (
                <div key={group.label}>
                  <div className="mb-4 flex items-center gap-2">
                    <span className={`h-1 w-6 rounded-full ${group.color}`} />
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                      {group.label} ({group.items.length})
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.length > 0 ? (
                      group.items.map((card: string) => (
                        <span
                          key={card}
                          className="rounded-xl border border-slate-100 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-xs hover:border-slate-200"
                        >
                          {card}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm font-medium italic text-slate-400">
                        선택된 정보가 없습니다.
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[2.5rem] bg-slate-900 p-10 text-white shadow-2xl">
            <div>
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20">
                <BadgeCheck className="h-10 w-10 text-white" />
              </div>
              <h4 className="mb-6 text-3xl font-black leading-tight">
                축하합니다!
                <br />
                모든 워크숍을 정복했습니다.
              </h4>
              <p className="text-lg leading-relaxed text-slate-400">
                아이디어 발상부터 전문가 피드백 반영, 최종 실체화까지의 모든 과정을 훌륭하게
                수행하셨습니다.
                <br />
                <br />
                기록된 발명 로그는 발명가님의 창의적 자산으로 영구 보관되며, 향후 출원 및 실제
                구현을 위한 강력한 기초 자료가 될 것입니다.
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white py-5 font-black text-slate-900 shadow-lg shadow-black/10 transition-all hover:bg-slate-100 active:scale-95">
                <span>결과 리포트 출력</span>
                <FileText className="h-5 w-5" />
              </button>
              <Link
                href="/student"
                onClick={() => globalThis.location.reload()}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 py-5 font-black text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <span>대시보드로 돌아가기</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}
