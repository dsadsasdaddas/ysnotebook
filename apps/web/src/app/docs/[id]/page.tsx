import { fetchDocument } from '../../../actions/document';
import Editor from '../../../components/Editor';

export default async function DocumentPage({ params }: { params: { id: string } }) {
  const document = await fetchDocument(params.id);

  return (
    <div className="h-full">
      <Editor document={document} />
    </div>
  );
}
