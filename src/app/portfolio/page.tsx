import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portfolio | Warsi WebWorks",
  description: "Selected work from Warsi WebWorks. Engineering digital experiences that drive results.",
};

const projects = [
  {
    slug: "aura-commerce",
    title: "Aura Commerce",
    tag: "Ecommerce",
    desc: "A headless ecommerce architecture processing $1M+ in monthly volume with sub-second page loads.",
    tech: ["Next.js", "Shopify Plus", "Tailwind CSS", "Vercel"],
    metric: "$1M+",
    metricLabel: "Monthly Volume",
  },
  {
    slug: "fintech-core",
    title: "Fintech Core Platform",
    tag: "Web App",
    desc: "Enterprise dashboard for real-time market data visualization and algorithmic trading controls.",
    tech: ["React", "Node.js", "WebSockets", "D3.js"],
    metric: "99.99%",
    metricLabel: "Uptime",
  },
  {
    slug: "nexus-health",
    title: "Nexus Health App",
    tag: "Mobile",
    desc: "HIPAA-compliant native mobile application for remote patient monitoring and telemedicine.",
    tech: ["React Native", "Firebase", "WebRTC", "HIPAA"],
    metric: "50K+",
    metricLabel: "Active Users",
  },
];

export default function PortfolioPage() {
  return (
    <main className="pt-32 pb-20 bg-base min-h-screen">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="max-w-3xl mb-20">
          <p className="text-text-muted font-semibold tracking-[0.08em] uppercase text-[11px] mb-4">Portfolio</p>
          <h1 className="text-5xl md:text-7xl font-bold text-text-primary tracking-tighter mb-8">
            Engineered for market dominance.
          </h1>
          <p className="text-xl text-text-body leading-relaxed">
            Selected projects that showcase our commitment to quality, performance, and design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/portfolio/${p.slug}`}
              className="group bg-card border border-border-subtle rounded-[10px] overflow-hidden hover:bg-card-hover transition-all duration-300 flex flex-col"
            >
              <div className="h-64 relative w-full overflow-hidden bg-surface flex items-center justify-center">
                <img
                  src={`/images/portfolio/${p.slug}/thumbnail.webp`}
                  alt={`${p.title} Case Study Thumbnail - Warsi WebWorks`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain p-4 transition-all duration-500 ease-out group-hover:scale-[1.015]"
                />
                <div className="absolute top-3 right-3 text-right">
                  <span className="text-sm font-bold text-accent tracking-tight">
                    {p.metric}
                  </span>
                  <p className="text-[9px] text-text-muted/60 uppercase tracking-wider leading-none mt-px">
                    {p.metricLabel}
                  </p>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col gap-2">
                <span className="text-[10px] text-accent font-medium uppercase tracking-wider">{p.tag}</span>
                <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors leading-snug">{p.title}</h3>
                <p className="text-text-muted text-xs leading-relaxed">{p.desc}</p>
                <div className="flex flex-wrap gap-1 mt-auto pt-2">
                  {p.tech.map((t) => (
                    <span key={t} className="px-1.5 py-[2px] bg-surface border border-border-subtle/60 text-text-muted/70 rounded-[3px] text-[10px] font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
