'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/cn';
import type { EventItem } from '../data';

interface EventGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventItem | null;
}

export default function EventGalleryModal({ isOpen, onClose, event }: EventGalleryModalProps) {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Reset state when event changes
  useEffect(() => {
    setFailedImages(new Set());
    setLoadedImages(new Set());
    setSelectedImage(null);
  }, [event?.name]);

  // ESC key handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedImage) setSelectedImage(null);
        else onClose();
      }
    };
    if (isOpen) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose, selectedImage]);

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

  // Exclude the main banner image from the gallery
  const mainImage = event.images?.[0];
  const galleryImages = (event.gallery ?? []).filter(
    (src) => !failedImages.has(src) && src !== mainImage
  );
  const allFailed = (event.gallery ?? []).length > 0 && galleryImages.length === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Main Gallery Modal */}
          <motion.div
            key="gallery-overlay"
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(0.75rem)' }}
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
                maxWidth: '87.5rem',
                height: '90vh',
                background: 'var(--color-surface)',
                border: '0.0625rem solid rgba(0, 87, 157, 0.3)',
                borderRadius: '1.5rem',
                boxShadow: '0 0 5rem rgba(0, 87, 157, 0.2), 0 2rem 6.25rem rgba(0,0,0,0.7)',
                scrollbarWidth: 'thin',
                scrollbarColor: 'var(--color-primary) var(--color-surface)',
              }}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky Header Container */}
              <div 
                  style={{ 
                  position: 'sticky', 
                  top: 0, 
                  zIndex: 100, 
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(0.625rem)',
                  padding: '1.5rem 2rem 1rem',
                  borderBottom: '0.0625rem solid rgba(0, 87, 157, 0.15)',
                  marginBottom: '1.5rem'
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p
                      style={{
                        fontSize: '0.6875rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--color-muted)',
                        marginBottom: '0.25rem',
                        fontFamily: 'var(--font-orbitron)',
                        fontWeight: 600
                      }}
                    >
                      Explore Event
                    </p>
                    <h2
                      style={{
                        fontFamily: 'var(--font-orbitron)',
                        fontWeight: 700,
                        fontSize: '1.75rem',
                        color: 'var(--color-foreground)',
                        marginBottom: '0.5rem',
                        lineHeight: 1.1,
                      }}
                    >
                      {event.name}
                    </h2>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '0.1875rem 0.75rem',
                        borderRadius: '624.938rem',
                        fontSize: '0.625rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-orbitron)',
                        backgroundColor: `${event.categoryColor}1A`,
                        border: `0.0625rem solid ${event.categoryColor}`,
                        color: event.categoryColor,
                      }}
                    >
                      {event.category}
                    </span>
                  </div>

                  <button
                    onClick={onClose}
                    aria-label="Close gallery"
                    className="gallery-close-btn"
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '0.75rem',
                      background: 'rgba(255,255,255,0.05)',
                      border: '0.0625rem solid rgba(255,255,255,0.1)',
                      color: 'var(--color-foreground)',
                      fontSize: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,87,157,0.2)';
                      (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-primary)';
                      (e.currentTarget as HTMLButtonElement).style.transform = 'rotate(90deg)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
                      (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)';
                      (e.currentTarget as HTMLButtonElement).style.transform = 'rotate(0deg)';
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Masonry Grid Area */}
              <div style={{ padding: '0 2rem 2rem' }}>
                {allFailed || galleryImages.length === 0 ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '6.25rem 0',
                      color: 'var(--color-muted)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1rem',
                      gap: '1rem',
                    }}
                  >
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    No additional photos in gallery
                  </div>
                ) : (
                  <div
                    style={{
                      columnCount: 'auto',
                      columnWidth: '21.875rem',
                      columnGap: '1rem',
                      width: '100%'
                    }}
                  >
                    {galleryImages.map((src) => {
                      const isLoaded = loadedImages.has(src);
                      
                      return (
                        <motion.div
                          key={src}
                          onClick={() => setSelectedImage(src)}
                          whileHover={{ 
                            y: -8,
                            borderColor: 'var(--color-primary)',
                            boxShadow: '0 0.9375rem 2.1875rem rgba(0,87,157,0.25)' 
                          }}
                          transition={{ 
                            duration: 0.3, 
                            ease: [0.33, 1, 0.68, 1] 
                          }}
                          style={{
                            breakInside: 'avoid',
                            marginBottom: '1rem',
                            borderRadius: '1rem',
                            overflow: 'hidden',
                            background: 'var(--color-surface-alt)',
                            position: 'relative',
                            cursor: 'pointer',
                            border: '0.0625rem solid rgba(0,87,157,0.1)',
                            willChange: 'transform',
                            backfaceVisibility: 'hidden',
                          }}
                        >
                          {!isLoaded && (
                            <div
                              style={{
                                height: '12.5rem',
                                background: 'linear-gradient(90deg, var(--color-surface) 25%, var(--color-surface-alt) 50%, var(--color-surface) 75%)',
                                backgroundSize: '200% 100%',
                                animation: 'gallery-shimmer 1.5s infinite',
                              }}
                            />
                          )}
                          <Image
                            src={src}
                            alt={`${event.name} gallery`}
                            width={800}
                            height={600}
                            className={cn(
                              "w-full h-auto block transition-all duration-500",
                              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                            )}
                            onLoad={() => handleImageLoad(src)}
                            onError={() => handleImageError(src)}
                          />
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* Footer Section */}
                <div style={{ marginTop: '2.5rem', borderTop: '0.0625rem solid rgba(0,87,157,0.1)', paddingTop: '1.5rem' }}>
                  <p
                    style={{
                      textAlign: 'center',
                      color: 'var(--color-muted)',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-sans)',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {event.name} Collection · © {new Date().getFullYear()}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Full-screen borderless image viewer */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                key="fullscreen-overlay"
                className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/95 backdrop-blur-md cursor-zoom-out"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
              >
                <div 
                  className="absolute top-8 right-8 z-[2010]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setSelectedImage(null)}
                    style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.1)',
                      border: '0.0625rem solid rgba(255,255,255,0.2)',
                      color: '#ffffff',
                      fontSize: '1.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)';
                    }}
                  >
                    ×
                  </button>
                </div>

                <div className="relative w-full h-full max-w-[95vw] max-h-[95vh] flex items-center justify-center">
                  <Image
                    src={selectedImage}
                    alt="Full screen view"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Shimmer keyframes injected inline */}
          <style>{`
            @keyframes gallery-shimmer {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}
