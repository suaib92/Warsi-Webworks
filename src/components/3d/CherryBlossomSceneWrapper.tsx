"use client";

import dynamic from "next/dynamic";

const CherryBlossomScene = dynamic(() => import("./CherryBlossomScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-accent/5 animate-pulse -z-10" />,
});

export default function CherryBlossomSceneWrapper() {
  return <CherryBlossomScene />;
}
