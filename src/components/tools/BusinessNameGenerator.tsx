"use client";

import { useState } from 'react';
import { Sparkles, Copy, CheckCircle2, ArrowRight, Download, FileText, FileSpreadsheet } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { Loader2 } from 'lucide-react';
import { exportToText, exportToCSV } from '@/lib/export-utils';

export default function BusinessNameGenerator() {
  const [keyword, setKeyword] = useState('');
  const [industry, setIndustry] = useState('general');
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateNames = async () => {
    setIsGenerating(true);
    setError(null);
    setGeneratedNames([]);

    try {
      const response = await fetch('/api/tools/business-name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seed: keyword, industry }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate names');
      }

      setGeneratedNames(data.names || []);
    } catch (err: any) {
      setError(err.message || 'An error occurred while generating names.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(generatedNames.join('\n'));
    // visual feedback could go here
    alert('Copied all names to clipboard!');
  };

  const handleExportTXT = () => {
    exportToText(generatedNames.join('\n'), 'business_names.txt');
  };

  const handleExportCSV = () => {
    const data = [['Business Name']];
    generatedNames.forEach(name => data.push([name]));
    exportToCSV(data, 'business_names.csv');
  };

  return (
    <div className="max-w-4xl mx-auto">
      
      {/* Generator Controls */}
      <div className="bg-surface border border-border-section rounded-2xl p-6 md:p-8 mb-10 text-center">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent mx-auto mb-6">
          <Sparkles size={32} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-6">
          <div className="text-left">
            <label className="text-sm font-bold text-text-primary mb-2 block">Seed Keyword (Optional)</label>
            <Input 
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="e.g. Blue, Fast, Ocean"
              className="bg-base h-12"
            />
          </div>
          <div className="text-left">
            <label className="text-sm font-bold text-text-primary mb-2 block">Industry</label>
            <select 
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full h-12 px-3 py-2 bg-base border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="general">General / Other</option>
              <option value="tech">Technology & IT</option>
              <option value="finance">Finance & Crypto</option>
              <option value="health">Healthcare & Medical</option>
              <option value="creative">Creative & Agency</option>
            </select>
          </div>
        </div>

        <Button 
          onClick={generateNames} 
          disabled={isGenerating}
          className="bg-accent hover:bg-accent-hover text-white font-bold h-12 px-8 w-full md:w-auto"
        >
          {isGenerating ? (
            <span className="flex items-center gap-2"><Loader2 size={18} className="animate-spin" /> Generating AI Names...</span>
          ) : (
            <span className="flex items-center gap-2"><Sparkles size={18} /> Generate Names</span>
          )}
        </Button>

        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg">
            {error}
          </div>
        )}
      </div>

      {/* Results */}
      {generatedNames.length > 0 && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-xl font-bold text-text-primary">Generated Ideas</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleCopyAll} className="border-accent text-accent hover:bg-accent/10">
                <Copy size={14} className="mr-2" /> Copy All
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportTXT} className="border-accent text-accent hover:bg-accent/10">
                <FileText size={14} className="mr-2" /> Export TXT
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportCSV} className="border-accent text-accent hover:bg-accent/10">
                <FileSpreadsheet size={14} className="mr-2" /> Export CSV
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {generatedNames.map((name, idx) => (
              <div 
                key={idx}
                onClick={() => copyToClipboard(name, idx)}
                className="bg-surface border border-border-section hover:border-accent/50 rounded-xl p-4 flex items-center justify-between cursor-pointer group transition-all"
              >
                <span className="font-medium text-text-primary group-hover:text-accent transition-colors">{name}</span>
                {copiedIndex === idx ? (
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                ) : (
                  <Copy size={16} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-accent/10 border border-accent/20 rounded-xl p-6 text-center">
            <h4 className="font-bold text-text-primary text-lg mb-2">Got the perfect name? Let&apos;s build the brand.</h4>
            <p className="text-sm text-text-body mb-4">We build premium, high-converting websites for new businesses. Get a head start on your competition.</p>
            <Link 
              href="/#contact"
              className="inline-flex items-center justify-center h-10 px-6 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors"
            >
              Book a Free Consultation <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
