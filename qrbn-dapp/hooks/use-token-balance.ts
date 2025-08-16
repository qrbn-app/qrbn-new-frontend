import { useAccount } from "wagmi";
import { useReadContract } from "./use-read-contracts";
import { displayTokenPrice } from "@/lib/utils";

export function useTokenBalance() {
	const { address } = useAccount();
	const { data: balance = BigInt(0), ...results } = useReadContract((contracts) => ({
		queryKey: ["walletBalance"],
		queryFn: () => contracts?.getUSDTBalance(address!),
		enabled: Boolean(address),
	}));

	return {
		balance,
		displayBalance: displayTokenPrice(balance),
		...results,
	};
}
