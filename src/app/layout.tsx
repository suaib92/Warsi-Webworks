import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://warsi-webworks.vercel.app"),
  title: "Warsi WebWorks | Premium Digital Engineering Studio in Moradabad",
  description: "Warsi WebWorks is a premium digital engineering studio. We build world-class websites, ecommerce stores, and mobile apps for modern brands in Moradabad.",
  keywords: ["Website Development Company Moradabad", "Web Designer Moradabad", "Mobile App Development Moradabad", "SEO Services Moradabad", "Ecommerce Development Moradabad", "MERN Stack Development", "React Development"],
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Warsi WebWorks | Premium Digital Engineering Studio",
    description: "Building Digital Experiences That Grow Businesses. Expert Website & Mobile App Development in Moradabad.",
    url: "https://warsi-webworks.vercel.app",
    siteName: "Warsi WebWorks",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Warsi WebWorks - Premium Digital Engineering Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Warsi WebWorks | Digital Engineering Studio",
    description: "Building Digital Experiences That Grow Businesses.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
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
      "hasMap": "https://maps.google.com/?q=Moradabad,+Uttar+Pradesh,+India",
      "priceRange": "$$$",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      ],
      "sameAs": [
        "https://warsi-webworks.vercel.app",
        "https://github.com/suaibwarsi",
        "https://linkedin.com/company/warsiwebworks"
      ]
    },
    {
      "@type": "WebSite",
      "name": "Warsi WebWorks",
      "url": "https://warsi-webworks.vercel.app",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://warsi-webworks.vercel.app/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Service",
      "serviceType": "Website Development Company",
      "provider": { "@id": "https://warsi-webworks.vercel.app" },
      "areaServed": [
        { "@type": "City", "name": "Moradabad" },
        { "@type": "State", "name": "Uttar Pradesh" },
        { "@type": "Country", "name": "India" }
      ],
      "description": "High-performance digital platforms engineered for conversion. We build robust, scalable architectures that load instantly."
    },
    {
      "@type": "Service",
      "serviceType": "Ecommerce Development",
      "provider": { "@id": "https://warsi-webworks.vercel.app" },
      "areaServed": [
        { "@type": "City", "name": "Moradabad" },
        { "@type": "State", "name": "Uttar Pradesh" },
        { "@type": "Country", "name": "India" }
      ],
      "description": "Immersive shopping experiences. From custom storefronts to complex inventory systems."
    },
    {
      "@type": "Service",
      "serviceType": "Mobile App Development",
      "provider": { "@id": "https://warsi-webworks.vercel.app" },
      "areaServed": [
        { "@type": "City", "name": "Moradabad" },
        { "@type": "State", "name": "Uttar Pradesh" },
        { "@type": "Country", "name": "India" }
      ],
      "description": "Native-feeling cross-platform applications built with React Native."
    },
    {
      "@type": "Service",
      "serviceType": "SEO Services",
      "provider": { "@id": "https://warsi-webworks.vercel.app" },
      "areaServed": [
        { "@type": "City", "name": "Moradabad" },
        { "@type": "State", "name": "Uttar Pradesh" },
        { "@type": "Country", "name": "India" }
      ],
      "description": "Data-driven growth through technical excellence and semantic architecture."
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-base text-text-body overflow-x-hidden selection:bg-accent/30">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-white focus:px-6 focus:py-3 focus:rounded-[8px] focus:font-bold">
          Skip to main content
        </a>
        <SmoothScrollProvider>
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </SmoothScrollProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-601WQMTRGQ" />
        <script dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-601WQMTRGQ');`
        }} />
      </body>
    </html>
  );
}
