# QRBN DApp - Islamic Finance on Blockchain

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black)](https://nextjs.org/)
[![Ethereum](https://img.shields.io/badge/Blockchain-Lisk%20Sepolia-blue)](https://lisk.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

> A decentralized application (DApp) for Islamic finance, enabling transparent Qurban contributions, Zakat payments, and decentralized governance through blockchain technology.

## 🌟 Overview

QRBN is a revolutionary Islamic finance platform built on blockchain technology that brings transparency, trust, and efficiency to religious financial obligations. The platform enables Muslims worldwide to fulfill their religious duties through:

- **Qurban Contributions**: Participate in animal sacrifice with complete transparency
- **Zakat Payments**: Calculate and pay Zakat al-Maal and Zakat al-Fitrah
- **DAO Governance**: Community-driven decision making with Islamic compliance
- **NFT Certificates**: Immutable proof of religious contributions

## 🎯 Key Features

### 🐐 Qurban Platform
- **Animal Selection**: Choose from goats or cow shares with detailed information
- **Transparent Pricing**: Real-time pricing in USDT with Shariah compliance
- **NFT Certificates**: Receive blockchain-verified certificates of participation
- **Progress Tracking**: Monitor contribution pools and sacrifice progress

### 💰 Zakat Management
- **Smart Calculator**: Automated Zakat calculation based on wealth and nisab threshold
- **Dual Payment Types**: Support for both Zakat al-Maal and Zakat al-Fitrah
- **USDT Payments**: Stable cryptocurrency payments for global accessibility
- **Impact Tracking**: Real-time visibility of Zakat distribution and impact

### 🏛️ DAO Governance
- **Representative System**: Three-tier governance structure
  - Community Representatives (1,000+ QRBN tokens)
  - Organizational Representatives (5,000+ QRBN tokens)
  - Sharia Council (Special verification)
- **Proposal Voting**: Participate in platform governance decisions
- **Treasury Management**: Transparent community fund management

### 🔐 Web3 Integration
- **Multi-Wallet Support**: Connect using various wallet providers
- **Lisk Sepolia**: Built on scalable and eco-friendly blockchain
- **Smart Contracts**: Fully auditable and transparent operations
- **Real-time Data**: Live blockchain data integration

## 🏗️ Technical Architecture

### Frontend Stack
- **Framework**: Next.js 14.2 with TypeScript
- **Styling**: Tailwind CSS with custom Islamic-themed design
- **UI Components**: Radix UI primitives with shadcn/ui
- **State Management**: React Query for server state
- **Web3**: Wagmi + Viem for blockchain interactions

### Blockchain Infrastructure
- **Network**: Lisk Sepolia Testnet
- **Wallet Integration**: Xellar Kit for seamless connections
- **Smart Contracts**: Solidity-based contracts for all operations
- **Block Explorer**: Lisk Sepolia Blockscout integration

### Smart Contracts

| Contract | Address | Purpose |
|----------|---------|---------|
| QrbnToken | `0xF288b95F986bd297c3e6E283066CB52B6986E931` | QRBN governance token |
| QrbnGov | `0x20f0DC35b3439B8bd123a7968086A397cde38af7` | DAO governance contract |
| QrbnTimelock | `0x5a2B2Dd70740FE6e89f27c1873Cd51e2eA6128B4` | Governance timelock controller |
| Qurban | `0xcaba4eC21D3f63Ac33817a14564A0c9Da0E8410b` | Qurban contribution contract |
| QurbanNFT | `0x49316Dd941a78f27f431c072722b7C613D9731d4` | NFT certificates for Qurban |
| QrbnTreasury | `0x93a5FD10595F311f1134Ea673136CA22412e5158` | Community treasury |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Web3 wallet (MetaMask, WalletConnect compatible)
- Basic understanding of cryptocurrency and DeFi

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/qrbn-app/qrbn-new-frontend.git
   cd qrbn-dapp
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables**
   ```env
   # WalletConnect Project ID (get from https://cloud.walletconnect.com)
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id

   # Xellar Configuration
   NEXT_PUBLIC_XELLAR_APP_ID=fa0c9416-cbee-4ebc-bda7-03d146734f77
   NEXT_PUBLIC_XELLAR_ENV=sandbox
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

6. **Open application**
   Navigate to [http://localhost:3000](http://localhost:3000)

### WalletConnect Setup

1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Create a new project
3. Copy the Project ID to your `.env.local` file

## 📱 Application Flow

### 1. Wallet Connection
- Users connect their Web3 wallet using Xellar Kit
- Support for multiple wallet providers and social logins
- Automatic network switching to Lisk Sepolia

### 2. Dashboard Overview
- Real-time display of user balances (QRBN, USDT, NFTs)
- Contribution history and DAO participation status
- Eligibility checking for representative positions

### 3. Qurban Participation
1. **Animal Selection**: Browse available goats and cow shares
2. **Quality Verification**: View animal details, health certificates
3. **Payment Processing**: Secure USDT payment through smart contracts
4. **NFT Certificate**: Receive proof of participation as NFT
5. **Progress Tracking**: Monitor pool completion and sacrifice scheduling

### 4. Zakat Calculation & Payment
1. **Wealth Assessment**: Input total wealth for Zakat al-Maal
2. **Automatic Calculation**: System calculates 2.5% above nisab threshold
3. **Family Count**: Specify family members for Zakat al-Fitrah
4. **Payment Execution**: Direct USDT payment to verified recipients
5. **Impact Reports**: Track distribution and beneficiary impact

### 5. DAO Participation
1. **Eligibility Check**: Automated verification of token holdings
2. **Representative Application**: Apply for governance positions
3. **Proposal Voting**: Participate in community decisions
4. **Treasury Oversight**: Monitor community fund usage

## 🛠️ Development

### Project Structure

```
qrbn-dapp/
├── app/                    # Next.js app router pages
│   ├── dashboard/         # User dashboard
│   ├── qurban/           # Qurban platform
│   ├── zakat/            # Zakat calculator & payments
│   ├── dao/              # DAO governance
│   └── contracts/        # Smart contract demo
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   └── providers/        # Context providers
├── lib/                  # Utility libraries
│   ├── contracts.ts      # Contract addresses & ABIs
│   ├── contract-service.ts # Contract interaction layer
│   └── utils.ts          # Helper functions
├── hooks/                # Custom React hooks
└── public/              # Static assets
```

### Smart Contract Integration

The application integrates with smart contracts through a centralized service layer:

```typescript
// Example: Check DAO eligibility
const contracts = useContracts()
const requirements = await contracts?.checkDAORequirements(address, 'community')

// Example: Contribute to Qurban
const hash = await contracts.contributeQurban(amountInWei)

// Example: Get token balance
const balance = await contracts.getQrbnBalance(address)
const formatted = contracts.formatTokenAmount(balance)
```

### Key Components

- **WalletConnect**: Wallet connection and user authentication
- **PaymentModal**: Unified payment interface for Qurban/Zakat
- **UserDashboard**: Real-time user statistics and balances
- **ContractDemo**: Developer tools for contract interaction

### Adding New Features

1. **Smart Contract Updates**
   - Add new contract addresses to `lib/contracts.ts`
   - Extend contract ABIs with new functions
   - Update `ContractService` class with new methods

2. **UI Components**
   - Follow existing design patterns
   - Use Tailwind CSS with Islamic color scheme
   - Implement responsive design principles

3. **State Management**
   - Use React Query for server state
   - Implement optimistic updates for better UX
   - Handle loading and error states consistently

## 🧪 Testing

### Smart Contract Testing
- All contracts deployed on Lisk Sepolia testnet
- Use testnet tokens for development
- Block explorer: [https://sepolia-blockscout.lisk.com](https://sepolia-blockscout.lisk.com)

### Frontend Testing
```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

## 🚀 Deployment

### Build for Production
```bash
pnpm build
```

### Environment Variables (Production)
```env
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_production_project_id
NEXT_PUBLIC_XELLAR_APP_ID=your_production_app_id
NEXT_PUBLIC_XELLAR_ENV=production
```

### Deployment Platforms
- **Vercel**: Recommended for Next.js applications
- **Netlify**: Alternative static hosting
- **AWS/GCP**: For enterprise deployments

## 🔒 Security Considerations

- **Smart Contract Auditing**: All contracts undergo security audits
- **Wallet Signature Verification**: Secure authentication process
- **Environment Variables**: Sensitive data properly managed
- **Error Handling**: Comprehensive error boundaries and fallbacks
- **Rate Limiting**: API protection against abuse

## 🌍 Sharia Compliance

The platform ensures full compliance with Islamic principles:

- **Halal Investments**: Only Sharia-compliant financial instruments
- **Transparency**: Complete visibility of fund allocation
- **No Interest (Riba)**: Zero-interest financial operations
- **Zakat Calculation**: Accurate religious obligation calculations
- **Scholarly Oversight**: Sharia council governance participation

## 🤝 Contributing

We welcome contributions from the community! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Guidelines
1. Follow TypeScript best practices
2. Maintain test coverage above 80%
3. Use conventional commit messages
4. Ensure Sharia compliance in all features
5. Document API changes thoroughly

### Issue Reporting
- Use GitHub Issues for bug reports
- Provide detailed reproduction steps
- Include environment information
- Tag issues appropriately

## 📋 Roadmap

### Phase 1: Core Platform ✅
- [x] Qurban contribution system
- [x] Zakat calculator and payments
- [x] Basic DAO governance
- [x] NFT certificate generation

### Phase 2: Enhanced Features 🚧
- [ ] Mobile application
- [ ] Multi-language support (Arabic, Indonesian, etc.)
- [ ] Advanced DAO proposals
- [ ] Staking mechanisms

### Phase 3: Global Expansion 📅
- [ ] Multiple blockchain support
- [ ] Fiat currency integration
- [ ] Partnership with Islamic banks
- [ ] Global Zakat distribution network

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Islamic Finance Scholars**: For guidance on Sharia compliance
- **Lisk Foundation**: For blockchain infrastructure support
- **Open Source Community**: For the amazing tools and libraries
- **Muslim Developer Community**: For feedback and contributions

## 🔗 Links

- **Live Demo**: [https://qrbn.app](https://qrbn.app)
- **Documentation**: In Progress
- **Smart Contracts**: Contract Integration Guide in Progress
- **Web3 Setup**: [Web3 Integration Guide](docs/WEB3_SETUP.md)
- **Block Explorer**: [Lisk Sepolia Blockscout](https://sepolia-blockscout.lisk.com)

---

**Made with ❤️ for the global Muslim community**

*"And whoever does good equal to the weight of an atom will see it."* - Quran 99:7
