"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Simple Accordion Component
function FAQItem({ question, answer }: { question: string; answer: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg bg-surface overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left font-semibold text-text-primary hover:bg-black/5 transition-colors"
      >
        {question}
        <ChevronDown
          className={`w-5 h-5 text-text-secondary transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-4 pt-0 text-text-secondary leading-relaxed border-t border-transparent">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-container">
        {/* Header */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl font-bold mb-4 text-text-primary">자주 묻는 질문</h1>
          <p className="text-text-secondary text-lg">궁금한 내용을 빠르게 확인해보세요.</p>
        </section>

        {/* FAQ Sections */}
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Section 1: 자영업 패키지 */}
          <section>
            <h2 className="text-xl font-bold mb-6 text-dangol flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-dangol"></span>
              자영업 패키지
            </h2>
            <div className="space-y-4">
              <FAQItem
                question="제작 기간은 얼마나 걸리나요?"
                answer={
                  <>
                    자료(사진, 메뉴 등)를 모두 전달해주신 시점부터{" "}
                    <strong>평균 5~7일(영업일 기준)</strong> 소요됩니다. 예약 연동이나 추가 페이지가
                    많은 경우 2~3일 더 걸릴 수 있습니다.
                  </>
                }
              />
              <FAQItem
                question="월 유지비용이 있나요?"
                answer={
                  <>
                    제작비는 1회성입니다. 다만, 홈페이지 주소(도메인) 비용과 서버 유지비용 등{" "}
                    <strong>실비(월 1~2만원 내외)</strong>는 별도로 발생하며, 이는 고객님 명의로
                    직접 결제하시도록 안내해 드립니다.
                  </>
                }
              />
              <FAQItem
                question="나중에 메뉴나 가격 수정은 어떻게 하나요?"
                answer={
                  <>
                    간단한 텍스트/이미지 수정은 <strong>오픈 후 1개월간 무상</strong>으로 지원해
                    드립니다. 이후에는 건별 소액의 비용으로 처리해 드리거나, 직접 수정하실 수 있는
                    가이드 문서를 제공해 드립니다.
                  </>
                }
              />
            </div>
          </section>

          {/* Section 2: 고도 개발 & 자동화 */}
          <section>
            <h2 className="text-xl font-bold mb-6 text-labs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-labs"></span>
              고도 개발 & 자동화
            </h2>
            <div className="space-y-4">
              <FAQItem
                question="어떤 기술 스택을 사용하나요?"
                answer={
                  <>
                    주로 <strong>Next.js, React, Node.js, Supabase</strong> 등 최신 웹 기술을
                    사용합니다. 프로젝트 특성에 따라 React Native(앱), Python(자동화/데이터) 등을
                    활용하며, 안정성과 유지보수 용이성을 최우선으로 고려합니다.
                  </>
                }
              />
              <FAQItem
                question="기획 문서가 없어도 의뢰 가능한가요?"
                answer={
                  <>
                    네, 가능합니다. 아이디어만 있으셔도{" "}
                    <strong>상세 기획 및 요구사항 정의부터 함께 진행</strong>해 드립니다. 다만, 기획
                    단계부터 참여할 경우 별도의 기획 비용이 산정될 수 있습니다.
                  </>
                }
              />
              <FAQItem
                question="개발 후 소스 코드는 제공해주나요?"
                answer={
                  <>
                    네, 모든 개발 <strong>소스 코드의 소유권은 고객님께 귀속</strong>되며, 프로젝트
                    종료 시 GitHub 저장소 초대 또는 파일 형태로 원본 코드를 전달해 드립니다. (단,
                    솔루션 형태의 임대형 서비스 제외)
                  </>
                }
              />
            </div>
          </section>
        </div>

        {/* CTA */}
        <section className="mt-24 text-center">
          <p className="text-text-secondary mb-6">
            더 궁금한 점이 있으시다면 언제든 편하게 물어보세요.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-text-primary text-white font-bold rounded-lg hover:bg-black/80 transition-colors"
          >
            문의하기 <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </main>
  );
}
