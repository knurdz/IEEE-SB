import ChaptersHero from '../chapters/components/ChaptersHero';
import SocietyGrid from '../chapters/components/SocietyGrid';

export default function ChaptersPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <ChaptersHero />
      <SocietyGrid />
    </div>
  );
}