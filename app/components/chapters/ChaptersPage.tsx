'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './chapters.module.css';

type Society = {
  name: string;
  description: string;
  reverse: boolean;
};

const societies: Society[] = [
  {
    name: 'Computer Society',
    description:
      "The world's leading organization for computer professionals, driving technological innovation. We connect over 300,000 computing professionals worldwide to advance technology and benefit society. Our members stay at the forefront of computing through conferences, publications, and educational resources.",
    reverse: false,
  },
  {
    name: 'Communications Society',
    description:
      'A leading global community of engineers and researchers advancing communications and networking technology. ComSoc fosters the development and timely distribution of information and knowledge to the worldwide technical community through publications, conferences, and outreach programs.',
    reverse: true,
  },
  {
    name: 'Signal Processing Society',
    description:
      'Advancing and disseminating state-of-the-art scientific information and resources related to signal processing. The society connects a global community of researchers and practitioners who develop innovative algorithms and systems for audio, image, video, and multimedia signal processing.',
    reverse: false,
  },
  {
    name: 'Power & Energy Society',
    description:
      'The largest forum for sharing the latest in technological developments in the electric power industry. PES provides premier technical knowledge, education, and networking opportunities to professionals working in the generation, transmission, and distribution of electric energy.',
    reverse: true,
  },
  {
    name: 'Robotics & Automation Society',
    description:
      'Promoting innovation, education, and fundamental research in robotics and automation. RAS members pioneer advancements in intelligent machines that work alongside humans, from industrial automation to surgical robots, autonomous vehicles, and beyond.',
    reverse: false,
  },
  {
    name: 'Circuits & Systems Society',
    description:
      'Leading the advancement of the theory, analysis, design, tools, and implementation of circuits and systems. CAS provides a vibrant community for engineers working on chip design, embedded systems, biomedical circuits, and next-generation computing architectures.',
    reverse: true,
  },
  {
    name: 'Control Systems Society',
    description:
      'Advancing the science and engineering of control systems, from classical feedback theory to modern autonomous systems. CSS fosters innovation in areas like adaptive control, optimal control, and cyber-physical systems that underpin modern infrastructure and technology.',
    reverse: false,
  },
  {
    name: 'Photonics Society',
    description:
      'Representing the laser, optoelectronics, and photonics community. The Photonics Society promotes the generation, collection, and conversion of light through research, innovation, and professional development across fiber optics, quantum photonics, and integrated photonic circuits.',
    reverse: true,
  },
  {
    name: 'Electron Devices Society',
    description:
      'Fostering innovation in electron devices, including semiconductor devices, MEMS, displays, and sensors. EDS members contribute to the development of technologies that power everything from smartphones and computers to medical devices and renewable energy systems.',
    reverse: false,
  },
  {
    name: 'Industrial Electronics Society',
    description:
      'Advancing the theory and application of electronics and controls to industrial processes. IES supports engineers developing smart manufacturing systems, industrial IoT platforms, motion control systems, and power electronics for sustainable industry.',
    reverse: true,
  },
  {
    name: 'Vehicular Technology Society',
    description:
      'Dedicated to the theoretical and experimental advancement of electrical and electronic engineering in mobile radio, motor vehicles, and land transportation. VTS drives innovation in connected and autonomous vehicles, V2X communication, and intelligent transportation systems.',
    reverse: false,
  },
  {
    name: 'Engineering in Medicine & Biology Society',
    description:
      'The world\'s largest international society of biomedical engineers. EMBS advances the application of engineering sciences and technology to medicine and biology, promoting innovation in medical imaging, neural engineering, wearable health devices, and biomechanics.',
    reverse: true,
  },
  {
    name: 'Microwave Theory & Technology Society',
    description:
      'Promoting the advancement of microwave theory and its applications, including RF, microwave, millimeter-wave, and terahertz technologies. MTT-S drives innovation in 5G/6G communications, radar systems, wireless power transfer, and satellite communications.',
    reverse: false,
  },
  {
    name: 'Geoscience & Remote Sensing Society',
    description:
      'Advancing science and technology in geoscience, remote sensing, and related disciplines. GRSS members develop satellite imaging, Earth observation, and environmental monitoring technologies that help us understand climate change, natural disasters, and planetary sciences.',
    reverse: true,
  },
  {
    name: 'Antennas & Propagation Society',
    description:
      'Advancing antenna technology and electromagnetic wave propagation science. AP-S members pioneer developments in phased arrays, MIMO antennas, metamaterials, and wireless propagation models that form the backbone of wireless communication systems worldwide.',
    reverse: false,
  },
  {
    name: 'Computational Intelligence Society',
    description:
      'Advancing the theory, design, application, and development of biologically and linguistically motivated computational paradigms. CIS leads research in neural networks, fuzzy systems, evolutionary computation, and swarm intelligence for solving complex real-world problems.',
    reverse: true,
  },
  {
    name: 'Information Theory Society',
    description:
      'Advancing the mathematical foundations of information science and their applications. ITS fosters groundbreaking research in data compression, channel coding, cryptography, quantum information theory, and machine learning, forming the theoretical backbone of the digital age.',
    reverse: false,
  },
];

function WebsiteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <path d="M8 11v5M8 8v.01M12 16v-5c0-1 1-2 2-2s2 1 2 2v5" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
    </svg>
  );
}

export default function ChaptersPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const cards = Array.from(
      root.querySelectorAll<HTMLElement>('[data-chapters-card="true"]')
    );

    cards.forEach((card) => {
      card.classList.remove(styles.visible, styles.slideLeft, styles.slideRight);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const card = entry.target as HTMLElement;
          const isReverse = card.dataset.reverse === 'true';
          card.classList.add(styles.visible);
          card.classList.add(isReverse ? styles.slideRight : styles.slideLeft);
          observer.unobserve(card);
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.15,
      }
    );

    cards.forEach((card) => observer.observe(card));

    const handleScroll = () => {
      const hero = heroRef.current;
      const heroContent = heroContentRef.current;
      if (!hero || !heroContent) {
        return;
      }

      const scrollY = window.scrollY;
      const heroHeight = hero.offsetHeight;
      if (scrollY < heroHeight) {
        const parallaxFactor = scrollY * 0.3;
        const opacityFactor = 1 - (scrollY / heroHeight) * 0.8;
        heroContent.style.transform = `translateY(${parallaxFactor}px)`;
        heroContent.style.opacity = `${opacityFactor}`;
      }
    };

    const moveHandlers: Array<{ inner: HTMLElement; onMove: (e: MouseEvent) => void; onLeave: () => void }> = [];

    cards.forEach((card) => {
      const inner = card.querySelector<HTMLElement>('[data-society-inner="true"]');
      if (!inner) {
        return;
      }

      const onMove = (e: MouseEvent) => {
        const rect = inner.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        inner.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(0, 212, 255, 0.04), transparent 40%)`;
      };

      const onLeave = () => {
        inner.style.background = '';
      };

      inner.addEventListener('mousemove', onMove);
      inner.addEventListener('mouseleave', onLeave);
      moveHandlers.push({ inner, onMove, onLeave });
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      moveHandlers.forEach(({ inner, onMove, onLeave }) => {
        inner.removeEventListener('mousemove', onMove);
        inner.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <div className={styles.page} ref={rootRef}>
      <header className={styles.hero} ref={heroRef}>
        <div className={styles.heroBgGrid} />
        <div className={styles.heroContent} ref={heroContentRef}>
          <span className={styles.heroBadge}>IEEE TECHNICAL COMMUNITIES</span>
          <h1 className={styles.heroTitle}>Our Societies</h1>
          <p className={styles.heroSubtitle}>
            Discover the 17 IEEE societies shaping the future of technology, connecting
            professionals worldwide through conferences, publications, and educational
            resources.
          </p>
          <div className={styles.heroScrollIndicator}>
            <span>Scroll to explore</span>
            <div className={styles.scrollArrow}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.societiesContainer}>
        {societies.map((society, index) => (
          <section
            key={society.name}
            className={`${styles.societyCard} ${society.reverse ? styles.reverse : ''}`}
            data-chapters-card="true"
            data-reverse={society.reverse}
          >
            <div className={styles.societyInner} data-society-inner="true">
              <div className={styles.societyImageWrapper}>
                <div className={styles.octagonFrame}>
                  <Image
                    src="/chapters/society_logo.png"
                    alt={`${society.name} Logo`}
                    width={182}
                    height={182}
                    className={styles.societyLogo}
                    priority={index < 2}
                  />
                </div>
                <div className={styles.imageGlow} />
              </div>

              <div className={styles.societyContent}>
                <span className={styles.societyLabel}>
                  <span className={styles.labelLine} /> FEATURED SOCIETY
                </span>
                <h2 className={styles.societyTitle}>{society.name}</h2>
                <p className={styles.societyDescription}>{society.description}</p>
                <div className={styles.socialLinks}>
                  <a href="#" className={`${styles.socialIcon} ${styles.socialIconWebsite}`} aria-label="Website">
                    <WebsiteIcon />
                  </a>
                  <a href="#" className={`${styles.socialIcon} ${styles.socialIconInstagram}`} aria-label="Instagram">
                    <InstagramIcon />
                  </a>
                  <a href="#" className={`${styles.socialIcon} ${styles.socialIconLinkedin}`} aria-label="LinkedIn">
                    <LinkedInIcon />
                  </a>
                  <a href="#" className={`${styles.socialIcon} ${styles.socialIconTwitter}`} aria-label="Twitter">
                    <TwitterIcon />
                  </a>
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerGlow} />
          <p className={styles.footerCopy}>&copy; 2026 IEEE. All rights reserved.</p>
          <p className={styles.footerSub}>Advancing Technology for Humanity</p>
        </div>
      </footer>
    </div>
  );
}
