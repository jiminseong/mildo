"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { getLogs, type AccessLog } from "@/lib/session-storage";

export default function AdminLogsPage() {
  const [logs] = useState<AccessLog[]>(() => {
    if (typeof window === "undefined") return [];
    return getLogs();
  });
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "in-progress">("all");
  const [eventFilter, setEventFilter] = useState<"all" | AccessLog["eventType"]>("all");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");

  const filteredLogs = useMemo(() => {
    return [...logs]
      .filter((log) => {
        if (statusFilter === "completed") return log.completed;
        if (statusFilter === "in-progress") return !log.completed;
        return true;
      })
      .filter((log) => {
        if (eventFilter === "all") return true;
        return log.eventType === eventFilter;
      })
      .sort((a, b) => {
        const first = new Date(a.createdAt).getTime();
        const second = new Date(b.createdAt).getTime();
        return sortOrder === "latest" ? second - first : first - second;
      });
  }, [eventFilter, logs, sortOrder, statusFilter]);

  const summary = useMemo(() => {
    return {
      total: logs.length,
      completed: logs.filter((item) => item.completed).length,
      visits: logs.filter((item) => item.eventType === "visit").length,
    };
  }, [logs]);

  return (
    <main className="container py-10">
      <motion.section
        className="card p-6"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold">관리자 접속 로그</h1>
        <p className="mt-2 text-sm text-[#4b5563]">연구용 모니터링 최소 화면</p>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <motion.article whileHover={{ y: -1 }} className="card p-4 text-sm">
            총 로그: {summary.total}
          </motion.article>
          <motion.article whileHover={{ y: -1 }} className="card p-4 text-sm">
            완료 세션 로그: {summary.completed}
          </motion.article>
          <motion.article whileHover={{ y: -1 }} className="card p-4 text-sm">
            진입 로그: {summary.visits}
          </motion.article>
        </div>

        <div className="mt-6 grid gap-2 md:grid-cols-3">
          <label className="text-sm">
            상태 필터
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as "all" | "completed" | "in-progress")
              }
              className="mt-1 block w-full border border-[#d1d5db] bg-white px-3 py-2"
            >
              <option value="all">전체</option>
              <option value="completed">완료</option>
              <option value="in-progress">진행중</option>
            </select>
          </label>

          <label className="text-sm">
            이벤트 필터
            <select
              value={eventFilter}
              onChange={(event) =>
                setEventFilter(event.target.value as "all" | AccessLog["eventType"])
              }
              className="mt-1 block w-full border border-[#d1d5db] bg-white px-3 py-2"
            >
              <option value="all">전체</option>
              <option value="visit">visit</option>
              <option value="submit">submit</option>
              <option value="report">report</option>
              <option value="reset">reset</option>
            </select>
          </label>

          <label className="text-sm">
            정렬
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value as "latest" | "oldest")}
              className="mt-1 block w-full border border-[#d1d5db] bg-white px-3 py-2"
            >
              <option value="latest">최신순</option>
              <option value="oldest">오래된순</option>
            </select>
          </label>
        </div>

        <div className="mt-6 overflow-x-auto border border-[#d1d5db]">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#f8fafc] text-[#4b5563]">
              <tr>
                <th className="px-3 py-2">시각</th>
                <th className="px-3 py-2">세션 ID</th>
                <th className="px-3 py-2">경로</th>
                <th className="px-3 py-2">이벤트</th>
                <th className="px-3 py-2">완료 여부</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-t border-[#e5e7eb]">
                  <td className="px-3 py-2">{new Date(log.createdAt).toLocaleString()}</td>
                  <td className="px-3 py-2">{log.sessionId}</td>
                  <td className="px-3 py-2">{log.path}</td>
                  <td className="px-3 py-2">{log.eventType}</td>
                  <td className="px-3 py-2">{log.completed ? "완료" : "진행중"}</td>
                </tr>
              ))}
              {filteredLogs.length === 0 ? (
                <tr className="border-t border-[#e5e7eb]">
                  <td className="px-3 py-5 text-center text-[#4b5563]" colSpan={5}>
                    조건에 맞는 로그가 없습니다.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </motion.section>
    </main>
  );
}
