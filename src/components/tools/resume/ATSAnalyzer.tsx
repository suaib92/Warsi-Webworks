"use client";

import { useState } from 'react';
import { useResume } from './ResumeContext';
import { AlertCircle, CheckCircle2, Target, Wand2, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useMemo } from 'react';

const ACTION_VERBS = ['led', 'developed', 'architected', 'managed', 'created', 'spearheaded', 'engineered', 'designed', 'optimized', 'increased', 'reduced', 'implemented'];

export function ATSAnalyzer() {
  const { data, setJobDescription, setAtsAnalysis } = useResume();
  const [loading, setLoading] = useState(false);

  // Fallback / Baseline Structural Score
  const structuralAnalysis = useMemo(() => {
    let score = 0;
    const recommendations: { type: 'success' | 'warning', message: string }[] = [];

    const hasBasicContact = !!(data.personalInfo.name && data.personalInfo.email && data.personalInfo.phone);
    if (hasBasicContact) score += 15;
    else recommendations.push({ type: 'warning', message: 'Missing basic contact info (Name, Email, Phone).' });

    if (data.personalInfo.linkedin || data.personalInfo.github) score += 5;
    else recommendations.push({ type: 'warning', message: 'Add a LinkedIn or GitHub URL for technical roles.' });

    if (data.personalInfo.summary.length > 50) {
      score += 10;
      recommendations.push({ type: 'success', message: 'Professional summary is adequately detailed.' });
    } else {
      recommendations.push({ type: 'warning', message: 'Professional summary is too short or missing.' });
    }

    if (data.experience.length > 0) {
      score += 20;
      const allText = data.experience.map(e => e.description.toLowerCase()).join(' ');
      const verbsFound = ACTION_VERBS.filter(v => allText.includes(v));
      if (verbsFound.length >= 3) {
        score += 20;
        recommendations.push({ type: 'success', message: 'Strong use of action verbs in experience.' });
      } else {
        score += verbsFound.length * 5;
        recommendations.push({ type: 'warning', message: 'Use more strong action verbs (e.g., Developed, Engineered) in your experience.' });
      }
    } else {
      recommendations.push({ type: 'warning', message: 'No professional experience listed.' });
    }

    if (data.education.length > 0) score += 5;
    else recommendations.push({ type: 'warning', message: 'Missing education section.' });

    const skillsCount = data.skills.split(',').filter(s => s.trim().length > 0).length;
    if (skillsCount >= 5) score += 15;
    else {
      score += skillsCount * 3;
      recommendations.push({ type: 'warning', message: 'Add more technical skills (aim for at least 5-10 core skills).' });
    }

    if (data.projects.length > 0) score += 5;
    if (data.certifications.length > 0) score += 5;

    return { score, recommendations };
  }, [data]);

  const handleAnalyzeMatch = async () => {
    if (!data.jobDescription) {
      alert("Please paste a job description first.");
      return;
    }
    setLoading(true);
    try {
      // Create a text representation of the resume for the AI
      const resumeText = `
Name: ${data.personalInfo.name}
Title: ${data.personalInfo.title}
Summary: ${data.personalInfo.summary}
Skills: ${data.skills}
Experience: ${data.experience.map(e => `${e.role} at ${e.company}: ${e.description}`).join(' | ')}
Projects: ${data.projects.map(p => `${p.name} (${p.techStack}): ${p.description}`).join(' | ')}
Education: ${data.education.map(e => `${e.degree} at ${e.school}`).join(' | ')}
      `.trim();

      const response = await fetch('/api/tools/resume-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'analyze_ats_match', 
          text: resumeText,
          context: data.jobDescription
        }),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // The API returns the JSON structure we defined in the prompt library
        // Ensure it is parsed properly since generateCompletion returns a string usually, but we forced JSON.
        let analysisObj;
        try {
           // If the AI returned a string that looks like JSON, parse it. Otherwise assume the API handled it.
           analysisObj = typeof result === 'string' ? JSON.parse(result) : result;
           if (typeof analysisObj.matchPercentage !== 'number') {
             // Try to parse the nested result string if wrapped
             analysisObj = JSON.parse(analysisObj.result || analysisObj);
           }
        } catch (e) {
           console.error("Failed to parse AI output:", result);
           alert("The AI returned an invalid format. Please try again.");
           return;
        }

        setAtsAnalysis({
          matchPercentage: analysisObj.matchPercentage || 0,
          missingKeywords: analysisObj.missingKeywords || [],
          suggestions: analysisObj.suggestions || []
        });
      } else {
        alert(result.error || 'Failed to analyze match');
      }
    } catch (err) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const finalScore = data.atsAnalysis ? data.atsAnalysis.matchPercentage : structuralAnalysis.score;
  const isMatchScore = !!data.atsAnalysis;

  return (
    <div className="bg-surface p-6 border border-border-section rounded-xl space-y-6">
      
      {/* Score Header */}
      <div className="flex items-center justify-between border-b border-border-section pb-4">
        <div>
          <h3 className="font-bold text-text-primary text-lg flex items-center gap-2">
            <Target size={20} className="text-blue-600" />
            {isMatchScore ? 'Job Description Match' : 'Base ATS Score'}
          </h3>
          <p className="text-xs text-text-muted mt-1">
            {isMatchScore ? 'AI-powered keyword and structural match.' : 'Basic structural optimization score.'}
          </p>
        </div>
        <span className={"text-3xl font-black " + (finalScore >= 80 ? 'text-green-500' : finalScore >= 60 ? 'text-yellow-500' : 'text-red-500')}>
          {finalScore}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
        <div className={"h-2.5 rounded-full transition-all duration-1000 " + (finalScore >= 80 ? 'bg-green-500' : finalScore >= 60 ? 'bg-yellow-500' : 'bg-red-500')} style={{ width: finalScore + '%' }}></div>
      </div>

      {/* Job Description Matcher */}
      <div className="bg-base p-4 rounded-lg border border-border-section space-y-3">
        <label className="text-sm font-semibold flex items-center gap-2">
          <Sparkles size={16} className="text-purple-500" />
          Target Job Description
        </label>
        <Textarea 
          value={data.jobDescription || ''} 
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here to analyze how well your resume matches..."
          className="min-h-[100px] text-xs"
        />
        <Button 
          onClick={handleAnalyzeMatch} 
          disabled={loading || !data.jobDescription} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          {loading ? <Loader2 size={16} className="animate-spin mr-2" /> : <Wand2 size={16} className="mr-2" />}
          Analyze ATS Match
        </Button>
      </div>

      {/* AI JD Analysis Results */}
      {data.atsAnalysis && (
        <div className="space-y-4 pt-2">
          <div>
            <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-2">Missing Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {data.atsAnalysis.missingKeywords.length > 0 ? data.atsAnalysis.missingKeywords.map((kw, i) => (
                <span key={i} className="px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs rounded font-medium border border-red-200 dark:border-red-800">
                  {kw}
                </span>
              )) : (
                <span className="text-sm text-green-600 font-medium">No major keywords missing!</span>
              )}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-2">AI Suggestions</h4>
            <ul className="space-y-2">
              {data.atsAnalysis.suggestions.map((sug, i) => (
                <li key={i} className="text-sm flex items-start gap-2 bg-blue-50 dark:bg-blue-900/10 p-2 rounded border border-blue-100 dark:border-blue-900/50">
                  <span className="text-blue-500 font-bold">•</span> 
                  <span className="text-gray-700 dark:text-gray-300">{sug}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Base Structural Recommendations (Only show heavily if JD isn't provided, or just show warnings) */}
      {!data.atsAnalysis && (
        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-2">Structural Analysis</h4>
          {structuralAnalysis.recommendations.map((rec, idx) => (
            <div key={idx} className={"flex items-start gap-2 p-3 rounded-md text-sm " + (rec.type === 'success' ? 'bg-green-500/10 text-green-700 dark:text-green-400' : 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400')}>
              {rec.type === 'success' ? <CheckCircle2 size={16} className="mt-0.5 shrink-0" /> : <AlertCircle size={16} className="mt-0.5 shrink-0" />}
              <span>{rec.message}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
