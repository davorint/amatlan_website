'use client'

import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Heart, Star, Phone, Mail, MessageCircle } from "lucide-react"
import { useTranslations } from 'next-intl'

export function CTASection() {
  const t = useTranslations('CTA')
  const tCommon = useTranslations('Common')
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="crystal-panel p-8 md:p-16 text-center relative overflow-hidden mb-16"
        >
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-prism-sunset)]/10 to-[var(--color-prism-amber)]/10" />
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-[var(--color-prism-sunset)] rounded-full blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-1/4 -right-1/4 w-80 h-80 bg-[var(--color-prism-amber)] rounded-full blur-3xl opacity-20 animate-pulse" />
          
          <div className="relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 mb-8 px-6 py-3 bg-gradient-to-r from-[var(--color-prism-sunset)]/20 to-[var(--color-prism-amber)]/20 rounded-full border border-[var(--color-prism-sunset)]/30"
            >
              <Sparkles className="w-5 h-5 text-[var(--color-prism-amber)] animate-breathe" />
              <span className="font-semibold text-[var(--color-prism-amber)]">{t('badge')}</span>
              <Sparkles className="w-5 h-5 text-[var(--color-prism-amber)] animate-breathe" />
            </motion.div>

            {/* Headlines */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-kinetic">{t('headline')}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              {t('description')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-[var(--color-prism-sunset)] to-[var(--color-prism-amber)] hover:from-[var(--color-prism-amber)] hover:to-[var(--color-prism-rose)] text-white font-bold px-10 py-4 text-lg accessible-luxury border-0 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-[var(--color-prism-sunset)]/30"
              >
                <Heart className="w-6 h-6 mr-3" />
                {t('buttons.beginJourney')}
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/40 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 px-10 py-4 text-lg accessible-luxury transform hover:scale-105 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                {t('buttons.speakGuide')}
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/60"
            >
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 fill-[var(--color-spiritual-gold)] text-[var(--color-spiritual-gold)]" />
                <span>4.9/5 {t('trustIndicators.sacredRating')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-[var(--color-prism-rose)]" />
                <span>2,500+ {t('trustIndicators.livesTransformed')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-[var(--color-prism-amber)]" />
                <span>8+ {t('trustIndicators.yearsService')}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Phone,
              title: t('contact.callGuide'),
              description: t('contact.callDescription'),
              action: "+52 777 123 4567",
              color: "prism-sunset",
              cta: t('contact.callCTA')
            },
            {
              icon: Mail,
              title: t('contact.sacredInquiry'), 
              description: t('contact.emailDescription'),
              action: "sanctuary@magicamatlan.com",
              color: "prism-amber",
              cta: t('contact.emailCTA')
            },
            {
              icon: MessageCircle,
              title: t('contact.whatsappGuidance'),
              description: t('contact.whatsappDescription'),
              action: "WhatsApp +52 777 123 4567",
              color: "nature-green",
              cta: t('contact.whatsappCTA')
            }
          ].map((contact, index) => (
            <motion.div
              key={contact.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: 0.7 + index * 0.1,
                ease: [0.19, 1, 0.22, 1]
              }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="crystal-panel p-6 text-center group cursor-pointer relative overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br from-[var(--color-${contact.color})] to-transparent`} />
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-${contact.color})] to-[var(--color-prism-amber)] p-0.5 mb-4`}>
                  <div className="w-full h-full rounded-full bg-background/90 flex items-center justify-center">
                    <contact.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-kinetic transition-all duration-300">
                  {contact.title}
                </h4>
                
                <p className="text-white/70 mb-4 text-sm leading-relaxed">
                  {contact.description}
                </p>
                
                <div className="text-[var(--color-prism-amber)] font-semibold mb-4 text-sm">
                  {contact.action}
                </div>
                
                <Button
                  className={`bg-gradient-to-r from-[var(--color-${contact.color})] to-[var(--color-prism-amber)] hover:scale-105 text-white font-semibold accessible-luxury border-0 transition-all duration-300`}
                  size="sm"
                >
                  {contact.cta}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16 pt-8 border-t border-white/10"
        >
          <p className="text-white/50 text-sm">
            © 2025 Magic Amatlán. {t('footer')}
            <br />
            {t('footerDetails')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}