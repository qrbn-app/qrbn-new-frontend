"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  ExternalLink, 
  ArrowRight, 
  Users, 
  Building, 
  BookOpen, 
  CheckCircle, 
  XCircle,
  Loader2,
  Vote,
  Coins,
  FileText
} from "lucide-react"
import { useAccount } from "wagmi"
import { useContracts } from "@/hooks/use-contracts"
import { DAO_REPRESENTATIVES, type DAORepresentativeType } from "@/lib/contracts"

interface UserStats {
  qrbnBalance: string
  nftCount: string
  contributionAmount: string
  proposalCount: bigint
}

interface RequirementCheck {
  meetsTokenRequirement: boolean
  hasQurbanContribution: boolean
  hasNFT: boolean
  qrbnBalance: string
  nftCount: string
  contributionAmount: string
}

export default function DAOPage() {
  const { address, isConnected } = useAccount()
  const contracts = useContracts()
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedRepType, setSelectedRepType] = useState<DAORepresentativeType | null>(null)
  const [requirementChecks, setRequirementChecks] = useState<Record<DAORepresentativeType, RequirementCheck | null>>({
    community: null,
    organizational: null,
    sharia: null
  })

  useEffect(() => {
    if (isConnected && address && contracts) {
      loadUserStats()
    }
  }, [isConnected, address, contracts])

  const loadUserStats = async () => {
    if (!contracts || !address) return
    
    setLoading(true)
    try {
      const [qrbnBalance, nftBalance, contributions, proposalCount] = await Promise.all([
        contracts.getQrbnBalance(address),
        contracts.getQurbanNFTBalance(address),
        contracts.getUserContributions(address),
        contracts.getProposalCount()
      ])

      setUserStats({
        qrbnBalance: contracts.formatTokenAmount(qrbnBalance),
        nftCount: nftBalance.toString(),
        contributionAmount: contracts.formatTokenAmount(contributions),
        proposalCount
      })

      // Check requirements for all representative types
      const checks: Record<DAORepresentativeType, RequirementCheck> = {
        community: await contracts.checkDAORequirements(address, 'community'),
        organizational: await contracts.checkDAORequirements(address, 'organizational'),
        sharia: await contracts.checkDAORequirements(address, 'sharia')
      }
      
      setRequirementChecks(checks)
    } catch (error) {
      console.error('Error loading user stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const getEligibleRepTypes = (): DAORepresentativeType[] => {
    return (Object.keys(requirementChecks) as DAORepresentativeType[]).filter(type => {
      const check = requirementChecks[type]
      if (!check) return false
      
      if (type === 'sharia') return true // Special verification process
      return check.meetsTokenRequirement && check.hasQurbanContribution
    })
  }

  const RepresentativeCard = ({ type }: { type: DAORepresentativeType }) => {
    const rep = DAO_REPRESENTATIVES[type]
    const check = requirementChecks[type]
    const isEligible = check && (type === 'sharia' || (check.meetsTokenRequirement && check.hasQurbanContribution))

    const getIcon = () => {
      switch (type) {
        case 'community': return <Users className="h-6 w-6" />
        case 'organizational': return <Building className="h-6 w-6" />
        case 'sharia': return <BookOpen className="h-6 w-6" />
      }
    }

    return (
      <Card className="bg-[#0f2419] border-[#14532d] hover:border-[#d1b86a]/50 transition-colors">
        <CardHeader>
          <CardTitle className="text-[#f0fdf4] flex items-center gap-3">
            <div className="text-[#d1b86a]">{getIcon()}</div>
            {rep.title}
            {isEligible && <Badge className="bg-green-600 text-white">Eligible</Badge>}
            {!isEligible && isConnected && <Badge variant="secondary">Requirements Not Met</Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-[#f0fdf4]/70 text-sm">{rep.description}</p>
          
          <div>
            <h4 className="text-[#f0fdf4] font-medium mb-2">Requirements:</h4>
            <ul className="space-y-1 text-sm">
              {rep.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2 text-[#f0fdf4]/70">
                  <span className="text-[#d1b86a] mt-1">•</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {isConnected && check && (
            <div className="space-y-2 p-3 bg-[#14532d]/30 rounded-lg">
              <div className="text-sm font-medium text-[#f0fdf4]">Your Status:</div>
              {type !== 'sharia' && (
                <>
                  <div className="flex items-center gap-2 text-xs">
                    {check.meetsTokenRequirement ? 
                      <CheckCircle className="h-4 w-4 text-green-500" /> : 
                      <XCircle className="h-4 w-4 text-red-500" />
                    }
                    <span className="text-[#f0fdf4]/70">
                      QRBN Balance: {check.qrbnBalance} 
                      {type === 'community' && ' (min: 1,000)'}
                      {type === 'organizational' && ' (min: 5,000)'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    {check.hasQurbanContribution ? 
                      <CheckCircle className="h-4 w-4 text-green-500" /> : 
                      <XCircle className="h-4 w-4 text-red-500" />
                    }
                    <span className="text-[#f0fdf4]/70">
                      Qurban Contributions: {check.contributionAmount} USDT
                    </span>
                  </div>
                </>
              )}
              {type === 'sharia' && (
                <div className="text-xs text-[#f0fdf4]/70">
                  Special verification process required through application
                </div>
              )}
            </div>
          )}

          <div>
            <h4 className="text-[#f0fdf4] font-medium mb-2">Responsibilities:</h4>
            <ul className="space-y-1 text-sm">
              {rep.responsibilities.slice(0, 3).map((resp, index) => (
                <li key={index} className="flex items-start gap-2 text-[#f0fdf4]/70">
                  <span className="text-[#d1b86a] mt-1">•</span>
                  {resp}
                </li>
              ))}
              {rep.responsibilities.length > 3 && (
                <li className="text-[#f0fdf4]/50 text-xs">
                  +{rep.responsibilities.length - 3} more responsibilities
                </li>
              )}
            </ul>
          </div>

          <Button
            onClick={() => window.open(rep.formUrl, '_blank')}
            disabled={!isConnected || (type !== 'sharia' && !isEligible)}
            className="w-full bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] disabled:opacity-50"
          >
            <FileText className="h-4 w-4 mr-2" />
            Apply for {rep.title}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen islamic-pattern py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#f0fdf4] mb-4">QRBN DAO Governance</h1>
          <p className="text-[#f0fdf4]/70 max-w-2xl mx-auto">
            Participate in decentralized governance, become a representative, and help shape the future of Islamic finance on blockchain.
          </p>
        </div>

        {/* User Stats Section */}
        {isConnected && (
          <Card className="bg-[#0f2419] border-[#14532d] mb-8">
            <CardHeader>
              <CardTitle className="text-[#f0fdf4] flex items-center gap-2">
                <Coins className="h-5 w-5 text-[#d1b86a]" />
                Your DAO Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-[#d1b86a]" />
                  <span className="ml-2 text-[#f0fdf4]/70">Loading your profile...</span>
                </div>
              ) : userStats ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-[#14532d]/30 rounded-lg">
                    <div className="text-2xl font-bold text-[#d1b86a]">{userStats.qrbnBalance}</div>
                    <div className="text-sm text-[#f0fdf4]/70">QRBN Tokens</div>
                  </div>
                  <div className="text-center p-4 bg-[#14532d]/30 rounded-lg">
                    <div className="text-2xl font-bold text-[#d1b86a]">{userStats.nftCount}</div>
                    <div className="text-sm text-[#f0fdf4]/70">Qurban NFTs</div>
                  </div>
                  <div className="text-center p-4 bg-[#14532d]/30 rounded-lg">
                    <div className="text-2xl font-bold text-[#d1b86a]">{userStats.contributionAmount}</div>
                    <div className="text-sm text-[#f0fdf4]/70">Total Contributions</div>
                  </div>
                  <div className="text-center p-4 bg-[#14532d]/30 rounded-lg">
                    <div className="text-2xl font-bold text-[#d1b86a]">{userStats.proposalCount.toString()}</div>
                    <div className="text-sm text-[#f0fdf4]/70">Active Proposals</div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-[#f0fdf4]/70">
                  Failed to load profile data
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Representative Registration Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#f0fdf4] mb-6 text-center">Become a DAO Representative</h2>
          
          {!isConnected && (
            <Alert className="mb-6 bg-[#14532d]/30 border-[#d1b86a]">
              <AlertDescription className="text-[#f0fdf4]">
                Please connect your wallet to check your eligibility for DAO representative positions.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {(Object.keys(DAO_REPRESENTATIVES) as DAORepresentativeType[]).map((type) => (
              <RepresentativeCard key={type} type={type} />
            ))}
          </div>
        </div>

        <Separator className="bg-[#14532d] my-8" />

        {/* Tally.xyz Integration Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#f0fdf4] mb-4">DAO Governance Platform</h2>
          <p className="text-[#f0fdf4]/70 mb-6">
            Vote on proposals, participate in discussions, and help govern the QRBN ecosystem on Tally.
          </p>

          <Card className="bg-[#0f2419] border-[#14532d] max-w-md mx-auto">
            <CardContent className="p-8">
              <div className="flex justify-center mb-4">
                <Vote className="h-12 w-12 text-[#d1b86a]" />
              </div>
              <p className="text-[#f0fdf4] mb-6">
                Access the full DAO governance platform powered by Tally to vote on proposals and participate in governance.
              </p>
              <Button
                onClick={() => window.open("https://www.tally.xyz/gov/qrbn-app", "_blank")}
                className="w-full bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] glow-shadow"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Go to QRBN DAO on Tally
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
