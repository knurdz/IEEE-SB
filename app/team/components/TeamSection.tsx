'use client';

import { useMemo, useState, memo } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/app/components/ui/SectionHeading';
import { fadeUp, fadeUpTransition, inViewOnce } from '@/lib/motion';
import { splitMembersIntoRows } from '../helpers';
import { Member } from '../types';
import MemberCard from './MemberCard';
import MobileMemberCard from './MobileMemberCard';

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
  const { topRow, bottomRow } = useMemo(() => splitMembersIntoRows(members), [members]);
  const hasTwoRows = bottomRow.length > 0;
  const mobileFeaturedMember = useMemo(() => {
    if (members.length <= 2) {
      return null;
    }

    const highestPriority = members[0]?.priority;
    if (highestPriority === undefined) {
      return null;
    }

    const topPriorityMembers = members.filter((member) => member.priority === highestPriority);
    return topPriorityMembers.length === 1 ? topPriorityMembers[0] : null;
  }, [members]);

  const mobileGridMembers = useMemo(() => {
    if (!mobileFeaturedMember) {
      return members;
    }

    return members.filter(
      (member) => member.sourceIndex !== mobileFeaturedMember.sourceIndex,
    );
  }, [members, mobileFeaturedMember]);

  return (
    <motion.div
      className="w-full max-w-[1100px] px-6 lg:px-10"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      onViewportEnter={() => !hasBeenInView && setHasBeenInView(true)}
      viewport={inViewOnce}
      transition={fadeUpTransition(sectionIndex * 0.12, 0.5)}
    >
      <div className="relative rounded-3xl border border-black/5 bg-white/60 backdrop-blur-xl shadow-lg p-10 overflow-visible">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="mb-10">
          <SectionHeading
            title={title}
            highlight={highlight}
            titleClassName="text-3xl font-bold uppercase tracking-[0.24em] text-slate-800 md:text-4xl"
          />
        </div>

        <div className="hidden md:block" style={{ overflow: 'visible' }}>
          {hasBeenInView ? (
            <>
              <div
                className="relative flex items-center justify-center"
                style={{ height: hasTwoRows ? '360px' : '340px', overflow: 'visible' }}
              >
                {topRow.map((member, index) => (
                  <MemberCard
                    key={`top-${member.committee}-${member.name}`}
                    member={member}
                    index={index}
                    totalInRow={topRow.length}
                    isTopRow
                  />
                ))}
              </div>

              {hasTwoRows && (
                <div
                  className="relative flex items-center justify-center mt-6"
                  style={{ height: '340px', overflow: 'visible' }}
                >
                  {bottomRow.map((member, index) => (
                    <MemberCard
                      key={`bottom-${member.committee}-${member.name}`}
                      member={member}
                      index={index}
                      totalInRow={bottomRow.length}
                      isTopRow={false}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="h-[340px] flex items-center justify-center text-slate-300 italic text-sm">
              Loading committee members...
            </div>
          )}
        </div>

        <div className="md:hidden mt-4">
          {hasBeenInView ? (
            <>
              {mobileFeaturedMember ? (
                <div className="mb-8 flex justify-center">
                  <div className="w-full sm:max-w-[calc(50%-1rem)]">
                    <MobileMemberCard member={mobileFeaturedMember} />
                  </div>
                </div>
              ) : null}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {mobileGridMembers.map((member) => (
                  <div key={`${member.committee}-${member.name}`} className="w-full">
                    <MobileMemberCard member={member} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-slate-300 italic text-sm">
              Loading members...
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
