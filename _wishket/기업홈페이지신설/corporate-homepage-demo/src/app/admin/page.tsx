import Link from "next/link";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";

const adminMenus = [
  { href: "/admin/products", title: "제품 관리", desc: "등록/수정/삭제 및 게시 상태 관리" },
  { href: "/admin/news", title: "뉴스 관리", desc: "공지 및 뉴스 콘텐츠 운영" },
  { href: "/admin/inquiries", title: "문의 관리", desc: "고객 문의 조회 및 상태 변경" },
];

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <Reveal>
        <section className="panel px-6 py-9 md:px-8">
          <p className="text-sm uppercase tracking-[0.18em] text-(--corp-accent-500)">Admin</p>
          <h1 className="font-heading mt-3 text-4xl text-(--corp-primary-900) md:text-5xl">관리자 대시보드</h1>
          <p className="mt-3 text-(--corp-muted)">데모 목적의 로컬 저장 기반 CMS 화면입니다.</p>
        </section>
      </Reveal>

      <StaggerGroup className="grid gap-4 md:grid-cols-3">
        {adminMenus.map((menu) => (
          <StaggerItem key={menu.href}>
            <Link href={menu.href} className="panel block space-y-2 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <h2 className="text-xl font-semibold text-(--corp-primary-900)">{menu.title}</h2>
              <p className="text-sm text-(--corp-muted)">{menu.desc}</p>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}
