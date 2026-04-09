"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import Image from "next/image";
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

  return (
    <motion.button
      type="button"
      initial={false}
      animate={{
        x: continuousOffset * 270,
        z: -absoluteOffset * 220,
        rotateY: continuousOffset * -18,
        scale: isActive ? 1 : Math.max(0.84, 1 - absoluteOffset * 0.1),
        opacity:
          absoluteOffset > 2
            ? 0
            : isActive
              ? 1
              : Math.max(0.28, 0.7 - absoluteOffset * 0.25),
        zIndex: 30 - Math.round(absoluteOffset * 10),
        pointerEvents: absoluteOffset > 2 ? "none" : "auto",
      }}
      transition={{ type: "spring", stiffness: 270, damping: 28, mass: 0.85 }}
      className="absolute h-[320px] w-[300px] sm:h-[380px] sm:w-[420px] lg:h-[420px] lg:w-[560px] rounded-2xl focus:outline-none"
      onClick={onClick}
      aria-label={
        isActive ? `Open ${event.title} gallery` : `Focus ${event.title}`
      }
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_18px_45px_-22px_rgba(0,0,0,0.35)]">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 560px"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

        <div className="absolute left-3 top-3 sm:left-4 sm:top-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/35 bg-black/25 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur">
            {event.date}
          </span>
          <span className="rounded-full border border-white/35 bg-black/25 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur">
            {totalPhotos} Photos
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-left">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-white/80 mb-1">
            {event.category}
          </p>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-white drop-shadow-sm">
            {event.title}
          </h3>
          <p className="mt-1 text-[11px] sm:text-xs text-white/80">
            {isActive ? "Tap image to open gallery" : "Tap to focus"}
          </p>
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
    }, 4500);

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
    const swipeThreshold = 40;
    const velocityThreshold = 420;

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
      className="relative w-full py-20 lg:py-28 overflow-hidden bg-transparent"
      aria-label="Flagship events"
    >
      <SiteBackground showTopFade={true} showBottomFade={true} />

      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/60 rounded-full blur-3xl opacity-70 -translate-y-1/3 translate-x-1/3 z-0" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-50/60 rounded-full blur-3xl opacity-70 translate-y-1/3 -translate-x-1/4 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8 lg:mb-10 text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#00589e] mb-3">
            Flagship Events
          </p>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[#1a1a1a] mb-4">
            Previous events, still shaping what comes next.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed mx-auto">
            Rotate through our flagship experiences and open the highlighted
            event to explore its full photo gallery.
          </p>
        </div>

        <div className="relative mb-6">
          <div className="pointer-events-none absolute inset-x-0 top-[46%] -translate-y-1/2 text-center hidden lg:block">
            <span className="text-[8rem] leading-none font-semibold tracking-tight text-[#00589e]/[0.05] uppercase">
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
                    if (offset === 0) {
                      openEventGallery(event);
                    } else {
                      setCenterIndex((current) => current + offset);
                    }
                  }}
                />
              );
            })}
          </motion.div>
        </div>

        <div className="max-w-2xl mx-auto text-center mb-6">
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1a1a1a] mb-2">
            {activeEvent.title}
          </h3>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {activeEvent.description}
          </p>
        </div>

        <div className="relative z-20 mt-2 flex justify-center gap-2.5 sm:gap-3">
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
                    ? "h-1.5 w-9 sm:w-12 rounded-full bg-[#00589e]"
                    : "h-1.5 w-2.5 rounded-full bg-slate-300 hover:bg-slate-400"
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
                    {selectedEvent.date}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
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
