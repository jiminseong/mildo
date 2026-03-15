export type PracticeArea = {
  slug: string;
  name: string;
  summary: string;
  risks: string[];
  steps: string[];
  faq: { q: string; a: string }[];
};

export type CaseItem = {
  slug: string;
  title: string;
  category: "성범죄" | "마약";
  resultTag: "불송치" | "집행유예" | "무혐의" | "약식명령";
  summary: string;
  detail: string;
  strategy: string;
  lawyer: string;
  lawyerId: string;
  publishedAt: string;
};

export type LawyerProfile = {
  id: string;
  name: string;
  role: string;
  focus: string;
  image: string;
};

export const officeInfo = {
  name: "법무법인 한결",
  phone: "02-1234-5678",
  hours: "24시 긴급 상담",
  address: "서울시 예시구 샘플로 123, 한결빌딩 5층",
  branches: ["예시권역A", "예시권역B", "예시권역C", "예시권역D", "예시권역E"],
};

export const lawyerProfiles: LawyerProfile[] = [
  {
    id: "yoo",
    name: "김아무개",
    role: "대표변호사",
    focus: "성범죄·마약 사건 총괄",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: "park",
    name: "홍길동",
    role: "파트너 변호사",
    focus: "수사단계 대응/공판",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    id: "cho",
    name: "이아무개",
    role: "파트너 변호사",
    focus: "디지털 증거 분석",
    image: "https://randomuser.me/api/portraits/men/31.jpg",
  },
  {
    id: "kim",
    name: "최아무개",
    role: "변호사",
    focus: "포렌식·증거 분석",
    image: "https://randomuser.me/api/portraits/men/47.jpg",
  },
];

export const practiceAreas: PracticeArea[] = [
  {
    slug: "sexual-crime",
    name: "성범죄",
    summary: "초기 진술 단계부터 디지털 포렌식, 피해자 진술 신빙성 검토까지 선제 대응합니다.",
    risks: [
      "초기 진술 불일치로 불리한 프레임이 고착될 위험",
      "휴대폰·메신저 자료의 맥락이 왜곡되어 제출될 위험",
      "구속영장 청구 전 방어 논리 정리가 늦어지는 위험",
    ],
    steps: [
      "초기 상담에서 사실관계 타임라인 정리",
      "수사기관 진술 전략 수립 및 증거 확보",
      "공판 대응과 양형자료 구성",
      "판결 후 항소 여부 및 사후 리스크 관리",
    ],
    faq: [
      {
        q: "상대방과 합의하면 사건이 바로 종결되나요?",
        a: "사건 성격에 따라 수사는 계속될 수 있으며, 합의는 양형 요소로 작용합니다.",
      },
      {
        q: "첫 조사 전에 무엇을 준비해야 하나요?",
        a: "연락 내역, 동선, 금전 거래 내역 등 사실관계를 객관적으로 입증할 자료를 정리해야 합니다.",
      },
    ],
  },
  {
    slug: "drug-crime",
    name: "마약",
    summary: "초범/재범 여부, 투약 경위, 유통 연루 여부를 분리해 사건의 무게를 정확히 낮춥니다.",
    risks: [
      "단순 투약 사건이 유통 사건으로 확대 해석될 위험",
      "압수수색 절차의 위법성을 놓치는 위험",
      "치료 의지 및 재범 방지 계획 미제출 위험",
    ],
    steps: [
      "압수물 및 수사기록 분석",
      "투약/소지/매매 혐의 범위 구분",
      "치료 프로그램 연계 및 양형자료 구축",
      "재범방지 중심의 판결 후 관리",
    ],
    faq: [
      {
        q: "초범인데도 실형 가능성이 있나요?",
        a: "범행 횟수, 연루 범위, 증거 상황에 따라 달라지며 초기 대응이 매우 중요합니다.",
      },
      {
        q: "치료 의지가 판결에 반영되나요?",
        a: "치료 의지와 실제 프로그램 참여는 재범 가능성 판단에 중요한 요소가 됩니다.",
      },
    ],
  },
];

export const cases: CaseItem[] = [
  {
    slug: "case-juvenile-suspended",
    title: "미성년자 강간 및 촬영물 협박 혐의, 집행유예 선고 사례",
    category: "성범죄",
    resultTag: "집행유예",
    summary: "수사 초기부터 관계 경위와 대화 맥락을 정리해 중형 가능성을 낮춘 사건입니다.",
    detail:
      "의뢰인은 교제 중 발생한 사건으로 강간 및 촬영물 협박 혐의를 받았고, 초기 조사에서 불리한 진술이 누적된 상태였습니다.",
    strategy:
      "시간대별 진술 모순을 정리하고 디지털 자료의 맥락을 복원해 고의성 판단을 낮추는 데 집중했습니다.",
    lawyer: "홍길동 변호사",
    lawyerId: "park",
    publishedAt: "2026-02-26",
  },
  {
    slug: "case-not-prosecuted-subway",
    title: "지하철 촬영 혐의 사건, 증거 분석으로 불송치",
    category: "성범죄",
    resultTag: "불송치",
    summary: "촬영 의도 부재와 증거 해석 오류를 소명해 혐의없음으로 종결했습니다.",
    detail:
      "공공장소 촬영 행위가 문제 된 사건으로, 피의자 의도와 촬영 대상 식별 여부가 핵심 쟁점이었습니다.",
    strategy:
      "원본 파일 메타데이터와 현장 동선을 비교해 혐의 성립 요건을 충족하지 않는 점을 강조했습니다.",
    lawyer: "이아무개 변호사",
    lawyerId: "cho",
    publishedAt: "2026-01-17",
  },
  {
    slug: "case-drug-summary-order",
    title: "불법촬영물 구매·소지 병합 사건, 벌금형 약식명령",
    category: "마약",
    resultTag: "약식명령",
    summary: "초기 인정 범위 조정과 재범 방지 계획 제출로 사건을 조기 마무리했습니다.",
    detail:
      "의뢰인은 복합 혐의로 기소 가능성이 높았고, 생활 기반 붕괴로 장기 재판이 어려운 상황이었습니다.",
    strategy:
      "혐의 범위를 정밀하게 구분하고 치료 의지를 입증해 재판 장기화를 막는 방향으로 대응했습니다.",
    lawyer: "최아무개 변호사",
    lawyerId: "kim",
    publishedAt: "2026-01-05",
  },
  {
    slug: "case-drug-no-charge",
    title: "마약 소지 혐의 사건, 무혐의 처분 사례",
    category: "마약",
    resultTag: "무혐의",
    summary: "소지 인식 여부와 압수 경위의 위법성을 다퉈 혐의없음 결론을 이끌어냈습니다.",
    detail: "압수수색 과정과 증거 채취 절차의 적법성이 주요 쟁점이 된 사건입니다.",
    strategy: "절차적 하자를 집중 검토하고 포렌식 보고서 해석 오류를 반박했습니다.",
    lawyer: "김아무개 대표변호사",
    lawyerId: "yoo",
    publishedAt: "2025-12-19",
  },
];

export function getPracticeBySlug(slug: string) {
  return practiceAreas.find((item) => item.slug === slug);
}

export function getCaseBySlug(slug: string) {
  return cases.find((item) => item.slug === slug);
}

export function getLawyerById(id: string) {
  return lawyerProfiles.find((item) => item.id === id);
}
