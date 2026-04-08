import Image from 'next/image';
import Link from 'next/link';
import { footerSocialItems, primaryNavItems } from '@/lib/site';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-section" className="site-footer relative" aria-label="IEEE UoM footer">
      <div className="footer-top-row">
        <Image
          src="/logo/ieeesblogo.png"
          alt="IEEE University of Moratuwa Student Branch"
          className="ieee-logo"
          width={395}
          height={120}
          priority
        />

        <nav className="footer-nav" aria-label="Footer main navigation">
          {primaryNavItems.map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <hr className="footer-divider" />

      <div className="social-row" aria-label="Social links">
        {footerSocialItems.map((social) => (
          <a key={social.label} href={social.href} aria-label={social.label}>
            <Image src={social.icon} alt={social.label} width={40} height={40} />
          </a>
        ))}
      </div>

      <div className="footer-text-block">
        <p>© Copyright {currentYear} IEEE - All rights reserved.</p>
        <p>Use of this Web site signifies your agreement to the IEEE Terms and Conditions.</p>
        <p>
          A not-for-profit organization, IEEE is the world&apos;s largest technical professional
          organization dedicated to advancing technology for the benefit of humanity.
        </p>
      </div>
    </footer>
  );
}
