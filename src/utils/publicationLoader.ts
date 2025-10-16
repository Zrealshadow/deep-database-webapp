import { PublicationList } from '../types/publication';

export async function loadPublications(): Promise<PublicationList> {
  const response = await fetch('/publications.json');
  if (!response.ok) {
    throw new Error('Failed to load publications');
  }
  return response.json();
}
