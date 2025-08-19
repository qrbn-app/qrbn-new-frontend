"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calculator, Wallet, Heart, Users, Home, Loader2 } from "lucide-react";
import { PaymentModal } from "@/components/payment-modal";
import { useContracts } from "@/hooks/use-contracts";
import { useAccount } from "wagmi";
import { useCurrency } from "@/components/providers/currency-provider";
import axios from "axios";

// Zakat types according to Islamic Shariah
interface ZakatType {
	id: string;
	name: string;
	description: string;
	nisabThreshold: number;
	rate: number;
	unit: string;
}

// Islamic jurisprudence paths
interface IslamicPath {
	id: string;
	name: string;
	description: string;
	nisabMultiplier: number; // multiplier for nisab calculations
	rateMultiplier: number; // multiplier for zakat rates
}

const islamicPaths: IslamicPath[] = [
	{
		id: "sunni",
		name: "Sunni (Hanafi/Shafi'i/Maliki/Hanbali)",
		description: "Standard Sunni jurisprudence - most widely followed",
		nisabMultiplier: 1.0,
		rateMultiplier: 1.0,
	},
	{
		id: "shia",
		name: "Shia (Twelver/Imami)",
		description: "Shia jurisprudence with some variations in calculation",
		nisabMultiplier: 1.0,
		rateMultiplier: 1.0,
	},
	{
		id: "ibadi",
		name: "Ibadi",
		description: "Ibadi school with specific interpretations",
		nisabMultiplier: 1.0,
		rateMultiplier: 1.0,
	},
];

const zakatTypes: ZakatType[] = [
	{
		id: "income",
		name: "Income Zakat",
		description: "Salary, business income, and professional earnings",
		nisabThreshold: 5667, // Base USD equivalent to 85g gold
		rate: 2.5,
		unit: "USD", // Will be converted dynamically
	},
	{
		id: "trade",
		name: "Trade Zakat",
		description: "Commercial inventory, business assets, and trade goods",
		nisabThreshold: 5667, // Base USD equivalent to 85g gold
		rate: 2.5,
		unit: "USD", // Will be converted dynamically
	},
	{
		id: "savings",
		name: "Savings Zakat",
		description: "Bank deposits, cash savings, and liquid assets",
		nisabThreshold: 5667, // Base USD equivalent to 85g gold
		rate: 2.5,
		unit: "USD", // Will be converted dynamically
	},
	{
		id: "gold-silver",
		name: "Gold & Silver Zakat",
		description: "Precious metals, jewelry, and gold/silver investments",
		nisabThreshold: 5667, // Base USD equivalent to 85g gold
		rate: 2.5,
		unit: "USD", // Will be converted dynamically
	},
	{
		id: "agriculture",
		name: "Agricultural Zakat",
		description: "Crops, fruits, and agricultural produce",
		nisabThreshold: 3400, // Base USD equivalent to 653kg of staple crops
		rate: 5, // 5% for rain-fed, 10% for irrigated (simplified to 5%)
		unit: "USD", // Will be converted dynamically
	},
];

export default function ZakatPage() {
	// Zakat Maal states
	const [selectedZakatType, setSelectedZakatType] = useState<ZakatType>(zakatTypes[0]);
	const [wealth, setWealth] = useState("");
	const [calculatedZakat, setCalculatedZakat] = useState(0);
	const { currency, convertToSelectedCurrency, formatCurrency } = useCurrency();

	const fitrahAmountUSD = 2.33; // Base amount in USD per person for Zakat Fitrah (equivalent to 2.5kg rice)

	// Zakat Fitrah states
	const [peopleCount, setPeopleCount] = useState("1");
	const [zakatFitrahTotal, setZakatFitrahTotal] = useState(() => convertToSelectedCurrency(fitrahAmountUSD));

	// Income Zakat specific states
	const [monthlyIncome, setMonthlyIncome] = useState("");
	const [otherIncome, setOtherIncome] = useState("");
	const [expenses, setExpenses] = useState(""); // New expense field
	const [hasDeductions, setHasDeductions] = useState(false);
	const [isObligatedToPay, setIsObligatedToPay] = useState(false);
	const [incomeType, setIncomeType] = useState("monthly"); // "monthly" or "yearly"

	// Islamic path selection
	const [selectedIslamicPath, setSelectedIslamicPath] = useState<IslamicPath>(islamicPaths[0]);
	const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

	// Gold price and nisab states
	const [goldPriceUSD, setGoldPriceUSD] = useState<number>(3336.045); // Default fallback price
	const [nisabThreshold, setNisabThreshold] = useState<number>(() => {
		// Calculate initial nisab based on default gold price
		return (3336.045 / 31.1035) * 85; // 85g of gold
	});
	const [goldPriceLoading, setGoldPriceLoading] = useState(false);
	const [isUsingLiveData, setIsUsingLiveData] = useState(false);

	// Constants
	const NISAB_GOLD_GRAMS = 85; // 85 grams of gold for nisab threshold
	const [zakatPool, setZakatPool] = useState<number>(0);
	const [loading, setLoading] = useState(false);

	const contracts = useContracts();
	const { isConnected } = useAccount();

	// Function to fetch real-time gold price
	const fetchGoldPrice = async () => {
		setGoldPriceLoading(true);
		try {
			const apiToken = process.env.NEXT_PUBLIC_GOLD_API_TOKEN;

			if (!apiToken || apiToken === "your-access-token-here") {
				console.warn("Gold API token not configured. Using fallback gold price.");
				// Use fallback calculation with default gold price
				const fallbackNisab = (goldPriceUSD / 31.1035) * NISAB_GOLD_GRAMS;
				setNisabThreshold(fallbackNisab);
				setGoldPriceLoading(false);
				return;
			}

			const response = await axios.get("https://www.goldapi.io/api/XAU/USD", {
				headers: {
					"x-access-token": apiToken,
				},
			});

			if (response.data && response.data.price) {
				const currentGoldPrice = response.data.price;
				setGoldPriceUSD(currentGoldPrice);
				setIsUsingLiveData(true);

				// Calculate nisab threshold: 85g of gold in USD
				const calculatedNisab = (currentGoldPrice / 31.1035) * NISAB_GOLD_GRAMS; // Convert oz to grams
				setNisabThreshold(calculatedNisab);

				console.log(`Gold price updated: $${currentGoldPrice}/oz, Nisab threshold: $${calculatedNisab.toFixed(2)}`);
			}
		} catch (error) {
			console.error("Failed to fetch gold price:", error);
			// Use fallback calculation if API fails
			const fallbackNisab = (goldPriceUSD / 31.1035) * NISAB_GOLD_GRAMS;
			setNisabThreshold(fallbackNisab);
		} finally {
			setGoldPriceLoading(false);
		}
	};

	// Load contract data and gold price on component mount
	useEffect(() => {
		loadContractData();
		fetchGoldPrice();

		// Set up interval to update gold price every 5 minutes
		const goldPriceInterval = setInterval(fetchGoldPrice, 5 * 60 * 1000);

		return () => clearInterval(goldPriceInterval);
	}, [contracts, isConnected]);

	// Update Zakat Fitrah total when currency changes
	useEffect(() => {
		calculateZakatFitrah(peopleCount);
	}, [currency, peopleCount, convertToSelectedCurrency]);
	const loadContractData = async () => {
		if (!contracts) return;

		setLoading(true);
		try {
			// Only load zakat pool data from contract
			const pool = await contracts.getZakatPoolInfo();

			// Convert from contract format to USDT
			const poolInUSDT = parseFloat(pool.availableBalance || "0");
			setZakatPool(poolInUSDT);
		} catch (error) {
			console.error("Error loading contract data:", error);
			// Set pool to 0 on error
			setZakatPool(0);
		} finally {
			setLoading(false);
		}
	};

	const onSelectZakatType = (id: string) => {
		setSelectedZakatType(zakatTypes.find((z) => z.id === id)!);
	};

	const getCurrentZakatType = (): ZakatType => {
		const baseType = zakatTypes.find((type) => type.id === selectedZakatType.id) || zakatTypes[0];

		// Use dynamic nisab threshold for gold-based calculations (income, trade, savings, gold-silver)
		// Agriculture uses a different threshold based on crops (653kg staple crops ≈ $3,400)
		const dynamicNisabUSD = baseType.id === "agriculture" ? 3400 : nisabThreshold;

		// Convert nisab to selected currency
		const convertedNisab = convertToSelectedCurrency(dynamicNisabUSD);

		// Apply Islamic path multipliers
		return {
			...baseType,
			nisabThreshold: convertedNisab * selectedIslamicPath.nisabMultiplier,
			rate: baseType.rate * selectedIslamicPath.rateMultiplier,
			unit: currency, // Use selected currency
		};
	};
	const validateInput = (value: number, min: number): boolean => {
		return value >= min;
	};

	const calculateZakatMaal = () => {
		const currentType = getCurrentZakatType();
		let totalAnnualIncome = 0;

		if (currentType.id === "income") {
			// For Income Zakat, calculate from income input based on selected type
			const primaryIncome = parseFloat(monthlyIncome) || 0;
			const other = parseFloat(otherIncome) || 0;

			if (incomeType === "monthly") {
				totalAnnualIncome = primaryIncome * 12 + other;
			} else {
				// yearly income type
				totalAnnualIncome = primaryIncome + other;
			}
		} else {
			// For other types, use the wealth input
			totalAnnualIncome = parseFloat(wealth) || 0;
		}

		// Update payment obligation status for income zakat
		if (currentType.id === "income") {
			// Calculate taxable income to check against nisab
			let checkableIncome = totalAnnualIncome;
			if (hasDeductions) {
				const expenseAmount = parseFloat(expenses) || 0;
				checkableIncome = totalAnnualIncome - expenseAmount;
			} else {
				const deduction = Math.min(totalAnnualIncome * 0.2, 50000);
				checkableIncome = totalAnnualIncome - deduction;
			}
			setIsObligatedToPay(Math.max(0, checkableIncome) >= currentType.nisabThreshold);
		}

		// Apply deduction logic for income zakat if applicable
		let taxableIncome = totalAnnualIncome;
		if (currentType.id === "income") {
			if (hasDeductions) {
				// When deductions are on, subtract manual expenses
				const expenseAmount = parseFloat(expenses) || 0;
				taxableIncome = totalAnnualIncome - expenseAmount;
				// Ensure taxable income is not negative
				taxableIncome = Math.max(0, taxableIncome);
			} else {
				// Apply 20% deduction for work-related expenses (max based on regulations)
				const deduction = Math.min(totalAnnualIncome * 0.2, 50000); // Max $50,000 USDT deduction
				taxableIncome = totalAnnualIncome - deduction;
			}
		}

		if (!validateInput(taxableIncome, currentType.nisabThreshold)) {
			console.error("Invalid income/wealth input: below nisab threshold");
			setCalculatedZakat(0);
			return;
		}

		const zakatAmount = taxableIncome * (currentType.rate / 100);
		setCalculatedZakat(zakatAmount);
	};

	const calculateZakatFitrah = (count: string) => {
		const people = Number.parseInt(count) || 1;
		if (!validateInput(people, 1)) {
			console.error("Invalid people count input");
			setZakatFitrahTotal(0);
			return;
		}

		// Convert fitrah amount to selected currency
		const convertedFitrahAmount = convertToSelectedCurrency(fitrahAmountUSD);
		setZakatFitrahTotal(people * convertedFitrahAmount);
	};

	return (
		<div className="min-h-screen islamic-pattern py-8 px-4">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-[#f0fdf4] mb-4">Zakat Donation</h1>
					<p className="text-[#f0fdf4]/70">Fulfill your religious obligation with transparency</p>
					{/* {isConnected && (
            <div className="mt-4 flex justify-center">
              <Button
                size="sm"
                variant="outline"
                onClick={loadContractData}
                disabled={loading}
                className="border-[#14532d] text-[#f0fdf4] hover:bg-[#14532d]/20"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  "🔄"
                )}
                {loading ? "Loading..." : "Refresh Rates"}
              </Button>
            </div>
          )} */}
				</div>

				<div className="grid lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2">
						{/* Advanced Options */}
						{/* <div className="mb-6">
							<div className="flex items-center justify-between">
								<h3 className="text-lg font-semibold text-[#f0fdf4]">Islamic Jurisprudence Settings</h3>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
									className="text-[#d1b86a] hover:bg-[#14532d]/20"
								>
									{showAdvancedOptions ? "Hide Advanced" : "Show Advanced"}
								</Button>
							</div>

							{showAdvancedOptions && (
								<Card className="mt-4 bg-[#0f2419] border-[#14532d]">
									<CardContent className="pt-6">
										<div>
											<Label htmlFor="islamicPath" className="text-[#f0fdf4]">
												Islamic Jurisprudence School
											</Label>
											<Select
												value={selectedIslamicPath.id}
												onValueChange={(id) => setSelectedIslamicPath(islamicPaths.find((p) => p.id === id)!)}
											>
												<SelectTrigger className="bg-[#14532d] border-[#14532d] text-[#f0fdf4] mt-2">
													<SelectValue>{selectedIslamicPath.name}</SelectValue>
												</SelectTrigger>
												<SelectContent className="bg-[#0f2419] border-[#14532d]">
													{islamicPaths.map((path) => (
														<SelectItem key={path.id} value={path.id} className="text-[#f0fdf4] hover:bg-[#14532d]">
															<div>
																<div className="font-medium">{path.name}</div>
																<div className="text-xs text-[#f0fdf4]/60">{path.description}</div>
															</div>
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<p className="text-xs text-[#f0fdf4]/50 mt-2">
												Different Islamic schools may have slight variations in zakat calculations and interpretations.
											</p>
										</div>
									</CardContent>
								</Card>
							)}
						</div> */}

						<Tabs defaultValue="maal" className="space-y-6">
							<TabsList className="grid w-full grid-cols-2 bg-[#0f2419] border border-[#14532d]">
								<TabsTrigger value="maal" className="data-[state=active]:bg-[#14532d] data-[state=active]:text-[#d1b86a]">
									Wealth Zakat
								</TabsTrigger>
								<TabsTrigger value="fitrah" className="data-[state=active]:bg-[#14532d] data-[state=active]:text-[#d1b86a]">
									Fitrah Zakat
								</TabsTrigger>
							</TabsList>

							<TabsContent value="maal">
								{/* Gold Price and Nisab Information */}
								<div className="mb-6">
									<Card className="bg-[#0f2419] border-[#14532d]">
										<CardContent className="pt-6">
											<div className="flex items-center justify-between mb-4">
												<h3 className="text-lg font-semibold text-[#f0fdf4] flex items-center">
													<Wallet className="h-5 w-5 mr-2 text-[#d1b86a]" />
													Live Nisab Threshold
												</h3>
												<Button
													variant="ghost"
													size="sm"
													onClick={fetchGoldPrice}
													disabled={goldPriceLoading}
													className="text-[#d1b86a] hover:bg-[#14532d]/20"
												>
													{goldPriceLoading ? (
														<>
															<Loader2 className="h-4 w-4 mr-2 animate-spin" />
															Updating...
														</>
													) : (
														"Refresh Gold Price"
													)}
												</Button>
											</div>

											<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
												<div className="text-center p-3 bg-[#14532d]/30 rounded-lg border border-[#14532d]">
													<div className="text-sm text-[#f0fdf4]/60">Current Gold Price</div>
													<div className="text-lg font-semibold text-[#d1b86a]">${goldPriceUSD.toFixed(2)}/oz</div>
													{!isUsingLiveData && (
														<Badge variant="secondary" className="mt-1 text-xs bg-yellow-600/20 text-yellow-300">
															Fallback
														</Badge>
													)}
													{isUsingLiveData && (
														<Badge variant="secondary" className="mt-1 text-xs bg-green-600/20 text-green-300">
															Live
														</Badge>
													)}
												</div>{" "}
												<div className="text-center p-3 bg-[#14532d]/30 rounded-lg border border-[#14532d]">
													<div className="text-sm text-[#f0fdf4]/60">Nisab (85g Gold)</div>
													<div className="text-lg font-semibold text-[#d1b86a]">
														{formatCurrency(convertToSelectedCurrency(nisabThreshold))}
													</div>
												</div>
												<div className="text-center p-3 bg-[#14532d]/30 rounded-lg border border-[#14532d]">
													<div className="text-sm text-[#f0fdf4]/60">Zakat Rate</div>
													<div className="text-lg font-semibold text-[#d1b86a]">{getCurrentZakatType().rate}%</div>
												</div>
											</div>

											<p className="text-xs text-[#f0fdf4]/50 mt-4 text-center">
												Nisab threshold is calculated based on {isUsingLiveData ? "live" : "fallback"} gold prices (85 grams
												of gold) {isUsingLiveData ? "and updates every 5 minutes" : "from goldapi.io"}. Values are displayed
												in {currency} for your convenience.
											</p>
										</CardContent>
									</Card>
								</div>
								<Card className="bg-[#0f2419] border-[#14532d]">
									<CardHeader>
										<CardTitle className="text-[#f0fdf4] flex items-center">
											<Calculator className="h-5 w-5 mr-2 text-[#d1b86a]" />
											Wealth Zakat Calculator
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-6">
										<div>
											<Label htmlFor="zakatType" className="text-[#f0fdf4]">
												Zakat Type
											</Label>
											<Select value={selectedZakatType.id} onValueChange={onSelectZakatType}>
												<SelectTrigger className="bg-[#14532d] border-[#14532d] text-[#f0fdf4] mt-2 text-left">
													<div>{selectedZakatType.name}</div>
												</SelectTrigger>
												<SelectContent className="bg-[#0f2419] border-[#14532d]">
													{zakatTypes.map((type) => (
														<SelectItem key={type.id} value={type.id} className="text-[#f0fdf4] hover:bg-[#14532d]">
															<div>
																<div className="font-medium">{type.name}</div>
																<div className="text-xs text-[#f0fdf4]/60">{type.description}</div>
															</div>
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>

										{/* Income Zakat Specific Interface */}
										{selectedZakatType.id === "income" ? (
											<div className="space-y-6">
												{/* Income Type Selection */}
												<div>
													<Label className="text-[#f0fdf4] font-semibold mb-3 block">Income Calculation Period</Label>
													<RadioGroup value={incomeType} onValueChange={setIncomeType} className="flex space-x-6">
														<div className="flex items-center space-x-2">
															<RadioGroupItem
																value="monthly"
																id="monthly"
																className="border-[#d1b86a] text-[#d1b86a]"
															/>
															<Label htmlFor="monthly" className="text-[#f0fdf4] cursor-pointer">
																Monthly
															</Label>
														</div>
														<div className="flex items-center space-x-2">
															<RadioGroupItem value="yearly" id="yearly" className="border-[#d1b86a] text-[#d1b86a]" />
															<Label htmlFor="yearly" className="text-[#f0fdf4] cursor-pointer">
																Yearly
															</Label>
														</div>
													</RadioGroup>
												</div>

												{/* Monthly Income */}
												<div>
													<Label htmlFor="monthlyIncome" className="text-[#f0fdf4] font-semibold">
														{incomeType === "monthly" ? "Monthly Income" : "Yearly Income"}*
													</Label>
													<Input
														id="monthlyIncome"
														type="number"
														placeholder={
															incomeType === "monthly"
																? "Enter your monthly income in " + currency
																: "Enter your yearly income in " + currency
														}
														value={monthlyIncome}
														onChange={(e) => setMonthlyIncome(e.target.value)}
														className="bg-[#14532d] border-[#14532d] text-[#f0fdf4] mt-2"
													/>
												</div>

												<details>
													<summary>Show advance options</summary>
													<div className="space-y-6 mt-6">
														{/* Other Income */}
														<div>
															<Label htmlFor="otherIncome" className="text-[#f0fdf4] font-semibold">
																Additional Income (Bonus, Benefits)
															</Label>
															<Input
																id="otherIncome"
																type="number"
																placeholder="Optional, if applicable"
																value={otherIncome}
																onChange={(e) => setOtherIncome(e.target.value)}
																className="bg-[#14532d] border-[#14532d] text-[#f0fdf4] mt-2"
															/>
														</div>

														{/* Deduction Toggle */}
														<div className="flex items-center justify-between p-4 bg-orange-500/20 rounded-lg border border-orange-500/30">
															<div>
																<span className="text-orange-200 font-medium">
																	Apply work-related deductions for cautious calculation
																</span>
															</div>
															<Switch
																checked={hasDeductions}
																onCheckedChange={setHasDeductions}
																className="data-[state=checked]:bg-orange-500"
															/>
														</div>

														{/* Expense Input - Only show when deductions are on */}
														{hasDeductions && (
															<div>
																<Label htmlFor="expenses" className="text-[#f0fdf4]">
																	Expenses ({currency})
																</Label>
																<Input
																	id="expenses"
																	type="number"
																	placeholder={`Enter your expenses in ${currency}`}
																	value={expenses}
																	onChange={(e) => setExpenses(e.target.value)}
																	className="bg-[#14532d] border-[#14532d] text-[#f0fdf4] mt-2"
																/>
																<p className="text-xs text-[#f0fdf4]/50 mt-1">
																	Optional: Enter your work-related or other deductible expenses
																</p>
															</div>
														)}
													</div>
												</details>

												{/* Payment Obligation */}
												<div className="p-4 bg-[#14532d]/30 rounded-lg">
													<div className="text-[#f0fdf4] font-semibold mb-2">Payment Obligation</div>
													<div className="text-red-400 text-sm">
														{isObligatedToPay
															? "Required to Pay Zakat"
															: "Not Required to Pay Zakat, but Can Give Charity"}
													</div>
												</div>

												{/* Total Display */}
												{/* <div className="p-6 bg-gradient-to-r from-[#14532d] to-[#1a3a1f] rounded-lg border border-[#d1b86a]/30">
													<div className="text-center">
														<div className="text-2xl font-bold text-[#f0fdf4] mb-2">Total</div>
														<div className="text-4xl font-bold text-[#d1b86a]">
															{calculatedZakat > 0 ? calculatedZakat.toFixed(2) : "0.00"}
														</div>
														<div className="text-sm text-[#f0fdf4]/70 mt-2">{currency}</div>
													</div>
												</div> */}
											</div>
										) : (
											/* Other Zakat Types Interface */
											<div>
												<Label htmlFor="wealth" className="text-[#f0fdf4]">
													Total Wealth Yearly ({getCurrentZakatType().unit})
												</Label>
												<Input
													id="wealth"
													type="number"
													value={wealth}
													onChange={(e) => setWealth(e.target.value)}
													className="bg-[#14532d] border-[#14532d] text-[#f0fdf4] mt-2"
												/>
												<p className="text-xs text-[#f0fdf4]/50 mt-1">
													Minimum nisab: {getCurrentZakatType().nisabThreshold.toLocaleString()}{" "}
													{getCurrentZakatType().unit} | Rate: {getCurrentZakatType().rate}%
												</p>
											</div>
										)}

										<Button onClick={calculateZakatMaal} className="bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4]">
											Calculate Zakat
										</Button>

										{calculatedZakat > 0 && (
											<div className="p-4 rounded-lg border border-[#d1b86a]/30">
												<div className="text-center">
													<p className="text-[#f0fdf4]/70 mb-2">Your {getCurrentZakatType().name} Amount:</p>
													<p className="text-3xl font-bold text-[#d1b86a]">{formatCurrency(calculatedZakat)}</p>
													<p className="text-xs text-[#f0fdf4]/50 mt-1">
														{getCurrentZakatType().rate}% of{" "}
														{selectedZakatType.id === "income" ? "annual income" : "wealth"} above nisab
													</p>
													{selectedZakatType.id === "income" && (
														<div className="mt-2 text-xs text-[#f0fdf4]/60">
															{incomeType === "monthly"
																? `Monthly: ${formatCurrency(parseFloat(monthlyIncome) || 0)}`
																: `Yearly: ${formatCurrency(parseFloat(monthlyIncome) || 0)}`}
															{otherIncome && parseFloat(otherIncome) > 0 && (
																<span> + Additional: {formatCurrency(parseFloat(otherIncome) || 0)}</span>
															)}
															{hasDeductions && expenses && parseFloat(expenses) > 0 && (
																<span className="text-red-300">
																	{" "}
																	- Expenses: {formatCurrency(parseFloat(expenses) || 0)}
																</span>
															)}
															{!hasDeductions && (
																<span className="text-orange-300"> (with automatic deductions applied)</span>
															)}
															{hasDeductions && expenses && parseFloat(expenses) > 0 && (
																<span className="text-blue-300"> (with manual expenses deducted)</span>
															)}
														</div>
													)}
												</div>
											</div>
										)}

										{/* Show validation messages based on zakat type */}
										{selectedZakatType.id === "income"
											? // For income, calculate total annual income based on type and expenses
											  (monthlyIncome || otherIncome) &&
											  (() => {
													const primaryIncome = parseFloat(monthlyIncome) || 0;
													const other = parseFloat(otherIncome) || 0;
													const expenseAmount = parseFloat(expenses) || 0;
													const totalAnnual = incomeType === "monthly" ? primaryIncome * 12 + other : primaryIncome + other;
													// Calculate taxable income considering expenses if deductions are on
													const taxableIncome = hasDeductions ? totalAnnual - expenseAmount : totalAnnual;
													return taxableIncome > 0 && taxableIncome < getCurrentZakatType().nisabThreshold;
											  })() && (
													<div className="p-4 bg-red-500/20 rounded-lg border border-red-500/30">
														<div className="text-center">
															<p className="text-red-200 text-sm mb-2">
																{hasDeductions
																	? "Taxable Income Below Nisab Threshold"
																	: "Income Below Nisab Threshold"}
															</p>
															<p className="text-red-100 text-xs">
																Your{" "}
																{hasDeductions
																	? "taxable income (after expenses)"
																	: "annual income (after deductions)"}{" "}
																(
																{(() => {
																	const primaryIncome = parseFloat(monthlyIncome) || 0;
																	const other = parseFloat(otherIncome) || 0;
																	const expenseAmount = parseFloat(expenses) || 0;
																	const totalAnnual =
																		incomeType === "monthly" ? primaryIncome * 12 + other : primaryIncome + other;
																	const taxableIncome = hasDeductions ? totalAnnual - expenseAmount : totalAnnual;

																	console.log(taxableIncome);
																	return formatCurrency(Math.max(0, taxableIncome));
																})()}
																) is below the nisab threshold ({formatCurrency(getCurrentZakatType().nisabThreshold)}
																). Zakat is not obligatory for income below this amount.
															</p>
														</div>
													</div>
											  )
											: // For other types, check wealth input
											  wealth &&
											  parseFloat(wealth) > 0 &&
											  parseFloat(wealth) < getCurrentZakatType().nisabThreshold && (
													<div className="p-4 bg-red-500/20 rounded-lg border border-red-500/30">
														<div className="text-center">
															<p className="text-red-200 text-sm mb-2">Wealth Below Nisab Threshold</p>
															<p className="text-red-100 text-xs">
																Your wealth ({formatCurrency(parseFloat(wealth))}) is below the nisab threshold (
																{formatCurrency(getCurrentZakatType().nisabThreshold)}). Zakat is not obligatory for
																wealth below this amount.
															</p>
														</div>
													</div>
											  )}

										{/* {calculatedZakat > 0 && (
											<div className="mt-4 p-3 bg-[#0f2419] rounded-lg border border-[#14532d]">
												<div className="text-sm text-[#f0fdf4]/70 mb-1">Payment in {getCurrentZakatType().unit}:</div>
												<div className="text-lg font-semibold text-[#d1b86a]">
													${calculatedZakat.toFixed(2)} {getCurrentZakatType().unit}
												</div>
												<div className="text-xs text-[#f0fdf4]/50">Direct payment in USD Tether stablecoin</div>
											</div>
										)} */}

										<div className="space-y-4">
											{/* <h3 className="text-lg font-semibold text-[#f0fdf4]">Payment Details</h3>
											<div className="flex justify-between items-center">
												<span className="text-[#f0fdf4]/70">{getCurrentZakatType().name}:</span>
												<span className="text-[#d1b86a] font-bold">{formatCurrency(calculatedZakat)}</span>
											</div>
											<Separator className="bg-[#14532d]" />
											<div className="flex justify-between items-center text-lg font-semibold">
												<span className="text-[#f0fdf4]">Total:</span>
												<span className="text-[#d1b86a]">{formatCurrency(calculatedZakat)}</span>
											</div> */}

											<PaymentModal
												amount={BigInt(Math.floor(calculatedZakat * 1000000))}
												type={`zakat-${selectedZakatType.id}`}
												title={`${getCurrentZakatType().name} Payment`}
											>
												<Button
													className="w-full bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] glow-shadow"
													disabled={calculatedZakat === 0}
												>
													<Wallet className="h-4 w-4 mr-2" />
													Pay {getCurrentZakatType().name}
												</Button>
											</PaymentModal>
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value="fitrah">
								<Card className="bg-[#0f2419] border-[#14532d]">
									<CardHeader>
										<CardTitle className="text-[#f0fdf4]">Fitrah Zakat</CardTitle>
									</CardHeader>
									<CardContent className="space-y-6">
										<div className="p-4 bg-[#14532d]/30 rounded-lg border border-[#d1b86a]/30">
											<div className="text-center">
												<p className="text-[#f0fdf4]/70 mb-2">Fitrah Zakat per person:</p>
												<p className="text-3xl font-bold text-[#d1b86a]">
													{formatCurrency(convertToSelectedCurrency(fitrahAmountUSD))}
												</p>
												<p className="text-xs text-[#f0fdf4]/50 mt-1">Equivalent to 2.5kg rice</p>
											</div>
										</div>

										<div>
											<Label htmlFor="people" className="text-[#f0fdf4]">
												Number of People
											</Label>
											<Input
												id="people"
												type="number"
												placeholder="Enter number of people"
												value={peopleCount}
												onChange={(e) => {
													setPeopleCount(e.target.value);
													calculateZakatFitrah(e.target.value);
												}}
												className="bg-[#14532d] border-[#14532d] text-[#f0fdf4] mt-2"
											/>
										</div>

										{peopleCount && (parseInt(peopleCount) <= 0 || isNaN(parseInt(peopleCount))) && (
											<div className="p-4 bg-red-500/20 rounded-lg border border-red-500/30">
												<div className="text-center">
													<p className="text-red-200 text-sm mb-2">Invalid Number of People</p>
													<p className="text-red-100 text-xs">
														Please enter a valid number of people (minimum 1 person) for Fitrah Zakat calculation.
													</p>
												</div>
											</div>
										)}

										<div className="space-y-4">
											<div className="flex justify-between items-center">
												<span className="text-[#f0fdf4]/70">Per person:</span>
												<span className="text-[#f0fdf4]">{formatCurrency(convertToSelectedCurrency(fitrahAmountUSD))}</span>
											</div>
											<div className="flex justify-between items-center">
												<span className="text-[#f0fdf4]/70">Number of people:</span>
												<span className="text-[#f0fdf4]">{peopleCount}</span>
											</div>
											<Separator className="bg-[#14532d]" />
											<div className="flex justify-between items-center text-lg font-semibold">
												<span className="text-[#f0fdf4]">Total:</span>
												<span className="text-[#d1b86a]">{formatCurrency(zakatFitrahTotal)}</span>
											</div>

											<div className="mt-4 p-3 bg-[#0f2419] rounded-lg border border-[#14532d]">
												<div className="text-sm text-[#f0fdf4]/70 mb-1">Payment in {currency}:</div>
												<div className="text-lg font-semibold text-[#d1b86a]">{formatCurrency(zakatFitrahTotal)}</div>
												<div className="text-xs text-[#f0fdf4]/50">
													{currency === "IDRX"
														? "Direct payment in Indonesian Rupiah equivalent"
														: "Direct payment in US Dollars"}
												</div>
											</div>

											<PaymentModal
												amount={BigInt(Math.floor(zakatFitrahTotal * 1000000))}
												type="zakat-fitrah"
												title="Zakat Fitrah Payment"
											>
												<Button
													className="w-full bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] glow-shadow"
													disabled={zakatFitrahTotal <= 0 || parseInt(peopleCount) <= 0 || isNaN(parseInt(peopleCount))}
												>
													<Wallet className="h-4 w-4 mr-2" />
													Pay Zakat Fitrah
												</Button>
											</PaymentModal>
										</div>
									</CardContent>
								</Card>
							</TabsContent>
						</Tabs>
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* Zakat Pool Status */}
						{isConnected && (
							<Card className="bg-[#0f2419] border-[#14532d]">
								<CardHeader>
									<CardTitle className="text-[#f0fdf4] text-sm">Zakat Pool Status</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-3 text-sm">
										<div className="flex items-center justify-between">
											<span className="text-[#f0fdf4]/70">Current Pool:</span>
											<span className="text-[#d1b86a] font-semibold">
												{formatCurrency(convertToSelectedCurrency(zakatPool))}
											</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-[#f0fdf4]/70">Selected Type:</span>
											<span className="text-[#f0fdf4] text-xs">{getCurrentZakatType().name}</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-[#f0fdf4]/70">Nisab Threshold:</span>
											<span className="text-[#f0fdf4]">
												Rp {getCurrentZakatType().nisabThreshold.toLocaleString("id-ID")} {getCurrentZakatType().unit}
											</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-[#f0fdf4]/70">Zakat Rate:</span>
											<span className="text-[#f0fdf4]">{getCurrentZakatType().rate}%</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-[#f0fdf4]/70">Fitrah Amount:</span>
											<span className="text-[#f0fdf4]">{formatCurrency(convertToSelectedCurrency(fitrahAmountUSD))}</span>
										</div>
									</div>
								</CardContent>
							</Card>
						)}

						<Card className="bg-[#0f2419] border-[#14532d]">
							<CardHeader>
								<CardTitle className="text-[#f0fdf4] text-sm">Impact Areas</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="flex items-center p-3 bg-[#14532d]/30 rounded-lg">
										<Heart className="h-5 w-5 text-[#d1b86a] mr-3" />
										<div>
											<div className="text-sm font-medium text-[#f0fdf4]">Orphans</div>
											<div className="text-xs text-[#f0fdf4]/60">Supporting orphaned children</div>
										</div>
									</div>

									<div className="flex items-center p-3 bg-[#14532d]/30 rounded-lg">
										<Users className="h-5 w-5 text-[#d1b86a] mr-3" />
										<div>
											<div className="text-sm font-medium text-[#f0fdf4]">Refugees</div>
											<div className="text-xs text-[#f0fdf4]/60">Helping displaced families</div>
										</div>
									</div>

									<div className="flex items-center p-3 bg-[#14532d]/30 rounded-lg">
										<Home className="h-5 w-5 text-[#d1b86a] mr-3" />
										<div>
											<div className="text-sm font-medium text-[#f0fdf4]">Local Aid</div>
											<div className="text-xs text-[#f0fdf4]/60">Community support programs</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="bg-[#0f2419] border-[#14532d]">
							<CardHeader>
								<CardTitle className="text-[#f0fdf4] text-sm">Transparency Guarantee</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									<div className="flex items-center">
										<Badge className="bg-[#14532d] text-[#d1b86a] mr-2">✓</Badge>
										<span className="text-xs text-[#f0fdf4]/70">Blockchain verified</span>
									</div>
									<div className="flex items-center">
										<Badge className="bg-[#14532d] text-[#d1b86a] mr-2">✓</Badge>
										<span className="text-xs text-[#f0fdf4]/70">Real-time tracking</span>
									</div>
									<div className="flex items-center">
										<Badge className="bg-[#14532d] text-[#d1b86a] mr-2">✓</Badge>
										<span className="text-xs text-[#f0fdf4]/70">Impact reports</span>
									</div>
									<div className="flex items-center">
										<Badge className="bg-[#14532d] text-[#d1b86a] mr-2">✓</Badge>
										<span className="text-xs text-[#f0fdf4]/70">NFT certificates</span>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="bg-[#0f2419] border-[#14532d]">
							<CardHeader>
								<CardTitle className="text-[#f0fdf4] text-sm">Global Impact</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3 text-sm">
									<div className="flex items-center justify-between">
										<span className="text-[#f0fdf4]/70">Total Donated:</span>
										<span className="text-[#d1b86a] font-semibold">2.4B IDR</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-[#f0fdf4]/70">Families Helped:</span>
										<span className="text-[#d1b86a] font-semibold">3,247</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-[#f0fdf4]/70">Active Donors:</span>
										<span className="text-[#d1b86a] font-semibold">1,856</span>
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
