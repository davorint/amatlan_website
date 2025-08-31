'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Star, Clock, Users, Mountain, TreePine, Compass, Camera, Binoculars, Footprints } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'

// Mock data - will be replaced with database queries
const natureExperiences = [
  {
    id: 'sacred-mountain-trek',
    title: 'Sacred Mountain Pilgrimage',
    description: 'Ascend the mystical Cerro del Tepozteco at dawn. Ancient pyramid temple, panoramic views, and spiritual ceremony with traditional offerings.',
    guide: 'Guía Espiritual Citlali',
    location: 'Cerro del Tepozteco',
    price: 1200,
    duration: '6 hours',
    difficulty: 'Moderate',
    capacity: 8,
    rating: 4.9,
    reviews: 234,
    images: ['/nature-1.jpg'],
    activities: ['Hiking', 'Ceremony', 'Sunrise Meditation', 'Temple Visit'],
    tags: ['Sacred Sites', 'Hiking', 'Ceremony', 'Sunrise'],
    featured: true,
    category: 'Sacred Pilgrimage'
  },
  {
    id: 'waterfall-healing',
    title: 'Healing Waterfalls Journey',
    description: 'Discover hidden cascades in lush canyon. Natural pools, sound healing by waterfalls, and purification rituals in sacred waters.',
    guide: 'Natura Guía Roberto',
    location: 'Cañón de los Cristales',
    price: 800,
    duration: '4 hours',
    difficulty: 'Easy',
    capacity: 12,
    rating: 4.8,
    reviews: 187,
    images: ['/nature-2.jpg'],
    activities: ['Swimming', 'Sound Healing', 'Nature Walk', 'Photography'],
    tags: ['Waterfalls', 'Swimming', 'Healing', 'Nature'],
    featured: true,
    category: 'Water Healing'
  },
  {
    id: 'cave-exploration',
    title: 'Mystical Cave Meditation',
    description: 'Explore ancient limestone caves used for ceremonial purposes. Underground meditation, crystal formations, and connection with Earth energy.',
    guide: 'Spelunker Místico Juan',
    location: 'Cuevas Sagradas',
    price: 1000,
    duration: '3 hours',
    difficulty: 'Moderate',
    capacity: 6,
    rating: 4.7,
    reviews: 98,
    images: ['/nature-3.jpg'],
    activities: ['Cave Exploration', 'Meditation', 'Crystal Study', 'Earth Connection'],
    tags: ['Caves', 'Meditation', 'Crystals', 'Underground'],
    featured: false,
    category: 'Earth Connection'
  },
  {
    id: 'night-forest-walk',
    title: 'Nocturnal Forest Ceremony',
    description: 'Nighttime forest immersion with traditional lunar rituals. Owl calls, star navigation, night-blooming plants, and moon ceremony.',
    guide: 'Night Walker Luna',
    location: 'Bosque de Luna',
    price: 1500,
    duration: '5 hours',
    difficulty: 'Easy',
    capacity: 10,
    rating: 4.9,
    reviews: 156,
    images: ['/nature-4.jpg'],
    activities: ['Night Walk', 'Moon Ceremony', 'Star Navigation', 'Wildlife Observation'],
    tags: ['Night', 'Moon Ceremony', 'Forest', 'Stars'],
    featured: true,
    category: 'Lunar Journey'
  },
  {
    id: 'bird-watching-dawn',
    title: 'Sacred Bird Dawn Chorus',
    description: 'Early morning bird watching with indigenous bird lore. Identify local species, understand their spiritual meanings, and dawn meditation.',
    guide: 'Ornitólogo Místico Pedro',
    location: 'Reserva de Aves',
    price: 600,
    duration: '3 hours',
    difficulty: 'Easy',
    capacity: 15,
    rating: 4.6,
    reviews: 213,
    images: ['/nature-5.jpg'],
    activities: ['Bird Watching', 'Dawn Meditation', 'Indigenous Lore', 'Photography'],
    tags: ['Birds', 'Dawn', 'Wildlife', 'Meditation'],
    featured: false,
    category: 'Wildlife Connection'
  },
  {
    id: 'plant-medicine-walk',
    title: 'Sacred Plant Medicine Walk',
    description: 'Learn about medicinal and spiritual plants with indigenous plant knowledge keeper. Sustainable harvesting and plant spirit connection.',
    guide: 'Herbolaria Sabia Carmen',
    location: 'Jardín de Plantas Medicinales',
    price: 900,
    duration: '4 hours',
    difficulty: 'Easy',
    capacity: 8,
    rating: 5.0,
    reviews: 89,
    images: ['/nature-6.jpg'],
    activities: ['Plant Study', 'Harvesting', 'Medicine Making', 'Spirit Connection'],
    tags: ['Plants', 'Medicine', 'Harvesting', 'Indigenous Knowledge'],
    featured: false,
    category: 'Plant Medicine'
  }
]

const activityIcons = {
  'Hiking': Mountain,
  'Ceremony': Star,
  'Sunrise Meditation': Star,
  'Temple Visit': Mountain,
  'Swimming': Mountain, // Using Mountain as placeholder
  'Sound Healing': Star,
  'Nature Walk': TreePine,
  'Photography': Camera,
  'Cave Exploration': Mountain,
  'Meditation': Star,
  'Crystal Study': Star,
  'Earth Connection': Mountain,
  'Night Walk': TreePine,
  'Moon Ceremony': Star,
  'Star Navigation': Compass,
  'Wildlife Observation': Binoculars,
  'Bird Watching': Binoculars,
  'Dawn Meditation': Star,
  'Indigenous Lore': Star,
  'Plant Study': TreePine,
  'Harvesting': TreePine,
  'Medicine Making': TreePine,
  'Spirit Connection': Star,
}

const difficultyColors = {
  'Easy': 'text-green-400 border-green-400/30',
  'Moderate': 'text-yellow-400 border-yellow-400/30',
  'Challenging': 'text-red-400 border-red-400/30'
}

export default function NaturePage() {
  const t = useTranslations('Nature')
  const tCommon = useTranslations('Common')
  const heroRef = useRef<HTMLDivElement>(null)
  const { ref: contentRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <div className="min-h-screen">
      {/* Premium Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-[70vh] overflow-hidden"
      >
        {/* Dynamic background with parallax */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-green-600/20 via-teal-500/15 to-emerald-600/20"
            style={{ y: y }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Nature elements animation */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            {[TreePine, Mountain, Compass, Camera].map((Icon, iconIndex) => 
              [...Array(5)].map((_, i) => (
                <motion.div
                  key={`${iconIndex}-${i}`}
                  className="absolute"
                  initial={{
                    x: Math.random() * 1200,
                    y: Math.random() * 600,
                    rotate: Math.random() * 360,
                  }}
                  animate={{
                    x: Math.random() * 1200,
                    y: Math.random() * 600,
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: Math.random() * 25 + 20,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'linear'
                  }}
                >
                  <Icon className="h-6 w-6 text-emerald-400/40" />
                </motion.div>
              ))
            )}
          </div>
        </div>

        <motion.div 
          ref={contentRef}
          className="relative z-10 flex items-center justify-center min-h-[70vh]"
          style={{ opacity }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            {/* Floating badge */}
            <motion.div 
              className="inline-flex items-center justify-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="glass-card px-6 py-3 rounded-full flex items-center space-x-3">
                <Mountain className="h-5 w-5 text-emerald-400 animate-pulse" />
                <span className="text-white font-medium">Wild Adventures</span>
                <TreePine className="h-4 w-4 text-green-400 animate-float" />
              </div>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400">
                Sacred
              </span>
              <br />
              <span className="text-4xl md:text-5xl text-white/90">Nature</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Immerse yourself in Amatlán&rsquo;s mystical landscapes through spiritual adventures and sacred site pilgrimages
            </motion.p>

            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Badge className="glass-card text-base px-4 py-2 text-white border-white/20">
                Sacred Mountains
              </Badge>
              <Badge className="glass-card text-base px-4 py-2 text-white border-white/20">
                Healing Waters
              </Badge>
              <Badge className="glass-card text-base px-4 py-2 text-white border-white/20">
                Ancient Caves
              </Badge>
              <Badge className="glass-card text-base px-4 py-2 text-white border-white/20">
                Plant Medicine
              </Badge>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Experiences Grid */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400">
                Nature Adventures
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Connect with the sacred landscape through guided spiritual adventures
            </p>
            <div className="text-sm text-white/40 mt-4">
              {natureExperiences.length} adventures waiting for you
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {natureExperiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, z: 10 }}
                className="group"
              >
                <Card className="overflow-hidden bg-gradient-to-br from-black/80 to-gray-900/60 border-white/10 backdrop-blur-xl hover:shadow-2xl transition-all duration-500">
                  <div className="relative">
                    {experience.featured && (
                      <Badge className="absolute top-4 left-4 z-10 bg-emerald-500 text-black">
                        {tCommon('featured')}
                      </Badge>
                    )}
                    
                    {/* Difficulty badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <Badge variant="outline" className={`text-xs ${difficultyColors[experience.difficulty as keyof typeof difficultyColors]}`}>
                        {experience.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="h-48 bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-green-500/20 flex items-center justify-center relative overflow-hidden">
                      {/* Animated background pattern */}
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute inset-0 bg-gradient-radial from-emerald-500/20 via-transparent to-transparent" />
                      </div>
                      <Mountain className="h-16 w-16 text-white/60 relative z-10" />
                      
                      {/* Nature elements animation */}
                      {[TreePine, Mountain, Compass].map((Icon, i) => (
                        <motion.div
                          key={i}
                          className="absolute"
                          animate={{
                            x: [0, Math.random() * 40 - 20],
                            y: [0, Math.random() * 40 - 20],
                            opacity: [0, 0.6, 0],
                            rotate: [0, Math.random() * 180],
                          }}
                          transition={{
                            duration: 6,
                            repeat: Infinity,
                            delay: i * 1.5,
                          }}
                        >
                          <Icon className="h-4 w-4 text-emerald-400/60" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {experience.title}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-white">{experience.rating}</span>
                        <span className="text-sm text-white/60">({experience.reviews})</span>
                      </div>
                    </div>
                    
                    <Badge variant="outline" className="w-fit text-xs border-emerald-500/30 text-emerald-400 mb-3">
                      {experience.category}
                    </Badge>
                    
                    <p className="text-white/70 text-sm leading-relaxed mb-3">
                      {experience.description}
                    </p>
                    <div className="text-sm text-white/80 font-medium">
                      Guide: {experience.guide}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-white/60">
                        <MapPin className="h-4 w-4" />
                        <span>{experience.location}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-white/60">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{experience.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>Max {experience.capacity}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Activities */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-white/80 mb-2">Activities:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {experience.activities.slice(0, 4).map((activity) => {
                          const IconComponent = activityIcons[activity as keyof typeof activityIcons] || Mountain
                          return (
                            <div key={activity} className="flex items-center space-x-1 text-xs text-emerald-300">
                              <IconComponent className="h-3 w-3" />
                              <span className="truncate">{activity}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {experience.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-white/20 text-white/70">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-xl font-bold text-white">
                        ${experience.price.toLocaleString()}
                        <span className="text-sm font-normal text-white/60 ml-1">MXN</span>
                      </div>
                      <Button asChild className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-teal-500 hover:to-green-500 text-white">
                        <Link href={`/nature/${experience.id}` as never}>
                          {tCommon('viewDetails')}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sacred Sites Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-white">
                Sacred Landscape Adventures
              </h2>
              <div className="space-y-4 text-white/90 text-lg">
                <p>Amatlán&rsquo;s mystical landscape holds profound spiritual energy, from sacred mountains to healing waters and ancient ceremonial caves.</p>
                <p>Our indigenous guides share generations of wisdom about these sacred sites, their energetic properties, and traditional practices.</p>
                <p>Each adventure is designed to deepen your connection with nature while respecting the sacred traditions of this magical land.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-black/20 backdrop-blur-sm rounded-2xl p-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                <Mountain className="h-6 w-6 mr-3 text-emerald-300" />
                What Awaits You
              </h3>
              <ul className="space-y-4 text-white/90">
                {[
                  'Sacred mountain temples and pyramid sites',
                  'Hidden waterfalls with healing properties', 
                  'Ancient caves used for ceremonies',
                  'Medicinal plant walks with indigenous knowledge',
                  'Dawn and dusk ceremonies at power spots',
                  'Wildlife encounters in sacred groves'
                ].map((experience, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <span className="text-emerald-300 text-xl">⛰</span>
                    <span>{experience}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}