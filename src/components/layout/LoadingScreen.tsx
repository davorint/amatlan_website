'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Sparkles } from 'lucide-react'

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)
  
  // Fixed positions to prevent hydration mismatches
  const particlePositions = Array.from({ length: 20 }, (_, i) => ({
    x: (i % 5) * 100 - 200,
    y: Math.floor(i / 5) * 100 - 200,
  }))

  useEffect(() => {
    setMounted(true)
    
    // Simulate loading progress with deterministic increments
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        // Use deterministic increment instead of Math.random()
        const increment = 10 + (prev / 10)
        return Math.min(prev + increment, 100)
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-prism-sunset/20 via-black to-prism-amber/20" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-prism-gold/10 to-transparent"
              animate={{
                x: ['-100%', '100%'],
                y: ['100%', '-100%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </div>

          {/* Floating orbs */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 rounded-full"
              style={{
                background: `radial-gradient(circle, ${
                  ['rgba(249,115,22,0.1)', 'rgba(251,191,36,0.1)', 'rgba(244,114,182,0.1)'][i]
                } 0%, transparent 70%)`,
              }}
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5
              }}
            />
          ))}

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Logo animation */}
            <motion.div
              className="mb-8"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <div className="inline-flex items-center justify-center space-x-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="h-12 w-12 text-prism-amber" />
                </motion.div>
                <h1 className="text-4xl font-bold text-white">
                  Magic-Amatlán
                </h1>
              </div>
            </motion.div>

            {/* Loading text */}
            <motion.p
              className="text-white/60 mb-8 text-sm uppercase tracking-widest"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Preparing your spiritual journey
            </motion.p>

            {/* Progress bar */}
            <div className="w-64 mx-auto">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-prism-sunset via-prism-amber to-prism-gold rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <motion.p
                className="text-white/40 text-xs mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {Math.round(progress)}%
              </motion.p>
            </div>

            {/* Floating particles */}
            {mounted && (
              <div className="absolute inset-0 pointer-events-none">
                {particlePositions.map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/30 rounded-full"
                    initial={{
                      x: pos.x,
                      y: pos.y,
                      opacity: 0
                    }}
                    animate={{
                      y: -200,
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: 'easeOut'
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}