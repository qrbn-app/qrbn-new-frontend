# QRBN Smart Contract Integration

This document describes how the QRBN DApp integrates with smart contracts deployed on Lisk Sepolia testnet.

## Contract Addresses (Lisk Sepolia)

| Contract | Address | Purpose |
|----------|---------|---------|
| QrbnTimelock | `0x163dcB447774C8c0dF1ccCcb653b1a2E89c7E8aF` | DAO governance timelock controller |
| QrbnGov | `0x53f338F6ceFB06Afb37a1cfbb9AA3B600D52eeA0` | DAO governance contract |
| QrbnToken | `0xD91dFc79E1a4b551a3fd6eAE20b66612a0E8aA4a` | QRBN governance token |
| Qurban | `0x8429B08E77CcDeafbA6F9cf23e1E19660F6A98C9` | Qurban contribution contract |
| QurbanNFT | `0x6448807DC186f1391C744578F79ACa6C72a6582F` | NFT certificates for Qurban |
| QrbnTreasury | `0xb999a4e2C3bCdb862246DD8158715720DB0463d3` | Community treasury |

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
- NFT certificate counts  
- Qurban pool contributions
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
- Currently mocked but ready for smart contract integration
- Will call Qurban/Zakat contracts for actual payments
- NFT minting upon successful contribution

### Dashboard
- Live contract data display
- User statistics from blockchain
- NFT certificate gallery

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

1. **Payment Integration**: Connect payment modal to actual smart contracts
2. **Enhanced ABIs**: Add full contract ABIs for complete functionality  
3. **Event Listening**: Subscribe to contract events for real-time updates
4. **Governance Actions**: Direct proposal creation and voting from DApp
5. **Treasury Management**: Admin interface for treasury operations

This integration provides a solid foundation for the QRBN DApp to interact with its smart contract ecosystem while maintaining transparency and user experience.
