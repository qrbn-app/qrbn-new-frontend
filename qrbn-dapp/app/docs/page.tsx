"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  Code, 
  Wallet, 
  Shield, 
  Users, 
  ExternalLink,
  Copy,
  CheckCircle,
  Heart,
  Utensils,
  Coins,
  Vote,
  GitBranch,
  Terminal,
  Database,
  Settings,
  Network,
  FileText,
  Globe,
  Zap,
  Building
} from "lucide-react"

interface DocSection {
  id: string
  title: string
  category: string
  icon: React.ReactNode
  content: React.ReactNode
}

const DocSection = ({ section, isActive, onClick }: { 
  section: DocSection; 
  isActive: boolean; 
  onClick: () => void 
}) => (
  <div
    className={`p-4 rounded-lg cursor-pointer transition-all ${
      isActive 
        ? "bg-[#d1b86a]/10 border-[#d1b86a]/30 border" 
        : "bg-[#14532d]/20 hover:bg-[#14532d]/40"
    }`}
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      <div className="text-[#d1b86a]">{section.icon}</div>
      <div>
        <h3 className={`font-medium ${isActive ? "text-[#d1b86a]" : "text-[#f0fdf4]"}`}>
          {section.title}
        </h3>
        <Badge variant="outline" className="bg-[#14532d] text-[#f0fdf4]/70 border-[#14532d] text-xs mt-1">
          {section.category}
        </Badge>
      </div>
    </div>
  </div>
)

const CodeBlock = ({ children, language = "bash" }: { children: string; language?: string }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between bg-[#0a1f14] px-4 py-2 rounded-t-lg border border-[#14532d]">
        <span className="text-[#f0fdf4]/70 text-sm font-mono">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-6 px-2 text-[#f0fdf4]/70 hover:text-[#d1b86a]"
        >
          {copied ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        </Button>
      </div>
      <pre className="bg-[#071a12] p-4 rounded-b-lg border border-t-0 border-[#14532d] overflow-x-auto">
        <code className="text-[#f0fdf4] text-sm font-mono">{children}</code>
      </pre>
    </div>
  )
}

const docSections: DocSection[] = [
  {
    id: "overview",
    title: "Platform Overview",
    category: "Introduction",
    icon: <BookOpen className="h-5 w-5" />,
    content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#f0fdf4] mb-4">Welcome to QRBN.app</h2>
          <p className="text-[#f0fdf4]/70 mb-4">
            QRBN.app is a revolutionary blockchain-based platform that bridges traditional Islamic finance 
            with modern decentralized technology. Our platform enables transparent, efficient, and 
            Sharia-compliant donations for Zakat and Qurban offerings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-[#14532d]/30 border-[#14532d]">
            <CardContent className="p-4">
              <Heart className="h-8 w-8 text-[#d1b86a] mb-3" />
              <h3 className="text-[#f0fdf4] font-semibold mb-2">Zakat Management</h3>
              <p className="text-[#f0fdf4]/70 text-sm">
                Automated calculation and transparent distribution of Zakat funds to verified recipients.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#14532d]/30 border-[#14532d]">
            <CardContent className="p-4">
              <Utensils className="h-8 w-8 text-[#d1b86a] mb-3" />
              <h3 className="text-[#f0fdf4] font-semibold mb-2">Qurban Offerings</h3>
              <p className="text-[#f0fdf4]/70 text-sm">
                Digital participation in sacrificial offerings with NFT certificates and full compliance.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#14532d]/30 border-[#14532d]">
            <CardContent className="p-4">
              <Coins className="h-8 w-8 text-[#d1b86a] mb-3" />
              <h3 className="text-[#f0fdf4] font-semibold mb-2">QRBN Tokens</h3>
              <p className="text-[#f0fdf4]/70 text-sm">
                Earn governance tokens for donations and participate in platform decision-making.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#14532d]/30 border-[#14532d]">
            <CardContent className="p-4">
              <Vote className="h-8 w-8 text-[#d1b86a] mb-3" />
              <h3 className="text-[#f0fdf4] font-semibold mb-2">DAO Governance</h3>
              <p className="text-[#f0fdf4]/70 text-sm">
                Decentralized governance with community, organizational, and Sharia representatives.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: "getting-started",
    title: "Getting Started",
    category: "Quick Start",
    icon: <Zap className="h-5 w-5" />,
    content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#f0fdf4] mb-4">Quick Start Guide</h2>
          <p className="text-[#f0fdf4]/70 mb-6">
            Follow these simple steps to start using QRBN.app for your Islamic donations.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-[#d1b86a] text-[#071a12] rounded-full flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="text-[#f0fdf4] font-semibold mb-2">Connect Your Wallet</h3>
              <p className="text-[#f0fdf4]/70 mb-2">
                Click "Connect Wallet" and choose from MetaMask, WalletConnect, or other supported wallets.
              </p>
              <Badge className="bg-[#14532d] text-[#f0fdf4]">Network: Lisk Sepolia</Badge>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-[#d1b86a] text-[#071a12] rounded-full flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="text-[#f0fdf4] font-semibold mb-2">Get Test Tokens</h3>
              <p className="text-[#f0fdf4]/70 mb-2">
                For testing, you'll need USDT tokens on Lisk Sepolia. Get them from our faucet or testnet sources.
              </p>
              <Button variant="outline" size="sm" className="border-[#d1b86a] text-[#d1b86a] hover:bg-[#d1b86a] hover:text-[#071a12]">
                Get Test USDT <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-[#d1b86a] text-[#071a12] rounded-full flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="text-[#f0fdf4] font-semibold mb-2">Make Your First Donation</h3>
              <p className="text-[#f0fdf4]/70">
                Visit the Zakat or Qurban pages, calculate your contribution, and make your first blockchain-based Islamic donation.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "wallet-setup",
    title: "Wallet Setup",
    category: "Web3",
    icon: <Wallet className="h-5 w-5" />,
    content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#f0fdf4] mb-4">Wallet Setup & Configuration</h2>
          <p className="text-[#f0fdf4]/70 mb-6">
            Learn how to set up and configure your Web3 wallet for QRBN.app.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#f0fdf4] mb-3">Supported Wallets</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-[#14532d]/30 border-[#14532d] text-center p-4">
              <h4 className="text-[#f0fdf4] font-medium">MetaMask</h4>
              <p className="text-[#f0fdf4]/70 text-sm">Most popular browser extension wallet</p>
            </Card>
            <Card className="bg-[#14532d]/30 border-[#14532d] text-center p-4">
              <h4 className="text-[#f0fdf4] font-medium">WalletConnect</h4>
              <p className="text-[#f0fdf4]/70 text-sm">Mobile wallet connection protocol</p>
            </Card>
            <Card className="bg-[#14532d]/30 border-[#14532d] text-center p-4">
              <h4 className="text-[#f0fdf4] font-medium">Other Wallets</h4>
              <p className="text-[#f0fdf4]/70 text-sm">Coinbase Wallet, Trust Wallet, etc.</p>
            </Card>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#f0fdf4] mb-3">Add Lisk Sepolia Network</h3>
          <p className="text-[#f0fdf4]/70 mb-4">
            To use QRBN.app, add the Lisk Sepolia network to your wallet:
          </p>
          <CodeBlock language="json">
{`{
  "chainId": "0x106a",
  "chainName": "Lisk Sepolia Testnet",
  "nativeCurrency": {
    "name": "Sepolia Ether",
    "symbol": "ETH",
    "decimals": 18
  },
  "rpcUrls": ["https://rpc.sepolia-api.lisk.com"],
  "blockExplorerUrls": ["https://sepolia-blockscout.lisk.com"]
}`}
          </CodeBlock>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#f0fdf4] mb-3">Import QRBN Token</h3>
          <p className="text-[#f0fdf4]/70 mb-4">
            To see your QRBN tokens in your wallet, import the token contract:
          </p>
          <div className="bg-[#14532d]/30 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#f0fdf4]/70 text-sm">Token Address:</span>
              <Badge className="bg-[#d1b86a] text-[#071a12]">Lisk Sepolia</Badge>
            </div>
            <code className="text-[#d1b86a] text-sm break-all">0x1234567890123456789012345678901234567890</code>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "smart-contracts",
    title: "Smart Contracts",
    category: "Technical",
    icon: <Code className="h-5 w-5" />,
    content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#f0fdf4] mb-4">Smart Contract Architecture</h2>
          <p className="text-[#f0fdf4]/70 mb-6">
            QRBN.app uses a modular smart contract architecture to ensure security, upgradeability, and Islamic compliance.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#f0fdf4] mb-3">Core Contracts</h3>
          <div className="space-y-4">
            <Card className="bg-[#14532d]/30 border-[#14532d]">
              <CardHeader className="pb-3">
                <CardTitle className="text-[#f0fdf4] text-base flex items-center gap-2">
                  <Database className="h-4 w-4 text-[#d1b86a]" />
                  QRBN Token Contract
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-[#f0fdf4]/70 text-sm mb-3">
                  ERC-20 governance token with minting controls and DAO integration.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#f0fdf4]/70">Address:</span>
                    <code className="text-[#d1b86a]">0x1234...7890</code>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#f0fdf4]/70">Symbol:</span>
                    <code className="text-[#d1b86a]">QRBN</code>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#14532d]/30 border-[#14532d]">
              <CardHeader className="pb-3">
                <CardTitle className="text-[#f0fdf4] text-base flex items-center gap-2">
                  <Heart className="h-4 w-4 text-[#d1b86a]" />
                  Zakat Distribution Contract
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-[#f0fdf4]/70 text-sm mb-3">
                  Handles Zakat calculations, recipient verification, and transparent fund distribution.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#f0fdf4]/70">Address:</span>
                    <code className="text-[#d1b86a]">0x2345...8901</code>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#f0fdf4]/70">Recipients:</span>
                    <Badge className="bg-[#14532d] text-[#f0fdf4]">8 Categories</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#14532d]/30 border-[#14532d]">
              <CardHeader className="pb-3">
                <CardTitle className="text-[#f0fdf4] text-base flex items-center gap-2">
                  <Utensils className="h-4 w-4 text-[#d1b86a]" />
                  Qurban NFT Contract
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-[#f0fdf4]/70 text-sm mb-3">
                  ERC-721 contract for issuing certificates of Qurban participation.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#f0fdf4]/70">Address:</span>
                    <code className="text-[#d1b86a]">0x3456...9012</code>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#f0fdf4]/70">Standard:</span>
                    <Badge className="bg-[#14532d] text-[#f0fdf4]">ERC-721</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#f0fdf4] mb-3">Key Functions</h3>
          <div className="space-y-3">
            <CodeBlock language="solidity">
{`// Zakat donation function
function donateZakat(uint256 amount, address[] memory recipients) external;

// Qurban participation function  
function participateQurban(QurbanType qType, uint256 shares) external payable;

// Token claiming function
function claimRewards() external;`}
            </CodeBlock>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "api-reference",
    title: "API Reference",
    category: "Technical",
    icon: <Terminal className="h-5 w-5" />,
    content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#f0fdf4] mb-4">Frontend Integration Guide</h2>
          <p className="text-[#f0fdf4]/70 mb-6">
            Learn how to integrate QRBN.app's functionality into your own applications.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#f0fdf4] mb-3">Web3 Hooks</h3>
          <p className="text-[#f0fdf4]/70 mb-4">
            We provide custom React hooks for easy blockchain integration:
          </p>
          <CodeBlock language="typescript">
{`import { useContracts } from '@/hooks/use-contracts'
import { useAccount } from 'wagmi'

function MyComponent() {
  const { address, isConnected } = useAccount()
  const contracts = useContracts()

  const handleZakatDonation = async (amount: string) => {
    if (!contracts || !address) return
    
    try {
      const tx = await contracts.donateZakat(amount)
      console.log('Transaction hash:', tx.hash)
    } catch (error) {
      console.error('Donation failed:', error)
    }
  }
}`}
          </CodeBlock>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#f0fdf4] mb-3">Contract Methods</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-[#f0fdf4] font-medium mb-2">Zakat Operations</h4>
              <CodeBlock language="typescript">
{`// Calculate Zakat amount
const zakatAmount = await contracts.calculateZakat(totalWealth)

// Get user's contribution history
const contributions = await contracts.getUserContributions(address)

// Check recipient verification status
const isVerified = await contracts.isRecipientVerified(recipientAddress)`}
              </CodeBlock>
            </div>

            <div>
              <h4 className="text-[#f0fdf4] font-medium mb-2">Qurban Operations</h4>
              <CodeBlock language="typescript">
{`// Get available Qurban packages
const packages = await contracts.getQurbanPackages()

// Participate in Qurban offering
const tx = await contracts.participateQurban(packageId, shares)

// Get user's NFT certificates
const nfts = await contracts.getUserQurbanNFTs(address)`}
              </CodeBlock>
            </div>

            <div>
              <h4 className="text-[#f0fdf4] font-medium mb-2">Token Operations</h4>
              <CodeBlock language="typescript">
{`// Get QRBN token balance
const balance = await contracts.getQrbnBalance(address)

// Check pending rewards
const rewards = await contracts.getPendingRewards(address)

// Claim earned tokens
const tx = await contracts.claimRewards()`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "security",
    title: "Security & Audits",
    category: "Security",
    icon: <Shield className="h-5 w-5" />,
    content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#f0fdf4] mb-4">Security & Trust</h2>
          <p className="text-[#f0fdf4]/70 mb-6">
            QRBN.app prioritizes security and transparency in all operations. Learn about our security measures and audit reports.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-[#14532d]/30 border-[#14532d]">
            <CardHeader>
              <CardTitle className="text-[#f0fdf4] flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#d1b86a]" />
                Smart Contract Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-[#f0fdf4]/70 text-sm">Multi-signature admin controls</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-[#f0fdf4]/70 text-sm">Emergency pause mechanisms</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-[#f0fdf4]/70 text-sm">Third-party security audits</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-[#f0fdf4]/70 text-sm">Open-source verification</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#14532d]/30 border-[#14532d]">
            <CardHeader>
              <CardTitle className="text-[#f0fdf4] flex items-center gap-2">
                <Users className="h-5 w-5 text-[#d1b86a]" />
                Islamic Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-[#f0fdf4]/70 text-sm">Sharia advisory board</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-[#f0fdf4]/70 text-sm">No interest-based mechanisms</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-[#f0fdf4]/70 text-sm">Transparent fund distribution</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-[#f0fdf4]/70 text-sm">Regular compliance audits</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#f0fdf4] mb-3">Audit Reports</h3>
          <div className="space-y-3">
            <Card className="bg-[#14532d]/30 border-[#14532d]">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-[#f0fdf4] font-medium">Smart Contract Audit v1.0</h4>
                    <p className="text-[#f0fdf4]/70 text-sm">Comprehensive security review by leading audit firm</p>
                    <Badge className="bg-green-600 text-white mt-2">✓ Passed</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="border-[#d1b86a] text-[#d1b86a]">
                    <FileText className="h-3 w-3 mr-1" />
                    View Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#14532d]/30 border-[#14532d]">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-[#f0fdf4] font-medium">Sharia Compliance Review</h4>
                    <p className="text-[#f0fdf4]/70 text-sm">Islamic finance compliance verification</p>
                    <Badge className="bg-green-600 text-white mt-2">✓ Compliant</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="border-[#d1b86a] text-[#d1b86a]">
                    <FileText className="h-3 w-3 mr-1" />
                    View Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "governance",
    title: "DAO Governance",
    category: "Governance",
    icon: <Vote className="h-5 w-5" />,
    content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#f0fdf4] mb-4">Decentralized Governance</h2>
          <p className="text-[#f0fdf4]/70 mb-6">
            QRBN DAO enables community-driven decision making through transparent, on-chain governance mechanisms.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#f0fdf4] mb-3">Governance Structure</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-[#14532d]/30 border-[#14532d] text-center p-4">
              <Users className="h-8 w-8 text-[#d1b86a] mx-auto mb-3" />
              <h4 className="text-[#f0fdf4] font-medium mb-2">Community Representatives</h4>
              <p className="text-[#f0fdf4]/70 text-sm">Elected by token holders to represent community interests</p>
              <Badge className="bg-[#14532d] text-[#f0fdf4] mt-2">Min: 1,000 QRBN</Badge>
            </Card>

            <Card className="bg-[#14532d]/30 border-[#14532d] text-center p-4">
              <Building className="h-8 w-8 text-[#d1b86a] mx-auto mb-3" />
              <h4 className="text-[#f0fdf4] font-medium mb-2">Organizational Reps</h4>
              <p className="text-[#f0fdf4]/70 text-sm">Institutional partners and major stakeholders</p>
              <Badge className="bg-[#14532d] text-[#f0fdf4] mt-2">Min: 5,000 QRBN</Badge>
            </Card>

            <Card className="bg-[#14532d]/30 border-[#14532d] text-center p-4">
              <BookOpen className="h-8 w-8 text-[#d1b86a] mx-auto mb-3" />
              <h4 className="text-[#f0fdf4] font-medium mb-2">Sharia Representatives</h4>
              <p className="text-[#f0fdf4]/70 text-sm">Islamic scholars ensuring religious compliance</p>
              <Badge className="bg-[#14532d] text-[#f0fdf4] mt-2">Special Approval</Badge>
            </Card>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#f0fdf4] mb-3">Proposal Process</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#d1b86a] text-[#071a12] rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="text-[#f0fdf4] font-semibold">Proposal Submission</h4>
                <p className="text-[#f0fdf4]/70 text-sm">Token holders submit proposals with detailed descriptions and implementation plans</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#d1b86a] text-[#071a12] rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="text-[#f0fdf4] font-semibold">Review Period</h4>
                <p className="text-[#f0fdf4]/70 text-sm">Representatives review proposals for technical feasibility and Islamic compliance</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#d1b86a] text-[#071a12] rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="text-[#f0fdf4] font-semibold">Community Voting</h4>
                <p className="text-[#f0fdf4]/70 text-sm">Token holders vote on approved proposals using weighted voting system</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#d1b86a] text-[#071a12] rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <h4 className="text-[#f0fdf4] font-semibold">Implementation</h4>
                <p className="text-[#f0fdf4]/70 text-sm">Approved proposals are implemented by the development team with community oversight</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#f0fdf4] mb-3">Voting Power</h3>
          <CodeBlock language="typescript">
{`// Voting power calculation
votingPower = baseTokens + stakingBonus + participationBonus

// Base tokens: 1 QRBN = 1 vote
// Staking bonus: +20% for tokens staked >30 days
// Participation bonus: +10% for active DAO participants`}
          </CodeBlock>
        </div>
      </div>
    )
  }
]

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("overview")

  const categories = Array.from(new Set(docSections.map(section => section.category)))
  const currentSection = docSections.find(section => section.id === activeSection)

  return (
    <div className="min-h-screen islamic-pattern py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#f0fdf4] mb-4">Documentation</h1>
          <p className="text-[#f0fdf4]/70 max-w-2xl mx-auto">
            Comprehensive guides, API references, and technical documentation for QRBN.app
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-[#0f2419] border-[#14532d] sticky top-24">
              <CardHeader>
                <CardTitle className="text-[#f0fdf4] flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-[#d1b86a]" />
                  Documentation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {categories.map(category => (
                  <div key={category}>
                    <h3 className="text-[#d1b86a] font-medium text-sm mb-2">{category}</h3>
                    <div className="space-y-2 mb-4">
                      {docSections
                        .filter(section => section.category === category)
                        .map(section => (
                          <DocSection
                            key={section.id}
                            section={section}
                            isActive={activeSection === section.id}
                            onClick={() => setActiveSection(section.id)}
                          />
                        ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="bg-[#0f2419] border-[#14532d]">
              <CardContent className="p-8">
                {currentSection?.content}
              </CardContent>
            </Card>

            {/* Footer Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Button
                variant="outline"
                className="border-[#14532d] text-[#f0fdf4] hover:bg-[#14532d]"
                onClick={() => {
                  const currentIndex = docSections.findIndex(s => s.id === activeSection)
                  if (currentIndex > 0) {
                    setActiveSection(docSections[currentIndex - 1].id)
                  }
                }}
                disabled={docSections.findIndex(s => s.id === activeSection) === 0}
              >
                Previous
              </Button>

              <Button
                variant="outline"
                className="border-[#14532d] text-[#f0fdf4] hover:bg-[#14532d]"
                onClick={() => {
                  const currentIndex = docSections.findIndex(s => s.id === activeSection)
                  if (currentIndex < docSections.length - 1) {
                    setActiveSection(docSections[currentIndex + 1].id)
                  }
                }}
                disabled={docSections.findIndex(s => s.id === activeSection) === docSections.length - 1}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
