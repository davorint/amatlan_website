'use client'

import { motion } from "motion/react"
import { Calendar, Users, Heart, Star } from "lucide-react"
import { HeroSection } from "@/components/sections/HeroSection"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { LocationSection } from "@/components/sections/LocationSection"
import { CTASection } from "@/components/sections/CTASection"
// import { LunarCalendarSection } from "@/components/sections/LunarCalendarSection" // Temporarily disabled due to prerender issue
import { Navigation } from "@/components/navigation/Navigation"

export default function HomePage() {
  return (
    <main className="relative">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Enhanced Sacred Statistics */}
      <section className="py-32 relative overflow-hidden">
        {/* Background ambient elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-prism-sunset)]/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--color-prism-amber)]/5 rounded-full blur-3xl" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-kinetic text-shadow-luxury">
              Sacred Impact
            </h2>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light">
              Witness the transformative power of ancient wisdom in modern souls
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: Users, value: "2,500+", label: "Souls Transformed", color: "prism-sunset", description: "Lives forever changed through sacred ceremony" },
              { icon: Calendar, value: "8", label: "Years of Sacred Service", color: "spiritual-gold", description: "Dedicated years of spiritual guidance" },
              { icon: Heart, value: "98%", label: "Life-Changing Experiences", color: "prism-amber", description: "Participants reporting profound transformation" },
              { icon: Star, value: "4.9", label: "Sacred Rating", color: "prism-rose", description: "Average rating from our spiritual community" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  ease: [0.19, 1, 0.22, 1]
                }}
                className="crystal-panel-luxury p-8 text-center group cursor-pointer relative overflow-hidden hover-lift hover-glow"
              >
                {/* Enhanced gradient overlay with animation */}
                <motion.div 
                  className={`absolute inset-0 opacity-0 group-hover:opacity-15 transition-all duration-500 bg-gradient-to-br from-[var(--color-${stat.color})]/30 to-transparent`}
                  whileHover={{ scale: 1.1 }}
                />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </div>
                
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <stat.icon className={`w-12 h-12 mx-auto mb-6 text-[var(--color-${stat.color})] animate-breathe-glow`} />
                  </motion.div>
                  
                  <motion.div 
                    className={`text-4xl md:text-5xl font-bold mb-3 text-kinetic`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {stat.value}
                  </motion.div>
                  
                  <div className="text-lg font-semibold text-white/90 mb-3">
                    {stat.label}
                  </div>
                  
                  <div className="text-sm text-white/60 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lunar Calendar Section */}
      {/* <LunarCalendarSection /> */}
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Location Section */}
      <LocationSection />
      
      {/* Final CTA Section */}
      <CTASection />
    </main>
  )
}