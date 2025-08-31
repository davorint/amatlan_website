'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Star, 
  Heart,
  Share2,
  Sparkles,
  Flame,
  Leaf,
  Moon,
  Sun,
  Camera,
  Shield,
  Award,
  CheckCircle,
  ArrowRight,
  MessageCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link } from '@/i18n/routing'

// Sample temazcal data (this would come from your API/database)
const sampleTemazcal = {
  id: "nahual-temazcal",
  title: "Temazcal Nahual",
  subtitle: "Sacred Fire Purification Ceremony",
  description: "Experience the ancient Mexican purification ritual in an authentic temazcal lodge. Connect with your inner spirit through sacred heat, medicinal plants, and ceremonial chanting guided by a traditional temazcalero.",
  longDescription: "The Temazcal Nahual is more than a sweat lodge experience—it's a spiritual rebirth ceremony that has been practiced for over 1,000 years. This sacred ritual takes place in a dome-shaped structure representing the womb of Mother Earth, where volcanic stones heated by sacred fire create steam with medicinal plants like copal, sage, and eucalyptus.",
  price: 850,
  currency: "MXN",
  duration: 120,
  capacity: 8,
  rating: 4.9,
  reviewCount: 127,
  category: "TEMAZCAL",
  featured: true,
  verified: true,
  images: [
    "/images/temazcal-nahual-1.jpg",
    "/images/temazcal-nahual-2.jpg",
    "/images/temazcal-nahual-3.jpg",
    "/images/temazcal-nahual-4.jpg"
  ],
  facilitator: {
    name: "Maestro Itzel Coatl",
    title: "Traditional Temazcalero",
    experience: "15+ years",
    avatar: "/images/facilitators/itzel-coatl.jpg",
    bio: "Descendant of ancient Nahuatl lineage, Maestro Itzel has dedicated his life to preserving the sacred temazcal traditions."
  },
  location: {
    name: "Sacred Grove Sanctuary",
    address: "Amatlán de Quetzalcóatl, Morelos",
    coordinates: { lat: 18.9547, lng: -99.0567 }
  },
  benefits: [
    "Deep physical and spiritual purification",
    "Release of toxins and negative energy",
    "Enhanced circulation and immune system",
    "Emotional healing and stress relief",
    "Connection with ancestral wisdom",
    "Increased mental clarity and focus"
  ],
  includes: [
    "Traditional temazcal ceremony (2 hours)",
    "Sacred medicinal plant infusions",
    "Ceremonial cacao before the ritual",
    "Ancestral chanting and prayers",
    "Cool spring water for hydration",
    "Traditional blanket and towel"
  ],
  whatToBring: [
    "Comfortable, natural fabric clothing",
    "Swimwear or shorts",
    "Water bottle",
    "Open heart and mind",
    "Small offering for the ceremony (optional)"
  ],
  schedule: [
    { time: "16:00", activity: "Arrival and welcome ceremony" },
    { time: "16:30", activity: "Ceremonial cacao and intention setting" },
    { time: "17:00", activity: "Sacred fire lighting ritual" },
    { time: "17:30", activity: "Temazcal purification ceremony" },
    { time: "19:30", activity: "Cool-down and integration circle" },
    { time: "20:00", activity: "Closing gratitude ceremony" }
  ],
  nextAvailable: "2025-01-15",
  bookingNotice: "Book 48 hours in advance for sacred preparation"
}

export default function TemazcalDetailPage() {
  const params = useParams()
  const t = useTranslations()
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'experience', label: 'The Experience', icon: Flame },
    { id: 'facilitator', label: 'Your Guide', icon: Sun },
    { id: 'location', label: 'Sacred Place', icon: MapPin },
    { id: 'reviews', label: 'Testimonials', icon: MessageCircle }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 -left-20 w-80 h-80 bg-orange-500 rounded-full blur-3xl animate-breathe" />
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-amber-500 rounded-full blur-3xl animate-float" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-white/60 mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/temazcales" className="hover:text-white transition-colors">Temazcales</Link>
              <span>/</span>
              <span className="text-white">{sampleTemazcal.title}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0">
                    <Flame className="w-3 h-3 mr-1" />
                    Sacred Temazcal
                  </Badge>
                  {sampleTemazcal.verified && (
                    <Badge variant="outline" className="text-emerald-400 border-emerald-400/30">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                  {sampleTemazcal.title}
                </h1>
                
                <p className="text-xl text-orange-200 mb-6 font-medium">
                  {sampleTemazcal.subtitle}
                </p>

                <p className="text-lg text-white/80 leading-relaxed mb-8">
                  {sampleTemazcal.description}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center space-x-2 text-white/80">
                    <Star className="w-5 h-5 text-amber-400 fill-current" />
                    <span className="font-semibold text-white">{sampleTemazcal.rating}</span>
                    <span>({sampleTemazcal.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/80">
                    <Clock className="w-5 h-5 text-orange-400" />
                    <span>{sampleTemazcal.duration} minutes</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/80">
                    <Users className="w-5 h-5 text-amber-400" />
                    <span>Max {sampleTemazcal.capacity} people</span>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center justify-between bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">
                      ${sampleTemazcal.price} {sampleTemazcal.currency}
                    </div>
                    <p className="text-white/60">per person</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white/20 text-white hover:bg-white/10"
                      onClick={() => setIsFavorited(!isFavorited)}
                    >
                      <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current text-red-400' : ''}`} />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8"
                    >
                      Book Sacred Experience
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={sampleTemazcal.images[selectedImage]}
                    alt={sampleTemazcal.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-black/20 border-white/20 text-white hover:bg-black/40"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      View All {sampleTemazcal.images.length}
                    </Button>
                  </div>
                </div>
                
                {/* Image Thumbnails */}
                <div className="flex space-x-2 mt-4">
                  {sampleTemazcal.images.slice(0, 4).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative flex-1 aspect-video rounded-lg overflow-hidden transition-all ${
                        selectedImage === index 
                          ? 'ring-2 ring-orange-500 scale-105' 
                          : 'hover:scale-102 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${sampleTemazcal.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-12 border-b border-white/10 pb-4">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && (
                <div className="grid lg:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">Sacred Purification Journey</h3>
                    <p className="text-white/80 leading-relaxed mb-8">
                      {sampleTemazcal.longDescription}
                    </p>
                    
                    <h4 className="text-xl font-bold text-white mb-4">Spiritual Benefits</h4>
                    <ul className="space-y-3">
                      {sampleTemazcal.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-white/80">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                    <h4 className="text-xl font-bold text-white mb-6">What's Included</h4>
                    <ul className="space-y-3 mb-8">
                      {sampleTemazcal.includes.map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <Sparkles className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                          <span className="text-white/80">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <h4 className="text-lg font-bold text-white mb-4">What to Bring</h4>
                    <ul className="space-y-2">
                      {sampleTemazcal.whatToBring.map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <Leaf className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                          <span className="text-white/80 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'experience' && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-8">Sacred Ceremony Schedule</h3>
                  <div className="space-y-4">
                    {sampleTemazcal.schedule.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                        <div className="text-2xl font-bold text-amber-400 w-16">
                          {item.time}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">{item.activity}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add other tab content as needed */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Next Available & Booking Notice */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/20">
              <Calendar className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Next Available Ceremony</h3>
              <p className="text-lg text-orange-200 mb-6">
                January 15, 2025 at 4:00 PM
              </p>
              <p className="text-white/60 mb-8">
                {sampleTemazcal.bookingNotice}
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-12"
              >
                Reserve Your Sacred Space
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}