import type { Metadata } from 'next';
import ChaptersHero from './components/ChaptersHero';
import ChaptersNetwork from './components/ChaptersNetwork';
import ChaptersBackground from './components/ChaptersBackground';
import SocietySections from './components/SocietySections';
import BackToTop from './components/BackToTop';

export const metadata: Metadata = {
  title: 'IEEE Societies | IEEE Student Branch - University of Moratuwa',
  description:
    'Discover the 17 IEEE societies shaping the future of technology, connecting professionals worldwide through conferences, publications, and educational resources.',
};

export default function ChaptersPage() {
  return (
    <main className="min-h-screen relative bg-[#F8F9FA]" id="chapters">
      <ChaptersBackground />
      <ChaptersHero />
      <ChaptersNetwork />
      <SocietySections />
      <div className="h-32"></div> {/* Spacer for scroll effects */}
      <BackToTop />
    </main>
  );
}
