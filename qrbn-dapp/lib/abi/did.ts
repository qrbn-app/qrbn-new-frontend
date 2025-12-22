/**
 * Mock ABI for TAWF DID Contract
 * Handles DID registration, reputation management, and credential verification
 */

export const DID_ABI = [
  // ========================================
  // DID Registration Functions
  // ========================================
  {
    inputs: [
      { name: "_initialReputation", type: "uint256" },
    ],
    name: "registerDID",
    outputs: [{ name: "did", type: "string" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "_did", type: "string" }],
    name: "verifyIdentity",
    outputs: [{ name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "_walletAddress", type: "address" }],
    name: "getDIDByAddress",
    outputs: [{ name: "did", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "_did", type: "string" }],
    name: "getIdentity",
    outputs: [
      { name: "walletAddress", type: "address" },
      { name: "reputationScore", type: "uint256" },
      { name: "activityPoints", type: "uint256" },
      { name: "verified", type: "bool" },
      { name: "createdAt", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },

  // ========================================
  // Reputation Management
  // ========================================
  {
    inputs: [
      { name: "_did", type: "string" },
      { name: "_points", type: "uint256" },
      { name: "_reason", type: "string" },
    ],
    name: "addReputationPoints",
    outputs: [{ name: "newReputation", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "_did", type: "string" },
      { name: "_points", type: "uint256" },
      { name: "_reason", type: "string" },
    ],
    name: "deductReputationPoints",
    outputs: [{ name: "newReputation", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "_did", type: "string" }],
    name: "getReputationScore",
    outputs: [{ name: "score", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "_did", type: "string" }],
    name: "getReputationBreakdown",
    outputs: [
      { name: "basePoints", type: "uint256" },
      { name: "waqfContributions", type: "uint256" },
      { name: "proposalParticipation", type: "uint256" },
      { name: "vendorPerformance", type: "uint256" },
      { name: "communityEngagement", type: "uint256" },
      { name: "penaltyPoints", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },

  // ========================================
  // Credential Management
  // ========================================
  {
    inputs: [
      { name: "_recipientDID", type: "string" },
      { name: "_credentialType", type: "string" },
      { name: "_claimsHash", type: "bytes32" },
      { name: "_zkProof", type: "bytes" },
      { name: "_expiresAt", type: "uint256" },
    ],
    name: "issueCredential",
    outputs: [{ name: "credentialId", type: "string" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "_credentialId", type: "string" },
      { name: "_reason", type: "string" },
    ],
    name: "revokeCredential",
    outputs: [{ name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "_credentialId", type: "string" }],
    name: "verifyCredential",
    outputs: [
      { name: "valid", type: "bool" },
      { name: "revoked", type: "bool" },
      { name: "expired", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "_did", type: "string" }],
    name: "getCredentials",
    outputs: [{ name: "credentialIds", type: "string[]" }],
    stateMutability: "view",
    type: "function",
  },

  // ========================================
  // Vendor Registration
  // ========================================
  {
    inputs: [
      { name: "_did", type: "string" },
      { name: "_businessName", type: "string" },
      { name: "_businessType", type: "string" },
      { name: "_registrationNumber", type: "string" },
    ],
    name: "registerVendor",
    outputs: [{ name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "_did", type: "string" }],
    name: "isVendor",
    outputs: [{ name: "isVendor", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "_vendorDID", type: "string" }],
    name: "getVendorMetrics",
    outputs: [
      { name: "rating", type: "uint256" },
      { name: "totalReviews", type: "uint256" },
      { name: "totalAnimalsSold", type: "uint256" },
      { name: "totalWaqfProposals", type: "uint256" },
      { name: "complianceScore", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },

  // ========================================
  // Sharia Council Management
  // ========================================
  {
    inputs: [
      { name: "_did", type: "string" },
      { name: "_zkProofKey", type: "bytes" },
    ],
    name: "appointCouncilMember",
    outputs: [{ name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "_did", type: "string" }],
    name: "isCouncilMember",
    outputs: [{ name: "isMember", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCouncilMembers",
    outputs: [{ name: "memberDIDs", type: "string[]" }],
    stateMutability: "view",
    type: "function",
  },

  // ========================================
  // Participation Tracking
  // ========================================
  {
    inputs: [
      { name: "_did", type: "string" },
      { name: "_participationType", type: "string" },
      { name: "_pointsEarned", type: "uint256" },
      { name: "_relatedEntityId", type: "string" },
    ],
    name: "recordParticipation",
    outputs: [{ name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "_did", type: "string" }],
    name: "getParticipationHistory",
    outputs: [
      { name: "types", type: "string[]" },
      { name: "timestamps", type: "uint256[]" },
      { name: "points", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },

  // ========================================
  // Governance Permissions
  // ========================================
  {
    inputs: [
      { name: "_did", type: "string" },
      { name: "_minReputation", type: "uint256" },
    ],
    name: "canVote",
    outputs: [{ name: "eligible", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "_did", type: "string" },
      { name: "_minReputation", type: "uint256" },
    ],
    name: "canCreateProposal",
    outputs: [{ name: "eligible", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },

  // ========================================
  // Events
  // ========================================
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "did", type: "string" },
      { indexed: true, name: "walletAddress", type: "address" },
      { indexed: false, name: "timestamp", type: "uint256" },
    ],
    name: "DIDRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "did", type: "string" },
      { indexed: false, name: "timestamp", type: "uint256" },
    ],
    name: "IdentityVerified",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "did", type: "string" },
      { indexed: false, name: "oldScore", type: "uint256" },
      { indexed: false, name: "newScore", type: "uint256" },
      { indexed: false, name: "reason", type: "string" },
    ],
    name: "ReputationUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "credentialId", type: "string" },
      { indexed: true, name: "recipientDID", type: "string" },
      { indexed: false, name: "credentialType", type: "string" },
      { indexed: false, name: "issuer", type: "string" },
    ],
    name: "CredentialIssued",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "credentialId", type: "string" },
      { indexed: false, name: "reason", type: "string" },
    ],
    name: "CredentialRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "vendorDID", type: "string" },
      { indexed: false, name: "businessName", type: "string" },
      { indexed: false, name: "timestamp", type: "uint256" },
    ],
    name: "VendorRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "memberDID", type: "string" },
      { indexed: false, name: "timestamp", type: "uint256" },
    ],
    name: "CouncilMemberAppointed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "did", type: "string" },
      { indexed: false, name: "participationType", type: "string" },
      { indexed: false, name: "pointsEarned", type: "uint256" },
      { indexed: false, name: "timestamp", type: "uint256" },
    ],
    name: "ParticipationRecorded",
    type: "event",
  },
] as const;

/**
 * Mock contract addresses (replace with actual deployed addresses)
 */
export const DID_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000" as const;

/**
 * Helper function to get DID contract configuration
 */
export function getDIDContractConfig() {
  return {
    address: DID_CONTRACT_ADDRESS,
    abi: DID_ABI,
  };
}
