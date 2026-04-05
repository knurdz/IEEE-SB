'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

/* ─── Types ──────────────────────────────────────────────────────────────── */
type Variant = 'arch5' | 'arch8' | 'leadership';

interface Member {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  phone?: string;
  nameSize?: string;
}

/* ─── Arch positioning tables ────────────────────────────────────────────── */
// Default (resting) transforms per card index per variant
const RESTING: Record<Variant, { z: number; scale: number; y: number; brightness: number }[]> = {
  arch5: [
    { z: 1, scale: 0.85, y: 20,  brightness: 0.80 },
    { z: 2, scale: 0.95, y: 0,   brightness: 0.90 },
    { z: 3, scale: 1.05, y: -20, brightness: 1.05 },
    { z: 2, scale: 0.95, y: 0,   brightness: 0.90 },
    { z: 1, scale: 0.85, y: 20,  brightness: 0.80 },
  ],
  arch8: [
    { z: 1, scale: 0.84, y: 25,  brightness: 0.75 },
    { z: 2, scale: 0.91, y: 10,  brightness: 0.85 },
    { z: 3, scale: 0.98, y: -5,  brightness: 0.95 },
    { z: 4, scale: 1.05, y: -20, brightness: 1.05 },
    { z: 4, scale: 1.05, y: -20, brightness: 1.05 },
    { z: 3, scale: 0.98, y: -5,  brightness: 0.95 },
    { z: 2, scale: 0.91, y: 10,  brightness: 0.85 },
    { z: 1, scale: 0.84, y: 25,  brightness: 0.75 },
  ],
  leadership: [
    { z: 1, scale: 0.95, y: 0,   brightness: 0.90 },
    { z: 2, scale: 0.95, y: 0,   brightness: 0.90 },
    { z: 3, scale: 1.05, y: -20, brightness: 1.05 },
    { z: 2, scale: 0.95, y: 0,   brightness: 0.90 },
    { z: 1, scale: 0.95, y: 0,   brightness: 0.90 },
  ],
};

// Hover transforms per card index per variant
const HOVER: Record<Variant, { scale: number; y: number }[]> = {
  arch5: [
    { scale: 0.90, y: 15  },
    { scale: 1.00, y: -5  },
    { scale: 1.10, y: -25 },
    { scale: 1.00, y: -5  },
    { scale: 0.90, y: 15  },
  ],
  arch8: [
    { scale: 0.89, y: 20  },
    { scale: 0.96, y: 5   },
    { scale: 1.03, y: -10 },
    { scale: 1.10, y: -25 },
    { scale: 1.10, y: -25 },
    { scale: 1.03, y: -10 },
    { scale: 0.96, y: 5   },
    { scale: 0.89, y: 20  },
  ],
  leadership: [
    { scale: 1.00, y: -5  },
    { scale: 1.00, y: -5  },
    { scale: 1.10, y: -25 },
    { scale: 1.00, y: -5  },
    { scale: 1.00, y: -5  },
  ],
};

/* ─── MemberCard ─────────────────────────────────────────────────────────── */
function MemberCard({
  member,
  index,
  variant,
  position,
}: {
  member: Member;
  index: number;
  variant: Variant;
  position: 'left' | 'middle' | 'right';
}) {
  const [hovered, setHovered] = useState(false);

  const rest  = RESTING[variant][index] ?? { z: 1, scale: 1, y: 0, brightness: 1 };
  const hover = HOVER[variant][index]   ?? { scale: 1.05, y: -10 };

  const cardStyle: React.CSSProperties = {
    position: 'relative',
    flex: '1 1 0',
    minWidth: 0,
    height: '85%',
    margin: '0 -20px',
    zIndex: hovered ? 10 : rest.z,
    transform: hovered
      ? `scale(${hover.scale}) translateY(${hover.y}px)`
      : `scale(${rest.scale}) translateY(${rest.y}px)`,
    filter: hovered ? 'brightness(1.1)' : `brightness(${rest.brightness})`,
    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card shell */}
      <div
        className={`relative w-full h-full rounded-2xl overflow-hidden border transition-colors duration-500 shadow-[−10px_0_30px_rgba(0,0,0,0.6)] ${
          hovered
            ? 'border-cyan-500/40 bg-[#111827]'
            : 'border-white/15 bg-gradient-to-b from-[#1e1e28]/90 to-[#0a0a0f]/95'
        }`}
      >
        {/* Member photo */}
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 50vw, 220px"
        />

        {/* Vertical or Horizontal Name based on position */}
        {position !== 'middle' ? (
          <div className={`absolute top-0 bottom-0 w-12 flex flex-col items-center justify-center z-20 gap-3 ${position === 'left' ? 'left-0' : 'right-0'}`}>
            <p
              className="text-cyan-400/80 text-[10px] tracking-widest uppercase whitespace-nowrap"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              {member.role}
            </p>
            <h3
              className={`font-semibold tracking-[0.2em] uppercase transition-colors duration-300 whitespace-nowrap ${hovered ? 'text-cyan-100' : 'text-white/90 shadow-black drop-shadow-md'}`}
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                ...(member.nameSize ? { fontSize: member.nameSize } : { fontSize: '1.1rem' })
              }}
            >
              {member.name}
            </h3>
          </div>
        ) : null}

        {/* Bottom gradient overlay + info */}
        <div
          className={`absolute inset-x-0 bottom-0 z-20 text-center transition-all duration-500 ${position === 'left' ? 'pl-12' : position === 'right' ? 'pr-12' : ''}`}
          style={{
            padding: hovered ? '120px 10px 45px' : '100px 10px 20px',
            background: hovered
              ? 'linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0.7) 60%, transparent 100%)'
              : 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)',
          }}
        >
          {position === 'middle' ? (
            <>
              <h3
                className={`font-semibold mb-1 transition-colors duration-300 ${hovered ? 'text-cyan-100' : 'text-white'}`}
                style={member.nameSize ? { fontSize: member.nameSize } : { fontSize: '1.05rem' }}
              >
                {member.name}
              </h3>
              <p className="text-cyan-400/80 text-xs mb-2">{member.role}</p>
            </>
          ) : null}

          {member.linkedin && (
            <p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                LinkedIn ↗
              </a>
            </p>
          )}
          {member.phone && (
            <p className="text-xs text-white/60 mt-1">{member.phone}</p>
          )}
        </div>

        {/* Cyan scan-line on hover */}
        <div
          className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-opacity duration-300 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Corner accent */}
        <div
          className={`absolute top-3 right-3 w-6 h-6 border-t border-r border-cyan-500/40 rounded-tr-md transition-opacity duration-300 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Cyan glow border on hover */}
        <div
          className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            boxShadow: '0 0 30px rgba(0,212,255,0.15), inset 0 0 30px rgba(0,212,255,0.05)',
          }}
        />
      </div>
    </div>
  );
}

/* ─── TeamSection ────────────────────────────────────────────────────────── */
function TeamSection({
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

        {/* Section badge + heading */}
        <div className="text-center mb-10">
          <motion.span
            className="inline-block px-3 py-1 text-[0.65rem] tracking-[0.3em] text-cyan-400 uppercase bg-cyan-500/10 rounded-full border border-cyan-500/20 mb-4"
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
                  className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
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

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function TeamPage() {
  /* ── Content (unchanged from My-UI-Design final branch) ── */
  const meetOurTeam: Member[] = [
    { name: 'John Smith', role: 'Product Manager',  image: '/member8.png' },
    { name: 'John Smith', role: 'Product Manager',  image: '/member7.png' },
    {
      name: 'VISHVA',
      role: 'Leader',
      image: '/member6.png',
      linkedin: 'https://www.linkedin.com/in/vishva-s-08977126b/',
      phone: '0768936124',
      nameSize: '25px',
    },
    { name: 'John Smith', role: 'Product Manager',  image: '/member7.png' },
    { name: 'John Smith', role: 'Product Manager',  image: '/member8.png' },
  ];

  const executiveCommittee: Member[] = [
    { name: 'Member 1', role: 'Role', image: '/member8.png' },
    { name: 'Member 2', role: 'Role', image: '/member7.png' },
    { name: 'Member 3', role: 'Role', image: '/member6.png' },
    { name: 'Member 4', role: 'Role', image: '/member7.png' },
    { name: 'Member 5', role: 'Role', image: '/member8.png' },
    { name: 'Member 6', role: 'Role', image: '/member7.png' },
    { name: 'Member 7', role: 'Role', image: '/member6.png' },
    { name: 'Member 8', role: 'Role', image: '/member8.png' },
  ];

  const leadershipBody: Member[] = [
    { name: 'Member 1', role: 'Role', image: '/member8.png' },
    { name: 'Member 2', role: 'Role', image: '/member7.png' },
    { name: 'Member 3', role: 'Role', image: '/member6.png' },
    { name: 'Member 4', role: 'Role', image: '/member7.png' },
    { name: 'Member 5', role: 'Role', image: '/member8.png' },
  ];

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
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
          {['M100,300 Q300,100 500,300 T900,300', 'M100,400 Q400,200 700,400', 'M200,500 Q500,300 800,500'].map(
            (d, i) => (
              <g key={i}>
                <path d={d} fill="none" stroke="url(#tg)" strokeWidth="1" strokeDasharray="5,5" />
                <circle r="3" fill="#00d4ff">
                  <animateMotion dur={`${3 + i}s`} repeatCount="indefinite" path={d} />
                </circle>
              </g>
            )
          )}
          <defs>
            <linearGradient id="tg">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

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
