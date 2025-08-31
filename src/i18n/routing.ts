import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'es'],

  // Used when no locale matches
  defaultLocale: 'es',

  // The `pathnames` object maps pathnames to their translated equivalents
  pathnames: {
    '/': '/',
    '/experiences': {
      en: '/experiences',
      es: '/experiencias'
    },
    '/temazcales': {
      en: '/temazcales',
      es: '/temazcales'
    },
    '/retreats': {
      en: '/retreats',
      es: '/retiros'
    },
    '/eco-stays': {
      en: '/eco-stays',
      es: '/eco-hospedajes'
    },
    '/healers': {
      en: '/healers',
      es: '/sanadores'
    },
    '/nature': {
      en: '/nature',
      es: '/naturaleza'
    },
    '/events': {
      en: '/events',
      es: '/eventos'
    },
    '/guides': {
      en: '/guides',
      es: '/guias'
    },
    '/community': {
      en: '/community',
      es: '/comunidad'
    },
    '/facilitators': {
      en: '/facilitators',
      es: '/facilitadores'
    },
    '/facilitators/add-experience': {
      en: '/facilitators/add-experience',
      es: '/facilitadores/agregar-experiencia'
    },
    '/facilitators/plans': {
      en: '/facilitators/plans',
      es: '/facilitadores/planes'
    },
    '/facilitators/dashboard': {
      en: '/facilitators/dashboard',
      es: '/facilitadores/panel'
    },
    '/about': {
      en: '/about',
      es: '/acerca'
    },
    '/contact': {
      en: '/contact',
      es: '/contacto'
    },
    '/journal': {
      en: '/journal',
      es: '/revista'
    }
  }
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)