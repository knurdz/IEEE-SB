'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Event card with data stream effect
function EventCard({
  event,
  index,
  isActive,
  onClick,
}: {
  event: {
    id: number;
    title: string;
    date: string;
    category: string;
    description: string;
    status: 'upcoming' | 'ongoing' | 'past';
  };
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const statusColors = {
    upcoming: 'from-cyan-500 to-blue-500',
    ongoing: 'from-green-500 to-cyan-500',
    past: 'from-gray-500 to-gray-600',
  };

  const statusLabels = {
    upcoming: 'Upcoming',
    ongoing: 'Live Now',
    past: 'Completed',
  };

  return (
    <motion.div
      className={`group relative cursor-pointer ${isActive ? 'col-span-2 row-span-2' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onClick={onClick}
      layout
    >
      <div
        className={`h-full p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#0a1520] to-[#050a10] border transition-all duration-500 ${
          isActive
            ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/20'
            : 'border-cyan-500/10 hover:border-cyan-500/30'
        }`}
      >
        {/* Data stream line */}
        <div className="absolute top-0 left-0 right-0 h-px overflow-hidden rounded-t-2xl">
          <motion.div
            className={`h-full bg-gradient-to-r ${statusColors[event.status]}`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
          />
          <motion.div
            className="absolute top-0 left-0 w-8 h-full bg-white/50 blur-sm"
            animate={{ x: ['-100%', '500%'] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
          />
        </div>

        {/* Status badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${statusColors[event.status]} text-white`}
          >
            {event.status === 'ongoing' && (
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            )}
            {statusLabels[event.status]}
          </span>
          <span className="text-xs text-white/40">{event.category}</span>
        </div>

        {/* Content */}
        <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 group-hover:text-cyan-100 transition-colors">
          {event.title}
        </h3>

        <p className="text-sm text-cyan-400/80 mb-3 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {event.date}
        </p>

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                {event.description}
              </p>
              <motion.button
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium rounded-full"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0,212,255,0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                Register Now
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {!isActive && (
          <p className="text-white/40 text-sm line-clamp-2">{event.description}</p>
        )}

        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-10">
            <path
              d="M0,100 Q100,100 100,0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-cyan-400"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

// Timeline connector
function TimelineConnector() {
  return (
    <div className="hidden lg:flex absolute left-0 top-0 bottom-0 w-px items-center">
      <div className="w-full h-3/4 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />
      <motion.div
        className="absolute w-2 h-2 bg-cyan-400 rounded-full -left-[3px]"
        animate={{ y: ['0%', '100%', '0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

export default function EventsSection() {
  const [activeEvent, setActiveEvent] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const events = [
    {
      id: 1,
      title: 'IEEE Xtreme 18.0',
      date: 'October 26, 2024',
      category: 'Competition',
      description: 'A 24-hour global coding competition challenging teams to solve complex algorithmic problems. Join thousands of engineers worldwide in this ultimate test of skill.',
      status: 'upcoming' as const,
    },
    {
      id: 2,
      title: 'TechTalk: AI in Modern Networks',
      date: 'November 5, 2024',
      category: 'Workshop',
      description: 'Explore how artificial intelligence is revolutionizing network optimization, fiber optic communications, and data transmission technologies.',
      status: 'upcoming' as const,
    },
    {
      id: 3,
      title: 'Fiber Optics Workshop',
      date: 'November 15, 2024',
      category: 'Hands-on',
      description: 'Hands-on workshop covering fiber optic fundamentals, splicing techniques, and modern communication systems. Perfect for aspiring telecommunications engineers.',
      status: 'upcoming' as const,
    },
    {
      id: 4,
      title: 'Annual Tech Summit',
      date: 'December 1-3, 2024',
      category: 'Conference',
      description: 'Our flagship event bringing together industry leaders, researchers, and students to discuss the future of technology and innovation.',
      status: 'upcoming' as const,
    },
    {
      id: 5,
      title: 'Hackathon 2024',
      date: 'September 20, 2024',
      category: 'Competition',
      description: 'A 48-hour hackathon where teams built innovative solutions for real-world problems. Over 50 teams participated in this exciting event.',
      status: 'past' as const,
    },
    {
      id: 6,
      title: 'Industry Visit: Dialog Axiata',
      date: 'August 15, 2024',
      category: 'Field Trip',
      description: 'Exclusive tour of Dialog\'s NOC and data centers, exploring their fiber optic infrastructure and 5G network deployment.',
      status: 'past' as const,
    },
  ];

  return (
    <section
      ref={containerRef}
      id="events"
      className="relative py-32 bg-[#000408] overflow-hidden"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating data particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -500],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.span
            className="inline-block px-4 py-1.5 text-xs tracking-[0.3em] text-cyan-400 uppercase bg-cyan-500/10 rounded-full border border-cyan-500/20 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Data Stream
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Upcoming{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Events
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-white/50 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Stay connected with our data stream of events, workshops, and competitions.
            Each event is a pulse of knowledge transmitted directly to you.
          </motion.p>
        </div>

        {/* Events grid */}
        <div className="relative">
          <TimelineConnector />
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            {events.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
                isActive={activeEvent === event.id}
                onClick={() => setActiveEvent(activeEvent === event.id ? null : event.id)}
              />
            ))}
          </motion.div>
        </div>

        {/* View all button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="group inline-flex items-center gap-3 px-8 py-4 border border-cyan-500/30 text-cyan-400 rounded-full hover:bg-cyan-500/10 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Events</span>
            <motion.span
              className="inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
