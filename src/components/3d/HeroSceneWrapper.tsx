"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
    </div>
  ),
});

export default function HeroSceneWrapper() {
  return <HeroScene />;
}
