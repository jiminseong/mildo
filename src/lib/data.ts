export type PortfolioLink = {
  label: string;
  url: string;
};

export type PortfolioVideo = {
  title: string;
  src: string;
  mimeType: string;
  layout: "desktop" | "mobile";
  description?: string;
};

export type PortfolioItem = {
  id: string;
  title: string;
  category: "local" | "advanced" | "automation";
  summary: string;
  client: string;
  duration: string;
  techStack: string[];
  description: string;
  imageSrc: string;
  imageAlt: string;
  links: PortfolioLink[];
  videos?: PortfolioVideo[];
};

export const portfolioData: PortfolioItem[] = [
  {
    id: "saeyeongdong",
    title: "새영동숯불갈비 다국어 브랜드 웹사이트",
    category: "local",
    summary: "33년 전통 갈비집의 메뉴, 위치, 예약 동선을 담은 3개 국어 브랜드 웹사이트 구축",
    client: "새영동숯불갈비",
    duration: "2026.02",
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "next-intl",
      "Kakao Map SDK",
      "SEO",
    ],
    description: `제천의 33년 전통 갈비 전문점 '새영동숯불갈비'를 위한 공식 브랜드 웹사이트 프로젝트입니다.

단순 소개형 페이지가 아니라 메뉴 확인, 위치 확인, 전화 예약으로 이어지는 방문 전환 흐름을 한 사이트 안에서 자연스럽게 연결하는 데 집중했습니다.

한국어, 영어, 중국어 3개 국어를 지원하고, 메뉴 21종을 카테고리별로 구조화했으며, 주소·영업시간·주차·지도 이동 버튼을 하나의 CTA 섹션에 통합했습니다.

브랜드 스토리, 룸 갤러리, 지도/예약 UX, SEO 메타데이터까지 포함해 오프라인 매장의 분위기와 신뢰감을 온라인에서 그대로 전달하도록 설계했습니다.`,
    imageSrc: "/portfolio/새영동.com.png",
    imageAlt: "새영동숯불갈비 웹사이트 메인 화면",
    links: [{ label: "공식 사이트", url: "https://새영동갈비.com" }],
  },
  {
    id: "jecheongym",
    title: "제천남여헬스클럽 공식 웹사이트 구축",
    category: "local",
    summary: "57종 장비 소개, 문의 전환 UX, 다국어/SEO를 담은 웨이트 전문 헬스장 공식 웹사이트",
    client: "제천남여헬스클럽",
    duration: "2026.02",
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "next-intl",
      "Kakao Maps API",
      "Schema.org",
    ],
    description: `제천 지역 웨이트 트레이닝 전문 헬스장의 공식 웹사이트를 구축한 프로젝트입니다.

운영 철학, 이용 규칙, 장비 라인업, 위치와 문의 정보를 한 화면 안에서 명확하게 전달하는 랜딩 구조를 설계했고, 국문/영문 다국어 페이지와 기본 SEO 체계까지 함께 구성했습니다.

특히 57종 장비를 브랜드와 부위 기준으로 탐색할 수 있도록 데이터 구조를 정리하고, 카카오톡 ID 복사, 주소 복사, 카카오맵/네이버지도 이동 기능을 연결해 문의 전환 동선을 단순화했습니다.

제조사 공식 이미지를 활용한 장비 소개, 구조화 데이터, sitemap, robots, Open Graph 적용까지 포함해 실제 운영 가능한 헬스장 웹사이트로 마무리했습니다.`,
    imageSrc: "/portfolio/www.jecheongym.site.png",
    imageAlt: "제천남여헬스클럽 웹사이트 메인 화면",
    links: [{ label: "공식 사이트", url: "https://jecheongym.site" }],
  },
  {
    id: "aim",
    title: "AIM 앱 패밀리 통합 설계 및 운영",
    category: "advanced",
    summary:
      "Productivity, Wellness 앱과 공개 랜딩 페이지를 하나의 브랜드와 코드베이스로 운영한 멀티 제품 프로젝트",
    client: "밀도랩 / AIM",
    duration: "2026.02 - 진행중",
    techStack: [
      "React Native",
      "Expo Router",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Next.js",
      "Electron",
    ],
    description: `AIM 앱 패밀리는 하나의 브랜드 아래에서 Productivity 앱, Wellness 앱, 공개 랜딩 페이지를 함께 운영하는 멀티 제품 구조 프로젝트입니다.

생산성 관리와 건강 관리의 사용 목적이 다르다는 점에 맞춰 하나의 통합 앱이 아니라 목적별로 분리된 두 개의 앱과 이를 연결하는 공개 웹을 설계했습니다.

하나의 모노레포와 공통 런타임 위에서 Productivity, Wellness, unified variant를 운영하도록 구조를 설계했고, Supabase 기반 인증과 데이터, 앱별 문서와 스토어 운영 체계까지 함께 정리했습니다.

Todo, Routine, Mandalart 중심의 생산성 앱과 운동 기록, 중량 추이, 영양 체크 중심의 웰니스 앱, 그리고 두 앱의 다운로드 CTA와 정책 페이지를 연결하는 랜딩 페이지까지 직접 구축하고 운영하고 있습니다.`,
    imageSrc: "/portfolio/aim.png",
    imageAlt: "AIM 앱 패밀리 대표 화면",
    links: [
      { label: "랜딩 페이지", url: "https://aim-official.vercel.app" },
      {
        label: "Productivity iOS",
        url: "https://apps.apple.com/kr/app/aim-%ED%95%A0%EC%9D%BC-%EB%A7%8C%EB%8B%A4%EB%9D%BC%ED%8A%B8/id6759624111",
      },
      {
        label: "Wellness iOS",
        url: "https://apps.apple.com/kr/app/aim-%EC%9A%B4%EB%8F%99-%EC%8B%9D%EB%8B%A8-ai/id6760188299",
      },
    ],
  },
  {
    id: "photox-kiosk",
    title: "포토XX AI 생성형 포토부스 키오스크 앱 구축",
    category: "advanced",
    summary:
      "매장·행사 현장에서 고객 셀프 촬영과 운영 설정 관리를 분리한 포토부스 키오스크 앱 + 관리자 시스템 구축",
    client: "비공개 / 포토XX",
    duration: "2025.09",
    techStack: ["TypeScript", "Next.js", "NestJS", "Gen AI Service"],
    description: `포토XX는 매장·행사 현장에서 사용할 수 있는 AI 생성형 포토부스 키오스크 앱과 관리자 시스템을 함께 구축한 프로젝트입니다.

고객은 키오스크에서 촬영을 진행하고, 운영자는 관리자 화면에서 콘텐츠, 설정, 운영 상태를 직접 관리할 수 있도록 구성했습니다.

현장에서 "누가 사용해도" 흐름이 이해되도록 큰 버튼과 명확한 안내 중심의 터치 UI를 설계했고, 시작, 촬영, 결과 확인, 완료로 이어지는 흐름을 단순하게 정리했습니다.

또한 오류 안내, 재시도, 복구 중심의 예외 처리를 보강하고 현장 테스트를 반복하며 사용성을 개선해, 장시간 운영되는 매장·행사 환경에서도 안정적으로 사용할 수 있는 시스템으로 마무리했습니다.`,
    imageSrc: "/portfolio/photox-kiosk.svg",
    imageAlt: "포토XX 키오스크 앱과 관리자 시스템을 표현한 대표 이미지",
    links: [],
  },
  {
    id: "moumoute",
    title: "MOUMOUTE 공식몰 퍼블리싱 고도화",
    category: "advanced",
    summary:
      "카페24 기반 주얼리 공식몰에서 상품 상세 줌, 메인 비주얼, 국문/영문 메인 섹션을 고도화한 퍼블리싱 프로젝트",
    client: "MOUMOUTE",
    duration: "2025.06",
    techStack: ["Cafe24", "HTML", "CSS", "JavaScript", "SVG", "Responsive Web"],
    description: `MOUMOUTE 공식몰 퍼블리싱 외주는 카페24 기반 주얼리 브랜드 이커머스 사이트의 상품 상세 경험과 메인 페이지 완성도를 높이기 위한 프로젝트입니다.

기존 카페24 템플릿 구조를 분석하고 상품 상세용 zoom.css, zoom.js를 추가해 커스텀 확대 기능을 구현했으며, 데스크탑과 모바일 환경에 맞는 줌 UX를 분리 설계했습니다.

또한 메인 3섹션의 버튼 위치, 배너 텍스트, 아이콘 비율과 정렬을 조정하고 국문 main_control.html, 영문 main01.html 계열 소스를 함께 수정해 언어별 브랜드 메시지와 레이아웃을 정비했습니다.

외부 플러그인 없이 실서비스 템플릿에 직접 연결되는 CSS와 JavaScript로 반영 가능하게 구성해, 실제 운영 기준의 퍼블리싱 개선 작업으로 마무리했습니다.`,
    imageSrc: "/portfolio/moumouteofficial.com.png",
    imageAlt: "MOUMOUTE 공식몰 메인 및 상품 상세 화면",
    links: [
      { label: "공식몰 메인", url: "https://moumouteofficial.com" },
      {
        label: "브랜드 소개",
        url: "https://moumouteofficial.com/shopinfo/about.html?cate_no=45",
      },
    ],
    videos: [
      {
        title: "데스크탑 줌 데모",
        src: "/portfolio/desktop-zoom.mp4",
        mimeType: "video/mp4",
        layout: "desktop",
        description: "상품 상세에서 렌즈형 확대 UI가 동작하는 실제 데스크탑 화면입니다.",
      },
      {
        title: "모바일 줌 데모",
        src: "/portfolio/mobile-zoom.mp4",
        mimeType: "video/mp4",
        layout: "mobile",
        description: "모바일에서 토글 기반 줌 UX가 작동하는 실제 테스트 화면입니다.",
      },
    ],
  },
];
