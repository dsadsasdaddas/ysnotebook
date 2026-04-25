import { fetchDocument } from '../../../actions/document';
import Editor from '../../../components/Editor';

export default async function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const document = await fetchDocument(id);
    return (
      <div className="h-full">
        <Editor document={document} />
      </div>
    );
  } catch {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <svg className="mx-auto mb-4 text-text-muted" width="48" height="48" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <h2 className="text-xl font-semibold text-text-primary mb-2">文档不存在</h2>
          <p className="text-text-secondary">该文档可能已被删除或链接有误</p>
        </div>
      </div>
    );
  }
}
