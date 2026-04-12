"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SiteBackground from "@/app/components/layout/SiteBackground";
import { homeEvents, type HomeEvent } from "./data";

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
  const continuousOffset = offset + dragOffset / 380;
  const absoluteOffset = Math.abs(continuousOffset);
  const isActive = absoluteOffset < 0.5;

  const totalPhotos = Array.from(
    new Set([event.image, ...(event.subImages ?? [])]),
  ).length;

  const customObjectPosition =
    event.title === "Foresight" || event.title === "MoraXtreme" || event.title === "Ballerina"
      ? "object-[center_30%]"
      : "object-top";
  return (
    <motion.button
      type="button"
      initial={false}
      animate={{
        x: continuousOffset * 0, // Zero offset to keep active image centered
        z: 0,
        rotateY: 0,
        scale: isActive ? 1 : 0.95,
        opacity:
          absoluteOffset > 1.2
            ? 0
            : isActive
              ? 1
              : 0,
        zIndex: 30 - Math.round(absoluteOffset * 10),
        pointerEvents: absoluteOffset > 0.5 ? "none" : "auto",
      }}
      transition={{ type: "spring", stiffness: 270, damping: 28, mass: 0.85 }}
      className="absolute h-[380px] w-full max-w-7xl sm:h-[440px] lg:h-[500px] rounded-[4px] focus:outline-none"
      onClick={onClick}
      aria-label={
        isActive ? `Open ${event.title} gallery` : `Focus ${event.title}`
      }
    >
      <div className="relative h-full w-full overflow-hidden rounded-[4px] border border-black/10 bg-white shadow-[0_18px_45px_-22px_rgba(0,0,0,0.35)]">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1400px"
          className={`object-cover ${customObjectPosition}`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute left-4 top-4">
          <span className="rounded-sm border border-white/20 bg-black/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
            {event.category}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h4 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white drop-shadow-xl uppercase italic">
              {event.title}
            </h4>
            
            {isActive && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href={event.link || "/events"}
                  className="inline-flex items-center gap-2 rounded-sm bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-[#008be6] hover:text-white group/btn shadow-xl ring-1 ring-black/5"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  Explore Event
                  <svg
                    className="h-4 w-4 transition-transform group-hover/btn:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export default function EventsSection() {
  const [centerIndex, setCenterIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<HomeEvent | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeEvent =
    homeEvents[getWrappedIndex(centerIndex, homeEvents.length)];

  const eventGallery = useMemo(() => {
    if (!selectedEvent) {
      return [];
    }

    const merged = [selectedEvent.image, ...(selectedEvent.subImages ?? [])];
    return Array.from(new Set(merged));
  }, [selectedEvent]);

  const activeImage = eventGallery[activeImageIndex] ?? selectedEvent?.image;

  const openEventGallery = (event: HomeEvent) => {
    setSelectedEvent(event);
    setActiveImageIndex(0);
    setIsPaused(true);
  };

  useEffect(() => {
    if (isPaused || selectedEvent) {
      return;
    }

    const timer = window.setInterval(() => {
      setCenterIndex((current) => current + 1);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [isPaused, selectedEvent]);

  const handleDrag = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const maxOffset = 260;
    setDragOffset(Math.max(-maxOffset, Math.min(maxOffset, info.offset.x)));
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const swipeThreshold = 5;
    const velocityThreshold = 100;

    if (
      info.offset.x < -swipeThreshold ||
      info.velocity.x < -velocityThreshold
    ) {
      setCenterIndex((current) => current + 1);
    } else if (
      info.offset.x > swipeThreshold ||
      info.velocity.x > velocityThreshold
    ) {
      setCenterIndex((current) => current - 1);
    }

    setDragOffset(0);
  };

  useEffect(() => {
    if (!selectedEvent || eventGallery.length === 0) {
      return;
    }

    const handleKeyDown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === "Escape") {
        setSelectedEvent(null);
        return;
      }

      if (keyboardEvent.key === "ArrowRight") {
        setActiveImageIndex((current) => (current + 1) % eventGallery.length);
      }

      if (keyboardEvent.key === "ArrowLeft") {
        setActiveImageIndex(
          (current) =>
            (current - 1 + eventGallery.length) % eventGallery.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedEvent, eventGallery]);

  useEffect(() => {
    if (!selectedEvent) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedEvent]);

  return (
    <section
      id="events"
      className="relative w-full py-16 lg:py-20 overflow-hidden bg-transparent"
      aria-label="Flagship events"
    >
      <SiteBackground showTopFade={true} showBottomFade={true} />

      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/60 rounded-full blur-3xl opacity-70 -translate-y-1/3 translate-x-1/3 z-0" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-50/60 rounded-full blur-3xl opacity-70 translate-y-1/3 -translate-x-1/4 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 lg:mb-16 text-center">
          <h2 className="text-4xl lg:text-7xl text-gray-800 flex items-baseline justify-center gap-4 font-sans tracking-tight mb-6">
            <span className="font-light text-gray-700">Flagship</span>
            <span className="font-black font-serif text-gray-900 uppercase">
              Events
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-700 max-w-3xl leading-relaxed mx-auto italic font-bold">
            Explore our flagship experiences that shaped our journey across the
            years.
          </p>
        </div>

        <div className="relative mb-8">
          <div className="pointer-events-none absolute inset-x-0 top-[46%] -translate-y-1/2 text-center hidden lg:block">
            <span className="text-[10rem] leading-none font-bold tracking-tighter text-[#00589e]/[0.03] uppercase">
              {activeEvent.title}
            </span>
          </div>

          <motion.div
            className="relative flex h-[360px] sm:h-[430px] lg:h-[470px] w-full cursor-grab items-center justify-center [perspective:1200px] active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            onHoverStart={() => setIsPaused(true)}
            onHoverEnd={() => setIsPaused(false)}
          >
            {homeEvents.map((event, index) => {
              const offset = getLoopOffset(
                index,
                centerIndex,
                homeEvents.length,
              );

              return (
                <EventCard
                  key={event.id}
                  event={event}
                  offset={offset}
                  dragOffset={dragOffset}
                  onClick={() => {
                    if (offset !== 0) {
                      setCenterIndex((current) => current + offset);
                    }
                  }}
                />
              );
            })}
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto text-center mt-12 mb-8 px-4">
          <p className="text-xl sm:text-2xl text-slate-700 leading-relaxed font-normal tracking-tight italic">
            &quot;{activeEvent.description}&quot;
          </p>
        </div>

        <div className="relative z-20 mt-8 flex justify-center gap-3">
          {homeEvents.map((event, index) => {
            const isActive =
              index === getWrappedIndex(centerIndex, homeEvents.length);

            return (
              <button
                key={event.id}
                type="button"
                onClick={() => setCenterIndex(index)}
                className={
                  isActive
                    ? "h-2.5 w-12 sm:w-20 rounded-full bg-[#00589e] transition-all duration-300"
                    : "h-2.5 w-2.5 rounded-full bg-slate-300 hover:bg-slate-400 transition-all duration-300"
                }
                aria-label={`View ${event.title}`}
              />
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/85 p-4 backdrop-blur-md sm:p-8"
            onClick={() => {
              setSelectedEvent(null);
              setIsPaused(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_24px_60px_-28px_rgba(0,0,0,0.4)]"
              onClick={(clickEvent) => clickEvent.stopPropagation()}
            >
              <button
                type="button"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-md transition-colors hover:bg-slate-100"
                onClick={() => {
                  setSelectedEvent(null);
                  setIsPaused(false);
                }}
                aria-label="Close event details"
              >
                &times;
              </button>

              <div className="flex w-full flex-1 flex-col overflow-y-auto p-4 sm:p-6 lg:p-8">
                <div className="mb-5 flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="rounded-full border border-[#00589e]/20 bg-[#00589e]/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#00589e]">
                    {selectedEvent.category}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1a1a1a] mb-3">
                  {selectedEvent.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6 max-w-4xl">
                  {selectedEvent.description}
                </p>

                <div className="group relative mb-4 h-[36vh] min-h-[260px] w-full shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:h-[48vh] lg:h-[56vh]">
                  <Image
                    src={activeImage || selectedEvent.image}
                    alt={selectedEvent.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 80vw"
                    className="object-cover"
                  />

                  <button
                    type="button"
                    className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg transition-all hover:bg-white sm:left-4"
                    onClick={(clickEvent) => {
                      clickEvent.stopPropagation();
                      if (eventGallery.length === 0) {
                        return;
                      }

                      setActiveImageIndex(
                        (current) =>
                          (current - 1 + eventGallery.length) %
                          eventGallery.length,
                      );
                    }}
                    aria-label="Previous event image"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg transition-all hover:bg-white sm:right-4"
                    onClick={(clickEvent) => {
                      clickEvent.stopPropagation();
                      if (eventGallery.length === 0) {
                        return;
                      }

                      setActiveImageIndex(
                        (current) => (current + 1) % eventGallery.length,
                      );
                    }}
                    aria-label="Next event image"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {eventGallery.length ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3 mb-2">
                    {eventGallery.map((image, index) => (
                      <button
                        key={image}
                        type="button"
                        className={`relative aspect-video overflow-hidden rounded-lg border-2 transition-all ${
                          activeImage === image
                            ? "border-[#00589e]"
                            : "border-transparent hover:border-slate-300"
                        }`}
                        onClick={() => setActiveImageIndex(index)}
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
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
