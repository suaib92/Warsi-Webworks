import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Insights | Warsi WebWorks",
  description: "Read the latest insights on website development, ecommerce, React, Next.js, and SEO strategies for businesses in Moradabad and worldwide.",
  alternates: {
    canonical: "https://warsiwebworks.com/blog",
  },
};

import { blogPosts as posts } from "@/data/blog";

export default async function BlogHub(
  props: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }
) {
  const searchParams = await props.searchParams;
  const page = typeof searchParams?.page === 'string' ? parseInt(searchParams.page) : 1;
  const postsPerPage = 6;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (page - 1) * postsPerPage;
  const displayedPosts = posts.slice(startIndex, startIndex + postsPerPage);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Warsi WebWorks Blog",
    "description": "Insights on Web Development, SEO, and Digital Strategy.",
    "url": "https://warsiwebworks.com/blog",
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
        <div className="max-w-3xl mb-12">
          <p className="text-text-muted font-semibold tracking-[0.08em] uppercase text-[11px] mb-4">Insights & Strategy</p>
          <h1 className="text-5xl md:text-7xl font-bold text-text-primary tracking-tighter mb-6 leading-tight">
            Our latest thinking on digital engineering.
          </h1>
          <p className="text-xl text-text-body leading-relaxed">
            Expert articles on Next.js, React, SEO, and growing your business through high-performance web applications.
          </p>
        </div>

        {/* Category Silos */}
        <div className="flex flex-wrap gap-3 mb-12 border-b border-border-subtle pb-6">
          <Link
            href="/blog"
            className="px-5 py-2 rounded-full text-sm font-bold bg-accent text-white transition-colors"
          >
            All Insights
          </Link>
          <Link
            href="/blog/category/engineering"
            className="px-5 py-2 rounded-full text-sm font-bold bg-card border border-border-subtle text-text-primary hover:bg-accent/10 hover:border-accent/30 hover:text-accent transition-colors"
          >
            Engineering
          </Link>
          <Link
            href="/blog/category/business"
            className="px-5 py-2 rounded-full text-sm font-bold bg-card border border-border-subtle text-text-primary hover:bg-accent/10 hover:border-accent/30 hover:text-accent transition-colors"
          >
            Business
          </Link>
          <Link
            href="/blog/category/marketing"
            className="px-5 py-2 rounded-full text-sm font-bold bg-card border border-border-subtle text-text-primary hover:bg-accent/10 hover:border-accent/30 hover:text-accent transition-colors"
          >
            Marketing
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map((post) => (
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16">
            {page > 1 ? (
              <Link 
                href={`/blog?page=${page - 1}`}
                className="px-6 py-3 rounded-[12px] bg-card border border-border-subtle text-text-primary font-bold hover:bg-card-hover transition-colors"
              >
                Previous
              </Link>
            ) : (
              <div className="px-6 py-3 rounded-[12px] bg-card/50 border border-border-subtle/50 text-text-muted font-bold cursor-not-allowed">
                Previous
              </div>
            )}
            
            <span className="text-text-body font-medium">
              Page {page} of {totalPages}
            </span>
            
            {page < totalPages ? (
              <Link 
                href={`/blog?page=${page + 1}`}
                className="px-6 py-3 rounded-[12px] bg-accent text-white font-bold hover:bg-accent-light transition-colors"
              >
                Next
              </Link>
            ) : (
              <div className="px-6 py-3 rounded-[12px] bg-accent/50 text-white/50 font-bold cursor-not-allowed">
                Next
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
