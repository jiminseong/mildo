export const ACCESS_CODES = ["DEMO-2401", "CLASS-5142", "LAB-0321"];

export const STEP_ITEMS = [
  { id: 1, title: "입장 확인", caption: "이름 / 접속코드" },
  { id: 2, title: "개인정보 입력", caption: "약관 / 발명가 번호" },
  { id: 3, title: "안내 보기", caption: "튜토리얼 / 진행 방식" },
  { id: 4, title: "진단 분기", caption: "아이디어 유무 / 트랙" },
  { id: 5, title: "초안 작성", caption: "문제 / 대상 / 아이디어" },
  { id: 6, title: "카드 탐색", caption: "과학 / 기술 / 발명" },
  { id: 7, title: "중간 제출", caption: "1차 결과물 제출" },
  { id: 8, title: "1차 심사", caption: "운영진 검토 대기" },
  { id: 9, title: "해결안 정리", caption: "스토리보드 / 절차" },
  { id: 10, title: "자료 첨부", caption: "이미지 / 메모" },
  { id: 11, title: "최종 제출", caption: "발표 문구 / 기대 효과" },
  { id: 12, title: "마무리 퀴즈", caption: "학습 정리" },
  { id: 13, title: "완료", caption: "결과 / 요약" },
] as const;

export const REGION_OPTIONS = ["서울", "경기", "인천", "강원", "충청", "전라", "경상", "제주"];

export const GRADE_OPTIONS = ["중1", "중2", "중3", "고1", "고2", "고3"];

export const CARD_GROUPS = [
  {
    key: "science",
    title: "과학 원리 카드",
    subtitle: "현상과 원리를 연결해 문제를 이해",
    accent: "bg-[#dfe9f3] text-[#234861]",
    items: [
      {
        label: "압력 분산",
        description: "하중을 고르게 나누어 파손이나 피로를 방지합니다.",
        iconName: "Layers",
      },
      {
        label: "빛 반사",
        description: "빛의 경로를 바꾸어 가시성을 확보하거나 에너지를 모읍니다.",
        iconName: "Sun",
      },
      {
        label: "온도 유지",
        description: "열 출입을 차단하여 일정한 온도를 유지하도록 돕습니다.",
        iconName: "Thermometer",
      },
      {
        label: "진동 흡수",
        description: "충격이나 흔들림, 소음을 완화하여 안정성을 높입니다.",
        iconName: "Activity",
      },
      {
        label: "공기 흐름 제어",
        description: "공기의 방향이나 속도를 조절하여 효율을 높입니다.",
        iconName: "Wind",
      },
      {
        label: "수분 차단",
        description: "습기나 액체의 침투를 막아 제품을 보호합니다.",
        iconName: "Droplets",
      },
    ],
  },
  {
    key: "tech",
    title: "기술 요소 카드",
    subtitle: "구현 방식과 구조를 상상",
    accent: "bg-[#efe1ec] text-[#5f3352]",
    items: [
      {
        label: "접이식 구조",
        description: "공간 활용도를 극대화하는 가변형 설계를 적용합니다.",
        iconName: "Maximize2",
      },
      {
        label: "모듈 교체",
        description: "필요한 부분만 쉽게 갈아 끼울 수 있는 조립 방식입니다.",
        iconName: "Grid",
      },
      {
        label: "센서 알림",
        description: "주변의 변화를 감지하고 실시간으로 상황을 알립니다.",
        iconName: "Bell",
      },
      {
        label: "자석 결합",
        description: "자력을 이용해 탈부착이 자유롭고 견고하게 연결합니다.",
        iconName: "Magnet",
      },
      {
        label: "방수 재질",
        description: "물이 스며들지 않는 특수 소재로 내구성을 강화합니다.",
        iconName: "ShieldCheck",
      },
      {
        label: "저전력 회로",
        description: "에너지 소모를 최소화하여 장시간 사용이 가능하게 합니다.",
        iconName: "BatteryLow",
      },
    ],
  },
  {
    key: "invention",
    title: "발명 원리 카드",
    subtitle: "기존 해결 방식을 뒤집어 보기",
    accent: "bg-[#e3ecdf] text-[#355036]",
    items: [
      {
        label: "합치기",
        description: "서로 다른 기능이나 물건을 하나로 통합해 시너지를 냅니다.",
        iconName: "Combine",
      },
      {
        label: "분리하기",
        description: "불필요한 부분을 떼어내거나 핵심 요소를 독립시킵니다.",
        iconName: "Scissors",
      },
      {
        label: "방향 바꾸기",
        description: "위아래, 안팎 등 기존의 방향을 뒤집어 생각합니다.",
        iconName: "RotateCcw",
      },
      {
        label: "중간 매개 넣기",
        description: "직접 연결 대신 전달 도구를 추가해 효율을 높입니다.",
        iconName: "Link",
      },
      {
        label: "자동화하기",
        description: "사람의 개입 없이 스스로 작동하도록 시스템을 구축합니다.",
        iconName: "Cpu",
      },
      {
        label: "미리 대비하기",
        description: "문제가 발생하기 전에 미리 보완책을 마련해 둡니다.",
        iconName: "Construction",
      },
    ],
  },
  {
    key: "question",
    title: "해결 질문 카드",
    subtitle: "더 구체적인 설계를 위한 질문",
    accent: "bg-[#f5ead9] text-[#754d1f]",
    items: [
      {
        label: "누가 가장 자주 불편을 겪는가?",
        description: "사용자 타겟을 더 좁혀서 핵심 페인 포인트를 찾습니다.",
        iconName: "UserSearch",
      },
      {
        label: "언제 가장 문제를 크게 느끼는가?",
        description: "해결책이 가장 절실한 특정 상황을 정의합니다.",
        iconName: "Clock",
      },
      {
        label: "기존 방식의 가장 큰 허점은 무엇인가?",
        description: "현재 해결책들이 놓치고 있는 빈틈을 공략합니다.",
        iconName: "SearchCode",
      },
      {
        label: "한 번에 하나만 개선한다면?",
        description: "가장 임팩트가 큰 핵심 기능 한 가지에 집중합니다.",
        iconName: "Target",
      },
      {
        label: "가장 비싼 부분은 어디인가?",
        description: "제작 비용을 줄이거나 효율을 높일 지점을 찾습니다.",
        iconName: "Coins",
      },
      {
        label: "안전성은 어떻게 확보할 것인가?",
        description: "실제 사용 시 발생할 수 있는 위험 요소를 점검합니다.",
        iconName: "ShieldAlert",
      },
    ],
  },
] as const;

export const MOCK_PEER_IDEAS = [
  {
    id: "peer-0142",
    inventorNumber: "발명가 0142",
    title: "학교 복도 소음 줄이는 이동식 흡음 보드",
    summary: "쉬는 시간 복도 소음을 줄이기 위해 이동형 패널을 세우는 아이디어",
    problem: "학급 이동 시간이 겹치면 복도 소음이 커져 수업 집중이 깨진다.",
    solution: "가볍고 접을 수 있는 흡음 보드를 필요한 위치에 세워 일시적으로 소음을 흡수한다.",
    level: 2,
    tags: ["진동 흡수", "접이식 구조", "미리 대비하기"],
    feedback: [
      {
        id: "feedback-peer-0142-1",
        author: "발명가 0871",
        content: "복도에서 자주 부딪히지 않도록 접었을 때 두께도 얇아야 할 것 같아요.",
        createdAt: "03/14 11:12",
      },
      {
        id: "feedback-peer-0142-2",
        author: "발명가 1053",
        content: "흡음 보드가 무거우면 학생이 옮기기 어렵지 않을까요?",
        createdAt: "03/14 11:35",
      },
    ],
  },
  {
    id: "peer-0267",
    inventorNumber: "발명가 0267",
    title: "필통 분실 방지용 스마트 태그 케이스",
    summary: "필통이 책상에서 멀어지면 알림을 주는 학생용 필통 케이스",
    problem: "교실 이동이나 자율학습 후 필통을 두고 가는 일이 자주 발생한다.",
    solution: "저전력 태그와 고리 구조를 결합한 필통 케이스로 분실 가능성을 줄인다.",
    level: 1,
    tags: ["센서 알림", "자석 결합", "누가 가장 자주 불편한가"],
    feedback: [
      {
        id: "feedback-peer-0267-1",
        author: "발명가 0411",
        content: "스마트폰이 없는 학생도 쓸 수 있도록 알림 방식이 단순해야 할 것 같아요.",
        createdAt: "03/14 12:05",
      },
    ],
  },
  {
    id: "peer-0321",
    inventorNumber: "발명가 0321",
    title: "비 오는 날 젖지 않는 우산 보관 장치",
    summary: "교실 입구에서 우산 물기를 빠르게 정리하는 보관 구조",
    problem: "비 오는 날 교실 바닥이 젖어 미끄럽고 정리가 잘 되지 않는다.",
    solution: "빗물 분리 수납과 접이식 건조판을 포함한 우산 보관 장치를 둔다.",
    level: 3,
    tags: ["수분 차단", "분리하기", "유지보수"],
    feedback: [
      {
        id: "feedback-peer-0321-1",
        author: "발명가 0774",
        content: "빗물이 모이는 부분을 학생이 쉽게 비울 수 있어야 운영이 편할 것 같아요.",
        createdAt: "03/14 14:26",
      },
    ],
  },
];

export const RECEIVED_FEEDBACK_SEED = [
  {
    id: "inbox-1",
    author: "발명가 0417",
    content: "이 아이디어가 가장 필요해지는 구체적인 순간을 한 문장으로 설명해 주세요.",
    createdAt: "03/14 13:10",
  },
  {
    id: "inbox-2",
    author: "발명가 0638",
    content: "기존 방법과 비교했을 때 어떤 점이 더 편하거나 안전한지 명확히 적어보면 좋겠어요.",
    createdAt: "03/14 13:42",
  },
];

export const QUIZ_QUESTIONS = [
  {
    id: "quiz-1",
    question: "익명 게시판에서 실명 대신 발명가 번호를 쓰는 가장 중요한 이유는 무엇인가요?",
    options: [
      "속도를 높이기 위해",
      "익명 공유와 실제 사용자 정보를 분리하기 위해",
      "코드를 짧게 만들기 위해",
    ],
    answerIndex: 1,
  },
  {
    id: "quiz-2",
    question: "관리자 승인이 필요한 단계의 목적에 가장 가까운 것은 무엇인가요?",
    options: [
      "학생을 지연시키기 위해",
      "아이디어 품질과 진행 기준을 맞추기 위해",
      "학생 간 경쟁을 유도하기 위해",
    ],
    answerIndex: 1,
  },
  {
    id: "quiz-3",
    question: "카드 기반 워크숍의 장점으로 가장 적절한 것은 무엇인가요?",
    options: [
      "정답을 바로 제공한다",
      "문제를 다른 관점에서 보게 도와준다",
      "관리자 입력을 줄여준다",
    ],
    answerIndex: 1,
  },
];

export const MOCK_ADMIN_STUDENTS = [
  {
    inventorNumber: "발명가 0142",
    stage: "1차 검토",
    status: "승인 대기",
    note: "문제 정의가 명확해 운영자 검토 중",
  },
  {
    inventorNumber: "발명가 0267",
    stage: "초기 아이디어",
    status: "보완 요청",
    note: "실행 환경과 제약 조건을 더 적어야 함",
  },
  {
    inventorNumber: "발명가 0321",
    stage: "최종 제출",
    status: "승인 완료",
    note: "아웃트로/퀴즈 단계까지 이동 완료",
  },
];
