export type ResumeTemplate = 'classic' | 'professional' | 'developer';

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  location: string;
}

export interface Project {
  id: string;
  name: string;
  techStack: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeData {
  template: ResumeTemplate;
  personalInfo: PersonalInfo;
  skills: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  jobDescription?: string;
  atsAnalysis?: {
    matchPercentage: number;
    missingKeywords: string[];
    suggestions: string[];
  };
}

export const initialResumeData: ResumeData = {
  template: 'classic',
  personalInfo: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
  },
  skills: '',
  experience: [],
  education: [],
  projects: [],
  certifications: [],
  jobDescription: '',
};
