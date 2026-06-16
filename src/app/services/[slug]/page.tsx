import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { baseServices, cities, cityData, descriptions, getSpintax } from "@/data/services";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import ServiceLocationsMatrix from "@/components/seo/ServiceLocationsMatrix";

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
      canonical: `https://warsiwebworks.com/services/${slug}`
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
          "item": "https://warsiwebworks.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://warsiwebworks.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": s.title,
          "item": `https://warsiwebworks.com/services/${slug}`
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
        "url": "https://warsiwebworks.com",
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
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": s.faqs ? s.faqs.map((faq: { q: string, a: string }) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      })) : []
    }
  ];

  return (
    <main className="pt-32 pb-20 bg-base min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <Breadcrumbs items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: s.title, url: `/services/${slug}` }
        ]} />
        <Link href={`/locations/${s.citySlug}`} className="text-text-muted hover:text-accent text-sm mb-8 inline-block">&larr; Back to {s.cityName} Hub</Link>
        <p className="text-text-muted font-semibold tracking-[0.08em] uppercase text-[11px] mb-4">Service</p>
        <h1 className="text-4xl md:text-6xl font-bold text-text-primary tracking-tighter mb-4 leading-tight">{s.h1}</h1>
        <p className="text-xl text-accent font-semibold mb-8">{s.tagline}</p>
        
        {/* Core Description */}
        <p className="text-lg text-text-body leading-relaxed mb-12">{s.desc}</p>

        {/* Extended Overview */}
        <div className="prose prose-invert max-w-none mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-6">Unleashing Digital Potential in {s.cityName}</h2>
          <p className="text-text-body leading-relaxed text-lg mb-6">{s.extendedOverview}</p>
        </div>

        {/* Dynamic Local Serving Businesses Section */}
        <div className="bg-card border border-border-subtle rounded-[12px] p-8 mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Serving Businesses in {s.cityName}</h2>
          <p className="text-text-body leading-relaxed mb-4">
            As a leading agency based nearby, we deeply understand the digital landscape of the <strong>{s.cityRegion}</strong> region. 
            Home to over <strong>{s.cityPopulation} residents</strong>, {s.cityName} is a rapidly growing hub for <strong>{s.cityIndustry}</strong>. 
            Whether you're a local startup looking to establish an online presence, or an established enterprise aiming to scale globally from {s.cityName}, our {s.title} solutions provide the technical foundation you need to succeed in this competitive local market.
          </p>
          <p className="text-text-body leading-relaxed">
            <strong>Industry Applications:</strong> {s.industryApplications}
          </p>
        </div>

        {/* Dynamic Testimonial Placeholder */}
        <div className="bg-surface/50 border-l-4 border-accent rounded-r-[12px] p-6 mb-16 italic text-text-body">
          "Warsi WebWorks delivered exactly what we needed. Finding a reliable {s.title} partner who understands the local market in {s.cityName} was challenging until we found them. Highly recommended!"
          <span className="block mt-4 font-semibold text-text-primary not-italic">— Local Business Owner, {s.cityName}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* What We Deliver */}
          <div className="bg-card border border-border-subtle rounded-[12px] p-8">
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
          <div className="bg-card border border-border-subtle rounded-[12px] p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Why Choose This Service</h2>
            <ul className="space-y-4">
              {s.benefits.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-text-body">
                  <span className="text-accent text-lg font-bold shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Detailed Methodology */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-8">Our Proven Methodology</h2>
          <div className="space-y-6">
            {s.methodology.map((step: { title: string, desc: string }, i: number) => (
              <div key={i} className="flex flex-col md:flex-row gap-6 bg-card border border-border-subtle rounded-[12px] p-6">
                <div className="flex-shrink-0">
                  <span className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xl font-bold">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">{step.title}</h3>
                  <p className="text-text-body leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 md:px-12 max-w-4xl mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {s.faqs && s.faqs.map((faq: { q: string, a: string }, i: number) => (
            <div key={i} className="bg-card border border-border-subtle p-6 rounded-lg">
              <h3 className="text-xl font-bold text-text-primary mb-3">{faq.q}</h3>
              <p className="text-text-body leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 md:px-12 max-w-6xl mb-24">
        <ServiceLocationsMatrix 
          baseServiceSlug={s.serviceSlug} 
          baseServiceTitle={s.title} 
          currentCitySlug={s.citySlug} 
        />
        <InternalLinks category="service" currentSlug={s.serviceSlug} />

        <div className="mt-12 text-center">
          <Link href="/#contact" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 rounded-[8px] transition-all duration-300">
            Start Your Project in {s.cityName}
          </Link>
        </div>
      </section>
    </main>
  );
}
