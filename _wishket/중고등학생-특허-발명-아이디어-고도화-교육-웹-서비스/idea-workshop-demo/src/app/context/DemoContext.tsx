"use client";

import {
  ChangeEvent,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ACCESS_CODES,
  MOCK_PEER_IDEAS,
  QUIZ_QUESTIONS,
  RECEIVED_FEEDBACK_SEED,
} from "../demo-data";
import type { DemoState, CardGroupKey, IdeaLevel, StepId } from "./types";
import { randomInventorNumber, buildCurrentIdea } from "./types";

// Re-export everything from types
export * from "./types";

/* ─── Initial State ─── */
function clonePeerIdeas() {
  return MOCK_PEER_IDEAS.map((idea) => ({
    ...idea,
    level: idea.level as IdeaLevel,
    feedback: idea.feedback.map((f) => ({ ...f })),
  }));
}

function createInitialState(): DemoState {
  return {
    student: {
      name: "",
      accessCode: "",
      gender: "",
      birthYear: "",
      grade: "",
      school: "",
      region: "",
      parentContact: "",
      agreed: false,
      inventorNumber: "",
    },
    sessionVerified: false,
    profileSubmitted: false,
    introProgress: 0,
    introCompleted: false,
    diagnosisSubmitted: false,
    diagnosis: { hasIdea: "", theme: "생활안전", challenge: "", preferredTrack: "" },
    ideaSeedSubmitted: false,
    cardWorkshopSubmitted: false,
    feedbackReflectionSubmitted: false,
    structureSubmitted: false,
    evidenceSubmitted: false,
    finalSubmitted: false,
    quizSubmitted: false,
    completed: false,
    gate1Status: "idle",
    gate1Note: "",
    gate2Status: "idle",
    gate2Note: "",
    sentFeedbackCount: 0,
    peerIdeas: clonePeerIdeas(),
    receivedFeedback: [],
    idea: {
      title: "",
      summary: "",
      problem: "",
      audience: "",
      insight: "",
      selectedScience: [],
      selectedTech: [],
      selectedInvention: [],
      selectedQuestion: [],
      revisionMemo: "",
      refinedTitle: "",
      refinedSolution: "",
      storyboard: "",
      implementationPlan: "",
      evidenceNotes: "",
      evidenceImages: [],
      finalPitch: "",
      finalBenefit: "",
      quizAnswers: Array.from({ length: QUIZ_QUESTIONS.length }, () => null),
      quizScore: null,
    },
  };
}

function buildSampleState(): DemoState {
  return {
    ...createInitialState(),
    student: {
      name: "김하린",
      accessCode: ACCESS_CODES[0],
      gender: "여학생",
      birthYear: "2010",
      grade: "중3",
      school: "한빛중학교",
      region: "서울",
      parentContact: "010-1234-5678",
      agreed: true,
      inventorNumber: "발명가 2487",
    },
    sessionVerified: true,
    profileSubmitted: true,
    introProgress: 100,
    introCompleted: true,
    diagnosisSubmitted: true,
    diagnosis: {
      hasIdea: "yes",
      theme: "생활안전",
      challenge: "쉬는 시간마다 물병과 개인 물건이 자주 넘어져 복도가 어수선해집니다.",
      preferredTrack: "문제 해결형",
    },
    ideaSeedSubmitted: true,
    cardWorkshopSubmitted: true,
    peerIdeas: clonePeerIdeas(),
    receivedFeedback: RECEIVED_FEEDBACK_SEED.map((i) => ({ ...i, response: "" })),
    idea: {
      title: "복도 사물 정리용 자석 고정 보드",
      summary: "쉬는 시간에 쓰는 물건을 잠깐 붙여 두어 넘어짐을 줄이는 벽면형 보드",
      problem:
        "쉬는 시간에 가방, 물병, 실내화 주머니가 통로 쪽으로 튀어나와 넘어질 위험이 생깁니다.",
      audience: "쉬는 시간 이동이 많은 중학생과 복도 정리가 필요한 담임교사",
      insight: "학생들은 잠깐 놓을 곳이 없어서 통로 바닥에 물건을 두는 경우가 많습니다.",
      selectedScience: ["압력 분산", "진동 흡수"],
      selectedTech: ["자석 결합", "접이식 구조"],
      selectedInvention: ["합치기", "미리 대비하기"],
      selectedQuestion: ["언제 가장 문제를 크게 느끼는가?", "유지보수는 어떻게 확보할 것인가?"],
      revisionMemo: "",
      refinedTitle: "",
      refinedSolution: "",
      storyboard: "",
      implementationPlan: "",
      evidenceNotes: "",
      evidenceImages: [],
      finalPitch: "",
      finalBenefit: "",
      quizAnswers: Array.from({ length: QUIZ_QUESTIONS.length }, () => null),
      quizScore: null,
    },
    sentFeedbackCount: 1,
  };
}

/* ─── Context Type ─── */
type DemoContextType = {
  state: DemoState;
  setState: React.Dispatch<React.SetStateAction<DemoState>>;
  activeStep: StepId;
  setActiveStep: React.Dispatch<React.SetStateAction<StepId>>;
  actionMessage: string;
  setActionMessage: React.Dispatch<React.SetStateAction<string>>;
  activeCardGroup: CardGroupKey;
  setActiveCardGroup: React.Dispatch<React.SetStateAction<CardGroupKey>>;
  selectedBoardIdeaId: string;
  setSelectedBoardIdeaId: React.Dispatch<React.SetStateAction<string>>;
  boardFilter: "all" | IdeaLevel;
  setBoardFilter: React.Dispatch<React.SetStateAction<"all" | IdeaLevel>>;
  feedbackDraft: string;
  setFeedbackDraft: React.Dispatch<React.SetStateAction<string>>;
  introPlaying: boolean;
  setIntroPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  loginError: string;
  setLoginError: React.Dispatch<React.SetStateAction<string>>;
  profileError: string;
  setProfileError: React.Dispatch<React.SetStateAction<string>>;
  stepValidation: { step: StepId; message: string } | null;
  adminNotes: { gate1: string; gate2: string };
  setAdminNotes: React.Dispatch<React.SetStateAction<{ gate1: string; gate2: string }>>;
  updateStudent: <K extends keyof DemoState["student"]>(
    key: K,
    value: DemoState["student"][K],
  ) => void;
  updateDiagnosis: <K extends keyof DemoState["diagnosis"]>(
    key: K,
    value: DemoState["diagnosis"][K],
  ) => void;
  updateIdea: <K extends keyof DemoState["idea"]>(key: K, value: DemoState["idea"][K]) => void;
  toggleCardSelection: (groupKey: CardGroupKey, card: string) => void;
  handleLogin: (name?: string, accessCode?: string) => boolean;
  handleProfileSubmit: () => void;
  applyDiagnosisSuggestion: () => void;
  handleDiagnosisSubmit: () => void;
  handleIdeaSeedSubmit: () => void;
  handleCardWorkshopSubmit: () => void;
  handleSendFeedback: () => void;
  updateFeedbackResponse: (id: string, v: string) => void;
  handleFeedbackReflectionSubmit: () => void;
  handleLevel2Submit: () => boolean;
  handleEvidenceUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  removeEvidenceImage: (i: number) => void;
  handleStructureSubmit: () => void;
  handleEvidenceSubmit: () => void;
  handleFinalSubmit: () => boolean;
  handleQuizAnswer: (i: number, o: number) => void;
  handleQuizSubmit: () => void;
  handleAdminDecision: (gate: "gate1" | "gate2", decision: "approve" | "changes") => void;
  loadSampleStudent: () => void;
  resetDemo: () => void;
  handleLogout: () => void;
  handleRegister: (
    name: string,
    accessCode: string,
  ) => { success: boolean; inventorNumber?: string };
};

const DemoContext = createContext<DemoContextType | null>(null);
export function useDemoContext() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemoContext must be within DemoProvider");
  return ctx;
}

const SUGGESTIONS: Record<string, { title: string; summary: string; problem: string }> = {
  생활안전: {
    title: "복도 이동 중 넘어짐을 줄이는 수납 장치",
    summary: "복도에서 잠깐 놓는 물건을 안전하게 정리하는 장치",
    problem: "쉬는 시간 이동 중 물건이 통로로 튀어나와 안전 문제가 생깁니다.",
  },
  환경: {
    title: "분리배출 실수를 줄이는 교실용 안내 스테이션",
    summary: "학생이 자주 헷갈리는 쓰레기 종류를 빠르게 구분하게 돕는 구조",
    problem: "교실에서 분리배출 기준을 바로 확인하기 어려워 혼합 배출이 잦습니다.",
  },
  학습도구: {
    title: "수업 준비물을 한 번에 확인하는 책상 부착형 보드",
    summary: "과목별 준비물을 시각적으로 정리해 잊어버림을 줄이는 보드",
    problem: "수업 전마다 준비물을 놓치거나 뒤늦게 찾느라 흐름이 끊깁니다.",
  },
};

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(createInitialState);
  const [activeStep, setActiveStep] = useState<StepId>(1);
  const [actionMessage, setActionMessage] = useState(
    "학생 흐름과 운영자 확인 흐름을 처음부터 끝까지 직접 눌러볼 수 있습니다.",
  );
  const [activeCardGroup, setActiveCardGroup] = useState<CardGroupKey>("science");
  const [selectedBoardIdeaId, setSelectedBoardIdeaId] = useState("peer-0142");
  const [boardFilter, setBoardFilter] = useState<"all" | IdeaLevel>("all");
  const [feedbackDraft, setFeedbackDraft] = useState("");
  const [introPlaying, setIntroPlaying] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [profileError, setProfileError] = useState("");
  const [stepValidation, setStepValidation] = useState<{ step: StepId; message: string } | null>(
    null,
  );
  const [adminNotes, setAdminNotes] = useState({ gate1: "", gate2: "" });

  useEffect(() => {
    const saved = localStorage.getItem("mildo_demo_state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const timerId = globalThis.setTimeout(() => {
          setState(parsed);
          if (parsed.sessionVerified) {
            setActiveStep(3); // Skip login/code steps if already verified
          }
        }, 0);
        return () => globalThis.clearTimeout(timerId);
      } catch (e) {
        console.error("Failed to load state", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mildo_demo_state", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (!introPlaying || state.introCompleted) return;
    const t = globalThis.setInterval(() => {
      let stop = false;
      setState((p) => {
        const n = Math.min(p.introProgress + 8, 100);
        stop = n === 100;
        return { ...p, introProgress: n, introCompleted: n === 100 };
      });
      if (stop) globalThis.clearInterval(t);
    }, 180);
    return () => globalThis.clearInterval(t);
  }, [introPlaying, state.introCompleted]);

  const clearStepValidation = useCallback(() => {
    setStepValidation(null);
  }, []);

  const showStepValidation = useCallback((step: StepId, message: string, fieldId?: string) => {
    setStepValidation({ step, message });

    if (!fieldId || typeof document === "undefined") return;

    globalThis.requestAnimationFrame(() => {
      const target = document.getElementById(fieldId);
      if (!(target instanceof HTMLElement)) return;
      target.focus();
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, []);

  const updateStudent = useCallback(
    <K extends keyof DemoState["student"]>(k: K, v: DemoState["student"][K]) => {
      setProfileError("");
      clearStepValidation();
      setState((p) => ({ ...p, student: { ...p.student, [k]: v } }));
    },
    [clearStepValidation],
  );
  const updateDiagnosis = useCallback(
    <K extends keyof DemoState["diagnosis"]>(k: K, v: DemoState["diagnosis"][K]) => {
      clearStepValidation();
      setState((p) => ({ ...p, diagnosis: { ...p.diagnosis, [k]: v } }));
    },
    [clearStepValidation],
  );
  const updateIdea = useCallback(
    <K extends keyof DemoState["idea"]>(k: K, v: DemoState["idea"][K]) => {
      clearStepValidation();
      setState((p) => ({ ...p, idea: { ...p.idea, [k]: v } }));
    },
    [clearStepValidation],
  );

  const toggleCardSelection = useCallback((gk: CardGroupKey, card: string) => {
    clearStepValidation();
    const m = {
      science: "selectedScience",
      tech: "selectedTech",
      invention: "selectedInvention",
      question: "selectedQuestion",
    } as const;
    setState((p) => {
      const l = p.idea[m[gk]];
      return {
        ...p,
        idea: { ...p.idea, [m[gk]]: l.includes(card) ? l.filter((i) => i !== card) : [...l, card] },
      };
    });
  }, [clearStepValidation]);

  const handleLogin = useCallback(
    (nameOverride?: string, accessCodeOverride?: string) => {
      let success = false;

      setState((p) => {
        const studentName = (nameOverride !== undefined ? nameOverride : p.student.name).trim();
        const studentCode = (
          accessCodeOverride !== undefined ? accessCodeOverride : p.student.accessCode
        ).trim();

        if (!studentName) {
          setLoginError("이름을 입력해 주세요.");
          return p;
        }
        if (!ACCESS_CODES.includes(studentCode)) {
          setLoginError(`접속코드가 올바르지 않습니다.`);
          return p;
        }

        setLoginError("");
        clearStepValidation();
        setActiveStep(3);
        setActionMessage("로그인되었습니다.");
        success = true;
        return {
          ...p,
          sessionVerified: true,
          profileSubmitted: true,
          student: { ...p.student, name: studentName, accessCode: studentCode, agreed: true },
        };
      });
      return success;
    },
    [clearStepValidation, setActiveStep],
  );

  const handleRegister = useCallback((name: string, accessCode: string) => {
    if (!name.trim()) {
      setLoginError("이름을 입력해 주세요.");
      return { success: false };
    }
    if (!ACCESS_CODES.includes(accessCode.trim())) {
      setLoginError(`접속코드가 올바르지 않습니다.`);
      return { success: false };
    }

    const num = randomInventorNumber(name);
    clearStepValidation();
    setState((p) => ({
      ...p,
      sessionVerified: true,
      profileSubmitted: true,
      student: {
        ...p.student,
        name: name.trim(),
        accessCode: accessCode.trim(),
        inventorNumber: num,
        agreed: true,
      },
    }));
    setActiveStep(3);
    setActionMessage(`회원가입이 완료되었습니다. 발명가 번호: ${num}`);
    return { success: true, inventorNumber: num };
  }, [clearStepValidation]);

  const handleLogout = useCallback(() => {
    setState(createInitialState());
    setActiveStep(1);
    localStorage.removeItem("mildo_demo_state");
    clearStepValidation();
    setActionMessage("로그아웃되었습니다.");
  }, [clearStepValidation]);

  const handleProfileSubmit = useCallback(() => {
    setState((p) => {
      const s = p.student;
      if (!s.gender) {
        setProfileError("성별을 선택해 주세요.");
        showStepValidation(2, "성별을 선택해 주세요.", "student-gender");
        return p;
      }
      if (!s.birthYear.trim()) {
        setProfileError("생년을 입력해 주세요.");
        showStepValidation(2, "생년을 입력해 주세요.", "student-birth-year");
        return p;
      }
      if (!s.grade) {
        setProfileError("학년을 선택해 주세요.");
        showStepValidation(2, "학년을 선택해 주세요.", "student-grade");
        return p;
      }
      if (!s.region) {
        setProfileError("지역을 선택해 주세요.");
        showStepValidation(2, "지역을 선택해 주세요.", "student-region");
        return p;
      }
      if (!s.school.trim()) {
        setProfileError("학교명을 입력해 주세요.");
        showStepValidation(2, "학교명을 입력해 주세요.", "student-school");
        return p;
      }
      if (!s.parentContact.trim()) {
        setProfileError("보호자 연락처를 입력해 주세요.");
        showStepValidation(2, "보호자 연락처를 입력해 주세요.", "student-parent-contact");
        return p;
      }
      if (!s.agreed) {
        setProfileError("개인정보 수집 및 발명가 번호 발급에 동의해 주세요.");
        showStepValidation(
          2,
          "개인정보 수집 및 발명가 번호 발급에 동의해 주세요.",
          "student-agree",
        );
        return p;
      }
      const num = p.student.inventorNumber || randomInventorNumber(p.student.name);
      setProfileError("");
      clearStepValidation();
      setActiveStep(3);
      setActionMessage(`발명가 번호 ${num}가 발급되었습니다.`);
      return { ...p, profileSubmitted: true, student: { ...p.student, inventorNumber: num } };
    });
  }, [clearStepValidation, showStepValidation]);

  const applyDiagnosisSuggestion = useCallback(() => {
    setState((p) => {
      const picked = SUGGESTIONS[p.diagnosis.theme] ?? SUGGESTIONS.생활안전;
      setActionMessage("추천 아이디어를 채워 넣었습니다.");
      return {
        ...p,
        idea: {
          ...p.idea,
          title: p.idea.title || picked.title,
          summary: p.idea.summary || picked.summary,
          problem: p.idea.problem || picked.problem,
        },
      };
    });
  }, []);

  const handleDiagnosisSubmit = useCallback(() => {
    setState((p) => {
      if (!p.diagnosis.hasIdea) {
        showStepValidation(4, "아이디어 보유 여부를 먼저 선택해 주세요.", "diagnosis-has-idea-yes");
        return p;
      }
      if (!p.diagnosis.preferredTrack.trim()) {
        showStepValidation(4, "진행 트랙을 입력해 주세요.", "diagnosis-preferred-track");
        return p;
      }
      if (!p.diagnosis.challenge.trim()) {
        showStepValidation(4, "해결하고 싶은 문제를 입력해 주세요.", "diagnosis-challenge");
        return p;
      }
      clearStepValidation();
      if (p.diagnosis.hasIdea === "no") {
        const picked = SUGGESTIONS[p.diagnosis.theme] ?? SUGGESTIONS.생활안전;
        setActiveStep(5);
        setActionMessage("추천 아이디어가 채워졌습니다.");
        return {
          ...p,
          diagnosisSubmitted: true,
          idea: {
            ...p.idea,
            title: p.idea.title || picked.title,
            summary: p.idea.summary || picked.summary,
            problem: p.idea.problem || picked.problem,
            audience: p.idea.audience || "학교 생활 중 같은 문제를 겪는 중고등학생",
          },
        };
      }
      setActiveStep(5);
      setActionMessage("진단이 완료되었습니다.");
      return { ...p, diagnosisSubmitted: true };
    });
  }, [clearStepValidation, showStepValidation]);

  const handleIdeaSeedSubmit = useCallback(() => {
    setState((p) => {
      const { title, summary, problem, audience, insight } = p.idea;
      if (!title.trim()) {
        showStepValidation(5, "아이디어 제목을 입력해 주세요.", "idea-title");
        return p;
      }
      if (!summary.trim()) {
        showStepValidation(5, "아이디어 요약을 입력해 주세요.", "idea-summary");
        return p;
      }
      if (!audience.trim()) {
        showStepValidation(5, "대상 사용자를 입력해 주세요.", "idea-audience");
        return p;
      }
      if (!insight.trim()) {
        showStepValidation(5, "핵심 인사이트를 입력해 주세요.", "idea-insight");
        return p;
      }
      if (!problem.trim()) {
        showStepValidation(5, "구체적인 문제 정의를 입력해 주세요.", "idea-problem");
        return p;
      }
      clearStepValidation();
      setActiveStep(6);
      setSelectedBoardIdeaId("current-idea");
      setActionMessage("초안이 저장되었습니다.");
      return {
        ...p,
        ideaSeedSubmitted: true,
        receivedFeedback:
          p.receivedFeedback.length > 0
            ? p.receivedFeedback
            : RECEIVED_FEEDBACK_SEED.map((i) => ({ ...i, response: "" })),
      };
    });
  }, [clearStepValidation, showStepValidation]);

  const handleCardWorkshopSubmit = useCallback(() => {
    setState((p) => {
      const t =
        p.idea.selectedScience.length +
        p.idea.selectedTech.length +
        p.idea.selectedInvention.length +
        p.idea.selectedQuestion.length;
      if (t < 4) {
        showStepValidation(6, "카드를 최소 4장 선택해 주세요.", "card-workshop-panel");
        return p;
      }
      clearStepValidation();
      setActiveStep(7);
      setActionMessage("카드 선택이 완료되었습니다.");
      return { ...p, cardWorkshopSubmitted: true };
    });
  }, [clearStepValidation, showStepValidation]);

  const handleSendFeedback = useCallback(() => {
    setState((p) => {
      const ci = buildCurrentIdea(p);
      const all = ci ? [ci, ...p.peerIdeas] : [...p.peerIdeas];
      const sel = all.find((i) => i.id === selectedBoardIdeaId);
      if (!sel || !feedbackDraft.trim()) return p;
      if (sel.id === "current-idea") {
        setActionMessage("내 아이디어에는 피드백을 남길 수 없습니다.");
        return p;
      }
      setFeedbackDraft("");
      setActiveStep(8);
      setActionMessage("피드백이 전송되었습니다.");
      return {
        ...p,
        peerIdeas: p.peerIdeas.map((idea) =>
          idea.id === sel.id
            ? {
                ...idea,
                feedback: [
                  ...idea.feedback,
                  {
                    id: `fb-${idea.id}-${idea.feedback.length + 1}`,
                    author: p.student.inventorNumber || "발명가 0000",
                    content: feedbackDraft.trim(),
                    createdAt: "방금 전",
                  },
                ],
              }
            : idea,
        ),
        sentFeedbackCount: p.sentFeedbackCount + 1,
      };
    });
  }, [feedbackDraft, selectedBoardIdeaId]);

  const updateFeedbackResponse = useCallback(
    (fid: string, v: string) => {
      clearStepValidation();
      setState((p) => ({
        ...p,
        receivedFeedback: p.receivedFeedback.map((i) => (i.id === fid ? { ...i, response: v } : i)),
      }));
    },
    [clearStepValidation],
  );

  const handleFeedbackReflectionSubmit = useCallback(() => {
    setState((p) => {
      if (
        !(p.receivedFeedback.length > 0 && p.receivedFeedback.every((i) => i.response.trim())) ||
        !p.idea.revisionMemo.trim()
      ) {
        setActionMessage("모든 답변과 수정 메모를 입력해 주세요.");
        return p;
      }
      setActiveStep(9);
      setActionMessage("피드백 반영이 완료되었습니다.");
      return { ...p, feedbackReflectionSubmitted: true };
    });
  }, []);

  const handleLevel2Submit = useCallback(() => {
    if (!state.idea.refinedTitle.trim()) {
      showStepValidation(7, "수정된 제목을 입력해 주세요.", "idea-refined-title");
      return false;
    }
    if (!state.idea.refinedSolution.trim()) {
      showStepValidation(7, "수정된 해결안을 입력해 주세요.", "idea-refined-solution");
      return false;
    }

    clearStepValidation();
    setState((p) => ({
      ...p,
      feedbackReflectionSubmitted: true,
      gate1Status: "pending",
      gate1Note: "운영자 1차 검토 대기 중",
    }));
    setActiveStep(8);
    setActionMessage("1차 승인 대기 상태가 되었습니다.");
    return true;
  }, [clearStepValidation, showStepValidation, state]);

  const handleEvidenceUpload = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, 2);
    if (!files.length) return;
    const previews = await Promise.all(
      files.map(
        (f) =>
          new Promise<string>((res) => {
            const r = new FileReader();
            r.onload = () => res(String(r.result));
            r.readAsDataURL(f);
          }),
      ),
    );
    setState((p) => ({
      ...p,
      idea: { ...p.idea, evidenceImages: [...p.idea.evidenceImages, ...previews].slice(0, 2) },
    }));
    clearStepValidation();
    e.target.value = "";
  }, [clearStepValidation]);

  const removeEvidenceImage = useCallback(
    (idx: number) => {
      clearStepValidation();
      setState((p) => ({
        ...p,
        idea: { ...p.idea, evidenceImages: p.idea.evidenceImages.filter((_, i) => i !== idx) },
      }));
    },
    [clearStepValidation],
  );

  const handleStructureSubmit = useCallback(() => {
    setState((p) => {
      if (!p.idea.storyboard.trim()) {
        showStepValidation(9, "스토리보드를 입력해 주세요.", "idea-storyboard");
        return p;
      }
      if (!p.idea.implementationPlan.trim()) {
        showStepValidation(9, "구현 절차를 입력해 주세요.", "idea-implementation-plan");
        return p;
      }
      clearStepValidation();
      setActiveStep(10);
      setActionMessage("구조화가 저장되었습니다.");
      return { ...p, structureSubmitted: true };
    });
  }, [clearStepValidation, showStepValidation]);

  const handleEvidenceSubmit = useCallback(() => {
    setState((p) => {
      if (!p.idea.evidenceNotes.trim()) {
        showStepValidation(10, "자료 설명 및 메모를 입력해 주세요.", "idea-evidence-notes");
        return p;
      }
      if (!p.idea.evidenceImages.length) {
        showStepValidation(10, "이미지 자료를 1개 이상 추가해 주세요.", "idea-evidence-upload");
        return p;
      }
      clearStepValidation();
      setActiveStep(11);
      setActionMessage("자료 첨부가 완료되었습니다.");
      return { ...p, evidenceSubmitted: true };
    });
  }, [clearStepValidation, showStepValidation]);

  const handleFinalSubmit = useCallback(() => {
    if (!state.idea.finalPitch.trim()) {
      showStepValidation(11, "최종 핵심 제안을 입력해 주세요.", "idea-final-pitch");
      return false;
    }
    if (!state.idea.finalBenefit.trim()) {
      showStepValidation(11, "기대 효과 및 가치를 입력해 주세요.", "idea-final-benefit");
      return false;
    }

    clearStepValidation();
    setState((p) => ({
      ...p,
      finalSubmitted: true,
      gate2Status: "pending",
      gate2Note: "운영자 최종 승인 대기 중",
    }));
    setActionMessage("최종 제출이 완료되었습니다.");
    return true;
  }, [clearStepValidation, showStepValidation, state]);

  const handleQuizAnswer = useCallback(
    (idx: number, opt: number) => {
      clearStepValidation();
      setState((p) => {
        const n = [...p.idea.quizAnswers];
        n[idx] = opt;
        return { ...p, idea: { ...p.idea, quizAnswers: n } };
      });
    },
    [clearStepValidation],
  );

  const handleQuizSubmit = useCallback(() => {
    setState((p) => {
      const firstUnanswered = p.idea.quizAnswers.findIndex((answer) => answer === null);
      if (firstUnanswered >= 0) {
        showStepValidation(
          12,
          `Q${firstUnanswered + 1} 문항의 답변을 선택해 주세요.`,
          `quiz-option-${firstUnanswered}-0`,
        );
        return p;
      }
      clearStepValidation();
      const score = p.idea.quizAnswers.reduce<number>(
        (s, a, i) => s + (a === QUIZ_QUESTIONS[i].answerIndex ? 1 : 0),
        0,
      );
      setActiveStep(13);
      setActionMessage(`퀴즈 제출 완료. ${score}/${QUIZ_QUESTIONS.length}점`);
      return { ...p, quizSubmitted: true, completed: true, idea: { ...p.idea, quizScore: score } };
    });
  }, [clearStepValidation, showStepValidation]);

  const handleAdminDecision = useCallback(
    (gate: "gate1" | "gate2", dec: "approve" | "changes") => {
      const note = gate === "gate1" ? adminNotes.gate1.trim() : adminNotes.gate2.trim();
      if (gate === "gate1") {
        setState((p) => ({
          ...p,
          gate1Status: dec === "approve" ? "approved" : "changes",
          gate1Note: note || (dec === "approve" ? "1차 승인 완료" : "보완 요청"),
        }));
        setActiveStep(dec === "approve" ? 9 : 7);
        setActionMessage(dec === "approve" ? "1차 승인 완료." : "보완 요청 반영.");
      } else {
        setState((p) => ({
          ...p,
          gate2Status: dec === "approve" ? "approved" : "changes",
          gate2Note: note || (dec === "approve" ? "최종 승인 완료" : "보완 요청"),
        }));
        setActiveStep(dec === "approve" ? 12 : 11);
        setActionMessage(dec === "approve" ? "최종 승인 완료." : "보완 요청 반영.");
      }
    },
    [adminNotes],
  );

  const loadSampleStudent = useCallback(() => {
    setState(buildSampleState());
    setActiveStep(8);
    setSelectedBoardIdeaId("current-idea");
    setBoardFilter("all");
    clearStepValidation();
    setActionMessage("샘플 학생 데이터를 불러왔습니다.");
  }, [clearStepValidation]);

  const resetDemo = useCallback(() => {
    setState(createInitialState());
    setActiveStep(1);
    setSelectedBoardIdeaId("peer-0142");
    setBoardFilter("all");
    setFeedbackDraft("");
    setIntroPlaying(false);
    setLoginError("");
    setProfileError("");
    clearStepValidation();
    setAdminNotes({ gate1: "", gate2: "" });
    setActionMessage("데모가 초기화되었습니다.");
  }, [clearStepValidation]);

  return (
    <DemoContext.Provider
      value={{
        state,
        setState,
        activeStep,
        setActiveStep,
        actionMessage,
        setActionMessage,
        activeCardGroup,
        setActiveCardGroup,
        selectedBoardIdeaId,
        setSelectedBoardIdeaId,
        boardFilter,
        setBoardFilter,
        feedbackDraft,
        setFeedbackDraft,
        introPlaying,
        setIntroPlaying,
        loginError,
        setLoginError,
        profileError,
        setProfileError,
        stepValidation,
        adminNotes,
        setAdminNotes,
        updateStudent,
        updateDiagnosis,
        updateIdea,
        toggleCardSelection,
        handleLogin,
        handleProfileSubmit,
        applyDiagnosisSuggestion,
        handleDiagnosisSubmit,
        handleIdeaSeedSubmit,
        handleCardWorkshopSubmit,
        handleSendFeedback,
        updateFeedbackResponse,
        handleFeedbackReflectionSubmit,
        handleLevel2Submit,
        handleEvidenceUpload,
        removeEvidenceImage,
        handleStructureSubmit,
        handleEvidenceSubmit,
        handleFinalSubmit,
        handleQuizAnswer,
        handleQuizSubmit,
        handleAdminDecision,
        loadSampleStudent,
        resetDemo,
        handleLogout,
        handleRegister,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}
