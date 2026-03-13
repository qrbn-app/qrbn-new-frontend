import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Award, Users, Wallet, ArrowRight, HeartHandshake, Landmark, Check } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const features = [
    {
      icon: Shield,
      title: "Full Transparency",
      description: "Every donation is tracked on the blockchain with complete transparency and accountability",
      label: "Security",
    },
    {
      icon: Award,
      title: "NFT Certificates",
      description: "Receive unique NFT certificates as immutable proof of your charitable contributions",
      label: "Verification",
    },
    {
      icon: Users,
      title: "Global Access",
      description: "Borderless platform accessible worldwide without jurisdiction restrictions",
      label: "Inclusive",
    },
    {
      icon: HeartHandshake,
      title: "Shariah Compliant",
      description: "All operations verified by Islamic scholars to ensure compliance with Sharia principles",
      label: "Trusted",
    },
    {
      icon: Landmark,
      title: "DAO Governance",
      description: "Community-driven decision making through decentralized autonomous organization",
      label: "Democratic",
    },
    {
      icon: Wallet,
      title: "Multi-Currency",
      description: "Support for IDRX and USDT with seamless currency conversion",
      label: "Flexible",
    },
  ]

  return (
    <div className="min-h-screen bg-tawf-sand">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-tawf-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-tawf-green/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center space-x-2 bg-tawf-green/10 border border-tawf-green/20 rounded-full px-4 py-2">
                <span className="w-2 h-2 bg-tawf-green rounded-full animate-pulse"></span>
				<span className="text-sm uppercase tracking-widest text-tawf-green">Now Live on Lisk Sepolia</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-medium leading-tight text-tawf-ink">
                Transparent{" "}
                <span className="text-tawf-green relative">
                  Qurban
                  <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                    <path d="M0 4C50 1 150 1 200 4" stroke="#C5A869" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span>{" "}
                & Waqf
              </h1>

              <p className="text-lg md:text-xl text-tawf-muted leading-relaxed max-w-xl">
                Support sustainable Qurban farms through blockchain-powered Waqf. 
                Part of TAWF Foundation's mission for transparent Islamic finance.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="rounded-full px-8 shadow-lg hover:shadow-xl transition-all">
                  <Wallet className="h-5 w-5 mr-2" />
                  Connect Wallet
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-8">
                  Learn More
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 pt-4">
                {[
                  { label: "Shariah Compliant", icon: Check },
                  { label: "NFT Certificates", icon: Check },
                  { label: "DAO Governance", icon: Check },
                ].map((item) => (
                  <div key={item.label} className="flex items-center space-x-2 text-tawf-muted">
                    <item.icon className="h-4 w-4 text-tawf-gold" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Decorative element */}
            <div className="relative hidden lg:block">
              <div className="aspect-square relative">
                {/* Circular pattern */}
                <div className="absolute inset-0 border-2 border-tawf-green/10 rounded-full"></div>
                <div className="absolute inset-8 border border-tawf-gold/20 rounded-full"></div>
                <div className="absolute inset-16 border-2 border-tawf-green/10 rounded-full"></div>

                {/* Center moon icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 bg-tawf-green/10 rounded-full flex items-center justify-center">
                      <div className="w-24 h-24 bg-tawf-green/20 rounded-full flex items-center justify-center">
                        <div className="w-16 h-16 bg-tawf-green rounded-full flex items-center justify-center">
                          <HeartHandshake className="h-8 w-8 text-tawf-sand" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Orbiting dots */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-tawf-gold rounded-full"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-tawf-gold rounded-full"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-tawf-green rounded-full"></div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-tawf-green rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Choice Cards Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-widest text-tawf-gold font-medium">Choose Your Path</span>
            <h2 className="text-4xl md:text-5xl font-heading font-medium mt-4 text-tawf-green">
              How Would You Like to Contribute?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/waqf">
              <Card className="group border-tawf-green/10 hover:border-tawf-gold/50 transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-10">
                  <div className="w-16 h-16 bg-tawf-green/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-tawf-green/20 transition-colors">
                    <HeartHandshake className="h-8 w-8 text-tawf-green" />
                  </div>
                  <h3 className="text-2xl font-heading font-semibold mb-4 text-tawf-green">Waqf</h3>
                  <p className="text-tawf-muted mb-8 leading-relaxed">
                    Support livestock farms through Islamic endowment (waqf) with transparent blockchain verification. Create lasting impact.
                  </p>
                  <div className="space-y-3">
                    {["Support verified farms", "Sustainable impact", "NFT certificates"].map((item) => (
                      <div key={item} className="flex items-center space-x-3 text-tawf-ink">
                        <Check className="h-5 w-5 text-tawf-gold flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex items-center text-tawf-green group-hover:text-tawf-gold transition-colors">
                    <span className="text-sm uppercase tracking-wider font-medium">Explore Waqf</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/qurban">
              <Card className="group border-tawf-green/10 hover:border-tawf-gold/50 transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-10">
                  <div className="w-16 h-16 bg-tawf-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-tawf-gold/20 transition-colors">
                    <Award className="h-8 w-8 text-tawf-gold" />
                  </div>
                  <h3 className="text-2xl font-heading font-semibold mb-4 text-tawf-green">Qurban</h3>
                  <p className="text-tawf-muted mb-8 leading-relaxed">
                    Participate in Qurban with full transparency. Choose between goat (full) or cow (1/7 share) and receive NFT proof.
                  </p>
                  <div className="space-y-3">
                    {["Goat or Cow shares", "Real-time tracking", "NFT certificate"].map((item) => (
                      <div key={item} className="flex items-center space-x-3 text-tawf-ink">
                        <Check className="h-5 w-5 text-tawf-gold flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex items-center text-tawf-green group-hover:text-tawf-gold transition-colors">
                    <span className="text-sm uppercase tracking-wider font-medium">Explore Qurban</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 islamic-pattern">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-widest text-tawf-gold font-medium">Why Choose QRBN.app</span>
            <h2 className="text-4xl md:text-5xl font-heading font-medium mt-4 text-tawf-green">
              Built on Trust and Transparency
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-8 border border-tawf-green/10 hover:shadow-lg hover:border-tawf-gold/30 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-tawf-green/10">
                  <feature.icon className="h-7 w-7 text-tawf-gold" />
                </div>
                <span className="text-xs uppercase tracking-widest text-tawf-gold font-medium">
                  {feature.label}
                </span>
                <h3 className="text-xl font-heading font-semibold mt-2 mb-3 text-tawf-green">
                  {feature.title}
                </h3>
                <p className="text-tawf-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-tawf-green">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl md:text-6xl font-heading font-medium text-tawf-gold mb-2">
                100%
              </div>
              <div className="text-tawf-sand/80 uppercase tracking-wider text-sm">On-Chain</div>
              <p className="text-tawf-sand/60 mt-2">Every transaction verified</p>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-heading font-medium text-tawf-gold mb-2">
                24/7
              </div>
              <div className="text-tawf-sand/80 uppercase tracking-wider text-sm">Available</div>
              <p className="text-tawf-sand/60 mt-2">Global accessibility</p>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-heading font-medium text-tawf-gold mb-2">
                0%
              </div>
              <div className="text-tawf-sand/80 uppercase tracking-wider text-sm">Intermediaries</div>
              <p className="text-tawf-sand/60 mt-2">Direct donations</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-medium text-tawf-green mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-tawf-muted text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of Muslims worldwide who are transforming Islamic charity through blockchain technology.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="rounded-full px-10">
              Get Started
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-10">
              Read Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-tawf-ink">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <HeartHandshake className="h-8 w-8 text-tawf-gold" />
                <span className="text-2xl font-heading font-medium text-tawf-sand">QRBN.app</span>
              </div>
              <p className="text-tawf-sand/60 leading-relaxed max-w-md">
                Blockchain-powered Qurban and Waqf platform by TAWF Foundation. Transparent, sustainable, and Shariah-compliant.
              </p>
            </div>
            <div>
              <h4 className="text-tawf-gold uppercase tracking-wider text-sm font-medium mb-4">Platform</h4>
              <ul className="space-y-3">
                <li><Link href="/waqf" className="text-tawf-sand/60 hover:text-tawf-gold transition-colors">Waqf</Link></li>
                <li><Link href="/qurban" className="text-tawf-sand/60 hover:text-tawf-gold transition-colors">Qurban</Link></li>
                <li><Link href="/dashboard" className="text-tawf-sand/60 hover:text-tawf-gold transition-colors">Dashboard</Link></li>
                <li><Link href="/dao" className="text-tawf-sand/60 hover:text-tawf-gold transition-colors">DAO</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-tawf-gold uppercase tracking-wider text-sm font-medium mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><Link href="/docs" className="text-tawf-sand/60 hover:text-tawf-gold transition-colors">Documentation</Link></li>
                <li><Link href="/faq" className="text-tawf-sand/60 hover:text-tawf-gold transition-colors">FAQ</Link></li>
                <li><Link href="/vendor" className="text-tawf-sand/60 hover:text-tawf-gold transition-colors">For Vendors</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-tawf-sand/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-tawf-sand/40 text-sm">© 2026 QRBN.app — Built with Islamic principles at heart</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/docs" className="text-tawf-sand/40 hover:text-tawf-gold text-sm transition-colors">Terms</Link>
              <Link href="/docs" className="text-tawf-sand/40 hover:text-tawf-gold text-sm transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
