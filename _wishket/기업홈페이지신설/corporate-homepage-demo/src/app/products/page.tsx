import Link from "next/link";
import Image from "next/image";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { products } from "@/lib/data";

export default function ProductsPage() {
  return (
    <div className="space-y-8">
      <Reveal>
        <header className="panel px-6 py-9 md:px-8">
          <p className="text-sm uppercase tracking-[0.18em] text-(--corp-accent-500)">
            Products & Services
          </p>
          <h1 className="font-heading mt-3 text-4xl text-(--corp-primary-900) md:text-5xl">
            제품 및 서비스
          </h1>
          <p className="mt-4 text-(--corp-muted)">
            카테고리별 제품 정보와 주요 스펙을 확인할 수 있습니다.
          </p>
        </header>
      </Reveal>

      <StaggerGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <StaggerItem key={product.id}>
            <article className="group panel overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="h-44 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={800}
                  height={500}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-2 p-4">
                <p className="text-xs text-(--corp-accent-500)">{product.category}</p>
                <h2 className="text-lg font-semibold text-(--corp-primary-900)">{product.name}</h2>
                <p className="text-sm text-(--corp-muted)">{product.shortDescription}</p>
                <Link
                  href={`/products/${product.slug}`}
                  className="inline-block pt-2 text-sm font-semibold text-(--corp-primary-700)"
                >
                  상세 보기
                </Link>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}
