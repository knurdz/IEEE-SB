import Image from 'next/image';
import { footerSocialItems } from '@/lib/site';
import FooterGlobe from './FooterGlobe';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-section" className="site-footer" aria-label="IEEE UoM footer">
      {/* Globe accent focused on University of Moratuwa (Non-interactive) */}
      <div className="footer-globe-wrapper">
        <FooterGlobe />
      </div>

      {/* Main Footer Content */}
      <div className="footer-content">
        {/* Top section: Logo + Description */}
        <div className="footer-brand">
          <Image
            src="/logo/ieeesblogo.png"
            alt="IEEE University of Moratuwa Student Branch"
            className="footer-logo"
            width={280}
            height={85}
            priority
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
                  style={{ width: 'auto', height: 'auto' }}
                />
              </a>
            ))}
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
