// QRBN Smart Contract Configuration for Lisk Sepolia
import { Address } from 'viem'

// Contract addresses on Lisk Sepolia
export const CONTRACTS = {
  QrbnTimelock: '0x5a2B2Dd70740FE6e89f27c1873Cd51e2eA6128B4' as Address,
  QrbnGov: '0x20f0DC35b3439B8bd123a7968086A397cde38af7' as Address,
  QrbnToken: '0xF288b95F986bd297c3e6E283066CB52B6986E931' as Address,
  Qurban: '0xcaba4eC21D3f63Ac33817a14564A0c9Da0E8410b' as Address,
  QurbanNFT: '0x49316Dd941a78f27f431c072722b7C613D9731d4' as Address,
  QrbnTreasury: '0x93a5FD10595F311f1134Ea673136CA22412e5158' as Address,
} as const

// ERC20 Token ABI (for QrbnToken)
export const ERC20_ABI = [
  {
    inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'to', type: 'address' }, { name: 'amount', type: 'uint256' }],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'from', type: 'address' }, { name: 'to', type: 'address' }, { name: 'amount', type: 'uint256' }],
    name: 'transferFrom',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

// Qurban Contract ABI
export const QURBAN_ABI = [
  {
    inputs: [
      { name: '_amount', type: 'uint256' },
      { name: '_animalType', type: 'string' },
      { name: '_location', type: 'string' }
    ],
    name: 'makeQurbanDonation',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ name: 'donor', type: 'address' }],
    name: 'getDonationHistory',
    outputs: [
      {
        components: [
          { name: 'amount', type: 'uint256' },
          { name: 'animalType', type: 'string' },
          { name: 'location', type: 'string' },
          { name: 'timestamp', type: 'uint256' },
          { name: 'nftMinted', type: 'bool' }
        ],
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalDonations',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '_amount', type: 'uint256' }],
    name: 'makeZakatDonation',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
] as const

// QurbanNFT Contract ABI
export const QURBAN_NFT_ABI = [
  {
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'owner', type: 'address' }, { name: 'index', type: 'uint256' }],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

// Treasury Contract ABI
export const TREASURY_ABI = [
  {
    inputs: [],
    name: 'getTreasuryBalance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getZakatBalance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getQurbanBalance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

// Governor Contract ABI (simplified)
export const GOVERNOR_ABI = [
  {
    inputs: [],
    name: 'proposalCount',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'proposalId', type: 'uint256' }],
    name: 'state',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

// USDT Contract ABI (for payments)
export const USDT_ABI = [
  {
    inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'spender', type: 'address' }, { name: 'owner', type: 'address' }],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

// USDT address on Lisk Sepolia (Tether USD)
export const USDT_ADDRESS = '0xA15b8c478DE0C25d8a8c1e55AEd2b80b41BbfC4d' as Address // Lisk Sepolia USDT

// Network configuration
export const LISK_SEPOLIA = {
  id: 4202,
  name: 'Lisk Sepolia',
  network: 'lisk-sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Sepolia Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://rpc.sepolia-api.lisk.com'] },
    public: { http: ['https://rpc.sepolia-api.lisk.com'] },
  },
  blockExplorers: {
    default: { 
      name: 'Lisk Sepolia Explorer', 
      url: 'https://sepolia-blockscout.lisk.com' 
    },
  },
} as const
