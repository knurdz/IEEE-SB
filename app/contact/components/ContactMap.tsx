import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ContactMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-[16.25rem] sm:h-[20rem] lg:h-[35rem] p-2 sm:p-4 lg:p-8 flex items-center justify-center [@media(min-width:48rem)_and_(max-width:64rem)]:h-[26.25rem] [@media(min-width:48rem)_and_(max-width:64rem)]:p-6"
    >
      {/* Solid Blue Offset Shadow Block - Darker Blue variation */}
      <div className="absolute inset-2 sm:inset-4 lg:inset-8 translate-x-3 translate-y-3 sm:translate-x-6 sm:translate-y-6 bg-[#004071] -z-10 shadow-lg rounded-[0.375rem] [@media(min-width:48rem)_and_(max-width:64rem)]:inset-6" />

      {/* Map Container */}
      <div className="relative w-full h-full z-10 overflow-hidden shadow-sm bg-[#e4dfd0] rounded-[0.375rem]">
        {/* Aesthetic Map Overlay Pin - Adjusted for uom.webp location */}
        <motion.div
          className="absolute top-[31%] left-[51%] -translate-x-1/2 -translate-y-[calc(100%+0.5rem)] z-30 pointer-events-none flex flex-col items-center [@media(min-width:48rem)_and_(max-width:64rem)]:top-[32%]"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Main Pin Body - Clickable Link */}
          <a
            href="https://maps.google.com/maps?ll=6.795128,79.898292&z=15&t=m&hl=en&gl=LK&mapclient=embed&cid=8922518312307545614"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto cursor-pointer transition-transform hover:scale-110 active:scale-95 flex flex-col items-center group"
          >
            <div className="relative">
              {/* Pin SVG - Google Maps Style */}
              <svg
                width="64"
                height="80"
                viewBox="0 0 384 512"
                className="w-12 h-[3.75rem] lg:w-16 lg:h-20 filter drop-shadow-lg transition-transform duration-300 group-hover:drop-shadow-2xl [@media(min-width:48rem)_and_(max-width:64rem)]:w-14 [@media(min-width:48rem)_and_(max-width:64rem)]:h-[4.5rem]"
              >
                <path
                  fill="#00589e"
                  d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"
                />
                {/* White Inner Circle */}
                <circle cx="192" cy="192" r="145" fill="white" />
              </svg>

              {/* Logo Container inside the pin's white circle - Precisely centered */}
              <div className="absolute top-[37.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center [@media(min-width:48rem)_and_(max-width:64rem)]:w-9 [@media(min-width:48rem)_and_(max-width:64rem)]:h-9">
                <Image
                  src="/logo/ieee-sb-logo-traced.svg"
                  alt="IEEE Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>

              {/* Subtle Glow beneath the pin */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 lg:w-10 h-2 bg-black/20 blur-md rounded-[100%] group-hover:w-10 lg:group-hover:w-12 group-hover:h-3 transition-all duration-300 [@media(min-width:48rem)_and_(max-width:64rem)]:w-9" />
            </div>
          </a>
        </motion.div>

        {/* Static Map Image */}
        <Image
          src="/uom.webp"
          alt="University of Moratuwa Map"
          fill
          priority
          className="object-cover scale-[1.02] lg:scale-[1.05] transition-opacity duration-700 [@media(min-width:48rem)_and_(max-width:64rem)]:scale-[1.04]"
          style={{
            filter: 'grayscale(0.15) sepia(0.15) contrast(1.1) brightness(1.02)'
          }}
        />

        {/* Skeleton/Placeholder overlay */}
        <div className="absolute inset-0 bg-[#e4dfd0] animate-pulse pointer-events-none transition-opacity duration-1000 -z-0"
          style={{ opacity: 0.5 }} />
      </div>
    </motion.div>
  );
}