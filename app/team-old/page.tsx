'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/app/components/ui/SectionHeading';
import { fadeUp, fadeUpTransition } from '@/lib/motion';
import TeamSection from '../components/TeamSection';
import NetworkVisualization from '../components/NetworkVisualization';
import { meetOurTeam, executiveCommittee, leadershipBody } from '../data';

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-background text-white overflow-x-hidden pt-20">
      <div className="grid-pattern fixed inset-0 pointer-events-none opacity-40" />
      <NetworkVisualization />

      <div className="relative pt-28 pb-24 flex flex-col items-center gap-14">
        <motion.div
          className="px-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition()}
        >
          <SectionHeading
            badge="Network Nodes"
            title="Meet Our Team"
            highlight="Team"
            description="The core nodes of our network, orchestrating data flow and ensuring seamless transmission of knowledge across our community."
            titleClassName="text-5xl font-bold text-white md:text-6xl"
            descriptionClassName="text-white/60"
          />
        </motion.div>

        <TeamSection title="Meet Our Team"       variant="arch5"       members={meetOurTeam}        sectionIndex={0} />
        <TeamSection title="Executive Committee" variant="arch8"       members={executiveCommittee} sectionIndex={1} />
        <TeamSection title="Leadership Body"     variant="leadership"  members={leadershipBody}     sectionIndex={2} />
      </div>
    </div>
  );
}