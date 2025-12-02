import type { Metadata } from 'next'
import { Inter, Poppins, Oswald } from 'next/font/google'
import React from 'react'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { ToastProvider } from '@/components/Toast'
import { CartProvider } from '@/context/CartContext'
import ScrollProgressBar from '@/components/ui/ScrollProgressBar'
import LiveNotification from '@/components/ui/LiveNotification'
import ExitIntentPopup from '@/components/ui/ExitIntentPopup'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
})
const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald'
})

export const metadata: Metadata = {
  title: 'GettUpp ENT | Nightlife Content Engine',
  description: 'We replace flaky freelancers with a predictable content engine for Minneapolis nightlife venues. 24-72h delivery. ROI focused.',
  openGraph: {
    title: 'GettUpp ENT | Own The Night',
    description: 'The operating system for nightlife content. Book a Pilot Night today.',
    url: 'https://gettupp.com',
    siteName: 'GettUpp ENT',
    images: [
      {
        url: '/brand/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} ${oswald.variable} antialiased`}>
        <AuthProvider>
          <CartProvider>
            <ToastProvider>
              <ScrollProgressBar />
              {children}
              <LiveNotification />
              <ExitIntentPopup />
            </ToastProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
