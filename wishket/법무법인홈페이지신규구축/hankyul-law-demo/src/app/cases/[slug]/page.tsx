import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCaseBySlug, getLawyerById, officeInfo } from "@/lib/legal-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getCaseBySlug(slug);
  const lawyer = item ? getLawyerById(item.lawyerId) : null;

  if (!item) {
    notFound();
  }

  return (
    <main className="law-container py-16">
      <Link href="/cases" className="text-sm font-semibold text-[#223558]">
        성공사례 목록으로
      </Link>
      <h1 className="mt-4 text-4xl font-bold">{item.title}</h1>
      <div className="mt-4 flex items-center gap-2 text-sm">
        <span className="law-tag">{item.resultTag}</span>
        <span className="text-stone-500">{item.category}</span>
        <span className="text-stone-500">{item.publishedAt}</span>
      </div>

      <section className="mt-8 law-card p-6">
        <h2 className="text-2xl font-bold">사건 개요</h2>
        <p className="mt-3 text-sm leading-8 text-stone-700">{item.detail}</p>
      </section>

      <section className="mt-6 law-card p-6">
        <h2 className="text-2xl font-bold">대응 전략</h2>
        <p className="mt-3 text-sm leading-8 text-stone-700">{item.strategy}</p>
        <div className="mt-4 flex items-center gap-2 text-sm text-stone-700">
          {lawyer ? (
            <Image
              src={lawyer.image}
              alt={`${lawyer.name} 프로필`}
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-cover"
            />
          ) : null}
          <p>담당 변호사: {item.lawyer}</p>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/consultation"
          className="law-btn-primary rounded-full px-5 py-3 text-sm font-semibold"
        >
          비슷한 사건 상담 받기
        </Link>
        <a
          href={`tel:${officeInfo.phone}`}
          className="law-btn-secondary rounded-full px-5 py-3 text-sm font-semibold"
        >
          전화 상담
        </a>
      </div>
    </main>
  );
}
