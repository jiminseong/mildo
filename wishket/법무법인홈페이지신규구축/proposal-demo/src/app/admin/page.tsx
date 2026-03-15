const queue = [
  { name: "김OO", category: "성범죄", urgency: "긴급", status: "배정대기" },
  { name: "이OO", category: "마약", urgency: "보통", status: "검토중" },
  { name: "박OO", category: "성범죄", urgency: "긴급", status: "초기상담완료" },
];

const contentStatus = [
  { name: "성공사례", total: 128, draft: 12, private: 6 },
  { name: "전문분야", total: 9, draft: 1, private: 0 },
  { name: "FAQ", total: 31, draft: 4, private: 0 },
];

export default function AdminPage() {
  return (
    <main className="law-container py-16">
      <h1 className="text-4xl font-bold">운영 대시보드 (데모)</h1>
      <p className="mt-3 text-sm text-stone-700">
        실제 운영 시 상담 우선순위와 콘텐츠 상태를 한눈에 확인하는 화면입니다.
      </p>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <article className="law-card p-5">
          <p className="text-sm text-stone-600">오늘 신규 상담</p>
          <p className="mt-2 text-3xl font-bold">24건</p>
        </article>
        <article className="law-card p-5">
          <p className="text-sm text-stone-600">긴급 상담</p>
          <p className="mt-2 text-3xl font-bold text-[#b03232]">7건</p>
        </article>
        <article className="law-card p-5">
          <p className="text-sm text-stone-600">당일 1차 응답률</p>
          <p className="mt-2 text-3xl font-bold">89%</p>
        </article>
      </section>

      <section className="mt-8 law-card p-6">
        <h2 className="text-2xl font-bold">긴급 상담 큐</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-stone-500">
              <tr>
                <th className="py-2">신청자</th>
                <th className="py-2">분야</th>
                <th className="py-2">긴급도</th>
                <th className="py-2">상태</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((item) => (
                <tr key={`${item.name}-${item.status}`} className="border-t border-[#e6dece]">
                  <td className="py-3">{item.name}</td>
                  <td className="py-3">{item.category}</td>
                  <td className="py-3">{item.urgency}</td>
                  <td className="py-3">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {contentStatus.map((item) => (
          <article key={item.name} className="law-card p-5">
            <h3 className="text-xl font-bold">{item.name}</h3>
            <p className="mt-3 text-sm text-stone-700">총 게시물: {item.total}</p>
            <p className="mt-1 text-sm text-stone-700">검수중: {item.draft}</p>
            <p className="mt-1 text-sm text-stone-700">비공개: {item.private}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
