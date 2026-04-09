'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Globe } from 'lucide-react';
import { fadeUpTransition } from '@/lib/motion';

const contactDetails = [
  {
    icon: <MapPin className="w-6 h-6 text-[#008be6]" />,
    title: 'Visit Us',
    content: 'IEEE Student Branch, University of Moratuwa, Katubedda, Moratuwa 10400, Sri Lanka.',
    link: 'https://goo.gl/maps/MoratuwaUniversity', // Placeholder
  },
  {
    icon: <Mail className="w-6 h-6 text-[#008be6]" />,
    title: 'Email Us',
    content: 'ieee@uom.lk',
    link: 'mailto:ieee@uom.lk',
  },
  {
    icon: <Phone className="w-6 h-6 text-[#008be6]" />,
    title: 'Call Us',
    content: '+94 11 123 4567', // Placeholder
    link: 'tel:+94111234567',
  },
  {
    icon: <Globe className="w-6 h-6 text-[#008be6]" />,
    title: 'Official Website',
    content: 'ieee.uom.lk',
    link: 'https://ieee.uom.lk',
  },
];

export default function ContactInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {contactDetails.map((item, index) => (
        <motion.a
          key={item.title}
          href={item.link}
          target={item.link.startsWith('http') ? '_blank' : undefined}
          rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="group p-6 rounded-2xl bg-white/50 backdrop-blur-md border border-[#E2E8F0] hover:border-[#008be6]/30 hover:bg-white/80 transition-all duration-300 flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={fadeUpTransition(0.1 * index, 0.6)}
        >
          <div className="w-12 h-12 rounded-full bg-[#008be6]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            {item.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#0F172A] mb-1">{item.title}</h3>
            <p className="text-[#475569] text-sm leading-relaxed">{item.content}</p>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
