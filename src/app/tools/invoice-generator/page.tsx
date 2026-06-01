import { Metadata } from 'next';
import ToolLayout from '@/components/tools/ToolLayout';
import InvoiceGenerator from '@/components/tools/InvoiceGenerator';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata: Metadata = {
  title: 'Free Invoice Generator | Create Professional PDF Invoices',
  description: 'Create, customize, and download professional PDF invoices for free. Add taxes, line items, and your branding in seconds.',
  alternates: {
    canonical: 'https://warsi-webworks.vercel.app/tools/invoice-generator',
  }
};

export default function InvoiceGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Invoice Generator",
        "operatingSystem": "Any",
        "applicationCategory": "BusinessApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Generate professional, tax-compliant PDF invoices instantly."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this invoice generator truly free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our invoice generator is 100% free. There are no limits on how many invoices you can create, no hidden watermarks, and no sign-ups required."
            }
          },
          {
            "@type": "Question",
            "name": "Does this tool save my data?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For your privacy and security, all invoice generation happens locally in your web browser. We do not save or transmit your financial data, client details, or generated PDFs to our servers."
            }
          },
          {
            "@type": "Question",
            "name": "Can I add GST or specific regional taxes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, there is a dedicated tax percentage field. You can input your local GST, VAT, or Sales Tax rate, and the tool will automatically calculate the final total."
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
          title="Free Invoice Generator" 
          description="Create professional, print-ready PDF invoices in seconds. No watermarks, no sign-up required."
        >
          <InvoiceGenerator />
        </ToolLayout>
      </div>
      
      <div className="hidden print:block w-full">
        <InvoiceGenerator />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-5xl print:hidden">
        <RelatedTools currentTool="invoice" relatedToolIds={['salary', 'business-name', 'website-cost']} />
      </div>

      <section className="bg-surface py-20 border-t border-border-section print:hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl prose prose-neutral dark:prose-invert prose-headings:text-text-primary prose-a:text-accent">
          <h2>How to Create Professional Invoices</h2>
          <p>
            Whether you are a freelancer, contractor, or a small business owner, getting paid on time starts with sending a professional, clear, and legally compliant invoice. An invoice is more than just a request for payment; it's an official record of the transaction.
          </p>
          <p>
            Our Free Invoice Generator is designed to eliminate the headache of formatting Excel spreadsheets or Microsoft Word templates. With a clean, modern interface, you can generate a PDF invoice that commands respect and ensures prompt payment.
          </p>

          <h3>Essential Components of a Valid Invoice</h3>
          <p>To avoid payment delays from your client's accounting department, ensure your invoice includes the following critical details:</p>
          <ul>
            <li><strong>The Word "Invoice":</strong> It must be clearly labeled as an invoice at the top.</li>
            <li><strong>Unique Invoice Number:</strong> A sequential identifier (e.g., INV-2026-001) helps both you and your client track payments.</li>
            <li><strong>Dates:</strong> Both the "Date of Issue" and the "Due Date" must be explicitly stated. "Due upon receipt" is common, but "Net 30" (due in 30 days) is the standard for B2B transactions.</li>
            <li><strong>Your Business Details:</strong> Your registered business name, address, and contact information. If applicable, include your Tax ID (like GSTIN in India or EIN in the US).</li>
            <li><strong>Client Details:</strong> The name and address of the person or company paying you.</li>
            <li><strong>Line Items:</strong> A clear, itemized list of the goods or services provided, including the quantity, rate, and total for each line.</li>
            <li><strong>Tax and Total:</strong> Any applicable VAT, GST, or Sales Tax must be calculated clearly before the grand total.</li>
            <li><strong>Payment Terms:</strong> Specify how you want to be paid. Provide your Bank Account/Routing numbers, UPI ID, or a link to a payment gateway (e.g., Stripe or PayPal).</li>
          </ul>

          <h3>Best Invoicing Practices for Freelancers</h3>
          <ol>
            <li><strong>Invoice Promptly:</strong> Don't wait until the end of the month if you finished a project on the 5th. Send the invoice the moment the deliverable is accepted.</li>
            <li><strong>Follow Up:</strong> Don't be afraid to send a polite reminder 3 days before the due date, and immediately follow up if a payment is overdue.</li>
            <li><strong>Keep Descriptions Clear:</strong> Don't just write "Web Development". Write "Frontend Web Development for E-Commerce Checkout Flow (40 Hours)". Clarity prevents disputes.</li>
          </ol>

          <h3>Why Use Our Generator?</h3>
          <p>
            Unlike other free invoice generators, we do not require you to create an account, nor do we plaster our logo or a "Created by" watermark on your final PDF. All calculations happen instantly in your browser, ensuring maximum privacy for your financial data. If you are looking to automate your invoicing entirely, <a href="/#contact">contact Warsi WebWorks</a> to have a custom dashboard built for your business.
          </p>

          <h3>Frequently Asked Questions</h3>
          <div className="space-y-6 mt-8">
            <div>
              <h4 className="font-bold text-lg">Is this invoice generator truly free?</h4>
              <p className="text-text-body mt-2">Yes, our invoice generator is 100% free. There are no limits on how many invoices you can create, no hidden watermarks, and no sign-ups required.</p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg">Does this tool save my data?</h4>
              <p className="text-text-body mt-2">For your privacy and security, all invoice generation happens locally in your web browser. We do not save or transmit your financial data, client details, or generated PDFs to our servers.</p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg">Can I add GST or specific regional taxes?</h4>
              <p className="text-text-body mt-2">Yes, there is a dedicated tax percentage field. You can input your local GST, VAT, or Sales Tax rate, and the tool will automatically calculate the final total.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
