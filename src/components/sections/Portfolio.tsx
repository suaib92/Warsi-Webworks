"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Gauge, MonitorSmartphone } from "lucide-react";

const projects = [
  {
    id: "01",
    slug: "aura-commerce",
    title: "Aura Commerce",
    category: "Headless ecommerce",
    description:
      "A storefront rebuilt around fast product discovery, clean checkout paths, and a merchandising system the team can actually operate.",
    tech: ["Next.js", "Shopify", "Tailwind"],
    impact: "+140%",
    impactLabel: "conversion rate",
    image: "/images/portfolio/aura-commerce/banner.webp",
  },
  {
    id: "02",
    slug: "fintech-core",
    title: "Fintech Core",
    category: "Realtime web app",
    description:
      "A dense operations dashboard for market data, alerts, and trading controls without the usual enterprise UI drag.",
    tech: ["React", "Node.js", "WebSockets"],
    impact: "<50ms",
    impactLabel: "data latency",
    image: "/images/portfolio/fintech-core/banner.webp",
  },
  {
    id: "03",
    slug: "nexus-health",
    title: "Nexus Health",
    category: "Healthcare platform",
    description:
      "A patient-first digital product designed for trust, accessibility, and high-intent appointment journeys.",
    tech: ["React Native", "Firebase", "WebRTC"],
    impact: "50k+",
    impactLabel: "active users",
    image: "/images/portfolio/nexus-health/banner.webp",
  },
];

const proofPoints = [
  {
    label: "Performance",
    value: "95+",
    icon: Gauge,
  },
  {
    label: "Responsive UX",
    value: "All screens",
    icon: MonitorSmartphone,
  },
  {
    label: "Growth focus",
    value: "Revenue first",
    icon: BarChart3,
  },
];

export default function Portfolio() {
  const [featured, ...supporting] = projects;

  return (
    <section className="relative overflow-hidden border-t border-border-section bg-surface py-24 md:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,15,15,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(15,15,15,0.04)_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-base/70 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-xs font-bold uppercase text-accent"
            >
              Selected work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="max-w-4xl text-4xl font-black leading-[1.05] text-text-primary md:text-6xl"
            >
              Websites that look premium and work under pressure.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="max-w-xl lg:justify-self-end"
          >
            <p className="text-base leading-[1.7] text-text-body md:text-lg">
              Every build below is designed around the business outcome first:
              speed, search visibility, clear user journeys, and conversion.
            </p>
            <Link
              href="/portfolio"
              className="mt-7 inline-flex h-12 items-center justify-center rounded-[8px] border border-border-subtle bg-card px-6 text-sm font-bold text-text-primary transition-all duration-300 hover:border-accent hover:bg-card-hover hover:text-accent"
            >
              View full portfolio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-[8px] border border-border-subtle bg-card transition-colors duration-300 hover:border-accent/60 hover:bg-card-hover"
        >
          <Link href={`/portfolio/${featured.slug}`} className="group grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[330px] overflow-hidden bg-base md:min-h-[470px]">
              <Image
                src={featured.image}
                alt={`${featured.title} website preview`}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>

            <div className="flex flex-col justify-between p-6 md:p-9">
              <div>
                <div className="mb-7 flex items-center justify-between gap-4">
                  <span className="text-sm font-black text-text-muted">{featured.id}</span>
                  <span className="rounded-[8px] border border-border-subtle bg-surface px-3 py-1 text-xs font-bold uppercase text-text-muted">
                    Featured build
                  </span>
                </div>

                <p className="mb-3 text-sm font-bold uppercase text-accent">{featured.category}</p>
                <h3 className="text-3xl font-black leading-[1.1] text-text-primary md:text-5xl">
                  {featured.title}
                </h3>
                <p className="mt-5 text-base leading-[1.7] text-text-body">
                  {featured.description}
                </p>
              </div>

              <div className="mt-10">
                <div className="mb-7 grid grid-cols-[auto_1fr] items-end gap-4 border-t border-border-subtle pt-7">
                  <span className="text-5xl font-black leading-none text-text-primary md:text-6xl">
                    {featured.impact}
                  </span>
                  <span className="pb-1 text-sm font-bold uppercase text-text-muted">
                    {featured.impactLabel}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {featured.tech.map((item) => (
                    <span
                      key={item}
                      className="rounded-[6px] border border-border-subtle bg-base px-3 py-1.5 text-xs font-bold text-text-body"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </motion.article>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {supporting.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-[8px] border border-border-subtle bg-card transition-colors duration-300 hover:border-accent/60 hover:bg-card-hover"
            >
              <Link href={`/portfolio/${project.slug}`} className="group block">
                <div className="relative h-72 overflow-hidden bg-base">
                  <Image
                    src={project.image}
                    alt={`${project.title} website preview`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="p-6 md:p-7">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase text-accent">{project.category}</p>
                      <h3 className="mt-2 text-2xl font-black text-text-primary">{project.title}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-text-primary">{project.impact}</p>
                      <p className="text-xs font-bold uppercase text-text-muted">{project.impactLabel}</p>
                    </div>
                  </div>

                  <p className="text-sm leading-[1.7] text-text-body">{project.description}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((item) => (
                      <span
                        key={item}
                        className="rounded-[6px] border border-border-subtle bg-base px-3 py-1.5 text-xs font-bold text-text-body"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {proofPoints.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-[8px] border border-border-subtle bg-base px-5 py-4"
              >
                <div>
                  <p className="text-xs font-bold uppercase text-text-muted">{item.label}</p>
                  <p className="mt-1 text-lg font-black text-text-primary">{item.value}</p>
                </div>
                <Icon className="h-5 w-5 text-accent" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
