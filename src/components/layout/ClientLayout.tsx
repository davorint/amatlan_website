'use client'

import { useEffect, useState } from 'react'

interface ClientLayoutProps {
  children: React.ReactNode
  fontVariables: string
}

export function ClientLayout({ children, fontVariables }: ClientLayoutProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black">
        {children}
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${fontVariables}`}>
      {children}
    </div>
  )
}