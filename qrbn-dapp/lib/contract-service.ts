import { PublicClient, WalletClient, formatEther, parseEther, Address } from 'viem'
import { 
  CONTRACTS, 
  QURBAN_ABI, 
  QURBAN_NFT_ABI, 
  TREASURY_ABI, 
  ERC20_ABI, 
  GOVERNOR_ABI,
  USDT_ADDRESS,
  USDT_ABI 
} from './contracts'

export class ContractService {
  constructor(
    private publicClient: PublicClient,
    private walletClient?: WalletClient
  ) {}

  // Qurban Contract Methods
  async makeQurbanDonation(
    amount: number,
    animalType: string,
    location: string,
    account: Address
  ) {
    if (!this.walletClient) throw new Error('Wallet client not available')

    const { request } = await this.publicClient.simulateContract({
      address: CONTRACTS.Qurban,
      abi: QURBAN_ABI,
      functionName: 'makeQurbanDonation',
      args: [parseEther(amount.toString()), animalType, location],
      value: parseEther(amount.toString()),
      account,
    })

    return await this.walletClient.writeContract(request)
  }

  async makeZakatDonation(amount: number, account: Address) {
    if (!this.walletClient) throw new Error('Wallet client not available')

    const { request } = await this.publicClient.simulateContract({
      address: CONTRACTS.Qurban,
      abi: QURBAN_ABI,
      functionName: 'makeZakatDonation',
      args: [parseEther(amount.toString())],
      value: parseEther(amount.toString()),
      account,
    })

    return await this.walletClient.writeContract(request)
  }

  async getDonationHistory(donor: Address) {
    const result = await this.publicClient.readContract({
      address: CONTRACTS.Qurban,
      abi: QURBAN_ABI,
      functionName: 'getDonationHistory',
      args: [donor],
    })

    return result.map((donation: any) => ({
      amount: formatEther(donation.amount),
      animalType: donation.animalType,
      location: donation.location,
      timestamp: new Date(Number(donation.timestamp) * 1000),
      nftMinted: donation.nftMinted,
    }))
  }

  async getTotalDonations() {
    const result = await this.publicClient.readContract({
      address: CONTRACTS.Qurban,
      abi: QURBAN_ABI,
      functionName: 'totalDonations',
    })

    return formatEther(result)
  }

  // NFT Contract Methods
  async getUserNFTs(owner: Address) {
    const balance = await this.publicClient.readContract({
      address: CONTRACTS.QurbanNFT,
      abi: QURBAN_NFT_ABI,
      functionName: 'balanceOf',
      args: [owner],
    })

    const nftCount = Number(balance)
    const tokenIds: bigint[] = []

    // Get all token IDs owned by user
    for (let i = 0; i < nftCount; i++) {
      const tokenId = await this.publicClient.readContract({
        address: CONTRACTS.QurbanNFT,
        abi: QURBAN_NFT_ABI,
        functionName: 'tokenOfOwnerByIndex',
        args: [owner, BigInt(i)],
      })
      tokenIds.push(tokenId)
    }

    // Get metadata for each token
    const nfts = await Promise.all(
      tokenIds.map(async (tokenId) => {
        const tokenURI = await this.publicClient.readContract({
          address: CONTRACTS.QurbanNFT,
          abi: QURBAN_NFT_ABI,
          functionName: 'tokenURI',
          args: [tokenId],
        })

        return {
          tokenId: tokenId.toString(),
          tokenURI,
        }
      })
    )

    return nfts
  }

  // Treasury Contract Methods
  async getTreasuryData() {
    const [totalBalance, zakatBalance, qurbanBalance] = await Promise.all([
      this.publicClient.readContract({
        address: CONTRACTS.QrbnTreasury,
        abi: TREASURY_ABI,
        functionName: 'getTreasuryBalance',
      }),
      this.publicClient.readContract({
        address: CONTRACTS.QrbnTreasury,
        abi: TREASURY_ABI,
        functionName: 'getZakatBalance',
      }),
      this.publicClient.readContract({
        address: CONTRACTS.QrbnTreasury,
        abi: TREASURY_ABI,
        functionName: 'getQurbanBalance',
      }),
    ])

    return {
      totalBalance: formatEther(totalBalance),
      zakatBalance: formatEther(zakatBalance),
      qurbanBalance: formatEther(qurbanBalance),
    }
  }

  // Token Contract Methods
  async getQRBNTokenData(account?: Address) {
    const [totalSupply, name, symbol, balance] = await Promise.all([
      this.publicClient.readContract({
        address: CONTRACTS.QrbnToken,
        abi: ERC20_ABI,
        functionName: 'totalSupply',
      }),
      this.publicClient.readContract({
        address: CONTRACTS.QrbnToken,
        abi: ERC20_ABI,
        functionName: 'name',
      }),
      this.publicClient.readContract({
        address: CONTRACTS.QrbnToken,
        abi: ERC20_ABI,
        functionName: 'symbol',
      }),
      account ? this.publicClient.readContract({
        address: CONTRACTS.QrbnToken,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [account],
      }) : Promise.resolve(BigInt(0)),
    ])

    return {
      totalSupply: formatEther(totalSupply),
      name,
      symbol,
      balance: formatEther(balance),
    }
  }

  async getUSDTBalance(account: Address) {
    const balance = await this.publicClient.readContract({
      address: USDT_ADDRESS,
      abi: USDT_ABI,
      functionName: 'balanceOf',
      args: [account],
    })

    // USDT typically has 6 decimals
    return (Number(balance) / 1e6).toString()
  }

  async approveUSDT(spender: Address, amount: number, account: Address) {
    if (!this.walletClient) throw new Error('Wallet client not available')

    const { request } = await this.publicClient.simulateContract({
      address: USDT_ADDRESS,
      abi: USDT_ABI,
      functionName: 'approve',
      args: [spender, BigInt(amount * 1e6)], // USDT has 6 decimals
      account,
    })

    return await this.walletClient.writeContract(request)
  }

  // Governor Contract Methods
  async getProposalCount() {
    const count = await this.publicClient.readContract({
      address: CONTRACTS.QrbnGov,
      abi: GOVERNOR_ABI,
      functionName: 'proposalCount',
    })

    return Number(count)
  }

  async getProposalState(proposalId: number) {
    const state = await this.publicClient.readContract({
      address: CONTRACTS.QrbnGov,
      abi: GOVERNOR_ABI,
      functionName: 'state',
      args: [BigInt(proposalId)],
    })

    const stateNames = [
      'Pending',
      'Active', 
      'Canceled',
      'Defeated',
      'Succeeded',
      'Queued',
      'Expired',
      'Executed'
    ]

    return stateNames[Number(state)] || 'Unknown'
  }

  // Utility Methods
  async getTransactionReceipt(hash: `0x${string}`) {
    return await this.publicClient.getTransactionReceipt({ hash })
  }

  async waitForTransaction(hash: `0x${string}`) {
    return await this.publicClient.waitForTransactionReceipt({ hash })
  }

  async getBlockNumber() {
    return await this.publicClient.getBlockNumber()
  }

  async getGasPrice() {
    return await this.publicClient.getGasPrice()
  }

  // Helper to estimate gas for transactions
  async estimateGas(
    to: Address,
    data: `0x${string}`,
    value?: bigint,
    account?: Address
  ) {
    return await this.publicClient.estimateGas({
      to,
      data,
      value,
      account,
    })
  }
}

// Factory function to create contract service
export function createContractService(
  publicClient: PublicClient,
  walletClient?: WalletClient
) {
  return new ContractService(publicClient, walletClient)
}
