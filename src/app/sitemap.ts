import type { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://warsiwebworks.com'
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
    "seo-services",
    "shopify-development",
    "wordpress-development"
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
    ...[
      "website-development-for-manufacturers",
      "website-development-for-doctors",
      "website-development-for-schools",
      "website-development-for-brass-industry",
      "website-development-for-real-estate",
      "website-development-for-startups",
      "ecommerce-for-manufacturers",
      "seo-services-for-manufacturers"
    ].map(route => ({
      url: `${base}/${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${base}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...Array.from(new Set(blogPosts.map(post => post.category.toLowerCase()))).map(category => ({
      url: `${base}/blog/category/${category}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...blogPosts.map(post => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
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
