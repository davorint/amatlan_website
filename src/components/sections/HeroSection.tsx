'use client'

import { motion, useScroll, useTransform } from "motion/react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Play, Sparkles, Heart } from "lucide-react"
import { useRef } from "react"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -300])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const blur = useTransform(scrollYProgress, [0, 1], [0, 8])

  return (
    <motion.section 
      ref={containerRef}
      style={{ y, opacity, scale, filter: `blur(${blur}px)` }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Enhanced Hero Background with Luxury Parallax */}
      <div className="absolute inset-0 -z-10">
        {/* Layered background with depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-void-950)] via-[var(--color-void-900)]/95 to-[var(--color-void-800)]/90" />
        <div className="absolute inset-0 bg-gradient-radial from-[var(--color-prism-sunset)]/5 via-transparent to-transparent" />
        
        {/* Enhanced floating ethereal elements with luxury animations */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.3, 0.9, 1],
            opacity: [0.2, 0.4, 0.1, 0.2]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut",
            times: [0, 0.3, 0.7, 1]
          }}
          className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-gradient-to-br from-[var(--color-prism-sunset)]/25 to-[var(--color-prism-amber)]/15 blur-3xl"
        />
        
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1, 0.7, 1.1, 1],
            x: [0, 20, -10, 0],
            y: [0, -15, 10, 0]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
          className="absolute top-3/4 right-1/3 w-32 h-32 rounded-full bg-gradient-to-tr from-[var(--color-spiritual-gold)]/35 to-[var(--color-prism-rose)]/20 blur-2xl"
        />
        
        <motion.div
          animate={{ 
            y: [-30, 30, -30],
            x: [-10, 15, -10],
            opacity: [0.2, 0.5, 0.2],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute bottom-1/4 left-1/3 w-48 h-48 rounded-full bg-gradient-to-bl from-[var(--color-prism-amber)]/20 to-[var(--color-mystical-purple)]/10 blur-3xl"
        />
        
        {/* Additional luxury ambient elements */}
        <motion.div
          animate={{ 
            rotate: [180, -180],
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 22, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/2 right-1/4 w-36 h-36 rounded-full bg-gradient-to-tl from-[var(--color-prism-coral)]/20 to-[var(--color-prism-gold)]/15 blur-2xl"
        />
        
        <motion.div
          animate={{ 
            y: [20, -40, 20],
            opacity: [0.15, 0.4, 0.15]
          }}
          transition={{ 
            duration: 16, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/3 left-1/2 w-28 h-28 rounded-full bg-gradient-to-br from-[var(--color-sacred-copper)]/25 to-transparent blur-xl"
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Enhanced Mystical Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          className="inline-flex items-center space-x-3 mb-12 px-6 py-3 crystal-panel-luxury rounded-full hover-glow"
        >
          <Sparkles className="w-5 h-5 text-[var(--color-prism-sunset)] animate-breathe-glow" />
          <span className="text-base font-semibold text-white/95 tracking-wide">Ancient Wisdom Meets Modern Healing</span>
          <Sparkles className="w-5 h-5 text-[var(--color-prism-amber)] animate-breathe-glow" />
        </motion.div>

        {/* Enhanced Hero Headlines with Luxury Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-[0.9] tracking-tight"
        >
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="block text-white text-shadow-luxury mb-2"
          >
            Awaken Your
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="block text-kinetic animate-float"
          >
            Sacred Self
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 1, ease: [0.19, 1, 0.22, 1] }}
          className="text-xl md:text-2xl lg:text-3xl text-white/85 mb-16 max-w-4xl mx-auto leading-relaxed font-light tracking-wide text-shadow-soft"
        >
          Journey into the mystical heart of{' '}
          <span className="text-kinetic-subtle font-semibold">
            Amatlán, Morelos
          </span>{' '}
          where ancient Temazcal ceremonies and transformative spiritual practices guide you toward profound healing and enlightenment.
        </motion.p>

        {/* Enhanced CTA Buttons with Luxury Styling */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-20"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Button
              size="lg"
              className="btn-luxury text-white font-semibold px-10 py-5 text-lg accessible-luxury hover-lift text-shadow-soft group relative overflow-hidden"
            >
              <Heart className="w-6 h-6 mr-3 animate-breathe" />
              Start Your Sacred Journey
              <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/40 text-white bg-white/5 backdrop-blur-xl hover:bg-white/15 hover:border-white/60 px-10 py-5 text-lg accessible-luxury hover-lift crystal-panel group relative overflow-hidden"
            >
              <Play className="w-6 h-6 mr-3 group-hover:animate-pulse" />
              Watch Experience
            </Button>
          </motion.div>
        </motion.div>

        {/* Enhanced Floating Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex flex-col items-center space-y-4"
        >
          <span className="text-white/70 text-base font-medium tracking-wide">Discover the Magic Below</span>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.1 }}
            className="p-4 rounded-full border-2 border-white/30 bg-white/8 backdrop-blur-xl cursor-pointer hover:bg-white/15 hover:border-white/50 transition-all duration-300 crystal-panel group"
          >
            <ArrowDown className="w-6 h-6 text-white/90 group-hover:animate-bounce" />
          </motion.div>
        </motion.div>

        {/* Enhanced Floating Sacred Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-30, 30, -30],
                x: [-15, 15, -15],
                rotate: [0, 360],
                opacity: [0.2, 0.7, 0.2],
                scale: [0.5, 1.2, 0.5]
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8
              }}
              className={`absolute rounded-full blur-sm ${i % 3 === 0 ? 'bg-[var(--color-prism-sunset)]' : i % 3 === 1 ? 'bg-[var(--color-prism-amber)]' : 'bg-[var(--color-prism-rose)]'}`}
              style={{
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                left: `${15 + i * 7}%`,
                top: `${25 + (i * 6) % 50}%`,
              }}
            />
          ))}
          
          {/* Larger mystical orbs */}
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              animate={{
                y: [-50, 50, -50],
                x: [-25, 25, -25],
                opacity: [0.1, 0.4, 0.1],
                scale: [0.8, 1.5, 0.8]
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2
              }}
              className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-[var(--color-prism-sunset)]/40 to-[var(--color-prism-amber)]/20 blur-md"
              style={{
                left: `${25 + i * 20}%`,
                top: `${20 + i * 15}%`,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Luxury ambient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-void-950)]/20 via-transparent to-transparent pointer-events-none" />
    </motion.section>
  )
}