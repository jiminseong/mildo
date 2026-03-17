import Image from "next/image";
import Link from "next/link";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { HeroSequence } from "@/components/hero-sequence";
import { companyStats, newsList, products } from "@/lib/data";

export default function Home() {
  const featuredProducts = products.filter((item) => item.featured);
  const featuredNews = newsList.filter((item) => item.featured);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Full screen scroll sequence */}
      <HeroSequence />

      {/* 2. Content Sections Container */}
      <div className="bg-[#f8fafc] w-full z-20 relative">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32 space-y-32">
          
          {/* Stats Section with Glassmorphism */}
          <Reveal>
            <section className="grid gap-6 md:grid-cols-4 relative lg:-mt-48 z-30">
              {companyStats.map((stat) => (
                <article key={stat.label} className="backdrop-blur-xl bg-white/90 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-500">
                  <div className="h-12 w-12 rounded-full bg-emerald-50 text-(--corp-accent-500) flex items-center justify-center mb-6">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p className="mt-4 text-4xl font-black text-(--corp-primary-900) tracking-tight">{stat.value}</p>
                  <p className="mt-2 text-base font-medium text-(--corp-muted)">{stat.label}</p>
                </article>
              ))}
            </section>
          </Reveal>

          {/* Products Section */}
          <section className="space-y-12">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold tracking-widest text-(--corp-accent-500) uppercase">Our Business</h3>
                  <h2 className="font-heading text-4xl font-bold text-(--corp-primary-900) md:text-5xl tracking-tight">
                    주요 사업 영역
                  </h2>
                </div>
                <Link href="/products" className="group inline-flex items-center text-sm font-bold text-(--corp-primary-700) hover:text-(--corp-accent-500) transition-colors pb-1 border-b-2 border-(--corp-primary-700) hover:border-(--corp-accent-500)">
                  전체 사업 보기
                  <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </Reveal>
            <StaggerGroup className="grid gap-8 md:grid-cols-2">
              {featuredProducts.map((product) => (
                <StaggerItem key={product.id}>
                  <Link href={`/products/${product.slug}`} className="block group">
                    <article className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                      <div className="h-72 md:h-96 overflow-hidden relative">
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute bottom-0 w-full p-8 md:p-10 bg-linear-to-t from-black/90 via-black/50 to-transparent z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-sm font-bold tracking-wide text-(--corp-accent-300) mb-2">{product.category}</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 drop-shadow-sm">
                          {product.name}
                        </h3>
                        <p className="text-white/90 text-sm md:text-base line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {product.shortDescription}
                        </p>
                      </div>
                    </article>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </section>

          {/* News Section */}
          <section className="space-y-12">
            <Reveal>
              <div className="text-center space-y-3">
                <h3 className="text-sm font-bold tracking-widest text-(--corp-accent-500) uppercase">Media Room</h3>
                <h2 className="font-heading text-4xl font-bold text-(--corp-primary-900) md:text-5xl tracking-tight">
                  PR & 뉴스
                </h2>
              </div>
            </Reveal>
            <StaggerGroup className="grid gap-6 md:grid-cols-3">
              {featuredNews.map((news) => (
                <StaggerItem key={news.id}>
                  <Link href={`/news/${news.slug}`} className="block h-full group">
                    <article className="h-full bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col">
                      <p className="text-xs font-semibold tracking-wider text-gray-400 mb-4">{news.publishedAt}</p>
                      <h3 className="text-xl font-bold text-(--corp-primary-900) mb-4 line-clamp-2 leading-snug group-hover:text-(--corp-accent-500) transition-colors">
                        {news.title}
                      </h3>
                      <p className="text-[15px] text-gray-600 mb-6 line-clamp-3 grow leading-relaxed">
                        {news.summary}
                      </p>
                      <div className="mt-auto inline-flex items-center text-sm font-bold text-(--corp-primary-700) group-hover:text-(--corp-accent-500) transition-colors">
                        자세히 보기
                        <svg className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </article>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </section>
        </div>
      </div>
    </div>
  );
}
