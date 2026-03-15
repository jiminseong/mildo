import { portfolioData } from "@/lib/data";
import { getPortfolioPresentation } from "@/lib/portfolio-content";
import { PortfolioDetailView } from "@/components/portfolio/PortfolioDetailView";
import { notFound } from "next/navigation";

export default async function PortfolioDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = portfolioData.find((p) => p.id === id);

  if (!project) {
    return notFound();
  }

  return <PortfolioDetailView project={project} presentation={getPortfolioPresentation(project.id)} />;
}
