'use client';

import { useState, useEffect } from 'react';
import { updateDocumentAction } from '../actions/document';
import { DocumentDto } from '@ys/shared';
import { useDebounce } from 'use-debounce'; // Will need to run `pnpm add use-debounce` later if needed, but let's implement a simple debounce for now.

// Custom simple debounce to avoid external dependency right now
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

export default function Editor({ document }: { document: DocumentDto }) {
  const [title, setTitle] = useState(document.title);
  const [content, setContent] = useState(document.content || '');

  const debouncedTitle = useDebounceValue(title, 500);
  const debouncedContent = useDebounceValue(content, 500);

  useEffect(() => {
    if (debouncedTitle !== document.title || debouncedContent !== (document.content || '')) {
      updateDocumentAction(document.id, {
        title: debouncedTitle,
        content: debouncedContent,
      }).catch(console.error);
    }
  }, [debouncedTitle, debouncedContent, document.id, document.title, document.content]);

  return (
    <div className="max-w-3xl mx-auto p-10 h-full flex flex-col">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Document Title"
        className="text-4xl font-bold mb-8 outline-none bg-transparent placeholder-gray-300"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing..."
        className="flex-1 resize-none outline-none text-lg bg-transparent placeholder-gray-300"
      />
    </div>
  );
}
