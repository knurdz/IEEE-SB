'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/cn';
import { Member } from '../types';
import { generateArchTransforms } from '../constants';

export default function MemberCard({
  member,
  index,
  totalInRow,
  isTopRow = true,
}: {
  member: Member;
  index: number;
  totalInRow: number;
  isTopRow?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isLead = !!member.isLead;

  const { resting, hover } = useMemo(
    () => generateArchTransforms(totalInRow, isTopRow),
    [totalInRow, isTopRow],
  );

  const restingTransform = resting[index] ?? { z: 1, scale: 1, y: 0, brightness: 1 };
  const hoverTransform = hover[index] ?? { scale: 1.05, y: -10 };

  // Dynamic name font sizing based on name length
  const nameFontSize = member.nameSize
    ? member.nameSize
    : member.name.length > 14
      ? '0.82rem'
      : member.name.length > 10
        ? '0.92rem'
        : '1.05rem';

  const cardStyle: React.CSSProperties = {
    position: 'relative',
    flex: isLead ? '1.25 1 0' : '1 1 0',
    minWidth: 0,
    height: isLead && isTopRow ? '92%' : '85%',
    margin: '0 -16px',
    zIndex: hovered ? 10 : restingTransform.z + (isLead ? 2 : 0),
    transform: hovered
      ? `scale(${hoverTransform.scale + (isLead ? 0.03 : 0)}) translateY(${hoverTransform.y - (isLead ? 5 : 0)}px)`
      : `scale(${restingTransform.scale + (isLead ? 0.03 : 0)}) translateY(${restingTransform.y - (isLead ? 8 : 0)}px)`,
    filter: hovered ? 'brightness(1.1)' : `brightness(${restingTransform.brightness})`,
    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={cn(
          'relative h-full w-full overflow-hidden rounded-2xl border transition-all duration-500',
          isLead
            ? hovered
              ? 'border-primary/50 bg-white shadow-[0_12px_48px_rgba(0,87,157,0.22)] ring-2 ring-primary/30'
              : 'border-primary/25 bg-white shadow-[0_6px_28px_rgba(0,87,157,0.12)] ring-1 ring-primary/15'
            : hovered
              ? 'border-primary/40 bg-white shadow-[0_10px_40px_rgba(0,87,157,0.15)] ring-1 ring-primary/20'
              : 'border-black/5 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]',
        )}
      >
        {/* Lead badge */}
        {isLead && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30">
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary to-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-md">
              <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor" className="opacity-90">
                <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.28l-4.77 2.44.91-5.33L2.27 6.62l5.34-.78L10 1z" />
              </svg>
              Lead
            </span>
          </div>
        )}

        {/* Lead glow ring */}
        {isLead && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none z-0"
            style={{
              background: 'linear-gradient(135deg, rgba(0,87,157,0.08), rgba(0,139,230,0.05))',
            }}
          />
        )}

        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 50vw, 220px"
        />

        {/* Bottom overlay with horizontal text — always visible */}
        <div
          className="absolute inset-x-0 bottom-0 z-20 text-center transition-all duration-500"
          style={{
            padding: hovered ? '110px 10px 30px' : '90px 10px 16px',
            background: hovered
              ? 'linear-gradient(to top, rgba(255,255,255,1) 10%, rgba(255,255,255,0.75) 55%, transparent 100%)'
              : 'linear-gradient(to top, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.55) 50%, transparent 100%)',
          }}
        >
          <h3
            className={cn(
              'font-semibold mb-0.5 transition-colors duration-300 font-orbitron truncate px-1',
              hovered ? 'text-primary' : 'text-slate-900',
            )}
            style={{ fontSize: nameFontSize }}
            title={member.name}
          >
            {member.name}
          </h3>
          <p className="text-primary/70 text-[10px] tracking-widest uppercase truncate px-1">
            {member.role}
          </p>

          {/* Social links — show on hover */}
          <div
            className={cn(
              'flex flex-wrap justify-center gap-2 mt-2 transition-all duration-300',
              hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none',
            )}
          >
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-primary hover:text-blue-700 transition-colors"
              >
                LinkedIn ↗
              </a>
            )}
            {member.phone && (
              <span className="text-[10px] text-slate-500">{member.phone}</span>
            )}
          </div>
        </div>

        {/* Hover bottom accent line */}
        <div
          className={cn(
            'absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent transition-opacity duration-300',
            hovered ? 'opacity-100' : 'opacity-0',
          )}
        />

        {/* Hover corner accent */}
        <div
          className={cn(
            'absolute top-3 right-3 w-6 h-6 border-t border-r border-primary/40 rounded-tr-md transition-opacity duration-300',
            hovered ? 'opacity-100' : 'opacity-0',
          )}
        />

        {/* Hover glow overlay */}
        <div
          className={cn(
            'absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none',
            hovered ? 'opacity-100' : 'opacity-0',
          )}
          style={{
            boxShadow: '0 0 30px rgba(0, 87, 157, 0.1), inset 0 0 20px rgba(0, 87, 157, 0.05)',
          }}
        />
      </div>
    </div>
  );
}
