import type { Metadata } from "next";
import { MapPin, Phone, Mail } from "lucide-react";
import SimpleContactForm from "@/components/forms/SimpleContactForm";

export const metadata: Metadata = {
  title: "Contact Warsi WebWorks | Web Development Agency in Moradabad",
  description: "Get in touch with Warsi WebWorks in Moradabad, UP. Request a quote for website design, Ecommerce, or mobile app development.",
  alternates: {
    canonical: "https://warsi-webworks.vercel.app/contact",
  },
};

export default function ContactPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Warsi WebWorks | Web Development Agency in Moradabad",
      "description": "Get in touch with Warsi WebWorks in Moradabad, UP. Request a quote for website design, Ecommerce, or mobile app development.",
      "url": "https://warsi-webworks.vercel.app/contact"
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Warsi WebWorks",
      "image": "https://warsi-webworks.vercel.app/og-image.png",
      "@id": "https://warsi-webworks.vercel.app",
      "url": "https://warsi-webworks.vercel.app",
      "telephone": "+917078719621",
      "email": "suaib8211@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Moradabad",
        "addressLocality": "Moradabad",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "244001",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "28.8378",
        "longitude": "78.7826"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      ]
    }
  ];

  return (
    <main className="pt-32 pb-20 bg-base min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-text-muted font-semibold tracking-[0.08em] uppercase text-[11px] mb-4">Contact Us</p>
          <h1 className="text-5xl md:text-7xl font-bold text-text-primary tracking-tighter mb-6 leading-tight">
            Contact Our Expert Web Developers in Moradabad.
          </h1>
          <p className="text-xl text-text-body leading-relaxed">
            Ready to start your next digital project? Visit our Moradabad office or reach out to us directly. We respond to all inquiries within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left: Contact Info & Form Placeholder */}
          <div>
            <h2 className="text-3xl font-bold text-text-primary mb-8">Let's Discuss Your Next Project</h2>
            
            <div className="flex flex-col gap-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary mb-1">Visit Our Moradabad Office</h3>
                  <p className="text-text-body leading-relaxed">
                    Moradabad, Uttar Pradesh<br />
                    India 244001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary mb-1">Call Us</h3>
                  <a href="tel:+917078719621" className="text-text-body hover:text-accent transition-colors">
                    +91 7078719621
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary mb-1">Email Us</h3>
                  <a href="mailto:suaib8211@gmail.com" className="text-text-body hover:text-accent transition-colors">
                    suaib8211@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Simple Contact Form */}
            <SimpleContactForm />
          </div>

          {/* Right: Map */}
          <div className="h-full min-h-[500px] lg:min-h-full rounded-[12px] overflow-hidden border border-border-subtle">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112174.63323108232!2d78.68067446756823!3d28.84097326983111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390afb0f8a4c7b2d%3A0x8a8c5c5e5f5e5f5e!2sMoradabad%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.5)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Warsi WebWorks location - Moradabad"
              aria-label="Interactive map showing Warsi WebWorks office location in Moradabad"
            />
          </div>

        </div>
      </div>
    </main>
  );
}
