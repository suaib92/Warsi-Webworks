import Link from 'next/link';
import { Calculator, Briefcase, FileText, Type, Palette, UserCircle, CreditCard, Hash, QrCode, FileEdit } from 'lucide-react';

type ToolID = 'website-cost' | 'salary' | 'qr-code' | 'invoice' | 'business-name' | 'json' | 'word-counter' | 'css-gradient' | 'resume' | 'cover-letter';

interface RelatedToolsProps {
  currentTool: ToolID;
  relatedToolIds: ToolID[];
}

const TOOLS_DATA: Record<ToolID, { name: string; href: string; icon: React.ReactNode; desc: string }> = {
  'website-cost': { name: 'Cost Calculator', href: '/tools/website-cost-calculator', icon: <Calculator size={20} />, desc: 'Estimate dev costs' },
  'salary': { name: 'Salary Calculator', href: '/tools/salary-calculator', icon: <CreditCard size={20} />, desc: 'Gross to net pay' },
  'qr-code': { name: 'QR Code Generator', href: '/tools/qr-code-generator', icon: <QrCode size={20} />, desc: 'Free SVG/PNG codes' },
  'invoice': { name: 'Invoice Generator', href: '/tools/invoice-generator', icon: <FileText size={20} />, desc: 'Create PDF invoices' },
  'business-name': { name: 'Name Generator', href: '/tools/business-name-generator', icon: <Type size={20} />, desc: 'Brandable names' },
  'json': { name: 'JSON Formatter', href: '/tools/json-formatter', icon: <Hash size={20} />, desc: 'Validate & format' },
  'word-counter': { name: 'Word Counter', href: '/tools/word-counter', icon: <FileEdit size={20} />, desc: 'Count words & density' },
  'css-gradient': { name: 'CSS Gradients', href: '/tools/css-gradient-generator', icon: <Palette size={20} />, desc: 'Linear & radial' },
  'resume': { name: 'Resume Builder', href: '/tools/resume-builder', icon: <UserCircle size={20} />, desc: 'ATS-friendly PDFs' },
  'cover-letter': { name: 'Cover Letters', href: '/tools/cover-letter-generator', icon: <Briefcase size={20} />, desc: 'AI drafted letters' },
};

export default function RelatedTools({ currentTool, relatedToolIds }: RelatedToolsProps) {
  const tools = relatedToolIds.map(id => TOOLS_DATA[id]).filter(Boolean);

  if (tools.length === 0) return null;

  return (
    <div className="bg-surface border border-border-section rounded-2xl p-6 md:p-8 mt-12 mb-12">
      <h3 className="text-xl font-bold text-text-primary mb-6">Related Tools You Might Like</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link 
            key={tool.href} 
            href={tool.href}
            className="flex items-start gap-4 p-4 rounded-xl border border-border-section hover:border-accent hover:bg-surface-hover transition-colors group"
          >
            <div className="p-2 bg-base rounded-lg text-text-muted group-hover:text-accent transition-colors">
              {tool.icon}
            </div>
            <div>
              <h4 className="font-bold text-text-primary text-sm group-hover:text-accent transition-colors">{tool.name}</h4>
              <p className="text-xs text-text-muted mt-1">{tool.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
