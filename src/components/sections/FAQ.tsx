
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqs = [
  {
    q: "What services does a web agency in Moradabad provide?",
    a: "As a premium web agency in Moradabad, we provide end-to-end digital solutions including Website Development, Ecommerce Development, React and Next.js applications, Mobile App Development, and SEO Services.",
  },
  {
    q: "Do you build custom Shopify/Ecommerce stores?",
    a: "Yes. We engineer high-conversion custom Shopify stores, complete with headless architectures and complex inventory systems tailored for retail and wholesale businesses.",
  },
  {
    q: "How much does a custom website cost?",
    a: "Pricing depends on complexity. We build premium, custom-coded platforms rather than template sites, ensuring higher performance, security, and organic ranking. Contact us for a detailed project estimate.",
  },
  {
    q: "How long does it take to design a website?",
    a: "A high-performance business website typically takes 4-8 weeks, while complex web applications or large-scale ecommerce platforms can take 8-16 weeks to engineer properly.",
  },
  {
    q: "Do you provide ongoing SEO and maintenance?",
    a: "Absolutely. We offer comprehensive, long-term growth partnerships that include technical SEO optimization, speed monitoring, and feature expansions.",
  },
];

export default function FAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <section className="bg-base py-32 border-t border-border-section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="text-center mb-16">
          <p             className="text-text-muted font-semibold tracking-[0.08em] uppercase text-[11px] mb-4"
          >
            FAQ
          </p>
          <h2             className="text-4xl md:text-6xl font-bold text-text-primary tracking-tighter"
          >
            Frequently Asked Questions.
          </h2>
        </div>

        <Accordion className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
            >
              <AccordionItem className="bg-card border border-border-subtle rounded-[12px] px-6 py-2">
                <AccordionTrigger className="text-[17px] font-semibold text-text-primary py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-text-body text-base leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
