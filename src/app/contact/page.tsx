"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function ContactPage() {
  const [serviceType, setServiceType] = useState<"local" | "advanced" | "automation">("local");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const desc = formData.get("desc") as string;

    // Optional specific fields
    const store = formData.get("store") as string;
    const status = formData.get("status") as string;
    const target = formData.get("target") as string;

    // Combine extra info into content
    let finalContent = desc;
    if (serviceType === "local" && store) {
      finalContent = `[매장명: ${store}]\n\n${desc}`;
    } else if (serviceType === "advanced" && status) {
      finalContent = `[진행상황: ${status}]\n\n${desc}`;
    } else if (serviceType === "automation" && target) {
      finalContent = `[자동화 대상: ${target}]\n\n${desc}`;
    }

    try {
      const { error: dbError } = await supabase.from("contacts").insert({
        service_type: serviceType,
        name: name,
        contact: `${phone} / ${email}`,
        content: finalContent,
        status: "pending", // Default status
      });

      if (dbError) throw dbError;

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error("Submission error:", err);
      setError("문의 전송 중 오류가 발생했습니다. 이메일(contact@mildo.com)로 문의해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen pt-24 pb-32 flex items-center justify-center">
        <div className="container mx-auto px-6 max-w-lg text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">문의가 접수되었습니다!</h1>
          <p className="text-text-secondary mb-8 leading-relaxed">
            빠르게 검토 후 남겨주신 연락처로 1일 이내에 답변드리겠습니다.
            <br />
            감사합니다.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-text-primary text-white font-bold rounded-lg hover:bg-black/80 transition-colors"
          >
            홈으로 돌아가기
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-32">
      {/* Instruction */}
      <section className="container mx-auto px-6 max-w-container mb-12">
        <h1 className="text-4xl font-bold mb-6">프로젝트 문의</h1>
        <p className="text-lg text-text-secondary max-w-xl">
          아래 양식을 작성해 주시면 담당자가 검토 후 1 영업일 이내에 연락드립니다. 구체적으로
          적어주실수록 정확한 상담이 가능합니다.
        </p>
      </section>

      {/* Form Section */}
      <section className="container mx-auto px-6 max-w-container">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24">
          {/* Form Area */}
          <div>
            {/* Type Switcher */}
            <div className="flex gap-2 mb-12 p-1 bg-surface inline-flex rounded-lg border border-border w-full md:w-auto">
              <button
                type="button"
                onClick={() => setServiceType("local")}
                className={`flex-1 md:flex-none px-4 py-2 rounded-md font-bold text-sm transition-all whitespace-nowrap ${
                  serviceType === "local"
                    ? "bg-dangol text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                자영업 패키지
              </button>
              <button
                type="button"
                onClick={() => setServiceType("advanced")}
                className={`flex-1 md:flex-none px-4 py-2 rounded-md font-bold text-sm transition-all whitespace-nowrap ${
                  serviceType === "advanced"
                    ? "bg-labs text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                고도 개발
              </button>
              <button
                type="button"
                onClick={() => setServiceType("automation")}
                className={`flex-1 md:flex-none px-4 py-2 rounded-md font-bold text-sm transition-all whitespace-nowrap ${
                  serviceType === "automation"
                    ? "bg-automation text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                업무 자동화
              </button>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-bold text-text-primary">
                    담당자 성함 *
                  </label>
                  <input
                    required
                    type="text"
                    id="name"
                    name="name"
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
                    name="phone"
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
                  name="email"
                  className="w-full px-4 py-3 rounded-lg bg-base border border-border focus:border-text-primary focus:outline-none transition-colors"
                  placeholder="contact@company.com"
                />
              </div>

              {/* Dynamic Fields based on Type */}
              {serviceType === "local" && (
                <div className="space-y-2">
                  <label htmlFor="store" className="block text-sm font-bold text-text-primary">
                    업종 / 매장명
                  </label>
                  <input
                    type="text"
                    id="store"
                    name="store"
                    className="w-full px-4 py-3 rounded-lg bg-base border border-border focus:border-text-primary focus:outline-none transition-colors"
                    placeholder="예: 카페 밀도, 강남역 고깃집"
                  />
                </div>
              )}

              {serviceType === "advanced" && (
                <div className="space-y-2">
                  <label htmlFor="status" className="block text-sm font-bold text-text-primary">
                    현재 진행 상황
                  </label>
                  <div className="relative">
                    <select
                      id="status"
                      name="status"
                      className="w-full px-4 py-3 rounded-lg bg-base border border-border focus:border-text-primary focus:outline-none transition-colors appearance-none"
                    >
                      <option>아이디어 구상 단계</option>
                      <option>기획 문서 보유</option>
                      <option>디자인 보유</option>
                      <option>기존 서비스 리뉴얼/유지보수</option>
                    </select>
                  </div>
                </div>
              )}

              {serviceType === "automation" && (
                <div className="space-y-2">
                  <label htmlFor="target" className="block text-sm font-bold text-text-primary">
                    자동화 대상 업무
                  </label>
                  <div className="relative">
                    <select
                      id="target"
                      name="target"
                      className="w-full px-4 py-3 rounded-lg bg-base border border-border focus:border-text-primary focus:outline-none transition-colors appearance-none"
                    >
                      <option>엑셀/데이터 정리</option>
                      <option>웹 크롤링/데이터 수집</option>
                      <option>알림 봇 (슬랙/카카오/메일)</option>
                      <option>기타 반복 업무</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="desc" className="block text-sm font-bold text-text-primary">
                  문의 내용 및 요구사항 *
                </label>
                <textarea
                  required
                  id="desc"
                  name="desc"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-base border border-border focus:border-text-primary focus:outline-none transition-colors resize-none"
                  placeholder={
                    serviceType === "local"
                      ? "원하시는 기능(예약, 갤러리 등)이나 참고할 만한 사이트를 알려주세요."
                      : serviceType === "automation"
                        ? "현재 반복적으로 하고 계신 업무나 자동화가 필요한 부분을 구체적으로 설명해주세요."
                        : "개발하고자 하는 서비스의 핵심 기능이나 예산, 일정 범위를 적어주세요."
                  }
                />
              </div>

              {error && <p className="text-red-500 font-bold">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-lg font-bold text-white text-lg transition-all shadow-sm flex items-center justify-center gap-2 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                } ${
                  serviceType === "local"
                    ? "bg-dangol hover:bg-dangol-hover"
                    : serviceType === "automation"
                      ? "bg-automation hover:bg-automation-hover"
                      : "bg-labs hover:bg-labs-hover"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> 전송 중...
                  </>
                ) : (
                  <>
                    문의 보내기 <ArrowRight className="w-5 h-5" />
                  </>
                )}
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
                10:00 - 21:00 (월-토)
                <br />
                (점심시간 12:00 - 13:30)
                <br />
                일요일 휴무
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">연락처</h3>
              <p className="text-text-secondary leading-relaxed">이메일: contact@mildo.com</p>
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
