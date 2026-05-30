"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, Star, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const HeroSceneWrapper = dynamic(() => import("@/components/3d/HeroSceneWrapper"), {
  ssr: false,
  loading: () => <div className="w-full h-full rounded-full bg-accent/5 animate-pulse blur-3xl mx-auto" />,
});

export default function Hero() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop(); // Check immediately on client mount
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-base pt-24 lg:pt-0">
      
      {/* Mobile/Tablet Fallback: Absolute ambient CSS glows behind content */}
      <div className="absolute inset-0 lg:hidden -z-10 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-base to-base" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[90vh]">
          
          {/* Left Column: Massive Cinematic Typography & Trust Elements */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left order-2 lg:order-1 relative z-20">
            
            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <div className="flex items-center gap-2 bg-card border border-border-subtle rounded-full px-4 py-2 hover:bg-card-hover transition-colors">
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-accent-light text-accent-light" />
                  ))}
                </div>
                <span className="text-sm font-medium text-text-primary">5.0 Google Rating</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-card border border-border-subtle rounded-full px-4 py-2 hover:bg-card-hover transition-colors">
                <span className="text-sm font-medium text-text-primary">50+ Clients Worldwide</span>
              </div>
              <div className="flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-accent-light animate-pulse" />
                <span className="text-xs font-bold text-accent-light uppercase tracking-wider">Website Development Company Moradabad</span>
              </div>
            </motion.div>
            
            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-[clamp(36px,5vw,64px)] font-black tracking-tighter leading-[1.2] text-text-primary uppercase">
                WEBSITES THAT TURN<br />
                <span className="text-text-muted">
                  VISITORS INTO CUSTOMERS
                </span>
              </h1>
            </motion.div>
            
            {/* Subheadline (H2 for SEO) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8"
            >
              <h2 className="text-[18px] md:text-[24px] text-text-body font-medium tracking-tight max-w-2xl leading-[1.7]">
                <strong className="text-text-primary font-bold">Premium Website Development Company in Moradabad.</strong> Engineering high-performance digital solutions that rank, convert, and scale.
              </h2>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-12"
            >
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold bg-accent hover:bg-accent-hover text-white rounded-[8px] border-none transition-all duration-300 group">
                Book Free Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold border-border-subtle text-text-primary bg-transparent hover:bg-card hover:border-accent hover:text-accent-light rounded-[8px] transition-all duration-300 group">
                View Work
                <ArrowRight className="ml-2 w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Button>
            </motion.div>

            {/* Trust Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-border-subtle w-full max-w-2xl"
            >
              <div>
                <h4 className="text-3xl font-black text-text-primary mb-1">5.0</h4>
                <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Google Reviews</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-text-primary mb-1">50+</h4>
                <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Projects Delivered</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-text-primary mb-1">6+</h4>
                <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Years Experience</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-text-primary mb-1">&lt;1h</h4>
                <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Response Time</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: The Cortex — Premium 3D sculpture */}
          <div
            className="hidden lg:flex lg:col-span-5 h-[700px] xl:h-[820px] w-full relative order-1 lg:order-2 items-center justify-center"
            style={{ overflow: "visible" }}
          >
            <div className="absolute inset-0 pointer-events-auto">
              {isDesktop && <HeroSceneWrapper />}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
