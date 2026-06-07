import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://warsiwebworks.com${item.url === '/' ? '' : item.url}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center text-sm text-text-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <div key={item.url} className="flex items-center">
              {isLast ? (
                <span className="text-text-primary font-semibold truncate max-w-[200px] md:max-w-none" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link 
                    href={item.url} 
                    className="hover:text-accent transition-colors truncate max-w-[150px] md:max-w-none"
                  >
                    {item.name}
                  </Link>
                  <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
                </>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
