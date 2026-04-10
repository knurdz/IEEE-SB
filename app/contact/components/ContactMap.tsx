'use client';

import { motion } from 'framer-motion';

export default function ContactMap() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full relative z-10 mt-4"
    >
      <div className="relative group w-full mx-auto lg:mx-0">
        <div className="absolute -inset-1 bg-gradient-to-r from-gray-100 to-slate-200 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        
        <div className="relative bg-white/40 backdrop-blur-xl border border-white/40 shadow-sm rounded-xl overflow-hidden group-hover:shadow-md transition-all duration-500">
          <div className="w-full h-48 sm:h-56">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63388.68399250723!2d79.9007579!3d6.795052999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae245416b7f34b5%3A0x7bd32721ab02560e!2sUniversity%20of%20Moratuwa!5e0!3m2!1sen!2slk!4v1775848266038!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
