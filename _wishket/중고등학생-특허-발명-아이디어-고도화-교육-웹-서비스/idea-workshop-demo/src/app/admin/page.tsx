"use client";

import { useState } from "react";
import { MOCK_ADMIN_STUDENTS, STEP_ITEMS } from "../demo-data";
import {
  useDemoContext,
  getHighestUnlockedStep,
  phaseLabel,
  statusLabel,
  buildCurrentIdea,
} from "../context/DemoContext";
import { LayoutDashboard, Users, CheckSquare, MessageSquare } from "lucide-react";

export default function AdminPage() {
  const { state, adminNotes, setAdminNotes, handleAdminDecision } = useDemoContext();
  const highestUnlockedStep = getHighestUnlockedStep(state);
  const currentStepMeta = STEP_ITEMS.find((s) => s.id === highestUnlockedStep) ?? STEP_ITEMS[0];
  const currentIdea = buildCurrentIdea(state);
  const boardIdeas = currentIdea ? [currentIdea, ...state.peerIdeas] : [...state.peerIdeas];

  const pendingQueue = [
    state.gate1Status === "pending"
      ? {
          gate: "gate1" as const,
          label: "1차 승인",
          submittedStep: "중간 제출",
          note: state.gate1Note || "운영자 검토 대기 중",
        }
      : null,
    state.gate2Status === "pending"
      ? {
          gate: "gate2" as const,
          label: "최종 승인",
          submittedStep: "최종 제출",
          note: state.gate2Note || "운영자 최종 검토 대기 중",
        }
      : null,
  ].filter(Boolean) as Array<{
    gate: "gate1" | "gate2";
    label: string;
    submittedStep: string;
    note: string;
  }>;

  const [activeTab, setActiveTab] = useState<"dashboard" | "queue" | "students" | "board">(
    "dashboard",
  );

  const tabs = [
    { id: "dashboard", label: "대시보드", icon: LayoutDashboard },
    { id: "queue", label: "승인 대기 큐", icon: CheckSquare, badge: pendingQueue.length },
    { id: "students", label: "학생 관리", icon: Users },
    { id: "board", label: "게시판 모니터링", icon: MessageSquare },
  ];

  return (
    <div className="mx-auto max-w-[1520px] px-4 py-8 md:px-8">
      <div className="mb-8">
        <p className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 mb-3">
          운영 관리
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          관리자 워크스페이스
        </h1>
        <p className="mt-3 max-w-2xl text-base text-slate-500">
          학생의 학습 현황을 확인하고 제출된 과제를 승인하거나 보완을 요청하세요.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-xl font-medium transition-all ${
              activeTab === tab.id
                ? "bg-white text-indigo-600 border-t border-x border-slate-200 shadow-[0_4px_0_0_white] relative z-10"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {tab.badge !== undefined && tab.badge > 0 && (
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-[11px] font-bold text-rose-600">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="fade-in-up">
        {activeTab === "dashboard" && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="glass-card p-6">
              <p className="text-sm font-semibold text-slate-500">총 학생 수</p>
              <p className="mt-2 text-4xl font-bold text-slate-900">
                {MOCK_ADMIN_STUDENTS.length + (state.profileSubmitted ? 1 : 0)}
                <span className="text-lg text-slate-400 font-medium ml-1">명</span>
              </p>
            </div>
            <div className="glass-card p-6">
              <p className="text-sm font-semibold text-slate-500">승인 대기</p>
              <p className="mt-2 text-4xl font-bold text-rose-600">
                {pendingQueue.length}
                <span className="text-lg text-rose-400 font-medium ml-1">건</span>
              </p>
            </div>
            <div className="glass-card p-6">
              <p className="text-sm font-semibold text-slate-500">게시판 아이디어</p>
              <p className="mt-2 text-4xl font-bold text-slate-900">
                {boardIdeas.length}
                <span className="text-lg text-slate-400 font-medium ml-1">개</span>
              </p>
            </div>
            <div className="glass-card p-6 bg-indigo-50/50 border-indigo-100">
              <p className="text-sm font-semibold text-indigo-600">현재 테스트 학생</p>
              <div className="mt-2">
                <p className="text-lg font-bold text-slate-900">{state.student.name || "미입력"}</p>
                <p className="text-sm text-slate-500">
                  {state.student.inventorNumber || "발명가 번호 미발급"}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "queue" && (
          <div className="max-w-4xl space-y-6">
            {pendingQueue.length > 0 ? (
              pendingQueue.map((item) => (
                <div key={item.gate} className="glass-card p-6 border-l-4 border-l-indigo-500">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full mb-2">
                        {item.label}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900">
                        {state.student.inventorNumber}{" "}
                        <span className="text-slate-400 mx-2">|</span> {item.submittedStep}
                      </h3>
                    </div>
                    <span className="px-4 py-2 bg-amber-100 text-amber-700 font-semibold rounded-lg text-sm">
                      {statusLabel(item.gate === "gate1" ? state.gate1Status : state.gate2Status)}
                    </span>
                  </div>

                  <div className="mt-6 bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="text-sm font-semibold text-slate-700 mb-1">
                      학생 제출 메시지/노트
                    </p>
                    <p className="text-slate-600 leading-relaxed text-sm">{item.note}</p>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="admin-feedback"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      운영자 피드백 (선택)
                    </label>
                    <textarea
                      id="admin-feedback"
                      value={item.gate === "gate1" ? adminNotes.gate1 : adminNotes.gate2}
                      onChange={(e) =>
                        setAdminNotes((prev) => ({ ...prev, [item.gate]: e.target.value }))
                      }
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
                      placeholder="승인 또는 보완 요청 시 학생에게 전달될 메모를 입력하세요."
                      rows={3}
                    />
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleAdminDecision(item.gate, "approve")}
                      className="btn-premium btn-primary px-8"
                    >
                      승인 완료
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAdminDecision(item.gate, "changes")}
                      className="btn-premium btn-secondary"
                    >
                      보완 요청
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="glass-card py-20 text-center">
                <CheckSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-700">대기 중인 승인 없음</h3>
                <p className="text-slate-500 mt-2">모든 학생의 승인 처리가 완료되었습니다.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "students" && (
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 hidden md:table-row">
                    <th className="p-4 font-semibold text-slate-600 text-sm">발명가 번호</th>
                    <th className="p-4 font-semibold text-slate-600 text-sm">상태</th>
                    <th className="p-4 font-semibold text-slate-600 text-sm">현재 단계</th>
                    <th className="p-4 font-semibold text-slate-600 text-sm">특이사항</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* Current Demo Student */}
                  {state.student.inventorNumber && (
                    <tr className="flex flex-col md:table-row bg-indigo-50/30">
                      <td className="p-4">
                        <div className="font-bold text-slate-900">
                          {state.student.inventorNumber}
                        </div>
                        <div className="text-xs text-indigo-600 font-medium md:hidden mt-1">
                          현재 테스트 학생
                        </div>
                      </td>
                      <td className="px-4 py-2 md:p-4">
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-md">
                          진행중
                        </span>
                      </td>
                      <td className="px-4 py-2 md:p-4 text-sm text-slate-600">
                        {currentStepMeta.title} ({highestUnlockedStep}단계)
                      </td>
                      <td className="p-4 text-sm text-slate-500">
                        현재 브라우저 컨텍스트의 학생 데이터
                      </td>
                    </tr>
                  )}
                  {MOCK_ADMIN_STUDENTS.map((s) => (
                    <tr
                      key={s.inventorNumber}
                      className="flex flex-col md:table-row hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="p-4 font-bold text-slate-700">{s.inventorNumber}</td>
                      <td className="px-4 py-2 md:p-4">
                        <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md">
                          {s.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 md:p-4 text-sm text-slate-600">{s.stage}</td>
                      <td className="p-4 text-sm text-slate-500">{s.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "board" && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {boardIdeas.map((idea) => (
              <div key={idea.id} className="glass-card p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-sm">
                    {idea.inventorNumber}
                  </div>
                  <div className="text-xs font-medium text-slate-400">{phaseLabel(idea.level)}</div>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">{idea.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4 grow">
                  {idea.problem}
                </p>
                <div className="border-t border-slate-100 pt-3 mt-auto flex justify-between items-center text-xs text-slate-400">
                  <span>작성시간 미상</span>
                  <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                    상세 보기
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
