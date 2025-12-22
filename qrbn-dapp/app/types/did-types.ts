// TAWF DID (Decentralized Identity) System Types
// Replaces token-based governance with reputation-based DID system

/**
 * Core TAWF DID Identity
 * Base identity structure for all participants in the ecosystem
 */
export interface TAWFDIDIdentity {
  // DID identifier (e.g., "did:tawf:0x123...")
  did: string;
  
  // Ethereum address associated with this DID
  walletAddress: `0x${string}`;
  
  // Reputation score (0-100) - replaces token-based voting power
  reputationScore: number;
  
  // Activity points accumulated through platform participation
  activityPoints: number;
  
  // Identity verification status
  verified: boolean;
  verifiedAt?: Date;
  
  // DID credentials
  credentials: VerifiableCredential[];
  
  // Participation history
  participationHistory: ParticipationRecord[];
  
  // Account creation
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Verifiable Credential
 * ZK-proof based credentials issued by Sharia Council or platform
 */
export interface VerifiableCredential {
  id: string;
  type: CredentialType;
  issuer: string; // DID of issuer (e.g., Sharia Council member)
  issuedAt: Date;
  expiresAt?: Date;
  
  // ZK proof data
  proof: {
    type: "zk-snark" | "zk-stark" | "signature";
    proofValue: string;
  };
  
  // Credential claims
  claims: Record<string, any>;
  
  // Status
  revoked: boolean;
  revokedAt?: Date;
}

export type CredentialType =
  | "VendorVerification"
  | "ShariaCouncilMember"
  | "CommunityContributor"
  | "FarmOwner"
  | "AnimalHealthCertification"
  | "HalalCompliance";

/**
 * Participation Record
 * Tracks user engagement for reputation calculation
 */
export interface ParticipationRecord {
  id: string;
  type: ParticipationType;
  timestamp: Date;
  pointsEarned: number;
  
  // Reference to related entity
  relatedEntityId?: string;
  relatedEntityType?: "proposal" | "farm" | "animal" | "waqf";
  
  // Transaction hash if on-chain
  txHash?: string;
}

export type ParticipationType =
  | "ProposalVote"
  | "ProposalCreation"
  | "WaqfContribution"
  | "FarmRegistration"
  | "AnimalRegistration"
  | "ShariaReview"
  | "CommunityModeration";

/**
 * Vendor DID Data
 * Extended identity for farm vendors with additional business info
 */
export interface VendorDIDData extends TAWFDIDIdentity {
  // Vendor-specific credentials
  vendorCredentials: VendorCredentials;
  
  // Registered farms
  farms: RegisteredFarm[];
  
  // Vendor reputation metrics
  vendorMetrics: VendorMetrics;
  
  // Business information
  businessInfo: VendorBusinessInfo;
}

export interface VendorCredentials {
  // Business license verification
  businessLicense: VerifiableCredential;
  
  // Halal certification
  halalCertification?: VerifiableCredential;
  
  // Animal welfare certification
  animalWelfareCert?: VerifiableCredential;
  
  // Tax/regulatory compliance
  taxCompliance?: VerifiableCredential;
}

export interface RegisteredFarm {
  farmId: string;
  farmName: string;
  location: string;
  registeredAt: Date;
  
  // Farm status
  status: "active" | "suspended" | "pending" | "deactivated";
  
  // Total animals registered
  totalAnimals: number;
  
  // Total waqf funding received
  totalWaqfReceived: number;
  
  // Verification status
  verified: boolean;
  verifiedBy?: string; // DID of verifier
}

export interface VendorMetrics {
  // Overall vendor rating (0-5 stars)
  rating: number;
  totalReviews: number;
  
  // Success metrics
  totalAnimalsSold: number;
  totalWaqfProposalsApproved: number;
  totalWaqfProposalsRejected: number;
  
  // Compliance score
  complianceScore: number;
  
  // Response time (hours)
  averageResponseTime: number;
}

export interface VendorBusinessInfo {
  businessName: string;
  businessType: "individual" | "cooperative" | "company";
  registrationNumber?: string;
  
  // Contact
  email?: string;
  phone?: string;
  website?: string;
  
  // Address
  businessAddress: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  
  // Bank details for payouts
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
}

/**
 * Animal Registry Entry
 * On-chain animal tracking with tag IDs
 */
export interface AnimalRegistryEntry {
  id: string;
  
  // Physical animal tag ID
  tagId: string;
  
  // Animal details
  species: "kambing" | "sapi" | "domba";
  breed: string;
  age: number; // in months
  weight: number; // in kg
  gender: "jantan" | "betina";
  
  // Health status
  healthStatus: HealthStatus;
  healthRecords: HealthRecord[];
  
  // Ownership
  farmId: string;
  vendorDID: string;
  
  // Lifecycle tracking
  lifecycle: AnimalLifecycle;
  currentStage: LifecycleStage;
  
  // Halal compliance
  halalCompliant: boolean;
  halalCertification?: VerifiableCredential;
  
  // Photos/documentation
  images: string[];
  documents: string[];
  
  // Timestamps
  registeredAt: Date;
  updatedAt: Date;
  
  // Waqf funding (if applicable)
  waqfFunded: boolean;
  waqfProposalId?: string;
  waqfAmount?: number;
}

export interface HealthStatus {
  status: "healthy" | "sick" | "quarantine" | "recovering";
  lastCheckup: Date;
  nextCheckup?: Date;
  veterinarianDID?: string;
  notes?: string;
}

export interface HealthRecord {
  id: string;
  date: Date;
  type: "checkup" | "vaccination" | "treatment" | "surgery";
  veterinarianDID: string;
  diagnosis?: string;
  treatment?: string;
  medications?: string[];
  notes?: string;
  documents?: string[];
}

export type LifecycleStage =
  | "raising"      // Being raised at farm
  | "ready"        // Ready for market
  | "listed"       // Listed on marketplace
  | "sold"         // Sold to customer
  | "sacrificed"   // Qurban completed
  | "deceased";    // Died (natural causes or health issues)

export interface AnimalLifecycle {
  raising?: {
    startDate: Date;
    expectedReadyDate: Date;
  };
  ready?: {
    date: Date;
  };
  listed?: {
    listedDate: Date;
    price: number;
    currency: string;
  };
  sold?: {
    soldDate: Date;
    buyerAddress?: string;
    price: number;
    currency: string;
  };
  sacrificed?: {
    sacrificeDate: Date;
    location: string;
    witnesses?: string[];
  };
  deceased?: {
    date: Date;
    cause: string;
    reportedBy: string;
  };
}

/**
 * Waqf Proposal (by Vendors)
 * Vendors request waqf funding for raising animals
 */
export interface WaqfProposal {
  id: string;
  
  // Proposer (vendor)
  proposerDID: string;
  farmId: string;
  
  // Proposal details
  title: string;
  description: string;
  
  // Funding request
  requestedAmount: number;
  currency: string;
  
  // Animals to be raised
  animalPlan: AnimalPlan[];
  expectedDuration: number; // in days
  
  // Timeline
  timeline: ProposalTimeline;
  
  // Approval gates
  approvalGates: ApprovalGates;
  
  // Current status
  status: WaqfProposalStatus;
  
  // Voting results
  communityVote?: VoteResults;
  shariaVote?: ShariaVoteResults;
  
  // Funding
  fundingReceived: number;
  fundingDate?: Date;
  
  // Deliverables
  deliverables: Deliverable[];
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  finalizedAt?: Date;
}

export interface AnimalPlan {
  species: "kambing" | "sapi" | "domba";
  quantity: number;
  estimatedCostPerAnimal: number;
  targetWeight: number;
  expectedReadyDate: Date;
}

export interface ProposalTimeline {
  submissionDate: Date;
  communityVoteStart?: Date;
  communityVoteEnd?: Date;
  shariaReviewStart?: Date;
  shariaReviewEnd?: Date;
  executionDate?: Date;
  completionDate?: Date;
}

export interface ApprovalGates {
  // Gate 1: Community DAO
  communityGate: {
    required: boolean;
    passed: boolean;
    minReputationToVote: number;
    quorumRequired: number; // percentage
    approvalThreshold: number; // percentage
  };
  
  // Gate 2: ZK Sharia Council
  shariaGate: {
    required: boolean;
    passed: boolean;
    councilMembersRequired: number;
    approvalsReceived: number;
  };
}

export type WaqfProposalStatus =
  | "draft"
  | "submitted"
  | "community_voting"
  | "community_approved"
  | "community_rejected"
  | "sharia_review"
  | "sharia_approved"
  | "sharia_rejected"
  | "approved"
  | "rejected"
  | "funded"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface VoteResults {
  totalVotes: number;
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  totalReputationVoted: number;
  quorumReached: boolean;
  passed: boolean;
  votes: Vote[];
}

export interface Vote {
  voterDID: string;
  voterReputation: number;
  choice: "for" | "against" | "abstain";
  timestamp: Date;
  txHash?: string;
}

export interface ShariaVoteResults {
  totalCouncilMembers: number;
  approvalsReceived: number;
  rejectionsReceived: number;
  passed: boolean;
  councilVotes: ShariaCouncilVote[];
  zkProof?: string; // ZK proof of council approval
}

export interface ShariaCouncilVote {
  councilMemberDID: string;
  choice: "approve" | "reject" | "request_revision";
  comments?: string;
  timestamp: Date;
  zkProofSignature: string;
}

export interface Deliverable {
  id: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  completedDate?: Date;
  evidence?: string[]; // URLs to photos/documents
}

/**
 * DAO Proposal (Governance)
 * Community proposals for platform governance
 */
export interface DAOProposal {
  id: string;
  
  // Proposer
  proposerDID: string;
  proposerReputation: number;
  
  // Proposal details
  title: string;
  description: string;
  category: ProposalCategory;
  
  // Proposal data
  proposalData: any; // Specific to proposal type
  
  // Voting period
  votingStartTime: Date;
  votingEndTime: Date;
  
  // Approval gates
  approvalGates: ApprovalGates;
  
  // Current status
  status: DAOProposalStatus;
  
  // Voting results
  communityVote?: VoteResults;
  shariaVote?: ShariaVoteResults;
  
  // Execution
  executed: boolean;
  executedAt?: Date;
  executionTxHash?: string;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export type ProposalCategory =
  | "PlatformParameter"    // Fee adjustments, thresholds, etc.
  | "ShariaCompliance"     // Sharia rule updates
  | "VendorManagement"     // Vendor approval/suspension
  | "TreasuryManagement"   // Platform treasury decisions
  | "FeatureAddition"      // New features
  | "EmergencyAction";     // Emergency interventions

export type DAOProposalStatus =
  | "draft"
  | "active"
  | "community_approved"
  | "community_rejected"
  | "sharia_review"
  | "sharia_approved"
  | "sharia_rejected"
  | "approved"
  | "rejected"
  | "executed"
  | "expired"
  | "cancelled";

/**
 * Sharia Council Member
 * Special DID type for ZK Sharia Council members
 */
export interface ShariaCouncilMember extends TAWFDIDIdentity {
  // Council-specific credentials
  councilCredentials: CouncilCredentials;
  
  // Council member info
  memberInfo: CouncilMemberInfo;
  
  // Voting history
  votingHistory: ShariaCouncilVote[];
  
  // ZK proof capabilities
  zkProofKey: string;
  zkProofAlgorithm: "zk-snark" | "zk-stark";
}

export interface CouncilCredentials {
  // Educational credentials
  education: VerifiableCredential[];
  
  // Sharia scholar certification
  scholarCertification: VerifiableCredential;
  
  // Islamic finance expertise
  islamicFinanceCert?: VerifiableCredential;
  
  // Professional experience
  experienceCerts: VerifiableCredential[];
}

export interface CouncilMemberInfo {
  name: string;
  title: string;
  specialization: string[];
  
  // Experience
  yearsOfExperience: number;
  institution?: string;
  
  // Language capabilities
  languages: string[];
  
  // Appointment
  appointedAt: Date;
  appointedBy?: string;
  termEndDate?: Date;
  
  // Activity
  totalReviewsCompleted: number;
  averageReviewTime: number; // in hours
  active: boolean;
}

/**
 * Reputation calculation helpers
 */
export interface ReputationFactors {
  basePoints: number;
  waqfContributions: number;
  proposalParticipation: number;
  vendorPerformance: number;
  communityEngagement: number;
  shariaCompliance: number;
  penaltyPoints: number;
}

export function calculateReputation(factors: ReputationFactors): number {
  const total =
    factors.basePoints +
    factors.waqfContributions +
    factors.proposalParticipation +
    factors.vendorPerformance +
    factors.communityEngagement +
    factors.shariaCompliance -
    factors.penaltyPoints;
  
  // Cap at 0-100
  return Math.max(0, Math.min(100, total));
}

/**
 * Mock data for development
 */
export const MOCK_DID_IDENTITY: TAWFDIDIdentity = {
  did: "did:tawf:0x1234567890abcdef",
  walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
  reputationScore: 75,
  activityPoints: 1500,
  verified: true,
  verifiedAt: new Date("2024-01-15"),
  credentials: [],
  participationHistory: [],
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-12-20"),
};

export const MOCK_VENDOR_DID: VendorDIDData = {
  ...MOCK_DID_IDENTITY,
  did: "did:tawf:vendor:0xvendor123",
  reputationScore: 85,
  vendorCredentials: {
    businessLicense: {
      id: "cred-001",
      type: "VendorVerification",
      issuer: "did:tawf:admin",
      issuedAt: new Date("2024-01-10"),
      proof: {
        type: "signature",
        proofValue: "0xproof123",
      },
      claims: {
        businessName: "Peternakan Berkah",
        registrationNumber: "123456789",
      },
      revoked: false,
    },
  },
  farms: [
    {
      farmId: "farm-001",
      farmName: "Peternakan Berkah Malang",
      location: "Malang, Jawa Timur",
      registeredAt: new Date("2024-01-15"),
      status: "active",
      totalAnimals: 150,
      totalWaqfReceived: 250000000,
      verified: true,
      verifiedBy: "did:tawf:admin",
    },
  ],
  vendorMetrics: {
    rating: 4.8,
    totalReviews: 125,
    totalAnimalsSold: 450,
    totalWaqfProposalsApproved: 8,
    totalWaqfProposalsRejected: 1,
    complianceScore: 95,
    averageResponseTime: 4.5,
  },
  businessInfo: {
    businessName: "Peternakan Berkah",
    businessType: "cooperative",
    registrationNumber: "123456789",
    email: "info@peternak-berkah.id",
    phone: "+62812345678",
    businessAddress: {
      street: "Jl. Peternakan No. 123",
      city: "Malang",
      province: "Jawa Timur",
      postalCode: "65111",
      country: "Indonesia",
    },
  },
};

export const MOCK_SHARIA_MEMBER: ShariaCouncilMember = {
  ...MOCK_DID_IDENTITY,
  did: "did:tawf:council:0xcouncil123",
  reputationScore: 100,
  councilCredentials: {
    education: [],
    scholarCertification: {
      id: "cred-scholar-001",
      type: "ShariaCouncilMember",
      issuer: "did:tawf:admin",
      issuedAt: new Date("2024-01-01"),
      proof: {
        type: "zk-snark",
        proofValue: "0xzkproof",
      },
      claims: {
        institution: "Al-Azhar University",
        degree: "PhD in Islamic Finance",
      },
      revoked: false,
    },
    experienceCerts: [],
  },
  memberInfo: {
    name: "Dr. Ahmad Rahman",
    title: "Senior Sharia Scholar",
    specialization: ["Islamic Finance", "Halal Certification", "Waqf Management"],
    yearsOfExperience: 15,
    institution: "Indonesian Ulema Council",
    languages: ["Indonesian", "Arabic", "English"],
    appointedAt: new Date("2024-01-01"),
    totalReviewsCompleted: 45,
    averageReviewTime: 24,
    active: true,
  },
  votingHistory: [],
  zkProofKey: "0xzkkey123",
  zkProofAlgorithm: "zk-snark",
};
