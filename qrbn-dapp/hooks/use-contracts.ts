import { useReadContract, useWriteContract, useWaitForTransactionReceipt, usePublicClient, useWalletClient } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { CONTRACTS, QURBAN_ABI, QURBAN_NFT_ABI, TREASURY_ABI, ERC20_ABI, USDT_ABI, USDT_ADDRESS } from '@/lib/contracts'
import { createContractService } from '@/lib/contract-service'
import { useToast } from '@/hooks/use-toast'
import { useState, useMemo } from 'react'

// Enhanced hook with contract service
export function useContractService() {
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  return useMemo(() => {
    if (!publicClient) return null
    return createContractService(publicClient, walletClient)
  }, [publicClient, walletClient])
}

// Hook for Qurban donations
export function useQurbanDonation() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const { writeContractAsync } = useWriteContract()

  const makeQurbanDonation = async (amount: number, animalType: string, location: string) => {
    try {
      setIsLoading(true)
      const hash = await writeContractAsync({
        address: CONTRACTS.Qurban,
        abi: QURBAN_ABI,
        functionName: 'makeQurbanDonation',
        args: [parseEther(amount.toString()), animalType, location],
        value: parseEther(amount.toString()),
      })

      toast({
        title: "Transaction Submitted",
        description: `Qurban donation of ${amount} ETH submitted. Hash: ${hash}`,
      })

      return hash
    } catch (error) {
      console.error('Qurban donation error:', error)
      toast({
        variant: "destructive",
        title: "Transaction Failed",
        description: "Failed to process Qurban donation",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { makeQurbanDonation, isLoading }
}

// Hook for Zakat donations
export function useZakatDonation() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const { writeContractAsync } = useWriteContract()

  const makeZakatDonation = async (amount: number) => {
    try {
      setIsLoading(true)
      const hash = await writeContractAsync({
        address: CONTRACTS.Qurban, // Using same contract for Zakat
        abi: QURBAN_ABI,
        functionName: 'makeZakatDonation',
        args: [parseEther(amount.toString())],
        value: parseEther(amount.toString()),
      })

      toast({
        title: "Transaction Submitted",
        description: `Zakat donation of ${amount} ETH submitted. Hash: ${hash}`,
      })

      return hash
    } catch (error) {
      console.error('Zakat donation error:', error)
      toast({
        variant: "destructive",
        title: "Transaction Failed",
        description: "Failed to process Zakat donation",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { makeZakatDonation, isLoading }
}

// Hook to get user's donation history
export function useDonationHistory(address?: `0x${string}`) {
  const { data: donations, isLoading, error } = useReadContract({
    address: CONTRACTS.Qurban,
    abi: QURBAN_ABI,
    functionName: 'getDonationHistory',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  return {
    donations: donations || [],
    isLoading,
    error,
  }
}

// Hook to get user's NFT certificates
export function useNFTCertificates(address?: `0x${string}`) {
  const { data: balance } = useReadContract({
    address: CONTRACTS.QurbanNFT,
    abi: QURBAN_NFT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  // Get individual token IDs (simplified - in production you'd paginate)
  const nftBalance = balance ? Number(balance) : 0
  
  return {
    nftCount: nftBalance,
    isLoading: false,
  }
}

// Hook to get treasury balances
export function useTreasuryData() {
  const { data: totalBalance } = useReadContract({
    address: CONTRACTS.QrbnTreasury,
    abi: TREASURY_ABI,
    functionName: 'getTreasuryBalance',
  })

  const { data: zakatBalance } = useReadContract({
    address: CONTRACTS.QrbnTreasury,
    abi: TREASURY_ABI,
    functionName: 'getZakatBalance',
  })

  const { data: qurbanBalance } = useReadContract({
    address: CONTRACTS.QrbnTreasury,
    abi: TREASURY_ABI,
    functionName: 'getQurbanBalance',
  })

  const { data: totalDonations } = useReadContract({
    address: CONTRACTS.Qurban,
    abi: QURBAN_ABI,
    functionName: 'totalDonations',
  })

  return {
    totalBalance: totalBalance ? formatEther(totalBalance) : '0',
    zakatBalance: zakatBalance ? formatEther(zakatBalance) : '0',
    qurbanBalance: qurbanBalance ? formatEther(qurbanBalance) : '0',
    totalDonations: totalDonations ? formatEther(totalDonations) : '0',
  }
}

// Hook for QRBN token data
export function useQRBNToken(address?: `0x${string}`) {
  const { data: balance } = useReadContract({
    address: CONTRACTS.QrbnToken,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  const { data: totalSupply } = useReadContract({
    address: CONTRACTS.QrbnToken,
    abi: ERC20_ABI,
    functionName: 'totalSupply',
  })

  const { data: name } = useReadContract({
    address: CONTRACTS.QrbnToken,
    abi: ERC20_ABI,
    functionName: 'name',
  })

  const { data: symbol } = useReadContract({
    address: CONTRACTS.QrbnToken,
    abi: ERC20_ABI,
    functionName: 'symbol',
  })

  return {
    balance: balance ? formatEther(balance) : '0',
    totalSupply: totalSupply ? formatEther(totalSupply) : '0',
    name: name || 'QRBN Token',
    symbol: symbol || 'QRBN',
  }
}

// Enhanced hook for USDT balance and operations
export function useUSDTOperations(address?: `0x${string}`) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const { writeContractAsync } = useWriteContract()

  const { data: balance } = useReadContract({
    address: USDT_ADDRESS,
    abi: USDT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  const { data: allowance } = useReadContract({
    address: USDT_ADDRESS,
    abi: USDT_ABI,
    functionName: 'allowance',
    args: address ? [address, CONTRACTS.Qurban] : undefined,
    query: {
      enabled: !!address,
    },
  })

  const approveUSDT = async (amount: number) => {
    try {
      setIsLoading(true)
      const hash = await writeContractAsync({
        address: USDT_ADDRESS,
        abi: USDT_ABI,
        functionName: 'approve',
        args: [CONTRACTS.Qurban, BigInt(amount * 1e6)], // USDT has 6 decimals
      })

      toast({
        title: "Approval Submitted",
        description: `USDT approval transaction submitted. Hash: ${hash}`,
      })

      return hash
    } catch (error) {
      console.error('USDT approval error:', error)
      toast({
        variant: "destructive",
        title: "Approval Failed",
        description: "Failed to approve USDT spending",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    balance: balance ? (Number(balance) / 1e6).toString() : '0',
    allowance: allowance ? (Number(allowance) / 1e6).toString() : '0',
    approveUSDT,
    isLoading,
  }
}

// Hook for transaction status
export function useTransactionStatus(hash?: `0x${string}`) {
  const { data: receipt, isLoading, isSuccess, isError } = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash,
    },
  })

  return {
    receipt,
    isLoading,
    isSuccess,
    isError,
  }
}

// Enhanced governance hook
export function useGovernance() {
  const { data: proposalCount } = useReadContract({
    address: CONTRACTS.QrbnGov,
    abi: [
      {
        inputs: [],
        name: 'proposalCount',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'proposalCount',
  })

  return {
    proposalCount: proposalCount ? Number(proposalCount) : 0,
  }
}

// Hook for network and connection status
export function useNetworkStatus() {
  const contractService = useContractService()
  const [blockNumber, setBlockNumber] = useState<bigint | null>(null)
  const [gasPrice, setGasPrice] = useState<bigint | null>(null)

  // Update block number and gas price periodically
  useMemo(() => {
    if (!contractService) return

    const updateNetworkInfo = async () => {
      try {
        const [currentBlock, currentGasPrice] = await Promise.all([
          contractService.getBlockNumber(),
          contractService.getGasPrice(),
        ])
        setBlockNumber(currentBlock)
        setGasPrice(currentGasPrice)
      } catch (error) {
        console.error('Failed to update network info:', error)
      }
    }

    updateNetworkInfo()
    const interval = setInterval(updateNetworkInfo, 15000) // Update every 15 seconds

    return () => clearInterval(interval)
  }, [contractService])

  return {
    blockNumber,
    gasPrice,
    isConnected: !!contractService,
  }
}

// Enhanced hook for comprehensive user data
export function useUserDashboardData(address?: `0x${string}`) {
  const donationHistory = useDonationHistory(address)
  const nftCertificates = useNFTCertificates(address)
  const qrbnToken = useQRBNToken(address)
  const usdtOperations = useUSDTOperations(address)

  return {
    ...donationHistory,
    ...nftCertificates,
    ...qrbnToken,
    ...usdtOperations,
    isLoading: donationHistory.isLoading || nftCertificates.isLoading,
  }
}
