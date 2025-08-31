import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import "../globals.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://magicamatlan.com'),
  title: "Magic Amatlán - Directorio Espiritual de Morelos",
  description: "Descubre experiencias espirituales, temazcales, retiros, sanadores y conexión con la naturaleza en Amatlán Morelos, México.",
  keywords: ["Magic Amatlán", "Amatlán", "Morelos", "temazcal", "retiros espirituales", "sanadores", "México", "experiencias místicas"],
  authors: [{ name: "Magic Amatlán Directory" }],
  openGraph: {
    title: "Magic Amatlán - Directorio Espiritual de Morelos",
    description: "Experiencias espirituales auténticas en el pueblo místico de México",
    type: "website",
    locale: "es_MX",
  },
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as 'en' | 'es')) {
    notFound()
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen flex flex-col relative">
            {/* Background */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700" />
            
            {/* Header placeholder */}
            <header className="p-4 border-b border-white/10">
              <div className="container mx-auto">
                <h1 className="text-2xl font-bold text-white">Magic Amatlán</h1>
              </div>
            </header>
            
            <main className="flex-1">
              {children}
            </main>
            
            {/* Footer placeholder */}
            <footer className="p-4 border-t border-white/10 text-center text-white/60">
              <p>&copy; 2024 Magic Amatlán. All rights reserved.</p>
            </footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}