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
		<div className="min-h-screen bg-tawf-sand/30 py-12 px-4">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-4xl md:text-5xl font-heading font-medium text-tawf-green mb-2">Dashboard</h1>
					<p className="text-tawf-muted">Track your donations and community impact</p>
				</div>

				{/* Stats Cards */}
				<div className="grid md:grid-cols-4 gap-6 mb-8">
					<Card className="bg-white border-tawf-green/10 rounded-2xl hover:shadow-lg transition-shadow">
						<CardContent className="p-6">
							<div className="flex items-start gap-4">
								<div className="w-12 h-12 bg-tawf-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
									<TrendingUp className="h-6 w-6 text-tawf-green" />
								</div>
								<div className="flex-1">
									<p className="text-tawf-muted text-sm mb-1">Total Donated</p>
									<p className="text-2xl font-heading font-bold text-tawf-green">5947 USDT</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="bg-white border-tawf-green/10 rounded-2xl hover:shadow-lg transition-shadow">
						<CardContent className="p-6">
							<div className="flex items-start gap-4">
								<div className="w-12 h-12 bg-tawf-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
									<Award className="h-6 w-6 text-tawf-gold" />
								</div>
								<div className="flex-1">
									<p className="text-tawf-muted text-sm mb-1">NFT Certificates</p>
									<p className="text-2xl font-heading font-bold text-tawf-gold">2</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="bg-white border-tawf-green/10 rounded-2xl hover:shadow-lg transition-shadow">
						<CardContent className="p-6">
							<div className="flex items-start gap-4">
								<div className="w-12 h-12 bg-tawf-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
									<Users className="h-6 w-6 text-tawf-green" />
								</div>
								<div className="flex-1">
									<p className="text-tawf-muted text-sm mb-1">Families Helped</p>
									<p className="text-2xl font-heading font-bold text-tawf-green">20</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="bg-white border-tawf-green/10 rounded-2xl hover:shadow-lg transition-shadow">
						<CardContent className="p-6">
							<div className="flex items-start gap-4">
								<div className="w-12 h-12 bg-tawf-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
									<Vote className="h-6 w-6 text-tawf-gold" />
								</div>
								<div className="flex-1">
									<p className="text-tawf-muted text-sm mb-1">DAO Votes</p>
									<p className="text-2xl font-heading font-bold text-tawf-gold">4</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<Tabs defaultValue="history" className="space-y-6">
					<TabsList className="grid w-full grid-cols-3 bg-tawf-sand/50 border border-tawf-green/10 rounded-xl p-1">
						<TabsTrigger value="history" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-tawf-green">
							Donation History
						</TabsTrigger>
						<TabsTrigger value="certificates" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-tawf-green">
							NFT Certificates
						</TabsTrigger>
						<TabsTrigger value="contracts" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-tawf-green">
							Contract Data
						</TabsTrigger>
					</TabsList>

					<TabsContent value="history">
						<div className="grid lg:grid-cols-3 gap-6">
							<div className="lg:col-span-2 space-y-4">
								<Card className="bg-white border-tawf-green/10 rounded-2xl">
									<CardHeader>
										<CardTitle className="text-tawf-green font-heading">Recent Donations</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											{[
												{ type: "Zakat Maal", amount: "5667 USDT", date: "2025-08-18", status: "Completed" },
												{ type: "Qurban - Goat", amount: "280 USDT", date: "2025-08-18", status: "Completed" },
											].map((donation, index) => (
												<div key={index} className="flex items-center justify-between p-5 bg-tawf-sand/30 rounded-xl hover:bg-tawf-sand/50 transition-colors">
													<div>
														<div className="font-heading font-medium text-tawf-ink">{donation.type}</div>
														<div className="text-sm text-tawf-muted">{donation.date}</div>
													</div>
													<div className="text-right">
														<div className="font-heading font-semibold text-tawf-gold">{donation.amount}</div>
														<Badge className="bg-tawf-green/10 text-tawf-green border-0 mt-1">
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
								<Card className="bg-white border-tawf-green/10 rounded-2xl">
									<CardHeader>
										<CardTitle className="text-tawf-green font-heading text-base">Impact Tracker</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-5">
											<div>
												<div className="flex justify-between text-sm mb-2">
													<span className="text-tawf-muted">Orphans Supported</span>
													<span className="text-tawf-gold font-heading font-semibold">5667 USDT</span>
												</div>
												<Progress value={80} className="h-2 bg-tawf-sand" />
											</div>

											<div>
												<div className="flex justify-between text-sm mb-2">
													<span className="text-tawf-muted">Refugee Families</span>
													<span className="text-tawf-gold font-heading font-semibold">280 USDT</span>
												</div>
												<Progress value={30} className="h-2 bg-tawf-sand" />
											</div>

											<div>
												<div className="flex justify-between text-sm mb-2">
													<span className="text-tawf-muted">Local Aid</span>
													<span className="text-tawf-gold font-heading font-semibold">0 USDT</span>
												</div>
												<Progress value={0} className="h-2 bg-tawf-sand" />
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
