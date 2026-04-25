import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Brand Section */}
      <div className="text-center max-w-2xl mx-auto fade-in">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <rect x="8" y="8" width="48" height="48" rx="8" fill="#1a1a1a" stroke="#d4a853" strokeWidth="2"/>
            <path d="M20 24h24M20 32h18M20 40h12" stroke="#d4a853" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="46" cy="40" r="4" fill="#d4a853"/>
          </svg>
        </div>

        <h1 className="text-5xl font-bold tracking-tight mb-3">
          ysnotebook
        </h1>
        <p className="text-xl text-text-secondary mb-10">
          像飞书一样优雅的文档协作平台
        </p>

        {/* CTA Button */}
        <Link
          href="/docs"
          className="inline-flex items-center gap-2 bg-accent text-bg-primary font-semibold px-8 py-3 rounded-lg hover:bg-accent-hover transition-colors"
        >
          开始使用
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </Link>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl w-full fade-in">
        <FeatureCard
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="#d4a853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="#d4a853" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          }
          title="文档编辑"
          desc="富文本编辑器，支持多种内容块类型，实时自动保存"
        />
        <FeatureCard
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="#d4a853" strokeWidth="2"/>
              <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" stroke="#d4a853" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          }
          title="实时协作"
          desc="多人同时编辑，实时同步，无冲突合并"
        />
        <FeatureCard
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="#d4a853" strokeWidth="2"/>
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="#d4a853" strokeWidth="2"/>
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="#d4a853" strokeWidth="2"/>
              <rect x="14" y="14" width="7" height="7" rx="1" stroke="#d4a853" strokeWidth="2"/>
            </svg>
          }
          title="工作区管理"
          desc="树形文档结构，分类整理，快速检索"
        />
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-bg-secondary border border-border rounded-xl p-6 hover:border-border-hover transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
