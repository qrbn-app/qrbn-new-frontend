import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function displayTokenPrice(price: bigint, decimals = 6) {
	return (Number(price) / 10 ** decimals).toLocaleString();
}

export function isAnimalSold(status: bigint) {
	return Number(status) == 2;
}
