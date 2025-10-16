export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: 'Conference' | 'Journal' | 'Workshop' | 'Preprint';
  pdf?: string;
  code?: string;
  abstract: string;
}

export interface PublicationList {
  publications: Publication[];
}
