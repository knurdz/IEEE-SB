'use client';

import React from 'react';
import Image from 'next/image';

/**
 * AnimatedLogoProcedural
 * 
 * Optimized for performance and delivery.
 * Uses Next.js Image components for automatic weight reduction (WebP) 
 * and CSS animations for GPU-accelerated performance.
 */
export default function AnimatedLogoProcedural({ className }: { className?: string }) {
  return (
    <div className={`relative aspect-square w-full h-full overflow-hidden ${className}`}>
      <style jsx>{`
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-rotate {
          animation: rotate-slow 40s linear infinite;
        }
      `}</style>

      {/* Background Rotating Layer - Optimized via Next.js Image */}
      <div className="absolute inset-0 animate-rotate scale-110">
        <Image
          src="/logo-animated/ieee-sb-logo-animated-layer-01-2.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 48rem) 18.75rem, 37.5rem"
          className="object-contain opacity-80"
        />
      </div>

      {/* Static Center Branding */}
      <div className="absolute inset-0 z-10">
        <Image
          src="/logo-animated/ieee-sb-logo-animated-center.webp"
          alt="IEEE SB Logo"
          fill
          priority
          sizes="(max-width: 48rem) 18.75rem, 37.5rem"
          className="object-contain"
        />
      </div>
    </div>
  );
}
