export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  image: string;
  specs: string[];
  featured?: boolean;
};

export type News = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  publishedAt: string;
  featured?: boolean;
};

export type Inquiry = {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: "new" | "in_progress" | "done";
  createdAt: string;
};

export const products: Product[] = [
  {
    id: "p-1",
    name: "HKS-201 산업 세정 솔루션",
    slug: "hks-201-cleaning-solution",
    category: "산업소재",
    shortDescription: "생산 라인 내 잔류물 제거에 최적화된 고순도 세정 솔루션",
    description:
      "HKS-201은 정밀 부품과 민감 소재 라인에서 안정적으로 사용 가능한 산업 세정 솔루션입니다. 저휘발성 설계로 작업 환경을 개선하고, 반복 공정에서 품질 편차를 줄이는 데 도움을 줍니다.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d",
    specs: ["고순도 원료", "저휘발성 설계", "금속/세라믹 라인 호환"],
    featured: true,
  },
  {
    id: "p-2",
    name: "NanoShield-X 코팅제",
    slug: "nanoshield-x-coating",
    category: "표면처리",
    shortDescription: "내구성과 발수 성능을 동시에 확보한 고성능 표면 코팅제",
    description:
      "NanoShield-X는 산업용 부품 표면에 균일한 보호막을 형성해 내구성을 향상시킵니다. 다양한 환경에서 코팅 지속 성능이 우수하며, 유지보수 주기를 줄여 운영 효율 개선에 기여합니다.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837",
    specs: ["고내구성 코팅", "발수/오염 방지", "대면적 공정 적용 가능"],
    featured: true,
  },
  {
    id: "p-3",
    name: "ThermoFlux-55 열전달 유체",
    slug: "thermoflux-55-fluid",
    category: "열관리",
    shortDescription: "고온 환경에서도 점도 안정성이 뛰어난 열전달 유체",
    description:
      "ThermoFlux-55는 장시간 고온 공정에서도 점도 변화가 적어 일관된 열관리 성능을 제공합니다. 설비 보호와 에너지 효율 개선을 동시에 고려한 제품입니다.",
    image:
      "https://images.unsplash.com/photo-1474674556023-efef886fa147",
    specs: ["고온 안정성", "낮은 점도 변화", "설비 보호 특화"],
  },
];

export const newsList: News[] = [
  {
    id: "n-1",
    title: "신규 생산라인 증설 및 자동화 설비 도입",
    slug: "new-production-line-announcement",
    summary: "생산 안정성과 납기 대응력을 높이기 위한 라인 증설을 완료했습니다.",
    content:
      "당사는 주요 제품군의 수요 확대에 대응하기 위해 신규 생산라인 증설과 자동화 설비 고도화를 완료했습니다. 이를 통해 납기 안정성과 제품 품질의 일관성을 한층 강화했습니다.",
    publishedAt: "2026-03-10",
    featured: true,
  },
  {
    id: "n-2",
    title: "친환경 공정 전환 로드맵 공개",
    slug: "eco-process-roadmap",
    summary: "친환경 원료 사용 비중 확대와 공정 효율 개선 계획을 발표했습니다.",
    content:
      "친환경 원료 전환과 에너지 효율 개선을 중심으로 한 3개년 로드맵을 공개했습니다. 생산성과 지속가능성을 함께 달성하는 것을 목표로 단계별 실행을 추진합니다.",
    publishedAt: "2026-02-18",
  },
  {
    id: "n-3",
    title: "국내 기술전시회 참가 및 신제품 공개",
    slug: "tech-expo-new-product",
    summary: "차세대 표면처리 솔루션 시제품을 전시회에서 선보였습니다.",
    content:
      "국내 기술전시회에서 차세대 표면처리 솔루션을 공개했습니다. 현장 피드백을 바탕으로 실제 산업 적용 가능성을 검증하고 상용화 일정을 앞당길 계획입니다.",
    publishedAt: "2026-01-27",
  },
];

export const milestones = [
  { year: "2016", text: "법인 설립 및 핵심 소재 연구소 출범" },
  { year: "2019", text: "주요 산업군 대상 대량 공급 체계 구축" },
  { year: "2023", text: "품질 인증 체계 고도화 및 해외 시장 진출" },
  { year: "2026", text: "신규 생산라인 증설 및 디지털 운영 전환" },
];

export const companyStats = [
  { label: "누적 프로젝트", value: "430+" },
  { label: "협력 파트너", value: "120+" },
  { label: "평균 납기 단축", value: "18%" },
  { label: "품질 승인율", value: "99.2%" },
];
