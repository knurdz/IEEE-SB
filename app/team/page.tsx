'use client';

import { motion } from 'framer-motion';
import TeamSection from './components/TeamSection';
import NetworkVisualization from './components/NetworkVisualization';
import { meetOurTeam, executiveCommittee, leadershipBody } from './data';

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#000408] text-white overflow-x-hidden">
      {/* Subtle grid overlay — same as IEEE-SB grid-pattern utility */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Network visualization lines (decorative — matches IEEE-SB aesthetic) */}
      <NetworkVisualization />

      {/* Main content */}
      <div className="relative pt-28 pb-24 flex flex-col items-center gap-14">
        {/* ── Hero heading ── */}
        <motion.div
          className="text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 text-xs tracking-[0.3em] text-cyan-400 uppercase bg-cyan-500/10 rounded-full border border-cyan-500/20 mb-6">
            Network Nodes
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Meet Our{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Team
            </span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto leading-relaxed">
            The core nodes of our network, orchestrating data flow and ensuring seamless
            transmission of knowledge across our community.
          </p>
        </motion.div>

        {/* ── Sections ── */}
        <TeamSection title="Meet Our Team"       variant="arch5"       members={meetOurTeam}        sectionIndex={0} />
        <TeamSection title="Executive Committee" variant="arch8"       members={executiveCommittee} sectionIndex={1} />
        <TeamSection title="Leadership Body"     variant="leadership"  members={leadershipBody}     sectionIndex={2} />
      </div>
    </div>
  );
}
