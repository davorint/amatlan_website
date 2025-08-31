import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { MapPin, Mail, Phone, Facebook, Instagram } from 'lucide-react'

export function Footer() {
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
    <footer className="bg-earth-brown text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-8 w-8 text-spiritual-gold" />
              <span className="text-xl font-bold">Magic Amatlán</span>
            </div>
            <p className="text-gray-300 mb-4">
              {t('description')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-300 hover:text-spiritual-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-spiritual-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-semibold text-spiritual-gold mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info & Copyright */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{t('location')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@amatlan.mx" className="hover:text-white transition-colors">
                  info@amatlan.mx
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+525555555555" className="hover:text-white transition-colors">
                  +52 (555) 555-5555
                </a>
              </div>
            </div>
            <div className="text-sm text-gray-300">
              {t('copyright')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}