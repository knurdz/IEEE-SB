'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Animated data line
function DataLine({ delay = 0 }: { delay?: number }) {
  return (
    <div className="relative h-px w-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay }}
      />
      <motion.div
        className="absolute inset-0 w-20 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        initial={{ x: '-100%' }}
        whileInView={{ x: '500%' }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: delay + 0.5, ease: 'easeOut' }}
      />
    </div>
  );
}

// Feature card with fiber glow
function FeatureCard({
  icon,
  title,
  description,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      className="group relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-cyan-950/30 to-transparent border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-500"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5, boxShadow: '0 20px 40px -20px rgba(0,212,255,0.3)' }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Fiber line at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px">
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Icon */}
      <div className="relative w-14 h-14 mb-5 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-all duration-300">
        {icon}
        <div className="absolute inset-0 rounded-xl border border-cyan-500/20 group-hover:border-cyan-400/40 transition-colors" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-100 transition-colors">
        {title}
      </h3>
      <p className="text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
        {description}
      </p>

      {/* Bottom data pulse */}
      <div className="absolute bottom-4 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity">
        <motion.div
          className="h-full w-4 bg-gradient-to-r from-cyan-400 to-transparent rounded-full"
          animate={{ x: ['0%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}

// Animated counter
function Counter({ value, suffix = '' }: { value: string; suffix?: string }) {
  return (
    <motion.span
      className="text-5xl md:text-6xl font-bold text-white"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      {value}
      <span className="text-cyan-400">{suffix}</span>
    </motion.span>
  );
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const features = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Lightning Speed',
      description: 'Connect, learn, and grow at the speed of fiber optics. Our events and workshops deliver cutting-edge knowledge instantly.',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      title: 'Global Network',
      description: 'Part of the world\'s largest technical professional organization, connecting you to a global network of innovators.',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Innovation Hub',
      description: 'A breeding ground for breakthrough ideas. We transform concepts into reality through collaborative innovation.',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Community First',
      description: 'More than just members — we\'re a family of tech enthusiasts supporting each other\'s growth and success.',
    },
  ];

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative py-32 bg-[#000408] overflow-hidden"
    >
      {/* Background fiber lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
            }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: i * 0.2, duration: 1.5 }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.span
            className="inline-block px-4 py-1.5 text-xs tracking-[0.3em] text-cyan-400 uppercase bg-cyan-500/10 rounded-full border border-cyan-500/20 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            About Us
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Transmitting{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Excellence
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-white/50 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            IEEE Student Branch at University of Moratuwa serves as the primary conduit
            for engineering excellence, channeling knowledge and innovation to shape
            tomorrow's tech leaders.
          </motion.p>

          <div className="mt-8 max-w-xl mx-auto">
            <DataLine delay={0.3} />
          </div>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-cyan-950/30 via-blue-950/20 to-cyan-950/30 border border-cyan-500/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { value: '15', suffix: '+', label: 'Years Active' },
            { value: '500', suffix: '+', label: 'Active Members' },
            { value: '100', suffix: '+', label: 'Events Held' },
            { value: '20', suffix: '+', label: 'Partners' },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-white/40 text-sm mt-2 tracking-wide">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
