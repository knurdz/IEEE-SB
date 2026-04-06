'use client'

import Image from 'next/image'
import { Twitter, Linkedin, Instagram, Facebook, Globe, Youtube } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface SocialLinks {
  website?: string
  twitter?: string
  linkedin?: string
  instagram?: string
  facebook?: string
  youtube?: string
}

interface ChaptersCardProps {
  logo: string
  name: string
  description: string
  social: SocialLinks
  isEven: boolean
}

const socialColorMap: Record<string, { bg: string; text: string; hover: string }> = {
  facebook: { bg: 'bg-[#1877F2]/10', text: 'text-[#1877F2]', hover: 'hover:bg-[#1877F2] hover:text-white' },
  instagram: { bg: 'bg-[#E4405F]/10', text: 'text-[#E4405F]', hover: 'hover:bg-[#E4405F] hover:text-white' },
  linkedin: { bg: 'bg-[#0A66C2]/10', text: 'text-[#0A66C2]', hover: 'hover:bg-[#0A66C2] hover:text-white' },
  twitter: { bg: 'bg-[#1DA1F2]/10', text: 'text-[#1DA1F2]', hover: 'hover:bg-[#1DA1F2] hover:text-white' },
  youtube: { bg: 'bg-[#FF0000]/10', text: 'text-[#FF0000]', hover: 'hover:bg-[#FF0000] hover:text-white' },
  website: { bg: 'bg-primary/10', text: 'text-primary', hover: 'hover:bg-primary hover:text-primary-foreground' },
}

export function ChaptersCard({ logo, name, description, social, isEven }: ChaptersCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const socialLinks = [
    { key: 'website', url: social.website, Icon: Globe },
    { key: 'facebook', url: social.facebook, Icon: Facebook },
    { key: 'instagram', url: social.instagram, Icon: Instagram },
    { key: 'linkedin', url: social.linkedin, Icon: Linkedin },
    { key: 'twitter', url: social.twitter, Icon: Twitter },
    { key: 'youtube', url: social.youtube, Icon: Youtube },
  ].filter((link) => link.url)

  const logoClasses = `transform transition-all duration-700 ${
    isVisible ? 'opacity-100 translate-x-0' : isEven ? '-translate-x-12 opacity-0' : 'translate-x-12 opacity-0'
  }`

  const textClasses = `transform transition-all duration-700 delay-100 ${
    isVisible ? 'opacity-100 translate-y-0' : 'translate-y-8 opacity-0'
  }`

  return (
    <div ref={ref} className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-16 py-16 md:py-24`}>
      {/* Logo Section - Hexagonal */}
      <div className="relative flex-1 flex justify-center">
        {/* Watermark background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 -z-10">
          <Image
            src={logo}
            alt=""
            width={300}
            height={300}
            className="object-contain w-64 h-64 md:w-80 md:h-80"
            aria-hidden
            loading="eager"
          />
        </div>

        <div className={logoClasses}>
          {/* Octagonal Logo with Gradient Border */}
          <div className="relative w-52 h-52 md:w-64 md:h-64 flex items-center justify-center p-1" 
            style={{
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            }}>
            {/* Gradient border background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary" />
            
            {/* Logo image with octagon clip */}
            <Image
              src={logo}
              alt={`${name} logo`}
              width={250}
              height={250}
              className="object-contain drop-shadow-2xl"
              loading="eager"
              style={{
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className={`flex-1 ${textClasses}`}>
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full" />
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Featured Society</span>
        </div>

        <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
          {name}
        </h3>

        <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl">
          {description}
        </p>

        {/* Social Links with Brand Colors */}
        <div className="flex flex-wrap gap-4">
          {socialLinks.map(({ key, url, Icon }) => {
            const colors = socialColorMap[key] || socialColorMap.website
            return (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-xl ${colors.bg} ${colors.text} ${colors.hover} transition-all duration-300 hover:scale-125 hover:shadow-lg group`}
                aria-label={`${name} ${key}`}
                title={key}
              >
                <Icon className="w-6 h-6" />
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
