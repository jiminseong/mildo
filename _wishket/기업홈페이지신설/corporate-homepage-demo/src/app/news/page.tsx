import Link from "next/link";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { newsList } from "@/lib/data";

export default function NewsPage() {
  return (
    <div className="space-y-8">
      <Reveal>
        <header className="panel px-6 py-9 md:px-8">
          <p className="text-sm uppercase tracking-[0.18em] text-(--corp-accent-500)">Newsroom</p>
          <h1 className="font-heading mt-3 text-4xl text-(--corp-primary-900) md:text-5xl">뉴스 및 공지</h1>
          <p className="mt-4 text-(--corp-muted)">회사 소식과 업데이트를 확인하세요.</p>
        </header>
      </Reveal>

      <StaggerGroup className="grid gap-4">
        {newsList.map((news) => (
          <StaggerItem key={news.id}>
            <article className="group panel p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <p className="text-xs text-(--corp-muted)">{news.publishedAt}</p>
              <h2 className="mt-2 text-xl font-semibold text-(--corp-primary-900)">{news.title}</h2>
              <p className="mt-2 text-sm text-(--corp-muted)">{news.summary}</p>
              <Link href={`/news/${news.slug}`} className="mt-3 inline-block text-sm font-semibold text-(--corp-primary-700)">
                상세 보기
              </Link>
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}
