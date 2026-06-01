"use client";

import { useState } from 'react';
import { AlignLeft, Minimize, CheckCircle2, XCircle, Copy, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { exportToText } from '@/lib/export-utils';

export default function JsonFormatter() {
  const [input, setInput] = useState('{"hello":"world", "status": true}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err: unknown) {
      setError((err as Error).message || 'Invalid JSON');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (err: unknown) {
      setError((err as Error).message || 'Invalid JSON');
    }
  };

  const validateJson = () => {
    try {
      JSON.parse(input);
      setOutput('✅ Valid JSON');
      setError(null);
    } catch (err: unknown) {
      setError((err as Error).message || 'Invalid JSON');
      setOutput('');
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (output && !output.includes('✅')) {
      exportToText(output, 'data.json');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Input */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="font-bold text-text-primary">Input JSON</label>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="ghost" onClick={clearAll} className="text-text-muted hover:text-red-500">
              <Trash2 size={14} className="mr-1" /> Clear
            </Button>
            <Button size="sm" variant="outline" onClick={validateJson} className="bg-surface border-border-section">
              Validate
            </Button>
            <Button size="sm" variant="outline" onClick={minifyJson} className="bg-surface border-border-section">
              <Minimize size={14} className="mr-1" /> Minify
            </Button>
            <Button size="sm" onClick={formatJson} className="bg-accent hover:bg-accent-hover text-white">
              <AlignLeft size={14} className="mr-1" /> Format
            </Button>
          </div>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JSON here..."
          className={`w-full h-[500px] p-4 bg-base border rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent ${
            error ? 'border-red-500/50 focus:border-red-500' : 'border-border-section'
          }`}
          spellCheck={false}
        />
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg flex items-start gap-2">
            <XCircle size={16} className="mt-0.5 shrink-0" />
            <span className="break-all">{error}</span>
          </div>
        )}
      </div>

      {/* Output */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="font-bold text-text-primary">Output</label>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={copyToClipboard} className="text-text-muted hover:text-text-primary" disabled={!output || output.includes('✅')}>
              {copied ? <CheckCircle2 size={16} className="text-emerald-500" /> : <><Copy size={14} className="mr-1" /> Copy</>}
            </Button>
            <Button size="sm" variant="ghost" onClick={handleDownload} className="text-text-muted hover:text-text-primary" disabled={!output || output.includes('✅')}>
              <Download size={14} className="mr-1" /> Download
            </Button>
          </div>
        </div>
        <div className="w-full h-[500px] p-4 bg-[#1e1e1e] border border-border-section rounded-xl overflow-auto">
          <pre className="font-mono text-sm text-[#d4d4d4]">
            <code>{output}</code>
          </pre>
        </div>
      </div>

    </div>
  );
}
