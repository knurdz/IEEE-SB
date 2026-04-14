"use client";

import { motion } from "framer-motion";

interface SocialLinksProps {
  links: {
    website?: string;
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    youtube?: string;
  };
  align?: "left" | "right" | "center";
  theme?: "dark" | "light";
  hoverColor?: string;
}

export default function SocialLinks({
  links,
  align = "left",
  theme = "dark",
  hoverColor: propHoverColor,
}: SocialLinksProps) {
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  const alignClass = {
    left: "justify-start",
    right: "justify-end",
    center: "justify-center",
  }[align];

  const socialIcons = [
    {
      name: "facebook",
      href: links.facebook && links.facebook !== "#" ? links.facebook : undefined,
      color: "rgba(24, 119, 242, 0.2)",
      hoverColor: "#1877f2",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      ),
    },
    {
      name: "linkedin",
      href: links.linkedin && links.linkedin !== "#" ? links.linkedin : undefined,
      color: "rgba(10, 102, 194, 0.2)",
      hoverColor: "#0a66c2",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="20" rx="3" />
          <path d="M8 11v5M8 8v.01M12 16v-5c0-1 1-2 2-2s2 1 2 2v5" />
        </svg>
      ),
    },
    {
      name: "instagram",
      href: links.instagram && links.instagram !== "#" ? links.instagram : undefined,
      color: "rgba(225, 48, 108, 0.2)",
      hoverColor: "#e1306c",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      name: "youtube",
      href: links.youtube && links.youtube !== "#" ? links.youtube : undefined,
      color: "rgba(255, 0, 0, 0.2)",
      hoverColor: "#ff0000",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33 2.78 2.78 0 001.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.33 29 29 0 00-.46-5.33z" />
          <path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" />
        </svg>
      ),
    },
    {
      name: "website",
      href: links.website && links.website !== "#" ? links.website : undefined,
      color: "rgba(0, 212, 255, 0.2)",
      hoverColor: "#00d4ff",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      ),
    },
  ];

  const baseStyles =
    theme === "light"
      ? {
          borderColor: "rgba(15, 23, 42, 0.12)",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          color: "#475569",
        }
      : {
          borderColor: "rgba(255, 255, 255, 0.08)",
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          color: "#8b95b0",
        };

  return (
    <div className={`flex gap-3 ${alignClass}`}>
      {socialIcons.map(
        (social) =>
          social.href && (
            <motion.a
              key={social.name}
              href={social.href}
              className="w-11 h-11 flex items-center justify-center rounded-lg border transition-colors"
              style={baseStyles}
              whileHover={{
                y: -2,
                borderColor: propHoverColor || social.hoverColor,
                backgroundColor: propHoverColor 
                  ? hexToRgba(propHoverColor, 0.1) 
                  : social.color,
                color: propHoverColor || social.hoverColor,
                boxShadow: `0 0.25rem 1rem ${
                  propHoverColor ? hexToRgba(propHoverColor, 0.15) : social.color
                }`,
              }}
              transition={{ duration: 0.2 }}
              aria-label={social.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-5 h-5">{social.icon}</div>
            </motion.a>
          ),
      )}
    </div>
  );
}
