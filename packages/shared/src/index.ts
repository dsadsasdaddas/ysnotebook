export const APP_NAME = 'ysnotebook';

export const ROADMAP = ['auth', 'workspace', 'document', 'comment', 'collab'];

export interface DocumentDto {
  id: string;
  title: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDocumentDto {
  title: string;
  content?: string;
}

export interface UpdateDocumentDto {
  title?: string;
  content?: string;
}
