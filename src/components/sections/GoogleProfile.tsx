/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import { Star, MapPin, ExternalLink } from "lucide-react";

const reviews = [
  {
    author: "Rahul S.",
    role: "Founder, TechCorp",
    content: "Warsi WebWorks delivered our SaaS platform 3 weeks ahead of schedule. The code quality and attention to detail is unmatched in Moradabad.",
    rating: 5
  },
  {
    author: "Amit K.",
    role: "Director, RetailPlus",
    content: "Our ecommerce conversions doubled within a month of launching the new site they built. Absolute professionals.",
    rating: 5
  },
  {
    author: "Priya M.",
    role: "Marketing Head",
    content: "The SEO architecture they implemented put us on the first page of Google in just 60 days. Highly recommended.",
    rating: 5
  }
];

export default function GoogleProfile() {
  return (
    <section className="bg-base py-32 border-t border-border-section relative overflow-hidden">

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-text-muted font-semibold tracking-[0.08em] uppercase text-[11px] mb-4"
          >
            Social Proof
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-text-primary tracking-tighter"
          >
            Client Testimonials & Results.
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Map & Location */}
          <div className="lg:col-span-5 flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border-subtle rounded-[12px] p-8 relative overflow-hidden group hover:bg-card-hover hover:border-[#6c63ff44] transition-all"
            >
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-6 h-6 text-accent-light" />
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center p-3">
                  <svg viewBox="0 0 24 24" className="w-full h-full"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary">Warsi WebWorks</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xl font-bold text-white">5.0</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-accent-light text-accent-light" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-48 rounded-[8px] mb-6 overflow-hidden border border-border-subtle">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112174.63323108232!2d78.68067446756823!3d28.84097326983111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390afb0f8a4c7b2d%3A0x8a8c5c5e5f5e5f5e!2sMoradabad%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.5)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Warsi WebWorks location - Moradabad"
                />
              </div>

              <p className="text-text-body flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-accent-light" />
                <span>Premium Digital Engineering Studio<br/>Moradabad, Uttar Pradesh, India</span>
              </p>
            </motion.div>
          </div>

          {/* Right: Reviews */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {reviews.map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="bg-card border border-border-subtle p-8 rounded-[12px] hover:bg-card-hover hover:border-[#6c63ff44] transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-accent-light text-accent-light" />
                  ))}
                </div>
                <p className="text-xl text-text-primary font-medium leading-relaxed mb-6">
                  "{review.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-surface border border-border-subtle rounded-full flex items-center justify-center text-text-muted font-bold text-lg">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-text-primary font-bold">{review.author}</h4>
                    <p className="text-text-body text-sm">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

