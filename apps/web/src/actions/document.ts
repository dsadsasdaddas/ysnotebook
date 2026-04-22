'use server';

import { revalidatePath } from 'next/cache';

const API_BASE_URL = 'http://localhost:3001/api';

export async function fetchDocuments() {
  const res = await fetch(`${API_BASE_URL}/documents`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch documents');
  }
  return res.json();
}

export async function fetchDocument(id: string) {
  const res = await fetch(`${API_BASE_URL}/documents/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch document');
  }
  return res.json();
}

export async function createDocumentAction(data: { title: string; content?: string }) {
  const res = await fetch(`${API_BASE_URL}/documents`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) {
    throw new Error('Failed to create document');
  }
  
  revalidatePath('/docs');
  return res.json();
}

export async function updateDocumentAction(id: string, data: { title?: string; content?: string }) {
  const res = await fetch(`${API_BASE_URL}/documents/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to update document');
  }

  revalidatePath('/docs');
  revalidatePath(`/docs/${id}`);
  return res.json();
}

export async function deleteDocumentAction(id: string) {
  const res = await fetch(`${API_BASE_URL}/documents/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete document');
  }

  revalidatePath('/docs');
  return true;
}
