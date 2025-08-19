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
		id: "gold-silver",
		name: "Gold & Silver Zakat",
		description: "Precious metals, jewelry, and gold/silver investments",
		nisabThreshold: 5667,
		rate: 2.5,
		unit: "USD",
	},
	{
		id: "agriculture",
		name: "Agricultural Zakat",
		description: "Crops, fruits, and agricultural produce",
		nisabThreshold: 3400,
		rate: 5,
		unit: "USD",
	},
];

interface UseZakatCalculationsProps {
	nisabThreshold: number;
	selectedIslamicPath: IslamicPath;
}

export function useZakatCalculations({ nisabThreshold, selectedIslamicPath }: UseZakatCalculationsProps) {
	const { currency, convertToSelectedCurrency } = useCurrency();

	// Zakat Maal states
	const [selectedZakatType, setSelectedZakatType] = useState<ZakatType>(zakatTypes[0]);
	const [wealth, setWealth] = useState("");
	const [calculatedZakat, setCalculatedZakat] = useState(0);

	// Income Zakat specific states
	const [monthlyIncome, setMonthlyIncome] = useState("");
	const [otherIncome, setOtherIncome] = useState("");
	const [expenses, setExpenses] = useState("");
	const [hasDeductions, setHasDeductions] = useState(false);
	const [isObligatedToPay, setIsObligatedToPay] = useState(false);
	const [incomeType, setIncomeType] = useState("monthly");

	const getCurrentZakatType = (): ZakatType => {
		const baseType = zakatTypes.find((type) => type.id === selectedZakatType.id) || zakatTypes[0];

		// Use dynamic nisab threshold for gold-based calculations
		const dynamicNisabUSD = baseType.id === "agriculture" ? 3400 : nisabThreshold;

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
		} else {
			// For other types, use the wealth input
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
			automaticDeduction: hasDeductions ? 0 : Math.min(totalAnnualIncome * 0.2, 50000),
			isBelowNisab: expenseIncome < getCurrentZakatType().nisabThreshold,
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
		} else {
			// For other zakat types, calculate if we have wealth value
			if (wealth && parseFloat(wealth) > 0) {
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

		// Setters
		setWealth,
		setMonthlyIncome,
		setOtherIncome,
		setExpenses,
		setHasDeductions,
		setIncomeType,

		// Functions
		getCurrentZakatType,
		calculateZakatMaal,
		onSelectZakatType,
		getIncomeBreakdown,
		validateInput,

		// Helper functions
		calculateTotalAnnualIncome,
		calculateExpenseIncome,
	};
}
