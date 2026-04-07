import Image from 'next/image';

const socialLinks = [
  { href: '#', icon: '/social/FB.svg', alt: 'Facebook' },
  { href: '#', icon: '/social/Insta.svg', alt: 'Instagram' },
  { href: '#', icon: '/social/You-tube.svg', alt: 'YouTube' },
  { href: '#', icon: '/social/Linkdin.svg', alt: 'LinkedIn' },
];

const footerNav = [
  { href: '#', label: 'Home' },
  { href: '#', label: 'Events' },
  { href: '#', label: 'Team' },
  { href: '#', label: 'Chapters' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-section" className="site-footer" aria-label="IEEE UoM footer">
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
          {footerNav.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <hr className="footer-divider" />

      <div className="social-row" aria-label="Social links">
        {socialLinks.map((social) => (
          <a key={social.alt} href={social.href} aria-label={social.alt}>
            <Image src={social.icon} alt={social.alt} width={40} height={40} />
          </a>
        ))}
      </div>

      <div className="footer-text-block">
        <p>© Copyright {currentYear} IEEE - All rights reserved.</p>
        <p>Use of this Web site signifies your agreement to the IEEE Terms and Conditions.</p>
        <p>
          A not-for-profit organization, IEEE is the world's largest technical professional
          organization dedicated to advancing technology for the benefit of humanity.
        </p>
      </div>
    </footer>
  );
}
