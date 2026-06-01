import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Calculator, 
  Banknote, 
  QrCode, 
  FileText, 
  Building2, 
  Braces, 
  Type, 
  Palette, 
  FileEdit, 
  UserCircle,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Web & Business Tools | Warsi WebWorks',
  description: 'A collection of free, high-performance tools for business owners, developers, and designers. Calculators, generators, and formatters built by Warsi WebWorks.',
  openGraph: {
    title: 'Free Web & Business Tools | Warsi WebWorks',
    description: 'A collection of free tools including Website Cost Calculator, QR Code Generator, Salary Calculator, and more.',
  }
};

const TOOLS = [
  {
    id: 'website-cost-calculator',
    name: 'Website Cost Calculator',
    description: 'Estimate the cost and timeline for your next website or web app project.',
    icon: Calculator,
    category: 'Business'
  },
  {
    id: 'salary-calculator',
    name: 'Salary Calculator',
    description: 'Calculate net take-home pay after taxes and deductions.',
    icon: Banknote,
    category: 'Business'
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Create and download free QR codes for URLs, text, email, and more.',
    icon: QrCode,
    category: 'Utility'
  },
  {
    id: 'invoice-generator',
    name: 'Invoice Generator',
    description: 'Create, preview, and download professional PDF invoices.',
    icon: FileText,
    category: 'Business'
  },
  {
    id: 'business-name-generator',
    name: 'Business Name Generator',
    description: 'Generate catchy name ideas for your new startup or business.',
    icon: Building2,
    category: 'Business'
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, validate, and minify JSON data easily.',
    icon: Braces,
    category: 'Development'
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Analyze text length, reading time, and keyword density.',
    icon: Type,
    category: 'Utility'
  },
  {
    id: 'css-gradient-generator',
    name: 'CSS Gradient Generator',
    description: 'Visually create beautiful linear and radial CSS gradients.',
    icon: Palette,
    category: 'Development'
  },
  {
    id: 'resume-builder',
    name: 'AI Resume Builder',
    description: 'Create a professional, ATS-friendly resume in minutes.',
    icon: UserCircle,
    category: 'Career'
  },
  {
    id: 'cover-letter-generator',
    name: 'Cover Letter Generator',
    description: 'Generate tailored cover letters for your job applications.',
    icon: FileEdit,
    category: 'Career'
  }
];

export default function ToolsHubPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-base">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-text-primary">
            Free Digital <span className="text-accent">Tools</span>
          </h1>
          <p className="text-xl text-text-body">
            A suite of high-performance utilities designed to help businesses, developers, and professionals work smarter.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {TOOLS.map((tool) => (
            <Link 
              key={tool.id} 
              href={`/tools/${tool.id}`}
              className="group block bg-surface border border-border-section hover:border-accent/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <tool.icon size={24} />
                </div>
                <span className="text-xs font-semibold px-3 py-1 bg-surface-hover text-text-muted rounded-full">
                  {tool.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
                {tool.name}
              </h3>
              <p className="text-text-body mb-6 line-clamp-2">
                {tool.description}
              </p>
              <div className="flex items-center text-accent font-medium text-sm">
                Open Tool <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 max-w-4xl mx-auto bg-gradient-to-br from-surface to-surface-hover border border-border-section rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-4">Looking for a custom solution?</h2>
          <p className="text-text-body text-lg mb-8 max-w-2xl mx-auto">
            These tools are just a glimpse of what we can build. If you need a fully custom web application, ecommerce platform, or SaaS product, let's talk.
          </p>
          <Link 
            href="/#contact"
            className="inline-flex items-center justify-center bg-accent hover:bg-accent-hover text-white font-bold text-lg py-4 px-10 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(var(--accent),0.4)]"
          >
            Start Your Project
          </Link>
        </div>

      </div>
    </main>
  );
}
