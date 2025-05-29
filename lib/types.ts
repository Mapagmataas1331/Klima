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

export interface Conference {
  title: string;
  subTitle: string;
  date: string | undefined;
  month: string;
  year: string;
  timeStart: string | undefined;
  location: string;
  address: string | undefined;
  description: string | undefined;
  content: Block[] | undefined;
  team: { member: string; roleHere: string }[] | undefined;
  image: string | undefined;
}

export interface EnrichedConference extends Conference {
  slug: string;
  dateValue: Date;
  monthName: string;
  monthNameGenitive: string;
}

export interface Member {
  name: string;
  role: string | undefined;
  aboutList: string[] | undefined;
  contacts: string[] | undefined;
  image: string | undefined;
}

export interface Conferences {
  [key: string]: Conference;
}

export interface EnrichedConferences {
  [key: string]: EnrichedConference;
}

export interface Team {
  [key: string]: Member;
}
