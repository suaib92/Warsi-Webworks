/* eslint-disable */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Tools", href: "/tools" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <>
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? "bg-base/85 backdrop-blur-xl border-b border-border-section shadow-sm"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center z-50 group flex-shrink-0">
          <div className="relative w-28 h-9 sm:w-36 sm:h-11 md:w-48 md:h-14 overflow-visible">
            <Image src="/images/logo.png" alt="Warsi WebWorks Logo" fill className="object-contain object-left scale-[1.8] sm:scale-[2] md:scale-[2.5] origin-left" priority />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-text-body hover:text-accent-light transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="default" className="bg-accent hover:bg-accent-hover text-white border-none shadow-none text-[14px] font-bold rounded-[8px] px-6 h-10 transition-all duration-300">
            Book Consultation
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50 text-text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav will be moved outside to prevent transform constraint */}
      </div>
    </motion.header>

    {/* Mobile Nav */}
    <AnimatePresence>
      {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-base/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-10 z-40"
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <Link
                  href={link.href}
                  className="text-4xl sm:text-5xl font-black tracking-tighter text-text-primary hover:text-accent transition-colors py-2 block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 w-full px-8 flex justify-center"
            >
              <Button size="lg" className="w-full max-w-[300px] h-14 bg-accent hover:bg-accent-hover text-white border-none shadow-[0_0_20px_rgba(var(--accent),0.3)] text-[16px] font-bold rounded-[12px]" onClick={() => setMobileMenuOpen(false)}>
                Book Consultation
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

