'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import { primaryNavItems } from '@/lib/site';
import StaticSiteLink from '@/app/components/ui/StaticSiteLink';
import { getCurrentStaticRoutePathname } from '@/lib/static-site';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeAnchor, setActiveAnchor] = useState('');
  const [currentPathname, setCurrentPathname] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setCurrentPathname(getCurrentStaticRoutePathname() ?? pathname);
  }, [pathname]);

  const isLinkActive = (href: string) => {
    // Never highlight the Contact button as active
    if (href === '/#contact') return false;
    if (!currentPathname) return false;

    if (href.startsWith('/#')) {
      return currentPathname === '/' && activeAnchor === href;
    }
    return currentPathname === href;
  };

  return (
    <>
      <nav
        className={cn(
          'fixed left-0 right-0 top-0 z-50 transition-all duration-500',
          isScrolled ? 'bg-transparent' : 'bg-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <StaticSiteLink
              href="/"
              className={cn(
                "relative flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-300",
                isScrolled
                  ? "bg-white/80 backdrop-blur-md border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]"
                  : "bg-transparent border-transparent shadow-none"
              )}
            >
              <Image
                src="/logo/ieeesblogo-light2.webp"
                alt="IEEE SB Logo"
                className="object-contain"
                width={172}
                height={36}
                style={{ width: 'auto', height: '36px' }}
                priority
              />
            </StaticSiteLink>

            <div className={cn(
              "hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300",
              isScrolled
                ? "bg-white/80 backdrop-blur-md border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]"
                : "bg-transparent border-transparent shadow-none"
            )}>
              {primaryNavItems.map((link) => {
                const isActive = isLinkActive(link.href);

                return (
                  <StaticSiteLink
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
                      <span className="absolute inset-0 bg-[#0A2540]" style={{ borderRadius: '624.938rem' }} />
                    )}
                    {hoveredLink === link.href && !isActive && (
                      <span className="absolute inset-0 bg-slate-100 transition-opacity duration-200" style={{ borderRadius: '624.938rem' }} />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </StaticSiteLink>
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
                  className={`absolute left-0 w-full h-0.5 bg-[#0B132B] rounded-full transition-all duration-300 ${mobileMenuOpen ? 'top-1/2 rotate-45 -translate-y-1/2' : 'top-0'
                    }`}
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-[#0B132B] rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                    }`}
                />
                <span
                  className={`absolute left-0 w-full h-0.5 bg-[#0B132B] rounded-full transition-all duration-300 ${mobileMenuOpen ? 'bottom-1/2 -rotate-45 translate-y-1/2' : 'bottom-0'
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
              <StaticSiteLink
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
              </StaticSiteLink>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
