import { PublicClient, WalletClient } from "viem";
import { CONTRACT_ADDRESSES, QRBN_TOKEN_ABI, QRBN_GOV_ABI, QURBAN_NFT_ABI, ZAKAT_ABI, ZAKAT_NFT_ABI, USDT_ABI } from "./contracts";

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
					const [
						id,
						name,
						animalType,
						totalShares,
						availableShares,
						pricePerShare,
						location,
						image,
						description,
						breed,
						weight,
						age,
						farmName,
						sacrificeDate,
						status,
						vendorAddr,
						createdAt,
					] = (await this.publicClient.readContract({
						address: CONTRACT_ADDRESSES.Qurban,
						abi: QURBAN_ABI,
						functionName: "s_animals",
						args: [BigInt(idx)],
					})) as any[];

					const animal = {
						id,
						name,
						animalType,
						totalShares,
						availableShares,
						pricePerShare,
						location,
						image,
						description,
						breed,
						weight,
						age,
						farmName,
						sacrificeDate,
						status,
						vendorAddr,
						createdAt,
					};

					if (animalType === 0) {
						animals.sheeps.push(animal);
					}
					if (animalType === 1) {
						animals.cows.push(animal);
					}
					if (animalType === 2) {
						animals.goats.push(animal);
					}
					if (animalType === 3) {
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
			const contributions = await this.publicClient.readContract({
				address: CONTRACT_ADDRESSES.Qurban,
				abi: QURBAN_ABI,
				functionName: "getUserContributions",
				args: [address],
			});
			return contributions;
		} catch (error) {
			console.error("Error getting user contributions:", error);
			return BigInt(0);
		}
	}

	// Zakat contract methods
	async getCurrentZakatPool() {
		try {
			const pool = await this.publicClient.readContract({
				address: CONTRACT_ADDRESSES.Zakat,
				abi: ZAKAT_ABI,
				functionName: "getCurrentZakatPool",
			});
			return pool;
		} catch (error) {
			console.error("Error getting current Zakat pool:", error);
			return BigInt(0);
		}
	}

	async getUserZakatContributions(address: `0x${string}`) {
		try {
			const contributions = await this.publicClient.readContract({
				address: CONTRACT_ADDRESSES.Zakat,
				abi: ZAKAT_ABI,
				functionName: "getUserZakatContributions",
				args: [address],
			});
			return contributions;
		} catch (error) {
			console.error("Error getting user Zakat contributions:", error);
			return BigInt(0);
		}
	}

	async getNisabThreshold() {
		try {
			const threshold = await this.publicClient.readContract({
				address: CONTRACT_ADDRESSES.Zakat,
				abi: ZAKAT_ABI,
				functionName: "nisabThreshold",
			});
			return threshold;
		} catch (error) {
			console.error("Error getting nisab threshold:", error);
			return BigInt(0);
		}
	}

	async getZakatRate() {
		try {
			const rate = await this.publicClient.readContract({
				address: CONTRACT_ADDRESSES.Zakat,
				abi: ZAKAT_ABI,
				functionName: "zakatRate",
			});
			return rate;
		} catch (error) {
			console.error("Error getting Zakat rate:", error);
			return BigInt(250); // Default 2.5% (250 out of 10000)
		}
	}

	async getFitrahAmount() {
		try {
			const amount = await this.publicClient.readContract({
				address: CONTRACT_ADDRESSES.Zakat,
				abi: ZAKAT_ABI,
				functionName: "fitrahAmount",
			});
			return amount;
		} catch (error) {
			console.error("Error getting Fitrah amount:", error);
			return BigInt(0);
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

	// USDT methods
	async getUSDTBalance(address: `0x${string}`) {
		try {
			const balance = await this.publicClient.readContract({
				address: CONTRACT_ADDRESSES.USDT,
				abi: USDT_ABI,
				functionName: "balanceOf",
				args: [address],
			});
			return balance;
		} catch (error) {
			console.error("Error getting USDT balance:", error);
			return BigInt(0);
		}
	}

	async approveUSDT(spender: `0x${string}`, amount: bigint) {
		if (!this.walletClient) throw new Error("Wallet not connected");

		try {
			const account = this.walletClient.account;
			if (!account) throw new Error("No account found");

			const hash = await this.walletClient.writeContract({
				address: CONTRACT_ADDRESSES.USDT,
				abi: USDT_ABI,
				functionName: "approve",
				args: [spender, amount],
				account: account,
				chain: this.walletClient.chain,
			});
			return hash;
		} catch (error) {
			console.error("Error approving USDT:", error);
			throw error;
		}
	}

	async getUSDTAllowance(owner: `0x${string}`, spender: `0x${string}`) {
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
				const hash = await this.approveUSDT(CONTRACT_ADDRESSES.Qurban, totalCost);
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

	async donateZakat(amount: bigint, zakatType: "maal" | "fitrah") {
		if (!this.walletClient) throw new Error("Wallet not connected");

		try {
			// First check and approve USDT if needed
			const account = this.walletClient.account;
			if (!account) throw new Error("No account found");

			const allowance = await this.getUSDTAllowance(account.address, CONTRACT_ADDRESSES.Zakat);
			if (allowance < amount) {
				// Need to approve first
				await this.approveUSDT(CONTRACT_ADDRESSES.Zakat, amount);
			}

			// Map zakat type to number (0 = maal, 1 = fitrah)
			const zakatTypeNum = zakatType === "maal" ? 0 : 1;

			const hash = await this.walletClient.writeContract({
				address: CONTRACT_ADDRESSES.Zakat,
				abi: ZAKAT_ABI,
				functionName: "donateZakat",
				args: [amount, zakatTypeNum],
				account: account,
				chain: this.walletClient.chain,
			});
			return hash;
		} catch (error) {
			console.error("Error donating Zakat:", error);
			throw error;
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
			qrbnBalance: this.formatTokenAmount(qrbnBalance),
			nftCount: nftBalance.toString(),
			contributionAmount: this.formatTokenAmount(contributions),
		};
	}
}
