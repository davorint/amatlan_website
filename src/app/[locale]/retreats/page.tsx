'use client'

import { Link } from '@/i18n/routing'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Star, Users, Calendar, Leaf, Heart, Mountain, Sparkles, Play, ArrowRight } from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react'
import { useRef, useState } from 'react'

// Mock data - will be replaced with database queries
const retreatExperiences = [
  {
    id: 'ayahuasca-retreat',
    title: 'Sacred Plant Medicine Retreat',
    description: 'Transformative 7-day journey with ceremonial plants, meditation, and ancestral healing. Led by experienced shamans in a sacred mountain sanctuary.',
    facilitator: 'Maestro Itzel Quetzal',
    location: 'Sacred Mountain Sanctuary',
    price: 15000,
    duration: '7 days / 6 nights',
    capacity: 16,
    rating: 4.9,
    reviews: 34,
    images: ['/retreat-1.jpg'],
    tags: ['Plant Medicine', 'Shamanic', 'Transformation', 'Healing'],
    featured: true,
    category: 'Sacred Medicine'
  },
  {
    id: 'mindfulness-retreat',
    title: 'Mindfulness & Nature Retreat',
    description: 'Connect with your inner wisdom through meditation, yoga, and forest therapy. Perfect for beginners seeking peace and clarity.',
    facilitator: 'Maestra Luna Sagrada',
    location: 'Forest Temple',
    price: 8500,
    duration: '4 days / 3 nights',
    capacity: 20,
    rating: 4.8,
    reviews: 67,
    images: ['/retreat-2.jpg'],
    tags: ['Mindfulness', 'Yoga', 'Nature', 'Meditation'],
    featured: true,
    category: 'Mindfulness'
  },
  {
    id: 'women-circle-retreat',
    title: 'Sacred Feminine Circle',
    description: 'Embrace your divine feminine through moon ceremonies, sisterhood circles, and ancient wisdom practices. Women-only sacred space.',
    facilitator: 'Abuela Carmen Tonanzin',
    location: 'Goddess Garden',
    price: 6800,
    duration: '3 days / 2 nights',
    capacity: 12,
    rating: 5.0,
    reviews: 28,
    images: ['/retreat-3.jpg'],
    tags: ['Sacred Feminine', 'Moon Ceremony', 'Sisterhood', 'Goddess'],
    featured: false,
    category: 'Sacred Feminine'
  },
  {
    id: 'couples-awakening',
    title: 'Couples Awakening Retreat',
    description: 'Deepen your connection through tantric practices, communication rituals, and shared spiritual experiences designed for conscious couples.',
    facilitator: 'Maestros Elena & Miguel Corazón',
    location: 'Love Sanctuary',
    price: 12000,
    duration: '5 days / 4 nights',
    capacity: 8,
    rating: 4.9,
    reviews: 19,
    images: ['/retreat-4.jpg'],
    tags: ['Couples', 'Tantra', 'Connection', 'Sacred Union'],
    featured: false,
    category: 'Sacred Union'
  },
  {
    id: 'vision-quest',
    title: 'Vision Quest Journey',
    description: 'Ancient rite of passage combining solo wilderness time, ceremonial guidance, and community integration. Life-changing experience.',
    facilitator: 'Shamán Roberto Aguila Dorada',
    location: 'Sacred Mountain',
    price: 18000,
    duration: '10 days / 9 nights',
    capacity: 8,
    rating: 5.0,
    reviews: 15,
    images: ['/retreat-5.jpg'],
    tags: ['Vision Quest', 'Wilderness', 'Rite of Passage', 'Shamanic'],
    featured: true,
    category: 'Shamanic'
  },
  {
    id: 'detox-renewal',
    title: 'Holistic Detox & Renewal',
    description: 'Comprehensive cleansing experience with juice fasting, colon hydrotherapy, massage, and energy healing for complete renewal.',
    facilitator: 'Dr. Sofia Naturaleza',
    location: 'Healing Springs Center',
    price: 9500,
    duration: '5 days / 4 nights',
    capacity: 14,
    rating: 4.7,
    reviews: 42,
    images: ['/retreat-6.jpg'],
    tags: ['Detox', 'Cleansing', 'Renewal', 'Healing'],
    featured: false,
    category: 'Wellness'
  }
]

export default function RetreatsPage() {
  // const t = useTranslations('Retreats')
  // const tCommon = useTranslations('Common')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const heroRef = useRef<HTMLDivElement>(null)
  // const { ref: contentRef, inView } = useInView({
  //   threshold: 0.1,
  //   triggerOnce: true
  // })
  
  const { scrollY } = useScroll()
  // const y = useTransform(scrollY, [0, 500], [0, 150])
  // const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.95])
  const blur = useTransform(scrollY, [0, 300], [0, 8])

  return (
    <div className="min-h-screen">
      {/* Premium Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ scale, filter: `blur(${blur}px)` }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Enhanced Hero Background with Luxury Parallax */}
        <div className="absolute inset-0 -z-10">
          {/* Layered background with depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-void-950)] via-[var(--color-void-900)]/95 to-[var(--color-void-800)]/90" />
          <div className="absolute inset-0 bg-gradient-radial from-[var(--color-nature-green)]/10 via-transparent to-transparent" />
          
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
            className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-gradient-to-br from-[var(--color-nature-green)]/25 to-[var(--color-water-blue)]/15 blur-3xl"
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
            className="absolute top-3/4 right-1/3 w-32 h-32 rounded-full bg-gradient-to-tr from-[var(--color-spiritual-gold)]/35 to-[var(--color-nature-green)]/20 blur-2xl"
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
            className="absolute bottom-1/4 left-1/3 w-48 h-48 rounded-full bg-gradient-to-bl from-[var(--color-water-blue)]/20 to-[var(--color-mystical-purple)]/10 blur-3xl"
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
            <Leaf className="w-5 h-5 text-[var(--color-nature-green)] animate-breathe-glow" />
            <span className="text-base font-semibold text-white/95 tracking-wide">Sacred Retreat Experiences</span>
            <Mountain className="w-5 h-5 text-[var(--color-spiritual-gold)] animate-breathe-glow" />
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
              Sacred
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="block text-kinetic animate-float"
            >
              Transformation
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 1, ease: [0.19, 1, 0.22, 1] }}
            className="text-xl md:text-2xl lg:text-3xl text-white/85 mb-16 max-w-4xl mx-auto leading-relaxed font-light tracking-wide text-shadow-soft"
          >
            Immerse yourself in profound{' '}
            <span className="text-kinetic-subtle font-semibold">
              spiritual awakening
            </span>{' '}
            through multi-day retreats combining ancient ceremonies, healing practices, and transformative experiences in the mystical heart of Mexico.
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
                Begin Sacred Journey
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
                Watch Stories
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced floating sacred elements */}
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
                className={`absolute rounded-full blur-sm ${i % 3 === 0 ? 'bg-[var(--color-nature-green)]' : i % 3 === 1 ? 'bg-[var(--color-water-blue)]' : 'bg-[var(--color-spiritual-gold)]'}`}
                style={{
                  width: `${2 + (i % 3)}px`,
                  height: `${2 + (i % 3)}px`,
                  left: `${15 + i * 7}%`,
                  top: `${25 + (i * 6) % 50}%`,
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Luxury ambient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-void-950)]/20 via-transparent to-transparent pointer-events-none" />
      </motion.section>

      {/* Enhanced Experiences Section */}
      <section className="py-32 relative">
        {/* Enhanced Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-void-950)] via-[var(--color-void-900)]/95 to-[var(--color-void-800)]/90" />
          <div className="absolute inset-0 bg-gradient-radial from-[var(--color-nature-green)]/5 via-transparent to-transparent" />
          
          {/* Floating background particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[var(--color-spiritual-gold)]/20 rounded-full"
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
        </div>
        
        <div className="container mx-auto px-4">
          {/* Enhanced Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 crystal-panel rounded-full">
              <Sparkles className="w-4 h-4 text-[var(--color-prism-sunset)]" />
              <span className="text-sm font-medium text-white/90">Sacred Experiences</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-shadow-luxury">
              <span className="text-white">Transform Through</span>
              <br />
              <span className="text-kinetic">Sacred Retreats</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed font-light">
              Each retreat is a carefully crafted journey combining ancient wisdom, modern healing techniques, and transformative experiences in Mexico&rsquo;s most sacred spaces.
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
            {['all', 'Sacred Medicine', 'Mindfulness', 'Sacred Feminine', 'Sacred Union', 'Shamanic', 'Wellness'].map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'crystal-panel-luxury text-white shadow-luxury'
                    : 'bg-white/90 text-gray-900 hover:bg-white hover:text-gray-900 border border-white/30'
                }`}
              >
                <span className="capitalize">{category}</span>
              </motion.button>
            ))}
          </motion.div>
          
          {/* Enhanced Cards Grid with Filtering */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {retreatExperiences
                .filter(retreat => selectedCategory === 'all' || retreat.category === selectedCategory)
                .map((retreat, index) => (
                <motion.div
                  key={retreat.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15,
                    ease: [0.19, 1, 0.22, 1]
                  }}
                  whileHover={{ y: -15, scale: 1.03 }}
                  className="group"
                >
                  <Card className="crystal-panel-luxury overflow-hidden hover:shadow-luxury group cursor-pointer transition-all duration-500 h-full hover-glow">
                    <div className="relative">
                      {/* Enhanced gradient overlay with animation */}
                      <motion.div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-all duration-500 bg-gradient-to-br from-[var(--color-nature-green)]/30 via-[var(--color-water-blue)]/20 to-[var(--color-spiritual-gold)]/30"
                        whileHover={{ scale: 1.05 }}
                      />
                      
                      {/* Featured badge */}
                      {retreat.featured && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 300 }}
                        >
                          <Badge className="absolute top-4 left-4 z-20 bg-gradient-to-r from-[var(--color-spiritual-gold)] to-[var(--color-prism-amber)] border-0 shadow-luxury">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        </motion.div>
                      )}
                      
                      {/* Premium visual with enhanced animations */}
                      <div className="h-56 bg-gradient-to-br from-[var(--color-nature-green)]/20 via-[var(--color-water-blue)]/15 to-[var(--color-spiritual-gold)]/20 flex items-center justify-center relative overflow-hidden">
                        {/* Enhanced animated background pattern */}
                        <motion.div
                          className="absolute inset-0 opacity-20"
                          style={{
                            background: 'radial-gradient(circle at 30% 70%, var(--color-spiritual-gold) 0%, transparent 50%)'
                          }}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.2, 0.4, 0.2]
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                        />
                        
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </div>
                        
                        {/* Enhanced main icon with breathing animation */}
                        <motion.div
                          animate={{ 
                            scale: [1, 1.05, 1],
                            rotateY: [0, 5, 0],
                          }}
                          transition={{ 
                            duration: 4, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          whileHover={{ 
                            scale: 1.15, 
                            rotateY: 15,
                            transition: { duration: 0.3 }
                          }}
                          className="relative z-10"
                        >
                          <Heart className="h-20 w-20 text-white/70 drop-shadow-2xl animate-breathe-glow" />
                        </motion.div>
                        
                        {/* Enhanced floating particles with better animations */}
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1.5 h-1.5 bg-[var(--color-spiritual-gold)]/70 rounded-full"
                            initial={{ 
                              x: Math.random() * 200 - 100,
                              y: Math.random() * 200 - 100,
                              opacity: 0
                            }}
                            animate={{
                              x: [null, Math.random() * 200 - 100],
                              y: [null, Math.random() * 200 - 100],
                              opacity: [0, 0.8, 0],
                              scale: [0.5, 1.2, 0.5]
                            }}
                            transition={{
                              duration: 3 + Math.random() * 2,
                              repeat: Infinity,
                              delay: i * 0.3,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  
                  <CardHeader className="p-8 pb-4">
                    <div className="flex justify-between items-start mb-3">
                      <motion.h3 
                        className="text-2xl font-bold text-white group-hover:text-kinetic transition-all duration-300"
                        whileHover={{ x: 2 }}
                      >
                        {retreat.title}
                      </motion.h3>
                      <div className="flex items-center space-x-1 crystal-panel px-3 py-1 rounded-full">
                        <Star className="h-4 w-4 text-[var(--color-spiritual-gold)] fill-current" />
                        <span className="text-sm font-bold text-white">{retreat.rating}</span>
                        <span className="text-xs text-white/60">({retreat.reviews})</span>
                      </div>
                    </div>
                    
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <Badge 
                        variant="outline" 
                        className="w-fit text-sm border-[var(--color-spiritual-gold)]/30 text-[var(--color-spiritual-gold)] mb-4 hover:bg-[var(--color-spiritual-gold)]/10 transition-all duration-200"
                      >
                        {retreat.category}
                      </Badge>
                    </motion.div>
                    
                    <motion.p 
                      className="text-white/80 text-base leading-relaxed mb-4 line-clamp-3"
                      whileHover={{ opacity: 1 }}
                    >
                      {retreat.description}
                    </motion.p>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <Sparkles className="h-4 w-4 text-[var(--color-prism-rose)]" />
                      <span className="text-sm text-white/70 font-medium">
                        Facilitator: {retreat.facilitator}
                      </span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-8 pt-0">
                    <div className="space-y-4 mb-6">
                      <motion.div 
                        className="flex items-center space-x-2 text-base text-white/70"
                        whileHover={{ x: 2 }}
                      >
                        <MapPin className="h-5 w-5 text-[var(--color-prism-amber)]" />
                        <span>{retreat.location}</span>
                      </motion.div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm text-white/70">
                        <motion.div className="flex items-center space-x-2" whileHover={{ x: 2 }}>
                          <Calendar className="h-4 w-4 text-[var(--color-prism-amber)]" />
                          <span>{retreat.duration}</span>
                        </motion.div>
                        <motion.div className="flex items-center space-x-2" whileHover={{ x: 2 }}>
                          <Users className="h-4 w-4 text-[var(--color-prism-amber)]" />
                          <span>Max {retreat.capacity}</span>
                        </motion.div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {retreat.tags.slice(0, 3).map((tag, tagIndex) => (
                        <motion.div
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: tagIndex * 0.05 }}
                        >
                          <Badge 
                            variant="outline" 
                            className="text-xs border-white/20 text-white/80 hover:bg-white/10 transition-all duration-200"
                          >
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-3xl font-bold text-kinetic">
                        ${retreat.price.toLocaleString()}
                        <span className="text-sm font-normal text-white/60 ml-1">MXN</span>
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          asChild 
                          className="bg-gradient-to-r from-[var(--color-nature-green)] to-[var(--color-water-blue)] hover:from-[var(--color-water-blue)] hover:to-[var(--color-spiritual-gold)] text-white font-semibold accessible-luxury hover-lift shadow-luxury border-0"
                        >
                          <Link href={`/retreats/${retreat.id}` as never}>
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {/* Enhanced CTA Section */}
          <motion.div 
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white/40 text-white bg-white/5 backdrop-blur-xl hover:bg-white/15 hover:border-white/60 px-12 py-6 text-lg accessible-luxury hover-lift crystal-panel group relative overflow-hidden font-semibold"
              >
                <Heart className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                Create Custom Retreat Experience
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Information Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-nature-green)] via-[var(--color-water-blue)] to-[var(--color-spiritual-gold)]" />
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Floating orbs */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-32 h-32 rounded-full bg-white/10 blur-xl"
                animate={{
                  x: [Math.random() * 1200, Math.random() * 1200],
                  y: [Math.random() * 600, Math.random() * 600],
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 20 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 crystal-panel rounded-full">
                <Mountain className="w-4 h-4 text-[var(--color-spiritual-gold)]" />
                <span className="text-sm font-medium text-white/90">Sacred Transformation</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white text-shadow-luxury">
                Why Choose Our
                <span className="block text-kinetic">Sacred Retreats?</span>
              </h2>
              
              <div className="space-y-6 text-white/90 text-lg leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Our retreats offer authentic transformation through time-tested practices and sacred traditions preserved by indigenous masters for thousands of years.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Each experience is carefully curated to provide deep healing, spiritual awakening, and lasting personal growth in safe, supportive environments guided by experienced facilitators.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Connect with like-minded souls, rediscover your true essence, and return home transformed with tools and wisdom for continued evolution.
                </motion.p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-8"
              >
                <Button 
                  size="lg"
                  className="bg-white/20 backdrop-blur-xl border border-white/30 text-white hover:bg-white/30 px-8 py-4 text-lg font-semibold accessible-luxury"
                >
                  Learn About Our Process
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="crystal-panel-luxury p-10 relative overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-40 h-40 opacity-5">
                <Mountain className="w-full h-full text-white" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-8">
                  <Sparkles className="w-8 h-8 text-[var(--color-spiritual-gold)] animate-breathe-glow" />
                  <h3 className="text-2xl font-bold text-white">
                    Retreat <span className="text-kinetic">Benefits</span>
                  </h3>
                </div>
                
                <div className="space-y-5">
                  {[
                    { icon: Heart, title: 'Deep Emotional Healing', description: 'Release trauma and emotional blockages through ancient practices' },
                    { icon: Sparkles, title: 'Spiritual Awakening', description: 'Connect with your higher self and expand consciousness' },
                    { icon: Users, title: 'Sacred Community', description: 'Form lifelong bonds with fellow seekers on the path' },
                    { icon: Mountain, title: 'Authentic Wisdom', description: 'Learn directly from indigenous masters and experienced guides' },
                    { icon: Calendar, title: 'Integration Support', description: 'Continued guidance to integrate insights into daily life' }
                  ].map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      className="flex items-start space-x-4 group"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex-shrink-0">
                        <benefit.icon className="w-6 h-6 text-[var(--color-spiritual-gold)] group-hover:animate-breathe transition-all duration-300" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white group-hover:text-kinetic transition-all duration-300 mb-1">
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
        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  )
}