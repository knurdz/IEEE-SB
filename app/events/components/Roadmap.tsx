'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import EventCard from './EventCard';
import { EVENTS } from '../data';

export default function Roadmap() {
  const containerRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Track scroll position of the section.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end 60%']
  });

  // Apply a smooth but tight spring effect to the scroll to track precisely
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 35,
    restDelta: 0.001
  });

  // Create a delayed, softer physics spring for the second line.
  // Instead of math mapping which can break on tall pages, 
  // giving it a heavily damped "lazy" spring makes it organically trail behind!
  const trailingProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <>
      <section ref={containerRef} className="relative pt-4 pb-16 lg:pt-6 lg:pb-24 px-4 bg-transparent overflow-hidden" id="events-list">
        {/* Circuit board decorative visuals */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          {/* Ambient glows */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[7.5rem]" />
          <div className="absolute top-2/3 -right-20 w-[31.25rem] h-[31.25rem] bg-accent/5 rounded-full blur-[9.375rem]" />

          {/* Left circuit tracks */}
          <div className="hidden lg:block absolute left-0 top-0 w-[12%] h-full opacity-55 border-r border-primary/10">
            <svg className="w-full h-full" viewBox="0 0 120 1000" preserveAspectRatio="none">
              {/* Base, dim tracks */}
              <path d="M20 0 V200 L40 220 V400 L20 420 V1000" stroke="var(--primary)" strokeWidth="1.5" fill="none" opacity="0.15" />
              <path d="M80 0 V300 L60 320 V500 L80 520 V1000" stroke="var(--primary)" strokeWidth="1.5" fill="none" opacity="0.15" />
              
              {/* Animated fill tracks */}
              <motion.path 
                d="M20 0 V200 L40 220 V400 L20 420 V1000" 
                stroke="var(--primary)" 
                strokeWidth="1.5" 
                fill="none" 
                opacity="1"
                style={mounted ? { pathLength: smoothProgress } : {}}
              />
              <motion.path 
                d="M80 0 V300 L60 320 V500 L80 520 V1000" 
                stroke="var(--primary)" 
                strokeWidth="1.5" 
                fill="none" 
                opacity="1"
                style={mounted ? { pathLength: trailingProgress } : {}}
              />

              {/* Decorative nodes */}
              <circle cx="20" cy="200" r="3" fill="var(--primary)" opacity="0.48" />
              <rect x="56.5" y="316.5" width="7" height="7" fill="var(--primary)" opacity="0.48" className="rotate-45" />
            </svg>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto z-10 space-y-8">
          {EVENTS.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} priority={index < 2} />
          ))}
        </div>
      </section>
    </>
  );
}
