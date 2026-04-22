'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createDocumentAction, deleteDocumentAction } from '../actions/document';
import { DocumentDto } from '@ys/shared';

export default function Sidebar({ initialDocuments }: { initialDocuments: DocumentDto[] }) {
  const [documents, setDocuments] = useState(initialDocuments);
  const router = useRouter();

  const handleCreate = async () => {
    try {
      const newDoc = await createDocumentAction({ title: 'Untitled Document', content: '' });
      setDocuments([newDoc, ...documents]);
      router.push(`/docs/${newDoc.id}`);
    } catch (e) {
      console.error(e);
      alert('Failed to create document');
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await deleteDocumentAction(id);
      setDocuments(documents.filter((d) => d.id !== id));
      router.push('/docs');
    } catch (err) {
      console.error(err);
      alert('Failed to delete document');
    }
  };

  return (
    <aside className="w-64 border-r bg-gray-50 flex flex-col h-full">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-semibold text-gray-700">Documents</h2>
        <button
          onClick={handleCreate}
          className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
        >
          + New
        </button>
      </div>
      <ul className="flex-1 overflow-y-auto">
        {documents.map((doc) => (
          <li key={doc.id} className="border-b border-gray-100">
            <Link
              href={`/docs/${doc.id}`}
              className="block p-3 hover:bg-gray-200 transition group relative"
            >
              <div className="font-medium text-gray-800 truncate">{doc.title || 'Untitled'}</div>
              <button
                onClick={(e) => handleDelete(doc.id, e)}
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 p-1"
              >
                Delete
              </button>
            </Link>
          </li>
        ))}
        {documents.length === 0 && (
          <div className="p-4 text-sm text-gray-500 text-center">No documents yet.</div>
        )}
      </ul>
    </aside>
  );
}
