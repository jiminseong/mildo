"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

function ContactForm() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const [serviceType, setServiceType] = useState<"local" | "advanced" | "automation">(
    typeParam === "advanced" || typeParam === "automation" ? typeParam : "local",
  );
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
    /* 필드 추가 - handleSubmit 내부 */
    const budget = formData.get("budget") as string;
    const schedule = formData.get("schedule") as string;
    const referenceUrl = formData.get("referenceUrl") as string;

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
        budget: budget,
        schedule: schedule,
        reference_url: referenceUrl,
        status: "pending",
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

  /* ... (중략) ... */

  return (
    <main className="min-h-screen pt-24 pb-32">
      {/* ... (중략) ... */}

      {/* Form Section */}
      <section className="container mx-auto px-6 max-w-container">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24">
          <div>
            {/* ... (Type Switcher 생략) ... */}

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

              {/* Reference URL for Local */}
              {serviceType === "local" && (
                <div className="space-y-2">
                  <label
                    htmlFor="referenceUrl"
                    className="block text-sm font-bold text-text-primary"
                  >
                    참고 사이트 (선택)
                  </label>
                  <input
                    type="url"
                    id="referenceUrl"
                    name="referenceUrl"
                    className="w-full px-4 py-3 rounded-lg bg-base border border-border focus:border-text-primary focus:outline-none transition-colors"
                    placeholder="https://..."
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

              {/* Budget & Schedule */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="budget" className="block text-sm font-bold text-text-primary">
                    예산 범위
                  </label>
                  <div className="relative">
                    <select
                      id="budget"
                      name="budget"
                      className="w-full px-4 py-3 rounded-lg bg-base border border-border focus:border-text-primary focus:outline-none transition-colors appearance-none"
                    >
                      <option value="미정">미정</option>
                      <option value="100만원 미만">100만원 미만</option>
                      <option value="100~200만원">100~200만원</option>
                      <option value="200~300만원">200~300만원</option>
                      <option value="300~500만원">300~500만원</option>
                      <option value="500만원 이상">500만원 이상</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="schedule" className="block text-sm font-bold text-text-primary">
                    희망 납기 / 일정
                  </label>
                  <input
                    type="text"
                    id="schedule"
                    name="schedule"
                    className="w-full px-4 py-3 rounded-lg bg-base border border-border focus:border-text-primary focus:outline-none transition-colors"
                    placeholder="예: 2024년 3월 중"
                  />
                </div>
              </div>

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
                      ? "원하시는 기능(예약, 갤러리 등)을 알려주세요."
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
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-24 pb-32 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-dangol" />
        </div>
      }
    >
      <ContactForm />
    </Suspense>
  );
}
