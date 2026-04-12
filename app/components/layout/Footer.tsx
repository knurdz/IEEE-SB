import Image from 'next/image';
import Link from 'next/link';
import { footerSocialItems, footerQuickLinks } from '@/lib/site';
import FooterGlobe from './FooterGlobe';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const universityMapUrl =
    'https://www.google.com/maps/search/?api=1&query=University+of+Moratuwa%2C+Sri+Lanka';

  return (
    <footer id="footer-section" className="site-footer" aria-label="IEEE UoM footer">
      {/* Clickable globe accent focused on University of Moratuwa */}
      <a
        className="footer-globe-wrapper footer-globe-link"
        href={universityMapUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open University of Moratuwa on Google Maps"
        title="View University of Moratuwa on the map"
      >
        <FooterGlobe />
      </a>

      {/* Main Footer Content */}
      <div className="footer-content">
        {/* Top section: Logo + Description */}
        <div className="footer-brand">
          <Image
            src="/logo/ieeesblogo.png"
            alt="IEEE University of Moratuwa Student Branch"
            className="footer-logo"
            width={280}
            height={80}
            style={{ height: 'auto' }}
          />
          <p className="footer-brand-desc">
            Empowering future engineers through innovation and collaboration.
            The IEEE Student Branch of the University of Moratuwa is the largest
            and most active student branch in Sri Lanka.
          </p>

          {/* Social icons */}
          <div className="footer-social" aria-label="Social links">
            {footerSocialItems.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="footer-social-link"
              >
                <Image
                  src={social.icon}
                  alt={social.label}
                  width={36}
                  height={36}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links-col hidden lg:flex">
          <h3 className="footer-col-title">Quick Links</h3>
          <nav className="footer-link-list" aria-label="Footer quick links">
            {footerQuickLinks.map((item) => (
              <Link key={item.label} href={item.href} className="footer-link">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact Info */}
        <div className="footer-links-col hidden lg:flex">
          <h3 className="footer-col-title">Get in Touch</h3>
          <div className="footer-link-list">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#F3F4F6] rounded-full text-[#3867D6]">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <a href="tel:+9198765432154" className="footer-link-v2">
                (91) 98765 4321 54
              </a>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#F3F4F6] rounded-full text-[#3867D6]">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <a href="mailto:support@mail.com" className="footer-link-v2">
                support@mail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider with animated glow */}
      <hr className="footer-divider" />

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          © {currentYear} IEEE Student Branch — University of Moratuwa. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
