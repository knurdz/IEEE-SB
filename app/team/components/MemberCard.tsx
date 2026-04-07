'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Member, Variant } from '../types';
import { RESTING, HOVER } from '../constants';

export default function MemberCard({
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
