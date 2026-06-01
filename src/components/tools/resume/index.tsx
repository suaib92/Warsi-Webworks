"use client";

import dynamic from 'next/dynamic';
import { ResumeProvider, useResume } from './ResumeContext';
import { ResumeEditor } from './ResumeEditor';
import { ResumePreview } from './ResumePreview';
import { ATSAnalyzer } from './ATSAnalyzer';
import { Button } from '@/components/ui/button';
import { Loader2, ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Dynamically import the download button to prevent SSR errors with react-pdf
const DownloadResumeButton = dynamic(
  () => import('./ResumePDF').then((mod) => mod.DownloadResumeButton),
  { ssr: false, loading: () => <Button disabled className="min-w-[160px]"><Loader2 size={16} className="animate-spin mr-2" /> PDF Engine</Button> }
);

function ResumeBuilderApp() {
  const { data, setTemplate } = useResume();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [fitWidthScale, setFitWidthScale] = useState(1);
  const [fitPageScale, setFitPageScale] = useState(0.5);
  const [currentScale, setCurrentScale] = useState(1);
  const [viewMode, setViewMode] = useState<'fit-width' | 'fit-page' | 'custom'>('fit-width');

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const containerWidth = entry.contentRect.width;
        const containerHeight = entry.contentRect.height;
        
        // Calculate fit scales (leave some padding)
        const newFitWidth = Math.max(0.2, (containerWidth - 40) / 816);
        const newFitPage = Math.max(0.2, (containerHeight - 40) / 1056);
        
        setFitWidthScale(newFitWidth);
        setFitPageScale(newFitPage);
        
        // Update current scale if strictly tracking a mode
        if (viewMode === 'fit-width') setCurrentScale(newFitWidth);
        else if (viewMode === 'fit-page') setCurrentScale(newFitPage);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [viewMode]);

  const handleZoomIn = () => {
    setViewMode('custom');
    setCurrentScale(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setViewMode('custom');
    setCurrentScale(prev => Math.max(prev - 0.2, 0.3));
  };

  const handleFitWidth = () => {
    setViewMode('fit-width');
    setCurrentScale(fitWidthScale);
  };

  const handleFitPage = () => {
    setViewMode('fit-page');
    setCurrentScale(fitPageScale);
  };

  return (
    <div className="flex flex-col-reverse xl:grid xl:grid-cols-2 gap-8 relative">
      <div className="space-y-6">
        <ATSAnalyzer />
        <ResumeEditor />
      </div>

      <div className="xl:sticky xl:top-24 h-max space-y-4 z-10">
        <div className="flex flex-col sm:flex-row justify-between items-center bg-surface p-4 border border-border-section rounded-xl gap-4">
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <Button size="sm" variant={data.template === 'classic' ? 'default' : 'outline'} onClick={() => setTemplate('classic')} className="whitespace-nowrap">Classic ATS</Button>
            <Button size="sm" variant={data.template === 'professional' ? 'default' : 'outline'} onClick={() => setTemplate('professional')} className="whitespace-nowrap">Professional</Button>
            <Button size="sm" variant={data.template === 'developer' ? 'default' : 'outline'} onClick={() => setTemplate('developer')} className="whitespace-nowrap">Developer</Button>
          </div>
          <div className="w-full sm:w-auto flex justify-end">
            <DownloadResumeButton />
          </div>
        </div>
        
        <div className="border border-border-section rounded-xl overflow-hidden shadow-xl bg-gray-200 flex flex-col h-[calc(100vh-14rem)]">
           {/* Toolbar */}
           <div className="bg-surface border-b border-border-section p-2 flex items-center justify-between shrink-0">
              <span className="text-xs font-medium text-text-muted ml-2">Zoom: {Math.round(currentScale * 100)}%</span>
              <div className="flex items-center gap-1">
                <Button size="sm" variant={viewMode === 'fit-page' ? 'default' : 'ghost'} onClick={handleFitPage} className="h-8 px-2" title="Fit Page"><Minimize2 size={14} className="mr-1" /> Fit Page</Button>
                <Button size="sm" variant={viewMode === 'fit-width' ? 'default' : 'ghost'} onClick={handleFitWidth} className="h-8 px-2" title="Fit Width"><Maximize2 size={14} className="mr-1" /> Fit Width</Button>
                <div className="w-px h-4 bg-border-section mx-1"></div>
                <Button size="icon" variant="ghost" onClick={handleZoomOut} className="h-8 w-8" title="Zoom Out"><ZoomOut size={16} /></Button>
                <Button size="icon" variant="ghost" onClick={handleZoomIn} className="h-8 w-8" title="Zoom In"><ZoomIn size={16} /></Button>
              </div>
           </div>

           {/* Preview Area */}
           <div ref={containerRef} className="w-full h-full relative bg-gray-300 overflow-auto flex justify-center py-6">
             <div 
               className="relative origin-top mx-auto" 
               style={{ 
                 width: '816px', 
                 height: '1056px',
                 transform: `scale(${currentScale})`,
                 transformOrigin: 'top center',
                 marginBottom: `${1056 * (currentScale - 1)}px`
               }}
             >
                <div className="w-full h-full bg-white shadow-md absolute top-0 left-0">
                  <ResumePreview />
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

export default function ResumeBuilder() {
  return (
    <ResumeProvider>
      <ResumeBuilderApp />
    </ResumeProvider>
  );
}
