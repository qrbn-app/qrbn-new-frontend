"use client";

import { useState, useCallback } from "react";
import { 
  MOCK_WAQF_FARMS, 
  WaqfFarm, 
  WaqfContribution, 
  calculateFeeBreakdown,
  FarmType 
} from "@/app/types/waqf-types";

/**
 * Hook for managing Waqf Farm mock state
 * Simulates blockchain interactions for prototype demonstration
 */
export function useWaqfFarm() {
  const [farms, setFarms] = useState<WaqfFarm[]>(MOCK_WAQF_FARMS);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFarmId, setSelectedFarmId] = useState<string | null>(null);

  // Get all farms
  const getAllFarms = useCallback(() => {
    return farms;
  }, [farms]);

  // Get farms by type
  const getFarmsByType = useCallback((farmType: FarmType) => {
    return farms.filter(farm => farm.farmType === farmType);
  }, [farms]);

  // Get farm by ID
  const getFarmById = useCallback((farmId: string) => {
    return farms.find(farm => farm.id === farmId);
  }, [farms]);

  // Get selected farm
  const getSelectedFarm = useCallback(() => {
    if (!selectedFarmId) return null;
    return farms.find(farm => farm.id === selectedFarmId) || null;
  }, [selectedFarmId, farms]);

  // Contribute to farm (mock transaction)
  const contributeToFarm = useCallback(async (
    farmId: string, 
    amount: number, 
    contributorAddress: string
  ): Promise<WaqfContribution> => {
    setIsLoading(true);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const farm = farms.find(f => f.id === farmId);
      if (!farm) {
        throw new Error("Farm not found");
      }

      // Calculate fee breakdown
      const breakdown = calculateFeeBreakdown(amount, farm.feeStructure);

      // Create contribution record
      const contribution: WaqfContribution = {
        id: `contrib-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        farmId,
        contributorAddress,
        amount,
        nazhirFee: breakdown.nazhirFee,
        serviceFees: breakdown.serviceFees,
        netToFarm: breakdown.netToFarm,
        timestamp: new Date(),
        transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        nftCertificateId: `nft-${Date.now()}`
      };

      // Update farm state
      setFarms(prevFarms => 
        prevFarms.map(f => 
          f.id === farmId 
            ? {
                ...f,
                currentFunding: f.currentFunding + breakdown.netToFarm,
                contributors: f.contributors + 1,
                updatedAt: new Date()
              }
            : f
        )
      );

      return contribution;
    } catch (error) {
      console.error("Contribution failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [farms]);

  // Filter farms by verification status
  const getVerifiedFarms = useCallback(() => {
    return farms.filter(farm => 
      farm.verificationStatus === "on-chain-verified" || 
      farm.verificationStatus === "active-recipient"
    );
  }, [farms]);

  // Filter farms by DAO approval
  const getDAOApprovedFarms = useCallback(() => {
    return farms.filter(farm => farm.daoApproved);
  }, [farms]);

  // Get farms sorted by funding progress
  const getFarmsByFundingProgress = useCallback((ascending = false) => {
    return [...farms].sort((a, b) => {
      const progressA = (a.currentFunding / a.fundingGoal) * 100;
      const progressB = (b.currentFunding / b.fundingGoal) * 100;
      return ascending ? progressA - progressB : progressB - progressA;
    });
  }, [farms]);

  // Search farms by name or location
  const searchFarms = useCallback((query: string) => {
    const lowerQuery = query.toLowerCase();
    return farms.filter(farm => 
      farm.name.toLowerCase().includes(lowerQuery) ||
      farm.location.toLowerCase().includes(lowerQuery) ||
      farm.description.toLowerCase().includes(lowerQuery) ||
      farm.farmerInfo.name.toLowerCase().includes(lowerQuery)
    );
  }, [farms]);

  return {
    // Data
    farms,
    selectedFarmId,
    isLoading,

    // Actions
    setSelectedFarmId,
    contributeToFarm,

    // Queries
    getAllFarms,
    getFarmsByType,
    getFarmById,
    getSelectedFarm,
    getVerifiedFarms,
    getDAOApprovedFarms,
    getFarmsByFundingProgress,
    searchFarms
  };
}
