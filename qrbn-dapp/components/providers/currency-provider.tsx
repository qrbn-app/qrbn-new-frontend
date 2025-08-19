"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export type Currency = "USDT" | "IDRX";

interface CurrencyContextType {
	currency: Currency;
	setCurrency: (currency: Currency) => void;
	exchangeRate: number; // USDT to IDRX rate
	isLoadingRate: boolean;
	convertToSelectedCurrency: (USDTAmount: number) => number;
	formatCurrency: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function useCurrency() {
	const context = useContext(CurrencyContext);
	if (context === undefined) {
		throw new Error("useCurrency must be used within a CurrencyProvider");
	}
	return context;
}

interface CurrencyProviderProps {
	children: React.ReactNode;
}

export function CurrencyProvider({ children }: CurrencyProviderProps) {
	const [currency, setCurrency] = useState<Currency>("USDT"); // Default to USDT as requested
	const [exchangeRate, setExchangeRate] = useState<number>(15800); // Fallback rate USDT to IDRX
	const [isLoadingRate, setIsLoadingRate] = useState<boolean>(false);

	// Fetch exchange rate from a free API
	const fetchExchangeRate = async () => {
		if (currency === "USDT") return; // No need to fetch rate for USDT

		setIsLoadingRate(true);
		try {
			// Using exchangerate-api.com (free tier)
			const response = await axios.get("https://api.exchangerate-api.com/v4/latest/USDT");
			if (response.data && response.data.rates && response.data.rates.IDRX) {
				setExchangeRate(response.data.rates.IDRX);
				console.log(`Exchange rate updated: 1 USDT = ${response.data.rates.IDRX} IDRX`);
			}
		} catch (error) {
			console.error("Failed to fetch exchange rate:", error);
			// Keep using fallback rate
		} finally {
			setIsLoadingRate(false);
		}
	};

	// Fetch exchange rate on mount and when currency changes to IDRX
	useEffect(() => {
		if (currency === "IDRX") {
			fetchExchangeRate();
			// Update rate every 30 minutes
			const interval = setInterval(fetchExchangeRate, 30 * 60 * 1000);
			return () => clearInterval(interval);
		}
	}, [currency]);

	const convertToSelectedCurrency = (USDTAmount: number): number => {
		if (currency === "USDT") {
			return USDTAmount;
		}
		return USDTAmount * exchangeRate;
	};

	const formatCurrency = (amount: number): string => {
		if (currency === "USDT") {
			return `$${amount.toFixed(2)}`;
		}
		// Format IDRX with proper thousand separators
		return `Rp ${amount.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`;
	};

	const value: CurrencyContextType = {
		currency,
		setCurrency,
		exchangeRate,
		isLoadingRate,
		convertToSelectedCurrency,
		formatCurrency,
	};

	return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}
