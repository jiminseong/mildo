import type { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import type { CardGroupKey, DemoState, IdeaLevel, StepId } from "../../context/types";

type BoardIdea = {
  id: string;
  level: IdeaLevel;
};

type StudentStepContext = {
  state: DemoState;
  setState: Dispatch<SetStateAction<DemoState>>;
  activeCardGroup: CardGroupKey;
  setActiveCardGroup: Dispatch<SetStateAction<CardGroupKey>>;
  profileError: string;
  setActionMessage: Dispatch<SetStateAction<string>>;
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
  handleProfileSubmit: () => void;
  applyDiagnosisSuggestion: () => void;
  handleDiagnosisSubmit: () => void;
  handleIdeaSeedSubmit: () => void;
  handleCardWorkshopSubmit: () => void;
  handleLevel2Submit: () => boolean;
  updateFeedbackResponse: (id: string, value: string) => void;
  handleEvidenceUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  removeEvidenceImage: (index: number) => void;
  handleStructureSubmit: () => void;
  handleEvidenceSubmit: () => void;
  handleFinalSubmit: () => boolean;
  handleQuizAnswer: (index: number, option: number) => void;
  handleQuizSubmit: () => void;
};

export type StudentStepProps = {
  ctx: StudentStepContext;
  state: DemoState;
  activeStep: StepId;
  setActiveStep: Dispatch<SetStateAction<StepId>>;
  setIntroPlaying: Dispatch<SetStateAction<boolean>>;
  introPlaying: boolean;
  highestUnlockedStep: StepId;
  resolvedStep: StepId;
  currentIdea: BoardIdea | null;
  boardIdeas: BoardIdea[];
  filteredIdeas: BoardIdea[];
  effectiveBoardIdeaId: string;
  selectedBoardIdea: BoardIdea | null;
  currentLevel: IdeaLevel;
};

export type StudentStepComponent = FC<StudentStepProps>;
