import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Code2, Search, Smartphone, ShoppingCart } from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import { cities, cityData } from "@/data/services";

// Helper to format city names (e.g., "new-york" -> "New York")
function formatCityName(slug: string) {
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export async function generateStaticParams() {
  return cities.filter(c => c !== "moradabad").map((city) => ({
    city: city,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const cityName = formatCityName(city);
  
  return {
    title: `Website Development Company in ${cityName} | Warsi WebWorks`,
    description: `Looking for a premium web design agency in ${cityName}? Warsi WebWorks delivers blazing-fast React and ecommerce solutions for ${cityName} businesses.`,
    alternates: {
      canonical: `https://warsiwebworks.com/locations/${city}`,
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityName = formatCityName(city);
  const info = cityData[city] || { region: "Uttar Pradesh", population: "growing", industry: "local commerce" };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": `Warsi WebWorks - ${cityName} Web Design`,
      "image": "https://warsiwebworks.com/og-image.png",
      "@id": `https://warsiwebworks.com/locations/${city}`,
      "url": `https://warsiwebworks.com/locations/${city}`,
      "telephone": "+917078719621",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Moradabad HQ",
        "addressLocality": "Moradabad",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "244001",
        "addressCountry": "IN"
      },
      "areaServed": {
        "@type": "City",
        "name": cityName
      },
      "description": `Premium website development, React engineering, and local SEO services serving ${cityName}, Uttar Pradesh.`
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Website Development",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Warsi WebWorks"
      },
      "areaServed": {
        "@type": "City",
        "name": cityName
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `Do you provide website development services in ${cityName}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Yes, Warsi WebWorks provides expert website development and SEO services for businesses in ${cityName} and the surrounding regions.`
          }
        },
        {
          "@type": "Question",
          "name": `How much does a website cost in ${cityName}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `The cost of a website depends on your specific requirements. We offer competitive, ROI-focused pricing for ${cityName} businesses. Contact us for a free quote.`
          }
        },
        {
          "@type": "Question",
          "name": `Why choose Warsi WebWorks over a local freelancer in ${cityName}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `We are a premium digital engineering studio offering custom Next.js and React solutions with perfect Core Web Vitals, scalable architecture, and international-grade SEO optimization.`
          }
        }
      ]
    }
  ];

  return (
    <main className="pt-32 pb-20 bg-base min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 md:px-12 max-w-6xl mb-24">
        <Breadcrumbs items={[
          { name: "Home", url: "/" },
          { name: "Locations", url: "/" },
          { name: cityName, url: `/locations/${city}` }
        ]} />
        <div className="flex items-center gap-2 text-accent mb-6">
          <MapPin className="w-5 h-5" />
          <span className="font-semibold uppercase tracking-wider text-sm">Serving {cityName} & Surrounding Areas</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-text-primary tracking-tighter mb-8 leading-tight">
          Premium Website Development in {cityName}.
        </h1>
        <p className="text-xl text-text-body leading-relaxed max-w-3xl mb-6">
          We engineer high-performance websites, scalable React web applications, and conversion-optimized ecommerce stores for ambitious businesses in {cityName}, UP.
        </p>
        <p className="text-lg text-text-body leading-relaxed max-w-3xl mb-10 bg-surface/50 p-6 rounded-lg border-l-4 border-accent">
          As a major hub in the {info.region} region, {cityName} is home to a population of over {info.population}. The local economy is driven by {info.industry}. We provide the exact technical infrastructure needed for {info.industry} businesses to scale digitally and outpace competitors.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/contact" className="bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 rounded-[8px] transition-colors">
            Start Your Project
          </Link>
          <Link href="/portfolio" className="bg-surface hover:bg-card text-text-primary font-bold px-8 py-4 rounded-[8px] border border-border-subtle transition-colors">
            View Our Work
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-surface py-24 border-y border-border-section">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tighter mb-16">
            Digital Engineering Services for {cityName}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card p-8 rounded-[12px] border border-border-subtle">
              <ShoppingCart className="w-10 h-10 text-accent mb-6" />
              <h3 className="text-2xl font-bold text-text-primary mb-4">Ecommerce Development</h3>
              <p className="text-text-body leading-relaxed mb-6">
                Custom Shopify and Next.js headless ecommerce solutions built to scale. We help {cityName} retailers capture digital market share with ultra-fast storefronts that convert visitors into buyers.
              </p>
              <Link href={`/services/ecommerce-development-${city}`} className="text-accent font-semibold hover:underline">Learn more &rarr;</Link>
            </div>

            <div className="bg-card p-8 rounded-[12px] border border-border-subtle">
              <Code2 className="w-10 h-10 text-accent mb-6" />
              <h3 className="text-2xl font-bold text-text-primary mb-4">React & Next.js Engineering</h3>
              <p className="text-text-body leading-relaxed mb-6">
                Looking for a React developer near {cityName}? We build complex, interactive web applications using the modern MERN stack and Next.js for ultimate speed and SEO performance.
              </p>
              <Link href={`/services/react-development-${city}`} className="text-accent font-semibold hover:underline">Learn more &rarr;</Link>
            </div>

            <div className="bg-card p-8 rounded-[12px] border border-border-subtle">
              <Search className="w-10 h-10 text-accent mb-6" />
              <h3 className="text-2xl font-bold text-text-primary mb-4">Local SEO Services</h3>
              <p className="text-text-body leading-relaxed mb-6">
                Dominate the search results in {cityName}. We implement technical SEO, Schema markup, and Google Business Profile strategies to outrank your local competitors.
              </p>
              <Link href={`/services/seo-services-${city}`} className="text-accent font-semibold hover:underline">Learn more &rarr;</Link>
            </div>

            <div className="bg-card p-8 rounded-[12px] border border-border-subtle">
              <Smartphone className="w-10 h-10 text-accent mb-6" />
              <h3 className="text-2xl font-bold text-text-primary mb-4">Mobile App Development</h3>
              <p className="text-text-body leading-relaxed mb-6">
                Native-feeling cross-platform iOS and Android applications. We bring {cityName} businesses directly into their customers' pockets with modern, fluid mobile experiences.
              </p>
              <Link href={`/services/mobile-app-development-${city}`} className="text-accent font-semibold hover:underline">Learn more &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Semantic FAQs */}
      <section className="container mx-auto px-6 md:px-12 max-w-4xl py-24">
        <h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tighter mb-12 text-center">
          Frequently Asked Questions in {cityName}
        </h2>
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-[12px] border border-border-subtle">
            <h3 className="text-xl font-bold text-text-primary mb-3">How much does website development cost in {cityName}?</h3>
            <p className="text-text-body leading-relaxed">
              The cost depends on the complexity of the project. A standard business website can range from $1,000 to $5,000, while complex Next.js or React applications and custom ecommerce stores typically start at $5,000. We provide transparent pricing tailored to {cityName} businesses.
            </p>
          </div>
          <div className="bg-card p-6 rounded-[12px] border border-border-subtle">
            <h3 className="text-xl font-bold text-text-primary mb-3">Do you provide local SEO services specifically for {cityName}?</h3>
            <p className="text-text-body leading-relaxed">
              Yes. We optimize your website, Google Business Profile, and local citations specifically to dominate the search results in {cityName} and the surrounding areas within a 100km radius.
            </p>
          </div>
          <div className="bg-card p-6 rounded-[12px] border border-border-subtle">
            <h3 className="text-xl font-bold text-text-primary mb-3">Will my new ecommerce site work well on mobile phones?</h3>
            <p className="text-text-body leading-relaxed">
              Absolutely. Over 80% of retail traffic in {cityName} comes from mobile devices. We engineer mobile-first Shopify and headless Next.js architectures that guarantee a lightning-fast, native-feeling shopping experience.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-6 md:px-12 max-w-4xl pb-24 text-center border-t border-border-section pt-24">
        <h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tighter mb-8">
          Why {cityName} Businesses Choose Us
        </h2>
        <p className="text-lg text-text-body leading-relaxed mb-12">
          Based just down the road in Moradabad, Warsi WebWorks provides the premium technical capabilities of a major city agency with the dedicated support of a local partner. We don't just build websites; we engineer revenue-generating digital assets.
        </p>
        <Link href="/about" className="inline-block text-accent font-semibold hover:underline text-lg">
          Meet our engineering team &rarr;
        </Link>
        <InternalLinks category="service" currentSlug={city} />
      </section>
    </main>
  );
}
