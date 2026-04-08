'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/cn';
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

  const restingTransform = RESTING[variant][index] ?? {
    z: 1,
    scale: 1,
    y: 0,
    brightness: 1,
  };
  const hoverTransform = HOVER[variant][index] ?? { scale: 1.05, y: -10 };

  const cardStyle: React.CSSProperties = {
    position: 'relative',
    flex: '1 1 0',
    minWidth: 0,
    height: '85%',
    margin: '0 -20px',
    zIndex: hovered ? 10 : restingTransform.z,
    transform: hovered
      ? `scale(${hoverTransform.scale}) translateY(${hoverTransform.y}px)`
      : `scale(${restingTransform.scale}) translateY(${restingTransform.y}px)`,
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
          hovered
            ? 'border-primary/40 bg-white shadow-[0_10px_40px_rgba(0,87,157,0.15)] ring-1 ring-primary/20'
            : 'border-black/5 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]',
        )}
      >
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 50vw, 220px"
          />

          {position !== 'middle' ? (
            <div className={`absolute top-0 bottom-0 w-12 flex flex-col items-center justify-center z-20 gap-3 ${position === 'left' ? 'left-0' : 'right-0'}`}>
              <p
                className="text-primary/80 text-[10px] tracking-widest uppercase whitespace-nowrap drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                {member.role}
              </p>
              <h3
                className={`font-semibold tracking-[0.2em] uppercase transition-colors duration-300 whitespace-nowrap ${hovered ? 'text-primary' : 'text-slate-900'} font-orbitron drop-shadow-[0_0_12px_rgba(255,255,255,1)]`}
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

          <div
            className={`absolute inset-x-0 bottom-0 z-20 text-center transition-all duration-500 ${position === 'left' ? 'pl-12' : position === 'right' ? 'pr-12' : ''}`}
            style={{
              padding: hovered ? '120px 10px 45px' : '100px 10px 20px',
              background: hovered
                ? 'linear-gradient(to top, rgba(255,255,255,1) 10%, rgba(255,255,255,0.7) 60%, transparent 100%)'
                : 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
            }}
          >
            {position === 'middle' ? (
              <>
                <h3
                  className={`font-semibold mb-1 transition-colors duration-300 ${hovered ? 'text-primary' : 'text-slate-900'} font-orbitron`}
                  style={member.nameSize ? { fontSize: member.nameSize } : { fontSize: '1.05rem' }}
                >
                  {member.name}
                </h3>
                <p className="text-primary/80 text-xs mb-2">{member.role}</p>
              </>
            ) : null}

            {member.linkedin && (
              <p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:text-blue-700 transition-colors"
                >
                  LinkedIn ↗
                </a>
              </p>
            )}
            {member.phone && (
              <p className="text-xs text-slate-600 mt-1">{member.phone}</p>
            )}
          </div>

          <div
            className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent transition-opacity duration-300 ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div
            className={`absolute top-3 right-3 w-6 h-6 border-t border-r border-primary/40 rounded-tr-md transition-opacity duration-300 ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div
            className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              boxShadow: '0 0 30px rgba(0, 87, 157, 0.1), inset 0 0 20px rgba(0, 87, 157, 0.05)',
            }}
          />
      </div>
    </div>
  );
}
