import { Metadata } from 'next';
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import ToolLayout from '@/components/tools/ToolLayout';
import WordCounter from '@/components/tools/WordCounter';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata: Metadata = {
  title: 'Free Word Counter & Keyword Density Analyzer',
  description: 'Count words, characters, sentences, and calculate reading time instantly. Analyze keyword density for better SEO content optimization.',
  alternates: {
    canonical: 'https://warsiwebworks.com/tools/word-counter',
  }
};

export default function WordCounterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Word Counter and SEO Analyzer",
        "operatingSystem": "Any",
        "applicationCategory": "UtilitiesApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Analyze text for word count, character count, reading time, and SEO keyword density."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How is the reading time calculated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Reading time is estimated based on the average adult reading speed, which is universally accepted to be around 200 to 250 words per minute."
            }
          },
          {
            "@type": "Question",
            "name": "Does the word counter include punctuation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The character count includes punctuation, but the word count strictly calculates alphanumeric groupings separated by spaces."
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
        title="Word Counter & SEO Analyzer" 
        description="Type or paste your text below to instantly count words, characters, sentences, and analyze your primary keywords."
      >
        <WordCounter />
      </ToolLayout>

      <div className="container mx-auto px-4 md:px-6 mb-8">
        <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: "Tools", url: "/tools" }, { name: "word counter", url: "/tools/word-counter" }]} />
      </div>
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <RelatedTools currentTool="word-counter" relatedToolIds={['json', 'salary', 'resume', 'business-name']} />
      </div>

      <section className="bg-surface py-20 border-t border-border-section">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl prose prose-neutral dark:prose-invert prose-headings:text-text-primary prose-a:text-accent">
          <h2>Why Word Count Matters in 2026</h2>
          <p>
            Whether you are an author writing a novel, a student completing an essay, a social media manager drafting a tweet, or a digital marketer optimizing an SEO blog post, character and word limits dictate how we communicate online. 
          </p>
          <p>
            Our Free Word Counter provides instant, real-time analytics on your text. Beyond just a simple tally, it provides deep insights into the structure and readability of your content.
          </p>

          <h3>Key Metrics Explained</h3>
          <ul>
            <li><strong>Word Count:</strong> The total number of words. Useful for SEO articles which typically target 800-2000 words to rank highly on Google.</li>
            <li><strong>Character Count:</strong> Important for platforms with strict limits, like Twitter (280 chars), SMS messages (160 chars), or Google Meta Descriptions (155-160 chars).</li>
            <li><strong>Reading Time:</strong> An estimation based on the average adult reading speed of 200 words per minute. Adding a "5 min read" tag to the top of your blog post has been proven to increase engagement and lower bounce rates.</li>
            <li><strong>Keyword Density:</strong> Shows the most frequently used words in your text (excluding common &quot;stop words&quot; like &apos;and&apos;, &apos;the&apos;). This is crucial for SEO to ensure you aren&apos;t &quot;keyword stuffing&quot; or missing your primary target keyword.</li>
          </ul>

          <h3>Social Media Character Limits (2026)</h3>
          <p>Before you hit publish, ensure your content fits the constraints of the platform:</p>
          <ul>
            <li><strong>X (Twitter):</strong> 280 characters (up to 10,000 for Premium subscribers).</li>
            <li><strong>Instagram Captions:</strong> 2,200 characters (but truncates after 125 characters, requiring a "Read More" click).</li>
            <li><strong>LinkedIn Posts:</strong> 3,000 characters.</li>
            <li><strong>Facebook Posts:</strong> 63,206 characters.</li>
            <li><strong>YouTube Titles:</strong> 100 characters (aim for 60 to avoid truncation on mobile).</li>
          </ul>

          <h3>SEO and Keyword Density</h3>
          <p>
            In the early days of SEO, webmasters would "stuff" a target keyword into an article 50 times to force it to rank. Today, Google's algorithms (like RankBrain and BERT) are vastly more sophisticated. They penalize keyword stuffing. 
          </p>
          <p>
            The ideal keyword density is usually between <strong>1% and 2%</strong>. This means if you write a 1,000-word article, your primary keyword should appear naturally about 10 to 20 times. Use our Keyword Analyzer tool built into the counter above to verify that your top phrase isn't being overused, and to ensure that semantic LSI keywords are present in your top 5 list.
          </p>

          <h3>Frequently Asked Questions</h3>
          
          <div className="space-y-6 mt-8">
            <div>
              <h4 className="font-bold text-lg">How is the reading time calculated?</h4>
              <p className="text-text-body mt-2">Reading time is estimated based on the average adult reading speed, which is universally accepted to be around 200 words per minute. We divide your total word count by 200 and round up to the nearest minute.</p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg">What are &apos;Stop Words&apos; in the Keyword Analyzer?</h4>
              <p className="text-text-body mt-2">Stop words are extremely common functional words like &apos;the&apos;, &apos;and&apos;, &apos;of&apos;, &apos;in&apos;, and &apos;is&apos;. Our keyword density algorithm automatically filters these out so you can see the actual thematic keywords driving your content.</p>
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 md:px-6 pb-20">
        <InternalLinks category="tool" currentSlug="word-counter" />
      </div>
    </>
  );
}
