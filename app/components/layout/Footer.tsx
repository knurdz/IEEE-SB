import Image from 'next/image';
import Link from 'next/link';
import { footerSocialItems, footerQuickLinks } from '@/lib/site';
import FooterGlobe from './FooterGlobe';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-section" className="site-footer" aria-label="IEEE UoM footer">
      {/* Globe decoration — positioned behind content */}
      <div className="footer-globe-wrapper" aria-hidden="true">
        <FooterGlobe />
      </div>

      {/* Main Footer Content */}
      <div className="footer-content">
        {/* Top section: Logo + Description */}
        <div className="footer-brand">
          <Image
            src="/logo/ieeesblogo-light2.png"
            alt="IEEE University of Moratuwa Student Branch"
            className="footer-logo"
            width={280}
            height={80}
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
                />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links-col">
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
        <div className="footer-links-col">
          <h3 className="footer-col-title">Contact</h3>
          <div className="footer-link-list">
            <p className="footer-contact-text">
              IEEE Student Branch<br />
              University of Moratuwa<br />
              Bandaranayake Mawatha<br />
              Moratuwa 10400, Sri Lanka
            </p>
            <a
              href="mailto:ieeesb@uom.lk"
              className="footer-link"
            >
              ieeesb@uom.lk
            </a>
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
        <p className="footer-legal">
          IEEE is the world&apos;s largest technical professional organization
          dedicated to advancing technology for the benefit of humanity.
        </p>
      </div>
    </footer>
  );
}
