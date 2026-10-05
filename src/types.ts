export type Page = {
  TITLE: string;
  DESCRIPTION: string;
};

export interface Site extends Page {
  AUTHOR: string;
}

export type Links = {
  TEXT: string;
  HREF: string;
}[];

export interface Social {
  network: string;
  url: string;
}

export interface Basics {
  name: string;
  nickname?: string;
  label: string;
  summary: string;
  location: {
    city: string;
    countryCode: string;
    region: string;
  };
  socials: Social[];
}

export interface WorkItem {
  name: string;
  position: string;
  location_type?: string | null;
  location?: string | null;
  url: string | null;
  startDate: string;
  endDate: string | null;
  summary?: string | string[] | null;
  responsibilities?: string[];
}

export interface EducationItem {
  institution: string;
  url: string | null;
  area: string;
  studyType: string;
  startDate: string | null;
  endDate: string | null;
  summary?: string | string[] | null;
}

export interface Award {
  title: string;
  date: string;
  awarder: string;
}

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
  number?: string;
  grade?: string;
  points?: string;
  expires?: string;
}

export interface Skills {
  operating_systems?: string[];
  languages?: string[];
  cloud?: string[];
  networking?: string[];
  frameworks?: string[];
  databases?: string[];
  tools?: string[];
  virtualization?: string[];
  security?: string[];
  technical?: string[];
  leadership?: string[];
  soft?: string[];
}

export interface Project {
  name: string;
  description: string;
  url?: string;
  highlights: string[];
  technologies?: string[];
}

export interface Cv {
  basics: Basics;
  work: WorkItem[];
  education: EducationItem[];
  certificates: Certificate[];
  awards: Award[];
  skills: Skills;
  projects: Project[];
}
