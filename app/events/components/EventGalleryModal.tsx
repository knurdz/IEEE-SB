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
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(12px)' }}
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
                maxWidth: '1400px',
                height: '90vh',
                background: 'var(--color-surface)',
                border: '1px solid rgba(0, 87, 157, 0.3)',
                borderRadius: '24px',
                boxShadow: '0 0 80px rgba(0, 87, 157, 0.2), 0 32px 100px rgba(0,0,0,0.7)',
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
                  backdropFilter: 'blur(10px)',
                  padding: '24px 32px 16px',
                  borderBottom: '1px solid rgba(0, 87, 157, 0.15)',
                  marginBottom: '24px'
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p
                      style={{
                        fontSize: '11px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--color-muted)',
                        marginBottom: '4px',
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
                        fontSize: '28px',
                        color: 'var(--color-foreground)',
                        marginBottom: '8px',
                        lineHeight: 1.1,
                      }}
                    >
                      {event.name}
                    </h2>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '3px 12px',
                        borderRadius: '9999px',
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-orbitron)',
                        backgroundColor: `${event.categoryColor}1A`,
                        border: `1px solid ${event.categoryColor}`,
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
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'var(--color-foreground)',
                      fontSize: '24px',
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
              <div style={{ padding: '0 32px 32px' }}>
                {allFailed || galleryImages.length === 0 ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '100px 0',
                      color: 'var(--color-muted)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '16px',
                      gap: '16px',
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
                      columnWidth: '350px',
                      columnGap: '16px',
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
                            boxShadow: '0 15px 35px rgba(0,87,157,0.25)' 
                          }}
                          transition={{ 
                            duration: 0.3, 
                            ease: [0.33, 1, 0.68, 1] 
                          }}
                          style={{
                            breakInside: 'avoid',
                            marginBottom: '16px',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            background: 'var(--color-surface-alt)',
                            position: 'relative',
                            cursor: 'pointer',
                            border: '1px solid rgba(0,87,157,0.1)',
                            willChange: 'transform',
                            backfaceVisibility: 'hidden',
                          }}
                        >
                          {!isLoaded && (
                            <div
                              style={{
                                height: '200px',
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
                            onLoadingComplete={() => handleImageLoad(src)}
                            onError={() => handleImageError(src)}
                          />
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* Footer Section */}
                <div style={{ marginTop: '40px', borderTop: '1px solid rgba(0,87,157,0.1)', paddingTop: '24px' }}>
                  <p
                    style={{
                      textAlign: 'center',
                      color: 'var(--color-muted)',
                      fontSize: '12px',
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
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: '#ffffff',
                      fontSize: '28px',
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
