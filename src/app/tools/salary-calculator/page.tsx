import { Metadata } from 'next';
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import ToolLayout from '@/components/tools/ToolLayout';
import SalaryCalculator from '@/components/tools/SalaryCalculator';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata: Metadata = {
  title: 'India Salary Calculator 2026 | Gross to Net Take Home Pay',
  description: 'Calculate your exact net take-home salary in India. Instantly deduct PF, professional tax, and income tax from your gross CTC to see your in-hand pay.',
  alternates: {
    canonical: 'https://warsiwebworks.com/tools/salary-calculator',
  }
};

export default function SalaryCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "India Salary Calculator",
        "operatingSystem": "Any",
        "applicationCategory": "FinanceApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "description": "Calculate your net take-home salary in India by deducting PF, professional tax, and standard income tax from your gross CTC."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the difference between Gross Salary and Net Salary?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Gross Salary is your total compensation before any deductions like taxes, Provident Fund (PF), or Professional Tax are taken out. Net Salary (Take-Home Pay) is the actual amount that gets credited to your bank account."
            }
          },
          {
            "@type": "Question",
            "name": "How is Employee Provident Fund (EPF) calculated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "By default, the EPF is calculated as 12% of your Basic Salary. However, for calculation simplicity when exact Basic Salary is unknown, a standard approximation (like 12% of a portion of gross) is often used to give a rough estimate of the monthly deduction."
            }
          },
          {
            "@type": "Question",
            "name": "Is Professional Tax applicable in all Indian states?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Professional Tax is levied by individual state governments. States like Maharashtra, Karnataka, and Tamil Nadu charge it (usually capped at ₹2,500/year or ₹200/month), while states like Delhi and Haryana do not."
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
        title="Take-Home Salary Calculator" 
        description="Enter your Gross Annual CTC to calculate your estimated monthly take-home pay, factoring in standard Indian tax deductions and Provident Fund."
      >
        <SalaryCalculator />
      </ToolLayout>

      <div className="container mx-auto px-4 md:px-6 mb-8">
        <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: "Tools", url: "/tools" }, { name: "salary calculator", url: "/tools/salary-calculator" }]} />
      </div>
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <RelatedTools currentTool="salary" relatedToolIds={['word-counter', 'resume', 'invoice', 'cover-letter']} />
      </div>

      <section className="bg-surface py-20 border-t border-border-section">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl prose prose-neutral dark:prose-invert prose-headings:text-text-primary prose-a:text-accent">
          <h2>Understanding Your Salary Breakdown in India</h2>
          <p>
            When negotiating a job offer or planning your personal finances, the most crucial metric is not your Cost to Company (CTC), but your <strong>Net Take-Home Pay</strong>. It&apos;s a common shock for young professionals to accept a ₹12 Lakhs Per Annum (LPA) package, expecting exactly ₹1,00,000 per month, only to see ₹82,000 hit their bank account.
          </p>
          <p>
            Our India Salary Calculator simplifies this complex mathematical process. By factoring in standard deductions based on Indian labor laws and tax regimes, it bridges the gap between what HR offers and what you actually earn.
          </p>

          <h3>Gross Salary vs. Net Salary vs. CTC</h3>
          <p>To use this calculator effectively, you must understand the terminology used in Indian employment contracts:</p>
          <ul>
            <li><strong>CTC (Cost To Company):</strong> The total amount the company spends on you. This includes your gross salary, the company's contribution to your Provident Fund (Employer PF), gratuity, health insurance premiums, and sometimes even non-cash perks.</li>
            <li><strong>Gross Salary:</strong> Your CTC minus the employer's contributions (like Employer PF and Gratuity). This is the amount before your personal taxes and deductions are taken out.</li>
            <li><strong>Net Salary (In-Hand):</strong> Your Gross Salary minus all personal deductions (Employee PF, Professional Tax, TDS / Income Tax). This is your actual usable income.</li>
          </ul>

          <h3>Major Deductions Explained</h3>
          <p>Here is a breakdown of the components our calculator deducts from your gross income to find your take-home pay:</p>
          
          <h4>1. Employee Provident Fund (EPF)</h4>
          <p>
            The EPF is a retirement benefits scheme governed by the Employees' Provident Fund Organisation (EPFO). Both you and your employer contribute 12% of your Basic Salary + Dearness Allowance to this fund. The calculator estimates a standard 12% deduction to give you an accurate picture of your locked-in savings versus liquid cash.
          </p>

          <h4>2. Professional Tax (PT)</h4>
          <p>
            Professional Tax is a state-level tax imposed on income earners. Not all states charge it. For example, if you work in Bangalore (Karnataka) or Mumbai (Maharashtra), you will see a deduction of roughly ₹200 per month. If you work in Noida (UP) or Gurgaon (Haryana), this tax is zero.
          </p>

          <h4>3. Income Tax (TDS)</h4>
          <p>
            Tax Deducted at Source (TDS) is your income tax divided by 12 and deducted monthly. Depending on whether you opt for the New Tax Regime (lower rates, no exemptions) or the Old Tax Regime (higher rates, but deductions under 80C, HRA, etc.), this number varies wildly. Our calculator provides a conservative standard estimation.
          </p>

          <h3>How to Negotiate Your Salary Effectively</h3>
          <ol>
            <li><strong>Ask for the Breakdown:</strong> Never accept a CTC figure blindly. Always ask HR for the "Annexure" or detailed salary breakdown to see how much is Basic, HRA, and Special Allowance.</li>
            <li><strong>Check the Variable Pay:</strong> Often, a high CTC includes a 10-20% variable component tied to company performance. This is not guaranteed take-home pay.</li>
            <li><strong>Build Leverage:</strong> If the take-home pay is lower than you need, ask for a higher fixed component or joining bonus. If you are a freelancer or developer, you can also <a href="/tools/website-cost-calculator">calculate how much a side-hustle website</a> could earn you to supplement your income.</li>
          </ol>

          <h3>Frequently Asked Questions</h3>
          
          <div className="space-y-6 mt-8">
            <div>
              <h4 className="font-bold text-lg">What is a good take-home salary in India?</h4>
              <p className="text-text-body mt-2">A "good" salary depends entirely on your city. In tier-1 cities like Bangalore or Mumbai, a take-home of ₹60,000 to ₹80,000 per month provides a comfortable lifestyle for a single person. In tier-2 cities, ₹40,000 per month can offer a similar standard of living.</p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg">Why does my actual salary differ slightly from the calculator?</h4>
              <p className="text-text-body mt-2">This tool uses standard estimations. Your actual take-home pay will vary based on your specific Basic Salary percentage (usually 40-50% of CTC), your chosen tax regime, your declared investment proofs (like rent receipts or life insurance under 80C), and any variable pay structures.</p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg">Can I opt out of the EPF deduction?</h4>
              <p className="text-text-body mt-2">If your Basic Salary at the time of joining is above ₹15,000 per month, and you have never contributed to EPF before, you can legally opt out at the start of your employment to increase your take-home pay. However, most financial advisors recommend keeping it for forced retirement savings and tax-free interest.</p>
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 md:px-6 pb-20">
        <InternalLinks category="tool" currentSlug="salary-calculator" />
      </div>
    </>
  );
}
