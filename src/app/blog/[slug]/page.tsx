import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug } from "@/data/blog";

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
      canonical: `https://warsi-webworks.vercel.app/blog/${slug}`
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": new Date(post.date).toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "Warsi WebWorks"
    },
    "url": `https://warsi-webworks.vercel.app/blog/${slug}`
  };

  return (
    <main className="pt-32 pb-20 bg-base min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="container mx-auto px-6 md:px-12 max-w-4xl">
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

          <div className="flex items-center gap-4 py-6 border-y border-border-subtle/50 mb-10">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold text-xl">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-text-primary">{post.author.name}</p>
              <p className="text-sm text-text-muted">{post.author.role}</p>
            </div>
          </div>
        </div>

        {/* Markdown-style content area */}
        <div 
          className="prose prose-lg prose-invert max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-text-primary
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-text-body prose-p:leading-relaxed prose-p:mb-6
            prose-ul:text-text-body prose-ul:mb-6 prose-li:mb-2
            prose-strong:text-text-primary
            prose-a:text-accent hover:prose-a:text-accent-light"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <div className="mt-16 pt-8 border-t border-border-subtle/50">
          <h3 className="text-2xl font-bold text-text-primary mb-4">Share this insight</h3>
          <div className="flex gap-4">
            <a 
              href={`https://twitter.com/intent/tweet?url=https://warsi-webworks.vercel.app/blog/${slug}&text=${encodeURIComponent(post.title)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors"
            >
              Twitter (X)
            </a>
            <a 
              href={`https://www.linkedin.com/shareArticle?mini=true&url=https://warsi-webworks.vercel.app/blog/${slug}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
