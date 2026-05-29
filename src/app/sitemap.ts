import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://warsiwebworks.com'
  const cities = [
    "rampur", "sambhal", "amroha", "bijnor", "kashipur", 
    "rudrapur", "bareilly", "haldwani", "gajraula", "chandausi", 
    "bilari", "thakurdwara", "joya", "hasanpur"
  ];

  const services = [
    "website-development-moradabad", 
    "ecommerce-development-moradabad", 
    "react-development-moradabad", 
    "nextjs-development-moradabad", 
    "mobile-app-development-moradabad", 
    "seo-services-moradabad"
  ];

  const locationUrls: MetadataRoute.Sitemap = cities.map(city => ({
    url: `${base}/locations/${city}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const serviceUrls: MetadataRoute.Sitemap = services.map(service => ({
    url: `${base}/services/${service}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

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
