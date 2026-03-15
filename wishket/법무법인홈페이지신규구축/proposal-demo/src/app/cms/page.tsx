"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type CmsPost = {
  id: string;
  title: string;
  category: "성범죄" | "마약" | "기타";
  summary: string;
  updatedAt: string;
};

const STORAGE_KEY = "hankyul-cms-demo-posts-v1";

const defaultPosts: CmsPost[] = [
  {
    id: "sample-1",
    title: "초기 조사 단계 대응 체크리스트",
    category: "성범죄",
    summary: "첫 연락 직후 필요한 기록 정리 방법과 진술 전 준비 절차를 안내합니다.",
    updatedAt: "2026-03-15",
  },
  {
    id: "sample-2",
    title: "마약 사건 압수수색 대응 포인트",
    category: "마약",
    summary: "압수 절차 확인 항목과 변호인 선임 전후 대응 순서를 정리한 예시 콘텐츠입니다.",
    updatedAt: "2026-03-14",
  },
];

export default function CmsDemoPage() {
  const [posts, setPosts] = useState<CmsPost[]>(() => {
    if (typeof window === "undefined") {
      return defaultPosts;
    }

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultPosts;
    }

    try {
      return JSON.parse(raw) as CmsPost[];
    } catch {
      return defaultPosts;
    }
  });
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<CmsPost["category"]>("성범죄");
  const [summary, setSummary] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }, [posts]);

  function resetForm() {
    setTitle("");
    setCategory("성범죄");
    setSummary("");
    setEditingId(null);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const today = new Date().toISOString().slice(0, 10);

    if (editingId) {
      setPosts((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                title: title.trim(),
                category,
                summary: summary.trim(),
                updatedAt: today,
              }
            : item,
        ),
      );
      resetForm();
      return;
    }

    const newPost: CmsPost = {
      id: `post-${Date.now()}`,
      title: title.trim(),
      category,
      summary: summary.trim(),
      updatedAt: today,
    };

    setPosts((prev) => [newPost, ...prev]);
    resetForm();
  }

  function startEdit(post: CmsPost) {
    setEditingId(post.id);
    setTitle(post.title);
    setCategory(post.category);
    setSummary(post.summary);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function removePost(id: string) {
    setPosts((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      resetForm();
    }
  }

  function resetStorage() {
    window.localStorage.removeItem(STORAGE_KEY);
    setPosts(defaultPosts);
    resetForm();
  }

  return (
    <main className="law-container py-16">
      <h1 className="text-4xl font-bold">CMS 데모</h1>
      <p className="mt-3 text-sm text-stone-700">
        이 페이지는 로컬스토리지 기반 데모입니다. 추가/수정/삭제한 내용은 현재 브라우저에만
        저장됩니다.
      </p>

      <section className="mt-8 law-card p-6">
        <h2 className="text-2xl font-bold">{editingId ? "콘텐츠 수정" : "새 콘텐츠 등록"}</h2>

        <form onSubmit={onSubmit} className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="text-sm text-stone-700 md:col-span-2">
            제목
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full border border-[#d7cfc2] bg-white px-4 py-3"
              placeholder="예: 초동 대응 핵심 정리"
            />
          </label>

          <label className="text-sm text-stone-700">
            카테고리
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CmsPost["category"])}
              className="mt-2 w-full border border-[#d7cfc2] bg-white px-4 py-3"
            >
              <option>성범죄</option>
              <option>마약</option>
              <option>기타</option>
            </select>
          </label>

          <div className="text-sm text-stone-700">
            최근 저장일
            <div className="mt-2 border border-[#d7cfc2] bg-[#fffdf8] px-4 py-3 text-stone-600">
              자동 입력
            </div>
          </div>

          <label className="text-sm text-stone-700 md:col-span-2">
            요약
            <textarea
              required
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="mt-2 w-full border border-[#d7cfc2] bg-white px-4 py-3"
              placeholder="홈/성공사례 페이지에 노출할 요약 문구"
            />
          </label>

          <div className="md:col-span-2 flex flex-wrap gap-2">
            <button type="submit" className="law-btn-primary px-5 py-3 text-sm font-semibold">
              {editingId ? "수정 저장" : "등록하기"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="law-btn-secondary px-5 py-3 text-sm font-semibold"
            >
              입력 초기화
            </button>
            <button
              type="button"
              onClick={resetStorage}
              className="border border-[#b03232] bg-white px-5 py-3 text-sm font-semibold text-[#b03232]"
            >
              로컬 데이터 리셋
            </button>
          </div>
        </form>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold">저장된 콘텐츠</h2>
        <p className="mt-2 text-sm text-stone-600">총 {sortedPosts.length}건</p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {sortedPosts.map((post) => (
            <article key={post.id} className="law-card p-5">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="law-tag">{post.category}</span>
                <span className="text-stone-500">수정일 {post.updatedAt}</span>
              </div>
              <h3 className="mt-3 text-xl font-bold">{post.title}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-700">{post.summary}</p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(post)}
                  className="border border-[#223558] px-3 py-2 text-xs font-semibold text-[#223558]"
                >
                  수정
                </button>
                <button
                  type="button"
                  onClick={() => removePost(post.id)}
                  className="border border-[#b03232] px-3 py-2 text-xs font-semibold text-[#b03232]"
                >
                  삭제
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
