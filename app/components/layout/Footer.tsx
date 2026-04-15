import Image from 'next/image';
import { footerSocialItems } from '@/lib/site';
import { MapPin, Mail } from 'lucide-react';
import FooterGlobe from './FooterGlobe';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-section" className="relative isolate overflow-hidden bg-slate-950 pt-16 md:pt-24 pb-8 mt-auto" aria-label="IEEE UoM footer">
      {/* Globe accent focused on University of Moratuwa (Non-interactive) */}
      {/* Keeping original globe wrapper class to maintain globe size/positioning correctly */}
      <div className="footer-globe-wrapper pointer-events-none">
        <FooterGlobe />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 mx-auto px-6 md:px-12 w-full max-w-[85rem]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 pb-12 lg:pb-16 border-b border-slate-800 mb-6">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-6 max-w-sm z-20">
            <Image
              src="/logo/ieeesblogo.png"
              alt="IEEE University of Moratuwa Student Branch"
              className="w-56 md:w-64 drop-shadow-md"
              width={280}
              height={85}
              priority
            />
            <p className="text-slate-300 text-sm leading-relaxed">
              Empowering future engineers through innovation and collaboration. 
              The IEEE Student Branch of the University of Moratuwa is the largest 
              and most active student branch in Sri Lanka.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-2" aria-label="Social links">
              {footerSocialItems.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="bg-slate-800/50 hover:bg-blue-600/20 transition-colors w-10 h-10 flex items-center justify-center rounded-full border border-slate-700 hover:border-blue-500/50 group"
                >
                  <Image
                    src={social.icon}
                    alt={social.label}
                    width={20}
                    height={20}
                    className="opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-sm"
                    style={{ width: '20px', height: 'auto' }}
                  />
                </a>
              ))}
            </div>
          </div>


        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} IEEE Student Branch — University of Moratuwa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
