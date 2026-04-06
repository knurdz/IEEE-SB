'use client'

import { ChaptersCard } from '@/app/components/ChaptersCard'
import { chapters } from '@/app/lib/chapters-data'

export default function ChaptersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-40 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                IEEE Technical Societies
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Intro Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Discover Each Society
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Explore our technical societies through an immersive zig-zag layout with hexagonal logos, 
            smooth scroll animations, and brand-colored social media icons. Each society is presented 
            as a featured story with detailed descriptions and direct links to their communities.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4 divide-y divide-border/30">
          {chapters.map((chapter, index) => (
            <div key={chapter.id}>
              <ChaptersCard
                logo={chapter.logo}
                name={chapter.name}
                description={chapter.description}
                social={chapter.social}
                isEven={index % 2 === 1}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Footer Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border/40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-foreground mb-4">Design Features</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>✓ Hexagonal logo containers</li>
              <li>✓ Alternating zig-zag layout</li>
              <li>✓ Scroll-triggered animations</li>
              <li>✓ Brand-colored social icons</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Interaction</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>✓ Smooth fade &amp; slide animations</li>
              <li>✓ Hover scale effects</li>
              <li>✓ Color transitions</li>
              <li>✓ Watermark backgrounds</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Responsive</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>✓ Mobile optimized</li>
              <li>✓ Tablet friendly</li>
              <li>✓ Desktop enhanced</li>
              <li>✓ Touch-friendly icons</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
