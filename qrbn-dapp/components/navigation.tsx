"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Moon, Star, DollarSign, User, Wallet, Copy, Check, LogOut } from "lucide-react";
import { WalletConnect } from "./wallet-connect";
import { useCurrency, type Currency } from "@/components/providers/currency-provider";
import { useAccount, useDisconnect } from "wagmi";
import { useConnectModal } from "@xellar/kit";
import { useTokenBalance } from "@/hooks/use-token-balance";

export function Navigation() {
	const [isOpen, setIsOpen] = useState(false);
	const [copied, setCopied] = useState(false);
	const { currency, setCurrency, formatCurrency } = useCurrency();
	const { address, isConnected, chain } = useAccount();
	const { disconnect } = useDisconnect();
	const { open } = useConnectModal();
	const { displayBalance } = useTokenBalance();

	const copyAddress = async () => {
		if (address) {
			await navigator.clipboard.writeText(address);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	const formatAddress = (address: string) => {
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	};

	const connectWallet = async () => {
		try {
			open();
		} catch (error) {
			console.error("Failed to open wallet modal:", error);
		}
	};

	return (
		<nav className="border-b border-[#14532d] bg-[#071a12]/95 backdrop-blur-sm sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<Link href="/" className="flex items-center space-x-2">
						<div className="relative">
							<Moon className="h-8 w-8 text-[#d1b86a] crescent-shadow" />
							<Star className="h-3 w-3 text-[#d1b86a] absolute -top-1 -right-1" />
						</div>
						<span className="text-xl font-bold text-[#f0fdf4]">QRBN.app</span>
					</Link>

					<div className="hidden md:flex items-center space-x-8">
						<Link href="/zakat" className="text-[#f0fdf4] hover:text-[#d1b86a] transition-colors">
							Zakat
						</Link>
						<Link href="/qurban" className="text-[#f0fdf4] hover:text-[#d1b86a] transition-colors">
							Qurban
						</Link>
						<Link href="/dashboard" className="text-[#f0fdf4] hover:text-[#d1b86a] transition-colors">
							Dashboard
						</Link>
						<Link href="/dao" className="text-[#f0fdf4] hover:text-[#d1b86a] transition-colors">
							DAO
						</Link>
						<Link href="/docs" className="text-[#f0fdf4] hover:text-[#d1b86a] transition-colors">
							Docs
						</Link>
						<Link href="/faq" className="text-[#f0fdf4] hover:text-[#d1b86a] transition-colors">
							FAQ
						</Link>

						{/* Wallet Connection and User Profile */}
						{!isConnected ? (
							<Button onClick={connectWallet} className="bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] glow-shadow">
								<Wallet className="h-4 w-4 mr-2" />
								Connect Wallet
							</Button>
						) : (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" className="relative h-10 w-10 rounded-full">
										<Avatar className="h-10 w-10 border-2 border-[#d1b86a]">
											<AvatarFallback className="bg-[#14532d] text-[#d1b86a]">
												<User className="h-5 w-5" />
											</AvatarFallback>
										</Avatar>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-80 bg-[#0f2419] border-[#14532d] text-[#f0fdf4]" align="end">
									<DropdownMenuLabel className="text-[#d1b86a]">Wallet Information</DropdownMenuLabel>
									<DropdownMenuSeparator className="bg-[#14532d]" />

									{/* Wallet Address */}
									<DropdownMenuItem
										className="flex items-center justify-between hover:bg-[#14532d] cursor-pointer"
										onClick={copyAddress}
									>
										<div className="flex items-center space-x-2">
											<Wallet className="h-4 w-4 text-[#d1b86a]" />
											<span className="text-sm">{formatAddress(address!)}</span>
										</div>
										{copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4 text-[#d1b86a]" />}
									</DropdownMenuItem>

									{/* Chain Information */}
									<DropdownMenuItem className="flex items-center justify-between hover:bg-[#14532d]">
										<div className="flex items-center space-x-2">
											<div className="w-2 h-2 rounded-full bg-green-400"></div>
											<span className="text-sm">Network</span>
										</div>
										<Badge className="bg-[#14532d] text-[#d1b86a] border-[#d1b86a]">{chain?.name || "Lisk Sepolia"}</Badge>
									</DropdownMenuItem>

									{/* Wallet Balance */}
									<DropdownMenuItem className="flex items-center justify-between hover:bg-[#14532d]">
										<div className="flex items-center space-x-2">
											<DollarSign className="h-4 w-4 text-[#d1b86a]" />
											<span className="text-sm">Balance</span>
										</div>
										<span className="text-[#d1b86a] font-semibold">{displayBalance} USDT</span>
									</DropdownMenuItem>

									<DropdownMenuSeparator className="bg-[#14532d]" />

									{/* Currency Selection */}
									<DropdownMenuLabel className="text-[#d1b86a]">Currency Settings</DropdownMenuLabel>
									<div className="px-2 py-2">
										<Select value={currency} onValueChange={(value: Currency) => setCurrency(value)}>
											<SelectTrigger className="w-full bg-[#14532d] border-[#14532d] text-[#f0fdf4] text-sm">
												<SelectValue />
											</SelectTrigger>
											<SelectContent className="bg-[#0f2419] border-[#14532d]">
												<SelectItem value="IDRX" className="text-[#f0fdf4] hover:bg-[#14532d]">
													IDRX (Indonesian Rupiah)
												</SelectItem>
												<SelectItem value="USDT" className="text-[#f0fdf4] hover:bg-[#14532d]">
													USDT (US Dollar Tether)
												</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<DropdownMenuSeparator className="bg-[#14532d]" />

									{/* Disconnect */}
									<DropdownMenuItem
										className="flex items-center space-x-2 hover:bg-red-500/20 text-red-400 cursor-pointer"
										onClick={() => disconnect()}
									>
										<LogOut className="h-4 w-4" />
										<span>Disconnect Wallet</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						)}
					</div>

					<div className="md:hidden">
						<Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-[#f0fdf4]">
							{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
						</Button>
					</div>
				</div>

				{isOpen && (
					<div className="md:hidden py-4 space-y-4">
						<Link href="/zakat" className="block text-[#f0fdf4] hover:text-[#d1b86a]">
							Zakat
						</Link>
						<Link href="/qurban" className="block text-[#f0fdf4] hover:text-[#d1b86a]">
							Qurban
						</Link>
						<Link href="/dashboard" className="block text-[#f0fdf4] hover:text-[#d1b86a]">
							Dashboard
						</Link>
						<Link href="/dao" className="block text-[#f0fdf4] hover:text-[#d1b86a]">
							DAO
						</Link>
						<Link href="/docs" className="block text-[#f0fdf4] hover:text-[#d1b86a]">
							Docs
						</Link>
						<Link href="/faq" className="block text-[#f0fdf4] hover:text-[#d1b86a]">
							FAQ
						</Link>

						{/* Mobile Wallet Section */}
						{!isConnected ? (
							<div className="pt-2">
								<Button onClick={connectWallet} className="w-full bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] glow-shadow">
									<Wallet className="h-4 w-4 mr-2" />
									Connect Wallet
								</Button>
							</div>
						) : (
							<div className="pt-2 space-y-4 border-t border-[#14532d]">
								{/* Mobile Wallet Info */}
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<span className="text-sm text-[#f0fdf4]/70">Wallet Address</span>
										<div className="flex items-center space-x-2">
											<span className="text-sm text-[#f0fdf4]">{formatAddress(address!)}</span>
											<Button
												size="sm"
												variant="ghost"
												onClick={copyAddress}
												className="h-6 w-6 p-0 text-[#f0fdf4] hover:text-[#d1b86a]"
											>
												{copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
											</Button>
										</div>
									</div>

									<div className="flex items-center justify-between">
										<span className="text-sm text-[#f0fdf4]/70">Network</span>
										<Badge className="bg-[#14532d] text-[#d1b86a] border-[#d1b86a]">{chain?.name || "Lisk Sepolia"}</Badge>
									</div>

									<div className="flex items-center justify-between">
										<span className="text-sm text-[#f0fdf4]/70">Balance</span>
										<span className="text-sm text-[#d1b86a] font-semibold">{displayBalance} USDT</span>
									</div>
								</div>

								{/* Mobile Currency Selector */}
								<div>
									<label className="text-sm text-[#f0fdf4]/70 mb-2 block">Currency</label>
									<Select value={currency} onValueChange={(value: Currency) => setCurrency(value)}>
										<SelectTrigger className="w-full bg-[#14532d] border-[#14532d] text-[#f0fdf4] text-sm">
											<SelectValue />
										</SelectTrigger>
										<SelectContent className="bg-[#0f2419] border-[#14532d]">
											<SelectItem value="IDRX" className="text-[#f0fdf4] hover:bg-[#14532d]">
												IDRX (Indonesian Rupiah)
											</SelectItem>
											<SelectItem value="USDT" className="text-[#f0fdf4] hover:bg-[#14532d]">
												USDT (US Dollar Tether)
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								{/* Mobile Disconnect */}
								<Button
									variant="outline"
									onClick={() => disconnect()}
									className="w-full border-red-500 text-red-400 hover:bg-red-500/20 bg-transparent"
								>
									<LogOut className="h-4 w-4 mr-2" />
									Disconnect Wallet
								</Button>
							</div>
						)}
					</div>
				)}
			</div>
		</nav>
	);
}
