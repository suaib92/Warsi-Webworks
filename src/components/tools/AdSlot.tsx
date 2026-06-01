"use client";

import { useEffect, useState } from 'react';

interface AdSlotProps {
  placement: 'above-tool' | 'below-tool' | 'in-content' | 'before-faq' | 'end-of-article';
  className?: string;
}

export default function AdSlot({ placement, className = '' }: AdSlotProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // In a real implementation, you would trigger window.adsbygoogle.push({}) here
    // after ensuring the script is loaded.
  }, []);

  if (!mounted) return null;

  // Placeholder styling to reserve space and show where ads will be injected
  return (
    <div className={`w-full bg-surface-hover/50 border border-border-section border-dashed rounded-lg flex items-center justify-center text-text-muted text-sm font-mono p-4 my-8 min-h-[90px] ${className}`}>
      <span>[ AdSense Placement: {placement} ]</span>
    </div>
  );
}
