'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState('/#home');

  const navLinks = [
    { href: '/#home', label: 'Home' },
    { href: '/#events', label: 'Events' },
    { href: '/team', label: 'Team' },
    { href: '/chapters', label: 'Chapters' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-black/5 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="relative flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/logo/ieeesblogo.png"
                alt="IEEE SB Logo"
                width={48}
                height={48}
                className="object-contain w-12"
              />
              <div className="flex flex-col">
                <span className="text-[#0A2540] font-semibold text-sm leading-tight">University of Moratuwa</span>
                <span className="text-[#0A2540] font-normal text-xs leading-tight">IEEE Student Branch</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),_0_2px_4px_-1px_rgba(0,0,0,0.03)] backdrop-blur-md">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-1.5 text-sm transition-colors rounded-full overflow-hidden ${
                    activeLink === link.href ? 'text-[#FFFFFF] font-medium' : 'text-[#475569] hover:text-[#0A2540] font-medium'
                  }`}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={() => setActiveLink(link.href)}
                >
                  {activeLink === link.href && (
                    <span className="absolute inset-0 bg-[#0A2540]" style={{ borderRadius: '9999px' }} />
                  )}
                  {hoveredLink === link.href && activeLink !== link.href && (
                    <span className="absolute inset-0 bg-slate-100 transition-opacity duration-200" style={{ borderRadius: '9999px' }} />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-white/95 backdrop-blur-xl"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Content */}
          <div className="relative h-full flex flex-col items-center justify-center gap-8 animate-in fade-in slide-in-from-bottom-5 duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-3xl font-light text-[#0B132B]/80 hover:text-[#0B132B] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
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
