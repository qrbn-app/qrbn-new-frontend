"use client";

import { useMemo } from "react";
import { WaqfPoolInfo } from "@/app/types/waqf-types";
import { MOCK_WAQF_FARMS } from "@/app/types/waqf-types";

/**
 * Hook for Waqf smart contract interactions (MOCK)
 * Simulates blockchain contract calls for prototype
 * 
 * In production, this would use wagmi hooks like useReadContract, useWriteContract
 */
export function useWaqfContract() {
  // Mock: Simulate fetching pool info from smart contract
  const getPoolInfo = useMemo((): WaqfPoolInfo => {
    const totalCollected = MOCK_WAQF_FARMS.reduce(
      (sum, farm) => sum + farm.currentFunding,
      0
    );
    
    const totalDistributed = totalCollected * 0.85; // Mock: 85% distributed
    const availableBalance = totalCollected - totalDistributed;
    const activeFarms = MOCK_WAQF_FARMS.filter(
      f => f.verificationStatus === "active-recipient"
    ).length;
    const totalContributors = MOCK_WAQF_FARMS.reduce(
      (sum, farm) => sum + farm.contributors,
      0
    );

    return {
      totalCollected,
      totalDistributed,
      availableBalance,
      activeFarms,
      totalContributors
    };
  }, []);

  // Mock: Check if user has contributed to a farm
  const hasContributed = (userAddress: string, farmId: string): boolean => {
    // In production, this would query the blockchain
    // For mock, randomly return true/false
    return Math.random() > 0.5;
  };

  // Mock: Get user's total contributions
  const getUserTotalContributions = (userAddress: string): number => {
    // In production, this would query the blockchain
    // For mock, return a random amount
    return Math.floor(Math.random() * 1000);
  };

  // Mock: Get user's NFT certificates count
  const getUserCertificatesCount = (userAddress: string): number => {
    // In production, this would query the blockchain
    // For mock, return a random count
    return Math.floor(Math.random() * 5);
  };

  // Mock: Check farm verification status on-chain
  const isFarmVerifiedOnChain = (farmId: string): boolean => {
    const farm = MOCK_WAQF_FARMS.find(f => f.id === farmId);
    return farm?.verificationStatus === "on-chain-verified" || 
           farm?.verificationStatus === "active-recipient" || 
           false;
  };

  // Mock: Check DAO approval status
  const isDAOApproved = (farmId: string): boolean => {
    const farm = MOCK_WAQF_FARMS.find(f => f.id === farmId);
    return farm?.daoApproved || false;
  };

  return {
    // Pool information
    poolInfo: getPoolInfo,

    // User queries
    hasContributed,
    getUserTotalContributions,
    getUserCertificatesCount,

    // Farm verification queries
    isFarmVerifiedOnChain,
    isDAOApproved,

    // Mock state
    isLoading: false,
    error: null
  };
}
