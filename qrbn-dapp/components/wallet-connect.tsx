"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, Copy, Check } from "lucide-react"

// Mock Xellar Kit integration - replace with actual @xellar/kit imports
interface WalletState {
  isConnected: boolean
  address: string | null
  balance: {
    usdt: string
    usdc: string
    eth: string
  }
  network: string
}

export function WalletConnect() {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: { usdt: "0", usdc: "0", eth: "0" },
    network: "Lisk Sepolia",
  })
  const [isConnecting, setIsConnecting] = useState(false)
  const [copied, setCopied] = useState(false)

  const connectWallet = async () => {
    setIsConnecting(true)
    try {
      // Mock connection - replace with actual Xellar Kit connection
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setWallet({
        isConnected: true,
        address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5b8c",
        balance: {
          usdt: "150.50",
          usdc: "89.25",
          eth: "0.0234",
        },
        network: "Lisk Sepolia",
      })
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setWallet({
      isConnected: false,
      address: null,
      balance: { usdt: "0", usdc: "0", eth: "0" },
      network: "Lisk Sepolia",
    })
  }

  const copyAddress = async () => {
    if (wallet.address) {
      await navigator.clipboard.writeText(wallet.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (!wallet.isConnected) {
    return (
      <Button
        onClick={connectWallet}
        disabled={isConnecting}
        className="bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] glow-shadow"
      >
        <Wallet className="h-4 w-4 mr-2" />
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </Button>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Badge className="bg-[#14532d] text-[#d1b86a]">{wallet.network}</Badge>
        <div className="text-sm text-[#f0fdf4]">{formatAddress(wallet.address!)}</div>
        <Button
          size="sm"
          variant="ghost"
          onClick={copyAddress}
          className="h-6 w-6 p-0 text-[#f0fdf4] hover:text-[#d1b86a]"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        </Button>
      </div>

      <div className="flex items-center space-x-3 text-sm">
        <div className="text-[#f0fdf4]/70">
          USDT: <span className="text-[#d1b86a]">{wallet.balance.usdt}</span>
        </div>
        <div className="text-[#f0fdf4]/70">
          USDC: <span className="text-[#d1b86a]">{wallet.balance.usdc}</span>
        </div>
      </div>

      <Button
        size="sm"
        variant="outline"
        onClick={disconnectWallet}
        className="border-[#14532d] text-[#f0fdf4] hover:bg-[#14532d]/20 bg-transparent"
      >
        Disconnect
      </Button>
    </div>
  )
}
