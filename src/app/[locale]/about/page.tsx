'use client'

import { motion } from 'motion/react'
// import { useTranslations } from 'next-intl'
import { 
  Sparkles, 
  Heart, 
  Mountain, 
  Sun, 
  Star,
  Flame,
  Compass,
  Shield,
  Users,
  TreePine,
  Feather
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link } from '@/i18n/routing'

const teamMembers = [
  {
    name: "María Elena Coatlicue",
    role: "Founder & Spiritual Director",
    image: "/images/team/maria-elena.jpg",
    bio: "Born in Amatlán, María Elena carries the ancestral wisdom of her Nahuatl grandmothers. She founded Magic Amatlán to preserve and share the sacred traditions of this mystical land.",
    specialties: ["Traditional Healing", "Ceremonial Leadership", "Ancient Wisdom"]
  },
  {
    name: "Carlos Tlacaelel",
    role: "Chief Temazcalero",
    image: "/images/team/carlos-tlacaelel.jpg",
    bio: "A master of the sacred fire ceremony, Carlos has guided over 2,000 souls through the transformative temazcal experience with deep reverence and authentic tradition.",
    specialties: ["Temazcal Ceremonies", "Fire Rituals", "Energy Healing"]
  },
  {
    name: "Luna Itzamna",
    role: "Retreat Coordinator",
    image: "/images/team/luna-itzamna.jpg",
    bio: "Bridging ancient wisdom with modern wellness, Luna crafts transformative retreat experiences that honor both tradition and contemporary healing modalities.",
    specialties: ["Retreat Design", "Holistic Wellness", "Integration Support"]
  }
]

const values = [
  {
    icon: Heart,
    title: "Sacred Authenticity",
    description: "We honor the original teachings and ceremonies passed down through generations of indigenous wisdom keepers.",
    color: "from-red-500 to-pink-500"
  },
  {
    icon: Shield,
    title: "Cultural Respect",
    description: "Every experience is guided by indigenous masters who carry the lineage and authority of these sacred traditions.",
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: Mountain,
    title: "Earth Connection",
    description: "We facilitate profound relationships with Pachamama, recognizing our sacred responsibility to protect and honor the land.",
    color: "from-amber-500 to-orange-500"
  },
  {
    icon: Compass,
    title: "Inner Transformation",
    description: "Each journey is designed to catalyze deep personal healing, spiritual awakening, and authentic self-discovery.",
    color: "from-purple-500 to-violet-500"
  },
  {
    icon: Users,
    title: "Sacred Community",
    description: "We create containers for meaningful connections, supporting each soul's journey while fostering collective healing.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Flame,
    title: "Ancient Wisdom",
    description: "We are guardians of millennia-old practices, ensuring their preservation for future generations of seekers.",
    color: "from-orange-500 to-red-500"
  }
]

const stats = [
  { number: "1,000+", label: "Years of Tradition", icon: TreePine },
  { number: "5,000+", label: "Souls Transformed", icon: Sparkles },
  { number: "25+", label: "Sacred Sites", icon: Mountain },
  { number: "15+", label: "Master Healers", icon: Sun }
]

export default function AboutPage() {
  // const t = useTranslations()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-breathe" />
          <div className="absolute bottom-20 -right-20 w-80 h-80 bg-amber-500 rounded-full blur-3xl animate-float" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-500 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
                <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 text-sm">
                  Sacred Mission
                </Badge>
                <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8">
                Guardians of
                <span className="block bg-gradient-to-r from-orange-400 via-amber-400 to-orange-600 bg-clip-text text-transparent animate-pulse">
                  Ancient Wisdom
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/80 leading-relaxed mb-12 max-w-3xl mx-auto">
                In the mystical heart of Amatlán de Quetzalcóatl, where the great feathered serpent was born, 
                we preserve and share the sacred traditions that have guided souls for over a millennium.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8"
                >
                  Begin Your Journey
                  <Compass className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Meet Our Guides
                  <Users className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src="/images/amatlan-sacred-site.jpg"
                      alt="Sacred Amatlán Landscape"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-2xl">
                    <Feather className="w-10 h-10 text-white" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Sun className="w-8 h-8 text-amber-400" />
                  <h2 className="text-3xl lg:text-4xl font-bold text-white">
                    Birth of a Sacred Vision
                  </h2>
                </div>
                
                <div className="space-y-6 text-white/80 leading-relaxed">
                  <p>
                    Magic Amatlán was born from a prophetic dream received by our founder, María Elena Coatlicue, 
                    during a full moon ceremony in 2018. The ancestors spoke of a time when ancient wisdom would 
                    need to bridge with modern souls seeking authentic transformation.
                  </p>
                  
                  <p>
                    In the very birthplace of Quetzalcóatl, the feathered serpent deity of wisdom and wind, 
                    we established a sanctuary where traditional healers, modern seekers, and the sacred land 
                    could unite in harmonious purpose.
                  </p>
                  
                  <p>
                    Today, we stand as guardians of ceremonies that predate the Spanish conquest, offering 
                    authentic experiences that honor both the indigenous masters who carry this lineage and 
                    the contemporary souls called to walk this ancient path.
                  </p>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-2xl border border-orange-500/20">
                  <blockquote className="text-lg italic text-orange-200 mb-4">
                    &ldquo;The ancestors whispered: &lsquo;Build bridges of light between the ancient ways and modern hearts, 
                    for in this union lies the healing of both the individual and the world.&rsquo;&rdquo;
                  </blockquote>
                  <cite className="text-amber-400 font-medium">— Vision received by María Elena Coatlicue</cite>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Our Sacred Principles
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                These values guide every ceremony, retreat, and interaction, ensuring authenticity 
                and respect for the ancient wisdom we serve.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative"
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl h-full">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-4">
                        {value.title}
                      </h3>
                      
                      <p className="text-white/70 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Sacred Statistics */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Legacy of Sacred Service
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center group"
                  >
                    <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-2xl p-8 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-500 hover:-translate-y-2">
                      <Icon className="w-12 h-12 text-amber-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                      <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                        {stat.number}
                      </div>
                      <div className="text-white/60 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Sacred Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Sacred Wisdom Keepers
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Meet the indigenous masters and spiritual guides who carry the authentic lineages 
                and sacred knowledge of this mystical land.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-12">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group"
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl h-full">
                    <div className="relative mb-6">
                      <div className="aspect-square rounded-2xl overflow-hidden">
                        <img 
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {member.name}
                      </h3>
                      <p className="text-amber-400 font-medium mb-4">
                        {member.role}
                      </p>
                      <p className="text-white/70 leading-relaxed mb-6">
                        {member.bio}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.specialties.map((specialty, idx) => (
                        <Badge 
                          key={idx}
                          variant="outline" 
                          className="text-amber-400 border-amber-400/30 text-xs"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-orange-500/10 to-amber-500/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Your Sacred Journey Awaits
                </h2>
                <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                  The ancestors are calling. The sacred fires are lit. Your transformation 
                  story is ready to unfold in the mystical heart of Amatlán.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8"
                  asChild
                >
                  <Link href="/experiences">
                    Explore Sacred Experiences
                    <Sparkles className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/contact">
                    Connect With Us
                    <Heart className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}