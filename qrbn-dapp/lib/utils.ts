import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function displayTokenPrice(price: bigint, decimals = 6) {
	return (Number(price) / 10 ** decimals).toLocaleString();
}

export function isAnimalSold(status: number) {
	return status == 2;
}

export function formatIPFSUrl(url: string): string {
	// Convert ipfs:// protocol to https gateway if needed
	if (url.startsWith("ipfs://")) {
		return url.replace("ipfs://", "https://ipfs.io/ipfs/");
	}
	return url;
}

export function truncateAddress(address: string, startChars = 6, endChars = 4): string {
	if (!address) return "";
	if (address.length <= startChars + endChars) return address;
	return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

export function formatDate(dateString: string): string {
	try {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	} catch {
		return dateString;
	}
}
