'use client';

import React from 'react';
import { motion } from 'framer-motion';
import EventCard from './EventCard';
import { EVENTS } from '../data';

export default function Roadmap() {
  return (
    <>
      <section className="relative py-16 lg:py-24 px-4 bg-transparent overflow-hidden" id="events-list">
        {/* Circuit board decorative visuals */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          {/* Ambient glows */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute top-2/3 -right-20 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />

          {/* Left circuit tracks */}
          <div className="hidden lg:block absolute left-0 top-0 w-[12%] h-full opacity-55 border-r border-primary/10">
            <svg className="w-full h-full" viewBox="0 0 120 1000" preserveAspectRatio="none">
              <path d="M20 0 V200 L40 220 V400 L20 420 V1000" stroke="var(--primary)" strokeWidth="1.5" fill="none" opacity="0.36" />
              <path d="M60 0 V150 L40 170 V350 L60 370 V1000" stroke="var(--primary)" strokeWidth="1.5" fill="none" opacity="0.42" />
              <path d="M100 0 V300 L80 320 V500 L100 520 V1000" stroke="var(--primary)" strokeWidth="1.5" fill="none" opacity="0.36" />
              <circle cx="20" cy="200" r="3" fill="var(--primary)" opacity="0.48" />
              <rect x="36.5" y="346.5" width="7" height="7" fill="var(--primary)" opacity="0.48" className="rotate-45" />
            </svg>
            <motion.div
              animate={{ top: ['-10%', '110%'] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
              className="absolute left-[19.4px] w-[2.5px] h-32 bg-gradient-to-b from-transparent via-primary to-transparent shadow-[0_0_15px_var(--color-primary)]"
            />
          </div>

          {/* Right circuit tracks */}
          <div className="hidden lg:block absolute right-0 top-0 w-[12%] h-full opacity-55 border-l border-primary/10">
            <svg className="w-full h-full" viewBox="0 0 120 1000" preserveAspectRatio="none">
              <path d="M100 0 V250 L80 270 V450 L100 470 V1000" stroke="var(--primary)" strokeWidth="1.5" fill="none" opacity="0.36" />
              <path d="M60 0 V350 L80 370 V550 L60 570 V1000" stroke="var(--primary)" strokeWidth="1.5" fill="none" opacity="0.42" />
              <path d="M20 0 V450 L40 470 L20 670 V1000" stroke="var(--primary)" strokeWidth="1.5" fill="none" opacity="0.36" />
            </svg>
            <motion.div
              animate={{ top: ['-10%', '110%'] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear', delay: 5 }}
              className="absolute left-[99.4px] w-[2.5px] h-28 bg-gradient-to-b from-transparent via-accent to-transparent shadow-[0_0_12px_var(--color-accent)]"
            />
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto z-10 space-y-8">
          {EVENTS.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </section>
    </>
  );
}
