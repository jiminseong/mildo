"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function ContactPage() {
  const [serviceType, setServiceType] = useState<"local" | "advanced">("local");

  return (
    <main className="min-h-screen pt-24 pb-32">
      {/* Instruction */}
      <section className="container mx-auto px-6 max-w-[1400px] mb-12">
        <h1 className="text-4xl font-bold mb-6">프로젝트 문의</h1>
        <p className="text-lg text-text-secondary max-w-xl">
          아래 양식을 작성해 주시면 담당자가 검토 후 1 영업일 이내에 연락드립니다. 구체적으로
          적어주실수록 정확한 상담이 가능합니다.
        </p>
      </section>

      {/* Form Section */}
      <section className="container mx-auto px-6 max-w-[1400px]">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24">
          {/* Form Area */}
          <div>
            {/* Type Switcher */}
            <div className="flex gap-4 mb-12 p-1 bg-surface inline-flex rounded-lg border border-border">
              <button
                onClick={() => setServiceType("local")}
                className={`px-6 py-2 rounded-md font-bold text-sm transition-all ${
                  serviceType === "local"
                    ? "bg-dangol text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                자영업 패키지
              </button>
              <button
                onClick={() => setServiceType("advanced")}
                className={`px-6 py-2 rounded-md font-bold text-sm transition-all ${
                  serviceType === "advanced"
                    ? "bg-labs text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                고도 개발
              </button>
            </div>

            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-bold text-text-primary">
                    담당자 성함 *
                  </label>
                  <input
                    required
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg bg-base border border-border focus:border-text-primary focus:outline-none transition-colors"
                    placeholder="홍길동"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-bold text-text-primary">
                    연락처 *
                  </label>
                  <input
                    required
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-lg bg-base border border-border focus:border-text-primary focus:outline-none transition-colors"
                    placeholder="010-0000-0000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-bold text-text-primary">
                  이메일 *
                </label>
                <input
                  required
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg bg-base border border-border focus:border-text-primary focus:outline-none transition-colors"
                  placeholder="contact@company.com"
                />
              </div>

              {/* Dynamic Fields based on Type */}
              {serviceType === "local" ? (
                <div className="space-y-2">
                  <label htmlFor="store" className="block text-sm font-bold text-text-primary">
                    업종 / 매장명
                  </label>
                  <input
                    type="text"
                    id="store"
                    className="w-full px-4 py-3 rounded-lg bg-base border border-border focus:border-text-primary focus:outline-none transition-colors"
                    placeholder="예: 카페 밀도, 강남역 고깃집"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label htmlFor="status" className="block text-sm font-bold text-text-primary">
                    현재 진행 상황
                  </label>
                  <select
                    id="status"
                    className="w-full px-4 py-3 rounded-lg bg-base border border-border focus:border-text-primary focus:outline-none transition-colors appearance-none"
                  >
                    <option>아이디어 구상 단계</option>
                    <option>기획 문서 보유</option>
                    <option>디자인 보유</option>
                    <option>기존 서비스 리뉴얼/유지보수</option>
                  </select>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="desc" className="block text-sm font-bold text-text-primary">
                  문의 내용 및 요구사항 *
                </label>
                <textarea
                  required
                  id="desc"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-base border border-border focus:border-text-primary focus:outline-none transition-colors resize-none"
                  placeholder={
                    serviceType === "local"
                      ? "원하시는 기능(예약, 갤러리 등)이나 참고할 만한 사이트를 알려주세요."
                      : "개발하고자 하는 서비스의 핵심 기능이나 예산, 일정 범위를 적어주세요."
                  }
                />
              </div>

              <button
                type="submit"
                className={`w-full py-4 rounded-lg font-bold text-white text-lg transition-all shadow-sm flex items-center justify-center gap-2 ${
                  serviceType === "local"
                    ? "bg-dangol hover:bg-dangol-hover"
                    : "bg-labs hover:bg-labs-hover"
                }`}
              >
                문의 보내기 <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-xs text-text-secondary text-center mt-4">
                제출 시 개인정보 처리방침에 동의하는 것으로 간주합니다.
              </p>
            </form>
          </div>

          {/* Sidebar info */}
          <div className="hidden lg:block space-y-12">
            <div>
              <h3 className="font-bold text-lg mb-4">운영 시간</h3>
              <p className="text-text-secondary leading-relaxed">
                평일 10:00 - 18:00
                <br />
                (점심시간 12:30 - 13:30)
                <br />
                주말/공휴일 휴무
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">연락처</h3>
              <p className="text-text-secondary leading-relaxed">
                이메일: contact@mildo.com
                <br />
                카카오톡 채널: @밀도소프트웨어
              </p>
            </div>

            <div className="bg-surface p-6 rounded-xl border border-border">
              <h3 className="font-bold mb-4">자주 묻는 질문</h3>
              <ul className="space-y-3 text-sm text-text-secondary">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-dangol shrink-0" />
                  견적서는 이메일로 발송됩니다.
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-dangol shrink-0" />
                  방문 미팅은 사전 예약 시 가능합니다.
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-dangol shrink-0" />
                  세금계산서 발행 가능합니다.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
