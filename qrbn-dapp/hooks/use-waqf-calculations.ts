"use client";

import { useMemo } from "react";
import { 
  WaqfFarm, 
  calculateFeeBreakdown, 
  getFundingProgress, 
  getRemainingFunding 
} from "@/app/types/waqf-types";

/**
 * Hook for Waqf calculation utilities
 * Handles fee calculations, funding progress, and impact projections
 */
export function useWaqfCalculations(farm?: WaqfFarm | null) {
  // Calculate funding progress percentage
  const fundingProgress = useMemo(() => {
    if (!farm) return 0;
    return getFundingProgress(farm);
  }, [farm]);

  // Calculate remaining funding needed
  const remainingFunding = useMemo(() => {
    if (!farm) return 0;
    return getRemainingFunding(farm);
  }, [farm]);

  // Calculate contribution breakdown for a given amount
  const calculateContributionBreakdown = useMemo(() => {
    return (amount: number) => {
      if (!farm) return null;
      return calculateFeeBreakdown(amount, farm.feeStructure);
    };
  }, [farm]);

  // Estimate impact of contribution
  const estimateImpact = useMemo(() => {
    return (contributionAmount: number) => {
      if (!farm) return null;

      const breakdown = calculateFeeBreakdown(contributionAmount, farm.feeStructure);
      
      // Calculate projected additional impact
      const fundingRatio = breakdown.netToFarm / farm.fundingGoal;
      
      return {
        additionalAnimals: Math.floor(farm.impactMetrics.animalsRaised * fundingRatio),
        additionalFamilies: Math.floor(farm.impactMetrics.familiesBenefited * fundingRatio),
        contributionToProgress: (breakdown.netToFarm / farm.fundingGoal) * 100
      };
    };
  }, [farm]);

  // Calculate total platform stats (across all farms)
  const calculatePlatformStats = (farms: WaqfFarm[]) => {
    return {
      totalFunded: farms.reduce((sum, f) => sum + f.currentFunding, 0),
      totalGoal: farms.reduce((sum, f) => sum + f.fundingGoal, 0),
      totalContributors: farms.reduce((sum, f) => sum + f.contributors, 0),
      activeFarms: farms.length,
      verifiedFarms: farms.filter(f => 
        f.verificationStatus === "on-chain-verified" || 
        f.verificationStatus === "active-recipient"
      ).length,
      totalAnimalsRaised: farms.reduce((sum, f) => sum + f.impactMetrics.animalsRaised, 0),
      totalFamiliesBenefited: farms.reduce((sum, f) => sum + f.impactMetrics.familiesBenefited, 0)
    };
  };

  // Calculate nazhir fee for a given amount
  const calculateNazhirFee = useMemo(() => {
    return (amount: number) => {
      if (!farm) return 0;
      return (amount * farm.feeStructure.nazhirFeePercent) / 100;
    };
  }, [farm]);

  // Calculate service fees for a given amount
  const calculateServiceFees = useMemo(() => {
    return (amount: number) => {
      if (!farm) return 0;
      return farm.feeStructure.totalServiceFees;
    };
  }, [farm]);

  // Calculate total fees
  const calculateTotalFees = useMemo(() => {
    return (amount: number) => {
      if (!farm) return 0;
      const nazhirFee = (amount * farm.feeStructure.nazhirFeePercent) / 100;
      const serviceFees = farm.feeStructure.totalServiceFees;
      return nazhirFee + serviceFees;
    };
  }, [farm]);

  // Calculate net amount to farm
  const calculateNetToFarm = useMemo(() => {
    return (amount: number) => {
      if (!farm) return 0;
      const totalFees = calculateTotalFees(amount);
      return amount - totalFees;
    };
  }, [farm, calculateTotalFees]);

  // Calculate ROI for nazhir (management return)
  const calculateNazhirROI = useMemo(() => {
    return (amount: number, months: number = 12) => {
      if (!farm) return 0;
      
      // Simplified ROI calculation based on nazhir fee
      // In reality, this would be more complex with profit-sharing models
      const nazhirFee = (amount * farm.feeStructure.nazhirFeePercent) / 100;
      const annualReturn = nazhirFee * 1.5; // Mock 50% return on nazhir investment
      const monthlyReturn = (annualReturn / 12) * months;
      
      return {
        nazhirFee,
        projectedReturn: monthlyReturn,
        roi: (monthlyReturn / amount) * 100
      };
    };
  }, [farm]);

  // Check if farm is fully funded
  const isFullyFunded = useMemo(() => {
    if (!farm) return false;
    return farm.currentFunding >= farm.fundingGoal;
  }, [farm]);

  // Calculate days until target date
  const daysUntilTarget = useMemo(() => {
    if (!farm?.targetDate) return null;
    const now = new Date();
    const target = new Date(farm.targetDate);
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }, [farm]);

  return {
    // Progress metrics
    fundingProgress,
    remainingFunding,
    isFullyFunded,
    daysUntilTarget,

    // Calculation functions
    calculateContributionBreakdown,
    calculateNazhirFee,
    calculateServiceFees,
    calculateTotalFees,
    calculateNetToFarm,
    calculateNazhirROI,
    estimateImpact,
    calculatePlatformStats
  };
}
