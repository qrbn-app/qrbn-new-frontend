# QRBN Smart Contract Integration

This document describes how the QRBN DApp integrates with smart contracts deployed on Lisk Sepolia testnet.

## Contract Addresses (Lisk Sepolia)

| Contract | Address | Purpose |
|----------|---------|---------|
| QrbnTimelock | `0xD480E4394b1Df72b39eAdBb0ce36ccB19dB5867C` | DAO governance timelock controller |
| QrbnGov | `0x1057C3615610f1F1a90B8c6c094a9DDE3D70bC2B` | DAO governance contract |
| QrbnToken | `0x0061f6008E05935386E5Ad5b5A608EAd0D062698` | QRBN governance token |
| Qurban | `0x94c9dCb80Dc75484b0270152372aCcd2a318e609` | Qurban contribution contract |
| QurbanNFT | `0x6271C03042f41B8e08DDe8413a7d0db4597E51c1` | NFT certificates for Qurban |
| Zakat | `0x7cE0B440AcD36820c429bdfD9899a5e59D33BE5b` | Zakat donation contract |
| ZakatNFT | `0x2A628BACF45cb6b9Dcf8305A2615693023068B1A` | NFT certificates for Zakat |
| QrbnTreasury | `0x841e2afAAfE341e172Ec1a080898D98302F6bb80` | Community treasury |

## Architecture Overview

### 1. **Web3 Provider Setup**
- Uses Xellar Kit for wallet connections
- Configured for Lisk Sepolia testnet
- Handles wallet authentication with backend

### 2. **Contract Service**
- `lib/contract-service.ts` - Centralized contract interaction layer
- `lib/contracts.ts` - Contract addresses and ABIs
- `hooks/use-contracts.ts` - React hook for contract access

### 3. **DAO Integration**
- **Community Representatives**: Minimum 1,000 QRBN tokens + Qurban participation
- **Organizational Representatives**: Minimum 5,000 QRBN tokens + verified organization
- **Sharia Council**: Special verification process for Islamic scholars

## Key Features

### Smart Contract Data Display
- Real-time QRBN token balances
- NFT certificate counts (Qurban and Zakat)
- Qurban pool contributions
- Zakat pool contributions and nisab calculations
- DAO proposal counts
- Treasury status

### DAO Representative Registration
1. **Eligibility Check**: Automated verification of token holdings and contribution history
2. **Application Process**: Google Forms integration for each representative type
3. **Requirements Validation**: On-chain verification of qualifications

### Tally.xyz Integration
- Direct links to governance platform
- Seamless transition from DApp to voting interface
- Proposal viewing and voting functionality

## Usage Examples

### Check User Eligibility
```typescript
const contracts = useContracts()
const requirements = await contracts?.checkDAORequirements(address, 'community')
```

### Get Token Balance
```typescript
const balance = await contracts?.getQrbnBalance(address)
const formatted = contracts?.formatTokenAmount(balance)
```

### Check Zakat Pool and Nisab
```typescript
const zakatPool = await contracts?.getCurrentZakatPool()
const nisabThreshold = await contracts?.getNisabThreshold()
const zakatRate = await contracts?.getZakatRate()
const fitrahAmount = await contracts?.getFitrahAmount()
```

### Get User Zakat Contributions
```typescript
const zakatContributions = await contracts?.getUserZakatContributions(address)
const zakatNftBalance = await contracts?.getZakatNFTBalance(address)
```

### View Contract on Block Explorer
All contracts link to Lisk Sepolia Blockscout for transparency.

## DAO Representative Types

### Community Representative
- **Requirements**: 1,000 QRBN tokens, active participation, Qurban contribution
- **Responsibilities**: Community advocacy, feedback collection, onboarding
- **Application**: [Community Rep Form](https://forms.google.com/community-representative)

### Organizational Representative  
- **Requirements**: 5,000 QRBN tokens, verified organization, documentation
- **Responsibilities**: Partnership facilitation, institutional compliance
- **Application**: [Org Rep Form](https://forms.google.com/organizational-representative)

### Sharia Council Member
- **Requirements**: Islamic scholar certification, endorsement, background check
- **Responsibilities**: Sharia compliance review, religious guidance, proposal veto power
- **Application**: [Sharia Council Form](https://forms.google.com/sharia-council-member)

## Development

### Adding New Contracts
1. Add contract address to `CONTRACT_ADDRESSES` in `lib/contracts.ts`
2. Add contract ABI to the same file
3. Extend `ContractService` class with new methods
4. Update UI components to display new data

### Testing
- All contracts deployed on Lisk Sepolia testnet
- Use testnet tokens for development
- Block explorer: https://sepolia-blockscout.lisk.com

## Integration Points

### Payment Modal
- Connect to Zakat and Qurban contracts for actual payments
- Zakat payments through dedicated Zakat contract
- Qurban contributions through Qurban contract
- NFT minting upon successful contribution

### Dashboard
- Live contract data display
- User statistics from blockchain (Qurban and Zakat contributions)
- NFT certificate gallery (Qurban and Zakat NFTs)
- Zakat calculation tools with real-time nisab and rates

### Navigation
- DAO page replaces external Tally link
- Integrated representative registration
- Contract demo section

## Security Considerations

- All contract addresses are hardcoded for security
- ABIs include only necessary functions
- Error handling for failed contract calls
- Wallet signature verification for authentication

## Next Steps

1. **Enhanced Zakat Features**: Implement real-time nisab calculations and automatic Zakat eligibility checks
2. **Enhanced ABIs**: Add full contract ABIs for complete functionality  
3. **Event Listening**: Subscribe to contract events for real-time updates
4. **Governance Actions**: Direct proposal creation and voting from DApp
5. **Treasury Management**: Admin interface for treasury operations
6. **Zakat Distribution**: Track and display Zakat fund allocation and impact

This integration provides a solid foundation for the QRBN DApp to interact with its smart contract ecosystem while maintaining transparency and user experience.
