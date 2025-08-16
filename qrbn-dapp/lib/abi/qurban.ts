export const QURBAN_ABI = [
	{
		type: "constructor",
		inputs: [
			{
				name: "_usdcTokenAddress",
				type: "address",
				internalType: "address",
			},
			{
				name: "_treasuryAddress",
				type: "address",
				internalType: "address",
			},
			{
				name: "_timelockAddress",
				type: "address",
				internalType: "address",
			},
			{
				name: "_qurbanNFTAddress",
				type: "address",
				internalType: "address",
			},
			{
				name: "_tempAdminAddress",
				type: "address",
				internalType: "address",
			},
		],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "BPS_BASE",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "DEFAULT_ADMIN_ROLE",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "bytes32",
				internalType: "bytes32",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "GOVERNER_ROLE",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "bytes32",
				internalType: "bytes32",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "addAnimal",
		inputs: [
			{
				name: "_vendorAddress",
				type: "address",
				internalType: "address",
			},
			{
				name: "_name",
				type: "string",
				internalType: "string",
			},
			{
				name: "_animalType",
				type: "uint8",
				internalType: "enum Qurban.AnimalType",
			},
			{
				name: "_totalShares",
				type: "uint8",
				internalType: "uint8",
			},
			{
				name: "_pricePerShare",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "_location",
				type: "string",
				internalType: "string",
			},
			{
				name: "_image",
				type: "string",
				internalType: "string",
			},
			{
				name: "_description",
				type: "string",
				internalType: "string",
			},
			{
				name: "_breed",
				type: "string",
				internalType: "string",
			},
			{
				name: "_weight",
				type: "uint16",
				internalType: "uint16",
			},
			{
				name: "_age",
				type: "uint16",
				internalType: "uint16",
			},
			{
				name: "_farmName",
				type: "string",
				internalType: "string",
			},
			{
				name: "_sacrificeDate",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "approveAnimal",
		inputs: [
			{
				name: "_animalId",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "calculatePurchaseCost",
		inputs: [
			{
				name: "_animalId",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "_shareAmount",
				type: "uint8",
				internalType: "uint8",
			},
		],
		outputs: [
			{
				name: "totalCost",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "platformFee",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "vendorShare",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "editAnimal",
		inputs: [
			{
				name: "_vendorAddress",
				type: "address",
				internalType: "address",
			},
			{
				name: "_animalId",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "_name",
				type: "string",
				internalType: "string",
			},
			{
				name: "_animalType",
				type: "uint8",
				internalType: "enum Qurban.AnimalType",
			},
			{
				name: "_totalShares",
				type: "uint8",
				internalType: "uint8",
			},
			{
				name: "_pricePerShare",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "_location",
				type: "string",
				internalType: "string",
			},
			{
				name: "_image",
				type: "string",
				internalType: "string",
			},
			{
				name: "_description",
				type: "string",
				internalType: "string",
			},
			{
				name: "_breed",
				type: "string",
				internalType: "string",
			},
			{
				name: "_weight",
				type: "uint16",
				internalType: "uint16",
			},
			{
				name: "_age",
				type: "uint16",
				internalType: "uint16",
			},
			{
				name: "_farmName",
				type: "string",
				internalType: "string",
			},
			{
				name: "_sacrificeDate",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "editVendor",
		inputs: [
			{
				name: "_vendorAddress",
				type: "address",
				internalType: "address",
			},
			{
				name: "_name",
				type: "string",
				internalType: "string",
			},
			{
				name: "_contactInfo",
				type: "string",
				internalType: "string",
			},
			{
				name: "_location",
				type: "string",
				internalType: "string",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "getAnimalBuyerTransactionsIds",
		inputs: [
			{
				name: "_animalId",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "_buyer",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [
			{
				name: "",
				type: "uint256[]",
				internalType: "uint256[]",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getAnimalBuyers",
		inputs: [
			{
				name: "_animalId",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [
			{
				name: "",
				type: "address[]",
				internalType: "address[]",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getAnimalBuyersCount",
		inputs: [
			{
				name: "_animalId",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getAnimalById",
		inputs: [
			{
				name: "_animalId",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [
			{
				name: "",
				type: "tuple",
				internalType: "struct Qurban.Animal",
				components: [
					{
						name: "id",
						type: "uint256",
						internalType: "uint256",
					},
					{
						name: "name",
						type: "string",
						internalType: "string",
					},
					{
						name: "animalType",
						type: "uint8",
						internalType: "enum Qurban.AnimalType",
					},
					{
						name: "totalShares",
						type: "uint8",
						internalType: "uint8",
					},
					{
						name: "availableShares",
						type: "uint8",
						internalType: "uint8",
					},
					{
						name: "pricePerShare",
						type: "uint256",
						internalType: "uint256",
					},
					{
						name: "location",
						type: "string",
						internalType: "string",
					},
					{
						name: "image",
						type: "string",
						internalType: "string",
					},
					{
						name: "description",
						type: "string",
						internalType: "string",
					},
					{
						name: "breed",
						type: "string",
						internalType: "string",
					},
					{
						name: "weight",
						type: "uint16",
						internalType: "uint16",
					},
					{
						name: "age",
						type: "uint16",
						internalType: "uint16",
					},
					{
						name: "farmName",
						type: "string",
						internalType: "string",
					},
					{
						name: "sacrificeDate",
						type: "uint256",
						internalType: "uint256",
					},
					{
						name: "status",
						type: "uint8",
						internalType: "enum Qurban.AnimalStatus",
					},
					{
						name: "vendorAddress",
						type: "address",
						internalType: "address",
					},
					{
						name: "createdAt",
						type: "uint256",
						internalType: "uint256",
					},
				],
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getAnimalsByStatus",
		inputs: [
			{
				name: "_status",
				type: "uint8",
				internalType: "enum Qurban.AnimalStatus",
			},
		],
		outputs: [
			{
				name: "",
				type: "uint256[]",
				internalType: "uint256[]",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getBuyerTransactionIds",
		inputs: [
			{
				name: "_buyer",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [
			{
				name: "",
				type: "uint256[]",
				internalType: "uint256[]",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getBuyerTransactionsCount",
		inputs: [
			{
				name: "_buyer",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getNextAnimalId",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getNextTransactionId",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getNextVendorId",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getRoleAdmin",
		inputs: [
			{
				name: "role",
				type: "bytes32",
				internalType: "bytes32",
			},
		],
		outputs: [
			{
				name: "",
				type: "bytes32",
				internalType: "bytes32",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getTotalAnimalsCount",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getTransactionInfo",
		inputs: [
			{
				name: "_transactionId",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [
			{
				name: "",
				type: "tuple",
				internalType: "struct Qurban.Transaction",
				components: [
					{
						name: "id",
						type: "uint256",
						internalType: "uint256",
					},
					{
						name: "animalId",
						type: "uint256",
						internalType: "uint256",
					},
					{
						name: "nftCertificateId",
						type: "uint256",
						internalType: "uint256",
					},
					{
						name: "pricePerShare",
						type: "uint256",
						internalType: "uint256",
					},
					{
						name: "totalPaid",
						type: "uint256",
						internalType: "uint256",
					},
					{
						name: "fee",
						type: "uint256",
						internalType: "uint256",
					},
					{
						name: "vendorShare",
						type: "uint256",
						internalType: "uint256",
					},
					{
						name: "timestamp",
						type: "uint256",
						internalType: "uint256",
					},
					{
						name: "shareAmount",
						type: "uint8",
						internalType: "uint8",
					},
					{
						name: "buyer",
						type: "address",
						internalType: "address",
					},
				],
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getVendorAnimals",
		inputs: [
			{
				name: "_vendorAddress",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [
			{
				name: "",
				type: "uint256[]",
				internalType: "uint256[]",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getVendorAnimalsByStatus",
		inputs: [
			{
				name: "_vendorAddress",
				type: "address",
				internalType: "address",
			},
			{
				name: "_status",
				type: "uint8",
				internalType: "enum Qurban.AnimalStatus",
			},
		],
		outputs: [
			{
				name: "",
				type: "uint256[]",
				internalType: "uint256[]",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getVendorAnimalsCount",
		inputs: [
			{
				name: "_vendorAddress",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getVendorInfo",
		inputs: [
			{
				name: "_vendorAddress",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [
			{
				name: "",
				type: "tuple",
				internalType: "struct Qurban.Vendor",
				components: [
					{
						name: "id",
						type: "uint256",
						internalType: "uint256",
					},
					{
						name: "walletAddress",
						type: "address",
						internalType: "address",
					},
					{
						name: "name",
						type: "string",
						internalType: "string",
					},
					{
						name: "contactInfo",
						type: "string",
						internalType: "string",
					},
					{
						name: "location",
						type: "string",
						internalType: "string",
					},
					{
						name: "isVerified",
						type: "bool",
						internalType: "bool",
					},
					{
						name: "totalSales",
						type: "uint256",
						internalType: "uint256",
					},
					{
						name: "registeredAt",
						type: "uint256",
						internalType: "uint256",
					},
				],
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "grantRole",
		inputs: [
			{
				name: "role",
				type: "bytes32",
				internalType: "bytes32",
			},
			{
				name: "account",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "hasRole",
		inputs: [
			{
				name: "role",
				type: "bytes32",
				internalType: "bytes32",
			},
			{
				name: "account",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [
			{
				name: "",
				type: "bool",
				internalType: "bool",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "i_qurbanNFT",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "address",
				internalType: "contract IQurbanNFT",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "i_treasury",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "address",
				internalType: "contract IQrbnTreasury",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "i_usdc",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "address",
				internalType: "contract IERC20",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "isVendorRegistered",
		inputs: [
			{
				name: "_vendorAddress",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [
			{
				name: "",
				type: "bool",
				internalType: "bool",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "markAnimalSacrificedAndMintCertificates",
		inputs: [
			{
				name: "_animalId",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "_certificateURI",
				type: "string",
				internalType: "string",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "purchaseAnimalShares",
		inputs: [
			{
				name: "_animalId",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "_shareAmount",
				type: "uint8",
				internalType: "uint8",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "refundAnimalPurchases",
		inputs: [
			{
				name: "_animalId",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "_reason",
				type: "string",
				internalType: "string",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "registerVendor",
		inputs: [
			{
				name: "_vendorAddress",
				type: "address",
				internalType: "address",
			},
			{
				name: "_name",
				type: "string",
				internalType: "string",
			},
			{
				name: "_contactInfo",
				type: "string",
				internalType: "string",
			},
			{
				name: "_location",
				type: "string",
				internalType: "string",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "renounceRole",
		inputs: [
			{
				name: "role",
				type: "bytes32",
				internalType: "bytes32",
			},
			{
				name: "callerConfirmation",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "revokeRole",
		inputs: [
			{
				name: "role",
				type: "bytes32",
				internalType: "bytes32",
			},
			{
				name: "account",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "s_animalBuyerTransactionIds",
		inputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "",
				type: "address",
				internalType: "address",
			},
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "s_animalBuyers",
		inputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [
			{
				name: "",
				type: "address",
				internalType: "address",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "s_animals",
		inputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [
			{
				name: "id",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "name",
				type: "string",
				internalType: "string",
			},
			{
				name: "animalType",
				type: "uint8",
				internalType: "enum Qurban.AnimalType",
			},
			{
				name: "totalShares",
				type: "uint8",
				internalType: "uint8",
			},
			{
				name: "availableShares",
				type: "uint8",
				internalType: "uint8",
			},
			{
				name: "pricePerShare",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "location",
				type: "string",
				internalType: "string",
			},
			{
				name: "image",
				type: "string",
				internalType: "string",
			},
			{
				name: "description",
				type: "string",
				internalType: "string",
			},
			{
				name: "breed",
				type: "string",
				internalType: "string",
			},
			{
				name: "weight",
				type: "uint16",
				internalType: "uint16",
			},
			{
				name: "age",
				type: "uint16",
				internalType: "uint16",
			},
			{
				name: "farmName",
				type: "string",
				internalType: "string",
			},
			{
				name: "sacrificeDate",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "status",
				type: "uint8",
				internalType: "enum Qurban.AnimalStatus",
			},
			{
				name: "vendorAddress",
				type: "address",
				internalType: "address",
			},
			{
				name: "createdAt",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "s_buyerTransactionIds",
		inputs: [
			{
				name: "",
				type: "address",
				internalType: "address",
			},
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "s_buyerTransactions",
		inputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [
			{
				name: "id",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "animalId",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "nftCertificateId",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "pricePerShare",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "totalPaid",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "fee",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "vendorShare",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "timestamp",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "shareAmount",
				type: "uint8",
				internalType: "uint8",
			},
			{
				name: "buyer",
				type: "address",
				internalType: "address",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "s_maxShares",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "uint8",
				internalType: "uint8",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "s_platformFeeBps",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "s_registeredVendors",
		inputs: [
			{
				name: "",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [
			{
				name: "",
				type: "bool",
				internalType: "bool",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "s_totalCollectedFees",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "s_totalCollectedFunds",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "s_vendorAnimalIds",
		inputs: [
			{
				name: "",
				type: "address",
				internalType: "address",
			},
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "s_vendorSharesPool",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "s_vendors",
		inputs: [
			{
				name: "",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [
			{
				name: "id",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "walletAddress",
				type: "address",
				internalType: "address",
			},
			{
				name: "name",
				type: "string",
				internalType: "string",
			},
			{
				name: "contactInfo",
				type: "string",
				internalType: "string",
			},
			{
				name: "location",
				type: "string",
				internalType: "string",
			},
			{
				name: "isVerified",
				type: "bool",
				internalType: "bool",
			},
			{
				name: "totalSales",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "registeredAt",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "setPlatformFee",
		inputs: [
			{
				name: "_newFeeBps",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "supportsInterface",
		inputs: [
			{
				name: "interfaceId",
				type: "bytes4",
				internalType: "bytes4",
			},
		],
		outputs: [
			{
				name: "",
				type: "bool",
				internalType: "bool",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "unapproveAnimal",
		inputs: [
			{
				name: "_animalId",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "unverifyVendor",
		inputs: [
			{
				name: "_vendorAddress",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "verifyVendor",
		inputs: [
			{
				name: "_vendorAddress",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "event",
		name: "AnimalAdded",
		inputs: [
			{
				name: "animalId",
				type: "uint256",
				indexed: true,
				internalType: "uint256",
			},
			{
				name: "vendorAddress",
				type: "address",
				indexed: false,
				internalType: "address",
			},
			{
				name: "animalName",
				type: "string",
				indexed: false,
				internalType: "string",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "AnimalPurchased",
		inputs: [
			{
				name: "buyer",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "animalId",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
			{
				name: "transactionId",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "AnimalRefunded",
		inputs: [
			{
				name: "animalId",
				type: "uint256",
				indexed: true,
				internalType: "uint256",
			},
			{
				name: "totalRefunded",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
			{
				name: "reason",
				type: "string",
				indexed: false,
				internalType: "string",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "AnimalSacrificed",
		inputs: [
			{
				name: "animalId",
				type: "uint256",
				indexed: true,
				internalType: "uint256",
			},
			{
				name: "sacrificeTimestamp",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "AnimalStatusUpdated",
		inputs: [
			{
				name: "animalId",
				type: "uint256",
				indexed: true,
				internalType: "uint256",
			},
			{
				name: "animalStatus",
				type: "uint8",
				indexed: false,
				internalType: "enum Qurban.AnimalStatus",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "AnimalUpdated",
		inputs: [
			{
				name: "animalId",
				type: "uint256",
				indexed: true,
				internalType: "uint256",
			},
			{
				name: "vendorAddress",
				type: "address",
				indexed: false,
				internalType: "address",
			},
			{
				name: "animalName",
				type: "string",
				indexed: false,
				internalType: "string",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "BuyerRefunded",
		inputs: [
			{
				name: "buyer",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "animalId",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
			{
				name: "amount",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
			{
				name: "reason",
				type: "string",
				indexed: false,
				internalType: "string",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "FeesDeposited",
		inputs: [
			{
				name: "treasury",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "amount",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "NFTCertificatesMinted",
		inputs: [
			{
				name: "animalId",
				type: "uint256",
				indexed: true,
				internalType: "uint256",
			},
			{
				name: "totalCertificates",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "PlatformFeeUpdated",
		inputs: [
			{
				name: "oldFeeBps",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
			{
				name: "newFeeBps",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "RoleAdminChanged",
		inputs: [
			{
				name: "role",
				type: "bytes32",
				indexed: true,
				internalType: "bytes32",
			},
			{
				name: "previousAdminRole",
				type: "bytes32",
				indexed: true,
				internalType: "bytes32",
			},
			{
				name: "newAdminRole",
				type: "bytes32",
				indexed: true,
				internalType: "bytes32",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "RoleGranted",
		inputs: [
			{
				name: "role",
				type: "bytes32",
				indexed: true,
				internalType: "bytes32",
			},
			{
				name: "account",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "sender",
				type: "address",
				indexed: true,
				internalType: "address",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "RoleRevoked",
		inputs: [
			{
				name: "role",
				type: "bytes32",
				indexed: true,
				internalType: "bytes32",
			},
			{
				name: "account",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "sender",
				type: "address",
				indexed: true,
				internalType: "address",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "TreasuryUpdated",
		inputs: [
			{
				name: "oldTreasury",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "newTreasury",
				type: "address",
				indexed: true,
				internalType: "address",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "VendorEdited",
		inputs: [
			{
				name: "vendorAddress",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "vendorId",
				type: "uint256",
				indexed: true,
				internalType: "uint256",
			},
			{
				name: "vendorName",
				type: "string",
				indexed: false,
				internalType: "string",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "VendorRegistered",
		inputs: [
			{
				name: "vendorAddress",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "vendorId",
				type: "uint256",
				indexed: true,
				internalType: "uint256",
			},
			{
				name: "vendorName",
				type: "string",
				indexed: false,
				internalType: "string",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "VendorShareDistributed",
		inputs: [
			{
				name: "vendor",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "animalId",
				type: "uint256",
				indexed: true,
				internalType: "uint256",
			},
			{
				name: "amount",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "VendorVerifyUpdated",
		inputs: [
			{
				name: "vendorAddress",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "vendorId",
				type: "uint256",
				indexed: true,
				internalType: "uint256",
			},
			{
				name: "isVerified",
				type: "bool",
				indexed: false,
				internalType: "bool",
			},
		],
		anonymous: false,
	},
	{
		type: "error",
		name: "AccessControlBadConfirmation",
		inputs: [],
	},
	{
		type: "error",
		name: "AccessControlUnauthorizedAccount",
		inputs: [
			{
				name: "account",
				type: "address",
				internalType: "address",
			},
			{
				name: "neededRole",
				type: "bytes32",
				internalType: "bytes32",
			},
		],
	},
	{
		type: "error",
		name: "AddressZero",
		inputs: [
			{
				name: "entity",
				type: "string",
				internalType: "string",
			},
		],
	},
	{
		type: "error",
		name: "AlreadyAvailable",
		inputs: [
			{
				name: "entity",
				type: "string",
				internalType: "string",
			},
		],
	},
	{
		type: "error",
		name: "AlreadyPending",
		inputs: [
			{
				name: "entity",
				type: "string",
				internalType: "string",
			},
		],
	},
	{
		type: "error",
		name: "AlreadyPurchased",
		inputs: [
			{
				name: "entity",
				type: "string",
				internalType: "string",
			},
		],
	},
	{
		type: "error",
		name: "AlreadyRegistered",
		inputs: [
			{
				name: "entity",
				type: "string",
				internalType: "string",
			},
		],
	},
	{
		type: "error",
		name: "AlreadyUnverified",
		inputs: [
			{
				name: "entity",
				type: "string",
				internalType: "string",
			},
		],
	},
	{
		type: "error",
		name: "AlreadyVerified",
		inputs: [
			{
				name: "entity",
				type: "string",
				internalType: "string",
			},
		],
	},
	{
		type: "error",
		name: "EmptyString",
		inputs: [
			{
				name: "field",
				type: "string",
				internalType: "string",
			},
		],
	},
	{
		type: "error",
		name: "Forbidden",
		inputs: [
			{
				name: "field",
				type: "string",
				internalType: "string",
			},
		],
	},
	{
		type: "error",
		name: "InsufficientBalance",
		inputs: [
			{
				name: "token",
				type: "address",
				internalType: "address",
			},
			{
				name: "available",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "requested",
				type: "uint256",
				internalType: "uint256",
			},
		],
	},
	{
		type: "error",
		name: "InvalidAmount",
		inputs: [
			{
				name: "field",
				type: "string",
				internalType: "string",
			},
		],
	},
	{
		type: "error",
		name: "InvalidDate",
		inputs: [
			{
				name: "field",
				type: "string",
				internalType: "string",
			},
		],
	},
	{
		type: "error",
		name: "NotAvailable",
		inputs: [
			{
				name: "entity",
				type: "string",
				internalType: "string",
			},
		],
	},
	{
		type: "error",
		name: "NotRegistered",
		inputs: [
			{
				name: "entity",
				type: "string",
				internalType: "string",
			},
		],
	},
	{
		type: "error",
		name: "NotVerified",
		inputs: [
			{
				name: "entity",
				type: "string",
				internalType: "string",
			},
		],
	},
];
