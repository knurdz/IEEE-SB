import Image from "next/image";
import { cn } from "@/lib/cn";
import { Member } from "../types";

export default function MobileMemberCard({ member }: { member: Member }) {
  const hasActions = Boolean(member.linkedin || member.email);

  const nameFontSize =
    member.name.length > 22
      ? "1rem"
      : member.name.length > 18
        ? "1.08rem"
        : "1.2rem";

  const positionFontSize =
    member.position.length > 28
      ? "0.62rem"
      : member.position.length > 20
        ? "0.7rem"
        : "0.78rem";

  const isLead = member.priority < 9;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border transition-all duration-500 flex flex-col h-[360px] sm:h-[400px] group",
        isLead 
          ? "border-primary/10 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.06)]" 
          : "border-black/5 bg-slate-50/50 shadow-[0_4px_20px_rgba(0,0,0,0.04)]",
        "hover:border-primary/30 hover:shadow-[0_16px_40px_rgba(0,87,157,0.15)]",
      )}
      style={{
        filter: !isLead ? "brightness(0.96) grayscale(0.05)" : undefined,
      }}
    >
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className={cn(
            "object-cover object-top transition-transform duration-700 group-hover:scale-105",
            !isLead && "opacity-90 group-hover:opacity-100"
          )}
          sizes="(max-width: 768px) 100vw, 350px"
        />
        <div className={cn(
          "absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t via-white/95 to-transparent",
          isLead ? "from-white" : "from-slate-50/90"
        )} />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 pb-4 flex flex-col items-center text-center z-10 transition-transform duration-500 group-hover:translate-y-[-2px]">
        <h3
          className={cn(
            "font-bold font-orbitron mb-2 line-clamp-2 leading-tight max-w-full px-1 min-h-[2.4rem] transition-colors duration-300",
            isLead ? "text-slate-900" : "text-slate-700 group-hover:text-primary"
          )}
          style={{ fontSize: nameFontSize }}
          title={member.name}
        >
          {member.name}
        </h3>

        <p
          className={cn(
            "mb-3 max-w-[90%] rounded-2xl border px-4 py-1.5 text-center font-bold uppercase line-clamp-2 leading-[1.35] transition-all duration-300",
            isLead
              ? "border-primary/15 bg-primary/[0.03] text-primary"
              : "border-slate-200 bg-white/80 text-slate-500 group-hover:border-primary/20 group-hover:text-primary",
          )}
          style={{ fontSize: positionFontSize, letterSpacing: "0.16em" }}
        >
          {member.position}
        </p>

        {hasActions ? (
          <div className={cn(
            "flex flex-wrap justify-center gap-3 items-center transition-all duration-300",
            isLead 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
          )}>
            {member.linkedin ? (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold text-primary hover:bg-primary hover:text-white transition-all bg-blue-50 px-4 py-2 rounded-full border border-blue-100 shadow-sm"
              >
                LinkedIn
              </a>
            ) : null}
            {member.email ? (
              <a
                href={`mailto:${member.email}`}
                className="text-[10px] font-bold text-primary hover:bg-primary hover:text-white transition-all bg-blue-50 px-4 py-2 rounded-full border border-blue-100 shadow-sm"
              >
                Email
              </a>
            ) : null}
          </div>
        ) : null}
      </div>

      {isLead && (
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      )}
    </div>
  );
}