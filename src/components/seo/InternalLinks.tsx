import Link from "next/link";
import { ArrowRight, Calculator, FileText, Lightbulb, Mail, PenTool, QrCode, Sparkles } from "lucide-react";
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

const getLinkMeta = (link: { title: string; url: string; anchor: string }) => {
  if (link.url.includes("contact")) {
    return {
      label: "Project inquiry",
      description: "Talk through goals, scope, timeline, and the fastest path to launch.",
      icon: Mail,
    };
  }

  if (link.url.includes("website-cost-calculator")) {
    return {
      label: "Planning tool",
      description: "Estimate your website budget before you start comparing quotes.",
      icon: Calculator,
    };
  }

  if (link.url.includes("business-name-generator")) {
    return {
      label: "AI tool",
      description: "Generate brandable name ideas for your next business or product.",
      icon: Sparkles,
    };
  }

  if (link.url.includes("qr-code-generator")) {
    return {
      label: "Free tool",
      description: "Create QR codes for menus, offers, campaigns, and landing pages.",
      icon: QrCode,
    };
  }

  if (link.url.includes("invoice-generator")) {
    return {
      label: "Free tool",
      description: "Create clean invoices for clients, projects, and local services.",
      icon: FileText,
    };
  }

  if (link.url.includes("/blog/")) {
    return {
      label: "Guide",
      description: "Learn the strategy behind better websites, SEO, and digital growth.",
      icon: PenTool,
    };
  }

  return {
    label: "Service",
    description: "Explore a focused service page built around business outcomes.",
    icon: Lightbulb,
  };
};

const excludesCurrentSlug = (url: string, currentSlug?: string) => {
  if (!currentSlug) return true;
  return !url.includes(currentSlug);
};

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
  const filteredServices = servicesList.filter(s => excludesCurrentSlug(s.url, currentSlug));
  const filteredBlogs = blogsList.filter(b => excludesCurrentSlug(b.url, currentSlug));

  if (category === "home") {
    links.push(...TOOL_LINKS.slice(0, 2));
    links.push(...filteredServices.slice(0, 4));
    links.push(...filteredBlogs.slice(0, 3));
  } else if (category === "service") {
    links.push(...filteredServices.slice(0, 2)); // 2 related services
    links.push(...filteredBlogs.slice(0, 3)); // 3 related blogs
    links.push(...TOOL_LINKS.slice(0, 2));
  } else if (category === "blog") {
    links.push(...filteredBlogs.slice(0, 3)); // 3 related blogs
    links.push(...filteredServices.slice(0, 2)); // 2 services
    links.push(...TOOL_LINKS.slice(0, 2));
  } else if (category === "tool") {
    links.push(...TOOL_LINKS.filter(t => excludesCurrentSlug(t.url, currentSlug)).slice(0, 3));
    links.push(...filteredServices.slice(0, 2));
    links.push(...filteredBlogs.slice(0, 2));
  } else if (category === "industry") {
    links.push(...filteredServices.slice(0, 3));
    links.push(...filteredBlogs.slice(0, 3));
  }

  // Ensure we don't render an empty section
  if (links.length === 0) return null;

  const featuredLinks = links.slice(0, category === "home" ? 3 : 2);
  const secondaryLinks = links.slice(featuredLinks.length);

  return (
    <div className="my-16 overflow-hidden rounded-[8px] border border-border-section bg-surface">
      <div className="grid gap-8 border-b border-border-section bg-base/55 p-6 md:grid-cols-[0.95fr_1.05fr] md:p-8 lg:p-10">
        <div>
          <p className="mb-3 text-xs font-bold uppercase text-accent">Next steps</p>
          <h3 className="text-3xl font-black leading-[1.08] text-text-primary md:text-4xl">
            Related resources & services
          </h3>
        </div>
        <p className="max-w-2xl text-base leading-[1.7] text-text-body md:justify-self-end">
          Move from browsing to action: estimate your budget, generate brand ideas,
          explore services, or start a direct conversation with Warsi WebWorks.
        </p>
      </div>

      <div className="grid gap-px bg-border-section md:grid-cols-3">
        {featuredLinks.map((link) => {
          const meta = getLinkMeta(link);
          const Icon = meta.icon;

          return (
            <Link
              key={link.url}
              href={link.url}
              className="group flex min-h-[220px] flex-col justify-between bg-card p-6 transition-colors duration-300 hover:bg-card-hover md:p-7"
              title={link.title}
            >
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <span className="rounded-[6px] border border-border-subtle bg-base px-3 py-1 text-xs font-bold uppercase text-text-muted">
                    {meta.label}
                  </span>
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h4 className="text-xl font-black leading-tight text-text-primary transition-colors group-hover:text-accent">
                  {link.anchor}
                </h4>
                <p className="mt-4 text-sm leading-[1.7] text-text-body">
                  {meta.description}
                </p>
              </div>

              <span className="mt-7 inline-flex items-center text-sm font-bold text-text-primary transition-colors group-hover:text-accent">
                Open resource
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </div>

      {secondaryLinks.length > 0 && (
        <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
          {secondaryLinks.map((link) => {
            const meta = getLinkMeta(link);
            const Icon = meta.icon;

            return (
              <Link
                key={link.url}
                href={link.url}
                className="group flex items-center gap-4 rounded-[8px] border border-border-subtle bg-base px-4 py-4 transition-all duration-300 hover:border-accent hover:bg-card"
                title={link.title}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border border-border-subtle bg-card text-accent">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-bold uppercase text-text-muted">{meta.label}</span>
                  <span className="mt-0.5 block text-sm font-bold leading-snug text-text-body transition-colors group-hover:text-accent">
                    {link.anchor}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
