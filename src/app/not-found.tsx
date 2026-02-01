import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen pt-32 pb-32 flex flex-col items-center justify-center text-center px-6 bg-base">
      <div className="mb-8">
        <h1 className="text-9xl font-bold text-dangol opacity-20 select-none">404</h1>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
        페이지를 찾을 수 없습니다
      </h2>
      <p className="text-lg text-text-secondary mb-12 max-w-md break-keep">
        요청하신 페이지가 존재하지 않거나, 주소가 변경되어 찾을 수 없습니다. 입력하신 주소가
        정확한지 다시 한번 확인해 주세요.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-8 py-4 bg-text-primary text-white font-bold rounded-lg hover:bg-black/80 transition-all shadow-sm"
      >
        <ArrowLeft className="w-5 h-5" />
        홈으로 돌아가기
      </Link>
    </main>
  );
}
