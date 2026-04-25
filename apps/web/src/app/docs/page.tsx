export default function DocsHomePage() {
  return (
    <div className="h-full flex items-center justify-center fade-in">
      <div className="text-center">
        <svg className="mx-auto mb-4 text-text-muted" width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h3 className="text-lg font-medium text-text-primary mb-2">选择一个文档</h3>
        <p className="text-text-secondary text-sm">从左侧列表选择一个文档，或者新建文档</p>
      </div>
    </div>
  );
}
