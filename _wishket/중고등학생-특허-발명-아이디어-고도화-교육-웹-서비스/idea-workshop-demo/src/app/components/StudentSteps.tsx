"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, Lightbulb } from "lucide-react";
import {
  useDemoContext,
  getHighestUnlockedStep,
  isStepAvailable,
  getCurrentIdeaLevel,
  buildCurrentIdea,
} from "../context/DemoContext";
import { Step1, Step2, Step3, Step4, Step5, Step6 } from "./student-steps/learning-steps";
import { Step9, Step10, Step11, Step12, Step13 } from "./student-steps/workshop-steps";
import { Step14, Step15 } from "./student-steps/final-steps";
import type { StudentStepComponent } from "./student-steps/types";
import { Panel } from "./ui";

const STEP_COMPONENTS: Record<number, StudentStepComponent> = {
  1: Step1,
  2: Step2,
  3: Step3,
  4: Step4,
  5: Step5,
  6: Step6,
  7: Step9,
  8: Step10,
  9: Step11,
  10: Step12,
  11: Step13,
  12: Step14,
  13: Step15,
};

export function StudentSteps({ mode = "learning" }: { mode?: "learning" | "workshop" }) {
  const ctx = useDemoContext();
  const router = useRouter();
  const { state, activeStep, setActiveStep, setIntroPlaying, introPlaying } = ctx;
  const highestUnlockedStep = getHighestUnlockedStep(state);
  const validationNoticeRef = useRef<HTMLDivElement | null>(null);

  let resolvedStep = isStepAvailable(activeStep, state) ? activeStep : highestUnlockedStep;

  if (mode === "learning") {
    if (resolvedStep >= 5 && resolvedStep <= 11) {
      resolvedStep = highestUnlockedStep >= 12 ? 12 : 4;
    }
  } else if (mode === "workshop" && resolvedStep > 11) {
    resolvedStep = 11;
  }

  const currentIdea = buildCurrentIdea(state);
  const boardIdeas = currentIdea ? [currentIdea, ...state.peerIdeas] : [...state.peerIdeas];
  const filteredIdeas =
    ctx.boardFilter === "all" ? boardIdeas : boardIdeas.filter((idea) => idea.level === ctx.boardFilter);
  const effectiveBoardIdeaId = boardIdeas.some((idea) => idea.id === ctx.selectedBoardIdeaId)
    ? ctx.selectedBoardIdeaId
    : (boardIdeas[0]?.id ?? "");
  const selectedBoardIdea = boardIdeas.find((idea) => idea.id === effectiveBoardIdeaId) ?? null;
  const currentLevel = getCurrentIdeaLevel(state);

  const stepProps = {
    ctx,
    state,
    activeStep,
    setActiveStep,
    setIntroPlaying,
    introPlaying,
    highestUnlockedStep,
    resolvedStep,
    currentIdea,
    boardIdeas,
    filteredIdeas,
    effectiveBoardIdeaId,
    selectedBoardIdea,
    currentLevel,
  };

  useEffect(() => {
    if (ctx.stepValidation?.step !== resolvedStep) return;
    validationNoticeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [ctx.stepValidation, resolvedStep]);

  useEffect(() => {
    if (mode !== "learning") return;
    if (highestUnlockedStep < 5 || highestUnlockedStep >= 12) return;
    if (activeStep < 5) return;

    router.replace("/student/workshop");
  }, [activeStep, highestUnlockedStep, mode, router]);

  if (mode === "workshop" && highestUnlockedStep < 5) {
    return (
      <Panel
        eyebrow="진입 제한"
        title="학습 및 진단 미완료"
        description="워크숍을 시작하기 전에 학습 및 진단을 먼저 완료해야 합니다."
      >
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-6 rounded-full bg-amber-50 p-6 text-amber-500">
            <Lightbulb className="h-12 w-12" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-slate-900">학습 및 진단을 먼저 진행해 주세요</h3>
          <p className="mb-8 max-w-sm text-slate-500">
            아이디어를 만들기 위해서는 기초 학습과 현재 상태에 대한 진단이 필요합니다.
          </p>
          <Link href="/student/learning" className="btn-premium btn-primary px-8 py-3">
            학습 및 진단으로 이동
          </Link>
        </div>
      </Panel>
    );
  }

  const StepComponent = STEP_COMPONENTS[resolvedStep] || Step15;

  return (
    <div className="space-y-4">
      {ctx.stepValidation?.step === resolvedStep ? (
        <div
          ref={validationNoticeRef}
          className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700 shadow-sm"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="text-sm font-bold">입력 확인이 필요합니다.</p>
            <p className="mt-1 text-sm leading-6">{ctx.stepValidation.message}</p>
          </div>
        </div>
      ) : null}
      <StepComponent {...stepProps} />
    </div>
  );
}
