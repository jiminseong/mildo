import { MetadataRoute } from "next";
import { portfolioData } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.mildolab.com";

  // 정적 페이지
  const routes = ["", "/local", "/advanced", "/portfolio", "/process", "/faq", "/contact"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    }),
  );

  // 포트폴리오 동적 페이지
  const portfolioRoutes = portfolioData.map((project) => ({
    url: `${baseUrl}/portfolio/${project.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...portfolioRoutes];
}
