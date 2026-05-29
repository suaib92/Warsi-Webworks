"use client";

import { motion } from "framer-motion";
import { 
  Code2, 
  Layers, 
  Server, 
  Database, 
  Smartphone, 
  Palette, 
  LayoutTemplate, 
  ShoppingCart, 
  Box, 
  Sparkles 
} from "lucide-react";

const technologies = [
  { name: "React", icon: <Code2 className="w-6 h-6" /> },
  { name: "Next.js", icon: <Layers className="w-6 h-6" /> },
  { name: "Node.js", icon: <Server className="w-6 h-6" /> },
  { name: "MongoDB", icon: <Database className="w-6 h-6" /> },
  { name: "React Native", icon: <Smartphone className="w-6 h-6" /> },
  { name: "Tailwind", icon: <Palette className="w-6 h-6" /> },
  { name: "WordPress", icon: <LayoutTemplate className="w-6 h-6" /> },
  { name: "Shopify", icon: <ShoppingCart className="w-6 h-6" /> },
  { name: "Three.js", icon: <Box className="w-6 h-6" /> },
  { name: "Framer Motion", icon: <Sparkles className="w-6 h-6" /> }
];

export default function TechStack() {
  return (
    <section className="bg-base py-32 overflow-hidden relative">

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-text-muted font-semibold tracking-[0.08em] uppercase text-[11px] mb-4"
        >
          Our Arsenal
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-text-primary tracking-tighter mb-20"
        >
          Enterprise Technologies.
        </motion.h2>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
          className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-5xl mx-auto"
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech.name}
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 20 },
                show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
              }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative cursor-pointer"
            >
              <div className="relative flex items-center gap-3 px-6 py-4 bg-card border border-border-subtle rounded-[12px] group-hover:bg-card-hover group-hover:border-[#6c63ff44] transition-all duration-300">
                <span className="text-2xl grayscale group-hover:grayscale-0 transition-all duration-300">{tech.icon}</span>
                <span className="text-text-body group-hover:text-accent-light font-semibold transition-colors duration-300">
                  {tech.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
