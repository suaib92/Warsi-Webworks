import Hero from "@/components/sections/Hero";
import Metrics from "@/components/sections/Metrics";
import dynamic from "next/dynamic";

const Portfolio = dynamic(() => import("@/components/sections/Portfolio"));
const Services = dynamic(() => import("@/components/sections/Services"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const WhyUs = dynamic(() => import("@/components/sections/WhyUs"));
const TechStack = dynamic(() => import("@/components/sections/TechStack"));
const Process = dynamic(() => import("@/components/sections/Process"));
const GoogleProfile = dynamic(() => import("@/components/sections/GoogleProfile"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const Contact = dynamic(() => import("@/components/sections/Contact"));
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Website Development Company in Moradabad & UP | Warsi WebWorks",
  description: "Looking for the best website developer in Moradabad? Warsi WebWorks is a premium agency specializing in React, Next.js, Ecommerce, and Mobile App Development. Serving Bareilly, Rampur, Amroha, and 12+ cities.",
  alternates: {
    canonical: "https://warsiwebworks.com",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Warsi WebWorks",
    image: "https://warsiwebworks.com/og-image.jpg",
    "@id": "https://warsiwebworks.com",
    url: "https://warsiwebworks.com",
    telephone: "+917078719621",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Moradabad",
      addressRegion: "UP",
      postalCode: "244001",
      addressCountry: "IN"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.8386,
      longitude: 78.7733
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Metrics />
      <Portfolio />
      <Services />
      <Testimonials />
      <WhyUs />
      <TechStack />
      <Process />
      <GoogleProfile />
      <FAQ />
      <Contact />
    </>
  );
}
