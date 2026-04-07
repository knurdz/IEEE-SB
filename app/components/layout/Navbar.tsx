'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import { primaryNavItems } from '@/lib/site';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeAnchor, setActiveAnchor] = useState('/#home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLinkActive = (href: string) => {
    if (href.startsWith('/#')) {
      return pathname === '/' && activeAnchor === href;
    }

    return pathname === href;
  };

  return (
    <>
      <nav
        className={cn(
          'fixed left-0 right-0 top-0 z-50 transition-all duration-500',
          isScrolled
            ? 'border-b border-black/5 bg-white/90 shadow-sm backdrop-blur-xl'
            : 'bg-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/"
              className="relative flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/logo/ieeesblogo.png"
                alt="IEEE SB Logo"
                className="h-10 w-auto object-contain"
                width={172}
                height={40}
                priority
              />
            </Link>

            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),_0_2px_4px_-1px_rgba(0,0,0,0.03)] backdrop-blur-md">
              {primaryNavItems.map((link) => {
                const isActive = isLinkActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'relative overflow-hidden rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                      isActive ? 'text-[#FFFFFF]' : 'text-[#475569] hover:text-[#0A2540]',
                    )}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                    onClick={() => {
                      if (link.href.startsWith('/#')) {
                        setActiveAnchor(link.href);
                      }
                    }}
                  >
                    {isActive && (
                      <span className="absolute inset-0 bg-[#0A2540]" style={{ borderRadius: '9999px' }} />
                    )}
                    {hoveredLink === link.href && !isActive && (
                      <span className="absolute inset-0 bg-slate-100 transition-opacity duration-200" style={{ borderRadius: '9999px' }} />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <button
              className="md:hidden relative w-10 h-10 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5">
                <span
                  className={`absolute left-0 w-full h-0.5 bg-[#0B132B] rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? 'top-1/2 rotate-45 -translate-y-1/2' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-[#0B132B] rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                  }`}
                />
                <span
                  className={`absolute left-0 w-full h-0.5 bg-[#0B132B] rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? 'bottom-1/2 -rotate-45 translate-y-1/2' : 'bottom-0'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-white/95 backdrop-blur-xl"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="animate-fade-up relative flex h-full flex-col items-center justify-center gap-8">
            {primaryNavItems.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-3xl font-light text-[#0B132B]/80 hover:text-[#0B132B] transition-colors"
                onClick={() => {
                  if (link.href.startsWith('/#')) {
                    setActiveAnchor(link.href);
                  }
                  setMobileMenuOpen(false);
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
