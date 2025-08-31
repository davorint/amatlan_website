import type { Metadata } from "next"
// import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

// const inter = Inter({ 
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "swap",
// })

// const playfair = Playfair_Display({ 
//   subsets: ["latin"],
//   variable: "--font-playfair",
//   display: "swap",
// })

export const metadata: Metadata = {
  metadataBase: new URL('https://magicamatlan.com'),
  title: "Magic Amatlán - Spiritual Wellness Sanctuary",
  description: "Discover transformative spiritual wellness experiences in the mystical heart of Amatlan, Morelos. Temazcal ceremonies, healing retreats, and authentic Mexican spiritual traditions.",
  keywords: ["temazcal", "spiritual wellness", "amatlan morelos", "mexico retreat", "healing sanctuary", "spiritual ceremonies"],
  authors: [{ name: "Magic Amatlán", url: "https://magicamatlan.com" }],
  openGraph: {
    title: "Magic Amatlán - Spiritual Wellness Sanctuary",
    description: "Transform your spirit in the mystical heart of Amatlan, Morelos",
    url: "https://magicamatlan.com",
    siteName: "Magic Amatlán",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Magic Amatlán Spiritual Wellness Sanctuary",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Magic Amatlán - Spiritual Wellness Sanctuary",
    description: "Transform your spirit in the mystical heart of Amatlan, Morelos",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This is just a pass-through for i18n routing
  return children
}