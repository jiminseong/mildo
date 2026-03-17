import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { products } from "@/lib/data";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) {
    return { title: "제품을 찾을 수 없습니다" };
  }
  return {
    title: `${product.name} | Corporate Demo`,
    description: product.shortDescription,
  };
}

export async function generateStaticParams() {
  return products.map((item) => ({ slug: item.slug }));
}

export default async function ProductDetailPage({ params }: Readonly<Params>) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Reveal>
        <section className="panel grid gap-6 overflow-hidden md:grid-cols-2">
          <div className="h-full min-h-72">
            <Image
              src={product.image}
              alt={product.name}
              width={1000}
              height={720}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-4 px-6 py-8 md:px-8">
            <p className="text-xs uppercase tracking-[0.14em] text-(--corp-accent-500)">
              {product.category}
            </p>
            <h1 className="font-heading text-4xl text-(--corp-primary-900)">{product.name}</h1>
            <p className="leading-8 text-(--corp-muted)">{product.description}</p>
          </div>
        </section>
      </Reveal>

      <section className="space-y-4">
        <Reveal>
          <h2 className="font-heading text-3xl text-(--corp-primary-900)">주요 스펙</h2>
        </Reveal>
        <StaggerGroup className="grid gap-4 md:grid-cols-3">
          {product.specs.map((spec) => (
            <StaggerItem key={spec}>
              <article className="panel p-5 text-sm text-(--corp-muted)">{spec}</article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
    </div>
  );
}
