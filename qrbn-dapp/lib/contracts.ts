import { Address } from 'viem'

// Contract addresses on Lisk Sepolia
export const CONTRACT_ADDRESSES = {
  QrbnTimelock: '0x163dcB447774C8c0dF1ccCcb653b1a2E89c7E8aF' as Address,
  QrbnGov: '0x53f338F6ceFB06Afb37a1cfbb9AA3B600D52eeA0' as Address,
  QrbnToken: '0xD91dFc79E1a4b551a3fd6eAE20b66612a0E8aA4a' as Address,
  Qurban: '0x8429B08E77CcDeafbA6F9cf23e1E19660F6A98C9' as Address,
  QurbanNFT: '0x6448807DC186f1391C744578F79ACa6C72a6582F' as Address,
  QrbnTreasury: '0xb999a4e2C3bCdb862246DD8158715720DB0463d3' as Address,
  // USDT contract address on Lisk Sepolia (Update this with the actual USDT address)
  // USDT: '0x05D032ac25d322df992303dCa074EE7392C117b9' as Address, // Replace with actual USDT on Lisk Sepolia
  USDT: '0xb368eFe908117b9Aed375aa6fcF9C4de1B5697BF' as Address, // Replace with actual USDT on Lisk Sepolia --- IGNORE ---
} as const

// Basic ERC20 ABI for QrbnToken
export const QRBN_TOKEN_ABI = [
  {
    "inputs": [{"name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [{"name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{"name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{"name": "", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// Basic Governor ABI for QrbnGov
export const QRBN_GOV_ABI = [
  {
    "inputs": [],
    "name": "proposalCount",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "proposalId", "type": "uint256"}],
    "name": "proposalDeadline",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "proposalId", "type": "uint256"}],
    "name": "state",
    "outputs": [{"name": "", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// Basic NFT ABI for QurbanNFT
export const QURBAN_NFT_ABI = [
  {
    "inputs": [{"name": "owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "tokenId", "type": "uint256"}],
    "name": "tokenURI",
    "outputs": [{"name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// Basic Qurban contract ABI
export const QURBAN_ABI = [
  {
    "inputs": [],
    "name": "getCurrentQurbanPool",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "getUserContributions",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "amount", "type": "uint256"}],
    "name": "contributeQurban",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "amount", "type": "uint256"}, {"name": "zakatType", "type": "uint8"}],
    "name": "donateZakat",
    "outputs": [],
    "stateMutability": "nonpayable", 
    "type": "function"
  }
] as const

// USDT ERC20 ABI
export const USDT_ABI = [
  {
    "inputs": [{"name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{"name": "", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "spender", "type": "address"}, {"name": "amount", "type": "uint256"}],
    "name": "approve",
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "owner", "type": "address"}, {"name": "spender", "type": "address"}],
    "name": "allowance",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "to", "type": "address"}, {"name": "amount", "type": "uint256"}],
    "name": "transfer",
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const

// DAO representative types
export type DAORepresentativeType = 'community' | 'organizational' | 'sharia'

export interface DAORepresentative {
  type: DAORepresentativeType
  title: string
  description: string
  requirements: string[]
  responsibilities: string[]
  formUrl: string
}

export const DAO_REPRESENTATIVES: Record<DAORepresentativeType, DAORepresentative> = {
  community: {
    type: 'community',
    title: 'Community Representative',
    description: 'Represent the voice of the general community in DAO governance decisions.',
    requirements: [
      'Hold minimum 1000 QRBN tokens',
      'Active community member for at least 3 months',
      'Completed at least one Qurban contribution',
      'Good standing in the community'
    ],
    responsibilities: [
      'Vote on proposals affecting community interests',
      'Communicate community feedback to the DAO',
      'Participate in monthly community calls',
      'Help onboard new community members'
    ],
    formUrl: 'https://forms.gle/CommunityRepQRBN2024'
  },
  organizational: {
    type: 'organizational',
    title: 'Organizational Representative',
    description: 'Represent partner organizations and institutional stakeholders.',
    requirements: [
      'Represent a registered Islamic organization',
      'Organization must be verified and in good standing',
      'Hold minimum 5000 QRBN tokens (organizational wallet)',
      'Provide organizational documentation'
    ],
    responsibilities: [
      'Vote on institutional and partnership matters',
      'Facilitate organizational partnerships',
      'Ensure compliance with organizational standards',
      'Bridge between organizations and the DAO'
    ],
    formUrl: 'https://forms.gle/OrganizationalRepQRBN2024'
  },
  sharia: {
    type: 'sharia',
    title: 'Sharia Council Member',
    description: 'Ensure all DAO activities comply with Islamic principles and Sharia law.',
    requirements: [
      'Certified Islamic scholar or recognized religious authority',
      'Minimum 5 years experience in Islamic finance/jurisprudence',
      'Endorsed by established Islamic institution',
      'Background verification and community approval'
    ],
    responsibilities: [
      'Review proposals for Sharia compliance',
      'Provide religious guidance on platform features',
      'Veto power on non-compliant proposals',
      'Issue Sharia compliance certificates'
    ],
    formUrl: 'https://forms.gle/ShariaCouncilQRBN2024'
  }
}