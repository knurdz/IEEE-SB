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
  // Split title to match chapters title style
  const words = title.split(' ');
  const firstPart = words[0];
  const secondPart = words.slice(1).join(' ');

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
      <div className="relative rounded-2xl border border-slate-200 bg-white/40 p-8 md:p-12 overflow-visible">
        {/* Modern vertical line division instead of glowing horizontal line */}
        {sectionIndex > 0 && (
          <div className="absolute -top-16 md:-top-24 left-1/2 -translate-x-1/2 w-[1px] h-16 md:h-24 bg-gradient-to-b from-transparent via-slate-300 to-slate-200" />
        )}

        <div className="mb-12 flex justify-center text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-[3.5rem] text-gray-800 flex flex-col gap-1 md:gap-2 font-sans tracking-tight">
            <span className="font-light text-gray-700">
              {firstPart}
            </span>
            {secondPart && (
              <span className="font-black font-serif text-gray-900 leading-[1.1]">
                {secondPart}
              </span>
            )}
          </h2>
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
