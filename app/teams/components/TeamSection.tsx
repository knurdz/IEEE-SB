'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/app/components/ui/SectionHeading';
import { fadeUp, fadeUpTransition, inViewOnce } from '@/lib/motion';
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
  const highlight = title.split(' ').slice(-1)[0];

  return (
    <motion.div
      className="w-full max-w-[1100px] px-6 lg:px-10"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      transition={fadeUpTransition(sectionIndex * 0.12, 0.5)}
    >
      <div className="relative rounded-3xl border border-black/5 bg-white/60 backdrop-blur-xl shadow-lg p-10 overflow-visible">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="mb-10">
          <SectionHeading
            badge="IEEE Student Branch"
            title={title}
            highlight={highlight}
            titleClassName="text-3xl font-bold uppercase tracking-widest text-slate-800 md:text-4xl"
          />
        </div>

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
