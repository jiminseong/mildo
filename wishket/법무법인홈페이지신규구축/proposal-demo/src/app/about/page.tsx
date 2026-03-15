import { lawyerProfiles, officeInfo } from "@/lib/legal-data";
import Image from "next/image";
import FadeUp from "@/components/FadeUp";

export default function AboutPage() {
  return (
    <main className="law-container py-16">
      <h1 className="text-4xl font-bold">법무법인 한결 소개</h1>
      <p className="mt-5 max-w-3xl text-base leading-8 text-stone-700">
        법무법인 한결은 형사사건에서 초기 대응의 중요성을 가장 우선으로 봅니다. 복잡한 상황을
        의뢰인이 이해하기 쉬운 구조로 정리하고, 수사와 재판 단계에서 필요한 선택을 빠르게
        안내합니다.
      </p>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {lawyerProfiles.slice(0, 3).map((lawyer, index) => (
          <FadeUp key={lawyer.id} delay={index * 0.08}>
            <article className="law-card p-6">
              <Image
                src={lawyer.image}
                alt={`${lawyer.name} 프로필`}
                width={84}
                height={84}
                className="h-[84px] w-[84px] rounded-full object-cover"
              />
              <h2 className="mt-4 text-2xl font-bold">{lawyer.name}</h2>
              <p className="mt-2 text-sm font-semibold text-[#223558]">{lawyer.role}</p>
              <p className="mt-4 text-sm leading-7 text-stone-700">{lawyer.focus}</p>
            </article>
          </FadeUp>
        ))}
      </section>

      <section className="mt-12 law-card p-6">
        <h2 className="text-2xl font-bold">오시는 길 및 상담 안내</h2>
        <p className="mt-3 text-sm text-stone-700">주소: {officeInfo.address}</p>
        <p className="mt-1 text-sm text-stone-700">대표번호: {officeInfo.phone}</p>
        <p className="mt-1 text-sm text-stone-700">
          상담 가능 지역: {officeInfo.branches.join(", ")}
        </p>
      </section>
    </main>
  );
}
