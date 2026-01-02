import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Cookie, Charm, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})
const cookie = Cookie({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cookie",
})
const charm = Charm({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-charm",
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-google-sans-code", // Keeping the variable name in CSS to avoid refactoring all components
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
}

export const metadata: Metadata = {
  title: "Choose Your 2026 Mood",
  description: "Enter 2026 with intention. Choose your mood and personalize your new year experience.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable} ${cookie.variable} ${charm.variable} ${jetbrainsMono.variable}`}>
      <body className={`font-sans antialiased overflow-hidden`} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
