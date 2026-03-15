"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { calculateReportResult } from "@/lib/assessment-data";
import { appendLog, getSession } from "@/lib/session-storage";

type Props = {
  reportId: string;
};

export default function ReportClient({ reportId }: Props) {
  const [answers] = useState<Record<string, number>>(() => {
    if (typeof window === "undefined") return {};
    return getSession().answers;
  });

  useEffect(() => {
    const session = getSession();
    appendLog("/report", "report", session);
  }, []);

  const report = useMemo(() => calculateReportResult(answers), [answers]);
  const completion = useMemo(() => {
    const answeredCount = Object.keys(answers).length;
    return `${answeredCount}문항 응답`;
  }, [answers]);

  return (
    <main className="container py-10 report-print-main">
      <motion.section
        className="card p-6 report-print-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold">결과 리포트</h1>
        <p className="mt-2 text-sm text-[#4b5563]">리포트 ID: {reportId}</p>
        <p className="mt-1 text-sm text-[#4b5563]">응답 상태: {completion}</p>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <motion.article
            className="card p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05, duration: 0.25 }}
          >
            <p className="text-xs text-[#4b5563]">종합 위험지수</p>
            <p className="mt-2 text-2xl font-bold">{report.riskIndex}</p>
          </motion.article>
          <motion.article
            className="card p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.25 }}
          >
            <p className="text-xs text-[#4b5563]">위험 구간</p>
            <p className="mt-2 text-2xl font-bold">{report.riskBand}</p>
          </motion.article>
          <motion.article
            className="card p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.25 }}
          >
            <p className="text-xs text-[#4b5563]">요약 판단</p>
            <p className="mt-2 text-base font-semibold leading-7">{report.summary}</p>
          </motion.article>
        </div>

        <div className="mt-6 overflow-x-auto border border-[#d1d5db]">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#f8fafc] text-[#4b5563]">
              <tr>
                <th className="px-3 py-2">척도</th>
                <th className="px-3 py-2">원점수 평균</th>
                <th className="px-3 py-2">100점 환산</th>
                <th className="px-3 py-2">기대 기준</th>
                <th className="px-3 py-2">차이</th>
                <th className="px-3 py-2">해석</th>
              </tr>
            </thead>
            <tbody>
              {report.scaleScores.map((item) => (
                <motion.tr
                  key={item.key}
                  className="border-t border-[#e5e7eb]"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <td className="px-3 py-2 font-medium">{item.name}</td>
                  <td className="px-3 py-2">{item.rawAverage}</td>
                  <td className="px-3 py-2">{item.percent}</td>
                  <td className="px-3 py-2">{item.expectedPercent}</td>
                  <td className="px-3 py-2">
                    {item.deltaFromExpected > 0
                      ? `+${item.deltaFromExpected}`
                      : item.deltaFromExpected}
                  </td>
                  <td className="px-3 py-2">{item.interpretation}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 card p-5">
          <h2 className="text-lg font-semibold">요약 해석</h2>
          <p className="mt-2 text-sm leading-7 text-[#4b5563]">
            본 리포트는 로컬 데모용 임의 계산 로직 기반 결과입니다. 실제 구축 단계에서는 제공받은
            엑셀 계산식과 일치하도록 같은 구조의 계산 모듈만 교체하면 됩니다.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 print-hide">
          <button
            type="button"
            onClick={() => window.print()}
            className="btn-primary px-4 py-2 text-sm"
          >
            PDF 저장
          </button>
          <Link href="/assessment" className="btn-secondary px-4 py-2 text-sm">
            검사 화면으로
          </Link>
        </div>
      </motion.section>
    </main>
  );
}
