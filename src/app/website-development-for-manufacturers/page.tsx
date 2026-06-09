import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";

export const metadata: Metadata = {
  title: "Website Development for Manufacturers | B2B Wholesale Portals",
  description: "Enterprise-grade website development for manufacturers and factories. We build B2B eCommerce portals, product catalogs, and scalable digital architectures.",
  alternates: {
    canonical: "https://warsiwebworks.com/website-development-for-manufacturers"
  },
  openGraph: {
    title: "Website Development for Manufacturers | Warsi WebWorks",
    description: "Digitize your manufacturing business with custom B2B portals, global SEO strategies, and high-performance product catalogs engineered in Next.js.",
    url: "https://warsiwebworks.com/website-development-for-manufacturers",
    siteName: "Warsi WebWorks",
    type: "website",
  }
};

export default function ManufacturersWebsiteDevelopment() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://warsiwebworks.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Website Development for Manufacturers",
          "item": "https://warsiwebworks.com/website-development-for-manufacturers"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Website Development for Manufacturers",
      "serviceType": "B2B Web Development",
      "provider": {
        "@type": "ProfessionalService",
        "name": "Warsi WebWorks",
        "url": "https://warsiwebworks.com"
      },
      "description": "Custom B2B website development for the manufacturing sector. Specializing in expansive product catalogs, international lead generation, and wholesale eCommerce integration."
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does a website help a manufacturing business?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A manufacturing website acts as a 24/7 global sales representative. It showcases your production capabilities, houses extensive digital product catalogs, establishes trust with international buyers, and generates qualified B2B leads through targeted search engine visibility."
          }
        },
        {
          "@type": "Question",
          "name": "Can you integrate our website with our ERP system?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we build scalable architectures using Next.js and custom APIs that can seamlessly integrate with your existing Enterprise Resource Planning (ERP) and inventory management systems to display real-time stock levels and pricing to verified buyers."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer B2B eCommerce solutions for factories?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. We engineer secure B2B wholesale portals featuring custom pricing tiers, bulk ordering interfaces, RFQ (Request for Quote) systems, and multi-currency support designed specifically for large-scale manufacturing operations."
          }
        }
      ]
    }
  ];

  return (
    <main className="pt-32 pb-20 bg-base min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <Breadcrumbs items={[
          { name: "Home", url: "/" },
          { name: "Website Development for Manufacturers", url: "/website-development-for-manufacturers" }
        ]} />
        
        <p className="text-text-muted font-semibold tracking-[0.08em] uppercase text-[11px] mb-4 mt-8">Industrial B2B Solutions</p>
        <h1 className="text-4xl md:text-6xl font-bold text-text-primary tracking-tighter mb-6 leading-tight">
          Website Development for Manufacturers
        </h1>
        <p className="text-xl text-accent font-semibold mb-12">
          Scale globally with enterprise-grade B2B portals, expansive digital catalogs, and international lead generation engines.
        </p>

        <section className="prose prose-invert max-w-none mb-16 space-y-6 text-text-body text-lg leading-relaxed">
          <p>
            The manufacturing industry has fundamentally shifted. Gone are the days when a factory could rely solely on trade shows, cold calling, and print catalogs to secure international contracts. Today's B2B procurement officers start their search online. If your digital presence fails to accurately reflect the scale, quality, and reliability of your physical operations, you are losing massive contracts to competitors who have embraced digital transformation.
          </p>
          <p>
            <strong>Website development for manufacturers</strong> requires a drastically different approach than standard retail web design. B2B buying cycles are long, complex, and involve multiple stakeholders. Your website must serve as a comprehensive, authoritative resource that answers technical questions, demonstrates manufacturing capacity, and seamlessly facilitates Request for Quotes (RFQs). At Warsi WebWorks, we engineer industrial platforms that digitize your entire catalog and turn your website into your most profitable sales channel.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-8">Engineering the Modern Digital Factory</h2>
          <div className="space-y-6 text-text-body text-lg leading-relaxed">
            <p>
              Many factories still operate with outdated websites built a decade ago. These legacy systems are often slow, difficult to update, mobile-unfriendly, and virtually invisible on global search engines. We replace these obsolete platforms with cutting-edge architectures powered by <strong>Next.js and React</strong>.
            </p>
            <p>
              When a foreign buyer lands on your site, they are looking for immediate reassurance that you are a legitimate, high-capacity manufacturer capable of fulfilling large orders. We design your digital presence to instantly communicate trust through professional factory photography integrations, detailed machinery specification pages, compliance certifications, and clear production timelines.
            </p>
            <p>
              Beyond aesthetics, the core engine of a manufacturing site is its catalog. Whether you have 50 products or 50,000 SKUs, we build highly searchable, instantly filtering product databases. Buyers can easily find exact specifications, download technical CAD files or PDFs, and add multiple items to a secure RFQ cart—all without experiencing a single page reload.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-card border border-border-subtle rounded-[12px] p-8">
            <h3 className="text-2xl font-bold text-text-primary mb-4">B2B Wholesale Features</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-text-body">
                <span className="text-accent text-lg font-bold shrink-0">✓</span>
                <span><strong>Advanced RFQ Systems:</strong> Custom quote builders allowing buyers to request pricing for complex, multi-item bulk orders.</span>
              </li>
              <li className="flex items-start gap-3 text-text-body">
                <span className="text-accent text-lg font-bold shrink-0">✓</span>
                <span><strong>Dynamic Product Catalogs:</strong> Lightning-fast search and filtering for thousands of SKUs, built with modern headless CMS integration.</span>
              </li>
              <li className="flex items-start gap-3 text-text-body">
                <span className="text-accent text-lg font-bold shrink-0">✓</span>
                <span><strong>ERP/CRM Integration:</strong> Connect your website directly to your internal inventory and sales management software.</span>
              </li>
              <li className="flex items-start gap-3 text-text-body">
                <span className="text-accent text-lg font-bold shrink-0">✓</span>
                <span><strong>Secure Client Portals:</strong> Private login areas where existing B2B clients can view custom pricing, reorder, and track shipments.</span>
              </li>
            </ul>
          </div>

          <div className="bg-card border border-border-subtle rounded-[12px] p-8">
            <h3 className="text-2xl font-bold text-text-primary mb-4">International Growth Tools</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-text-body">
                <span className="text-accent text-lg font-bold shrink-0">✓</span>
                <span><strong>Global SEO Architecture:</strong> Programmatic SEO strategies to rank your specific products in international markets.</span>
              </li>
              <li className="flex items-start gap-3 text-text-body">
                <span className="text-accent text-lg font-bold shrink-0">✓</span>
                <span><strong>Multi-Language Support:</strong> Seamless localization options to cater to buyers in different countries and languages.</span>
              </li>
              <li className="flex items-start gap-3 text-text-body">
                <span className="text-accent text-lg font-bold shrink-0">✓</span>
                <span><strong>Fast Loading Globally:</strong> Deployed on edge networks (CDNs) so your site loads instantly for a buyer in New York or London.</span>
              </li>
              <li className="flex items-start gap-3 text-text-body">
                <span className="text-accent text-lg font-bold shrink-0">✓</span>
                <span><strong>Trust Signal Optimization:</strong> Prominent display of ISO certifications, factory tours, and quality control processes.</span>
              </li>
            </ul>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-6">Programmatic SEO for Vast Product Lines</h2>
          <div className="space-y-6 text-text-body text-lg leading-relaxed">
            <p>
              If you manufacture hundreds or thousands of specific parts, optimizing each page manually is impossible. We employ <strong>Programmatic SEO</strong> to automatically generate highly optimized landing pages for every single SKU, category, and material type in your inventory.
            </p>
            <p>
              When an engineer searches for a highly specific term like "custom forged aluminum bracket manufacturer," our architecture ensures your exact product page appears. We implement comprehensive Product and Organization Schema Markup, making your technical data instantly readable by Google's algorithms. This long-tail strategy captures highly qualified traffic—buyers who know exactly what they want and are ready to issue a purchase order.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-surface/50 border-l-4 border-accent rounded-r-[12px] p-8 italic text-text-body text-lg">
            "We had a great product but our 15-year-old website was holding us back from international markets. Warsi WebWorks built us a Next.js platform that digitized our entire 2,000-item catalog. Within six months, our organic RFQs from the US and European markets increased by over 400%. The site paid for itself with the first major export contract."
            <span className="block mt-6 font-semibold text-text-primary not-italic">— Managing Director, Auto Parts Manufacturing Co.</span>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-8">Our B2B Development Process</h2>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 bg-card border border-border-subtle rounded-[12px] p-6">
              <div className="flex-shrink-0">
                <span className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xl font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Technical Scoping & Data Migration</h3>
                <p className="text-text-body leading-relaxed">We start by analyzing your current product data, inventory systems, and sales processes. We architect a database structure that can handle your complex SKU variations, pricing tiers, and technical specifications without slowing down the site.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 bg-card border border-border-subtle rounded-[12px] p-6">
              <div className="flex-shrink-0">
                <span className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xl font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Industrial UI/UX Design</h3>
                <p className="text-text-body leading-relaxed">Manufacturing websites should prioritize clarity and function over flashy distractions. We design intuitive, professional interfaces that make finding a needle in a haystack (or a specific valve in a 10,000-part catalog) effortless for the buyer.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 bg-card border border-border-subtle rounded-[12px] p-6">
              <div className="flex-shrink-0">
                <span className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xl font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Headless Commerce & Next.js Build</h3>
                <p className="text-text-body leading-relaxed">We develop the front-end using Next.js for uncompromised speed and SEO performance. We can decouple the front-end from your backend systems (Headless Commerce), allowing for ultimate flexibility and integration with modern headless CMS platforms.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 bg-card border border-border-subtle rounded-[12px] p-6">
              <div className="flex-shrink-0">
                <span className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xl font-bold">4</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Global Launch & B2B SEO</h3>
                <p className="text-text-body leading-relaxed">Upon launch, we implement strict 301 redirect mapping to protect your existing search equity. We then deploy targeted international SEO campaigns to start driving high-value procurement traffic to your new digital factory.</p>
              </div>
            </div>
          </div>
        </section>

      </div>

      <section className="container mx-auto px-6 md:px-12 max-w-4xl mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="bg-card border border-border-subtle p-6 rounded-lg">
            <h3 className="text-xl font-bold text-text-primary mb-3">How does a website help a manufacturing business?</h3>
            <p className="text-text-body leading-relaxed">A modern manufacturing website acts as a 24/7 global sales representative. It showcases your massive production capabilities, houses extensive digital product catalogs, establishes immediate trust with international buyers, and generates highly qualified B2B leads through targeted search engine visibility.</p>
          </div>
          <div className="bg-card border border-border-subtle p-6 rounded-lg">
            <h3 className="text-xl font-bold text-text-primary mb-3">Can you integrate our website with our ERP system?</h3>
            <p className="text-text-body leading-relaxed">Yes, we specialize in complex technical integrations. We build scalable architectures using custom APIs that can seamlessly connect your Next.js frontend with your existing Enterprise Resource Planning (ERP) and inventory management systems. This allows you to display real-time stock levels, dynamically update pricing, and automatically push new web orders directly to the factory floor.</p>
          </div>
          <div className="bg-card border border-border-subtle p-6 rounded-lg">
            <h3 className="text-xl font-bold text-text-primary mb-3">Do you offer B2B eCommerce solutions for factories?</h3>
            <p className="text-text-body leading-relaxed">Absolutely. Retail B2C eCommerce platforms like standard Shopify setups often fail for manufacturers. We engineer secure B2B wholesale portals featuring custom pricing tiers based on user logins, bulk ordering grid interfaces, complex Request for Quote (RFQ) systems, and multi-currency support designed specifically for large-scale industrial operations.</p>
          </div>
          <div className="bg-card border border-border-subtle p-6 rounded-lg">
            <h3 className="text-xl font-bold text-text-primary mb-3">How do you handle catalogs with thousands of products?</h3>
            <p className="text-text-body leading-relaxed">We use Headless CMS architectures and advanced database indexing (like Algolia or Elasticsearch) integrated into Next.js. This ensures that even if you have 50,000 SKUs, a user can search, filter by highly specific technical attributes, and view product pages instantly, without the agonizing loading times typical of older platforms.</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 md:px-12 max-w-6xl mb-24">
        <InternalLinks category="service" currentSlug="website-development-for-manufacturers" />
        
        <div className="mt-16 text-center bg-card border border-border-subtle rounded-[24px] p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">Ready to Digitize Your Factory?</h2>
          <p className="text-xl text-text-body mb-8 max-w-2xl mx-auto">
            Don't let outdated technology cost you international contracts. Partner with Warsi WebWorks to build an enterprise B2B platform that scales your global sales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 rounded-[8px] transition-all duration-300">
              Request a Technical Audit
            </Link>
            <Link href="/ecommerce-for-manufacturers" className="inline-flex items-center justify-center gap-2 bg-transparent border border-border-subtle hover:border-accent text-text-primary font-bold px-8 py-4 rounded-[8px] transition-all duration-300">
              Explore B2B eCommerce
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
