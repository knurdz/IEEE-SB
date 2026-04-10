'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/app/components/ui/SectionHeading';
import { fadeUp, fadeUpTransition, inViewOnce } from '@/lib/motion';
import { Member } from '../types';
import MemberCard from './MemberCard';
import MobileMemberCard from './MobileMemberCard';

/**
 * Split members into top-row & bottom-row, placing the lead at the center of
 * the top row. Adapts based on total member count.
 *
 * | Size | Top Row | Bottom Row |
 * |------|---------|------------|
 * | 3    | 3       | —          |
 * | 4    | 3       | 1          |
 * | 5    | 5       | —          |
 * | 6    | 3       | 3          |
 * | 7    | 4       | 3          |
 * | 8    | 4       | 4          |
 * | 9    | 5       | 4          |
 */
function splitRows(members: Member[]): { topRow: Member[]; bottomRow: Member[] } {
  const n = members.length;

  // Find the lead
  const leadIdx = members.findIndex((m) => m.isLead);
  // Separate lead from the rest
  const lead = leadIdx >= 0 ? members[leadIdx] : members[0];
  const others = members.filter((_, i) => i !== (leadIdx >= 0 ? leadIdx : 0));

  if (n <= 3) {
    // Single row — place lead in center
    const half = Math.floor(others.length / 2);
    const left = others.slice(0, half);
    const right = others.slice(half);
    return { topRow: [...left, lead, ...right], bottomRow: [] };
  }

  if (n === 4) {
    return { topRow: [others[0], lead, others[1]], bottomRow: [others[2]] };
  }

  if (n === 5) {
    return { topRow: [others[0], others[1], lead, others[2], others[3]], bottomRow: [] };
  }

  // For 6+ members: compute top row size based on user request
  let topSize: number;
  if (n === 6) topSize = 3;
  else if (n === 7) topSize = 3;
  else if (n === 8) topSize = 3;
  else topSize = 5; // 9+ members

  // topSize includes the lead, so flanking count = topSize - 1
  const flankCount = topSize - 1;
  const leftFlank = others.slice(0, Math.floor(flankCount / 2));
  const rightFlank = others.slice(Math.floor(flankCount / 2), flankCount);
  const bottomMembers = others.slice(flankCount);

  return {
    topRow: [...leftFlank, lead, ...rightFlank],
    bottomRow: bottomMembers,
  };
}

export default function TeamSection({
  title,
  members,
  sectionIndex,
}: {
  title: string;
  members: Member[];
  sectionIndex: number;
}) {
  const highlight = title.split(' ').slice(-1)[0];
  const { topRow, bottomRow } = useMemo(() => splitRows(members), [members]);

  // Order mobile: lead first, then others
  const mobileMembers = useMemo(() => {
    const lead = members.find((m) => m.isLead);
    const others = members.filter((m) => !m.isLead);
    return lead ? [lead, ...others] : members;
  }, [members]);

  const hasTwoRows = bottomRow.length > 0;

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

        {/* Desktop layout */}
        <div className="hidden md:block" style={{ overflow: 'visible' }}>
          {/* Top row */}
          <div
            className="relative flex items-center justify-center"
            style={{ height: hasTwoRows ? '380px' : '520px', overflow: 'visible' }}
          >
            {topRow.map((member, i) => (
              <MemberCard
                key={`top-${i}`}
                member={member}
                index={i}
                totalInRow={topRow.length}
                isTopRow
              />
            ))}
          </div>

          {/* Bottom row */}
          {hasTwoRows && (
            <div
              className="relative flex items-center justify-center mt-6"
              style={{ height: '380px', overflow: 'visible' }}
            >
              {bottomRow.map((member, i) => (
                <MemberCard
                  key={`bottom-${i}`}
                  member={member}
                  index={i}
                  totalInRow={bottomRow.length}
                  isTopRow={false}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mobile grid view — lead first, conditionally centered for odd counts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:hidden mt-4">
          {mobileMembers.map((member, i) => {
            const isOdd = members.length % 2 !== 0;
            const shouldCenterLead = member.isLead && isOdd;
            
            return (
              <div
                key={i}
                className={
                  shouldCenterLead
                    ? 'sm:col-span-2 flex justify-center'
                    : ''
                }
              >
                <div className={shouldCenterLead ? 'w-full sm:max-w-[calc(50%-1rem)]' : 'w-full'}>
                  <MobileMemberCard member={member} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
