import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// City Metadata Dictionary
const cityData: Record<string, { name: string, region: string, population: string, industry: string }> = {
  "moradabad": { name: "Moradabad", region: "Western UP", population: "900,000+", industry: "export and manufacturing" },
  "rampur": { name: "Rampur", region: "Rohilkhand", population: "300,000+", industry: "manufacturing and agriculture" },
  "sambhal": { name: "Sambhal", region: "Western UP", population: "220,000+", industry: "handicrafts and local enterprise" },
  "amroha": { name: "Amroha", region: "Western UP", population: "200,000+", industry: "manufacturing and agriculture" },
  "bijnor": { name: "Bijnor", region: "Western UP", population: "100,000+", industry: "sugar and agriculture" },
  "kashipur": { name: "Kashipur", region: "Uttarakhand foothills", population: "120,000+", industry: "industrial manufacturing" },
  "rudrapur": { name: "Rudrapur", region: "Uttarakhand SIDCUL", population: "150,000+", industry: "industrial and corporate" },
  "bareilly": { name: "Bareilly", region: "Rohilkhand", population: "900,000+", industry: "commercial and retail" },
  "haldwani": { name: "Haldwani", region: "Kumaon gateway", population: "250,000+", industry: "commercial and trading" },
  "gajraula": { name: "Gajraula", region: "NH24 corridor", population: "50,000+", industry: "industrial" },
  "chandausi": { name: "Chandausi", region: "Western UP", population: "110,000+", industry: "export and trading" },
  "bilari": { name: "Bilari", region: "Moradabad district", population: "40,000+", industry: "local retail" },
  "thakurdwara": { name: "Thakurdwara", region: "Moradabad district", population: "45,000+", industry: "agriculture and retail" },
  "joya": { name: "Joya", region: "Amroha district", population: "20,000+", industry: "local business" },
  "hasanpur": { name: "Hasanpur", region: "Amroha district", population: "60,000+", industry: "retail and agriculture" }
};

const cities = Object.keys(cityData);

// Simple deterministic hash function for Spintax
function getSpintax(seed: string, options: string[]) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % options.length;
  return options[index];
}

// Spintax variants for descriptions
const descriptions = {
  "website-development": [
    "Hire expert website designers in {city}. We build fast, responsive, and SEO-optimized custom websites for local and global businesses.",
    "Looking for top-tier website development in {city}? We engineer high-performance, conversion-focused websites tailored to your specific market needs.",
    "As the premier web agency serving {city}, we deliver blazing-fast React and Next.js architectures that outshine your local competitors."
  ],
  "ecommerce-development": [
    "From custom storefronts to complex inventory systems, we build ecommerce solutions in {city} that scale with your business and maximize conversions.",
    "Launch your online store with {city}'s leading ecommerce experts. We specialize in headless Shopify and custom architectures that drive revenue.",
    "Maximize your digital retail presence in {city}. We architect high-converting, mobile-first ecommerce platforms engineered for growth."
  ],
  "react-development": [
    "Looking for expert React developers in {city}? We engineer complex user interfaces with state-of-the-art React and Redux state management.",
    "Accelerate your web application with {city}'s top React engineers. We build scalable, dynamic single-page applications for enterprise and startups.",
    "We provide premium React development services in {city}, crafting interactive, fluid, and highly optimized frontend architectures."
  ],
  "nextjs-development": [
    "Our Next.js developers in {city} build hyper-fast, SEO-friendly applications that dominate organic search and provide perfect Core Web Vitals.",
    "Upgrade to the modern web. We offer expert Next.js engineering in {city} for SSR and SSG architectures that guarantee sub-second load times.",
    "Dominate your market in {city} with a custom Next.js application. Experience unmatched performance, perfect SEO, and seamless Vercel deployment."
  ],
  "mobile-app-development": [
    "We build React Native apps in {city} that feel truly native on iOS and Android. Performance-optimized, offline-capable, and built for real-world use.",
    "Bring your app idea to life in {city}. Our mobile engineers craft fluid, cross-platform applications that your customers will love using daily.",
    "Expand into the mobile ecosystem with {city}'s leading app developers. We deliver scalable iOS and Android apps with a single modern codebase."
  ],
  "seo-services": [
    "Dominate Google search results. Our SEO services in {city} combine technical audits, semantic schema, and content strategy to drive organic traffic.",
    "Outrank your competitors in {city}. We implement data-driven local SEO, Core Web Vitals optimization, and advanced schema markup for sustained growth.",
    "Stop losing customers to page two. Our technical SEO experts in {city} engineer high-performance search strategies that capture high-intent local traffic."
  ]
};

const baseServices: Record<string, any> = {
  "website-development": {
    title: "Website Development",
    h1: "Expert Website Development Services in",
    tagline: "High-performance digital platforms engineered for conversion.",
    features: [
      "Next.js & React-powered SPAs and SSR sites",
      "Server-side rendered SEO architecture",
      "Sub-second load times with Core Web Vitals",
      "Fully responsive across all devices",
      "Custom CMS integration (Sanity, Strapi, Contentful)",
      "CI/CD pipeline with Vercel or AWS",
    ],
    benefits: [
      "Higher Google rankings with optimized Core Web Vitals",
      "Faster load times = higher conversion rates",
      "Scalable architecture that grows with your business",
      "SEO-friendly structure from day one",
    ],
    process: [
      "Discovery — We analyze your market, competitors, and goals",
      "Architecture — We design the tech stack and information architecture",
      "Design — We craft conversion-focused UI/UX",
      "Development — We build with clean, maintainable code",
      "Testing — Rigorous QA across browsers and devices",
      "Launch — Zero-downtime deployment with analytics tracking",
    ],
  },
  "ecommerce-development": {
    title: "Ecommerce Development",
    h1: "Premium Ecommerce Website Development in",
    tagline: "Immersive shopping experiences that drive revenue.",
    features: [
      "Shopify Plus & custom storefronts",
      "Payment gateway integration (Razorpay, Stripe)",
      "Inventory & order management systems",
      "Mobile-optimized checkout flow",
      "SEO-optimized product architecture",
      "Multi-currency & multi-language support",
    ],
    benefits: [
      "Reduced cart abandonment with optimized checkout",
      "Higher average order value with smart upsells",
      "Mobile-first shopping experience",
      "Real-time inventory sync across channels",
    ],
    process: [
      "Discovery — Understand your products, audience, and sales goals",
      "Platform Selection — Choose the right tech (Shopify vs custom)",
      "Design — Craft a conversion-optimized storefront",
      "Development — Build with inventory, payments, and shipping",
      "Testing — Test checkout flows, payments, and mobile experience",
      "Launch — Go live with analytics and monitoring",
    ],
  },
  "react-development": {
    title: "React Development",
    h1: "Top React Developers in",
    tagline: "Dynamic, fast, and scalable frontend architectures.",
    features: [
      "Complex single-page applications (SPAs)",
      "Micro-frontends and component libraries",
      "Performance optimization & code splitting",
      "State management (Redux, Zustand, Context)",
      "Headless CMS integrations",
      "WebSockets for real-time data",
    ],
    benefits: [
      "Fluid, app-like user experiences on the web",
      "Component reusability for faster iteration",
      "Highly scalable for enterprise-grade data",
      "Instant page transitions",
    ],
    process: [
      "Discovery — Component and state architecture planning",
      "Design — Interactive prototypes with Figma",
      "Development — Building modular React components",
      "Testing — Unit and integration tests with Jest/Cypress",
      "Performance — Lighthouse and rendering optimizations",
      "Launch — Seamless CI/CD delivery",
    ],
  },
  "nextjs-development": {
    title: "Next.js Development",
    h1: "Expert Next.js Development Agency in",
    tagline: "The modern web's fastest framework for SEO and performance.",
    features: [
      "Server-Side Rendering (SSR) & Static Site Generation (SSG)",
      "App Router & React Server Components",
      "API Routes & Edge Functions",
      "Automatic Image & Font Optimization",
      "Vercel infrastructure deployment",
      "Internationalization (i18n)",
    ],
    benefits: [
      "Perfect Lighthouse scores out of the box",
      "Superior SEO indexing with server-rendered content",
      "Unmatched global performance via Edge Networks",
      "Secure API handling and database integrations",
    ],
    process: [
      "Discovery — Mapping out routing and data fetching requirements",
      "Architecture — App Router structuring and API design",
      "Development — Building with Server Components",
      "Optimization — Configuring caching and revalidation strategies",
      "Testing — Vercel preview environments and QA",
      "Launch — Global edge deployment",
    ],
  },
  "mobile-app-development": {
    title: "Mobile App Development",
    h1: "Custom Mobile App Development in",
    tagline: "Native-feeling cross-platform applications.",
    features: [
      "React Native cross-platform (iOS + Android)",
      "App Store & Play Store deployment",
      "Offline-first architecture with sync",
      "Push notifications & real-time updates",
      "Custom UI with native modules",
      "Performance monitoring & crash reporting",
    ],
    benefits: [
      "Single codebase for both iOS and Android",
      "Faster development and lower costs",
      "Native performance with hot reload",
      "Easy maintenance and updates",
    ],
    process: [
      "Discovery — Define user flows, features, and platform requirements",
      "Design — Create platform-specific UI/UX",
      "Development — Build with React Native and native modules",
      "Testing — Test on real devices across platforms",
      "Deployment — Submit to App Store and Play Store",
      "Monitoring — Track crashes, performance, and user engagement",
    ],
  },
  "seo-services": {
    title: "SEO Services",
    h1: "Expert SEO Services & Local Search Optimization in",
    tagline: "Data-driven growth through technical excellence.",
    features: [
      "Technical SEO audits & fixes",
      "Core Web Vitals & speed optimization",
      "Local SEO & Google Business Profile management",
      "Content strategy & keyword clustering",
      "Schema markup (JSON-LD) & structured data",
      "Entity SEO and AI Search Optimization (AEO)",
    ],
    benefits: [
      "Higher search rankings for '{city}' local keywords",
      "More organic traffic without ad spend",
      "Increased visibility in AI overviews (ChatGPT/Gemini)",
      "Long-term sustainable growth",
    ],
    process: [
      "Audit — Analyze current rankings, speed, and technical issues",
      "Strategy — Define target keywords and topical authority map",
      "Implementation — Fix technical issues and apply schema",
      "Monitoring — Track rankings and traffic weekly",
      "Optimization — Continuously improve based on data",
      "Reporting — Monthly reports with actionable insights",
    ],
  },
};

// Generate all combinations
export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  
  Object.keys(baseServices).forEach(serviceKey => {
    cities.forEach(city => {
      params.push({ slug: `${serviceKey}-${city}` });
    });
  });
  
  return params;
}

// Helper to parse slug and inject unique local data
function parseSlug(slug: string) {
  const matchedCitySlug = cities.find(city => slug.endsWith(`-${city}`));
  
  if (!matchedCitySlug) return null;
  
  const serviceKey = slug.replace(`-${matchedCitySlug}`, '');
  const baseService = baseServices[serviceKey];
  
  if (!baseService) return null;
  
  const cityInfo = cityData[matchedCitySlug];
  
  // Spintax Description
  const spintaxDescArray = descriptions[serviceKey as keyof typeof descriptions];
  const dynamicDesc = getSpintax(slug, spintaxDescArray).replace(/{city}/g, cityInfo.name);
  
  return {
    ...baseService,
    citySlug: matchedCitySlug,
    cityName: cityInfo.name,
    cityPopulation: cityInfo.population,
    cityRegion: cityInfo.region,
    cityIndustry: cityInfo.industry,
    h1: `${baseService.h1} ${cityInfo.name}`,
    desc: dynamicDesc,
    benefits: baseService.benefits.map((b: string) => b.replace(/{city}/g, cityInfo.name)),
    serviceSlug: serviceKey
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = parseSlug(slug);
  if (!s) return { title: "Service Not Found" };
  
  return { 
    title: `Best ${s.title} in ${s.cityName} | Warsi WebWorks`, 
    description: s.desc,
    alternates: {
      canonical: `https://warsi-webworks.vercel.app/services/${slug}`
    }
  };
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = parseSlug(slug);

  if (!s) {
    notFound();
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://warsi-webworks.vercel.app"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://warsi-webworks.vercel.app/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": s.title,
          "item": `https://warsi-webworks.vercel.app/services/${slug}`
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `${s.title} ${s.cityName}`,
      "serviceType": s.title,
      "provider": {
        "@type": "ProfessionalService",
        "name": "Warsi WebWorks",
        "url": "https://warsi-webworks.vercel.app",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Moradabad",
          "addressRegion": "Uttar Pradesh",
          "addressCountry": "IN"
        }
      },
      "areaServed": {
        "@type": "City",
        "name": s.cityName
      },
      "description": s.desc
    }
  ];

  return (
    <main className="pt-32 pb-20 bg-base min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <Link href={`/locations/${s.citySlug}`} className="text-text-muted hover:text-accent text-sm mb-8 inline-block">&larr; Back to {s.cityName} Hub</Link>
        <p className="text-text-muted font-semibold tracking-[0.08em] uppercase text-[11px] mb-4">Service</p>
        <h1 className="text-4xl md:text-6xl font-bold text-text-primary tracking-tighter mb-4 leading-tight">{s.h1}</h1>
        <p className="text-xl text-accent font-semibold mb-8">{s.tagline}</p>
        <p className="text-lg text-text-body leading-relaxed mb-16">{s.desc}</p>

        {/* Dynamic Local Serving Businesses Section */}
        <div className="bg-card border border-border-subtle rounded-[12px] p-8 mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Serving Businesses in {s.cityName}</h2>
          <p className="text-text-body leading-relaxed">
            As a leading agency based nearby, we deeply understand the digital landscape of the <strong>{s.cityRegion}</strong> region. 
            Home to over <strong>{s.cityPopulation} residents</strong>, {s.cityName} is a rapidly growing hub for <strong>{s.cityIndustry}</strong>. 
            Whether you're a local startup looking to establish an online presence, or an established enterprise aiming to scale globally from {s.cityName}, our {s.title} solutions provide the technical foundation you need to succeed in this competitive local market.
          </p>
        </div>

        {/* Dynamic Testimonial Placeholder */}
        <div className="bg-surface/50 border-l-4 border-accent rounded-r-[12px] p-6 mb-12 italic text-text-body">
          "Warsi WebWorks delivered exactly what we needed. Finding a reliable {s.title} partner who understands the local market in {s.cityName} was challenging until we found them. Highly recommended!"
          <span className="block mt-4 font-semibold text-text-primary not-italic">— Local Business Owner, {s.cityName}</span>
        </div>

        {/* What We Deliver */}
        <div className="bg-card border border-border-subtle rounded-[12px] p-8 mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Technologies & Architecture</h2>
          <ul className="space-y-4">
            {s.features.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-text-body">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className="bg-card border border-border-subtle rounded-[12px] p-8 mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Why Choose This Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {s.benefits.map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-3 text-text-body p-4 bg-surface rounded-[8px]">
                <span className="text-accent text-lg font-bold shrink-0">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="bg-card border border-border-subtle rounded-[12px] p-8 mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Our Process</h2>
          <ol className="space-y-4">
            {s.process.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-4 text-text-body">
                <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</span>
                {item}
              </li>
            ))}
          </ol>
        </div>

        <Link href="/#contact" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 rounded-[8px] transition-all duration-300">
          Start Your Project in {s.cityName}
        </Link>
      </div>
    </main>
  );
}
