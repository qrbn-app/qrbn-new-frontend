"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Coins, Vote, Trophy, Building2, Loader2, RefreshCw, ExternalLink, Info } from "lucide-react";
import { useAccount } from "wagmi";
import { useContracts } from "@/hooks/use-contracts";
import { CONTRACT_ADDRESSES } from "@/lib/contracts";

interface ContractData {
	qrbnBalance: string;
	qrbnTokenInfo: {
		name: string;
		symbol: string;
		decimals: number;
		totalSupply: string;
	} | null;
	nftBalance: string;
	zakatNftBalance: string;
	qurbanPool: string;
	zakatPool: string;
	userContributions: string;
	userZakatContributions: string;
	proposalCount: string;
	nisabThreshold: string;
	zakatRate: string;
	fitrahAmount: string;
}

export function ContractDemo() {
	const { address, isConnected } = useAccount();
	const contracts = useContracts();
	const [contractData, setContractData] = useState<ContractData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (isConnected && address && contracts) {
			loadContractData();
		}
	}, [isConnected, address, contracts]);

	const loadContractData = async () => {
		if (!contracts || !address) return;

		setLoading(true);
		setError(null);

		try {
			const [
				qrbnBalance,
				tokenInfo,
				nftBalance,
				zakatNftBalance,
				qurbanPool,
				zakatPool,
				userContributions,
				userZakatContributions,
				proposalCount,
				nisabThreshold,
				zakatRate,
				fitrahAmount,
			] = await Promise.all([
				contracts.getQrbnBalance(address),
				contracts.getQrbnTokenInfo(),
				contracts.getQurbanNFTBalance(address),
				contracts.getZakatNFTBalance(address),
				contracts.getCurrentQurbanPool(),
				contracts.getCurrentZakatPool(),
				contracts.getUserContributions(address),
				contracts.getUserZakatContributions(address),
				contracts.getProposalCount(),
				contracts.getNisabThreshold(),
				contracts.getZakatRate(),
				contracts.getFitrahAmount(),
			]);

			setContractData({
				qrbnBalance: contracts.formatTokenAmount(qrbnBalance),
				qrbnTokenInfo: tokenInfo
					? {
							...tokenInfo,
							totalSupply: contracts.formatTokenAmount(tokenInfo.totalSupply),
					  }
					: null,
				nftBalance: nftBalance.toString(),
				zakatNftBalance: zakatNftBalance.toString(),
				qurbanPool: contracts.formatTokenAmount(qurbanPool),
				zakatPool: contracts.formatTokenAmount(zakatPool),
				userContributions: contracts.formatTokenAmount(userContributions),
				userZakatContributions: contracts.formatTokenAmount(userZakatContributions),
				proposalCount: proposalCount.toString(),
				nisabThreshold: contracts.formatTokenAmount(nisabThreshold),
				zakatRate: zakatRate.toString(),
				fitrahAmount: contracts.formatTokenAmount(fitrahAmount),
			});
		} catch (err) {
			console.error("Error loading contract data:", err);
			setError("Failed to load contract data. Please check your connection and try again.");
		} finally {
			setLoading(false);
		}
	};

	const openInBlockExplorer = (address: string) => {
		window.open(`https://sepolia-blockscout.lisk.com/address/${address}`, "_blank");
	};

	if (!isConnected) {
		return (
			<Card className="bg-[#0f2419] border-[#14532d]">
				<CardContent className="p-6">
					<Alert className="bg-[#14532d]/30 border-[#d1b86a]">
						<Info className="h-4 w-4" />
						<AlertDescription className="text-[#f0fdf4]">
							Please connect your wallet to view contract data and interact with the QRBN ecosystem.
						</AlertDescription>
					</Alert>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<Card className="bg-[#0f2419] border-[#14532d]">
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle className="text-[#f0fdf4] flex items-center gap-2">
							<Building2 className="h-5 w-5 text-[#d1b86a]" />
							Smart Contract Integration
						</CardTitle>
						<Button
							size="sm"
							variant="outline"
							onClick={loadContractData}
							disabled={loading}
							className="border-[#14532d] text-[#f0fdf4] hover:bg-[#14532d]/20"
						>
							{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<p className="text-[#f0fdf4]/70 text-sm">Live data from QRBN smart contracts deployed on Lisk Sepolia testnet.</p>
				</CardContent>
			</Card>

			{error && (
				<Alert className="bg-red-900/20 border-red-500/50">
					<AlertDescription className="text-red-200">{error}</AlertDescription>
				</Alert>
			)}

			{/* Contract Data */}
			{loading ? (
				<Card className="bg-[#0f2419] border-[#14532d]">
					<CardContent className="p-6">
						<div className="flex items-center justify-center py-8">
							<Loader2 className="h-6 w-6 animate-spin text-[#d1b86a]" />
							<span className="ml-2 text-[#f0fdf4]/70">Loading contract data...</span>
						</div>
					</CardContent>
				</Card>
			) : contractData ? (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* QRBN Token Data */}
					<Card className="bg-[#0f2419] border-[#14532d]">
						<CardHeader>
							<CardTitle className="text-[#f0fdf4] flex items-center gap-2">
								<Coins className="h-5 w-5 text-[#d1b86a]" />
								QRBN Token
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{contractData.qrbnTokenInfo && (
								<div className="space-y-3">
									<div className="flex justify-between">
										<span className="text-[#f0fdf4]/70">Name:</span>
										<span className="text-[#f0fdf4]">{contractData.qrbnTokenInfo.name}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-[#f0fdf4]/70">Symbol:</span>
										<span className="text-[#f0fdf4]">{contractData.qrbnTokenInfo.symbol}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-[#f0fdf4]/70">Total Supply:</span>
										<span className="text-[#d1b86a]">
											{(Number(contractData.qrbnTokenInfo.totalSupply) * Math.pow(10, 18)).toLocaleString()}
										</span>
									</div>
									<Separator className="bg-[#14532d]" />
									<div className="flex justify-between">
										<span className="text-[#f0fdf4]/70">Your Balance:</span>
										<span className="text-[#d1b86a] font-semibold">{contractData.qrbnBalance}</span>
									</div>
								</div>
							)}
							<Button
								size="sm"
								variant="outline"
								onClick={() => openInBlockExplorer(CONTRACT_ADDRESSES.QrbnToken)}
								className="w-full border-[#14532d] text-[#f0fdf4] hover:bg-[#14532d]/20"
							>
								<ExternalLink className="h-4 w-4 mr-2" />
								View Contract
							</Button>
						</CardContent>
					</Card>

					{/* Governance Data */}
					<Card className="bg-[#0f2419] border-[#14532d]">
						<CardHeader>
							<CardTitle className="text-[#f0fdf4] flex items-center gap-2">
								<Vote className="h-5 w-5 text-[#d1b86a]" />
								DAO Governance
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-3">
								<div className="flex justify-between">
									<span className="text-[#f0fdf4]/70">Active Proposals:</span>
									<Badge className="bg-[#14532d] text-[#d1b86a]">{contractData.proposalCount}</Badge>
								</div>
								<div className="flex justify-between">
									<span className="text-[#f0fdf4]/70">Voting Power:</span>
									<span className="text-[#d1b86a]">{contractData.qrbnBalance} QRBN</span>
								</div>
							</div>
							<Button
								size="sm"
								variant="outline"
								onClick={() => openInBlockExplorer(CONTRACT_ADDRESSES.QrbnGov)}
								className="w-full border-[#14532d] text-[#f0fdf4] hover:bg-[#14532d]/20"
							>
								<ExternalLink className="h-4 w-4 mr-2" />
								View Governor Contract
							</Button>
						</CardContent>
					</Card>

					{/* Qurban Pool Data */}
					<Card className="bg-[#0f2419] border-[#14532d]">
						<CardHeader>
							<CardTitle className="text-[#f0fdf4] flex items-center gap-2">
								<Trophy className="h-5 w-5 text-[#d1b86a]" />
								Qurban Pool
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-3">
								<div className="flex justify-between">
									<span className="text-[#f0fdf4]/70">Current Pool:</span>
									<span className="text-[#d1b86a]">{contractData.qurbanPool} USDT</span>
								</div>
								<div className="flex justify-between">
									<span className="text-[#f0fdf4]/70">Your Contributions:</span>
									<span className="text-[#d1b86a]">{contractData.userContributions} USDT</span>
								</div>
								<div className="flex justify-between">
									<span className="text-[#f0fdf4]/70">NFT Certificates:</span>
									<Badge className="bg-[#14532d] text-[#d1b86a]">{contractData.nftBalance}</Badge>
								</div>
							</div>
							<Button
								size="sm"
								variant="outline"
								onClick={() => openInBlockExplorer(CONTRACT_ADDRESSES.Qurban)}
								className="w-full border-[#14532d] text-[#f0fdf4] hover:bg-[#14532d]/20"
							>
								<ExternalLink className="h-4 w-4 mr-2" />
								View Qurban Contract
							</Button>
						</CardContent>
					</Card>

					{/* Zakat Pool Data */}
					<Card className="bg-[#0f2419] border-[#14532d]">
						<CardHeader>
							<CardTitle className="text-[#f0fdf4] flex items-center gap-2">
								<Coins className="h-5 w-5 text-[#d1b86a]" />
								Zakat Pool
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-3">
								<div className="flex justify-between">
									<span className="text-[#f0fdf4]/70">Current Pool:</span>
									<span className="text-[#d1b86a]">{contractData.zakatPool} USDT</span>
								</div>
								<div className="flex justify-between">
									<span className="text-[#f0fdf4]/70">Your Contributions:</span>
									<span className="text-[#d1b86a]">{contractData.userZakatContributions} USDT</span>
								</div>
								<div className="flex justify-between">
									<span className="text-[#f0fdf4]/70">Zakat NFT Certificates:</span>
									<Badge className="bg-[#14532d] text-[#d1b86a]">{contractData.zakatNftBalance}</Badge>
								</div>
								<div className="flex justify-between">
									<span className="text-[#f0fdf4]/70">Nisab Threshold:</span>
									<span className="text-[#d1b86a]">{contractData.nisabThreshold} USDT</span>
								</div>
								<div className="flex justify-between">
									<span className="text-[#f0fdf4]/70">Zakat Rate:</span>
									<span className="text-[#d1b86a]">{(parseInt(contractData.zakatRate) / 100).toFixed(1)}%</span>
								</div>
								<div className="flex justify-between">
									<span className="text-[#f0fdf4]/70">Fitrah Amount:</span>
									<span className="text-[#d1b86a]">{contractData.fitrahAmount} USDT</span>
								</div>
							</div>
							<Button
								size="sm"
								variant="outline"
								onClick={() => openInBlockExplorer(CONTRACT_ADDRESSES.Zakat)}
								className="w-full border-[#14532d] text-[#f0fdf4] hover:bg-[#14532d]/20"
							>
								<ExternalLink className="h-4 w-4 mr-2" />
								View Zakat Contract
							</Button>
						</CardContent>
					</Card>

					{/* Treasury Data */}
					<Card className="bg-[#0f2419] border-[#14532d]">
						<CardHeader>
							<CardTitle className="text-[#f0fdf4] flex items-center gap-2">
								<Building2 className="h-5 w-5 text-[#d1b86a]" />
								Treasury
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-3">
								<div className="text-sm text-[#f0fdf4]/70">
									The QRBN Treasury manages community funds and executes governance decisions.
								</div>
								<div className="flex justify-between">
									<span className="text-[#f0fdf4]/70">Contract Status:</span>
									<Badge className="bg-green-600 text-white">Active</Badge>
								</div>
							</div>
							<Button
								size="sm"
								variant="outline"
								onClick={() => openInBlockExplorer(CONTRACT_ADDRESSES.QrbnTreasury)}
								className="w-full border-[#14532d] text-[#f0fdf4] hover:bg-[#14532d]/20"
							>
								<ExternalLink className="h-4 w-4 mr-2" />
								View Treasury Contract
							</Button>
						</CardContent>
					</Card>
				</div>
			) : (
				<Card className="bg-[#0f2419] border-[#14532d]">
					<CardContent className="p-6">
						<div className="text-center py-8 text-[#f0fdf4]/70">No contract data available. Click refresh to load data.</div>
					</CardContent>
				</Card>
			)}

			{/* Contract Addresses */}
			<Card className="bg-[#0f2419] border-[#14532d]">
				<CardHeader>
					<CardTitle className="text-[#f0fdf4]">Contract Addresses (Lisk Sepolia)</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
						{Object.entries(CONTRACT_ADDRESSES).map(([name, address]) => (
							<div key={name} className="flex justify-between items-center p-2 bg-[#14532d]/30 rounded">
								<span className="text-[#f0fdf4]/70">{name}:</span>
								<div className="flex items-center gap-2">
									<code className="text-[#d1b86a] text-xs">
										{address.slice(0, 10)}...{address.slice(-8)}
									</code>
									<Button
										size="sm"
										variant="ghost"
										onClick={() => openInBlockExplorer(address)}
										className="h-6 w-6 p-0 text-[#f0fdf4] hover:text-[#d1b86a]"
									>
										<ExternalLink className="h-3 w-3" />
									</Button>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
