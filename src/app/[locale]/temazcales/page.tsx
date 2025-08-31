'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Star, Clock, Users, Flame, Sparkles, Wind, Sun, Moon, Heart, Quote, Filter } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei'
import Tilt from 'react-parallax-tilt'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// Sacred Fire Animation Component
function SacredFire() {
  return (
    <>
      {[...Array(12)].map((_, i) => (
        <Float
          key={i}
          speed={2 + i * 0.3}
          rotationIntensity={0.5}
          floatIntensity={2}
          floatingRange={[-0.3, 0.3]}
        >
          <Sphere args={[0.02 + i * 0.008, 16, 16]} position={[
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2 + 1,
            (Math.random() - 0.5) * 1
          ]}>
            <MeshDistortMaterial
              color={i % 3 === 0 ? "#f97316" : i % 3 === 1 ? "#fbbf24" : "#fb7185"}
              attach="material"
              distort={0.8}
              speed={4}
              opacity={0.7}
              transparent
            />
          </Sphere>
        </Float>
      ))}
    </>
  )
}

// Mystical Orb Component
function MysticalOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.PI / 4
      meshRef.current.rotation.y = Math.PI / 4
    }
  }, [])

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[1.2, 64, 64]} scale={1.8}>
        <MeshDistortMaterial
          color="#fbbf24"
          attach="material"
          distort={0.6}
          speed={2}
          opacity={0.15}
          transparent
        />
      </Sphere>
    </Float>
  )
}

// Floating Particles Component
function FloatingParticles() {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <Float
          key={i}
          speed={1 + i * 0.4}
          rotationIntensity={0.3}
          floatIntensity={1}
          floatingRange={[-0.2, 0.2]}
        >
          <Sphere args={[0.04 + i * 0.01, 12, 12]} position={[
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 2
          ]}>
            <MeshDistortMaterial
              color="#f97316"
              attach="material"
              distort={0.4}
              speed={3}
              opacity={0.5}
              transparent
            />
          </Sphere>
        </Float>
      ))}
    </>
  )
}

// Enhanced temazcal experiences data
const temazcalExperiences = [
  {
    id: 'nahual-temazcal',
    title: 'Temazcal Nahual Ancestral',
    description: 'Ceremonia tradicional de purificación con copal sagrado, plantas medicinales y cantos ancestrales. Una experiencia profunda guiada por un temazcalero experimentado en tradiciones náhuatl.',
    facilitator: 'Maestro Carlos Tepeyac Itzel',
    location: 'Centro Ceremonial Amatlán',
    price: 1200,
    duration: '3.5 horas',
    capacity: 12,
    rating: 4.9,
    reviews: 127,
    images: ['/temazcal-1.jpg'],
    tags: ['Tradicional', 'Purificación', 'Copal', 'Plantas Sagradas'],
    benefits: ['Desintoxicación profunda', 'Liberación emocional', 'Conexión ancestral'],
    featured: true,
    category: 'Tradicional',
    intensity: 'Alta',
    language: ['Español', 'Náhuatl', 'English'],
    includes: ['Ceremony', 'Medicinal Plants', 'Sacred Songs', 'Post-ceremony Integration']
  },
  {
    id: 'luna-nueva-temazcal',
    title: 'Temazcal de Luna Nueva Sagrada',
    description: 'Ceremonia especial durante la luna nueva para liberación emocional y manifestación de nuevos comienzos. Incluye meditación guiada, cacao ceremonial y rituales de renovación.',
    facilitator: 'Maestra Isabel Xochitl Cuauhtli',
    location: 'Casa de los Cuatro Elementos',
    price: 1800,
    duration: '5 horas',
    capacity: 8,
    rating: 5.0,
    reviews: 89,
    images: ['/temazcal-2.jpg'],
    tags: ['Luna Nueva', 'Cacao Sagrado', 'Meditación', 'Manifestación'],
    benefits: ['Liberación lunar', 'Renovación energética', 'Claridad mental'],
    featured: true,
    category: 'Lunar',
    intensity: 'Moderada',
    language: ['Español', 'English'],
    includes: ['New Moon Ceremony', 'Sacred Cacao', 'Meditation', 'Intention Setting', 'Energy Healing']
  },
  {
    id: 'pareja-temazcal',
    title: 'Temazcal Sagrado para Parejas',
    description: 'Experiencia íntima diseñada para fortalecer vínculos de pareja a través del calor sagrado, rituales de conexión y ceremonia de unión espiritual.',
    facilitator: 'Abuela Rosa Cuauhtémoc Itzel',
    location: 'Jardín Sagrado del Amor',
    price: 2200,
    duration: '4 horas',
    capacity: 6,
    rating: 4.8,
    reviews: 67,
    images: ['/temazcal-3.jpg'],
    tags: ['Parejas', 'Intimidad Sagrada', 'Conexión', 'Privado'],
    benefits: ['Fortalecimiento de vínculos', 'Sanación de relaciones', 'Intimidad consciente'],
    featured: false,
    category: 'Parejas',
    intensity: 'Moderada',
    language: ['Español', 'English'],
    includes: ['Couple Ceremony', 'Connection Rituals', 'Sacred Union Blessing', 'Relationship Healing']
  },
  {
    id: 'guerreros-temazcal',
    title: 'Temazcal de Guerreros Espirituales',
    description: 'Ceremonia intensa para hombres que buscan reconectar con su poder interno, fuerza ancestral y propósito de vida a través del fuego sagrado.',
    facilitator: 'Chamán Miguel Águila Dorada',
    location: 'Templo del Guerrero',
    price: 1500,
    duration: '4 horas',
    capacity: 10,
    rating: 4.9,
    reviews: 56,
    images: ['/temazcal-4.jpg'],
    tags: ['Masculino Sagrado', 'Poder Interior', 'Guerrero', 'Propósito'],
    benefits: ['Reconexión con fuerza interna', 'Claridad de propósito', 'Hermandad masculina'],
    featured: true,
    category: 'Masculino Sagrado',
    intensity: 'Muy Alta',
    language: ['Español', 'English'],
    includes: ['Warrior Circle', 'Strength Rituals', 'Brotherhood Ceremony', 'Power Animal Connection']
  },
  {
    id: 'mujeres-temazcal',
    title: 'Temazcal del Círculo Femenino',
    description: 'Ceremonia sagrada para mujeres que honra la sabiduría femenina, ciclos naturales y conexión con la Madre Tierra a través de rituales ancestrales.',
    facilitator: 'Curandera María Tonanzin',
    location: 'Círculo de la Diosa Madre',
    price: 1400,
    duration: '4.5 horas',
    capacity: 14,
    rating: 5.0,
    reviews: 98,
    images: ['/temazcal-5.jpg'],
    tags: ['Femenino Sagrado', 'Ciclos Lunares', 'Diosa Madre', 'Hermandad'],
    benefits: ['Honrar sabiduría femenina', 'Sanación de útero', 'Conexión con ciclos'],
    featured: true,
    category: 'Femenino Sagrado',
    intensity: 'Moderada',
    language: ['Español', 'English'],
    includes: ['Women Circle', 'Moon Cycle Honoring', 'Womb Healing', 'Goddess Connection']
  },
  {
    id: 'medicina-temazcal',
    title: 'Temazcal de Medicina Sagrada',
    description: 'Ceremonia avanzada que combina el temazcal con plantas medicinales sagradas para sanación profunda del cuerpo, mente y espíritu.',
    facilitator: 'Curandero Itzel Quetzalcoatl',
    location: 'Centro de Medicina Ancestral',
    price: 2500,
    duration: '6 horas',
    capacity: 6,
    rating: 4.8,
    reviews: 34,
    images: ['/temazcal-6.jpg'],
    tags: ['Medicina Sagrada', 'Plantas Maestras', 'Sanación', 'Transformación'],
    benefits: ['Sanación integral', 'Visiones sagradas', 'Transformación profunda'],
    featured: false,
    category: 'Medicina Sagrada',
    intensity: 'Muy Alta',
    language: ['Español', 'Náhuatl'],
    includes: ['Sacred Medicine', 'Plant Healing', 'Visionary Experience', 'Integration Support']
  }
]

export default function TemazcalesPage() {
  // const t = useTranslations('Temazcales')
  // const tCommon = useTranslations('Common')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [timeOfDay, setTimeOfDay] = useState<'dawn' | 'day' | 'dusk' | 'night'>('day')
  const [isHeroLoaded, setIsHeroLoaded] = useState(false)
  
  const heroRef = useRef<HTMLDivElement>(null)
  const { ref: contentRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 1.05])

  // Determine time of day for dynamic lighting
  useEffect(() => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 8) setTimeOfDay('dawn')
    else if (hour >= 8 && hour < 17) setTimeOfDay('day')
    else if (hour >= 17 && hour < 20) setTimeOfDay('dusk')
    else setTimeOfDay('night')
    setIsHeroLoaded(true)
  }, [])

  // GSAP animations
  useGSAP(() => {
    if (inView && isHeroLoaded) {
      gsap.timeline()
        .from('.hero-badge', {
          y: -20,
          opacity: 0,
          duration: 0.8,
          ease: 'power4.out'
        })
        .from('.hero-title', {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: 'power4.out'
        }, '-=0.6')
        .from('.hero-description', {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, '-=0.8')
        .from('.hero-badges', {
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(1.7)'
        }, '-=0.4')
    }
  }, { dependencies: [inView, isHeroLoaded] })

  const timeGradients = {
    dawn: 'from-orange-900/50 via-rose-800/40 to-amber-700/30',
    day: 'from-sky-900/40 via-blue-800/30 to-cyan-700/20',
    dusk: 'from-purple-900/50 via-pink-800/40 to-orange-700/30',
    night: 'from-indigo-950/60 via-purple-900/50 to-blue-900/40'
  }

  const filteredExperiences = selectedCategory === 'all' 
    ? temazcalExperiences 
    : temazcalExperiences.filter(exp => exp.category.toLowerCase() === selectedCategory)

  const categories = ['all', 'tradicional', 'lunar', 'parejas', 'masculino sagrado', 'femenino sagrado', 'medicina sagrada']

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Premium Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ scale }}
      >
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${timeGradients[timeOfDay]}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
        </div>

        {/* 3D Sacred Fire Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <Suspense fallback={null}>
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={1.2} />
              <pointLight position={[-10, -10, -5]} intensity={0.8} color="#f97316" />
              <MysticalOrb />
              <SacredFire />
              <FloatingParticles />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
            </Canvas>
          </Suspense>
        </div>

        {/* Animated particles overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-400/40 rounded-full"
              initial={{
                x: Math.random() * 1400,
                y: Math.random() * 900,
              }}
              animate={{
                x: Math.random() * 1400,
                y: Math.random() * 900,
              }}
              transition={{
                duration: Math.random() * 25 + 15,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'linear'
              }}
            />
          ))}
        </div>

        {/* Main Hero Content */}
        <motion.div 
          ref={contentRef}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
          style={{ y, opacity }}
        >
          {/* Floating badge */}
          <motion.div 
            className="hero-badge inline-flex items-center justify-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="crystal-panel px-6 py-3 rounded-full flex items-center space-x-3">
              <Flame className="h-5 w-5 text-prism-sunset animate-pulse" />
              <span className="text-white font-medium">Sacred Fire Ceremonies</span>
              <Wind className="h-4 w-4 text-prism-amber animate-float" />
            </div>
          </motion.div>

          {/* Main Title */}
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-8">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-prism-sunset via-prism-amber to-spiritual-gold">
              Temazcal
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl mt-4 text-white/90">
              Sacred Purification
            </span>
          </h1>

          {/* Description */}
          <p className="hero-description text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
            Experience profound transformation through ancient Mesoamerican sweat lodge ceremonies. Enter the womb of Mother Earth and emerge reborn through sacred fire, healing herbs, and ancestral wisdom.
          </p>

          {/* Premium Badge Collection */}
          <div className="hero-badges flex flex-wrap justify-center gap-4 mb-12">
            {[
              { icon: Flame, text: 'Purificación', color: 'from-orange-600 to-red-600' },
              { icon: Heart, text: 'Sanación', color: 'from-pink-600 to-rose-600' },
              { icon: Sparkles, text: 'Renovación', color: 'from-amber-600 to-yellow-600' },
              { icon: Wind, text: 'Liberación', color: 'from-cyan-600 to-blue-600' }
            ].map((badge, index) => (
              <motion.div
                key={badge.text}
                className="glass-button group relative overflow-hidden rounded-full px-6 py-3"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <span className={`absolute inset-0 bg-gradient-to-r ${badge.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <span className="relative flex items-center space-x-2 text-white font-medium">
                  <badge.icon className="h-4 w-4" />
                  <span>{badge.text}</span>
                </span>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-prism-sunset to-prism-amber hover:from-prism-amber hover:to-spiritual-gold text-white font-semibold px-10 py-4 rounded-full shadow-luxury transition-all duration-300 hover:shadow-luxury-hover"
            >
              Reservar Experiencia
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="glass-button border-white/30 text-white hover:bg-white/20 px-10 py-4 rounded-full"
            >
              Ver Video Explicativo
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Premium Experiences Section */}
      <section className="py-24 relative">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent" />
        </div>
        
        {/* Floating background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-orange-500/20 rounded-full"
              initial={{ x: Math.random() * 1400, y: Math.random() * 800 }}
              animate={{ y: [null, -900] }}
              transition={{
                duration: Math.random() * 25 + 20,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 crystal-panel rounded-full">
              <Sparkles className="w-4 h-4 text-prism-amber" />
              <span className="text-sm font-medium text-black">Sacred Experiences</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Choose Your</span>{' '}
              <span className="text-kinetic">Sacred Journey</span>
            </h2>
            
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Each temazcal ceremony is a unique portal to healing, guided by experienced curanderos and ancient traditions passed down through generations.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'crystal-panel text-gray-800 shadow-luxury'
                    : 'glass-button text-gray-700 hover:text-gray-800 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span className="capitalize">{category}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>

          <div className="flex justify-between items-center mb-8">
            <motion.div 
              className="text-white/60"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {filteredExperiences.length} experiencias encontradas
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2 text-white/60"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">Promedio: 4.9/5</span>
            </motion.div>
          </div>

          {/* Premium Experience Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredExperiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <Tilt
                    glareEnable={true}
                    glareMaxOpacity={0.2}
                    glareColor="#f97316"
                    glarePosition="all"
                    glareBorderRadius="20px"
                    tiltMaxAngleX={8}
                    tiltMaxAngleY={8}
                    perspective={1000}
                    scale={1.02}
                    transitionSpeed={2000}
                  >
                    <Card className="crystal-panel overflow-hidden hover:shadow-luxury group cursor-pointer transition-all duration-500 h-full">
                      <div className="relative">
                        {/* Gradient overlay */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-red-600/20 to-amber-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        
                        {/* Featured badge */}
                        {experience.featured && (
                          <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-spiritual-gold to-prism-amber border-0 shadow-luxury">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        
                        {/* Category badge */}
                        <Badge className="absolute top-4 right-4 z-10 intensity-badge border-0">
                          {experience.intensity}
                        </Badge>
                        
                        {/* Premium visual placeholder */}
                        <div className="h-56 bg-gradient-to-br from-orange-900/40 via-red-900/40 to-amber-900/40 flex items-center justify-center relative overflow-hidden">
                          {/* Animated background pattern */}
                          <motion.div
                            className="absolute inset-0 opacity-20"
                            style={{
                              background: 'radial-gradient(circle at 30% 70%, rgba(249,115,22,0.4) 0%, transparent 50%)'
                            }}
                          />
                          
                          {/* Floating sacred symbols */}
                          <motion.div
                            className="absolute top-4 right-8 opacity-10"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                          >
                            <Sun className="h-20 w-20 text-white" />
                          </motion.div>
                          
                          <motion.div
                            className="absolute bottom-4 left-8 opacity-10"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                          >
                            <Moon className="h-16 w-16 text-white" />
                          </motion.div>
                          
                          {/* Main icon */}
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Flame className="h-20 w-20 text-orange-400/80 drop-shadow-2xl" />
                          </motion.div>
                          
                          {/* Glow effect */}
                          <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{
                              background: 'radial-gradient(circle at 50% 50%, #f97316aa 0%, transparent 70%)'
                            }}
                          />
                        </div>
                      </div>

                      <CardHeader className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <motion.h3 
                            className="text-xl font-bold text-black group-hover:text-kinetic transition-all duration-300"
                            whileHover={{ x: 2 }}
                          >
                            {experience.title}
                          </motion.h3>
                          <div className="flex items-center space-x-1 rating-badge px-3 py-1 rounded-full">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-bold text-gray-800">{experience.rating}</span>
                            <span className="text-xs text-gray-600">({experience.reviews})</span>
                          </div>
                        </div>
                        
                        <motion.p 
                          className="text-black text-sm leading-relaxed mb-4 line-clamp-3"
                          whileHover={{ opacity: 1 }}
                        >
                          {experience.description}
                        </motion.p>
                        
                        <div className="flex items-center space-x-2 mb-4">
                          <Heart className="h-4 w-4 text-prism-rose" />
                          <span className="text-sm text-black font-medium">
                            {experience.facilitator}
                          </span>
                        </div>
                      </CardHeader>

                      <CardContent className="p-6 pt-0">
                        {/* Experience details */}
                        <div className="space-y-3 mb-6">
                          <motion.div 
                            className="flex items-center space-x-2 text-sm text-black"
                            whileHover={{ x: 2 }}
                          >
                            <MapPin className="h-4 w-4 text-prism-amber" />
                            <span>{experience.location}</span>
                          </motion.div>
                          
                          <div className="grid grid-cols-2 gap-3 text-sm text-black">
                            <motion.div className="flex items-center space-x-2" whileHover={{ x: 2 }}>
                              <Clock className="h-4 w-4 text-prism-amber" />
                              <span>{experience.duration}</span>
                            </motion.div>
                            <motion.div className="flex items-center space-x-2" whileHover={{ x: 2 }}>
                              <Users className="h-4 w-4 text-prism-amber" />
                              <span>Máx. {experience.capacity}</span>
                            </motion.div>
                          </div>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {experience.tags.slice(0, 3).map((tag, tagIndex) => (
                            <motion.div
                              key={tag}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: tagIndex * 0.05 }}
                            >
                              <Badge 
                                variant="outline" 
                                className="text-xs border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100 transition-all duration-200"
                              >
                                {tag}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                        
                        {/* Benefits preview */}
                        <div className="mb-6">
                          <h5 className="text-sm font-semibold text-black mb-2">Beneficios principales:</h5>
                          <ul className="space-y-1 text-xs text-black">
                            {experience.benefits.slice(0, 2).map((benefit, benefitIndex) => (
                              <motion.li 
                                key={benefitIndex}
                                className="flex items-start space-x-2"
                                whileHover={{ x: 2 }}
                              >
                                <Sparkles className="w-3 h-3 text-prism-amber mt-0.5 flex-shrink-0" />
                                <span>{benefit}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Price and action */}
                        <div className="flex justify-between items-center">
                          <div className="text-2xl font-bold text-kinetic">
                            ${experience.price.toLocaleString()}
                            <span className="text-sm font-normal text-black ml-1">MXN</span>
                          </div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button 
                              asChild 
                              className="bg-gradient-to-r from-prism-sunset to-prism-amber hover:from-prism-amber hover:to-spiritual-gold text-white font-semibold rounded-full shadow-luxury border-0"
                            >
                              <Link href={`/temazcales/${experience.id}` as never}>
                                Ver Detalles
                              </Link>
                            </Button>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </Tilt>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Load More */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="lg"
                className="glass-button border-gray-300 text-black hover:bg-white/20 px-12 py-4 rounded-full font-semibold"
              >
                Cargar Más Experiencias
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Premium About Section */}
      <section className="py-24 relative">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-900/30 via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 crystal-panel rounded-full">
                <Quote className="w-4 h-4 text-prism-amber" />
                <span className="text-sm font-medium text-black">Ancient Wisdom</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                <span className="text-white">The Sacred</span>{' '}
                <span className="text-kinetic">Temazcal Tradition</span>
              </h2>
              
              <div className="space-y-6 text-white/80 text-lg leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  The Temazcal is an ancient Mesoamerican sweat lodge ceremony that has been practiced for over 3,000 years. Representing the womb of Mother Earth, this sacred ritual offers profound purification of body, mind, and spirit.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Led by experienced temazcaleros who carry this ancestral knowledge, each ceremony is a journey of rebirth. Through sacred herbs, traditional songs, and the intense heat of volcanic stones, participants experience deep healing and spiritual awakening.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  In the darkness of the lodge, illuminated only by the glow of sacred stones, you will confront your fears, release what no longer serves you, and emerge transformed—literally reborn from the Earth&rsquo;s womb.
                </motion.p>
              </div>
              
              {/* Action buttons */}
              <motion.div 
                className="flex flex-wrap gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-prism-sunset to-prism-amber hover:from-prism-amber hover:to-spiritual-gold text-white font-semibold px-8 rounded-full shadow-luxury border-0"
                >
                  Aprender Más Sobre el Proceso
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="glass-button border-white/30 text-white hover:bg-white/20 px-8 rounded-full"
                >
                  Ver Testimonios
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Benefits Panel */}
            <motion.div 
              className="crystal-panel p-8 lg:p-12 relative overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                <Flame className="w-full h-full text-white" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-8">
                  <Sparkles className="w-8 h-8 text-prism-amber" />
                  <h3 className="text-2xl font-bold text-white">
                    Sacred <span className="text-kinetic">Benefits</span>
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    { icon: Heart, title: 'Physical Purification', description: 'Deep detoxification through intense heat and sacred herbs' },
                    { icon: Wind, title: 'Emotional Release', description: 'Liberation from stored trauma and negative emotions' },
                    { icon: Sun, title: 'Spiritual Awakening', description: 'Connection with ancestral wisdom and inner guidance' },
                    { icon: Sparkles, title: 'Mental Clarity', description: 'Enhanced focus and clarity of purpose' },
                    { icon: Moon, title: 'Energetic Renewal', description: 'Restoration of vital life force energy' }
                  ].map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      className="flex items-start space-x-4 group"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex-shrink-0">
                        <benefit.icon className="w-6 h-6 text-prism-amber group-hover:animate-breathe transition-all duration-300" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white group-hover:text-kinetic transition-all duration-300">
                          {benefit.title}
                        </h4>
                        <p className="text-sm text-white/70 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .crystal-panel {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.95) 0%, 
            rgba(248, 250, 252, 0.95) 50%, 
            rgba(241, 245, 249, 0.95) 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .glass-button {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .glass-button:hover {
          background: rgba(255, 255, 255, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.6);
        }
        
        .rating-badge {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.9) 0%, 
            rgba(249, 250, 251, 0.9) 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(209, 213, 219, 0.3);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .intensity-badge {
          background: linear-gradient(135deg, 
            rgba(249, 115, 22, 0.9) 0%, 
            rgba(251, 191, 36, 0.9) 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(249, 115, 22, 0.3);
          color: white;
          font-weight: 600;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
        
        .shadow-luxury {
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }
        
        .shadow-luxury-hover {
          box-shadow: 0 20px 60px rgba(249, 115, 22, 0.4);
        }
        
        .text-kinetic {
          background: linear-gradient(45deg, #f97316, #fbbf24, #f97316);
          background-size: 200% 200%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: kinetic-flow 3s ease-in-out infinite;
        }
        
        @keyframes kinetic-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .animate-breathe {
          animation: breathe 2s ease-in-out infinite;
        }
        
        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
      `}</style>
    </div>
  )
}