import Image from "next/image";
import SiteBackground from "@/app/components/layout/SiteBackground";

export default function StrategicPartnerSection() {
  return (
    <section
      id="strategic-partner-section"
      className="relative w-full py-20 lg:py-28 overflow-hidden bg-transparent"
      aria-label="Strategic partner"
    >
      <SiteBackground showTopFade={true} showBottomFade={true} />

      <div className="absolute top-10 right-0 w-80 h-80 bg-blue-50/60 rounded-full blur-3xl opacity-70 -translate-y-1/3 translate-x-1/3 z-0" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-50/70 rounded-full blur-3xl opacity-70 translate-y-1/2 -translate-x-1/4 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl border border-black/10 bg-white/90 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.35)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12">
              <h2 className="text-3xl lg:text-5xl text-gray-800 flex items-center justify-start gap-4 font-sans tracking-tight mb-6">
                <span className="font-light text-gray-700">Strategic</span>
                <span className="font-black font-serif text-gray-900 uppercase">
                  Partner
                </span>
              </h2>

              <h2 className="text-xl sm:text-2xl lg:text-2xl font-medium tracking-tight text-[#1a1a1a] leading-tight mb-5">
                Industry partnership that amplifies student impact.
              </h2>

              <p className="text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl text-justify">
                Our collaboration with IFS strengthens how we build, lead, and
                innovate as a student branch. Through this alliance, members
                gain deeper industry exposure, meaningful mentorship, and
                opportunities to contribute to high-value technical initiatives.
              </p>

              <div className="mt-8">
                <a
                  href="https://www.ifs.com"
                  className="inline-flex items-center justify-center rounded-xl bg-[#00589e] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#00457c]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Partner Website
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex items-center justify-center p-8 sm:p-10 lg:p-12 bg-transparent">
              <div className="w-full flex items-center justify-center">
                <Image
                  src="/partners/IFS.png"
                  alt="IFS strategic partner logo"
                  width={560}
                  height={280}
                  className="w-full max-w-[280px] sm:max-w-[340px] h-auto object-contain"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
