"use client";

import { useState } from "react";
import {
  MessageSquare,
  Search,
  ArrowLeft,
  ChevronRight,
  User,
  Heart,
  Share2,
  Clock,
  Sparkles,
  Lightbulb,
} from "lucide-react";
import { useDemoContext, getCurrentIdeaLevel, phaseLabel, IdeaLevel } from "../context/DemoContext";
import { StatusPill } from "../components/ui";

export default function BoardPage() {
  const { state, setState } = useDemoContext();
  const [filter, setFilter] = useState<"all" | "1" | "2" | "3">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null);
  const [feedbackContent, setFeedbackContent] = useState("");

  // Combine peer ideas with current user's idea if it exists
  const allIdeas = [...state.peerIdeas];
  if (state.idea.title) {
    allIdeas.unshift({
      id: "my-idea",
      inventorNumber: state.student.inventorNumber || "나의 아이디어",
      title: state.idea.title,
      summary: state.idea.summary,
      problem: state.idea.problem,
      solution: state.idea.storyboard || "구체화 진행 중",
      level: getCurrentIdeaLevel(state) as IdeaLevel,
      tags: [...state.idea.selectedScience, ...state.idea.selectedTech],
      feedback: [],
    });
  }

  const filteredIdeas = allIdeas.filter((idea) => {
    const matchesFilter = filter === "all" || idea.level === Number.parseInt(filter);
    const matchesSearch =
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.inventorNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const selectedIdea = allIdeas.find((i) => i.id === selectedIdeaId);

  const handleAddFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackContent.trim() || !selectedIdeaId) return;

    // Update local state by updating context's peerIdeas
    setState((prev) => ({
      ...prev,
      peerIdeas: prev.peerIdeas.map((idea) =>
        idea.id === selectedIdeaId
          ? {
              ...idea,
              feedback: [
                ...idea.feedback,
                {
                  id: `fb-board-${Date.now()}`,
                  author: prev.student.inventorNumber || "익명 발명가",
                  content: feedbackContent.trim(),
                  createdAt: "방금 전",
                },
              ],
            }
          : idea,
      ),
    }));

    setFeedbackContent("");
  };

  return (
    <main className="min-h-screen pt-24 pb-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {selectedIdeaId === null ? (
          <>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">
                  아이디어 게시판
                </h1>
                <p className="text-lg text-slate-500 font-medium">
                  다른 발명가들의 생각을 엿보고 서로의 아이디어를 응원해 주세요.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="아이디어, 발명가 검색"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-11 pr-5 py-3 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-medium w-full md:w-64"
                  />
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
              {(["all", "1", "2", "3"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                    filter === f
                      ? "bg-slate-900 text-white shadow-lg"
                      : "bg-white text-slate-500 border border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {f === "all"
                    ? "전체 보기"
                    : `Level ${f} ${phaseLabel(Number.parseInt(f) as IdeaLevel)}`}
                </button>
              ))}
            </div>

            {/* Idea Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredIdeas.map((idea) => (
                <button
                  key={idea.id}
                  onClick={() => setSelectedIdeaId(idea.id)}
                  className="group relative flex flex-col items-stretch text-left rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-6 w-full">
                    <StatusPill
                      tone={
                        idea.level === 3
                          ? "bg-amber-50 text-amber-600 border-amber-100"
                          : "bg-blue-50 text-blue-600 border-blue-100"
                      }
                    >
                      Level {idea.level}
                    </StatusPill>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{idea.feedback?.length || 0}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {idea.title}
                  </h3>

                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-6">
                    {idea.summary}
                  </p>

                  <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                        <User className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="text-xs font-bold text-slate-600 tracking-tight">
                        {idea.inventorNumber}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          /* Detail View */
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
              onClick={() => setSelectedIdeaId(null)}
              className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>목록으로 돌아가기</span>
            </button>

            <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-2xl">
              {/* Post Header */}
              <div className="p-10 border-b border-slate-100 bg-linear-to-b from-slate-50/50 to-white">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <StatusPill tone="bg-slate-900 text-white border-transparent">
                    Level {selectedIdea?.level}{" "}
                    {phaseLabel(selectedIdea?.level || (1 as IdeaLevel))}
                  </StatusPill>
                  <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                    <Clock className="w-4 h-4" />
                    <span>방금 전 업데이트</span>
                  </div>
                </div>

                <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight mb-8">
                  {selectedIdea?.title}
                </h1>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900 tracking-tight">
                      {selectedIdea?.inventorNumber}
                    </p>
                    <p className="text-sm text-slate-400 font-medium">인벤티브 학생 발명가</p>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-10 space-y-12">
                <section>
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary mb-4">
                    <Lightbulb className="w-4 h-4" />
                    아이디어 배경 및 문제
                  </label>
                  <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                    <p className="text-lg leading-relaxed text-slate-700 font-medium">
                      {selectedIdea?.problem}
                    </p>
                  </div>
                </section>

                <section>
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary mb-4">
                    <Sparkles className="w-4 h-4" />
                    해결 방법 및 구상
                  </label>
                  <div className="bg-white rounded-3xl p-8 border-2 border-primary/10">
                    <p className="text-lg leading-relaxed text-slate-800 font-bold">
                      {selectedIdea?.solution}
                    </p>
                  </div>
                </section>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4">
                  {selectedIdea?.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Interaction Bar */}
                <div className="flex items-center gap-6 pt-10 border-t border-slate-100">
                  <button className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span className="text-sm font-bold">24</span>
                  </button>
                  <button className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm font-bold">공유하기</span>
                  </button>
                </div>
              </div>

              {/* Feedback Section */}
              <div className="bg-slate-50 p-10">
                <div className="flex items-center gap-3 mb-8">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    피드백 남기기
                  </h2>
                  <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-slate-400 border border-slate-100">
                    {selectedIdea?.feedback?.length || 0}
                  </span>
                </div>

                {/* Feedback List */}
                <div className="space-y-4 mb-10">
                  {selectedIdea?.feedback?.map((fb: any) => (
                    <div
                      key={fb.id}
                      className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                            <User className="w-3 h-3 text-slate-400" />
                          </div>
                          <span className="text-sm font-bold text-slate-900">{fb.author}</span>
                        </div>
                        <span className="text-[11px] font-medium text-slate-400">
                          {fb.createdAt}
                        </span>
                      </div>
                      <p className="text-[15px] leading-relaxed text-slate-600 font-medium">
                        {fb.content}
                      </p>
                      <div className="mt-4 flex items-center gap-4">
                        <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">
                          <Heart className="w-3.5 h-3.5" />
                          <span>공감</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  {(selectedIdea?.feedback === undefined || selectedIdea.feedback.length === 0) && (
                    <div className="text-center py-10">
                      <p className="text-sm font-medium text-slate-400">
                        아직 등록된 피드백이 없습니다.
                      </p>
                      <p className="text-xs text-slate-300 mt-1">첫 번째 피드백을 남겨주세요!</p>
                    </div>
                  )}
                </div>

                {/* Comment Input */}
                <form onSubmit={handleAddFeedback} className="relative">
                  <textarea
                    placeholder="발명가님의 아이디어에 따뜻한 응원이나 날카로운 조언을 남겨주세요!"
                    value={feedbackContent}
                    onChange={(e) => setFeedbackContent(e.target.value)}
                    className="w-full min-h-32 rounded-3xl border border-slate-200 p-6 pr-24 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-[15px] font-medium placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    disabled={!feedbackContent.trim()}
                    className="absolute bottom-6 right-6 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    등록
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
