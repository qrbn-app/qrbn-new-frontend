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

	const navLinks = [
		{ href: "/waqf", label: "Waqf" },
		{ href: "/waqf-farms", label: "Waqf Farms" },
		{ href: "/qurban", label: "Qurban" },
		{ href: "/vendor", label: "Vendor" },
		{ href: "/dashboard", label: "Dashboard" },
		{ href: "/dao", label: "DAO" },
		{ href: "/docs", label: "Docs" },
		{ href: "/faq", label: "FAQ" },
	];

	return (
		<nav className="border-b border-tawf-green/10 bg-tawf-sand/90 backdrop-blur-md sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-20">
					<Link href="/" className="flex items-center space-x-3">
						<div className="relative">
							<Moon className="h-10 w-10 text-tawf-green crescent-shadow" />
							<Star className="h-4 w-4 text-tawf-gold absolute -top-1 -right-1" />
						</div>
						<span className="text-2xl font-heading font-medium text-tawf-green tracking-wide">QRBN.app</span>
					</Link>

					<div className="hidden md:flex items-center space-x-8">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="text-sm uppercase tracking-widest text-tawf-ink hover:text-tawf-green transition-colors duration-200"
							>
								{link.label}
							</Link>
						))}

						{/* Wallet Connection and User Profile */}
						{!isConnected ? (
							<Button onClick={connectWallet} className="rounded-full bg-tawf-green text-tawf-sand hover:bg-tawf-greenLight px-6 transition-all duration-200">
								<Wallet className="h-4 w-4 mr-2" />
								<span className="text-sm uppercase tracking-wider">Connect</span>
							</Button>
						) : (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" className="relative h-11 w-11 rounded-full border border-tawf-green/20 hover:border-tawf-gold transition-colors">
										<Avatar className="h-9 w-9">
											<AvatarFallback className="bg-tawf-green/10 text-tawf-green">
												<User className="h-5 w-5" />
											</AvatarFallback>
										</Avatar>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-80 bg-white border-tawf-green/10 text-tawf-ink shadow-lg" align="end">
									<DropdownMenuLabel className="text-tawf-green font-heading">Wallet Information</DropdownMenuLabel>
									<DropdownMenuSeparator className="bg-tawf-green/10" />

									{/* Wallet Address */}
									<DropdownMenuItem
										className="flex items-center justify-between hover:bg-tawf-sand cursor-pointer"
										onClick={copyAddress}
									>
										<div className="flex items-center space-x-2">
											<Wallet className="h-4 w-4 text-tawf-green" />
											<span className="text-sm">{formatAddress(address!)}</span>
										</div>
										{copied ? <Check className="h-4 w-4 text-tawf-green" /> : <Copy className="h-4 w-4 text-tawf-muted" />}
									</DropdownMenuItem>

									{/* Chain Information */}
									<DropdownMenuItem className="flex items-center justify-between hover:bg-tawf-sand">
										<div className="flex items-center space-x-2">
											<div className="w-2 h-2 rounded-full bg-tawf-green"></div>
											<span className="text-sm">Network</span>
										</div>
										<Badge className="bg-tawf-green/10 text-tawf-green border-0">{chain?.name || "Lisk Sepolia"}</Badge>
									</DropdownMenuItem>

									{/* Wallet Balance */}
									<DropdownMenuItem className="flex items-center justify-between hover:bg-tawf-sand">
										<div className="flex items-center space-x-2">
											<DollarSign className="h-4 w-4 text-tawf-gold" />
											<span className="text-sm">Balance</span>
										</div>
										<span className="text-tawf-green font-semibold">{displayBalance} USDT</span>
									</DropdownMenuItem>

									<DropdownMenuSeparator className="bg-tawf-green/10" />

									{/* Currency Selection */}
									<DropdownMenuLabel className="text-tawf-green font-heading">Currency Settings</DropdownMenuLabel>
									<div className="px-2 py-2">
										<Select value={currency} onValueChange={(value: Currency) => setCurrency(value)}>
											<SelectTrigger className="w-full bg-tawf-sand border-tawf-green/20 text-tawf-ink text-sm">
												<SelectValue />
											</SelectTrigger>
											<SelectContent className="bg-white border-tawf-green/10">
												<SelectItem value="IDRX" className="text-tawf-ink hover:bg-tawf-sand">
													IDRX (Indonesian Rupiah)
												</SelectItem>
												<SelectItem value="USDT" className="text-tawf-ink hover:bg-tawf-sand">
													USDT (US Dollar Tether)
												</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<DropdownMenuSeparator className="bg-tawf-green/10" />

									{/* Disconnect */}
									<DropdownMenuItem
										className="flex items-center space-x-2 hover:bg-red-50 text-red-500 cursor-pointer"
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
						<Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-tawf-ink hover:bg-tawf-green/10">
							{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
						</Button>
					</div>
				</div>

				{isOpen && (
					<div className="md:hidden py-6 space-y-4 border-t border-tawf-green/10">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="block text-sm uppercase tracking-widest text-tawf-ink hover:text-tawf-green transition-colors"
							>
								{link.label}
							</Link>
						))}

						{/* Mobile Wallet Section */}
						{!isConnected ? (
							<div className="pt-4">
								<Button onClick={connectWallet} className="w-full rounded-full bg-tawf-green text-tawf-sand hover:bg-tawf-greenLight px-6">
									<Wallet className="h-4 w-4 mr-2" />
									<span className="text-sm uppercase tracking-wider">Connect Wallet</span>
								</Button>
							</div>
						) : (
							<div className="pt-4 space-y-4 border-t border-tawf-green/10">
								{/* Mobile Wallet Info */}
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<span className="text-sm text-tawf-muted">Wallet Address</span>
										<div className="flex items-center space-x-2">
											<span className="text-sm text-tawf-ink">{formatAddress(address!)}</span>
											<Button
												size="sm"
												variant="ghost"
												onClick={copyAddress}
												className="h-8 w-8 p-0 text-tawf-ink hover:text-tawf-green"
											>
												{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
											</Button>
										</div>
									</div>

									<div className="flex items-center justify-between">
										<span className="text-sm text-tawf-muted">Network</span>
										<Badge className="bg-tawf-green/10 text-tawf-green border-0">{chain?.name || "Lisk Sepolia"}</Badge>
									</div>

									<div className="flex items-center justify-between">
										<span className="text-sm text-tawf-muted">Balance</span>
										<span className="text-sm text-tawf-green font-semibold">{displayBalance} USDT</span>
									</div>
								</div>

								{/* Mobile Currency Selector */}
								<div>
									<label className="text-sm text-tawf-muted mb-2 block">Currency</label>
									<Select value={currency} onValueChange={(value: Currency) => setCurrency(value)}>
										<SelectTrigger className="w-full bg-tawf-sand border-tawf-green/20 text-tawf-ink text-sm">
											<SelectValue />
										</SelectTrigger>
										<SelectContent className="bg-white border-tawf-green/10">
											<SelectItem value="IDRX" className="text-tawf-ink hover:bg-tawf-sand">
												IDRX (Indonesian Rupiah)
											</SelectItem>
											<SelectItem value="USDT" className="text-tawf-ink hover:bg-tawf-sand">
												USDT (US Dollar Tether)
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								{/* Mobile Disconnect */}
								<Button
									variant="outline"
									onClick={() => disconnect()}
									className="w-full border-red-200 text-red-500 hover:bg-red-50 bg-transparent rounded-full"
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
