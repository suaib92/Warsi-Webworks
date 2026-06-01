import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AdSlot from '@/components/tools/AdSlot';

interface ToolLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

export default function ToolLayout({ children, title, description }: ToolLayoutProps) {
  return (
    <main className="min-h-screen pt-24 pb-20 bg-base">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        
        {/* Tool Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-text-primary">{title}</h1>
          <p className="text-lg text-text-body max-w-2xl mx-auto">{description}</p>
        </div>

        <AdSlot placement="above-tool" />

        {/* The Tool Itself */}
        <div className="bg-surface border border-border-section rounded-2xl shadow-sm p-6 md:p-10 my-12">
          {children}
        </div>

        <AdSlot placement="below-tool" />

        {/* Lead Gen CTA */}
        <div className="bg-accent/10 border border-accent/20 rounded-2xl p-8 md:p-12 text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-text-primary">Need this built professionally?</h2>
          <p className="text-text-body mb-8 max-w-2xl mx-auto">
            Warsi WebWorks is a premium agency specializing in high-performance web applications, ecommerce, and corporate websites. Let&apos;s build something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/#contact"
              className="bg-accent hover:bg-accent-hover text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2"
            >
              Get a Free Consultation <ArrowRight size={18} />
            </Link>
            <Link 
              href="/services"
              className="bg-transparent border border-border-strong text-text-primary hover:bg-surface-hover font-bold py-3 px-8 rounded-lg transition-colors"
            >
              View Our Services
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
