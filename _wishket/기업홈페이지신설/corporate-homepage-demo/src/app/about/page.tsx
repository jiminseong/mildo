import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { milestones } from "@/lib/data";

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <Reveal>
        <section className="panel px-6 py-10 md:px-8">
          <p className="text-sm uppercase tracking-[0.18em] text-(--corp-accent-500)">About Company</p>
          <h1 className="font-heading mt-3 text-4xl text-(--corp-primary-900) md:text-5xl">기술과 운영을 함께 설계하는 산업 파트너</h1>
          <p className="mt-4 max-w-3xl leading-8 text-(--corp-muted)">
            HK Corporate는 소재 연구와 현장 운영 경험을 기반으로 고객사의 생산성과 안정성을 동시에 개선하는 솔루션을 제공합니다.
            정보 전달력이 높은 구조와 신뢰감 있는 디자인, 그리고 적극적인 모션 인터랙션을 통해 브랜드 경험을 고도화합니다.
          </p>
        </section>
      </Reveal>

      <section className="space-y-4">
        <Reveal>
          <h2 className="font-heading text-3xl text-(--corp-primary-900)">연혁</h2>
        </Reveal>
        <StaggerGroup className="grid gap-4 md:grid-cols-2">
          {milestones.map((item) => (
            <StaggerItem key={item.year}>
              <article className="panel border-l-4 border-l-[var(--corp-accent-500)] p-5">
                <p className="text-sm text-(--corp-muted)">{item.year}</p>
                <p className="mt-2 text-lg font-semibold text-(--corp-primary-900)">{item.text}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <Reveal>
        <section className="panel grid gap-6 px-6 py-8 md:grid-cols-2 md:px-8">
          <div>
            <h3 className="text-2xl font-semibold text-(--corp-primary-900)">오시는 길</h3>
            <p className="mt-3 leading-7 text-(--corp-muted)">서울시 강남구 테헤란로 100 HK타워 12층</p>
            <p className="text-(--corp-muted)">대표번호 02-1234-5678</p>
            <p className="text-(--corp-muted)">평일 09:00 - 18:00</p>
          </div>
          <div className="rounded-2xl bg-(--corp-bg) p-4 text-sm text-(--corp-muted)">
            지도/교통 정보 영역 (실서비스에서 지도 API 연동)
          </div>
        </section>
      </Reveal>
    </div>
  );
}
