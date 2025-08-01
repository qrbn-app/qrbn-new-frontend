"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, Copy, Check } from "lucide-react"
import { useAccount, useDisconnect } from "wagmi"
import { useConnectModal } from "@xellar/kit"
import { useContracts } from "@/hooks/use-contracts"

export function WalletConnect() {
  const { address, isConnected, chain } = useAccount()
  const { disconnect } = useDisconnect()
  const { open } = useConnectModal()
  const [copied, setCopied] = useState(false)
  const [usdtBalance, setUSDTBalance] = useState<string>("0")
  
  const contracts = useContracts()

  // Load USDT balance when wallet is connected
  useEffect(() => {
    const loadUSDTBalance = async () => {
      if (!contracts || !address) return
      
      try {
        const balance = await contracts.getUSDTBalance(address)
        const formatted = contracts.formatTokenAmount(balance, 6) // USDT has 6 decimals
        setUSDTBalance(formatted)
      } catch (error) {
        console.error('Error loading USDT balance:', error)
      }
    }

    if (isConnected && address && contracts) {
      loadUSDTBalance()
    }
  }, [isConnected, address, contracts])

  const connectWallet = async () => {
    try {
      // Use Xellar Kit's modal to show the connection options
      open()
    } catch (error) {
      console.error("Failed to open wallet modal:", error)
    }
  }

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (!isConnected) {
    return (
      <Button
        onClick={connectWallet}
        className="bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] glow-shadow"
      >
        <Wallet className="h-4 w-4 mr-2" />
        Connect Wallet
      </Button>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Badge className="bg-[#14532d] text-[#d1b86a]">
          {chain?.name || "Lisk Sepolia"}
        </Badge>
        <div className="text-sm text-[#f0fdf4]">{formatAddress(address!)}</div>
        <Button
          size="sm"
          variant="ghost"
          onClick={copyAddress}
          className="h-6 w-6 p-0 text-[#f0fdf4] hover:text-[#d1b86a]"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        </Button>
      </div>

      {usdtBalance && (
        <div className="flex items-center space-x-3 text-sm">
          <div className="text-[#f0fdf4]/70">
            USDT: <span className="text-[#d1b86a]">
              {parseFloat(usdtBalance).toFixed(2)} USDT
            </span>
          </div>
        </div>
      )}

      <Button
        size="sm"
        variant="outline"
        onClick={() => disconnect()}
        className="border-[#14532d] text-[#f0fdf4] hover:bg-[#14532d]/20 bg-transparent"
      >
        Disconnect
      </Button>
    </div>
  )
}
