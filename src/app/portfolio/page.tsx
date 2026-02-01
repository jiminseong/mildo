export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center text-text-primary">
        Portfolio
      </h1>

      {/* Filters (Placeholder) */}
      <div className="flex justify-center gap-4 mb-12 text-sm">
        <button className="font-bold text-text-primary border-b-2 border-text-primary pb-1">
          전체
        </button>
        <button className="text-text-secondary hover:text-text-primary pb-1">자영업 패키지</button>
        <button className="text-text-secondary hover:text-text-primary pb-1">고도 개발</button>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="group cursor-pointer">
            <div className="bg-surface aspect-video rounded-xl mb-4 border border-border overflow-hidden relative">
              {/* Image Placeholder */}
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                Project Image {item}
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-dangol">자영업 패키지</span>
              <h3 className="text-lg font-bold text-text-primary group-hover:text-dangol transition-colors">
                프로젝트 타이틀 {item}
              </h3>
              <p className="text-sm text-text-secondary">간단한 프로젝트 설명 한 줄 요약</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
