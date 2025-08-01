import { usePublicClient, useWalletClient } from 'wagmi'
import { useMemo } from 'react'
import { ContractService } from '@/lib/contract-service'

export function useContracts() {
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  const contractService = useMemo(() => {
    if (!publicClient) return null
    return new ContractService(publicClient, walletClient)
  }, [publicClient, walletClient])

  return contractService
}