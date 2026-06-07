import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

const projectData: Record<string, {
  title: string;
  tag: string;
  desc: string;
  challenge: string;
  solution: string;
  results: string[];
  tech: string[];
  details: string[];
  metric: string;
  metricLabel: string;
}> = {
  "aura-commerce": {
    title: "Aura Commerce",
    tag: "Ecommerce",
    desc: "A headless ecommerce architecture processing $1M+ in monthly volume with sub-second page loads.",
    challenge: "The client needed a high-performance ecommerce platform that could handle rapid growth. Their existing solution was slow, had high bounce rates, and couldn't scale during peak traffic periods like flash sales and holiday seasons.",
    solution: "We built a headless ecommerce architecture using Next.js as the frontend and Shopify as the commerce backend. This decoupled approach allowed us to optimize every page for speed while leveraging Shopify's battle-tested inventory and payment systems.",
    results: [
      "140% increase in conversion rate",
      "Sub-200ms Time to First Byte globally",
      "Zero downtime during Black Friday traffic spikes",
      "25% reduction in cart abandonment",
      "Page load speed improved from 4.2s to 0.8s",
    ],
    tech: ["Next.js", "Shopify Plus", "Tailwind CSS", "Vercel", "Stripe", "Algolia Search"],
    details: [
      "Built on Next.js with Shopify as the backend",
      "Server-side rendered product pages for SEO dominance",
      "Instant page transitions with prefetching",
      "Custom checkout flow reducing cart abandonment by 25%",
      "Real-time inventory sync across warehouses",
      "Sub-200ms Time to First Byte worldwide",
    ],
    metric: "$1M+",
    metricLabel: "Monthly Volume",
  },
  "fintech-core": {
    title: "Fintech Core Platform",
    tag: "Web App",
    desc: "Enterprise dashboard for real-time market data visualization and algorithmic trading controls.",
    challenge: "A fintech startup needed a real-time trading dashboard that could process and display live market data with sub-50ms latency. The platform needed to handle complex charting, multiple user roles, and algorithmic trading controls.",
    solution: "We built a React-powered single-page application with WebSocket connections for real-time data streaming. The backend was designed as a microservices architecture on AWS, with Redis for caching and PostgreSQL for transaction data.",
    results: [
      "Sub-50ms data latency for trading signals",
      "Handles 10,000+ concurrent users",
      "99.99% uptime since launch",
      "Multi-user role-based access control implemented",
      "Automated reporting saved 20+ hours/week",
    ],
    tech: ["React", "Node.js", "WebSockets", "D3.js", "PostgreSQL", "Redis", "AWS"],
    details: [
      "React-powered dashboard with WebSocket real-time data",
      "Complex candlestick charts with D3.js",
      "Multi-user role-based access control",
      "Sub-50ms data latency for trading signals",
      "Automated reporting and alerting system",
      "Cloud-native deployment on AWS",
    ],
    metric: "99.99%",
    metricLabel: "Uptime",
  },
  "nexus-health": {
    title: "Nexus Health App",
    tag: "Mobile",
    desc: "HIPAA-compliant native mobile application for remote patient monitoring and telemedicine.",
    challenge: "A healthcare provider needed a mobile app for remote patient monitoring that was HIPAA-compliant, worked in rural areas with poor connectivity, and provided real-time video consultations between doctors and patients.",
    solution: "We built a React Native application with end-to-end encryption, offline-first architecture, and WebRTC-based video consultations. The app syncs data when connectivity is restored and provides full functionality offline.",
    results: [
      "50,000+ active users within 6 months",
      "Available in rural areas with 2G connectivity",
      "HIPAA compliance achieved with end-to-end encryption",
      "4.8★ rating on both App Store and Play Store",
      "Reduced hospital readmissions by 30%",
    ],
    tech: ["React Native", "Firebase", "WebRTC", "Twilio", "AWS", "HIPAA Compliance"],
    details: [
      "React Native cross-platform (iOS + Android)",
      "HIPAA-compliant data encryption",
      "Real-time video consultation with WebRTC",
      "Offline-first architecture for rural areas",
      "Integration with hospital management systems",
      "50,000+ active users within 6 months",
    ],
    metric: "50K+",
    metricLabel: "Active Users",
  },
};

export async function generateStaticParams() {
  return Object.keys(projectData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projectData[slug];
  if (!p) return { title: "Project Not Found" };
  return { 
    title: `${p.title} - ${p.tag} Web Development Case Study | Warsi WebWorks`, 
    description: `See how Warsi WebWorks built a high-performance Next.js application for ${p.title}, increasing their conversions and local search visibility.`,
    alternates: {
      canonical: `https://warsiwebworks.com/portfolio/${slug}`,
    }
  };
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projectData[slug];

  if (!p) {
    return (
      <main className="pt-32 pb-20 bg-base min-h-screen">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-text-primary mb-4">Project not found</h1>
          <Link href="/portfolio" className="text-accent hover:underline">&larr; Back to Portfolio</Link>
        </div>
      </main>
    );
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemPage",
      "name": `${p.title} - ${p.tag} Web Development Case Study`,
      "description": `See how Warsi WebWorks built a high-performance Next.js application for ${p.title}.`
    },
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": p.title,
      "author": {
        "@type": "Organization",
        "name": "Warsi WebWorks"
      },
      "genre": p.tag,
      "text": p.desc,
      "keywords": p.tech.join(", ")
    }
  ];

  return (
    <main className="pt-32 pb-20 bg-base min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <Link href="/portfolio" className="text-text-muted hover:text-accent text-sm mb-8 inline-block">&larr; Back to Portfolio</Link>

        {/* Hero Image — full width, no overlays, only floating metric */}
        <div className="relative w-full overflow-hidden border border-border-subtle rounded-[10px] bg-card mb-8 shadow-lg flex justify-center">
          <Image
            src={`/images/portfolio/${slug}/hero.webp`}
            alt={`${p.title} Case Study Full Banner - Warsi WebWorks`}
            width={1200}
            height={800}
            priority
            className="w-full h-auto object-contain max-h-[65vh] mx-auto"
          />
          <div className="absolute top-4 right-4 text-right">
            <span className="text-lg font-bold text-accent tracking-tight">
              {p.metric}
            </span>
            <p className="text-[9px] text-text-muted/60 uppercase tracking-wider leading-none mt-px">
              {p.metricLabel}
            </p>
          </div>
        </div>

        {/* Content below image */}
        <div className="max-w-3xl mb-10">
          <span className="text-[10px] text-accent font-medium uppercase tracking-wider">{p.tag}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-4 mt-2">Case Study: {p.title}</h1>
          <p className="text-base text-text-muted leading-relaxed mb-6">{p.desc}</p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <span key={t} className="px-2 py-1 bg-surface border border-border-subtle/60 text-text-muted/70 rounded-[4px] text-[11px] font-medium">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Challenge */}
        <div className="bg-card border border-border-subtle rounded-[12px] p-8 mb-6">
          <h2 className="text-2xl font-bold text-text-primary mb-4">The Challenge</h2>
          <p className="text-text-body text-lg leading-relaxed">{p.challenge}</p>
        </div>

        {/* Solution */}
        <div className="bg-card border border-border-subtle rounded-[12px] p-8 mb-6">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Our Solution</h2>
          <p className="text-text-body text-lg leading-relaxed">{p.solution}</p>
        </div>

        {/* Results */}
        <div className="bg-card border border-border-subtle rounded-[12px] p-8 mb-6">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Results</h2>
          <ul className="space-y-4">
            {p.results.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-text-body">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Highlights */}
        <div className="bg-card border border-border-subtle rounded-[12px] p-8 mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Project Highlights</h2>
          <ul className="space-y-4">
            {p.details.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-text-body">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Link href="/#contact" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 rounded-[8px] transition-all duration-300">
          Start Your Project
        </Link>
      </div>
    </main>
  );
}
