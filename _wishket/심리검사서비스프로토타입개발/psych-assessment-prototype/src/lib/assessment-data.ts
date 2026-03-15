import {
  QUESTION_SCALE_MAP,
  QUESTION_TABLE,
  RISK_INDEX_CUTOFFS,
  SCALE_TABLE,
  type CutoffRule,
  type ScaleKey,
} from "@/lib/scoring-config";

export type Question = {
  id: string;
  order: number;
  text: string;
};

export const questions: Question[] = QUESTION_TABLE;

export type ScaleScore = {
  key: ScaleKey;
  name: string;
  rawAverage: number;
  percent: number;
  expectedPercent: number;
  deltaFromExpected: number;
  interpretation: string;
};

export type RiskBand = "고위험" | "주의" | "안정";

export type ReportResult = {
  scaleScores: ScaleScore[];
  riskIndex: number;
  riskBand: RiskBand;
  summary: string;
};

function normalizeScore(value: number, reverseScored = false) {
  const clamped = Math.min(5, Math.max(1, value));
  return reverseScored ? 6 - clamped : clamped;
}

function toPercentFromLikert(averageScore: number) {
  return Math.round(((averageScore - 1) / 4) * 100 * 10) / 10;
}

function pickCutoffLabel(value: number, cutoffs: CutoffRule[]) {
  return cutoffs.find((rule) => value >= rule.min)?.label ?? cutoffs.at(-1)?.label ?? "미정";
}

function buildSummary(riskBand: RiskBand, scores: ScaleScore[]) {
  const weakest = [...scores].sort((a, b) => a.percent - b.percent)[0];
  const strongest = [...scores].sort((a, b) => b.percent - a.percent)[0];

  if (riskBand === "고위험") {
    return `${weakest.name} 영역 중심의 개입 우선순위 점검이 필요합니다.`;
  }
  if (riskBand === "주의") {
    return `${strongest.name} 강점을 유지하면서 ${weakest.name} 개선 계획을 병행하는 것을 권장합니다.`;
  }
  return `${strongest.name} 영역이 안정적으로 유지되고 있습니다. 현재 패턴 유지 전략이 유효합니다.`;
}

export function calculateReportResult(answers: Record<string, number>): ReportResult {
  const scaleScores = SCALE_TABLE.map((scale) => {
    const mappedRows = QUESTION_SCALE_MAP.filter((row) => row.scaleKey === scale.key);
    const weightedSum = mappedRows.reduce((sum, row) => {
      const value = answers[row.questionId] ?? 3;
      const normalized = normalizeScore(value, row.reverseScored);
      return sum + normalized * row.itemWeight;
    }, 0);
    const totalWeight = mappedRows.reduce((sum, row) => sum + row.itemWeight, 0);
    const rawAverage = totalWeight > 0 ? weightedSum / totalWeight : 3;
    const percent = toPercentFromLikert(rawAverage);
    const deltaFromExpected = Math.round((percent - scale.expectedPercent) * 10) / 10;

    return {
      key: scale.key,
      name: scale.name,
      rawAverage: Math.round(rawAverage * 100) / 100,
      percent,
      expectedPercent: scale.expectedPercent,
      deltaFromExpected,
      interpretation: pickCutoffLabel(percent, scale.cutoffs),
    } satisfies ScaleScore;
  });

  const stressScore = scaleScores.find((score) => score.key === "stress")?.percent ?? 50;
  const resilienceScore = scaleScores.find((score) => score.key === "resilience")?.percent ?? 50;
  const stabilityScore = scaleScores.find((score) => score.key === "stability")?.percent ?? 50;

  const riskConfig = {
    stressWeight: SCALE_TABLE.find((scale) => scale.key === "stress")?.riskWeight ?? 0.5,
    resilienceWeight: SCALE_TABLE.find((scale) => scale.key === "resilience")?.riskWeight ?? 0.25,
    stabilityWeight: SCALE_TABLE.find((scale) => scale.key === "stability")?.riskWeight ?? 0.25,
  };

  const riskIndex =
    Math.round(
      (stressScore * riskConfig.stressWeight +
        (100 - resilienceScore) * riskConfig.resilienceWeight +
        (100 - stabilityScore) * riskConfig.stabilityWeight) *
        10,
    ) / 10;

  const riskBand = pickCutoffLabel(riskIndex, RISK_INDEX_CUTOFFS) as RiskBand;

  return {
    scaleScores,
    riskIndex,
    riskBand,
    summary: buildSummary(riskBand, scaleScores),
  };
}
