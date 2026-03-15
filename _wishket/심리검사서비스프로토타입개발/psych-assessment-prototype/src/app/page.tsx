import Link from "next/link";
import { FadeUp, StaggerItem, StaggerList } from "@/components/motion/FadeUp";

export default function Home() {
  return (
    <main className="container py-12">
      <FadeUp>
        <section className="card p-8">
          <p className="text-xs tracking-[0.08em] text-[#4b5563]">연구과제 프로토타입</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
            웹 기반 심리검사 흐름 검증 데모
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#4b5563] md:text-base">
            무회원 검사 진행, 결과 리포트, PDF 다운로드, 관리자 로그 조회까지 한 번에 검증할 수 있는
            구조입니다. 계산 정확도는 엑셀 원본과 비교해 확인하는 방식으로 진행합니다.
          </p>

          <FadeUp delay={0.08} className="mt-6 flex flex-wrap gap-2">
            <Link href="/assessment" className="btn-primary px-4 py-2 text-sm font-semibold">
              검사 시작
            </Link>
            <Link href="/report/sample" className="btn-secondary px-4 py-2 text-sm font-semibold">
              결과 샘플 보기
            </Link>
            <Link href="/admin/logs" className="btn-secondary px-4 py-2 text-sm font-semibold">
              관리자 로그 보기
            </Link>
          </FadeUp>

          <StaggerList className="mt-8 grid gap-3 md:grid-cols-3">
            <StaggerItem className="card p-4 text-sm text-[#4b5563]">
              회원가입 없이 검사 진입
            </StaggerItem>
            <StaggerItem className="card p-4 text-sm text-[#4b5563]">
              엑셀 기반 계산 로직 이관
            </StaggerItem>
            <StaggerItem className="card p-4 text-sm text-[#4b5563]">
              PDF 리포트 및 접속 로그 확인
            </StaggerItem>
          </StaggerList>
        </section>
      </FadeUp>
    </main>
  );
}
