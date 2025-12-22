/**
 * Waqf Smart Contract ABI (MOCK)
 * This is a mock ABI for prototype demonstration
 * In production, this would be the actual deployed smart contract ABI
 */

export const waqfAbi = [
  // Read Functions
  {
    inputs: [],
    name: "getPoolInfo",
    outputs: [
      { name: "totalCollected", type: "uint256" },
      { name: "totalDistributed", type: "uint256" },
      { name: "availableBalance", type: "uint256" },
      { name: "activeFarms", type: "uint256" },
      { name: "totalContributors", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "farmId", type: "string" }],
    name: "getFarmInfo",
    outputs: [
      { name: "name", type: "string" },
      { name: "location", type: "string" },
      { name: "farmType", type: "uint8" },
      { name: "fundingGoal", type: "uint256" },
      { name: "currentFunding", type: "uint256" },
      { name: "contributors", type: "uint256" },
      { name: "verificationStatus", type: "uint8" },
      { name: "daoApproved", type: "bool" },
      { name: "shariaCompliant", type: "bool" },
      { name: "nazhirFeePercent", type: "uint8" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "contributor", type: "address" }],
    name: "getContributorTotalAmount",
    outputs: [{ name: "total", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "contributor", type: "address" }],
    name: "getContributorCertificatesCount",
    outputs: [{ name: "count", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { name: "contributor", type: "address" },
      { name: "farmId", type: "string" }
    ],
    name: "hasContributed",
    outputs: [{ name: "contributed", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "farmId", type: "string" }],
    name: "isFarmVerified",
    outputs: [{ name: "verified", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "farmId", type: "string" }],
    name: "isDAOApproved",
    outputs: [{ name: "approved", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },

  // Write Functions
  {
    inputs: [
      { name: "farmId", type: "string" },
      { name: "amount", type: "uint256" },
      { name: "message", type: "string" }
    ],
    name: "contributeToFarm",
    outputs: [{ name: "contributionId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ name: "amount", type: "uint256" }],
    name: "contributeToGeneralPool",
    outputs: [{ name: "contributionId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },

  // Farm Management (Admin/DAO)
  {
    inputs: [
      { name: "farmId", type: "string" },
      { name: "name", type: "string" },
      { name: "location", type: "string" },
      { name: "farmType", type: "uint8" },
      { name: "fundingGoal", type: "uint256" },
      { name: "farmerAddress", type: "address" },
      { name: "nazhirFeePercent", type: "uint8" }
    ],
    name: "registerFarm",
    outputs: [{ name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ name: "farmId", type: "string" }],
    name: "approveFarmOnChain",
    outputs: [{ name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { name: "farmId", type: "string" },
      { name: "amount", type: "uint256" }
    ],
    name: "distributeFundsToFarm",
    outputs: [{ name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function"
  },

  // NFT Certificate Functions
  {
    inputs: [
      { name: "contributor", type: "address" },
      { name: "farmId", type: "string" },
      { name: "amount", type: "uint256" }
    ],
    name: "mintWaqfCertificate",
    outputs: [{ name: "tokenId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },

  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "contributionId", type: "uint256" },
      { indexed: true, name: "contributor", type: "address" },
      { indexed: false, name: "farmId", type: "string" },
      { indexed: false, name: "amount", type: "uint256" },
      { indexed: false, name: "nazhirFee", type: "uint256" },
      { indexed: false, name: "serviceFees", type: "uint256" },
      { indexed: false, name: "netToFarm", type: "uint256" },
      { indexed: false, name: "timestamp", type: "uint256" }
    ],
    name: "WaqfContribution",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "farmId", type: "string" },
      { indexed: false, name: "name", type: "string" },
      { indexed: false, name: "location", type: "string" },
      { indexed: true, name: "farmerAddress", type: "address" }
    ],
    name: "FarmRegistered",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "farmId", type: "string" },
      { indexed: true, name: "approver", type: "address" }
    ],
    name: "FarmApproved",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "tokenId", type: "uint256" },
      { indexed: true, name: "recipient", type: "address" },
      { indexed: false, name: "farmId", type: "string" },
      { indexed: false, name: "amount", type: "uint256" }
    ],
    name: "WaqfCertificateMinted",
    type: "event"
  }
] as const;

// Type Guards and Helpers
export type WaqfAbi = typeof waqfAbi;

// Mock Contract Address (for prototype)
export const MOCK_WAQF_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";

// Enums matching the smart contract
export enum FarmType {
  Livestock = 0,
  Dairy = 1,
  Mixed = 2,
  Poultry = 3
}

export enum VerificationStatus {
  PreVerification = 0,
  OffChainVerified = 1,
  OnChainVerified = 2,
  ActiveRecipient = 3
}

// Mock function to simulate contract interaction
export function createMockWaqfContribution(
  farmId: string,
  amount: number,
  contributor: string
) {
  return {
    contributionId: BigInt(Date.now()),
    farmId,
    contributor,
    amount: BigInt(Math.floor(amount * 1e6)), // Convert to USDT decimals
    nazhirFee: BigInt(Math.floor(amount * 0.08 * 1e6)), // 8% example
    serviceFees: BigInt(6 * 1e6), // $6 USDT
    netToFarm: BigInt(Math.floor((amount - amount * 0.08 - 6) * 1e6)),
    timestamp: BigInt(Math.floor(Date.now() / 1000)),
    transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`
  };
}
