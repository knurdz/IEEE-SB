"use client";

import { useState, memo } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { Member } from "../types";

const MemberCard = memo(function MemberCard({
  member,
  index,
  isLead = false,
}: {
  member: Member;
  index: number;
  isLead?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Layout variables
  const circleSizeClass = isLead ? "w-48 h-48" : "w-40 h-40";
  
  // Cutout mask logic
  // For standard: w-40 = 10rem (r=5rem). Card has -mt-14 (3.5rem overlap). Center Y = 3.5rem - 5rem = -1.5rem.
  // We want an 8px gap (0.5rem), so mask radius = 5.5rem.
  // For lead: w-48 = 12rem (r=6rem). Card has -mt-16 (4rem overlap). Center Y = 4rem - 6rem = -2rem.
  // Gap 8px (0.5rem), so mask radius = 6.5rem.
  const maskRadius = isLead ? "6.5rem" : "5.5rem";
  const maskCenterY = isLead ? "-2rem" : "-1.5rem";

  const maskStyle: React.CSSProperties = {
    WebkitMaskImage: `radial-gradient(circle at 50% ${maskCenterY}, transparent ${maskRadius}, black ${maskRadius})`,
    maskImage: `radial-gradient(circle at 50% ${maskCenterY}, transparent ${maskRadius}, black ${maskRadius})`,
  };

  const containerStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: isLead ? "16rem" : "14rem",
    zIndex: hovered ? 30 : 10,
    transform: hovered ? "translateY(-8px)" : "translateY(0px)",
    transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
  };

  return (
    <div
      style={containerStyle}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow Effect Behind Circle */}
      <div 
        className={cn(
          "absolute top-4 left-1/2 -translate-x-1/2 rounded-full blur-2xl transition-all duration-500",
          isLead ? "w-40 h-40" : "w-32 h-32",
          hovered ? "bg-primary/30 scale-110" : "bg-primary/0 scale-100"
        )}
      />

      {/* Circular Profile Image Container */}
      <div 
        className={cn(
          "relative rounded-full overflow-hidden transition-all duration-500 z-20 bg-white shadow-xl",
          circleSizeClass,
          hovered && "shadow-primary/30 scale-[1.02]",
          isLead ? "border-2 border-primary/20" : "border border-slate-100"
        )}
      >
        {/* Skeleton Loader */}
        <div className={cn(
          "absolute inset-0 bg-slate-200 animate-pulse transition-opacity duration-700",
          !isImageLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        )} />

        <Image
          src={member.image}
          alt={member.name}
          fill
          className={cn(
            "object-cover transition-transform duration-700",
            hovered && "scale-110"
          )}
          style={{
            transform: `scale(${(member.imageScale ?? 1)}) translate(${member.imageTranslateX ?? "0"}, ${member.imageTranslateY ?? "0"})`,
            transformOrigin: "top center",
            objectPosition: member.imageOffset ?? "top center",
          }}
          sizes="(max-width: 768px) 12rem, 16rem"
          onLoad={() => setIsImageLoading(false)}
          loading={isLead ? "eager" : "lazy"}
        />
      </div>

      {/* Drop shadow wrapper because inset mask prevents card's native box-shadow from creating outer edge shadow well */}
      <div 
        className={cn("w-full transition-all duration-500", isLead ? "-mt-16" : "-mt-14")}
        style={{ filter: hovered ? "drop-shadow(0 10px 15px rgba(0,0,0,0.1))" : "drop-shadow(0 4px 6px rgba(0,0,0,0.05))" }}
      >
        {/* Info Card with true cutout mask */}
        <div 
          className="relative z-10 w-full flex flex-col items-center bg-white rounded-3xl pb-5 px-4 transition-all duration-500"
          style={{ 
            ...maskStyle, 
            paddingTop: isLead ? "5.5rem" : "4.5rem",
          }}
        >
          <h3 
            className={cn(
              "font-extrabold text-center font-orbitron transition-colors duration-300 leading-tight",
              isLead ? "text-lg text-slate-800" : "text-[0.95rem] text-slate-700",
              hovered && "text-primary"
            )}
          >
            {member.name}
          </h3>
          
          <p 
            className={cn(
              "text-center mt-1.5 font-bold tracking-[0.18em] uppercase font-orbitron",
              isLead ? "text-[0.7rem] text-primary/80" : "text-[0.6rem] text-slate-500"
            )}
          >
            {!isLead && member.position === "Committee Member" ? "MEMBER" : member.position}
          </p>

          {/* Action Buttons - Always show social media */}
          <div className="flex justify-center gap-3 transition-all duration-300 w-full mt-4">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-white hover:bg-primary bg-primary/10 p-2 rounded-full transition-colors flex items-center justify-center"
                title="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="text-primary hover:text-white hover:bg-primary bg-primary/10 p-2 rounded-full transition-colors flex items-center justify-center"
                title="Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default MemberCard;
