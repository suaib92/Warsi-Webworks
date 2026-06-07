"use client";
import Link from "next/link";
import Image from "next/image";
import { Globe, MessageCircle, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border-section pt-16 pb-8 text-text-primary">
      <div className="container mx-auto px-4 md:px-6" suppressHydrationWarning>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12" suppressHydrationWarning>
          {/* Brand */}
          <div suppressHydrationWarning>
            <Link href="/" className="flex items-center mb-6 group">
              <div className="relative w-64 h-16 overflow-visible flex-shrink-0">
                <Image src="/images/logo.png" alt="Warsi WebWorks Logo" fill className="object-contain object-left scale-[2.5] origin-left" />
              </div>
            </Link>
            <p className="text-text-body mb-6">
              Premium agency building websites, apps, and digital experiences that grow businesses and establish trust.
            </p>
            <div className="flex items-center gap-4" suppressHydrationWarning>
              <Link href="https://warsiwebworks.com" aria-label="Visit Warsi WebWorks Official Website" className="w-10 h-10 rounded-full bg-card border border-border-subtle flex items-center justify-center text-text-body hover:text-accent-light hover:border-accent-light transition-colors">
                <Globe size={18} aria-hidden="true" />
              </Link>
              <Link href="https://share.google/6P3GYqa1EtX0ml1Sf" target="_blank" rel="noopener noreferrer" aria-label="View our Google Business Profile" className="w-10 h-10 rounded-full bg-card border border-border-subtle flex items-center justify-center text-text-body hover:text-accent-light hover:border-accent-light transition-colors">
                <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
              </Link>
              <Link href="https://wa.me/917078719621" aria-label="Chat with Warsi WebWorks on WhatsApp" className="w-10 h-10 rounded-full bg-card border border-border-subtle flex items-center justify-center text-text-body hover:text-accent-light hover:border-accent-light transition-colors">
                <MessageCircle size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-text-primary">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services/website-development-moradabad" className="text-text-body hover:text-accent-light transition-colors">Website Development</Link>
              </li>
              <li>
                <Link href="/services/ecommerce-development-moradabad" className="text-text-body hover:text-accent-light transition-colors">Ecommerce Solutions</Link>
              </li>
              <li>
                <Link href="/services/react-development-moradabad" className="text-text-body hover:text-accent-light transition-colors">React Development</Link>
              </li>
              <li>
                <Link href="/services/nextjs-development-moradabad" className="text-text-body hover:text-accent-light transition-colors">Next.js Development</Link>
              </li>
              <li>
                <Link href="/services/mobile-app-development-moradabad" className="text-text-body hover:text-accent-light transition-colors">Mobile App Development</Link>
              </li>
              <li>
                <Link href="/services/seo-services-moradabad" className="text-text-body hover:text-accent-light transition-colors">SEO Services</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-text-primary">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/portfolio" className="text-text-body hover:text-accent-light transition-colors">Portfolio</Link>
              </li>
              <li>
                <Link href="/#process" className="text-text-body hover:text-accent-light transition-colors">Our Process</Link>
              </li>
              <li>
                <Link href="/about" className="text-text-body hover:text-accent-light transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/blog" className="text-text-body hover:text-accent-light transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/#contact" className="text-text-body hover:text-accent-light transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Free Tools */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-text-primary">Free Tools</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/tools" className="text-text-body hover:text-accent-light transition-colors">All Tools Hub</Link>
              </li>
              <li>
                <Link href="/tools/website-cost-calculator" className="text-text-body hover:text-accent-light transition-colors">Website Cost Calculator</Link>
              </li>
              <li>
                <Link href="/tools/business-name-generator" className="text-text-body hover:text-accent-light transition-colors">Business Name Generator</Link>
              </li>
              <li>
                <Link href="/tools/qr-code-generator" className="text-text-body hover:text-accent-light transition-colors">QR Code Generator</Link>
              </li>
              <li>
                <Link href="/tools/salary-calculator" className="text-text-body hover:text-accent-light transition-colors">Salary Calculator</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-text-primary">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-text-body">
                <MapPin className="w-5 h-5 text-accent-light shrink-0 mt-0.5" aria-hidden="true" />
                <span>Moradabad, Uttar Pradesh, India</span>
              </li>
              <li className="flex items-center gap-3 text-text-body">
                <Phone className="w-5 h-5 text-accent-light shrink-0" aria-hidden="true" />
                <a href="tel:+917078719621" className="hover:text-accent-light transition-colors" aria-label="Call Warsi WebWorks at +91 70787 19621">+91 70787 19621</a>
              </li>
              <li className="flex items-center gap-3 text-text-body">
                <Mail className="w-5 h-5 text-accent-light shrink-0" aria-hidden="true" />
                <a href="mailto:hello@warsiwebworks.com" className="hover:text-accent-light transition-colors" aria-label="Email Warsi WebWorks at hello@warsiwebworks.com">hello@warsiwebworks.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Local SEO Targets */}
        <div className="border-t border-border-section pt-8 mb-8" suppressHydrationWarning>
          <div className="text-xs text-text-body leading-relaxed max-w-4xl">
            <p className="font-bold text-sm text-text-primary mb-2">Premium Website Development & Digital Services in UP</p>
            <p>
              Partner with the leading <strong>Website Developer</strong> and <strong>Web Design Company</strong>. Specializing in high-performance <strong>Ecommerce Website Development</strong>, <strong>React</strong>, <strong>Next.js</strong>, and custom <strong>Mobile App Development</strong>. We proudly serve businesses in <Link href="/" className="font-bold hover:text-accent transition-colors">Moradabad</Link>, <Link href="/locations/rampur" className="font-bold hover:text-accent transition-colors">Rampur</Link>, <Link href="/locations/sambhal" className="font-bold hover:text-accent transition-colors">Sambhal</Link>, <Link href="/locations/amroha" className="font-bold hover:text-accent transition-colors">Amroha</Link>, <Link href="/locations/bijnor" className="font-bold hover:text-accent transition-colors">Bijnor</Link>, <Link href="/locations/kashipur" className="font-bold hover:text-accent transition-colors">Kashipur</Link>, <Link href="/locations/rudrapur" className="font-bold hover:text-accent transition-colors">Rudrapur</Link>, <Link href="/locations/bareilly" className="font-bold hover:text-accent transition-colors">Bareilly</Link>, <Link href="/locations/haldwani" className="font-bold hover:text-accent transition-colors">Haldwani</Link>, <Link href="/locations/gajraula" className="font-bold hover:text-accent transition-colors">Gajraula</Link>, <Link href="/locations/chandausi" className="font-bold hover:text-accent transition-colors">Chandausi</Link>, <Link href="/locations/bilari" className="font-bold hover:text-accent transition-colors">Bilari</Link>, <Link href="/locations/thakurdwara" className="font-bold hover:text-accent transition-colors">Thakurdwara</Link>, <Link href="/locations/joya" className="font-bold hover:text-accent transition-colors">Joya</Link>, and <Link href="/locations/hasanpur" className="font-bold hover:text-accent transition-colors">Hasanpur</Link>.
            </p>
          </div>
        </div>

        {/* Industry SEO Targets */}
        <div className="border-t border-border-section pt-8 mb-8" suppressHydrationWarning>
          <div className="text-xs text-text-body leading-relaxed max-w-4xl">
            <p className="font-bold text-sm text-text-primary mb-2">Industries We Empower</p>
            <p>
              We engineer specialized B2B and B2C digital platforms for various sectors. Explore our industry-specific solutions for: <Link href="/website-development-for-manufacturers" className="font-bold hover:text-accent transition-colors">Manufacturers</Link>, <Link href="/website-development-for-doctors" className="font-bold hover:text-accent transition-colors">Doctors & Healthcare</Link>, <Link href="/website-development-for-schools" className="font-bold hover:text-accent transition-colors">Schools & Education</Link>, <Link href="/website-development-for-brass-industry" className="font-bold hover:text-accent transition-colors">Brass Export Industry</Link>, <Link href="/website-development-for-real-estate" className="font-bold hover:text-accent transition-colors">Real Estate & Construction</Link>, and <Link href="/website-development-for-startups" className="font-bold hover:text-accent transition-colors">Tech Startups</Link>. We also offer dedicated <Link href="/ecommerce-for-manufacturers" className="font-bold hover:text-accent transition-colors">Ecommerce integration</Link> and programmatic <Link href="/seo-services-for-manufacturers" className="font-bold hover:text-accent transition-colors">SEO scale</Link> for every sector.
            </p>
          </div>
        </div>

        <div className="border-t border-border-section pt-8 flex flex-col md:flex-row items-center justify-between gap-4" suppressHydrationWarning>
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} Warsi WebWorks. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-text-muted" suppressHydrationWarning>
            <Link href="/privacy-policy" className="hover:text-accent-light transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-accent-light transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
