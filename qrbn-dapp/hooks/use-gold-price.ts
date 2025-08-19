import { useState, useEffect } from "react";
import axios from "axios";

const NISAB_GOLD_GRAMS = 85; // 85 grams of gold for nisab threshold
const DEFAULT_GOLD_PRICE = 3336.045; // Default fallback price per ounce

export function useGoldPrice() {
	const [goldPriceUSD, setGoldPriceUSD] = useState<number>(DEFAULT_GOLD_PRICE);
	const [nisabThreshold, setNisabThreshold] = useState<number>(() => {
		// Calculate initial nisab based on default gold price
		return (DEFAULT_GOLD_PRICE / 31.1035) * NISAB_GOLD_GRAMS;
	});
	const [goldPriceLoading, setGoldPriceLoading] = useState(false);
	const [isUsingLiveData, setIsUsingLiveData] = useState(false);

	const fetchGoldPrice = async () => {
		setGoldPriceLoading(true);
		try {
			const apiToken = process.env.NEXT_PUBLIC_GOLD_API_TOKEN;

			if (!apiToken || apiToken === "your-access-token-here") {
				console.warn("Gold API token not configured. Using fallback gold price.");
				// Use fallback calculation with default gold price
				const fallbackNisab = (goldPriceUSD / 31.1035) * NISAB_GOLD_GRAMS;
				setNisabThreshold(fallbackNisab);
				setIsUsingLiveData(false);
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
			setIsUsingLiveData(false);
		} finally {
			setGoldPriceLoading(false);
		}
	};

	useEffect(() => {
		fetchGoldPrice();
	}, []);

	return {
		goldPriceUSD,
		nisabThreshold,
		goldPriceLoading,
		isUsingLiveData,
		fetchGoldPrice,
		NISAB_GOLD_GRAMS,
	};
}
