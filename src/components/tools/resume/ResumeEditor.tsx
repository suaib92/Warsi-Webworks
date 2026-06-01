"use client";

import { useState } from 'react';
import { useResume } from './ResumeContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Wand2, Loader2, Plus, Trash2, ArrowUp, ArrowDown, Sparkles } from 'lucide-react';

export function ResumeEditor() {
  const { data, updatePersonalInfo, updateSkills, addItem, updateItem, removeItem, moveItem } = useResume();
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const handleAIAction = async (action: string, text: string, contextText: string, callback: (result: string) => void, id: string) => {
    setLoadingAction(id);
    try {
      const response = await fetch('/api/tools/resume-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, text, context: contextText }),
      });
      const result = await response.json();
      if (response.ok) {
        callback(result.result);
      } else {
        alert(result.error || 'Failed to generate content');
      }
    } catch (err) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Personal Details */}
      <div className="bg-surface p-6 border border-border-section rounded-xl space-y-4">
        <h3 className="font-bold text-text-primary text-lg">Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input value={data.personalInfo.name} onChange={e => updatePersonalInfo({ name: e.target.value })} placeholder="Full Name" className="bg-base" />
          <Input value={data.personalInfo.title} onChange={e => updatePersonalInfo({ title: e.target.value })} placeholder="Professional Title" className="bg-base" />
          <Input value={data.personalInfo.email} onChange={e => updatePersonalInfo({ email: e.target.value })} placeholder="Email" type="email" className="bg-base" />
          <Input value={data.personalInfo.phone} onChange={e => updatePersonalInfo({ phone: e.target.value })} placeholder="Phone" type="tel" className="bg-base" />
          <Input value={data.personalInfo.location} onChange={e => updatePersonalInfo({ location: e.target.value })} placeholder="Location (City, State)" className="bg-base" />
          <Input value={data.personalInfo.website} onChange={e => updatePersonalInfo({ website: e.target.value })} placeholder="Website / Portfolio" className="bg-base" />
          <Input value={data.personalInfo.linkedin} onChange={e => updatePersonalInfo({ linkedin: e.target.value })} placeholder="LinkedIn URL" className="bg-base" />
          <Input value={data.personalInfo.github} onChange={e => updatePersonalInfo({ github: e.target.value })} placeholder="GitHub URL" className="bg-base" />
        </div>
        <div className="pt-2">
          <div className="flex justify-between items-end mb-2">
            <label className="text-sm font-medium">Professional Summary</label>
            <Button size="sm" variant="outline" 
              onClick={() => handleAIAction('generate_summary', '', `Job Title: ${data.personalInfo.title}, Skills: ${data.skills}`, (res) => updatePersonalInfo({ summary: res }), 'summary')} 
              disabled={loadingAction === 'summary'} 
              className="h-7 text-xs border-accent text-accent hover:bg-accent/10">
              {loadingAction === 'summary' ? <Loader2 size={12} className="mr-1 animate-spin" /> : <Wand2 size={12} className="mr-1" />} 
              Generate Summary
            </Button>
          </div>
          <Textarea value={data.personalInfo.summary} onChange={e => updatePersonalInfo({ summary: e.target.value })} className="bg-base min-h-[100px]" placeholder="Brief professional summary..." />
        </div>
      </div>

      {/* Experience */}
      <div className="bg-surface p-6 border border-border-section rounded-xl space-y-6">
        <h3 className="font-bold text-text-primary text-lg">Professional Experience</h3>
        {data.experience.map((exp, index) => (
          <div key={exp.id} className="space-y-4 p-4 border border-border-section rounded-lg bg-base relative group">
            <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => moveItem('experience', exp.id, 'up')} disabled={index === 0}><ArrowUp size={14} /></Button>
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => moveItem('experience', exp.id, 'down')} disabled={index === data.experience.length - 1}><ArrowDown size={14} /></Button>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => removeItem('experience', exp.id)}><Trash2 size={14} /></Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-32">
              <Input value={exp.role} onChange={e => updateItem('experience', exp.id, { role: e.target.value })} placeholder="Job Title" />
              <Input value={exp.company} onChange={e => updateItem('experience', exp.id, { company: e.target.value })} placeholder="Company Name" />
              <Input value={exp.startDate} onChange={e => updateItem('experience', exp.id, { startDate: e.target.value })} placeholder="Start Date (e.g. Jan 2020)" />
              <Input value={exp.endDate} onChange={e => updateItem('experience', exp.id, { endDate: e.target.value })} placeholder="End Date (e.g. Present)" />
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="text-sm font-medium">Description</label>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" 
                    onClick={() => handleAIAction('generate_achievements', exp.description, `Role: ${exp.role} at ${exp.company}`, (res) => updateItem('experience', exp.id, { description: res }), `exp_gen_${exp.id}`)} 
                    disabled={loadingAction === `exp_gen_${exp.id}`} 
                    className="h-7 text-xs border-accent text-accent hover:bg-accent/10">
                    {loadingAction === `exp_gen_${exp.id}` ? <Loader2 size={12} className="mr-1 animate-spin" /> : <Wand2 size={12} className="mr-1" />} Generate
                  </Button>
                  <Button size="sm" variant="outline" 
                    onClick={() => handleAIAction('rewrite_bullet', exp.description, '', (res) => updateItem('experience', exp.id, { description: res }), `exp_rew_${exp.id}`)} 
                    disabled={loadingAction === `exp_rew_${exp.id}` || !exp.description} 
                    className="h-7 text-xs border-accent text-accent hover:bg-accent/10">
                    {loadingAction === `exp_rew_${exp.id}` ? <Loader2 size={12} className="mr-1 animate-spin" /> : <Wand2 size={12} className="mr-1" />} Rewrite
                  </Button>
                  {data.atsAnalysis && data.atsAnalysis.missingKeywords && data.atsAnalysis.missingKeywords.length > 0 && (
                    <Button size="sm" variant="outline" 
                      onClick={() => handleAIAction('inject_keywords', exp.description, `Target Job Description: ${data.jobDescription}. Missing keywords to include naturally: ${data.atsAnalysis!.missingKeywords.join(', ')}`, (res) => updateItem('experience', exp.id, { description: res }), `exp_inj_${exp.id}`)} 
                      disabled={loadingAction === `exp_inj_${exp.id}` || !exp.description} 
                      className="h-7 text-xs border-purple-500 text-purple-600 hover:bg-purple-500/10">
                      {loadingAction === `exp_inj_${exp.id}` ? <Loader2 size={12} className="mr-1 animate-spin" /> : <Sparkles size={12} className="mr-1" />} Inject Keywords
                    </Button>
                  )}
                </div>
              </div>
              <Textarea value={exp.description} onChange={e => updateItem('experience', exp.id, { description: e.target.value })} className="min-h-[100px]" placeholder="• Architected scalable solutions..." />
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => addItem('experience', { company: '', role: '', startDate: '', endDate: '', location: '', description: '' })} className="w-full border-dashed">
          <Plus size={16} className="mr-2" /> Add Experience
        </Button>
      </div>

      {/* Projects */}
      <div className="bg-surface p-6 border border-border-section rounded-xl space-y-6">
        <h3 className="font-bold text-text-primary text-lg">Projects</h3>
        {data.projects.map((proj, index) => (
          <div key={proj.id} className="space-y-4 p-4 border border-border-section rounded-lg bg-base relative group">
            <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => moveItem('projects', proj.id, 'up')} disabled={index === 0}><ArrowUp size={14} /></Button>
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => moveItem('projects', proj.id, 'down')} disabled={index === data.projects.length - 1}><ArrowDown size={14} /></Button>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => removeItem('projects', proj.id)}><Trash2 size={14} /></Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-32">
              <Input value={proj.name} onChange={e => updateItem('projects', proj.id, { name: e.target.value })} placeholder="Project Name" />
              <Input value={proj.techStack} onChange={e => updateItem('projects', proj.id, { techStack: e.target.value })} placeholder="Tech Stack (e.g. React, Node.js)" />
              <Input value={proj.githubUrl} onChange={e => updateItem('projects', proj.id, { githubUrl: e.target.value })} placeholder="GitHub URL" />
              <Input value={proj.liveUrl} onChange={e => updateItem('projects', proj.id, { liveUrl: e.target.value })} placeholder="Live URL" />
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="text-sm font-medium">Description</label>
                <Button size="sm" variant="outline" 
                  onClick={() => handleAIAction('rewrite_bullet', proj.description, '', (res) => updateItem('projects', proj.id, { description: res }), `proj_${proj.id}`)} 
                  disabled={loadingAction === `proj_${proj.id}` || !proj.description} 
                  className="h-7 text-xs border-accent text-accent hover:bg-accent/10">
                  {loadingAction === `proj_${proj.id}` ? <Loader2 size={12} className="mr-1 animate-spin" /> : <Wand2 size={12} className="mr-1" />} Rewrite
                </Button>
              </div>
              <Textarea value={proj.description} onChange={e => updateItem('projects', proj.id, { description: e.target.value })} className="min-h-[80px]" placeholder="• Developed a full-stack application..." />
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => addItem('projects', { name: '', techStack: '', description: '', githubUrl: '', liveUrl: '' })} className="w-full border-dashed">
          <Plus size={16} className="mr-2" /> Add Project
        </Button>
      </div>

      {/* Education */}
      <div className="bg-surface p-6 border border-border-section rounded-xl space-y-6">
        <h3 className="font-bold text-text-primary text-lg">Education</h3>
        {data.education.map((edu, index) => (
          <div key={edu.id} className="space-y-4 p-4 border border-border-section rounded-lg bg-base relative group">
            <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => moveItem('education', edu.id, 'up')} disabled={index === 0}><ArrowUp size={14} /></Button>
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => moveItem('education', edu.id, 'down')} disabled={index === data.education.length - 1}><ArrowDown size={14} /></Button>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => removeItem('education', edu.id)}><Trash2 size={14} /></Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-32">
              <Input value={edu.school} onChange={e => updateItem('education', edu.id, { school: e.target.value })} placeholder="School / University" />
              <Input value={edu.degree} onChange={e => updateItem('education', edu.id, { degree: e.target.value })} placeholder="Degree" />
              <Input value={edu.startDate} onChange={e => updateItem('education', edu.id, { startDate: e.target.value })} placeholder="Start Date" />
              <Input value={edu.endDate} onChange={e => updateItem('education', edu.id, { endDate: e.target.value })} placeholder="End Date" />
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => addItem('education', { school: '', degree: '', startDate: '', endDate: '', location: '' })} className="w-full border-dashed">
          <Plus size={16} className="mr-2" /> Add Education
        </Button>
      </div>

      {/* Certifications */}
      <div className="bg-surface p-6 border border-border-section rounded-xl space-y-6">
        <h3 className="font-bold text-text-primary text-lg">Certifications</h3>
        {data.certifications.map((cert, index) => (
          <div key={cert.id} className="space-y-4 p-4 border border-border-section rounded-lg bg-base relative group">
            <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => moveItem('certifications', cert.id, 'up')} disabled={index === 0}><ArrowUp size={14} /></Button>
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => moveItem('certifications', cert.id, 'down')} disabled={index === data.certifications.length - 1}><ArrowDown size={14} /></Button>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => removeItem('certifications', cert.id)}><Trash2 size={14} /></Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pr-32">
              <Input value={cert.name} onChange={e => updateItem('certifications', cert.id, { name: e.target.value })} placeholder="Certification Name" />
              <Input value={cert.issuer} onChange={e => updateItem('certifications', cert.id, { issuer: e.target.value })} placeholder="Issuer (e.g. AWS)" />
              <Input value={cert.date} onChange={e => updateItem('certifications', cert.id, { date: e.target.value })} placeholder="Date Earned" />
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => addItem('certifications', { name: '', issuer: '', date: '' })} className="w-full border-dashed">
          <Plus size={16} className="mr-2" /> Add Certification
        </Button>
      </div>

      {/* Skills */}
      <div className="bg-surface p-6 border border-border-section rounded-xl space-y-4">
        <div className="flex justify-between items-end mb-2">
          <h3 className="font-bold text-text-primary text-lg">Technical Skills</h3>
          <Button size="sm" variant="outline" 
            onClick={() => handleAIAction('suggest_skills', '', `Roles: ${data.experience.map(e => e.role).join(', ')}`, (res) => updateSkills(res), 'skills')} 
            disabled={loadingAction === 'skills'} 
            className="h-7 text-xs border-accent text-accent hover:bg-accent/10">
            {loadingAction === 'skills' ? <Loader2 size={12} className="mr-1 animate-spin" /> : <Wand2 size={12} className="mr-1" />} 
            Auto-Suggest
          </Button>
        </div>
        <Textarea value={data.skills} onChange={e => updateSkills(e.target.value)} className="bg-base min-h-[80px]" placeholder="React, Node.js, TypeScript..." />
      </div>

    </div>
  );
}
