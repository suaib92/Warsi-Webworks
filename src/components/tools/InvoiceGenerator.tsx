"use client";

import dynamic from 'next/dynamic';
import { InvoiceProvider, useInvoice } from './invoice/InvoiceContext';
import { InvoiceEditor } from './invoice/InvoiceEditor';
import { InvoicePreview } from './invoice/InvoicePreview';
import { Button } from '@/components/ui/button';
import { Loader2, ZoomIn, ZoomOut, Maximize2, Minimize2, Image as ImageIcon, Mail, MessageCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const DownloadInvoicePDFButton = dynamic(
  () => import('./invoice/InvoicePDF').then((mod) => mod.DownloadInvoicePDFButton),
  { ssr: false, loading: () => <Button disabled className="w-full h-10"><Loader2 size={16} className="animate-spin mr-2" /> Loading PDF Engine...</Button> }
);

function InvoiceBuilderApp() {
  const { data, subtotal, taxAmount, discountAmount, total } = useInvoice();
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  
  const [fitWidthScale, setFitWidthScale] = useState(1);
  const [fitPageScale, setFitPageScale] = useState(0.5);
  const [currentScale, setCurrentScale] = useState(1);
  const [viewMode, setViewMode] = useState<'fit-width' | 'fit-page' | 'custom'>('fit-width');
  const [isExportingPng, setIsExportingPng] = useState(false);
  const [isSharingWhatsApp, setIsSharingWhatsApp] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const containerWidth = entry.contentRect.width;
        const containerHeight = entry.contentRect.height;
        
        const newFitWidth = Math.max(0.2, (containerWidth - 40) / 816);
        const newFitPage = Math.max(0.2, (containerHeight - 40) / 1056);
        
        setFitWidthScale(newFitWidth);
        setFitPageScale(newFitPage);
        
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

  const exportPNG = async () => {
    if (!previewRef.current) return;
    setIsExportingPng(true);
    try {
      const canvas = await html2canvas(previewRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `Invoice-${data.invoiceNumber || 'draft'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
      alert('Failed to export PNG.');
    } finally {
      setIsExportingPng(false);
    }
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Invoice ${data.invoiceNumber} from ${data.companyName}`);
    const body = encodeURIComponent(`Hi ${data.clientName},\n\nPlease find the attached invoice ${data.invoiceNumber} for ${data.currency}${total.toLocaleString(undefined, {minimumFractionDigits:2})}.\n\nDue Date: ${data.dueDate || 'Upon receipt'}\n\nThank you for your business!\n\nBest regards,\n${data.companyName}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleWhatsApp = async () => {
    setIsSharingWhatsApp(true);
    const text = `Hi ${data.clientName},\n\nHere is the summary for Invoice ${data.invoiceNumber} for *${data.currency}${(total || 0).toLocaleString(undefined, {minimumFractionDigits:2})}*.\n\nDue Date: ${data.dueDate || 'Upon receipt'}\n\nThank you for your business!\n\nBest regards,\n${data.companyName}`;
    
    try {
      if (typeof navigator !== 'undefined' && navigator.canShare) {
        const { pdf } = await import('@react-pdf/renderer');
        const { InvoiceDocument } = await import('./invoice/InvoicePDF');
        
        const blob = await pdf(<InvoiceDocument data={data} subtotal={subtotal} taxAmount={taxAmount} discountAmount={discountAmount} total={total} />).toBlob();
        const file = new File([blob], `Invoice-${data.invoiceNumber || 'draft'}.pdf`, { type: 'application/pdf' });
        
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `Invoice ${data.invoiceNumber}`,
            text: text,
          });
          setIsSharingWhatsApp(false);
          return;
        }
      }
    } catch (err) {
      console.error('Error sharing PDF natively:', err);
    }
    
    // Fallback to text link
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
    setIsSharingWhatsApp(false);
  };

  return (
    <div className="flex flex-col-reverse xl:grid xl:grid-cols-2 gap-8 relative">
      <div className="space-y-6">
        <InvoiceEditor />
      </div>

      <div className="xl:sticky xl:top-24 h-max space-y-4 z-10">
        
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 bg-surface p-4 border border-border-section rounded-xl">
          <DownloadInvoicePDFButton />
          <Button variant="outline" className="w-full h-10 border-border-strong bg-base" onClick={exportPNG} disabled={isExportingPng}>
            {isExportingPng ? <Loader2 size={16} className="animate-spin mr-2" /> : <ImageIcon size={16} className="mr-2" />} PNG
          </Button>
          <Button variant="outline" className="w-full h-10 border-border-strong bg-base" onClick={handleEmail}>
            <Mail size={16} className="mr-2" /> Email
          </Button>
          <Button variant="outline" className="w-full h-10 border-border-strong bg-base hover:bg-[#25D366] hover:text-white transition-colors" onClick={handleWhatsApp} disabled={isSharingWhatsApp}>
            {isSharingWhatsApp ? <Loader2 size={16} className="animate-spin mr-2" /> : <MessageCircle size={16} className="mr-2" />} WhatsApp
          </Button>
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
                <div ref={previewRef} className="w-full h-full bg-white shadow-md absolute top-0 left-0">
                  <InvoicePreview />
                </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}

export default function InvoiceGenerator() {
  return (
    <InvoiceProvider>
      <InvoiceBuilderApp />
    </InvoiceProvider>
  );
}
