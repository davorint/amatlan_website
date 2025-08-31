import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import "../globals.css";
import { HeaderPremium } from "@/components/layout/HeaderPremium";
import { FooterPremium } from "@/components/layout/FooterPremium";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { ClientLayout } from "@/components/layout/ClientLayout";

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
          <ClientLayout fontVariables={`${inter.variable} ${jetbrainsMono.variable}`}>
            <LoadingScreen />
            <div className="min-h-screen flex flex-col relative">
              {/* Ambient background layers */}
              <div className="fixed inset-0 -z-10">
                {/* Primary gradient backdrop */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700" />
                
                {/* Prismatic accent overlay */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
                  <div className="absolute bottom-1/3 -right-1/4 w-80 h-80 bg-amber-500 rounded-full blur-3xl" />
                  <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-rose-500 rounded-full blur-3xl" />
                </div>
                
                {/* Texture overlay */}
                <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3Ccircle%20cx%3D%2227%22%20cy%3D%2227%22%20r%3D%221%22/%3E%3Ccircle%20cx%3D%2247%22%20cy%3D%2247%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
              </div>
              
              <HeaderPremium />
              <main className="flex-1">
                {children}
              </main>
              <FooterPremium />
            </div>
          </ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}