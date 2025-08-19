"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, TrendingUp, Users, Vote } from "lucide-react";
import { NFTCertificateCard } from "@/components/nft-certificate-card";
import { ContractDemo } from "@/components/contract-demo";

export default function DashboardPage() {
	return (
		<div className="min-h-screen islamic-pattern py-8 px-4">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-[#f0fdf4] mb-4">Dashboard</h1>
					<p className="text-[#f0fdf4]/70">Track your donations and community impact</p>
				</div>

				{/* Stats Cards */}
				<div className="grid md:grid-cols-4 gap-6 mb-8">
					<Card className="bg-[#0f2419] border-[#14532d]">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-[#f0fdf4]/70 text-sm">Total Donated</p>
									<p className="text-2xl font-bold text-[#d1b86a]">5947 USDT</p>
								</div>
								<TrendingUp className="h-8 w-8 text-[#d1b86a]" />
							</div>
						</CardContent>
					</Card>

					<Card className="bg-[#0f2419] border-[#14532d]">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-[#f0fdf4]/70 text-sm">NFT Certificates</p>
									<p className="text-2xl font-bold text-[#d1b86a]">2</p>
								</div>
								<Award className="h-8 w-8 text-[#d1b86a]" />
							</div>
						</CardContent>
					</Card>

					<Card className="bg-[#0f2419] border-[#14532d]">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-[#f0fdf4]/70 text-sm">Families Helped</p>
									<p className="text-2xl font-bold text-[#d1b86a]">20</p>
								</div>
								<Users className="h-8 w-8 text-[#d1b86a]" />
							</div>
						</CardContent>
					</Card>

					<Card className="bg-[#0f2419] border-[#14532d]">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-[#f0fdf4]/70 text-sm">DAO Votes</p>
									<p className="text-2xl font-bold text-[#d1b86a]">4</p>
								</div>
								<Vote className="h-8 w-8 text-[#d1b86a]" />
							</div>
						</CardContent>
					</Card>
				</div>

				<Tabs defaultValue="history" className="space-y-6">
					<TabsList className="grid w-full grid-cols-3 bg-[#0f2419] border border-[#14532d]">
						<TabsTrigger value="history" className="data-[state=active]:bg-[#14532d] data-[state=active]:text-[#d1b86a]">
							Donation History
						</TabsTrigger>
						<TabsTrigger value="certificates" className="data-[state=active]:bg-[#14532d] data-[state=active]:text-[#d1b86a]">
							NFT Certificates
						</TabsTrigger>
						<TabsTrigger value="contracts" className="data-[state=active]:bg-[#14532d] data-[state=active]:text-[#d1b86a]">
							Contract Data
						</TabsTrigger>
					</TabsList>

					<TabsContent value="history">
						<div className="grid lg:grid-cols-3 gap-6">
							<div className="lg:col-span-2 space-y-4">
								<Card className="bg-[#0f2419] border-[#14532d]">
									<CardHeader>
										<CardTitle className="text-[#f0fdf4]">Recent Donations</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											{[
												{ type: "Zakat Maal", amount: "5667 USDT", date: "2025-08-18", status: "Completed" },
												{ type: "Qurban - Goat", amount: "280 USDT", date: "2025-08-18", status: "Completed" },
											].map((donation, index) => (
												<div key={index} className="flex items-center justify-between p-4 bg-[#14532d]/30 rounded-lg">
													<div>
														<div className="font-medium text-[#f0fdf4]">{donation.type}</div>
														<div className="text-sm text-[#f0fdf4]/60">{donation.date}</div>
													</div>
													<div className="text-right">
														<div className="font-semibold text-[#d1b86a]">{donation.amount}</div>
														<Badge
															variant={donation.status === "Completed" ? "default" : "secondary"}
															className={
																donation.status === "Completed"
																	? "bg-[#14532d] text-[#d1b86a]"
																	: "bg-[#d1b86a]/20 text-[#d1b86a]"
															}
														>
															{donation.status}
														</Badge>
													</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							</div>

							<div>
								<Card className="bg-[#0f2419] border-[#14532d]">
									<CardHeader>
										<CardTitle className="text-[#f0fdf4] text-sm">Impact Tracker</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											<div>
												<div className="flex justify-between text-sm mb-2">
													<span className="text-[#f0fdf4]/70">Orphans Supported</span>
													<span className="text-[#d1b86a] font-semibold">5667 USDT</span>
												</div>
												<Progress value={80} className="h-2" />
											</div>

											<div>
												<div className="flex justify-between text-sm mb-2">
													<span className="text-[#f0fdf4]/70">Refugee Families</span>
													<span className="text-[#d1b86a] font-semibold">280 USDT</span>
												</div>
												<Progress value={30} className="h-2" />
											</div>

											<div>
												<div className="flex justify-between text-sm mb-2">
													<span className="text-[#f0fdf4]/70">Local Aid</span>
													<span className="text-[#d1b86a] font-semibold">0 USDT</span>
												</div>
												<Progress value={0} className="h-2" />
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					</TabsContent>

					<TabsContent value="certificates">
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
							<NFTCertificateCard
								title="Zakat Maal 2025"
								date="2025-01-15"
								type="Zakat"
								tokenId="1"
								ipfsUrl="https://ipfs.io/ipfs/bafkreihfymc3stsqsjhvy2z2qcd6qlomjwjyd2o6fzgaldjjm3ytl3jrie"
							/>
							<NFTCertificateCard
								title="Zakat Fitrah 2025"
								date="2025-01-05"
								type="Zakat"
								tokenId="1"
								ipfsUrl="https://ipfs.io/ipfs/bafkreiev23if7tpf6nygprh2j23pw53mv4kztncb72vroytjuvwoc3pmby"
							/>
						</div>
					</TabsContent>

					<TabsContent value="contracts">
						<ContractDemo />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
