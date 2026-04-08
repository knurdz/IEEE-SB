import React from 'react';
import { SlideData } from './_components/ImageTransition';

// You can create fully custom, complex React components here and effortlessly attach them to slides!

const HeroComponent = () => (
  <div className="flex flex-col items-start gap-4">
    <h1 className="text-6xl font-light tracking-tight text-white drop-shadow-2xl">IEEE Student Branch</h1>
    <p className="text-xl text-white/80 font-light max-w-xl">Welcome to a community of innovators shaping the future of technology and engineering.</p>
    <button className="mt-8 px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white/20 transition-all font-medium text-lg">Discover More</button>
  </div>
);

const NetworkComponent = () => (
  <div className="flex flex-col items-center text-center gap-4">
    <div className="p-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl mb-4">
       <span className="text-white/70 tracking-[0.2em] text-sm uppercase">Global Network</span>
    </div>
    <h1 className="text-6xl font-light tracking-tight text-white drop-shadow-2xl">Connect & Research</h1>
    <p className="text-xl text-white/80 font-light max-w-2xl mt-4">Join thousands of professionals worldwide securely and continuously in our glassmorphic portals.</p>
  </div>
);

const OperationsComponent = () => (
  <div className="flex flex-col items-end text-right gap-4">
    <h1 className="text-6xl font-light tracking-tight text-white drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-100">Technical Operations</h1>
    <p className="text-xl text-white/80 font-light max-w-xl">Access bleeding-edge resources, robotics workshops, and immersive WebGL learning platforms.</p>
    <button className="mt-8 px-8 py-3 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-white rounded-full hover:bg-blue-500/40 transition-all font-medium text-lg">Join Workshop</button>
  </div>
);

const CosmosComponent = () => (
  <div className="flex flex-col items-start gap-6">
    <div className="w-16 h-1 bg-white/40 mb-4 rounded-full"></div>
    <h1 className="text-6xl font-light tracking-tight text-white drop-shadow-2xl">Explore the Cosmos</h1>
    <p className="text-xl text-white/80 font-light max-w-xl">Pushing analytical boundaries in aerospace, telecommunications, and deep-space infrastructure mapping.</p>
  </div>
);

const OceanicComponent = () => (
  <div className="flex flex-col items-center text-center gap-4">
    <h1 className="text-7xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Oceanic Flow</h1>
    <p className="text-xl text-white/80 font-light max-w-2xl">Harnessing fluid dynamics and sustainable engineering for tomorrow's complex energy grid infrastructure.</p>
  </div>
);


export const SLIDES: SlideData[] = [
  { image: '/images/bg_1.png', component: <HeroComponent /> },
  { image: '/images/bg_2.png', component: <NetworkComponent /> },
  { image: '/images/bg_3.png', component: <OperationsComponent /> },
  { image: '/images/bg_4.png', component: <CosmosComponent /> },
  { image: '/images/bg_5.png', component: <OceanicComponent /> }
];
