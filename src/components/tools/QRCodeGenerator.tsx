"use client";

import { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { Download, Link as LinkIcon, Mail, Phone, MessageSquare, Type } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type QRType = 'url' | 'text' | 'email' | 'phone' | 'whatsapp';

export default function QRCodeGenerator() {
  const [activeTab, setActiveTab] = useState<QRType>('url');
  
  // Inputs
  const [url, setUrl] = useState('https://warsiwebworks.com');
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const qrRef = useRef<HTMLDivElement>(null);

  const getQRData = () => {
    switch(activeTab) {
      case 'url': return url || 'https://warsiwebworks.com';
      case 'text': return text || 'Hello World';
      case 'email': return `mailto:${email}`;
      case 'phone': return `tel:${phone}`;
      case 'whatsapp': return `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`;
      default: return 'https://warsiwebworks.com';
    }
  };

  const downloadQR = (format: 'png' | 'svg') => {
    const svg = document.getElementById("QRCode_SVG");
    if (!svg) return;
    
    if (format === 'svg') {
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "qrcode.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      
      const svgData = new XMLSerializer().serializeToString(svg);
      const DOMURL = window.URL || window.webkitURL || window;
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = DOMURL.createObjectURL(svgBlob);
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);
        
        const pngUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      img.src = url;
    }
  };

  const tabs = [
    { id: 'url', icon: LinkIcon, label: 'URL' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'email', icon: Mail, label: 'Email' },
    { id: 'phone', icon: Phone, label: 'Phone' },
    { id: 'whatsapp', icon: MessageSquare, label: 'WhatsApp' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Input Area */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Type Selector */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as QRType)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                activeTab === tab.id 
                  ? 'bg-accent text-white border-accent' 
                  : 'bg-surface text-text-primary border-border-section hover:border-accent/50'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Input Forms */}
        <div className="bg-surface border border-border-section rounded-xl p-6">
          {activeTab === 'url' && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary">Website URL</label>
              <Input 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="bg-base"
              />
            </div>
          )}
          {activeTab === 'text' && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary">Custom Text</label>
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to encode..."
                className="w-full h-32 p-3 bg-base border border-input rounded-md text-sm"
              />
            </div>
          )}
          {activeTab === 'email' && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary">Email Address</label>
              <Input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                className="bg-base"
              />
            </div>
          )}
          {activeTab === 'phone' && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary">Phone Number</label>
              <Input 
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 234 567 890"
                className="bg-base"
              />
            </div>
          )}
          {activeTab === 'whatsapp' && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary">WhatsApp Number (with country code)</label>
              <Input 
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="919876543210"
                className="bg-base"
              />
            </div>
          )}
        </div>
      </div>

      {/* Preview Area */}
      <div>
        <div className="bg-surface sticky top-24 border border-border-section rounded-2xl p-6 md:p-8 flex flex-col items-center">
          <h3 className="text-lg font-bold text-text-primary mb-6">Live Preview</h3>
          
          <div className="bg-white p-4 rounded-xl border shadow-sm mb-8" ref={qrRef}>
            <QRCode 
              id="QRCode_SVG"
              value={getQRData()}
              size={200}
              level="H"
            />
          </div>

          <div className="flex gap-3 w-full">
            <Button 
              onClick={() => downloadQR('png')}
              variant="outline"
              className="flex-1 flex gap-2 border-border-strong hover:bg-accent/5"
            >
              <Download size={16} /> PNG
            </Button>
            <Button 
              onClick={() => downloadQR('svg')}
              className="flex-1 flex gap-2 bg-accent hover:bg-accent-hover text-white"
            >
              <Download size={16} /> SVG
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
