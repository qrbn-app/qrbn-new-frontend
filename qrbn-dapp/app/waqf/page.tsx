"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  TrendingUp, 
  Users, 
  Building, 
  ArrowRight,
  Shield,
  Award
} from "lucide-react";
import Link from "next/link";
import { WaqfFeeDisclosure } from "@/components/waqf-fee-disclosure";
import { useWaqfContract } from "@/hooks/use-waqf-contract";
import { useCurrency } from "@/components/providers/currency-provider";

export default function WaqfPage() {
  const { poolInfo } = useWaqfContract();
  const { formatCurrency, convertToSelectedCurrency } = useCurrency();

  return (
    <div className="min-h-screen islamic-pattern py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-[#14532d]/30 rounded-full p-4">
              <Heart className="h-12 w-12 text-[#d1b86a] crescent-shadow" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#f0fdf4] mb-4">
            Waqf for Kurban Farms
          </h1>
          <p className="text-xl text-[#f0fdf4]/70 max-w-3xl mx-auto">
            Support sustainable livestock farms through Islamic endowment (waqf). 
            Your contribution helps farmers raise quality animals for qurban while creating lasting community impact.
          </p>
        </div>

        {/* Platform Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <Card className="bg-[#0f2419] border-[#14532d]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#f0fdf4]/70 text-sm">Total Funded</p>
                  <p className="text-2xl font-bold text-[#d1b86a]">
                    {formatCurrency(convertToSelectedCurrency(poolInfo.totalCollected))}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-[#d1b86a]/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f2419] border-[#14532d]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#f0fdf4]/70 text-sm">Active Farms</p>
                  <p className="text-2xl font-bold text-[#d1b86a]">{poolInfo.activeFarms}</p>
                </div>
                <Building className="h-8 w-8 text-[#d1b86a]/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f2419] border-[#14532d]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#f0fdf4]/70 text-sm">Contributors</p>
                  <p className="text-2xl font-bold text-[#d1b86a]">{poolInfo.totalContributors}</p>
                </div>
                <Users className="h-8 w-8 text-[#d1b86a]/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f2419] border-[#14532d]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#f0fdf4]/70 text-sm">Distributed</p>
                  <p className="text-2xl font-bold text-[#d1b86a]">
                    {formatCurrency(convertToSelectedCurrency(poolInfo.totalDistributed))}
                  </p>
                </div>
                <Award className="h-8 w-8 text-[#d1b86a]/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What is Waqf */}
        <Card className="bg-[#0f2419] border-[#14532d] mb-8">
          <CardHeader>
            <CardTitle className="text-[#f0fdf4] flex items-center gap-2">
              <Heart className="h-6 w-6 text-[#d1b86a]" />
              What is Waqf for Kurban Farms?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-[#f0fdf4]/70">
              <strong>Waqf</strong> is an Islamic endowment where assets are permanently dedicated for charitable purposes. 
              In our platform, your waqf contribution supports verified kurban (qurbani) farms, helping farmers:
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-[#14532d]/20 rounded-lg p-4">
                <div className="text-3xl mb-2">🐐</div>
                <h3 className="text-[#f0fdf4] font-semibold mb-2">Raise Quality Livestock</h3>
                <p className="text-[#f0fdf4]/60 text-sm">
                  Fund the raising of healthy, halal-certified animals for qurban sacrifices
                </p>
              </div>

              <div className="bg-[#14532d]/20 rounded-lg p-4">
                <div className="text-3xl mb-2">👨‍🌾</div>
                <h3 className="text-[#f0fdf4] font-semibold mb-2">Support Farmers</h3>
                <p className="text-[#f0fdf4]/60 text-sm">
                  Provide sustainable income for small farming families and cooperatives
                </p>
              </div>

              <div className="bg-[#14532d]/20 rounded-lg p-4">
                <div className="text-3xl mb-2">🌾</div>
                <h3 className="text-[#f0fdf4] font-semibold mb-2">Create Lasting Impact</h3>
                <p className="text-[#f0fdf4]/60 text-sm">
                  Build permanent infrastructure for ethical, sustainable livestock farming
                </p>
              </div>
            </div>

            <Separator className="bg-[#14532d]" />

            <div className="flex items-start gap-3 bg-[#14532d]/30 rounded-lg p-4">
              <Shield className="h-5 w-5 text-[#d1b86a] shrink-0 mt-0.5" />
              <div>
                <p className="text-[#f0fdf4] font-medium mb-1">Fully Transparent & Shariah Compliant</p>
                <p className="text-[#f0fdf4]/60 text-sm">
                  All farms undergo off-chain pre-verification, then on-chain verification by DAO and Sharia Council. 
                  Your waqf contribution is permanently protected, and all fees are transparently disclosed per Islamic finance principles.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Two Pathways */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-[#0f2419] border-[#14532d] hover:border-[#d1b86a] transition-all duration-300 glow-shadow">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="bg-[#14532d]/30 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Building className="h-8 w-8 text-[#d1b86a]" />
                </div>
                <h2 className="text-2xl font-bold text-[#f0fdf4] mb-2">Browse Waqf Farms</h2>
                <p className="text-[#f0fdf4]/70 mb-6">
                  Explore verified farms and contribute directly to the ones you want to support
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-[#f0fdf4]/70 text-sm">
                  <Badge className="bg-[#14532d] text-[#d1b86a]">✓</Badge>
                  <span>Choose specific farms to support</span>
                </div>
                <div className="flex items-center gap-2 text-[#f0fdf4]/70 text-sm">
                  <Badge className="bg-[#14532d] text-[#d1b86a]">✓</Badge>
                  <span>View detailed farm information</span>
                </div>
                <div className="flex items-center gap-2 text-[#f0fdf4]/70 text-sm">
                  <Badge className="bg-[#14532d] text-[#d1b86a]">✓</Badge>
                  <span>Track funding progress & impact</span>
                </div>
                <div className="flex items-center gap-2 text-[#f0fdf4]/70 text-sm">
                  <Badge className="bg-[#14532d] text-[#d1b86a]">✓</Badge>
                  <span>Receive NFT certificates</span>
                </div>
              </div>

              <Link href="/waqf-farms">
                <Button className="w-full bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] glow-shadow">
                  Explore Farms
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-[#0f2419] border-[#14532d]">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="bg-[#14532d]/30 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-[#d1b86a]" />
                </div>
                <h2 className="text-2xl font-bold text-[#f0fdf4] mb-2">General Waqf Pool</h2>
                <p className="text-[#f0fdf4]/70 mb-6">
                  Contribute to the general pool for automatic distribution to farms with highest need
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-[#f0fdf4]/70 text-sm">
                  <Badge className="bg-[#14532d] text-[#d1b86a]">✓</Badge>
                  <span>DAO-managed distribution</span>
                </div>
                <div className="flex items-center gap-2 text-[#f0fdf4]/70 text-sm">
                  <Badge className="bg-[#14532d] text-[#d1b86a]">✓</Badge>
                  <span>Balanced impact across farms</span>
                </div>
                <div className="flex items-center gap-2 text-[#f0fdf4]/70 text-sm">
                  <Badge className="bg-[#14532d] text-[#d1b86a]">✓</Badge>
                  <span>Simple one-click contribution</span>
                </div>
                <div className="flex items-center gap-2 text-[#f0fdf4]/70 text-sm">
                  <Badge className="bg-[#14532d] text-[#d1b86a]">✓</Badge>
                  <span>Flexible amount</span>
                </div>
              </div>

              <Button 
                className="w-full bg-[#14532d]/50 hover:bg-[#1a3a1f]/50 text-[#f0fdf4]" 
                disabled
              >
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Fee Disclosure */}
        <WaqfFeeDisclosure variant="full" className="mb-8" />

        {/* How It Works */}
        <Card className="bg-[#0f2419] border-[#14532d]">
          <CardHeader>
            <CardTitle className="text-[#f0fdf4]">How Waqf for Farms Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-[#14532d] text-[#d1b86a] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  1
                </div>
                <h3 className="text-[#f0fdf4] font-semibold mb-2">Farmers Apply</h3>
                <p className="text-[#f0fdf4]/60 text-sm">
                  Farmers submit applications and undergo off-chain pre-verification
                </p>
              </div>

              <div className="text-center">
                <div className="bg-[#14532d] text-[#d1b86a] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  2
                </div>
                <h3 className="text-[#f0fdf4] font-semibold mb-2">DAO Verification</h3>
                <p className="text-[#f0fdf4]/60 text-sm">
                  On-chain verification by DAO and Sharia Council ensures compliance
                </p>
              </div>

              <div className="text-center">
                <div className="bg-[#14532d] text-[#d1b86a] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  3
                </div>
                <h3 className="text-[#f0fdf4] font-semibold mb-2">You Contribute</h3>
                <p className="text-[#f0fdf4]/60 text-sm">
                  Support specific farms with transparent fee breakdown shown upfront
                </p>
              </div>

              <div className="text-center">
                <div className="bg-[#14532d] text-[#d1b86a] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  4
                </div>
                <h3 className="text-[#f0fdf4] font-semibold mb-2">Track Impact</h3>
                <p className="text-[#f0fdf4]/60 text-sm">
                  Receive NFT certificate and monitor farm progress and animal inventory
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
