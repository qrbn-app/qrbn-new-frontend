"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
	CheckCircle, 
	Circle, 
	Wallet, 
	Award, 
	Users, 
	Star, 
	MapPin, 
	ScrollText, 
	Baby,
	Utensils,
	Package,
	Truck,
	Clock,
	Calculator,
	Heart,
	ChefHat,
	Scale
} from "lucide-react";
import { PaymentModal } from "@/components/payment-modal";
import { useReadContract } from "@/hooks/use-read-contracts";
import { useCurrency } from "@/components/providers/currency-provider";
import { cn, displayTokenPrice, isAnimalSold } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const steps = [
	{ id: 1, title: "Choose Animal", completed: true },
	{ id: 2, title: "Processing Options", completed: true },
	{ id: 3, title: "Delivery Details", completed: false },
	{ id: 4, title: "Payment", completed: false },
];

const dummyFeatures = ["Halal certified", "Health verified", "Fresh & quality", "Islamic guidelines", "Expert handling"];

const processingOptions = [
	{
		id: "raw",
		title: "Raw Meat",
		description: "Fresh, cleaned meat portions",
		icon: "🥩",
		additionalCost: 0,
		estimatedDays: "1-2 days"
	},
	{
		id: "cooked",
		title: "Cooked Meals",
		description: "Ready-to-eat meal boxes",
		icon: "🍱",
		additionalCost: 15,
		estimatedDays: "2-3 days"
	}
];

const deliveryZones = [
	{ zone: "Zone 1", areas: ["Jakarta Pusat", "Jakarta Selatan"], baseFee: 10, perKgFee: 2 },
	{ zone: "Zone 2", areas: ["Jakarta Utara", "Jakarta Barat", "Jakarta Timur"], baseFee: 15, perKgFee: 3 },
	{ zone: "Zone 3", areas: ["Bogor", "Depok", "Tangerang", "Bekasi"], baseFee: 20, perKgFee: 4 },
	{ zone: "Zone 4", areas: ["Bandung", "Cirebon", "Sukabumi"], baseFee: 35, perKgFee: 6 },
];

export default function AqiqahPage() {
	const [selectedAnimal, setSelectedAnimal] = useState<bigint>();
	const [selectedCategory, setSelectedCategory] = useState<"goats" | "sheeps">("goats");
	const [childName, setChildName] = useState("");
	const [childGender, setChildGender] = useState<"boy" | "girl" | "">("");
	const [birthDate, setBirthDate] = useState("");
	const [processingType, setProcessingType] = useState<"raw" | "cooked">("raw");
	const [deliveryAddress, setDeliveryAddress] = useState("");
	const [deliveryZone, setDeliveryZone] = useState("");
	const [deliveryNotes, setDeliveryNotes] = useState("");
	const [distributionType, setDistributionType] = useState<"personal" | "charity">("personal");
	const [charityPercentage, setCharityPercentage] = useState(30);
	
	const { formatCurrency, convertToSelectedCurrency } = useCurrency();
	const { data: qurbanAnimals, isLoading } = useReadContract((contracts) => ({
		queryKey: ["qurbanAnimals"],
		queryFn: () => contracts?.getQurbanAnimals(),
	}));

	const getSelectedAnimalData = () => {
		return qurbanAnimals?.[selectedCategory].find((animal) => animal.id === selectedAnimal);
	};
	const selectedAnimalData = useMemo(getSelectedAnimalData, [qurbanAnimals, selectedAnimal]);

	// Calculate meal portions and delivery costs
	const calculateMealDetails = () => {
		if (!selectedAnimalData) return { portions: 0, totalWeight: 0, deliveryFee: 0, processingFee: 0 };
		
		const weight = selectedAnimalData.weight;
		const meatYield = weight * 0.65; // ~65% meat yield
		const portions = Math.floor(meatYield / 0.5); // Each portion ~500g
		
		const selectedZone = deliveryZones.find(zone => zone.zone === deliveryZone);
		const deliveryFee = selectedZone ? selectedZone.baseFee + (meatYield * selectedZone.perKgFee) : 0;
		
		const processingOption = processingOptions.find(opt => opt.id === processingType);
		const processingFee = processingOption ? processingOption.additionalCost : 0;
		
		return {
			portions,
			totalWeight: meatYield,
			deliveryFee,
			processingFee
		};
	};

	const mealDetails = calculateMealDetails();
	const totalCost = selectedAnimalData ? 
		Number(displayTokenPrice(selectedAnimalData.pricePerShare)) + mealDetails.processingFee + mealDetails.deliveryFee : 0;

	return (
		<div className="min-h-screen islamic-pattern py-8 px-4">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-[#f0fdf4] mb-4">
						<Baby className="inline-block h-10 w-10 mr-3 text-[#d1b86a]" />
						Aqiqah Service
					</h1>
					<p className="text-[#f0fdf4]/70">Complete aqiqah service following Islamic traditions with professional processing and delivery</p>
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
					{/* Main Content */}
					<div className="lg:col-span-3 space-y-8">
						{/* Child Information */}
						<Card className="bg-[#0f2419] border-[#14532d]">
							<CardHeader>
								<CardTitle className="text-[#f0fdf4] flex items-center">
									<Heart className="h-5 w-5 mr-2 text-[#d1b86a]" />
									Child Information
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid md:grid-cols-2 gap-4">
									<div>
										<Label htmlFor="childName" className="text-[#f0fdf4]/70">Child's Name</Label>
										<Input
											id="childName"
											value={childName}
											onChange={(e) => setChildName(e.target.value)}
											placeholder="Enter child's name"
											className="bg-[#14532d] border-[#14532d] text-[#f0fdf4]"
										/>
									</div>
									<div>
										<Label htmlFor="childGender" className="text-[#f0fdf4]/70">Gender</Label>
										<Select value={childGender} onValueChange={(value: "boy" | "girl") => setChildGender(value)}>
											<SelectTrigger className="bg-[#14532d] border-[#14532d] text-[#f0fdf4]">
												<SelectValue placeholder="Select gender" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="boy">Boy (2 animals recommended)</SelectItem>
												<SelectItem value="girl">Girl (1 animal recommended)</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
								<div>
									<Label htmlFor="birthDate" className="text-[#f0fdf4]/70">Birth Date</Label>
									<Input
										id="birthDate"
										type="date"
										value={birthDate}
										onChange={(e) => setBirthDate(e.target.value)}
										className="bg-[#14532d] border-[#14532d] text-[#f0fdf4]"
									/>
								</div>
								{childGender && (
									<div className="p-3 bg-[#14532d]/30 rounded-lg">
										<div className="text-sm text-[#f0fdf4]/70">
											Islamic Guidance: For a {childGender}, it is recommended to sacrifice{" "}
											<span className="text-[#d1b86a] font-semibold">
												{childGender === "boy" ? "2 animals" : "1 animal"}
											</span>{" "}
											within 7 days of birth.
										</div>
									</div>
								)}
							</CardContent>
						</Card>

						{/* Animal Selection */}
						<Card className="bg-[#0f2419] border-[#14532d]">
							<CardHeader>
								<CardTitle className="text-[#f0fdf4]">Select Animal for Aqiqah</CardTitle>
							</CardHeader>
							<CardContent>
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
										🐐 Goats (Recommended)
									</Button>
									<Button
										onClick={() => setSelectedCategory("sheeps")}
										variant={selectedCategory === "sheeps" ? "default" : "outline"}
										className={
											selectedCategory === "sheeps"
												? "bg-[#14532d] text-[#d1b86a]"
												: "border-[#14532d] text-[#f0fdf4] hover:bg-[#14532d]/20 bg-transparent"
										}
									>
										🐑 Sheep (Alternative)
									</Button>
								</div>

								{/* Animal Grid */}
								{isLoading ? (
									<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
										{Array.from({ length: 6 }).map((_, idx) => (
											<Skeleton key={idx} className="w-full h-[400px]" />
										))}
									</div>
								) : (
									<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
										{qurbanAnimals?.[selectedCategory].map((animal) => (
											<Card
												key={animal.id}
												className={cn(`cursor-pointer transition-all duration-300`, {
													"border-[#d1b86a] bg-[#d1b86a]/10 glow-shadow": selectedAnimal === animal.id,
													"bg-[#0f2419] border-[#14532d] hover:border-[#d1b86a]/50": selectedAnimal !== animal.id,
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
															<Badge className="bg-[#14532d] text-[#d1b86a]">Excellent</Badge>
														</div>

														<div className="text-2xl font-bold text-[#d1b86a]">
															{formatCurrency(
																convertToSelectedCurrency(parseFloat(displayTokenPrice(animal.pricePerShare)))
															)}
														</div>

														<div className="space-y-2 text-sm">
															<div className="flex items-center text-[#f0fdf4]/70">
																<MapPin className="h-3 w-3 mr-1" />
																{animal.location}
															</div>
															<div className="flex items-center text-[#f0fdf4]/70">
																<Scale className="h-3 w-3 mr-1" />
																Weight: {animal.weight}kg • Age: {animal.age}
															</div>
														</div>

														<p className="text-xs text-[#f0fdf4]/60">{animal.description}</p>

														<div className="flex flex-wrap gap-1">
															{dummyFeatures.slice(0, 2).map((feature, index) => (
																<Badge key={index} variant="secondary" className="bg-[#14532d]/50 text-[#d1b86a] text-xs">
																	{feature}
																</Badge>
															))}
														</div>
													</div>
												</CardContent>
											</Card>
										))}
									</div>
								)}
							</CardContent>
						</Card>

						{/* Processing Options */}
						{selectedAnimalData && (
							<Card className="bg-[#0f2419] border-[#14532d]">
								<CardHeader>
									<CardTitle className="text-[#f0fdf4] flex items-center">
										<ChefHat className="h-5 w-5 mr-2 text-[#d1b86a]" />
										Meat Processing Options
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid md:grid-cols-2 gap-4 mb-6">
										{processingOptions.map((option) => (
											<Card
												key={option.id}
												className={cn(`cursor-pointer transition-all duration-300`, {
													"border-[#d1b86a] bg-[#d1b86a]/10": processingType === option.id,
													"bg-[#14532d]/30 border-[#14532d] hover:border-[#d1b86a]/50": processingType !== option.id,
												})}
												onClick={() => setProcessingType(option.id as "raw" | "cooked")}
											>
												<CardContent className="p-4">
													<div className="flex items-center space-x-3 mb-3">
														<div className="text-2xl">{option.icon}</div>
														<div>
															<h3 className="font-semibold text-[#f0fdf4]">{option.title}</h3>
															<p className="text-sm text-[#f0fdf4]/70">{option.description}</p>
														</div>
													</div>
													<div className="flex justify-between items-center">
														<span className="text-[#d1b86a] font-semibold">
															{option.additionalCost === 0 ? "No extra cost" : `+$${option.additionalCost}`}
														</span>
														<Badge variant="secondary" className="bg-[#14532d] text-[#d1b86a]">
															{option.estimatedDays}
														</Badge>
													</div>
												</CardContent>
											</Card>
										))}
									</div>

									{/* Meal Calculation */}
									<div className="p-4 bg-[#14532d]/30 rounded-lg">
										<h4 className="font-semibold text-[#f0fdf4] mb-3 flex items-center">
											<Calculator className="h-4 w-4 mr-2 text-[#d1b86a]" />
											Estimated Yield
										</h4>
										<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
											<div>
												<div className="text-[#f0fdf4]/70">Total Weight</div>
												<div className="font-semibold text-[#d1b86a]">{selectedAnimalData.weight}kg</div>
											</div>
											<div>
												<div className="text-[#f0fdf4]/70">Meat Yield</div>
												<div className="font-semibold text-[#d1b86a]">{mealDetails.totalWeight.toFixed(1)}kg</div>
											</div>
											<div>
												<div className="text-[#f0fdf4]/70">Meal Portions</div>
												<div className="font-semibold text-[#d1b86a]">{mealDetails.portions} portions</div>
											</div>
											<div>
												<div className="text-[#f0fdf4]/70">Serving Size</div>
												<div className="font-semibold text-[#d1b86a]">~500g each</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						)}

						{/* Distribution Options */}
						{selectedAnimalData && (
							<Card className="bg-[#0f2419] border-[#14532d]">
								<CardHeader>
									<CardTitle className="text-[#f0fdf4] flex items-center">
										<Users className="h-5 w-5 mr-2 text-[#d1b86a]" />
										Distribution Options
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="grid md:grid-cols-2 gap-4">
										<Card
											className={cn(`cursor-pointer transition-all duration-300`, {
												"border-[#d1b86a] bg-[#d1b86a]/10": distributionType === "personal",
												"bg-[#14532d]/30 border-[#14532d] hover:border-[#d1b86a]/50": distributionType !== "personal",
											})}
											onClick={() => setDistributionType("personal")}
										>
											<CardContent className="p-4">
												<div className="flex items-center space-x-3">
													<Package className="h-6 w-6 text-[#d1b86a]" />
													<div>
														<h3 className="font-semibold text-[#f0fdf4]">Personal Delivery</h3>
														<p className="text-sm text-[#f0fdf4]/70">Receive all meat at your address</p>
													</div>
												</div>
											</CardContent>
										</Card>

										<Card
											className={cn(`cursor-pointer transition-all duration-300`, {
												"border-[#d1b86a] bg-[#d1b86a]/10": distributionType === "charity",
												"bg-[#14532d]/30 border-[#14532d] hover:border-[#d1b86a]/50": distributionType !== "charity",
											})}
											onClick={() => setDistributionType("charity")}
										>
											<CardContent className="p-4">
												<div className="flex items-center space-x-3">
													<Heart className="h-6 w-6 text-[#d1b86a]" />
													<div>
														<h3 className="font-semibold text-[#f0fdf4]">Charity Distribution</h3>
														<p className="text-sm text-[#f0fdf4]/70">Share with those in need</p>
													</div>
												</div>
											</CardContent>
										</Card>
									</div>

									{distributionType === "charity" && (
										<div className="space-y-4">
											<div>
												<Label className="text-[#f0fdf4]/70">Charity Percentage</Label>
												<div className="flex items-center space-x-4 mt-2">
													<input
														type="range"
														min="10"
														max="100"
														step="10"
														value={charityPercentage}
														onChange={(e) => setCharityPercentage(Number(e.target.value))}
														className="flex-1"
													/>
													<span className="text-[#d1b86a] font-semibold min-w-[60px]">{charityPercentage}%</span>
												</div>
												<div className="text-sm text-[#f0fdf4]/60 mt-1">
													{charityPercentage}% to charity, {100 - charityPercentage}% for personal use
												</div>
											</div>
										</div>
									)}
								</CardContent>
							</Card>
						)}

						{/* Delivery Information */}
						{selectedAnimalData && (
							<Card className="bg-[#0f2419] border-[#14532d]">
								<CardHeader>
									<CardTitle className="text-[#f0fdf4] flex items-center">
										<Truck className="h-5 w-5 mr-2 text-[#d1b86a]" />
										Delivery Information
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div>
										<Label htmlFor="deliveryZone" className="text-[#f0fdf4]/70">Delivery Zone</Label>
										<Select value={deliveryZone} onValueChange={setDeliveryZone}>
											<SelectTrigger className="bg-[#14532d] border-[#14532d] text-[#f0fdf4]">
												<SelectValue placeholder="Select delivery zone" />
											</SelectTrigger>
											<SelectContent>
												{deliveryZones.map((zone) => (
													<SelectItem key={zone.zone} value={zone.zone}>
														{zone.zone} - {zone.areas.join(", ")} (${zone.baseFee} + ${zone.perKgFee}/kg)
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>

									<div>
										<Label htmlFor="deliveryAddress" className="text-[#f0fdf4]/70">Delivery Address</Label>
										<Textarea
											id="deliveryAddress"
											value={deliveryAddress}
											onChange={(e) => setDeliveryAddress(e.target.value)}
											placeholder="Enter complete delivery address"
											className="bg-[#14532d] border-[#14532d] text-[#f0fdf4]"
											rows={3}
										/>
									</div>

									<div>
										<Label htmlFor="deliveryNotes" className="text-[#f0fdf4]/70">Delivery Notes (Optional)</Label>
										<Textarea
											id="deliveryNotes"
											value={deliveryNotes}
											onChange={(e) => setDeliveryNotes(e.target.value)}
											placeholder="Special instructions for delivery"
											className="bg-[#14532d] border-[#14532d] text-[#f0fdf4]"
											rows={2}
										/>
									</div>

									{deliveryZone && (
										<div className="p-3 bg-[#14532d]/30 rounded-lg">
											<div className="text-sm">
												<div className="flex justify-between text-[#f0fdf4]/70 mb-1">
													<span>Base delivery fee:</span>
													<span>${deliveryZones.find(z => z.zone === deliveryZone)?.baseFee}</span>
												</div>
												<div className="flex justify-between text-[#f0fdf4]/70 mb-1">
													<span>Weight-based fee:</span>
													<span>${(mealDetails.totalWeight * (deliveryZones.find(z => z.zone === deliveryZone)?.perKgFee || 0)).toFixed(2)}</span>
												</div>
												<Separator className="bg-[#14532d] my-2" />
												<div className="flex justify-between text-[#d1b86a] font-semibold">
													<span>Total delivery fee:</span>
													<span>${mealDetails.deliveryFee.toFixed(2)}</span>
												</div>
											</div>
										</div>
									)}
								</CardContent>
							</Card>
						)}
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* Order Summary */}
						{selectedAnimalData && (
							<Card className="bg-[#0f2419] border-[#14532d]">
								<CardHeader>
									<CardTitle className="text-[#f0fdf4] text-sm">Order Summary</CardTitle>
								</CardHeader>
								<CardContent className="space-y-3">
									<div className="flex justify-between text-sm">
										<span className="text-[#f0fdf4]/70">Animal ({selectedAnimalData.name}):</span>
										<span className="text-[#f0fdf4]">
											${parseFloat(displayTokenPrice(selectedAnimalData.pricePerShare)).toFixed(2)}
										</span>
									</div>
									{mealDetails.processingFee > 0 && (
										<div className="flex justify-between text-sm">
											<span className="text-[#f0fdf4]/70">Processing fee:</span>
											<span className="text-[#f0fdf4]">${mealDetails.processingFee}</span>
										</div>
									)}
									{mealDetails.deliveryFee > 0 && (
										<div className="flex justify-between text-sm">
											<span className="text-[#f0fdf4]/70">Delivery fee:</span>
											<span className="text-[#f0fdf4]">${mealDetails.deliveryFee.toFixed(2)}</span>
										</div>
									)}
									<Separator className="bg-[#14532d]" />
									<div className="flex justify-between font-semibold">
										<span className="text-[#f0fdf4]">Total:</span>
										<span className="text-[#d1b86a]">${totalCost.toFixed(2)}</span>
									</div>

									{selectedAnimalData && deliveryZone && deliveryAddress && childName && (
										<PaymentModal
											amount={BigInt(Math.floor(totalCost * 1000000))}
											type="aqiqah"
											animalId={selectedAnimalData.id}
											title={`Aqiqah - ${selectedAnimalData.name}`}
										>
											<Button className="w-full bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] glow-shadow">
												<Wallet className="h-4 w-4 mr-2" />
												Complete Aqiqah Order
											</Button>
										</PaymentModal>
									)}
								</CardContent>
							</Card>
						)}

						{/* Process Timeline */}
						<Card className="bg-[#0f2419] border-[#14532d]">
							<CardHeader>
								<CardTitle className="text-[#f0fdf4] text-sm">Aqiqah Process</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3 text-sm">
									<div className="flex items-start space-x-3">
										<Baby className="h-4 w-4 text-[#d1b86a] mt-0.5" />
										<div>
											<div className="text-[#f0fdf4] font-medium">Islamic Niyyah</div>
											<div className="text-[#f0fdf4]/60">Proper intention according to Sunnah</div>
										</div>
									</div>
									<div className="flex items-start space-x-3">
										<ScrollText className="h-4 w-4 text-[#d1b86a] mt-0.5" />
										<div>
											<div className="text-[#f0fdf4] font-medium">Halal Slaughter</div>
											<div className="text-[#f0fdf4]/60">Following Islamic guidelines</div>
										</div>
									</div>
									<div className="flex items-start space-x-3">
										<ChefHat className="h-4 w-4 text-[#d1b86a] mt-0.5" />
										<div>
											<div className="text-[#f0fdf4] font-medium">Professional Processing</div>
											<div className="text-[#f0fdf4]/60">Expert meat preparation</div>
										</div>
									</div>
									<div className="flex items-start space-x-3">
										<Package className="h-4 w-4 text-[#d1b86a] mt-0.5" />
										<div>
											<div className="text-[#f0fdf4] font-medium">Careful Packaging</div>
											<div className="text-[#f0fdf4]/60">Hygienic & temperature-controlled</div>
										</div>
									</div>
									<div className="flex items-start space-x-3">
										<Truck className="h-4 w-4 text-[#d1b86a] mt-0.5" />
										<div>
											<div className="text-[#f0fdf4] font-medium">Delivery</div>
											<div className="text-[#f0fdf4]/60">To your address or charity</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* NFT Certificate Preview */}
						<Card className="bg-[#0f2419] border-[#14532d]">
							<CardHeader>
								<CardTitle className="text-[#f0fdf4] text-sm">Aqiqah Certificate</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="aspect-square bg-gradient-to-br from-[#14532d] to-[#0f2419] rounded-lg p-4 border border-[#d1b86a]/30">
									<div className="text-center h-full flex flex-col justify-center">
										<Award className="h-12 w-12 text-[#d1b86a] mx-auto mb-2 crescent-shadow" />
										<div className="text-xs text-[#f0fdf4]/70 mb-1">QRBN Certificate</div>
										<div className="text-sm font-semibold text-[#d1b86a]">Aqiqah 2025</div>
										<div className="text-xs text-[#f0fdf4]/50 mt-2">
											{childName ? `For ${childName}` : "Child's name"}
										</div>
										<div className="text-xs text-[#f0fdf4]/50">Will be minted upon completion</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Community Impact */}
						<Card className="bg-[#0f2419] border-[#14532d]">
							<CardHeader>
								<CardTitle className="text-[#f0fdf4] text-sm">Blessed Impact</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3 text-sm">
									<div className="flex items-center">
										<Heart className="h-4 w-4 text-[#d1b86a] mr-2" />
										<span className="text-[#f0fdf4]/70">847 children blessed</span>
									</div>
									<div className="flex items-center">
										<Users className="h-4 w-4 text-[#d1b86a] mr-2" />
										<span className="text-[#f0fdf4]/70">1,234 families helped</span>
									</div>
									<div className="text-xs text-[#f0fdf4]/50">
										Your aqiqah follows the blessed Sunnah and helps provide for those in need
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