"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MessageSquare,
  Send,
  Layers,
  Sparkles,
  Zap,
  HelpCircle,
  Quote,
  TrendingUp,
  Share2,
} from "lucide-react";
import { MOCK_PEER_IDEAS } from "../../demo-data";
import { StatusPill } from "../../components/ui";

export default function IdeaDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const idea = MOCK_PEER_IDEAS.find((i) => i.id === id);
  const [feedbackDraft, setFeedbackDraft] = useState("");

  if (!idea) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5">
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-4">아이디어를 찾을 수 없습니다</h2>
          <Link
            href="/board"
            className="text-primary font-bold flex items-center gap-2 justify-center"
          >
            <ArrowLeft className="w-4 h-4" /> 게시판으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const levelColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-blue-50 text-blue-600 border-blue-100";
      case 2:
        return "bg-indigo-50 text-indigo-600 border-indigo-100";
      case 3:
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      default:
        return "bg-slate-50 text-slate-600";
    }
  };

  const levelLabel = (level: number) => {
    switch (level) {
      case 1:
        return "아이디어 초안";
      case 2:
        return "고도화 과정";
      case 3:
        return "최종 완성안";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 overflow-hidden font-sans">
      {/* 배경 장식 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-80 bg-linear-to-b from-primary/10 to-transparent -z-10" />

      <div className="max-w-6xl mx-auto px-5 pt-12">
        {/* 상단 네비게이션 */}
        <div className="mb-10 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-3 text-[15px] font-black text-slate-500 hover:text-primary transition-all"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-slate-200 group-hover:border-primary/20 transition-all shadow-sm">
              <ArrowLeft className="w-5 h-5" />
            </div>
            게시판으로 돌아가기
          </button>

          <div className="flex items-center gap-4">
            <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-primary transition-colors hover:border-primary/20 shadow-sm">
              <Share2 className="w-5 h-5" />
            </button>
            <StatusPill tone={`${levelColor(idea.level)} border-0 px-6 py-2.5 text-sm font-black`}>
              {levelLabel(idea.level)}
            </StatusPill>
          </div>
        </div>

        {/* 메인 콘텐츠 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* 왼쪽: 아이디어 본문 및 피드백 기록 */}
          <div className="lg:col-span-8 space-y-10">
            <div className="rounded-[40px] bg-white border border-slate-200 p-12 shadow-2xl shadow-slate-200/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-60 h-60 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-[12px] font-black text-white tracking-widest mb-8 shadow-lg shadow-black/10">
                  발명가 {idea.inventorNumber.split(" ")[1]}
                </div>

                <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight mb-12">
                  {idea.title}
                </h1>

                <div className="grid gap-12">
                  <section>
                    <div className="flex items-center gap-3 mb-5 px-1">
                      <div className="p-2 bg-amber-50 rounded-lg">
                        <Zap className="w-5 h-5 text-amber-500" />
                      </div>
                      <h4 className="text-[13px] font-black text-slate-400 uppercase tracking-widest">
                        해결하려는 문제
                      </h4>
                    </div>
                    <div className="text-lg text-slate-700 font-bold leading-relaxed bg-slate-50/50 p-8 rounded-4xl border border-slate-100">
                      {idea.problem}
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center gap-3 mb-5 px-1">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="text-[13px] font-black text-slate-400 uppercase tracking-widest">
                        학생의 아이디어 해결안
                      </h4>
                    </div>
                    <p className="text-xl text-slate-800 font-black leading-relaxed px-2">
                      {idea.solution}
                    </p>
                  </section>

                  <section className="pt-8 border-t border-slate-100">
                    <div className="flex items-center gap-3 mb-5 px-1">
                      <div className="p-2 bg-indigo-50 rounded-lg">
                        <Layers className="w-5 h-5 text-indigo-500" />
                      </div>
                      <h4 className="text-[13px] font-black text-slate-400 uppercase tracking-widest">
                        적용된 과학/발명 원리
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-3 px-1">
                      {idea.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-6 py-3 rounded-2xl bg-indigo-50 text-indigo-600 text-[15px] font-black border border-indigo-100 shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>

            {/* 피드백 기록 섹션 (밝게 수정) */}
            <div className="rounded-[40px] bg-white border border-slate-200 p-12 shadow-xl shadow-slate-200/20 relative overflow-hidden">
              <div className="relative">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary rounded-2xl shadow-lg shadow-primary/20">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">우리들의 의견과 질문</h3>
                  </div>
                  <div className="px-4 py-2 bg-slate-100 rounded-full text-xs font-black text-slate-500">
                    전체 {idea.feedback.length}개
                  </div>
                </div>

                <div className="space-y-6">
                  {idea.feedback.map((f) => (
                    <div
                      key={f.id}
                      className="group relative rounded-4xl bg-slate-50/50 p-8 border border-slate-100 hover:bg-white hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all"
                    >
                      <Quote className="absolute top-8 right-10 w-16 h-16 text-slate-100 group-hover:text-primary/5 transition-colors" />
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-white border border-primary/10 flex items-center justify-center text-primary font-black text-sm shadow-sm">
                            {f.author.split(" ")[1]?.substring(0, 2) || "학생"}
                          </div>
                          <div>
                            <p className="text-[15px] font-black text-slate-900">{f.author}</p>
                            <p className="text-[11px] font-bold text-slate-400 tracking-wider">
                              {f.createdAt}
                            </p>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-100 font-bold text-xs transition-all shadow-sm">
                          <Sparkles className="w-3.5 h-3.5" />
                          공감하기
                        </button>
                      </div>
                      <p className="text-lg leading-relaxed text-slate-600 font-bold relative z-10">
                        {f.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* 하단 피드백 작성폼 */}
                <div className="mt-12 pt-12 border-t border-slate-100">
                  <div className="flex items-center gap-3 mb-6">
                    <HelpCircle className="w-6 h-6 text-primary" />
                    <h4 className="text-xl font-black text-slate-900">익명 피드백 남기기</h4>
                  </div>
                  <div className="relative">
                    <textarea
                      value={feedbackDraft}
                      onChange={(e) => setFeedbackDraft(e.target.value)}
                      placeholder="이 아이디어의 어떤 점이 특히 좋았나요? 혹은 보완하면 좋을 점이 있을까요?"
                      className="w-full min-h-[160px] p-8 rounded-4xl bg-slate-50 border-2 border-transparent outline-none focus:bg-white focus:border-primary focus:shadow-2xl focus:shadow-primary/5 transition-all text-lg font-bold leading-relaxed resize-none"
                    />
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                      <p className="text-sm font-bold text-slate-400 leading-relaxed max-w-md">
                        모든 의견은 익명으로 전달됩니다. 발명가의 성장을 돕는 따뜻한 피드백을
                        부탁드려요!
                      </p>
                      <button
                        disabled={!feedbackDraft.trim()}
                        className="px-10 py-5 rounded-2xl bg-primary text-white font-black shadow-xl shadow-primary/20 hover:bg-blue-600 hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-30 disabled:hover:translate-y-0 flex items-center gap-3 shrink-0"
                      >
                        <span className="text-lg">피드백 전송</span>
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 사회적 영향력 점수 (사이드바) */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              {/* 점수 카드 */}
              <div className="rounded-[40px] bg-linear-to-br from-indigo-600 to-violet-700 p-10 text-white relative overflow-hidden group shadow-2xl shadow-indigo-600/30">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-white/20 transition-colors" />
                <div className="relative">
                  <h5 className="text-[12px] font-black uppercase tracking-widest text-white/50 mb-8 border-b border-white/10 pb-4">
                    사회적 영향력 점수
                  </h5>
                  <div className="flex items-end gap-4 mb-8">
                    <span className="text-7xl font-black tracking-tighter">8.4</span>
                    <TrendingUp className="w-10 h-10 mb-3 text-white/40" />
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-8">
                    <div className="h-full w-[84%] bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)]" />
                  </div>
                  <p className="text-[15px] font-bold text-white/90 leading-relaxed bg-white/5 p-5 rounded-2xl border border-white/5">
                    "이 아이디어는 학교 환경 개선에 매우 긍정적인 영향을 줄 것으로 기대됩니다!"
                  </p>
                </div>
              </div>

              {/* 통계 정보 */}
              <div className="p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-xl shadow-slate-200/20">
                <h6 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6">
                  활동 통계
                </h6>
                <div className="space-y-4">
                  {[
                    { label: "조회수", value: "128회" },
                    { label: "받은 피드백", value: `${idea.feedback.length}개` },
                    { label: "공감 지수", value: "92%" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-center justify-between p-4 rounded-2xl bg-slate-50"
                    >
                      <span className="text-sm font-bold text-slate-500">{stat.label}</span>
                      <span className="text-sm font-black text-slate-900">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="py-2 text-center">
                <p className="text-[11px] font-bold text-slate-300 leading-relaxed">
                  본 서비스는 교육용 데모이며 <br /> 실제 특허 출원과는 무관합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
