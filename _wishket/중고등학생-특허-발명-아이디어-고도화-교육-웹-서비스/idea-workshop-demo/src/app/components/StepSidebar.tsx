"use client";

import { Check, Lock, ChevronRight, LayoutGrid, Lightbulb, PencilLine, Flag } from "lucide-react";
import { STEP_ITEMS } from "../demo-data";
import { useDemoContext, getHighestUnlockedStep, isStepAvailable } from "../context/DemoContext";

// 단계별 그룹 정의
const LEARNING_PHASES = [
  { name: "기초 학습", icon: LayoutGrid, range: [1, 3] },
  { name: "진단", icon: Lightbulb, range: [4, 4] },
  { name: "마무리 학습", icon: Flag, range: [12, 13] },
];

const WORKSHOP_PHASES = [
  { name: "아이디어 제작", icon: Lightbulb, range: [5, 6] },
  { name: "심의 및 심사", icon: PencilLine, range: [7, 8] },
  { name: "고도화 과정", icon: Flag, range: [9, 11] },
];

export function StepSidebar({ mode = "learning" }: { mode?: "learning" | "workshop" }) {
  const { state, activeStep, setActiveStep } = useDemoContext();
  const highestUnlockedStep = getHighestUnlockedStep(state);
  const resolvedStep = isStepAvailable(activeStep, state) ? activeStep : highestUnlockedStep;
  const groupsBase = mode === "learning" ? LEARNING_PHASES : WORKSHOP_PHASES;

  // 현재 모드에서의 전체 단계 계산 (학습 진도율 표시용)
  const totalStepsInMode = mode === "learning" ? 6 : 7;
  const currentStepInMode = (() => {
    if (mode === "learning") {
      if (highestUnlockedStep <= 4) return highestUnlockedStep;
      if (highestUnlockedStep >= 12) return highestUnlockedStep - 12 + 5;
      return 4;
    }
    return Math.max(0, Math.min(7, highestUnlockedStep - 4));
  })();

  return (
    <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start w-full xl:max-w-[320px] fade-in-right">
      {/* 상단 요약 정보 - 더 깔끔하게 */}
      <div className="bg-white rounded-[28px] border border-slate-200 p-6 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
        <p className="text-[12px] font-bold tracking-widest text-primary uppercase mb-4">진행률</p>
        <div className="flex items-end justify-between mb-2">
          <div className="flex flex-col">
            <span className="text-3xl font-black text-slate-900 leading-none">
              {currentStepInMode}
              <span className="text-lg text-slate-400 font-medium ml-1">/ {totalStepsInMode}</span>
            </span>
            {state.student.inventorNumber && (
              <span className="text-[11px] font-bold text-slate-400 mt-2 uppercase tracking-tighter">
                {state.student.inventorNumber}
              </span>
            )}
          </div>
          <span className="text-sm font-bold text-primary bg-blue-50 px-2 py-1 rounded-lg">
            {Math.round((currentStepInMode / totalStepsInMode) * 100)}%
          </span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-2">
          <div
            className="h-full bg-primary transition-all duration-700 ease-out shadow-[0_0_8px_rgba(37,99,235,0.4)]"
            style={{ width: `${(currentStepInMode / totalStepsInMode) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 p-5 shadow-sm">
        <div className="space-y-7">
          {groupsBase.map((phase) => (
            <div key={phase.name} className="relative">
              <div className="flex items-center gap-2 mb-4 px-1">
                <div className="p-1.5 rounded-lg bg-slate-50 text-slate-400">
                  <phase.icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[13px] font-bold text-slate-800">{phase.name}</span>
              </div>

              <div className="space-y-1 ml-3 relative pl-4 border-l-2 border-slate-100">
                {STEP_ITEMS.filter((s) => s.id >= phase.range[0] && s.id <= phase.range[1]).map(
                  (step) => {
                    const isLocked = !isStepAvailable(step.id, state);
                    const isActive = resolvedStep === step.id;
                    const isDone =
                      step.id < highestUnlockedStep || (step.id === 13 && state.completed);

                    return (
                      <button
                        key={step.id}
                        onClick={() => !isLocked && setActiveStep(step.id)}
                        disabled={isLocked}
                        className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all relative group mb-0.5
                        ${isActive ? "bg-blue-50/70 translate-x-1" : "hover:bg-slate-50"}
                        ${isLocked ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
                      `}
                      >
                        {/* 커스텀 불렛 포인트 */}
                        <div
                          className={`
                            absolute -left-[23px] z-10 flex h-4 w-4 items-center justify-center rounded-full transition-all border-2 bg-white
                            ${isDone ? "bg-primary border-primary shadow-sm" : ""}
                            ${isActive ? "border-primary bg-white ring-4 ring-blue-100 animate-pulse" : ""}
                            ${!isDone && !isActive ? "border-slate-200" : ""}
                            ${isLocked ? "border-slate-300" : ""}
                          `}
                        >
                          {isDone ? (
                            <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
                          ) : (
                            <div
                              className={`w-1 h-1 rounded-full ${isActive ? "bg-primary" : "bg-slate-300"}`}
                            />
                          )}
                        </div>

                        <div className="flex-1 text-left">
                          <p
                            className={`text-[14px] font-bold tracking-tight transition-colors ${isActive ? "text-primary" : "text-slate-600"} ${isDone ? "text-slate-900" : ""}`}
                          >
                            {step.title}
                          </p>
                        </div>

                        {isActive && (
                          <ChevronRight className="w-4 h-4 text-primary animate-in slide-in-from-left-1 duration-300" />
                        )}
                        {isLocked && <Lock className="w-3 h-3 text-slate-400" />}
                      </button>
                    );
                  },
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
