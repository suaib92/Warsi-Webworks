"use client";

import React, { Suspense, lazy, useState } from "react";

// Lazy load the Spline component to avoid blocking critical render paths (~500KB runtime)
const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  /** The .splinecode scene URL */
  scene: string;
  /** Custom CSS classes for the container */
  className?: string;
  /** Fired when the Spline application finishes loading */
  onLoad?: (app: any) => void;
}

/**
 * A highly optimized, responsive, and lazy-loaded Spline 3D Scene container.
 * Perfect for premium animations while maintaining high Core Web Vitals.
 */
export function SplineScene({ scene, className = "", onLoad }: SplineSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = (app: any) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(app);
    }
  };

  return (
    <div className={`relative w-full h-full min-h-[400px] overflow-hidden ${className}`}>
      {/* Sleek, premium loader visible until scene resolves */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/30 backdrop-blur-md z-15 transition-opacity duration-700">
          <div className="relative w-20 h-20 flex items-center justify-center">
            {/* Spinning gradient rings */}
            <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-primary animate-spin" />
            <div className="absolute inset-2 rounded-full border-b-2 border-l-2 border-cyan-400 animate-spin [animation-direction:reverse] [animation-duration:1.5s]" />
            {/* Pulsing core */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-cyan-400 opacity-80 animate-pulse" />
          </div>
          <span className="mt-6 text-sm font-semibold tracking-widest text-muted-foreground uppercase animate-pulse">
            Loading Interactive 3D...
          </span>
        </div>
      )}

      {/* 3D Spline Canvas */}
      <Suspense fallback={null}>
        <div 
          className="w-full h-full transition-opacity duration-1000 ease-out"
          style={{ opacity: isLoaded ? 1 : 0 }}
        >
          <Spline scene={scene} onLoad={handleLoad} />
        </div>
      </Suspense>
    </div>
  );
}
