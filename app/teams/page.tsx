'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/app/components/ui/SectionHeading';
import { fadeUp, fadeUpTransition } from '@/lib/motion';
import TeamSection from './components/TeamSection';
import NetworkVisualization from './components/NetworkVisualization';
import SiteBackground from '@/app/components/layout/SiteBackground';
import BackToTop from '../chapters/components/BackToTop';
import { meetOurTeam, executiveCommittee, leadershipBody } from './data';

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-900 overflow-x-hidden pt-20 relative">
      <SiteBackground />
      <NetworkVisualization />

      <div className="relative pt-28 pb-24 flex flex-col items-center gap-14 z-10">
        <motion.div
          className="px-6 text-center"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition()}
        >
          <SectionHeading
            badge="Network Nodes"
            title="Meet Our Teams"
            highlight="Teams"
            description="The core nodes of our network, orchestrating data flow and ensuring seamless transmission of knowledge across our community."
            titleClassName="text-5xl font-bold text-slate-800 md:text-6xl"
            descriptionClassName="text-slate-600 max-w-2xl mx-auto mt-4"
          />
        </motion.div>

        <TeamSection title="Meet Our Teams"       members={meetOurTeam}        sectionIndex={0} />
        <TeamSection title="Executive Committee"   members={executiveCommittee} sectionIndex={1} />
        <TeamSection title="Leadership Body"       members={leadershipBody}     sectionIndex={2} />
      </div>

      <BackToTop />
    </div>
  );
}
