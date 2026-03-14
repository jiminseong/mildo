import { STEP_ITEMS } from "../demo-data";

export type ViewMode = "student" | "admin";
export type CardGroupKey = "science" | "tech" | "invention" | "question";
export type GateStatus = "idle" | "pending" | "approved" | "changes";
export type IdeaLevel = 1 | 2 | 3;
export type StepId = (typeof STEP_ITEMS)[number]["id"];

export type FeedbackReply = {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  response: string;
};
export type PeerFeedback = { id: string; author: string; content: string; createdAt: string };
export type PeerIdea = {
  id: string;
  inventorNumber: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  level: IdeaLevel;
  tags: string[];
  feedback: PeerFeedback[];
};

export type DemoState = {
  student: {
    name: string;
    accessCode: string;
    gender: string;
    birthYear: string;
    grade: string;
    school: string;
    region: string;
    parentContact: string;
    agreed: boolean;
    inventorNumber: string;
  };
  sessionVerified: boolean;
  profileSubmitted: boolean;
  introProgress: number;
  introCompleted: boolean;
  diagnosisSubmitted: boolean;
  diagnosis: {
    hasIdea: "" | "yes" | "no";
    theme: string;
    challenge: string;
    preferredTrack: string;
  };
  ideaSeedSubmitted: boolean;
  cardWorkshopSubmitted: boolean;
  feedbackReflectionSubmitted: boolean;
  structureSubmitted: boolean;
  evidenceSubmitted: boolean;
  finalSubmitted: boolean;
  quizSubmitted: boolean;
  completed: boolean;
  gate1Status: GateStatus;
  gate1Note: string;
  gate2Status: GateStatus;
  gate2Note: string;
  sentFeedbackCount: number;
  peerIdeas: PeerIdea[];
  receivedFeedback: FeedbackReply[];
  idea: {
    title: string;
    summary: string;
    problem: string;
    audience: string;
    insight: string;
    selectedScience: string[];
    selectedTech: string[];
    selectedInvention: string[];
    selectedQuestion: string[];
    revisionMemo: string;
    refinedTitle: string;
    refinedSolution: string;
    storyboard: string;
    implementationPlan: string;
    evidenceNotes: string;
    evidenceImages: string[];
    finalPitch: string;
    finalBenefit: string;
    quizAnswers: Array<number | null>;
    quizScore: number | null;
  };
};

/* ─── Helpers ─── */
export function randomInventorNumber(name: string) {
  const seed = Math.abs(Array.from(name).reduce((sum, l) => sum + l.charCodeAt(0), 0));
  return `발명가 ${String((seed % 9000) + 1000).padStart(4, "0")}`;
}

export function statusLabel(status: GateStatus) {
  if (status === "pending") return "승인 대기";
  if (status === "approved") return "승인 완료";
  if (status === "changes") return "보완 요청";
  return "미제출";
}

export function gateTone(status: GateStatus) {
  if (status === "approved") return "bg-[#e6efe1] text-[#31513a]";
  if (status === "changes") return "bg-[#f8e2dc] text-[#7a4031]";
  if (status === "pending") return "bg-[#ece5d8] text-[#6e5b43]";
  return "bg-[#efebe2] text-[#756e66]";
}

export function getCurrentIdeaLevel(state: DemoState): IdeaLevel {
  if (state.finalSubmitted || state.gate2Status === "pending" || state.gate2Status === "approved")
    return 3;
  if (state.gate1Status !== "idle" || state.structureSubmitted || state.evidenceSubmitted) return 2;
  return 1;
}

export function phaseLabel(level: IdeaLevel) {
  if (level === 1) return "초안";
  if (level === 2) return "중간안";
  return "최종안";
}

export function boardFilterLabel(level: "all" | IdeaLevel) {
  if (level === "all") return "전체";
  return phaseLabel(level);
}

export function getHighestUnlockedStep(state: DemoState): StepId {
  if (!state.sessionVerified) return 1;
  if (!state.profileSubmitted) return 2;
  if (!state.introCompleted) return 3;
  if (!state.diagnosisSubmitted) return 4;
  if (!state.ideaSeedSubmitted) return 5;
  if (!state.cardWorkshopSubmitted) return 6;
  if (state.gate1Status === "idle") return 7;
  if (state.gate1Status === "pending" || state.gate1Status === "changes") return 8;
  if (!state.structureSubmitted) return 9;
  if (!state.evidenceSubmitted) return 10;
  if (state.gate2Status === "idle" || state.gate2Status === "changes" || state.gate2Status === "pending")
    return 11;
  if (!state.quizSubmitted) return 12;
  return 13;
}

export function isStepAvailable(stepId: StepId, state: DemoState) {
  return stepId <= getHighestUnlockedStep(state);
}

export function buildCurrentIdea(state: DemoState) {
  if (!state.ideaSeedSubmitted) return null;
  const title = state.idea.refinedTitle || state.idea.title;
  return {
    id: "current-idea",
    inventorNumber: state.student.inventorNumber || "발명가 ----",
    title: title || "아직 제목이 없는 아이디어",
    summary: state.idea.summary || "문제 정의와 아이디어 요약이 여기에 표시됩니다.",
    problem: state.idea.problem || "문제 정의 미입력",
    solution:
      state.idea.finalPitch ||
      state.idea.refinedSolution ||
      state.idea.insight ||
      "해결 아이디어가 아직 정리되지 않았습니다.",
    level: getCurrentIdeaLevel(state),
    tags: [
      ...state.idea.selectedScience,
      ...state.idea.selectedTech,
      ...state.idea.selectedInvention,
      ...state.idea.selectedQuestion,
    ].slice(0, 4),
    feedback: state.receivedFeedback.map((item) => ({
      id: item.id,
      author: item.author,
      content: item.response ? `${item.content} / 답변: ${item.response}` : item.content,
      createdAt: item.createdAt,
    })),
  };
}
