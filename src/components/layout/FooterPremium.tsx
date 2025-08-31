'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { MapPin, Mail, Phone, Facebook, Instagram, Sparkles, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

export function FooterPremium() {
  const t = useTranslations('Footer')
  const tNav = useTranslations('Navigation')

  const footerSections = {
    experiences: {
      title: t('experiences'),
      links: [
        { name: tNav('temazcales'), href: '/temazcales' as const },
        { name: tNav('retreats'), href: '/retreats' as const },
        { name: tNav('ecoStays'), href: '/eco-stays' as const },
        { name: tNav('healers'), href: '/healers' as const },
        { name: tNav('nature'), href: '/nature' as const },
      ]
    },
    community: {
      title: t('community'),
      links: [
        { name: tNav('events'), href: '/events' as const },
        { name: tNav('guides'), href: '/guides' as const },
        { name: t('forum'), href: '/community' as const },
        { name: t('stories'), href: '/journal' as const },
        { name: t('aboutAmatlan'), href: '/about' as const },
      ]
    },
    facilitators: {
      title: t('facilitators'),
      links: [
        { name: t('joinUs'), href: '/facilitators/add-experience' as const },
        { name: t('plans'), href: '/facilitators/plans' as const },
        { name: t('dashboard'), href: '/facilitators/dashboard' as const },
        { name: t('support'), href: '/contact' as const },
      ]
    }
  }

  return (
    <footer className="relative bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-prism-sunset/5 via-transparent to-prism-amber/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-prism-gold/5 via-transparent to-transparent" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => {
          const startX = (i % 5) * 240 + (i % 2) * 100
          const startY = Math.floor(i / 5) * 133 + (i % 3) * 50
          const endX = ((i + 2) % 5) * 240 + ((i + 1) % 2) * 100  
          const endY = Math.floor((i + 2) / 5) * 133 + ((i + 1) % 3) * 50
          const duration = 25 + (i % 4) * 5
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-prism-amber/30 rounded-full"
              initial={{
                x: startX,
                y: startY,
              }}
              animate={{
                x: endX,
                y: endY,
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'linear'
              }}
            />
          )
        })}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Premium Brand Section */}
          <div className="lg:col-span-1">
            <motion.div 
              className="flex items-center space-x-3 mb-6"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-prism-sunset to-prism-amber rounded-full blur-lg opacity-60" />
                <MapPin className="relative h-10 w-10 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">Magic-Amatlán</span>
                <div className="flex items-center space-x-1 text-xs text-prism-amber">
                  <Sparkles className="h-3 w-3" />
                  <span>Spiritual Sanctuary</span>
                </div>
              </div>
            </motion.div>
            
            <p className="text-white/70 mb-6 leading-relaxed">
              {t('description')}
            </p>
            
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                className="group relative p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-prism-sunset/50 transition-all duration-300"
                aria-label="Facebook"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-prism-sunset to-prism-amber opacity-0 group-hover:opacity-20 rounded-full transition-opacity" />
                <Facebook className="relative h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
              </motion.a>
              <motion.a 
                href="#" 
                className="group relative p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-prism-sunset/50 transition-all duration-300"
                aria-label="Instagram"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-prism-sunset to-prism-amber opacity-0 group-hover:opacity-20 rounded-full transition-opacity" />
                <Instagram className="relative h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
              </motion.a>
            </div>
          </div>

          {/* Premium Footer Links */}
          {Object.entries(footerSections).map(([key, section], index) => (
            <motion.div 
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-prism-sunset to-prism-amber mb-6 text-lg">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-gradient-to-r from-prism-sunset to-prism-amber transition-all duration-300 mr-0 group-hover:mr-2" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Premium Contact Info & Copyright */}
        <div className="border-t border-white/10 backdrop-blur-sm py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-sm">
              <motion.div 
                className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors group"
                whileHover={{ x: 5 }}
              >
                <MapPin className="h-4 w-4 text-prism-amber" />
                <span>{t('location')}</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ x: 5 }}
              >
                <Mail className="h-4 w-4 text-prism-amber" />
                <a 
                  href="mailto:info@amatlan.mx" 
                  className="text-white/60 hover:text-white transition-colors"
                >
                  info@amatlan.mx
                </a>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ x: 5 }}
              >
                <Phone className="h-4 w-4 text-prism-amber" />
                <a 
                  href="tel:+525555555555" 
                  className="text-white/60 hover:text-white transition-colors"
                >
                  +52 (555) 555-5555
                </a>
              </motion.div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-white/40">
              <Heart className="h-4 w-4 text-prism-rose" />
              <span>{t('copyright')}</span>
            </div>
          </div>
        </div>

        {/* Decorative bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-prism-sunset/50 to-transparent" />
      </div>
    </footer>
  )
}