"use client";

import dynamic from "next/dynamic";

const EnergyParticleScene = dynamic(() => import("./EnergyParticleScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-accent/5 animate-pulse" />
  ),
});

export default function EnergyParticleSceneWrapper() {
  return <EnergyParticleScene />;
}
