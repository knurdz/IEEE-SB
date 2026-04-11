import { motion } from 'framer-motion';

export default function ContactMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-[320px] md:h-[460px] p-4 md:p-8 flex items-center justify-center"
    >
      {/* Solid Blue Offset Shadow Block */}
      <div className="absolute top-[10%] left-[10%] right-[-5%] bottom-[-5%] bg-[#00579d] -z-10 shadow-lg rounded-[6px]" />
      
      {/* Map Container */}
      <div className="relative w-full h-full z-10 overflow-hidden shadow-sm bg-[#e4dfd0] rounded-[6px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.7921349441076!2d79.89829207499533!3d6.7951275932021655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae245416b7f34b5%3A0x7bd32721ab02560e!2sUniversity%20of%20Moratuwa!5e0!3m2!1sen!2slk!4v1775911352724!5m2!1sen!2slk"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full scale-[1.05] pointer-events-auto flex-1"
        />
      </div>
    </motion.div>
  );
}
