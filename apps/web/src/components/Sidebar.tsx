'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createDocumentAction, deleteDocumentAction } from '../actions/document';
import { DocumentDto } from '@ys/shared';

export default function Sidebar({ initialDocuments }: { initialDocuments: DocumentDto[] }) {
  const [documents, setDocuments] = useState(initialDocuments);
  const [search, setSearch] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const filtered = documents.filter((doc) =>
    (doc.title || 'Untitled').toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async () => {
    if (isCreating) return;
    setIsCreating(true);
    try {
      const newDoc = await createDocumentAction({ title: '', content: '' });
      setDocuments([newDoc, ...documents]);
      router.push(`/docs/${newDoc.id}`);
    } catch (e) {
      console.error(e);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await deleteDocumentAction(id);
      setDocuments(documents.filter((d) => d.id !== id));
      if (pathname?.endsWith(id)) {
        router.push('/docs');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <aside className="w-72 border-r border-border bg-bg-secondary flex flex-col h-full flex-shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-border">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-4">
          <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
            <rect x="8" y="8" width="48" height="48" rx="8" fill="#222" stroke="#d4a853" strokeWidth="2"/>
            <path d="M20 24h24M20 32h18M20 40h12" stroke="#d4a853" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="46" cy="40" r="4" fill="#d4a853"/>
          </svg>
          <span className="font-semibold text-text-primary text-lg">ysnotebook</span>
        </div>

        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
            <path d="M16 16l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索文档..."
            className="w-full bg-bg-tertiary border border-border rounded-lg pl-10 pr-3 py-2 text-sm text-text-primary placeholder-text-muted outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      {/* New Document Button */}
      <div className="px-4 pt-3">
        <button
          onClick={handleCreate}
          disabled={isCreating}
          className="w-full flex items-center justify-center gap-2 bg-accent text-bg-primary font-medium px-4 py-2 rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50 text-sm"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
          </svg>
          新建文档
        </button>
      </div>

      {/* Document List */}
      <ul className="flex-1 overflow-y-auto px-3 py-3">
        {filtered.map((doc) => {
          const isActive = pathname?.endsWith(doc.id);
          return (
            <li key={doc.id} className="mb-1">
              <Link
                href={`/docs/${doc.id}`}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 group transition-colors ${
                  isActive
                    ? 'bg-bg-tertiary border border-border'
                    : 'hover:bg-bg-tertiary'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <svg
                    className={`flex-shrink-0 ${isActive ? 'text-accent' : 'text-text-muted'}`}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm text-text-primary truncate">
                    {doc.title || '未命名文档'}
                  </span>
                </div>
                <button
                  onClick={(e) => handleDelete(doc.id, e)}
                  className="opacity-0 group-hover:opacity-100 text-text-muted hover:text-danger p-1 transition-all flex-shrink-0"
                  title="删除"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="px-4 py-8 text-center">
          <svg className="mx-auto mb-3 text-text-muted" width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="text-sm text-text-muted">
            {search ? '没有找到匹配的文档' : '暂无文档'}
          </p>
        </div>
      )}
    </aside>
  );
}
