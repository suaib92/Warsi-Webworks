"use client";

import { useState } from "react";

const stories = [
  {
    id: "01",
    title: "Fast Delivery",
    content: "We don't believe in endless development cycles. By utilizing the modern MERN stack and Next.js architectures, we cut time-to-market in half without sacrificing a single pixel of quality. Your competitors are moving fast; we help you move faster.",
    highlight: "Speed to Market"
  },
  {
    id: "02",
    title: "SEO Focus",
    content: "A beautiful website is useless if nobody sees it. We engineer our platforms with semantic HTML, server-side rendering, and flawless Core Web Vitals to ensure you dominate Google rankings from day one.",
    highlight: "Organic Dominance"
  },
  {
    id: "03",
    title: "Mobile First",
    content: "Over 70% of your traffic is on mobile. We don't just 'make it responsive'. We design specifically for the thumb, optimizing touch targets, animations, and load times for cellular networks.",
    highlight: "Flawless Mobile"
  },
  {
    id: "04",
    title: "Modern Stack",
    content: "No legacy code. No bloated WordPress themes. We build on the same enterprise technologies used by Netflix, Uber, and Airbnb (React, Node, MongoDB) to ensure ultimate scalability.",
    highlight: "Enterprise Tech"
  },
  {
    id: "05",
    title: "Long Term Support",
    content: "Launching is just the beginning. We partner with you for the long haul, providing continuous updates, performance monitoring, and strategic growth consulting as your business scales.",
    highlight: "True Partnership"
  }
];

export default function WhyUs() {
  const [activeStory, setActiveStory] = useState(0);

  return (
    <section className="bg-surface py-32 border-t border-border-section">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Left: Sticky Context */}
          <div className="lg:col-span-5 relative mb-12 lg:mb-0">
            <div className="lg:sticky lg:top-32">
              <p                 className="text-text-muted font-semibold tracking-[0.08em] uppercase text-[11px] mb-4"
              >
                Why Warsi WebWorks
              </p>
              <h2                 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tighter mb-8 leading-[1.2]"
              >
                Why Choose Our <br /> Next.js & React Developers?
              </h2>
              <p className="text-text-body text-xl max-w-md">
                Standard agencies build websites. We build scalable digital ecosystems designed for total market dominance.
              </p>
            </div>
          </div>

          {/* Right: Storytelling Interface */}
          <div className="lg:col-span-7">
            <div className="flex flex-col space-y-6">
              {stories.map((story, index) => {
                const isActive = activeStory === index;
                
                return (
                  <div 
                    key={story.id}
                    onClick={() => setActiveStory(index)}
                    className={`cursor-pointer border-l-4 p-8 transition-all duration-300 rounded-r-xl ${
                      isActive 
                        ? "border-accent bg-card" 
                        : "border-border-subtle hover:border-accent-light hover:bg-card-hover"
                    }`}
                  >
                    <div className="flex items-center gap-6 mb-4">
                      <span className={`font-mono text-lg font-bold transition-colors ${isActive ? "text-accent-light" : "text-text-disabled"}`}>
                        {story.id}
                      </span>
                      <h3 className={`text-2xl md:text-3xl font-bold transition-colors ${isActive ? "text-text-primary" : "text-text-body"}`}>
                        {story.title}
                      </h3>
                    </div>
                    
                    <div
                      className="overflow-hidden"
                    >
                      <p className="text-text-body text-lg leading-relaxed mt-4 mb-6">
                        {story.content}
                      </p>
                      <div className="inline-block px-4 py-1.5 bg-accent/10 text-accent-light text-sm font-semibold rounded-full">
                        {story.highlight}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
