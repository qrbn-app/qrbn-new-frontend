"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, ArrowRight, CheckCircle, Clock, ExternalLink, Loader2 } from "lucide-react";
import { useContracts } from "@/hooks/use-contracts";
import { useAccount } from "wagmi";
import { parseUnits } from "viem";
import { displayTokenPrice } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useTokenBalance } from "@/hooks/use-token-balance";

interface PaymentModalProps {
	amount: bigint;
	type: "zakat-maal" | "zakat-fitrah" | "qurban";
	title: string;
	animalId?: bigint;
	children: React.ReactNode;
}

export function PaymentModal({ amount, type, animalId, title, children }: PaymentModalProps) {
	const [selectedToken, setSelectedToken] = useState("usdt");
	const [paymentStep, setPaymentStep] = useState<"select" | "confirm" | "processing" | "success">("select");
	const [txHash, setTxHash] = useState("");
	const [processingMessage, setProcessingMessage] = useState("Processing transaction...");
	
	// Tip states
	const [includeTip, setIncludeTip] = useState(true); // Default checked (2.5%)
	const [tipType, setTipType] = useState<"percentage" | "custom">("percentage");
	const [tipPercentage, setTipPercentage] = useState(2.5); // Default 2.5%
	const [customTipAmount, setCustomTipAmount] = useState("");
	
	const { balance, displayBalance } = useTokenBalance();
	const { toast } = useToast();
	const router = useRouter();
	const contracts = useContracts();
	const { address, isConnected } = useAccount();

	const tokens = {
		usdt: { name: "USDT", balance: balance, icon: "💰" },
	};

	// Calculate tip amount (only for zakat)
	const calculateTipAmount = () => {
		if (!includeTip || type === "qurban") return 0;
		
		if (tipType === "percentage") {
			const baseAmount = Number(amount) / 10 ** 6; // Convert from wei to USDT
			return (baseAmount * tipPercentage) / 100;
		} else {
			return parseFloat(customTipAmount) || 0;
		}
	};

	const tipAmount = calculateTipAmount();
	const totalAmount = Number(amount) / 10 ** 6 + tipAmount;

	const onContinuePayment = () => {
		const requiredBalance = parseUnits(totalAmount.toString(), 6);
		if (balance < requiredBalance) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "You don't have enough balance for the total amount including tip",
			});
			return;
		}
		setPaymentStep("confirm");
	};

	const processPayment = async () => {
		if (!contracts || !address || !isConnected) {
			console.error("Wallet not connected or contracts not available");
			toast({
				variant: "destructive",
				title: "Error",
				description: "Wallet not connected or contracts not available",
			});
			return;
		}

		setPaymentStep("processing");
		setProcessingMessage("Checking USDT allowance...");

		try {
			// Amount is already in wei format from parent components
			// - Qurban: selectedAnimalData.pricePerShare (already BigInt wei)
			// - Zakat: BigInt(Math.floor(calculatedZakat * 1000000)) (already BigInt wei)
			const amountInWei = amount;

			console.log("PaymentModal - Processing payment:");
			console.log("- Type:", type);
			console.log("- Amount (wei):", amountInWei.toString());
			console.log("- Amount (USDT):", Number(amountInWei) / 1000000);

			let hash: `0x${string}`;

			if (type === "qurban") {
				setProcessingMessage("Processing Qurban purchase...");
				hash = await contracts.purchaseAnimalShares(animalId!, BigInt(1), amountInWei);
			} else {
				// For zakat payments - the donateZakat method already handles approve internally
				setProcessingMessage("Processing Zakat donation...");
				const zakatType = type === "zakat-maal" ? "maal" : "fitrah";
				hash = await contracts.donateZakat(
					Number(amountInWei) / 1000000, 
					zakatType,
					tipAmount, // Use calculated tip amount
					"" // donorMessage - empty for now
				);
			}

			setTxHash(hash);
			setPaymentStep("success");
			toast({
				title: "Payment Success",
				description: "Thank you for your donation",
			});
			router.refresh();
		} catch (error: any) {
			console.error("Payment processing error:", error);
			
			// Check if it's an allowance error
			const errorMessage = error?.message || error?.reason || error?.toString() || "";
			
			if (errorMessage.includes("insufficient allowance") || errorMessage.includes("ERC20: insufficient allowance")) {
				toast({
					variant: "destructive",
					title: "Approval Required",
					description: "Please approve USDT spending first. The transaction will handle this automatically.",
				});
			} else if (errorMessage.includes("insufficient balance")) {
				toast({
					variant: "destructive",
					title: "Insufficient Balance",
					description: "You don't have enough USDT balance for this transaction.",
				});
			} else {
				toast({
					variant: "destructive",
					title: "Transaction Failed",
					description: "Please try again. The transaction may have been rejected.",
				});
			}
			
			setPaymentStep("select");
		}
	};

	const resetModal = () => {
		setPaymentStep("select");
		setTxHash("");
		setProcessingMessage("Processing transaction...");
	};

	const openInBlockExplorer = () => {
		if (txHash) {
			window.open(`https://sepolia-blockscout.lisk.com/tx/${txHash}`, "_blank");
		}
	};

	return (
		<Dialog
			onOpenChange={(open) => {
				if (!open) {
					resetModal();
				}
			}}
		>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="bg-[#0f2419] border-[#14532d] text-[#f0fdf4] max-w-md">
				<DialogHeader>
					<DialogTitle className="text-[#f0fdf4]">Complete Payment</DialogTitle>
				</DialogHeader>

				{paymentStep === "select" && (
					<div className="space-y-6">
						<div className="text-center p-4 bg-[#14532d]/30 rounded-lg">
							<div className="text-sm text-[#f0fdf4]/70 mb-1">{title}</div>
							<div className="text-2xl font-bold text-[#d1b86a] mb-1">{displayTokenPrice(amount)} USDT</div>
							<div className="text-xs text-[#f0fdf4]/50">Direct USDT payment</div>
						</div>

						<div>
							<label className="text-sm text-[#f0fdf4]/70 mb-2 block">Payment Token</label>
							<div className="bg-[#14532d] border border-[#14532d] rounded-md p-3 text-[#f0fdf4]">
								<div className="flex items-center justify-between w-full">
									<span>💰 USDT</span>
									<span className="text-[#d1b86a]">Balance: {displayBalance}</span>
								</div>
							</div>
						</div>

						<div className="space-y-2 text-xs text-[#f0fdf4]/60">
							<div className="flex items-center">
								<ArrowRight className="h-3 w-3 mr-2" />
								Direct USDT payment on Lisk Sepolia
							</div>
							<div className="flex items-center">
								<ArrowRight className="h-3 w-3 mr-2" />
								No currency conversion needed
							</div>
							<div className="flex items-center">
								<ArrowRight className="h-3 w-3 mr-2" />
								NFT certificate minted upon confirmation
							</div>
						</div>

						<Button onClick={onContinuePayment} className="w-full bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] glow-shadow">
							Continue
						</Button>
					</div>
				)}

				{paymentStep === "confirm" && (
					<div className="space-y-6">
						<div className="text-center">
							<div className="text-lg font-semibold text-[#f0fdf4] mb-2">Confirm Payment</div>
							<div className="text-sm text-[#f0fdf4]/70">Please review your transaction details</div>
						</div>

						<Card className="bg-[#14532d]/30 border-[#14532d]">
							<CardContent className="p-4 space-y-3">
								<div className="flex justify-between">
									<span className="text-[#f0fdf4]/70">Type:</span>
									<span className="text-[#f0fdf4]">{title}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-[#f0fdf4]/70">Amount:</span>
									<span className="text-[#d1b86a]">{displayTokenPrice(amount)} USDT</span>
								</div>
								{includeTip && tipAmount > 0 && (
									<div className="flex justify-between">
										<span className="text-[#f0fdf4]/70">Platform Tip:</span>
										<span className="text-[#d1b86a]">+{tipAmount.toFixed(2)} USDT</span>
									</div>
								)}
								<div className="flex justify-between">
									<span className="text-[#f0fdf4]/70">Network:</span>
									<Badge className="bg-[#14532d] text-[#d1b86a]">Lisk Sepolia</Badge>
								</div>
								<Separator className="bg-[#14532d]" />
								<div className="flex justify-between font-semibold">
									<span className="text-[#f0fdf4]">Total:</span>
									<span className="text-[#d1b86a]">{totalAmount.toFixed(2)} USDT</span>
								</div>
								<div className="flex justify-between">
									<span className="text-[#f0fdf4]/70">Estimated Gas Fee:</span>
									<span className="text-[#f0fdf4]">~$0.01</span>
								</div>
							</CardContent>
						</Card>

						{/* Platform Tip Configuration - Only for Zakat */}
						{(type === "zakat-maal" || type === "zakat-fitrah") && (
							<Card className="bg-[#14532d]/30 border-[#14532d]">
								<CardContent className="p-4 space-y-4">
									<div className="flex items-center space-x-2">
										<Checkbox 
											id="include-tip" 
											checked={includeTip}
											onCheckedChange={(checked) => setIncludeTip(!!checked)}
											className="border-[#f0fdf4]/30 data-[state=checked]:bg-[#d1b86a] data-[state=checked]:border-[#d1b86a]"
										/>
										<Label htmlFor="include-tip" className="text-[#f0fdf4] font-medium">
											Support platform development
										</Label>
									</div>
									
									{includeTip && (
										<div className="space-y-3 ml-6">
											<div className="flex items-center space-x-4">
												<div className="flex items-center space-x-2">
													<input
														type="radio"
														id="tip-percentage"
														name="tip-type"
														checked={tipType === "percentage"}
														onChange={() => setTipType("percentage")}
														className="text-[#d1b86a] focus:ring-[#d1b86a]"
													/>
													<Label htmlFor="tip-percentage" className="text-[#f0fdf4]/80 text-sm">
														2.5% ({((Number(amount) / 10 ** 6) * 2.5 / 100).toFixed(2)} USDT)
													</Label>
												</div>
											</div>
											
											<div className="flex items-center space-x-4">
												<div className="flex items-center space-x-2">
													<input
														type="radio"
														id="tip-custom"
														name="tip-type"
														checked={tipType === "custom"}
														onChange={() => setTipType("custom")}
														className="text-[#d1b86a] focus:ring-[#d1b86a]"
													/>
													<Label htmlFor="tip-custom" className="text-[#f0fdf4]/80 text-sm">
														Custom amount
													</Label>
												</div>
												{tipType === "custom" && (
													<div className="flex items-center space-x-2">
														<Input
															type="number"
															placeholder="0.00"
															value={customTipAmount}
															onChange={(e) => setCustomTipAmount(e.target.value)}
															className="w-20 h-8 bg-[#0f2419] border-[#14532d] text-[#f0fdf4] text-sm"
															min="0"
															step="0.01"
														/>
														<span className="text-[#f0fdf4]/70 text-sm">USDT</span>
													</div>
												)}
											</div>
											
											<div className="text-xs text-[#f0fdf4]/60">
												Tips help us maintain and improve the platform. Thank you for your support! 💚
											</div>
										</div>
									)}
								</CardContent>
							</Card>
						)}

						<div className="flex space-x-3">
							<Button
								variant="outline"
								onClick={() => setPaymentStep("select")}
								className="flex-1 border-[#14532d] text-[#f0fdf4] hover:bg-[#14532d]/20 bg-transparent"
							>
								Back
							</Button>
							<Button onClick={processPayment} className="flex-1 bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] glow-shadow">
								<Wallet className="h-4 w-4 mr-2" />
								Pay Now
							</Button>
						</div>
					</div>
				)}

				{paymentStep === "processing" && (
					<div className="space-y-6 text-center">
						<div className="flex justify-center">
							<Loader2 className="h-12 w-12 text-[#d1b86a] animate-spin" />
						</div>
						<div>
							<div className="text-lg font-semibold text-[#f0fdf4] mb-2">Processing Payment</div>
							<div className="text-sm text-[#f0fdf4]/70 mb-4">{processingMessage}</div>
							<Progress value={65} className="h-2" />
						</div>
						<div className="text-xs text-[#f0fdf4]/50">This may require two transactions: approve + donation</div>
					</div>
				)}

				{paymentStep === "success" && (
					<div className="space-y-6 text-center">
						<div className="flex justify-center">
							<CheckCircle className="h-12 w-12 text-[#d1b86a]" />
						</div>
						<div>
							<div className="text-lg font-semibold text-[#f0fdf4] mb-2">Payment Successful!</div>
							<div className="text-sm text-[#f0fdf4]/70 mb-4">Your {title.toLowerCase()} has been processed successfully</div>
						</div>

						<Card className="bg-[#14532d]/30 border-[#14532d]">
							<CardContent className="p-4 space-y-3">
								<div className="flex justify-between">
									<span className="text-[#f0fdf4]/70">Transaction Hash:</span>
									<div className="flex items-center">
										<span className="text-[#d1b86a] text-sm font-mono">{txHash ? txHash.slice(0, 10) : "N/A"}...</span>
										{/* <span className="text-[#d1b86a] text-sm font-mono">{txHash.slice(0, 10)}...</span> */}
										<Button
											size="sm"
											variant="ghost"
											className="h-6 w-6 p-0 ml-2 text-[#d1b86a]"
											onClick={() => txHash && window.open(`https://sepolia-blockscout.lisk.com/tx/${txHash}`, "_blank")}
										>
											<ExternalLink className="h-3 w-3" />
										</Button>
									</div>
								</div>
								<div className="flex justify-between">
									<span className="text-[#f0fdf4]/70">Status:</span>
									<Badge className="bg-[#14532d] text-[#d1b86a]">Confirmed</Badge>
								</div>
								<div className="flex justify-between">
									<span className="text-[#f0fdf4]/70">NFT Certificate:</span>
									<span className="text-[#d1b86a]">Minting...</span>
								</div>
							</CardContent>
						</Card>

						<div className="text-xs text-[#f0fdf4]/60">Your NFT certificate will be available in your dashboard shortly</div>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
