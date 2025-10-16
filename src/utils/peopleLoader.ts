import { PeopleList } from '../types/people';

export async function loadPeople(): Promise<PeopleList> {
  const response = await fetch('/people.json');
  if (!response.ok) {
    throw new Error('Failed to load people');
  }
  return response.json();
}
