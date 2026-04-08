import React from 'react';
import { SlideData } from './_components/ImageTransition';

// You can create fully custom, complex React components here and effortlessly attach them to slides!

const HeroComponent = () => (
  <div className="w-full h-full p-20 flex flex-col justify-center items-start bg-transparent">
    <div className="flex flex-col items-start gap-4 max-w-3xl" style={{ color: '#0f172a' }}>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 shadow-sm mb-2" style={{ backgroundColor: '#eff6ff' }}>
        <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#0052FF' }}>IEEE Technical Communities</span>
      </div>
      <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight pb-2 drop-shadow-sm" style={{ backgroundImage: 'linear-gradient(to right, #0a1930, #0052FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>
        Our Societies
      </h1>
      <p className="text-xl font-medium max-w-2xl leading-relaxed mt-2" style={{ color: '#334155' }}>
        Discover the 17 IEEE societies shaping the future of technology, connecting professionals worldwide through conferences, publications, and educational resources.
      </p>
      <button 
        className="mt-8 px-8 py-3 text-white rounded-full shadow-md transition-all duration-300 font-medium text-lg w-fit hover:shadow-lg hover:-translate-y-0.5" 
        style={{ backgroundColor: '#0052FF' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0a1930'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0052FF'}
      >
        Discover More
      </button>
    </div>
  </div>
);

const NetworkComponent = () => (
  <div className="w-full h-full p-20 flex flex-col justify-center items-center bg-transparent">
    <div className="flex flex-col items-center text-center gap-4">
      <div className="p-4 border border-blue-200 rounded-2xl mb-4 shadow-sm" style={{ backgroundColor: '#eff6ff' }}>
         <span className="font-bold tracking-[0.2em] text-sm uppercase" style={{ color: '#0052FF' }}>Global Network</span>
      </div>
      <h1 className="text-6xl font-extrabold tracking-tight drop-shadow-sm" style={{ color: '#0f172a' }}>Connect & Research</h1>
      <p className="text-xl font-medium max-w-2xl mt-4 leading-relaxed" style={{ color: '#334155' }}>Join thousands of professionals worldwide securely and continuously in our glassmorphic portals.</p>
    </div>
  </div>
);

const OperationsComponent = () => (
  <div className="w-full h-full p-20 flex flex-col justify-center items-end bg-transparent">
    <div className="flex flex-col items-end text-right gap-4">
      <h1 className="text-6xl font-extrabold tracking-tight pb-2 drop-shadow-sm" style={{ backgroundImage: 'linear-gradient(to left, #0a1930, #0052FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>
        Technical Operations
      </h1>
      <p className="text-xl font-medium max-w-xl leading-relaxed" style={{ color: '#334155' }}>Access bleeding-edge resources, robotics workshops, and immersive WebGL learning platforms.</p>
      <button 
        className="mt-8 px-8 py-3 text-white rounded-full shadow-md transition-all duration-300 font-medium text-lg w-fit hover:shadow-lg hover:-translate-y-0.5"
        style={{ backgroundColor: '#0052FF' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0a1930'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0052FF'}
      >
        Join Workshop
      </button>
    </div>
  </div>
);

const CosmosComponent = () => (
  <div className="w-full h-full p-20 flex flex-col justify-center items-start bg-transparent">
    <div className="flex flex-col items-start gap-6">
      <div className="w-16 h-1 mb-4 rounded-full" style={{ backgroundColor: '#0052FF' }}></div>
      <h1 className="text-6xl font-extrabold tracking-tight drop-shadow-sm" style={{ color: '#0f172a' }}>Explore the Cosmos</h1>
      <p className="text-xl font-medium max-w-xl leading-relaxed" style={{ color: '#334155' }}>Pushing analytical boundaries in aerospace, telecommunications, and deep-space infrastructure mapping.</p>
    </div>
  </div>
);

const OceanicComponent = () => (
  <div className="w-full h-full p-20 flex flex-col justify-center items-center bg-transparent">
    <div className="flex flex-col items-center text-center gap-4">
      <h1 className="text-7xl font-black tracking-tighter drop-shadow-sm" style={{ color: '#0a1930' }}>Oceanic Flow</h1>
      <p className="text-xl font-medium max-w-2xl leading-relaxed" style={{ color: '#334155' }}>Harnessing fluid dynamics and sustainable engineering for tomorrow's complex energy grid infrastructure.</p>
    </div>
  </div>
);


export const SLIDES: SlideData[] = [
  { image: '/images/bg-2.svg', component: <HeroComponent /> },
  { image: '/images/bg-2.svg', component: <NetworkComponent /> },
  { image: '/images/bg-2.svg', component: <OperationsComponent /> },
  { image: '/images/bg-2.svg', component: <CosmosComponent /> },
  { image: '/images/bg-2.svg', component: <OceanicComponent /> }
];
