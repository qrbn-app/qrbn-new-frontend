import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, Shield, Award, Users, Moon, Star, ChurchIcon as Mosque } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen islamic-pattern">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="absolute inset-0 geometric-overlay opacity-30"></div>
        <div className="relative max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Moon className="h-16 w-16 text-[#d1b86a] crescent-shadow" />
              <Star className="h-6 w-6 text-[#d1b86a] absolute -top-2 -right-2" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#f0fdf4] to-[#d1b86a] bg-clip-text text-transparent">
            QRBN.app
          </h1>

          <p className="text-xl md:text-2xl text-[#f0fdf4]/80 mb-8 max-w-2xl mx-auto">
            Borderless Islamic donations powered by blockchain technology - jurisdiction-free and globally accessible
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge variant="secondary" className="bg-[#14532d] text-[#d1b86a] px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              Shariah Compliant
            </Badge>
            <Badge variant="secondary" className="bg-[#14532d] text-[#d1b86a] px-4 py-2">
              <Award className="h-4 w-4 mr-2" />
              NFT Certificates
            </Badge>
            <Badge variant="secondary" className="bg-[#14532d] text-[#d1b86a] px-4 py-2">
              <Users className="h-4 w-4 mr-2" />
              DAO Governance
            </Badge>
          </div>

          <Button size="lg" className="bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] glow-shadow px-8 py-4 text-lg">
            <Wallet className="h-5 w-5 mr-2" />
            Connect Wallet
          </Button>
        </div>
      </section>

      {/* Choice Cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#f0fdf4]">Choose Your Path</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/zakat">
              <Card className="bg-[#0f2419] border-[#14532d] hover:border-[#d1b86a] transition-all duration-300 glow-shadow hover:scale-105 cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-6">🕋</div>
                  <h3 className="text-2xl font-bold mb-4 text-[#f0fdf4]">Zakat</h3>
                  <p className="text-[#f0fdf4]/70 mb-6">
                    Fulfill your religious obligation with transparent, blockchain-verified Zakat payments in USDT
                  </p>
                  <div className="space-y-2 text-sm text-[#d1b86a]">
                    <div>• Zakat Maal & Zakat Fitrah</div>
                    <div>• Built-in calculator</div>
                    <div>• Impact tracking</div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/qurban">
              <Card className="bg-[#0f2419] border-[#14532d] hover:border-[#d1b86a] transition-all duration-300 glow-shadow hover:scale-105 cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-6">🐐</div>
                  <h3 className="text-2xl font-bold mb-4 text-[#f0fdf4]">Qurban</h3>
                  <p className="text-[#f0fdf4]/70 mb-6">
                    Participate in Qurban with full transparency and receive NFT proof of your sacrifice in USDT
                  </p>
                  <div className="space-y-2 text-sm text-[#d1b86a]">
                    <div>• Goat (full) or Cow (1/7 share)</div>
                    <div>• Real-time progress tracking</div>
                    <div>• NFT certificate</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-[#0f2419]/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#f0fdf4]">Why Choose QRBN.app?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-[#d1b86a] mx-auto mb-4 crescent-shadow" />
              <h3 className="text-xl font-bold mb-4 text-[#f0fdf4]">Full Transparency</h3>
              <p className="text-[#f0fdf4]/70">
                Every donation is tracked on the blockchain with complete transparency and accountability
              </p>
            </div>

            <div className="text-center">
              <Award className="h-12 w-12 text-[#d1b86a] mx-auto mb-4 crescent-shadow" />
              <h3 className="text-xl font-bold mb-4 text-[#f0fdf4]">NFT Proof</h3>
              <p className="text-[#f0fdf4]/70">
                Receive unique NFT certificates as proof of your charitable contributions
              </p>
            </div>

            <div className="text-center">
              <Users className="h-12 w-12 text-[#d1b86a] mx-auto mb-4 crescent-shadow" />
              <h3 className="text-xl font-bold mb-4 text-[#f0fdf4]">Global Access</h3>
              <p className="text-[#f0fdf4]/70">
                Borderless platform accessible worldwide without jurisdiction restrictions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[#14532d]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center mb-4">
            <Mosque className="h-6 w-6 text-[#d1b86a] mr-2" />
            <span className="text-[#f0fdf4]">Built with Islamic principles at heart</span>
          </div>
          <p className="text-[#f0fdf4]/60">© 2024 QRBN.app - Transparent Islamic Finance Platform</p>
        </div>
      </footer>
    </div>
  )
}
