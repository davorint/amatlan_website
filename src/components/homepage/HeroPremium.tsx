'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, MapPin, Sparkles, Wind, Leaf, Sun } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei'
import { useInView } from 'react-intersection-observer'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// Fixed positions to prevent hydration mismatches
const particlePositions = [
  [0.8, 0.5, -0.5],
  [-0.5, -0.3, 0.8],
  [1.2, -0.8, 0.2],
  [-1.1, 0.6, -0.8],
  [0.3, 1.0, 0.6]
] as const

// Floating particles component
function FloatingParticles() {
  return (
    <>
      {particlePositions.map((position, i) => (
        <Float
          key={i}
          speed={1 + i * 0.5}
          rotationIntensity={0.5}
          floatIntensity={1}
          floatingRange={[-0.1, 0.1]}
        >
          <Sphere args={[0.05 + i * 0.02, 16, 16]} position={position}>
            <MeshDistortMaterial
              color="#f97316"
              attach="material"
              distort={0.3}
              speed={2}
              opacity={0.6}
              transparent
            />
          </Sphere>
        </Float>
      ))}
    </>
  )
}

// Animated background orb
function AnimatedOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.PI / 4
      meshRef.current.rotation.y = Math.PI / 4
    }
  }, [])

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial
          color="#fbbf24"
          attach="material"
          distort={0.4}
          speed={1.5}
          opacity={0.15}
          transparent
        />
      </Sphere>
    </Float>
  )
}

export function HeroPremium() {
  const [searchQuery, setSearchQuery] = useState('')
  const [timeOfDay, setTimeOfDay] = useState<'dawn' | 'day' | 'dusk' | 'night'>('day')
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('Homepage')
  const tCommon = useTranslations('Common')
  
  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { ref: contentRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 1.1])

  // Determine time of day for dynamic lighting
  useEffect(() => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 8) setTimeOfDay('dawn')
    else if (hour >= 8 && hour < 17) setTimeOfDay('day')
    else if (hour >= 17 && hour < 20) setTimeOfDay('dusk')
    else setTimeOfDay('night')
  }, [])

  // GSAP animations
  useGSAP(() => {
    if (inView) {
      gsap.timeline()
        .from('.hero-title', {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: 'power4.out'
        })
        .from('.hero-subtitle', {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: 'power4.out'
        }, '-=0.8')
        .from('.hero-description', {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, '-=0.6')
        .from('.search-container', {
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(1.7)'
        }, '-=0.4')
        .from('.action-button', {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        }, '-=0.3')
    }
  }, { dependencies: [inView] })

  const timeGradients = {
    dawn: 'from-orange-900/40 via-rose-800/30 to-amber-700/20',
    day: 'from-sky-900/30 via-blue-800/20 to-cyan-700/10',
    dusk: 'from-purple-900/40 via-pink-800/30 to-orange-700/20',
    night: 'from-indigo-950/50 via-purple-900/40 to-blue-900/30'
  }

  const handleVideoLoad = () => {
    setIsVideoLoaded(true)
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  return (
    <motion.section 
      ref={heroRef}
      className="relative min-h-screen overflow-hidden"
      style={{ scale }}
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleVideoLoad}
        >
          <source src="/videos/amatlan-hero.mp4" type="video/mp4" />
        </video>
        
        {/* Fallback gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${timeGradients[timeOfDay]}`} />
        
        {/* Overlay gradients for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </div>

      {/* 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <AnimatedOrb />
            <FloatingParticles />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </Suspense>
      </div>

      {/* Animated particles overlay */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }, (_, i) => {
          const startX = (i % 5) * 240 + (Math.floor(i / 5) * 60)
          const startY = Math.floor(i / 5) * 200 + (i % 3) * 50
          const endX = ((i + 1) % 5) * 240 + (Math.floor((i + 1) / 5) * 60)
          const endY = Math.floor((i + 1) / 5) * 200 + ((i + 1) % 3) * 50
          const duration = 15 + (i % 5) * 3
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              initial={{
                x: startX,
                y: startY,
              }}
              animate={{
                x: endX,
                y: endY,
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'linear'
              }}
            />
          )
        })}
        </div>
      )}

      {/* Main Content */}
      <motion.div 
        ref={contentRef}
        className="relative z-10 flex items-center justify-center min-h-screen"
        style={{ y, opacity }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
          {/* Floating badge */}
          <motion.div 
            className="inline-flex items-center justify-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-card px-6 py-3 rounded-full flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-prism-sunset animate-pulse" />
              <span className="text-white font-medium">{t('location')}</span>
              <Sparkles className="h-4 w-4 text-prism-amber animate-float" />
            </div>
          </motion.div>

          {/* Main Title */}
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-prism-sunset via-prism-amber to-prism-gold">
              {t('heroTitle')}
            </span>
            <span className="hero-subtitle block text-4xl md:text-5xl lg:text-6xl mt-4 text-white/90">
              {t('heroSubtitle')}
            </span>
          </h1>

          {/* Description */}
          <p className="hero-description text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('heroDescription')}
          </p>

          {/* Premium Search Bar */}
          <div className="search-container max-w-2xl mx-auto mb-12">
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-prism-sunset via-prism-amber to-prism-gold rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
              <div className="relative glass-card-premium rounded-full p-2">
                <div className="flex items-center">
                  <div className="pl-6 pr-3">
                    <Search className="h-6 w-6 text-white/60" />
                  </div>
                  <Input
                    type="text"
                    placeholder={tCommon('searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none text-white placeholder:text-white/40 text-lg focus:outline-none focus:ring-0"
                  />
                  <Button 
                    size="lg" 
                    className="rounded-full bg-gradient-to-r from-prism-sunset to-prism-amber hover:from-prism-amber hover:to-prism-gold text-white font-semibold px-8 shadow-luxury transition-all duration-300 hover:shadow-luxury-hover"
                  >
                    {tCommon('search')}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Premium Action Buttons */}
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { href: '/temazcales', label: t('exploreTemazcales'), icon: Wind, color: 'from-earth-brown to-sacred-copper' },
              { href: '/retreats', label: t('viewRetreats'), icon: Leaf, color: 'from-nature-green to-water-blue' },
              { href: '/healers', label: t('findHealers'), icon: Sun, color: 'from-spiritual-gold to-sunset-orange' }
            ].map((item, _index) => (
              <motion.div
                key={item.href}
                className="action-button"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={item.href as '/temazcales' | '/retreats' | '/healers'}>
                  <Button 
                    size="lg"
                    className="glass-button group relative overflow-hidden rounded-xl px-8 py-4 text-white font-medium"
                  >
                    <span className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <span className="relative flex items-center space-x-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </span>
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .glass-card-premium {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(40px);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        
        .glass-button {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .glass-button:hover {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(249, 115, 22, 0.3);
        }
        
        .shadow-luxury {
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }
        
        .shadow-luxury-hover {
          box-shadow: 0 20px 60px rgba(249, 115, 22, 0.4);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </motion.section>
  )
}