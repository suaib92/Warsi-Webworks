import Script from 'next/script';

export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Warsi WebWorks",
    "url": "https://warsiwebworks.com",
    "logo": "https://warsiwebworks.com/icon.png",
    "sameAs": [
      "https://www.linkedin.com/in/mohd-suaib-warsi/"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-70787-19621",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": "English"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Warsi WebWorks",
    "url": "https://warsiwebworks.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://warsiwebworks.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Warsi WebWorks",
    "image": "https://warsiwebworks.com/og-image.png",
    "@id": "https://warsiwebworks.com",
    "url": "https://warsiwebworks.com",
    "telephone": "+917078719621",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Moradabad",
      "addressRegion": "UP",
      "postalCode": "244001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.8386,
      "longitude": 78.7733
    },
    "areaServed": [
      "Moradabad", "Rampur", "Sambhal", "Amroha", "Bareilly", "Bijnor", "Haldwani", "Rudrapur", "Kashipur"
    ]
  };

  return (
    <>
      <Script
        id="schema-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="schema-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        strategy="afterInteractive"
      />
    </>
  );
}
