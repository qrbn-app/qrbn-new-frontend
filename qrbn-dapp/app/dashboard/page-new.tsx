"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Award, TrendingUp, Users, Wallet } from "lucide-react"
import { NFTCertificateCard } from "@/components/nft-certificate-card"
import { ContractInteractionDemo } from "@/components/contract-demo"
import { useAccount } from "wagmi"
import { useDonationHistory, useNFTCertificates, useTreasuryData, useQRBNToken } from "@/hooks/use-contracts"

export default function DashboardPage() {
  const { address } = useAccount()
  const { donations, isLoading: donationsLoading } = useDonationHistory(address)
  const { nftCount } = useNFTCertificates(address)
  const { totalBalance, zakatBalance, qurbanBalance, totalDonations } = useTreasuryData()
  const { balance: qrbnBalance, symbol } = useQRBNToken(address)

  // Calculate user's total donations from history
  const userTotalDonated = donations?.reduce((total: number, donation: any) => {
    return total + parseFloat(donation.amount || 0)
  }, 0) || 0

  return (
    <div className="min-h-screen islamic-pattern py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#f0fdf4] mb-4">Dashboard</h1>
          <p className="text-[#f0fdf4]/70">Track your donations and community impact</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[#0f2419] border-[#14532d]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#f0fdf4]/70 text-sm">Your Donations</p>
                  <p className="text-2xl font-bold text-[#d1b86a]">
                    {userTotalDonated.toFixed(3)} ETH
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-[#d1b86a]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f2419] border-[#14532d]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#f0fdf4]/70 text-sm">NFT Certificates</p>
                  <p className="text-2xl font-bold text-[#d1b86a]">{nftCount}</p>
                </div>
                <Award className="h-8 w-8 text-[#d1b86a]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f2419] border-[#14532d]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#f0fdf4]/70 text-sm">QRBN Tokens</p>
                  <p className="text-2xl font-bold text-[#d1b86a]">
                    {parseFloat(qrbnBalance).toFixed(2)} {symbol}
                  </p>
                </div>
                <Wallet className="h-8 w-8 text-[#d1b86a]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f2419] border-[#14532d]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#f0fdf4]/70 text-sm">Total Treasury</p>
                  <p className="text-2xl font-bold text-[#d1b86a]">
                    {parseFloat(totalBalance).toFixed(2)} ETH
                  </p>
                </div>
                <Users className="h-8 w-8 text-[#d1b86a]" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-[#0f2419] border border-[#14532d]">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#14532d] data-[state=active]:text-[#d1b86a]"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="contracts"
              className="data-[state=active]:bg-[#14532d] data-[state=active]:text-[#d1b86a]"
            >
              Smart Contracts
            </TabsTrigger>
            <TabsTrigger
              value="certificates"
              className="data-[state=active]:bg-[#14532d] data-[state=active]:text-[#d1b86a]"
            >
              NFT Certificates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Treasury Overview */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-[#0f2419] border-[#14532d]">
                <CardHeader>
                  <CardTitle className="text-[#f0fdf4]">Treasury Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#f0fdf4]/70">Zakat Fund:</span>
                    <span className="text-[#d1b86a] font-bold">{parseFloat(zakatBalance).toFixed(3)} ETH</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#f0fdf4]/70">Qurban Fund:</span>
                    <span className="text-[#d1b86a] font-bold">{parseFloat(qurbanBalance).toFixed(3)} ETH</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#f0fdf4]/70">Total Donations:</span>
                    <span className="text-[#d1b86a] font-bold">{parseFloat(totalDonations).toFixed(3)} ETH</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#0f2419] border-[#14532d]">
                <CardHeader>
                  <CardTitle className="text-[#f0fdf4]">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  {donationsLoading ? (
                    <div className="text-[#f0fdf4]/50">Loading donations...</div>
                  ) : donations && donations.length > 0 ? (
                    <div className="space-y-3">
                      {donations.slice(0, 3).map((donation: any, index: number) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-[#14532d]/30 rounded-lg">
                          <div>
                            <div className="text-[#f0fdf4] font-medium">{donation.animalType || 'Zakat'}</div>
                            <div className="text-[#f0fdf4]/50 text-sm">{donation.location || 'General Fund'}</div>
                          </div>
                          <div className="text-[#d1b86a] font-bold">
                            {parseFloat(donation.amount).toFixed(3)} ETH
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-[#f0fdf4]/50">No donations yet</div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Donation History */}
            <Card className="bg-[#0f2419] border-[#14532d]">
              <CardHeader>
                <CardTitle className="text-[#f0fdf4]">Recent Donations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "Zakat Maal", amount: "167 USDT", date: "2024-01-15", status: "Completed" },
                    { type: "Qurban - Goat", amount: "167 USDT", date: "2024-01-10", status: "In Progress" },
                    { type: "Zakat Fitrah", amount: "11.65 USDT", date: "2024-01-05", status: "Completed" },
                  ].map((donation, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-[#14532d]/30 rounded-lg">
                      <div>
                        <div className="font-medium text-[#f0fdf4]">{donation.type}</div>
                        <div className="text-sm text-[#f0fdf4]/60">{donation.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-[#d1b86a]">{donation.amount}</div>
                        <Badge
                          variant={donation.status === "Completed" ? "default" : "secondary"}
                          className={
                            donation.status === "Completed"
                              ? "bg-[#14532d] text-[#d1b86a]"
                              : "bg-[#d1b86a]/20 text-[#d1b86a]"
                          }
                        >
                          {donation.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts">
            <ContractInteractionDemo />
          </TabsContent>

          <TabsContent value="certificates">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <NFTCertificateCard title="Zakat Maal 2024" date="2024-01-15" type="Zakat" tokenId="1001" />
              <NFTCertificateCard title="Qurban Certificate" date="2024-01-10" type="Qurban" tokenId="2001" />
              <NFTCertificateCard title="Zakat Fitrah 2024" date="2024-01-05" type="Zakat" tokenId="1002" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
