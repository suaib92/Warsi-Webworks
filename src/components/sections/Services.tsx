"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, ShoppingCart, Smartphone, Search, Database, PenTool } from "lucide-react";

const capabilities = [
  {
    id: "01",
    title: "Website Development",
    href: "/services/website-development-moradabad",
    description: "Premium web design and engineering. As a leading React Developer and Next.js Developer in Moradabad, we build robust, scalable architectures that load instantly.",
    icon: <Code2 className="w-10 h-10 text-accent-light" />
  },
  {
    id: "02",
    title: "Ecommerce Development",
    href: "/services/ecommerce-development-moradabad",
    description: "Premium Ecommerce Website Development in Moradabad. From custom storefronts to complex inventory systems, we build retail solutions that convert.",
    icon: <ShoppingCart className="w-10 h-10 text-accent-light" />
  },
  {
    id: "03",
    title: "React Development",
    href: "/services/react-development-moradabad",
    description: "Dynamic, fast, and scalable frontend architectures. We engineer complex user interfaces with state-of-the-art React and Redux state management.",
    icon: <Database className="w-10 h-10 text-accent-light" />
  },
  {
    id: "04",
    title: "Next.js Development",
    href: "/services/nextjs-development-moradabad",
    description: "The modern web's fastest framework. Our Next.js developers build hyper-fast, SEO-friendly applications that dominate organic search.",
    icon: <PenTool className="w-10 h-10 text-accent-light" />
  },
  {
    id: "05",
    title: "Mobile App Development",
    href: "/services/mobile-app-development-moradabad",
    description: "Native-feeling cross-platform mobile app development in Moradabad. We bring your product to users' pockets with fluid, modern animations.",
    icon: <Smartphone className="w-10 h-10 text-accent-light" />
  },
  {
    id: "06",
    title: "SEO Services",
    href: "/services/seo-services-moradabad",
    description: "Dominating search rankings with expert SEO Services in Moradabad. We optimize speed, semantic schema markup, and content strategy for high traffic.",
    icon: <Search className="w-10 h-10 text-accent-light" />
  }
];

function CapabilityCard({ capability, index }: { capability: any; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.2 1"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, y }}
      className="group relative p-6 bg-card border border-border-subtle rounded-[12px] overflow-hidden hover:bg-card-hover hover:border-[#6c63ff44] transition-all duration-150"
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-surface rounded-[8px] border border-border-subtle">
            {capability.icon}
          </div>
          <span className="text-3xl font-black text-text-disabled group-hover:text-text-muted transition-colors duration-300">
            {capability.id}
          </span>
        </div>
        
        <h3 className="text-2xl font-bold text-text-primary mb-3 tracking-tight group-hover:text-accent-light transition-colors duration-300">
          {capability.title}
        </h3>
        
        <p className="text-text-body text-base leading-relaxed flex-grow">
          {capability.description}
        </p>
        
        <div className="mt-6 flex items-center gap-2 text-accent-light font-semibold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <Link href={capability.href} className="text-sm hover:underline">Explore Service</Link>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section className="bg-base py-32 relative border-t border-border-section">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="max-w-4xl mb-24">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-text-muted font-semibold tracking-[0.08em] uppercase text-[11px] mb-4"
          >
            Capabilities
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-text-primary tracking-tighter"
          >
            Expert Digital Services <br className="hidden md:block" /> We Offer in UP.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((cap, idx) => (
            <CapabilityCard key={cap.id} capability={cap} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
