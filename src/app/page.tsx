import Hero from "@/components/sections/Hero";
import Metrics from "@/components/sections/Metrics";
import Portfolio from "@/components/sections/Portfolio";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import WhyUs from "@/components/sections/WhyUs";
import TechStack from "@/components/sections/TechStack";
import Process from "@/components/sections/Process";
import GoogleProfile from "@/components/sections/GoogleProfile";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Website Development Company in Moradabad & UP | Warsi WebWorks",
  description: "Looking for the best website developer in Moradabad? Warsi WebWorks is a premium agency specializing in React, Next.js, Ecommerce, and Mobile App Development. Serving Bareilly, Rampur, Amroha, and 12+ cities.",
  alternates: {
    canonical: "https://warsi-webworks.vercel.app",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Warsi WebWorks",
    image: "https://warsi-webworks.vercel.app/og-image.jpg",
    "@id": "https://warsi-webworks.vercel.app",
    url: "https://warsi-webworks.vercel.app",
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
