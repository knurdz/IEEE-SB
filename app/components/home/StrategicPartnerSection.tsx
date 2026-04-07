import Image from 'next/image';

export default function StrategicPartnerSection() {
  return (
    <section id="strategic-partner-section" className="strategic-partner" aria-label="Strategic partner">
      <div className="partner-card">
        <h2>Strategic Partner</h2>
        <div className="partner-main-row">
          <div className="partner-logo-col">
            <Image src="/partners/IFS.png" alt="IFS" className="ifs-logo" width={560} height={280} />
          </div>
          <div className="partner-copy-col">
            <p>
              We are proud to announce our official strategic partnership with the IEEE Student Branch of University of Moratuwa. This collaboration aims to foster innovation, knowledge exchange, and professional development among aspiring engineers and technologists. Together, we will work on groundbreaking projects, host insightful workshops, and provide invaluable networking opportunities to empower the next generation of leaders in the field of engineering and technology. Join us in this exciting journey of growth and excellence.
            </p>
            <a href="https://www.ifs.com" className="visit-btn" target="_blank" rel="noopener noreferrer">
              visit - www.ifs.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
