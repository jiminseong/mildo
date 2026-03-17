"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { saveInquiries, getInquiries } from "@/lib/storage";

export default function ContactPage() {
  const reduceMotion = useReducedMotion();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submitForm: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!agreed) return;

    const existing = getInquiries();
    existing.unshift({
      id: crypto.randomUUID(),
      name,
      phone,
      email,
      message,
      status: "new",
      createdAt: new Date().toISOString(),
    });
    saveInquiries(existing);

    setName("");
    setPhone("");
    setEmail("");
    setMessage("");
    setAgreed(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2200);
  };

  return (
    <div className="space-y-8">
      <section className="panel px-6 py-9 md:px-8">
        <p className="text-sm uppercase tracking-[0.18em] text-(--corp-accent-500)">Contact</p>
        <h1 className="font-heading mt-3 text-4xl text-(--corp-primary-900) md:text-5xl">
          고객 문의
        </h1>
        <p className="mt-3 text-(--corp-muted)">
          문의 내용은 관리자 페이지에서 즉시 확인할 수 있습니다.
        </p>
      </section>

      <form className="panel space-y-5 px-6 py-8 md:px-8" onSubmit={submitForm}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1 text-sm">
            <span>이름 *</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl border border-(--corp-line) bg-white px-4 py-3"
            />
          </label>
          <label className="space-y-1 text-sm">
            <span>연락처 *</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full rounded-xl border border-(--corp-line) bg-white px-4 py-3"
            />
          </label>
        </div>

        <label className="space-y-1 text-sm">
          <span>이메일 *</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-(--corp-line) bg-white px-4 py-3"
          />
        </label>

        <label className="space-y-1 text-sm">
          <span>문의 내용 *</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className="w-full rounded-xl border border-(--corp-line) bg-white px-4 py-3"
          />
        </label>

        <label className="flex items-center gap-2 text-sm text-(--corp-muted)">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            required
          />
          개인정보 수집 및 이용에 동의합니다.
        </label>

        <button type="submit" className="btn-primary">
          문의 접수
        </button>

        {submitted && (
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
          >
            문의가 접수되었습니다. 빠르게 검토 후 연락드리겠습니다.
          </motion.p>
        )}
      </form>
    </div>
  );
}
