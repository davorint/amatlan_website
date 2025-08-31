'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Star, TreePine, Home, Leaf, Sun, Droplet } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'

// Mock data - will be replaced with database queries
const ecoStayExperiences = [
  {
    id: 'treehouse-sanctuary',
    title: 'Mystical Treehouse Sanctuary',
    description: 'Elevated eco-luxury experience among ancient trees. Solar-powered treehouse with panoramic views, meditation deck, and direct forest access.',
    host: 'Casa Árbol Sagrado',
    location: 'Sacred Forest Canopy',
    price: 2800,
    priceUnit: 'night',
    capacity: 4,
    rating: 4.9,
    reviews: 87,
    images: ['/eco-stay-1.jpg'],
    amenities: ['Solar Power', 'Forest Views', 'Meditation Deck', 'Organic Garden'],
    tags: ['Luxury', 'Treehouse', 'Forest', 'Solar'],
    featured: true,
    category: 'Treehouse',
    sustainability: 95
  },
  {
    id: 'earth-lodge',
    title: 'Sacred Earth Lodge',
    description: 'Traditional adobe construction with modern eco-amenities. Built with local materials, featuring natural cooling, rain water collection, and permaculture gardens.',
    host: 'Tierra Madre Ecolodge',
    location: 'Permaculture Valley',
    price: 1800,
    priceUnit: 'night',
    capacity: 6,
    rating: 4.8,
    reviews: 134,
    images: ['/eco-stay-2.jpg'],
    amenities: ['Adobe Construction', 'Rainwater Collection', 'Organic Farm', 'Natural Pools'],
    tags: ['Adobe', 'Traditional', 'Farm-to-Table', 'Sustainable'],
    featured: true,
    category: 'Earth Lodge',
    sustainability: 98
  },
  {
    id: 'bamboo-retreat',
    title: 'Bamboo Forest Retreat',
    description: 'Minimalist bamboo structures designed for deep connection with nature. Composting toilets, solar showers, and meditation pavilion surrounded by bamboo groves.',
    host: 'Bambú Zen Center',
    location: 'Bamboo Grove Sanctuary',
    price: 1400,
    priceUnit: 'night',
    capacity: 2,
    rating: 4.9,
    reviews: 67,
    images: ['/eco-stay-3.jpg'],
    amenities: ['Bamboo Architecture', 'Composting Systems', 'Solar Heating', 'Meditation Space'],
    tags: ['Bamboo', 'Minimalist', 'Zen', 'Off-Grid'],
    featured: false,
    category: 'Bamboo',
    sustainability: 100
  },
  {
    id: 'riverside-cabin',
    title: 'Riverside Healing Cabin',
    description: 'Cozy cabin beside sacred river with natural swimming pools. Hydroelectric micro-system, organic vegetable garden, and direct access to healing waterfalls.',
    host: 'Río Sagrado Retreat',
    location: 'Sacred River Valley',
    price: 2200,
    priceUnit: 'night',
    capacity: 8,
    rating: 4.7,
    reviews: 93,
    images: ['/eco-stay-4.jpg'],
    amenities: ['Hydro Power', 'Natural Pools', 'Waterfall Access', 'Organic Garden'],
    tags: ['Riverside', 'Swimming', 'Waterfall', 'Cabin'],
    featured: true,
    category: 'Riverside',
    sustainability: 92
  },
  {
    id: 'desert-dome',
    title: 'Desert Moon Dome',
    description: 'Geodesic dome with 360° desert views and star-gazing deck. Wind power, water recycling, desert permaculture, and incredible sunrise/sunset vistas.',
    host: 'Desierto Luna Eco-Dome',
    location: 'Sacred Desert Hills',
    price: 2000,
    priceUnit: 'night',
    capacity: 3,
    rating: 4.8,
    reviews: 45,
    images: ['/eco-stay-5.jpg'],
    amenities: ['Wind Power', 'Star Deck', 'Water Recycling', 'Desert Views'],
    tags: ['Dome', 'Desert', 'Stargazing', 'Wind Power'],
    featured: false,
    category: 'Desert',
    sustainability: 96
  },
  {
    id: 'mountain-yurt',
    title: 'Mountain Cloud Yurt',
    description: 'Traditional Mongolian yurt adapted for tropical mountains. Cloud forest location with incredible biodiversity, bird watching, and healing plant walks.',
    host: 'Montaña Nube Yurt',
    location: 'Cloud Forest Peaks',
    price: 1600,
    priceUnit: 'night',
    capacity: 5,
    rating: 4.9,
    reviews: 78,
    images: ['/eco-stay-6.jpg'],
    amenities: ['Traditional Design', 'Cloud Forest', 'Bird Watching', 'Plant Walks'],
    tags: ['Yurt', 'Mountain', 'Cloud Forest', 'Traditional'],
    featured: false,
    category: 'Mountain',
    sustainability: 94
  }
]

const amenityIcons = {
  'Solar Power': Sun,
  'Forest Views': TreePine,
  'Meditation Deck': Leaf,
  'Organic Garden': TreePine,
  'Adobe Construction': Home,
  'Rainwater Collection': Droplet,
  'Organic Farm': TreePine,
  'Natural Pools': Droplet,
  'Bamboo Architecture': TreePine,
  'Composting Systems': Leaf,
  'Solar Heating': Sun,
  'Meditation Space': Leaf,
  'Hydro Power': Droplet,
  'Waterfall Access': Droplet,
  'Wind Power': Sun,
  'Star Deck': Sun,
  'Water Recycling': Droplet,
  'Desert Views': Sun,
  'Traditional Design': Home,
  'Cloud Forest': TreePine,
  'Bird Watching': TreePine,
  'Plant Walks': Leaf,
}

export default function EcoStaysPage() {
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
            className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-teal-500/15 to-green-600/20"
            style={{ y: y }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Animated eco patterns */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
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
                  duration: Math.random() * 30 + 20,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'linear'
                }}
              >
                <TreePine className="h-8 w-8 text-emerald-400/40" />
              </motion.div>
            ))}
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
                <TreePine className="h-5 w-5 text-emerald-400 animate-pulse" />
                <span className="text-white font-medium">Sustainable Living</span>
                <Leaf className="h-4 w-4 text-green-400 animate-float" />
              </div>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400">
                Eco-Conscious
              </span>
              <br />
              <span className="text-4xl md:text-5xl text-white/90">Sanctuaries</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Sustainable accommodations that harmonize luxury with environmental responsibility in nature's embrace
            </motion.p>

            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Badge className="glass-card text-base px-4 py-2 text-white border-white/20">
                Carbon Neutral
              </Badge>
              <Badge className="glass-card text-base px-4 py-2 text-white border-white/20">
                Solar Powered
              </Badge>
              <Badge className="glass-card text-base px-4 py-2 text-white border-white/20">
                Zero Waste
              </Badge>
              <Badge className="glass-card text-base px-4 py-2 text-white border-white/20">
                Organic Gardens
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
                Sustainable Sanctuaries
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Discover eco-luxury accommodations that nurture both you and the planet
            </p>
            <div className="text-sm text-white/40 mt-4">
              {ecoStayExperiences.length} eco-conscious stays available
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ecoStayExperiences.map((stay, index) => (
              <motion.div
                key={stay.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, z: 10 }}
                className="group"
              >
                <Card className="overflow-hidden bg-gradient-to-br from-black/80 to-gray-900/60 border-white/10 backdrop-blur-xl hover:shadow-2xl transition-all duration-500">
                  <div className="relative">
                    {stay.featured && (
                      <Badge className="absolute top-4 left-4 z-10 bg-emerald-500 text-black">
                        {tCommon('featured')}
                      </Badge>
                    )}
                    
                    {/* Sustainability score */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-green-500/90 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-xs font-bold text-white">{stay.sustainability}% Eco</span>
                      </div>
                    </div>
                    
                    <div className="h-48 bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-green-500/20 flex items-center justify-center relative overflow-hidden">
                      {/* Animated background pattern */}
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute inset-0 bg-gradient-radial from-emerald-500/20 via-transparent to-transparent" />
                      </div>
                      <Home className="h-16 w-16 text-white/60 relative z-10" />
                      
                      {/* Floating eco elements */}
                      {[TreePine, Leaf, Sun, Droplet].map((Icon, i) => (
                        <motion.div
                          key={i}
                          className="absolute"
                          animate={{
                            x: [0, Math.random() * 60 - 30],
                            y: [0, Math.random() * 60 - 30],
                            opacity: [0, 0.6, 0],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 1,
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
                        {stay.title}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-white">{stay.rating}</span>
                        <span className="text-sm text-white/60">({stay.reviews})</span>
                      </div>
                    </div>
                    
                    <Badge variant="outline" className="w-fit text-xs border-emerald-500/30 text-emerald-400 mb-3">
                      {stay.category}
                    </Badge>
                    
                    <p className="text-white/70 text-sm leading-relaxed mb-3">
                      {stay.description}
                    </p>
                    <div className="text-sm text-white/80 font-medium">
                      Host: {stay.host}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-white/60">
                        <MapPin className="h-4 w-4" />
                        <span>{stay.location}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-white/60">
                        <div className="text-xs">Capacity: {stay.capacity} guests</div>
                      </div>
                    </div>
                    
                    {/* Amenities */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {stay.amenities.slice(0, 4).map((amenity) => {
                        const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || TreePine
                        return (
                          <div key={amenity} className="flex items-center space-x-2 text-xs text-white/70">
                            <IconComponent className="h-3 w-3" />
                            <span className="truncate">{amenity}</span>
                          </div>
                        )
                      })}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {stay.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-white/20 text-white/70">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-xl font-bold text-white">
                        ${stay.price.toLocaleString()}
                        <span className="text-sm font-normal text-white/60 ml-1">/{stay.priceUnit}</span>
                      </div>
                      <Button asChild className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-teal-500 hover:to-green-500 text-white">
                        <Link href={`/eco-stays/${stay.id}` as never}>
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

      {/* Sustainability Section */}
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
                Committed to Mother Earth
              </h2>
              <div className="space-y-4 text-white/90 text-lg">
                <p>Our eco-stays are designed to minimize environmental impact while maximizing your connection to nature's healing power.</p>
                <p>Each property uses renewable energy, sustainable materials, and regenerative practices that give back more than they take.</p>
                <p>Experience luxury that aligns with your values and contributes to a healthier planet for future generations.</p>
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
                <Leaf className="h-6 w-6 mr-3 text-green-300" />
                Our Eco Standards
              </h3>
              <ul className="space-y-4 text-white/90">
                {[
                  '100% renewable energy systems',
                  'Zero single-use plastics policy', 
                  'Local, organic, farm-to-table cuisine',
                  'Water conservation and recycling',
                  'Native habitat restoration projects',
                  'Carbon-negative operations'
                ].map((standard, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <span className="text-green-300 text-xl">✓</span>
                    <span>{standard}</span>
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