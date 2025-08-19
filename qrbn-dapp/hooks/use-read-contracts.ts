import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useContracts } from "./use-contracts";
import { ContractService } from "@/lib/contract-service";

export function useReadContract<
	TQueryFnData = unknown,
	TError = unknown,
	TData = TQueryFnData,
	TQueryKey extends readonly unknown[] = readonly unknown[]
>(options: (contracts: ContractService | null) => UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, deps = []) {
	const contracts = useContracts();
	const queryOptions = options(contracts);

	return useQuery({
		...queryOptions,
		enabled: !!contracts && (queryOptions.enabled ?? true) && (deps.length ? deps.every((d) => d) : true),
	});
}
