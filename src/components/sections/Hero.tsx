import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gauge, Search, Star, TrendingUp } from "lucide-react";

const featuredWork = [
  {
    name: "Aura Commerce",
    sector: "Ecommerce build",
    metric: "+38% conversion lift",
    image: "/images/portfolio/aura-commerce/thumbnail.webp",
  },
  {
    name: "Nexus Health",
    sector: "Healthcare website",
    metric: "1.2s mobile LCP",
    image: "/images/portfolio/nexus-health/thumbnail.webp",
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-base pt-32 lg:pt-24 pb-14">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,15,15,0.055)_1px,transparent_1px),linear-gradient(180deg,rgba(15,15,15,0.045)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/75 to-transparent" />

      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 h-full flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 min-h-[82vh]">
          <div className="w-full lg:w-7/12 flex flex-col justify-center text-left relative z-20 pointer-events-auto">
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="flex items-center gap-2 bg-card/90 border border-border-subtle rounded-[8px] px-4 py-2">
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-accent-light text-accent-light" />
                  ))}
                </div>
                <span className="text-sm font-medium text-text-primary">5.0 Google Rating</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-[#0f0f0f] text-white border border-[#0f0f0f] rounded-[8px] px-4 py-2">
                <span className="text-sm font-medium">50+ Clients Worldwide</span>
              </div>
              <div className="flex items-center gap-2 bg-[#e7f6ef] border border-[#b9dfcd] rounded-[8px] px-4 py-2">
                <TrendingUp className="w-4 h-4 text-[#0d7a4f]" />
                <span className="text-xs font-bold text-[#0d5f40] uppercase">Website Development Company Moradabad</span>
              </div>
            </div>

            <div className="mt-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.98] text-text-primary uppercase">
                WEBSITES THAT TURN<br />
                <span className="text-accent">VISITORS</span><br />
                INTO CUSTOMERS
              </h1>
            </div>

            <div className="mt-8">
              <h2 className="text-lg md:text-2xl text-text-body font-medium max-w-2xl leading-[1.65]">
                <strong className="text-text-primary font-bold">Premium Website Development Company in Moradabad.</strong> Engineering high-performance digital solutions that rank, convert, and scale.
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-12">
              <Link href="/#contact" className="w-full sm:w-auto h-14 px-8 inline-flex items-center justify-center text-lg font-semibold bg-accent hover:bg-accent-hover text-white rounded-[8px] border-none transition-all duration-300 group shadow-[0_18px_45px_rgba(255,77,0,0.24)]">
                Book Free Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/portfolio" className="w-full sm:w-auto h-14 px-8 inline-flex items-center justify-center text-lg font-semibold border border-border-subtle text-text-primary bg-card/80 hover:bg-card hover:border-accent hover:text-accent rounded-[8px] transition-all duration-300 group">
                View Work
                <ArrowRight className="ml-2 w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-border-subtle/50 w-full max-w-2xl">
              <div>
                <h4 className="text-3xl font-black text-text-primary mb-1">5.0</h4>
                <p className="text-xs text-text-muted uppercase font-semibold">Google Reviews</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-text-primary mb-1">50+</h4>
                <p className="text-xs text-text-muted uppercase font-semibold">Projects Delivered</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-text-primary mb-1">6+</h4>
                <p className="text-xs text-text-muted uppercase font-semibold">Years Experience</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-text-primary mb-1">&lt;1h</h4>
                <p className="text-xs text-text-muted uppercase font-semibold">Response Time</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-5/12 relative pointer-events-auto">
              <div className="relative mx-auto w-full max-w-[560px]">
              <div className="absolute -left-4 top-12 hidden h-28 w-28 border border-[#0f0f0f]/10 bg-[#dff3ff] md:block" />
              <div className="absolute -right-5 bottom-14 hidden h-32 w-24 border border-[#0f0f0f]/10 bg-[#e7f6ef] md:block" />

              <div className="relative overflow-hidden rounded-[8px] border border-[#171717] bg-[#171717] shadow-[0_28px_70px_rgba(15,15,15,0.24)]">
                <div className="flex h-11 items-center gap-2 border-b border-white/10 bg-[#202020] px-4">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                  <div className="ml-3 h-6 flex-1 rounded-[6px] bg-white/10 px-3 text-xs leading-6 text-white/55">
                    warsiwebworks.com/portfolio
                  </div>
                </div>

                <div className="bg-card p-4 md:p-5">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase text-accent">Selected builds</p>
                      <h3 className="text-2xl font-black text-text-primary">Fast sites, real outcomes.</h3>
                    </div>
                    <div className="hidden items-center gap-2 rounded-[8px] border border-border-subtle bg-base px-3 py-2 sm:flex">
                      <Gauge className="h-4 w-4 text-[#0d7a4f]" />
                      <span className="text-sm font-bold text-text-primary">95+ Lighthouse</span>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {featuredWork.map((work, index) => (
                      <Link
                        key={work.name}
                        href="/portfolio"
                        className={`group grid grid-cols-[112px_1fr] gap-4 rounded-[8px] border border-border-subtle bg-base p-3 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:bg-white md:grid-cols-[150px_1fr] ${
                          index === 1 ? "md:ml-10" : ""
                        }`}
                      >
                        <div className="relative h-24 overflow-hidden rounded-[6px] border border-border-subtle bg-surface md:h-28">
                          <Image
                            src={work.image}
                            alt={`${work.name} website preview`}
                            fill
                            sizes="(min-width: 768px) 150px, 112px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex min-w-0 flex-col justify-between py-1">
                          <div>
                            <p className="text-sm font-bold text-text-primary">{work.name}</p>
                            <p className="mt-1 text-xs font-medium uppercase text-text-muted">{work.sector}</p>
                          </div>
                          <div className="mt-4 flex items-center gap-2 text-sm font-bold text-[#0d7a4f]">
                            <Search className="h-4 w-4" />
                            <span>{work.metric}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {["SEO-ready", "Mobile-first", "Conversion-led"].map((item) => (
                  <div key={item} className="rounded-[8px] border border-border-subtle bg-card/85 px-3 py-3 text-center text-xs font-bold uppercase text-text-body">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
