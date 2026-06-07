import { Metadata } from 'next';
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import ToolLayout from '@/components/tools/ToolLayout';
import JsonFormatter from '@/components/tools/JsonFormatter';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata: Metadata = {
  title: 'Free JSON Formatter & Validator | Beautify JSON Online',
  description: 'Instantly format, validate, and beautify your JSON data. Catch syntax errors easily with our fast, client-side JSON parsing tool.',
  alternates: {
    canonical: 'https://warsiwebworks.com/tools/json-formatter',
  }
};

export default function JsonFormatterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "JSON Formatter and Validator",
        "operatingSystem": "Any",
        "applicationCategory": "DeveloperApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Beautify, format, and validate JSON payloads instantly within your browser."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is my JSON data sent to a server?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. All formatting and validation is performed securely inside your web browser using JavaScript. Your sensitive API payloads are never transmitted to our servers."
            }
          },
          {
            "@type": "Question",
            "name": "How do I fix an 'Invalid JSON' error?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Common JSON errors include missing trailing commas, using single quotes instead of double quotes, or missing quotation marks around keys. Review the exact line mentioned in the error message to correct the syntax."
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
        title="JSON Formatter & Validator" 
        description="Format, beautify, and validate your JSON data instantly. Paste your unformatted code below to make it human-readable."
      >
        <JsonFormatter />
      </ToolLayout>

      <div className="container mx-auto px-4 md:px-6 mb-8">
        <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: "Tools", url: "/tools" }, { name: "json formatter", url: "/tools/json-formatter" }]} />
      </div>
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <RelatedTools currentTool="json" relatedToolIds={['css-gradient', 'word-counter', 'website-cost']} />
      </div>

      <section className="bg-surface py-20 border-t border-border-section">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl prose prose-neutral dark:prose-invert prose-headings:text-text-primary prose-a:text-accent">
          <h2>Why Use a JSON Formatter?</h2>
          <p>
            JSON (JavaScript Object Notation) is the undisputed standard for data exchange on the modern web. Whether you are building REST APIs, configuring NoSQL databases like MongoDB, or passing data between a Next.js frontend and a Node backend, you will inevitably deal with JSON.
          </p>
          <p>
            However, to save bandwidth, servers often send JSON in a "minified" format—a single, massive string of text with all whitespace removed. While this is highly efficient for machines, it is entirely unreadable for humans trying to debug a complex API response. Our JSON Formatter instantly parses that string and "beautifies" it into an indented, structured hierarchy.
          </p>

          <h3>Common JSON Syntax Errors</h3>
          <p>If our validator throws an "Invalid JSON" error, check your payload for these common mistakes:</p>
          <ul>
            <li><strong>Trailing Commas:</strong> Unlike standard JavaScript objects, JSON strictly forbids a comma after the final property in an object or array. E.g., `{"{"} "name": "John", {"}"}` instead of `{"{"} "name": "John", {"}"}`.</li>
            <li><strong>Single Quotes:</strong> All strings and property keys in JSON <em>must</em> be wrapped in double quotes (`"`). Single quotes (`'`) will immediately invalidate the payload.</li>
            <li><strong>Missing Quotes on Keys:</strong> In JavaScript, `{"{"} age: 25 {"}"}` is valid. In JSON, the key must be a string: `{"{"} "age": 25 {"}"}`.</li>
            <li><strong>Invalid Data Types:</strong> JSON only supports Strings, Numbers, Objects, Arrays, Booleans (`true`/`false`), and `null`. You cannot pass Functions, Dates, or `undefined`.</li>
          </ul>

          <h3>Minifying JSON for Production</h3>
          <p>
            While formatting is essential for development and debugging, you should always <em>minify</em> your JSON payloads before saving them to a database or transmitting them over a network. Removing the tabs, spaces, and line breaks can reduce the file size by 20% to 30%, significantly improving application performance and reducing bandwidth costs. Use the "Minify" button in our tool to compress your data before deployment.
          </p>

          <h3>Frequently Asked Questions</h3>
          
          <div className="space-y-6 mt-8">
            <div>
              <h4 className="font-bold text-lg">Is my JSON data sent to a server?</h4>
              <p className="text-text-body mt-2">No. All formatting and validation is performed securely inside your web browser using client-side JavaScript. Your sensitive API payloads, API keys, or database dumps are never transmitted over the internet to our servers.</p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg">How do I fix an &apos;Invalid JSON&apos; error?</h4>
              <p className="text-text-body mt-2">Review the exact line mentioned in the error message. Ensure all your keys are wrapped in double quotes, remove any trailing commas before closing brackets, and ensure no single quotes are used.</p>
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 md:px-6 pb-20">
        <InternalLinks category="tool" currentSlug="json-formatter" />
      </div>
    </>
  );
}
