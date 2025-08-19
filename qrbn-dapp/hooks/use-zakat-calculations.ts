import { useState, useEffect } from "react";
import { useCurrency } from "@/components/providers/currency-provider";
import { IslamicPath } from "./use-islamic-path";

// Zakat types according to Islamic Shariah
export interface ZakatType {
  id: string;
  name: string;
  description: string;
  nisabThreshold: number;
  rate: number;
  unit: string;
}

const zakatTypes: ZakatType[] = [
  {
    id: "income",
    name: "Income Zakat",
    description: "Salary, business income, and professional earnings",
    nisabThreshold: 5667,
    rate: 2.5,
    unit: "USD",
  },
  {
    id: "trade",
    name: "Trade Zakat",
    description: "Commercial inventory, business assets, and trade goods",
    nisabThreshold: 5667,
    rate: 2.5,
    unit: "USD",
  },
  {
    id: "savings",
    name: "Savings Zakat",
    description: "Bank deposits, cash savings, and liquid assets",
    nisabThreshold: 5667,
    rate: 2.5,
    unit: "USD",
  },
  {
    id: "gold",
    name: "Gold Zakat",
    description: "Precious metals, jewelry, and gold investments",
    nisabThreshold: 5667,
    rate: 2.5,
    unit: "USD",
  },
];

interface UseZakatCalculationsProps {
  nisabThreshold: number;
  selectedIslamicPath: IslamicPath;
  goldPriceUSD?: number;
}

export function useZakatCalculations({
  nisabThreshold,
  selectedIslamicPath,
  goldPriceUSD,
}: UseZakatCalculationsProps) {
  const { currency, convertToSelectedCurrency } = useCurrency();

  // Zakat Maal states
  const [selectedZakatType, setSelectedZakatType] = useState<ZakatType>(
    zakatTypes[0]
  );
  const [wealth, setWealth] = useState("");
  const [calculatedZakat, setCalculatedZakat] = useState(0);

  // Income Zakat specific states
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [otherIncome, setOtherIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [hasDeductions, setHasDeductions] = useState(false);
  const [isObligatedToPay, setIsObligatedToPay] = useState(false);
  const [incomeType, setIncomeType] = useState("monthly");

  // Trade Zakat specific states
  const [businessCapital, setBusinessCapital] = useState("");
  const [businessProfit, setBusinessProfit] = useState("");
  const [tradeReceivables, setTradeReceivables] = useState("");
  const [dueDepartments, setDueDepartments] = useState("");
  const [businessLosses, setBusinessLosses] = useState("");
  const [hasTradeAdvanced, setHasTradeAdvanced] = useState(false);

  // Savings specific states
  const [savingsBalance, setSavingsBalance] = useState("");
  const [interestAmount, setInterestAmount] = useState("");
  const [isConventionalBank, setIsConventionalBank] = useState(false);

  // Gold specific states
  const [goldWeightGrams, setGoldWeightGrams] = useState("");

  const getCurrentZakatType = (): ZakatType => {
    const baseType =
      zakatTypes.find((type) => type.id === selectedZakatType.id) ||
      zakatTypes[0];

    // Use dynamic nisab threshold for gold-based calculations
    const dynamicNisabUSD = nisabThreshold;

    // Convert nisab to selected currency
    const convertedNisab = convertToSelectedCurrency(dynamicNisabUSD);

    // Apply Islamic path multipliers
    return {
      ...baseType,
      nisabThreshold: convertedNisab * selectedIslamicPath.nisabMultiplier,
      rate: baseType.rate * selectedIslamicPath.rateMultiplier,
      unit: currency,
    };
  };

  const calculateTotalAnnualIncome = (): number => {
    const primaryIncome = parseFloat(monthlyIncome) || 0;
    const additional = parseFloat(otherIncome) || 0;

    if (incomeType === "monthly") {
      return primaryIncome * 12 + additional;
    } else {
      return primaryIncome + additional;
    }
  };

  const calculateExpenseIncome = (totalAnnualIncome: number): number => {
    if (hasDeductions) {
      // When deductions are on, subtract manual expenses
      const expenseAmount = parseFloat(expenses) || 0;
      return totalAnnualIncome - expenseAmount;
    }

    return totalAnnualIncome;
  };

  const calculateTotalTradeAssets = (): number => {
    const capital = parseFloat(businessCapital) || 0;
    const profit = parseFloat(businessProfit) || 0;
    const receivables = parseFloat(tradeReceivables) || 0;

    return capital + profit + receivables;
  };

  const calculateTradeAssetsAfterDeductions = (): number => {
    const totalAssets = calculateTotalTradeAssets();
    const debts = parseFloat(dueDepartments) || 0;
    const losses = parseFloat(businessLosses) || 0;

    return totalAssets - debts - losses;
  };

  const getSavingsNetBalance = (): number => {
    const bal = parseFloat(savingsBalance) || 0;
    const interest = parseFloat(interestAmount) || 0;
    const net = isConventionalBank ? bal - interest : bal;
    return Math.max(0, net);
  };

  const getGoldValuationInCurrency = (): number => {
    const grams = parseFloat(goldWeightGrams) || 0;
    const pricePerGramUSD = (goldPriceUSD || 0) / 31.1035;
    const totalUSD = grams * pricePerGramUSD;
    return convertToSelectedCurrency(totalUSD);
  };

  const calculateZakatMaal = () => {
    const currentType = getCurrentZakatType();
    let totalWealth = 0;

    if (currentType.id === "income") {
      const totalAnnualIncome = calculateTotalAnnualIncome();
      const expenseIncome = calculateExpenseIncome(totalAnnualIncome);

      // Update payment obligation status
      setIsObligatedToPay(expenseIncome >= currentType.nisabThreshold);

      // Check if taxable income meets nisab threshold
      if (expenseIncome < currentType.nisabThreshold) {
        setCalculatedZakat(0);
        return;
      }

      totalWealth = expenseIncome;
    } else if (currentType.id === "trade") {
      const tradeAssetsAfterDeductions = calculateTradeAssetsAfterDeductions();

      // Update payment obligation status
      setIsObligatedToPay(
        tradeAssetsAfterDeductions >= currentType.nisabThreshold
      );

      // Check if trade assets meet nisab threshold
      if (tradeAssetsAfterDeductions < currentType.nisabThreshold) {
        setCalculatedZakat(0);
        return;
      }

      totalWealth = tradeAssetsAfterDeductions;
    } else if (currentType.id === "savings") {
      const netBalance = getSavingsNetBalance();
      setIsObligatedToPay(netBalance >= currentType.nisabThreshold);
      if (netBalance < currentType.nisabThreshold) {
        setCalculatedZakat(0);
        return;
      }
      totalWealth = netBalance;
    } else if (currentType.id === "gold") {
      const goldValue = getGoldValuationInCurrency();
      setIsObligatedToPay(goldValue >= currentType.nisabThreshold);
      if (goldValue < currentType.nisabThreshold) {
        setCalculatedZakat(0);
        return;
      }
      totalWealth = goldValue;
    } else {
      totalWealth = parseFloat(wealth) || 0;

      if (totalWealth < currentType.nisabThreshold) {
        setCalculatedZakat(0);
        return;
      }
    }

    const zakatAmount = totalWealth * (currentType.rate / 100);
    setCalculatedZakat(zakatAmount);
  };

  const getIncomeBreakdown = () => {
    if (selectedZakatType.id !== "income") return null;

    const totalAnnualIncome = calculateTotalAnnualIncome();
    const expenseIncome = calculateExpenseIncome(totalAnnualIncome);

    return {
      totalAnnualIncome,
      expenseIncome,
      primaryIncome: parseFloat(monthlyIncome) || 0,
      additionalIncome: parseFloat(otherIncome) || 0,
      expenses: parseFloat(expenses) || 0,
      automaticDeduction: hasDeductions
        ? 0
        : Math.min(totalAnnualIncome * 0.2, 50000),
      isBelowNisab: expenseIncome < getCurrentZakatType().nisabThreshold,
    };
  };

  const getTradeBreakdown = () => {
    if (selectedZakatType.id !== "trade") return null;

    const totalAssets = calculateTotalTradeAssets();
    const assetsAfterDeductions = calculateTradeAssetsAfterDeductions();

    return {
      businessCapital: parseFloat(businessCapital) || 0,
      businessProfit: parseFloat(businessProfit) || 0,
      tradeReceivables: parseFloat(tradeReceivables) || 0,
      dueDepartments: parseFloat(dueDepartments) || 0,
      businessLosses: parseFloat(businessLosses) || 0,
      totalAssets,
      assetsAfterDeductions,
      isBelowNisab:
        assetsAfterDeductions < getCurrentZakatType().nisabThreshold,
    };
  };

  const getSavingsBreakdown = () => {
    if (selectedZakatType.id !== "savings") return null;

    const balance = parseFloat(savingsBalance) || 0;
    const interest = parseFloat(interestAmount) || 0;
    const netBalance = getSavingsNetBalance();
    const currentType = getCurrentZakatType();

    return {
      balance,
      interest,
      netBalance,
      isConventionalBank,
      isBelowNisab: netBalance < currentType.nisabThreshold,
    };
  };

  const getGoldBreakdown = () => {
    if (selectedZakatType.id !== "gold") return null;
    const grams = parseFloat(goldWeightGrams) || 0;
    const pricePerGramUSD = (goldPriceUSD || 0) / 31.1035;
    const totalUSD = grams * pricePerGramUSD;
    const totalInCurrency = convertToSelectedCurrency(totalUSD);
    return {
      grams,
      totalInCurrency,
      isBelowNisab: totalInCurrency < getCurrentZakatType().nisabThreshold,
    };
  };

  const validateInput = (value: number, min: number): boolean => {
    return value >= min;
  };

  const onSelectZakatType = (id: string) => {
    const newType = zakatTypes.find((z) => z.id === id);
    if (newType) {
      setSelectedZakatType(newType);
      // Reset calculation when type changes
      setCalculatedZakat(0);
    }
  };

  // Automatically calculate zakat when relevant inputs change
  useEffect(() => {
    // Only auto-calculate if we have valid inputs
    if (selectedZakatType.id === "income") {
      // For income zakat, calculate if we have income values
      if (monthlyIncome || otherIncome) {
        calculateZakatMaal();
      } else {
        setCalculatedZakat(0);
      }
    } else if (selectedZakatType.id === "trade") {
      // For trade zakat, calculate if we have capital or profit values
      if (businessCapital || businessProfit) {
        calculateZakatMaal();
      } else {
        setCalculatedZakat(0);
      }
    } else if (selectedZakatType.id === "gold") {
      // For gold zakat, calculate if we have grams and price
      if (goldWeightGrams && (goldPriceUSD || 0) > 0) {
        calculateZakatMaal();
      } else {
        setCalculatedZakat(0);
      }
    } else {
      // For other zakat types, calculate if we have wealth value
      if (
        (selectedZakatType.id === "savings" && (savingsBalance || interestAmount)) ||
        (wealth && parseFloat(wealth) > 0)
      ) {
        calculateZakatMaal();
      } else {
        setCalculatedZakat(0);
      }
    }
  }, [
    selectedZakatType.id,
    wealth,
    monthlyIncome,
    otherIncome,
    expenses,
    hasDeductions,
    incomeType,
    businessCapital,
    businessProfit,
    tradeReceivables,
    dueDepartments,
    businessLosses,
    savingsBalance,
    interestAmount,
    isConventionalBank,
    goldWeightGrams,
    goldPriceUSD,
    nisabThreshold,
    selectedIslamicPath,
    convertToSelectedCurrency,
  ]);

  return {
    // Types and constants
    zakatTypes,

    // State
    selectedZakatType,
    wealth,
    calculatedZakat,
    monthlyIncome,
    otherIncome,
    expenses,
    hasDeductions,
    isObligatedToPay,
    incomeType,
    businessCapital,
    businessProfit,
    tradeReceivables,
    dueDepartments,
    businessLosses,
    hasTradeAdvanced,
    savingsBalance,
    interestAmount,
    isConventionalBank,
    goldWeightGrams,

    // Setters
    setWealth,
    setMonthlyIncome,
    setOtherIncome,
    setExpenses,
    setHasDeductions,
    setIncomeType,
    setBusinessCapital,
    setBusinessProfit,
    setTradeReceivables,
    setDueDepartments,
    setBusinessLosses,
    setHasTradeAdvanced,
    setSavingsBalance,
    setInterestAmount,
    setIsConventionalBank,
    setGoldWeightGrams,

    // Functions
    getCurrentZakatType,
    calculateZakatMaal,
    onSelectZakatType,
    getIncomeBreakdown,
    getTradeBreakdown,
    getSavingsBreakdown,
    getGoldBreakdown,
    validateInput,

    // Helper functions
    calculateTotalAnnualIncome,
    calculateExpenseIncome,
    calculateTotalTradeAssets,
    calculateTradeAssetsAfterDeductions,
  };
}
