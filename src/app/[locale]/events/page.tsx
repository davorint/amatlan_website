'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Star, Clock, Users, Calendar, Sparkles, Wind, Sun, Moon, Heart, Zap, Quote, Filter, ArrowRight, Globe, Camera, Music } from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Torus, Box } from '@react-three/drei'
import Tilt from 'react-parallax-tilt'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// Sacred Elements 3D Animation Component
function SacredElements() {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <Float
          key={i}
          speed={1.5 + i * 0.2}
          rotationIntensity={0.6}
          floatIntensity={1.8}
          floatingRange={[-0.4, 0.4]}
        >
          {i % 3 === 0 ? (
            <Sphere args={[0.03 + i * 0.008, 20, 20]} position={[
              (Math.random() - 0.5) * 3,
              (Math.random() - 0.5) * 3 + 1,
              (Math.random() - 0.5) * 2
            ]}>
              <MeshDistortMaterial
                color={i % 2 === 0 ? "#f97316" : "#fbbf24"}
                attach="material"
                distort={0.7}
                speed={3.5}
                opacity={0.6}
                transparent
              />
            </Sphere>
          ) : i % 3 === 1 ? (
            <Torus args={[0.05 + i * 0.01, 0.02, 8, 16]} position={[
              (Math.random() - 0.5) * 3,
              (Math.random() - 0.5) * 3,
              (Math.random() - 0.5) * 2
            ]}>
              <MeshDistortMaterial
                color="#fb7185"
                attach="material"
                distort={0.5}
                speed={2.5}
                opacity={0.5}
                transparent
              />
            </Torus>
          ) : (
            <Box args={[0.08 + i * 0.01, 0.08 + i * 0.01, 0.08 + i * 0.01]} position={[
              (Math.random() - 0.5) * 3,
              (Math.random() - 0.5) * 3,
              (Math.random() - 0.5) * 2
            ]}>
              <MeshDistortMaterial
                color="#a855f7"
                attach="material"
                distort={0.4}
                speed={2}
                opacity={0.4}
                transparent
              />
            </Box>
          )}
        </Float>
      ))}
    </>
  )
}

// Celestial Orb Component
function CelestialOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.PI / 3
      meshRef.current.rotation.z = Math.PI / 6
    }
  }, [])

  return (
    <Float speed={1.2} rotationIntensity={1.2} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1.4, 64, 64]} scale={2}>
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.5}
          speed={1.8}
          opacity={0.12}
          transparent
        />
      </Sphere>
    </Float>
  )
}

// Mystical Particles Component
function MysticalParticles() {
  return (
    <>
      {[...Array(12)].map((_, i) => (
        <Float
          key={i}
          speed={0.8 + i * 0.3}
          rotationIntensity={0.4}
          floatIntensity={1.2}
          floatingRange={[-0.3, 0.3]}
        >
          <Sphere args={[0.02 + i * 0.005, 12, 12]} position={[
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 3
          ]}>
            <MeshDistortMaterial
              color={i % 4 === 0 ? "#f97316" : i % 4 === 1 ? "#fbbf24" : i % 4 === 2 ? "#fb7185" : "#a855f7"}
              attach="material"
              distort={0.6}
              speed={3.2}
              opacity={0.4}
              transparent
            />
          </Sphere>
        </Float>
      ))}
    </>
  )
}

// Enhanced events data
const eventsData = [
  {
    id: 'full-moon-ceremony',
    title: 'Ceremonia de Luna Llena',
    subtitle: 'Ancient Full Moon Rituals',
    description: 'Join us for a powerful full moon ceremony in the sacred valley of Amatlán. Experience ancient Mesoamerican rituals, fire ceremonies, and collective meditation under the luminous full moon.',
    date: '2025-02-24',
    time: '20:00',
    duration: '4 horas',
    location: 'Círculo Sagrado de Luna',
    facilitator: 'Abuela María Tonanzin & Maestro Carlos Itzel',
    price: 850,
    capacity: 25,
    attendees: 18,
    rating: 4.9,
    reviews: 156,
    category: 'Ceremony',
    intensity: 'Moderate',
    featured: true,
    tags: ['Luna Llena', 'Ritual', 'Meditación', 'Fuego Sagrado'],
    benefits: ['Conexión lunar', 'Liberación emocional', 'Manifestación', 'Comunidad sagrada'],
    includes: ['Fire ceremony', 'Group meditation', 'Sacred cacao', 'Moon blessing ritual'],
    images: ['/events/full-moon-1.jpg', '/events/full-moon-2.jpg']
  },
  {
    id: 'plant-medicine-journey',
    title: 'Jornada de Medicina Vegetal',
    subtitle: 'Sacred Plant Healing Experience',
    description: 'A transformative 2-day journey with sacred plant medicines guided by experienced curanderos. Deep healing for body, mind, and spirit in a safe, traditional setting.',
    date: '2025-03-15',
    time: '18:00',
    duration: '2 días',
    location: 'Centro de Medicina Ancestral',
    facilitator: 'Curandero Itzel Quetzalcoatl',
    price: 3200,
    capacity: 8,
    attendees: 6,
    rating: 5.0,
    reviews: 89,
    category: 'Medicine',
    intensity: 'High',
    featured: true,
    tags: ['Medicina Sagrada', 'Curación', 'Transformación', 'Retiro'],
    benefits: ['Sanación profunda', 'Visiones sagradas', 'Integración', 'Guía espiritual'],
    includes: ['Plant medicine ceremony', 'Integration sessions', 'Meals', 'Accommodation'],
    images: ['/events/plant-medicine-1.jpg', '/events/plant-medicine-2.jpg']
  },
  {
    id: 'summer-solstice-festival',
    title: 'Festival de Solsticio de Verano',
    subtitle: 'Midsummer Celebration of Light',
    description: 'Celebrate the longest day of the year with music, dance, workshops, and sacred ceremonies. A 3-day festival honoring the sun and the abundance of summer.',
    date: '2025-06-21',
    time: '10:00',
    duration: '3 días',
    location: 'Valle Sagrado de Amatlán',
    facilitator: 'Multiple Maestros & Artists',
    price: 1200,
    capacity: 150,
    attendees: 89,
    rating: 4.8,
    reviews: 245,
    category: 'Festival',
    intensity: 'Low',
    featured: true,
    tags: ['Solsticio', 'Festival', 'Música', 'Talleres', 'Comunidad'],
    benefits: ['Celebración solar', 'Conexión comunitaria', 'Aprendizaje', 'Alegría'],
    includes: ['Workshops', 'Concerts', 'Ceremonies', 'Food vendors', 'Camping'],
    images: ['/events/solstice-1.jpg', '/events/solstice-2.jpg']
  },
  {
    id: 'mens-circle-retreat',
    title: 'Retiro del Círculo Masculino',
    subtitle: 'Sacred Brotherhood Gathering',
    description: 'A weekend retreat for men to reconnect with their inner warrior, explore sacred masculinity, and build meaningful brotherhood through rituals and sharing circles.',
    date: '2025-04-12',
    time: '16:00',
    duration: '3 días',
    location: 'Templo del Guerrero',
    facilitator: 'Chamán Miguel Águila Dorada',
    price: 1800,
    capacity: 16,
    attendees: 12,
    rating: 4.9,
    reviews: 78,
    category: 'Retreat',
    intensity: 'High',
    featured: false,
    tags: ['Masculino Sagrado', 'Hermandad', 'Guerrero', 'Retiro'],
    benefits: ['Poder interior', 'Hermandad', 'Propósito', 'Sanación masculina'],
    includes: ['Brotherhood circles', 'Warrior rituals', 'Sweat lodge', 'Meals'],
    images: ['/events/mens-retreat-1.jpg', '/events/mens-retreat-2.jpg']
  },
  {
    id: 'womens-wisdom-circle',
    title: 'Círculo de Sabiduría Femenina',
    subtitle: 'Divine Feminine Gathering',
    description: 'A sacred space for women to honor their cycles, connect with the divine feminine, and share in ancient wisdom traditions through ceremony and sisterhood.',
    date: '2025-03-08',
    time: '14:00',
    duration: '2 días',
    location: 'Jardín de la Diosa Madre',
    facilitator: 'Curandera María Tonanzin',
    price: 1200,
    capacity: 20,
    attendees: 17,
    rating: 5.0,
    reviews: 134,
    category: 'Circle',
    intensity: 'Moderate',
    featured: true,
    tags: ['Femenino Sagrado', 'Hermandad', 'Sabiduría', 'Ciclos'],
    benefits: ['Conexión femenina', 'Sanación de útero', 'Empoderamiento', 'Hermandad'],
    includes: ['Women circles', 'Moon rituals', 'Healing sessions', 'Sacred meals'],
    images: ['/events/womens-circle-1.jpg', '/events/womens-circle-2.jpg']
  },
  {
    id: 'crystal-healing-workshop',
    title: 'Taller de Sanación con Cristales',
    subtitle: 'Crystal Energy Healing Workshop',
    description: 'Learn the ancient art of crystal healing in the sacred waters of Amatlán. Discover how to work with crystal energies for healing, protection, and spiritual growth.',
    date: '2025-04-05',
    time: '09:00',
    duration: '1 día',
    location: 'Templo de Cristal',
    facilitator: 'Maestra Elena Cristalina',
    price: 650,
    capacity: 15,
    attendees: 11,
    rating: 4.7,
    reviews: 67,
    category: 'Workshop',
    intensity: 'Low',
    featured: false,
    tags: ['Cristales', 'Sanación', 'Energía', 'Taller'],
    benefits: ['Sanación energética', 'Conocimiento de cristales', 'Equilibrio', 'Protección'],
    includes: ['Crystal healing session', 'Crystal kit', 'Meditation', 'Certification'],
    images: ['/events/crystal-workshop-1.jpg', '/events/crystal-workshop-2.jpg']
  },
  {
    id: 'sound-healing-immersion',
    title: 'Inmersión de Sanación Sonora',
    subtitle: 'Vibrational Healing Experience',
    description: 'Immerse yourself in the healing vibrations of Tibetan bowls, gongs, and native instruments in the acoustically perfect caves of Amatlán. A deeply restorative experience.',
    date: '2025-05-18',
    time: '19:00',
    duration: '3 horas',
    location: 'Cuevas Resonantes',
    facilitator: 'Maestro Sonoro David Armonía',
    price: 450,
    capacity: 30,
    attendees: 22,
    rating: 4.8,
    reviews: 112,
    category: 'Healing',
    intensity: 'Low',
    featured: false,
    tags: ['Sonido', 'Vibración', 'Relajación', 'Meditación'],
    benefits: ['Relajación profunda', 'Sanación vibracional', 'Equilibrio', 'Paz interior'],
    includes: ['Sound bath', 'Guided meditation', 'Herbal tea', 'Sacred geometry'],
    images: ['/events/sound-healing-1.jpg', '/events/sound-healing-2.jpg']
  },
  {
    id: 'cacao-ceremony',
    title: 'Ceremonia de Cacao Sagrado',
    subtitle: 'Heart Opening Cacao Ritual',
    description: 'Open your heart with sacred ceremonial cacao in a traditional ritual setting. Connect with the spirit of cacao while experiencing heart expansion and emotional healing.',
    date: '2025-03-22',
    time: '17:00',
    duration: '2.5 horas',
    location: 'Altar del Corazón',
    facilitator: 'Guardiana del Cacao Isabella Theobroma',
    price: 380,
    capacity: 25,
    attendees: 20,
    rating: 4.9,
    reviews: 98,
    category: 'Ceremony',
    intensity: 'Low',
    featured: false,
    tags: ['Cacao', 'Corazón', 'Ceremonia', 'Sanación'],
    benefits: ['Apertura del corazón', 'Conexión emocional', 'Sanación', 'Alegría'],
    includes: ['Sacred cacao', 'Heart meditation', 'Sharing circle', 'Integration'],
    images: ['/events/cacao-ceremony-1.jpg', '/events/cacao-ceremony-2.jpg']
  }
]

export default function EventsPage() {
  const t = useTranslations('Events')
  const tCommon = useTranslations('Common')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedMonth, setSelectedMonth] = useState<string>('all')
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
    dawn: 'from-purple-900/50 via-pink-800/40 to-orange-700/30',
    day: 'from-sky-900/40 via-blue-800/30 to-purple-700/20',
    dusk: 'from-purple-900/50 via-violet-800/40 to-pink-700/30',
    night: 'from-indigo-950/60 via-purple-900/50 to-violet-900/40'
  }

  const filteredEvents = eventsData.filter(event => {
    const categoryMatch = selectedCategory === 'all' || event.category.toLowerCase() === selectedCategory
    const monthMatch = selectedMonth === 'all' || new Date(event.date).getMonth() === parseInt(selectedMonth)
    return categoryMatch && monthMatch
  })

  const categories = ['all', 'ceremony', 'festival', 'retreat', 'workshop', 'healing', 'circle', 'medicine']
  const months = [
    { value: 'all', label: 'Todos los meses' },
    { value: '0', label: 'Enero' },
    { value: '1', label: 'Febrero' },
    { value: '2', label: 'Marzo' },
    { value: '3', label: 'Abril' },
    { value: '4', label: 'Mayo' },
    { value: '5', label: 'Junio' }
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getAvailableSpots = (capacity: number, attendees: number) => {
    return capacity - attendees
  }

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

        {/* 3D Sacred Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <Suspense fallback={null}>
            <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
              <ambientLight intensity={0.7} />
              <pointLight position={[10, 10, 10]} intensity={1.3} />
              <pointLight position={[-10, -10, -5]} intensity={0.9} color="#a855f7" />
              <pointLight position={[5, -10, 5]} intensity={0.7} color="#f97316" />
              <CelestialOrb />
              <SacredElements />
              <MysticalParticles />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.25} />
            </Canvas>
          </Suspense>
        </div>

        {/* Animated particles overlay */}
        {typeof window !== 'undefined' && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
                initial={{
                  x: Math.random() * 1400,
                  y: Math.random() * 900,
                }}
                animate={{
                  x: Math.random() * 1400,
                  y: Math.random() * 900,
                }}
                transition={{
                  duration: Math.random() * 30 + 20,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'linear'
                }}
              />
            ))}
          </div>
        )}

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
              <Calendar className="h-5 w-5 text-prism-sunset animate-pulse" />
              <span className="text-white font-medium">Sacred Gatherings & Ceremonies</span>
              <Sparkles className="h-4 w-4 text-prism-amber animate-float" />
            </div>
          </motion.div>

          {/* Main Title */}
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-8">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-500 to-pink-500">
              Sacred Events
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl mt-4 text-white/90">
              & Transformative Gatherings
            </span>
          </h1>

          {/* Description */}
          <p className="hero-description text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
            Join our community of spiritual seekers in powerful ceremonies, healing workshops, and transformative retreats. Connect with ancient wisdom and like-minded souls in the sacred valley of Amatlán.
          </p>

          {/* Premium Badge Collection */}
          <div className="hero-badges flex flex-wrap justify-center gap-4 mb-12">
            {[
              { icon: Calendar, text: 'Ceremonias', color: 'from-purple-600 to-violet-600' },
              { icon: Heart, text: 'Sanación', color: 'from-pink-600 to-rose-600' },
              { icon: Users, text: 'Comunidad', color: 'from-blue-600 to-cyan-600' },
              { icon: Sparkles, text: 'Transformación', color: 'from-amber-600 to-orange-600' }
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
              className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-violet-500 hover:to-purple-600 text-white font-semibold px-10 py-4 rounded-full shadow-luxury transition-all duration-300 hover:shadow-luxury-hover"
            >
              Ver Próximos Eventos
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="glass-button border-black/30 text-black hover:bg-black/20 px-10 py-4 rounded-full"
            >
              Crear Alerta de Eventos
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

      {/* Premium Events Section */}
      <section className="py-24 relative">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        </div>
        
        {/* Floating background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-500/20 rounded-full"
              initial={{ x: Math.random() * 1400, y: Math.random() * 800 }}
              animate={{ y: [null, -900] }}
              transition={{
                duration: Math.random() * 30 + 25,
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
              <Globe className="w-4 h-4 text-prism-amber" />
              <span className="text-sm font-medium text-white/90">Upcoming Events</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Join Our Sacred</span>{' '}
              <span className="text-kinetic">Community</span>
            </h2>
            
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Discover transformative experiences, connect with like-minded souls, and embark on journeys of healing and spiritual growth in the mystical valley of Amatlán.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="space-y-6 mb-16">
            {/* Category Filter */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3"
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
                      ? 'crystal-panel text-white shadow-luxury'
                      : 'bg-white/90 text-gray-900 hover:bg-white hover:text-gray-900 border border-white/30'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <span className="capitalize">{category === 'all' ? 'Todos' : category}</span>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Month Filter */}
            <motion.div 
              className="flex flex-wrap justify-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {months.map((month) => (
                <motion.button
                  key={month.value}
                  onClick={() => setSelectedMonth(month.value)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedMonth === month.value
                      ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white'
                      : 'bg-white/90 text-gray-900 hover:bg-white hover:text-gray-900 border border-white/30'
                  }`}
                >
                  {month.label}
                </motion.button>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-between items-center mb-8">
            <motion.div 
              className="text-white/60"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {filteredEvents.length} eventos encontrados
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2 text-white/60"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">Calificación promedio: 4.8/5</span>
            </motion.div>
          </div>

          {/* Premium Event Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
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
                    glareMaxOpacity={0.15}
                    glareColor="#a855f7"
                    glarePosition="all"
                    glareBorderRadius="24px"
                    tiltMaxAngleX={5}
                    tiltMaxAngleY={5}
                    perspective={1200}
                    scale={1.01}
                    transitionSpeed={1500}
                  >
                    <Card className="relative bg-gradient-to-b from-gray-900/95 to-black/95 border border-white/10 rounded-3xl overflow-hidden group cursor-pointer transition-all duration-700 h-full hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/20">
                      <div className="relative">
                        {/* Gradient overlay */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-violet-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        
                        {/* Date badge */}
                        <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-purple-600 to-violet-600 border-0 shadow-luxury">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(event.date).getDate()} 
                          {' '}
                          {new Date(event.date).toLocaleDateString('es-ES', { month: 'short' }).replace('.', '')}
                        </Badge>

                        {/* Featured badge */}
                        {event.featured && (
                          <Badge className="absolute top-4 right-4 z-10 bg-gradient-to-r from-amber-500 to-orange-500 border-0 shadow-luxury">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Destacado
                          </Badge>
                        )}

                        {/* Intensity badge */}
                        <Badge className="absolute bottom-4 right-4 z-10 crystal-panel border-0">
                          {event.intensity}
                        </Badge>
                        
                        {/* Premium visual header */}
                        <div className="h-56 bg-gradient-to-br from-purple-900/60 via-violet-900/50 to-pink-900/40 flex items-center justify-center relative overflow-hidden">
                          {/* Animated gradient orbs */}
                          <motion.div
                            className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl"
                            animate={{ 
                              x: [0, 20, 0],
                              y: [0, -20, 0]
                            }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <motion.div
                            className="absolute -bottom-20 -left-20 w-40 h-40 bg-violet-500/30 rounded-full blur-3xl"
                            animate={{ 
                              x: [0, -20, 0],
                              y: [0, 20, 0]
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                          />
                          
                          {/* Category icon with enhanced animation */}
                          <motion.div
                            className="relative z-10"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                          >
                            <motion.div
                              className="relative"
                              whileHover={{ scale: 1.15, rotate: 10 }}
                              animate={{ 
                                y: [0, -5, 0],
                                rotate: [0, 3, -3, 0]
                              }}
                              transition={{ 
                                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                              }}
                            >
                              {/* Glow backdrop */}
                              <div className="absolute inset-0 blur-2xl opacity-50">
                                {event.category === 'Ceremony' && <div className="w-full h-full bg-purple-400 rounded-full" />}
                                {event.category === 'Festival' && <div className="w-full h-full bg-violet-400 rounded-full" />}
                                {event.category === 'Retreat' && <div className="w-full h-full bg-pink-400 rounded-full" />}
                                {event.category === 'Workshop' && <div className="w-full h-full bg-purple-400 rounded-full" />}
                                {event.category === 'Healing' && <div className="w-full h-full bg-rose-400 rounded-full" />}
                                {event.category === 'Circle' && <div className="w-full h-full bg-violet-400 rounded-full" />}
                                {event.category === 'Medicine' && <div className="w-full h-full bg-emerald-400 rounded-full" />}
                              </div>
                              {/* Main icon */}
                              {event.category === 'Ceremony' && <Moon className="h-20 w-20 text-purple-300 drop-shadow-2xl relative" />}
                              {event.category === 'Festival' && <Music className="h-20 w-20 text-violet-300 drop-shadow-2xl relative" />}
                              {event.category === 'Retreat' && <Sun className="h-20 w-20 text-pink-300 drop-shadow-2xl relative" />}
                              {event.category === 'Workshop' && <Sparkles className="h-20 w-20 text-purple-300 drop-shadow-2xl relative" />}
                              {event.category === 'Healing' && <Heart className="h-20 w-20 text-rose-300 drop-shadow-2xl relative" />}
                              {event.category === 'Circle' && <Users className="h-20 w-20 text-violet-300 drop-shadow-2xl relative" />}
                              {event.category === 'Medicine' && <Wind className="h-20 w-20 text-emerald-300 drop-shadow-2xl relative" />}
                            </motion.div>
                          </motion.div>
                          
                          {/* Floating sparkles */}
                          <motion.div
                            className="absolute top-4 right-4"
                            animate={{ 
                              rotate: 360,
                              scale: [1, 1.2, 1]
                            }}
                            transition={{ 
                              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                            }}
                          >
                            <Sparkles className="h-6 w-6 text-white/20" />
                          </motion.div>
                          <motion.div
                            className="absolute bottom-4 left-4"
                            animate={{ 
                              rotate: -360,
                              scale: [1, 1.1, 1]
                            }}
                            transition={{ 
                              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                            }}
                          >
                            <Sparkles className="h-5 w-5 text-white/15" />
                          </motion.div>
                          
                          {/* Glow effect */}
                          <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{
                              background: 'radial-gradient(circle at 50% 50%, #a855f7aa 0%, transparent 70%)'
                            }}
                          />
                        </div>
                      </div>

                      <CardHeader className="p-6 pb-4">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <motion.h3 
                              className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-500"
                            >
                              {event.title}
                            </motion.h3>
                            <p className="text-sm text-white/60 font-medium">{event.subtitle}</p>
                          </div>
                          <motion.div 
                            className="flex items-center space-x-1 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 ml-3"
                            whileHover={{ scale: 1.05 }}
                          >
                            <Star className="h-3.5 w-3.5 text-yellow-400 fill-current" />
                            <span className="text-sm font-bold text-white">{event.rating}</span>
                            <span className="text-xs text-white/40">({event.reviews})</span>
                          </motion.div>
                        </div>
                        
                        <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-2">
                          {event.description}
                        </p>
                        
                        <div className="flex items-center space-x-2">
                          <div className="p-1.5 bg-purple-500/10 rounded-lg">
                            <Heart className="h-3.5 w-3.5 text-purple-400" />
                          </div>
                          <span className="text-sm text-white/50 font-medium">
                            {event.facilitator}
                          </span>
                        </div>
                      </CardHeader>

                      <CardContent className="p-6 pt-3">
                        {/* Event details grid */}
                        <div className="grid grid-cols-2 gap-3 mb-5">
                          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/5 group/detail hover:bg-white/10 transition-colors min-h-[76px]">
                            <div className="flex items-center space-x-2 mb-1">
                              <Calendar className="h-3.5 w-3.5 text-purple-400 flex-shrink-0" />
                              <span className="text-xs text-white/40 truncate">Fecha</span>
                            </div>
                            <span className="text-sm text-white/80 font-medium block truncate">{new Date(event.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</span>
                          </div>
                          
                          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/5 group/detail hover:bg-white/10 transition-colors min-h-[76px]">
                            <div className="flex items-center space-x-2 mb-1">
                              <Clock className="h-3.5 w-3.5 text-purple-400 flex-shrink-0" />
                              <span className="text-xs text-white/40 truncate">Duración</span>
                            </div>
                            <span className="text-sm text-white/80 font-medium block truncate">{event.duration}</span>
                          </div>
                          
                          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/5 group/detail hover:bg-white/10 transition-colors min-h-[76px]">
                            <div className="flex items-center space-x-2 mb-1">
                              <MapPin className="h-3.5 w-3.5 text-purple-400 flex-shrink-0" />
                              <span className="text-xs text-white/40 truncate">Lugar</span>
                            </div>
                            <div className="text-sm text-white/80 font-medium truncate" title={event.location}>{event.location}</div>
                          </div>
                          
                          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/5 group/detail hover:bg-white/10 transition-colors min-h-[76px]">
                            <div className="flex items-center space-x-2 mb-1">
                              <Users className="h-3.5 w-3.5 text-purple-400 flex-shrink-0" />
                              <span className="text-xs text-white/40 truncate">Cupos</span>
                            </div>
                            <span className="text-sm text-white/80 font-medium block truncate">{getAvailableSpots(event.capacity, event.attendees)} disponibles</span>
                          </div>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {event.tags.slice(0, 3).map((tag, tagIndex) => (
                            <motion.span
                              key={tag}
                              className="px-2.5 py-1 bg-purple-500/10 text-purple-300 text-xs rounded-lg border border-purple-500/20 hover:bg-purple-500/20 transition-colors cursor-default"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 + tagIndex * 0.02 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                        
                        {/* Highlights */}
                        <div className="flex items-center space-x-3 mb-5 py-3 border-t border-white/5">
                          <div className="flex items-center space-x-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                            <span className="text-xs text-white/50">{event.intensity}</span>
                          </div>
                          <div className="w-px h-4 bg-white/10" />
                          <div className="flex items-center space-x-1.5">
                            <Users className="w-3.5 h-3.5 text-purple-400" />
                            <span className="text-xs text-white/50">{event.category}</span>
                          </div>
                          {event.featured && (
                            <>
                              <div className="w-px h-4 bg-white/10" />
                              <div className="flex items-center space-x-1.5">
                                <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                                <span className="text-xs text-white/50">Featured</span>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Availability bar */}
                        <div className="mb-5">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-white/40">Disponibilidad</span>
                            <span className="text-xs font-medium text-white/60">
                              {event.attendees}/{event.capacity} inscritos
                            </span>
                          </div>
                          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full relative"
                              initial={{ width: 0 }}
                              animate={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                              transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                            >
                              <motion.div
                                className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-sm"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            </motion.div>
                          </div>
                        </div>
                        
                        {/* Price and CTA */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <div>
                            <p className="text-xs text-white/40 mb-1">Inversión</p>
                            <div className="flex items-baseline">
                              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                ${event.price.toLocaleString()}
                              </span>
                              <span className="text-sm font-normal text-white/40 ml-1.5">MXN</span>
                            </div>
                          </div>
                          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                            <Button 
                              asChild 
                              className="relative bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white font-medium px-6 py-2.5 rounded-xl shadow-lg shadow-purple-500/25 border-0 transition-all duration-300 group/btn overflow-hidden"
                            >
                              <Link href={`/events/${event.id}` as never}>
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                                />
                                <span className="relative flex items-center space-x-2">
                                  <span>Ver Detalles</span>
                                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                                </span>
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
                className="glass-button border-black/30 text-black hover:bg-black/20 px-12 py-4 rounded-full font-semibold"
              >
                Cargar Más Eventos
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Premium Community Section */}
      <section className="py-24 relative">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent" />
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
                <Users className="w-4 h-4 text-prism-amber" />
                <span className="text-sm font-medium text-white/90">Sacred Community</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                <span className="text-white">Join Our</span>{' '}
                <span className="text-kinetic">Spiritual Family</span>
              </h2>
              
              <div className="space-y-6 text-white/80 text-lg leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Our events bring together souls from around the world in sacred ceremony and healing. Whether you&rsquo;re new to spiritual practices or a seasoned practitioner, you&rsquo;ll find your place in our inclusive community.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Each gathering is carefully crafted to create deep connections, facilitate healing, and support your spiritual journey. From intimate circles to large celebrations, every event honors the sacred traditions of this mystical land.
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
                  className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-violet-500 hover:to-purple-600 text-white font-semibold px-8 rounded-full shadow-luxury border-0"
                >
                  Únete a la Comunidad
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="glass-button border-black/30 text-black hover:bg-black/20 px-8 rounded-full"
                >
                  Ver Testimonios
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Stats Panel */}
            <motion.div 
              className="crystal-panel p-8 lg:p-12 relative overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                <Users className="w-full h-full text-white" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-8">
                  <Sparkles className="w-8 h-8 text-prism-amber" />
                  <h3 className="text-2xl font-bold text-white">
                    Community <span className="text-kinetic">Impact</span>
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: '2,500+', label: 'Souls Connected', icon: Heart },
                    { number: '150+', label: 'Events Hosted', icon: Calendar },
                    { number: '4.8/5', label: 'Average Rating', icon: Star },
                    { number: '40+', label: 'Countries United', icon: Globe }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="text-center group"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.1,
                        ease: [0.19, 1, 0.22, 1]
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <stat.icon className="w-8 h-8 mx-auto mb-3 text-prism-amber group-hover:animate-breathe transition-all duration-300" />
                      <div className="text-2xl font-bold text-kinetic mb-2">
                        {stat.number}
                      </div>
                      <div className="text-sm text-white/70">
                        {stat.label}
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
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .glass-button {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .glass-button:hover {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .shadow-luxury {
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }
        
        .shadow-luxury-hover {
          box-shadow: 0 20px 60px rgba(168, 85, 247, 0.4);
        }
        
        .text-kinetic {
          background: linear-gradient(45deg, #a855f7, #d946ef, #a855f7);
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
        
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        
        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
        
        /* Card hover effects */
        .group:hover .group-hover\:glow {
          box-shadow: 0 0 30px rgba(168, 85, 247, 0.3);
        }
        
        /* Smooth transitions */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  )
}