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
  onExplore: (event: HomeEvent) => void;
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

function EventCard({ event, offset, dragOffset, onClick, onExplore }: EventCardProps) {
  const continuousOffset = offset + dragOffset / 260;
  const absoluteOffset = Math.abs(continuousOffset);
  const direction = Math.sign(continuousOffset);
  const isCenter = absoluteOffset < 0.5;

  return (
    <motion.div
      initial={false}
      animate={{
        x: continuousOffset * 180,
        z: -absoluteOffset * 180,
        rotateY: direction * -45 * Math.min(absoluteOffset, 1),
        scale: isCenter ? 1.05 : Math.max(0.8, 1 - absoluteOffset * 0.1),
        opacity: absoluteOffset > 2 ? 0 : isCenter ? 1 : Math.max(0.3, 0.7 - absoluteOffset * 0.2),
        zIndex: 50 - Math.round(absoluteOffset * 10),
        pointerEvents: absoluteOffset > 2 ? 'none' : 'auto',
      }}
      style={{ transformStyle: 'preserve-3d' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
      onClick={onClick}
      className="pointer-events-none absolute h-[380px] w-64 shrink-0 group sm:h-[420px] sm:w-72"
    >
      <div className="pointer-events-auto relative h-full w-full cursor-pointer overflow-hidden rounded-[30px] border border-white/10 bg-surface-alt shadow-2xl transition-all duration-500">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90" />

        <div className="absolute inset-0 flex flex-col items-center justify-between p-6 text-center sm:p-8">
          <div className="flex w-full justify-center gap-2">
            <span className="flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-widest leading-none text-white/90 backdrop-blur-md sm:px-4 sm:py-1.5">
              {event.date}
            </span>
            <span className="flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-widest leading-none text-white/90 backdrop-blur-md sm:px-4 sm:py-1.5">
              {event.category}
            </span>
          </div>

          <div className="w-full">
            <h3
              className={cn(
                'mb-3 font-bold text-white transition-all duration-300 sm:mb-4',
                isCenter ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl',
              )}
            >
              {event.title}
            </h3>

            <AnimatePresence>
              {isCenter ? (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mb-6 px-2 text-[13px] leading-relaxed text-white/70 sm:mb-8 sm:text-sm"
                >
                  {event.description}
                </motion.p>
              ) : null}
            </AnimatePresence>

            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(eventItem) => {
                eventItem.stopPropagation();
                onExplore(event);
              }}
              className={cn(
                'glow-button w-full rounded-[20px] py-3 text-sm font-semibold transition-all duration-300 sm:py-4 sm:text-base',
                !isCenter && 'opacity-60 grayscale-[0.5]',
              )}
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
    const maxOffset = 260;
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
    <section id="events" className="relative overflow-hidden bg-background py-20 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[80px] sm:h-[600px] sm:w-[1000px] sm:blur-[120px]" />

      <div className="container mx-auto mb-8 px-4 sm:mb-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          transition={fadeUpTransition()}
        >
          <SectionHeading
            badge="Flagship Calendar"
            title="Flagship Events"
            description="Signature IEEE UoM experiences, presented in one consistent interactive carousel."
            titleClassName="font-orbitron uppercase tracking-tight text-white"
            descriptionClassName="text-white/60"
          />
        </motion.div>
      </div>

      <motion.div
        className="relative flex h-[500px] w-full cursor-grab items-center justify-center overflow-hidden [perspective:800px] active:cursor-grabbing"
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
              onClick={() => setCenterIndex((previous) => previous + offset)}
              onExplore={(selected) => {
                setSelectedEvent(selected);
                setModalImage(selected.image);
                setIsPaused(true);
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
                isActive ? 'w-8 bg-white sm:w-12' : 'w-2 bg-white/20',
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
              className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-white/20"
                onClick={() => {
                  setSelectedEvent(null);
                  setIsPaused(false);
                }}
                aria-label="Close event details"
              >
                &times;
              </button>

              <div className="flex w-full flex-1 flex-col items-center overflow-y-auto p-4 sm:p-6">
                <div className="group relative mb-8 h-[40vh] min-h-[40vh] w-full shrink-0 overflow-hidden rounded-3xl bg-black sm:h-[50vh] sm:min-h-[50vh] lg:h-[65vh] lg:min-h-[65vh] lg:w-[85%]">
                  <Image
                    src={modalImage || selectedEvent.image}
                    alt={selectedEvent.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 85vw"
                    className="object-cover"
                  />

                  <button
                    type="button"
                    className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-all hover:bg-white/20 group-hover:opacity-100 sm:h-12 sm:w-12 sm:opacity-100"
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
                    className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-all hover:bg-white/20 group-hover:opacity-100 sm:h-12 sm:w-12 sm:opacity-100"
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
                  <div className="mb-10 grid w-[90%] grid-cols-4 gap-2 sm:w-[85%] sm:gap-4 lg:w-[75%]">
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

                <div className="w-[90%] text-white sm:w-[85%] lg:w-[75%]">
                  <h2 className="font-orbitron mb-2 text-3xl font-bold sm:text-4xl">
                    {selectedEvent.title}
                  </h2>
                  <div className="mb-6 flex gap-4 text-sm text-primary">
                    <span>{selectedEvent.date}</span>
                    <span>&bull;</span>
                    <span>{selectedEvent.category}</span>
                  </div>
                  <p className="max-w-3xl text-lg leading-relaxed text-white/80">
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
