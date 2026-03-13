"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
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
  Sprout,
  Check,
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
            ? "border-tawf-gold bg-tawf-gold/5 shadow-lg"
            : "border-tawf-green/10 bg-white hover:border-tawf-gold/30 hover:shadow-md"
        }`}
        onClick={() => setSelectedFarmId(farm.id)}
      >
        <CardContent className="p-0">
          {/* Farm Image */}
          <div className="aspect-video relative overflow-hidden rounded-t-2xl">
            <img
              src={farm.images[0]}
              alt={farm.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <Badge className={getVerificationBadgeColor(farm.verificationStatus) + " border-0"}>
                {farm.verificationStatus === "active-recipient" && <CheckCircle className="h-3 w-3 mr-1" />}
                {getVerificationLabel(farm.verificationStatus)}
              </Badge>
            </div>
            {farm.daoApproved && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-tawf-green text-tawf-sand border-0">
                  <Shield className="h-3 w-3 mr-1" />
                  DAO Approved
                </Badge>
              </div>
            )}
          </div>

          {/* Farm Info */}
          <div className="p-5 space-y-4">
            <div>
              <h3 className="font-heading font-semibold text-tawf-green text-lg mb-1">{farm.name}</h3>
              <div className="flex items-center text-tawf-muted text-sm">
                <MapPin className="h-3 w-3 mr-1" />
                {farm.location}
              </div>
            </div>

            {/* Funding Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-tawf-muted">Funding Progress</span>
                <span className="text-tawf-gold font-heading font-semibold">{progress.toFixed(0)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs">
                <span className="text-tawf-muted">
                  {formatCurrency(convertToSelectedCurrency(farm.currentFunding))} raised
                </span>
                <span className="text-tawf-muted">
                  Goal: {formatCurrency(convertToSelectedCurrency(farm.fundingGoal))}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-tawf-green/10">
              <div className="text-center">
                <div className="text-tawf-gold font-heading font-semibold">{farm.contributors}</div>
                <div className="text-tawf-muted text-xs">Contributors</div>
              </div>
              <div className="text-center">
                <div className="text-tawf-gold font-heading font-semibold">{farm.impactMetrics.animalsRaised}</div>
                <div className="text-tawf-muted text-xs">Animals</div>
              </div>
              <div className="text-center">
                <div className="text-tawf-gold font-heading font-semibold">{farm.impactMetrics.familiesBenefited}</div>
                <div className="text-tawf-muted text-xs">Families</div>
              </div>
            </div>

            {/* Nazhir Fee Badge */}
            <div className="flex items-center justify-between pt-2">
              <Badge variant="outline" className="bg-tawf-green/10 text-tawf-green border-tawf-green/20">
                Nazhir: {farm.feeStructure.nazhirFeePercent}%
              </Badge>
              {farm.shariaCompliant && (
                <Badge variant="outline" className="bg-tawf-green/10 text-tawf-green border-tawf-green/20">
                  <Check className="h-3 w-3 mr-1" />
                  Shariah
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-tawf-sand py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm uppercase tracking-widest text-tawf-gold font-medium">Support Sustainable Farming</span>
          <h1 className="text-4xl md:text-5xl font-heading font-medium mt-4 mb-4 text-tawf-green">
            Waqf for Kurban Farms
          </h1>
          <p className="text-tawf-muted max-w-2xl mx-auto">
            Support verified kurban farms through waqf contributions. Choose farms you trust and track their impact.
          </p>
        </div>

        {/* Fee Disclosure Banner */}
        <div className="mb-12">
          <WaqfFeeDisclosure variant="inline" />
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Farm Selection */}
          <div className="lg:col-span-3">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Button
                onClick={() => setSelectedFarmType("all")}
                variant={selectedFarmType === "all" ? "default" : "outline"}
                className={
                  selectedFarmType === "all"
                    ? "rounded-full"
                    : "rounded-full border-tawf-green/20 text-tawf-ink hover:bg-tawf-green/10 bg-white"
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
                      ? "rounded-full"
                      : "rounded-full border-tawf-green/20 text-tawf-ink hover:bg-tawf-green/10 bg-white"
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
              <Card className="border-tawf-green/10 bg-white">
                <CardHeader>
                  <CardTitle className="text-tawf-green font-heading">Farm Details & Contribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Farm Images */}
                  <div className="grid grid-cols-3 gap-3">
                    {selectedFarm.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`${selectedFarm.name} ${idx + 1}`}
                        className="w-full aspect-video object-cover rounded-xl"
                      />
                    ))}
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-tawf-green mb-2">{selectedFarm.name}</h3>
                    <p className="text-tawf-muted text-sm">{selectedFarm.description}</p>
                  </div>

                  <Separator className="bg-tawf-green/10" />

                  {/* Farmer Info */}
                  <div className="bg-tawf-sand/50 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-tawf-green" />
                      <span className="text-tawf-green font-heading font-semibold">Farmer Information</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-tawf-muted">Name:</span>
                        <div className="text-tawf-ink font-medium">{selectedFarm.farmerInfo.name}</div>
                      </div>
                      <div>
                        <span className="text-tawf-muted">Experience:</span>
                        <div className="text-tawf-ink font-medium">{selectedFarm.farmerInfo.yearsExperience} years</div>
                      </div>
                      <div>
                        <span className="text-tawf-muted">Registration:</span>
                        <div className="text-tawf-ink text-xs">{selectedFarm.farmerInfo.registrationNumber}</div>
                      </div>
                      <div>
                        <span className="text-tawf-muted">Location:</span>
                        <div className="text-tawf-ink font-medium">{selectedFarm.farmerInfo.location}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {selectedFarm.farmerInfo.certifications.map((cert, idx) => (
                        <Badge key={idx} className="bg-tawf-green/10 text-tawf-green border-tawf-green/20 text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Impact Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center bg-tawf-sand/50 rounded-xl p-4">
                      <div className="text-2xl font-heading font-bold text-tawf-gold">{selectedFarm.impactMetrics.animalsRaised}</div>
                      <div className="text-xs text-tawf-muted">Animals Raised</div>
                    </div>
                    <div className="text-center bg-tawf-sand/50 rounded-xl p-4">
                      <div className="text-2xl font-heading font-bold text-tawf-gold">{selectedFarm.impactMetrics.familiesBenefited}</div>
                      <div className="text-xs text-tawf-muted">Families Helped</div>
                    </div>
                    <div className="text-center bg-tawf-sand/50 rounded-xl p-4">
                      <div className="text-2xl font-heading font-bold text-tawf-gold">{selectedFarm.impactMetrics.employeesSupported}</div>
                      <div className="text-xs text-tawf-muted">Employees</div>
                    </div>
                    <div className="text-center bg-tawf-sand/50 rounded-xl p-4">
                      <div className="text-2xl font-heading font-bold text-tawf-gold">{selectedFarm.impactMetrics.sustainabilityScore}</div>
                      <div className="text-xs text-tawf-muted">Sustainability</div>
                    </div>
                  </div>

                  <Separator className="bg-tawf-green/10" />

                  {/* Contribution Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-tawf-green font-heading font-semibold">Make a Contribution</h4>
                      <div className="text-right">
                        <div className="text-sm text-tawf-muted">Remaining</div>
                        <div className="text-tawf-gold font-heading font-semibold">
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
                        className="bg-tawf-sand/50 border-tawf-green/20 text-tawf-ink"
                      />
                    </div>

                    {/* Fee Breakdown Preview */}
                    {contributionAmount && parseFloat(contributionAmount) > 0 && (
                      <div className="bg-tawf-sand/50 rounded-xl p-5 space-y-3 text-sm">
                        <div className="flex items-center gap-2 text-tawf-green font-heading font-medium mb-2">
                          <Info className="h-4 w-4" />
                          <span>Fee Breakdown</span>
                        </div>
                        {(() => {
                          const breakdown = calculateContributionBreakdown(parseFloat(contributionAmount));
                          if (!breakdown) return null;
                          return (
                            <>
                              <div className="flex justify-between text-tawf-muted">
                                <span>Your Contribution:</span>
                                <span className="text-tawf-ink">{formatCurrency(convertToSelectedCurrency(breakdown.originalAmount))}</span>
                              </div>
                              <div className="flex justify-between text-tawf-muted">
                                <span>Nazhir Fee ({selectedFarm.feeStructure.nazhirFeePercent}%):</span>
                                <span className="text-tawf-ink">-{formatCurrency(convertToSelectedCurrency(breakdown.nazhirFee))}</span>
                              </div>
                              <div className="flex justify-between text-tawf-muted">
                                <span>Service Fees:</span>
                                <span className="text-tawf-ink">-{formatCurrency(convertToSelectedCurrency(breakdown.serviceFees))}</span>
                              </div>
                              <Separator className="bg-tawf-green/10" />
                              <div className="flex justify-between text-tawf-green font-heading font-semibold">
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
                      className="w-full rounded-full"
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
            <Card className="border-tawf-green/10 bg-white">
              <CardHeader>
                <CardTitle className="text-tawf-green font-heading text-sm">NFT Certificate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-tawf-green to-tawf-greenLight rounded-2xl p-6 border border-tawf-gold/20">
                  <div className="text-center h-full flex flex-col justify-center">
                    <Award className="h-16 w-16 text-tawf-gold mx-auto mb-3" />
                    <div className="text-xs text-tawf-sand/70 mb-2 uppercase tracking-wider">Waqf Certificate</div>
                    <div className="text-lg font-heading font-semibold text-tawf-gold">Farm Supporter</div>
                    <div className="text-xs text-tawf-sand/50 mt-4">Minted upon contribution</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="border-tawf-green/10 bg-white">
              <CardHeader>
                <CardTitle className="text-tawf-green font-heading text-sm flex items-center gap-2">
                  <Sprout className="h-4 w-4 text-tawf-gold" />
                  About Waqf Farms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-tawf-muted">
                <p className="leading-relaxed">
                  Your waqf contribution supports farmers in raising quality animals for qurban (qurbani).
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-tawf-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="h-3 w-3 text-tawf-green" />
                    </div>
                    <span>All farms verified by DAO</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-tawf-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-tawf-green" />
                    </div>
                    <span>Shariah compliant process</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-tawf-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="h-3 w-3 text-tawf-green" />
                    </div>
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
