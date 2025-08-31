'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign,
  Star,
  Clock,
  Flame,
  Leaf,
  Sun,
  Moon,
  Mountain,
  Waves,
  X,
  SlidersHorizontal,
  ChevronDown,
  Sparkles
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

interface SearchFilters {
  query: string
  category: string
  location: string
  priceRange: [number, number]
  duration: string
  groupSize: string
  rating: number
  availability: string
  intensity: string
  includes: string[]
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void
  isExpanded?: boolean
  onToggleExpanded?: () => void
  className?: string
}

const categories = [
  { id: 'all', name: 'All Experiences', icon: Sparkles, color: 'from-purple-500 to-violet-500' },
  { id: 'temazcal', name: 'Temazcales', icon: Flame, color: 'from-orange-500 to-red-500' },
  { id: 'retreat', name: 'Retreats', icon: Mountain, color: 'from-emerald-500 to-teal-500' },
  { id: 'healing', name: 'Healers', icon: Sun, color: 'from-amber-500 to-orange-500' },
  { id: 'nature', name: 'Nature', icon: Leaf, color: 'from-green-500 to-emerald-500' },
  { id: 'eco-stay', name: 'Eco-Stays', icon: Waves, color: 'from-blue-500 to-cyan-500' }
]

const locations = [
  'All Locations',
  'Sacred Grove Sanctuary',
  'Tepoztlán Mountains',
  'Cerro del Aire',
  'Valle de Amatlán',
  'Rio Amatzinac',
  'Bosque Sagrado'
]

const durations = [
  { value: 'any', label: 'Any Duration' },
  { value: '1-2', label: '1-2 hours' },
  { value: '3-4', label: '3-4 hours' },
  { value: '5-8', label: 'Half day (5-8 hours)' },
  { value: 'full', label: 'Full day' },
  { value: 'multi', label: 'Multi-day' }
]

const groupSizes = [
  { value: 'any', label: 'Any Size' },
  { value: '1', label: 'Solo Journey' },
  { value: '2-4', label: 'Intimate (2-4 people)' },
  { value: '5-8', label: 'Small Group (5-8)' },
  { value: '9-15', label: 'Medium Group (9-15)' },
  { value: '16+', label: 'Large Group (16+)' }
]

const intensityLevels = [
  { value: 'any', label: 'Any Intensity' },
  { value: 'gentle', label: 'Gentle & Restorative' },
  { value: 'moderate', label: 'Moderate Intensity' },
  { value: 'deep', label: 'Deep Transformation' },
  { value: 'intense', label: 'Intense & Challenging' }
]

const includes = [
  { id: 'meal', label: 'Sacred Meal', icon: Sun },
  { id: 'accommodation', label: 'Accommodation', icon: Moon },
  { id: 'transport', label: 'Transportation', icon: MapPin },
  { id: 'ceremony', label: 'Opening Ceremony', icon: Flame },
  { id: 'plants', label: 'Sacred Plants', icon: Leaf },
  { id: 'guide', label: 'Personal Guide', icon: Users },
  { id: 'materials', label: 'All Materials', icon: Sparkles },
  { id: 'integration', label: 'Integration Support', icon: Star }
]

export function AdvancedSearch({ 
  onSearch, 
  isExpanded = false, 
  onToggleExpanded,
  className = '' 
}: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
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
  })

  const [showFilters, setShowFilters] = useState(isExpanded)

  useEffect(() => {
    setShowFilters(isExpanded)
  }, [isExpanded])

  const handleFilterChange = (key: keyof SearchFilters, value: string | number | string[] | [number, number]) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
  }

  const handleIncludeToggle = (includeId: string) => {
    const newIncludes = filters.includes.includes(includeId)
      ? filters.includes.filter(id => id !== includeId)
      : [...filters.includes, includeId]
    
    handleFilterChange('includes', newIncludes)
  }

  const handleSearch = () => {
    onSearch(filters)
  }

  const handleClearFilters = () => {
    const clearedFilters: SearchFilters = {
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
    }
    setFilters(clearedFilters)
    onSearch(clearedFilters)
  }

  const activeFiltersCount = [
    filters.category !== 'all',
    filters.location !== 'All Locations',
    filters.priceRange[0] > 0 || filters.priceRange[1] < 5000,
    filters.duration !== 'any',
    filters.groupSize !== 'any',
    filters.rating > 0,
    filters.availability !== 'any',
    filters.intensity !== 'any',
    filters.includes.length > 0
  ].filter(Boolean).length

  return (
    <div className={`bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 ${className}`}>
      {/* Search Header */}
      <div className="p-6">
        <div className="flex items-center space-x-4">
          {/* Main Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <Input
              type="text"
              placeholder="Search sacred experiences, healers, locations..."
              value={filters.query}
              onChange={(e) => handleFilterChange('query', e.target.value)}
              className="pl-12 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-amber-400 focus:ring-amber-400/20 h-12"
            />
          </div>

          {/* Filter Toggle Button */}
          <Button
            variant="outline"
            onClick={() => {
              setShowFilters(!showFilters)
              onToggleExpanded?.()
            }}
            className="border-white/20 text-white hover:bg-white/10 h-12 px-4"
          >
            <SlidersHorizontal className="w-5 h-5 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge className="ml-2 bg-amber-500 text-black text-xs px-2">
                {activeFiltersCount}
              </Badge>
            )}
            <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white h-12 px-6"
          >
            <Search className="w-5 h-5 mr-2" />
            Search
          </Button>
        </div>

        {/* Quick Category Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((category) => {
            const Icon = category.icon
            const isActive = filters.category === category.id
            
            return (
              <button
                key={category.id}
                onClick={() => handleFilterChange('category', category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                  isActive
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                    : 'bg-white/90 text-gray-900 hover:bg-white hover:text-gray-900 border border-white/30'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="overflow-hidden border-t border-white/10"
          >
            <div className="p-6 space-y-8">
              {/* Location and Availability */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white font-medium flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-emerald-400" />
                    Sacred Location
                  </label>
                  <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      {locations.map((location) => (
                        <SelectItem key={location} value={location} className="text-white hover:bg-white/10">
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-white font-medium flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                    Availability
                  </label>
                  <Select value={filters.availability} onValueChange={(value) => handleFilterChange('availability', value)}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      <SelectItem value="any" className="text-white hover:bg-white/10">Any Time</SelectItem>
                      <SelectItem value="today" className="text-white hover:bg-white/10">Available Today</SelectItem>
                      <SelectItem value="week" className="text-white hover:bg-white/10">This Week</SelectItem>
                      <SelectItem value="month" className="text-white hover:bg-white/10">This Month</SelectItem>
                      <SelectItem value="custom" className="text-white hover:bg-white/10">Custom Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Duration and Group Size */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white font-medium flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-amber-400" />
                    Duration
                  </label>
                  <Select value={filters.duration} onValueChange={(value) => handleFilterChange('duration', value)}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      {durations.map((duration) => (
                        <SelectItem key={duration.value} value={duration.value} className="text-white hover:bg-white/10">
                          {duration.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-white font-medium flex items-center">
                    <Users className="w-4 h-4 mr-2 text-purple-400" />
                    Group Size
                  </label>
                  <Select value={filters.groupSize} onValueChange={(value) => handleFilterChange('groupSize', value)}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      {groupSizes.map((size) => (
                        <SelectItem key={size.value} value={size.value} className="text-white hover:bg-white/10">
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-4">
                <label className="text-white font-medium flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-green-400" />
                  Price Range (MXN)
                </label>
                <div className="px-4">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value: number[]) => handleFilterChange('priceRange', value)}
                    min={0}
                    max={5000}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-white/60 mt-2">
                    <span>${filters.priceRange[0]} MXN</span>
                    <span>${filters.priceRange[1]} MXN</span>
                  </div>
                </div>
              </div>

              {/* Intensity Level */}
              <div className="space-y-2">
                <label className="text-white font-medium flex items-center">
                  <Mountain className="w-4 h-4 mr-2 text-red-400" />
                  Spiritual Intensity
                </label>
                <Select value={filters.intensity} onValueChange={(value) => handleFilterChange('intensity', value)}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    {intensityLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value} className="text-white hover:bg-white/10">
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Minimum Rating */}
              <div className="space-y-4">
                <label className="text-white font-medium flex items-center">
                  <Star className="w-4 h-4 mr-2 text-yellow-400" />
                  Minimum Rating
                </label>
                <div className="flex space-x-2">
                  {[0, 1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleFilterChange('rating', rating)}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
                        filters.rating === rating
                          ? 'bg-amber-500 text-black'
                          : 'bg-gray-800 text-white/90 hover:bg-gray-700 border border-white/20'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${rating === 0 ? '' : 'fill-current'}`} />
                      <span className="text-sm">{rating === 0 ? 'Any' : `${rating}+`}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div className="space-y-4">
                <label className="text-white font-medium">What&rsquo;s Included</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {includes.map((include) => {
                    const Icon = include.icon
                    const isSelected = filters.includes.includes(include.id)
                    
                    return (
                      <button
                        key={include.id}
                        onClick={() => handleIncludeToggle(include.id)}
                        className={`flex items-center space-x-2 p-3 rounded-xl transition-all text-sm ${
                          isSelected
                            ? 'bg-amber-500 text-black'
                            : 'bg-white/90 text-gray-900 hover:bg-white hover:text-gray-900 border border-white/30'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{include.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <Button
                  variant="ghost"
                  onClick={handleClearFilters}
                  className="text-white/80 hover:text-white hover:bg-gray-800 border border-white/20"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
                
                <div className="flex items-center space-x-3">
                  <span className="text-white/60 text-sm">
                    {activeFiltersCount > 0 ? `${activeFiltersCount} filter${activeFiltersCount !== 1 ? '&rsquo;s' : ''} applied` : 'No filters applied'}
                  </span>
                  <Button
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
                  >
                    Apply Filters
                    <Search className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}