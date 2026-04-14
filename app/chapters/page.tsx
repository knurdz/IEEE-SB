import type { Metadata } from 'next';
import ChaptersHero from './components/ChaptersHero';
import ChaptersNetwork from './components/ChaptersNetwork';
import SiteBackground from '../components/layout/SiteBackground';
import SocietySections from './components/SocietySections';
import SectionDivider from './components/SectionDivider';

export const metadata: Metadata = {
  title: 'IEEE Societies',
  description:
    'Discover the 17 IEEE societies shaping the future of technology, connecting professionals worldwide through conferences, publications, and educational resources.',
};

export default function ChaptersPage() {
  return (
    <main className="min-h-screen relative bg-white overflow-hidden pb-12 md:pb-20" id="chapters">
      <SiteBackground />
      <ChaptersHero />
      <ChaptersNetwork />
      <SectionDivider />
      <SocietySections />
      <div className="h-32"></div> {/* Spacer for scroll effects */}
    </main>
  );
}
