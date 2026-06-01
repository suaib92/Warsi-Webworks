"use client";

import { useState } from 'react';
import { Type, AlignLeft, Hash, Clock, BookOpen, Download, FileText, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { exportToText, exportToPDF } from '@/lib/export-utils';

export default function WordCounter() {
  const [text, setText] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  
  const handleExportTXT = () => {
    if (text.trim()) {
      exportToText(text, 'document.txt');
    }
  };

  const handleExportPDF = async () => {
    if (text.trim()) {
      setIsExporting(true);
      await exportToPDF('word-counter-pdf', 'document.pdf', true);
      setIsExporting(false);
    }
  };
  
  // Calculate stats
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text.trim() ? (text.match(/[\w|\)][.?!](\s|$)/g) || []).length + (text.match(/[^.?!]$/) ? 1 : 0) : 0;
  const paragraphs = text.trim() ? text.split(/\n\s*\n/).length : 0;
  const readingTime = Math.ceil(words / 200); // 200 words per minute average

  const stats = { words, characters, charactersNoSpaces, sentences, paragraphs, readingTime };

  // Calculate Keywords
  let topKeywords: {word: string, count: number}[] = [];
  if (words > 0) {
    const wordsArray = text.toLowerCase().match(/\b(\w+)\b/g);
    if (wordsArray) {
      // Stop words to filter out
      const stopWords = new Set(['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'is', 'are', 'was', 'were']);
      
      const counts: Record<string, number> = {};
      wordsArray.forEach(word => {
        if (!stopWords.has(word) && word.length > 2) {
          counts[word] = (counts[word] || 0) + 1;
        }
      });

      topKeywords = Object.keys(counts)
        .map(word => ({ word, count: counts[word] }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
    }
  }

  return (
    <div className="space-y-8">
      
      {/* Top Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Words', value: stats.words, icon: Type },
          { label: 'Characters', value: stats.characters, icon: Hash },
          { label: 'Sentences', value: stats.sentences, icon: AlignLeft },
          { label: 'Paragraphs', value: stats.paragraphs, icon: AlignLeft },
          { label: 'Reading Time', value: `${stats.readingTime}m`, icon: Clock },
          { label: 'Char (No Spaces)', value: stats.charactersNoSpaces, icon: Hash },
        ].map((stat, idx) => (
          <div key={idx} className="bg-surface border border-border-section rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <div className="text-text-muted mb-2">
              <stat.icon size={20} />
            </div>
            <div className="text-2xl font-black text-text-primary mb-1">{stat.value}</div>
            <div className="text-xs text-text-muted uppercase tracking-wider font-bold">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Editor */}
      <div className="relative">
        <div id="word-counter-pdf" className="bg-white rounded-md">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here..."
            className="min-h-[400px] p-6 text-lg bg-base border-border-section resize-y shadow-sm text-black"
          />
        </div>
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExportTXT} disabled={!text.trim()} className="bg-surface text-text-primary">
            <FileText size={14} className="mr-2" /> Export TXT
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportPDF} disabled={!text.trim() || isExporting} className="bg-accent text-white border-none hover:bg-accent-hover">
            {isExporting ? <Loader2 size={14} className="mr-2 animate-spin" /> : <Download size={14} className="mr-2" />}
            Export PDF
          </Button>
          <Button variant="outline" size="sm" onClick={() => setText('')} className="bg-surface">
            Clear
          </Button>
        </div>
      </div>

      {/* Keyword Density */}
      {topKeywords.length > 0 && (
        <div className="bg-surface border border-border-section rounded-xl p-6">
          <h3 className="font-bold text-text-primary flex items-center gap-2 mb-4">
            <BookOpen size={18} className="text-accent" /> Top Keywords (excluding stop words)
          </h3>
          <div className="flex flex-wrap gap-3">
            {topKeywords.map((kw, idx) => (
              <div key={idx} className="px-4 py-2 bg-base border border-border-subtle rounded-full text-sm font-medium flex gap-2 items-center">
                <span className="text-text-primary">{kw.word}</span>
                <span className="bg-accent/10 text-accent px-2 py-0.5 rounded text-xs">{kw.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
