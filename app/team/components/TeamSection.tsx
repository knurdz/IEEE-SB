'use client';

import { motion } from 'framer-motion';
import { Member, Variant } from '../types';
import MemberCard from './MemberCard';

export default function TeamSection({
  title,
  variant,
  members,
  sectionIndex,
}: {
  title: string;
  variant: Variant;
  members: Member[];
  sectionIndex: number;
}) {
  return (
    <motion.div
      className="w-full max-w-[1100px] px-6 lg:px-10"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: sectionIndex * 0.12, duration: 0.5 }}
    >
      {/* Glassmorphism container — matches IEEE-SB's glass-fiber style */}
      <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-10 overflow-visible">
        {/* Top edge glow line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/* Section badge + heading */}
        <div className="text-center mb-10">
          <motion.span
            className="inline-block px-3 py-1 text-[0.65rem] tracking-[0.3em] text-primary uppercase bg-primary/10 rounded-full border border-primary/20 mb-4 font-mono"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: sectionIndex * 0.12 + 0.1 }}
          >
            IEEE Student Branch
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-white"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: sectionIndex * 0.12 + 0.15 }}
          >
            {title.split(' ').map((word, i, arr) =>
              i === arr.length - 1 ? (
                <span
                  key={i}
                  className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-orbitron"
                >
                  {' '}{word}
                </span>
              ) : (
                <span key={i}>{i > 0 ? ' ' : ''}{word}</span>
              )
            )}
          </motion.h2>
        </div>

        {/* Cards row — overflow:visible so scaled cards aren't clipped */}
        <div
          className="relative flex items-center justify-center"
          style={{ height: '520px', overflow: 'visible' }}
        >
          {members.map((member, i) => {
            const midIndex = Math.floor(members.length / 2);
            let position: 'left' | 'middle' | 'right' = 'left';
            
            if (i === midIndex) position = 'middle';
            else if (i < midIndex) position = 'left';
            else position = 'right';

            return (
              <MemberCard key={i} member={member} index={i} variant={variant} position={position} />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
