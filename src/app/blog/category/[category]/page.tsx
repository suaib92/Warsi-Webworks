import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";

export async function generateStaticParams() {
  const categories = Array.from(new Set(blogPosts.map(post => post.category.toLowerCase())));
  return categories.map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category).toLowerCase();
  
  // Basic capitalization
  const categoryName = decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1);
  
  return {
    title: `${categoryName} Insights & Strategy | Warsi WebWorks`,
    description: `Read our latest expert articles on ${categoryName} strategies, techniques, and industry news for growing your business.`,
    alternates: {
      canonical: `https://warsiwebworks.com/blog/category/${decodedCategory}`,
    },
  };
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category).toLowerCase();
  
  // Filter posts
  const filteredPosts = blogPosts.filter(post => post.category.toLowerCase() === decodedCategory);
  
  if (filteredPosts.length === 0) {
    notFound();
  }

  const categoryName = decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${categoryName} Blog Archive - Warsi WebWorks`,
    "description": `Expert insights and strategies related to ${categoryName}.`,
    "url": `https://warsiwebworks.com/blog/category/${decodedCategory}`,
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
          <p className="text-text-muted font-semibold tracking-[0.08em] uppercase text-[11px] mb-4">Topical Silo</p>
          <h1 className="text-5xl md:text-7xl font-bold text-text-primary tracking-tighter mb-6 leading-tight">
            {categoryName} Insights.
          </h1>
          <p className="text-xl text-text-body leading-relaxed">
            Deep-dive strategy and implementation guides on {categoryName} to accelerate your digital growth.
          </p>
        </div>

        {/* Category Silos */}
        <div className="flex flex-wrap gap-3 mb-12 border-b border-border-subtle pb-6">
          <Link
            href="/blog"
            className="px-5 py-2 rounded-full text-sm font-bold bg-card border border-border-subtle text-text-primary hover:bg-accent/10 hover:border-accent/30 hover:text-accent transition-colors"
          >
            All Insights
          </Link>
          {['Engineering', 'Business', 'Marketing'].map((cat) => {
            const isActive = cat.toLowerCase() === decodedCategory;
            return (
              <Link
                key={cat}
                href={`/blog/category/${cat.toLowerCase()}`}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${
                  isActive 
                    ? "bg-accent text-white" 
                    : "bg-card border border-border-subtle text-text-primary hover:bg-accent/10 hover:border-accent/30 hover:text-accent"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
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
