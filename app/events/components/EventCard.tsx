'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Globe 
} from 'lucide-react';
import type { EventItem } from '../data';

interface EventCardProps {
  event: EventItem;
  index: number;
  priority?: boolean;
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

const EventCard = React.memo<EventCardProps>(function EventCard({ event, index, priority = false }) {
  const [imgFailed, setImgFailed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Use mainImage if available, else fallback to images array
  const displayImage = event.mainImage || (event.images && event.images.length > 0 ? event.images[0] : null);

  return (
    <motion.div
      className="group relative w-full glass-fiber border-primary/10 rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 40px rgba(0, 87, 157, 0.12), 0 0 1px rgba(0, 87, 157, 0.1) inset"
      }}
    >
      <Link href={`/events/${event.slug}`} className="absolute inset-0 z-20 cursor-pointer" aria-label={`View ${event.name}`} />
      
      <div className="flex flex-col md:flex-row min-h-[300px] md:min-h-[260px]">
        {/* Left Side: Image */}
        <div className="relative w-full md:w-[40%] h-[200px] md:h-auto overflow-hidden bg-surface-alt">
          {!imgFailed && displayImage && (
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            >
              <Image
                src={displayImage}
                alt={event.name || 'Event image'}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 30vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority={priority}
                onError={() => setImgFailed(true)}
              />
            </motion.div>
          )}
          
          {/* Category Badge on Image (Mobile) */}
          <div className="absolute top-4 left-4 md:hidden z-10">
             <span
              className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase backdrop-blur-md shadow-lg"
              style={{
                backgroundColor: `${event.categoryColor}33`,
                border: `1px solid ${event.categoryColor}`,
                color: event.categoryColor,
              }}
            >
              {event.category}
            </span>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10 md:to-white/20 pointer-events-none" />
        </div>

        {/* Right Side: Content */}
        <div className="relative p-6 md:p-8 flex flex-col justify-between flex-1 bg-white/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none">
          <div>
            <div className="hidden md:flex items-center justify-between mb-4">
              <span
                className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase font-orbitron"
                style={{
                  backgroundColor: `${event.categoryColor}15`,
                  border: `1px solid ${event.categoryColor}40`,
                  color: event.categoryColor,
                }}
              >
                {event.category}
              </span>
            </div>

            <h3 className="font-orbitron font-bold text-2xl md:text-3xl text-primary mb-2 group-hover:text-accent transition-colors duration-300">
              {event.name}
            </h3>

            {/* Removed event date display */}

            <p className="text-muted-foreground text-[14px] md:text-[15px] leading-relaxed line-clamp-3 md:line-clamp-2 max-w-xl">
              {event.description}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 text-primary font-bold text-[13px] uppercase tracking-widest group-hover:text-accent transition-colors duration-300 pointer-events-none">
              Explore Event
              <ArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </span>

            {/* Social Links / Website Buttons */}
            <div className="flex items-center gap-2 ml-auto relative z-30">
              {event.websiteUrl && (
                <a
                  href={event.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-primary/5 hover:bg-primary/10 text-primary transition-all duration-300 hover:scale-110"
                  title="Website"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Globe size={18} />
                </a>
              )}
              {event.facebookUrl && (['foresight', 'mercon'].includes(event.slug)) && (
                <a
                  href={event.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-primary/5 hover:bg-primary/10 text-primary transition-all duration-300 hover:scale-110 flex items-center justify-center w-9 h-9"
                  title="Facebook"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image src="/social/FB.svg" alt="Facebook" width={18} height={18} className="opacity-80 group-hover:opacity-100" />
                </a>
              )}
              {event.linkedinUrl && (
                <a
                  href={event.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-primary/5 hover:bg-primary/10 text-primary transition-all duration-300 hover:scale-110 flex items-center justify-center w-9 h-9"
                  title="LinkedIn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image src="/social/Linkdin.svg" alt="LinkedIn" width={18} height={18} className="opacity-80 group-hover:opacity-100" />
                </a>
              )}
              {event.instagramUrl && (
                <a
                  href={event.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-primary/5 hover:bg-primary/10 text-primary transition-all duration-300 hover:scale-110 flex items-center justify-center w-9 h-9"
                  title="Instagram"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image src="/social/Insta.svg" alt="Instagram" width={18} height={18} className="opacity-80 group-hover:opacity-100" />
                </a>
              )}
              {event.whatsappUrl && (
                <a
                  href={event.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-primary/5 hover:bg-primary/10 text-primary transition-all duration-300 hover:scale-110 flex items-center justify-center w-9 h-9"
                  title="WhatsApp"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image src="/social/Whatsapp.svg" alt="WhatsApp" width={18} height={18} className="opacity-80 group-hover:opacity-100" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative pulse line on top */}
      <motion.div 
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ width: '100%' }}
      />
    </motion.div>
  );
});

export default EventCard;
