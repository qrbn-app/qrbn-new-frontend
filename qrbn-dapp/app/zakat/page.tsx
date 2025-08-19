"use client";

import { useMemo, useState } from "react";
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
import { useAccount } from "wagmi";
import { useCurrency } from "@/components/providers/currency-provider";
import { useGoldPrice } from "@/hooks/use-gold-price";
import { useZakatCalculations } from "@/hooks/use-zakat-calculations";
import { useZakatFitrah } from "@/hooks/use-zakat-fitrah";
import { useIslamicPath } from "@/hooks/use-islamic-path";
import { useZakatContract } from "@/hooks/use-zakat-contract";

export default function ZakatPage() {
	const { currency, convertToSelectedCurrency, formatCurrency } = useCurrency();
	const { isConnected } = useAccount();

	// Custom hooks
	const { goldPriceUSD, nisabThreshold, goldPriceLoading, isUsingLiveData, fetchGoldPrice } = useGoldPrice();
	const { islamicPaths, selectedIslamicPath, showAdvancedOptions, setShowAdvancedOptions, onSelectIslamicPath } = useIslamicPath();
	const zakatCalculations = useZakatCalculations({ nisabThreshold, selectedIslamicPath, goldPriceUSD });
	const zakatFitrah = useZakatFitrah();
	const zakatContractData = useZakatContract();

	// Gold input handled inside useZakatCalculations; we just pass grams

	return (
		<div className="min-h-screen islamic-pattern py-8 px-4">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-[#f0fdf4] mb-4">Zakat Donation</h1>
					<p className="text-[#f0fdf4]/70">Fulfill your religious obligation with transparency</p>
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
											<Select value={selectedIslamicPath.id} onValueChange={onSelectIslamicPath}>
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
													{/* {!isUsingLiveData && (
														<Badge variant="secondary" className="mt-1 text-xs bg-yellow-600/20 text-yellow-300">
															Fallback
														</Badge>
													)} */}
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
													<div className="text-lg font-semibold text-[#d1b86a]">
														{zakatCalculations.getCurrentZakatType().rate}%
													</div>
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
											<Select
												value={zakatCalculations.selectedZakatType.id}
												onValueChange={zakatCalculations.onSelectZakatType}
											>
												<SelectTrigger className="bg-[#14532d] border-[#14532d] text-[#f0fdf4] mt-2 text-left">
													<div>{zakatCalculations.selectedZakatType.name}</div>
												</SelectTrigger>
												<SelectContent className="bg-[#0f2419] border-[#14532d]">
													{zakatCalculations.zakatTypes.map((type) => (
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
										{zakatCalculations.selectedZakatType.id === "income" ? (
											<div className="space-y-6">
												{/* Income Type Selection */}
												<div>
													<Label className="text-[#f0fdf4] font-semibold mb-3 block">Income Calculation Period</Label>
													<RadioGroup
														value={zakatCalculations.incomeType}
														onValueChange={zakatCalculations.setIncomeType}
														className="flex space-x-6"
													>
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
														{zakatCalculations.incomeType === "monthly" ? "Monthly Income" : "Yearly Income"}*
													</Label>
													<Input
														id="monthlyIncome"
														type="number"
														placeholder={
															zakatCalculations.incomeType === "monthly"
																? "Enter your monthly income in " + currency
																: "Enter your yearly income in " + currency
														}
														value={zakatCalculations.monthlyIncome}
														onChange={(e) => zakatCalculations.setMonthlyIncome(e.target.value)}
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
																value={zakatCalculations.otherIncome}
																onChange={(e) => zakatCalculations.setOtherIncome(e.target.value)}
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
																checked={zakatCalculations.hasDeductions}
																onCheckedChange={zakatCalculations.setHasDeductions}
																className="data-[state=checked]:bg-orange-500"
															/>
														</div>

														{/* Expense Input - Only show when deductions are on */}
														{zakatCalculations.hasDeductions && (
															<div>
																<Label htmlFor="expenses" className="text-[#f0fdf4]">
																	Expenses ({currency})
																</Label>
																<Input
																	id="expenses"
																	type="number"
																	placeholder={`Enter your expenses in ${currency}`}
																	value={zakatCalculations.expenses}
																	onChange={(e) => zakatCalculations.setExpenses(e.target.value)}
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
														{zakatCalculations.isObligatedToPay
															? "Required to Pay Zakat"
															: "Not Required to Pay Zakat, but Can Give Charity"}
													</div>
												</div>
											</div>
										) : zakatCalculations.selectedZakatType.id === "trade" ? (
											<div className="space-y-6">
												{/* Business Capital */}
												<div>
													<Label htmlFor="businessCapital" className="text-[#f0fdf4] font-semibold">
														Business Capital Rotated for 1 Year*
													</Label>
													<Input
														id="businessCapital"
														type="number"
														placeholder={`Enter business capital in ${currency}`}
														value={zakatCalculations.businessCapital}
														onChange={(e) => zakatCalculations.setBusinessCapital(e.target.value)}
														className="bg-[#14532d] border-[#14532d] text-[#f0fdf4] mt-2"
													/>
												</div>

												{/* Business Profit */}
												<div>
													<Label htmlFor="businessProfit" className="text-[#f0fdf4] font-semibold">
														Profit for 1 Year*
													</Label>
													<Input
														id="businessProfit"
														type="number"
														placeholder={`Enter business profit in ${currency}`}
														value={zakatCalculations.businessProfit}
														onChange={(e) => zakatCalculations.setBusinessProfit(e.target.value)}
														className="bg-[#14532d] border-[#14532d] text-[#f0fdf4] mt-2"
													/>
												</div>

												<details>
													<summary>Show advanced options</summary>
													<div className="space-y-6 mt-6">
														{/* Trade Receivables */}
														<div>
															<Label htmlFor="tradeReceivables" className="text-[#f0fdf4] font-semibold">
																Trade Receivables
															</Label>
															<Input
																id="tradeReceivables"
																type="number"
																placeholder="Optional, if applicable"
																value={zakatCalculations.tradeReceivables}
																onChange={(e) => zakatCalculations.setTradeReceivables(e.target.value)}
																className="bg-[#14532d] border-[#14532d] text-[#f0fdf4] mt-2"
															/>
														</div>

														{/* Due Debts */}
														<div>
															<Label htmlFor="dueDepartments" className="text-[#f0fdf4] font-semibold">
																Due Debts
															</Label>
															<Input
																id="dueDepartments"
																type="number"
																placeholder="Optional, if applicable"
																value={zakatCalculations.dueDepartments}
																onChange={(e) => zakatCalculations.setDueDepartments(e.target.value)}
																className="bg-[#14532d] border-[#14532d] text-[#f0fdf4] mt-2"
															/>
														</div>

														{/* Business Losses */}
														<div>
															<Label htmlFor="businessLosses" className="text-[#f0fdf4] font-semibold">
																Losses for 1 Year
															</Label>
															<Input
																id="businessLosses"
																type="number"
																placeholder="Optional, if applicable"
																value={zakatCalculations.businessLosses}
																onChange={(e) => zakatCalculations.setBusinessLosses(e.target.value)}
																className="bg-[#14532d] border-[#14532d] text-[#f0fdf4] mt-2"
															/>
														</div>
													</div>
												</details>

												{/* Payment Obligation */}
												<div className="p-4 bg-[#14532d]/30 rounded-lg">
													<div className="text-[#f0fdf4] font-semibold mb-2">Payment Obligation</div>
													<div className="text-red-400 text-sm">
														{zakatCalculations.isObligatedToPay
															? "Required to Pay Zakat"
															: "Not Required to Pay Zakat, but Can Give Charity"}
													</div>
												</div>
											</div>
										) : zakatCalculations.selectedZakatType.id === "savings" ? (
											<div className="space-y-6">
												<div>
													<Label htmlFor="savingsBalance" className="text-[#f0fdf4] font-semibold">
														Savings Balance*
													</Label>
													<Input
														id="savingsBalance"
														type="number"
														placeholder={`Enter your total liquid savings in ${currency}`}
														value={zakatCalculations.savingsBalance}
														onChange={(e) => zakatCalculations.setSavingsBalance(e.target.value)}
														className="bg-[#14532d] border-[#14532d] text-[#f0fdf4] mt-2"
													/>
													<p className="text-xs text-[#f0fdf4]/50 mt-1">Include cash and liquid assets available for a full lunar year.</p>
												</div>

												<div className="flex items-center justify-between p-4 bg-[#14532d]/30 rounded-lg border border-[#14532d]">
													<div>
														<span className="text-[#f0fdf4] font-medium">Using conventional bank?</span>
														<p className="text-xs text-[#f0fdf4]/60">If yes, interest will be excluded from the balance.</p>
													</div>
													<Switch
														checked={zakatCalculations.isConventionalBank}
														onCheckedChange={zakatCalculations.setIsConventionalBank}
														className="data-[state=checked]:bg-[#d1b86a]"
													/>
												</div>

												{zakatCalculations.isConventionalBank && (
													<div>
														<Label htmlFor="interestAmount" className="text-[#f0fdf4]">
															Interest Amount Earned (last 12 months)
														</Label>
														<Input
															id="interestAmount"
															type="number"
															placeholder={`Enter interest amount in ${currency}`}
															value={zakatCalculations.interestAmount}
															onChange={(e) => zakatCalculations.setInterestAmount(e.target.value)}
															className="bg-[#14532d] border-[#14532d] text-[#f0fdf4] mt-2"
														/>
														<p className="text-xs text-[#f0fdf4]/50 mt-1">This amount will be excluded from the zakatable balance.</p>
													</div>
												)}

												{/* months held removed */}

												<div className="p-4 bg-[#14532d]/30 rounded-lg">
													<div className="text-[#f0fdf4] font-semibold mb-2">Payment Obligation</div>
													<div className="text-red-400 text-sm">
														{zakatCalculations.isObligatedToPay ? "Required to Pay Zakat" : "Not Required to Pay Zakat, but Can Give Charity"}
													</div>
												</div>
											</div>
										) : zakatCalculations.selectedZakatType.id === "gold" ? (
											<div>
												<Label htmlFor="goldGrams" className="text-[#f0fdf4]">
													Total Gold (grams)
												</Label>
												<Input
													id="goldGrams"
													type="number"
													placeholder="Enter total gold in grams"
													value={zakatCalculations.goldWeightGrams}
													onChange={(e) => zakatCalculations.setGoldWeightGrams(e.target.value)}
													className="bg-[#14532d] border-[#14532d] text-[#f0fdf4] mt-2"
												/>
												<p className="text-xs text-[#f0fdf4]/50 mt-1">
													We auto-convert grams to {currency} using the live price.
												</p>
												<div className="p-4 bg-[#14532d]/30 rounded-lg mt-4">
													<div className="text-[#f0fdf4] font-semibold mb-2">Payment Obligation</div>
													<div className="text-red-400 text-sm">
														{zakatCalculations.isObligatedToPay ? "Required to Pay Zakat" : "Not Required to Pay Zakat, but Can Give Charity"}
													</div>
												</div>
											</div>
										) : (
											/* Other Zakat Types Interface */
											<div>
												<Label htmlFor="wealth" className="text-[#f0fdf4]">
													Total Wealth Yearly ({zakatCalculations.getCurrentZakatType().unit})
												</Label>
												<Input
													id="wealth"
													type="number"
													value={zakatCalculations.wealth}
													onChange={(e) => zakatCalculations.setWealth(e.target.value)}
													className="bg-[#14532d] border-[#14532d] text-[#f0fdf4] mt-2"
												/>
												<p className="text-xs text-[#f0fdf4]/50 mt-1">
													Minimum nisab: {zakatCalculations.getCurrentZakatType().nisabThreshold.toLocaleString()} {" "}
													{zakatCalculations.getCurrentZakatType().unit} | Rate: {" "}
													{zakatCalculations.getCurrentZakatType().rate}%
												</p>
											</div>
										)}

										{zakatCalculations.calculatedZakat > 0 && (
											<div className="p-4 rounded-lg border border-[#d1b86a]/30">
												<div className="text-center">
													<p className="text-[#f0fdf4]/70 mb-2">
														Your {zakatCalculations.getCurrentZakatType().name} Amount:
													</p>
													<p className="text-3xl font-bold text-[#d1b86a]">
														{formatCurrency(zakatCalculations.calculatedZakat)}
													</p>
													<p className="text-xs text-[#f0fdf4]/50 mt-1">
														{zakatCalculations.getCurrentZakatType().rate}% of{" "}
														{zakatCalculations.selectedZakatType.id === "income" 
															? "taxable income" 
															: zakatCalculations.selectedZakatType.id === "trade"
															? "trade assets after deductions"
															: "wealth"} above nisab
													</p>
													{zakatCalculations.selectedZakatType.id === "income" &&
														(() => {
															const breakdown = zakatCalculations.getIncomeBreakdown();
															if (!breakdown) return null;

															return (
																<div className="mt-2 text-xs text-[#f0fdf4]/60">
																	{zakatCalculations.incomeType === "monthly"
																		? `Monthly: ${formatCurrency(breakdown.primaryIncome)}`
																		: `Yearly: ${formatCurrency(breakdown.primaryIncome)}`}
																	{breakdown.additionalIncome > 0 && (
																		<span> + Additional: {formatCurrency(breakdown.additionalIncome)}</span>
																	)}
																	{zakatCalculations.hasDeductions && breakdown.expenses > 0 && (
																		<span className="text-red-300">
																			{" "}
																			- Expenses: {formatCurrency(breakdown.expenses)}
																		</span>
																	)}
																</div>
																		
															);
														})()}
													{zakatCalculations.selectedZakatType.id === "trade" &&
														(() => {
															const breakdown = zakatCalculations.getTradeBreakdown();
															if (!breakdown) return null;

															return (
																<div className="mt-2 text-xs text-[#f0fdf4]/60">
																	Capital: {formatCurrency(breakdown.businessCapital)}
																	{breakdown.businessProfit > 0 && (
																		<span> + Profit: {formatCurrency(breakdown.businessProfit)}</span>
																	)}
																	{breakdown.tradeReceivables > 0 && (
																		<span> + Receivables: {formatCurrency(breakdown.tradeReceivables)}</span>
																	)}
																	{breakdown.dueDepartments > 0 && (
																		<span className="text-red-300"> - Debts: {formatCurrency(breakdown.dueDepartments)}</span>
																	)}
																	{breakdown.businessLosses > 0 && (
																		<span className="text-red-300"> - Losses: {formatCurrency(breakdown.businessLosses)}</span>
																	)}
																</div>
															);
														})()}
												{zakatCalculations.selectedZakatType.id === "savings" &&
													(() => {
														const breakdown = zakatCalculations.getSavingsBreakdown?.();
														if (!breakdown) return null;

														return (
															<div className="mt-2 text-xs text-[#f0fdf4]/60">
																Savings: {formatCurrency(breakdown.balance)}
																{breakdown.isConventionalBank && breakdown.interest > 0 && (
																	<span className="text-red-300"> - Interest: {formatCurrency(breakdown.interest)}</span>
																)}
																<span> = Net: {formatCurrency(breakdown.netBalance)}</span>
																{/* months held removed */}
															</div>
														);
													})()}
												{/* no gold-specific breakdown when using generic interface */}
												</div>
											</div>
										)}

										{/* Show validation messages based on zakat type */}
										{zakatCalculations.selectedZakatType.id === "income"
											? // For income, calculate total annual income based on type and expenses
											  (zakatCalculations.monthlyIncome || zakatCalculations.otherIncome) &&
											  (() => {
													const breakdown = zakatCalculations.getIncomeBreakdown();
													return breakdown && breakdown.isBelowNisab;
											  })() && (
													<div className="p-4 bg-red-500/20 rounded-lg border border-red-500/30">
														<div className="text-center">
															<p className="text-red-200 text-sm mb-2">
																{zakatCalculations.hasDeductions
																	? "Taxable Income Below Nisab Threshold"
																	: "Income Below Nisab Threshold"}
															</p>
															<p className="text-red-100 text-xs">
																Your{" "}
																{zakatCalculations.hasDeductions
																	? "taxable income (after expenses)"
																	: "annual income (after deductions)"}{" "}
																(
																{(() => {
																	const breakdown = zakatCalculations.getIncomeBreakdown();
																	return breakdown ? formatCurrency(breakdown.expenseIncome) : "0";
																})()}
																) is below the nisab threshold (
																{formatCurrency(zakatCalculations.getCurrentZakatType().nisabThreshold)}
																). Zakat is not obligatory for income below this amount.
															</p>
														</div>
													</div>
											  )
											: zakatCalculations.selectedZakatType.id === "trade"
											? // For trade, check trade assets after deductions
											  (zakatCalculations.businessCapital || zakatCalculations.businessProfit) &&
											  (() => {
													const breakdown = zakatCalculations.getTradeBreakdown();
													return breakdown && breakdown.isBelowNisab;
											  })() && (
													<div className="p-4 bg-red-500/20 rounded-lg border border-red-500/30">
														<div className="text-center">
															<p className="text-red-200 text-sm mb-2">Trade Assets Below Nisab Threshold</p>
															<p className="text-red-100 text-xs">
																Your trade assets after deductions (
																{(() => {
																	const breakdown = zakatCalculations.getTradeBreakdown();
																	return breakdown ? formatCurrency(breakdown.assetsAfterDeductions) : "0";
																})()}
																) is below the nisab threshold (
																{formatCurrency(zakatCalculations.getCurrentZakatType().nisabThreshold)}
																). Zakat is not obligatory for trade assets below this amount.
															</p>
														</div>
													</div>
											  )
											: zakatCalculations.selectedZakatType.id === "savings"
											? (() => {
												const breakdown = zakatCalculations.getSavingsBreakdown?.();
												if (!breakdown) return false as unknown as JSX.Element;
												const shouldWarn = breakdown.isBelowNisab;
												return (
													shouldWarn && (
														<div className="p-4 bg-red-500/20 rounded-lg border border-red-500/30">
															<div className="text-center">
																<p className="text-red-200 text-sm mb-2">Savings Below Nisab Threshold</p>
																<p className="text-red-100 text-xs">
																	Your net savings ({formatCurrency(breakdown.netBalance)}) are below the nisab threshold ({formatCurrency(zakatCalculations.getCurrentZakatType().nisabThreshold)}). Zakat is not obligatory below this amount.
																</p>
															</div>
														</div>
													)
												);
											})()
											: zakatCalculations.selectedZakatType.id === "gold"
											? (() => {
												const breakdown = zakatCalculations.getGoldBreakdown?.();
												if (!breakdown) return false as unknown as JSX.Element;
												const shouldWarn = breakdown.isBelowNisab;
												return (
													shouldWarn && (
														<div className="p-4 bg-red-500/20 rounded-lg border border-red-500/30">
															<div className="text-center">
																<p className="text-red-200 text-sm mb-2">Gold Value Below Nisab Threshold</p>
																<p className="text-red-100 text-xs">
																	Your gold value ({formatCurrency(breakdown.totalInCurrency)}) is below the nisab threshold ({formatCurrency(zakatCalculations.getCurrentZakatType().nisabThreshold)}). Zakat is not obligatory below this amount.
																</p>
															</div>
														</div>
													)
												);
											})()
											: // For other types, check wealth input
											  zakatCalculations.wealth &&
											  parseFloat(zakatCalculations.wealth) > 0 &&
											  parseFloat(zakatCalculations.wealth) < zakatCalculations.getCurrentZakatType().nisabThreshold && (
													<div className="p-4 bg-red-500/20 rounded-lg border border-red-500/30">
														<div className="text-center">
															<p className="text-red-200 text-sm mb-2">Wealth Below Nisab Threshold</p>
															<p className="text-red-100 text-xs">
																Your wealth ({formatCurrency(parseFloat(zakatCalculations.wealth))}) is below the
																nisab threshold (
																{formatCurrency(zakatCalculations.getCurrentZakatType().nisabThreshold)}). Zakat is
																not obligatory for wealth below this amount.
															</p>
														</div>
													</div>
											  )}

										<div className="space-y-4">
											<PaymentModal
												amount={BigInt(Math.floor(zakatCalculations.calculatedZakat * 1000000))}
												type={`zakat-${zakatCalculations.selectedZakatType.id}`}
												title={`${zakatCalculations.getCurrentZakatType().name} Payment`}
											>
												<Button
													className="w-full bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] glow-shadow"
													disabled={zakatCalculations.calculatedZakat === 0}
												>
													<Wallet className="h-4 w-4 mr-2" />
													Pay {zakatCalculations.getCurrentZakatType().name}
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
													{formatCurrency(zakatFitrah.fitrahAmountInCurrency)}
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
												value={zakatFitrah.peopleCount}
												onChange={(e) => zakatFitrah.setPeopleCount(e.target.value)}
												className="bg-[#14532d] border-[#14532d] text-[#f0fdf4] mt-2"
												min="1"
											/>
										</div>

										{zakatFitrah.peopleCount && !zakatFitrah.isValidPeopleCount() && (
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
												<span className="text-[#f0fdf4]">{formatCurrency(zakatFitrah.fitrahAmountInCurrency)}</span>
											</div>
											<div className="flex justify-between items-center">
												<span className="text-[#f0fdf4]/70">Number of people:</span>
												<span className="text-[#f0fdf4]">{zakatFitrah.peopleCount || 0}</span>
											</div>
											<Separator className="bg-[#14532d]" />
											<div className="flex justify-between items-center text-lg font-semibold">
												<span className="text-[#f0fdf4]">Total:</span>
												<span className="text-[#d1b86a]">{formatCurrency(zakatFitrah.totalFitrahAmount)}</span>
											</div>

											<PaymentModal
												amount={BigInt(Math.floor(zakatFitrah.totalFitrahAmount * 1000000))}
												type="zakat-fitrah"
												title="Zakat Fitrah Payment"
											>
												<Button
													className="w-full bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] glow-shadow"
													disabled={!zakatFitrah.canPay}
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
												{zakatContractData.loading
													? "Loading..."
													: formatCurrency(convertToSelectedCurrency(zakatContractData.zakatPool))}
											</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-[#f0fdf4]/70">Selected Type:</span>
											<span className="text-[#f0fdf4] text-xs">{zakatCalculations.getCurrentZakatType().name}</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-[#f0fdf4]/70">Nisab Threshold:</span>
											<span className="text-[#f0fdf4]">
												{formatCurrency(zakatCalculations.getCurrentZakatType().nisabThreshold)}{" "}
												{zakatCalculations.getCurrentZakatType().unit}
											</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-[#f0fdf4]/70">Zakat Rate:</span>
											<span className="text-[#f0fdf4]">{zakatCalculations.getCurrentZakatType().rate}%</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-[#f0fdf4]/70">Fitrah Amount:</span>
											<span className="text-[#f0fdf4]">{formatCurrency(zakatFitrah.fitrahAmountInCurrency)}</span>
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
