import Link from "next/link";
import { ArrowRight, ChevronRight, Mail, MapPinned, Megaphone, Phone } from "lucide-react";
import { siteContent, type AccentTone } from "@/lib/content";

const toneClassNames: Record<
  AccentTone,
  {
    solid: string;
    icon: string;
  }
> = {
  blue: {
    solid: "border-civic-blue bg-civic-blue text-white",
    icon: "bg-white text-civic-blue",
  },
  red: {
    solid: "border-civic-red bg-civic-red text-white",
    icon: "bg-white text-civic-red",
  },
};

const navigation = [
  { href: "#profile", label: "후보자 소개" },
  { href: "#promises", label: "핵심 공약" },
  { href: "#record", label: "주요 이력" },
  { href: "#contact", label: "공식 채널" },
];

export function CandidateLanding() {
  const { candidate, promises, profile, channels, footer } = siteContent;

  return (
    <div id="top" className="min-h-screen bg-base text-ink">
      <header className="sticky top-0 z-50 border-b-2 border-ink bg-white">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-5 py-4 md:px-7 lg:px-10">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center border-2 border-ink bg-civic-red text-sm font-black text-white">
              2
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-civic-blue">{candidate.party}</p>
              <p className="truncate text-sm font-semibold text-ink">{candidate.name}</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-transparent pb-0.5 text-sm font-medium text-muted transition-colors hover:border-ink hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="#contact"
            className="inline-flex items-center gap-2 border-2 border-civic-navy bg-civic-navy px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            공식 문의
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main>
        <section className="border-b-2 border-ink">
          <div className="mx-auto grid max-w-[1320px] gap-8 px-5 py-12 md:px-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:px-10 lg:py-16">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <div className="border-l-4 border-civic-blue pl-3">
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-civic-blue">{candidate.number}</p>
                  <p className="mt-1 text-sm font-semibold text-ink">{candidate.party}</p>
                </div>
                <div className="border-l-4 border-civic-red pl-3">
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-civic-red">{candidate.office}</p>
                  <p className="mt-1 text-sm font-semibold text-ink">{candidate.intro}</p>
                </div>
              </div>

              <div>
                <h1 className="max-w-[10ch] text-[3.4rem] font-black leading-[0.9] tracking-[-0.07em] text-ink md:text-[5rem] lg:text-[6rem]">
                  {candidate.name}
                </h1>
                <p className="mt-4 max-w-[18ch] text-2xl font-semibold leading-snug text-ink lg:text-[2.1rem]">
                  {candidate.slogan}
                </p>
                <p className="mt-5 max-w-[44ch] text-[15px] leading-7 text-muted md:text-[17px]">{candidate.summary}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {candidate.keywords.map((keyword, index) => (
                  <div
                    key={keyword}
                    className={`border-2 px-4 py-4 text-sm font-semibold ${
                      index === 1
                        ? "border-civic-red bg-civic-red text-white"
                        : index === 2
                          ? "border-civic-navy bg-civic-navy text-white"
                          : "border-civic-blue bg-civic-blue text-white"
                    }`}
                  >
                    {keyword}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#promises"
                  className="inline-flex items-center justify-center gap-2 border-2 border-civic-blue bg-civic-blue px-6 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  핵심 공약 보기
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 border-2 border-civic-red bg-white px-6 py-4 text-sm font-semibold text-civic-red transition-transform hover:-translate-y-0.5"
                >
                  공식 채널 보기
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="hero-poster border-2 border-ink">
                <div className="poster-top">
                  <span>{candidate.number}</span>
                  <span>{candidate.party}</span>
                </div>
                <div className="poster-main">
                  <div className="candidate-image-slot">
                    <div className="candidate-image-overlay">
                      <p className="text-[11px] font-semibold tracking-[0.16em] text-white/72">후보 이미지 영역</p>
                      <p className="mt-3 text-base font-semibold text-white">공식 후보 사진 교체</p>
                    </div>
                  </div>
                </div>
                <div className="poster-bottom">
                  <span>서산 우선</span>
                  <span>즉시 실행</span>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {candidate.quickStats.map((stat, index) => (
                  <div key={stat.label} className="border-2 border-ink bg-white px-5 py-5">
                    <div className={`mb-4 h-1.5 w-14 ${index % 2 === 0 ? "bg-civic-blue" : "bg-civic-red"}`} />
                    <p className={`mb-2 text-[11px] font-semibold tracking-[0.16em] ${index % 2 === 0 ? "text-civic-blue" : "text-civic-red"}`}>
                      {stat.label}
                    </p>
                    <p className="text-sm font-semibold leading-6 text-ink">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="promises" className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1320px] px-5 py-16 md:px-7 lg:px-10 lg:py-20">
            <div className="space-y-4">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-civic-blue">핵심 공약</p>
              <h2 className="max-w-[10ch] text-4xl font-black leading-tight tracking-[-0.05em] text-ink md:text-5xl">
                서산의 현안을
                <br />
                바로 겨냥합니다
              </h2>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {promises.map((promise) => {
                const tone = toneClassNames[promise.accent];

                return (
                  <article key={promise.title} className={`border-2 p-6 ${tone.solid}`}>
                    <div className="mb-5 h-1.5 w-16 bg-white" />
                    <div className="inline-flex border border-white/40 px-3 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-white/92">
                      {promise.category}
                    </div>
                    <h3 className="mt-5 text-[1.8rem] font-black leading-tight tracking-[-0.05em] text-white">
                      {promise.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-white/86">{promise.summary}</p>
                    <ul className="mt-6 space-y-3">
                      {promise.details.map((detail, detailIndex) => (
                        <li key={detail} className="flex items-start gap-3 border-t border-white/20 pt-3 text-sm leading-6 text-white">
                          <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center border border-white/50 text-[10px] font-semibold">
                            {String(detailIndex + 1).padStart(2, "0")}
                          </span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="profile" className="border-b-2 border-ink">
          <div className="mx-auto grid max-w-[1320px] gap-5 px-5 py-16 md:px-7 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-20">
            <div className="border-2 border-civic-navy bg-civic-navy px-6 py-6 text-white">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-white/72">후보자 소개</p>
              <h2 className="mt-4 text-[2.35rem] font-black leading-tight tracking-[-0.05em]">
                서산의 산업축과
                <br />
                생활권을 모두 아는 후보
              </h2>
              <div className="mt-6 space-y-5">
                {profile.biography.map((item) => (
                  <div key={item} className="border-l-4 border-white/70 pl-4 text-base leading-7">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div id="record" className="border-2 border-ink bg-white px-6 py-6">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-civic-red">주요 이력</p>
              <div className="mt-6 space-y-4">
                {profile.timeline.map((item, index) => (
                  <div key={item.title} className="grid gap-0 border border-line md:grid-cols-[108px_minmax(0,1fr)]">
                    <div
                      className={`flex min-h-[84px] items-center justify-center px-4 py-4 text-center text-lg font-black text-white ${
                        index % 2 === 0 ? "bg-civic-blue" : "bg-civic-red"
                      }`}
                    >
                      {item.year}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold tracking-[-0.03em] text-ink">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-civic-blue via-civic-navy to-civic-red" />
          <div className="mx-auto max-w-[1320px] px-5 py-16 md:px-7 lg:px-10 lg:py-20">
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="border-2 border-ink bg-white px-6 py-6">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-civic-red">공식 채널</p>
                <h2 className="mt-4 text-[2.4rem] font-black leading-tight tracking-[-0.05em] text-ink">
                  박준호 후보와
                  <br />
                  바로 연결됩니다
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {channels.map((channel, index) => (
                  <Link
                    key={channel.label}
                    href={channel.href}
                    className={`border-2 p-5 text-white transition-transform hover:-translate-y-1 ${
                      index === 0
                        ? "border-civic-navy bg-civic-navy"
                        : index === 1
                          ? "border-civic-blue bg-civic-blue"
                          : "border-civic-red bg-civic-red"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex h-10 w-10 items-center justify-center ${index === 2 ? toneClassNames.red.icon : toneClassNames.blue.icon}`}>
                        {index === 0 ? <Phone className="h-4 w-4" /> : index === 1 ? <Megaphone className="h-4 w-4" /> : <MapPinned className="h-4 w-4" />}
                      </span>
                      <ArrowRight className="h-4 w-4 text-white/72" />
                    </div>
                    <p className="mt-5 text-xs font-semibold tracking-[0.16em] text-white/72">{channel.label}</p>
                    <p className="mt-2 text-base font-semibold leading-6 text-white">{channel.value}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 border-t-2 border-ink px-1 pt-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-civic-blue" />
                <p className="text-sm leading-7 text-muted">{footer.notice}</p>
              </div>
              <Link href="#top" className="text-sm font-semibold text-civic-navy">
                맨 위로 이동
              </Link>
            </div>
          </div>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-ink bg-white px-4 py-3 lg:hidden">
        <div className="mx-auto flex max-w-[1320px] gap-3">
          <Link
            href="#promises"
            className="inline-flex flex-1 items-center justify-center gap-2 border-2 border-civic-blue bg-civic-blue px-4 py-3 text-sm font-semibold text-white"
          >
            공약 보기
          </Link>
          <Link
            href="#contact"
            className="inline-flex flex-1 items-center justify-center gap-2 border-2 border-civic-red bg-civic-red px-4 py-3 text-sm font-semibold text-white"
          >
            문의하기
          </Link>
        </div>
      </div>
    </div>
  );
}
