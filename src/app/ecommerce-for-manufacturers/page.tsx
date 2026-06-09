import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";

export const metadata: Metadata = {
  title: "B2B eCommerce for Manufacturers | Wholesale Portals",
  description: "Enterprise-grade B2B eCommerce development for manufacturers and distributors. We engineer scalable wholesale portals, complex pricing engines, and RFQ systems.",
  alternates: {
    canonical: "https://warsiwebworks.com/ecommerce-for-manufacturers"
  },
  openGraph: {
    title: "B2B eCommerce for Manufacturers | Warsi WebWorks",
    description: "Transform your supply chain with custom B2B eCommerce portals. We engineer secure wholesale platforms featuring custom pricing tiers and direct ERP integrations.",
    url: "https://warsiwebworks.com/ecommerce-for-manufacturers",
    siteName: "Warsi WebWorks",
    type: "website",
  }
};

export default function EcommerceForManufacturers() {
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
          "name": "B2B eCommerce for Manufacturers",
          "item": "https://warsiwebworks.com/ecommerce-for-manufacturers"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "B2B eCommerce Architecture",
      "serviceType": "eCommerce Web Development",
      "provider": {
        "@type": "ProfessionalService",
        "name": "Warsi WebWorks",
        "url": "https://warsiwebworks.com"
      },
      "description": "Enterprise B2B eCommerce software engineering for manufacturers, featuring headless wholesale portals, dynamic pricing engines, Request for Quote (RFQ) workflows, and deep ERP integration."
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How is B2B eCommerce fundamentally different from regular retail (B2C)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "B2B eCommerce involves highly complex, negotiated purchasing workflows. Unlike B2C where pricing is static and transactions are immediate, B2B portals require custom pricing tiers based on a specific client's volume, complex Request for Quote (RFQ) systems, bulk ordering grids, net-payment terms, and integration with the manufacturer's ERP system for real-time inventory tracking."
          }
        },
        {
          "@type": "Question",
          "name": "Can you hide our pricing from retail customers and competitors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We engineer gated portals where the public website displays your full product catalog for SEO purposes, but pricing and the ability to purchase are hidden behind a secure login. A buyer must be manually verified by your sales team before they can view their specific pricing matrix."
          }
        },
        {
          "@type": "Question",
          "name": "Do you integrate with SAP, Oracle, Microsoft Dynamics, or custom ERPs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. We do not use fragile plugins; we engineer custom API middleware that securely connects your Next.js eCommerce front-end directly to your backend Enterprise Resource Planning (ERP) systems, fully automating order processing and live inventory synchronization."
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
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <Breadcrumbs items={[
          { name: "Home", url: "/" },
          { name: "B2B eCommerce for Manufacturers", url: "/ecommerce-for-manufacturers" }
        ]} />
        
        <div className="max-w-4xl mb-16">
          <p className="text-text-muted font-semibold tracking-[0.08em] uppercase text-[11px] mb-4 mt-8">Industrial Digital Commerce</p>
          <h1 className="text-5xl md:text-7xl font-bold text-text-primary tracking-tighter mb-8 leading-tight">
            Enterprise B2B eCommerce for Manufacturers.
          </h1>
          <p className="text-2xl text-accent font-semibold leading-relaxed mb-6">
            We automate your wholesale supply chain with custom Headless B2B portals, dynamic pricing engines, and seamless ERP integrations.
          </p>
        </div>

        <section className="prose prose-invert max-w-none mb-24 text-text-body text-lg leading-relaxed">
          <p>
            The transition from traditional manufacturing sales—relying on PDFs, faxes, and manual purchase orders—to digital commerce is no longer optional; it is a matter of corporate survival. However, standard retail eCommerce platforms like basic Shopify or WooCommerce setups fail spectacularly when applied to the operational complexities of factory-level manufacturing. <strong>B2B eCommerce for manufacturers</strong> requires an entirely different, vastly more sophisticated technical architecture—one capable of handling convoluted pricing matrices, massive minimum order quantities (MOQs), and intricate supply chain logistics.
          </p>
          <p>
            At Warsi WebWorks, we do not build generic online stores; we engineer highly specialized wholesale software using Headless Commerce architectures and Next.js. We digitize your entire sales operation, allowing your distributors, international buyers, and wholesale partners to log in, view their specifically negotiated pricing, check real-time factory inventory, and place bulk orders seamlessly without ever needing to pick up the phone.
          </p>
        </section>

        {/* Deep Engineering Section */}
        <div className="bg-surface/30 border-y border-border-subtle py-16 mb-24 -mx-6 px-6 md:-mx-12 md:px-12">
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tighter mb-12">The Complexities of Industrial B2B Commerce</h2>
          
          <div className="space-y-16">
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">1. Dynamic Pricing Engines</h3>
              <p className="text-text-body text-lg leading-relaxed mb-4">
                In a consumer-facing (B2C) store, a customer buys one item at a fixed price. In manufacturing B2B commerce, the rules change entirely. Client A might have a 20% discount on aluminum products but pay full price for brass. Client B might be required to order a minimum of a full shipping container (FCL). Client C might require a custom manufacturing run and needs to submit a detailed Request for Quote (RFQ). Our custom eCommerce architectures solve these complexities natively. We build robust user authentication systems connected to dynamic pricing engines. When a user logs in, the Next.js front-end queries your database in milliseconds, updating the entire catalog's pricing, shipping options, and tax configurations specifically for that individual user profile.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">2. High-Performance Catalog Architecture</h3>
              <p className="text-text-body text-lg leading-relaxed mb-4">
                Manufacturing catalogs can be immense—often containing tens of thousands of SKUs with highly specific technical attributes. Traditional monolithic platforms buckle under this weight, resulting in 10-second page loads. We utilize Headless Architecture and advanced indexing technologies (like Algolia or Elasticsearch). This ensures that buyers can filter your massive catalog by exact specifications (e.g., tensile strength, threading size, alloy composition) instantly, without experiencing page reload delays.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">3. ERP & Middleware Integration</h3>
              <p className="text-text-body text-lg leading-relaxed mb-4">
                A B2B portal is useless if it exists in a silo. We engineer custom API middleware that securely connects your new Next.js front-end directly to your backend Enterprise Resource Planning (ERP) systems (SAP, Oracle, Microsoft Dynamics). When a wholesale order is placed online, it is automatically injected into your ERP, updating your accounting ledgers, adjusting warehouse inventory, and alerting the factory floor—all without a single keystroke from your sales team.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <section className="mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tighter mb-12 text-center">Core Wholesale Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Custom Pricing Tiers", desc: "Assign specific discounts, bulk pricing, and negotiated rates automatically based on user login profiles." },
              { title: "Advanced RFQ Engine", desc: "Allow buyers to add hundreds of items to a 'Quote Cart' and submit it directly to your sales team for custom pricing negotiation." },
              { title: "Quick Order Grids", desc: "Specialized spreadsheet-style interfaces allowing returning buyers to input SKU numbers and quantities for rapid reordering." },
              { title: "Complex Shipping Logic", desc: "Automated calculation of LTL (Less than Truckload) freight, international duties, and multi-warehouse routing via APIs." },
              { title: "Live Inventory Management", desc: "Prevent over-ordering by displaying real-time stock levels directly from the factory floor via ERP synchronization." },
              { title: "B2B Payment Gateways", desc: "Integration of specialized payment terms like Net-30/Net-60 invoicing, ACH transfers, and corporate credit lines." }
            ].map((feature, i) => (
              <div key={i} className="bg-surface border border-border-subtle rounded-xl p-6">
                <h3 className="text-xl font-bold text-text-primary mb-3">{feature.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Headless Commerce Section */}
        <section className="mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tighter mb-8">Headless Commerce: The Technical Edge</h2>
          <div className="prose prose-invert max-w-none text-text-body text-lg leading-relaxed">
            <p>
              Traditional monolithic eCommerce platforms tie the front-end (what the user sees) tightly to the back-end (where the data lives). When a manufacturer with a massive catalog uses these systems, the site becomes unbearably slow and incredibly difficult to customize. <strong>Headless Commerce</strong> solves this.
            </p>
            <p>
              By decoupling the presentation layer from the eCommerce engine, we can build the front-end using Next.js. Next.js statically generates pages and delivers them via Edge Networks. This means your 10,000-item catalog loads in milliseconds, providing an app-like experience for your buyers. Meanwhile, the backend securely handles the heavy lifting of inventory and pricing data via robust APIs.
            </p>
            <p>
              This headless architecture not only provides superior speed—a critical factor for Technical SEO—but it also future-proofs your business. You can upgrade your internal ERP systems or switch backend providers entirely without ever needing to redesign or rebuild the public-facing website.
            </p>
          </div>
        </section>

        {/* Testimonial */}
        <section className="mb-24">
          <div className="bg-surface/50 border-l-4 border-accent rounded-r-2xl p-8 md:p-12 shadow-lg">
            <p className="italic text-text-body text-xl leading-relaxed">
              "Before Warsi WebWorks, our sales team spent 60% of their day manually re-typing emailed purchase orders and PDFs into our ERP system. We launched our new custom B2B portal, and now 80% of our distributors order directly online without speaking to us. The API integration with our inventory system is flawless. The portal paid for itself in reduced administrative overhead within the first three months."
            </p>
            <span className="block mt-6 font-bold text-text-primary text-lg">— VP of Operations, Industrial Valve Manufacturing</span>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-24 border-t border-border-subtle pt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-8">B2B Technical FAQs</h2>
          <div className="space-y-6">
            <div className="bg-card border border-border-subtle p-6 rounded-lg">
              <h3 className="text-xl font-bold text-text-primary mb-3">How is B2B eCommerce different from regular retail (B2C)?</h3>
              <p className="text-text-body leading-relaxed">B2B eCommerce involves vastly more complex purchasing workflows. Unlike B2C where pricing is static and immediate, B2B portals require custom pricing tiers based on client volume, complex Request for Quote (RFQ) systems, bulk ordering grids, negotiated payment terms (like Net-30), and deep integration with the manufacturer's ERP system for real-time inventory tracking.</p>
            </div>
            <div className="bg-card border border-border-subtle p-6 rounded-lg">
              <h3 className="text-xl font-bold text-text-primary mb-3">Can you hide our pricing from competitors?</h3>
              <p className="text-text-body leading-relaxed">Yes. We engineer gated portals where the public website displays your full product catalog, technical specifications, and SEO content, but pricing and the ability to purchase are hidden. A user must apply for an account, be vetted by your sales team, and log in before they can view their specific pricing matrix and place an order.</p>
            </div>
            <div className="bg-card border border-border-subtle p-6 rounded-lg">
              <h3 className="text-xl font-bold text-text-primary mb-3">Do you integrate with SAP, Oracle, or custom ERPs?</h3>
              <p className="text-text-body leading-relaxed">Absolutely. We engineer custom API middleware that securely connects your Next.js eCommerce front-end directly to your backend Enterprise Resource Planning (ERP) systems. This enables automated order processing, live inventory synchronization, and ensures that your accounting software is updated in real-time as soon as a wholesale order is placed.</p>
            </div>
            <div className="bg-card border border-border-subtle p-6 rounded-lg">
              <h3 className="text-xl font-bold text-text-primary mb-3">What happens if a buyer wants a custom manufactured product?</h3>
              <p className="text-text-body leading-relaxed">We implement advanced Custom Product Configurators and RFQ workflows. A buyer can select base materials, input custom dimensions, and attach CAD files directly within the portal. This submits a highly structured lead to your engineering team, drastically reducing the back-and-forth emails typically required for custom OEM orders.</p>
            </div>
          </div>
        </section>

      </div>

      <section className="container mx-auto px-6 md:px-12 max-w-6xl mb-24">
        <InternalLinks category="service" currentSlug="ecommerce-for-manufacturers" />
        
        <div className="mt-16 text-center bg-card border border-border-subtle rounded-[24px] p-12 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">Modernize Your Wholesale Supply Chain</h2>
          <p className="text-xl text-text-body mb-8 max-w-2xl mx-auto">
            Stop losing B2B contracts due to inefficient, manual purchasing processes. Partner with Warsi WebWorks to engineer an enterprise eCommerce portal that your distributors will love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 rounded-[8px] transition-all duration-300">
              Schedule an Architecture Review
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
