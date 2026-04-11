import { motion } from 'framer-motion';

export default function ContactMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-[320px] md:h-[560px] p-4 md:p-8 flex items-center justify-center"
    >
      {/* Solid Blue Offset Shadow Block - Darker Blue variation */}
      <div className="absolute inset-4 md:inset-8 translate-x-6 translate-y-6 bg-[#004071] -z-10 shadow-lg rounded-[6px]" />
      
      {/* Map Container */}
      <div className="relative w-full h-full z-10 overflow-hidden shadow-sm bg-[#e4dfd0] rounded-[6px]">
        {/* Aesthetic Map Overlay Pin - Adjusted for uom.png location */}
        <motion.div 
          className="absolute top-[31%] left-[51%] -translate-x-1/2 -translate-y-[calc(100%+8px)] z-30 pointer-events-none flex flex-col items-center"
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
                className="filter drop-shadow-lg transition-transform duration-300 group-hover:drop-shadow-2xl"
              >
                <path 
                  fill="#00589e" 
                  d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"
                />
                {/* White Inner Circle */}
                <circle cx="192" cy="192" r="145" fill="white" />
              </svg>
              
              {/* Logo Container inside the pin's white circle - Precisely centered */}
              <div className="absolute top-[37.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center">
                <img 
                  src="/logo/ieee-sb-logo-traced.svg" 
                  alt="IEEE Logo" 
                  className="w-10 h-10 object-contain"
                />
              </div>

              {/* Subtle Glow beneath the pin */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-2 bg-black/20 blur-md rounded-[100%] group-hover:w-12 group-hover:h-3 transition-all duration-300" />
            </div>
          </a>
        </motion.div>



        {/* Static Map Image */}
        <img 
          src="/uom.png" 
          alt="University of Moratuwa Map" 
          className="w-full h-full object-cover scale-[1.05]"
          style={{ 
            filter: 'grayscale(0.15) sepia(0.15) contrast(1.1) brightness(1.02)' 
          }}
        />
      </div>
    </motion.div>
  );
}
