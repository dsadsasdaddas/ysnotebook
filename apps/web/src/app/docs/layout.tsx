import { ReactNode } from 'react';
import { fetchDocuments } from '../../actions/document';
import Sidebar from '../../components/Sidebar';

export default async function DocsLayout({ children }: { children: ReactNode }) {
  const documents = await fetchDocuments();

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar for document list */}
      <Sidebar initialDocuments={documents} />
      
      {/* Main content area for editing */}
      <main className="flex-1 overflow-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
}
