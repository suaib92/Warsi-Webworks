import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | Warsi WebWorks",
  description: "Premium website development, ecommerce, mobile app, SEO, MERN stack, and UI/UX design services in Moradabad.",
};

const services = [
  {
    id: "01",
    title: "Website Development",
    desc: "High-performance digital platforms engineered for conversion. We build robust, scalable architectures that load instantly and rank high.",
    features: ["Next.js & React powered", "Server-side rendered SEO", "Sub-second load times", "Responsive by default"],
    slug: "website-development",
  },
  {
    id: "02",
    title: "Ecommerce Development",
    desc: "Immersive shopping experiences. From custom storefronts to complex inventory systems, we build commerce solutions that scale.",
    features: ["Shopify Plus & custom builds", "Payment gateway integration", "Inventory management", "Mobile-optimized checkout"],
    slug: "ecommerce-development",
  },
  {
    id: "03",
    title: "Mobile App Development",
    desc: "Native-feeling cross-platform applications. We bring your product to users' pockets with fluid animations and offline capability.",
    features: ["React Native cross-platform", "App Store & Play Store ready", "Offline-first architecture", "Push notifications"],
    slug: "mobile-app-development",
  },
  {
    id: "04",
    title: "SEO Services",
    desc: "Data-driven growth. We engineer websites to dominate search engines through technical excellence, semantic architecture, and Core Web Vitals.",
    features: ["Technical SEO audits", "Core Web Vitals optimization", "Local SEO for Moradabad", "Content strategy"],
    slug: "seo-services",
  },
  {
    id: "05",
    title: "MERN Applications",
    desc: "Complex web applications built on the modern MERN stack. Real-time data, complex state management, and custom APIs.",
    features: ["MongoDB + Express + React + Node", "REST & GraphQL APIs", "Real-time data with WebSockets", "Cloud deployment (AWS/Vercel)"],
    slug: "mern-applications",
  },
  {
    id: "06",
    title: "UI/UX Design",
    desc: "User-centric interfaces that captivate and convert. We design with empathy, data, and a relentless focus on usability.",
    features: ["User research & prototyping", "Awwwards-level visual design", "Design systems in Figma", "Conversion-focused layouts"],
    slug: "ui-ux-design",
  },
];

export default function ServicesPage() {
  return (
    <main className="pt-32 pb-20 bg-base min-h-screen">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="max-w-3xl mb-20">
          <p className="text-text-muted font-semibold tracking-[0.08em] uppercase text-[11px] mb-4">Our Services</p>
          <h1 className="text-5xl md:text-7xl font-bold text-text-primary tracking-tighter mb-8">
            World-class digital solutions.
          </h1>
          <p className="text-xl text-text-body leading-relaxed">
            Every service is engineered with the same philosophy — performance, scalability, and beautiful design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <Link
              key={s.id}
              href={`/services/${s.slug}`}
              className="group relative p-6 bg-card border border-border-subtle rounded-[12px] overflow-hidden hover:bg-card-hover hover:border-accent/30 transition-all duration-150"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-2xl font-black text-text-disabled group-hover:text-accent transition-colors">
                  {s.id}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-3 tracking-tight group-hover:text-accent transition-colors">
                {s.title}
              </h3>
              <p className="text-text-body text-base leading-relaxed mb-6">
                {s.desc}
              </p>
              <ul className="space-y-2 mb-6">
                {s.features.map((f) => (
                  <li key={f} className="text-sm text-text-muted flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <span className="text-accent font-semibold text-sm group-hover:translate-x-1 transition-transform inline-block">
                Learn more &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
