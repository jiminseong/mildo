"use client";

import { usePathname, useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  function onClick() {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="border border-amber-200/70 px-3 py-2 text-xs text-amber-100 md:text-sm"
      aria-label="뒤로가기"
    >
      뒤로가기
    </button>
  );
}
