'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Book, 
  Search, 
  Filter,
  BookOpen,
  Compass,
  Star,
  Clock,
  User,
  ArrowRight,
  Play,
  Download,
  Heart,
  Share,
  Eye,
  Sparkles,
  Leaf,
  Sun,
  Moon,
  Wind,
  Flame,
  Mountain,
  Waves,
  TreePine,
  Feather
} from 'lucide-react'

// Fixed positions for consistent rendering
const particlePositions = Array.from({ length: 30 }, (_, i) => ({
  x: (i % 6) * 200 + (i % 2) * 100,
  y: Math.floor(i / 6) * 120 + (i % 3) * 40,
  delay: (i % 8) * 0.8,
  duration: 18 + (i % 5) * 3
}))

const guideCategories = [
  {
    id: 'spiritual-practices',
    name: 'Spiritual Practices',
    description: 'Ancient traditions and modern techniques for spiritual growth',
    icon: Sparkles,
    gradient: 'from-prism-sunset to-prism-amber',
    count: 45,
    color: '#f97316'
  },
  {
    id: 'healing-arts',
    name: 'Healing Arts',
    description: 'Traditional and alternative healing modalities',
    icon: Heart,
    gradient: 'from-mystical-purple to-prism-rose',
    count: 32,
    color: '#8b5cf6'
  },
  {
    id: 'nature-connection',
    name: 'Nature Connection',
    description: 'Reconnecting with the natural world and its wisdom',
    icon: Leaf,
    gradient: 'from-nature-green to-water-blue',
    count: 28,
    color: '#10b981'
  },
  {
    id: 'sacred-ceremonies',
    name: 'Sacred Ceremonies',
    description: 'Traditional rituals and ceremonial practices',
    icon: Flame,
    gradient: 'from-earth-brown to-sacred-copper',
    count: 24,
    color: '#d97706'
  },
  {
    id: 'meditation-mindfulness',
    name: 'Meditation & Mindfulness',
    description: 'Techniques for inner peace and awareness',
    icon: Sun,
    gradient: 'from-spiritual-gold to-sunset-orange',
    count: 38,
    color: '#eab308'
  },
  {
    id: 'energy-work',
    name: 'Energy Work',
    description: 'Understanding and working with subtle energies',
    icon: Wind,
    gradient: 'from-water-blue to-mystical-purple',
    count: 26,
    color: '#3b82f6'
  }
]

const featuredGuides = [
  {
    id: 1,
    title: 'The Sacred Path of Temazcal',
    subtitle: 'Ancient Purification Ceremony Guide',
    category: 'Sacred Ceremonies',
    author: 'Carlos Itzelcoatl',
    avatar: '🔥',
    readTime: '15 min',
    difficulty: 'Beginner',
    rating: 4.9,
    views: 2450,
    description: 'Discover the profound healing power of the traditional sweat lodge ceremony, its origins, preparation, and transformative effects.',
    image: '🏕️',
    tags: ['Temazcal', 'Purification', 'Sacred Fire', 'Healing'],
    featured: true
  },
  {
    id: 2,
    title: 'Plant Medicine Integration',
    subtitle: 'Integrating Sacred Plant Teachings',
    category: 'Healing Arts', 
    author: 'María Esperanza',
    avatar: '🌿',
    readTime: '22 min',
    difficulty: 'Advanced',
    rating: 5.0,
    views: 1890,
    description: 'Learn how to properly integrate insights from plant medicine ceremonies into daily life for lasting transformation.',
    image: '🌱',
    tags: ['Plant Medicine', 'Integration', 'Healing', 'Wisdom'],
    featured: true
  },
  {
    id: 3,
    title: 'Sacred Geometry in Nature',
    subtitle: 'Understanding Universal Patterns',
    category: 'Nature Connection',
    author: 'Diego Xochitl',
    avatar: '🎨',
    readTime: '18 min',
    difficulty: 'Intermediate',
    rating: 4.8,
    views: 3200,
    description: 'Explore the sacred geometric patterns found in nature and their significance in spiritual practices.',
    image: '🌀',
    tags: ['Sacred Geometry', 'Nature', 'Patterns', 'Spirituality'],
    featured: false
  },
  {
    id: 4,
    title: 'Energy Healing Fundamentals',
    subtitle: 'Introduction to Subtle Energy Work',
    category: 'Energy Work',
    author: 'Luna Riverwind',
    avatar: '🎵',
    readTime: '25 min',
    difficulty: 'Beginner',
    rating: 4.7,
    views: 1650,
    description: 'Master the basics of energy healing including chakra work, aura cleansing, and protection techniques.',
    image: '⚡',
    tags: ['Energy Healing', 'Chakras', 'Aura', 'Protection'],
    featured: false
  },
  {
    id: 5,
    title: 'Mindful Living Practices',
    subtitle: 'Daily Spiritual Practices',
    category: 'Meditation & Mindfulness',
    author: 'Sage Moonwhisper',
    avatar: '🌙',
    readTime: '12 min',
    difficulty: 'Beginner',
    rating: 4.9,
    views: 4100,
    description: 'Simple yet powerful daily practices to cultivate mindfulness and spiritual awareness in everyday life.',
    image: '🧘',
    tags: ['Mindfulness', 'Daily Practice', 'Meditation', 'Awareness'],
    featured: false
  },
  {
    id: 6,
    title: 'Crystal Healing Mastery',
    subtitle: 'Advanced Crystal Work Techniques',
    category: 'Healing Arts',
    author: 'Crystal Starweaver',
    avatar: '💎',
    readTime: '30 min',
    difficulty: 'Advanced',
    rating: 4.8,
    views: 2780,
    description: 'Advanced techniques for working with crystals including programming, cleansing, and healing layouts.',
    image: '💎',
    tags: ['Crystals', 'Healing', 'Energy', 'Advanced'],
    featured: false
  }
]

// Hero Section Component
function GuidesHero() {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-950 to-prism-amber/10">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-prism-amber/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-prism-sunset/15 via-transparent to-mystical-purple/10" />
      </div>

      {/* Floating Particles */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {particlePositions.slice(0, 20).map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{ x: pos.x, y: pos.y, opacity: 0 }}
              animate={{ 
                y: [pos.y, pos.y - 300], 
                opacity: [0, 1, 0] 
              }}
              transition={{
                duration: pos.duration,
                repeat: Infinity,
                delay: pos.delay,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      )}

      {/* Floating Books Animation */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 5 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl opacity-10"
              initial={{ 
                x: (i * 300) + 100, 
                y: (i * 200) + 150,
                rotate: 0 
              }}
              animate={{
                y: [(i * 200) + 150, (i * 200) + 50, (i * 200) + 150],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              {['📚', '📖', '📜', '🗞️', '📋'][i]}
            </motion.div>
          ))}
        </div>
      )}

      {/* Hero Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 text-center max-w-5xl mx-auto px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <Badge className="bg-prism-amber/20 text-prism-sunset border-prism-sunset/30 px-6 py-2 text-sm font-medium">
            <Book className="w-4 h-4 mr-2" />
            Sacred Knowledge Library
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold mb-8 text-white"
        >
          Spiritual
          <span className="text-kinetic block mt-2">
            Guides
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed max-w-3xl mx-auto"
        >
          Discover ancient wisdom and modern insights through our comprehensive collection 
          of spiritual guides, tutorials, and sacred knowledge.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative crystal-panel-luxury rounded-2xl p-2">
            <div className="flex items-center">
              <div className="flex items-center flex-1 px-4">
                <Search className="w-5 h-5 text-white/60 mr-3" />
                <Input
                  placeholder="Search for spiritual wisdom..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none text-white placeholder:text-white/50 focus:ring-0 text-lg"
                />
              </div>
              <Button 
                className="btn-luxury text-white font-semibold px-6 py-3 accessible-luxury hover-lift"
                size="lg"
              >
                Search
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button 
            size="lg"
            className="btn-luxury text-white font-semibold px-8 py-4 text-lg accessible-luxury hover-lift relative overflow-hidden group"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            <span className="relative z-10">Browse All Guides</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-prism-amber to-prism-rose opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.1 }}
            />
          </Button>
          
          <Button 
            variant="outline"
            size="lg"
            className="border-white/20 text-black hover:bg-white/10 hover:text-black px-8 py-4 text-lg accessible-luxury hover-lift"
          >
            <Compass className="w-5 h-5 mr-2" />
            Quick Start Guide
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Categories Section
function CategoriesSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-prism-sunset/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Sacred <span className="text-kinetic">Knowledge Categories</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Explore our comprehensive library organized by spiritual domains and practices
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guideCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className="crystal-panel-luxury rounded-2xl p-8 hover:scale-105 transition-all duration-500 relative overflow-hidden h-full">
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${category.gradient}`} />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div 
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${category.gradient} group-hover:animate-breathe transition-all duration-300`}
                      style={{ 
                        boxShadow: `0 0 20px ${category.color}40` 
                      }}
                    >
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <Badge className="bg-white/10 text-white border-white/20">
                      {category.count} guides
                    </Badge>
                  </div>

                  <h3 className={`text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${category.gradient}`}>
                    {category.name}
                  </h3>

                  <p className="text-white/70 text-lg leading-relaxed mb-8">
                    {category.description}
                  </p>

                  <motion.div
                    animate={{
                      opacity: hoveredCategory === category.id ? 1 : 0,
                      y: hoveredCategory === category.id ? 0 : 20
                    }}
                    className="flex items-center text-prism-amber hover:text-prism-sunset transition-colors cursor-pointer"
                  >
                    <span className="font-medium mr-2">Explore {category.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Featured Guides Section
function FeaturedGuidesSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const [hoveredGuide, setHoveredGuide] = useState<number | null>(null)
  const [filter, setFilter] = useState('all')

  const filteredGuides = featuredGuides.filter(guide => 
    filter === 'all' || guide.category === filter || (filter === 'featured' && guide.featured)
  )

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/10 border-green-400/30'
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30'
      case 'Advanced': return 'text-red-400 bg-red-400/10 border-red-400/30'
      default: return 'text-white/60 bg-white/10 border-white/20'
    }
  }

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-prism-amber/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-mystical-purple/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured <span className="text-kinetic">Wisdom</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Handpicked guides from our most respected spiritual teachers and practitioners
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {['all', 'featured', 'Sacred Ceremonies', 'Healing Arts', 'Nature Connection'].map((filterOption) => (
              <Button
                key={filterOption}
                variant={filter === filterOption ? 'default' : 'outline'}
                className={`${
                  filter === filterOption 
                    ? 'btn-luxury text-white shadow-lg' 
                    : 'bg-white/90 border-white/30 text-gray-900 hover:bg-white hover:text-gray-900 hover:border-white'
                } accessible-luxury transition-all duration-300`}
                onClick={() => setFilter(filterOption)}
              >
                {filterOption === 'all' ? 'All Guides' : filterOption}
              </Button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredGuides.map((guide, index) => (
              <motion.div
                key={guide.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative ${guide.featured ? 'lg:col-span-2' : ''}`}
                onMouseEnter={() => setHoveredGuide(guide.id)}
                onMouseLeave={() => setHoveredGuide(null)}
              >
                <div className={`crystal-panel-luxury rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 relative h-full ${
                  guide.featured ? 'border-2 border-prism-amber/30' : ''
                }`}>
                  {guide.featured && (
                    <div className="absolute top-4 right-4 z-20">
                      <Badge className="bg-prism-sunset/20 text-prism-amber border-prism-amber/30">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}

                  {/* Guide Image/Icon */}
                  <div className={`${guide.featured ? 'h-64' : 'h-48'} bg-gradient-to-br from-prism-sunset/20 to-prism-amber/20 flex items-center justify-center relative overflow-hidden`}>
                    <div className="text-8xl opacity-20 group-hover:scale-110 transition-transform duration-500">
                      {guide.image}
                    </div>
                    <div className="absolute inset-0 bg-black/20" />
                    
                    {/* Hover Play Button */}
                    <motion.div
                      animate={{
                        opacity: hoveredGuide === guide.id ? 1 : 0,
                        scale: hoveredGuide === guide.id ? 1 : 0.8
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </motion.div>
                  </div>

                  <div className="p-6 relative">
                    {/* Category and Author */}
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-white/10 text-white/80 border-white/20">
                        {guide.category}
                      </Badge>
                      <div className="flex items-center text-white/60 text-sm">
                        <div className="w-6 h-6 bg-gradient-to-r from-prism-sunset to-prism-amber rounded-full flex items-center justify-center text-xs mr-2">
                          {guide.avatar}
                        </div>
                        {guide.author}
                      </div>
                    </div>

                    {/* Title and Subtitle */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-prism-amber transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-prism-amber/80 font-medium mb-3">
                      {guide.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                      {guide.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {guide.tags.map((tag) => (
                        <Badge 
                          key={tag}
                          className="bg-white/5 text-white/60 border-white/10 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats and Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-white/60 text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {guide.readTime}
                        </div>
                        <Badge className={getDifficultyColor(guide.difficulty)}>
                          {guide.difficulty}
                        </Badge>
                        <div className="flex items-center text-white/60 text-xs">
                          <Star className="w-3 h-3 mr-1 text-prism-amber" />
                          {guide.rating}
                        </div>
                        <div className="flex items-center text-white/60 text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          {guide.views}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
                          <Share className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm"
                          className="btn-luxury text-white font-semibold px-4 py-2 accessible-luxury hover-lift text-xs"
                        >
                          Read Guide
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-prism-sunset/5 to-prism-amber/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Button 
            size="lg"
            className="btn-luxury text-white font-semibold px-12 py-4 text-lg accessible-luxury hover-lift relative overflow-hidden group"
          >
            <Download className="w-5 h-5 mr-2" />
            <span className="relative z-10">Load More Guides</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-prism-amber to-prism-rose opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.1 }}
            />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

// Newsletter/CTA Section
function NewsletterSection() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  const [email, setEmail] = useState('')

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-black via-gray-950 to-prism-sunset/10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-prism-amber/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-prism-sunset/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Never Miss <span className="text-kinetic">Sacred Wisdom</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Get notified when new guides are published and receive exclusive spiritual insights directly in your inbox.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="crystal-panel-luxury rounded-2xl p-8 md:p-12 relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-prism-amber flex-1 py-4 text-lg"
                />
                <Button 
                  size="lg"
                  className="btn-luxury text-white font-semibold px-8 py-4 text-lg accessible-luxury hover-lift relative overflow-hidden group"
                >
                  <span className="relative z-10">Subscribe</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-prism-amber to-prism-rose opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                  />
                </Button>
              </div>
              
              <p className="text-white/50 text-sm mt-4">
                Join 5,000+ spiritual seekers receiving weekly wisdom. Unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-prism-sunset/5 to-prism-amber/5" />
        </motion.div>
      </div>
    </section>
  )
}

export default function GuidesPage() {
  return (
    <div className="min-h-screen">
      <GuidesHero />
      <CategoriesSection />
      <FeaturedGuidesSection />
      <NewsletterSection />
    </div>
  )
}