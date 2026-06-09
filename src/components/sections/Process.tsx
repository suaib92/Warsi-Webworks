"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  { id: "01", title: "Discovery", desc: "We analyze your market, competitors, and core objectives to establish a baseline for digital dominance." },
  { id: "02", title: "Strategy", desc: "Architecting the solution. Defining the tech stack, user journeys, and SEO blueprints before writing a single line of code." },
  { id: "03", title: "Design", desc: "Crafting premium, user-centric interfaces. Awwwards-level UI/UX that prioritizes conversion and brand authority." },
  { id: "04", title: "Development", desc: "Engineering the platform using enterprise tech (Next.js, React, Node). High performance, scalable, and secure." },
  { id: "05", title: "Testing", desc: "Rigorous QA. Cross-browser, cross-device testing, load balancing, and Lighthouse performance auditing." },
  { id: "06", title: "Launch", desc: "Seamless deployment to production. Zero downtime, immediate indexing, and comprehensive analytics tracking." },
  { id: "07", title: "Growth", desc: "Continuous optimization. A/B testing, SEO scaling, and feature expansions as your business grows." }
];

export default function Process() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Translate horizontal depending on how many steps there are
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-62%"]);

  return (
    <section className="bg-surface relative">
      {/* Mobile Layout (Vertical) */}
      <div className="md:hidden py-24 px-6 relative z-10">
        <div className="mb-16">
          <p className="text-text-muted font-semibold tracking-[0.08em] uppercase text-[11px] mb-4">
            How We Work
          </p>
          <h2 className="text-4xl font-bold text-text-primary tracking-tighter">
            The Engineering Process.
          </h2>
        </div>

        <div className="flex flex-col gap-12 relative border-l-2 border-border-section ml-6 pl-8">
          {steps.map((step) => (
            <div key={step.id} className="relative group">
              {/* Step Node */}
              <div className="absolute -left-[3.75rem] w-14 h-14 rounded-full bg-card border-4 border-surface ring-2 ring-border-subtle flex items-center justify-center group-hover:ring-accent-light group-hover:bg-accent-light/10 transition-all duration-300">
                <span className="text-text-disabled group-hover:text-text-primary font-mono font-bold transition-colors text-sm">
                  {step.id}
                </span>
              </div>

              {/* Content */}
              <div className="bg-card p-6 rounded-[12px] border border-border-subtle group-hover:bg-card-hover group-hover:border-[#6c63ff44] transition-all duration-300">
                <h3 className="text-2xl font-bold text-text-primary mb-3">{step.title}</h3>
                <p className="text-text-body leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout (Horizontal Scroll) */}
      <div ref={targetRef} className="hidden md:block relative h-[400vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

          <div className="container mx-auto px-6 md:px-12 mb-12 absolute top-32 left-0 right-0 z-20">
            <p className="text-text-muted font-semibold tracking-[0.08em] uppercase text-[11px] mb-4">
              How We Work
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-text-primary tracking-tighter">
              The Engineering Process.
            </h2>
          </div>

          <motion.div style={{ x }} className="flex gap-12 md:gap-24 px-6 md:px-[10vw] pt-32 w-[max-content]">
            {steps.map((step, i) => (
              <div key={step.id} className="relative w-[80vw] md:w-[40vw] lg:w-[30vw] flex-shrink-0 group">

                {/* Process Line */}
                <div className="absolute top-8 left-0 right-[-3rem] md:right-[-6rem] h-[2px] bg-border-section -z-10">
                  <div className="h-full bg-accent w-0 group-hover:w-full transition-all duration-700 ease-out" />
                </div>

                {/* Step Node */}
                <div className="w-16 h-16 rounded-full bg-card border-4 border-surface ring-2 ring-border-subtle flex items-center justify-center mb-12 group-hover:ring-accent-light group-hover:bg-accent-light/10 transition-all duration-300">
                  <span className="text-text-disabled group-hover:text-text-primary font-mono font-bold transition-colors">
                    {step.id}
                  </span>
                </div>

                {/* Content */}
                <div className="bg-card p-8 rounded-[12px] border border-border-subtle group-hover:bg-card-hover group-hover:border-[#6c63ff44] transition-all duration-300">
                  <h3 className="text-3xl font-bold text-text-primary mb-4">{step.title}</h3>
                  <p className="text-text-body text-lg leading-relaxed">{step.desc}</p>
                </div>

              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

