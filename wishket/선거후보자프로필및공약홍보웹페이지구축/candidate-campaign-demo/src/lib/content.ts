export type AccentTone = "blue" | "red";

export const siteContent = {
  meta: {
    title: "기호 00 홍길동 | 충남 서산시장 후보",
    description:
      "충남 서산시장 후보 홍길동의 프로필, 핵심 공약, 주요 이력, 공식 연락 채널을 한눈에 확인할 수 있는 캠페인 랜딩 페이지",
  },
  candidate: {
    label: "충남 서산시장 후보",
    party: "새길당",
    number: "기호 00",
    name: "홍길동",
    office: "서산시장 후보",
    slogan: "산업도시 서산의 속도, 생활도시 서산의 체감",
    intro: "전 서산시 부시장 · 전 충남도 재정기획관",
    summary: "대산·성연 산업축, 읍면 생활권, 농어업과 돌봄까지 서산의 핵심 과제를 바로 집행할 준비가 된 후보",
    keywords: ["산업·교통", "농어촌 생활권", "돌봄·안전"],
    quickStats: [
      { label: "출생", value: "19XX년 서산 출생" },
      { label: "학력", value: "국립한서대 행정학 박사" },
      { label: "대표 경력", value: "전 서산시 부시장 · 시의원 0선" },
    ],
    keyMessage: {
      title: "서산의 산업 경쟁력과 생활 체감을 동시에 바꾸겠습니다",
    },
  },
  promises: [
    {
      accent: "blue" as const,
      category: "산업 · 교통",
      title: "대산·성연·도심 출퇴근 교통망 재정비",
      summary: "산업단지 출퇴근 시간을 줄이고 서산 도심과 읍면 생활권을 더 빠르게 연결하겠습니다.",
      details: [
        "대산·성연 산업축 급행 노선 확대",
        "도심-산단 야간 교통 공백 보완",
        "국도 29·38호선 연계 혼잡구간 개선",
      ],
    },
    {
      accent: "red" as const,
      category: "민생 · 농어업",
      title: "농어촌 생활권과 골목상권 회복 패키지",
      summary: "농어업 기반과 전통시장, 소상공인 상권이 함께 살아나는 서산형 민생정책을 추진하겠습니다.",
      details: [
        "로컬푸드·직거래 판로 확대",
        "읍면 생활SOC와 장보기 교통 지원",
        "골목상권 맞춤형 회복 예산 편성",
      ],
    },
    {
      accent: "blue" as const,
      category: "돌봄 · 안전",
      title: "아이 돌봄과 산업안전, 재난대응까지 강화",
      summary: "아이 키우는 가정과 산업도시 서산이 함께 안심할 수 있도록 생활 안전망을 촘촘히 만들겠습니다.",
      details: [
        "권역별 야간 돌봄 확대",
        "산단 주변 생활환경 점검 체계 상시화",
        "침수·재난 대응 현장 상황실 운영",
      ],
    },
  ],
  profile: {
    biography: [
      "대산·성연 산업축과 서산 도심을 함께 이해하는 행정 실무형 후보",
      "예산과 조직을 다뤄본 경험을 바탕으로 속도 있는 집행을 강조하는 정치인",
      "읍면 지역과 도심 생활권의 격차를 줄이는 생활밀착형 시정 방향 제시",
    ],
    timeline: [
      { year: "20XX", title: "충남도 정책기획팀", description: "산업·재정 분야 실무 경력 시작" },
      { year: "20XX", title: "서산시 교통행정과장", description: "도심 혼잡구간과 생활권 교통 대책 총괄" },
      { year: "20XX", title: "서산시 부시장", description: "산단·복지·재난 대응 행정 전반 조정" },
    ],
  },
  channels: [
    { label: "전화 문의", value: "000-0000-0000", href: "tel:00000000000" },
    { label: "카카오채널", value: "홍길동 서산캠프", href: "#" },
    { label: "선거사무소", value: "충남 서산시 000로 00, 0층", href: "#" },
  ],
  footer: {
    notice: "서산 지역 이슈를 기준으로 구성한 후보 홍보 시안입니다.",
  },
};
