'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/app/components/ui/SectionHeading';
import { fadeUp, fadeUpTransition } from '@/lib/motion';
import TeamSection from './components/TeamSection';
import NetworkVisualization from './components/NetworkVisualization';
import SiteBackground from '@/app/components/layout/SiteBackground';
import { teamSections } from './data';

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden pt-20 relative">
      <SiteBackground />
      <NetworkVisualization />

      <div className="relative pt-16 pb-16 flex flex-col items-center gap-10 z-10">
        <motion.div
          className="px-6 text-center"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition()}
        >
          <SectionHeading
            badge="IEEE Student Branch"
            title="Meet Our Teams"
            highlight="Teams"
            description="A connected structure of executive leaders and committee teams, organized to keep the branch moving with clarity, collaboration, and shared ownership."
            titleClassName="text-5xl font-bold text-slate-800 md:text-6xl"
            descriptionClassName="text-slate-600 max-w-2xl mx-auto mt-4"
          />
        </motion.div>

        {teamSections.map((section, index) => (
          <TeamSection
            key={section.title}
            title={section.title}
            members={section.members}
            sectionIndex={index}
          />
        ))}
      </div>
    </div>
  );
}
