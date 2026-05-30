"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const getInitials = (name: string) => {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
};

const testimonials = [
  {
    id: 1,
    name: "Aman Gupta",
    role: "Founder, Moradabad Brass Exports",
    content: "Warsi WebWorks completely transformed our B2B export business. Their Next.js implementation made our global catalog lightning fast, and we saw a 40% increase in international inquiries.",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=150",
    rating: 5
  },
  {
    id: 2,
    name: "Rizwan Ali",
    role: "CEO, Rampur Retail Hub",
    content: "The ecommerce store they built on headless Shopify is a masterpiece. The mobile experience is seamless, and their UI/UX design is truly premium. Best developers in UP.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    rating: 5
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Marketing Director, Bareilly MedTech",
    content: "Their local SEO strategies put us on the map across the entire 100km radius. We are now ranking #1 for our main healthcare keywords and receiving daily high-quality leads.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    rating: 5
  },
  {
    id: 4,
    name: "Tariq Khan",
    role: "CTO, FinApp India",
    content: "The React Native app they delivered was flawless. It performs like a truly native app and the React codebase is incredibly clean and maintainable. A world-class team.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    rating: 5
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Director, Singh Builders & Co",
    content: "We needed a corporate website that reflected our 20-year legacy while looking modern. Warsi WebWorks delivered exactly that, and their SEO work got us ranking for local commercial projects within weeks.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150",
    rating: 5
  },
  {
    id: 6,
    name: "Sana Ansari",
    role: "Founder, Moradabad Artisans",
    content: "Selling authentic brass handicrafts globally required a flawless ecommerce experience. Their UI/UX design is unmatched, and our international conversion rate has literally doubled.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
    rating: 5
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <section id="testimonials" className="py-24 bg-surface border-y border-border-section overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-12 text-center">
        <motion.h2 
          className="text-3xl md:text-5xl font-bold text-text-primary tracking-tighter mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Client <span className="text-accent">Success Stories</span>
        </motion.h2>
        <motion.p 
          className="text-text-body text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Don&apos;t just take our word for it. Hear from the founders and leaders across Uttar Pradesh who trust our engineering.
        </motion.p>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

        <motion.div 
          ref={containerRef}
          className="flex cursor-grab active:cursor-grabbing gap-6 px-4"
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
        >
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              className="min-w-[300px] md:min-w-[400px]"
              whileHover={{ scale: isDragging ? 1 : 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-card border border-border-subtle rounded-[16px] h-full p-8 relative shadow-sm">
                <Quote className="absolute top-6 right-6 w-12 h-12 text-accent/10" />
                
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                
                <p className="text-text-primary text-lg mb-8 leading-relaxed font-medium">
                  &quot;{testimonial.content}&quot;
                </p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-accent/10 border-2 border-accent/20 flex items-center justify-center text-accent font-bold text-lg">
                    {getInitials(testimonial.name)}
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary">{testimonial.name}</h3>
                    <p className="text-sm text-text-body">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-8 text-sm text-text-muted">
          &larr; Drag to scroll &rarr;
        </div>
      </div>
    </section>
  );
}
