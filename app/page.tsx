import TextSphereAnimation from './components/home/TextSphereAnimation';
import AboutSection from './components/home/AboutSection';
import WhyJoinBento from './components/home/WhyJoinBento';
import SiteBackground from './components/layout/SiteBackground';
import SectionDivider from '@/app/chapters/components/SectionDivider';

export default function Home() {
  return (
    <main className="min-h-screen relative bg-white">
      <SiteBackground />
      <div className="relative">
        <TextSphereAnimation />
        {/* Bottom Fade Mask to blend with next section */}
        <div className="absolute inset-x-0 bottom-0 h-[20vh] bg-gradient-to-t from-white via-white/60 to-transparent z-10" />
        <div className="absolute bottom-[-160px] md:bottom-[-256px] left-0 w-full z-20 pointer-events-none">
          <SectionDivider flipX flipY className="!mt-0 !mb-0" />
        </div>
      </div>

      <AboutSection />
      
      <WhyJoinBento />
    </main>
  );
}
