"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { SLIDES } from './slidesData';

// We implement a static rendering shell here. By showing the first slide's component IMMEDIATELY
// during initial page load, the user perceives the site as fully loaded and can begin reading instantly, 
// while the graphics engine mounts silently in the background framework.
const LoadingMask = () => (
  <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-20 z-10 w-full h-full max-w-[1400px] mx-auto">
    <div className="absolute w-full h-full flex items-center justify-start opacity-100 pointer-events-auto">
      {SLIDES[0].component}
    </div>
  </div>
);

// We strip WebGL and ThreeJS out of the Server Side Render to prevent payload blocking over the network!
const DynamicImageTransition = dynamic(
  () => import('./_components/ImageTransition'), 
  { 
    ssr: false, 
    loading: () => <LoadingMask /> 
  }
);

export default function AboutPage() {
  return (
    <main className="min-h-screen relative w-full h-full overflow-hidden flex flex-col items-center justify-center bg-[#08080b]">
      <DynamicImageTransition slides={SLIDES} />
    </main>
  );
}
