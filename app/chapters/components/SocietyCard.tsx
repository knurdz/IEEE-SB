'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import OctagonFrame from './OctagonFrame';
import SocialLinks from './SocialLinks';
import type { Society } from '../data';

interface SocietyCardProps {
  society: Society;
  reverse?: boolean;
  index: number;
}

export default function SocietyCard({ society, reverse = false, index }: SocietyCardProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const contentAlign = reverse ? 'items-end text-right' : 'items-start text-left';
  const flexDirection = reverse ? 'flex-row-reverse' : 'flex-row';

  return (
    <motion.section
      ref={ref}
      className="relative py-24 opacity-0"
      initial={{ opacity: 0, x: reverse ? 60 : -60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Divider line */}
      {index > 0 && (
        <div
          className="absolute top-0 left-[5%] right-[5%] h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.08), rgba(0, 212, 255, 0.12), rgba(0, 212, 255, 0.08), transparent)',
          }}
        />
      )}

      {/* Card content */}
      <motion.div
        className={`flex gap-20 px-4 items-center ${flexDirection} max-lg:flex-col max-lg:gap-8 max-lg:text-center`}
        onMouseMove={handleMouseMove}
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 212, 255, 0.04), transparent 40%)`,
        }}
      >
        {/* Image */}
        <div className="flex-shrink-0">
          <OctagonFrame src={society.logo} alt={`${society.title} Logo`} />
        </div>

        {/* Content */}
        <div className={`flex-1 flex flex-col gap-5 ${contentAlign} max-lg:items-center max-lg:text-center`}>
          {/* Label */}
          <div
            className={`inline-flex items-center gap-4 ${reverse ? 'flex-row-reverse' : 'flex-row'} max-lg:flex-row`}
          >
            <motion.span
              className="h-0.5 bg-cyan-400 rounded-full"
              initial={{ width: 32 }}
              whileHover={{ width: 48 }}
              transition={{ duration: 0.4 }}
            />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-cyan-400">
              Featured Society
            </span>
          </div>

          {/* Title */}
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white/95 leading-tight transition-all duration-200 hover:bg-gradient-to-r hover:from-white hover:to-cyan-400 hover:bg-clip-text hover:text-transparent"
          >
            {society.title}
          </motion.h2>

          {/* Description */}
          <p className="text-base text-white/60 leading-relaxed max-w-xl">
            {society.description}
          </p>

          {/* Social Links */}
          <SocialLinks
            links={society.links}
            align={reverse ? 'right' : 'left'}
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
