import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { Member } from "../types";

export default function MobileMemberCard({ member }: { member: Member }) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const hasActions = Boolean(member.linkedin || member.email);
  const nameFontSize = "1.05rem";
  const positionFontSize = "0.7rem";

  const isLead = member.priority < 9;

  return (
    <div
      className="relative w-full group"
      style={{
        height: "380px",
        filter: !isLead ? "brightness(0.96) grayscale(0.05)" : undefined,
      }}
    >
      <div className="flex flex-col h-full w-full">
        <div
          className={cn(
            "z-30 w-full rounded-t-2xl border-x border-t px-5 py-3.5 text-center font-bold uppercase leading-none shadow-[0_-8px_20px_rgba(0,87,157,0.06)] backdrop-blur-xl transition-all duration-500",
            isLead 
              ? "border-primary/20 bg-white/95 text-primary group-hover:border-primary/30"
              : "border-black/5 bg-slate-50/90 text-slate-500/90 group-hover:border-primary/20 group-hover:text-primary"
          )}
          style={{
            fontSize: positionFontSize,
            letterSpacing: "0.22em",
            marginBottom: "-1px"
          }}
        >
          {!isLead && member.position === "Committee Member" ? "MEMBER" : member.position}
        </div>

        <div
          className={cn(
            "relative flex-1 w-full flex-col overflow-hidden border transition-all duration-500 rounded-b-2xl",
            isLead ? "border-primary/20 bg-white" : "border-black/5 bg-slate-50/50",
            "hover:border-primary/30 hover:shadow-[0_16px_40px_rgba(0,87,157,0.15)]",
          )}
        >
          <div className="relative w-full h-full overflow-hidden">
            {/* Skeleton Loader */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse transition-opacity duration-700",
              !isImageLoading ? "opacity-0 pointer-events-none" : "opacity-100"
            )}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full animate-[shimmer_2s_infinite]" />
            </div>

            <Image
              src={member.image}
              alt={member.name}
              fill
              className={cn(
                "object-cover object-top transition-all duration-700 group-hover:scale-105",
                !isLead && "opacity-90 group-hover:opacity-100",
                isImageLoading ? "opacity-0" : "opacity-100"
              )}
              sizes="(max-width: 768px) 100vw, 350px"
              onLoad={() => setIsImageLoading(false)}
              loading={isLead ? "eager" : "lazy"}
            />
            <div
              className={cn(
                "absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t via-white/80 to-transparent",
                isLead ? "from-white" : "from-slate-50/80"
              )}
            />
          </div>

          <div
            className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center justify-end px-5 pb-5 text-center transition-transform duration-500 group-hover:translate-y-[-1px]"
            style={{ height: "30%" }}
          >
            <div className="flex flex-col items-center justify-end w-full">
              <div
                className={cn(
                  "font-bold font-orbitron max-w-full px-1 transition-colors duration-300 w-full",
                  isLead ? "text-slate-900" : "text-slate-700 group-hover:text-primary"
                )}
                style={{
                  marginBottom: hasActions ? "0.6rem" : "0",
                  fontSize: nameFontSize,
                }}
                title={member.name}
              >
                {isLead || member.name.split(" ").length === 1 ? (
                  <span className="line-clamp-1 leading-none block">{member.name}</span>
                ) : (
                  <div className="flex flex-col items-center leading-[1.1] min-h-[2.5rem] justify-end">
                    <span className="line-clamp-1">{member.name.split(" ").slice(0, -1).join(" ")}</span>
                    <span className="line-clamp-1">{member.name.split(" ").slice(-1)[0]}</span>
                  </div>
                )}
              </div>

              {hasActions ? (
                <div
                  className={cn(
                    "flex flex-wrap items-center justify-center gap-3 transition-all duration-300",
                    isLead
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                  )}
                >
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-primary hover:bg-primary hover:text-white transition-all bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 shadow-sm"
                    >
                      LinkedIn
                    </a>
                  ) : null}
                  {member.email ? (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-[10px] font-bold text-primary hover:bg-primary hover:text-white transition-all bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 shadow-sm"
                    >
                      Email
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
