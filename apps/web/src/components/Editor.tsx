'use client';

import { useState, useEffect, useRef } from 'react';
import { updateDocumentAction } from '../actions/document';
import { DocumentDto } from '@ys/shared';

function useDebounceValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

type SaveStatus = 'saved' | 'saving' | 'idle';

export default function Editor({ document: doc }: { document: DocumentDto }) {
  const [title, setTitle] = useState(doc.title);
  const [content, setContent] = useState(doc.content || '');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved');
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const debouncedTitle = useDebounceValue(title, 800);
  const debouncedContent = useDebounceValue(content, 800);

  // Auto-save
  useEffect(() => {
    if (debouncedTitle === doc.title && debouncedContent === (doc.content || '')) return;

    setSaveStatus('saving');
    updateDocumentAction(doc.id, {
      title: debouncedTitle,
      content: debouncedContent,
    })
      .then(() => setSaveStatus('saved'))
      .catch(() => setSaveStatus('idle'));
  }, [debouncedTitle, debouncedContent, doc.id, doc.title, doc.content]);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  return (
    <div className="max-w-3xl mx-auto px-8 py-12 min-h-full flex flex-col fade-in">
      {/* Title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="无标题文档"
        className="text-4xl font-bold mb-2 outline-none bg-transparent text-text-primary placeholder-text-muted"
      />

      {/* Save Status Indicator */}
      <div className="flex items-center gap-2 mb-8">
        <div
          className={`w-2 h-2 rounded-full ${
            saveStatus === 'saving'
              ? 'bg-accent pulse'
              : saveStatus === 'saved'
              ? 'bg-accent'
              : 'bg-text-muted'
          }`}
        />
        <span className="text-xs text-text-muted">
          {saveStatus === 'saving' ? '保存中...' : saveStatus === 'saved' ? '已保存' : '未保存'}
        </span>
      </div>

      {/* Content */}
      <textarea
        ref={contentRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="开始输入内容..."
        className="flex-1 resize-none outline-none bg-transparent text-lg text-text-primary placeholder-text-muted leading-relaxed"
      />

      {/* Status Bar */}
      <div className="mt-8 pt-4 border-t border-border flex items-center justify-between text-xs text-text-muted">
        <span>{charCount} 字符 · {wordCount} 词</span>
        <span>
          更新于 {new Date(doc.updatedAt).toLocaleString('zh-CN', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
}
