import { StepSidebar } from "../../components/StepSidebar";
import { StudentSteps } from "../../components/StudentSteps";

export default function LearningPage() {
  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">학습 및 진단</h1>
          <p className="text-lg text-slate-500 font-medium">
            발명의 기초를 배우고 현재 아이디어 상태를 진단합니다.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 items-start">
          <StepSidebar mode="learning" />
          <div className="flex-1 w-full min-w-0">
            <StudentSteps mode="learning" />
          </div>
        </div>
      </div>
    </main>
  );
}
