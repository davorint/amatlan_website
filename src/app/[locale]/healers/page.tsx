'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Star, Phone, Mail, Heart, Sparkles, Sun, Eye, Hand, Zap } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useInView } from 'react-intersection-observer'
import { useRef, useState } from 'react'

// Mock data - will be replaced with database queries
const healerProfiles = [
  {
    id: 'curandera-maria',
    name: 'Curandera María Xóchitl',
    title: 'Traditional Medicine Woman',
    description: 'Master of ancestral Mexican healing arts with 30+ years experience. Specializes in plant medicine, energy cleansing, and soul retrieval ceremonies.',
    location: 'Centro Histórico de Amatlán',
    specialties: ['Plant Medicine', 'Energy Healing', 'Soul Retrieval', 'Herbal Medicine'],
    languages: ['Spanish', 'Náhuatl', 'English'],
    experience: '30+ years',
    rating: 5.0,
    reviews: 127,
    price: 1500,
    priceUnit: 'session',
    availability: 'Mon-Sat',
    phone: '+52 777 123 4567',
    email: 'maria@healers-amatlan.com',
    verified: true,
    featured: true,
    approach: 'Traditional Mexican curanderismo'
  },
  {
    id: 'shaman-carlos',
    name: 'Shamán Carlos Tezcatlipoca',
    title: 'Aztec Wisdom Keeper',
    description: 'Hereditary shaman trained in Aztec traditions. Offers vision quests, fire ceremonies, and ancestral healing through sacred cacao and copal rituals.',
    location: 'Cerro del Tepozteco',
    specialties: ['Vision Quests', 'Fire Ceremony', 'Cacao Ceremonies', 'Ancestral Healing'],
    languages: ['Spanish', 'Náhuatl'],
    experience: '25+ years',
    rating: 4.9,
    reviews: 89,
    price: 2500,
    priceUnit: 'ceremony',
    availability: 'Fri-Sun',
    phone: '+52 777 234 5678',
    email: 'carlos@sacred-traditions.mx',
    verified: true,
    featured: true,
    approach: 'Aztec shamanic traditions'
  },
  {
    id: 'sobadora-elena',
    name: 'Sobadora Elena Corazón',
    title: 'Master Bodywork Healer',
    description: 'Expert in traditional Mexican sobadoria (healing massage). Specializes in spiritual cleansing through bodywork, chakra alignment, and energy balancing.',
    location: 'Jardines Curativos',
    specialties: ['Sobadoria Massage', 'Chakra Healing', 'Energy Balancing', 'Spiritual Cleansing'],
    languages: ['Spanish', 'English'],
    experience: '20+ years',
    rating: 4.8,
    reviews: 156,
    price: 800,
    priceUnit: 'session',
    availability: 'Daily',
    phone: '+52 777 345 6789',
    email: 'elena@bodywork-healing.com',
    verified: true,
    featured: false,
    approach: 'Traditional Mexican sobadoria'
  },
  {
    id: 'partero-miguel',
    name: 'Partero Miguel Águila',
    title: 'Sacred Birth Keeper',
    description: 'Traditional midwife and birth keeper with deep knowledge of women\'s health, fertility, and life transitions. Offers prenatal care and sacred birth ceremonies.',
    location: 'Casa de Nacimientos',
    specialties: ['Sacred Birth', 'Women\'s Health', 'Fertility Healing', 'Life Transitions'],
    languages: ['Spanish', 'English'],
    experience: '15+ years',
    rating: 5.0,
    reviews: 78,
    price: 1200,
    priceUnit: 'consultation',
    availability: 'On-call',
    phone: '+52 777 456 7890',
    email: 'miguel@sacred-birth.mx',
    verified: true,
    featured: false,
    approach: 'Traditional midwifery'
  },
  {
    id: 'h-woman-rosa',
    name: 'Medicina Mujer Rosa Luna',
    title: 'Plant Medicine Specialist',
    description: 'Keeper of sacred plant wisdom with expertise in microdosing, plant dietas, and feminine healing circles. Trained with indigenous healers across Mexico.',
    location: 'Jardín de Plantas Sagradas',
    specialties: ['Plant Dietas', 'Microdosing', 'Women\'s Circles', 'Herbal Alchemy'],
    languages: ['Spanish', 'English', 'Portuguese'],
    experience: '12+ years',
    rating: 4.9,
    reviews: 92,
    price: 1800,
    priceUnit: 'ceremony',
    availability: 'New Moon cycles',
    phone: '+52 777 567 8901',
    email: 'rosa@plant-medicine.mx',
    verified: true,
    featured: true,
    approach: 'Sacred plant medicine'
  },
  {
    id: 'curandero-ancient',
    name: 'Curandero Tonatiuh Sol',
    title: 'Ancient Solar Wisdom',
    description: 'Hereditary healer specializing in solar ceremonies, crystal healing, and masculine sacred work. Combines ancient wisdom with modern healing techniques.',
    location: 'Templo del Sol',
    specialties: ['Solar Ceremonies', 'Crystal Healing', 'Men\'s Work', 'Ancient Wisdom'],
    languages: ['Spanish', 'Náhuatl', 'English'],
    experience: '18+ years',
    rating: 4.7,
    reviews: 134,
    price: 2000,
    priceUnit: 'ceremony',
    availability: 'Weekends',
    phone: '+52 777 678 9012',
    email: 'tonatiuh@solar-healing.mx',
    verified: true,
    featured: false,
    approach: 'Solar shamanism'
  }
]

const specialtyIcons = {
  'Plant Medicine': Sparkles,
  'Energy Healing': Zap,
  'Soul Retrieval': Heart,
  'Herbal Medicine': Sparkles,
  'Vision Quests': Eye,
  'Fire Ceremony': Sun,
  'Cacao Ceremonies': Heart,
  'Ancestral Healing': Sparkles,
  'Sobadoria Massage': Hand,
  'Chakra Healing': Zap,
  'Energy Balancing': Zap,
  'Spiritual Cleansing': Sparkles,
  'Sacred Birth': Heart,
  'Women\'s Health': Heart,
  'Fertility Healing': Heart,
  'Life Transitions': Sparkles,
  'Plant Dietas': Sparkles,
  'Microdosing': Sparkles,
  'Women\'s Circles': Heart,
  'Herbal Alchemy': Sparkles,
  'Solar Ceremonies': Sun,
  'Crystal Healing': Sparkles,
  'Men\'s Work': Sun,
  'Ancient Wisdom': Eye,
}

export default function HealersPage() {
  // const t = useTranslations('Healers')
  const tCommon = useTranslations('Common')
  // const [selectedSpecialty, setSelectedSpecialty] = useState('all')
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
          <div className="absolute inset-0 bg-gradient-radial from-[var(--color-mystical-purple)]/10 via-transparent to-transparent" />
          
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
            className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-gradient-to-br from-[var(--color-mystical-purple)]/25 to-[var(--color-prism-rose)]/15 blur-3xl"
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
            className="absolute top-3/4 right-1/3 w-32 h-32 rounded-full bg-gradient-to-tr from-[var(--color-prism-rose)]/35 to-[var(--color-spiritual-gold)]/20 blur-2xl"
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
            className="absolute bottom-1/4 left-1/3 w-48 h-48 rounded-full bg-gradient-to-bl from-[var(--color-prism-sunset)]/20 to-[var(--color-mystical-purple)]/10 blur-3xl"
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
            <Heart className="w-5 h-5 text-[var(--color-prism-rose)] animate-breathe-glow" />
            <span className="text-base font-semibold text-white/95 tracking-wide">Sacred Healing Masters</span>
            <Sparkles className="w-5 h-5 text-[var(--color-mystical-purple)] animate-breathe-glow" />
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
              Healers
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 1, ease: [0.19, 1, 0.22, 1] }}
            className="text-xl md:text-2xl lg:text-3xl text-white/85 mb-16 max-w-4xl mx-auto leading-relaxed font-light tracking-wide text-shadow-soft"
          >
            Connect with authentic{' '}
            <span className="text-kinetic-subtle font-semibold">
              traditional healers
            </span>{' '}
            preserving ancient Mexican wisdom, curanderismo practices, and sacred healing arts for modern transformation and spiritual awakening.
          </motion.p>

          {/* Enhanced Specialty Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {[
              { icon: Heart, text: 'Curanderismo', color: 'from-pink-600 to-rose-600' },
              { icon: Sparkles, text: 'Plant Medicine', color: 'from-green-600 to-emerald-600' },
              { icon: Zap, text: 'Energy Healing', color: 'from-purple-600 to-indigo-600' },
              { icon: Eye, text: 'Soul Work', color: 'from-amber-600 to-orange-600' }
            ].map((badge, index) => (
              <motion.div
                key={badge.text}
                className="crystal-panel group relative overflow-hidden rounded-full px-6 py-3"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
              >
                <span className={`absolute inset-0 bg-gradient-to-r ${badge.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <span className="relative flex items-center space-x-2 text-white font-medium">
                  <badge.icon className="h-4 w-4" />
                  <span>{badge.text}</span>
                </span>
              </motion.div>
            ))}
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
                className={`absolute rounded-full blur-sm ${i % 3 === 0 ? 'bg-[var(--color-mystical-purple)]' : i % 3 === 1 ? 'bg-[var(--color-prism-rose)]' : 'bg-[var(--color-spiritual-gold)]'}`}
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

      {/* Healers Grid */}
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">
                Traditional Healers
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Verified practitioners carrying forward generations of healing wisdom
            </p>
            <div className="text-sm text-white/40 mt-4">
              {healerProfiles.length} healers ready to serve
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {healerProfiles.map((healer, index) => (
              <motion.div
                key={healer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, z: 10 }}
                className="group"
              >
                <Card className="overflow-hidden bg-gradient-to-br from-black/80 to-gray-900/60 border-white/10 backdrop-blur-xl hover:shadow-2xl transition-all duration-500">
                  <div className="relative">
                    <div className="flex justify-between items-start p-4">
                      {healer.featured && (
                        <Badge className="bg-purple-500 text-white">
                          {tCommon('featured')}
                        </Badge>
                      )}
                      
                      {healer.verified && (
                        <div className="bg-green-500/90 backdrop-blur-sm rounded-full px-2 py-1 ml-auto">
                          <span className="text-xs font-bold text-white flex items-center">
                            ✓ {tCommon('verified')}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="h-40 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-rose-500/20 flex items-center justify-center relative overflow-hidden">
                      {/* Animated background pattern */}
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 via-transparent to-transparent" />
                      </div>
                      <Heart className="h-16 w-16 text-white/60 relative z-10" />
                      
                      {/* Healing energy animation */}
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-purple-400/60 rounded-full"
                          animate={{
                            scale: [0, 1.5, 0],
                            opacity: [0, 0.8, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.4,
                          }}
                          style={{
                            left: '50%',
                            top: '50%',
                            transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-20px)`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                          {healer.name}
                        </h3>
                        <p className="text-purple-300 text-sm font-medium">{healer.title}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-white">{healer.rating}</span>
                        <span className="text-sm text-white/60">({healer.reviews})</span>
                      </div>
                    </div>
                    
                    <p className="text-white/70 text-sm leading-relaxed mb-3">
                      {healer.description}
                    </p>
                    
                    <div className="text-xs text-white/60 mb-2">
                      Experience: {healer.experience} • {healer.approach}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-white/60">
                        <MapPin className="h-4 w-4" />
                        <span>{healer.location}</span>
                      </div>
                      <div className="text-sm text-white/60">
                        Available: {healer.availability}
                      </div>
                      <div className="text-sm text-white/60">
                        Languages: {healer.languages.join(', ')}
                      </div>
                    </div>
                    
                    {/* Specialties */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-white/80 mb-2">Specialties:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {healer.specialties.slice(0, 4).map((specialty) => {
                          const IconComponent = specialtyIcons[specialty as keyof typeof specialtyIcons] || Sparkles
                          return (
                            <div key={specialty} className="flex items-center space-x-1 text-xs text-purple-300">
                              <IconComponent className="h-3 w-3" />
                              <span className="truncate">{specialty}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    
                    {/* Contact */}
                    <div className="flex items-center space-x-3 mb-4 text-xs text-white/60">
                      <div className="flex items-center space-x-1">
                        <Phone className="h-3 w-3" />
                        <span className="truncate">{healer.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{healer.email.split('@')[0]}@...</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-xl font-bold text-white">
                        ${healer.price.toLocaleString()}
                        <span className="text-sm font-normal text-white/60 ml-1">/{healer.priceUnit}</span>
                      </div>
                      <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-rose-500 text-white">
                        <Link href={`/healers/${healer.id}` as never}>
                          Contact
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

      {/* Healing Traditions Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-white">
                Ancient Wisdom, Modern Healing
              </h2>
              <div className="space-y-4 text-white/90 text-lg">
                <p>Our healers represent unbroken lineages of Mexican traditional medicine, combining ancient wisdom with compassionate modern practice.</p>
                <p>Each practitioner has been verified for authenticity, training, and ethical practice, ensuring you receive genuine traditional healing.</p>
                <p>Experience the profound transformation that comes from working with master healers who bridge worlds between ancient and modern healing arts.</p>
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
                <Sparkles className="h-6 w-6 mr-3 text-pink-300" />
                Healing Modalities
              </h3>
              <ul className="space-y-4 text-white/90">
                {[
                  'Traditional Mexican Curanderismo',
                  'Sacred plant medicine ceremonies', 
                  'Energy healing and soul retrieval',
                  'Ancestral healing and past-life work',
                  'Women\'s and men\'s sacred circles',
                  'Crystal and sound healing practices'
                ].map((modality, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <span className="text-pink-300 text-xl">✦</span>
                    <span>{modality}</span>
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