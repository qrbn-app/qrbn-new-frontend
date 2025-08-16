"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Circle, Wallet, Award, Users, Star, MapPin, ScrollText } from "lucide-react";
import { PaymentModal } from "@/components/payment-modal";
import { useReadContract } from "@/hooks/use-read-contracts";
import { cn, displayTokenPrice, isAnimalSold } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const steps = [
	{ id: 1, title: "Choose Qurban Type", completed: true },
	{ id: 2, title: "Select Animal", completed: true },
	{ id: 3, title: "Payment", completed: false },
];

const dummyFeatures = ["Shariah certified", "Health verified", "Local sourced", "1/7 share", "Budget-friendly"];

export default function QurbanPage() {
	const [selectedAnimal, setSelectedAnimal] = useState<bigint>();
	const [selectedCategory, setSelectedCategory] = useState<"goats" | "cows">("goats");
	const { data: qurbanAnimals, isLoading } = useReadContract((contracts) => ({
		queryKey: ["qurbanAnimals"],
		queryFn: () => contracts?.getQurbanAnimals(),
	}));

	const getSelectedAnimalData = () => {
		return qurbanAnimals?.[selectedCategory].find((animal) => animal.id === selectedAnimal);
	};
	const selectedAnimalData = useMemo(getSelectedAnimalData, [qurbanAnimals, selectedAnimal]);

	return (
		<div className="min-h-screen islamic-pattern py-8 px-4">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-[#f0fdf4] mb-4">Qurban Donation</h1>
					<p className="text-[#f0fdf4]/70">Choose your animal with complete transparency and detailed information</p>
				</div>

				{/* Stepper */}
				<div className="mb-8">
					<div className="flex items-center justify-center mb-4">
						{steps.map((step, index) => (
							<div key={step.id} className="flex items-center">
								<div className="flex items-center">
									{step.completed ? (
										<CheckCircle className="h-8 w-8 text-[#d1b86a]" />
									) : (
										<Circle className="h-8 w-8 text-[#f0fdf4]/40" />
									)}
									<span className={`ml-2 ${step.completed ? "text-[#d1b86a]" : "text-[#f0fdf4]/40"}`}>{step.title}</span>
								</div>
								{index < steps.length - 1 && (
									<div className={`w-16 h-0.5 mx-4 ${step.completed ? "bg-[#d1b86a]" : "bg-[#f0fdf4]/20"}`} />
								)}
							</div>
						))}
					</div>
				</div>

				<div className="grid lg:grid-cols-4 gap-8">
					{/* Animal Selection */}

					<div className="lg:col-span-3">
						{/* Category Tabs */}
						<div className="flex space-x-4 mb-6">
							<Button
								onClick={() => setSelectedCategory("goats")}
								variant={selectedCategory === "goats" ? "default" : "outline"}
								className={
									selectedCategory === "goats"
										? "bg-[#14532d] text-[#d1b86a]"
										: "border-[#14532d] text-[#f0fdf4] hover:bg-[#14532d]/20 bg-transparent"
								}
							>
								🐐 Goats (Full Sacrifice)
							</Button>
							<Button
								onClick={() => setSelectedCategory("cows")}
								variant={selectedCategory === "cows" ? "default" : "outline"}
								className={
									selectedCategory === "cows"
										? "bg-[#14532d] text-[#d1b86a]"
										: "border-[#14532d] text-[#f0fdf4] hover:bg-[#14532d]/20 bg-transparent"
								}
							>
								🐄 Cows (1/7 Share)
							</Button>
						</div>

						{/* Animal Grid */}
						{isLoading ? (
							<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
								{Array.from({ length: 6 }).map((_, idx) => {
									return <Skeleton key={idx} className="w-full h-[400px]" />;
								})}
							</div>
						) : (
							<>
								<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
									{qurbanAnimals?.[selectedCategory].map((animal) => (
										<Card
											key={animal.id}
											className={cn(`cursor-pointer transition-all duration-300`, {
												"border-[#d1b86a] bg-[#d1b86a]/10 glow-shadow": selectedAnimal === animal.id,
												"bg-[#0f2419] border-[#14532d] hover:border-[#d1b86a]/50w": selectedAnimal !== animal.id,
												"pointer-events-none": isAnimalSold(animal.status),
											})}
											onClick={() => setSelectedAnimal(animal.id)}
										>
											<CardContent className="p-4">
												<div className="aspect-video mb-4 rounded-lg overflow-hidden relative">
													<img
														src={animal.image || "/placeholder.svg"}
														alt={animal.name}
														className="w-full h-full object-cover"
													/>
													{isAnimalSold(animal.status) && (
														<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
															<span className="text-[#d1b86a] font-bold text-lg">Sold</span>
														</div>
													)}
												</div>

												<div className="space-y-3">
													<div className="flex items-center justify-between">
														<h3 className="font-semibold text-[#f0fdf4]">{animal.name}</h3>
														<Badge className="bg-[#14532d] text-[#d1b86a]">Excelent</Badge>
													</div>

													<div className="text-2xl font-bold text-[#d1b86a]">
														{displayTokenPrice(animal.pricePerShare)} USDT
													</div>

													<div className="space-y-2 text-sm">
														<div className="flex items-center text-[#f0fdf4]/70">
															<MapPin className="h-3 w-3 mr-1" />
															{animal.location}
														</div>
														<div className="flex items-center text-[#f0fdf4]/70">
															<ScrollText className="h-3 w-3 mr-1" />
															{animal.totalShares - animal.availableShares} / {animal.totalShares} share
															{animal.totalShares > 1 ? "s" : ""} sold
														</div>
														<div className="text-[#f0fdf4]/70">
															Age: {animal.age} • Weight: {animal.weight}
														</div>
													</div>

													<p className="text-xs text-[#f0fdf4]/60">{animal.description}</p>

													<div className="flex flex-wrap gap-1">
														{dummyFeatures.slice(0, 2).map((feature, index) => (
															<Badge key={index} variant="secondary" className="bg-[#14532d]/50 text-[#d1b86a] text-xs">
																{feature}
															</Badge>
														))}
														{dummyFeatures.length > 2 && (
															<Badge variant="secondary" className="bg-[#14532d]/50 text-[#d1b86a] text-xs">
																+{dummyFeatures.length - 2} more
															</Badge>
														)}
													</div>
												</div>
											</CardContent>
										</Card>
									))}
								</div>

								{/* Selected Animal Details */}
								{selectedAnimalData ? (
									<Card className="bg-[#0f2419] border-[#14532d]">
										<CardHeader>
											<CardTitle className="text-[#f0fdf4]">Selected Animal Details</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="grid md:grid-cols-2 gap-6">
												<div>
													<img
														src={selectedAnimalData?.image || "/placeholder.svg"}
														alt={selectedAnimalData?.name}
														className="w-full aspect-video object-cover rounded-lg mb-4"
													/>
												</div>

												<div className="space-y-4">
													<div>
														<h3 className="text-xl font-semibold text-[#f0fdf4] mb-2">{selectedAnimalData?.name}</h3>
														<p className="text-[#f0fdf4]/70">{selectedAnimalData?.description}</p>
													</div>

													<div className="grid grid-cols-2 gap-4 text-sm">
														<div>
															<span className="text-[#f0fdf4]/70">Condition:</span>
															<div className="font-medium text-[#f0fdf4]">Excelent</div>
														</div>
														<div>
															<span className="text-[#f0fdf4]/70">Age:</span>
															<div className="font-medium text-[#f0fdf4]">{selectedAnimalData?.age}</div>
														</div>
														<div>
															<span className="text-[#f0fdf4]/70">Weight:</span>
															<div className="font-medium text-[#f0fdf4]">{selectedAnimalData?.weight}</div>
														</div>
														<div>
															<span className="text-[#f0fdf4]/70">Location:</span>
															<div className="font-medium text-[#f0fdf4]">{selectedAnimalData?.location}</div>
														</div>
													</div>

													<div>
														<span className="text-[#f0fdf4]/70 text-sm">Features:</span>
														<div className="flex flex-wrap gap-2 mt-2">
															{dummyFeatures.map((feature, index) => (
																<Badge key={index} className="bg-[#14532d] text-[#d1b86a]">
																	<Star className="h-3 w-3 mr-1" />
																	{feature}
																</Badge>
															))}
														</div>
													</div>
												</div>
											</div>

											<Separator className="bg-[#14532d] my-6" />

											<div className="flex items-center justify-between">
												<div>
													<div className="text-sm text-[#f0fdf4]/70">Total Amount:</div>
													<div className="text-2xl font-bold text-[#d1b86a]">
														{displayTokenPrice(selectedAnimalData.pricePerShare)} USDT
													</div>
												</div>

												<PaymentModal
													amount={selectedAnimalData.pricePerShare}
													type="qurban"
													animalId={selectedAnimalData.id}
													title={`Qurban - ${selectedAnimalData.name}`}
												>
													<Button className="bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] glow-shadow px-8">
														<Wallet className="h-4 w-4 mr-2" />
														Buy (1 share)
													</Button>
												</PaymentModal>
											</div>
										</CardContent>
									</Card>
								) : null}
							</>
						)}
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* <Card className="bg-[#0f2419] border-[#14532d]">
							<CardHeader>
								<CardTitle className="text-[#f0fdf4] text-sm">Progress Dashboard</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<div className="flex justify-between text-sm mb-2">
											<span className="text-[#f0fdf4]/70">Payment</span>
											<span className="text-[#d1b86a]">0%</span>
										</div>
										<Progress value={0} className="h-2" />
									</div>

									<div className="space-y-2 text-sm">
										<div className="flex items-center">
											<Circle className="h-4 w-4 text-[#f0fdf4]/40 mr-2" />
											<span className="text-[#f0fdf4]/40">Payment Pending</span>
										</div>
										<div className="flex items-center">
											<Circle className="h-4 w-4 text-[#f0fdf4]/40 mr-2" />
											<span className="text-[#f0fdf4]/40">Awaiting Proof</span>
										</div>
										<div className="flex items-center">
											<Circle className="h-4 w-4 text-[#f0fdf4]/40 mr-2" />
											<span className="text-[#f0fdf4]/40">NFT Issued</span>
										</div>
									</div>
								</div>
							</CardContent>
						</Card> */}

						<Card className="bg-[#0f2419] border-[#14532d]">
							<CardHeader>
								<CardTitle className="text-[#f0fdf4] text-sm">NFT Certificate Preview</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="aspect-square bg-gradient-to-br from-[#14532d] to-[#0f2419] rounded-lg p-4 border border-[#d1b86a]/30">
									<div className="text-center h-full flex flex-col justify-center">
										<Award className="h-12 w-12 text-[#d1b86a] mx-auto mb-2 crescent-shadow" />
										<div className="text-xs text-[#f0fdf4]/70 mb-1">QRBN Certificate</div>
										<div className="text-sm font-semibold text-[#d1b86a]">Qurban 2025</div>
										<div className="text-xs text-[#f0fdf4]/50 mt-2">Will be minted upon completion</div>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="bg-[#0f2419] border-[#14532d]">
							<CardHeader>
								<CardTitle className="text-[#f0fdf4] text-sm">Community Impact</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3 text-sm">
									<div className="flex items-center">
										<Users className="h-4 w-4 text-[#d1b86a] mr-2" />
										<span className="text-[#f0fdf4]/70">1,247 families helped</span>
									</div>
									<div className="text-xs text-[#f0fdf4]/50">
										Your contribution will help provide meat to families in need during Eid al-Adha
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
