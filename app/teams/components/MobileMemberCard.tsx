import Image from "next/image";
import { cn } from "@/lib/cn";
import { Member } from "../types";

export default function MobileMemberCard({ member }: { member: Member }) {
  const isLead = !!member.isLead;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border bg-white transition-shadow duration-300 flex flex-col h-[360px] sm:h-[400px]",
        isLead
          ? "border-primary/30 shadow-[0_6px_28px_rgba(0,87,157,0.14)] ring-1 ring-primary/15 hover:shadow-[0_12px_48px_rgba(0,87,157,0.2)]"
          : "border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_40px_rgba(0,87,157,0.15)]",
      )}
    >
      <div className="relative w-full h-full">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 350px"
        />
        {/* Gradient overlay for text */}
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-white via-white/90 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center text-center z-10">
        <p className="text-primary/90 text-xs tracking-[0.2em] uppercase mb-2 font-semibold">
          {member.role}
        </p>
        <h3
          className="font-bold text-slate-900 font-orbitron mb-3 truncate max-w-full px-1"
          style={
            member.nameSize
              ? { fontSize: member.nameSize }
              : { fontSize: "1.25rem" }
          }
          title={member.name}
        >
          {member.name}
        </h3>

        <div className="flex flex-wrap justify-center gap-3 items-center">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold text-primary hover:text-white hover:bg-primary transition-colors bg-blue-50 px-4 py-2 rounded-full border border-blue-100"
            >
              LinkedIn ↗
            </a>
          )}
          {member.phone && (
            <p className="text-[11px] font-medium text-slate-700 bg-slate-50 border border-slate-200 px-4 py-2 rounded-full whitespace-nowrap">
              {member.phone}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
