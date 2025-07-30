# Smart Contract Integration Guide

## Overview

Your QRBN dApp is now fully integrated with Lisk Sepolia and your smart contracts. Here's how everything works together:

## Smart Contract Addresses (Lisk Sepolia)

```
QrbnTimelock:  0x5a2B2Dd70740FE6e89f27c1873Cd51e2eA6128B4
QrbnGov:       0x20f0DC35b3439B8bd123a7968086A397cde38af7
QrbnToken:     0xF288b95F986bd297c3e6E283066CB52B6986E931
Qurban:        0xcaba4eC21D3f63Ac33817a14564A0c9Da0E8410b
QurbanNFT:     0x49316Dd941a78f27f431c072722b7C613D9731d4
QrbnTreasury:  0x93a5FD10595F311f1134Ea673136CA22412e5158
```

## How to Interact with Contracts

### 1. Using the Hooks (Recommended)

```typescript
import { useQurbanDonation, useZakatDonation, useTreasuryData } from '@/hooks/use-contracts'

// Make a Qurban donation
const { makeQurbanDonation, isLoading } = useQurbanDonation()
await makeQurbanDonation(0.1, "goat", "Indonesia")

// Make a Zakat donation
const { makeZakatDonation } = useZakatDonation()
await makeZakatDonation(0.05)

// Get treasury data
const { totalBalance, zakatBalance, qurbanBalance } = useTreasuryData()
```

### 2. Using the Contract Service (Advanced)

```typescript
import { useContractService } from '@/hooks/use-contracts'
import { useAccount } from 'wagmi'

const contractService = useContractService()
const { address } = useAccount()

// Get user's NFTs
const nfts = await contractService.getUserNFTs(address)

// Get donation history
const history = await contractService.getDonationHistory(address)

// Get treasury data
const treasuryData = await contractService.getTreasuryData()
```

## Key Features

### ✅ Wallet Connection
- Xellar Kit integration with Lisk Sepolia
- Automatic network switching 
- Support for multiple wallet types

### ✅ Smart Contract Interactions
- **Qurban Donations**: Direct ETH payments with animal type and location
- **Zakat Donations**: Simplified ETH donations 
- **NFT Certificates**: Automatic minting after donations
- **Treasury Management**: Real-time balance tracking
- **DAO Governance**: Proposal viewing and voting

### ✅ Real-time Data
- Live treasury balances
- User donation history
- NFT certificate tracking
- Network status monitoring

### ✅ Transaction Management
- Transaction signing via Xellar Kit
- Progress tracking
- Error handling with user-friendly messages
- Block explorer links for verification

## Available Contract Methods

### Qurban Contract
- `makeQurbanDonation(amount, animalType, location)` - Make Qurban donation
- `makeZakatDonation(amount)` - Make Zakat donation  
- `getDonationHistory(donor)` - Get user's donation history
- `totalDonations()` - Get total platform donations

### QurbanNFT Contract
- `balanceOf(owner)` - Get user's NFT count
- `tokenOfOwnerByIndex(owner, index)` - Get user's token IDs
- `tokenURI(tokenId)` - Get NFT metadata

### Treasury Contract
- `getTreasuryBalance()` - Get total treasury balance
- `getZakatBalance()` - Get Zakat fund balance
- `getQurbanBalance()` - Get Qurban fund balance

### Token Contract (QRBN)
- `balanceOf(account)` - Get user's token balance
- `totalSupply()` - Get total token supply
- `name()` & `symbol()` - Get token details

## Testing Your Integration

1. **Connect Wallet**: Use Xellar Kit to connect to Lisk Sepolia
2. **Check Dashboard**: Visit `/dashboard` to see the "Smart Contracts" tab
3. **View Live Data**: See real-time contract data and network status
4. **Make Test Donations**: Use the payment modals on `/qurban` and `/zakat`
5. **Verify Transactions**: Check transaction hashes on [Lisk Sepolia Explorer](https://sepolia-blockscout.lisk.com)

## Environment Variables Required

```env
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_XELLAR_APP_ID=fa0c9416-cbee-4ebc-bda7-03d146734f77
NEXT_PUBLIC_XELLAR_ENV=sandbox
```

## Network Details

- **Network**: Lisk Sepolia Testnet
- **Chain ID**: 4202
- **RPC URL**: https://rpc.sepolia-api.lisk.com
- **Explorer**: https://sepolia-blockscout.lisk.com
- **Native Token**: ETH (Testnet)

## Next Steps

1. **Test all contract interactions** using the dashboard
2. **Monitor transaction confirmations** via the block explorer
3. **Implement error handling** for edge cases
4. **Add more contract methods** as needed
5. **Deploy to mainnet** when ready (update contract addresses)

Your dApp is now fully functional with Web3 integration! 🎉
