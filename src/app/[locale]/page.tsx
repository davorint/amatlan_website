import { HeroPremium } from '@/components/homepage/HeroPremium'
import { CategoryGridPremium } from '@/components/homepage/CategoryGridPremium'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { LocationSection } from '@/components/sections/LocationSection'
import { LunarCalendarSection } from '@/components/sections/LunarCalendarSection'
import { CTASection } from '@/components/sections/CTASection'

export default function Home() {
  return (
    <div>
      <HeroPremium />
      <CategoryGridPremium />
      <TestimonialsSection />
      <LocationSection />
      <LunarCalendarSection />
      <CTASection />
    </div>
  )
}