'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Menu, X, MapPin, Sparkles } from 'lucide-react'
import { LanguageSelector } from './LanguageSelector'

export function HeaderPremium() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const t = useTranslations('Navigation')

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-black/20 backdrop-blur-xl' 
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <MapPin className="h-10 w-10 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">
                  Magic-Amatlán
                </span>
                <div className="flex items-center space-x-1 text-xs text-white/60">
                  <Sparkles className="h-3 w-3" />
                  <span>Spiritual Sanctuary</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-8">
                <Link 
                  href="/events" 
                  className="text-white/80 hover:text-white transition-colors font-medium"
                >
                  {t('events')}
                </Link>
                
                <Link 
                  href="/guides" 
                  className="text-white/80 hover:text-white transition-colors font-medium"
                >
                  {t('guides')}
                </Link>
                
                <Link 
                  href="/community" 
                  className="text-white/80 hover:text-white transition-colors font-medium"
                >
                  {t('community')}
                </Link>
                
                <Button 
                  variant="outline" 
                  className="glass-button-nav text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/facilitators">{t('facilitators')}</Link>
                </Button>
                
                <LanguageSelector />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-3">
              <LanguageSelector />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:bg-white/10"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-2xl relative">
            <div className="px-4 py-6 space-y-3 relative z-10">
              <div className="space-y-2">
                {['events', 'guides', 'community'].map((item) => (
                  <div key={item}>
                    <Link
                      href={`/${item}` as '/events' | '/guides' | '/community'}
                      className="block px-3 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t(item as 'events' | 'guides' | 'community')}
                    </Link>
                  </div>
                ))}
                
                <div className="px-3 pt-3">
                  <Button variant="outline" asChild className="w-full glass-button-nav text-white">
                    <Link href="/facilitators">{t('facilitators')}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <style jsx global>{`
        .glass-panel {
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
        }
        
        .glass-button-nav {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
        }
        
        .glass-button-nav:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        /* Comprehensive border removal for Navigation Menu */
        nav *,
        [data-radix-navigation-menu-root],
        [data-radix-navigation-menu-root] *,
        [data-radix-navigation-menu-content],
        [data-radix-navigation-menu-content] *,
        [data-radix-navigation-menu-viewport],
        [data-radix-navigation-menu-viewport] *,
        [data-radix-navigation-menu-trigger],
        [data-radix-navigation-menu-trigger] *,
        [data-radix-navigation-menu-item],
        [data-radix-navigation-menu-item] *,
        [data-radix-navigation-menu-link],
        [data-radix-navigation-menu-link] *,
        .w-\\[420px\\],
        .w-\\[420px\\] *,
        div[class*="w-[420px]"],
        div[class*="w-[420px]"] * {
          border: none !important;
          border-color: transparent !important;
          outline: none !important;
          outline-color: transparent !important;
          border-width: 0 !important;
          border-style: none !important;
        }

        /* Force remove any box-shadow that might look like borders */
        [data-radix-navigation-menu-content],
        .w-\\[420px\\],
        div[class*="w-[420px]"] {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
        }

        /* Remove any default popover/dropdown borders */
        [data-radix-popper-content-wrapper],
        [data-radix-popper-content-wrapper] *,
        [role="menu"],
        [role="menu"] *,
        [role="listbox"],
        [role="listbox"] * {
          border: none !important;
          border-color: transparent !important;
          outline: none !important;
        }
      `}</style>
    </>
  )
}