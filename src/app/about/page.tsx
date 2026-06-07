import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Warsi WebWorks | Premium Tech Agency in Moradabad",
  description: "Learn about Warsi WebWorks, Moradabad's leading premium web development and SEO agency. Meet our expert React and Next.js developers.",
  alternates: {
    canonical: "https://warsiwebworks.com/about",
  },
};

export default function About() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Warsi WebWorks | Premium Tech Agency in Moradabad",
      "description": "Learn about Warsi WebWorks, Moradabad's leading premium web development and SEO agency.",
      "url": "https://warsiwebworks.com/about"
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Warsi WebWorks",
      "url": "https://warsiwebworks.com",
      "logo": "https://warsiwebworks.com/og-image.png",
      "sameAs": [
        "https://github.com/suaib92",
        "https://linkedin.com/company/warsiwebworks"
      ],
      "founder": {
        "@type": "Person",
        "name": "Suaib Warsi",
        "jobTitle": "Founder & Lead Developer",
        "sameAs": [
          "https://github.com/suaib92"
        ]
      }
    }
  ];

  return (
    <main className="pt-32 pb-20 bg-base min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        
        {/* Hero */}
        <div className="max-w-3xl mb-24">
          <p className="text-text-muted font-semibold tracking-[0.08em] uppercase text-[11px] mb-4">About Warsi WebWorks</p>
          <h1 className="text-5xl md:text-7xl font-bold text-text-primary tracking-tighter mb-8 leading-tight">
            Driving Digital Innovation from Moradabad.
          </h1>
          <p className="text-xl text-text-body leading-relaxed">
            Warsi WebWorks is a premium digital engineering studio founded by Suaib Warsi. We are recognized as the Best IT Company in Moradabad, a team of expert React developers, designers, and SEO strategists who believe great code builds great businesses.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tighter mb-8">Our Mission & Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <p className="text-text-body text-lg leading-relaxed">
              Founded with a mission to bring enterprise-grade digital solutions to businesses of all sizes, 
              Warsi WebWorks started in Moradabad and quickly grew into a full-studio agency. 
              Our vision is to empower local UP businesses and global enterprises alike with platforms that dominate organic search and convert visitors.
            </p>
            <p className="text-text-body text-lg leading-relaxed">
              Located in Moradabad, Uttar Pradesh, we serve clients across India and internationally. 
              Our approach combines modern technology (React, Next.js, Node.js, MongoDB) with a deep 
              understanding of technical SEO strategy — ensuring every project delivers measurable ROI.
            </p>
          </div>
        </div>

        {/* Founder */}
        <div className="bg-card border border-border-subtle rounded-[12px] p-8 md:p-12 mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tighter mb-12">Meet the Core Development Team</h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
              <span className="text-4xl md:text-5xl font-bold text-accent">SW</span>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">Suaib Warsi</h3>
              <p className="text-accent font-semibold mb-4">Founder & Lead Developer</p>
              <p className="text-text-body text-lg leading-relaxed">
                With years of experience in full-stack development, Suaib founded Warsi WebWorks to bridge 
                the gap between ambitious business visions and technical reality. He specializes in React, 
                Next.js, Node.js, and modern cloud architecture — delivering platforms that load fast, 
                rank high, and convert visitors.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tighter mb-12 text-center">Our Commitment to Premium Quality</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Quality Over Quantity", desc: "We take on fewer projects to give each one the attention it deserves. Every detail matters." },
              { title: "Performance First", desc: "Fast websites rank higher and convert better. We optimize every byte for real-world performance." },
              { title: "Transparent Communication", desc: "No jargon. No hidden fees. You'll know exactly what's happening at every stage." },
              { title: "Long-term Partnership", desc: "We don't disappear after launch. We provide ongoing support, maintenance, and growth consulting." },
              { title: "Modern Technology", desc: "React, Next.js, Node.js, MongoDB — the same stack used by Netflix, Uber, and Airbnb." },
              { title: "Local Roots, Global Reach", desc: "Based in Moradabad, serving clients worldwide. We combine local understanding with global standards." },
            ].map((v, i) => (
              <div key={i} className="bg-card border border-border-subtle rounded-[12px] p-6 hover:bg-card-hover transition-colors">
                <h3 className="text-xl font-bold text-text-primary mb-3">{v.title}</h3>
                <p className="text-text-body leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-surface border border-border-subtle rounded-[12px] p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Let's build something great together.</h2>
          <p className="text-text-body text-lg mb-8 max-w-xl mx-auto">
            Ready to work with the Best IT Company in Moradabad? Let's talk about how we can help you dominate your market.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 rounded-[8px] transition-all duration-300">
            Start Your Project
          </Link>
        </div>

      </div>
    </main>
  );
}
