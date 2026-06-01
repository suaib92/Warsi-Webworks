"use client";

import { useState } from 'react';
import { Calculator, Mail, ArrowRight, CheckCircle2, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { exportToPDF } from '@/lib/export-utils';

type WebsiteType = 'landing' | 'business' | 'ecommerce' | 'custom_app';

const TYPE_BASE_PRICES = {
  landing: 500,
  business: 1500,
  ecommerce: 3000,
  custom_app: 5000,
};

const TYPE_BASE_TIMELINES = {
  landing: '1-2 weeks',
  business: '2-4 weeks',
  ecommerce: '4-8 weeks',
  custom_app: '8-12+ weeks',
};

export default function WebsiteCostCalculator() {
  const [websiteType, setWebsiteType] = useState<WebsiteType>('business');
  const [features, setFeatures] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [pages, setPages] = useState<number>(5);
  const [auth, setAuth] = useState(false);
  const [adminPanel, setAdminPanel] = useState(false);
  const [payment, setPayment] = useState(false);
  const [seo, setSeo] = useState(false);
  const [maintenance, setMaintenance] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);
    await exportToPDF('proposal-pdf', 'Website_Proposal.pdf');
    setIsExporting(false);
  };

  const calculateCost = () => {
    let total = TYPE_BASE_PRICES[websiteType];
    
    // Page cost (first 5 included in base)
    if (pages > 5) {
      total += (pages - 5) * 100;
    }

    if (auth) total += 500;
    if (adminPanel) total += 1000;
    if (payment) total += 800;
    if (seo) total += 600;
    if (maintenance) total += 300; // per month theoretically, but add to total for estimation

    return {
      min: Math.round(total * 0.9),
      max: Math.round(total * 1.2),
      timeline: TYPE_BASE_TIMELINES[websiteType]
    };
  };

  const estimate = calculateCost();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Inputs Column */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Website Type */}
        <div>
          <label className="block text-sm font-bold text-text-primary mb-3">What kind of website do you need?</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'landing', label: 'Landing Page' },
              { id: 'business', label: 'Business/Corporate' },
              { id: 'ecommerce', label: 'E-commerce Store' },
              { id: 'custom_app', label: 'Custom Web App' }
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setWebsiteType(type.id as WebsiteType)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  websiteType === type.id 
                  ? 'border-accent bg-accent/5 ring-1 ring-accent text-accent' 
                  : 'border-border-section bg-surface hover:border-accent/50 text-text-primary'
                }`}
              >
                <div className="font-bold">{type.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Number of Pages */}
        <div>
          <label className="block text-sm font-bold text-text-primary mb-3">
            Number of Pages ({pages})
          </label>
          <input 
            type="range" 
            min="1" max="50" 
            value={pages}
            onChange={(e) => setPages(parseInt(e.target.value))}
            className="w-full accent-accent"
          />
          <div className="flex justify-between text-xs text-text-muted mt-2">
            <span>1 page</span>
            <span>50+ pages</span>
          </div>
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-bold text-text-primary mb-3">Additional Features</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { state: auth, setter: setAuth, label: 'User Login/Auth' },
              { state: adminPanel, setter: setAdminPanel, label: 'Admin Dashboard' },
              { state: payment, setter: setPayment, label: 'Payment Integration' },
              { state: seo, setter: setSeo, label: 'Advanced SEO Package' },
              { state: maintenance, setter: setMaintenance, label: 'Monthly Maintenance' },
            ].map((feat, idx) => (
              <label key={idx} className="flex items-center gap-3 p-4 rounded-xl border border-border-section bg-surface cursor-pointer hover:border-accent/50 transition-colors">
                <input 
                  type="checkbox" 
                  checked={feat.state}
                  onChange={(e) => feat.setter(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-accent focus:ring-accent"
                />
                <span className="font-medium text-text-primary">{feat.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Output Column */}
      <div>
        <div id="proposal-pdf" className="bg-surface sticky top-24 border border-border-section rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                <Calculator size={20} />
              </div>
              <h3 className="text-xl font-bold text-text-primary">Estimate</h3>
            </div>
            
            <Button variant="outline" size="sm" onClick={handleExportPDF} disabled={isExporting} className="border-accent text-accent hover:bg-accent/10">
              {isExporting ? <Loader2 size={14} className="mr-2 animate-spin" /> : <Download size={14} className="mr-2" />}
              {isExporting ? 'Exporting...' : 'PDF'}
            </Button>
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-text-muted mb-1">Estimated Cost</p>
            <div className="text-3xl md:text-4xl font-black text-text-primary">
              ${estimate.min.toLocaleString()} - ${estimate.max.toLocaleString()}
            </div>
          </div>

          <div className="mb-8">
            <p className="text-sm text-text-muted mb-1">Estimated Timeline</p>
            <div className="text-xl font-bold text-text-primary">
              {estimate.timeline}
            </div>
          </div>

          <div className="border-t border-border-section pt-6 mt-8">
            {!submitted ? (
              <div className="bg-accent/10 border border-accent/20 rounded-xl p-6 text-center">
                <h4 className="font-bold text-text-primary text-lg mb-2">Want a Binding Custom Quote?</h4>
                <p className="text-sm text-text-body mb-4">Enter your email and our lead architect will review these requirements and send you a formal proposal within 24 hours.</p>
                <div className="flex gap-2">
                  <Input 
                    type="email" 
                    placeholder="Enter your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white dark:bg-black border-border-strong"
                  />
                  <Button 
                    onClick={() => { if(email) setSubmitted(true); }}
                    className="bg-accent hover:bg-accent-hover text-white px-6"
                  >
                    Send <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={32} className="mx-auto mb-2" />
                <h4 className="font-bold text-lg">Request Received!</h4>
                <p className="text-sm">We will email you the custom proposal at {email} shortly.</p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
