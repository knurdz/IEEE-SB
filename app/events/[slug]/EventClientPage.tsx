'use client';

import React, { useState, useEffect, useCallback, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { EVENTS } from '../data';
import type { EventItem } from '../data';
import SiteBackground from '../../components/layout/SiteBackground';
import StaticSiteLink from '@/app/components/ui/StaticSiteLink';
import { resolveStaticAssetUrl } from '@/lib/static-site';

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export default function EventDetailPageClient({ params }: EventPageProps) {
  const resolvedParams = use(params);
  const event = EVENTS.find((e) => e.slug === resolvedParams.slug);

  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleImageLoad = useCallback((src: string) => {
    setLoadedImages((prev) => new Set(prev).add(src));
  }, []);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-primary">
        <div className="text-center">
          <h1 className="text-4xl font-orbitron font-bold mb-4">Event Not Found</h1>
          <StaticSiteLink href="/events" className="glow-button">Back to Events</StaticSiteLink>
        </div>
      </div>
    );
  }

  const galleryImages = event.gallery ?? [];
  const groupedGallery = event.groupedGallery ?? [];

  return (
    <main className="min-h-screen relative bg-white text-foreground overflow-x-hidden">
      <SiteBackground />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <StaticSiteLink 
            href="/events" 
            className="inline-flex items-center gap-2 text-primary hover:text-accent mb-8 transition-colors group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
            <span className="font-medium">Back to Events</span>
          </StaticSiteLink>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-12">
              <div className="flex items-center gap-4 mb-6">
                <span 
                  className="px-4 py-1.5 rounded-full text-[0.75rem] font-bold tracking-widest uppercase font-display"
                  style={{
                    backgroundColor: `${event.categoryColor}1A`,
                    border: `0.0625rem solid ${event.categoryColor}`,
                    color: event.categoryColor,
                  }}
                >
                  {event.category}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-primary mb-6 leading-tight">
                {event.name}
              </h1>

              {event.mainImage && (
                <motion.div 
                  className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-primary/10 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Image 
                    src={event.mainImage} 
                    alt={event.name}
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                </motion.div>
              )}
            </div>

            <div className="lg:col-span-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-[1.0625rem] md:text-[1.1875rem] leading-relaxed text-muted-foreground font-sans text-justify whitespace-pre-line">
                  {event.fullDescription || event.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {galleryImages.length > 0 && groupedGallery.length === 0 && (
        <section className="relative py-20 px-4 z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl font-orbitron font-bold text-primary">Event Gallery</h2>
              <div className="flex-1 h-[0.125rem] bg-gradient-to-r from-primary to-transparent opacity-20" />
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {galleryImages.map((src, idx) => {
                const isLoaded = loadedImages.has(src);
                return (
                  <motion.div
                    key={src}
                    className="relative rounded-2xl overflow-hidden cursor-pointer border border-primary/10 group bg-surface-alt"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setSelectedImage(src)}
                  >
                    {!isLoaded && (
                      <div className="aspect-square bg-slate-100 animate-pulse" />
                    )}
                    <Image
                      src={src}
                      alt={`${event.name} gallery ${idx + 1}`}
                      width={600}
                      height={400}
                      className={`w-full h-auto transition-transform duration-500 group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => handleImageLoad(src)}
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Grouped Gallery Section (e.g. Roboroaz) */}
      {groupedGallery.length > 0 && (
        <section className="relative py-20 px-4 z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl font-orbitron font-bold text-primary">Event Gallery</h2>
              <div className="flex-1 h-[0.125rem] bg-gradient-to-r from-primary to-transparent opacity-20" />
            </div>

            <div className="flex flex-col gap-16">
              {groupedGallery.map((group, gIdx) => (
                <div key={group.name}>
                  <h3 className="text-2xl font-orbitron font-bold text-primary/80 mb-6 border-b border-primary/10 pb-2">
                    {group.name}
                  </h3>
                  <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {group.images.map((src, idx) => {
                      const isLoaded = loadedImages.has(src);
                      return (
                        <motion.div
                          key={src}
                          className="relative rounded-2xl overflow-hidden cursor-pointer border border-primary/10 group bg-surface-alt"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 }}
                          onClick={() => setSelectedImage(src)}
                        >
                          {!isLoaded && (
                            <div className="aspect-square bg-slate-100 animate-pulse" />
                          )}
                          <Image
                            src={src}
                            alt={`${group.name} gallery ${idx + 1}`}
                            width={600}
                            height={400}
                            className={`w-full h-auto transition-transform duration-500 group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => handleImageLoad(src)}
                          />
                          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white hover:text-accent transition-colors z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <motion.img
              src={resolveStaticAssetUrl(selectedImage)}
              alt="Full view"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Facebook Post Link */}
      {event.albumUrl && (
        <section className="relative pb-20 px-4 z-10">
          <div className="max-w-6xl mx-auto flex justify-center">
            <motion.a
              href={event.albumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-full font-orbitron font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(24,119,242,0.3)] group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                className="transition-transform group-hover:rotate-12"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              View Full Album
            </motion.a>
          </div>
        </section>
      )}

      {/* Footer Space */}
      <div className="py-20" />
    </main>
  );
}
