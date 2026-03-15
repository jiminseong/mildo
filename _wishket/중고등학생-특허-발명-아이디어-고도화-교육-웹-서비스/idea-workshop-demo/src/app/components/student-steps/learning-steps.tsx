"use client";

import Link from "next/link";
import {
  Play,
  CheckCircle2,
  Key,
  User,
  Calendar,
  GraduationCap,
  MapPin,
  Building2,
  Phone,
  ShieldCheck,
  MonitorPlay,
  Zap,
  PencilLine,
  Trophy,
  ArrowRight,
  Info,
  Lightbulb,
  Search,
  MessageSquare,
  Layers,
  FileText,
  BadgeCheck,
  HelpCircle,
  Check,
  Sun,
  Thermometer,
  Activity,
  Wind,
  Droplets,
  Maximize2,
  Grid,
  Bell,
  Magnet,
  BatteryLow,
  Combine,
  Scissors,
  RotateCcw,
  Link as LinkIcon,
  Cpu,
  Construction,
  Clock,
  Target,
  Coins,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";
import { CARD_GROUPS, GRADE_OPTIONS, REGION_OPTIONS } from "../../demo-data";
import { FieldLabel, Panel, StatusPill } from "../ui";
import type { StudentStepComponent, StudentStepProps } from "./types";

export const Step1: StudentStepComponent = () => {
  return (
    <Panel
      eyebrow="1단계"
      title="로그인을 해주세요"
      description="로그인 후 바로 다음 단계로 이어집니다."
    >
      <div className="rounded-[2.5rem] border border-slate-200 bg-white px-8 py-20 text-center shadow-xl">
        <div className="mx-auto flex max-w-md flex-col items-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-primary">
            <Key className="h-7 w-7" />
          </div>
          <p className="mb-8 text-lg font-medium text-slate-600">
            학습을 시작하려면 먼저 로그인해 주세요.
          </p>
          <Link
            href="/login"
            className="btn-premium btn-primary group inline-flex items-center justify-center gap-2 px-8 py-4"
          >
            <span>로그인하러 가기</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </Panel>
  );
};

export function Step2({ ctx, state }: StudentStepProps) {
  return (
    <Panel
      eyebrow="2단계"
      title="프로필 정보 완성"
      description="성별, 학년, 지역 등 추가 정보를 입력하여 학습 프로필을 완성합니다."
    >
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          <FieldLabel>
            <div className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <User className="h-4 w-4 text-primary" />
              <span>성별</span>
            </div>
            <select
              id="student-gender"
              value={state.student.gender}
              onChange={(e) => ctx.updateStudent("gender", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none shadow-sm transition-all hover:border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="">선택</option>
              <option value="남학생">남학생</option>
              <option value="여학생">여학생</option>
            </select>
          </FieldLabel>

          <FieldLabel>
            <div className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Calendar className="h-4 w-4 text-primary" />
              <span>생년</span>
            </div>
            <input
              id="student-birth-year"
              value={state.student.birthYear}
              onChange={(e) => ctx.updateStudent("birthYear", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none shadow-sm transition-all hover:border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="예: 2010"
            />
          </FieldLabel>

          <FieldLabel>
            <div className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <GraduationCap className="h-4 w-4 text-primary" />
              <span>학년</span>
            </div>
            <select
              id="student-grade"
              value={state.student.grade}
              onChange={(e) => ctx.updateStudent("grade", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none shadow-sm transition-all hover:border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="">선택</option>
              {GRADE_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </FieldLabel>

          <FieldLabel>
            <div className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <MapPin className="h-4 w-4 text-primary" />
              <span>지역</span>
            </div>
            <select
              id="student-region"
              value={state.student.region}
              onChange={(e) => ctx.updateStudent("region", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none shadow-sm transition-all hover:border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="">선택</option>
              {REGION_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </FieldLabel>

          <FieldLabel>
            <div className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Building2 className="h-4 w-4 text-primary" />
              <span>학교명</span>
            </div>
            <input
              id="student-school"
              value={state.student.school}
              onChange={(e) => ctx.updateStudent("school", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none shadow-sm transition-all hover:border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="예: 한빛중학교"
            />
          </FieldLabel>

          <FieldLabel>
            <div className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Phone className="h-4 w-4 text-primary" />
              <span>보호자 연락처</span>
            </div>
            <input
              id="student-parent-contact"
              value={state.student.parentContact}
              onChange={(e) => ctx.updateStudent("parentContact", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none shadow-sm transition-all hover:border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="예: 010-1234-5678"
            />
          </FieldLabel>
        </div>

        <div className="mt-8 space-y-4">
          <label className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/50 p-5 text-sm text-slate-600 transition-colors hover:bg-slate-50">
            <div className="relative flex h-6 w-6 items-center justify-center">
              <input
                id="student-agree"
                type="checkbox"
                checked={state.student.agreed}
                onChange={(e) => ctx.updateStudent("agreed", e.target.checked)}
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-slate-300 transition-all checked:border-primary checked:bg-primary group-hover:border-primary/50"
              />
              <ShieldCheck className="pointer-events-none absolute h-3.5 w-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
            </div>
            <span className="font-medium transition-colors group-hover:text-slate-900">
              개인정보 수집 및 발명가 번호 발급에 동의합니다.
            </span>
          </label>

          {ctx.profileError && (
            <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-600">
              <div className="h-1.5 w-1.5 rounded-full bg-red-600" />
              {ctx.profileError}
            </div>
          )}

          <div className="pt-2">
            <button
              type="button"
              onClick={ctx.handleProfileSubmit}
              className="btn-premium btn-primary w-full py-5 text-lg font-bold shadow-xl shadow-primary/20"
            >
              프로필 정보 저장 & 다음으로
            </button>
          </div>
        </div>
      </div>
    </Panel>
  );
}

export function Step3({
  ctx,
  state,
  setActiveStep,
  setIntroPlaying,
  introPlaying,
}: StudentStepProps) {
  return (
    <Panel
      eyebrow="3단계: 학습 오리엔테이션"
      title="학습 안내 및 튜토리얼"
      description="인벤티브 워크숍의 핵심 개념과 전체 학습 흐름을 시각적으로 안내합니다."
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="group relative overflow-hidden rounded-[32px] bg-slate-900 shadow-2xl">
          <div className="relative aspect-video flex flex-col items-center justify-center p-8">
            <div className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30">
              <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary blur-[120px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-6 rounded-full bg-white/10 p-1 backdrop-blur-md">
                <div className="rounded-full bg-white/10 p-6">
                  <MonitorPlay className="h-12 w-12 animate-pulse text-white" />
                </div>
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white underline decoration-primary decoration-4 underline-offset-8">
                준비되셨나요?
              </h3>
              <p className="max-w-sm text-slate-400">
                발명가 번호를 통해 익명으로 생각을 공유하고 전문가의 피드백을 받으며 아이디어를
                키워보세요.
              </p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIntroPlaying((playing: boolean) => !playing)}
                  className="rounded-full bg-primary p-3 text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
                >
                  <Play className={`h-5 w-5 ${introPlaying ? "fill-white" : ""}`} />
                </button>
                <div className="flex-1">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${state.introProgress}%` }}
                    />
                  </div>
                </div>
                <span className="font-mono text-xs text-white/70">
                  {state.introProgress === 100 ? "완료" : `${state.introProgress}%`}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-700 bg-slate-800/50 p-6">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-800 bg-slate-700 text-[10px] font-bold uppercase text-slate-300"
                  >
                    학{i}
                  </div>
                ))}
              </div>
              <span className="text-xs font-medium tracking-tight text-slate-400">
                현재 2,410명의 학생들이 함께하고 있습니다.
              </span>
            </div>
            <StatusPill tone="bg-primary/20 text-primary border-primary/20">
              실시간 세션 진행 중
            </StatusPill>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="sheet-panel border-none bg-indigo-50/50 p-6">
            <h4 className="flex items-center gap-2 text-sm font-bold text-indigo-900">
              핵심 가이드
            </h4>
            <div className="mt-5 space-y-5">
              {[
                {
                  title: "익명성 보장",
                  desc: "실명 대신 발명가 번호를 사용하여 자유로운 발상이 가능합니다.",
                  icon: ShieldCheck,
                },
                {
                  title: "전문가 피드백",
                  desc: "각 단계별로 운영자와 AI가 맞춤형 질문을 제공합니다.",
                  icon: MessageSquare,
                },
                {
                  title: "성장 중심",
                  desc: "퀴즈와 승인 프로세스를 통해 실질적인 발명 역량을 키웁니다.",
                  icon: Trophy,
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              ctx.setState((prev) => ({ ...prev, introCompleted: true, introProgress: 100 }));
              setActiveStep(4);
              ctx.setActionMessage("자, 이제 본격적인 진단을 시작해볼까요?");
            }}
            className="group mt-auto flex w-full items-center justify-center gap-3 rounded-[24px] bg-slate-900 py-5 font-bold text-white transition-all hover:-translate-y-1 hover:bg-black hover:shadow-xl"
          >
            <span>튜토리얼 완료하고 시작하기</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </Panel>
  );
}

export function Step4({ ctx, state }: StudentStepProps) {
  const hasIdeaOptions = [
    {
      key: "yes" as const,
      title: "이미 아이디어가 있어요",
      desc: "구상해둔 아이디어를 더 구체화하고 전문가의 피드백을 통해 고도화하고 싶습니다.",
      icon: Lightbulb,
      color: "border-primary bg-blue-50/50",
    },
    {
      key: "no" as const,
      title: "아직 아이디어가 없어요",
      desc: "주제와 상황을 바탕으로 추천 초안을 생성해 새로운 발명 아이디어를 찾아보겠습니다.",
      icon: Search,
      color: "border-amber-200 bg-amber-50/30",
    },
  ];

  return (
    <Panel
      eyebrow="4단계: 진입 경로 선택"
      title="아이디어 상태 진단"
      description="현재 아이디어 유무에 따라 가장 적합한 학습 경로를 추천해 드립니다."
    >
      <div className="space-y-10">
        <div className="grid gap-6 md:grid-cols-2">
          {hasIdeaOptions.map((opt) => {
            const isSelected = state.diagnosis.hasIdea === opt.key;
            return (
              <button
                id={`diagnosis-has-idea-${opt.key}`}
                key={opt.key}
                type="button"
                onClick={() => ctx.updateDiagnosis("hasIdea", opt.key)}
                className={`group flex flex-col items-center rounded-[32px] border-3 p-8 text-center transition-all hover:scale-[1.02] active:scale-[0.98] ${
                  isSelected
                    ? `${opt.color} ring-4 ring-primary/5 shadow-2xl`
                    : "border-slate-100 bg-white shadow-sm hover:border-slate-300"
                }`}
              >
                <div
                  className={`mb-6 rounded-[24px] p-5 ${isSelected ? "bg-white text-primary shadow-md" : "bg-slate-50 text-slate-400 group-hover:text-slate-600"}`}
                >
                  <opt.icon className="h-10 w-10" />
                </div>
                <h3
                  className={`mb-3 text-xl font-bold ${isSelected ? "text-slate-900" : "text-slate-600"}`}
                >
                  {opt.title}
                </h3>
                <p className="max-w-[280px] text-sm leading-7 text-slate-500">{opt.desc}</p>

                {isSelected && (
                  <div className="mt-6 flex items-center gap-1.5 text-sm font-bold text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>선택됨</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="sheet-panel bg-slate-50/50 p-8">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-6 w-1.5 rounded-full bg-primary" />
            <h4 className="text-lg font-bold text-slate-900">상세 환경 설정</h4>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <FieldLabel>
              <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                <Layers className="h-4 w-4 text-primary" />
                <span>주제 분야</span>
              </div>
              <select
                value={state.diagnosis.theme}
                onChange={(e) => ctx.updateDiagnosis("theme", e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/5"
              >
                <option value="생활안전">생활안전 (안전/보건)</option>
                <option value="환경">환경 (지속가능성/탄소절감)</option>
                <option value="학습도구">학습도구 (편의/효율)</option>
              </select>
            </FieldLabel>

            <FieldLabel>
              <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                <Zap className="h-4 w-4 text-primary" />
                <span>진행 트랙</span>
              </div>
              <input
                id="diagnosis-preferred-track"
                value={state.diagnosis.preferredTrack}
                onChange={(e) => ctx.updateDiagnosis("preferredTrack", e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/5"
                placeholder="예: 문제 해결형"
              />
            </FieldLabel>

            <div className="flex items-end">
              <button
                type="button"
                onClick={ctx.applyDiagnosisSuggestion}
                className="w-full rounded-2xl border-2 border-dashed border-slate-300 bg-white px-6 py-4 text-sm font-bold text-slate-600 transition-all hover:border-primary hover:bg-blue-50 hover:text-primary"
              >
                추천 아이디어 생성
              </button>
            </div>
          </div>

          <div className="mt-8">
            <FieldLabel>
              <div className="mb-2 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <PencilLine className="h-4 w-4 text-primary" />
                  <span>지금 해결하고 싶은 문제</span>
                </div>
                {state.diagnosis.challenge.length > 0 && (
                  <span className="font-mono text-[11px] text-slate-400">
                    {state.diagnosis.challenge.length}자 입력됨
                  </span>
                )}
              </div>
              <textarea
                id="diagnosis-challenge"
                value={state.diagnosis.challenge}
                onChange={(e) => ctx.updateDiagnosis("challenge", e.target.value)}
                className="min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 leading-7 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/5"
                placeholder="예: 비 오는 날 복도에 우산을 두면 물기로 인해 바닥이 미끄러워져 학생들이 넘어지는 사고가 빈번합니다."
              />
            </FieldLabel>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={ctx.handleDiagnosisSubmit}
            className="group flex min-w-[240px] items-center justify-center gap-3 rounded-full bg-slate-900 px-10 py-5 text-[16px] font-bold text-white shadow-xl transition-all hover:scale-[1.05] hover:bg-black hover:shadow-primary/20"
          >
            <span>진단 저장하고 다음 단계로</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </Panel>
  );
}

export function Step5({ ctx, state }: StudentStepProps) {
  return (
    <Panel
      eyebrow="5단계: 아이디어 구상"
      title="발명 아이디어 초안 작성"
      description="찾아낸 문제를 해결할 첫 번째 아이디어의 제목과 핵심 내용을 정리해보세요."
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <div className="sheet-panel border-primary/10 bg-white p-8">
            <div className="space-y-6">
              <FieldLabel>
                <span className="text-[13px] font-bold text-slate-800">아이디어 제목</span>
                <input
                  id="idea-title"
                  value={state.idea.title}
                  onChange={(e) => ctx.updateIdea("title", e.target.value)}
                  className="w-full rounded-xl border-2 border-slate-100 bg-slate-50/50 px-5 py-4 text-lg font-bold outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5"
                  placeholder="예: 우산 빗물 말리는 친환경 순환 보드"
                />
              </FieldLabel>

              <FieldLabel>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[13px] font-bold text-slate-800">아이디어 요약</span>
                  <StatusPill tone="bg-slate-100 text-slate-500 text-[10px] uppercase font-bold tracking-tighter border-slate-100">
                    핵심 요약
                  </StatusPill>
                </div>
                <textarea
                  id="idea-summary"
                  value={state.idea.summary}
                  onChange={(e) => ctx.updateIdea("summary", e.target.value)}
                  className="min-h-24 w-full rounded-xl border-2 border-slate-100 bg-slate-50/50 px-5 py-4 leading-relaxed outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5"
                  placeholder="학생들이 학교에서 우산 빗물 때문에 미끄러지지 않게 도와주는 친환경적 해결방안"
                />
              </FieldLabel>

              <div className="grid gap-6 md:grid-cols-2">
                <FieldLabel>
                  <span className="text-[13px] font-bold text-slate-800">대상 사용자</span>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="idea-audience"
                      value={state.idea.audience}
                      onChange={(e) => ctx.updateIdea("audience", e.target.value)}
                      className="w-full rounded-xl border-2 border-slate-100 bg-slate-50/50 py-4 pl-11 pr-5 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5"
                      placeholder="예: 초·중학교 학생들"
                    />
                  </div>
                </FieldLabel>
                <FieldLabel>
                  <span className="text-[13px] font-bold text-slate-800">핵심 인사이트</span>
                  <div className="relative">
                    <Zap className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="idea-insight"
                      value={state.idea.insight}
                      onChange={(e) => ctx.updateIdea("insight", e.target.value)}
                      className="w-full rounded-xl border-2 border-slate-100 bg-slate-50/50 py-4 pl-11 pr-5 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5"
                      placeholder="예: 우산 말리는 속도가 중요함"
                    />
                  </div>
                </FieldLabel>
              </div>

              <FieldLabel>
                <span className="text-[13px] font-bold text-slate-800">구체적 문제 정의</span>
                <textarea
                  id="idea-problem"
                  value={state.idea.problem}
                  onChange={(e) => ctx.updateIdea("problem", e.target.value)}
                  className="min-h-32 w-full rounded-xl border-2 border-slate-100 bg-slate-50/50 px-5 py-4 leading-relaxed outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5"
                  placeholder="기존의 우산 비닐은 환경 오염이 심하고, 통에 그냥 꽂아두면 냄새가 나거나 바닥에 물이 흥건해져 미끄러움"
                />
              </FieldLabel>
            </div>
          </div>

          <button
            type="button"
            onClick={ctx.handleIdeaSeedSubmit}
            className="w-full rounded-2xl bg-indigo-600 py-5 text-lg font-bold text-white shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1 hover:bg-indigo-700 active:scale-[0.98]"
          >
            기본 초안 저장하고 카드 보러가기
          </button>
        </div>

        <div className="sticky top-24 self-start space-y-6">
          <div className="relative overflow-hidden rounded-[32px] border-4 border-white bg-slate-50 shadow-2xl">
            <div className="absolute right-0 top-0 h-32 w-32 -mr-10 -mt-10 rounded-full bg-indigo-200/40 blur-3xl" />

            <div className="relative z-10 p-8">
              <div className="mb-8 flex items-center justify-between">
                <div className="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <BadgeCheck className="h-8 w-8 text-primary/20" />
              </div>

              <div className="space-y-6">
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    아이디어 미리보기
                  </p>
                  <h3 className="text-2xl font-black leading-snug tracking-tight text-slate-900">
                    {state.idea.title || "제목을 입력해주세요"}
                  </h3>
                </div>

                <div className="rounded-2xl border border-white bg-white/60 p-5 backdrop-blur-md">
                  <p className="text-sm font-medium italic leading-relaxed text-slate-700">
                    &ldquo;{state.idea.summary || "아이디어 요약이 여기에 표시됩니다."}&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">
                      발명가 번호
                    </span>
                    <span className="text-[14px] font-black tracking-widest text-primary">
                      {state.student.inventorNumber || "발급 대기"}
                    </span>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-slate-200" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-amber-100 bg-amber-50 p-6">
            <div className="flex gap-4">
              <Info className="h-5 w-5 shrink-0 text-amber-500" />
              <p className="text-sm leading-6 text-amber-900">
                초안 단계에서는 수정이 자유롭습니다. 충분히 고민하고 다음 단계에서 **카드**들을 통해
                구체화해보세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

export function Step6({ ctx, state }: StudentStepProps) {
  const currentGroup = CARD_GROUPS.find((g) => g.key === ctx.activeCardGroup) ?? CARD_GROUPS[0];
  const totalSelected =
    state.idea.selectedScience.length +
    state.idea.selectedTech.length +
    state.idea.selectedInvention.length +
    state.idea.selectedQuestion.length;

  return (
    <Panel
      eyebrow="6단계: 카드 워크숍"
      title="디지털 교보재 카드 탐색"
      description="과학/기술/발명 원리 카드를 통해 아이디어에 새로운 숨을 불어넣어 보세요."
    >
      <div className="relative pb-24 lg:pb-32">
        <div className="space-y-10">
          <div className="flex border-b border-slate-200">
            {CARD_GROUPS.map((g) => {
              const isActive = ctx.activeCardGroup === g.key;
              const count =
                g.key === "science"
                  ? state.idea.selectedScience.length
                  : g.key === "tech"
                    ? state.idea.selectedTech.length
                    : g.key === "invention"
                      ? state.idea.selectedInvention.length
                      : state.idea.selectedQuestion.length;

              return (
                <button
                  key={g.key}
                  type="button"
                  onClick={() => ctx.setActiveCardGroup(g.key)}
                  className={`relative px-6 py-4 text-sm font-bold transition-all ${isActive ? "text-primary" : "text-slate-400 hover:text-slate-600"}`}
                >
                  <div className="flex items-center gap-2">
                    {g.title.split(" ")[0]}
                    {count > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                        {count}
                      </span>
                    )}
                  </div>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 rounded-t-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>

          <div
            id="card-workshop-panel"
            tabIndex={-1}
            className="sheet-panel relative min-h-[400px] overflow-visible bg-white p-8"
          >
            <div className="mb-6">
              <span
                className={`mb-3 inline-flex rounded-lg px-3 py-1 text-[11px] font-black uppercase tracking-widest ${currentGroup.accent}`}
              >
                {currentGroup.title}
              </span>
              <p className="text-sm font-medium text-slate-500">{currentGroup.subtitle}</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {currentGroup.items.map((card) => {
                const isSelected = (() => {
                  switch (currentGroup.key) {
                    case "science":
                      return state.idea.selectedScience.includes(card.label);
                    case "tech":
                      return state.idea.selectedTech.includes(card.label);
                    case "invention":
                      return state.idea.selectedInvention.includes(card.label);
                    default:
                      return state.idea.selectedQuestion.includes(card.label);
                  }
                })();

                const IconComponent = (() => {
                  const icons: Record<string, LucideIcon> = {
                    Layers,
                    Sun,
                    Thermometer,
                    Activity,
                    Wind,
                    Droplets,
                    Maximize2,
                    Grid,
                    Bell,
                    Magnet,
                    ShieldCheck,
                    BatteryLow,
                    Combine,
                    Scissors,
                    RotateCcw,
                    Link: LinkIcon,
                    Cpu,
                    Construction,
                    Clock,
                    Target,
                    Coins,
                    ShieldAlert,
                  };
                  if (card.iconName === "UserSearch") return User;
                  if (card.iconName === "SearchCode") return Search;
                  return icons[card.iconName] || Lightbulb;
                })();

                return (
                  <button
                    key={card.label}
                    type="button"
                    onClick={() => ctx.toggleCardSelection(currentGroup.key, card.label)}
                    className={`group relative flex flex-col items-start gap-4 overflow-hidden rounded-3xl border-2 p-6 text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${
                      isSelected
                        ? "border-primary bg-blue-50/50 shadow-xl shadow-primary/5"
                        : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-lg"
                    }`}
                  >
                    <div className="flex w-full items-start justify-between gap-4">
                      <div
                        className={`rounded-2xl p-3 transition-colors ${isSelected ? "bg-primary text-white" : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"}`}
                      >
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-slate-200 group-hover:border-slate-300"
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3 stroke-[4px] text-white" />}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <h4
                        className={`text-lg font-black tracking-tight ${isSelected ? "text-primary" : "text-slate-900"}`}
                      >
                        {card.label}
                      </h4>
                      <p
                        className={`text-xs font-medium leading-relaxed ${isSelected ? "text-blue-700/80" : "text-slate-500"}`}
                      >
                        {card.description}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="fixed bottom-8 left-1/2 z-40 w-full max-w-6xl -translate-x-1/2 animate-in px-4 fade-in slide-in-from-bottom-8 transition-all duration-500">
          <div className="rounded-[40px] border border-white/10 bg-slate-900/95 p-5 text-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] backdrop-blur-2xl lg:p-7">
            <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
              <div className="grow px-2">
                <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center lg:gap-12">
                  <div className="hidden flex-col gap-1 border-r border-white/10 pr-6 sm:flex">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                      STORAGE
                    </span>
                    <h4 className="whitespace-nowrap text-lg font-black">나의 워크북</h4>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 lg:gap-10">
                    {[
                      {
                        label: "과학",
                        values: state.idea.selectedScience,
                        color: "bg-blue-500",
                        icon: Search,
                      },
                      {
                        label: "기술",
                        values: state.idea.selectedTech,
                        color: "bg-purple-500",
                        icon: Zap,
                      },
                      {
                        label: "발명",
                        values: state.idea.selectedInvention,
                        color: "bg-amber-500",
                        icon: HelpCircle,
                      },
                      {
                        label: "질문",
                        values: state.idea.selectedQuestion,
                        color: "bg-emerald-500",
                        icon: MessageSquare,
                      },
                    ].map((g) => (
                      <div key={g.label} className="group flex cursor-pointer items-center gap-3.5">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${g.color}/10 text-${g.color.split("-")[1]}-400 border border-${g.color.split("-")[1]}-500/30 transition-all group-hover:bg-${g.color.split("-")[1]}-500 group-hover:text-white`}
                        >
                          <g.icon className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col leading-tight">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            {g.label}
                          </span>
                          <span className="text-base font-black tracking-tight transition-colors group-hover:text-primary">
                            {g.values.length}{" "}
                            <span className="text-xs font-medium text-slate-500">개</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="hidden h-12 w-px bg-white/10 xl:block" />

                  <div className="hidden flex-col leading-tight lg:flex">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                      TOTAL
                    </span>
                    <span className="text-xl font-black text-white">
                      {totalSelected}{" "}
                      <span className="text-xs font-medium text-slate-500">개 선택됨</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex w-full items-center gap-4 lg:w-auto">
                <button
                  type="button"
                  onClick={ctx.handleCardWorkshopSubmit}
                  className="group flex h-16 grow items-center justify-center gap-3 rounded-[24px] bg-primary text-lg font-black text-white shadow-[0_20px_40px_-10px_rgba(59,130,246,0.5)] transition-all hover:scale-[1.03] hover:bg-blue-600 active:scale-95 lg:grow-0 lg:px-12"
                >
                  <span>워크숍 완료하기</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:rotate-12">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}
