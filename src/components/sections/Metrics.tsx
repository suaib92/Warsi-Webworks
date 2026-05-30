"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const metrics = [
  { label: "Projects Delivered", value: 150, suffix: "+" },
  { label: "Client Satisfaction", value: 99, suffix: "%" },
  { label: "Performance Score", value: 100, suffix: "/100" },
  { label: "Support Availability", value: 24, suffix: "/7" }
];

function Counter({ value, suffix }: { value: number, suffix: string }) {
  return (
    <div className="text-5xl md:text-7xl font-bold text-primary mb-2 drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]">
      {value}{suffix}
    </div>
  );
}

export default function Metrics() {
  return (
    <section className="py-24 bg-card/20 border-y border-border/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5 mix-blend-overlay" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Choose <span className="text-primary">Us</span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            We let our results speak for themselves. Partner with an agency that delivers excellence consistently.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
          {metrics.map((metric, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Counter value={metric.value} suffix={metric.suffix} />
              <div className="text-sm md:text-lg font-medium text-muted-foreground uppercase tracking-wider">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
