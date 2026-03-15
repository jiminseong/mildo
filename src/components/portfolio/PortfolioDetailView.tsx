import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Clock3,
  ExternalLink,
  MapPin,
  MonitorPlay,
} from "lucide-react";
import type { PortfolioItem } from "@/lib/data";
import type { PortfolioPresentation } from "@/lib/portfolio-content";

function categoryLabel(category: PortfolioItem["category"]) {
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
}

function descriptionParagraphs(project: PortfolioItem) {
  return project.description.split("\n\n").filter(Boolean);
}

function LinkGroup({
  project,
  primaryClass,
  secondaryClass,
  emptyClass,
}: {
  project: PortfolioItem;
  primaryClass: string;
  secondaryClass: string;
  emptyClass: string;
}) {
  if (!project.links.length) {
    return <p className={emptyClass}>비공개 프로젝트로 외부 공개 링크는 제공하지 않습니다.</p>;
  }

  return (
    <div className="grid gap-3">
      {project.links.map((link, index) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className={index === 0 ? primaryClass : secondaryClass}
        >
          <span>{link.label}</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}

function VideoGallery({ project }: { project: PortfolioItem }) {
  if (!project.videos?.length) {
    return null;
  }

  return (
    <section className="grid gap-6">
      {project.videos.map((video) => (
        <figure
          key={video.src}
          className={`overflow-hidden rounded-[28px] border border-[#e9e2db] bg-white ${
            video.layout === "mobile" ? "max-w-[420px]" : ""
          }`}
        >
          <figcaption className="border-b border-[#ebe5df] px-5 py-4">
            <p className="font-semibold text-[#171311]">{video.title}</p>
            {video.description ? (
              <p className="mt-1 text-sm leading-6 text-[#6d635b]">{video.description}</p>
            ) : null}
          </figcaption>
          <div className={video.layout === "mobile" ? "aspect-[9/16]" : "aspect-video"}>
            <video controls playsInline preload="metadata" className="h-full w-full object-contain">
              <source src={video.src} type={video.mimeType} />
              브라우저가 영상을 지원하지 않습니다.
            </video>
          </div>
        </figure>
      ))}
    </section>
  );
}

function CommonBackLink({ className }: { className: string }) {
  return (
    <Link href="/portfolio" className={className}>
      <ArrowLeft className="h-4 w-4" />
      작업 사례 목록으로
    </Link>
  );
}

export function PortfolioDetailView({
  project,
  presentation,
}: {
  project: PortfolioItem;
  presentation: PortfolioPresentation;
}) {
  switch (presentation.mood) {
    case "heritage":
      return <HeritageView project={project} presentation={presentation} />;
    case "performance":
      return <PerformanceView project={project} presentation={presentation} />;
    case "ecosystem":
      return <EcosystemView project={project} presentation={presentation} />;
    case "operations":
      return <OperationsView project={project} presentation={presentation} />;
    case "editorial":
      return <EditorialView project={project} presentation={presentation} />;
  }
}

function HeritageView({
  project,
  presentation,
}: {
  project: PortfolioItem;
  presentation: PortfolioPresentation;
}) {
  const paragraphs = descriptionParagraphs(project);

  return (
    <main className="min-h-screen bg-[#f4ede4] pb-24 pt-24">
      <div className="mx-auto max-w-[1320px] px-6">
        <CommonBackLink className="mb-8 inline-flex items-center gap-2 text-sm text-[#6d584b] transition-colors hover:text-[#3c281f]" />

        <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <article className="overflow-hidden rounded-[40px] border border-[#d7c1ae] bg-[#582f25] text-[#f7ebd9]">
            <div className="grid gap-7 px-8 py-8 md:px-10 md:py-10">
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[#f4dec3]">
                <span className="rounded-full border border-[#8d6a58] px-3 py-1">{presentation.한줄요약}</span>
                <span className="rounded-full border border-[#8d6a58] px-3 py-1">{categoryLabel(project.category)}</span>
              </div>
              <h1 className="max-w-[15ch] text-4xl font-semibold leading-[1.04] tracking-[-0.05em] md:text-6xl">
                {presentation.헤드라인}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-[#f2dfca] md:text-lg">{presentation.설명}</p>
              <div className="grid gap-4 md:grid-cols-3">
                {presentation.지표.map((stat) => (
                  <div key={stat.label} className="rounded-[24px] border border-[#8d6a58] bg-black/10 px-4 py-4">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#f0d2b6]">{stat.label}</p>
                    <p className="mt-2 text-xl font-semibold">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="overflow-hidden rounded-[40px] border border-[#d7c1ae] bg-white">
            <div className="relative aspect-[4/3]">
              <Image src={project.imageSrc} alt={project.imageAlt} fill priority sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
            </div>
            <div className="grid gap-px border-t border-[#e8dacc] bg-[#e8dacc] md:grid-cols-2">
              <div className="bg-[#fcf8f2] px-6 py-5">
                <p className="text-sm text-[#8a6e5c]">고객</p>
                <p className="mt-2 text-lg font-semibold text-[#221712]">{project.client}</p>
              </div>
              <div className="bg-[#fcf8f2] px-6 py-5">
                <p className="text-sm text-[#8a6e5c]">진행 시기</p>
                <p className="mt-2 text-lg font-semibold text-[#221712]">{project.duration}</p>
              </div>
            </div>
          </article>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-3">
          {presentation.핵심포인트.map((point) => (
            <article key={point.title} className="rounded-[28px] border border-[#d8c7b7] bg-[#fcf8f2] px-6 py-6">
              <h2 className="text-xl font-semibold tracking-[-0.03em] text-[#291913]">{point.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#604c41]">{point.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[36px] border border-[#dccfc2] bg-white px-7 py-7 md:px-9">
            <div className="grid gap-6">
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-[#342821]">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
          <aside className="grid gap-6">
            <article className="rounded-[36px] border border-[#d8c7b7] bg-[#f8f0e4] px-7 py-7">
              <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[#291913]">방문 전환 설계</h2>
              <div className="mt-5 grid gap-4">
                {presentation.진행흐름.map((step, index) => (
                  <div key={step.title} className="grid grid-cols-[34px_1fr] gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#582f25] text-sm font-semibold text-[#f7ebd9]">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-[#221712]">{step.title}</p>
                      <p className="mt-1 text-sm leading-7 text-[#604c41]">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
            <article className="rounded-[36px] border border-[#dccfc2] bg-white px-7 py-7">
              <h2 className="text-xl font-semibold tracking-[-0.03em] text-[#221712]">기술과 링크</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="rounded-full border border-[#dfd4c7] px-3 py-2 text-sm text-[#5a4a3e]">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <LinkGroup
                  project={project}
                  primaryClass="inline-flex w-full items-center justify-between rounded-full bg-[#582f25] px-5 py-4 text-sm font-medium text-[#f7ebd9]"
                  secondaryClass="inline-flex w-full items-center justify-between rounded-full border border-[#d9cbbe] px-5 py-4 text-sm font-medium text-[#2d1c15]"
                  emptyClass="text-sm leading-7 text-[#6d584b]"
                />
              </div>
            </article>
          </aside>
        </section>
      </div>
    </main>
  );
}

function PerformanceView({
  project,
  presentation,
}: {
  project: PortfolioItem;
  presentation: PortfolioPresentation;
}) {
  const paragraphs = descriptionParagraphs(project);

  return (
    <main className="min-h-screen bg-[#0e1510] pb-24 pt-24 text-white">
      <div className="mx-auto max-w-[1360px] px-6">
        <CommonBackLink className="mb-8 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white" />

        <section className="overflow-hidden rounded-[40px] border border-white/10 bg-[#131c15]">
          <div className="grid gap-8 px-8 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-10">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-[#9eff78]">{presentation.한줄요약}</p>
              <h1 className="mt-4 max-w-[15ch] text-4xl font-semibold leading-[1.02] tracking-[-0.06em] md:text-6xl">
                {presentation.헤드라인}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 md:text-lg">{presentation.설명}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {presentation.지표.map((stat, index) => (
                <article
                  key={stat.label}
                  className={`rounded-[28px] px-5 py-5 ${
                    index === 0 ? "bg-[#9eff78] text-[#10220c]" : "border border-white/10 bg-white/5"
                  }`}
                >
                  <p className={`text-[11px] uppercase tracking-[0.2em] ${index === 0 ? "text-[#214517]" : "text-white/55"}`}>
                    {stat.label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{stat.value}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-px bg-white/10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[380px] bg-[#0b100c]">
              <Image src={project.imageSrc} alt={project.imageAlt} fill priority sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover opacity-90" />
            </div>
            <div className="grid gap-px bg-white/10">
              <div className="bg-[#182219] px-7 py-6">
                <div className="flex items-center gap-3 text-sm text-white/72">
                  <MapPin className="h-4 w-4" />
                  <span>{project.client}</span>
                </div>
                <div className="mt-3 flex items-center gap-3 text-sm text-white/72">
                  <Clock3 className="h-4 w-4" />
                  <span>{project.duration}</span>
                </div>
              </div>
              <div className="bg-[#182219] px-7 py-6">
                <p className="text-sm leading-7 text-white/72">{presentation.결과메모.join(" ")}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-3">
          {presentation.핵심포인트.map((point) => (
            <article key={point.title} className="rounded-[30px] border border-white/10 bg-white/5 px-6 py-6">
              <h2 className="text-xl font-semibold text-white">{point.title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/70">{point.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[0.96fr_1.04fr]">
          <article className="rounded-[34px] border border-white/10 bg-[#111811] px-7 py-7">
            <div className="grid gap-6">
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-white/78">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          <article className="rounded-[34px] border border-white/10 bg-[#182219] px-7 py-7">
            <h2 className="text-2xl font-semibold tracking-[-0.04em]">센터 구조를 설명하는 순서</h2>
            <div className="mt-6 grid gap-5">
              {presentation.진행흐름.map((step, index) => (
                <div key={step.title} className="grid grid-cols-[48px_1fr] gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#9eff78] text-lg font-semibold text-[#12210e]">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{step.title}</p>
                    <p className="mt-2 text-sm leading-7 text-white/70">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[28px] border border-white/10 bg-black/10 p-5">
              <p className="text-sm font-medium text-white">사용 기술</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="rounded-full border border-white/12 px-3 py-2 text-sm text-white/75">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <LinkGroup
                project={project}
                primaryClass="inline-flex w-full items-center justify-between rounded-full bg-[#9eff78] px-5 py-4 text-sm font-medium text-[#10220c]"
                secondaryClass="inline-flex w-full items-center justify-between rounded-full border border-white/12 px-5 py-4 text-sm font-medium text-white"
                emptyClass="text-sm leading-7 text-white/70"
              />
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

function EcosystemView({
  project,
  presentation,
}: {
  project: PortfolioItem;
  presentation: PortfolioPresentation;
}) {
  const paragraphs = descriptionParagraphs(project);

  return (
    <main className="min-h-screen bg-[#eef2f6] pb-24 pt-24">
      <div className="mx-auto max-w-[1360px] px-6">
        <CommonBackLink className="mb-8 inline-flex items-center gap-2 text-sm text-[#4c5d71] transition-colors hover:text-[#1a2430]" />

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-[40px] border border-[#d8dee6] bg-white px-8 py-8 shadow-[0_18px_60px_rgba(31,46,64,0.08)] md:px-10 md:py-10">
            <p className="text-xs font-semibold tracking-[0.22em] text-[#6a7f94]">{presentation.한줄요약}</p>
            <h1 className="mt-4 max-w-[15ch] text-4xl font-semibold leading-[1.04] tracking-[-0.06em] text-[#16212c] md:text-6xl">
              {presentation.헤드라인}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[#5a6c7e] md:text-lg">{presentation.설명}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {presentation.지표.map((stat) => (
                <div key={stat.label} className="rounded-[24px] border border-[#dde3ea] bg-[#f6f8fb] px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#7a8da0]">{stat.label}</p>
                  <p className="mt-2 text-xl font-semibold text-[#16212c]">{stat.value}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="grid gap-4">
            <div className="overflow-hidden rounded-[40px] border border-[#d8dee6] bg-white shadow-[0_18px_60px_rgba(31,46,64,0.08)]">
              <div className="relative aspect-[16/10]">
                <Image src={project.imageSrc} alt={project.imageAlt} fill priority sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { label: "고객", value: project.client },
                { label: "진행 시기", value: project.duration },
                { label: "출시 링크", value: `${project.links.length}개` },
              ].map((item) => (
                <div key={item.label} className="rounded-[28px] border border-[#d8dee6] bg-[#dfe7ef] px-5 py-5">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#617487]">{item.label}</p>
                  <p className="mt-2 text-base font-semibold text-[#17202b]">{item.value}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-3">
          {presentation.핵심포인트.map((point) => (
            <article key={point.title} className="rounded-[28px] border border-[#d8dee6] bg-white px-6 py-6">
              <h2 className="text-xl font-semibold tracking-[-0.03em] text-[#16212c]">{point.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#5b6c7d]">{point.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
          <article className="rounded-[36px] border border-[#d8dee6] bg-white px-7 py-7 shadow-[0_18px_60px_rgba(31,46,64,0.06)]">
            <div className="grid gap-6">
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-[#253443]">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
          <aside className="grid gap-6">
            <article className="rounded-[36px] border border-[#d8dee6] bg-[#18222d] px-7 py-7 text-white">
              <h2 className="text-2xl font-semibold tracking-[-0.04em]">제품군 운영 구조</h2>
              <div className="mt-6 grid gap-4">
                {presentation.진행흐름.map((step) => (
                  <div key={step.title} className="rounded-[24px] border border-white/10 bg-white/5 px-5 py-4">
                    <p className="font-semibold">{step.title}</p>
                    <p className="mt-2 text-sm leading-7 text-white/72">{step.body}</p>
                  </div>
                ))}
              </div>
            </article>
            <article className="rounded-[36px] border border-[#d8dee6] bg-white px-7 py-7">
              <h2 className="text-xl font-semibold text-[#16212c]">기술 스택과 링크</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="rounded-full border border-[#d8dee6] px-3 py-2 text-sm text-[#5b6c7d]">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <LinkGroup
                  project={project}
                  primaryClass="inline-flex w-full items-center justify-between rounded-full bg-[#18222d] px-5 py-4 text-sm font-medium text-white"
                  secondaryClass="inline-flex w-full items-center justify-between rounded-full border border-[#d8dee6] px-5 py-4 text-sm font-medium text-[#18222d]"
                  emptyClass="text-sm leading-7 text-[#657688]"
                />
              </div>
            </article>
          </aside>
        </section>
      </div>
    </main>
  );
}

function OperationsView({
  project,
  presentation,
}: {
  project: PortfolioItem;
  presentation: PortfolioPresentation;
}) {
  const paragraphs = descriptionParagraphs(project);

  return (
    <main className="min-h-screen bg-[#0d0b09] pb-24 pt-24 text-white">
      <div className="mx-auto max-w-[1340px] px-6">
        <CommonBackLink className="mb-8 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white" />

        <section className="overflow-hidden rounded-[40px] border border-[#3f3121] bg-[#15110d]">
          <div className="grid gap-8 px-8 py-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-10 lg:py-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#f7c85a] px-4 py-2 text-sm font-medium text-[#21180e]">
                <MonitorPlay className="h-4 w-4" />
                {presentation.한줄요약}
              </div>
              <h1 className="mt-5 max-w-[15ch] text-4xl font-semibold leading-[1.04] tracking-[-0.06em] md:text-6xl">
                {presentation.헤드라인}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 md:text-lg">{presentation.설명}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {presentation.지표.map((stat, index) => (
                <article
                  key={stat.label}
                  className={`rounded-[28px] px-5 py-5 ${
                    index === 1 ? "bg-[#f7c85a] text-[#20180f]" : "border border-[#3f3121] bg-black/20"
                  }`}
                >
                  <p className={`text-[11px] uppercase tracking-[0.2em] ${index === 1 ? "text-[#5e4619]" : "text-white/50"}`}>
                    {stat.label}
                  </p>
                  <p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">{stat.value}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="relative aspect-[16/8] border-t border-[#3f3121]">
            <Image src={project.imageSrc} alt={project.imageAlt} fill priority sizes="100vw" className="object-cover opacity-80" />
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-3">
          {presentation.핵심포인트.map((point) => (
            <article key={point.title} className="rounded-[30px] border border-[#3f3121] bg-[#17120e] px-6 py-6">
              <h2 className="text-xl font-semibold text-white">{point.title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/70">{point.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[0.94fr_1.06fr]">
          <article className="rounded-[36px] border border-[#3f3121] bg-[#15110d] px-7 py-7">
            <div className="grid gap-6">
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-white/78">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
          <article className="rounded-[36px] border border-[#3f3121] bg-[#f5e7c6] px-7 py-7 text-[#20180f]">
            <h2 className="text-2xl font-semibold tracking-[-0.04em]">현장 기준으로 본 설계 순서</h2>
            <div className="mt-6 grid gap-4">
              {presentation.진행흐름.map((step, index) => (
                <div key={step.title} className="grid grid-cols-[40px_1fr] gap-4 rounded-[24px] border border-[#d8bf86] bg-white/70 px-4 py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#20180f] text-sm font-semibold text-[#f7c85a]">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold">{step.title}</p>
                    <p className="mt-2 text-sm leading-7 text-[#5d4a34]">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-3">
              <LinkGroup
                project={project}
                primaryClass="inline-flex w-full items-center justify-between rounded-full bg-[#20180f] px-5 py-4 text-sm font-medium text-[#f7c85a]"
                secondaryClass="inline-flex w-full items-center justify-between rounded-full border border-[#c8ae75] px-5 py-4 text-sm font-medium text-[#20180f]"
                emptyClass="text-sm leading-7 text-[#4b3a2a]"
              />
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

function EditorialView({
  project,
  presentation,
}: {
  project: PortfolioItem;
  presentation: PortfolioPresentation;
}) {
  const paragraphs = descriptionParagraphs(project);

  return (
    <main className="min-h-screen bg-[#faf7f2] pb-24 pt-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <CommonBackLink className="mb-8 inline-flex items-center gap-2 text-sm text-[#776d65] transition-colors hover:text-[#171311]" />

        <section className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <article className="grid gap-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-[#7d726a]">{presentation.한줄요약}</p>
              <h1 className="mt-4 max-w-[12ch] text-4xl font-semibold leading-[1.02] tracking-[-0.06em] text-[#171311] md:text-6xl">
                {presentation.헤드라인}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#615852] md:text-lg">{presentation.설명}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {presentation.지표.map((stat) => (
                <article key={stat.label} className="border-t border-[#171311] pt-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#8b8179]">{stat.label}</p>
                  <p className="mt-2 text-xl font-semibold text-[#171311]">{stat.value}</p>
                </article>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[28px] border border-[#e6dfd8] bg-white px-5 py-5">
                <p className="text-sm text-[#887d75]">고객</p>
                <p className="mt-2 text-lg font-semibold text-[#171311]">{project.client}</p>
              </div>
              <div className="rounded-[28px] border border-[#e6dfd8] bg-white px-5 py-5">
                <p className="text-sm text-[#887d75]">진행 시기</p>
                <p className="mt-2 text-lg font-semibold text-[#171311]">{project.duration}</p>
              </div>
            </div>
          </article>

          <article className="overflow-hidden rounded-[40px] border border-[#e6dfd8] bg-white">
            <div className="relative aspect-[5/4]">
              <Image src={project.imageSrc} alt={project.imageAlt} fill priority sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" />
            </div>
          </article>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
          <article className="rounded-[36px] border border-[#e6dfd8] bg-white px-7 py-7">
            <div className="grid gap-6">
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-[#2a2522]">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
          <aside className="grid gap-6">
            <article className="rounded-[36px] border border-[#e6dfd8] bg-[#f3eee8] px-7 py-7">
              <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[#171311]">개선한 포인트</h2>
              <div className="mt-6 grid gap-4">
                {presentation.핵심포인트.map((point) => (
                  <div key={point.title} className="border-t border-[#d7cdc4] pt-4">
                    <p className="font-semibold text-[#171311]">{point.title}</p>
                    <p className="mt-2 text-sm leading-7 text-[#615852]">{point.body}</p>
                  </div>
                ))}
              </div>
            </article>
            <article className="rounded-[36px] border border-[#e6dfd8] bg-white px-7 py-7">
              <h2 className="text-xl font-semibold text-[#171311]">실서비스 반영 링크</h2>
              <div className="mt-6">
                <LinkGroup
                  project={project}
                  primaryClass="inline-flex w-full items-center justify-between rounded-full bg-[#171311] px-5 py-4 text-sm font-medium text-white"
                  secondaryClass="inline-flex w-full items-center justify-between rounded-full border border-[#e2dad2] px-5 py-4 text-sm font-medium text-[#171311]"
                  emptyClass="text-sm leading-7 text-[#6c625b]"
                />
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="rounded-full border border-[#e2dad2] px-3 py-2 text-sm text-[#6c625b]">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          </aside>
        </section>

        <section className="mt-10">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-[#81766e]">작동 화면</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#171311]">실제로 바뀐 상호작용</h2>
            </div>
            <ArrowUpRight className="h-5 w-5 text-[#7d726a]" />
          </div>
          <VideoGallery project={project} />
        </section>
      </div>
    </main>
  );
}
