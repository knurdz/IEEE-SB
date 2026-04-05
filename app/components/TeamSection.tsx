'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Team member card with fiber glow
function TeamCard({
  member,
  index,
}: {
  member: {
    name: string;
    role: string;
    image: string;
    socials: { type: string; url: string }[];
  };
  index: number;
}) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="relative p-1 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20 group-hover:from-cyan-500/40 group-hover:to-blue-500/40 transition-all duration-500">
        <div className="relative overflow-hidden rounded-2xl bg-[#0a1520]">
          {/* Image placeholder with initials */}
          <div className="aspect-square relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/50 to-blue-900/50 flex items-center justify-center">
              <span className="text-4xl font-bold text-cyan-400/50">
                {member.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>

            {/* Fiber overlay effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, transparent 40%, rgba(0,212,255,0.1) 50%, transparent 60%)',
                  backgroundSize: '200% 200%',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Data lines */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0a1520] to-transparent" />
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Info */}
          <div className="p-5">
            <h3 className="text-lg font-semibold text-white group-hover:text-cyan-100 transition-colors">
              {member.name}
            </h3>
            <p className="text-sm text-cyan-400/70 mb-4">{member.role}</p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {member.socials.map((social) => (
                <motion.a
                  key={social.type}
                  href={social.url}
                  className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-white/50 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.type === 'linkedin' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  )}
                  {social.type === 'github' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  )}
                  {social.type === 'twitter' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Decorative corner */}
          <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-cyan-500/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute -inset-4 bg-cyan-500/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
    </motion.div>
  );
}

// Network connection visualization
function NetworkVisualization() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      <svg className="w-full h-full" viewBox="0 0 1000 600">
        {/* Connection lines */}
        {[
          'M100,300 Q300,100 500,300 T900,300',
          'M100,400 Q400,200 700,400',
          'M200,500 Q500,300 800,500',
        ].map((d, i) => (
          <g key={i}>
            <path
              d={d}
              fill="none"
              stroke="url(#fiber-line-gradient)"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
            <motion.circle
              r="3"
              fill="#00d4ff"
              filter="url(#glow)"
            >
              <animateMotion
                dur={`${3 + i}s`}
                repeatCount="indefinite"
                path={d}
              />
            </motion.circle>
          </g>
        ))}
        <defs>
          <linearGradient id="fiber-line-gradient">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const team = [
    {
      name: 'Kamal Perera',
      role: 'Chairperson',
      image: '/team/chair.jpg',
      socials: [
        { type: 'linkedin', url: '#' },
        { type: 'github', url: '#' },
      ],
    },
    {
      name: 'Nimali Silva',
      role: 'Vice Chairperson',
      image: '/team/vice.jpg',
      socials: [
        { type: 'linkedin', url: '#' },
        { type: 'twitter', url: '#' },
      ],
    },
    {
      name: 'Ashan Fernando',
      role: 'Secretary',
      image: '/team/secretary.jpg',
      socials: [
        { type: 'linkedin', url: '#' },
        { type: 'github', url: '#' },
      ],
    },
    {
      name: 'Dilini Jayawardena',
      role: 'Treasurer',
      image: '/team/treasurer.jpg',
      socials: [
        { type: 'linkedin', url: '#' },
        { type: 'twitter', url: '#' },
      ],
    },
    {
      name: 'Ravindu Wickrama',
      role: 'Technical Lead',
      image: '/team/tech.jpg',
      socials: [
        { type: 'linkedin', url: '#' },
        { type: 'github', url: '#' },
      ],
    },
    {
      name: 'Sachini Rathnayake',
      role: 'Events Coordinator',
      image: '/team/events.jpg',
      socials: [
        { type: 'linkedin', url: '#' },
        { type: 'twitter', url: '#' },
      ],
    },
    {
      name: 'Nuwan Bandara',
      role: 'Media Lead',
      image: '/team/media.jpg',
      socials: [
        { type: 'linkedin', url: '#' },
        { type: 'github', url: '#' },
      ],
    },
    {
      name: 'Ishara Mendis',
      role: 'Webmaster',
      image: '/team/web.jpg',
      socials: [
        { type: 'linkedin', url: '#' },
        { type: 'github', url: '#' },
      ],
    },
  ];

  return (
    <section
      ref={containerRef}
      id="team"
      className="relative py-32 bg-[#000408] overflow-hidden"
    >
      {/* Network visualization */}
      <NetworkVisualization />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.span
            className="inline-block px-4 py-1.5 text-xs tracking-[0.3em] text-cyan-400 uppercase bg-cyan-500/10 rounded-full border border-cyan-500/20 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Network Nodes
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Our{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Team
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-white/50 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            The core nodes of our network, orchestrating data flow and ensuring
            seamless transmission of knowledge across our community.
          </motion.p>
        </div>

        {/* Team grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>

        {/* Join the team CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-white/40 mb-4">Want to be a node in our network?</p>
          <motion.button
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 font-medium rounded-full border border-cyan-500/30 hover:border-cyan-500/50 transition-all"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,212,255,0.2)' }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Join Our Team
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
