import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Warsi WebWorks | Enterprise Digital Engineering & Consulting",
  description: "Warsi WebWorks is a premium digital engineering studio. We build enterprise React applications, Next.js architectures, and programmatic SEO solutions for ambitious businesses.",
  alternates: {
    canonical: "https://warsiwebworks.com/about",
  },
};

export default function About() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Warsi WebWorks | Enterprise Digital Engineering & Consulting",
      "description": "Warsi WebWorks is a premium digital engineering studio specializing in high-performance web architecture, React development, and technical SEO.",
      "url": "https://warsiwebworks.com/about"
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Warsi WebWorks",
      "url": "https://warsiwebworks.com",
      "logo": "https://warsiwebworks.com/og-image.png",
      "description": "A premier digital engineering studio delivering enterprise-grade web development, headless commerce, and data-driven technical SEO strategies.",
      "sameAs": [
        "https://github.com/suaib92",
        "https://linkedin.com/company/warsiwebworks"
      ],
      "founder": {
        "@type": "Person",
        "name": "Mohd Suaib Warsi",
        "jobTitle": "Founder & Principal Software Engineer",
        "description": "Senior Software Engineer specializing in React, Next.js, Node.js, and cloud architecture. Expert in performance optimization and programmatic SEO.",
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
      
      {/* Hero Section */}
      <div className="container mx-auto px-6 md:px-12 max-w-5xl mb-24">
        <p className="text-text-muted font-semibold tracking-[0.08em] uppercase text-[11px] mb-4">The Studio</p>
        <h1 className="text-5xl md:text-7xl font-bold text-text-primary tracking-tighter mb-8 leading-tight">
          Engineering Digital Dominance.
        </h1>
        <p className="text-2xl text-accent font-semibold leading-relaxed mb-6">
          We are not a traditional marketing agency. We are a specialized digital engineering studio.
        </p>
        <div className="prose prose-invert prose-lg text-text-body max-w-3xl">
          <p>
            Warsi WebWorks was founded on a singular premise: the majority of businesses are severely constrained by their digital infrastructure. They operate on slow, fragile templates built by generalist agencies that prioritize aesthetics over architecture. In a marketplace where milliseconds of load time dictate conversion rates and search algorithms penalize technical debt, a beautiful but poorly engineered website is a catastrophic business liability.
          </p>
          <p>
            We build platforms that eliminate that liability. Headquartered in Moradabad and serving ambitious B2B and B2C enterprises globally, we engineer high-performance web applications, headless commerce systems, and programmatic SEO structures that systematically outperform the competition.
          </p>
        </div>
      </div>

      {/* The Methodology Section */}
      <div className="bg-surface/30 border-y border-border-subtle py-24 mb-24">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tighter mb-12">Our Consulting & Engineering Philosophy</h2>
          
          <div className="space-y-16">
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">1. Code as a Business Asset</h3>
              <p className="text-text-body text-lg leading-relaxed mb-4">
                We believe that software should be an appreciating asset, not a depreciating expense. When we write code, we are building proprietary intellectual property for your company. We strictly utilize modern, enterprise-grade stacks—Next.js, React, Node.js, and TypeScript. By enforcing rigorous typing, building atomic design systems, and writing modular components, we ensure your codebase can scale infinitely without requiring a costly "tear down and rebuild" two years later.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">2. Performance is Revenue</h3>
              <p className="text-text-body text-lg leading-relaxed mb-4">
                Aesthetically pleasing design is expected; blistering performance is a competitive advantage. We engineer our platforms to achieve near-perfect Google Core Web Vitals scores. We implement aggressive image optimization, code-splitting, and global Edge Network deployment (via Vercel or AWS) to guarantee sub-second load times. This speed directly reduces Customer Acquisition Cost (CAC) by drastically lowering bounce rates and immediately increasing search engine visibility.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">3. Data-Driven Search Dominance</h3>
              <p className="text-text-body text-lg leading-relaxed mb-4">
                We do not "guess" what will rank on Google. Search algorithms are mathematical constructs, and we treat SEO as a data science discipline. By implementing sophisticated JSON-LD Schema architectures and executing programmatic SEO strategies, we feed search engines exactly the semantic entity data they require to categorize your business as the ultimate topical authority in your sector.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">4. Absolute Transparency</h3>
              <p className="text-text-body text-lg leading-relaxed mb-4">
                The technology industry is infamous for obscuring simple truths behind complex jargon to justify inflated retainers. We operate differently. We operate as your fractional CTO and technical partners. We clearly explain the technical trade-offs of every architectural decision, provide granular project timelines, and deliver uncompromising honesty regarding what technology your business actually needs to achieve its revenue goals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Founder Story - EEAT Focus */}
      <div className="container mx-auto px-6 md:px-12 max-w-5xl mb-24">
        <h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tighter mb-16">Technical Leadership</h2>
        
        <div className="flex flex-col lg:flex-row gap-12 items-start bg-card border border-border-subtle rounded-2xl p-8 md:p-12">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 overflow-hidden relative shadow-lg shadow-accent/10 border border-border-subtle">
            <Image src="/images/suaib.webp" alt="Mohd Suaib Warsi - Principal Software Engineer" fill className="object-cover object-top" />
          </div>
          
          <div className="flex-1">
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-text-primary mb-2">Mohd Suaib Warsi</h3>
              <p className="text-accent text-xl font-semibold">Founder & Principal Software Engineer</p>
            </div>
            
            <div className="prose prose-invert text-text-body text-lg max-w-none">
              <p>
                Suaib founded Warsi WebWorks to bridge a critical gap he observed in the digital services market: businesses were being forced to choose between highly creative design agencies that couldn't write scalable code, and rigid software firms that didn't understand conversion psychology or SEO.
              </p>
              <p>
                As a Principal Software Engineer with deep expertise in the React ecosystem, Node.js backend architecture, and massive-scale database management, Suaib leads the technical strategy for every project the studio undertakes. He insists on a "hands-on keyboard" approach to technical leadership, personally overseeing the system architecture, code reviews, and database schemas for our enterprise clients.
              </p>
              <p>
                Beyond writing code, Suaib acts as a strategic technical consultant for founders and executive teams. He has a proven track record of diagnosing deep technical debt in legacy systems and orchestrating complex migrations to modern Headless architectures with zero downtime. His overarching goal is to transform your digital presence from an operational bottleneck into your most reliable revenue-generating asset.
              </p>
              <div className="mt-8 flex gap-4">
                <a href="https://github.com/suaib92" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-text-primary hover:text-accent transition-colors bg-surface px-4 py-2 rounded-lg border border-border-subtle">
                  View GitHub Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expertise Matrix */}
      <div className="container mx-auto px-6 md:px-12 max-w-5xl mb-24">
        <h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tighter mb-12 text-center">Core Technical Competencies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Frontend Engineering", desc: "React, Next.js, TypeScript, TailwindCSS, Framer Motion, Redux Toolkit, Zustand." },
            { title: "Backend & APIs", desc: "Node.js, Express, RESTful APIs, GraphQL, tRPC, WebSockets." },
            { title: "Database Architecture", desc: "MongoDB, PostgreSQL, Prisma ORM, Redis Caching, Firebase." },
            { title: "Cloud & DevOps", desc: "Vercel Edge Networks, AWS (S3, EC2), Docker, CI/CD Pipelines, GitHub Actions." },
            { title: "Headless Commerce", desc: "Shopify Plus APIs, BigCommerce, Stripe Integration, custom B2B portals." },
            { title: "Technical SEO", desc: "JSON-LD Schema, Core Web Vitals optimization, Programmatic SEO generation." },
          ].map((skill, i) => (
            <div key={i} className="bg-surface border border-border-subtle rounded-xl p-6">
              <h3 className="text-xl font-bold text-text-primary mb-3">{skill.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{skill.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="text-center bg-card border border-border-subtle rounded-[24px] p-12 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">Require Enterprise-Grade Engineering?</h2>
          <p className="text-text-body text-lg mb-8 max-w-2xl mx-auto">
            If your current digital infrastructure is holding your business back, we need to talk. Schedule a deep-dive technical consultation with our engineering team today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 rounded-[8px] transition-all duration-300">
              Schedule Consultation
            </Link>
            <Link href="/portfolio" className="inline-flex items-center justify-center gap-2 bg-transparent border border-border-subtle hover:border-accent text-text-primary font-bold px-8 py-4 rounded-[8px] transition-all duration-300">
              Review Our Case Studies
            </Link>
          </div>
        </div>
      </div>

    </main>
  );
}
