"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Upload,
  CheckCircle2,
  CircleDashed,
  Quote,
  BadgeCheck,
  Send,
  ArrowRight,
} from "lucide-react";
import { gateTone, statusLabel } from "../../context/DemoContext";
import { FieldLabel, Modal, Panel, StatusPill } from "../ui";
import type { StudentStepProps } from "./types";

export function Step9({ ctx, state }: StudentStepProps) {
  return (
    <Panel
      eyebrow="7단계"
      title="중간 제출"
      description="지금까지의 아이디어를 정리해 1차 검토를 요청합니다."
    >
      <div className="grid gap-6 xl:grid-cols-[0.98fr_1.02fr]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
            <p className="text-sm font-bold text-slate-900">데모 제출 안내</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              데모에서는 수정된 제목과 해결안만 입력하면 1차 심사 요청을 보낼 수 있습니다. 실제
              승인과 다음 단계 진행은 운영자 시스템에서 처리해 주세요.
            </p>
            <Link
              id="step9-board-link"
              href="/admin"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-primary shadow-sm transition-all hover:-translate-y-0.5"
            >
              운영자 시스템 가기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {state.receivedFeedback.length > 0 ? (
            <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-bold text-slate-900">받은 피드백 답변</p>
              {state.receivedFeedback.map((feedback) => (
                <div key={feedback.id} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    {feedback.author}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{feedback.content}</p>
                  <textarea
                    id={`feedback-response-${feedback.id}`}
                    value={feedback.response}
                    onChange={(e) => ctx.updateFeedbackResponse(feedback.id, e.target.value)}
                    className="mt-3 min-h-24 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    placeholder="이 피드백을 어떻게 반영했는지 답변해 주세요."
                  />
                </div>
              ))}
            </div>
          ) : null}

          <FieldLabel>
            <span>수정 메모</span>
            <textarea
              id="idea-revision-memo"
              value={state.idea.revisionMemo}
              onChange={(e) => ctx.updateIdea("revisionMemo", e.target.value)}
              className="min-h-32 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              placeholder="어떤 피드백을 반영했고 무엇을 바꾸었는지 정리해 주세요."
            />
          </FieldLabel>

          <FieldLabel>
            <span>수정된 제목</span>
            <input
              id="idea-refined-title"
              value={state.idea.refinedTitle}
              onChange={(e) => ctx.updateIdea("refinedTitle", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              placeholder="예: 복도 이동 안전을 위한 접이식 자석 정리 보드"
            />
          </FieldLabel>
          <FieldLabel>
            <span>수정된 해결안</span>
            <textarea
              id="idea-refined-solution"
              value={state.idea.refinedSolution}
              onChange={(e) => ctx.updateIdea("refinedSolution", e.target.value)}
              className="min-h-40 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              placeholder="피드백을 반영해 어떤 구조로 바꿨는지 적어 주세요."
            />
          </FieldLabel>
          <button
            type="button"
            onClick={ctx.handleLevel2Submit}
            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow transition-all hover:-translate-y-0.5 hover:bg-indigo-500"
          >
            1차 검토 요청 보내기
          </button>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-[12px] font-semibold tracking-[0.04em] text-muted-foreground">
            데모 체크리스트
          </p>
          <div className="mt-4 space-y-3">
            {[
              {
                id: "sent_feedback",
                label: "익명 게시판 피드백 1회 이상",
                done: state.sentFeedbackCount > 0,
                optional: true,
              },
              {
                id: "responses",
                label: "받은 피드백 전부 답변",
                done: state.receivedFeedback.every((item) => item.response.trim()),
                optional: true,
              },
              {
                id: "memo",
                label: "수정 메모 작성",
                done: Boolean(state.idea.revisionMemo.trim()),
                optional: true,
              },
              {
                id: "title",
                label: "수정된 제목 입력",
                done: Boolean(state.idea.refinedTitle.trim()),
                optional: false,
              },
              {
                id: "solution",
                label: "수정된 해결안 입력",
                done: Boolean(state.idea.refinedSolution.trim()),
                optional: false,
              },
            ].map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between gap-4 rounded-2xl border px-6 py-5 transition-all ${
                  item.done
                    ? item.optional
                      ? "border-blue-100 bg-blue-50/40"
                      : "border-green-100 bg-green-50/30"
                    : "border-slate-100 bg-slate-50/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-bold ${
                      item.done
                        ? item.optional
                          ? "text-blue-700"
                          : "text-green-700"
                        : "text-slate-500"
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.optional ? (
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-500">
                      선택
                    </span>
                  ) : null}
                </div>
                {item.done ? (
                  <CheckCircle2
                    className={`h-5 w-5 ${item.optional ? "text-blue-600" : "text-[#48694c]"}`}
                  />
                ) : (
                  <CircleDashed className="h-5 w-5 text-[#9c9489]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

export function Step10({ state, setActiveStep }: StudentStepProps) {
  const [reviewGuideOpen, setReviewGuideOpen] = useState(state.gate1Status === "pending");

  return (
    <>
      <Panel
        eyebrow="8단계"
        title="1차 심사 대기"
        description="운영진이 제출물에 대해 승인 혹은 보완 요청을 진행합니다."
      >
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <StatusPill tone={`${gateTone(state.gate1Status)} border-0`}>
              {statusLabel(state.gate1Status)}
            </StatusPill>
            <p className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-foreground">
              운영자 1차 검토
            </p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {state.gate1Note || "아직 검토 요청이 없습니다."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/admin"
                className="inline-flex rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow transition-all hover:-translate-y-0.5 hover:bg-indigo-500"
              >
                운영자 콘솔로 이동
              </a>
              {state.gate1Status === "changes" ? (
                <button
                  type="button"
                  onClick={() => setActiveStep(7)}
                  className="border border-border bg-white px-5 py-3 text-sm text-foreground hover:bg-panel"
                >
                  중간 제출 수정하러 가기
                </button>
              ) : null}
              {state.gate1Status === "approved" ? (
                <button
                  type="button"
                  onClick={() => setActiveStep(9)}
                  className="border border-border bg-white px-5 py-3 text-sm text-foreground hover:bg-panel"
                >
                  다음 단계 열기
                </button>
              ) : null}
            </div>
          </div>
          <div className="border border-border bg-panel p-5">
            <p className="text-[12px] font-semibold tracking-[0.04em] text-muted-foreground">
              운영자 확인 방식
            </p>
            <div className="mt-4 space-y-3">
              <div className="border border-border bg-white p-4">
                <p className="text-sm font-semibold text-foreground">승인</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  해결안 정리 단계가 열리고 중간 제출이 완료 처리됩니다.
                </p>
              </div>
              <div className="border border-border bg-white p-4">
                <p className="text-sm font-semibold text-foreground">보완 요청</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  학생은 중간 제출 단계로 돌아가 수정해야 합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Panel>

      <Modal open={reviewGuideOpen} onClose={() => setReviewGuideOpen(false)}>
        <div className="space-y-4 pr-10">
          <p className="text-[12px] font-semibold tracking-[0.04em] text-primary">데모 안내</p>
          <h3 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">
            운영자 시스템을 이용해보세요
          </h3>
          <p className="text-sm leading-7 text-slate-600">
            1차 심사 요청은 정상적으로 접수되었습니다. 데모에서는 운영자 화면에서 승인 또는 보완
            요청을 직접 눌러 다음 단계로 진행합니다.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-indigo-500"
            >
              운영자 시스템으로 이동
            </Link>
            <button
              type="button"
              onClick={() => setReviewGuideOpen(false)}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50"
            >
              이 창 닫기
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export function Step11({ ctx, state }: StudentStepProps) {
  return (
    <Panel
      eyebrow="9단계"
      title="해결안 정리"
      description="단순 아이디어를 실제 실행 흐름으로 구체화하여 정리하는 단계입니다."
    >
      <div className="grid gap-4">
        <FieldLabel>
          <span>스토리보드</span>
          <textarea
            id="idea-storyboard"
            value={state.idea.storyboard}
            onChange={(e) => ctx.updateIdea("storyboard", e.target.value)}
            className="min-h-40 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
            placeholder="예: 복도 벽면 보드를 펼친다 → 물건을 자석 칸에 붙인다"
          />
        </FieldLabel>
        <FieldLabel>
          <span>구현 절차</span>
          <textarea
            id="idea-implementation-plan"
            value={state.idea.implementationPlan}
            onChange={(e) => ctx.updateIdea("implementationPlan", e.target.value)}
            className="min-h-36 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
            placeholder="재질, 설치 위치, 학생 사용 방식 등을 작성해 보세요."
          />
        </FieldLabel>
        <button
          type="button"
          onClick={ctx.handleStructureSubmit}
          className="w-fit rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow transition-all hover:-translate-y-0.5 hover:bg-indigo-500"
        >
          구조화 저장
        </button>
      </div>
    </Panel>
  );
}

export function Step12({ ctx, state }: StudentStepProps) {
  return (
    <Panel
      eyebrow="10단계"
      title="자료 및 증빙 업로드"
      description="아이디어를 실체화하는 데 필요한 이미지, 스케치, 참고 자료를 첨부합니다."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-10 text-center transition-all hover:border-primary/50 hover:bg-white">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
              <Upload className="h-8 w-8" />
            </div>
            <h4 className="mb-2 text-lg font-black text-slate-900">
              파일을 드래그하거나 클릭하세요
            </h4>
            <p className="mb-6 text-sm font-medium text-slate-500">JPG, PNG, PDF (최대 10MB)</p>
            <label className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800">
              <span id="idea-evidence-upload" tabIndex={0}>
                이미지 선택하기
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={ctx.handleEvidenceUpload}
              />
            </label>
          </div>

          <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
            <FieldLabel>
              <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-slate-400">
                자료 설명 및 메모
              </span>
              <textarea
                id="idea-evidence-notes"
                value={state.idea.evidenceNotes}
                onChange={(e) => ctx.updateIdea("evidenceNotes", e.target.value)}
                className="min-h-48 w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 font-medium text-slate-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5"
                placeholder="어떤 자료인지 간단한 설명을 남겨주세요."
              />
            </FieldLabel>
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h4 className="text-xl font-black text-slate-900">첨부 자료 미리보기</h4>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
              전체 {state.idea.evidenceImages.length}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {state.idea.evidenceImages.length > 0 ? (
              state.idea.evidenceImages.map((img, i) => (
                <div
                  key={img + i}
                  className="group relative overflow-hidden rounded-2xl border border-slate-100"
                >
                  <Image
                    src={img}
                    alt={`업로드 미리보기 ${i + 1}`}
                    width={480}
                    height={240}
                    unoptimized
                    className="h-40 w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => ctx.removeEvidenceImage(i)}
                      className="rounded-xl bg-red-500 px-4 py-2 text-xs font-bold text-white shadow-lg transition-transform hover:scale-110"
                    >
                      삭제하기
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex aspect-square flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50 p-8 text-center sm:col-span-2">
                <p className="text-sm font-bold text-slate-400">아직 업로드된 자료가 없습니다.</p>
              </div>
            )}
          </div>

          <div className="mt-8 border-t border-slate-100 pt-8">
            <button
              type="button"
              onClick={ctx.handleEvidenceSubmit}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-indigo-600 py-5 font-black text-white shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-500 active:scale-95"
            >
              <CheckCircle2 className="h-5 w-5" />
              <span>증빙자료 아카이빙 완료</span>
            </button>
          </div>
        </div>
      </div>
    </Panel>
  );
}

export function Step13({ ctx, state, setActiveStep }: StudentStepProps) {
  const [finalReviewGuideOpen, setFinalReviewGuideOpen] = useState(state.gate2Status === "pending");

  return (
    <>
      <Panel
        eyebrow="11단계"
        title="최종 제안서 제출"
        description="종합된 고도화 결과를 바탕으로 완성형 해결안을 최종 제출합니다."
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-sm">
              <div className="space-y-8">
                <FieldLabel>
                  <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-slate-400">
                    최종 핵심 제안 (Final Pitch)
                  </span>
                  <textarea
                    id="idea-final-pitch"
                    value={state.idea.finalPitch}
                    onChange={(e) => ctx.updateIdea("finalPitch", e.target.value)}
                    className="min-h-40 w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 font-medium text-slate-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5"
                    placeholder="누가, 왜, 어떤 점이 특별한지 한 문장으로 강력하게 표현해 보세요."
                  />
                </FieldLabel>
                <FieldLabel>
                  <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-slate-400">
                    기대 효과 및 가치
                  </span>
                  <textarea
                    id="idea-final-benefit"
                    value={state.idea.finalBenefit}
                    onChange={(e) => ctx.updateIdea("finalBenefit", e.target.value)}
                    className="min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 font-medium text-slate-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5"
                    placeholder="아이디어가 실현되었을 때 사회나 사용자에게 제공하는 구체적인 이점을 적어 주세요."
                  />
                </FieldLabel>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => {
                    if (ctx.handleFinalSubmit()) {
                      setFinalReviewGuideOpen(true);
                    }
                  }}
                  className="group flex items-center justify-center gap-3 rounded-2xl bg-primary px-8 py-5 font-black text-white shadow-xl shadow-primary/20 transition-all hover:bg-blue-600 active:scale-95"
                >
                  <span>최종 고도화 승인 요청</span>
                  <Send className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </button>
                {state.gate2Status !== "idle" && (
                  <div
                    className={`flex items-center gap-2 rounded-2xl border-2 px-6 py-4 font-bold ${gateTone(state.gate2Status)}`}
                  >
                    {statusLabel(state.gate2Status)}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h4 className="mb-6 text-xl font-black text-slate-900">최종 검수 체크리스트</h4>
              <div className="space-y-3">
                {[
                  { label: "아이디어 해결안 구조화 완료", done: state.idea.storyboard.length > 20 },
                  { label: "최종 피치 및 피드백 반영 완료", done: state.idea.finalPitch.length > 30 },
                  { label: "최종 기대 효과 정리 완료", done: state.idea.finalBenefit.length > 20 },
                  { label: "시각화 자료 업로드 완료", done: state.idea.evidenceImages.length > 0 },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between rounded-2xl border p-4 transition-all ${item.done ? "border-green-100 bg-green-50/50" : "border-slate-100 bg-slate-50/50 opacity-60"}`}
                  >
                    <span className="text-sm font-bold text-slate-700">{item.label}</span>
                    {item.done ? (
                      <BadgeCheck className="h-6 w-6 text-green-600" />
                    ) : (
                      <CircleDashed className="h-6 w-6 text-slate-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-slate-900 p-8 text-white">
              <p className="mb-4 text-xs font-black uppercase tracking-widest text-slate-500">
                운영자 피드백
              </p>
              <div className="relative rounded-2xl bg-white/5 p-6 backdrop-blur-sm">
                <Quote className="absolute -left-3 -top-3 h-8 w-8 text-white/10" />
                <p className="text-sm italic leading-relaxed text-slate-300">
                  {state.gate2Note ||
                    "최종 승인 요청을 보내면 운영자가 검토 후 피드백을 남겨 드립니다."}
                </p>
              </div>
              {(state.gate2Status === "approved" || state.gate2Status === "changes") && (
                <div className="mt-8 flex flex-col gap-3">
                  {state.gate2Status === "approved" && (
                    <button
                      type="button"
                      onClick={() => setActiveStep(12)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-4 font-black transition-all hover:bg-green-500"
                    >
                      <span>마지막 퀴즈 풀기</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                  {state.gate2Status === "changes" && (
                    <div className="rounded-xl bg-orange-500/10 p-4 text-center text-sm font-bold text-orange-400">
                      운영자 보완 요청이 확인되었습니다.
                    </div>
                  )}
                  <Link
                    href="/admin"
                    className="text-center text-xs font-bold text-slate-500 underline underline-offset-4"
                  >
                    운영자 콘솔에서 직접 확인하기
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Panel>

      <Modal open={finalReviewGuideOpen} onClose={() => setFinalReviewGuideOpen(false)}>
        <div className="space-y-4 pr-10">
          <p className="text-[12px] font-semibold tracking-[0.04em] text-primary">데모 안내</p>
          <h3 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">
            운영자 시스템을 이용해보세요
          </h3>
          <p className="text-sm leading-7 text-slate-600">
            최종 승인 요청이 접수되었습니다. 데모에서는 운영자 화면에서 최종 승인 또는 보완 요청을
            직접 처리해 주세요.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-indigo-500"
            >
              운영자 시스템으로 이동
            </Link>
            <button
              type="button"
              onClick={() => setFinalReviewGuideOpen(false)}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50"
            >
              이 창 닫기
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
