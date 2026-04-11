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
            className="pointer-events-auto cursor-pointer transition-transform hover:scale-110 active:scale-95 flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-white border-4 border-[#00589e] rounded-full flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(0,88,158,0.4)] relative">
              <div className="relative w-10 h-10">
                <img 
                  src="/logo/ieee-sb-logo-traced.svg" 
                  alt="IEEE Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Pointer Bottom */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-[#00589e]" />
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
