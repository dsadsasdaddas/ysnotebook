export type DocBlock = {
  id: string;
  type: 'paragraph' | 'heading' | 'todo';
  content: string;
};

export function createParagraph(id: string, content = ''): DocBlock {
  return { id, type: 'paragraph', content };
}
