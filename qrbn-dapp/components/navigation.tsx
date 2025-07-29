"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Moon, Star } from "lucide-react"
import { WalletConnect } from "./wallet-connect"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="border-b border-[#14532d] bg-[#071a12]/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <Moon className="h-8 w-8 text-[#d1b86a] crescent-shadow" />
              <Star className="h-3 w-3 text-[#d1b86a] absolute -top-1 -right-1" />
            </div>
            <span className="text-xl font-bold text-[#f0fdf4]">QRBN.app</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/zakat" className="text-[#f0fdf4] hover:text-[#d1b86a] transition-colors">
              Zakat
            </Link>
            <Link href="/qurban" className="text-[#f0fdf4] hover:text-[#d1b86a] transition-colors">
              Qurban
            </Link>
            <Link href="/dashboard" className="text-[#f0fdf4] hover:text-[#d1b86a] transition-colors">
              Dashboard
            </Link>
            <Link
              href="https://www.tally.xyz/gov/qrbn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f0fdf4] hover:text-[#d1b86a] transition-colors"
            >
              DAO
            </Link>
            <WalletConnect />
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-[#f0fdf4]">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link href="/zakat" className="block text-[#f0fdf4] hover:text-[#d1b86a]">
              Zakat
            </Link>
            <Link href="/qurban" className="block text-[#f0fdf4] hover:text-[#d1b86a]">
              Qurban
            </Link>
            <Link href="/dashboard" className="block text-[#f0fdf4] hover:text-[#d1b86a]">
              Dashboard
            </Link>
            <Link
              href="https://www.tally.xyz/gov/qrbn"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[#f0fdf4] hover:text-[#d1b86a]"
            >
              DAO
            </Link>
            <div className="pt-2">
              <WalletConnect />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
