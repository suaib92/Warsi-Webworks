/**
 * Contextual Internal Linking Engine
 * Automatically scans HTML content and injects SEO backlinks to money pages.
 */

interface LinkRule {
  keyword: string | RegExp;
  url: string;
  exactMatch?: boolean; // If true, requires word boundaries
}

const LINK_RULES: LinkRule[] = [
  // Locations
  { keyword: "Moradabad", url: "/locations/moradabad", exactMatch: true },
  { keyword: "Rampur", url: "/locations/rampur", exactMatch: true },
  { keyword: "Bareilly", url: "/locations/bareilly", exactMatch: true },
  { keyword: "Uttar Pradesh", url: "/locations/moradabad", exactMatch: true },
  { keyword: "UP", url: "/locations/moradabad", exactMatch: true },

  // Services
  { keyword: /website development/i, url: "/services/website-development-moradabad" },
  { keyword: /ecommerce/i, url: "/services/ecommerce-development-moradabad" },
  { keyword: /Next\.js/i, url: "/services/nextjs-development-moradabad" },
  { keyword: /React/i, url: "/services/react-development-moradabad", exactMatch: true },
  { keyword: /SEO/i, url: "/services/seo-services-moradabad", exactMatch: true },

  // Industries
  { keyword: /B2B Manufacturers/i, url: "/website-development-for-manufacturers" },
  { keyword: /Healthcare/i, url: "/website-development-for-doctors" },
  { keyword: /Clinics/i, url: "/website-development-for-doctors" },
  { keyword: /Real Estate/i, url: "/website-development-for-real-estate" },
  { keyword: /Startups/i, url: "/website-development-for-startups" },
];

export function applyInternalLinks(htmlContent: string): string {
  let processedContent = htmlContent;

  // Track which URLs we've already linked to so we don't spam the same link 10 times in one article
  const appliedUrls = new Set<string>();

  LINK_RULES.forEach((rule) => {
    if (appliedUrls.has(rule.url)) return; // Only one link per target URL per article

    let regexPattern: string;

    if (rule.keyword instanceof RegExp) {
      // Extract the source string of the regex
      regexPattern = rule.keyword.source;
    } else {
      // Escape string for regex
      regexPattern = rule.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    if (rule.exactMatch || typeof rule.keyword === 'string') {
      regexPattern = `\\b(${regexPattern})\\b`;
    } else {
      regexPattern = `(${regexPattern})`;
    }

    // Negative lookahead (?![^<]*>) ensures we DO NOT match text inside existing HTML tags (like <a href="..."> or <img alt="...">)
    // Negative lookbehind (?<!<a[^>]*>[^<]*) ensures we don't match text inside an ALREADY EXISTING <a> tag.
    // Note: JS Safari doesn't support complex lookbehinds, but since this is rendered server-side in Node.js (Next.js), it works perfectly.
    const regex = new RegExp(`(?<!<a[^>]*>[^<]*)${regexPattern}(?![^<]*>)`, 'i');

    const match = processedContent.match(regex);
    if (match) {
      // Replace the FIRST occurrence only
      processedContent = processedContent.replace(
        regex,
        `<a href="${rule.url}" class="text-accent font-bold hover:underline" title="$1 services">$1</a>`
      );
      appliedUrls.add(rule.url);
    }
  });

  return processedContent;
}
