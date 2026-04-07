'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { EventItem } from '../_data/events';

interface EventGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventItem | null;
}

export default function EventGalleryModal({ isOpen, onClose, event }: EventGalleryModalProps) {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  // Reset state when event changes
  useEffect(() => {
    setFailedImages(new Set());
    setLoadedImages(new Set());
  }, [event?.name]);

  // ESC key handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleImageError = useCallback((src: string) => {
    setFailedImages((prev) => new Set(prev).add(src));
  }, []);

  const handleImageLoad = useCallback((src: string) => {
    setLoadedImages((prev) => new Set(prev).add(src));
  }, []);

  if (!event) return null;

  const galleryImages = (event.gallery ?? []).filter((src) => !failedImages.has(src));
  const allFailed = (event.gallery ?? []).length > 0 && galleryImages.length === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        /* Overlay */
        <motion.div
          key="gallery-overlay"
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6"
          style={{ backgroundColor: 'rgba(2, 11, 24, 0.85)', backdropFilter: 'blur(8px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          {/* Modal Panel */}
          <motion.div
            className="relative w-full overflow-y-auto"
            style={{
              maxWidth: '900px',
              maxHeight: '85vh',
              background: '#0A1628',
              border: '1px solid rgba(0, 163, 255, 0.3)',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '0 0 60px rgba(0, 163, 255, 0.15), 0 24px 80px rgba(0,0,0,0.6)',
              scrollbarWidth: 'thin',
              scrollbarColor: '#00A3FF #0A1628',
            }}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <p
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#7A8FA6',
                    marginBottom: '6px',
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}
                >
                  Event Gallery
                </p>
                <h2
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: '26px',
                    color: '#ffffff',
                    marginBottom: '10px',
                    lineHeight: 1.2,
                  }}
                >
                  {event.name}
                </h2>
                {/* Category badge */}
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontFamily: 'Space Grotesk, sans-serif',
                    backgroundColor: `${event.categoryColor}1A`,
                    border: `1px solid ${event.categoryColor}`,
                    color: event.categoryColor,
                  }}
                >
                  {event.category}
                </span>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close gallery"
                className="gallery-close-btn"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  fontSize: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  marginLeft: '16px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,163,255,0.2)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#00A3FF';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                ×
              </button>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'rgba(0,163,255,0.15)', marginBottom: '24px' }} />

            {/* Image Grid */}
            {allFailed ? (
              /* Empty state */
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '60px 0',
                  color: '#7A8FA6',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '15px',
                  gap: '12px',
                }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                  <line x1="3" y1="3" x2="21" y2="21" />
                </svg>
                No gallery images available for this event
              </div>
            ) : (event.gallery ?? []).length === 0 ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '60px 0',
                  color: '#7A8FA6',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '15px',
                  gap: '12px',
                }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                No gallery images available for this event
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: '12px',
                }}
              >
                {(event.gallery ?? []).map((src) => {
                  if (failedImages.has(src)) return null;
                  const isLoaded = loadedImages.has(src);
                  return (
                    <div
                      key={src}
                      className="gallery-image-cell"
                      style={{
                        borderRadius: '12px',
                        overflow: 'hidden',
                        aspectRatio: '16/10',
                        background: '#0D1F35',
                        position: 'relative',
                        cursor: 'pointer',
                        border: '1px solid rgba(0,163,255,0.1)',
                        transition: 'all 0.25s ease',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.borderColor = 'rgba(0,163,255,0.4)';
                        el.style.transform = 'scale(1.02)';
                        el.style.boxShadow = '0 0 20px rgba(0,163,255,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.borderColor = 'rgba(0,163,255,0.1)';
                        el.style.transform = 'scale(1)';
                        el.style.boxShadow = 'none';
                      }}
                    >
                      {/* Shimmer skeleton while loading */}
                      {!isLoaded && (
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background:
                              'linear-gradient(90deg, #0A1628 25%, #0D1F35 50%, #0A1628 75%)',
                            backgroundSize: '200% 100%',
                            animation: 'gallery-shimmer 1.5s infinite',
                          }}
                        />
                      )}
                      <img
                        src={src}
                        alt={`${event.name} gallery`}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          opacity: isLoaded ? 1 : 0,
                          transition: 'opacity 0.3s ease',
                        }}
                        onLoad={() => handleImageLoad(src)}
                        onError={() => handleImageError(src)}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Footer */}
            <div style={{ marginTop: '24px' }}>
              <div style={{ height: '1px', background: 'rgba(0,163,255,0.15)', marginBottom: '16px' }} />
              <p
                style={{
                  textAlign: 'center',
                  color: '#7A8FA6',
                  fontSize: '12px',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
              >
                {event.name} · IEEE UOM Student Branch
              </p>
            </div>
          </motion.div>

          {/* Shimmer keyframes injected inline */}
          <style>{`
            @keyframes gallery-shimmer {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
