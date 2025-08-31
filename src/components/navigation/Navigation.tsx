'use client'

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { Sparkles, Menu } from "lucide-react"
import { useState, useEffect, useCallback } from "react"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  
  const navOpacity = useTransform(scrollY, [0, 100], [0.85, 0.98])
  const navBlur = useTransform(scrollY, [0, 100], [12, 24])
  const navScale = useTransform(scrollY, [0, 100], [1, 0.98])


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Optimized event handlers with useCallback
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const navItems = [
    { label: "Sacred Spaces", href: "#spaces" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Location", href: "#location" },
  ]

  return (
    <motion.nav
      style={{
        backgroundColor: `rgba(9, 8, 10, ${navOpacity.get()})`,
        backdropFilter: `blur(${navBlur.get()}px) saturate(180%)`,
        transform: `scale(${navScale.get()})`,
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-white/10 ${
        isScrolled ? 'py-4 shadow-2xl shadow-black/30' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo */}
          <motion.div
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center space-x-4 group cursor-pointer"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-9 h-9 text-[var(--color-prism-sunset)] animate-breathe-glow" />
              </motion.div>
              <div className="absolute inset-0 bg-[var(--color-prism-sunset)] blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
              <div className="absolute -inset-2 bg-gradient-to-r from-[var(--color-prism-sunset)]/20 to-[var(--color-prism-amber)]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="text-2xl font-bold text-white text-shadow-soft">
              Magic <span className="text-kinetic">Amatlán</span>
            </div>
          </motion.div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {/* Navigation Items */}
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 1) * 0.1, ease: [0.19, 1, 0.22, 1] }}
                whileHover={{ y: -2 }}
                className="text-white/85 hover:text-white transition-all duration-200 accessible-luxury relative group font-medium text-lg tracking-wide px-3 py-2 rounded-lg hover:bg-white/5"
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Enhanced CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Button
                className="btn-luxury text-white font-semibold px-8 py-3 accessible-luxury hover-lift text-lg tracking-wide relative overflow-hidden group"
                size="lg"
              >
                <span className="relative z-10">Begin Your Journey</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[var(--color-prism-amber)] to-[var(--color-prism-rose)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                />
              </Button>
            </motion.div>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:text-[var(--color-prism-sunset)] hover:bg-white/20 transition-all duration-300 accessible-luxury focus:outline-none focus:ring-2 focus:ring-white/50"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label="Mobile menu"
          >
            <Menu className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -20 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              style={{
                backgroundColor: `rgba(9, 8, 10, ${Math.min(navOpacity.get() + 0.1, 0.98)})`,
                backdropFilter: `blur(${navBlur.get() + 4}px) saturate(180%)`,
              }}
              className="md:hidden overflow-hidden border-t border-white/20 shadow-2xl shadow-black/50"
            >
              {/* Background decoration matching navbar */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
                  <Sparkles className="w-full h-full text-white" />
                </div>
                <div className="absolute -top-5 -right-5 w-24 h-24 bg-gradient-to-br from-[var(--color-prism-sunset)]/20 to-[var(--color-prism-amber)]/20 rounded-full blur-2xl animate-pulse"/>
                <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-gradient-to-tr from-[var(--color-water-blue)]/20 to-[var(--color-nature-green)]/20 rounded-full blur-2xl animate-pulse"/>
              </div>

              <div className="relative z-10 p-6">
                {/* Mobile Navigation */}
                <div className="space-y-2 mb-6 border-t border-white/15 pt-6">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group block text-white/85 hover:text-white text-lg font-medium p-3 rounded-xl bg-gradient-to-r from-white/5 to-white/2 hover:from-white/10 hover:to-white/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/10 hover:border-white/20 shadow-md hover:shadow-lg relative overflow-hidden"
                      onClick={closeMobileMenu}
                    >
                      <span className="relative z-10">{item.label}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--color-prism-sunset)] to-[var(--color-prism-amber)] group-hover:w-full transition-all duration-500 rounded-full" />
                    </motion.a>
                  ))}
                </div>

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="border-t border-white/15 pt-6"
                >
                  <Button
                    className="btn-luxury text-white font-semibold w-full text-lg py-4 shadow-2xl hover:shadow-[var(--color-prism-sunset)]/20 border border-white/10 hover:border-white/30 relative overflow-hidden group"
                    size="lg"
                  >
                    <span className="relative z-10">Begin Your Journey</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[var(--color-prism-amber)] to-[var(--color-prism-rose)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                    />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}