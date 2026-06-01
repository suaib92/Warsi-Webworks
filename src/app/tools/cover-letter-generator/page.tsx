import { Metadata } from 'next';
import ToolLayout from '@/components/tools/ToolLayout';
import CoverLetterGenerator from '@/components/tools/CoverLetterGenerator';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata: Metadata = {
  title: 'Free AI Cover Letter Generator | Write Targeted Letters Fast',
  description: 'Generate highly targeted, professional cover letters tailored to the specific job you are applying for using our free AI generator tool.',
  alternates: {
    canonical: 'https://warsi-webworks.vercel.app/tools/cover-letter-generator',
  }
};

export default function CoverLetterGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "AI Cover Letter Generator",
        "operatingSystem": "Any",
        "applicationCategory": "BusinessApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Generate customized cover letters instantly based on job titles, company names, and personal skills."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Does AI write good cover letters?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "AI generates excellent first drafts and structured outlines. However, we strongly recommend reviewing the generated output and injecting your personal voice and specific career anecdotes before submitting."
            }
          },
          {
            "@type": "Question",
            "name": "Is this tool completely free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our demonstration model is free to use without requiring an account or subscription."
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
      
      <ToolLayout 
        title="AI Cover Letter Generator" 
        description="Stop staring at a blank page. Enter the job title, company, and your skills, and let our AI draft a highly targeted cover letter in seconds."
      >
        <CoverLetterGenerator />
      </ToolLayout>

      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <RelatedTools currentTool="cover-letter" relatedToolIds={['resume', 'salary', 'word-counter', 'invoice']} />
      </div>

      <section className="bg-surface py-20 border-t border-border-section">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl prose prose-neutral dark:prose-invert prose-headings:text-text-primary prose-a:text-accent">
          <h2>Are Cover Letters Still Necessary in 2026?</h2>
          <p>
            The debate over whether cover letters are dead is ongoing. While many tech giants and modern startups have moved away from requiring them, traditional industries, competitive corporate roles, and smaller boutique firms still use them heavily to gauge a candidate's communication skills and genuine interest.
          </p>
          <p>
            When a hiring manager is staring at two resumes with identical technical skills and education backgrounds, a well-written, compelling cover letter serves as the ultimate tie-breaker. It is your only opportunity to inject personality into an otherwise rigid application process.
          </p>

          <h3>How to Write a Cover Letter that Converts</h3>
          <p>If you choose to submit a cover letter, ensure it isn't just a boring summary of your resume. Follow these crucial tips:</p>
          <ul>
            <li><strong>Don&apos;t just repeat your resume:</strong> The hiring manager already has your resume. Use the cover letter to tell a story or explain <em>why</em> you want to work at this specific company. Connect your past experiences to their current challenges.</li>
            <li><strong>Keep it under one page:</strong> Hiring managers are busy. Three to four concise, punchy paragraphs are ideal. If it looks like a wall of text, it won't be read.</li>
            <li><strong>Address the hiring manager by name:</strong> Avoid "To Whom It May Concern" at all costs. Spend 5 minutes on LinkedIn researching the department head or the recruiter. Addressing it to "Dear [Name]" shows instant initiative.</li>
            <li><strong>Focus on what you can do for them:</strong> A common mistake is focusing entirely on what you want to learn from the role. The company is hiring to solve a problem. Highlight exactly how your specific skills will solve their immediate problems.</li>
          </ul>

          <h3>The Structure of a Perfect Cover Letter</h3>
          <ol>
            <li><strong>The Hook (Paragraph 1):</strong> State the position you are applying for and grab their attention with an impressive achievement or a strong statement about why you admire the company.</li>
            <li><strong>The Proof (Paragraph 2):</strong> Highlight 1 or 2 specific career accomplishments. Quantify them with numbers (e.g., "Increased sales by 30%"). Show, don't just tell.</li>
            <li><strong>The Fit (Paragraph 3):</strong> Explain why you are a cultural fit and why you specifically chose this company over their competitors.</li>
            <li><strong>The Call to Action (Paragraph 4):</strong> Confidently reiterate your enthusiasm and state that you look forward to discussing the role further in an interview.</li>
          </ol>

          <h3>Frequently Asked Questions</h3>
          <div className="space-y-6 mt-8">
            <div>
              <h4 className="font-bold text-lg">Does AI write good cover letters?</h4>
              <p className="text-text-body mt-2">AI generates excellent first drafts, proper structuring, and ensures perfect grammar. However, a purely AI-generated letter can sound robotic. We strongly recommend using our tool to generate the foundation, and then spending 5 minutes injecting your specific, personal career anecdotes before submitting it.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg">Is this tool completely free?</h4>
              <p className="text-text-body mt-2">Yes, our cover letter generator is completely free to use. There are no limits on how many drafts you can generate for different job applications.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg">How long should my cover letter be?</h4>
              <p className="text-text-body mt-2">Aim for 250 to 400 words (about half a page). Anything longer risks losing the reader's attention.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
