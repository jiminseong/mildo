"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { questions } from "@/lib/assessment-data";
import {
  appendLog,
  getSession,
  markCompleted,
  resetSession,
  upsertAnswer,
} from "@/lib/session-storage";

export default function AssessmentPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string>("");
  const [answers, setAnswers] = useState<Record<string, number>>(() => {
    if (typeof window === "undefined") return {};
    return getSession().answers;
  });

  const currentQuestion = questions[currentIndex];
  const doneCount = useMemo(() => Object.keys(answers).length, [answers]);

  useEffect(() => {
    const session = getSession();
    appendLog("/assessment", "visit", session);
  }, []);

  function onSelect(value: number) {
    const next = upsertAnswer(currentQuestion.id, value);
    setAnswers(next.answers);
    setError("");
  }

  function goNext() {
    if (!selected) {
      setError("현재 문항의 응답을 선택한 뒤 다음으로 이동할 수 있습니다.");
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setError("");
    }
  }

  function goPrev() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  function complete() {
    if (doneCount !== questions.length) {
      setError("모든 문항에 응답해야 결과를 생성할 수 있습니다.");
      return;
    }

    const session = markCompleted();
    appendLog("/assessment", "submit", session);
    window.location.href = `/report/${session.id}`;
  }

  function handleReset() {
    const reset = resetSession();
    appendLog("/assessment", "reset", reset);
    setAnswers(reset.answers);
    setCurrentIndex(0);
    setError("");
  }

  const selected = answers[currentQuestion.id];

  return (
    <main className="container py-10">
      <section className="card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold">심리검사 진행</h1>
          <p className="text-sm text-[#4b5563]">
            진행률 {doneCount}/{questions.length}
          </p>
        </div>

        <div className="mt-6 card p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <p className="text-sm text-[#4b5563]">문항 {currentQuestion.order}</p>
              <p className="mt-3 text-lg leading-8">{currentQuestion.text}</p>

              <div className="mt-5 grid gap-2 md:grid-cols-5">
                {[1, 2, 3, 4, 5].map((value) => (
                  <motion.button
                    key={value}
                    type="button"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect(value)}
                    className={`border px-3 py-2 text-sm ${
                      selected === value ? "border-[#1d4ed8] bg-[#dbeafe]" : "border-[#d1d5db]"
                    }`}
                  >
                    {value}점
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {error ? <p className="mt-4 text-sm font-medium text-[#b91c1c]">{error}</p> : null}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button type="button" onClick={goPrev} className="btn-secondary px-4 py-2 text-sm">
            이전 문항
          </button>
          {currentIndex < questions.length - 1 ? (
            <button type="button" onClick={goNext} className="btn-primary px-4 py-2 text-sm">
              다음 문항
            </button>
          ) : (
            <button type="button" onClick={complete} className="btn-primary px-4 py-2 text-sm">
              검사 완료
            </button>
          )}
          <Link href="/" className="btn-secondary px-4 py-2 text-sm">
            홈으로
          </Link>
          <button type="button" onClick={handleReset} className="btn-secondary px-4 py-2 text-sm">
            세션 초기화
          </button>
        </div>
      </section>
    </main>
  );
}
