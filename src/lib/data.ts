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
    title: "성수동 카페 '모먼트' 공식 웹사이트",
    category: "local",
    summary: "네이버 예약 연동 및 감성적인 갤러리를 갖춘 카페 홈페이지",
    client: "카페 모먼트",
    duration: "2024.12 - 2025.01 (4주)",
    techStack: ["Next.js", "TailwindCSS", "Framer Motion"],
    description: `성수동에 위치한 감성 카페 '모먼트'의 브랜드 아이덴티티를 담은 공식 웹사이트입니다.
    
인스타그램만으로는 전달하기 어려웠던 공간의 분위기와 상세한 메뉴 정보를 효과적으로 전달하기 위해 제작되었습니다.
고해상도 이미지를 활용한 갤러리와 모바일 친화적인 메뉴판 디자인을 적용하였으며, 네이버 예약 시스템을 연동하여 고객 편의성을 높였습니다. 
오픈 후 한 달 만에 예약률이 20% 증가하는 성과를 거두었습니다.`,
    imageColor: "bg-orange-100",
  },
  {
    id: "project-2",
    title: "법무법인 '정의' 사내 인트라넷",
    category: "advanced",
    summary: "사건 관리 및 일정 공유를 위한 맞춤형 인트라넷 시스템",
    client: "법무법인 정의",
    duration: "2024.09 - 2024.12 (3개월)",
    techStack: ["React", "Supabase", "TypeScript", "Vercel"],
    description: `변호사 20명 규모의 법무법인 '정의'를 위한 사내 업무 관리 시스템입니다.
    
기존 엑셀로 관리되던 사건 정보와 의뢰인 데이터를 데이터베이스화하여 검색 및 관리 효율을 극대화했습니다.
중요 일정 알림 기능, 문서 버전 관리, 팀별 권한 설정 등 법무 업무에 특화된 기능을 구현하였습니다. 
도입 후 업무 공유 시간이 일평균 1시간 이상 단축되었습니다.`,
    imageColor: "bg-blue-100",
  },
  {
    id: "project-3",
    title: "쇼핑몰 재고/발주 자동화 솔루션",
    category: "automation",
    summary: "여러 도매처의 발주 데이터를 통합하고 재고 변동을 자동 추적",
    client: "(주)패션트렌드",
    duration: "2025.01 - 2025.01 (2주)",
    techStack: ["Python", "Selenium", "Google Sheets API", "Slack API"],
    description: `매일 아침 2시간씩 걸리던 재고 확인 및 발주 업무를 자동화한 프로젝트입니다.
    
각기 다른 도매처 사이트에 자동으로 로그인하여 주문 내역과 재고 현황을 크롤링하고, 이를 구글 스프레드시트에 통합 정리합니다.
재고 부족 시 슬랙(Slack)으로 즉시 알림을 보내 품절로 인한 손실을 방지하도록 설계되었습니다.
현재 담당자는 매일 10분 정도의 모니터링만으로 업무를 처리하고 있습니다.`,
    imageColor: "bg-green-100",
  },
];
