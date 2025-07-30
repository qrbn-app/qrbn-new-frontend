"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useAccount } from 'wagmi'
import { 
  useUserDashboardData, 
  useTreasuryData, 
  useNetworkStatus,
  useGovernance,
  useContractService
} from '@/hooks/use-contracts'
import { formatEther } from 'viem'

export function ContractInteractionDemo() {
  const { address, isConnected } = useAccount()
  const userData = useUserDashboardData(address)
  const treasuryData = useTreasuryData()
  const networkStatus = useNetworkStatus()
  const governance = useGovernance()
  const contractService = useContractService()

  if (!isConnected) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            Please connect your wallet to view contract interactions
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Network Status */}
      <Card>
        <CardHeader>
          <CardTitle>Network Status - Lisk Sepolia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Connection Status</p>
              <Badge variant={networkStatus.isConnected ? "default" : "destructive"}>
                {networkStatus.isConnected ? "Connected" : "Disconnected"}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Block</p>
              <p className="font-mono text-sm">
                {networkStatus.blockNumber ? networkStatus.blockNumber.toString() : "Loading..."}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Gas Price</p>
              <p className="font-mono text-sm">
                {networkStatus.gasPrice 
                  ? `${formatEther(networkStatus.gasPrice)} ETH` 
                  : "Loading..."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Contract Addresses */}
      <Card>
        <CardHeader>
          <CardTitle>Smart Contract Addresses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">QrbnTimelock:</span>
              <code className="text-xs bg-muted p-1 rounded">0x5a2B2Dd70740FE6e89f27c1873Cd51e2eA6128B4</code>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">QrbnGov:</span>
              <code className="text-xs bg-muted p-1 rounded">0x20f0DC35b3439B8bd123a7968086A397cde38af7</code>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">QrbnToken:</span>
              <code className="text-xs bg-muted p-1 rounded">0xF288b95F986bd297c3e6E283066CB52B6986E931</code>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Qurban:</span>
              <code className="text-xs bg-muted p-1 rounded">0xcaba4eC21D3f63Ac33817a14564A0c9Da0E8410b</code>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">QurbanNFT:</span>
              <code className="text-xs bg-muted p-1 rounded">0x49316Dd941a78f27f431c072722b7C613D9731d4</code>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">QrbnTreasury:</span>
              <code className="text-xs bg-muted p-1 rounded">0x93a5FD10595F311f1134Ea673136CA22412e5158</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Data */}
        <Card>
          <CardHeader>
            <CardTitle>Your Wallet Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">QRBN Token Balance</p>
                <p className="text-lg font-semibold">{userData.balance} QRBN</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">USDT Balance</p>
                <p className="text-lg font-semibold">{userData.balance} USDT</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">NFT Certificates</p>
                <p className="text-lg font-semibold">{userData.nftCount} NFTs</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Donation History</p>
                <p className="text-lg font-semibold">
                  {userData.donations?.length || 0} donations
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Treasury Data */}
        <Card>
          <CardHeader>
            <CardTitle>Treasury Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Treasury Balance</p>
                <p className="text-lg font-semibold">{treasuryData.totalBalance} ETH</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Zakat Pool</p>
                <p className="text-lg font-semibold">{treasuryData.zakatBalance} ETH</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Qurban Pool</p>
                <p className="text-lg font-semibold">{treasuryData.qurbanBalance} ETH</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Total Donations</p>
                <p className="text-lg font-semibold">{treasuryData.totalDonations} ETH</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Governance */}
      <Card>
        <CardHeader>
          <CardTitle>Governance (DAO)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Proposals</p>
              <p className="text-lg font-semibold">{governance.proposalCount}</p>
            </div>
            <Button variant="outline" disabled>
              View Proposals
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button size="sm" className="w-full">
              Make Qurban
            </Button>
            <Button size="sm" variant="outline" className="w-full">
              Pay Zakat
            </Button>
            <Button size="sm" variant="outline" className="w-full">
              View NFTs
            </Button>
            <Button size="sm" variant="outline" className="w-full">
              Governance
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contract Service Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Contract Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              These are the contract methods available through the ContractService:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div>
                <strong>Qurban Contract:</strong>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>makeQurbanDonation()</li>
                  <li>makeZakatDonation()</li>
                  <li>getDonationHistory()</li>
                  <li>getTotalDonations()</li>
                </ul>
              </div>
              <div>
                <strong>NFT Contract:</strong>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>getUserNFTs()</li>
                  <li>tokenURI()</li>
                  <li>balanceOf()</li>
                </ul>
              </div>
              <div>
                <strong>Treasury Contract:</strong>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>getTreasuryData()</li>
                  <li>getZakatBalance()</li>
                  <li>getQurbanBalance()</li>
                </ul>
              </div>
              <div>
                <strong>Token Operations:</strong>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>getQRBNTokenData()</li>
                  <li>getUSDTBalance()</li>
                  <li>approveUSDT()</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
