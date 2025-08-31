'use client'

import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { MapPin, Mountain, Droplets, TreePine, Sun, Navigation, Clock, Plane } from "lucide-react"
import { useTranslations } from 'next-intl'

export function LocationSection() {
  const t = useTranslations('Location')
  const features = [
    {
      icon: Mountain,
      title: t('features.sacredMountains'),
      description: t('features.mountainsDesc')
    },
    {
      icon: Droplets,
      title: t('features.naturalSprings'),
      description: t('features.springsDesc')
    },
    {
      icon: TreePine,
      title: t('features.ancientForest'),
      description: t('features.forestDesc')
    },
    {
      icon: Sun,
      title: t('features.perfectClimate'),
      description: t('features.climateDesc')
    }
  ]

  const logistics = [
    {
      icon: Plane,
      title: t('logistics.gettingHere'),
      details: [
        "1.5 hours from Mexico City",
        "45 minutes from Cuernavaca",
        "Private transport included"
      ]
    },
    {
      icon: Clock,
      title: t('logistics.bestTimeToVisit'),
      details: [
        "Year-round availability",
        "Dry season: Nov - Apr",
        "Full moon ceremonies monthly"
      ]
    },
    {
      icon: Navigation,
      title: t('logistics.whatsIncluded'),
      details: [
        "Airport transfers",
        "Sacred site access",
        "Ceremonial materials"
      ]
    }
  ]

  return (
    <section id="location" className="py-24 relative">
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
            <MapPin className="w-4 h-4 text-[var(--color-nature-green)]" />
            <span className="text-sm font-medium text-white/90">{t('subtitle')}</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-kinetic">{t('title')}</span>
          </h2>
          
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Location Features */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold text-white mb-6">
                {t('whereWisdomLives')}
              </h3>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {t('legendaryText')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: [0.19, 1, 0.22, 1]
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="crystal-panel p-6 group cursor-pointer"
                >
                  <feature.icon className="w-8 h-8 text-[var(--color-nature-green)] mb-4 group-hover:animate-breathe transition-all duration-300" />
                  <h4 className="font-semibold text-white mb-2 group-hover:text-kinetic transition-all duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Map/Visual Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="crystal-panel p-8 relative overflow-hidden min-h-[400px] group cursor-pointer"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-nature-green)]/20 to-[var(--color-spiritual-gold)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Map placeholder content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
              <MapPin className="w-16 h-16 text-[var(--color-nature-green)] mb-6 animate-breathe" />
              <h4 className="text-2xl font-bold text-white mb-4">
                {t('mapInfo.valleyLocation')}
              </h4>
              <p className="text-white/70 mb-6 max-w-sm leading-relaxed">
                Coordinates: 18.9547° N, 99.2442° W
                <br />
                Elevation: 1,200m above sea level
              </p>
              
              {/* Interactive elements */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                  <div className="text-sm text-white/60">{t('mapInfo.distanceFrom')}</div>
                  <div className="font-semibold text-white">Mexico City</div>
                  <div className="text-[var(--color-prism-amber)] font-bold">95km</div>
                </div>
                <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                  <div className="text-sm text-white/60">{t('mapInfo.altitude')}</div>
                  <div className="font-semibold text-white">{t('mapInfo.perfectFor')}</div>
                  <div className="text-[var(--color-prism-amber)] font-bold">{t('mapInfo.healing')}</div>
                </div>
              </div>
              
              <Button
                className="mt-6 bg-gradient-to-r from-[var(--color-nature-green)] to-[var(--color-spiritual-gold)] hover:scale-105 text-white font-semibold accessible-luxury border-0"
                size="lg"
              >
                {t('buttons.viewMap')}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Logistics Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {logistics.map((item) => (
            <div key={item.title} className="crystal-panel p-8 text-center">
              <item.icon className="w-10 h-10 mx-auto text-[var(--color-prism-amber)] mb-6" />
              <h4 className="text-xl font-bold text-white mb-4">
                {item.title}
              </h4>
              <ul className="space-y-2">
                {item.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="text-white/70 text-sm">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Sacred Geometry & Energy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="crystal-panel p-8 md:p-12 text-center relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-[var(--color-prism-sunset)] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-[var(--color-spiritual-gold)] rounded-full animate-pulse" />
            <div className="absolute top-3/4 left-2/3 w-16 h-16 border border-[var(--color-prism-amber)] rounded-full animate-pulse" />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              <span className="text-kinetic">{t('sacredGeometry')}</span>
            </h3>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              {t('geometryDescription')}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[var(--color-nature-green)] to-[var(--color-spiritual-gold)] hover:from-[var(--color-spiritual-gold)] hover:to-[var(--color-prism-sunset)] text-white font-semibold px-8 accessible-luxury border-0"
              >
                {t('buttons.planVisit')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 px-8 accessible-luxury"
              >
                {t('buttons.learnHistory')}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}