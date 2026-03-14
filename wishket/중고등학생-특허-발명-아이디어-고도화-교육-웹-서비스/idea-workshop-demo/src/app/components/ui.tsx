"use client";

import { ReactNode } from "react";
import { CheckCircle2, CircleDashed, LockKeyhole, X } from "lucide-react";

export function Panel({
  title,
  eyebrow,
  description,
  children,
  dark,
}: {
  title: string;
  eyebrow: string;
  description?: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      className={`sheet-panel p-5 md:p-7 ${dark ? "sheet-panel-dark text-white" : "text-foreground"}`}
    >
      <p
        className={`text-[12px] font-semibold tracking-[0.04em] ${dark ? "text-white/68" : "text-primary"}`}
      >
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display font-bold text-3xl leading-[1.2] tracking-[-0.03em] md:text-[2rem]">
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-3 max-w-3xl text-sm leading-7 ${dark ? "text-white/74" : "text-muted-foreground"}`}
        >
          {description}
        </p>
      ) : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return <label className="space-y-2 text-sm font-medium text-foreground">{children}</label>;
}

export function StatusPill({ children, tone }: { children: ReactNode; tone?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold leading-none ${tone ?? "bg-white text-foreground border-slate-200"}`}
    >
      {children}
    </span>
  );
}

export function StepMarker({
  step,
  active,
  done,
  locked,
  pending,
}: {
  step: number;
  active: boolean;
  done: boolean;
  locked: boolean;
  pending?: boolean;
}) {
  if (done) return <CheckCircle2 className="h-5 w-5 text-[#48694c]" />;
  if (pending) return <CircleDashed className="h-5 w-5 text-[#8a6b55]" />;
  if (locked) return <LockKeyhole className="h-5 w-5 text-[#9c9489]" />;
  return (
    <span
      className={`flex h-8 w-8 items-center justify-center rounded-full border text-[12px] font-semibold ${active ? "border-foreground bg-foreground text-white" : "border-slate-200 bg-white text-foreground"}`}
    >
      {step}
    </span>
  );
}

export function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-[#1f2a34]/40 px-4 py-10 backdrop-blur-sm">
      <div className="sheet-panel float-in relative w-full max-w-3xl p-6 md:p-8">
        <button
          type="button"
          onClick={onClose}
          className="utility-button absolute right-4 top-4 px-3! py-3! text-foreground"
          aria-label="닫기"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}
