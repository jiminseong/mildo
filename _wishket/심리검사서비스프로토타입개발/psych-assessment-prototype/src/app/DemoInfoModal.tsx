"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function DemoInfoModal() {
  const pathname = usePathname();

  return <DemoInfoModalContent key={pathname} />;
}

function DemoInfoModalContent() {
  const [open, setOpen] = useState(true);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 demo-info-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.section
            className="w-full max-w-2xl border border-[#d1d5db] bg-white p-6 shadow-xl"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <h2 className="text-xl font-bold">데모 안내</h2>
            <p className="mt-3 text-sm leading-7 text-[#4b5563]">
              이 사이트는 연구과제용 심리검사 서비스의 로컬 프로토타입 데모입니다. 실제 임상 진단
              도구가 아니며, 기획 검증과 기능 흐름 확인을 목적으로 제작되었습니다.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-[#4b5563]">
              <li>무회원 검사 진입, 순차 응답, 결과 리포트, PDF 저장 흐름을 시연합니다.</li>
              <li>결과 계산은 데모용 임의 로직이며, 실제 구축 시 엑셀 원본 로직으로 교체됩니다.</li>
              <li>관리자 로그 화면에서 접속/제출/리포트 이벤트를 확인할 수 있습니다.</li>
            </ul>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn-primary px-4 py-2 text-sm"
              >
                확인
              </button>
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
