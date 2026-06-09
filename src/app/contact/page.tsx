import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import SimpleContactForm from "@/components/forms/SimpleContactForm";

export const metadata: Metadata = {
  title: "Contact Warsi WebWorks | Schedule a Technical Consultation",
  description: "Contact Warsi WebWorks to discuss enterprise web development, headless commerce architecture, or technical SEO. Schedule a consultation with our engineering team.",
  alternates: {
    canonical: "https://warsiwebworks.com/contact",
  },
};

export default function ContactPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Warsi WebWorks | Schedule a Technical Consultation",
      "description": "Contact our engineering team to discuss enterprise web development, headless commerce architecture, or technical SEO.",
      "url": "https://warsiwebworks.com/contact"
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Warsi WebWorks",
      "image": "https://warsiwebworks.com/og-image.png",
      "@id": "https://warsiwebworks.com",
      "url": "https://warsiwebworks.com",
      "telephone": "+917078719621",
      "email": "hello@warsiwebworks.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Moradabad",
        "addressLocality": "Moradabad",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "244001",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "28.8378",
        "longitude": "78.7826"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What happens after I submit the contact form?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Within 24 hours, our Principal Engineer will review your requirements and reach out to schedule a 30-minute technical discovery call. We do not use aggressive sales representatives; you will speak directly with an expert who can architect your solution."
          }
        },
        {
          "@type": "Question",
          "name": "Do you sign Non-Disclosure Agreements (NDAs)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We regularly work with pre-seed startups, proprietary SaaS platforms, and enterprise manufacturers. We are happy to sign a mutual NDA before discussing any sensitive technical or business details."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer white-label services for other agencies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we act as the silent technical backbone for several high-end design and marketing agencies globally, executing complex React, Next.js, and API integrations under strict white-label agreements."
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
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        
        {/* Header */}
        <div className="max-w-4xl mb-16">
          <p className="text-text-muted font-semibold tracking-[0.08em] uppercase text-[11px] mb-4">Technical Consultation</p>
          <h1 className="text-5xl md:text-7xl font-bold text-text-primary tracking-tighter mb-6 leading-tight">
            Initiate Your Digital Transformation.
          </h1>
          <p className="text-xl text-text-body leading-relaxed max-w-3xl">
            Whether you need to rescue a failing legacy application, build a highly scalable B2B ecommerce portal, or execute a programmatic SEO campaign, our engineering team is ready to analyze your architecture. 
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          
          {/* Left: Contact Info & Form */}
          <div>
            <h2 className="text-3xl font-bold text-text-primary mb-8">Discuss Your Architecture</h2>
            
            <div className="flex flex-col gap-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary mb-1">Corporate Headquarters</h3>
                  <p className="text-text-body leading-relaxed">
                    Moradabad, Uttar Pradesh<br />
                    India 244001<br />
                    <em>(Serving clients globally via secure virtual infrastructure)</em>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary mb-1">Direct Engineering Line</h3>
                  <a href="tel:+917078719621" className="text-text-body hover:text-accent transition-colors block mb-1">
                    +91 7078719621
                  </a>
                  <p className="text-sm text-text-muted italic">Available Mon-Sat, 09:00 - 18:00 IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary mb-1">Project Inquiries & RFPs</h3>
                  <a href="mailto:hello@warsiwebworks.com" className="text-text-body hover:text-accent transition-colors">
                    hello@warsiwebworks.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-surface/50 p-6 rounded-xl border border-border-subtle mb-10">
              <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-accent" />
                Strict Confidentiality
              </h3>
              <p className="text-sm text-text-body leading-relaxed">
                We handle proprietary business logic and sensitive intellectual property daily. All communications submitted through this platform are encrypted and strictly confidential. We are fully prepared to execute mutual Non-Disclosure Agreements (NDAs) prior to discussing specific technical architectures or business strategies.
              </p>
            </div>

            {/* Simple Contact Form */}
            <SimpleContactForm />
          </div>

          {/* Right: Map & Process */}
          <div className="flex flex-col gap-12">
            
            {/* Map */}
            <div className="h-[400px] rounded-[12px] overflow-hidden border border-border-subtle shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112174.63323108232!2d78.68067446756823!3d28.84097326983111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390afb0f8a4c7b2d%3A0x8a8c5c5e5f5e5f5e!2sMoradabad%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.5)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Warsi WebWorks Operations Center - Moradabad"
                aria-label="Interactive map showing Warsi WebWorks office location in Moradabad"
              />
            </div>

            {/* What Happens Next Process */}
            <div className="bg-card border border-border-subtle p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-text-primary mb-6">What Happens Next?</h3>
              <p className="text-text-body mb-8 leading-relaxed">
                We respect your time. We do not employ aggressive sales representatives. When you contact us, you will engage directly with a senior technical consultant capable of actually solving your problem.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-text-primary text-lg mb-1">Technical Review (24 Hours)</h4>
                    <p className="text-text-body text-sm leading-relaxed">Our lead engineers review your submitted requirements to assess initial feasibility and identify potential architectural bottlenecks.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-text-primary text-lg mb-1">Discovery Call</h4>
                    <p className="text-text-body text-sm leading-relaxed">We schedule a 30-minute virtual consultation to deep-dive into your operational workflows, current technical debt, and revenue objectives.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-text-primary text-lg mb-1">Architecture Proposal</h4>
                    <p className="text-text-body text-sm leading-relaxed">We present a comprehensive, fixed-price proposal outlining the exact technology stack, timeline, UX strategy, and expected ROI for your project.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Consulting FAQ */}
        <div className="max-w-4xl mx-auto mb-24 pt-16 border-t border-border-subtle">
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-card border border-border-subtle p-6 rounded-lg">
              <h3 className="text-xl font-bold text-text-primary mb-3">Do you take on partial projects or legacy code rescues?</h3>
              <p className="text-text-body leading-relaxed">Yes. A significant portion of our enterprise consulting involves rescuing projects that failed under previous agencies. We will conduct a thorough code audit to determine whether the existing architecture can be refactored or if a complete headless rebuild is required to meet your performance standards.</p>
            </div>
            
            <div className="bg-card border border-border-subtle p-6 rounded-lg">
              <h3 className="text-xl font-bold text-text-primary mb-3">What size of clients do you typically work with?</h3>
              <p className="text-text-body leading-relaxed">We architect solutions for businesses that view technology as a revenue driver rather than an expense. This ranges from funded SaaS startups requiring rapid MVP development, to massive B2B manufacturers needing to digitize 10,000+ SKU catalogs, to healthcare clinics demanding secure, WCAG-compliant patient portals.</p>
            </div>

            <div className="bg-card border border-border-subtle p-6 rounded-lg">
              <h3 className="text-xl font-bold text-text-primary mb-3">Do you offer white-label engineering for other agencies?</h3>
              <p className="text-text-body leading-relaxed">Absolutely. We act as the silent technical backbone for several high-end design, branding, and marketing agencies in the US and UK. We handle the complex Next.js engineering, API integrations, and technical SEO execution under strict white-label Non-Disclosure Agreements, allowing your agency to scale without increasing internal headcount.</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
