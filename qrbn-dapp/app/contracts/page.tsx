"use client"

import { ContractDemo } from "@/components/contract-demo"

export default function ContractsPage() {
  return (
    <div className="min-h-screen islamic-pattern py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#f0fdf4] mb-4">Smart Contract Integration</h1>
          <p className="text-[#f0fdf4]/70 max-w-2xl mx-auto">
            Explore the QRBN ecosystem smart contracts deployed on Lisk Sepolia testnet. 
            See live data from our governance, token, and donation contracts.
          </p>
        </div>
        <ContractDemo />
      </div>
    </div>
  )
}
