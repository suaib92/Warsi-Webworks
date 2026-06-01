import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://warsi-webworks.vercel.app'
  const cities = [
    "rampur", "sambhal", "amroha", "bijnor", "kashipur", 
    "rudrapur", "bareilly", "haldwani", "gajraula", "chandausi", 
    "bilari", "thakurdwara", "joya", "hasanpur"
  ];

  const baseServices = [
    "website-development", 
    "ecommerce-development", 
    "react-development", 
    "nextjs-development", 
    "mobile-app-development", 
    "seo-services"
  ];

  const allCities = [
    "moradabad", ...cities
  ];

  const locationUrls: MetadataRoute.Sitemap = cities.map(city => ({
    url: `${base}/locations/${city}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const serviceUrls: MetadataRoute.Sitemap = [];
  baseServices.forEach(service => {
    allCities.forEach(city => {
      serviceUrls.push({
        url: `${base}/services/${service}-${city}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/tools`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...[
      "website-cost-calculator",
      "salary-calculator",
      "qr-code-generator",
      "invoice-generator",
      "business-name-generator",
      "json-formatter",
      "word-counter",
      "css-gradient-generator",
      "resume-builder",
      "cover-letter-generator"
    ].map(tool => ({
      url: `${base}/tools/${tool}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...serviceUrls,
    {
      url: `${base}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/portfolio/aura-commerce`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${base}/portfolio/fintech-core`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${base}/portfolio/nexus-health`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...locationUrls,
    {
      url: `${base}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${base}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
