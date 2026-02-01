import { portfolioData } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
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
            {/* Image Placeholder */}
            <div
              className={`w-full aspect-video rounded-2xl ${project.imageColor} flex items-center justify-center text-text-secondary/30 font-bold text-2xl border border-border`}
            >
              Project Image
            </div>

            {/* Description */}
            <div className="prose prose-lg max-w-none text-text-secondary leading-loose whitespace-pre-line">
              <h3 className="text-text-primary font-bold text-2xl mb-4">프로젝트 소개</h3>
              {project.description}
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

              <div className="pt-8 border-t border-border">
                <button
                  disabled
                  className="w-full py-4 rounded-lg bg-text-primary text-white font-bold flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
                >
                  사이트 방문하기 <ExternalLink className="w-4 h-4" />
                </button>
                <p className="text-xs text-text-secondary text-center mt-2">
                  * 보안상의 이유로 링크가 제공되지 않을 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
