'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Card } from '@/components/ui/card'
import { Flame, Leaf, Home, Heart, Mountain, Sparkles, Wind, Sun, Moon, Star } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Tilt from 'react-parallax-tilt'
import { useRef, useState, useEffect } from 'react'

const categories = [
  { 
    key: 'temazcal',
    icon: Flame,
    bgIcon: Wind,
    href: '/temazcales' as const,
    gradient: 'from-orange-600 via-red-600 to-amber-600',
    glowColor: 'rgb(249, 115, 22)',
    pattern: 'radial-gradient(circle at 20% 80%, rgba(249,115,22,0.3) 0%, transparent 50%)',
  },
  { 
    key: 'retreat',
    icon: Leaf,
    bgIcon: Star,
    href: '/retreats' as const,
    gradient: 'from-green-600 via-emerald-600 to-teal-600',
    glowColor: 'rgb(34, 197, 94)',
    pattern: 'radial-gradient(circle at 80% 20%, rgba(34,197,94,0.3) 0%, transparent 50%)',
  },
  { 
    key: 'ecoStay',
    icon: Home,
    bgIcon: Sun,
    href: '/eco-stays' as const,
    gradient: 'from-blue-600 via-cyan-600 to-sky-600',
    glowColor: 'rgb(59, 130, 246)',
    pattern: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.3) 0%, transparent 50%)',
  },
  { 
    key: 'healer',
    icon: Heart,
    bgIcon: Moon,
    href: '/healers' as const,
    gradient: 'from-purple-600 via-pink-600 to-rose-600',
    glowColor: 'rgb(168, 85, 247)',
    pattern: 'radial-gradient(circle at 20% 20%, rgba(168,85,247,0.3) 0%, transparent 50%)',
  },
  { 
    key: 'nature',
    icon: Mountain,
    bgIcon: Sparkles,
    href: '/nature' as const,
    gradient: 'from-teal-600 via-green-600 to-emerald-600',
    glowColor: 'rgb(20, 184, 166)',
    pattern: 'radial-gradient(circle at 80% 80%, rgba(20,184,166,0.3) 0%, transparent 50%)',
  },
]

interface CategoryCardProps {
  category: typeof categories[0]
  index: number
}

function CategoryCard({ category, index }: CategoryCardProps) {
  const t = useTranslations('Categories')
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]))
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]))
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }
  
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.3}
        glareColor={category.glowColor}
        glarePosition="all"
        glareBorderRadius="20px"
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        perspective={1000}
        scale={1.02}
        transitionSpeed={2000}
      >
        <Link href={category.href}>
          <motion.div
            ref={cardRef}
            className="relative group cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            whileHover={{ z: 50 }}
          >
            <Card className="relative overflow-hidden h-64 border-0 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-xl">
              {/* Animated background pattern */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{ background: category.pattern }}
              />
              
              {/* Gradient overlay */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
              />
              
              {/* Floating background icon */}
              <motion.div
                className="absolute top-4 right-4 opacity-10"
                animate={{
                  rotate: isHovered ? 360 : 0,
                  scale: isHovered ? 1.2 : 1
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <category.bgIcon className="h-32 w-32 text-white" />
              </motion.div>
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${category.glowColor}40 0%, transparent 70%)`,
                }}
              />
              
              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                <motion.div
                  animate={{
                    y: isHovered ? -5 : 0,
                    scale: isHovered ? 1.1 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${category.gradient} shadow-2xl`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                </motion.div>
                
                <div>
                  <motion.h3 
                    className="text-2xl font-bold text-white mb-2"
                    animate={{
                      x: isHovered ? 5 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {t(`${category.key}.title`)}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-white/70 text-sm leading-relaxed"
                    initial={{ opacity: 0.7 }}
                    animate={{
                      opacity: isHovered ? 1 : 0.7,
                      x: isHovered ? 5 : 0
                    }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  >
                    {t(`${category.key}.description`)}
                  </motion.p>
                  
                  {/* Hover indicator */}
                  <motion.div
                    className="mt-4 flex items-center text-white/60"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      x: isHovered ? 0 : -10
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-sm font-medium">Explore</span>
                    <motion.span
                      animate={{ x: isHovered ? [0, 5, 0] : 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="ml-2"
                    >
                      →
                    </motion.span>
                  </motion.div>
                </div>
              </div>
              
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, transparent 40%, ${category.glowColor}30 50%, transparent 60%)`,
                  backgroundSize: '200% 200%',
                }}
                animate={{
                  backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%'
                }}
                transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
              />
            </Card>
          </motion.div>
        </Link>
      </Tilt>
    </motion.div>
  )
}

export function CategoryGridPremium() {
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('Homepage')
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-prism-sunset/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-prism-amber/10 via-transparent to-transparent" />
      </div>
      
      {/* Floating particles */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }, (_, i) => {
          const startX = (i % 6) * 200 + (i % 3) * 50
          const startY = Math.floor(i / 6) * 160 + (i % 4) * 40
          const duration = 15 + (i % 7) * 2
          const delay = (i % 8) * 1.5
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{
                x: startX,
                y: startY + 800,
              }}
              animate={{
                y: [null, -800],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear"
              }}
            />
          )
        })}
        </div>
      )}

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center space-x-2 mb-4"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Sparkles className="h-5 w-5 text-prism-amber" />
            <span className="text-sm font-medium text-prism-amber uppercase tracking-wider">
              Discover & Explore
            </span>
            <Sparkles className="h-5 w-5 text-prism-amber" />
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-prism-sunset via-prism-amber to-prism-gold">
              {t('categoriesTitle')}
            </span>
          </h2>
          
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            {t('categoriesSubtitle')}
          </p>
        </motion.div>

        {/* Premium category grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={category.key} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}