export type TeamCategory = 'Faculty' | 'PhD Student' | 'Research Staff' | 'Alumni';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: TeamCategory;
  email?: string;
  website?: string;
  interests?: string[];
  bio: string;
  image?: string;
}

export interface PeopleList {
  people: TeamMember[];
}
