import { StepSidebar } from "../../components/StepSidebar";
import { StudentSteps } from "../../components/StudentSteps";

export default function WorkshopPage() {
  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">
            아이디어 제작 및 고도화
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            아이디어를 구체화하고 카드를 통해 기술적, 발명적 원리를 결합합니다.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 items-start">
          <StepSidebar mode="workshop" />
          <div className="flex-1 w-full min-w-0">
            <StudentSteps mode="workshop" />
          </div>
        </div>
      </div>
    </main>
  );
}
