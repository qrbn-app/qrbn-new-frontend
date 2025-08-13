"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { 
  Wallet, 
  TrendingUp, 
  Award, 
  Users, 
  ExternalLink, 
  RefreshCw,
  Coins,
  Heart,
  Loader2
} from "lucide-react"
import { useAccount } from "wagmi"
import { useContracts } from "@/hooks/use-contracts"

interface UserDashboardData {
  qrbnBalance: string
  usdtBalance: string
  nftCount: string
  zakatNftCount: string
  totalContributions: string
  totalZakatContributions: string
  proposalCount: bigint
  daoRequirements: {
    community: boolean
    organizational: boolean
    sharia: boolean
  }
}

export function UserDashboard() {
  const { address, isConnected } = useAccount()
  const contracts = useContracts()
  const [data, setData] = useState<UserDashboardData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isConnected && address && contracts) {
      loadDashboardData()
    }
  }, [isConnected, address, contracts])

  const loadDashboardData = async () => {
    if (!contracts || !address) return
    
    setLoading(true)
    try {
      const [
        qrbnBalance,
        usdtBalance,
        nftBalance,
        zakatNftBalance,
        contributions,
        zakatContributions,
        proposalCount,
        communityReqs,
        orgReqs,
        shariaReqs
      ] = await Promise.all([
        contracts.getQrbnBalance(address),
        contracts.getUSDTBalance(address),
        contracts.getQurbanNFTBalance(address),
        contracts.getZakatNFTBalance(address),
        contracts.getUserContributions(address),
        contracts.getUserZakatContributions(address),
        contracts.getProposalCount(),
        contracts.checkDAORequirements(address, 'community'),
        contracts.checkDAORequirements(address, 'organizational'),
        contracts.checkDAORequirements(address, 'sharia')
      ])

      setData({
        qrbnBalance: contracts.formatTokenAmount(qrbnBalance),
        usdtBalance: contracts.formatTokenAmount(usdtBalance, 6),
        nftCount: nftBalance.toString(),
        zakatNftCount: zakatNftBalance.toString(),
        totalContributions: contracts.formatTokenAmount(contributions),
        totalZakatContributions: contracts.formatTokenAmount(zakatContributions),
        proposalCount,
        daoRequirements: {
          community: communityReqs.meetsTokenRequirement && communityReqs.hasQurbanContribution,
          organizational: orgReqs.meetsTokenRequirement && orgReqs.hasQurbanContribution,
          sharia: true // Always eligible for special verification
        }
      })
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <Wallet className="h-12 w-12 text-[#d1b86a] mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-[#f0fdf4] mb-2">Connect Your Wallet</h3>
        <p className="text-[#f0fdf4]/70">Connect your wallet to view your QRBN dashboard</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="h-8 w-8 text-[#d1b86a] mx-auto mb-4 animate-spin" />
        <p className="text-[#f0fdf4]/70">Loading your dashboard...</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-[#f0fdf4]/70 mb-4">Failed to load dashboard data</p>
        <Button 
          onClick={loadDashboardData}
          className="bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4]"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    )
  }

  const getDAOEligibilityCount = () => {
    return Object.values(data.daoRequirements).filter(Boolean).length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#f0fdf4]">Your Dashboard</h2>
          <p className="text-[#f0fdf4]/70">Track your QRBN activities and contributions</p>
        </div>
        <Button 
          onClick={loadDashboardData}
          size="sm"
          variant="outline"
          className="border-[#14532d] text-[#f0fdf4] hover:bg-[#14532d]/20 bg-transparent"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-[#0f2419] border-[#14532d]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#f0fdf4]/70">QRBN Tokens</p>
                <p className="text-xl font-bold text-[#d1b86a]">{parseFloat(data.qrbnBalance).toFixed(2)}</p>
              </div>
              <Coins className="h-8 w-8 text-[#d1b86a]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f2419] border-[#14532d]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#f0fdf4]/70">USDT Balance</p>
                <p className="text-xl font-bold text-[#d1b86a]">{parseFloat(data.usdtBalance).toFixed(2)}</p>
              </div>
              <Wallet className="h-8 w-8 text-[#d1b86a]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f2419] border-[#14532d]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#f0fdf4]/70">Qurban NFTs</p>
                <p className="text-xl font-bold text-[#d1b86a]">{data.nftCount}</p>
              </div>
              <Award className="h-8 w-8 text-[#d1b86a]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f2419] border-[#14532d]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#f0fdf4]/70">Zakat NFTs</p>
                <p className="text-xl font-bold text-[#d1b86a]">{data.zakatNftCount}</p>
              </div>
              <Award className="h-8 w-8 text-[#d1b86a]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f2419] border-[#14532d]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#f0fdf4]/70">Qurban Contributions</p>
                <p className="text-xl font-bold text-[#d1b86a]">{parseFloat(data.totalContributions).toFixed(2)}</p>
              </div>
              <Heart className="h-8 w-8 text-[#d1b86a]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f2419] border-[#14532d]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#f0fdf4]/70">Zakat Contributions</p>
                <p className="text-xl font-bold text-[#d1b86a]">{parseFloat(data.totalZakatContributions).toFixed(2)}</p>
              </div>
              <Heart className="h-8 w-8 text-[#d1b86a]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DAO Eligibility & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#0f2419] border-[#14532d]">
          <CardHeader>
            <CardTitle className="text-[#f0fdf4] flex items-center">
              <Users className="h-5 w-5 mr-2 text-[#d1b86a]" />
              DAO Participation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[#f0fdf4]/70">Eligible Roles:</span>
              <Badge className="bg-[#14532d] text-[#d1b86a]">
                {getDAOEligibilityCount()}/3
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#f0fdf4]/70">Community Rep</span>
                <Badge variant={data.daoRequirements.community ? "default" : "secondary"}>
                  {data.daoRequirements.community ? "Eligible" : "Not Eligible"}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#f0fdf4]/70">Organizational Rep</span>
                <Badge variant={data.daoRequirements.organizational ? "default" : "secondary"}>
                  {data.daoRequirements.organizational ? "Eligible" : "Not Eligible"}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#f0fdf4]/70">Sharia Council</span>
                <Badge variant={data.daoRequirements.sharia ? "default" : "secondary"}>
                  Application Required
                </Badge>
              </div>
            </div>

            <Button 
              className="w-full bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4]"
              onClick={() => window.location.href = '/dao'}
            >
              View DAO Page
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#0f2419] border-[#14532d]">
          <CardHeader>
            <CardTitle className="text-[#f0fdf4] flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-[#d1b86a]" />
              Governance Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[#f0fdf4]/70">Active Proposals:</span>
              <span className="text-[#d1b86a] font-semibold">{data.proposalCount.toString()}</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-[#14532d]/30 rounded-lg">
                <div className="text-sm font-medium text-[#f0fdf4]">Your Voting Power</div>
                <div className="text-xs text-[#f0fdf4]/70 mt-1">
                  Based on your QRBN token holdings: {parseFloat(data.qrbnBalance).toFixed(2)} votes
                </div>
              </div>

              <Button 
                className="w-full bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4]"
                onClick={() => window.open("https://www.tally.xyz/gov/qrbn-dao", "_blank")}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Vote on Tally
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-[#0f2419] border-[#14532d]">
        <CardHeader>
          <CardTitle className="text-[#f0fdf4]">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] h-16"
              onClick={() => window.location.href = '/qurban'}
            >
              <div className="text-center">
                <div className="text-lg">🐐</div>
                <div className="text-sm">Contribute Qurban</div>
              </div>
            </Button>

            <Button 
              className="bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] h-16"
              onClick={() => window.location.href = '/zakat'}
            >
              <div className="text-center">
                <div className="text-lg">💰</div>
                <div className="text-sm">Pay Zakat</div>
              </div>
            </Button>

            <Button 
              className="bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] h-16"
              onClick={() => window.location.href = '/dao'}
            >
              <div className="text-center">
                <div className="text-lg">🗳️</div>
                <div className="text-sm">Join DAO</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
