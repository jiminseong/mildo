"use client";

import { useState } from "react";
import type { Inquiry } from "@/lib/data";
import { getInquiries, saveInquiries } from "@/lib/storage";

const statusLabel: Record<Inquiry["status"], string> = {
  new: "신규",
  in_progress: "처리중",
  done: "완료",
};

export default function AdminInquiriesPage() {
  const [items, setItems] = useState<Inquiry[]>(() => getInquiries());

  const updateStatus = (id: string, status: Inquiry["status"]) => {
    const next = items.map((item) => (item.id === id ? { ...item, status } : item));
    setItems(next);
    saveInquiries(next);
  };

  return (
    <div className="space-y-6">
      <section className="panel px-6 py-7">
        <h1 className="font-heading text-3xl text-(--corp-primary-900)">문의 관리</h1>
        <p className="mt-2 text-sm text-(--corp-muted)">고객 문의를 확인하고 상태를 변경합니다.</p>
      </section>

      {items.length === 0 ? (
        <section className="panel p-6 text-sm text-(--corp-muted)">
          접수된 문의가 아직 없습니다.
        </section>
      ) : (
        <section className="space-y-3">
          {items.map((item) => (
            <article key={item.id} className="panel p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold text-(--corp-primary-900)">{item.name}</h2>
                  <p className="text-sm text-(--corp-muted)">
                    {item.phone} | {item.email}
                  </p>
                  <p className="text-sm text-(--corp-text)">{item.message}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-(--corp-bg) px-3 py-1 text-xs text-(--corp-primary-900)">
                    {statusLabel[item.status]}
                  </span>
                  <select
                    value={item.status}
                    onChange={(e) => updateStatus(item.id, e.target.value as Inquiry["status"])}
                    className="rounded-lg border border-(--corp-line) px-3 py-1.5 text-sm"
                  >
                    <option value="new">신규</option>
                    <option value="in_progress">처리중</option>
                    <option value="done">완료</option>
                  </select>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
