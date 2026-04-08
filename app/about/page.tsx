"use client";

import React, { Suspense } from 'react';
import ImageTransition from './_components/ImageTransition';
import { SLIDES } from './slidesData';

export default function AboutPage() {
  return (
    <main className="min-h-screen relative w-full h-full overflow-hidden flex flex-col items-center justify-center">
      <Suspense fallback={<div className="text-white z-10 p-4">Loading Scene...</div>}>
        <ImageTransition slides={SLIDES} />
      </Suspense>
    </main>
  );
}
