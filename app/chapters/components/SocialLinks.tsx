'use client';

import { motion } from 'framer-motion';

interface SocialLinksProps {
  links: {
    website?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  align?: 'left' | 'right' | 'center';
}

export default function SocialLinks({ links, align = 'left' }: SocialLinksProps) {
  const alignClass = {
    left: 'justify-start',
    right: 'justify-end',
    center: 'justify-center',
  }[align];

  const socialIcons = [
    {
      name: 'website',
      href: links.website,
      color: 'rgba(0, 212, 255, 0.2)',
      hoverColor: '#00d4ff',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      ),
    },
    {
      name: 'instagram',
      href: links.instagram,
      color: 'rgba(225, 48, 108, 0.2)',
      hoverColor: '#e1306c',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      name: 'linkedin',
      href: links.linkedin,
      color: 'rgba(10, 102, 194, 0.2)',
      hoverColor: '#0a66c2',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="20" rx="3" />
          <path d="M8 11v5M8 8v.01M12 16v-5c0-1 1-2 2-2s2 1 2 2v5" />
        </svg>
      ),
    },
    {
      name: 'twitter',
      href: links.twitter,
      color: 'rgba(29, 161, 242, 0.2)',
      hoverColor: '#1da1f2',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
        </svg>
      ),
    },
  ];

  return (
    <div className={`flex gap-3 ${alignClass}`}>
      {socialIcons.map(
        (social) =>
          social.href && (
            <motion.a
              key={social.name}
              href={social.href}
              className="w-11 h-11 flex items-center justify-center rounded-lg border transition-colors"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.08)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                color: '#8b95b0',
              }}
              whileHover={{
                y: -2,
                borderColor: social.hoverColor,
                backgroundColor: social.color,
                color: social.hoverColor,
                boxShadow: `0 4px 16px ${social.color}`,
              }}
              transition={{ duration: 0.2 }}
              aria-label={social.name}
            >
              <div className="w-5 h-5">{social.icon}</div>
            </motion.a>
          )
      )}
    </div>
  );
}
