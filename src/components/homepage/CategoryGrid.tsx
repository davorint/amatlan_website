import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { 
  Flame, 
  Mountain, 
  TreePine, 
  Heart, 
  Leaf 
} from 'lucide-react'

export function CategoryGrid() {
  const t = useTranslations('Homepage')
  const tCategories = useTranslations('Categories')

  const categories = [
    {
      id: 'temazcal',
      name: tCategories('temazcal.name'),
      description: tCategories('temazcal.description'),
      icon: Flame,
      href: '/temazcales' as const,
      color: 'text-sunset-orange',
      bgColor: 'bg-sunset-orange/10',
      count: `12+ ${t('experiencesCount')}`
    },
    {
      id: 'retreat',
      name: tCategories('retreat.name'),
      description: tCategories('retreat.description'),
      icon: Mountain,
      href: '/retreats' as const,
      color: 'text-earth-brown',
      bgColor: 'bg-earth-brown/10',
      count: `8+ ${t('experiencesCount')}`
    },
    {
      id: 'eco-stay',
      name: tCategories('ecoStay.name'),
      description: tCategories('ecoStay.description'),
      icon: TreePine,
      href: '/eco-stays' as const,
      color: 'text-nature-green',
      bgColor: 'bg-nature-green/10',
      count: `15+ ${t('placesCount')}`
    },
    {
      id: 'healer',
      name: tCategories('healer.name'),
      description: tCategories('healer.description'),
      icon: Heart,
      href: '/healers' as const,
      color: 'text-water-blue',
      bgColor: 'bg-water-blue/10',
      count: `20+ ${t('healersCount')}`
    },
    {
      id: 'nature',
      name: tCategories('nature.name'),
      description: tCategories('nature.description'),
      icon: Leaf,
      href: '/nature' as const,
      color: 'text-spiritual-gold',
      bgColor: 'bg-spiritual-gold/10',
      count: `25+ ${t('activitiesCount')}`
    }
  ]
  return (
    <section className="py-16 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-earth-brown mb-4">
            {t('categoriesTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('categoriesDescription')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link key={category.id} href={category.href}>
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${category.bgColor} mb-4 mx-auto`}>
                      <IconComponent className={`h-8 w-8 ${category.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-earth-brown mb-2">
                      {category.name}
                    </h3>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    <div className={`inline-flex items-center text-sm font-medium ${category.color} bg-white px-3 py-1 rounded-full`}>
                      {category.count}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            {t('cantFindText')}
          </p>
          <Link 
            href="/experiences" 
            className="inline-flex items-center text-spiritual-gold hover:text-spiritual-gold/80 font-medium transition-colors"
          >
            {t('allExperiences')} →
          </Link>
        </div>
      </div>
    </section>
  )
}