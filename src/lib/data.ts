export type PortfolioItem = {
  id: string;
  title: string;
  category: "local" | "advanced" | "automation";
  summary: string;
  client: string;
  duration: string;
  techStack: string[];
  description: string;
  imageColor: string; // Placeholder for image
};

export const portfolioData: PortfolioItem[] = [
  {
    id: "project-1",
    title: "제천 새영동 숯불갈비 (진행중)",
    category: "local",
    summary: "네이버 지도/쿠폰 연동 및 지역 맛집 브랜딩 (제작 중)",
    client: "새영동 숯불갈비",
    duration: "2025.02 - 진행중",
    techStack: ["Next.js", "Naver Place", "SEO"],
    description: `제천의 전통 있는 맛집 '새영동 숯불갈비'의 온라인 브랜딩 프로젝트입니다.
현재 웹사이트 기획 및 디자인 단계에 있으며, 네이버 스마트플레이스와 연동하여 예약과 쿠폰 사용을 원활하게 만드는 것을 목표로 하고 있습니다.
지역 맛집 검색 시 상위 노출을 위한 SEO 최적화 작업도 함께 진행 중입니다.`,
    imageColor: "bg-orange-100",
  },
  {
    id: "project-2",
    title: "제천 남여 헬스장 (진행중)",
    category: "local",
    summary: "회원권 안내 및 PT 상담 예약 페이지 (제작 중)",
    client: "제천 남여 헬스장",
    duration: "2025.02 - 진행중",
    techStack: ["React", "Booking System", "Mobile First"],
    description: `제천에 위치한 헬스 기구 맛집 헬스장의 홍보  웹사이트입니다.    
시설 소개를 모바일 보기 쉽게 구성하고, 카카오톡 채널과 연동하여 간편하게 상담 문의를 남길 수 있는 기능을 구축하고 있습니다.
운영 시간, 새로운 기구 안내와 주차 정보 등 고객이 자주 묻는 정보를 효과적으로 전달할 예정입니다.`,
    imageColor: "bg-blue-100",
  },
];
