import { useState, useEffect } from "react";
import { useCurrency } from "@/components/providers/currency-provider";

const FITRAH_AMOUNT_USD = 2.78; // Base amount in USD per person for Zakat Fitrah (equivalent to 2.5kg rice)

export function useZakatFitrah() {
	const { convertToSelectedCurrency, formatCurrency } = useCurrency();
	const [peopleCount, setPeopleCount] = useState("1");
	const [zakatFitrahTotal, setZakatFitrahTotal] = useState(() => convertToSelectedCurrency(FITRAH_AMOUNT_USD));

	const calculateZakatFitrah = (count: string) => {
		const people = Number.parseInt(count) || 1;
		if (people < 1) {
			setZakatFitrahTotal(0);
			return;
		}

		// Convert fitrah amount to selected currency
		const convertedFitrahAmount = convertToSelectedCurrency(FITRAH_AMOUNT_USD);
		setZakatFitrahTotal(people * convertedFitrahAmount);
	};

	const validatePeopleCount = (count: string): boolean => {
		const num = parseInt(count);
		return !isNaN(num) && num > 0;
	};

	const getFitrahPerPerson = () => {
		return convertToSelectedCurrency(FITRAH_AMOUNT_USD);
	};

	// Update total when currency changes
	useEffect(() => {
		calculateZakatFitrah(peopleCount);
	}, [convertToSelectedCurrency, peopleCount]);

	const isValidPeopleCount = (): boolean => {
		return validatePeopleCount(peopleCount);
	};

	const canPay = (): boolean => {
		return isValidPeopleCount() && zakatFitrahTotal > 0;
	};

	const totalFitrahAmount = zakatFitrahTotal;
	const fitrahAmountInCurrency = getFitrahPerPerson();

	return {
		peopleCount,
		zakatFitrahTotal,
		totalFitrahAmount,
		fitrahAmountInCurrency,
		setPeopleCount,
		calculateZakatFitrah,
		validatePeopleCount,
		isValidPeopleCount,
		canPay,
		getFitrahPerPerson,
		FITRAH_AMOUNT_USD,
	};
}
