import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Insights | Warsi WebWorks",
  description: "Read the latest insights on website development, ecommerce, React, Next.js, and SEO strategies for businesses in Moradabad and worldwide.",
  alternates: {
    canonical: "https://warsi-webworks.vercel.app/blog",
  },
};

const posts = [
  {
    slug: "benefits-of-ecommerce-website-for-local-business-in-moradabad",
    title: "Why Local Businesses in Moradabad Need an Ecommerce Website in 2026",
    excerpt: "Discover how a custom Shopify or Next.js ecommerce platform can help your retail business scale beyond local foot traffic.",
    category: "Ecommerce",
    date: "May 29, 2026",
  },
  {
    slug: "website-development-cost-moradabad",
    title: "How Much Does a Custom Website Cost in Moradabad?",
    excerpt: "A complete breakdown of website development costs, from simple landing pages to complex MERN stack applications.",
    category: "Business",
    date: "May 15, 2026",
  },
  {
    slug: "nextjs-vs-react-for-seo",
    title: "Next.js vs React: Which is Better for SEO?",
    excerpt: "We analyze why Server-Side Rendering (SSR) in Next.js dominates Client-Side Rendering (CSR) when it comes to organic search rankings.",
    category: "Engineering",
    date: "April 22, 2026",
  }
];

export default function BlogHub() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Warsi WebWorks Blog",
    "description": "Insights on Web Development, SEO, and Digital Strategy.",
    "url": "https://warsi-webworks.vercel.app/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Warsi WebWorks"
    }
  };

  return (
    <main className="pt-32 pb-20 bg-base min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-text-muted font-semibold tracking-[0.08em] uppercase text-[11px] mb-4">Insights & Strategy</p>
          <h1 className="text-5xl md:text-7xl font-bold text-text-primary tracking-tighter mb-6 leading-tight">
            Our latest thinking on digital engineering.
          </h1>
          <p className="text-xl text-text-body leading-relaxed">
            Expert articles on Next.js, React, SEO, and growing your business through high-performance web applications.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-card border border-border-subtle rounded-[12px] p-6 hover:bg-card-hover hover:border-[#6c63ff44] transition-all duration-300 h-full"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] text-accent font-medium uppercase tracking-wider bg-accent/10 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-text-muted">{post.date}</span>
              </div>
              
              <h2 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-accent-light transition-colors line-clamp-3">
                {post.title}
              </h2>
              
              <p className="text-text-body leading-relaxed mb-8 flex-grow line-clamp-4">
                {post.excerpt}
              </p>
              
              <div className="flex items-center text-accent-light font-semibold mt-auto pt-4 border-t border-border-subtle/50">
                <span className="text-sm">Read Article</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
