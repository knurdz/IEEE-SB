'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Event {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
  subImages?: string[];
}

const events: Event[] = [
  {
    id: 1,
    title: 'Cybersecurity CTF',
    date: 'Nov 10, 2027',
    category: 'Competition',
    description: 'Test your hacking and defense skills in our immersive Capture The Flag competition. Secure the flags to win.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    subImages: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800', // Main
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800', // Code
      'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=800', // Hack
      'https://images.unsplash.com/photo-1614064641913-6b7596eff522?auto=format&fit=crop&q=80&w=800', // Security
    ],
  },
  {
    id: 2,
    title: 'Techxplore',
    date: 'Oct 24, 2026',
    category: 'Symposium',
    description: 'A national-level technical symposium bringing together the brightest minds to showcase groundbreaking projects and attend workshops.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
    subImages: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&q=80&w=800',
    ],
  },
  {
    id: 3,
    title: 'Innovate-A-Thon',
    date: 'Mar 12, 2027',
    category: 'Hackathon',
    description: 'Our premier 24-hour hackathon where students build creative technological solutions to solve real-world problems.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
    subImages: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
    ],
  },
  {
    id: 4,
    title: 'AI Workshop',
    date: 'Jan 15, 2027',
    category: 'Workshop',
    description: 'Dive deep into Artificial Intelligence and Machine Learning basics with hands-on labs and expert-led sessions.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
    subImages: [
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1678505504264-7e80f4f9543e?auto=format&fit=crop&q=80&w=800',
    ],
  },
  {
    id: 5,
    title: 'Code Relay',
    date: 'Apr 05, 2027',
    category: 'Contest',
    description: 'A fast-paced competitive programming relay where teams code in shifting phases. Communication is key!',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    subImages: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=800',
    ],
  },
  {
    id: 6,
    title: 'Web Dev Bootcamp',
    date: 'May 18, 2027',
    category: 'Workshop',
    description: 'A comprehensive weekend bootcamp covering modern web technologies from React to full-stack deployment.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800',
    subImages: [
      'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1618477247222-ac60c8059fa4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
    ],
  },
  {
    id: 7,
    title: 'Data Science Summit',
    date: 'Aug 22, 2027',
    category: 'Conference',
    description: 'Join industry experts to explore the latest trends in Data Analytics, Big Data, and predictive modeling.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    subImages: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800',
    ],
  },
  {
    id: 8,
    title: 'Hardware Hackathon',
    date: 'Oct 10, 2027',
    category: 'Hackathon',
    description: 'Bring your IoT and robotics ideas to life in this 48-hour hardware building marathon.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    subImages: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1576400883215-7083980b6193?auto=format&fit=crop&q=80&w=800',
    ],
  },
];

function EventCard({ 
  event, 
  offset, 
  dragOffset,
  onClick,
  onExplore
}: { 
  event: Event; 
  offset: number;
  dragOffset: number;
  onClick: () => void;
  onExplore: (event: Event) => void;
}) {
  // Convert discrete offset to a continuous one based on drag position
  const continuousOffset = offset + dragOffset / 260; // 260 is approx card width + gap
  const absOffset = Math.abs(continuousOffset);
  const direction = Math.sign(continuousOffset);
  const isCenter = absOffset < 0.5;

  return (
    <motion.div
      initial={false}
      animate={{
        x: continuousOffset * 180, // Tighter horizontal spread for smaller cards
        z: -absOffset * 180,       // Push side cards slightly less deep but still clearly behind
        rotateY: direction * -45 * Math.min(absOffset, 1), // Stronger 3D rotation (45 deg)
        scale: isCenter ? 1.05 : Math.max(0.8, 1 - absOffset * 0.1),
        opacity: absOffset > 2 ? 0 : (isCenter ? 1 : Math.max(0.3, 0.7 - absOffset * 0.2)),
        zIndex: 50 - Math.round(absOffset * 10),
        pointerEvents: absOffset > 2 ? 'none' : 'auto',
      }}
      style={{
        transformStyle: "preserve-3d"
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
      onClick={onClick}
      className="absolute w-64 sm:w-72 h-[380px] sm:h-[420px] shrink-0 group pointer-events-none"
    >
      {/* Card Container */}
      <div 
        className="relative w-full h-full rounded-[30px] overflow-hidden shadow-2xl transition-all duration-500 border border-white/10 bg-surface-alt pointer-events-auto cursor-pointer"
      >
        {/* Background Image */}
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90" />
        
        {/* Content */}
        <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between items-center text-center">
          {/* Top Badges */}
          <div className="flex gap-2 w-full justify-center">
            <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-medium text-white/90 border border-white/10 uppercase tracking-widest leading-none flex items-center">
              {event.date}
            </span>
            <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-medium text-white/90 border border-white/10 uppercase tracking-widest leading-none flex items-center">
              {event.category}
            </span>
          </div>

          {/* Middle/Bottom Text */}
          <div className="w-full">
            <h3 className={`font-bold text-white mb-3 sm:mb-4 transition-all duration-300 ${isCenter ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'}`}>
              {event.title}
            </h3>
            
            <AnimatePresence>
              {isCenter && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-white/70 text-[13px] sm:text-sm leading-relaxed mb-6 sm:mb-8 px-2"
                >
                  {event.description}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onExplore(event);
              }}
              className={`glow-button w-full py-3 sm:py-4 rounded-[20px] text-sm sm:text-base font-semibold transition-all duration-300 ${
                !isCenter && 'opacity-60 grayscale-[0.5]'
              }`}
            >
              Explore Event
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function EventsSection() {
  const [centerIndex, setCenterIndex] = useState(2); // By default, focus middle of 5 events
  const [dragOffset, setDragOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [modalImage, setModalImage] = useState<string>('');

  // Handle arrow key navigation for the modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedEvent || !selectedEvent.subImages) return;
      const currentIdx = selectedEvent.subImages.indexOf(modalImage);
      if (currentIdx === -1) return;

      if (e.key === 'ArrowRight') {
        const nextIdx = (currentIdx + 1) % selectedEvent.subImages.length;
        setModalImage(selectedEvent.subImages[nextIdx]);
      } else if (e.key === 'ArrowLeft') {
        const prevIdx = (currentIdx - 1 + selectedEvent.subImages.length) % selectedEvent.subImages.length;
        setModalImage(selectedEvent.subImages[prevIdx]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEvent, modalImage]);

  // Auto-play interval to move slides seamlessly in an infinite loop
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCenterIndex((prev) => prev + 1);
    }, 3000); // changes position every 3 seconds

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleDrag = (event: any, info: any) => {
    // Dampen the drag a bit to make it feel heavier
    const maxOffset = 260; // 1 card drag per pull
    let actualOffset = info.offset.x;
    
    // We remove the hard stops so it can be dragged infinitely
    setDragOffset(Math.max(-maxOffset, Math.min(maxOffset, actualOffset)));
  };

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    const velocityThreshold = 500;
    const velocity = info.velocity.x;
    
    if (info.offset.x < -swipeThreshold || velocity < -velocityThreshold) {
      setCenterIndex((prev) => prev + 1); // Slide Left -> Next Card
    } else if (info.offset.x > swipeThreshold || velocity > velocityThreshold) {
      setCenterIndex((prev) => prev - 1); // Slide Right -> Prev Card
    }
    
    // Snap back
    setDragOffset(0);
  };

  return (
    <section id="events" className="relative py-20 sm:py-32 overflow-hidden bg-black">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[1000px] h-[400px] sm:h-[600px] bg-cyan-500/5 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 mb-8 sm:mb-12">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6 uppercase tracking-tighter font-orbitron"
          >
            Flagship Events
          </motion.h2>
          <div className="w-16 sm:w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>
      </div>

      <motion.div 
        className="relative w-full h-[500px] flex justify-center items-center [perspective:800px] overflow-hidden cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onHoverStart={() => setIsPaused(true)}
        onHoverEnd={() => setIsPaused(false)}
      >
        {events.map((event, index) => {
          // Infinite loop math: map the actual index to a wrapping position around `centerIndex`
          let diff = index - (centerIndex % events.length);
          if (diff < 0) diff += events.length; // normalize to positive
          let safeDiff = diff % events.length; 
          if (safeDiff < 0) safeDiff += events.length; // Handle negative centerIndex dragging indefinitely back

          // Force the array values to map symmetrically around 0 (e.g. for 5 items: -2, -1, 0, 1, 2)
          if (safeDiff > Math.floor(events.length / 2)) {
            safeDiff -= events.length;
          }

          const offset = safeDiff;

          return (
            <EventCard
              key={event.id}
              event={event}
              offset={offset}
              dragOffset={dragOffset}
              onClick={() => {
                // If they click a card on the left/right, we shift center by that offset
                setCenterIndex(centerIndex + offset);
              }}
              onExplore={(evt) => {
                setSelectedEvent(evt);
                setModalImage(evt.image);
                setIsPaused(true);
              }}
            />
          );
        })}
      </motion.div>

      {/* Navigation Indicators */}
      <div className="flex justify-center gap-3 mt-4 sm:mt-8 z-20 relative">
        {events.map((event, index) => {
          let diff = index - (centerIndex % events.length);
          if (diff < 0) diff += events.length;
          let safeDiff = diff % events.length; 
          if (safeDiff < 0) safeDiff += events.length;
          if (safeDiff > Math.floor(events.length / 2)) {
            safeDiff -= events.length;
          }

          const isActive = index === ((centerIndex % events.length) + events.length) % events.length;

          return (
            <button
              key={event.id}
              onClick={() => setCenterIndex(centerIndex + safeDiff)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                isActive ? 'w-8 sm:w-12 bg-white' : 'w-2 bg-white/20'
              }`}
            />
          );
        })}
      </div>

      {/* Event Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
            onClick={() => {
              setSelectedEvent(null);
              setIsPaused(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-[#111] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                onClick={() => {
                  setSelectedEvent(null);
                  setIsPaused(false);
                }}
              >
                &times;
              </button>
              
              <div className="flex-1 overflow-y-auto w-full p-4 sm:p-6 custom-scrollbar flex flex-col items-center">
                {/* Main Modal Image */}
                <div className="group relative shrink-0 w-full lg:w-[85%] h-[40vh] sm:h-[50vh] lg:h-[65vh] min-h-[40vh] sm:min-h-[50vh] lg:min-h-[65vh] rounded-3xl overflow-hidden mb-8 bg-black">
                  <Image
                    src={modalImage || selectedEvent.image}
                    alt={selectedEvent.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 85vw"
                    className="object-cover"
                  />
                  {/* Left Button */}
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center rounded-full hover:bg-white/20 transition-all opacity-0 sm:opacity-100 group-hover:opacity-100 z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (selectedEvent.subImages) {
                        const currentIdx = selectedEvent.subImages.indexOf(modalImage || selectedEvent.image);
                        const prevIdx = (currentIdx - 1 + selectedEvent.subImages.length) % selectedEvent.subImages.length;
                        setModalImage(selectedEvent.subImages[prevIdx]);
                      }
                    }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  {/* Right Button */}
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center rounded-full hover:bg-white/20 transition-all opacity-0 sm:opacity-100 group-hover:opacity-100 z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (selectedEvent.subImages) {
                        const currentIdx = selectedEvent.subImages.indexOf(modalImage || selectedEvent.image);
                        const nextIdx = (currentIdx + 1) % selectedEvent.subImages.length;
                        setModalImage(selectedEvent.subImages[nextIdx]);
                      }
                    }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
                
                {/* Thumbnails */}
                {selectedEvent.subImages && selectedEvent.subImages.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-10 w-[90%] sm:w-[85%] lg:w-[75%]">
                    {selectedEvent.subImages.map((img, idx) => (
                      <button
                        key={idx}
                        className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${modalImage === img ? 'border-primary' : 'border-transparent hover:border-white/50'}`}
                        onClick={() => setModalImage(img)}
                      >
                        <Image 
                          src={img} 
                          alt={`${selectedEvent.title} - ${idx}`} 
                          fill 
                          sizes="(max-width: 768px) 25vw, 20vw"
                          className="object-cover" 
                        />
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Content */}
                <div className="text-white w-[90%] sm:w-[85%] lg:w-[75%]">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-2 font-orbitron">{selectedEvent.title}</h2>
                  <div className="flex gap-4 text-primary text-sm mb-6">
                    <span>{selectedEvent.date}</span>
                    <span>&bull;</span>
                    <span>{selectedEvent.category}</span>
                  </div>
                  <p className="text-white/80 leading-relaxed max-w-3xl text-lg">
                    {selectedEvent.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
