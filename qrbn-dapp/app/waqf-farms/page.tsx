"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  Building, 
  MapPin, 
  Users, 
  TrendingUp, 
  Shield, 
  Award,
  Heart,
  CheckCircle,
  Wallet,
  Info,
  Calendar,
  Sprout
} from "lucide-react";
import { useCurrency } from "@/components/providers/currency-provider";
import { useWaqfFarm } from "@/hooks/use-waqf-farm";
import { useWaqfCalculations } from "@/hooks/use-waqf-calculations";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import { 
  WaqfFarm as WaqfFarmType, 
  FarmType,
  getVerificationBadgeColor,
  getVerificationLabel 
} from "@/app/types/waqf-types";
import { WaqfFeeDisclosure } from "@/components/waqf-fee-disclosure";

const farmTypeEmojis: Record<FarmType, string> = {
  "livestock": "🐐",
  "dairy": "🐄",
  "mixed": "🌾",
  "poultry": "🐔"
};

export default function WaqfFarmsPage() {
  const [selectedFarmType, setSelectedFarmType] = useState<FarmType | "all">("all");
  const [selectedFarmId, setSelectedFarmId] = useState<string | null>(null);
  const [contributionAmount, setContributionAmount] = useState<string>("");
  const [isContributing, setIsContributing] = useState(false);
  
  const { formatCurrency, convertToSelectedCurrency } = useCurrency();
  const { address } = useAccount();
  const { getAllFarms, getFarmsByType, getFarmById, contributeToFarm } = useWaqfFarm();
  
  const farms = selectedFarmType === "all" ? getAllFarms() : getFarmsByType(selectedFarmType);
  const selectedFarm = selectedFarmId ? getFarmById(selectedFarmId) : null;

  
  const { 
    fundingProgress, 
    remainingFunding, 
    calculateContributionBreakdown,
    estimateImpact,
    daysUntilTarget 
  } = useWaqfCalculations(selectedFarm);

  const handleContribute = async () => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!selectedFarm) {
      toast.error("Please select a farm");
      return;
    }

    const amount = parseFloat(contributionAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsContributing(true);

    try {
      const contribution = await contributeToFarm(selectedFarm.id, amount, address);
      
      toast.success("Contribution successful!", {
        description: `You contributed ${formatCurrency(convertToSelectedCurrency(amount))} to ${selectedFarm.name}`
      });

      // Reset state
      setContributionAmount("");
      setSelectedFarmId(null);
    } catch (error) {
      console.error("Contribution failed:", error);
      toast.error("Contribution failed", {
        description: "Please try again later"
      });
    } finally {
      setIsContributing(false);
    }
  };

  const FarmCard = ({ farm }: { farm: WaqfFarmType }) => {
    const progress = (farm.currentFunding / farm.fundingGoal) * 100;
    const remaining = farm.fundingGoal - farm.currentFunding;

    return (
      <Card
        className={`cursor-pointer transition-all duration-300 ${
          selectedFarmId === farm.id
            ? "border-[#d1b86a] bg-[#d1b86a]/10 glow-shadow"
            : "bg-[#0f2419] border-[#14532d] hover:border-[#d1b86a]/50"
        }`}
        onClick={() => setSelectedFarmId(farm.id)}
      >
        <CardContent className="p-0">
          {/* Farm Image */}
          <div className="aspect-video relative overflow-hidden rounded-t-lg">
            <img
              src={farm.images[0]}
              alt={farm.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <Badge className={getVerificationBadgeColor(farm.verificationStatus)}>
                {farm.verificationStatus === "active-recipient" && <CheckCircle className="h-3 w-3 mr-1" />}
                {getVerificationLabel(farm.verificationStatus)}
              </Badge>
            </div>
            {farm.daoApproved && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-[#14532d] text-[#d1b86a]">
                  <Shield className="h-3 w-3 mr-1" />
                  DAO Approved
                </Badge>
              </div>
            )}
          </div>

          {/* Farm Info */}
          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-[#f0fdf4] text-lg mb-1">{farm.name}</h3>
              <div className="flex items-center text-[#f0fdf4]/60 text-sm">
                <MapPin className="h-3 w-3 mr-1" />
                {farm.location}
              </div>
            </div>

            {/* Funding Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#f0fdf4]/70">Funding Progress</span>
                <span className="text-[#d1b86a] font-semibold">{progress.toFixed(0)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs">
                <span className="text-[#f0fdf4]/60">
                  {formatCurrency(convertToSelectedCurrency(farm.currentFunding))} raised
                </span>
                <span className="text-[#f0fdf4]/60">
                  Goal: {formatCurrency(convertToSelectedCurrency(farm.fundingGoal))}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#14532d]">
              <div className="text-center">
                <div className="text-[#d1b86a] font-semibold">{farm.contributors}</div>
                <div className="text-[#f0fdf4]/60 text-xs">Contributors</div>
              </div>
              <div className="text-center">
                <div className="text-[#d1b86a] font-semibold">{farm.impactMetrics.animalsRaised}</div>
                <div className="text-[#f0fdf4]/60 text-xs">Animals</div>
              </div>
              <div className="text-center">
                <div className="text-[#d1b86a] font-semibold">{farm.impactMetrics.familiesBenefited}</div>
                <div className="text-[#f0fdf4]/60 text-xs">Families</div>
              </div>
            </div>

            {/* Nazhir Fee Badge */}
            <div className="flex items-center justify-between pt-2">
              <Badge variant="outline" className="bg-[#14532d]/30 text-[#d1b86a] border-[#d1b86a]/30">
                Nazhir: {farm.feeStructure.nazhirFeePercent}%
              </Badge>
              {farm.shariaCompliant && (
                <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-400/30">
                  ✓ Shariah
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen islamic-pattern py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#f0fdf4] mb-4">Waqf for Kurban Farms</h1>
          <p className="text-[#f0fdf4]/70 max-w-2xl mx-auto">
            Support verified kurban farms through waqf contributions. Choose farms you trust and track their impact.
          </p>
        </div>

        {/* Fee Disclosure Banner */}
        <div className="mb-8">
          <WaqfFeeDisclosure variant="inline" />
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Farm Selection */}
          <div className="lg:col-span-3">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Button
                onClick={() => setSelectedFarmType("all")}
                variant={selectedFarmType === "all" ? "default" : "outline"}
                className={
                  selectedFarmType === "all"
                    ? "bg-[#14532d] text-[#d1b86a]"
                    : "border-[#14532d] text-[#f0fdf4] hover:bg-[#14532d]/20 bg-transparent"
                }
              >
                All Farms ({getAllFarms().length})
              </Button>
              {(["livestock", "dairy", "mixed", "poultry"] as FarmType[]).map((type) => (
                <Button
                  key={type}
                  onClick={() => setSelectedFarmType(type)}
                  variant={selectedFarmType === type ? "default" : "outline"}
                  className={
                    selectedFarmType === type
                      ? "bg-[#14532d] text-[#d1b86a]"
                      : "border-[#14532d] text-[#f0fdf4] hover:bg-[#14532d]/20 bg-transparent"
                  }
                >
                  {farmTypeEmojis[type]} {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>

            {/* Farm Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {farms.map((farm) => (
                <FarmCard key={farm.id} farm={farm} />
              ))}
            </div>

            {/* Selected Farm Details */}
            {selectedFarm && (
              <Card className="bg-[#0f2419] border-[#14532d]">
                <CardHeader>
                  <CardTitle className="text-[#f0fdf4]">Farm Details & Contribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Farm Images */}
                  <div className="grid grid-cols-3 gap-2">
                    {selectedFarm.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`${selectedFarm.name} ${idx + 1}`}
                        className="w-full aspect-video object-cover rounded-lg"
                      />
                    ))}
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-[#f0fdf4] mb-2">{selectedFarm.name}</h3>
                    <p className="text-[#f0fdf4]/70 text-sm">{selectedFarm.description}</p>
                  </div>

                  <Separator className="bg-[#14532d]" />

                  {/* Farmer Info */}
                  <div className="bg-[#14532d]/20 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#d1b86a]" />
                      <span className="text-[#f0fdf4] font-medium">Farmer Information</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-[#f0fdf4]/60">Name:</span>
                        <div className="text-[#f0fdf4]">{selectedFarm.farmerInfo.name}</div>
                      </div>
                      <div>
                        <span className="text-[#f0fdf4]/60">Experience:</span>
                        <div className="text-[#f0fdf4]">{selectedFarm.farmerInfo.yearsExperience} years</div>
                      </div>
                      <div>
                        <span className="text-[#f0fdf4]/60">Registration:</span>
                        <div className="text-[#f0fdf4] text-xs">{selectedFarm.farmerInfo.registrationNumber}</div>
                      </div>
                      <div>
                        <span className="text-[#f0fdf4]/60">Location:</span>
                        <div className="text-[#f0fdf4]">{selectedFarm.farmerInfo.location}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-2">
                      {selectedFarm.farmerInfo.certifications.map((cert, idx) => (
                        <Badge key={idx} variant="outline" className="bg-[#14532d] text-[#d1b86a] border-[#d1b86a]/30 text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Impact Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center bg-[#14532d]/20 rounded-lg p-3">
                      <div className="text-2xl font-bold text-[#d1b86a]">{selectedFarm.impactMetrics.animalsRaised}</div>
                      <div className="text-xs text-[#f0fdf4]/60">Animals Raised</div>
                    </div>
                    <div className="text-center bg-[#14532d]/20 rounded-lg p-3">
                      <div className="text-2xl font-bold text-[#d1b86a]">{selectedFarm.impactMetrics.familiesBenefited}</div>
                      <div className="text-xs text-[#f0fdf4]/60">Families Helped</div>
                    </div>
                    <div className="text-center bg-[#14532d]/20 rounded-lg p-3">
                      <div className="text-2xl font-bold text-[#d1b86a]">{selectedFarm.impactMetrics.employeesSupported}</div>
                      <div className="text-xs text-[#f0fdf4]/60">Employees</div>
                    </div>
                    <div className="text-center bg-[#14532d]/20 rounded-lg p-3">
                      <div className="text-2xl font-bold text-[#d1b86a]">{selectedFarm.impactMetrics.sustainabilityScore}</div>
                      <div className="text-xs text-[#f0fdf4]/60">Sustainability</div>
                    </div>
                  </div>

                  <Separator className="bg-[#14532d]" />

                  {/* Contribution Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[#f0fdf4] font-semibold">Make a Contribution</h4>
                      <div className="text-right">
                        <div className="text-sm text-[#f0fdf4]/60">Remaining</div>
                        <div className="text-[#d1b86a] font-semibold">
                          {formatCurrency(convertToSelectedCurrency(remainingFunding))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <Input
                        type="number"
                        placeholder="Enter amount in USDT"
                        value={contributionAmount}
                        onChange={(e) => setContributionAmount(e.target.value)}
                        className="bg-[#14532d]/20 border-[#14532d] text-[#f0fdf4]"
                      />
                    </div>

                    {/* Fee Breakdown Preview */}
                    {contributionAmount && parseFloat(contributionAmount) > 0 && (
                      <div className="bg-[#14532d]/30 rounded-lg p-4 space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-[#d1b86a] font-medium mb-2">
                          <Info className="h-4 w-4" />
                          <span>Fee Breakdown</span>
                        </div>
                        {(() => {
                          const breakdown = calculateContributionBreakdown(parseFloat(contributionAmount));
                          if (!breakdown) return null;
                          return (
                            <>
                              <div className="flex justify-between text-[#f0fdf4]/70">
                                <span>Your Contribution:</span>
                                <span className="text-[#f0fdf4]">{formatCurrency(convertToSelectedCurrency(breakdown.originalAmount))}</span>
                              </div>
                              <div className="flex justify-between text-[#f0fdf4]/70">
                                <span>Nazhir Fee ({selectedFarm.feeStructure.nazhirFeePercent}%):</span>
                                <span className="text-[#f0fdf4]">-{formatCurrency(convertToSelectedCurrency(breakdown.nazhirFee))}</span>
                              </div>
                              <div className="flex justify-between text-[#f0fdf4]/70">
                                <span>Service Fees:</span>
                                <span className="text-[#f0fdf4]">-{formatCurrency(convertToSelectedCurrency(breakdown.serviceFees))}</span>
                              </div>
                              <Separator className="bg-[#14532d]" />
                              <div className="flex justify-between text-[#d1b86a] font-semibold">
                                <span>Net to Farm:</span>
                                <span>{formatCurrency(convertToSelectedCurrency(breakdown.netToFarm))}</span>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    )}

                    <Button
                      onClick={handleContribute}
                      disabled={!address || !contributionAmount || parseFloat(contributionAmount) <= 0 || isContributing}
                      className="w-full bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] glow-shadow"
                    >
                      {isContributing ? (
                        "Processing..."
                      ) : !address ? (
                        "Connect Wallet to Contribute"
                      ) : (
                        <>
                          <Heart className="h-4 w-4 mr-2" />
                          Contribute to Farm
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Fee Disclosure */}
            <WaqfFeeDisclosure variant="compact" />

            {/* NFT Certificate Preview */}
            <Card className="bg-[#0f2419] border-[#14532d]">
              <CardHeader>
                <CardTitle className="text-[#f0fdf4] text-sm">NFT Certificate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-[#14532d] to-[#0f2419] rounded-lg p-4 border border-[#d1b86a]/30">
                  <div className="text-center h-full flex flex-col justify-center">
                    <Award className="h-12 w-12 text-[#d1b86a] mx-auto mb-2 crescent-shadow" />
                    <div className="text-xs text-[#f0fdf4]/70 mb-1">Waqf Certificate</div>
                    <div className="text-sm font-semibold text-[#d1b86a]">Farm Supporter</div>
                    <div className="text-xs text-[#f0fdf4]/50 mt-2">Minted upon contribution</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="bg-[#0f2419] border-[#14532d]">
              <CardHeader>
                <CardTitle className="text-[#f0fdf4] text-sm flex items-center gap-2">
                  <Sprout className="h-4 w-4 text-[#d1b86a]" />
                  About Waqf Farms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-[#f0fdf4]/70">
                <p>
                  Your waqf contribution supports farmers in raising quality animals for qurban (qurbani).
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-[#d1b86a] shrink-0 mt-0.5" />
                    <span>All farms verified by DAO</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#d1b86a] shrink-0 mt-0.5" />
                    <span>Shariah compliant process</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Award className="h-4 w-4 text-[#d1b86a] shrink-0 mt-0.5" />
                    <span>NFT certificate issued</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
