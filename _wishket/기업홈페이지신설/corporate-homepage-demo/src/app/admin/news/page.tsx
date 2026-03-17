"use client";

import { useState } from "react";
import type { News } from "@/lib/data";
import { newsList as seedNews } from "@/lib/data";
import { getNews, saveNews } from "@/lib/storage";

const emptyNews = {
  id: "",
  title: "",
  slug: "",
  summary: "",
  content: "",
  publishedAt: new Date().toISOString().slice(0, 10),
  featured: false,
} satisfies News;

export default function AdminNewsPage() {
  const [items, setItems] = useState<News[]>(() => getNews(seedNews));
  const [form, setForm] = useState<News>(emptyNews);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const next = [...items];

    if (form.id) {
      const idx = next.findIndex((item) => item.id === form.id);
      if (idx >= 0) next[idx] = form;
    } else {
      next.unshift({ ...form, id: crypto.randomUUID() });
    }

    setItems(next);
    saveNews(next);
    setForm(emptyNews);
  };

  return (
    <div className="space-y-6">
      <section className="panel px-6 py-7">
        <h1 className="font-heading text-3xl text-(--corp-primary-900)">뉴스 관리</h1>
      </section>

      <form onSubmit={handleSubmit} className="panel grid gap-3 px-6 py-6">
        <input
          placeholder="제목"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="rounded-xl border border-(--corp-line) px-4 py-2.5"
        />
        <input
          placeholder="slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          required
          className="rounded-xl border border-(--corp-line) px-4 py-2.5"
        />
        <input
          placeholder="발행일"
          type="date"
          value={form.publishedAt}
          onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
          required
          className="rounded-xl border border-(--corp-line) px-4 py-2.5"
        />
        <input
          placeholder="요약"
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
          required
          className="rounded-xl border border-(--corp-line) px-4 py-2.5"
        />
        <textarea
          placeholder="본문"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
          rows={5}
          className="rounded-xl border border-(--corp-line) px-4 py-2.5"
        />
        <label className="flex items-center gap-2 text-sm text-(--corp-muted)">
          <input
            type="checkbox"
            checked={Boolean(form.featured)}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          메인 노출
        </label>
        <div className="flex gap-2">
          <button type="submit" className="btn-primary">
            {form.id ? "수정 저장" : "신규 등록"}
          </button>
          <button type="button" onClick={() => setForm(emptyNews)} className="btn-ghost">
            초기화
          </button>
        </div>
      </form>

      <section className="space-y-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="panel flex flex-col gap-2 p-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="text-xs text-(--corp-muted)">{item.publishedAt}</p>
              <h2 className="text-lg font-semibold text-(--corp-primary-900)">{item.title}</h2>
              <p className="text-sm text-(--corp-muted)">{item.summary}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setForm(item)} className="btn-ghost">
                수정
              </button>
              <button
                type="button"
                onClick={() => {
                  const next = items.filter((news) => news.id !== item.id);
                  setItems(next);
                  saveNews(next);
                }}
                className="btn-ghost border-red-500 text-red-600 hover:bg-red-600"
              >
                삭제
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
