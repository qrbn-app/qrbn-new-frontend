"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  TrendingUp,
  Users,
  Building,
  ArrowRight,
  Shield,
  Award,
  Check
} from "lucide-react";
import Link from "next/link";
import { WaqfFeeDisclosure } from "@/components/waqf-fee-disclosure";
import { useWaqfContract } from "@/hooks/use-waqf-contract";
import { useCurrency } from "@/components/providers/currency-provider";

export default function WaqfPage() {
  const { poolInfo } = useWaqfContract();
  const { formatCurrency, convertToSelectedCurrency } = useCurrency();

  const stats = [
    {
      label: "Total Funded",
      value: formatCurrency(convertToSelectedCurrency(poolInfo.totalCollected)),
      icon: TrendingUp,
      color: "text-tawf-gold",
    },
    {
      label: "Active Farms",
      value: poolInfo.activeFarms.toString(),
      icon: Building,
      color: "text-tawf-green",
    },
    {
      label: "Contributors",
      value: poolInfo.totalContributors.toString(),
      icon: Users,
      color: "text-tawf-gold",
    },
    {
      label: "Distributed",
      value: formatCurrency(convertToSelectedCurrency(poolInfo.totalDistributed)),
      icon: Award,
      color: "text-tawf-green",
    },
  ];

  const pathwayCards = [
    {
      title: "Browse Waqf Farms",
      description: "Explore verified farms and contribute directly to the ones you want to support",
      icon: Building,
      features: [
        "Choose specific farms to support",
        "View detailed farm information",
        "Track funding progress & impact",
        "Receive NFT certificates",
      ],
      href: "/waqf-farms",
      available: true,
    },
    {
      title: "General Waqf Pool",
      description: "Contribute to the general pool for automatic distribution to farms with highest need",
      icon: Heart,
      features: [
        "DAO-managed distribution",
        "Balanced impact across farms",
        "Simple one-click contribution",
        "Flexible amount",
      ],
      href: "#",
      available: false,
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Farmers Apply",
      description: "Farmers submit applications and undergo off-chain pre-verification",
    },
    {
      number: "2",
      title: "DAO Verification",
      description: "On-chain verification by DAO and Sharia Council ensures compliance",
    },
    {
      number: "3",
      title: "You Contribute",
      description: "Support specific farms with transparent fee breakdown shown upfront",
    },
    {
      number: "4",
      title: "Track Impact",
      description: "Receive NFT certificate and monitor farm progress and animal inventory",
    },
  ];

  return (
    <div className="min-h-screen bg-tawf-sand py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-tawf-green/10 rounded-full p-6">
              <Heart className="h-16 w-16 text-tawf-green" />
            </div>
          </div>
          <span className="text-sm uppercase tracking-widest text-tawf-gold font-medium">Sadaqah Jariyah</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium mt-4 mb-6 text-tawf-green">
            Waqf for Kurban Farms
          </h1>
          <p className="text-xl text-tawf-muted max-w-3xl mx-auto leading-relaxed">
            Support sustainable livestock farms through Islamic endowment (waqf).
            Your contribution helps farmers raise quality animals for qurban while creating lasting community impact.
          </p>
        </div>

        {/* Platform Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="border-tawf-green/10 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-tawf-muted text-sm uppercase tracking-wider">{stat.label}</p>
                    <p className={`text-2xl font-heading font-semibold ${stat.color}`}>
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className={`h-10 w-10 ${stat.color}/20`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* What is Waqf */}
        <Card className="border-tawf-green/10 bg-white mb-12">
          <CardHeader className="pb-6">
            <CardTitle className="text-tawf-green font-heading flex items-center gap-3 text-2xl">
              <div className="w-12 h-12 bg-tawf-green/10 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-tawf-green" />
              </div>
              What is Waqf for Kurban Farms?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-tawf-muted leading-relaxed text-lg">
              <strong className="text-tawf-green">Waqf</strong> is an Islamic endowment where assets are permanently dedicated for charitable purposes.
              In our platform, your waqf contribution supports verified kurban (qurbani) farms, helping farmers:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-tawf-sand/50 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">🐐</div>
                <h3 className="text-tawf-green font-heading font-semibold mb-2">Raise Quality Livestock</h3>
                <p className="text-tawf-muted text-sm">
                  Fund the raising of healthy, halal-certified animals for qurban sacrifices
                </p>
              </div>

              <div className="bg-tawf-sand/50 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">👨‍🌾</div>
                <h3 className="text-tawf-green font-heading font-semibold mb-2">Support Farmers</h3>
                <p className="text-tawf-muted text-sm">
                  Provide sustainable income for small farming families and cooperatives
                </p>
              </div>

              <div className="bg-tawf-sand/50 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">🌾</div>
                <h3 className="text-tawf-green font-heading font-semibold mb-2">Create Lasting Impact</h3>
                <p className="text-tawf-muted text-sm">
                  Build permanent infrastructure for ethical, sustainable livestock farming
                </p>
              </div>
            </div>

            <Separator className="bg-tawf-green/10" />

            <div className="flex items-start gap-4 bg-tawf-green/5 rounded-2xl p-6 border border-tawf-green/10">
              <Shield className="h-6 w-6 text-tawf-gold shrink-0 mt-0.5" />
              <div>
                <p className="text-tawf-green font-heading font-semibold mb-2">Fully Transparent & Shariah Compliant</p>
                <p className="text-tawf-muted text-sm leading-relaxed">
                  All farms undergo off-chain pre-verification, then on-chain verification by DAO and Sharia Council.
                  Your waqf contribution is permanently protected, and all fees are transparently disclosed per Islamic finance principles.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Two Pathways */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {pathwayCards.map((card, index) => (
            <Card
              key={index}
              className={`border-tawf-green/10 bg-white hover:shadow-lg transition-all duration-300 ${
                card.available ? "hover:border-tawf-gold/50 cursor-pointer" : ""
              }`}
            >
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className={`bg-${card.available ? 'tawf-green' : 'tawf-muted'}/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                    <card.icon className={`h-8 w-8 ${card.available ? 'text-tawf-green' : 'text-tawf-muted'}`} />
                  </div>
                  <h2 className="text-2xl font-heading font-semibold text-tawf-green mb-2">{card.title}</h2>
                  <p className="text-tawf-muted mb-6">
                    {card.description}
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  {card.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-tawf-muted text-sm">
                      <div className="w-5 h-5 bg-tawf-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-tawf-green" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {card.available ? (
                  <Link href={card.href}>
                    <Button className="w-full rounded-full">
                      Explore Farms
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                ) : (
                  <Button
                    className="w-full rounded-full bg-tawf-muted/20 text-tawf-muted cursor-not-allowed"
                    disabled
                  >
                    Coming Soon
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Fee Disclosure */}
        <WaqfFeeDisclosure variant="full" className="mb-12" />

        {/* How It Works */}
        <Card className="border-tawf-green/10 bg-white">
          <CardHeader className="pb-6">
            <CardTitle className="text-tawf-green font-heading text-2xl">How Waqf for Farms Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-tawf-green text-tawf-sand rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4 text-xl font-heading font-semibold">
                    {step.number}
                  </div>
                  <h3 className="text-tawf-green font-heading font-semibold mb-2">{step.title}</h3>
                  <p className="text-tawf-muted text-sm leading-relaxed">
                    {step.description}
                  </p>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-7 left-[60%] w-[80%] border-t-2 border-dashed border-tawf-green/20"></div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
