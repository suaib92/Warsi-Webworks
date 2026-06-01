"use client";

import { useState } from 'react';
import { Wand2, Copy, Check, Download, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { exportToPDF } from '@/lib/export-utils';

export default function CoverLetterGenerator() {
  const [jobTitle, setJobTitle] = useState('Frontend Developer');
  const [companyName, setCompanyName] = useState('Google');
  const [skills, setSkills] = useState('React, Next.js, Tailwind CSS');
  const [experienceLevel, setExperienceLevel] = useState('Senior');
  const [tone, setTone] = useState('Professional');
  
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const generateLetter = async () => {
    setIsGenerating(true);
    setError(null);
    setGeneratedLetter('');

    try {
      const response = await fetch('/api/tools/cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle,
          companyName,
          skills,
          experienceLevel,
          tone
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate cover letter');
      }

      setGeneratedLetter(data.coverLetter || '');
    } catch (err: any) {
      setError(err.message || 'An error occurred while generating the cover letter.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedLetter) {
      navigator.clipboard.writeText(generatedLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = async () => {
    setIsExporting(true);
    await exportToPDF('cover-letter-pdf', `CoverLetter-${companyName || 'Draft'}.pdf`);
    setIsExporting(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Inputs Section */}
      <div className="space-y-6">
        
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 flex items-start gap-4 mb-6">
          <div className="mt-1 bg-accent rounded-full p-2 text-white">
            <Wand2 size={16} />
          </div>
          <div>
            <h4 className="font-bold text-text-primary text-sm">AI Powered Generation</h4>
            <p className="text-xs text-text-muted mt-1">
              Provide the job details below and our NVIDIA AI will draft a highly targeted cover letter.
            </p>
          </div>
        </div>

        <div className="bg-surface p-6 border border-border-section rounded-xl space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-text-primary">Target Job Title</label>
            <Input 
              value={jobTitle} onChange={e => setJobTitle(e.target.value)} 
              placeholder="e.g. Product Manager" className="bg-base" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-text-primary">Target Company Name</label>
            <Input 
              value={companyName} onChange={e => setCompanyName(e.target.value)} 
              placeholder="e.g. Acme Corp" className="bg-base" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-text-primary">Key Skills to Highlight</label>
            <Input 
              value={skills} onChange={e => setSkills(e.target.value)} 
              placeholder="e.g. Python, Data Analysis, Leadership" className="bg-base" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary">Experience Level</label>
              <select 
                value={experienceLevel} onChange={e => setExperienceLevel(e.target.value)}
                className="w-full h-10 px-3 py-2 bg-base border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option>Entry Level</option>
                <option>Mid Level</option>
                <option>Senior</option>
                <option>Executive</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary">Tone</label>
              <select 
                value={tone} onChange={e => setTone(e.target.value)}
                className="w-full h-10 px-3 py-2 bg-base border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option>Professional</option>
                <option>Enthusiastic</option>
                <option>Confident</option>
                <option>Creative</option>
              </select>
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={generateLetter} 
              disabled={isGenerating || !jobTitle || !companyName} 
              className="w-full bg-accent hover:bg-accent-hover text-white font-bold h-12"
            >
              {isGenerating ? (
                <span className="flex items-center gap-2"><Wand2 size={18} className="animate-pulse" /> Drafting Letter...</span>
              ) : (
                <span className="flex items-center gap-2"><Wand2 size={18} /> Generate Cover Letter</span>
              )}
            </Button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg">
              {error}
            </div>
          )}
        </div>

      </div>

      {/* Output Section */}
      <div className="lg:sticky lg:top-24 h-max">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Cover Letter</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={copyToClipboard} 
              disabled={!generatedLetter}
              className="border-accent text-accent hover:bg-accent/10"
            >
              {copied ? <Check size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
            <Button 
              onClick={handlePrint} 
              disabled={!generatedLetter || isExporting}
              className="bg-accent hover:bg-accent-hover text-white"
            >
              {isExporting ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Download size={16} className="mr-2" />}
              Download PDF
            </Button>
          </div>
        </div>

        <div id="cover-letter-pdf" className="bg-white dark:bg-[#1a1a1a] p-8 rounded-xl shadow-sm border border-border-section min-h-[500px] overflow-auto">
          {generatedLetter ? (
            <div className="text-sm leading-relaxed whitespace-pre-wrap font-serif text-gray-800 dark:text-gray-200">
              {generatedLetter}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-text-muted text-sm text-center p-8">
              Fill out the details on the left and click Generate to create your targeted cover letter.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
