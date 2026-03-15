export type ScaleKey = "stress" | "resilience" | "stability";

export type CutoffRule = {
  min: number;
  label: string;
};

export type ScaleTableRow = {
  key: ScaleKey;
  name: string;
  expectedPercent: number;
  higherIsRisk: boolean;
  riskWeight: number;
  cutoffs: CutoffRule[];
};

export type QuestionTableRow = {
  id: string;
  order: number;
  text: string;
};

export type QuestionScaleMapRow = {
  questionId: string;
  scaleKey: ScaleKey;
  reverseScored: boolean;
  itemWeight: number;
};

export const SCALE_TABLE: ScaleTableRow[] = [
  {
    key: "stress",
    name: "스트레스",
    expectedPercent: 55,
    higherIsRisk: true,
    riskWeight: 0.5,
    cutoffs: [
      { min: 70, label: "위험 신호 높음" },
      { min: 40, label: "중간 범위" },
      { min: 0, label: "낮은 위험" },
    ],
  },
  {
    key: "resilience",
    name: "회복탄력성",
    expectedPercent: 60,
    higherIsRisk: false,
    riskWeight: 0.25,
    cutoffs: [
      { min: 70, label: "강점 구간" },
      { min: 40, label: "보통 구간" },
      { min: 0, label: "보완 필요" },
    ],
  },
  {
    key: "stability",
    name: "정서안정성",
    expectedPercent: 62,
    higherIsRisk: false,
    riskWeight: 0.25,
    cutoffs: [
      { min: 70, label: "강점 구간" },
      { min: 40, label: "보통 구간" },
      { min: 0, label: "보완 필요" },
    ],
  },
];

export const QUESTION_TABLE: QuestionTableRow[] = [
  { id: "q1", order: 1, text: "최근 2주간 감정 기복으로 일상 집중이 어려웠다." },
  { id: "q2", order: 2, text: "스트레스 상황에서도 비교적 평정심을 유지했다." },
  { id: "q3", order: 3, text: "의사결정 시 불안으로 선택을 미루는 경우가 많았다." },
  { id: "q4", order: 4, text: "피로감이 있어도 스스로 회복할 수 있다고 느꼈다." },
  { id: "q5", order: 5, text: "실패 후 다시 시도하기까지 오래 걸렸다." },
  { id: "q6", order: 6, text: "주변 도움을 요청해 문제를 풀어내는 편이다." },
  { id: "q7", order: 7, text: "사소한 자극에도 기분이 오래 흔들린다." },
  { id: "q8", order: 8, text: "하루 중 감정 변화 폭이 비교적 일정하다." },
  { id: "q9", order: 9, text: "긴장이 생겨도 스스로 진정시키는 편이다." },
];

export const QUESTION_SCALE_MAP: QuestionScaleMapRow[] = [
  { questionId: "q1", scaleKey: "stress", reverseScored: false, itemWeight: 1 },
  { questionId: "q2", scaleKey: "stress", reverseScored: true, itemWeight: 1.2 },
  { questionId: "q3", scaleKey: "stress", reverseScored: false, itemWeight: 0.8 },
  { questionId: "q4", scaleKey: "resilience", reverseScored: false, itemWeight: 1 },
  { questionId: "q5", scaleKey: "resilience", reverseScored: true, itemWeight: 1 },
  { questionId: "q6", scaleKey: "resilience", reverseScored: false, itemWeight: 1.1 },
  { questionId: "q7", scaleKey: "stability", reverseScored: true, itemWeight: 1.1 },
  { questionId: "q8", scaleKey: "stability", reverseScored: false, itemWeight: 0.9 },
  { questionId: "q9", scaleKey: "stability", reverseScored: false, itemWeight: 1 },
];

export const RISK_INDEX_CUTOFFS: CutoffRule[] = [
  { min: 70, label: "고위험" },
  { min: 40, label: "주의" },
  { min: 0, label: "안정" },
];
