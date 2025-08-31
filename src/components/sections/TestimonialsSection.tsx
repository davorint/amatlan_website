'use client'

import { motion } from "motion/react"
import { Star, Quote, Heart, Sparkles } from "lucide-react"
import { useState } from "react"
// import { useTranslations } from 'next-intl'

export function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  // const t = useTranslations('Testimonials')

  const testimonials = [
    {
      name: "Sarah Mitchell",
      location: "Los Angeles, CA",
      experience: "7-Day Transformation Retreat",
      rating: 5,
      quote: "The Temazcal ceremony at Magic Amatlán was the most profound spiritual experience of my life. I entered feeling lost and disconnected, but emerged with a deep sense of purpose and inner peace. The curanderos held space with such wisdom and compassion.",
      transformation: "Found her life purpose",
      avatar: "SM",
      color: "prism-sunset"
    },
    {
      name: "Marcus Rodriguez",
      location: "Mexico City, MX", 
      experience: "Plant Medicine Journey",
      rating: 5,
      quote: "As someone who was skeptical about spiritual healing, Magic Amatlán completely shifted my perspective. The plant medicine ceremony guided me through healing trauma I didn't even know I was carrying. Life-changing doesn't begin to describe it.",
      transformation: "Healed generational trauma",
      avatar: "MR",
      color: "nature-green"
    },
    {
      name: "Elena Vasquez",
      location: "Barcelona, Spain",
      experience: "Crystal Water Healing",
      rating: 5,
      quote: "The sacred springs at Amatlán hold incredible healing power. During my crystal water immersion, I felt layers of stress and anxiety just dissolve away. The natural setting combined with the ceremonial approach created pure magic.",
      transformation: "Released chronic anxiety",
      avatar: "EV",
      color: "water-blue"
    },
    {
      name: "David Chen",
      location: "Toronto, Canada",
      experience: "Solar Activation Ceremony",
      rating: 5,
      quote: "Watching the sunrise during the solar activation ceremony while practicing ancient breathwork was transcendent. I've never felt so connected to the natural world and my own inner light. The experience stays with me daily.",
      transformation: "Connected with inner light",
      avatar: "DC",
      color: "spiritual-gold"
    },
    {
      name: "Isabella Santos",
      location: "São Paulo, Brazil",
      experience: "Full Moon Ceremony",
      rating: 5,
      quote: "The full moon ceremony under Amatlán's star-filled sky was mystical beyond words. Dancing around the sacred fire with people from around the world, I felt part of something ancient and eternal. My creativity has been flowing ever since.",
      transformation: "Unlocked creative flow",
      avatar: "IS",
      color: "prism-rose"
    }
  ]

  return (
    <section id="testimonials" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 crystal-panel rounded-full">
            <Heart className="w-4 h-4 text-[var(--color-prism-rose)]" />
            <span className="text-sm font-medium text-white/90">Sacred Testimonials</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-kinetic">Transformations</span>
          </h2>
          
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Real stories from souls transformed through sacred experiences in Amatlán
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Testimonial Content */}
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="crystal-panel p-8 lg:p-12"
          >
            {/* Quote Icon */}
            <Quote className="w-12 h-12 text-[var(--color-prism-amber)] mb-6" />
            
            {/* Rating */}
            <div className="flex items-center space-x-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-[var(--color-spiritual-gold)] text-[var(--color-spiritual-gold)]"
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 font-light italic">
              &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
            </blockquote>

            {/* Transformation Highlight */}
            <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-gradient-to-r from-[var(--color-prism-sunset)]/20 to-[var(--color-prism-amber)]/20 rounded-full border border-[var(--color-prism-sunset)]/30">
              <Sparkles className="w-4 h-4 text-[var(--color-prism-amber)]" />
              <span className="text-sm font-medium text-[var(--color-prism-amber)]">
                {testimonials[activeTestimonial].transformation}
              </span>
            </div>

            {/* Author */}
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-${testimonials[activeTestimonial].color})] to-[var(--color-prism-amber)] flex items-center justify-center text-white font-bold`}>
                {testimonials[activeTestimonial].avatar}
              </div>
              <div>
                <div className="font-semibold text-white">
                  {testimonials[activeTestimonial].name}
                </div>
                <div className="text-sm text-white/60">
                  {testimonials[activeTestimonial].location} • {testimonials[activeTestimonial].experience}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Testimonial Navigation */}
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-left p-6 rounded-xl transition-all duration-300 ${
                  activeTestimonial === index
                    ? 'crystal-panel'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-${testimonial.color})] to-[var(--color-prism-amber)] flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white truncate">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-white/60 truncate">
                      {testimonial.experience}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-[var(--color-spiritual-gold)] text-[var(--color-spiritual-gold)]"
                      />
                    ))}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 crystal-panel p-8"
        >
          {[
            { value: "4.9/5", label: 'Average Rating', icon: Star },
            { value: "2,500+", label: 'Transformed Lives', icon: Heart },
            { value: "98%", label: 'Life-Changing Experiences', icon: Sparkles },
            { value: "50+", label: 'Countries Represented', icon: Quote }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.19, 1, 0.22, 1]
              }}
              className="text-center group"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-[var(--color-prism-sunset)] animate-breathe" />
              <div className="text-2xl md:text-3xl font-bold text-kinetic mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/60">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}