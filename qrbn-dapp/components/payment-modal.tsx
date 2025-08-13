"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wallet, ArrowRight, CheckCircle, Clock, ExternalLink, Loader2 } from "lucide-react"
import { useContracts } from "@/hooks/use-contracts"
import { useAccount } from "wagmi"
import { parseUnits } from "viem"

interface PaymentModalProps {
  amount: number
  type: "zakat-maal" | "zakat-fitrah" | "qurban"
  title: string
  children: React.ReactNode
}

export function PaymentModal({ amount, type, title, children }: PaymentModalProps) {
  const [selectedToken, setSelectedToken] = useState("usdt")
  const [paymentStep, setPaymentStep] = useState<"select" | "confirm" | "processing" | "success">("select")
  const [txHash, setTxHash] = useState("")
  const [usdtBalance, setUSDTBalance] = useState<string>("0")
  
  const contracts = useContracts()
  const { address, isConnected } = useAccount()

  const tokens = {
    usdt: { name: "USDT", balance: usdtBalance, icon: "💰" },
  }

  // Load USDT balance when modal opens
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

  const processPayment = async () => {
    if (!contracts || !address || !isConnected) {
      console.error('Wallet not connected or contracts not available')
      return
    }

    setPaymentStep("processing")

    try {
      // Convert amount to wei (USDT has 6 decimals)
      const amountInWei = parseUnits(amount.toString(), 6)
      
      let hash: `0x${string}`
      
      if (type === "qurban") {
        hash = await contracts.contributeQurban(amountInWei)
      } else {
        // For zakat payments
        const zakatType = type === "zakat-maal" ? "maal" : "fitrah"
        hash = await contracts.donateZakat(amountInWei, zakatType)
      }

      setTxHash(hash)
      setPaymentStep("success")
    } catch (error) {
      console.error("Payment processing error:", error)
      // Handle error - could add error state here
      setPaymentStep("select")
    }
  }

  const resetModal = () => {
    setPaymentStep("select")
    setTxHash("")
  }

  const openInBlockExplorer = () => {
    if (txHash) {
      window.open(`https://sepolia-blockscout.lisk.com/tx/${txHash}`, '_blank')
    }
  }

  return (
    <Dialog onOpenChange={(open) => {
      if (!open) {
        resetModal()
      } else {
        loadUSDTBalance()
      }
    }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-[#0f2419] border-[#14532d] text-[#f0fdf4] max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#f0fdf4]">Complete Payment</DialogTitle>
        </DialogHeader>

        {paymentStep === "select" && (
          <div className="space-y-6">
            <div className="text-center p-4 bg-[#14532d]/30 rounded-lg">
              <div className="text-sm text-[#f0fdf4]/70 mb-1">{title}</div>
              <div className="text-2xl font-bold text-[#d1b86a] mb-1">{amount} USDT</div>
              <div className="text-xs text-[#f0fdf4]/50">Direct USDT payment</div>
            </div>

            <div>
              <label className="text-sm text-[#f0fdf4]/70 mb-2 block">Payment Token</label>
              <div className="bg-[#14532d] border border-[#14532d] rounded-md p-3 text-[#f0fdf4]">
                <div className="flex items-center justify-between w-full">
                  <span>
                    💰 USDT
                  </span>
                  <span className="text-[#d1b86a]">Balance: {usdtBalance}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#f0fdf4]/60">
              <div className="flex items-center">
                <ArrowRight className="h-3 w-3 mr-2" />
                Direct USDT payment on Lisk Sepolia
              </div>
              <div className="flex items-center">
                <ArrowRight className="h-3 w-3 mr-2" />
                No currency conversion needed
              </div>
              <div className="flex items-center">
                <ArrowRight className="h-3 w-3 mr-2" />
                NFT certificate minted upon confirmation
              </div>
            </div>

            <Button
              onClick={() => setPaymentStep("confirm")}
              className="w-full bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] glow-shadow"
            >
              Continue
            </Button>
          </div>
        )}

        {paymentStep === "confirm" && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-lg font-semibold text-[#f0fdf4] mb-2">Confirm Payment</div>
              <div className="text-sm text-[#f0fdf4]/70">Please review your transaction details</div>
            </div>

            <Card className="bg-[#14532d]/30 border-[#14532d]">
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#f0fdf4]/70">Type:</span>
                  <span className="text-[#f0fdf4]">{title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#f0fdf4]/70">Amount:</span>
                  <span className="text-[#d1b86a]">{amount} USDT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#f0fdf4]/70">Network:</span>
                  <Badge className="bg-[#14532d] text-[#d1b86a]">Lisk Sepolia</Badge>
                </div>
                <Separator className="bg-[#14532d]" />
                <div className="flex justify-between">
                  <span className="text-[#f0fdf4]/70">Gas Fee:</span>
                  <span className="text-[#f0fdf4]">~$0.02</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setPaymentStep("select")}
                className="flex-1 border-[#14532d] text-[#f0fdf4] hover:bg-[#14532d]/20 bg-transparent"
              >
                Back
              </Button>
              <Button
                onClick={processPayment}
                className="flex-1 bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] glow-shadow"
              >
                <Wallet className="h-4 w-4 mr-2" />
                Pay Now
              </Button>
            </div>
          </div>
        )}

        {paymentStep === "processing" && (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <Clock className="h-12 w-12 text-[#d1b86a] animate-spin" />
            </div>
            <div>
              <div className="text-lg font-semibold text-[#f0fdf4] mb-2">Processing Payment</div>
              <div className="text-sm text-[#f0fdf4]/70 mb-4">
                Please wait while we process your transaction on Lisk Sepolia
              </div>
              <Progress value={65} className="h-2" />
            </div>
            <div className="text-xs text-[#f0fdf4]/50">This may take a few moments...</div>
          </div>
        )}

        {paymentStep === "success" && (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <CheckCircle className="h-12 w-12 text-[#d1b86a]" />
            </div>
            <div>
              <div className="text-lg font-semibold text-[#f0fdf4] mb-2">Payment Successful!</div>
              <div className="text-sm text-[#f0fdf4]/70 mb-4">
                Your {title.toLowerCase()} has been processed successfully
              </div>
            </div>

            <Card className="bg-[#14532d]/30 border-[#14532d]">
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#f0fdf4]/70">Transaction Hash:</span>
                  <div className="flex items-center">
                    <span className="text-[#d1b86a] text-sm font-mono">{txHash ? txHash.slice(0, 10) : 'N/A'}...</span>
                    {/* <span className="text-[#d1b86a] text-sm font-mono">{txHash.slice(0, 10)}...</span> */}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 ml-2 text-[#d1b86a]"
                      onClick={() => txHash && window.open(`https://sepolia-blockscout.lisk.com/tx/${txHash}`, "_blank")}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#f0fdf4]/70">Status:</span>
                  <Badge className="bg-[#14532d] text-[#d1b86a]">Confirmed</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#f0fdf4]/70">NFT Certificate:</span>
                  <span className="text-[#d1b86a]">Minting...</span>
                </div>
              </CardContent>
            </Card>

            <div className="text-xs text-[#f0fdf4]/60">
              Your NFT certificate will be available in your dashboard shortly
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
