"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { generateArchTransforms } from "../constants";
import { Member } from "../types";

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
  const hasActions = Boolean(member.linkedin || member.email);

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
  const hoverTransform = hover[index] ?? {
    scale: 1.02,
    y: -10,
  };

  const nameFontSize =
    member.name.length > 22
      ? "0.8rem"
      : member.name.length > 18
        ? "0.88rem"
        : member.name.length > 14
          ? "0.96rem"
          : "1.05rem";

  const positionFontSize =
    member.position.length > 28
      ? "0.5rem"
      : member.position.length > 20
        ? "0.56rem"
        : "0.62rem";

  const isLead = member.priority < 9;

  const cardStyle: React.CSSProperties = {
    position: "relative",
    flex: "0 0 190px",
    height: "340px",
    margin: "0 4px",
    zIndex: hovered ? 30 : isLead ? 10 : restingTransform.z || 1,
    transform: hovered
      ? `translateY(${hoverTransform.y}px) scale(${hoverTransform.scale})`
      : `translateY(${restingTransform.y}px) scale(${restingTransform.scale})`,
    filter: hovered
      ? "brightness(1.08) grayscale(0)"
      : !isLead 
        ? "brightness(0.92) grayscale(0.1)"
        : `brightness(${restingTransform.brightness})`,
    transition: "all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",
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
          hovered
            ? "border-primary/30 bg-white shadow-[0_20px_40px_rgba(0,87,157,0.18)]"
            : isLead
              ? "border-primary/10 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
              : "border-black/5 bg-slate-50/30 shadow-[0_4px_20px_rgba(0,0,0,0.04)]",
        )}
      >
        <Image
          src={member.image}
          alt={member.name}
          fill
          className={cn(
            "object-cover object-top transition-transform duration-700",
            hovered ? "scale-105" : "scale-100"
          )}
          sizes="(max-width: 768px) 50vw, 220px"
        />

        <div
          className="absolute inset-x-0 bottom-0 z-20 text-center transition-all duration-500"
          style={{
            padding: hovered ? "120px 12px 16px" : "104px 12px 14px",
            background: hovered
              ? "linear-gradient(to top, rgba(255,255,255,1) 25%, rgba(255,255,255,0.95) 55%, transparent 100%)"
              : isLead
                ? "linear-gradient(to top, rgba(255,255,255,0.98) 20%, rgba(255,255,255,0.85) 60%, transparent 100%)"
                : "linear-gradient(to top, rgba(255,255,255,0.95) 15%, rgba(255,255,255,0.7) 50%, transparent 100%)",
          }}
        >
          <h3
            className={cn(
              "font-semibold mb-1.5 transition-colors duration-300 font-orbitron line-clamp-2 px-1 leading-tight min-h-[2.2rem]",
              hovered || isLead ? "text-slate-900" : "text-slate-700",
            )}
            style={{ 
              fontSize: nameFontSize,
              color: hovered ? "var(--primary)" : undefined
            }}
            title={member.name}
          >
            {member.name}
          </h3>

          <p
            className={cn(
              "mx-auto mb-2.5 max-w-[150px] rounded-2xl border px-3 py-1.5 text-center font-semibold uppercase line-clamp-2 leading-[1.35] transition-all duration-300",
              hovered
                ? "border-primary/20 bg-primary/5 text-primary shadow-sm"
                : isLead
                  ? "border-primary/15 bg-primary/[0.03] text-primary/90"
                  : "border-slate-200 bg-white/70 text-slate-500 opacity-80",
            )}
            style={{
              fontSize: positionFontSize,
              letterSpacing: "0.16em",
              minHeight: "2.5rem",
            }}
          >
            {member.position}
          </p>

          {hasActions ? (
            <div
              className={cn(
                "flex justify-center gap-4 transition-all duration-300",
                hovered || isLead ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
              )}
            >
              {member.linkedin ? (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:scale-110 transition-transform p-1"
                  title="LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              ) : null}
              {member.email ? (
                <a
                  href={`mailto:${member.email}`}
                  className="text-primary hover:scale-110 transition-transform p-1"
                  title="Email"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </a>
              ) : null}
            </div>
          ) : null}
        </div>

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent transition-all duration-500",
            hovered ? "opacity-100" : "opacity-0",
          )}
        />

        {isLead && (
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          />
        )}

        <div
          className={cn(
            "absolute top-3 right-3 w-6 h-6 border-t border-r border-primary/40 rounded-tr-md transition-opacity duration-300",
            hovered ? "opacity-100" : "opacity-0",
          )}
        />

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
