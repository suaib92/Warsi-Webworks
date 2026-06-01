"use client";

import { useResume } from './ResumeContext';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Code } from 'lucide-react';

export function ResumePreview() {
  const { data } = useResume();

  const formatSkills = (skills: string) => {
    return skills.split(',').map(s => s.trim()).filter(Boolean).join(' | ');
  };

  const TemplateClassic = () => (
    <div className="bg-white text-black p-8 max-w-[816px] mx-auto min-h-[1056px] shadow-sm border font-serif leading-snug">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold uppercase mb-3">{data.personalInfo.name || 'YOUR NAME'}</h1>
        {data.personalInfo.title && <h2 className="text-lg uppercase mb-3 tracking-wider">{data.personalInfo.title}</h2>}
        <div className="text-sm flex flex-wrap justify-center gap-x-3 gap-y-1">
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.phone && <span>| {data.personalInfo.phone}</span>}
          {data.personalInfo.email && <span>| {data.personalInfo.email}</span>}
          {data.personalInfo.linkedin && <span>| {data.personalInfo.linkedin}</span>}
          {data.personalInfo.github && <span>| {data.personalInfo.github}</span>}
          {data.personalInfo.website && <span>| {data.personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-black pb-1 mb-2 tracking-widest">Professional Summary</h2>
          <p className="text-sm">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Skills */}
      {data.skills && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-black pb-1 mb-2 tracking-widest">Core Skills</h2>
          <p className="text-sm leading-relaxed">{formatSkills(data.skills)}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-black pb-1 mb-2 tracking-widest">Professional Experience</h2>
          {data.experience.map(exp => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between font-bold text-sm">
                <span>{exp.company} {exp.location && "- " + exp.location}</span>
                <span>{exp.startDate} - {exp.endDate}</span>
              </div>
              <div className="italic text-sm mb-1">{exp.role}</div>
              <p className="text-sm whitespace-pre-wrap pl-4">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-black pb-1 mb-2 tracking-widest">Projects</h2>
          {data.projects.map(proj => (
            <div key={proj.id} className="mb-3">
              <div className="font-bold text-sm flex gap-2 items-center">
                {proj.name}
                <span className="font-normal text-xs italic">| {proj.techStack}</span>
                <div className="font-normal text-xs flex gap-2 ml-auto">
                  {proj.githubUrl && <span>{proj.githubUrl}</span>}
                  {proj.liveUrl && <span>{proj.liveUrl}</span>}
                </div>
              </div>
              <p className="text-sm whitespace-pre-wrap pl-4">{proj.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-black pb-1 mb-2 tracking-widest">Education</h2>
          {data.education.map(edu => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between font-bold text-sm">
                <span>{edu.school} {edu.location && "- " + edu.location}</span>
                <span>{edu.startDate} - {edu.endDate}</span>
              </div>
              <div className="text-sm">{edu.degree}</div>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-black pb-1 mb-2 tracking-widest">Certifications</h2>
          {data.certifications.map(cert => (
            <div key={cert.id} className="flex justify-between text-sm mb-1">
              <span className="font-bold">{cert.name} <span className="font-normal italic">- {cert.issuer}</span></span>
              <span>{cert.date}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const TemplateProfessional = () => (
    <div className="bg-white text-gray-900 p-8 max-w-[816px] mx-auto min-h-[1056px] shadow-sm border font-sans leading-relaxed">
      {/* Header */}
      <div className="flex justify-between items-end border-b-2 border-blue-900 pb-4 mb-6">
        <div>
          <h1 className="text-4xl font-black text-blue-900 tracking-tight uppercase mb-3">{data.personalInfo.name || 'YOUR NAME'}</h1>
          <p className="text-lg text-gray-600 font-medium tracking-wide uppercase">{data.personalInfo.title || 'Professional Title'}</p>
        </div>
        <div className="text-xs text-right space-y-1 text-gray-600">
          {data.personalInfo.email && <div className="flex items-center justify-end gap-1"><Mail size={10} /> {data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div className="flex items-center justify-end gap-1"><Phone size={10} /> {data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div className="flex items-center justify-end gap-1"><MapPin size={10} /> {data.personalInfo.location}</div>}
          {data.personalInfo.linkedin && <div className="flex items-center justify-end gap-1"><Globe size={10} /> {data.personalInfo.linkedin}</div>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <p className="text-sm text-gray-800">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Skills */}
      {data.skills && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-blue-900 uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-4 h-[2px] bg-blue-900"></span> CORE SKILLS
          </h2>
          <p className="text-sm text-gray-800 leading-relaxed font-medium">{formatSkills(data.skills)}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-blue-900 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-4 h-[2px] bg-blue-900"></span> EXPERIENCE
          </h2>
          {data.experience.map(exp => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="font-bold text-gray-900 text-sm">{exp.role}</h3>
                <span className="text-xs font-medium text-gray-600 ml-4">{exp.startDate} - {exp.endDate}</span>
              </div>
              <div className="text-blue-900 italic text-xs mb-1 font-medium">{exp.company} {exp.location && " | " + exp.location}</div>
              <p className="text-sm text-gray-800 whitespace-pre-wrap">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-blue-900 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-4 h-[2px] bg-blue-900"></span> PROJECTS
          </h2>
          {data.projects.map(proj => (
            <div key={proj.id} className="mb-4">
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="font-bold text-gray-900 text-sm">{proj.name}</h3>
                <div className="text-xs text-gray-500">
                  {proj.githubUrl} {proj.liveUrl && " | " + proj.liveUrl}
                </div>
              </div>
              <div className="text-blue-900 text-xs mb-1 font-medium">{proj.techStack}</div>
              <p className="text-sm text-gray-800 whitespace-pre-wrap">{proj.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education & Certs Grid */}
      <div className="grid grid-cols-2 gap-6">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-base font-bold text-blue-900 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-4 h-[2px] bg-blue-900"></span> EDUCATION
            </h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3">
                <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                <div className="text-gray-700 text-xs">{edu.school}</div>
                <div className="text-gray-500 text-xs">{edu.startDate} - {edu.endDate}</div>
              </div>
            ))}
          </div>
        )}
        {data.certifications.length > 0 && (
          <div>
            <h2 className="text-base font-bold text-blue-900 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-4 h-[2px] bg-blue-900"></span> CERTIFICATIONS
            </h2>
            {data.certifications.map(cert => (
              <div key={cert.id} className="mb-3">
                <h3 className="font-bold text-gray-900 text-sm">{cert.name}</h3>
                <div className="text-gray-700 text-xs">{cert.issuer}</div>
                <div className="text-gray-500 text-xs">{cert.date}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const TemplateDeveloper = () => (
    <div className="bg-white text-[#1a1a1a] p-8 max-w-[816px] mx-auto min-h-[1056px] shadow-sm border font-mono text-sm leading-relaxed">
      {/* Header */}
      <div className="mb-6 pb-6 border-b-2 border-[#1a1a1a]">
        <h1 className="text-3xl font-black uppercase mb-3 tracking-tight">{data.personalInfo.name || 'YOUR NAME'}</h1>
        <h2 className="text-lg font-bold bg-[#1a1a1a] text-white inline-block px-2 py-1 mb-4">{data.personalInfo.title || 'SOFTWARE ENGINEER'}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          {data.personalInfo.email && <div className="flex items-center gap-2"><Mail size={12} /> {data.personalInfo.email}</div>}
          {data.personalInfo.github && <div className="flex items-center gap-2"><Globe size={12} /> {data.personalInfo.github}</div>}
          {data.personalInfo.linkedin && <div className="flex items-center gap-2"><Globe size={12} /> {data.personalInfo.linkedin}</div>}
          {data.personalInfo.website && <div className="flex items-center gap-2"><Globe size={12} /> {data.personalInfo.website}</div>}
          {data.personalInfo.location && <div className="flex items-center gap-2"><MapPin size={12} /> {data.personalInfo.location}</div>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <p className="font-sans text-sm">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Tech Stack */}
      {data.skills && (
        <div className="mb-6">
          <h2 className="text-base font-bold uppercase mb-2 flex items-center gap-2"><Code size={16} /> Tech Stack</h2>
          <p className="font-sans text-sm font-bold">{formatSkills(data.skills)}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8">
          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-base font-bold uppercase mb-3 flex items-center gap-2"><Briefcase size={16} /> Experience</h2>
              {data.experience.map(exp => (
                <div key={exp.id} className="mb-5 relative before:absolute before:left-[-16px] before:top-[6px] before:w-2 before:h-2 before:bg-[#1a1a1a]">
                  <div className="font-bold text-base">{exp.role}</div>
                  <div className="text-xs mb-2 font-bold opacity-75">{exp.company} | {exp.startDate} - {exp.endDate}</div>
                  <p className="font-sans text-sm whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-base font-bold uppercase mb-3 flex items-center gap-2"><Code size={16} /> Featured Projects</h2>
              {data.projects.map(proj => (
                <div key={proj.id} className="mb-4 p-3 border border-dashed border-[#1a1a1a]">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold">{proj.name}</h3>
                    <div className="text-xs">
                      {proj.githubUrl && <a href={proj.githubUrl} className="underline mr-2">Repo</a>}
                      {proj.liveUrl && <a href={proj.liveUrl} className="underline">Live</a>}
                    </div>
                  </div>
                  <div className="text-xs font-bold mb-2">&gt; {proj.techStack}</div>
                  <p className="font-sans text-sm whitespace-pre-wrap">{proj.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="md:col-span-4">
          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-base font-bold uppercase mb-3 flex items-center gap-2"><GraduationCap size={16} /> Education</h2>
              {data.education.map(edu => (
                <div key={edu.id} className="mb-3">
                  <div className="font-bold text-sm">{edu.degree}</div>
                  <div className="text-xs">{edu.school}</div>
                  <div className="text-xs opacity-75">{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-base font-bold uppercase mb-3 flex items-center gap-2"><GraduationCap size={16} /> Certs</h2>
              {data.certifications.map(cert => (
                <div key={cert.id} className="mb-3 border-l-2 border-[#1a1a1a] pl-2">
                  <div className="font-bold text-xs">{cert.name}</div>
                  <div className="text-xs">{cert.issuer}</div>
                  <div className="text-xs opacity-75">{cert.date}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {data.template === 'classic' && <TemplateClassic />}
      {data.template === 'professional' && <TemplateProfessional />}
      {data.template === 'developer' && <TemplateDeveloper />}
    </div>
  );
}
