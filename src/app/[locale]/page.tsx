import { CategoryGridPremium } from '@/components/homepage/CategoryGridPremium'
import { Link } from '@/i18n/routing'
import { LunarCalendarSection } from '@/components/sections/LunarCalendarSection'

export default function Home() {
  return (
    <div>
      {/* Hero Section - restored without complex animations */}
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-6xl font-bold text-white mb-6">
          Magic Amatlán
        </h1>
        <p className="text-2xl text-orange-400 mb-8">
          Spiritual Wellness Directory
        </p>
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-12">
          Discover authentic spiritual experiences, traditional temazcales, transformative retreats, 
          and ancestral healing in Mexico&apos;s mystical village of Amatlán de Quetzalcóatl, Morelos.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/temazcales" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105">
            Explore Temazcales
          </Link>
          <Link href="/retreats" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105">
            View Retreats  
          </Link>
          <Link href="/healers" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105">
            Find Healers
          </Link>
        </div>
      </div>
      
      {/* Restored Component that works */}
      <CategoryGridPremium />
      
      {/* Lunar Calendar Section */}
      <LunarCalendarSection />
    </div>
  )
}