import Link from "next/link";
import { notFound } from "next/navigation";
import { getPracticeBySlug, officeInfo } from "@/lib/legal-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PracticeDetailPage({ params }: Props) {
  const { slug } = await params;
  const practice = getPracticeBySlug(slug);

  if (!practice) {
    notFound();
  }

  return (
    <main className="law-container py-16">
      <Link href="/practice" className="text-sm font-semibold text-[#223558]">
        전문분야 목록으로
      </Link>
      <h1 className="mt-4 text-4xl font-bold">{practice.name} 대응</h1>
      <p className="mt-4 max-w-3xl text-stone-700">{practice.summary}</p>

      <section className="mt-10 law-card p-6">
        <h2 className="text-2xl font-bold">주요 위험 포인트</h2>
        <ul className="mt-4 list-disc pl-5 text-sm leading-8 text-stone-700">
          {practice.risks.map((risk) => (
            <li key={risk}>{risk}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8 law-card p-6">
        <h2 className="text-2xl font-bold">단계별 대응 절차</h2>
        <ol className="mt-4 list-decimal pl-5 text-sm leading-8 text-stone-700">
          {practice.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="mt-8 law-card p-6">
        <h2 className="text-2xl font-bold">자주 묻는 질문</h2>
        <div className="mt-4 space-y-5">
          {practice.faq.map((item) => (
            <article key={item.q}>
              <h3 className="font-semibold text-[#1f2430]">Q. {item.q}</h3>
              <p className="mt-2 text-sm leading-7 text-stone-700">A. {item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/consultation"
          className="law-btn-primary rounded-full px-5 py-3 text-sm font-semibold"
        >
          온라인 상담 예약
        </Link>
        <a
          href={`tel:${officeInfo.phone}`}
          className="law-btn-secondary rounded-full px-5 py-3 text-sm font-semibold"
        >
          즉시 전화 상담
        </a>
      </div>
    </main>
  );
}
