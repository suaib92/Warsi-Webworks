import { z } from 'zod';

// --- Business Name Generator ---

export const BusinessNameInputSchema = z.object({
  seed: z.string().max(50).optional().default(''),
  industry: z.string().min(1).max(50),
});

export const BusinessNameOutputSchema = z.object({
  names: z.array(z.string()).min(10).max(30),
});

// --- Cover Letter Generator ---

export const CoverLetterInputSchema = z.object({
  jobTitle: z.string().min(2).max(100),
  companyName: z.string().min(2).max(100),
  skills: z.string().min(2).max(300),
  experienceLevel: z.string().min(2).max(50),
  tone: z.string().min(2).max(50),
});

export const CoverLetterOutputSchema = z.object({
  coverLetter: z.string().min(100),
});

// --- Resume Builder ---

export const ResumeAIInputSchema = z.object({
  action: z.enum(['generate_summary', 'optimize_keywords', 'rewrite_bullet', 'suggest_skills', 'generate_achievements', 'analyze_ats_match', 'inject_keywords']),
  text: z.string().optional(),
  context: z.string().optional(),
});

export const ResumeAIOutputSchema = z.object({
  result: z.string().min(5),
});
