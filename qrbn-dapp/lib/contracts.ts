import { Address } from 'viem'

// Contract addresses on Lisk Sepolia
export const CONTRACT_ADDRESSES = {
<<<<<<< Updated upstream
  QrbnTimelock: '0x5a2B2Dd70740FE6e89f27c1873Cd51e2eA6128B4' as Address,
  QrbnGov: '0x20f0DC35b3439B8bd123a7968086A397cde38af7' as Address,
  QrbnToken: '0xF288b95F986bd297c3e6E283066CB52B6986E931' as Address,
  Qurban: '0xcaba4eC21D3f63Ac33817a14564A0c9Da0E8410b' as Address,
  QurbanNFT: '0x49316Dd941a78f27f431c072722b7C613D9731d4' as Address,
  QrbnTreasury: '0x93a5FD10595F311f1134Ea673136CA22412e5158' as Address,
=======
  QrbnTimelock: '0xD480E4394b1Df72b39eAdBb0ce36ccB19dB5867C' as Address,
  QrbnGov: '0x1057C3615610f1F1a90B8c6c094a9DDE3D70bC2B' as Address,
  QrbnToken: '0x0061f6008E05935386E5Ad5b5A608EAd0D062698' as Address,
  Qurban: '0x94c9dCb80Dc75484b0270152372aCcd2a318e609' as Address,
  QurbanNFT: '0x6271C03042f41B8e08DDe8413a7d0db4597E51c1' as Address,
  Zakat: '0x7cE0B440AcD36820c429bdfD9899a5e59D33BE5b' as Address,
  ZakatNFT: '0x2A628BACF45cb6b9Dcf8305A2615693023068B1A' as Address,
  QrbnTreasury: '0x841e2afAAfE341e172Ec1a080898D98302F6bb80' as Address,
>>>>>>> Stashed changes
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
  }
] as const

// Basic Zakat contract ABI
export const ZAKAT_ABI = [
  {
    "inputs": [],
    "name": "getCurrentZakatPool",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "getUserZakatContributions",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "amount", "type": "uint256"}, {"name": "zakatType", "type": "uint8"}],
    "name": "donateZakat",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nisabThreshold",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "zakatRate",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "fitrahAmount",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// Basic ZakatNFT ABI
export const ZAKAT_NFT_ABI = [
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
  },
  {
    "inputs": [{"name": "owner", "type": "address"}, {"name": "index", "type": "uint256"}],
    "name": "tokenOfOwnerByIndex",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
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