"use client";

import { useState } from "react";
import type { Product } from "@/lib/data";
import { products as seedProducts } from "@/lib/data";
import { getProducts, saveProducts } from "@/lib/storage";

const emptyProduct: Product = {
  id: "",
  name: "",
  slug: "",
  category: "",
  shortDescription: "",
  description: "",
  image: "",
  specs: [],
  featured: false,
};

export default function AdminProductsPage() {
  const [items, setItems] = useState<Product[]>(() => getProducts(seedProducts));
  const [form, setForm] = useState<Product>(emptyProduct);

  const reset = () => {
    saveProducts(seedProducts);
    setItems(seedProducts);
    setForm(emptyProduct);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const next = [...items];
    if (form.id) {
      const idx = next.findIndex((item) => item.id === form.id);
      if (idx >= 0) {
        next[idx] = form;
      }
    } else {
      next.unshift({
        ...form,
        id: crypto.randomUUID(),
        specs: form.specs.length ? form.specs : ["스펙 미기재"],
      });
    }

    setItems(next);
    saveProducts(next);
    setForm(emptyProduct);
  };

  const removeItem = (id: string) => {
    const next = items.filter((item) => item.id !== id);
    setItems(next);
    saveProducts(next);
  };

  return (
    <div className="space-y-6">
      <section className="panel px-6 py-7">
        <h1 className="font-heading text-3xl text-(--corp-primary-900)">제품 관리</h1>
        <p className="mt-2 text-sm text-(--corp-muted)">제품 등록/수정/삭제를 수행합니다.</p>
      </section>

      <form onSubmit={handleSubmit} className="panel grid gap-3 px-6 py-6 md:grid-cols-2">
        <input
          placeholder="제품명"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
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
          placeholder="카테고리"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
          className="rounded-xl border border-(--corp-line) px-4 py-2.5"
        />
        <input
          placeholder="대표 이미지 URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          required
          className="rounded-xl border border-(--corp-line) px-4 py-2.5"
        />
        <input
          placeholder="짧은 설명"
          value={form.shortDescription}
          onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
          required
          className="rounded-xl border border-(--corp-line) px-4 py-2.5 md:col-span-2"
        />
        <textarea
          placeholder="상세 설명"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          rows={4}
          className="rounded-xl border border-(--corp-line) px-4 py-2.5 md:col-span-2"
        />
        <input
          placeholder="스펙(쉼표 구분)"
          value={form.specs.join(", ")}
          onChange={(e) =>
            setForm({
              ...form,
              specs: e.target.value
                .split(",")
                .map((v) => v.trim())
                .filter(Boolean),
            })
          }
          className="rounded-xl border border-(--corp-line) px-4 py-2.5 md:col-span-2"
        />

        <label className="flex items-center gap-2 text-sm text-(--corp-muted) md:col-span-2">
          <input
            type="checkbox"
            checked={Boolean(form.featured)}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          메인 하이라이트 노출
        </label>

        <div className="flex gap-2 md:col-span-2">
          <button type="submit" className="btn-primary">
            {form.id ? "수정 저장" : "신규 등록"}
          </button>
          <button type="button" onClick={() => setForm(emptyProduct)} className="btn-ghost">
            입력 초기화
          </button>
          <button type="button" onClick={reset} className="btn-ghost">
            샘플 복원
          </button>
        </div>
      </form>

      <section className="space-y-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="panel flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="text-xs text-(--corp-accent-500)">{item.category}</p>
              <h2 className="text-lg font-semibold text-(--corp-primary-900)">{item.name}</h2>
              <p className="text-sm text-(--corp-muted)">{item.shortDescription}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setForm(item)} className="btn-ghost">
                수정
              </button>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
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
