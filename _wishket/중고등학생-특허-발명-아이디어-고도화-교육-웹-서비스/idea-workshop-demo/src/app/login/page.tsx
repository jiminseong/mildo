"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Briefcase, ChevronRight, Key, Mail, UserPlus, LogIn } from "lucide-react";
import { useDemoContext } from "../context/DemoContext";

export default function LoginPage() {
  const [role, setRole] = useState<"student" | "admin" | null>(null);
  const [mode, setMode] = useState<"login" | "register">("login");

  const getTitle = () => {
    if (role === "admin") return "운영자 로그인";
    if (role === "student") {
      return mode === "login" ? "학생 로그인" : "학생 가입";
    }
    return "환영합니다";
  };

  const title = getTitle();

  const description = role
    ? "필요한 정보를 입력해 주세요."
    : "당신의 혁신적인 아이디어를 구체화할 시간입니다.";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full glass-card p-10 z-10 fade-in-up">
        <div className="flex justify-between items-center mb-10">
          <Link
            href="/"
            className="text-muted hover:text-primary transition-colors flex items-center gap-2 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            홈으로
          </Link>
          <div className="text-xl font-bold tracking-tight text-slate-800">인벤티브</div>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">{title}</h2>
          <p className="text-slate-500">{description}</p>
        </div>

        {role === null && <RoleSelector setRole={setRole} setMode={setMode} />}
        {role === "student" && <StudentForm mode={mode} setRole={setRole} />}
        {role === "admin" && <AdminForm setRole={setRole} />}
      </div>
    </div>
  );
}

function RoleSelector({ setRole, setMode }: any) {
  return (
    <div className="space-y-4 fade-in-up delay-100">
      <button
        type="button"
        onClick={() => {
          setRole("student");
          setMode("login");
        }}
        className="w-full text-left p-6 rounded-2xl border-2 border-slate-100 hover:border-primary/50 hover:bg-blue-50/50 transition-all group flex items-start gap-4"
      >
        <div className="p-3 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <LogIn className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-slate-900 mb-1 group-hover:text-primary transition-colors">
            학생 로그인
          </h3>
          <p className="text-sm text-slate-500">기존에 참여하던 학습을 계속합니다.</p>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all mt-3" />
      </button>

      <button
        type="button"
        onClick={() => {
          setRole("student");
          setMode("register");
        }}
        className="w-full text-left p-6 rounded-2xl border-2 border-slate-100 hover:border-primary/50 hover:bg-blue-50/50 transition-all group flex items-start gap-4"
      >
        <div className="p-3 rounded-full bg-blue-50/50 text-blue-500 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <UserPlus className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-slate-900 mb-1 group-hover:text-primary transition-colors">
            처음 왔어요 (가입)
          </h3>
          <p className="text-sm text-slate-500">새로운 발명가 계정을 생성하고 시작합니다.</p>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all mt-3" />
      </button>

      <button
        type="button"
        onClick={() => setRole("admin")}
        className="w-full text-left p-6 rounded-2xl border-2 border-slate-100 hover:border-indigo-500/50 hover:bg-indigo-50/50 transition-all group flex items-start gap-4"
      >
        <div className="p-3 rounded-full bg-slate-100 text-slate-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
          <Briefcase className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
            운영자 로그인
          </h3>
          <p className="text-sm text-slate-500">이메일과 비밀번호로 워크스페이스를 관리합니다.</p>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all mt-3" />
      </button>
    </div>
  );
}

function StudentForm({ mode, setRole }: any) {
  const router = useRouter();
  const ctx = useDemoContext();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      if (ctx.handleLogin(name, code)) router.push("/student");
    } else {
      const result = ctx.handleRegister(name, code);
      if (result.success) router.push("/student");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 fade-in-up">
      <div className="space-y-4">
        <div>
          <label htmlFor="student-name" className="block text-sm font-medium text-slate-700 mb-1">
            이름
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="student-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-shadow bg-white font-medium"
              placeholder="홍길동"
            />
          </div>
        </div>
        <div>
          <label htmlFor="student-code" className="block text-sm font-medium text-slate-700 mb-1">
            접속 코드
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Key className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="student-code"
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-shadow bg-white font-medium"
              placeholder="DEMO-2401"
            />
          </div>
          {mode === "register" && (
            <p className="mt-2 text-[12px] text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
              * 가입 시 고유한 <span className="font-bold text-primary">발명가 번호</span>가 즉시
              발급됩니다. 이후 모든 활동은 익명으로 보호됩니다.
            </p>
          )}
        </div>
      </div>

      {ctx.loginError && (
        <p className="text-sm font-medium text-red-500 mt-2 fade-in">{ctx.loginError}</p>
      )}

      <div className="pt-2 flex flex-col gap-3">
        <button
          type="submit"
          className="w-full btn-premium btn-primary justify-center text-lg shadow-lg shadow-blue-500/30 font-bold"
        >
          {mode === "login" ? "입장하기" : "가입하고 시작하기"}
        </button>
        <button
          type="button"
          onClick={() => setRole(null)}
          className="w-full py-3 text-slate-500 hover:text-slate-900 font-medium transition-colors"
        >
          뒤로가기
        </button>
      </div>
    </form>
  );
}

function AdminForm({ setRole }: any) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) router.push("/admin");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 fade-in-up">
      <div className="space-y-4">
        <div>
          <label htmlFor="admin-email" className="block text-sm font-medium text-slate-700 mb-1">
            이메일
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow bg-white font-medium"
              placeholder="admin@inventive.co.kr"
            />
          </div>
        </div>
        <div>
          <label htmlFor="admin-password" className="block text-sm font-medium text-slate-700 mb-1">
            비밀번호
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Key className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow bg-white font-medium"
              placeholder="••••••••"
            />
          </div>
        </div>
      </div>

      <div className="pt-2 flex flex-col gap-3">
        <button
          type="submit"
          className="w-full btn-premium justify-center text-lg shadow-lg shadow-indigo-500/30 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white border-transparent font-bold"
        >
          운영자 로그인
        </button>
        <button
          type="button"
          onClick={() => setRole(null)}
          className="w-full py-3 text-slate-500 hover:text-slate-900 font-medium transition-colors"
        >
          뒤로가기
        </button>
      </div>
    </form>
  );
}
