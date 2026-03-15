import Link from "next/link";
import { practiceAreas } from "@/lib/legal-data";

export default function PracticeListPage() {
  return (
    <main className="law-container py-16">
      <h1 className="text-4xl font-bold">전문분야</h1>
      <p className="mt-4 text-stone-700">
        사건 유형에 맞춰 초기 대응 전략부터 단계별 절차까지 안내합니다.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {practiceAreas.map((area) => (
          <article key={area.slug} className="law-card p-6">
            <h2 className="text-2xl font-bold">{area.name}</h2>
            <p className="mt-3 text-sm leading-7 text-stone-700">{area.summary}</p>
            <ul className="mt-4 list-disc pl-5 text-sm leading-7 text-stone-700">
              {area.risks.map((risk) => (
                <li key={risk}>{risk}</li>
              ))}
            </ul>
            <Link
              href={`/practice/${area.slug}`}
              className="mt-5 inline-block text-sm font-semibold text-[#223558]"
            >
              상세 페이지 이동
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
