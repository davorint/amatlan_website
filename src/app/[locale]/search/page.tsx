'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
// import { useTranslations } from 'next-intl'
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Users,
  Heart,
  Sparkles,
  Grid,
  List,
  SortAsc,
  Eye,
  Calendar
} from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { AdvancedSearch } from '@/components/search/AdvancedSearch'
import { Link } from '@/i18n/routing'

// Sample search results (this would come from your API)
const sampleResults = [
  {
    id: "nahual-temazcal",
    title: "Temazcal Nahual",
    subtitle: "Sacred Fire Purification Ceremony",
    description: "Experience the ancient Mexican purification ritual in an authentic temazcal lodge. Connect with your inner spirit through sacred heat, medicinal plants, and ceremonial chanting guided by a traditional temazcalero.",
    category: "TEMAZCAL",
    price: 850,
    currency: "MXN",
    duration: 120,
    capacity: 8,
    rating: 4.9,
    reviewCount: 127,
    location: "Sacred Grove Sanctuary",
    image: "/images/temazcal-nahual.jpg",
    facilitator: "Maestro Itzel Coatl",
    tags: ["Sacred Fire", "Purification", "Traditional"],
    availability: "Daily",
    intensity: "Moderate"
  },
  {
    id: "healing-retreat",
    title: "Sacred Heart Healing Retreat",
    subtitle: "3-Day Transformational Journey",
    description: "A profound three-day retreat combining temazcal ceremonies, plant medicine healing, and sacred cacao rituals for deep emotional and spiritual transformation.",
    category: "RETREAT",
    price: 2800,
    currency: "MXN",
    duration: 4320, // 3 days in minutes
    capacity: 12,
    rating: 4.8,
    reviewCount: 89,
    location: "Tepoztlán Mountains",
    image: "/images/healing-retreat.jpg",
    facilitator: "Luna Itzamna",
    tags: ["Plant Medicine", "Cacao", "Transformation"],
    availability: "Monthly",
    intensity: "Deep"
  },
  {
    id: "curandera-session",
    title: "Traditional Curandera Healing",
    subtitle: "Ancient Mexican Medicine",
    description: "Individual healing session with a traditional curandera using ancestral techniques including energy cleansing, herbal remedies, and spiritual guidance.",
    category: "HEALING",
    price: 650,
    currency: "MXN",
    duration: 90,
    capacity: 1,
    rating: 5.0,
    reviewCount: 156,
    location: "Valle de Amatlán",
    image: "/images/curandera-healing.jpg",
    facilitator: "Abuela Rosa",
    tags: ["Energy Healing", "Herbal Medicine", "Individual"],
    availability: "By appointment",
    intensity: "Gentle"
  }
  // Add more sample results as needed
]

const sortOptions = [
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'duration', label: 'Shortest Duration' },
  { value: 'popular', label: 'Most Popular' }
]

function SearchPageContent() {
  const searchParams = useSearchParams()
  // const t = useTranslations()
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchFilters, setSearchFilters] = useState({
    query: searchParams.get('q') || '',
    category: searchParams.get('category') || 'all',
    location: searchParams.get('location') || 'All Locations',
    priceRange: [0, 5000] as [number, number],
    duration: 'any',
    groupSize: 'any',
    rating: 0,
    availability: 'any',
    intensity: 'any',
    includes: []
  })
  
  const [results, setResults] = useState(sampleResults)
  const [sortBy, setSortBy] = useState('relevance')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isLoading, setIsLoading] = useState(false)

  // Simulate search API call
  const performSearch = async (filters: typeof searchFilters) => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Filter results based on search criteria
    let filteredResults = sampleResults
    
    if (filters.query) {
      filteredResults = filteredResults.filter(result =>
        result.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        result.description.toLowerCase().includes(filters.query.toLowerCase()) ||
        result.tags.some((tag: string) => tag.toLowerCase().includes(filters.query.toLowerCase()))
      )
    }
    
    if (filters.category !== 'all') {
      filteredResults = filteredResults.filter(result => 
        result.category.toLowerCase() === filters.category.toLowerCase()
      )
    }
    
    if (filters.location !== 'All Locations') {
      filteredResults = filteredResults.filter(result => 
        result.location === filters.location
      )
    }
    
    setResults(filteredResults)
    setIsLoading(false)
  }

  const handleSearch = (filters: typeof searchFilters) => {
    setSearchFilters(filters)
    performSearch(filters)
  }

  // Sort results
  const sortedResults = [...results].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'duration':
        return a.duration - b.duration
      case 'popular':
        return b.reviewCount - a.reviewCount
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section with Search */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-breathe" />
          <div className="absolute bottom-20 -right-20 w-80 h-80 bg-amber-500 rounded-full blur-3xl animate-float" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Search className="w-6 h-6 text-amber-400 animate-pulse" />
                <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 text-sm">
                  Sacred Discovery
                </Badge>
                <Search className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                Find Your Perfect
                <span className="block bg-gradient-to-r from-orange-400 via-amber-400 to-orange-600 bg-clip-text text-transparent">
                  Sacred Experience
                </span>
              </h1>
              
              <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                Discover transformative ceremonies, healing retreats, and mystical journeys 
                tailored to your spiritual calling in the heart of Amatlán.
              </p>
            </motion.div>

            {/* Advanced Search Component */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <AdvancedSearch 
                onSearch={handleSearch}
                isExpanded={true}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-white">
                  Sacred Experiences
                </h2>
                {!isLoading && (
                  <Badge variant="outline" className="text-amber-400 border-amber-400/30">
                    {results.length} experience{results.length !== 1 ? 's' : ''} found
                  </Badge>
                )}
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort Options */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-white/5 border-white/20 text-white">
                    <SortAsc className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-white hover:bg-white/10">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-all ${
                      viewMode === 'grid' 
                        ? 'bg-amber-500 text-black' 
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-all ${
                      viewMode === 'list' 
                        ? 'bg-amber-500 text-black' 
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white/70">Discovering sacred experiences...</p>
                </div>
              </div>
            )}

            {/* Results Grid/List */}
            {!isLoading && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${viewMode}-${sortBy}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={
                    viewMode === 'grid' 
                      ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' 
                      : 'space-y-6'
                  }
                >
                  {sortedResults.map((experience, index) => (
                    <motion.div
                      key={experience.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className={
                        viewMode === 'grid'
                          ? 'bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group'
                          : 'bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-xl group flex gap-6'
                      }
                    >
                      {viewMode === 'grid' ? (
                        <>
                          {/* Grid View */}
                          <div className="aspect-[4/3] relative overflow-hidden">
                            <Image
                              src={experience.image}
                              alt={experience.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <div className="absolute top-4 left-4">
                              <Badge className={`bg-gradient-to-r ${
                                experience.category === 'TEMAZCAL' ? 'from-orange-500 to-red-500' :
                                experience.category === 'RETREAT' ? 'from-emerald-500 to-teal-500' :
                                'from-amber-500 to-orange-500'
                              } text-white border-0 text-xs`}>
                                {experience.category}
                              </Badge>
                            </div>
                            <button className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-black/40 transition-colors">
                              <Heart className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-amber-400 fill-current" />
                                <span className="text-white font-semibold">{experience.rating}</span>
                                <span className="text-white/60 text-sm">({experience.reviewCount})</span>
                              </div>
                              <div className="text-white/60 text-sm flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {experience.location}
                              </div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                              {experience.title}
                            </h3>
                            
                            <p className="text-amber-200 text-sm mb-3">{experience.subtitle}</p>
                            
                            <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3">
                              {experience.description}
                            </p>
                            
                            <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{experience.duration > 1440 ? `${Math.floor(experience.duration / 1440)} days` : `${experience.duration} min`}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="w-4 h-4" />
                                  <span>Max {experience.capacity}</span>
                                </div>
                              </div>
                              <div className="text-2xl font-bold text-white">
                                ${experience.price}
                                <span className="text-sm font-normal text-white/60"> {experience.currency}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-1 mb-4">
                              {experience.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs text-amber-400 border-amber-400/30">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 border-white/20 text-white hover:bg-white/10"
                                asChild
                              >
                                <Link href={`/${experience.category.toLowerCase()}s/${experience.id}` as string}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </Link>
                              </Button>
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6"
                              >
                                <Calendar className="w-4 h-4 mr-2" />
                                Book
                              </Button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* List View */}
                          <div className="w-48 flex-shrink-0">
                            <div className="aspect-[4/3] relative overflow-hidden rounded-xl">
                              <Image
                                src={experience.image}
                                alt={experience.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute top-2 left-2">
                                <Badge className={`bg-gradient-to-r ${
                                  experience.category === 'TEMAZCAL' ? 'from-orange-500 to-red-500' :
                                  experience.category === 'RETREAT' ? 'from-emerald-500 to-teal-500' :
                                  'from-amber-500 to-orange-500'
                                } text-white border-0 text-xs`}>
                                  {experience.category}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <div className="flex items-center space-x-4 mb-2">
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                                    <span className="text-white font-semibold">{experience.rating}</span>
                                    <span className="text-white/60 text-sm">({experience.reviewCount} reviews)</span>
                                  </div>
                                  <div className="text-white/60 text-sm flex items-center">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {experience.location}
                                  </div>
                                </div>
                                
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                                  {experience.title}
                                </h3>
                                
                                <p className="text-amber-200 text-sm mb-3">{experience.subtitle}</p>
                              </div>
                              
                              <div className="text-right">
                                <div className="text-3xl font-bold text-white mb-1">
                                  ${experience.price}
                                  <span className="text-sm font-normal text-white/60"> {experience.currency}</span>
                                </div>
                                <p className="text-white/60 text-sm">per person</p>
                              </div>
                            </div>
                            
                            <p className="text-white/70 leading-relaxed mb-4 line-clamp-2">
                              {experience.description}
                            </p>
                            
                            <div className="flex items-center space-x-6 mb-4 text-sm text-white/60">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{experience.duration > 1440 ? `${Math.floor(experience.duration / 1440)} days` : `${experience.duration} min`}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>Max {experience.capacity} people</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Sparkles className="w-4 h-4" />
                                <span>{experience.facilitator}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-1">
                                {experience.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs text-amber-400 border-amber-400/30">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <Button
                                  variant="outline"
                                  className="border-white/20 text-white hover:bg-white/10"
                                  asChild
                                >
                                  <Link href={`/${experience.category.toLowerCase()}s/${experience.id}` as string}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </Link>
                                </Button>
                                <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  Book Now
                                </Button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {/* No Results */}
            {!isLoading && results.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  No Sacred Experiences Found
                </h3>
                <p className="text-white/70 mb-8 max-w-md mx-auto">
                  We couldn&rsquo;t find any experiences matching your search. Try adjusting your filters or explore our featured offerings.
                </p>
                <Button 
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
                  onClick={() => handleSearch({
                    query: '',
                    category: 'all',
                    location: 'All Locations',
                    priceRange: [0, 5000],
                    duration: 'any',
                    groupSize: 'any',
                    rating: 0,
                    availability: 'any',
                    intensity: 'any',
                    includes: []
                  })}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Show All Experiences
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Search className="w-8 h-8 text-white" />
          </div>
          <p className="text-white/70">Loading sacred search...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  )
}