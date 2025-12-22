/**
 * Waqf (Islamic Endowment) Type Definitions
 * For Kurban Farms Financing Platform
 */

export type VerificationStatus = 
  | "pre-verification" 
  | "off-chain-verified" 
  | "on-chain-verified" 
  | "active-recipient";

export type FarmType = 
  | "dairy" 
  | "livestock" 
  | "mixed" 
  | "poultry";

export interface FeeStructure {
  // Nazhir (Manager) Fee - Indonesian standard 5-10%, up to 20%
  nazhirFeePercent: number;
  
  // Platform Service Fees (fixed)
  platformServiceFee: number; // in USDT
  verificationFee: number; // in USDT
  nftCertificateFee: number; // in USDT
  monitoringFee: number; // in USDT
  
  // Total transparent costs
  totalServiceFees: number; // in USDT
}

export interface FarmerInfo {
  name: string;
  id: string;
  walletAddress?: string;
  location: string;
  contactInfo?: string;
  registrationNumber?: string;
  yearsExperience: number;
  certifications: string[];
}

export interface ImpactMetrics {
  animalsRaised: number;
  familiesBenefited: number;
  employeesSupported: number;
  landAreaHectares: number;
  sustainabilityScore: number; // 0-100
}

export interface WaqfFarm {
  id: string;
  name: string;
  description: string;
  location: string;
  farmType: FarmType;
  
  // Funding Information
  fundingGoal: number; // in USDT
  currentFunding: number; // in USDT
  contributors: number;
  
  // Verification Status
  verificationStatus: VerificationStatus;
  verificationDate?: Date;
  daoApproved: boolean;
  shariaCompliant: boolean;
  auditReports: string[]; // URLs to audit documents
  
  // Farmer Information
  farmerInfo: FarmerInfo;
  
  // Impact Metrics
  impactMetrics: ImpactMetrics;
  
  // Visual Assets
  images: string[];
  videoUrl?: string;
  
  // Fee Structure
  feeStructure: FeeStructure;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  targetDate?: Date;
}

export interface WaqfContribution {
  id: string;
  farmId: string;
  contributorAddress: string;
  amount: number; // in USDT
  nazhirFee: number;
  serviceFees: number;
  netToFarm: number;
  timestamp: Date;
  transactionHash?: string;
  nftCertificateId?: string;
}

export interface WaqfPoolInfo {
  totalCollected: number;
  totalDistributed: number;
  availableBalance: number;
  activeFarms: number;
  totalContributors: number;
}

// Mock Data for Demonstration
export const MOCK_WAQF_FARMS: WaqfFarm[] = [
  {
    id: "farm-001",
    name: "Mitra Qurban Jawa Timur",
    description: "Family-owned farm specializing in high-quality goats for qurban. Established in 2018 with focus on ethical animal raising and community support. Located in the fertile highlands of East Java.",
    location: "Malang, East Java, Indonesia",
    farmType: "livestock",
    fundingGoal: 15000,
    currentFunding: 8750,
    contributors: 42,
    verificationStatus: "on-chain-verified",
    verificationDate: new Date("2024-11-15"),
    daoApproved: true,
    shariaCompliant: true,
    auditReports: ["/audits/farm-001-2024.pdf"],
    farmerInfo: {
      name: "H. Ahmad Hidayat",
      id: "FARMER-JT-001",
      location: "Malang, East Java",
      registrationNumber: "REG-JT-2018-001",
      yearsExperience: 12,
      certifications: ["Halal Certified", "Animal Welfare Standard", "Organic Feed"]
    },
    impactMetrics: {
      animalsRaised: 156,
      familiesBenefited: 890,
      employeesSupported: 8,
      landAreaHectares: 5.5,
      sustainabilityScore: 87
    },
    images: [
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800",
      "https://images.unsplash.com/photo-1542652694-40abf526446e?w=800",
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800"
    ],
    feeStructure: {
      nazhirFeePercent: 8,
      platformServiceFee: 2.5,
      verificationFee: 1.0,
      nftCertificateFee: 1.5,
      monitoringFee: 1.0,
      totalServiceFees: 6.0
    },
    createdAt: new Date("2024-10-01"),
    updatedAt: new Date("2024-12-20"),
    targetDate: new Date("2025-06-15")
  },
  {
    id: "farm-002",
    name: "Peternakan Berkah Sentosa",
    description: "Modern cattle farm with advanced breeding programs. Specializes in premium cows for shared qurban sacrifices. Implements sustainable farming practices and community education programs.",
    location: "Bogor, West Java, Indonesia",
    farmType: "mixed",
    fundingGoal: 25000,
    currentFunding: 12300,
    contributors: 67,
    verificationStatus: "on-chain-verified",
    verificationDate: new Date("2024-10-20"),
    daoApproved: true,
    shariaCompliant: true,
    auditReports: ["/audits/farm-002-2024.pdf"],
    farmerInfo: {
      name: "Ibu Siti Nurhaliza",
      id: "FARMER-JB-002",
      location: "Bogor, West Java",
      registrationNumber: "REG-JB-2020-045",
      yearsExperience: 8,
      certifications: ["Halal Certified", "Sustainable Farming", "Veterinary Approved"]
    },
    impactMetrics: {
      animalsRaised: 89,
      familiesBenefited: 1240,
      employeesSupported: 12,
      landAreaHectares: 8.2,
      sustainabilityScore: 92
    },
    images: [
      "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800",
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800"
    ],
    feeStructure: {
      nazhirFeePercent: 7,
      platformServiceFee: 2.5,
      verificationFee: 1.0,
      nftCertificateFee: 1.5,
      monitoringFee: 1.0,
      totalServiceFees: 6.0
    },
    createdAt: new Date("2024-09-15"),
    updatedAt: new Date("2024-12-21"),
    targetDate: new Date("2025-06-15")
  },
  {
    id: "farm-003",
    name: "Kambing Gemilang Nusantara",
    description: "Specialized goat breeding center focusing on premium breeds. Family-operated for three generations with deep knowledge of traditional and modern farming techniques.",
    location: "Yogyakarta, D.I. Yogyakarta, Indonesia",
    farmType: "livestock",
    fundingGoal: 10000,
    currentFunding: 9250,
    contributors: 58,
    verificationStatus: "active-recipient",
    verificationDate: new Date("2024-09-01"),
    daoApproved: true,
    shariaCompliant: true,
    auditReports: ["/audits/farm-003-2024-q1.pdf", "/audits/farm-003-2024-q2.pdf"],
    farmerInfo: {
      name: "Bp. Suryanto Wijaya",
      id: "FARMER-YK-003",
      location: "Yogyakarta City",
      registrationNumber: "REG-YK-2015-089",
      yearsExperience: 25,
      certifications: ["Halal Certified", "Heritage Farmer", "Quality Assured"]
    },
    impactMetrics: {
      animalsRaised: 234,
      familiesBenefited: 1450,
      employeesSupported: 6,
      landAreaHectares: 4.0,
      sustainabilityScore: 85
    },
    images: [
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800",
      "https://images.unsplash.com/photo-1568849676085-51415703900f?w=800"
    ],
    feeStructure: {
      nazhirFeePercent: 6,
      platformServiceFee: 2.5,
      verificationFee: 1.0,
      nftCertificateFee: 1.5,
      monitoringFee: 1.0,
      totalServiceFees: 6.0
    },
    createdAt: new Date("2024-08-10"),
    updatedAt: new Date("2024-12-22"),
    targetDate: new Date("2025-06-10")
  },
  {
    id: "farm-004",
    name: "Ternak Mandiri Sejahtera",
    description: "Community cooperative farm supporting 15 local families. Focuses on sustainable livestock management and fair income distribution. New to the platform but with strong local reputation.",
    location: "Bandung, West Java, Indonesia",
    farmType: "mixed",
    fundingGoal: 18000,
    currentFunding: 3600,
    contributors: 21,
    verificationStatus: "off-chain-verified",
    verificationDate: new Date("2024-12-01"),
    daoApproved: false,
    shariaCompliant: true,
    auditReports: [],
    farmerInfo: {
      name: "Koperasi Ternak Bandung",
      id: "FARMER-JB-004",
      location: "Bandung, West Java",
      registrationNumber: "REG-JB-2023-112",
      yearsExperience: 3,
      certifications: ["Cooperative Certified", "Halal Process"]
    },
    impactMetrics: {
      animalsRaised: 67,
      familiesBenefited: 340,
      employeesSupported: 15,
      landAreaHectares: 6.8,
      sustainabilityScore: 78
    },
    images: [
      "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800"
    ],
    feeStructure: {
      nazhirFeePercent: 9,
      platformServiceFee: 2.5,
      verificationFee: 1.0,
      nftCertificateFee: 1.5,
      monitoringFee: 1.0,
      totalServiceFees: 6.0
    },
    createdAt: new Date("2024-11-20"),
    updatedAt: new Date("2024-12-18"),
    targetDate: new Date("2025-06-20")
  },
  {
    id: "farm-005",
    name: "Sapi Unggul Nusantara",
    description: "Premium cattle breeding facility with veterinary supervision. Specializes in healthy, well-maintained cows for qurban. Strong track record of successful sacrifices.",
    location: "Semarang, Central Java, Indonesia",
    farmType: "livestock",
    fundingGoal: 30000,
    currentFunding: 18900,
    contributors: 94,
    verificationStatus: "on-chain-verified",
    verificationDate: new Date("2024-11-01"),
    daoApproved: true,
    shariaCompliant: true,
    auditReports: ["/audits/farm-005-2024.pdf"],
    farmerInfo: {
      name: "Dr. Budi Santoso",
      id: "FARMER-JT-005",
      location: "Semarang, Central Java",
      registrationNumber: "REG-JT-2019-023",
      yearsExperience: 15,
      certifications: ["Veterinary Certified", "Halal Certified", "Premium Breeding"]
    },
    impactMetrics: {
      animalsRaised: 112,
      familiesBenefited: 1680,
      employeesSupported: 18,
      landAreaHectares: 12.5,
      sustainabilityScore: 94
    },
    images: [
      "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800",
      "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800",
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800"
    ],
    feeStructure: {
      nazhirFeePercent: 7,
      platformServiceFee: 2.5,
      verificationFee: 1.0,
      nftCertificateFee: 1.5,
      monitoringFee: 1.0,
      totalServiceFees: 6.0
    },
    createdAt: new Date("2024-10-05"),
    updatedAt: new Date("2024-12-21"),
    targetDate: new Date("2025-06-12")
  },
  {
    id: "farm-006",
    name: "Peternakan Hijau Lestari",
    description: "Eco-friendly farm combining traditional values with modern sustainability. Focus on organic feed, animal welfare, and environmental conservation. Currently under DAO review.",
    location: "Surabaya, East Java, Indonesia",
    farmType: "mixed",
    fundingGoal: 20000,
    currentFunding: 5400,
    contributors: 28,
    verificationStatus: "off-chain-verified",
    verificationDate: new Date("2024-12-10"),
    daoApproved: false,
    shariaCompliant: true,
    auditReports: [],
    farmerInfo: {
      name: "Hj. Fatimah Zahra",
      id: "FARMER-JT-006",
      location: "Surabaya, East Java",
      registrationNumber: "REG-JT-2022-078",
      yearsExperience: 5,
      certifications: ["Organic Certified", "Eco-Farming", "Halal Process"]
    },
    impactMetrics: {
      animalsRaised: 45,
      familiesBenefited: 280,
      employeesSupported: 9,
      landAreaHectares: 7.3,
      sustainabilityScore: 96
    },
    images: [
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800"
    ],
    feeStructure: {
      nazhirFeePercent: 8,
      platformServiceFee: 2.5,
      verificationFee: 1.0,
      nftCertificateFee: 1.5,
      monitoringFee: 1.0,
      totalServiceFees: 6.0
    },
    createdAt: new Date("2024-11-28"),
    updatedAt: new Date("2024-12-19"),
    targetDate: new Date("2025-06-25")
  }
];

// Helper Functions
export function calculateFeeBreakdown(amount: number, feeStructure: FeeStructure) {
  const nazhirFee = (amount * feeStructure.nazhirFeePercent) / 100;
  const serviceFees = feeStructure.totalServiceFees;
  const netToFarm = amount - nazhirFee - serviceFees;
  
  return {
    originalAmount: amount,
    nazhirFee,
    serviceFees,
    netToFarm,
    totalFees: nazhirFee + serviceFees
  };
}

export function getFundingProgress(farm: WaqfFarm): number {
  return Math.min(100, (farm.currentFunding / farm.fundingGoal) * 100);
}

export function getRemainingFunding(farm: WaqfFarm): number {
  return Math.max(0, farm.fundingGoal - farm.currentFunding);
}

export function getVerificationBadgeColor(status: VerificationStatus): string {
  switch (status) {
    case "pre-verification":
      return "bg-gray-500/20 text-gray-400 border-gray-400/30";
    case "off-chain-verified":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-400/30";
    case "on-chain-verified":
      return "bg-blue-500/20 text-blue-400 border-blue-400/30";
    case "active-recipient":
      return "bg-green-500/20 text-green-400 border-green-400/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-400/30";
  }
}

export function getVerificationLabel(status: VerificationStatus): string {
  switch (status) {
    case "pre-verification":
      return "Pre-Verification";
    case "off-chain-verified":
      return "Off-Chain Verified";
    case "on-chain-verified":
      return "On-Chain Verified";
    case "active-recipient":
      return "Active Recipient";
    default:
      return "Unknown";
  }
}
