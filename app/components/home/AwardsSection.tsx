import Image from "next/image";
import SiteBackground from "@/app/components/layout/SiteBackground";
import { featuredAward, secondaryAwards } from "./data";

export default function AwardsSection() {
  return (
    <section
      id="awards"
      className="relative w-full py-20 lg:py-28 overflow-hidden bg-transparent"
      aria-label="Awards and recognition"
    >
      <SiteBackground showTopFade={true} showBottomFade={true} />

      <div className="absolute top-12 left-0 w-80 h-80 bg-blue-50/60 rounded-full blur-3xl opacity-70 -translate-x-1/3 z-0" />
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-indigo-50/60 rounded-full blur-3xl opacity-70 translate-x-1/3 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 lg:mb-14 text-center">
          <h2 className="text-3xl lg:text-5xl text-gray-800 flex items-baseline justify-center gap-4 font-sans tracking-tight mb-6">
            <span className="font-light text-gray-700">Awards &</span>
            <span className="font-black font-serif text-gray-900 uppercase">
              Recognition
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-700 max-w-3xl leading-relaxed italic font-bold mx-auto">
            Global excellence, locally celebrated.
          </p>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed mx-auto">
            Our branch is recognized at both international and Sri Lankan
            section levels for sustained technical impact, leadership, and
            innovation.
          </p>
        </div>

        <article className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white/90 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.35)] mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="relative lg:col-span-7 min-h-[280px] sm:min-h-[340px] lg:min-h-[420px] overflow-hidden">
              <Image
                src={featuredAward.image}
                alt={featuredAward.imageAlt}
                fill
                priority={false}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
            </div>

            <div className="lg:col-span-5 p-7 sm:p-8 lg:p-10 flex flex-col justify-center bg-gradient-to-br from-[#f5f9ff] via-white to-[#eef5ff]">
              <span className="inline-flex w-fit rounded-full border border-[#00589e]/20 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#00589e] mb-4">
                International Level Award
              </span>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1a1a1a] leading-tight mb-3">
                {featuredAward.title}
              </h3>

              <p className="text-slate-600 leading-relaxed mb-4">
                A flagship recognition that reflects our global standing and
                commitment to world-class student branch performance.
              </p>

              <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
                {featuredAward.year}
              </p>
            </div>
          </div>
        </article>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondaryAwards.slice(0, 3).map((award, index) => (
            <article
              key={award.id}
              className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white/90 shadow-[0_16px_35px_-24px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(0,87,157,0.35)]"
            >
              <div className="relative h-52 sm:h-56 overflow-hidden">
                <Image
                  src={award.image}
                  alt={award.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="p-6">
                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
                  Sri Lankan Section Award
                </span>

                <h4 className="text-lg font-semibold tracking-tight text-[#1a1a1a] mb-2 leading-snug">
                  {award.title}
                </h4>

                <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                  {award.year}
                </p>
              </div>

              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-[#00589e]/80 via-[#008be6]/70 to-transparent"
                style={{ transitionDelay: `${index * 70}ms` }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
