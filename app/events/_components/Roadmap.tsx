'use client';

import React from 'react';
import { motion } from 'framer-motion';
import EventCard from './EventCard';
import { EVENTS } from '../_data/events';

export default function Roadmap() {
  return (
    <section className="relative py-24 px-4 bg-ieee-bg overflow-hidden" id="roadmap">
      {/* Circuit board decorative visuals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Ambient glows */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-ieee-blue/5 rounded-full blur-[120px]" />
        <div className="absolute top-2/3 -right-20 w-[500px] h-[500px] bg-ieee-cyan/5 rounded-full blur-[150px]" />

        {/* Left circuit tracks */}
        <div className="hidden lg:block absolute left-0 top-0 w-[12%] h-full opacity-60 border-r border-ieee-blue/5">
          <svg className="w-full h-full" viewBox="0 0 120 1000" preserveAspectRatio="none">
            <path d="M20 0 V200 L40 220 V400 L20 420 V1000" stroke="currentColor" className="text-ieee-blue/20" strokeWidth="1.2" fill="none" />
            <path d="M60 0 V150 L40 170 V350 L60 370 V1000" stroke="currentColor" className="text-ieee-cyan/15" strokeWidth="1.2" fill="none" />
            <path d="M100 0 V300 L80 320 V500 L100 520 V1000" stroke="currentColor" className="text-ieee-blue/20" strokeWidth="1.2" fill="none" />
            <circle cx="20" cy="200" r="3" className="fill-ieee-blue/30" />
            <rect x="36.5" y="346.5" width="7" height="7" className="fill-ieee-cyan/30 rotate-45" />
          </svg>
          {/* Moving Pulse 1 */}
          <motion.div
            animate={{ top: ['-10%', '110%'] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            className="absolute left-[19.4px] w-[2px] h-32 bg-gradient-to-b from-transparent via-ieee-blue to-transparent shadow-[0_0_15px_#00A3FF]"
          />
          {/* Moving Pulse 2 */}
          <motion.div
            animate={{ top: ['-20%', '120%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear', delay: 3 }}
            className="absolute left-[59.4px] w-[2px] h-24 bg-gradient-to-b from-transparent via-ieee-cyan to-transparent shadow-[0_0_12px_#00E0FF]"
          />
        </div>

        {/* Right circuit tracks */}
        <div className="hidden lg:block absolute right-0 top-0 w-[12%] h-full opacity-60 border-l border-ieee-blue/5">
          <svg className="w-full h-full" viewBox="0 0 120 1000" preserveAspectRatio="none">
            <path d="M100 0 V250 L80 270 V450 L100 470 V1000" stroke="currentColor" className="text-ieee-blue/20" strokeWidth="1.2" fill="none" />
            <path d="M60 0 V350 L80 370 V550 L60 570 V1000" stroke="currentColor" className="text-ieee-cyan/15" strokeWidth="1.2" fill="none" />
            <path d="M20 0 V450 L40 470 V650 L20 670 V1000" stroke="currentColor" className="text-ieee-blue/20" strokeWidth="1.2" fill="none" />
            <circle cx="100" cy="250" r="3" className="fill-ieee-blue/30" />
            <rect x="36.5" y="466.5" width="7" height="7" className="fill-ieee-blue/30 rotate-45" />
          </svg>
          {/* Moving Pulse 1 */}
          <motion.div
            animate={{ top: ['-15%', '115%'] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'linear', delay: 1 }}
            className="absolute left-[19.4px] w-[2px] h-40 bg-gradient-to-b from-transparent via-ieee-blue to-transparent shadow-[0_0_15px_#00A3FF]"
          />
          {/* Moving Pulse 2 */}
          <motion.div
            animate={{ top: ['-10%', '110%'] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear', delay: 5 }}
            className="absolute left-[99.4px] w-[2px] h-28 bg-gradient-to-b from-transparent via-ieee-cyan to-transparent shadow-[0_0_12px_#00E0FF]"
          />
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto flex flex-col items-center z-10">
        {EVENTS.map((event, index) => {
          const isRight = index % 2 === 0;
          return (
            <React.Fragment key={event.id}>
              <div className="w-full relative z-10">
                <EventCard event={event} index={index} isRight={isRight} />
              </div>

              {index !== EVENTS.length - 1 && (
                <div className="flex justify-center items-center py-6 sm:py-10 w-full">
                  <div className="flex items-center gap-4 w-full max-w-sm opacity-60">
                    <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent to-ieee-blue/40" />
                    <div className="w-2 h-2 rounded-full bg-ieee-cyan shadow-[0_0_10px_var(--color-ieee-cyan)]" />
                    <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent to-ieee-blue/40" />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}
