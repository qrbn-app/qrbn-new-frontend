import { useState, useCallback, useEffect } from "react";
import {
  TAWFDIDIdentity,
  VendorDIDData,
  ShariaCouncilMember,
  VerifiableCredential,
  ParticipationRecord,
  ReputationFactors,
  calculateReputation,
  MOCK_DID_IDENTITY,
  MOCK_VENDOR_DID,
  MOCK_SHARIA_MEMBER,
} from "@/app/types/did-types";

/**
 * Hook for managing TAWF DID Identity
 * Handles identity retrieval, reputation tracking, and credential management
 */
export function useDIDIdentity(walletAddress?: `0x${string}`) {
  const [identity, setIdentity] = useState<TAWFDIDIdentity | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch identity from on-chain/backend
  const fetchIdentity = useCallback(async () => {
    if (!walletAddress) {
      setIdentity(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API call - replace with actual contract read
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock: Return different identity based on address
      const mockIdentity: TAWFDIDIdentity = {
        ...MOCK_DID_IDENTITY,
        walletAddress,
        did: `did:tawf:${walletAddress.slice(0, 10)}`,
      };

      setIdentity(mockIdentity);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch identity");
      setIdentity(null);
    } finally {
      setLoading(false);
    }
  }, [walletAddress]);

  // Get vendor-specific identity
  const fetchVendorIdentity = useCallback(async (): Promise<VendorDIDData | null> => {
    if (!walletAddress) return null;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock vendor data
      return {
        ...MOCK_VENDOR_DID,
        walletAddress,
        did: `did:tawf:vendor:${walletAddress.slice(0, 10)}`,
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch vendor identity");
      return null;
    } finally {
      setLoading(false);
    }
  }, [walletAddress]);

  // Check if user is a Sharia Council member
  const fetchCouncilMemberIdentity = useCallback(async (): Promise<ShariaCouncilMember | null> => {
    if (!walletAddress) return null;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock: Only specific addresses are council members
      const isCouncilMember = walletAddress.toLowerCase().includes("council");
      
      if (isCouncilMember) {
        return {
          ...MOCK_SHARIA_MEMBER,
          walletAddress,
          did: `did:tawf:council:${walletAddress.slice(0, 10)}`,
        };
      }
      
      return null;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch council member identity");
      return null;
    } finally {
      setLoading(false);
    }
  }, [walletAddress]);

  // Calculate current reputation
  const getCurrentReputation = useCallback((): number => {
    if (!identity) return 0;
    return identity.reputationScore;
  }, [identity]);

  // Get reputation breakdown
  const getReputationBreakdown = useCallback((): ReputationFactors => {
    if (!identity) {
      return {
        basePoints: 0,
        waqfContributions: 0,
        proposalParticipation: 0,
        vendorPerformance: 0,
        communityEngagement: 0,
        shariaCompliance: 0,
        penaltyPoints: 0,
      };
    }

    // Mock calculation based on participation history
    const waqfContributions = identity.participationHistory
      .filter((p) => p.type === "WaqfContribution")
      .reduce((sum, p) => sum + p.pointsEarned, 0);

    const proposalParticipation = identity.participationHistory
      .filter((p) => p.type === "ProposalVote" || p.type === "ProposalCreation")
      .reduce((sum, p) => sum + p.pointsEarned, 0);

    const communityEngagement = identity.participationHistory
      .filter((p) => p.type === "CommunityModeration")
      .reduce((sum, p) => sum + p.pointsEarned, 0);

    return {
      basePoints: 10, // Everyone starts with 10
      waqfContributions,
      proposalParticipation,
      vendorPerformance: 0, // Only for vendors
      communityEngagement,
      shariaCompliance: 0, // Based on violations
      penaltyPoints: 0,
    };
  }, [identity]);

  // Check if can vote in DAO (reputation threshold)
  const canVoteInDAO = useCallback((minReputation: number = 20): boolean => {
    if (!identity) return false;
    return identity.reputationScore >= minReputation && identity.verified;
  }, [identity]);

  // Check if can create proposals
  const canCreateProposal = useCallback((minReputation: number = 50): boolean => {
    if (!identity) return false;
    return identity.reputationScore >= minReputation && identity.verified;
  }, [identity]);

  // Add participation record (would be done by contract)
  const addParticipation = useCallback(
    async (record: Omit<ParticipationRecord, "id" | "timestamp">) => {
      if (!identity) return;

      setLoading(true);
      try {
        // Simulate transaction
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const newRecord: ParticipationRecord = {
          ...record,
          id: `part-${Date.now()}`,
          timestamp: new Date(),
        };

        setIdentity((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            participationHistory: [...prev.participationHistory, newRecord],
            activityPoints: prev.activityPoints + record.pointsEarned,
            reputationScore: Math.min(
              100,
              prev.reputationScore + Math.floor(record.pointsEarned / 10)
            ),
          };
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add participation");
      } finally {
        setLoading(false);
      }
    },
    [identity]
  );

  // Get credentials by type
  const getCredentialsByType = useCallback(
    (type: VerifiableCredential["type"]): VerifiableCredential[] => {
      if (!identity) return [];
      return identity.credentials.filter((c) => c.type === type && !c.revoked);
    },
    [identity]
  );

  // Check if has specific credential
  const hasCredential = useCallback(
    (type: VerifiableCredential["type"]): boolean => {
      return getCredentialsByType(type).length > 0;
    },
    [getCredentialsByType]
  );

  // Fetch on mount and when address changes
  useEffect(() => {
    fetchIdentity();
  }, [fetchIdentity]);

  return {
    identity,
    loading,
    error,
    
    // Data fetching
    fetchIdentity,
    fetchVendorIdentity,
    fetchCouncilMemberIdentity,
    
    // Reputation
    getCurrentReputation,
    getReputationBreakdown,
    
    // Permissions
    canVoteInDAO,
    canCreateProposal,
    
    // Actions
    addParticipation,
    
    // Credentials
    getCredentialsByType,
    hasCredential,
  };
}
