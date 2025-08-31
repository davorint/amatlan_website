'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, MapPin } from 'lucide-react'

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const t = useTranslations('Homepage')
  const tCommon = useTranslations('Common')

  return (
    <section className="relative bg-gradient-to-br from-nature-green/20 to-spiritual-gold/30 py-20 lg:py-32">
      <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-earth-brown">
              <MapPin className="h-4 w-4" />
              <span>{t('location')}</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-earth-brown mb-6">
            {t('heroTitle')}
            <span className="block text-spiritual-gold">{t('heroSubtitle')}</span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            {t('heroDescription')}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder={tCommon('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full text-lg rounded-full border-2 border-gray-300 focus:border-spiritual-gold"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <Button 
                  size="sm" 
                  className="rounded-full bg-spiritual-gold hover:bg-spiritual-gold/90"
                >
                  {tCommon('search')}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/80 backdrop-blur-sm border-earth-brown/30 hover:bg-earth-brown hover:text-white"
              asChild
            >
              <Link href="/temazcales">{t('exploreTemazcales')}</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/80 backdrop-blur-sm border-nature-green/30 hover:bg-nature-green hover:text-white"
              asChild
            >
              <Link href="/retreats">{t('viewRetreats')}</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/80 backdrop-blur-sm border-water-blue/30 hover:bg-water-blue hover:text-white"
              asChild
            >
              <Link href="/healers">{t('findHealers')}</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-spiritual-gold/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-nature-green/20 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-sunset-orange/20 rounded-full blur-xl"></div>
    </section>
  )
}