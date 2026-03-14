import { portfolioData } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default async function PortfolioDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = portfolioData.find((p) => p.id === id);

  if (!project) {
    return notFound();
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "local":
        return "자영업 패키지";
      case "advanced":
        return "고도 개발";
      case "automation":
        return "업무 자동화";
      default:
        return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "local":
        return "text-dangol bg-dangol/10 border-dangol/20";
      case "advanced":
        return "text-labs bg-labs/10 border-labs/20";
      case "automation":
        return "text-automation bg-automation/10 border-automation/20";
      default:
        return "text-text-secondary bg-surface border-border";
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-6 max-w-container">
        {/* Back Link */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          목록으로 돌아가기
        </Link>

        {/* Header */}
        <header className="mb-12">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-4 ${getCategoryColor(
              project.category,
            )}`}
          >
            {getCategoryLabel(project.category)}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
            {project.title}
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl leading-relaxed">{project.summary}</p>
        </header>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: Image & Description */}
          <div className="lg:col-span-2 space-y-12">
            <div className="w-full aspect-video rounded-2xl border border-border overflow-hidden relative bg-surface">
              <Image
                src={project.imageSrc}
                alt={project.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover object-top"
              />
            </div>

            <div className="space-y-8">
              <div className="prose prose-lg max-w-none text-text-secondary leading-loose whitespace-pre-line">
                <h3 className="text-text-primary font-bold text-2xl mb-4">프로젝트 소개</h3>
                {project.description}
              </div>

              {project.videos?.length ? (
                <section className="space-y-4">
                  <div>
                    <h3 className="text-text-primary font-bold text-2xl">작동 영상</h3>
                    <p className="text-sm text-text-secondary mt-2">
                      실제 구현된 줌 인터랙션을 데스크탑과 모바일 화면으로 확인할 수 있습니다.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {project.videos.map((video) => (
                      <figure
                        key={video.src}
                        className={`rounded-2xl border border-border overflow-hidden bg-surface ${
                          video.layout === "mobile" ? "max-w-[420px]" : "w-full"
                        }`}
                      >
                        <figcaption className="px-5 py-4 border-b border-border">
                          <p className="font-bold text-text-primary">{video.title}</p>
                          {video.description ? (
                            <p className="text-sm text-text-secondary mt-1">{video.description}</p>
                          ) : null}
                        </figcaption>

                        <div className={`bg-base ${video.layout === "mobile" ? "aspect-[9/16]" : "aspect-video"}`}>
                          <video controls playsInline preload="metadata" className="w-full h-full object-contain">
                            <source src={video.src} type={video.mimeType} />
                            브라우저가 영상을 지원하지 않습니다.
                          </video>
                        </div>
                      </figure>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          </div>

          {/* Right: Meta Info */}
          <div className="lg:col-span-1">
            <div className="bg-surface p-8 rounded-2xl border border-border sticky top-32 space-y-8">
              <div>
                <h4 className="text-sm font-bold text-text-primary mb-2">클라이언트</h4>
                <p className="text-text-secondary">{project.client}</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-primary mb-2">기간</h4>
                <p className="text-text-secondary">{project.duration}</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-primary mb-2">사용 기술</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-base rounded text-xs text-text-secondary border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-border space-y-3">
                {project.links.length ? (
                  project.links.map((link, index) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors ${
                        index === 0
                          ? "bg-text-primary text-white hover:bg-text-primary/90"
                          : "border border-border text-text-primary hover:bg-base"
                      }`}
                    >
                      {link.label} <ExternalLink className="w-4 h-4" />
                    </a>
                  ))
                ) : (
                  <p className="text-sm text-text-secondary leading-relaxed">
                    비공개 프로젝트로 외부 공개 링크는 제공하지 않습니다.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
