/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    id: "01",
    slug: "aura-commerce",
    title: "Aura Commerce",
    description: "A headless ecommerce architecture processing $1M+ in monthly volume with sub-second page loads.",
    tech: ["Next.js", "Shopify", "Tailwind"],
    impact: "+140% Conversion Rate"
  },
  {
    id: "02",
    slug: "fintech-core",
    title: "Fintech Core Platform",
    description: "Enterprise dashboard for real-time market data visualization and algorithmic trading controls.",
    tech: ["React", "Node.js", "WebSockets"],
    impact: "<50ms Latency"
  },
  {
    id: "03",
    slug: "nexus-health",
    title: "Nexus Health App",
    description: "HIPAA-compliant native mobile application for remote patient monitoring and telemedicine.",
    tech: ["React Native", "Firebase", "WebRTC"],
    impact: "50k+ Active Users"
  }
];

export default function Portfolio() {
  return (
    <section className="bg-surface border-t border-border-section pt-32 pb-12 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-20">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-text-muted font-semibold tracking-[0.08em] uppercase text-[11px] mb-4"
        >
          Selected Work
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold text-text-primary tracking-tighter"
        >
          Our Recent Portfolio in <br className="hidden md:block" /> Moradabad & Beyond.
        </motion.h2>
      </div>

      <div className="flex flex-col gap-32">
        {projects.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-[75vh] md:h-[80vh] flex items-center justify-center"
          >
          <Link href={`/portfolio/${project.slug}`} className="w-full h-full block">
            {/* Massive Visual Container */}
            <div className="w-full h-full mx-auto max-w-[95%] md:max-w-[90%] rounded-[12px] overflow-hidden relative bg-card hover:bg-card-hover transition-all border border-border-subtle hover:border-[#6c63ff44] flex items-center justify-center group">
              
              {/* Premium Dashboard/Code Visual Simulation */}
              <div className="absolute inset-x-4 inset-y-12 md:inset-x-12 md:inset-y-24 bg-base rounded-[12px] border border-border-subtle transition-transform duration-700 group-hover:scale-[1.02] shadow-2xl flex flex-col overflow-hidden">
                {/* Monochrome Window Chrome */}
                <div className="w-full h-10 border-b border-border-subtle flex items-center px-4 gap-2 bg-surface/50">
                  <div className="w-3 h-3 rounded-full bg-border-subtle group-hover:bg-text-disabled transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-border-subtle group-hover:bg-text-disabled transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-border-subtle group-hover:bg-text-disabled transition-colors" />
                </div>
                
                {/* Real Mockup Visual */}
                <div className="flex-1 relative w-full h-full overflow-hidden bg-base">
                  <Image 
                    src={`/images/portfolio/${project.slug}/banner.webp`}
                    alt={`${project.title} Case Study Preview - Warsi WebWorks`}
                    fill
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="object-cover object-top transition-all duration-700 group-hover:scale-[1.03] group-hover:filter group-hover:brightness-105"
                  />
                  {/* Premium overlay to ensure readibility of absolute elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-base/60 via-transparent to-base/20 opacity-90 transition-opacity duration-500 group-hover:opacity-75" />
                  
                  {/* Subtle glassmorphic grid background overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
                </div>
              </div>

              {/* Data Overlay */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 md:gap-6 z-10 pointer-events-none">
                <div className="bg-[#f5f3ef]/95 backdrop-blur-md p-4 md:p-5 rounded-[12px] border border-border-subtle/50 max-w-md pointer-events-auto shadow-lg transition-all duration-300">
                  <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-1">{project.title}</h3>
                  <p className="text-text-body text-xs md:text-sm mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map(t => (
                      <span key={t} className="px-2 py-0.5 bg-surface/50 border border-border-subtle/30 text-text-muted rounded-[4px] text-[11px] font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[#f5f3ef]/95 backdrop-blur-md p-4 rounded-[12px] border border-border-subtle/50 flex flex-col items-start lg:items-center justify-center min-w-[150px] md:min-w-[170px] pointer-events-auto shadow-lg w-full lg:w-auto transition-all duration-300">
                  <span className="text-text-muted text-[10px] uppercase tracking-[0.08em] font-semibold mb-0.5">Impact</span>
                  <span className="text-xl md:text-2xl font-bold text-text-primary">{project.impact}</span>
                </div>
              </div>
            </div>
          </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

