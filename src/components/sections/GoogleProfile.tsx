"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, MapPin, MessageSquareText, SearchCheck, Star } from "lucide-react";

const googleProfileUrl = "https://share.google/6P3GYqa1EtX0ml1Sf";

const reviews = [
  {
    author: "Rahul S.",
    role: "Founder, TechCorp",
    content:
      "Warsi WebWorks delivered our SaaS platform 3 weeks ahead of schedule. The code quality and attention to detail is unmatched in Moradabad.",
    tone: "bg-[#ffd2af]",
  },
  {
    author: "Amit K.",
    role: "Director, RetailPlus",
    content:
      "Our ecommerce conversions doubled within a month of launching the new site they built. Absolute professionals.",
    tone: "bg-[#dff3ff]",
  },
  {
    author: "Priya M.",
    role: "Marketing Head",
    content:
      "The SEO architecture they implemented put us on the first page of Google in just 60 days. Highly recommended.",
    tone: "bg-[#e7f6ef]",
  },
];

const trustStats = [
  {
    value: "5.0",
    label: "Google rating",
  },
  {
    value: "50+",
    label: "projects shipped",
  },
  {
    value: "<1h",
    label: "avg response",
  },
];

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default function GoogleProfile() {
  return (
    <section className="relative overflow-hidden border-t border-border-section bg-base py-24 md:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,15,15,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(15,15,15,0.04)_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-surface/75 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-xs font-bold uppercase text-accent"
            >
              Local proof
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="max-w-4xl text-4xl font-black leading-[1.05] text-text-primary md:text-6xl"
            >
              Trusted by businesses that need Google to bring real leads.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="max-w-2xl text-base leading-[1.7] text-text-body md:justify-self-end md:text-lg"
          >
            Your website, Google Business Profile, and local SEO signals should
            work together. This is the trust layer clients check before they call.
          </motion.p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-[8px] border border-border-subtle bg-card"
          >
            <div className="border-b border-border-subtle p-6 md:p-7">
              <div className="mb-8 flex items-start justify-between gap-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[8px] border border-border-subtle bg-base">
                    <GoogleLogo />
                  </span>
                  <div>
                    <h3 className="text-2xl font-black text-text-primary">Warsi WebWorks</h3>
                    <p className="mt-1 text-sm font-semibold text-text-body">
                      Website development company in Moradabad
                    </p>
                  </div>
                </div>

                <Link
                  href={googleProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Warsi WebWorks on Google"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border border-border-subtle bg-base text-text-body transition-colors hover:border-accent hover:text-accent"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-px overflow-hidden rounded-[8px] border border-border-subtle bg-border-subtle">
                {trustStats.map((stat) => (
                  <div key={stat.label} className="bg-base p-4">
                    <p className="text-2xl font-black leading-none text-text-primary">{stat.value}</p>
                    <p className="mt-2 text-xs font-bold uppercase text-text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-accent text-accent" />
                ))}
                <span className="ml-2 text-sm font-bold text-text-primary">Rated 5.0 on Google</span>
              </div>
            </div>

            <div className="relative h-[320px] bg-base">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112174.63323108232!2d78.68067446756823!3d28.84097326983111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390afb0f8a4c7b2d%3A0x8a8c5c5e5f5e5f5e!2sMoradabad%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "saturate(0.75) contrast(1.02)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Warsi WebWorks location in Moradabad"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-card to-transparent p-5 pt-16">
                <div className="flex items-start gap-3 rounded-[8px] border border-border-subtle bg-card/95 p-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <p className="text-sm font-semibold leading-[1.6] text-text-body">
                    Premium digital engineering studio serving Moradabad,
                    Bareilly, Rampur, Amroha, Sambhal, and clients worldwide.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-6">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-px overflow-hidden rounded-[8px] border border-border-subtle bg-border-subtle md:grid-cols-2"
            >
              <div className="bg-card p-6 md:p-7">
                <SearchCheck className="mb-8 h-6 w-6 text-accent" />
                <p className="text-xs font-bold uppercase text-text-muted">Why it matters</p>
                <h3 className="mt-3 text-2xl font-black leading-tight text-text-primary">
                  Local credibility compounds with technical SEO.
                </h3>
              </div>
              <div className="bg-card p-6 md:p-7">
                <MessageSquareText className="mb-8 h-6 w-6 text-accent" />
                <p className="text-base leading-[1.7] text-text-body">
                  A fast website gets attention. A strong Google profile turns
                  that attention into calls, map visits, reviews, and booked projects.
                </p>
                <Link
                  href="/#contact"
                  className="mt-7 inline-flex items-center text-sm font-bold text-text-primary transition-colors hover:text-accent"
                >
                  Start your local growth plan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:overflow-visible lg:pb-0">
              {reviews.map((review, index) => (
                <motion.article
                  key={review.author}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="grid min-w-[82vw] overflow-hidden rounded-[8px] border border-border-subtle bg-card transition-colors duration-300 hover:border-accent/60 hover:bg-card-hover sm:min-w-[560px] md:grid-cols-[180px_1fr] lg:min-w-0"
                >
                  <div className={`relative min-h-[190px] overflow-hidden ${review.tone}`}>
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0)_100%)]" />
                    <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-[8px] border border-black/10 bg-white/80">
                      <GoogleLogo />
                    </div>
                    <div className="absolute bottom-5 left-5 flex h-20 w-20 items-center justify-center rounded-[8px] bg-[#0f0f0f] text-3xl font-black text-white">
                      {review.author.charAt(0)}
                    </div>
                    <div className="absolute bottom-5 right-5 flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-[#0f0f0f] text-[#0f0f0f]" />
                      ))}
                    </div>
                  </div>

                  <div className="flex min-h-[190px] flex-col justify-between p-5 md:p-6">
                    <blockquote className="text-lg font-black leading-[1.35] text-text-primary md:text-xl">
                      &quot;{review.content}&quot;
                    </blockquote>
                    <cite className="mt-6 not-italic">
                      <span className="block text-sm font-black text-text-primary">{review.author}</span>
                      <span className="mt-1 block text-sm font-semibold text-text-muted">{review.role} · Google</span>
                    </cite>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
