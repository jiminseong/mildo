"use client";

import { ReactNode } from "react";
import { DemoProvider } from "./context/DemoContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <DemoProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </DemoProvider>
  );
}
