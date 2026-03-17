import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion";
import { newsList } from "@/lib/data";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = newsList.find((item) => item.slug === slug);
  if (!article) {
    return { title: "뉴스를 찾을 수 없습니다" };
  }
  return {
    title: `${article.title} | Corporate Demo`,
    description: article.summary,
  };
}

export async function generateStaticParams() {
  return newsList.map((item) => ({ slug: item.slug }));
}

export default async function NewsDetailPage({ params }: Params) {
  const { slug } = await params;
  const article = newsList.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <Reveal>
      <article className="panel px-6 py-10 md:px-10">
        <p className="text-xs text-(--corp-muted)">{article.publishedAt}</p>
        <h1 className="font-heading mt-2 text-4xl text-(--corp-primary-900)">{article.title}</h1>
        <p className="mt-5 text-lg text-(--corp-muted)">{article.summary}</p>
        <div className="mt-8 rounded-xl border border-(--corp-line) bg-(--corp-bg) p-6 leading-8 text-(--corp-text)">
          {article.content}
        </div>
      </article>
    </Reveal>
  );
}
