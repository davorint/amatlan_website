'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Moon, Sun, Star, Sparkles, Calendar, ChevronLeft, ChevronRight, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations, useLocale } from 'next-intl'

// Moon phase calculations
const getMoonPhase = (date: Date, t: (key: string) => string): { phase: string; illumination: number; emoji: string; name: string; description: string } => {
  // Calculate days since new moon (January 6, 2000)
  const baseNewMoon = new Date(2000, 0, 6)
  const lunarCycle = 29.53058867 // days
  
  const daysSinceBase = (date.getTime() - baseNewMoon.getTime()) / (1000 * 60 * 60 * 24)
  const currentCycle = daysSinceBase / lunarCycle
  const moonAge = (currentCycle - Math.floor(currentCycle)) * lunarCycle
  
  // Determine moon phase based on age
  if (moonAge < 1.84566) return { 
    phase: 'new', 
    illumination: 0, 
    emoji: '🌑', 
    name: t('phases.new'),
    description: t('descriptions.new')
  }
  if (moonAge < 5.53699) return { 
    phase: 'waxing-crescent', 
    illumination: 25, 
    emoji: '🌒', 
    name: t('phases.waxingCrescent'),
    description: t('descriptions.waxingCrescent')
  }
  if (moonAge < 9.22831) return { 
    phase: 'first-quarter', 
    illumination: 50, 
    emoji: '🌓', 
    name: t('phases.firstQuarter'),
    description: t('descriptions.firstQuarter')
  }
  if (moonAge < 12.91963) return { 
    phase: 'waxing-gibbous', 
    illumination: 75, 
    emoji: '🌔', 
    name: t('phases.waxingGibbous'),
    description: t('descriptions.waxingGibbous')
  }
  if (moonAge < 16.61096) return { 
    phase: 'full', 
    illumination: 100, 
    emoji: '🌕', 
    name: t('phases.full'),
    description: t('descriptions.full')
  }
  if (moonAge < 20.30228) return { 
    phase: 'waning-gibbous', 
    illumination: 75, 
    emoji: '🌖', 
    name: t('phases.waningGibbous'),
    description: t('descriptions.waningGibbous')
  }
  if (moonAge < 23.99361) return { 
    phase: 'last-quarter', 
    illumination: 50, 
    emoji: '🌗', 
    name: t('phases.lastQuarter'),
    description: t('descriptions.lastQuarter')
  }
  if (moonAge < 27.68493) return { 
    phase: 'waning-crescent', 
    illumination: 25, 
    emoji: '🌘', 
    name: t('phases.waningCrescent'),
    description: t('descriptions.waningCrescent')
  }
  
  return { 
    phase: 'new', 
    illumination: 0, 
    emoji: '🌑', 
    name: t('phases.new'),
    description: t('descriptions.new')
  }
}

// Get next important lunar dates
const getUpcomingLunarEvents = (startDate: Date, t: (key: string) => string): Array<{ date: Date; phase: string; name: string }> => {
  const events = []
  const checkDate = new Date(startDate)
  
  for (let i = 0; i < 60; i++) { // Check next 60 days
    checkDate.setDate(checkDate.getDate() + 1)
    const phase = getMoonPhase(checkDate, t)
    
    if (phase.phase === 'new' || phase.phase === 'full' || 
        phase.phase === 'first-quarter' || phase.phase === 'last-quarter') {
      // Check if we already have this phase type
      const existingPhase = events.find(e => e.phase === phase.phase)
      if (!existingPhase) {
        events.push({
          date: new Date(checkDate),
          phase: phase.phase,
          name: phase.name
        })
      }
      
      if (events.length >= 4) break // Get next 4 major phases
    }
  }
  
  return events
}

// Moon visualization component
const MoonVisualization = ({ phase, illumination }: { phase: string; illumination: number }) => {
  return (
    <div className="relative w-32 h-32 mx-auto">
      {/* Moon base */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 to-gray-900"
        animate={{ 
          rotate: [0, 360],
        }}
        transition={{ 
          duration: 120,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Craters */}
        <div className="absolute top-4 left-6 w-3 h-3 bg-gray-700 rounded-full opacity-30" />
        <div className="absolute top-8 right-8 w-2 h-2 bg-gray-700 rounded-full opacity-30" />
        <div className="absolute bottom-6 left-8 w-4 h-4 bg-gray-700 rounded-full opacity-30" />
      </motion.div>
      
      {/* Illumination overlay */}
      <motion.div
        className="absolute inset-0 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div 
          className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-yellow-100"
          style={{
            clipPath: phase.includes('waning') 
              ? `inset(0 ${100 - illumination}% 0 0)`
              : phase.includes('waxing')
              ? `inset(0 0 0 ${100 - illumination}%)`
              : illumination === 100
              ? 'none'
              : 'inset(0 100% 0 0)'
          }}
        />
      </motion.div>
      
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-4 rounded-full"
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: `radial-gradient(circle, rgba(250, 240, 137, ${illumination / 200}) 0%, transparent 70%)`,
          filter: 'blur(8px)'
        }}
      />
    </div>
  )
}

export function LunarCalendarSection() {
  const t = useTranslations('LunarCalendar')
  const locale = useLocale()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const [currentMoonPhase, setCurrentMoonPhase] = useState(getMoonPhase(new Date(), t))
  const [upcomingEvents, setUpcomingEvents] = useState(getUpcomingLunarEvents(new Date(), t))
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentDate(now)
      setCurrentMoonPhase(getMoonPhase(now, t))
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [t])

  useEffect(() => {
    setUpcomingEvents(getUpcomingLunarEvents(selectedMonth, t))
  }, [selectedMonth, t])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days = []
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString(locale === 'en' ? 'en-US' : 'es-ES', { month: 'long', year: 'numeric' })
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setSelectedMonth(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
  }

  const days = getDaysInMonth(selectedMonth)
  const weekDays = locale === 'en' 
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />
        
        {/* Animated stars */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ 
              x: Math.random() * 1400,
              y: Math.random() * 800,
              opacity: Math.random() * 0.8 + 0.2
            }}
            animate={{ 
              opacity: [null, Math.random() * 0.8 + 0.2, null],
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <Moon className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-white/90">{t('title')}</span>
            <Star className="w-3 h-3 text-yellow-400" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {t('subtitle')}
            </span>
          </h2>
          
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Moon Phase Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">{t('currentPhase')}</h3>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Info className="w-4 h-4 text-white/60" />
                </button>
              </div>

              {/* Moon Visualization */}
              <MoonVisualization phase={currentMoonPhase.phase} illumination={currentMoonPhase.illumination} />
              
              {/* Phase Info */}
              <div className="mt-6 text-center">
                <div className="text-3xl mb-2">{currentMoonPhase.emoji}</div>
                <h4 className="text-2xl font-bold text-white mb-2">{currentMoonPhase.name}</h4>
                <p className="text-sm text-white/60 mb-4">{currentMoonPhase.description}</p>
                
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Sun className="w-4 h-4 text-yellow-400" />
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-yellow-400 to-yellow-200"
                      initial={{ width: 0 }}
                      animate={{ width: `${currentMoonPhase.illumination}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <span className="text-sm text-white/60">{currentMoonPhase.illumination}% {t('illumination')}</span>
                </div>
              </div>

              {/* Additional Info */}
              <AnimatePresence>
                {showInfo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-white/10 pt-4 mt-4"
                  >
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">{locale === 'en' ? 'Best for' : 'Mejor para'}:</span>
                        <span className="text-white/80">
                          {currentMoonPhase.phase === 'new' && t('bestFor.new')}
                          {currentMoonPhase.phase === 'full' && t('bestFor.full')}
                          {currentMoonPhase.phase.includes('waxing') && t('bestFor.waxing')}
                          {currentMoonPhase.phase.includes('waning') && t('bestFor.waning')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">{locale === 'en' ? 'Element' : 'Elemento'}:</span>
                        <span className="text-white/80">{t('element')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">{locale === 'en' ? 'Chakra' : 'Chakra'}:</span>
                        <span className="text-white/80">{t('chakra')}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Upcoming Events */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <h5 className="text-sm font-semibold text-white mb-4">{t('upcomingPhases')}</h5>
                <div className="space-y-3">
                  {upcomingEvents.slice(0, 4).map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">
                          {event.phase === 'new' && '🌑'}
                          {event.phase === 'full' && '🌕'}
                          {event.phase === 'first-quarter' && '🌓'}
                          {event.phase === 'last-quarter' && '🌗'}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-white">{event.name}</p>
                          <p className="text-xs text-white/50">
                            {event.date.toLocaleDateString(locale === 'en' ? 'en-US' : 'es-ES', { day: 'numeric', month: 'short' })}
                          </p>
                        </div>
                      </div>
                      <Sparkles className="w-4 h-4 text-purple-400" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Calendar Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white capitalize">
                  {formatMonth(selectedMonth)}
                </h3>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => navigateMonth('prev')}
                    size="sm"
                    variant="ghost"
                    className="p-2 text-white/60 hover:text-white hover:bg-white/10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={() => setSelectedMonth(new Date())}
                    size="sm"
                    variant="ghost"
                    className="px-4 py-2 text-white/60 hover:text-white hover:bg-white/10"
                  >
                    {t('today')}
                  </Button>
                  <Button
                    onClick={() => navigateMonth('next')}
                    size="sm"
                    variant="ghost"
                    className="p-2 text-white/60 hover:text-white hover:bg-white/10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {weekDays.map(day => (
                  <div key={day} className="text-center text-sm font-medium text-white/50 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => {
                  if (!day) {
                    return <div key={`empty-${index}`} className="aspect-square" />
                  }

                  const moonPhase = getMoonPhase(day, t)
                  const isToday = day.toDateString() === currentDate.toDateString()
                  const isSelected = day.toDateString() === currentDate.toDateString()
                  const isPast = day < new Date(new Date().setHours(0, 0, 0, 0))

                  return (
                    <motion.button
                      key={day.toISOString()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentDate(day)}
                      className={`
                        aspect-square rounded-xl p-2 flex flex-col items-center justify-center
                        transition-all duration-300 relative group
                        ${isToday ? 'bg-purple-500/20 border-2 border-purple-400' : 'bg-white/5 border border-white/10'}
                        ${isSelected && !isToday ? 'bg-white/10' : ''}
                        ${isPast ? 'opacity-50' : ''}
                        hover:bg-white/10 hover:border-white/20
                      `}
                    >
                      {/* Date */}
                      <span className={`text-sm font-medium mb-1 ${isToday ? 'text-purple-300' : 'text-white/80'}`}>
                        {day.getDate()}
                      </span>
                      
                      {/* Moon Phase Emoji */}
                      <span className="text-lg opacity-80">{moonPhase.emoji}</span>
                      
                      {/* Special phase indicator */}
                      {(moonPhase.phase === 'new' || moonPhase.phase === 'full') && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                      
                      {/* Hover tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                        <p className="text-xs text-white">{moonPhase.name}</p>
                        <p className="text-xs text-white/60">{moonPhase.illumination}% {t('illumination')}</p>
                      </div>
                    </motion.button>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <span>🌑</span>
                    <span className="text-white/60">{t('legend.newMoon')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🌓</span>
                    <span className="text-white/60">{t('legend.firstQuarter')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🌕</span>
                    <span className="text-white/60">{t('legend.fullMoon')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🌗</span>
                    <span className="text-white/60">{t('legend.lastQuarter')}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg shadow-purple-500/25 border-0"
          >
            <Calendar className="w-5 h-5 mr-2" />
            {t('viewLunarCeremonies')}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}