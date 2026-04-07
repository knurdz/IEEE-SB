import type { Metadata } from 'next';
import ChaptersHero from './components/ChaptersHero';
import SocietyGrid from './components/SocietyGrid';

export const metadata: Metadata = {
  title: 'IEEE Societies | IEEE Student Branch - University of Moratuwa',
  description:
    'Discover the 17 IEEE societies shaping the future of technology, connecting professionals worldwide through conferences, publications, and educational resources.',
};

export default function ChaptersPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <ChaptersHero />
      <SocietyGrid />
    </div>
  );
}
