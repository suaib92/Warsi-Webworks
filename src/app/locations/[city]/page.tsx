import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Code2, Search, Smartphone, ShoppingCart } from "lucide-react";

// Target cities within 100km of Moradabad
const cities = [
  "rampur", "sambhal", "amroha", "bijnor", "kashipur", 
  "rudrapur", "bareilly", "haldwani", "gajraula", "chandausi", 
  "bilari", "thakurdwara", "joya", "hasanpur"
];

// Helper to format city names (e.g., "new-york" -> "New York")
function formatCityName(slug: string) {
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export async function generateStaticParams() {
  return cities.map((city) => ({
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
      canonical: `https://warsi-webworks.vercel.app/locations/${city}`,
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityName = formatCityName(city);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": `Warsi WebWorks - ${cityName} Web Design`,
      "image": "https://warsi-webworks.vercel.app/og-image.png",
      "@id": `https://warsi-webworks.vercel.app/locations/${city}`,
      "url": `https://warsi-webworks.vercel.app/locations/${city}`,
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
        <div className="flex items-center gap-2 text-accent mb-6">
          <MapPin className="w-5 h-5" />
          <span className="font-semibold uppercase tracking-wider text-sm">Serving {cityName} & Surrounding Areas</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-text-primary tracking-tighter mb-8 leading-tight">
          Premium Website Development in {cityName}.
        </h1>
        <p className="text-xl text-text-body leading-relaxed max-w-3xl mb-10">
          We engineer high-performance websites, scalable React web applications, and conversion-optimized ecommerce stores for ambitious businesses in {cityName}, UP.
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
              <Link href="/services/ecommerce-development-moradabad" className="text-accent font-semibold hover:underline">Learn more &rarr;</Link>
            </div>

            <div className="bg-card p-8 rounded-[12px] border border-border-subtle">
              <Code2 className="w-10 h-10 text-accent mb-6" />
              <h3 className="text-2xl font-bold text-text-primary mb-4">React & Next.js Engineering</h3>
              <p className="text-text-body leading-relaxed mb-6">
                Looking for a React developer near {cityName}? We build complex, interactive web applications using the modern MERN stack and Next.js for ultimate speed and SEO performance.
              </p>
              <Link href="/services/react-development-moradabad" className="text-accent font-semibold hover:underline">Learn more &rarr;</Link>
            </div>

            <div className="bg-card p-8 rounded-[12px] border border-border-subtle">
              <Search className="w-10 h-10 text-accent mb-6" />
              <h3 className="text-2xl font-bold text-text-primary mb-4">Local SEO Services</h3>
              <p className="text-text-body leading-relaxed mb-6">
                Dominate the search results in {cityName}. We implement technical SEO, Schema markup, and Google Business Profile strategies to outrank your local competitors.
              </p>
              <Link href="/services/seo-services-moradabad" className="text-accent font-semibold hover:underline">Learn more &rarr;</Link>
            </div>

            <div className="bg-card p-8 rounded-[12px] border border-border-subtle">
              <Smartphone className="w-10 h-10 text-accent mb-6" />
              <h3 className="text-2xl font-bold text-text-primary mb-4">Mobile App Development</h3>
              <p className="text-text-body leading-relaxed mb-6">
                Native-feeling cross-platform iOS and Android applications. We bring {cityName} businesses directly into their customers' pockets with modern, fluid mobile experiences.
              </p>
              <Link href="/services/mobile-app-development-moradabad" className="text-accent font-semibold hover:underline">Learn more &rarr;</Link>
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
      </section>
    </main>
  );
}
