import { useState, useEffect } from "react";
import { useContracts } from "./use-contracts";
import { useAccount } from "wagmi";

export function useZakatContract() {
	const [zakatPool, setZakatPool] = useState<number>(0);
	const [loading, setLoading] = useState(false);

	const contracts = useContracts();
	const { isConnected } = useAccount();

	const loadContractData = async () => {
		if (!contracts) return;

		setLoading(true);
		try {
			// Load zakat pool data from contract
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

	// Load contract data when contracts or connection status changes
	useEffect(() => {
		loadContractData();
	}, [contracts, isConnected]);

	return {
		zakatPool,
		loading,
		loadContractData,
	};
}
