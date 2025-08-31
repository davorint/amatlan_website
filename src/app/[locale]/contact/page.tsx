'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  Sparkles,
  Heart,
  Star,
  Moon,
  Sun,
  MessageCircle,
  Calendar,
  Globe,
  Instagram,
  Facebook,
  Youtube,
  Shield,
  CheckCircle,
  Feather,
  Compass
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'

const contactMethods = [
  {
    icon: MessageCircle,
    title: "Sacred Messenger",
    description: "For immediate spiritual guidance and booking assistance",
    contact: "+52 777 123 4567",
    availability: "Daily 8:00 AM - 8:00 PM",
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: Mail,
    title: "Digital Correspondence",
    description: "For detailed inquiries and ceremony information",
    contact: "sacred@magicamatlan.com",
    availability: "Response within 24 hours",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Calendar,
    title: "Sacred Calendar",
    description: "Schedule a personal consultation call",
    contact: "Book consultation",
    availability: "Available Monday - Friday",
    color: "from-purple-500 to-violet-500"
  }
]

const locationInfo = {
  address: "Amatlán de Quetzalcóatl, Morelos, México",
  coordinates: "18°57′N 99°03′W",
  altitude: "1,200 meters above sea level",
  timezone: "Central Standard Time (CST)",
  nearestAirport: "Cuernavaca Airport (45 minutes)",
  nearestCity: "Tepoztlán (20 minutes)"
}

const socialLinks = [
  { icon: Instagram, name: "Instagram", handle: "@magicamatlan", color: "from-pink-500 to-rose-500" },
  { icon: Facebook, name: "Facebook", handle: "Magic Amatlán", color: "from-blue-600 to-blue-700" },
  { icon: Youtube, name: "YouTube", handle: "Magic Amatlán", color: "from-red-500 to-red-600" }
]

const inquiryTypes = [
  "Temazcal Ceremony",
  "Spiritual Retreat",
  "Healing Session",
  "Eco-Stay Accommodation",
  "Nature Experience",
  "Group Booking",
  "Custom Ceremony",
  "General Inquiry"
]

export default function ContactPage() {
  const t = useTranslations()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    preferredDate: '',
    groupSize: '',
    message: '',
    isFirstTime: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-breathe" />
          <div className="absolute bottom-20 -right-20 w-80 h-80 bg-amber-500 rounded-full blur-3xl animate-float" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-rose-500 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Feather className="w-6 h-6 text-amber-400 animate-pulse" />
                <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 text-sm">
                  Sacred Connection
                </Badge>
                <Feather className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8">
                Connect with the
                <span className="block bg-gradient-to-r from-orange-400 via-amber-400 to-orange-600 bg-clip-text text-transparent">
                  Sacred Circle
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/80 leading-relaxed mb-12 max-w-3xl mx-auto">
                Reach out to begin your transformative journey. Our wisdom keepers are here to guide 
                you toward the perfect sacred experience for your soul&rsquo;s calling.
              </p>

              <div className="flex items-center justify-center space-x-6 text-white/60">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span>Secure & Sacred</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <span>24h Response</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-rose-400" />
                  <span>Personal Guidance</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/10 shadow-2xl"
              >
                {!isSubmitted ? (
                  <>
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
                        <MessageCircle className="w-8 h-8 text-amber-400 mr-3" />
                        Begin Your Sacred Journey
                      </h2>
                      <p className="text-white/70">
                        Share your intentions and let us guide you to the perfect transformative experience.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Information */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-white font-medium">
                            Sacred Name *
                          </Label>
                          <Input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-amber-400 focus:ring-amber-400/20"
                            placeholder="How shall we address you?"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-white font-medium">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-amber-400 focus:ring-amber-400/20"
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-white font-medium">
                            WhatsApp/Phone
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-amber-400 focus:ring-amber-400/20"
                            placeholder="+52 777 123 4567"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="inquiryType" className="text-white font-medium">
                            Sacred Experience *
                          </Label>
                          <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange('inquiryType', value)}>
                            <SelectTrigger className="bg-white/5 border-white/20 text-white">
                              <SelectValue placeholder="Choose your calling..." />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-white/20">
                              {inquiryTypes.map((type) => (
                                <SelectItem key={type} value={type} className="text-white hover:bg-white/10">
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="preferredDate" className="text-white font-medium">
                            Preferred Date
                          </Label>
                          <Input
                            id="preferredDate"
                            type="date"
                            value={formData.preferredDate}
                            onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                            className="bg-white/5 border-white/20 text-white focus:border-amber-400 focus:ring-amber-400/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="groupSize" className="text-white font-medium">
                            Group Size
                          </Label>
                          <Input
                            id="groupSize"
                            type="number"
                            min="1"
                            max="20"
                            value={formData.groupSize}
                            onChange={(e) => handleInputChange('groupSize', e.target.value)}
                            className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-amber-400 focus:ring-amber-400/20"
                            placeholder="Number of souls"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-white font-medium">
                          Your Sacred Intention
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-amber-400 focus:ring-amber-400/20 min-h-[120px]"
                          placeholder="Share what calls you to this sacred journey. What healing, transformation, or experience are you seeking? Is this your first time with indigenous ceremonies?"
                        />
                      </div>

                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="firstTime"
                          checked={formData.isFirstTime}
                          onChange={(e) => handleInputChange('isFirstTime', e.target.checked)}
                          className="rounded border-white/20 bg-white/5 text-amber-500 focus:ring-amber-400/20"
                        />
                        <Label htmlFor="firstTime" className="text-white/80">
                          This is my first time experiencing indigenous ceremonies
                        </Label>
                      </div>

                      <Button 
                        type="submit" 
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-4 text-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                            Sending Sacred Message...
                          </>
                        ) : (
                          <>
                            Send Sacred Message
                            <Send className="w-5 h-5 ml-3" />
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Sacred Message Received
                    </h3>
                    <p className="text-white/70 mb-6 max-w-md mx-auto">
                      Your intention has been received by our wisdom keepers. We will respond within 24 hours with personalized guidance for your sacred journey.
                    </p>
                    <Button 
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Methods */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Compass className="w-6 h-6 text-amber-400 mr-3" />
                  Sacred Connections
                </h3>
                
                <div className="space-y-6">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon
                    return (
                      <div key={method.title} className="group">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-bold text-white mb-1">{method.title}</h4>
                        <p className="text-white/60 text-sm mb-2">{method.description}</p>
                        <p className="text-amber-400 font-medium mb-1">{method.contact}</p>
                        <p className="text-white/50 text-xs">{method.availability}</p>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Location Information */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <MapPin className="w-6 h-6 text-emerald-400 mr-3" />
                  Sacred Location
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-white font-medium mb-1">Address</p>
                    <p className="text-white/70 text-sm">{locationInfo.address}</p>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Coordinates</p>
                    <p className="text-amber-400 text-sm">{locationInfo.coordinates}</p>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Elevation</p>
                    <p className="text-white/70 text-sm">{locationInfo.altitude}</p>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Access</p>
                    <p className="text-white/70 text-sm">{locationInfo.nearestAirport}</p>
                    <p className="text-white/70 text-sm">{locationInfo.nearestCity}</p>
                  </div>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Globe className="w-6 h-6 text-blue-400 mr-3" />
                  Sacred Community
                </h3>
                
                <div className="space-y-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <button
                        key={social.name}
                        className="flex items-center space-x-3 w-full p-3 rounded-xl hover:bg-white/5 transition-colors group"
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${social.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="text-white font-medium">{social.name}</p>
                          <p className="text-white/60 text-sm">{social.handle}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Sacred Hours */}
      <section className="py-20 mt-20 bg-gradient-to-r from-orange-500/10 to-amber-500/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">
                Sacred Operating Hours
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <Sun className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-4">Spiritual Guidance</h3>
                  <div className="space-y-2 text-white/70">
                    <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 5:00 PM</p>
                    <p>Sunday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <Moon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-4">Emergency Support</h3>
                  <div className="space-y-2 text-white/70">
                    <p>WhatsApp: Available 24/7</p>
                    <p>For ceremony emergencies</p>
                    <p>and urgent spiritual guidance</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}