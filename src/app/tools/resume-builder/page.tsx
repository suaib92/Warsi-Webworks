import { Metadata } from 'next';
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import ToolLayout from '@/components/tools/ToolLayout';
import ResumeBuilder from '@/components/tools/ResumeBuilder';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata: Metadata = {
  title: 'Free AI Resume Builder | Create ATS-Friendly Resumes',
  description: 'Build a professional, ATS-friendly resume in minutes. Use AI assistance to write your summary and download as a PDF for free.',
  alternates: {
    canonical: 'https://warsiwebworks.com/tools/resume-builder',
  }
};

export default function ResumeBuilderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "AI Resume Builder",
        "operatingSystem": "Any",
        "applicationCategory": "BusinessApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "An ATS-friendly resume builder with PDF export and AI-assisted content generation."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does the AI generation work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our architecture integrates with advanced language models to rewrite your bullet points and summaries professionally, highlighting action verbs and relevant keywords."
            }
          },
          {
            "@type": "Question",
            "name": "Is the PDF export really free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, there are no hidden paywalls, watermarks, or sign-ups required. You can generate and print as many variations of your resume as you need."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="print:hidden">
        <ToolLayout 
          title="AI Resume Builder" 
          description="Craft the perfect resume. Our minimalist, professional template is designed to pass Applicant Tracking Systems (ATS) and impress recruiters."
        >
          <ResumeBuilder />
        </ToolLayout>
      </div>

      <div className="hidden print:block w-full">
        <ResumeBuilder />
      </div>

      <div className="container mx-auto px-4 md:px-6 mb-8">
        <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: "Tools", url: "/tools" }, { name: "resume builder", url: "/tools/resume-builder" }]} />
      </div>
      <div className="container mx-auto px-4 md:px-6 max-w-5xl print:hidden">
        <RelatedTools currentTool="resume" relatedToolIds={['cover-letter', 'salary', 'word-counter', 'business-name']} />
      </div>

      <section className="bg-surface py-20 border-t border-border-section print:hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl prose prose-neutral dark:prose-invert prose-headings:text-text-primary prose-a:text-accent">
          <h2>How to Build an ATS-Friendly Resume in 2026</h2>
          <p>
            In today's highly competitive job market, your resume rarely reaches a human hiring manager directly. Over 90% of mid-to-large companies rely on Applicant Tracking Systems (ATS) to automatically scan, parse, and filter resumes based on relevance.
          </p>
          <p>
            If your resume isn't explicitly formatted to be read by these bots, you will be automatically rejected—even if you are the most qualified candidate. Our Free AI Resume Builder generates a perfectly structured, minimalist PDF designed specifically to pass ATS parsers.
          </p>

          <h3>Tips for Passing the ATS</h3>
          <p>To ensure your resume gets flagged for human review, adhere strictly to these formatting rules:</p>
          <ul>
            <li><strong>Avoid Complex Formatting:</strong> Tables, multiple columns, images, headshots, and obscure fonts often break ATS parsers. When a parser breaks, it extracts your text as gibberish and discards your application. Keep your layout single-column and text-heavy.</li>
            <li><strong>Use Standard Headings:</strong> Bots are programmed to look for standard keywords like "Professional Experience", "Education", and "Skills". Don&apos;t get overly creative by using titles like "My Journey" or "What I&apos;ve Done".</li>
            <li><strong>Incorporate Exact Keywords:</strong> Read the job description meticulously. If they ask for "ReactJS", write "ReactJS" on your resume, not just "React". The ATS scores your resume based on keyword density matches.</li>
            <li><strong>Use Standard Bullet Points:</strong> Use simple, standard bullet points (circles or squares). Avoid custom icons or emojis, as they can cause parsing errors.</li>
          </ul>

          <h3>The "Action + Metric" Formula</h3>
          <p>
            Once you pass the ATS, a human recruiter will glance at your resume for an average of 6 seconds. You must prove your value immediately. Use the proven formula: <strong>Action Verb + Task + Metric</strong>.
          </p>
          <p>
            Instead of writing: <em>"Responsible for managing the company website."</em>
          </p>
          <p>
            Write: <em>"Spearheaded the redesign of the corporate website using Next.js, increasing organic traffic by 40% and reducing page load times by 2.5 seconds."</em>
          </p>

          <h3>One Page vs. Two Pages</h3>
          <p>
            The general rule is to keep your resume to one page if you have less than 10 years of experience. Recruiters want to see a highlight reel of your career, not an exhaustive biography. Only expand to two pages if you are a senior executive or have extensive, highly relevant project experience. 
          </p>

          <h3>Frequently Asked Questions</h3>
          <div className="space-y-6 mt-8">
            <div>
              <h4 className="font-bold text-lg">How does the AI generation work?</h4>
              <p className="text-text-body mt-2">Our architecture is prepared to integrate with advanced language models to rewrite your bullet points and summaries professionally. Currently, it runs in demonstration mode to showcase the UI capability. When fully active, it will inject strong action verbs and optimize sentence structure.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg">Is the PDF export really free?</h4>
              <p className="text-text-body mt-2">Yes, there are no hidden paywalls, watermarks, or sign-ups required. We leverage native browser printing technologies to generate the PDF instantly on your local machine.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg">Should I include my photo on my resume?</h4>
              <p className="text-text-body mt-2">If you are applying for jobs in the US, UK, or Canada, strictly <strong>do not</strong> include a photo, as it introduces anti-discrimination liability for the employer and can lead to immediate rejection. In some European or Asian countries, it may be customary, but an ATS-friendly resume is always safer without one.</p>
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 md:px-6 pb-20">
        <InternalLinks category="tool" currentSlug="resume-builder" />
      </div>
    </>
  );
}
