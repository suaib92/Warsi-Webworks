import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/data/blog";
import { applyInternalLinks } from "@/utils/internalLinker";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | Warsi WebWorks`,
    description: post.excerpt,
    alternates: {
      canonical: `https://warsiwebworks.com/blog/${slug}`
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": new Date(post.date).toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "url": "https://www.linkedin.com/in/mohd-suaib-warsi/",
      "jobTitle": post.author.role
    },
    "publisher": {
      "@type": "Organization",
      "name": "Warsi WebWorks"
    },
    "url": `https://warsiwebworks.com/blog/${slug}`
  };

  const faqJsonLd = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <main className="pt-32 pb-20 bg-base min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <article className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Content Column */}
          <div className="lg:col-span-8">
            <Breadcrumbs items={[
              { name: "Home", url: "/" },
              { name: "Blog", url: "/blog" },
              { name: post.category, url: `/blog/category/${post.category.toLowerCase()}` },
              { name: post.title, url: `/blog/${post.slug}` }
            ]} />

            <div className="mb-10">
              <Link href="/blog" className="text-text-muted hover:text-accent text-sm inline-block mb-8 transition-colors">
                &larr; Back to all insights
              </Link>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-text-muted text-sm">{post.date}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary tracking-tighter mb-8 leading-tight">
                {post.title}
              </h1>

              <div className="bg-surface/50 rounded-[12px] p-6 mb-12 border border-border-subtle">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xl">
                  WWW
                </div>
                <div>
                  <div className="font-bold text-text-primary">Warsi WebWorks Editorial Team</div>
                  <div className="text-sm text-text-muted">Senior Digital Strategists & Engineers</div>
                </div>
              </div>
              <p className="text-text-body text-sm leading-relaxed">
                Authored by the engineering and strategy team at Warsi WebWorks. We specialize in building high-performance digital architectures (React, Next.js, Headless Commerce) for businesses looking to scale globally.
              </p>
            </div>

            {/* Share Links */}
            <div className="flex items-center gap-4 py-8 border-t border-border-section mt-12">
            </div>

            <div 
              className="prose prose-lg prose-invert max-w-none 
                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-text-primary prose-headings:scroll-mt-24
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-text-body prose-p:leading-relaxed prose-p:mb-6
                prose-ul:text-text-body prose-ul:mb-6 prose-li:mb-2
                prose-strong:text-text-primary
                prose-a:text-accent hover:prose-a:text-accent-light"
              dangerouslySetInnerHTML={{ __html: applyInternalLinks(post.content) }}
            />

            {/* FAQs */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-16 pt-12 border-t border-border-subtle/50">
                <h2 className="text-3xl font-bold text-text-primary mb-8 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {post.faqs.map((faq, index) => (
                    <div key={index} className="bg-card border border-border-subtle p-6 rounded-[12px]">
                      <h3 className="text-xl font-bold text-text-primary mb-3">{faq.question}</h3>
                      <p className="text-text-body leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EEAT Author Credentials Block */}
            <div className="mt-16 pt-12 border-t border-border-subtle/50">
              <div className="bg-card border border-border-subtle p-8 rounded-[16px] flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="w-24 h-24 shrink-0 rounded-full bg-accent flex items-center justify-center text-white font-bold text-4xl shadow-lg shadow-accent/20 border-4 border-card overflow-hidden relative">
                  <Image src="/images/suaib.jpeg" alt={post.author.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">About {post.author.name}</h3>
                  <p className="text-accent font-semibold text-sm tracking-wider uppercase mb-4">{post.author.role}</p>
                  <p className="text-text-body leading-relaxed mb-4">
                    With over 2 years of experience engineering high-performance web applications, {post.author.name} specializes in advanced Next.js architectures, Headless Commerce, and Technical SEO. He has architected scalable digital solutions for D2C brands, B2B manufacturers, and healthcare enterprises globally.
                  </p>
                <p className="mt-3 text-text-body">
                  <a href="https://www.linkedin.com/in/mohd-suaib-warsi/" target="_blank" rel="noopener noreferrer" className="text-accent font-bold hover:text-accent-light transition-colors inline-flex items-center">
                    Connect on LinkedIn <span className="ml-2">→</span>
                  </a>
                </p>
                </div>
              </div>
            </div>
            
            <InternalLinks category="blog" currentSlug={post.slug} />
            
            <div className="mt-12 pt-8 border-t border-border-subtle/50">
              <h3 className="text-2xl font-bold text-text-primary mb-4">Share this insight</h3>
              <div className="flex gap-4">
                <a 
                  href={`https://twitter.com/intent/tweet?url=https://warsiwebworks.com/blog/${slug}&text=${encodeURIComponent(post.title)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-accent transition-colors"
                >
                  Twitter (X)
                </a>
                <a 
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=https://warsiwebworks.com/blog/${slug}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-accent transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          </div>

          {/* Sticky Sidebar Column */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-28 space-y-12">
              
              {/* Table of Contents */}
              {post.tableOfContents && post.tableOfContents.length > 0 && (
                <div className="bg-card border border-border-subtle p-6 rounded-[12px]">
                  <h3 className="text-lg font-bold text-text-primary mb-4">Table of Contents</h3>
                  <ul className="space-y-3">
                    {post.tableOfContents.map((item, index) => (
                      <li key={index} className={`${item.level === 3 ? 'ml-4' : ''}`}>
                        <a 
                          href={`#${item.id}`}
                          className="text-sm text-text-body hover:text-accent transition-colors line-clamp-2"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Posts */}
              {relatedPosts && relatedPosts.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-text-primary mb-6">Related Articles</h3>
                  <div className="space-y-6">
                    {relatedPosts.map((related) => (
                      <Link 
                        key={related.slug} 
                        href={`/blog/${related.slug}`}
                        className="group block"
                      >
                        <p className="text-xs text-accent font-bold uppercase tracking-wider mb-2">{related.category}</p>
                        <h4 className="text-base font-bold text-text-primary group-hover:text-accent transition-colors leading-snug line-clamp-2">
                          {related.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
