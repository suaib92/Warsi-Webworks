"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { ResumeData, initialResumeData, Experience, Education, Project, Certification, ResumeTemplate } from '@/lib/types/resume';

interface ResumeContextType {
  data: ResumeData;
  setData: (data: ResumeData) => void;
  updatePersonalInfo: (fields: Partial<ResumeData['personalInfo']>) => void;
  updateSkills: (skills: string) => void;
  setTemplate: (template: ResumeTemplate) => void;
  setJobDescription: (jd: string) => void;
  setAtsAnalysis: (analysis: NonNullable<ResumeData['atsAnalysis']>) => void;
  
  // Generic list operations
  addItem: <K extends 'experience' | 'education' | 'projects' | 'certifications'>(section: K, item: any) => void;
  updateItem: <K extends 'experience' | 'education' | 'projects' | 'certifications'>(section: K, id: string, fields: any) => void;
  removeItem: <K extends 'experience' | 'education' | 'projects' | 'certifications'>(section: K, id: string) => void;
  moveItem: <K extends 'experience' | 'education' | 'projects' | 'certifications'>(section: K, id: string, direction: 'up' | 'down') => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ResumeData>({
    ...initialResumeData,
    // Provide some default dummy data for preview
    personalInfo: {
      name: 'John Doe',
      title: 'Senior Software Engineer',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      location: 'San Francisco, CA',
      website: 'johndoe.com',
      linkedin: 'linkedin.com/in/johndoe',
      github: 'github.com/johndoe',
      summary: 'Results-driven Software Engineer with 5+ years of experience building scalable web applications. Expert in React, Node.js, and cloud architectures. Proven track record of improving application performance and leading agile teams.',
    },
    skills: 'JavaScript, TypeScript, React, Next.js, Node.js, Express, Python, SQL, MongoDB, AWS, Docker, Git',
    experience: [
      {
        id: '1',
        company: 'Tech Solutions Inc.',
        role: 'Senior Frontend Engineer',
        startDate: 'Jan 2021',
        endDate: 'Present',
        location: 'San Francisco, CA',
        description: '• Architected and migrated a legacy monolith to a Next.js micro-frontend architecture, reducing page load times by 45%.\n• Managed a team of 4 junior developers and established CI/CD best practices using GitHub Actions.\n• Implemented responsive design systems used by over 1M monthly active users.'
      }
    ],
    education: [
      {
        id: '1',
        school: 'University of Technology',
        degree: 'B.S. Computer Science',
        startDate: 'Aug 2016',
        endDate: 'May 2020',
        location: 'New York, NY',
      }
    ]
  });

  const updatePersonalInfo = (fields: Partial<ResumeData['personalInfo']>) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...fields }
    }));
  };

  const updateSkills = (skills: string) => {
    setData(prev => ({ ...prev, skills }));
  };

  const setTemplate = (template: ResumeTemplate) => {
    setData(prev => ({ ...prev, template }));
  };

  const setJobDescription = (jd: string) => {
    setData(prev => ({ ...prev, jobDescription: jd }));
  };

  const setAtsAnalysis = (analysis: NonNullable<ResumeData['atsAnalysis']>) => {
    setData(prev => ({ ...prev, atsAnalysis: analysis }));
  };

  const addItem = <K extends 'experience' | 'education' | 'projects' | 'certifications'>(section: K, item: any) => {
    setData(prev => ({
      ...prev,
      [section]: [...prev[section], { ...item, id: crypto.randomUUID() }]
    }));
  };

  const updateItem = <K extends 'experience' | 'education' | 'projects' | 'certifications'>(section: K, id: string, fields: any) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].map((item: any) => item.id === id ? { ...item, ...fields } : item)
    }));
  };

  const removeItem = <K extends 'experience' | 'education' | 'projects' | 'certifications'>(section: K, id: string) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].filter((item: any) => item.id !== id)
    }));
  };

  const moveItem = <K extends 'experience' | 'education' | 'projects' | 'certifications'>(section: K, id: string, direction: 'up' | 'down') => {
    setData(prev => {
      const items = [...prev[section]] as any[];
      const index = items.findIndex(item => item.id === id);
      if (index === -1) return prev;
      if (direction === 'up' && index === 0) return prev;
      if (direction === 'down' && index === items.length - 1) return prev;

      const newIndex = direction === 'up' ? index - 1 : index + 1;
      const temp = items[index];
      items[index] = items[newIndex];
      items[newIndex] = temp;

      return { ...prev, [section]: items };
    });
  };

  return (
    <ResumeContext.Provider value={{
      data, setData, updatePersonalInfo, updateSkills, setTemplate,
      setJobDescription, setAtsAnalysis,
      addItem, updateItem, removeItem, moveItem
    }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
