"use client";

import { BookOpen, Users, Lightbulb, MessageSquare, Shield, HelpCircle } from "lucide-react";

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-[1520px] px-4 py-6 md:px-7">
      <div className="mb-8">
        <p className="text-[12px] font-semibold tracking-[0.04em] text-primary">이용 안내</p>
        <h1 className="mt-2 font-display text-3xl tracking-[-0.03em] text-foreground md:text-4xl">
          아이디어 워크숍 사용법
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          서비스의 전체 흐름과 주요 기능을 안내합니다. 학생과 운영자 각각의 사용법을 확인하세요.
        </p>
      </div>

      {/* 학생 사용법 */}
      <div className="mb-8">
        <h2 className="font-display text-2xl tracking-[-0.03em] text-foreground">학생 사용법</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="sheet-panel p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surface">
              <BookOpen className="h-5 w-5 text-foreground" />
            </div>
            <p className="mt-4 text-sm font-semibold text-foreground">
              1. 로그인과 발명가 번호 발급
            </p>
            <p className="mt-2 text-sm leading-7 text-muted">
              이름과 접속코드를 입력하여 로그인합니다. 개인정보를 입력하면 고유한 발명가 번호가
              발급되며, 이후 모든 활동에서 익명 식별자로 사용됩니다.
            </p>
          </div>
          <div className="sheet-panel p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surface">
              <Lightbulb className="h-5 w-5 text-foreground" />
            </div>
            <p className="mt-4 text-sm font-semibold text-foreground">
              2. 아이디어 작성과 카드 탐색
            </p>
            <p className="mt-2 text-sm leading-7 text-muted">
              진단을 통해 자신의 시작점을 확인하고, 아이디어 초안을 작성합니다. 과학 원리, 기술
              요소, 발명 원리, 해결 질문 카드를 탐색해 아이디어를 구체화합니다.
            </p>
          </div>
          <div className="sheet-panel p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surface">
              <MessageSquare className="h-5 w-5 text-foreground" />
            </div>
            <p className="mt-4 text-sm font-semibold text-foreground">
              3. 익명 피드백과 아이디어 개선
            </p>
            <p className="mt-2 text-sm leading-7 text-muted">
              익명 게시판에서 다른 학생의 아이디어를 보고 질문과 피드백을 남깁니다. 받은 피드백에
              답변하고 수정 메모를 작성하여 아이디어를 발전시킵니다.
            </p>
          </div>
          <div className="sheet-panel p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surface">
              <Shield className="h-5 w-5 text-foreground" />
            </div>
            <p className="mt-4 text-sm font-semibold text-foreground">4. 제출과 승인, 최종 완료</p>
            <p className="mt-2 text-sm leading-7 text-muted">
              중간 제출과 최종 제출 단계에서 운영자의 승인을 받습니다. 승인이 완료되면 다음 단계가
              열리며, 마무리 퀴즈까지 완료하면 학습이 종료됩니다.
            </p>
          </div>
        </div>
      </div>

      {/* 운영자 사용법 */}
      <div className="mb-8">
        <h2 className="font-display text-2xl tracking-[-0.03em] text-foreground">운영자 사용법</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="sheet-panel p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surface">
              <Users className="h-5 w-5 text-foreground" />
            </div>
            <p className="mt-4 text-sm font-semibold text-foreground">승인 대기 큐 관리</p>
            <p className="mt-2 text-sm leading-7 text-muted">
              학생이 중간 제출 또는 최종 제출을 하면 승인 대기 큐에 표시됩니다. 내용을 검토하고 승인
              또는 보완 요청을 처리합니다.
            </p>
          </div>
          <div className="sheet-panel p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surface">
              <BookOpen className="h-5 w-5 text-foreground" />
            </div>
            <p className="mt-4 text-sm font-semibold text-foreground">학생 현황 모니터링</p>
            <p className="mt-2 text-sm leading-7 text-muted">
              학생의 실명, 발명가 번호, 현재 단계, 학교 정보를 확인합니다. 게시판에 등록된 아이디어
              목록도 운영자 관점에서 확인할 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-8">
        <h2 className="font-display text-2xl tracking-[-0.03em] text-foreground">자주 묻는 질문</h2>
        <div className="mt-6 space-y-4">
          {[
            {
              q: "접속코드는 어떻게 받나요?",
              a: "운영자가 수업 전에 발급한 접속코드를 학생에게 안내합니다. 접속코드와 이름을 입력하면 학습을 시작할 수 있습니다.",
            },
            {
              q: "발명가 번호는 무엇인가요?",
              a: "개인정보 입력 후 자동 발급되는 고유 번호입니다. 익명 게시판과 피드백에서 실명 대신 이 번호가 사용되어 자유로운 의견 교환이 가능합니다.",
            },
            {
              q: "다음 단계로 넘어갈 수 없어요.",
              a: "현재 단계의 모든 필수 항목을 입력했는지 확인해 주세요. 중간 제출과 최종 제출 단계에서는 운영자 승인이 필요합니다.",
            },
            {
              q: "운영자가 보완 요청을 하면 어떻게 되나요?",
              a: "이전 제출 단계로 돌아가 내용을 수정한 후 다시 제출할 수 있습니다. 수정이 완료되면 다시 운영자 승인을 요청합니다.",
            },
            {
              q: "내 아이디어를 다른 학생이 볼 수 있나요?",
              a: "네, 익명 게시판에서 발명가 번호로 공유됩니다. 실명은 노출되지 않으며, 운영자만 실명-발명가 번호 매핑을 확인할 수 있습니다.",
            },
          ].map((item) => (
            <div key={item.q} className="sheet-panel p-6">
              <div className="flex items-start gap-3">
                <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.q}</p>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 전체 학습 흐름 */}
      <div className="mb-10 sheet-panel p-8">
        <h2 className="font-display font-bold text-2xl tracking-[-0.03em] text-foreground">
          전체 학습 흐름
        </h2>
        <div className="mt-6 grid gap-3 md:grid-cols-3 xl:grid-cols-5">
          {[
            "1. 로그인",
            "2. 개인정보 입력",
            "3. 학습 안내",
            "4. 진단",
            "5. 초안 작성",
            "6. 카드 탐색",
            "7. 익명 게시판",
            "8. 피드백 반영",
            "9. 중간 제출",
            "10. 1차 승인",
            "11. 솔루션 구조화",
            "12. 자료 첨부",
            "13. 최종 제출",
            "14. 마무리 퀴즈",
            "15. 학습 완료",
          ].map((step) => (
            <div
              key={step}
              className="rounded-[14px] border border-slate-200 bg-surface px-4 py-3 text-[14px] font-medium text-foreground shadow-sm transition-all hover:border-primary/40 hover:bg-blue-50/50"
            >
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
