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
import { useAccount } from "wagmi"
import { useQurbanDonation, useZakatDonation, useTransactionStatus } from "@/hooks/use-contracts"

interface PaymentModalProps {
  amount: number
  type: "zakat-maal" | "zakat-fitrah" | "qurban"
  title: string
  children: React.ReactNode
  animalType?: string
  location?: string
}

export function PaymentModal({ amount, type, title, children, animalType = "goat", location = "Indonesia" }: PaymentModalProps) {
  const [selectedToken, setSelectedToken] = useState("eth")
  const [paymentStep, setPaymentStep] = useState<"select" | "confirm" | "processing" | "success">("select")
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>()
  
  const { address, isConnected } = useAccount()
  const { makeQurbanDonation, isLoading: isQurbanLoading } = useQurbanDonation()
  const { makeZakatDonation, isLoading: isZakatLoading } = useZakatDonation()
  const { isSuccess: txSuccess, isError: txError } = useTransactionStatus(txHash)

  const tokens = {
    eth: { name: "ETH", balance: "0.5", icon: "⚡" },
    usdt: { name: "USDT", balance: "150.50", icon: "💰" },
    usdc: { name: "USDC", balance: "89.25", icon: "💵" },
  }

  const isLoading = isQurbanLoading || isZakatLoading

  const processPayment = async () => {
    if (!isConnected) {
      return
    }

    setPaymentStep("processing")

    try {
      let hash: `0x${string}`

      if (type === "qurban") {
        hash = await makeQurbanDonation(amount, animalType, location)
      } else {
        hash = await makeZakatDonation(amount)
      }

      setTxHash(hash)
      
      // Wait for transaction success
      setTimeout(() => {
        setPaymentStep("success")
      }, 2000)

    } catch (error) {
      console.error("Payment failed:", error)
      setPaymentStep("select")
    }
  }

  const resetModal = () => {
    setPaymentStep("select")
    setTxHash(undefined)
  }

  return (
    <Dialog onOpenChange={(open) => !open && resetModal()}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-[#0f2419] border-[#14532d] text-[#f0fdf4] max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#f0fdf4]">Complete Payment</DialogTitle>
        </DialogHeader>

        {paymentStep === "select" && (
          <div className="space-y-6">
            <div className="text-center p-4 bg-[#14532d]/30 rounded-lg">
              <div className="text-sm text-[#f0fdf4]/70 mb-1">{title}</div>
              <div className="text-2xl font-bold text-[#d1b86a] mb-1">{amount} ETH</div>
              <div className="text-xs text-[#f0fdf4]/50">Direct ETH payment on Lisk Sepolia</div>
            </div>

            <div>
              <label className="text-sm text-[#f0fdf4]/70 mb-2 block">Select Token</label>
              <Select value={selectedToken} onValueChange={setSelectedToken}>
                <SelectTrigger className="bg-[#14532d] border-[#14532d] text-[#f0fdf4]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0f2419] border-[#14532d]">
                  {Object.entries(tokens).map(([key, token]) => (
                    <SelectItem key={key} value={key} className="text-[#f0fdf4] focus:bg-[#14532d]">
                      <div className="flex items-center justify-between w-full">
                        <span>
                          {token.icon} {token.name}
                        </span>
                        <span className="text-[#d1b86a] ml-4">Balance: {token.balance}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                disabled={!isConnected}
              >
                {!isConnected ? "Connect Wallet First" : "Continue"}
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
                  <span className="text-[#d1b86a]">{amount} ETH</span>
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
                disabled={isLoading || !isConnected}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Wallet className="h-4 w-4 mr-2" />
                    Pay Now
                  </>
                )}
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
                    <span className="text-[#d1b86a] text-sm font-mono">
                      {txHash ? `${txHash.slice(0, 10)}...` : "Processing..."}
                    </span>
                    {txHash && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 ml-2 text-[#d1b86a]"
                        onClick={() => window.open(`https://sepolia-blockscout.lisk.com/tx/${txHash}`, "_blank")}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    )}
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
