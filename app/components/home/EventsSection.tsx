'use client';

import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import SectionHeading from '@/app/components/ui/SectionHeading';
import { cn } from '@/lib/cn';
import { fadeUp, fadeUpTransition, inViewOnce } from '@/lib/motion';
import { homeEvents, type HomeEvent } from './data';

interface EventCardProps {
  event: HomeEvent;
  offset: number;
  dragOffset: number;
  onClick: () => void;
}

function getWrappedIndex(index: number, total: number) {
  return ((index % total) + total) % total;
}

function getLoopOffset(index: number, centerIndex: number, total: number) {
  const wrappedCenterIndex = getWrappedIndex(centerIndex, total);
  let diff = index - wrappedCenterIndex;

  if (diff < 0) {
    diff += total;
  }

  if (diff > Math.floor(total / 2)) {
    diff -= total;
  }

  return diff;
}

function EventCard({ event, offset, dragOffset, onClick }: EventCardProps) {
  const continuousOffset = offset + dragOffset / 300;
  const absoluteOffset = Math.abs(continuousOffset);
  const direction = Math.sign(continuousOffset);
  const isCenter = absoluteOffset < 0.5;

  return (
    <motion.div
      initial={false}
      animate={{
        x: continuousOffset * 300,
        z: -absoluteOffset * 280,
        rotateY: direction * -38 * Math.min(absoluteOffset, 1),
        scale: isCenter ? 1.05 : Math.max(0.8, 1 - absoluteOffset * 0.1),
        opacity: absoluteOffset > 2 ? 0 : isCenter ? 1 : Math.max(0.3, 0.7 - absoluteOffset * 0.2),
        zIndex: 50 - Math.round(absoluteOffset * 10),
        pointerEvents: absoluteOffset > 2 ? 'none' : 'auto',
      }}
      style={{ transformStyle: 'preserve-3d' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
      onClick={onClick}
      whileHover="hover"
      className="pointer-events-none absolute h-[500px] w-[600px] shrink-0 group sm:h-[550px] sm:w-[750px]"
    >
      <div className="pointer-events-auto relative h-full w-full cursor-pointer overflow-hidden rounded-[8px] border border-slate-200/60 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />



        <div className="absolute inset-0 flex flex-col items-center justify-between text-center">
          <div className="flex w-full justify-center gap-3">
            <span className="flex items-center gap-1.5 rounded-full border border-white/40 bg-black/5 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white shadow-xl backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-[10px] font-jetbrains">
              <span className="h-1.2 w-1.2 rounded-full bg-[#0052FF] shadow-[0_0_8px_rgba(0,82,255,0.6)]" />
              {event.date}
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-white/40 bg-black/5 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white shadow-xl backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-[10px] font-jetbrains">
              <span className="h-1.2 w-1.2 rounded-full bg-[#122f6cff] shadow-[0_0_8px_rgba(18,47,108,0.4)]" />
              {event.category}
            </span>
          </div>

          {/* Glass Text Container */}
          <div className="w-full bg-black/5 p-6 backdrop-blur-sm border-t border-white/20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
            <h3
              className={cn(
                'font-inter mb-1 font-black text-white transition-all duration-300 tracking-tighter uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]',
                isCenter ? 'text-3xl sm:text-5xl' : 'text-xl sm:text-2xl opacity-60',
              )}
            >
              {event.title}
            </h3>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              variants={{
                hover: { height: 'auto', opacity: 1, marginTop: '1rem' },
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <p className="px-2 text-[13px] font-semibold leading-relaxed text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] sm:text-sm font-inter">
                {event.description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function EventsSection() {
  const [centerIndex, setCenterIndex] = useState(2);
  const [dragOffset, setDragOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<HomeEvent | null>(null);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    const subImages = selectedEvent?.subImages;
    if (!subImages) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const currentIndex = subImages.indexOf(modalImage);
      if (currentIndex < 0) {
        return;
      }

      if (event.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % subImages.length;
        setModalImage(subImages[nextIndex]);
      }

      if (event.key === 'ArrowLeft') {
        const previousIndex = (currentIndex - 1 + subImages.length) % subImages.length;
        setModalImage(subImages[previousIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEvent, modalImage]);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setCenterIndex((previous) => previous + 1);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const handleDrag = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const maxOffset = 300;
    const actualOffset = info.offset.x;

    setDragOffset(Math.max(-maxOffset, Math.min(maxOffset, actualOffset)));
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const swipeThreshold = 50;
    const velocityThreshold = 500;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      setCenterIndex((previous) => previous + 1);
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      setCenterIndex((previous) => previous - 1);
    }

    setDragOffset(0);
  };

  const activeIndex = getWrappedIndex(centerIndex, homeEvents.length);

  return (
    <section id="events" className="relative overflow-hidden bg-[#F8F9FA] py-20 sm:py-32">
      

      <div className="container mx-auto mb-0 px-4 sm:mb-2">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          transition={fadeUpTransition()}
        >
          <SectionHeading
            title="Flagship Events"
            highlight="Events"
            description="Signature IEEE UoM experiences, presented in one consistent interactive carousel."
            titleClassName="font-inter font-black uppercase tracking-tighter text-[#122f6cff] mb-2 drop-shadow-sm"
            descriptionClassName="text-[#122f6cff]/70 text-lg font-semibold font-inter"
          />
        </motion.div>
      </div>

      <motion.div
        className="relative flex h-[650px] w-full cursor-grab items-center justify-center [perspective:1000px] active:cursor-grabbing sm:h-[750px]"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onHoverStart={() => setIsPaused(true)}
        onHoverEnd={() => setIsPaused(false)}
      >
        {homeEvents.map((event, index) => {
          const offset = getLoopOffset(index, centerIndex, homeEvents.length);

          return (
            <EventCard
              key={event.id}
              event={event}
              offset={offset}
              dragOffset={dragOffset}
              onClick={() => {
                if (offset === 0) {
                  setSelectedEvent(event);
                  setModalImage(event.image);
                  setIsPaused(true);
                } else {
                  setCenterIndex((previous) => previous + offset);
                }
              }}
            />
          );
        })}
      </motion.div>

      <div className="relative z-20 mt-4 flex justify-center gap-3 sm:mt-8">
        {homeEvents.map((event, index) => {
          const offset = getLoopOffset(index, centerIndex, homeEvents.length);
          const isActive = index === activeIndex;

          return (
            <button
              key={event.id}
              type="button"
              onClick={() => setCenterIndex((previous) => previous + offset)}
              className={cn(
                'h-1.5 rounded-full transition-all duration-500',
                isActive ? 'w-8 bg-[#122f6cff] sm:w-12' : 'w-2 bg-[#122f6cff]/20',
              )}
              aria-label={`View ${event.title}`}
            />
          );
        })}
      </div>

      <AnimatePresence>
        {selectedEvent ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#F8F9FA]/95 p-4 backdrop-blur-md sm:p-8"
            onClick={() => {
              setSelectedEvent(null);
              setIsPaused(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-[#122f6cff] transition-colors hover:bg-slate-200"
                onClick={() => {
                  setSelectedEvent(null);
                  setIsPaused(false);
                }}
                aria-label="Close event details"
              >
                &times;
              </button>

              <div className="flex w-full flex-1 flex-col items-center overflow-y-auto p-4 sm:p-6">
                <div className="group relative mb-4 h-[40vh] min-h-[40vh] w-full shrink-0 overflow-hidden rounded-3xl bg-black sm:h-[50vh] sm:min-h-[50vh] lg:h-[65vh] lg:min-h-[65vh] lg:w-[85%]">
                  <Image
                    src={modalImage || selectedEvent.image}
                    alt={selectedEvent.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 85vw"
                    className="object-cover"
                  />

                  <button
                    type="button"
                    className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-blue-600 opacity-0 shadow-lg transition-all hover:bg-white group-hover:opacity-100 sm:h-12 sm:w-12 sm:opacity-100"
                    onClick={(event) => {
                      event.stopPropagation();
                      if (!selectedEvent.subImages) {
                        return;
                      }

                      const currentIndex = selectedEvent.subImages.indexOf(
                        modalImage || selectedEvent.image,
                      );
                      const previousIndex =
                        (currentIndex - 1 + selectedEvent.subImages.length) %
                        selectedEvent.subImages.length;
                      setModalImage(selectedEvent.subImages[previousIndex]);
                    }}
                    aria-label="Previous event image"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-blue-600 opacity-0 shadow-lg transition-all hover:bg-white group-hover:opacity-100 sm:h-12 sm:w-12 sm:opacity-100"
                    onClick={(event) => {
                      event.stopPropagation();
                      if (!selectedEvent.subImages) {
                        return;
                      }

                      const currentIndex = selectedEvent.subImages.indexOf(
                        modalImage || selectedEvent.image,
                      );
                      const nextIndex = (currentIndex + 1) % selectedEvent.subImages.length;
                      setModalImage(selectedEvent.subImages[nextIndex]);
                    }}
                    aria-label="Next event image"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {selectedEvent.subImages?.length ? (
                  <div className="mb-10 grid w-[90%] grid-cols-4 gap-2 sm:w-[85%] sm:gap-3 lg:w-[75%]">
                    {selectedEvent.subImages.map((image, index) => (
                      <button
                        key={image}
                        type="button"
                        className={cn(
                          'relative aspect-video overflow-hidden rounded-lg border-2 transition-all',
                          modalImage === image
                            ? 'border-primary'
                            : 'border-transparent hover:border-white/50',
                        )}
                        onClick={() => setModalImage(image)}
                        aria-label={`Open ${selectedEvent.title} gallery image ${index + 1}`}
                      >
                        <Image
                          src={image}
                          alt={`${selectedEvent.title} preview ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 25vw, 20vw"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                ) : null}

                <div className="w-[90%] text-white sm:w-[85%] lg:w-[75%] font-inter">
                  <h2 className="mb-6 text-4xl font-black uppercase tracking-tighter sm:text-6xl bg-gradient-to-r from-[#122f6cff] to-[#0052FF] bg-clip-text text-transparent drop-shadow-sm">
                    {selectedEvent.title}
                  </h2>
                  <div className="mb-8 flex flex-wrap gap-3">
                    <span className="flex items-center gap-1.5 rounded-full border border-[#0052FF]/30 bg-[#0052FF]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#0052FF] backdrop-blur-md font-jetbrains">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] shadow-[0_0_8px_rgba(0,82,255,0.6)]" />
                      {selectedEvent.date}
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full border border-[#122f6cff]/30 bg-[#122f6cff]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#122f6cff] backdrop-blur-md font-jetbrains">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#122f6cff] shadow-[0_0_8px_rgba(18,47,108,0.4)]" />
                      {selectedEvent.category}
                    </span>
                  </div>
                  <p className="max-w-3xl text-lg font-semibold leading-relaxed text-[#122f6cff]/80">
                    {selectedEvent.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
