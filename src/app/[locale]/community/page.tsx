'use client'

import { useState, useEffect } from 'react'
// import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform } from 'motion/react'
import { useInView } from 'react-intersection-observer'
// import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Heart, 
  Sparkles, 
  Calendar, 
  MapPin,
  Star,
  ArrowRight,
  Send,
  UserPlus,
  Globe,
  Eye,
  Flame,
  Clock,
  Leaf
} from 'lucide-react'

// Fixed positions for consistent rendering
const particlePositions = Array.from({ length: 25 }, (_, i) => ({
  x: (i % 5) * 280 + (i % 2) * 140,
  y: Math.floor(i / 5) * 150 + (i % 3) * 60,
  delay: (i % 6) * 1.2,
  duration: 20 + (i % 4) * 5
}))

const communityStats = [
  { number: "2,500+", label: "Sacred Seekers", icon: Users },
  { number: "150+", label: "Monthly Events", icon: Calendar },
  { number: "95%", label: "Positive Energy", icon: Heart },
  { number: "50+", label: "Global Cities", icon: Globe }
]

const memberTypes = [
  {
    title: "Spiritual Seekers",
    description: "Those beginning their journey of self-discovery and spiritual awakening",
    icon: Sparkles,
    gradient: "from-prism-sunset to-prism-amber",
    count: "1,200+"
  },
  {
    title: "Healers & Guides", 
    description: "Traditional healers, shamans, and spiritual guides sharing wisdom",
    icon: Heart,
    gradient: "from-mystical-purple to-prism-rose",
    count: "380+"
  },
  {
    title: "Conscious Creators",
    description: "Artists, writers, and creators inspired by spiritual practices",
    icon: Star,
    gradient: "from-nature-green to-water-blue",
    count: "620+"
  },
  {
    title: "Sacred Guardians",
    description: "Protectors of ancient traditions and sacred spaces",
    icon: Flame,
    gradient: "from-earth-brown to-sacred-copper",
    count: "300+"
  }
]

const featuredMembers = [
  {
    name: "María Esperanza",
    role: "Traditional Curandera",
    location: "Tepoztlán, Morelos",
    bio: "Guardian of ancestral healing wisdom with 30 years of experience in plant medicine and energy healing.",
    avatar: "🌿",
    specialties: ["Plant Medicine", "Energy Healing", "Ancestral Wisdom"],
    rating: 4.9,
    sessions: 450
  },
  {
    name: "Carlos Itzelcoatl",
    role: "Temazcal Master",
    location: "Amatlán, Morelos", 
    bio: "Keeper of the sacred sweat lodge traditions, leading transformational ceremonies for spiritual rebirth.",
    avatar: "🔥",
    specialties: ["Temazcal", "Sacred Fire", "Purification"],
    rating: 5.0,
    sessions: 680
  },
  {
    name: "Luna Riverwind",
    role: "Sound Healer",
    location: "Cuernavaca, Morelos",
    bio: "Weaving ancient sound frequencies with modern healing modalities for deep spiritual transformation.",
    avatar: "🎵",
    specialties: ["Sound Bath", "Crystal Singing", "Meditation"],
    rating: 4.8,
    sessions: 320
  },
  {
    name: "Diego Xochitl",
    role: "Sacred Artist",
    location: "Tlayacapan, Morelos",
    bio: "Creating visionary art inspired by plant medicine journeys and ancient Mexican symbolism.",
    avatar: "🎨",
    specialties: ["Visionary Art", "Sacred Symbols", "Workshops"],
    rating: 4.9,
    sessions: 180
  }
]

const upcomingEvents = [
  {
    title: "Full Moon Temazcal Ceremony",
    date: "Dec 15, 2025",
    time: "7:00 PM - 10:00 PM",
    location: "Sacred Fire Circle, Amatlán",
    attendees: 24,
    maxAttendees: 30,
    type: "Ceremony",
    featured: true
  },
  {
    title: "Plant Medicine Integration Circle",
    date: "Dec 18, 2025", 
    time: "6:00 PM - 8:00 PM",
    location: "Community Center, Tepoztlán",
    attendees: 18,
    maxAttendees: 25,
    type: "Workshop"
  },
  {
    title: "Sacred Art & Creativity Workshop",
    date: "Dec 22, 2025",
    time: "10:00 AM - 4:00 PM", 
    location: "Art Studio, Cuernavaca",
    attendees: 12,
    maxAttendees: 20,
    type: "Workshop"
  },
  {
    title: "Winter Solstice Celebration",
    date: "Dec 21, 2025",
    time: "6:00 PM - 12:00 AM",
    location: "Temple of the Feathered Serpent",
    attendees: 85,
    maxAttendees: 100,
    type: "Celebration",
    featured: true
  }
]

// Hero Section Component
function CommunityHero() {
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-950 to-prism-sunset/10">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-prism-sunset/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-prism-amber/15 via-transparent to-mystical-purple/10" />
      </div>

      {/* Floating Particles */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {particlePositions.slice(0, 15).map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              initial={{ x: pos.x, y: pos.y, opacity: 0 }}
              animate={{ 
                y: [pos.y, pos.y - 200], 
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

      {/* Hero Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 text-center max-w-4xl mx-auto px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <Badge className="bg-prism-sunset/20 text-prism-amber border-prism-amber/30 px-4 py-2 text-sm font-medium">
            <Users className="w-4 h-4 mr-2" />
            Join Our Sacred Community
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold mb-8 text-white"
        >
          Sacred
          <span className="text-kinetic block mt-2">
            Community
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed"
        >
          Connect with kindred spirits on the path of awakening. Share wisdom, 
          participate in ceremonies, and grow together in our thriving spiritual ecosystem.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button 
            size="lg"
            className="btn-luxury text-white font-semibold px-8 py-4 text-lg accessible-luxury hover-lift relative overflow-hidden group"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            <span className="relative z-10">Join Our Circle</span>
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
            <Eye className="w-5 h-5 mr-2" />
            Explore Community
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

// Community Stats Component
function CommunityStatsSection() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-black to-gray-950 overflow-hidden">
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
            Our Growing <span className="text-kinetic">Sacred Circle</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Numbers that reflect the power of spiritual community and collective awakening
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {communityStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="crystal-panel-luxury rounded-2xl p-8 hover:scale-105 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-prism-sunset/10 to-prism-amber/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-prism-sunset to-prism-amber rounded-full mb-6 group-hover:animate-breathe">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2 text-kinetic-subtle">
                    {stat.number}
                  </div>
                  <div className="text-white/70 text-lg">
                    {stat.label}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Member Types Section
function MemberTypesSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const [hoveredType, setHoveredType] = useState<string | null>(null)

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-gray-950 via-black to-gray-950 overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }, (_, i) => {
          const x = (i % 4) * 300 + 150
          const y = Math.floor(i / 4) * 400 + 200
          return (
            <motion.div
              key={i}
              className="absolute w-32 h-32 rounded-full opacity-5"
              style={{
                background: `radial-gradient(circle, ${['#f97316', '#fbbf24', '#f472b6', '#8b5cf6'][i % 4]} 0%, transparent 70%)`
              }}
              animate={{
                x: [x, x + 50, x],
                y: [y, y - 30, y],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 8 + (i % 3) * 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          )
        })}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Sacred <span className="text-kinetic">Archetypes</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Discover your spiritual archetype and connect with like-minded souls 
            on similar paths of awakening and transformation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {memberTypes.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
              onMouseEnter={() => setHoveredType(type.title)}
              onMouseLeave={() => setHoveredType(null)}
            >
              <div className="crystal-panel-luxury rounded-2xl p-8 hover:scale-105 transition-all duration-500 relative overflow-hidden h-full">
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${type.gradient}`} />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${type.gradient} group-hover:animate-breathe transition-all duration-300`}>
                      <type.icon className="w-8 h-8 text-white" />
                    </div>
                    <Badge className="bg-white/10 text-white border-white/20">
                      {type.count}
                    </Badge>
                  </div>

                  <h3 className={`text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${type.gradient}`}>
                    {type.title}
                  </h3>

                  <p className="text-white/70 text-lg leading-relaxed mb-6">
                    {type.description}
                  </p>

                  <motion.div
                    animate={{
                      opacity: hoveredType === type.title ? 1 : 0,
                      y: hoveredType === type.title ? 0 : 20
                    }}
                    className="flex items-center text-prism-amber hover:text-prism-sunset transition-colors cursor-pointer"
                  >
                    <span className="font-medium mr-2">Connect with {type.title}</span>
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

// Featured Members Section
function FeaturedMembersSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  // const [currentMember, setCurrentMember] = useState(0)

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-gray-950 to-black overflow-hidden">
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
            Sacred <span className="text-kinetic">Wisdom Keepers</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Meet the extraordinary souls who guide our community with ancient wisdom and modern insight
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="crystal-panel-luxury rounded-2xl p-6 hover:scale-105 transition-all duration-500 relative overflow-hidden h-full">
                <div className="relative z-10">
                  {/* Avatar */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-prism-sunset to-prism-amber rounded-full text-3xl mb-4 group-hover:animate-breathe">
                      {member.avatar}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-prism-amber font-medium mb-2">{member.role}</p>
                    <div className="flex items-center justify-center text-white/60 text-sm">
                      <MapPin className="w-3 h-3 mr-1" />
                      {member.location}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    {member.bio}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {member.specialties.map((specialty) => (
                      <Badge 
                        key={specialty}
                        className="bg-white/10 text-white/80 border-white/20 text-xs"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-prism-amber mr-1" />
                      <span className="text-white font-medium">{member.rating}</span>
                    </div>
                    <div className="text-white/60 text-sm">
                      {member.sessions} sessions
                    </div>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-prism-sunset/10 to-prism-amber/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Upcoming Events Section
function UpcomingEventsSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'Ceremony': return Flame
      case 'Workshop': return Leaf  
      case 'Celebration': return Star
      default: return Calendar
    }
  }

  const getEventTypeGradient = (type: string) => {
    switch (type) {
      case 'Ceremony': return 'from-orange-600 to-red-600'
      case 'Workshop': return 'from-green-600 to-emerald-600' 
      case 'Celebration': return 'from-purple-600 to-pink-600'
      default: return 'from-blue-600 to-cyan-600'
    }
  }

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden">
      {/* Animated Background */}
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
            Sacred <span className="text-kinetic">Gatherings</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Join us for transformational ceremonies, healing workshops, and community celebrations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {upcomingEvents.map((event, index) => {
            const IconComponent = getEventTypeIcon(event.type)
            const gradient = getEventTypeGradient(event.type)
            const progressPercentage = (event.attendees / event.maxAttendees) * 100

            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative ${event.featured ? 'md:col-span-2' : ''}`}
                onMouseEnter={() => setHoveredEvent(event.title)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                <div className={`crystal-panel-luxury rounded-2xl p-8 hover:scale-105 transition-all duration-500 relative overflow-hidden ${
                  event.featured ? 'border-2 border-prism-amber/30' : ''
                }`}>
                  {event.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-prism-sunset/20 text-prism-amber border-prism-amber/30">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${gradient} group-hover:animate-breathe`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <Badge className="bg-white/10 text-white border-white/20">
                        {event.type}
                      </Badge>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4">
                      {event.title}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center text-white/70">
                        <Calendar className="w-4 h-4 mr-2 text-prism-amber" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-white/70">
                        <Clock className="w-4 h-4 mr-2 text-prism-amber" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-white/70 md:col-span-2">
                        <MapPin className="w-4 h-4 mr-2 text-prism-amber" />
                        {event.location}
                      </div>
                    </div>

                    {/* Attendance Progress */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/70 text-sm">
                          {event.attendees} of {event.maxAttendees} spots filled
                        </span>
                        <span className="text-prism-amber text-sm font-medium">
                          {Math.round(progressPercentage)}%
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-prism-sunset to-prism-amber h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${progressPercentage}%` } : {}}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                    </div>

                    <motion.div
                      animate={{
                        opacity: hoveredEvent === event.title ? 1 : 0.7,
                        scale: hoveredEvent === event.title ? 1.05 : 1
                      }}
                      className="flex items-center justify-between"
                    >
                      <Button 
                        className="btn-luxury text-white font-semibold px-6 py-2 accessible-luxury hover-lift"
                        size="sm"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Join Event
                      </Button>
                      
                      <div className="flex items-center text-white/60 text-sm">
                        <Users className="w-4 h-4 mr-1" />
                        {event.attendees} attending
                      </div>
                    </motion.div>
                  </div>

                  {/* Hover Glow */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${gradient}`} />
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Join Community Section
function JoinCommunitySection() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interests: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-black via-gray-950 to-prism-sunset/10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-prism-amber/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-prism-sunset/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Begin Your <span className="text-kinetic">Sacred Journey</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Ready to connect with like-minded souls? Join our thriving community and 
            embark on a transformational journey of spiritual growth.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="crystal-panel-luxury rounded-2xl p-8 md:p-12 relative overflow-hidden"
        >
          <div className="relative z-10">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Sacred Name</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-prism-amber"
                    placeholder="Your spiritual name or given name"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Email</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-prism-amber"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Spiritual Interests</label>
                <Input
                  name="interests"
                  value={formData.interests}
                  onChange={handleInputChange}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-prism-amber"
                  placeholder="Temazcal, Plant Medicine, Energy Healing, etc."
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Your Sacred Intention</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-prism-amber min-h-[120px]"
                  placeholder="Share what calls you to this spiritual community and what you hope to experience..."
                />
              </div>

              <div className="text-center pt-6">
                <Button 
                  size="lg"
                  className="btn-luxury text-white font-semibold px-12 py-4 text-lg accessible-luxury hover-lift relative overflow-hidden group"
                  type="submit"
                >
                  <Send className="w-5 h-5 mr-2" />
                  <span className="relative z-10">Join Our Sacred Circle</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-prism-amber to-prism-rose opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                  />
                </Button>
              </div>
            </form>
          </div>

          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-prism-sunset/5 to-prism-amber/5" />
        </motion.div>
      </div>
    </section>
  )
}

export default function CommunityPage() {
  return (
    <div className="min-h-screen">
      <CommunityHero />
      <CommunityStatsSection />
      <MemberTypesSection />
      <FeaturedMembersSection />
      <UpcomingEventsSection />
      <JoinCommunitySection />
    </div>
  )
}