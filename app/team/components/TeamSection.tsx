'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/app/components/ui/SectionHeading';
import { fadeUp, fadeUpTransition, inViewOnce } from '@/lib/motion';
import { Member } from '../types';
import MemberCard from './MemberCard';

export default function TeamSection({
  title,
  members,
  sectionIndex,
}: {
  title: string;
  members: Member[];
  sectionIndex: number;
}) {
  const [hasBeenInView, setHasBeenInView] = useState(sectionIndex === 0);
  const highlight = title.replace(/ Committee$/, '');

  // Find the highest priority score in this committee to highlight the lead(s)
  const highestPriority = Math.min(...members.map((m) => m.priority));
  
  // Separate leads from regular members for visual hierarchy, unless it's ExCom or Leadership Body
  // where we might just want to list everyone in order. We can use a unified flow but emphasize leads.
  const leads = members.filter((m) => m.priority === highestPriority);
  const regularMembers = members.filter((m) => m.priority !== highestPriority);

  return (
    <motion.div
      className="w-full max-w-[68.75rem] px-6 lg:px-10"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      onViewportEnter={() => !hasBeenInView && setHasBeenInView(true)}
      viewport={inViewOnce}
      transition={fadeUpTransition(sectionIndex * 0.12, 0.5)}
    >
      <div className="relative rounded-3xl border border-black/5 bg-white/60 backdrop-blur-xl shadow-lg p-8 md:p-12 overflow-visible">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="mb-12">
          <SectionHeading
            title={title}
            highlight={highlight}
            titleClassName="text-3xl font-bold uppercase tracking-[0.24em] text-slate-800 md:text-4xl"
          />
        </div>

        {hasBeenInView ? (
          <div className="flex flex-col gap-10 md:gap-14 items-center">
            {/* Leads Section */}
            {leads.length > 0 && (
              <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {leads.map((member, index) => (
                  <MemberCard
                    key={`${member.committee}-${member.name}`}
                    member={member}
                    index={index}
                    isLead={true}
                  />
                ))}
              </div>
            )}

            {/* Regular Members Section */}
            {regularMembers.length > 0 && (
              <div className="flex flex-wrap justify-center gap-8 md:gap-10">
                {regularMembers.map((member, index) => (
                  <MemberCard
                    key={`${member.committee}-${member.name}`}
                    member={member}
                    index={index}
                    isLead={false}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="min-h-[22.5rem] flex items-center justify-center text-slate-300 italic text-sm">
            Loading committee members...
          </div>
        )}
      </div>
    </motion.div>
  );
}
