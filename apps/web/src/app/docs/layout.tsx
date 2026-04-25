import { ReactNode } from 'react';
import { fetchDocuments } from '../../actions/document';
import Sidebar from '../../components/Sidebar';

export default async function DocsLayout({ children }: { children: ReactNode }) {
  const documents = await fetchDocuments();

  return (
    <div className="flex h-screen bg-bg-primary">
      <Sidebar initialDocuments={documents} />
      <main className="flex-1 overflow-auto bg-bg-primary">
        {children}
      </main>
    </div>
  );
}
