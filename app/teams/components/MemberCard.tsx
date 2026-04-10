"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { Member } from "../types";
import { generateArchTransforms } from "../constants";

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

  const restingTransform = resting[index] ?? {
    z: 1,
    scale: 1,
    y: 0,
    brightness: 1,
  };
  const hoverTransform = hover[index] ?? { scale: 1.05, y: -10 };

  // Dynamic name font sizing based on name length
  const nameFontSize = member.nameSize
    ? member.nameSize
    : member.name.length > 14
      ? "0.82rem"
      : member.name.length > 10
        ? "0.92rem"
        : "1.05rem";

  const cardStyle: React.CSSProperties = {
    position: "relative",
    flex: "0 0 190px",
    height: "340px",
    margin: "0 4px",
    zIndex: hovered ? 20 : isLead ? 15 : (restingTransform.z || 1),
    transform: hovered
      ? `scale(${isLead ? 1.1 : 1.05}) translateY(-15px)`
      : isLead
        ? `scale(1.05) translateY(${restingTransform.y - 12}px)`
        : `translateY(${restingTransform.y}px)`,
    filter: hovered
      ? "brightness(1.1)"
      : isLead ? "brightness(1.08)" : `brightness(${restingTransform.brightness})`,
    transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={cn(
          "relative h-full w-full overflow-hidden rounded-2xl border transition-all duration-500",
          isLead
            ? hovered
              ? "border-primary/60 bg-white shadow-[0_15px_50px_rgba(0,87,157,0.3)] ring-2 ring-primary/40"
              : "border-primary/40 bg-white shadow-[0_10px_35px_rgba(0,87,157,0.22)] ring-1 ring-primary/30"
            : hovered
              ? "border-primary/40 bg-white shadow-[0_10px_40px_rgba(0,87,157,0.15)] ring-1 ring-primary/20"
              : "border-black/5 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]",
        )}
      >
        {/* Lead glow effect */}
        {isLead && (
          <div
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent z-30"
          />
        )}

        {/* Lead glow ring */}
        {isLead && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none z-0"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, rgba(0,87,157,0.15), transparent 70%)",
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

        {/* Bottom overlay — always visible */}
        <div
          className="absolute inset-x-0 bottom-0 z-20 text-center transition-all duration-500"
          style={{
            padding: hovered ? "100px 10px 25px" : "80px 10px 20px",
            background: hovered
              ? "linear-gradient(to top, rgba(255,255,255,1) 15%, rgba(255,255,255,0.9) 55%, transparent 100%)"
              : "linear-gradient(to top, rgba(255,255,255,0.98) 10%, rgba(255,255,255,0.7) 50%, transparent 100%)",
          }}
        >
          <h3
            className={cn(
              "font-semibold mb-0.5 transition-colors duration-300 font-orbitron truncate px-1",
              (hovered || isLead) ? "text-primary" : "text-slate-900",
            )}
            style={{ fontSize: nameFontSize }}
            title={member.name}
          >
            {member.name}
          </h3>
          <p className="text-primary/70 text-[10px] tracking-widest uppercase truncate px-1 mb-3">
            {member.role}
          </p>

          {/* Social links — icons, visible before hover but prominent on hover */}
          <div
            className={cn(
              "flex justify-center gap-4 transition-all duration-300",
              (hovered || isLead) ? "opacity-100 translate-y-0" : "opacity-70 translate-y-0",
            )}
          >
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-blue-700 transition-colors p-1"
                title="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="text-primary hover:text-blue-700 transition-colors p-1"
                title="Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>
            )}
            {member.phone && !member.email && (
              <span className="text-[10px] text-slate-500 flex items-center" title="Phone">
                {member.phone}
              </span>
            )}
          </div>
        </div>

        {/* Hover bottom accent line */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent transition-opacity duration-300",
            hovered ? "opacity-100" : "opacity-0",
          )}
        />

        {/* Hover corner accent */}
        <div
          className={cn(
            "absolute top-3 right-3 w-6 h-6 border-t border-r border-primary/40 rounded-tr-md transition-opacity duration-300",
            hovered ? "opacity-100" : "opacity-0",
          )}
        />

        {/* Hover glow overlay */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none",
            hovered ? "opacity-100" : "opacity-0",
          )}
          style={{
            boxShadow:
              "0 0 30px rgba(0, 87, 157, 0.1), inset 0 0 20px rgba(0, 87, 157, 0.05)",
          }}
        />
      </div>
    </div>
  );
}
