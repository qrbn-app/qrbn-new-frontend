import { PublicClient, WalletClient } from "viem";
import { CONTRACT_ADDRESSES, QRBN_TOKEN_ABI, QRBN_GOV_ABI, QURBAN_NFT_ABI, ZAKAT_NFT_ABI, USDT_ABI } from "./contracts";
import { ZAKAT_ABI } from "./abi/zakat";
import { QURBAN_ABI } from "./abi/qurban";
import { waitForTransactionReceipt } from "viem/actions";

export class ContractService {
	constructor(private publicClient: PublicClient, private walletClient?: WalletClient) {}

	// QrbnToken methods
	async getQrbnBalance(address: `0x${string}`) {
		try {
			const balance = await this.publicClient.readContract({
				address: CONTRACT_ADDRESSES.QrbnToken,
				abi: QRBN_TOKEN_ABI,
				functionName: "balanceOf",
				args: [address],
			});
			console.log(balance);
			return balance;
		} catch (error) {
			console.error("Error getting QRBN balance:", error);
			return BigInt(0);
		}
	}

	async getQrbnTokenInfo() {
		try {
			const [name, symbol, decimals, totalSupply] = await Promise.all([
				this.publicClient.readContract({
					address: CONTRACT_ADDRESSES.QrbnToken,
					abi: QRBN_TOKEN_ABI,
					functionName: "name",
				}),
				this.publicClient.readContract({
					address: CONTRACT_ADDRESSES.QrbnToken,
					abi: QRBN_TOKEN_ABI,
					functionName: "symbol",
				}),
				this.publicClient.readContract({
					address: CONTRACT_ADDRESSES.QrbnToken,
					abi: QRBN_TOKEN_ABI,
					functionName: "decimals",
				}),
				this.publicClient.readContract({
					address: CONTRACT_ADDRESSES.QrbnToken,
					abi: QRBN_TOKEN_ABI,
					functionName: "totalSupply",
				}),
			]);

			return { name, symbol, decimals, totalSupply };
		} catch (error) {
			console.error("Error getting token info:", error);
			return null;
		}
	}

	// QrbnGov methods
	async getProposalCount() {
		try {
			const count = await this.publicClient.readContract({
				address: CONTRACT_ADDRESSES.QrbnGov,
				abi: QRBN_GOV_ABI,
				functionName: "proposalCount",
			});
			return count;
		} catch (error) {
			console.error("Error getting proposal count:", error);
			return BigInt(0);
		}
	}

	async getProposalState(proposalId: bigint) {
		try {
			const state = await this.publicClient.readContract({
				address: CONTRACT_ADDRESSES.QrbnGov,
				abi: QRBN_GOV_ABI,
				functionName: "state",
				args: [proposalId],
			});
			return state;
		} catch (error) {
			console.error("Error getting proposal state:", error);
			return null;
		}
	}

	// QurbanNFT methods
	async getQurbanNFTBalance(address: `0x${string}`) {
		try {
			const balance = await this.publicClient.readContract({
				address: CONTRACT_ADDRESSES.QurbanNFT,
				abi: QURBAN_NFT_ABI,
				functionName: "balanceOf",
				args: [address],
			});
			return balance;
		} catch (error) {
			console.error("Error getting Qurban NFT balance:", error);
			return BigInt(0);
		}
	}

	// Qurban contract methods
	async getQurbanAnimals() {
		try {
			const totalAnimals = (await this.publicClient.readContract({
				address: CONTRACT_ADDRESSES.Qurban,
				abi: QURBAN_ABI,
				functionName: "getTotalAnimalsCount",
			})) as BigInt;

			const animals = {
				sheeps: [] as Animal[],
				cows: [] as Animal[],
				goats: [] as Animal[],
				camels: [] as Animal[],
			};

			await Promise.all(
				Array.from({ length: Number(totalAnimals) }).map(async (_, idx) => {
					const animal = (await this.publicClient.readContract({
						address: CONTRACT_ADDRESSES.Qurban,
						abi: QURBAN_ABI,
						functionName: "getAnimalById",
						args: [BigInt(idx)],
					})) as Animal;

					if (animal.animalType === 0) {
						animals.sheeps.push(animal);
					}
					if (animal.animalType === 1) {
						animals.cows.push(animal);
					}
					if (animal.animalType === 2) {
						animals.goats.push(animal);
					}
					if (animal.animalType === 3) {
						animals.camels.push(animal);
					}
				})
			);

			return animals;
		} catch (error) {
			console.error("Error getting active animals:", error);
			return null;
		}
	}

	async getCurrentQurbanPool() {
		try {
			const pool = await this.publicClient.readContract({
				address: CONTRACT_ADDRESSES.Qurban,
				abi: QURBAN_ABI,
				functionName: "getCurrentQurbanPool",
			});
			return pool;
		} catch (error) {
			console.error("Error getting current Qurban pool:", error);
			return BigInt(0);
		}
	}

	async getUserContributions(address: `0x${string}`) {
		try {
			const contributions = (await this.publicClient.readContract({
				address: CONTRACT_ADDRESSES.Qurban,
				abi: QURBAN_ABI,
				functionName: "getBuyerTransactionsCount",
				args: [address],
			})) as bigint;
			return contributions;
		} catch (error) {
			console.error("Error getting user contributions:", error);
			return BigInt(0);
		}
	}

	// Zakat contract methods - Updated to match actual ABI
	async getZakatPoolInfo() {
		try {
			const [totalCollected, totalDistributed, availableBalance] = await Promise.all([
				this.publicClient.readContract({
					address: CONTRACT_ADDRESSES.Zakat,
					abi: ZAKAT_ABI,
					functionName: "s_totalCollectedZakat",
				}),
				this.publicClient.readContract({
					address: CONTRACT_ADDRESSES.Zakat,
					abi: ZAKAT_ABI,
					functionName: "s_totalDistributedZakat",
				}),
				this.publicClient.readContract({
					address: CONTRACT_ADDRESSES.Zakat,
					abi: ZAKAT_ABI,
					functionName: "s_availableZakatBalance",
				})
			]);

			return {
				totalCollected: this.formatTokenAmount(totalCollected as bigint, 6),
				totalDistributed: this.formatTokenAmount(totalDistributed as bigint, 6),
				availableBalance: this.formatTokenAmount(availableBalance as bigint, 6)
			};
		} catch (error) {
			console.error("Error getting Zakat pool info:", error);
			throw error;
		}
	}

	async getUserZakatDonations(address: `0x${string}`) {
		try {
			const donationIds = await this.publicClient.readContract({
				address: CONTRACT_ADDRESSES.Zakat,
				abi: ZAKAT_ABI,
				functionName: "getDonorDonations",
				args: [address],
			});
			return donationIds;
		} catch (error) {
			console.error("Error getting user Zakat donations:", error);
			return [];
		}
	}

	async getZakatDonationInfo(donationId: bigint) {
		try {
			const donationInfo = await this.publicClient.readContract({
				address: CONTRACT_ADDRESSES.Zakat,
				abi: ZAKAT_ABI,
				functionName: "getDonationInfo",
				args: [donationId],
			});
			return donationInfo;
		} catch (error) {
			console.error("Error getting Zakat donation info:", error);
			throw error;
		}
	}

	async getZakatOrganizations() {
		try {
			// Get total counts to determine how many organizations exist
			const [totalDonations, totalDistributions, totalOrganizations] = await this.publicClient.readContract({
				address: CONTRACT_ADDRESSES.Zakat,
				abi: ZAKAT_ABI,
				functionName: "getTotalCounts",
			}) as [bigint, bigint, bigint];

			return {
				totalDonations: Number(totalDonations),
				totalDistributions: Number(totalDistributions),
				totalOrganizations: Number(totalOrganizations)
			};
		} catch (error) {
			console.error("Error getting total counts:", error);
			throw error;
		}
	}

	async isOrganizationRegistered(organizationAddress: `0x${string}`) {
		try {
			const isRegistered = await this.publicClient.readContract({
				address: CONTRACT_ADDRESSES.Zakat,
				abi: ZAKAT_ABI,
				functionName: "isOrganizationRegistered",
				args: [organizationAddress],
			});
			return isRegistered;
		} catch (error) {
			console.error("Error checking organization registration:", error);
			return false;
		}
	}

	async getOrganizationInfo(organizationAddress: `0x${string}`) {
		try {
			const orgInfo = await this.publicClient.readContract({
				address: CONTRACT_ADDRESSES.Zakat,
				abi: ZAKAT_ABI,
				functionName: "getOrganizationInfo",
				args: [organizationAddress],
			});
			return orgInfo;
		} catch (error) {
			console.error("Error getting organization info:", error);
			throw error;
		}
	}

	// ZakatNFT methods
	async getZakatNFTBalance(address: `0x${string}`) {
		try {
			const balance = await this.publicClient.readContract({
				address: CONTRACT_ADDRESSES.ZakatNFT,
				abi: ZAKAT_NFT_ABI,
				functionName: "balanceOf",
				args: [address],
			});
			return balance;
		} catch (error) {
			console.error("Error getting Zakat NFT balance:", error);
			return BigInt(0);
		}
	}

	// Utility methods
	formatTokenAmount(amount: bigint, decimals: number = 18) {
		const divisor = BigInt(10 ** decimals);
		const whole = amount / divisor;
		const fraction = amount % divisor;

		if (fraction === BigInt(0)) {
			return whole.toString();
		}

		const fractionStr = fraction.toString().padStart(decimals, "0");
		const trimmed = fractionStr.replace(/0+$/, "");

		return trimmed ? `${whole}.${trimmed}` : whole.toString();
	}

	// Helper function to safely convert amount to Wei (avoiding floating point precision issues)
	private toUSDTWei(amount: number): bigint {
		// Convert to string with fixed decimals to avoid floating point issues
		const amountStr = amount.toFixed(6);
		const [whole, decimals = ""] = amountStr.split(".");
		const paddedDecimals = decimals.padEnd(6, "0");
		const totalStr = whole + paddedDecimals;
		return BigInt(totalStr);
	}

	// USDT methods
	async getUSDTBalance(address: `0x${string}`) {
		try {
			console.log("Fetching USDT balance for address:", address);
			const balance = await this.publicClient.readContract({
				address: CONTRACT_ADDRESSES.USDT,
				abi: USDT_ABI,
				functionName: "balanceOf",
				args: [address],
			});
			console.log("USDT balance fetched:", balance);
			return balance;
		} catch (error) {
			console.error("Error getting USDT balance:", error);
			return BigInt(0);
		}
	}

	async approveUSDT(spender: `0x${string}`, amount: number): Promise<`0x${string}`> {
		if (!this.walletClient) throw new Error("Wallet not connected");
		
		// Use helper function to safely convert to Wei
		const amountInWei = this.toUSDTWei(amount);

		const hash = await this.walletClient.writeContract({
			address: CONTRACT_ADDRESSES.USDT,
			abi: USDT_ABI,
			functionName: "approve",
			args: [spender, amountInWei],
			account: this.walletClient.account!,
			chain: this.walletClient.chain,
		});

		await waitForTransactionReceipt(this.publicClient, { hash });
		return hash;
	}	async getUSDTAllowance(owner: `0x${string}`, spender: `0x${string}`) {
		try {
			const allowance = await this.publicClient.readContract({
				address: CONTRACT_ADDRESSES.USDT,
				abi: USDT_ABI,
				functionName: "allowance",
				args: [owner, spender],
			});
			return allowance;
		} catch (error) {
			console.error("Error getting USDT allowance:", error);
			return BigInt(0);
		}
	}

	// Payment methods
	async purchaseAnimalShares(animalId: bigint, shares: bigint, pricePerShare: bigint) {
		if (!this.walletClient) throw new Error("Wallet not connected");

		try {
			// First check and approve USDT if needed
			const account = this.walletClient.account;
			if (!account) throw new Error("No account found");

			const allowance = await this.getUSDTAllowance(account.address, CONTRACT_ADDRESSES.Qurban);
			const totalCost = shares * pricePerShare;
			if (allowance < totalCost) {
				// Need to approve first
				const hash = await this.approveUSDT(CONTRACT_ADDRESSES.Qurban, Number(totalCost) / 10 ** 6);
				await waitForTransactionReceipt(this.publicClient, { hash });
			}

			const hash = await this.walletClient.writeContract({
				address: CONTRACT_ADDRESSES.Qurban,
				abi: QURBAN_ABI,
				functionName: "purchaseAnimalShares",
				args: [animalId, shares],
				account,
				chain: this.walletClient.chain,
			});
			return hash;
		} catch (error) {
			console.error("Error contributing to Qurban:", error);
			throw error;
		}
	}

	async donateZakat(
		amount: number, 
		zakatType: "maal" | "fitrah", 
		tipAmount: number = 0, 
		donorMessage: string = ""
	): Promise<`0x${string}`> {
		if (!this.walletClient) throw new Error("Wallet not connected");
		
		const account = this.walletClient.account!;
		// Use helper function to safely convert to Wei
		const amountInWei = this.toUSDTWei(amount);
		const tipAmountInWei = this.toUSDTWei(tipAmount);
		const zakatTypeEnum = zakatType === "maal" ? 0 : 1; // 0 = MAAL, 1 = FITRAH
		const totalAmount = amount + tipAmount;

		// Check USDT balance first
		const balance = await this.getUSDTBalance(account.address);
		const balanceNumber = Number(balance) / 10 ** 6;
		if (balanceNumber < totalAmount) {
			throw new Error("Insufficient USDT balance");
		}

		// Check current allowance
		const currentAllowance = await this.getUSDTAllowance(account.address, CONTRACT_ADDRESSES.Zakat);
		const allowanceNumber = Number(currentAllowance) / 10 ** 6;

		// Approve if needed
		if (allowanceNumber < totalAmount) {
			await this.approveUSDT(CONTRACT_ADDRESSES.Zakat, totalAmount);
		}

		// Proceed with donation
		const hash = await this.walletClient.writeContract({
			address: CONTRACT_ADDRESSES.Zakat,
			abi: ZAKAT_ABI,
			functionName: "donateZakat",
			args: [amountInWei, tipAmountInWei, zakatTypeEnum, donorMessage],
			account,
			chain: this.walletClient.chain,
		});

		await waitForTransactionReceipt(this.publicClient, { hash });
		return hash;
	}	// Organization registration methods
	async registerZakatOrganization(
		organizationAddress: `0x${string}`,
		name: string,
		contactInfo: string,
		location: string,
		description: string,
		registrationNumber: string
	) {
		if (!this.walletClient) throw new Error("Wallet not connected");

		try {
			const hash = await this.walletClient.writeContract({
				address: CONTRACT_ADDRESSES.Zakat,
				abi: ZAKAT_ABI,
				functionName: "registerZakatOrganization",
				args: [organizationAddress, name, contactInfo, location, description, registrationNumber],
				account: this.walletClient.account!,
				chain: this.walletClient.chain,
			});
			return hash;
		} catch (error) {
			console.error("Error registering Zakat organization:", error);
			throw error;
		}
	}

	// Distribution methods
	async proposeDistribution(
		organizationAddress: `0x${string}`,
		requestedAmount: bigint,
		beneficiaryCount: bigint,
		distributionType: number, // 0 = EMERGENCY, 1 = REGULAR, 2 = SEASONAL
		title: string,
		description: string,
		location: string
	) {
		if (!this.walletClient) throw new Error("Wallet not connected");

		try {
			const hash = await this.walletClient.writeContract({
				address: CONTRACT_ADDRESSES.Zakat,
				abi: ZAKAT_ABI,
				functionName: "proposeDistribution",
				args: [organizationAddress, requestedAmount, beneficiaryCount, distributionType, title, description, location],
				account: this.walletClient.account!,
				chain: this.walletClient.chain,
			});
			return hash;
		} catch (error) {
			console.error("Error proposing distribution:", error);
			throw error;
		}
	}

	async getDistributionInfo(distributionId: bigint) {
		try {
			const distributionInfo = await this.publicClient.readContract({
				address: CONTRACT_ADDRESSES.Zakat,
				abi: ZAKAT_ABI,
				functionName: "getDistributionInfo",
				args: [distributionId],
			});
			return distributionInfo;
		} catch (error) {
			console.error("Error getting distribution info:", error);
			throw error;
		}
	}

	async getDistributionsByStatus(status: number) {
		try {
			const distributions = await this.publicClient.readContract({
				address: CONTRACT_ADDRESSES.Zakat,
				abi: ZAKAT_ABI,
				functionName: "getDistributionsByStatus",
				args: [status],
			});
			return distributions;
		} catch (error) {
			console.error("Error getting distributions by status:", error);
			return [];
		}
	}

	// Check if user meets DAO representative requirements
	async checkDAORequirements(address: `0x${string}`, type: "community" | "organizational" | "sharia") {
		const [qrbnBalance, nftBalance, contributions] = await Promise.all([
			this.getQrbnBalance(address),
			this.getQurbanNFTBalance(address),
			this.getUserContributions(address),
		]);

		const requirements = {
			community: {
				minQrbnTokens: BigInt(1000 * 10 ** 18), // 1000 QRBN
				hasQurbanContribution: contributions > BigInt(0),
				hasNFT: nftBalance > BigInt(0),
			},
			organizational: {
				minQrbnTokens: BigInt(5000 * 10 ** 18), // 5000 QRBN
				hasQurbanContribution: contributions > BigInt(0),
				hasNFT: nftBalance > BigInt(0),
			},
			sharia: {
				minQrbnTokens: BigInt(0), // No token requirement for Sharia council
				hasQurbanContribution: true, // Assumed verified externally
				hasNFT: true, // Assumed verified externally
			},
		};

		const typeReqs = requirements[type];

		return {
			meetsTokenRequirement: qrbnBalance >= typeReqs.minQrbnTokens,
			hasQurbanContribution: typeReqs.hasQurbanContribution,
			hasNFT: typeReqs.hasNFT,
			qrbnBalance: this.formatTokenAmount(qrbnBalance, 2),
			nftCount: nftBalance.toString(),
			contributionAmount: contributions,
		};
	}
}
