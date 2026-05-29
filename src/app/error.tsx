"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-base flex items-center justify-center pt-20 pb-20">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <div className="w-20 h-20 bg-card border border-border-subtle rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
          <AlertCircle className="w-10 h-10 text-accent-light" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tighter mb-6">
          System Anomalies Detected.
        </h1>
        
        <p className="text-lg text-text-body leading-relaxed mb-10 max-w-lg mx-auto">
          We encountered an unexpected error while processing your request. Our engineering team has been notified.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 rounded-[8px] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-5 h-5" />
            Initialize Recovery
          </button>
          
          <Link 
            href="/"
            className="w-full sm:w-auto bg-surface hover:bg-card text-text-primary font-bold px-8 py-4 rounded-[8px] border border-border-subtle transition-all duration-300"
          >
            Return to Base
          </Link>
        </div>
      </div>
    </main>
  );
}
