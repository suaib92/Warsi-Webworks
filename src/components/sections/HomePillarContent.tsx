import Link from 'next/link';

export default function HomePillarContent() {
  return (
    <section className="py-24 bg-surface/30 border-t border-b border-border-subtle">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight mb-6">
            The Ultimate Guide to Enterprise Digital Transformation
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
            A comprehensive executive briefing on how high-performance web architecture, Headless Commerce, and Technical SEO drive measurable business growth in the modern economy.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Table of Contents - Sticky Sidebar */}
          <div className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-32 bg-card border border-border-subtle p-6 rounded-xl">
              <h3 className="font-bold text-text-primary text-lg mb-4 uppercase tracking-wider">Executive Summary</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#digital-liability" className="text-text-muted hover:text-accent transition-colors">1. The Digital Liability Problem</a></li>
                <li><a href="#headless-architecture" className="text-text-muted hover:text-accent transition-colors">2. Headless Architecture Explained</a></li>
                <li><a href="#ecommerce-scale" className="text-text-muted hover:text-accent transition-colors">3. Scaling B2B & B2C Ecommerce</a></li>
                <li><a href="#technical-seo" className="text-text-muted hover:text-accent transition-colors">4. Technical SEO as Engineering</a></li>
                <li><a href="#mobile-first" className="text-text-muted hover:text-accent transition-colors">5. The Mobile-First Imperative</a></li>
                <li><a href="#roi-measurement" className="text-text-muted hover:text-accent transition-colors">6. Measuring Digital ROI</a></li>
              </ul>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-3/4 prose prose-invert prose-lg max-w-none text-text-body">
            
            {/* Section 1 */}
            <div id="digital-liability" className="scroll-mt-32 mb-16">
              <h2 className="text-3xl font-bold text-text-primary mb-6">1. The Digital Liability Problem</h2>
              <p className="leading-relaxed mb-6">
                Most businesses treat their website as an operational afterthought—a digital brochure that exists simply because having a website is a baseline requirement. They hire low-cost agencies to deploy generic WordPress templates, populate them with standard corporate jargon, and hope for the best. This approach is no longer just ineffective; it has become a massive digital liability.
              </p>
              <p className="leading-relaxed mb-6">
                When a prospective client, B2B procurement officer, or retail consumer lands on a slow, clunky website, their subconscious evaluation of your company happens in milliseconds. If a page takes four seconds to load, or if the mobile interface is difficult to navigate, the user immediately equates that technical friction with your company's operational competence. If your digital storefront is disorganized and slow, why should they trust your supply chain, your customer service, or your product quality?
              </p>
              <div className="bg-surface p-6 rounded-lg border-l-4 border-accent my-8">
                <h4 className="text-xl font-bold text-text-primary mt-0 mb-2">The Cost of Speed</h4>
                <p className="m-0 text-base">
                  Amazon's famous internal study revealed that just one second of page load delay could cost them $1.6 billion in annual sales. While your scale may differ, the principle remains identical. Friction kills conversion.
                </p>
              </div>
              <p className="leading-relaxed mb-6">
                To move from digital liability to digital asset, businesses must stop viewing web development as a design exercise and start treating it as software engineering. At Warsi WebWorks, we do not build "websites"; we engineer digital platforms that serve as your most ruthless, efficient, and tireless salesperson operating 24/7.
              </p>
            </div>

            {/* Section 2 */}
            <div id="headless-architecture" className="scroll-mt-32 mb-16">
              <h2 className="text-3xl font-bold text-text-primary mb-6">2. Headless Architecture Explained</h2>
              <p className="leading-relaxed mb-6">
                To achieve the blistering speeds required to dominate modern search algorithms and user expectations, we employ an engineering paradigm known as <strong>Headless Architecture</strong>. 
              </p>
              <p className="leading-relaxed mb-6">
                In a traditional monolithic system (like legacy Magento or standard WordPress), the "head" (the frontend design that the user interacts with) is tightly coupled with the "body" (the backend database where your content and code live). Every time a user clicks a link, the server must query the database, assemble the HTML, and send it back. Under heavy traffic, this monolithic structure buckles, causing severe latency or total server crashes.
              </p>
              <h3 className="text-2xl font-bold text-text-primary mt-8 mb-4">Decoupling for Infinite Scale</h3>
              <p className="leading-relaxed mb-6">
                Headless Architecture severs this connection. We build a highly custom, lightning-fast frontend utilizing React and Next.js. This frontend is then connected to a headless CMS (Content Management System) like Sanity or Strapi via secure APIs. 
              </p>
              <ul className="list-disc pl-6 space-y-3 mb-8">
                <li><strong>Unmatched Speed:</strong> Because Next.js pre-generates the pages into static files, they are served instantly from global Edge Networks. There is no database to query when the user hits the page.</li>
                <li><strong>Iron-Clad Security:</strong> Without a direct connection between the frontend interface and the database, traditional hacking vectors (like SQL injections) are virtually eliminated.</li>
                <li><strong>Future-Proof Flexibility:</strong> If you decide to change your backend CRM or inventory system in three years, you do not need to rebuild your website. You simply swap the API endpoint.</li>
              </ul>
              <p className="leading-relaxed mb-6">
                This is the exact architecture utilized by companies like Netflix, TikTok, and modern tech unicorns. It provides a level of technical sophistication that immediately separates your brand from competitors relying on outdated monolithic platforms.
              </p>
            </div>

            {/* Section 3 */}
            <div id="ecommerce-scale" className="scroll-mt-32 mb-16">
              <h2 className="text-3xl font-bold text-text-primary mb-6">3. Scaling B2B & B2C Ecommerce</h2>
              <p className="leading-relaxed mb-6">
                Digital commerce is arguably the most unforgiving environment on the internet. A broken form, a confusing checkout flow, or an inaccurate inventory count directly results in lost revenue. For B2C retailers, the challenge is minimizing cart abandonment. For B2B manufacturers and distributors, the challenge is digitizing wildly complex purchasing logic.
              </p>
              <h3 className="text-2xl font-bold text-text-primary mt-8 mb-4">The B2B Wholesale Portal</h3>
              <p className="leading-relaxed mb-6">
                Traditional ecommerce platforms fail spectacularly in the B2B space. B2B transactions are rarely "add to cart and pay." They involve complex negotiations. We engineer bespoke B2B wholesale portals that digitize your entire supply chain. 
              </p>
              <p className="leading-relaxed mb-6">
                When a verified distributor logs into the platform we build, the Next.js frontend dynamically re-renders to display their specific, negotiated pricing matrix. We implement sophisticated Request for Quote (RFQ) workflows, allowing buyers to configure custom manufacturing parameters, upload CAD files, and submit bulk inquiries directly into your CRM. Furthermore, we write custom API middleware that securely connects this portal to your factory's ERP system (like SAP or Oracle), ensuring that inventory and invoicing are synchronized in real-time, eliminating hundreds of hours of manual administrative data entry.
              </p>
            </div>

            {/* Section 4 */}
            <div id="technical-seo" className="scroll-mt-32 mb-16">
              <h2 className="text-3xl font-bold text-text-primary mb-6">4. Technical SEO as Engineering</h2>
              <p className="leading-relaxed mb-6">
                Search Engine Optimization has a terrible reputation, largely because the industry is flooded with "gurus" selling quick-fix keyword stuffing and spammy backlink packages. That era of SEO is dead. Today, Google's algorithms are incredibly sophisticated, heavily prioritizing user experience metrics (Core Web Vitals) and semantic entity recognition (EEAT).
              </p>
              <p className="leading-relaxed mb-6">
                We approach SEO not as a marketing tactic, but as a hardcore engineering discipline. 
              </p>
              <h3 className="text-2xl font-bold text-text-primary mt-8 mb-4">Core Web Vitals & The Speed Advantage</h3>
              <p className="leading-relaxed mb-6">
                Google explicitly uses your website's speed as a ranking factor. They measure Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Interaction to Next Paint (INP). If your site fails these metrics, Google will actively suppress your rankings, regardless of how good your content is. By building our platforms with Next.js, we guarantee near-perfect Core Web Vitals scores out of the box, immediately vaulting you over slower competitors.
              </p>
              <h3 className="text-2xl font-bold text-text-primary mt-8 mb-4">Programmatic SEO for Large Catalogs</h3>
              <p className="leading-relaxed mb-6">
                For businesses with massive product lines (like hardware manufacturers or real estate aggregators), writing manual SEO content for 10,000 pages is impossible. We utilize Programmatic SEO. We structure your database so that our Next.js architecture automatically generates thousands of perfectly optimized, unique landing pages for every possible SKU variation. If a procurement officer searches for "316L stainless steel pneumatic valve 2-inch," we ensure a highly specific, instantly loading page exists precisely for that query.
              </p>
              <h3 className="text-2xl font-bold text-text-primary mt-8 mb-4">Semantic Schema Engineering</h3>
              <p className="leading-relaxed mb-6">
                We do not leave it to Google to guess what your business does. We inject sophisticated JSON-LD structured data deep into your codebase. This code explicitly tells search engine crawlers: "This is a product, it costs exactly this much, it has 45 five-star reviews, and here are the technical specifications." This data structuring is critical not just for Google Search, but for Answer Engine Optimization (AEO)—ensuring AI models like ChatGPT cite your business as the definitive source of truth in your industry.
              </p>
            </div>

            {/* Section 5 */}
            <div id="mobile-first" className="scroll-mt-32 mb-16">
              <h2 className="text-3xl font-bold text-text-primary mb-6">5. The Mobile-First Imperative</h2>
              <p className="leading-relaxed mb-6">
                Over 60% of all global web traffic currently originates from mobile devices. Google uses "Mobile-First Indexing," meaning they primarily use the mobile version of your website for ranking and indexing. If your mobile experience is an afterthought, your entire digital strategy is fundamentally flawed.
              </p>
              <p className="leading-relaxed mb-6">
                We design and engineer natively for mobile devices first. We focus heavily on "thumb-zones"—ensuring that primary navigation and checkout buttons are easily reachable on large smartphones. We utilize CSS Grid and Flexbox to create fluid layouts that adapt flawlessly to any screen size, and we aggressively optimize images so they do not drain a user's mobile data plan. 
              </p>
              <p className="leading-relaxed mb-6">
                For businesses requiring deeper engagement, we engineer premium cross-platform mobile applications using React Native. This allows us to deploy highly performant, offline-capable iOS and Android applications from a single codebase, drastically reducing your development timeline and long-term maintenance costs.
              </p>
            </div>

            {/* Section 6 */}
            <div id="roi-measurement" className="scroll-mt-32 mb-16">
              <h2 className="text-3xl font-bold text-text-primary mb-6">6. Measuring Digital ROI</h2>
              <p className="leading-relaxed mb-6">
                A high-performance digital platform requires a significant investment, and like any serious business investment, it must yield a measurable return. We do not operate on vanity metrics like "impressions" or "page views." We focus on metrics that directly impact your P&L statement: Customer Acquisition Cost (CAC), Lifetime Value (LTV), and Conversion Rate (CVR).
              </p>
              <p className="leading-relaxed mb-6">
                Before launch, we implement advanced analytics infrastructure. We deploy Google Tag Manager (GTM) to track highly specific user events—not just button clicks, but scroll depth, video engagement, and form abandonment points. We integrate server-side tracking (like the Facebook Conversions API) to bypass ad-blockers and iOS privacy restrictions, ensuring you have 100% accurate data on exactly which marketing channels are driving actual revenue.
              </p>
              <p className="leading-relaxed mb-6">
                By treating your digital presence as a measurable, iterative software product rather than a static brochure, we transform your website from a sunk marketing cost into a predictable, scalable engine for enterprise growth.
              </p>
            </div>

            <div className="bg-card border border-border-subtle rounded-2xl p-8 mt-12 text-center">
              <h3 className="text-2xl font-bold text-text-primary mb-4">Ready to Rebuild Your Digital Infrastructure?</h3>
              <p className="text-lg text-text-body mb-8 max-w-2xl mx-auto">
                Stop losing market share to competitors with superior technology. Partner with Warsi WebWorks to engineer a digital platform that reflects the true caliber of your business.
              </p>
              <Link href="/contact" className="inline-flex items-center justify-center bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 rounded-lg transition-all duration-300">
                Schedule a Technical Consultation
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
