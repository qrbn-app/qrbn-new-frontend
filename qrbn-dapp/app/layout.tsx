import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { WalletProvider } from "@/components/providers/web3-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "QRBN.app - Islamic Finance Donation Platform",
  description: "Transparent Islamic donations with blockchain technology",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <div className="min-h-screen bg-[#071a12] text-[#f0fdf4]">
            <Navigation />
            <main>{children}</main>
          </div>
          <Toaster />
        </WalletProvider>
      </body>
    </html>
  )
}
