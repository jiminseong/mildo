import Link from "next/link";
import Image from "next/image";
import FadeUp from "@/components/FadeUp";
import HeroPeopleMotion from "@/components/HeroPeopleMotion";
import HomeIntroModal from "@/components/HomeIntroModal";
import { cases, getLawyerById, lawyerProfiles, officeInfo, practiceAreas } from "@/lib/legal-data";

export default function Home() {
  const recentCases = cases.slice(0, 3);

  return (
    <div>
      <HomeIntroModal />

      <header className="law-hero py-20">
        <div className="law-container">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-3 text-sm tracking-[0.12em] text-amber-200">
              법무법인 한결 · 형사 특화 법률 서비스
            </p>
            <h1 className="text-4xl leading-tight font-bold md:text-5xl">
              법무법인 한결 · 「불안한 오늘을 넘어,
              <br />
              일상의 내일을 지켜냅니다」
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-stone-200 md:text-lg">
              성범죄·마약 사건은 초기 대응이 결과를 바꿉니다. 사실관계를 정리하고, 수사 단계별
              전략을 명확히 제시합니다.
            </p>
            <p className="mt-3 text-sm text-amber-100">{officeInfo.hours}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/consultation"
                className="law-btn-primary rounded-full px-6 py-3 text-sm font-semibold"
              >
                온라인 상담 예약
              </Link>
            </div>
            <HeroPeopleMotion
              people={lawyerProfiles.slice(0, 3).map((item) => ({
                name: item.name,
                role: item.role,
                image: item.image,
              }))}
            />
          </div>
        </div>
      </header>

      <main className="law-container py-16">
        <FadeUp>
          <section>
            <div className="mb-6 flex items-end justify-between">
              <h2 className="text-3xl font-bold">긴급 대응 안내</h2>
              <p className="text-sm font-semibold text-[#223558]">24시간 접수</p>
            </div>
            <article className="law-card p-6">
              <ul className="space-y-3 text-sm leading-7 text-stone-700">
                <li>1. 조사 연락을 받았다면 즉시 당시 상황을 메모하세요.</li>
                <li>2. 메시지·통화·위치 기록은 임의 삭제하지 마세요.</li>
                <li>3. 첫 진술 전 상담으로 대응 순서를 정리하세요.</li>
              </ul>
              <div className="mt-5 grid gap-2 text-xs text-stone-600 sm:grid-cols-2">
                <div className="rounded-lg border border-stone-200 bg-white px-3 py-2">
                  평균 10분 내 1차 회신
                </div>
                <div className="rounded-lg border border-stone-200 bg-white px-3 py-2">
                  주말·야간 긴급 상담 접수
                </div>
              </div>
              <p className="mt-5 border-t border-stone-200 pt-4 text-sm text-stone-700">
                전국 대응: {officeInfo.branches.join(" · ")} | 대표번호: {officeInfo.phone}
              </p>
            </article>
          </section>
        </FadeUp>

        <FadeUp delay={0.08}>
          <section className="mt-20">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="text-3xl font-bold">최근 성공사례</h2>
              <Link href="/cases" className="text-sm font-semibold text-[#223558]">
                사례 더보기
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {recentCases.map((item) => {
                const lawyer = getLawyerById(item.lawyerId);

                return (
                  <article key={item.slug} className="law-card p-5">
                    <span className="law-tag">{item.resultTag}</span>
                    <h3 className="mt-3 text-lg leading-7 font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm text-stone-700">{item.summary}</p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-stone-500">
                      {lawyer ? (
                        <Image
                          src={lawyer.image}
                          alt={`${item.lawyer} 프로필`}
                          width={24}
                          height={24}
                          className="h-6 w-6 rounded-full object-cover"
                        />
                      ) : null}
                      <p>담당: {item.lawyer}</p>
                    </div>
                    <Link
                      href={`/cases/${item.slug}`}
                      className="mt-4 inline-block text-sm font-semibold text-[#223558]"
                    >
                      자세히 보기
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
        </FadeUp>

        <FadeUp delay={0.12}>
          <section className="mt-20">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="text-3xl font-bold">변호사 경력</h2>
              <Link href="/about" className="text-sm font-semibold text-[#223558]">
                소개 페이지 보기
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {lawyerProfiles.map((lawyer) => (
                <article key={lawyer.id} className="law-card p-5">
                  <Image
                    src={lawyer.image}
                    alt={`${lawyer.name} 프로필`}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <h3 className="mt-3 text-xl font-bold">{lawyer.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-[#223558]">{lawyer.role}</p>
                  <p className="mt-3 text-sm leading-7 text-stone-700">{lawyer.focus}</p>
                  <p className="mt-3 text-xs text-stone-500">형사 사건 초기 대응 · 공판 전략</p>
                </article>
              ))}
            </div>
          </section>
        </FadeUp>

        <FadeUp delay={0.16}>
          <section className="mt-20">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="text-3xl font-bold">전문 분야</h2>
              <Link href="/practice" className="text-sm font-semibold text-[#223558]">
                전체 보기
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {practiceAreas.map((area) => (
                <article key={area.slug} className="law-card p-6">
                  <h3 className="text-2xl font-bold">{area.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-700">{area.summary}</p>
                  <ul className="mt-4 list-disc pl-5 text-sm text-stone-700">
                    {area.risks.slice(0, 2).map((risk) => (
                      <li key={risk}>{risk}</li>
                    ))}
                  </ul>
                  <Link
                    href={`/practice/${area.slug}`}
                    className="mt-5 inline-block text-sm font-semibold text-[#223558]"
                  >
                    분야 상세 보기
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </FadeUp>
      </main>
    </div>
  );
}
