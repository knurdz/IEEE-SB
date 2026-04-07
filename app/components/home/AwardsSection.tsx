import Image from "next/image";
import SectionHeading from "@/app/components/ui/SectionHeading";
import { featuredAward, secondaryAwards } from "./data";

export default function AwardsSection() {
  return (
    <>
      <section className="bg-background px-6 py-6 md:px-12 lg:px-24" id="awards">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title="Awards"
            className="mb-14"
            titleClassName="font-orbitron uppercase tracking-[0.22em] text-white"
          />

          <article className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-surface-alt text-center shadow-[0_24px_70px_rgba(2,6,23,0.45)] transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_40px_var(--primary-glow)]">
            <div className="relative aspect-[16/8] w-full overflow-hidden">
              <Image
                src={featuredAward.image}
                alt={featuredAward.imageAlt}
                fill
                priority={false}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 1200px"
              />
            </div>

            <div className="relative z-10 flex flex-col items-center px-6 py-10 md:px-12">
              {featuredAward.badge ? (
                <div className="mb-6 rounded-full border border-primary/20 bg-surface px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary transition-colors group-hover:bg-primary/20">
                  {featuredAward.badge}
                </div>
              ) : null}

              <span className="mb-2 text-sm font-bold text-white/50 transition-colors group-hover:text-white/70">
                {featuredAward.year}
              </span>

              <h3 className="font-orbitron text-3xl font-extrabold tracking-tight text-white transition-all duration-300 group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_15px_var(--primary-glow)] md:text-5xl">
                {featuredAward.title}
              </h3>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-background px-6 py-24 text-white md:px-12 lg:px-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {secondaryAwards.map((award, index) => (
            <article
              key={award.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-surface-alt transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_30px_var(--primary-glow)]"
            >
              <div
                className="relative h-80 overflow-hidden sm:h-[450px]"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Image
                  src={award.image}
                  alt={award.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="flex flex-col items-center p-8 text-center">
                <span className="mb-4 text-xs font-bold text-white/50 transition-colors group-hover:text-white/70">
                  {award.year}
                </span>

                <h3 className="font-orbitron text-xl font-bold text-white transition-all duration-300 group-hover:-translate-y-1 group-hover:drop-shadow-[0_0_10px_var(--primary-glow)]">
                  {award.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
