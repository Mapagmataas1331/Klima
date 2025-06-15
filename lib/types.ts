// ---------- Content Block ----------
export interface TextBlock {
  type: "text";
  text: string;
}

export interface WithImgBlock {
  type: "withImg";
  text: string;
  image: string;
  imagePosition?: "left" | "right";
}

export interface ListBlock {
  type: "list";
  title?: string;
  items: string[];
}

export type Block = TextBlock | WithImgBlock | ListBlock;

// ---------- Conference ----------
// Raw from Supabase
export interface ConferenceBase {
  id: string;
  slug: string;
  title: string;
  sub_title?: string;
  day?: string;
  month?: string;
  year?: string;
  time?: string;
  duration?: string;
  location: string;
  address?: string;
  description?: string;
  image?: string;
}

// Enriched with derived fields
export interface EnrichedConference extends ConferenceBase {
  content: Block[];
  dateValue: Date;
  isPast: boolean;
  monthName: string;
  monthNameGenitive: string;
}

// ---------- Team Member ----------
export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  role?: string;
  about_list?: string[];
  contacts?: string[];
  image?: string;
}

export interface ConferenceMember {
  team_member: TeamMember;
  role_in_conference?: string;
}

// Conference-Team Many-to-Many
export interface ConferenceTeamMember {
  conference_id: string;
  team_member_id: string;
  role_in_conference?: string;
}

// ---------- Output Structures ----------
export type ConferenceList = EnrichedConference[];
export type TeamList = TeamMember[];

export interface FetchedConferencesResult {
  conferences: EnrichedConference[];
  upcomingConference: EnrichedConference[];
  closestConference: EnrichedConference | null;
}
