"use client";

import { FormEvent, useState } from "react";

export default function ConsultationPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);
  }

  return (
    <main className="law-container py-16">
      <h1 className="text-4xl font-bold">온라인 상담 신청</h1>
      <p className="mt-4 text-sm text-stone-700">
        사건 분야와 긴급도를 남겨주시면 우선순위에 따라 빠르게 연락드립니다.
      </p>

      <form onSubmit={onSubmit} className="mt-8 law-card grid gap-4 p-6 md:grid-cols-2">
        <label className="text-sm text-stone-700">
          성함
          <input
            required
            className="mt-2 w-full rounded-lg border border-[#d7cfc2] bg-white px-4 py-3"
          />
        </label>

        <label className="text-sm text-stone-700">
          연락처
          <input
            required
            className="mt-2 w-full rounded-lg border border-[#d7cfc2] bg-white px-4 py-3"
          />
        </label>

        <label className="text-sm text-stone-700">
          사건 분야
          <select
            required
            className="mt-2 w-full rounded-lg border border-[#d7cfc2] bg-white px-4 py-3"
          >
            <option value="">선택하세요</option>
            <option>성범죄</option>
            <option>마약</option>
            <option>기타 형사</option>
          </select>
        </label>

        <label className="text-sm text-stone-700">
          긴급도
          <select
            required
            className="mt-2 w-full rounded-lg border border-[#d7cfc2] bg-white px-4 py-3"
          >
            <option value="">선택하세요</option>
            <option>긴급 (24시간 이내 조사 예정)</option>
            <option>보통 (3일 이내 상담 희망)</option>
            <option>정보 확인 목적</option>
          </select>
        </label>

        <label className="text-sm text-stone-700 md:col-span-2">
          사건 개요
          <textarea
            required
            rows={5}
            className="mt-2 w-full rounded-lg border border-[#d7cfc2] bg-white px-4 py-3"
            placeholder="언제, 어디서, 어떤 내용으로 연락을 받았는지 중심으로 작성해 주세요."
          />
        </label>

        <label className="flex items-center gap-2 text-sm text-stone-700 md:col-span-2">
          <input type="checkbox" required />
          개인정보 수집 및 이용에 동의합니다.
        </label>

        <button
          type="submit"
          className="law-btn-primary rounded-full px-6 py-3 text-sm font-semibold md:col-span-2 md:w-fit"
        >
          상담 신청하기
        </button>
      </form>

      {isSubmitted ? (
        <p className="mt-5 rounded-xl border border-[#c8a56a] bg-[#fff8e8] px-4 py-3 text-sm text-[#5e461b]">
          접수되었습니다. 긴급도 기준으로 우선 확인 후 순차 연락드리겠습니다.
        </p>
      ) : null}
    </main>
  );
}
