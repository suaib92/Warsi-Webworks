import Link from "next/link";
import { baseServices } from "@/data/services";
import { blogPosts } from "@/data/blog";

export type PageCategory = "home" | "service" | "blog" | "tool" | "industry";

interface InternalLinksProps {
  category: PageCategory;
  currentSlug?: string;
}

// Pre-defined set of high-value tools to link
const TOOL_LINKS = [
  { title: "Website Cost Calculator", url: "/tools/website-cost-calculator", anchor: "Calculate Website Cost" },
  { title: "Business Name Generator", url: "/tools/business-name-generator", anchor: "AI Business Name Generator" },
  { title: "QR Code Generator", url: "/tools/qr-code-generator", anchor: "Free QR Code Generator" },
  { title: "Invoice Generator", url: "/tools/invoice-generator", anchor: "Free Invoice Generator" },
];

export default function InternalLinks({ category, currentSlug }: InternalLinksProps) {
  // Logic to gather links based on category
  const links: { title: string; url: string; anchor: string }[] = [];

  // Always link to Home and Contact
  if (category !== "home") links.push({ title: "Home", url: "/", anchor: "Warsi WebWorks Homepage" });
  links.push({ title: "Contact Us", url: "/#contact", anchor: "Contact Warsi WebWorks" });
  if (category !== "home") links.push({ title: "About Us", url: "/about", anchor: "About Our Agency" });

  // Gather Services
  const servicesList = Object.entries(baseServices).map(([slug, s]) => ({
    title: s.title,
    url: `/services/${slug}-moradabad`,
    anchor: `${s.title} Services`
  }));

  // Gather Blogs
  const blogsList = blogPosts.map(p => ({
    title: p.title,
    url: `/blog/${p.slug}`,
    anchor: `Read: ${p.title}`
  }));

  // Filter out current slug from lists to avoid self-linking
  const filteredServices = servicesList.filter(s => !s.url.includes(currentSlug || ""));
  const filteredBlogs = blogsList.filter(b => !b.url.includes(currentSlug || ""));

  if (category === "home") {
    links.push(...filteredServices.slice(0, 4));
    links.push(...filteredBlogs.slice(0, 3));
    links.push(...TOOL_LINKS.slice(0, 2));
  } else if (category === "service") {
    links.push(...filteredServices.slice(0, 2)); // 2 related services
    links.push(...filteredBlogs.slice(0, 3)); // 3 related blogs
    links.push(...TOOL_LINKS.slice(0, 2));
  } else if (category === "blog") {
    links.push(...filteredBlogs.slice(0, 3)); // 3 related blogs
    links.push(...filteredServices.slice(0, 2)); // 2 services
    links.push(...TOOL_LINKS.slice(0, 2));
  } else if (category === "tool") {
    links.push(...TOOL_LINKS.filter(t => !t.url.includes(currentSlug || "")).slice(0, 3));
    links.push(...filteredServices.slice(0, 2));
    links.push(...filteredBlogs.slice(0, 2));
  } else if (category === "industry") {
    links.push(...filteredServices.slice(0, 3));
    links.push(...filteredBlogs.slice(0, 3));
  }

  // Ensure we don't render an empty section
  if (links.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-border-section">
      <h3 className="text-2xl font-bold text-text-primary mb-6 tracking-tight">Related Resources & Services</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            className="flex items-center p-4 bg-card border border-border-subtle rounded-[8px] hover:border-accent hover:bg-accent/5 transition-all group"
            title={link.title}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent mr-3 group-hover:scale-150 transition-transform" />
            <span className="text-sm font-semibold text-text-body group-hover:text-accent-light transition-colors line-clamp-2">
              {link.anchor}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
