import { Address } from "viem";

// Contract addresses on Lisk Sepolia
export const CONTRACT_ADDRESSES = {
	QrbnTimelock: "0x66d4C161cf34E30fcfb11c5C46a823DFc1Db907D" as Address,
	QrbnGov: "0xA9F9623b5bc0d128778B68aA0e47baec4096EcCD" as Address,
	QrbnToken: "0xb6013ED2EdCEA2dFe53a73AaDaCf51757958F313" as Address,
	Qurban: "0xd8cAF5471D4983d36bc736Cb07eA0523ab2E97c6" as Address,
	QurbanNFT: "0x919D4352D661C14b93a38968170D2bd41454d5db" as Address,
	Zakat: "0x55da968D4970D93cf26E9e3474C760AD447BeD36" as Address,
	ZakatNFT: "0xeE2695Ee0Fc8F0f6190B074396eD95C6c56988fc" as Address,
	QrbnTreasury: "0x227e71b5cB5E9C7B4183F5e1CaF1E08b40c7484F" as Address,
	// USDT contract address on Lisk Sepolia (Update this with the actual USDT address)
	// USDT: '0x05D032ac25d322df992303dCa074EE7392C117b9' as Address, // Replace with actual USDT on Lisk Sepolia
	USDT: "0xaEc207C35f5e6eD63E885928a324a5C7D74c56a8" as Address, // Replace with actual USDT on Lisk Sepolia --- IGNORE ---
} as const;

// Basic ERC20 ABI for QrbnToken
export const QRBN_TOKEN_ABI = [
	{
		inputs: [{ name: "account", type: "address" }],
		name: "balanceOf",
		outputs: [{ name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "totalSupply",
		outputs: [{ name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "name",
		outputs: [{ name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "symbol",
		outputs: [{ name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "decimals",
		outputs: [{ name: "", type: "uint8" }],
		stateMutability: "view",
		type: "function",
	},
] as const;

// Basic Governor ABI for QrbnGov
export const QRBN_GOV_ABI = [
	{
		inputs: [],
		name: "proposalCount",
		outputs: [{ name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ name: "proposalId", type: "uint256" }],
		name: "proposalDeadline",
		outputs: [{ name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ name: "proposalId", type: "uint256" }],
		name: "state",
		outputs: [{ name: "", type: "uint8" }],
		stateMutability: "view",
		type: "function",
	},
] as const;

// Basic NFT ABI for QurbanNFT
export const QURBAN_NFT_ABI = [
	{
		inputs: [{ name: "owner", type: "address" }],
		name: "balanceOf",
		outputs: [{ name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ name: "tokenId", type: "uint256" }],
		name: "tokenURI",
		outputs: [{ name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
] as const;

// Basic Qurban contract ABI
export const QURBAN_ABI = [
	{
		inputs: [],
		name: "getCurrentQurbanPool",
		outputs: [{ name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ name: "user", type: "address" }],
		name: "getUserContributions",
		outputs: [{ name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ name: "amount", type: "uint256" }],
		name: "contributeQurban",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
] as const;

// Basic ZakatNFT ABI
export const ZAKAT_NFT_ABI = [
	{
		inputs: [{ name: "owner", type: "address" }],
		name: "balanceOf",
		outputs: [{ name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ name: "tokenId", type: "uint256" }],
		name: "tokenURI",
		outputs: [{ name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ name: "owner", type: "address" },
			{ name: "index", type: "uint256" },
		],
		name: "tokenOfOwnerByIndex",
		outputs: [{ name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
] as const;

// USDT ERC20 ABI
export const USDT_ABI = [
	{
		inputs: [{ name: "account", type: "address" }],
		name: "balanceOf",
		outputs: [{ name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "decimals",
		outputs: [{ name: "", type: "uint8" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ name: "spender", type: "address" },
			{ name: "amount", type: "uint256" },
		],
		name: "approve",
		outputs: [{ name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ name: "owner", type: "address" },
			{ name: "spender", type: "address" },
		],
		name: "allowance",
		outputs: [{ name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ name: "to", type: "address" },
			{ name: "amount", type: "uint256" },
		],
		name: "transfer",
		outputs: [{ name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
] as const;

// DAO representative types
export type DAORepresentativeType = "community" | "organizational" | "sharia";

export interface DAORepresentative {
	type: DAORepresentativeType;
	title: string;
	description: string;
	requirements: string[];
	responsibilities: string[];
	formUrl: string;
}

export const DAO_REPRESENTATIVES: Record<DAORepresentativeType, DAORepresentative> = {
	community: {
		type: "community",
		title: "Community Representative",
		description: "Represent the voice of the general community in DAO governance decisions.",
		requirements: [
			"Hold minimum 1000 QRBN tokens",
			"Active community member for at least 3 months",
			"Completed at least one Qurban contribution",
			"Good standing in the community",
		],
		responsibilities: [
			"Vote on proposals affecting community interests",
			"Communicate community feedback to the DAO",
			"Participate in monthly community calls",
			"Help onboard new community members",
		],
		formUrl: "https://forms.gle/CommunityRepQRBN2025",
	},
	organizational: {
		type: "organizational",
		title: "Organizational Representative",
		description: "Represent partner organizations and institutional stakeholders.",
		requirements: [
			"Represent a registered Islamic organization",
			"Organization must be verified and in good standing",
			"Hold minimum 5000 QRBN tokens (organizational wallet)",
			"Provide organizational documentation",
		],
		responsibilities: [
			"Vote on institutional and partnership matters",
			"Facilitate organizational partnerships",
			"Ensure compliance with organizational standards",
			"Bridge between organizations and the DAO",
		],
		formUrl: "https://forms.gle/OrganizationalRepQRBN2025",
	},
	sharia: {
		type: "sharia",
		title: "Sharia Council Member",
		description: "Ensure all DAO activities comply with Islamic principles and Sharia law.",
		requirements: [
			"Certified Islamic scholar or recognized religious authority",
			"Minimum 5 years experience in Islamic finance/jurisprudence",
			"Endorsed by established Islamic institution",
			"Background verification and community approval",
		],
		responsibilities: [
			"Review proposals for Sharia compliance",
			"Provide religious guidance on platform features",
			"Veto power on non-compliant proposals",
			"Issue Sharia compliance certificates",
		],
		formUrl: "https://forms.gle/ShariaCouncilQRBN2025",
	},
};
