import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/Portfolio";
import Services from "@/components/sections/Services";
import WhyUs from "@/components/sections/WhyUs";
import TechStack from "@/components/sections/TechStack";
import Process from "@/components/sections/Process";
import GoogleProfile from "@/components/sections/GoogleProfile";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Testimonials from "@/components/sections/Testimonials";
import Metrics from "@/components/sections/Metrics";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Website Development Company in Moradabad & UP | Warsi WebWorks",
  description: "Looking for the best website developer in Moradabad? Warsi WebWorks is a premium agency specializing in React, Next.js, Ecommerce, and Mobile App Development. Serving Bareilly, Rampur, Amroha, and 12+ cities.",
  alternates: {
    canonical: "https://warsiwebworks.com",
  },
};

export default function Home() {
  return (
    <>
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
