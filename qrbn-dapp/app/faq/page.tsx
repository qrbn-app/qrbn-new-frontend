"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  HelpCircle, 
  Wallet, 
  Coins, 
  Shield, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Utensils,
  ExternalLink,
  Heart,
  Building
} from "lucide-react"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  // Getting Started
  {
    id: "what-is-qrbn",
    question: "What is QRBN.app?",
    answer: "QRBN.app is a blockchain-based Islamic finance platform that enables transparent and efficient donations for Zakat and Qurban (sacrificial offerings). We use smart contracts to ensure full transparency and proper distribution of funds according to Islamic principles.",
    category: "Getting Started"
  },
  {
    id: "how-to-connect-wallet",
    question: "How do I connect my wallet?",
    answer: "Click the 'Connect Wallet' button in the top navigation. We support MetaMask, WalletConnect, and other popular Web3 wallets. Make sure you're connected to the Lisk Sepolia network to interact with our smart contracts.",
    category: "Getting Started"
  },
  {
    id: "supported-networks",
    question: "Which blockchain networks are supported?",
    answer: "Currently, QRBN.app operates on the Lisk Sepolia network for lower gas fees and faster transactions. We're considering expanding to other networks based on community feedback.",
    category: "Getting Started"
  },

  // Zakat
  {
    id: "what-is-zakat",
    question: "What is Zakat and how does it work on QRBN?",
    answer: "Zakat is one of the Five Pillars of Islam, requiring Muslims to donate 2.5% of their wealth annually to help those in need. On QRBN, you can calculate your Zakat automatically and donate using USDT, with full transparency of how funds are distributed to verified recipients.",
    category: "Zakat"
  },
  {
    id: "zakat-calculation",
    question: "How is my Zakat calculated?",
    answer: "Our smart contract automatically calculates 2.5% of your eligible wealth. You input your assets (cash, gold, silver, investments) and the system calculates the exact Zakat amount. The calculation follows traditional Islamic jurisprudence.",
    category: "Zakat"
  },
  {
    id: "zakat-recipients",
    question: "Who receives my Zakat donations?",
    answer: "Zakat is distributed to the eight categories mentioned in the Quran: the poor, the needy, Zakat administrators, those whose hearts are to be reconciled, slaves seeking freedom, debtors, those fighting in the way of Allah, and travelers in need. All recipients are verified through our partner organizations.",
    category: "Zakat"
  },

  // Qurban
  {
    id: "what-is-qurban",
    question: "What is Qurban and how does the digital system work?",
    answer: "Qurban is the ritual sacrifice performed during Eid al-Adha. Our platform allows you to contribute to collective Qurban offerings through smart contracts. We partner with certified facilities to perform the actual sacrifice, and you receive an NFT certificate as proof of your participation.",
    category: "Qurban"
  },
  {
    id: "qurban-packages",
    question: "What Qurban packages are available?",
    answer: "We offer three tiers: Economic (goat/sheep shares), Standard (individual goat/sheep), and Premium (cow/camel shares). Each package includes different benefits and NFT certificates. All animals meet Islamic requirements and are sourced from ethical suppliers.",
    category: "Qurban"
  },
  {
    id: "nft-certificate",
    question: "What is the NFT certificate and why do I receive it?",
    answer: "The NFT certificate serves as permanent, immutable proof of your Qurban participation. It contains details about the sacrifice, location, date, and Islamic compliance verification. This digital certificate can be stored in your wallet forever as a record of your religious observance.",
    category: "Qurban"
  },

  // Tokens & Rewards
  {
    id: "qrbn-token",
    question: "What is the QRBN token?",
    answer: "QRBN is our platform's governance and reward token. You earn QRBN tokens for donations, which can be used for DAO voting, accessing premium features, or staking for additional rewards. Tokens are automatically distributed to your wallet after confirmed donations.",
    category: "Tokens & Rewards"
  },
  {
    id: "earning-tokens",
    question: "How do I earn QRBN tokens?",
    answer: "You earn QRBN tokens by: making Zakat donations (1 QRBN per 1 USDT), participating in Qurban offerings, referring new users, participating in DAO governance, and completing certain platform milestones.",
    category: "Tokens & Rewards"
  },
  {
    id: "token-utility",
    question: "What can I do with QRBN tokens?",
    answer: "QRBN tokens can be used for: voting in DAO governance, staking for rewards, accessing premium dashboard features, getting discounts on platform fees, and participating in special community events and airdrops.",
    category: "Tokens & Rewards"
  },

  // DAO & Governance
  {
    id: "dao-governance",
    question: "What is the QRBN DAO and how can I participate?",
    answer: "The QRBN DAO is our decentralized governance system where token holders vote on platform decisions. You can participate by holding QRBN tokens, voting on proposals, or becoming a representative (Community, Organizational, or Sharia representative roles available).",
    category: "DAO & Governance"
  },
  {
    id: "become-representative",
    question: "How can I become a DAO representative?",
    answer: "There are three types: Community Representative (requires 1,000+ QRBN tokens and Qurban participation), Organizational Representative (requires 5,000+ QRBN tokens and institutional backing), and Sharia Representative (requires Islamic scholarship credentials and community verification).",
    category: "DAO & Governance"
  },
  {
    id: "voting-power",
    question: "How is voting power determined?",
    answer: "Voting power is proportional to your QRBN token holdings, with additional weight given to long-term stakers and active community participants. Representatives have enhanced voting power in their respective domains.",
    category: "DAO & Governance"
  },

  // Security & Trust
  {
    id: "smart-contract-security",
    question: "How secure are the smart contracts?",
    answer: "Our smart contracts are audited by leading blockchain security firms and follow industry best practices. All contract code is open-source and verifiable on-chain. We use multi-signature wallets for admin functions and have emergency pause mechanisms.",
    category: "Security & Trust"
  },
  {
    id: "fund-transparency",
    question: "How can I verify that my donations reach the intended recipients?",
    answer: "All transactions are recorded on the blockchain and can be verified through our transparency dashboard. We provide detailed reports showing fund distribution, recipient verification, and impact metrics. Partner organizations also provide periodic updates.",
    category: "Security & Trust"
  },
  {
    id: "islamic-compliance",
    question: "How do you ensure Islamic compliance?",
    answer: "We have a Sharia advisory board that reviews all platform mechanisms. Our smart contracts are designed to comply with Islamic finance principles, avoiding interest (riba), excessive uncertainty (gharar), and gambling (maysir). All processes are regularly audited for compliance.",
    category: "Security & Trust"
  },

  // Technical Support
  {
    id: "transaction-failed",
    question: "What should I do if my transaction fails?",
    answer: "First, check if you have sufficient USDT and ETH/MATIC for gas fees. Ensure you're on the correct network (Lisk Sepolia). If the issue persists, try increasing gas fees or contact our support team with the transaction hash for assistance.",
    category: "Technical Support"
  },
  {
    id: "wallet-issues",
    question: "I'm having trouble with my wallet connection",
    answer: "Try refreshing the page, clearing your browser cache, or disconnecting and reconnecting your wallet. Make sure your wallet is set to the Lisk Sepolia network. If using MetaMask, you may need to add the Lisk Sepolia network manually.",
    category: "Technical Support"
  },
  {
    id: "missing-tokens",
    question: "My QRBN tokens or NFTs are not showing in my wallet",
    answer: "You may need to manually add the token contract addresses to your wallet. QRBN token and NFT contract addresses can be found in our documentation. For MetaMask, go to 'Import Tokens' and enter the contract address.",
    category: "Technical Support"
  }
]

const categories = Array.from(new Set(faqData.map(item => item.category)))

const categoryIcons: Record<string, React.ReactNode> = {
  "Getting Started": <HelpCircle className="h-5 w-5" />,
  "Zakat": <Heart className="h-5 w-5" />,
  "Qurban": <Utensils className="h-5 w-5" />,
  "Tokens & Rewards": <Coins className="h-5 w-5" />,
  "DAO & Governance": <Users className="h-5 w-5" />,
  "Security & Trust": <Shield className="h-5 w-5" />,
  "Technical Support": <Building className="h-5 w-5" />
}

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredFAQs = selectedCategory 
    ? faqData.filter(item => item.category === selectedCategory)
    : faqData

  return (
    <div className="min-h-screen islamic-pattern py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#f0fdf4] mb-4">Frequently Asked Questions</h1>
          <p className="text-[#f0fdf4]/70 max-w-2xl mx-auto">
            Everything you need to know about using QRBN.app for Islamic donations, 
            DAO governance, and blockchain-based religious observance.
          </p>
        </div>

        {/* Category Filter */}
        <Card className="bg-[#0f2419] border-[#14532d] mb-8">
          <CardHeader>
            <CardTitle className="text-[#f0fdf4] flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#d1b86a]" />
              Browse by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === null ? "default" : "secondary"}
                className={`cursor-pointer transition-colors ${
                  selectedCategory === null 
                    ? "bg-[#d1b86a] text-[#071a12] hover:bg-[#d1b86a]/90" 
                    : "bg-[#14532d] text-[#f0fdf4] hover:bg-[#1a3a1f]"
                }`}
                onClick={() => setSelectedCategory(null)}
              >
                All Categories ({faqData.length})
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className={`cursor-pointer transition-colors flex items-center gap-1 ${
                    selectedCategory === category 
                      ? "bg-[#d1b86a] text-[#071a12] hover:bg-[#d1b86a]/90" 
                      : "bg-[#14532d] text-[#f0fdf4] hover:bg-[#1a3a1f]"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {categoryIcons[category]}
                  {category} ({faqData.filter(item => item.category === category).length})
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ Accordion */}
        <Card className="bg-[#0f2419] border-[#14532d] mb-8">
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFAQs.map((faq) => (
                <AccordionItem 
                  key={faq.id} 
                  value={faq.id}
                  className="border-[#14532d] bg-[#14532d]/20 rounded-lg px-4"
                >
                  <AccordionTrigger className="text-[#f0fdf4] hover:text-[#d1b86a] text-left">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="bg-[#14532d] text-[#d1b86a] border-[#d1b86a]/30 shrink-0">
                        {faq.category}
                      </Badge>
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-[#f0fdf4]/70 pt-4 pl-16">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Separator className="bg-[#14532d] my-8" />

        {/* Additional Help Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#f0fdf4] mb-4">Still Need Help?</h2>
          <p className="text-[#f0fdf4]/70 mb-6">
            Can't find the answer you're looking for? Get in touch with our support team.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card className="bg-[#0f2419] border-[#14532d]">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-8 w-8 text-[#d1b86a] mx-auto mb-3" />
                <h3 className="text-[#f0fdf4] font-semibold mb-2">Documentation</h3>
                <p className="text-[#f0fdf4]/70 text-sm mb-4">
                  Comprehensive guides and technical documentation
                </p>
                <button 
                  onClick={() => window.open("/docs", "_blank")}
                  className="inline-flex items-center gap-2 text-[#d1b86a] hover:text-[#d1b86a]/80 text-sm"
                >
                  View Docs <ExternalLink className="h-3 w-3" />
                </button>
              </CardContent>
            </Card>

            <Card className="bg-[#0f2419] border-[#14532d]">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-[#d1b86a] mx-auto mb-3" />
                <h3 className="text-[#f0fdf4] font-semibold mb-2">Community Support</h3>
                <p className="text-[#f0fdf4]/70 text-sm mb-4">
                  Join our Discord community for help and discussions
                </p>
                <button 
                  onClick={() => window.open("https://discord.gg/UGzzJ8aR4x", "_blank")}
                  className="inline-flex items-center gap-2 text-[#d1b86a] hover:text-[#d1b86a]/80 text-sm"
                >
                  Join Discord <ExternalLink className="h-3 w-3" />
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
