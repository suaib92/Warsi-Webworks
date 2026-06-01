import { Metadata } from 'next';
import ToolLayout from '@/components/tools/ToolLayout';
import QrCodeGenerator from '@/components/tools/QRCodeGenerator';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata: Metadata = {
  title: 'Free QR Code Generator | Create Custom QR Codes',
  description: 'Generate high-quality, non-expiring QR codes for URLs, emails, phone numbers, and WhatsApp. Download in PNG or SVG formats instantly for free.',
  alternates: {
    canonical: 'https://warsi-webworks.vercel.app/tools/qr-code-generator',
  }
};

export default function QrCodeGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "QR Code Generator",
        "operatingSystem": "Any",
        "applicationCategory": "UtilitiesApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Generate dynamic and static QR codes for links, text, and contact info, and download them in vector formats."
      },
      {
        "@type": "HowTo",
        "name": "How to generate a QR Code",
        "description": "Create a scannable QR code for your business or personal use in just three steps.",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Select Content Type",
            "text": "Choose whether you want to encode a URL, plain text, email address, phone number, or WhatsApp link."
          },
          {
            "@type": "HowToStep",
            "name": "Enter Details",
            "text": "Type in the specific URL or phone number you wish to encode."
          },
          {
            "@type": "HowToStep",
            "name": "Download",
            "text": "Click the download button to save your QR code as a high-resolution PNG or infinitely scalable SVG file."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do these QR codes ever expire?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. The QR codes generated on this platform are static, meaning the data is hard-coded directly into the image. They will work forever and never expire."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use these QR codes for commercial purposes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can generate and download as many QR codes as you need for both personal and commercial use without any fees or watermarks."
            }
          },
          {
            "@type": "Question",
            "name": "Why isn't my QR code scanning?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ensure there is enough contrast between the black squares and the background. Also, make sure you don't scale a PNG file too large where it becomes blurry; use SVG for large prints."
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
        title="QR Code Generator" 
        description="Create fast, non-expiring QR codes for links, emails, and phone numbers. Download high-quality PNGs or scalable SVGs for your print marketing."
      >
        <QrCodeGenerator />
      </ToolLayout>

      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <RelatedTools currentTool="qr-code" relatedToolIds={['business-name', 'website-cost', 'invoice']} />
      </div>

      <section className="bg-surface py-20 border-t border-border-section">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl prose prose-neutral dark:prose-invert prose-headings:text-text-primary prose-a:text-accent">
          <h2>The Ultimate Guide to Using QR Codes in 2026</h2>
          <p>
            Quick Response (QR) codes have transitioned from a niche tech novelty to an absolute necessity for modern business operations. Whether it's a restaurant replacing physical menus, a real estate agent placing virtual tour links on yard signs, or an ecommerce brand putting product manuals on packaging, QR codes bridge the gap between the physical world and digital experiences.
          </p>
          <p>
            Our Free QR Code Generator allows you to instantly create high-quality, vector-ready codes for various use cases without requiring an account or paying subscription fees.
          </p>

          <h3>Common Types of QR Codes</h3>
          <p>Not all QR codes just open websites. Our generator supports several highly actionable formats:</p>
          <ul>
            <li><strong>URLs/Websites:</strong> Direct users to a landing page, portfolio, or your <a href="/tools/website-cost-calculator">custom web application</a>.</li>
            <li><strong>Text:</strong> Share a hidden message, Wi-Fi password, or simple text snippet offline.</li>
            <li><strong>Email:</strong> Automatically open the user&apos;s email client with your email address, subject line, and body pre-filled. Excellent for customer support channels.</li>
            <li><strong>Phone:</strong> Prompt the user&apos;s phone to dial a specific number with one tap. Ideal for physical flyers and business cards.</li>
            <li><strong>WhatsApp:</strong> Open a direct WhatsApp chat with your business number. High conversion rate for local service businesses.</li>
          </ul>

          <h3>Best Practices for Printing QR Codes</h3>
          <p>
            A QR code is useless if a smartphone camera can't read it. If you are printing your codes on banners, business cards, or packaging, follow these essential design rules:
          </p>
          <ol>
            <li><strong>Size Matters:</strong> The minimum size for a printed QR code should be 2 x 2 cm (0.8 x 0.8 inches). If it's placed on a billboard or poster viewed from afar, use the 10:1 distance ratio (e.g., if the scanner is 10 feet away, the code must be 1 foot wide).</li>
            <li><strong>Download the SVG:</strong> For print materials, never use a PNG or JPG. Always download the <strong>SVG format</strong> provided by our tool. SVGs are vector graphics, meaning they can be scaled to the size of a skyscraper without losing quality or becoming blurry.</li>
            <li><strong>High Contrast:</strong> Always keep the QR code significantly darker than the background. Black squares on a white background scan the fastest. Scanning algorithms struggle with inverted codes (white squares on a black background) or low-contrast pastels.</li>
            <li><strong>Leave a Quiet Zone:</strong> The "Quiet Zone" is the blank margin around the QR code. Never place text or other graphics too close to the borders of the code, as it confuses the scanner.</li>
          </ol>

          <h3>Static vs. Dynamic QR Codes</h3>
          <p>
            It is vital to understand the difference before printing thousands of flyers:
          </p>
          <p>
            <strong>Static QR Codes (What we provide):</strong> The destination URL or text is permanently hard-coded into the pattern of the squares. They do not rely on third-party servers to route traffic. As a result, they are 100% free, load instantly, and <em>never expire</em>. However, if you make a typo in the URL, you cannot change it after printing.
          </p>
          <p>
            <strong>Dynamic QR Codes:</strong> The code contains a short "redirect" URL. You can change the final destination at any time without reprinting the code. They also allow for scan tracking and analytics. However, they are usually offered via paid monthly subscriptions, and if the provider shuts down, your QR codes will break.
          </p>

          <h3>Frequently Asked Questions</h3>
          
          <div className="space-y-6 mt-8">
            <div>
              <h4 className="font-bold text-lg">Do these QR codes ever expire?</h4>
              <p className="text-text-body mt-2">No. The QR codes generated on this platform are static, meaning the data is hard-coded directly into the image. They will work forever and never expire. You are not reliant on our servers for the code to function.</p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg">Can I use these QR codes for commercial purposes?</h4>
              <p className="text-text-body mt-2">Yes, you can generate and download as many QR codes as you need for both personal and commercial use without any fees, watermarks, or attribution required.</p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg">Why isn&apos;t my QR code scanning?</h4>
              <p className="text-text-body mt-2">Ensure there is enough contrast between the black squares and the background. Also, make sure you don&apos;t scale a PNG file too large where it becomes blurry; always use the SVG format for large prints or professional design software (Illustrator, Figma).</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
