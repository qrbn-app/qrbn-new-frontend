"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calculator, Wallet, Heart, Users, Home, Loader2 } from "lucide-react"
import { PaymentModal } from "@/components/payment-modal"
import { useContracts } from "@/hooks/use-contracts"
import { useAccount } from "wagmi"
import axios from 'axios';

export default function ZakatPage() {
  const [wealth, setWealth] = useState("")
  const [calculatedZakat, setCalculatedZakat] = useState(0)
  const [peopleCount, setPeopleCount] = useState("1")
  const [zakatFitrahTotal, setZakatFitrahTotal] = useState(2.33)
  const [nisabThreshold, setNisabThreshold] = useState(5667); // Default fallback value in USDT
  const zakatRate = 2.5 // 2.5% zakat rate
  const fitrahAmount = 2.33 // USDT per person for Zakat Fitrah
  const [zakatPool, setZakatPool] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  
  const contracts = useContracts()
  const { isConnected } = useAccount()

  // Load contract data on component mount (only for pool data)
  useEffect(() => {
    loadContractData()
  }, [contracts, isConnected])

  const loadContractData = async () => {
    if (!contracts) return
    
    setLoading(true)
    try {
      // Only load zakat pool data from contract
      const pool = await contracts.getZakatPoolInfo()
      
      // Convert from contract format to USDT
      const poolInUSDT = parseFloat(pool.availableBalance || '0')
      setZakatPool(poolInUSDT)
    } catch (error) {
      console.error('Error loading contract data:', error)
      // Set pool to 0 on error
      setZakatPool(0)
    } finally {
      setLoading(false)
    }
  }

  const validateInput = (value: number, min: number): boolean => {
    return value >= min;
  };

  const calculateZakat = () => {
    const wealthAmount = Number.parseFloat(wealth);
    if (!validateInput(wealthAmount, nisabThreshold)) {
      console.error('Invalid wealth input: below nisab threshold');
      setCalculatedZakat(0);
      return;
    }

    const zakatAmount = wealthAmount * (zakatRate / 100);
    setCalculatedZakat(zakatAmount);
  }

  const calculateZakatFitrah = (count: string) => {
    const people = Number.parseInt(count) || 1;
    if (!validateInput(people, 1)) {
      console.error('Invalid people count input');
      setZakatFitrahTotal(0);
      return;
    }

    setZakatFitrahTotal(people * fitrahAmount);
  }

  return (
    <div className="min-h-screen islamic-pattern py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#f0fdf4] mb-4">Zakat Donation</h1>
          <p className="text-[#f0fdf4]/70">Fulfill your religious obligation with transparency</p>
          {isConnected && (
            <div className="mt-4 flex justify-center">
              <Button
                size="sm"
                variant="outline"
                onClick={loadContractData}
                disabled={loading}
                className="border-[#14532d] text-[#f0fdf4] hover:bg-[#14532d]/20"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  "🔄"
                )}
                {loading ? "Loading..." : "Refresh Rates"}
              </Button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="maal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-[#0f2419] border border-[#14532d]">
                <TabsTrigger
                  value="maal"
                  className="data-[state=active]:bg-[#14532d] data-[state=active]:text-[#d1b86a]"
                >
                  Zakat Maal
                </TabsTrigger>
                <TabsTrigger
                  value="fitrah"
                  className="data-[state=active]:bg-[#14532d] data-[state=active]:text-[#d1b86a]"
                >
                  Zakat Fitrah
                </TabsTrigger>
              </TabsList>

              <TabsContent value="maal">
                <Card className="bg-[#0f2419] border-[#14532d]">
                  <CardHeader>
                    <CardTitle className="text-[#f0fdf4] flex items-center">
                      <Calculator className="h-5 w-5 mr-2 text-[#d1b86a]" />
                      Zakat Maal Calculator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="wealth" className="text-[#f0fdf4]">
                        Total Wealth (USDT)
                      </Label>
                      <Input
                        id="wealth"
                        type="number"
                        placeholder="Enter your total wealth"
                        value={wealth}
                        onChange={(e) => setWealth(e.target.value)}
                        className="bg-[#14532d] border-[#14532d] text-[#f0fdf4] mt-2"
                      />
                      <p className="text-xs text-[#f0fdf4]/50 mt-1">
                        Minimum nisab: {nisabThreshold.toLocaleString()} USDT (equivalent to 85g gold)
                      </p>
                    </div>

                    <Button onClick={calculateZakat} className="bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4]">
                      Calculate Zakat
                    </Button>

                    {calculatedZakat > 0 && (
                      <div className="p-4 rounded-lg border border-[#d1b86a]/30">
                        <div className="text-center">
                          <p className="text-[#f0fdf4]/70 mb-2">Your Zakat Amount:</p>
                          <p className="text-3xl font-bold text-[#d1b86a]">
                            {calculatedZakat.toLocaleString("en-US")} USDT
                          </p>
                          <p className="text-xs text-[#f0fdf4]/50 mt-1">{zakatRate}% of wealth above nisab</p>
                        </div>
                      </div>
                    )}

                    {wealth && parseFloat(wealth) > 0 && parseFloat(wealth) < nisabThreshold && (
                      <div className="p-4 bg-red-500/20 rounded-lg border border-red-500/30">
                        <div className="text-center">
                          <p className="text-red-200 text-sm mb-2">Wealth Below Nisab Threshold</p>
                          <p className="text-red-100 text-xs">
                            Your wealth ({parseFloat(wealth).toLocaleString()} USDT) is below the nisab threshold ({nisabThreshold.toLocaleString()} USDT). 
                            Zakat is not obligatory for wealth below this amount.
                          </p>
                        </div>
                      </div>
                    )}

                    {calculatedZakat > 0 && (
                      <div className="mt-4 p-3 bg-[#0f2419] rounded-lg border border-[#14532d]">
                        <div className="text-sm text-[#f0fdf4]/70 mb-1">Payment in USDT/USDC:</div>
                        <div className="text-lg font-semibold text-[#d1b86a]">~${calculatedZakat.toFixed(2)} USDT</div>
                        <div className="text-xs text-[#f0fdf4]/50">Direct payment in USDT</div>
                      </div>
                    )}

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-[#f0fdf4]">Payment Details</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-[#f0fdf4]/70">Zakat Amount:</span>
                        <span className="text-[#d1b86a] font-bold">{calculatedZakat.toLocaleString("en-US")} USDT</span>
                      </div>
                      <Separator className="bg-[#14532d]" />
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span className="text-[#f0fdf4]">Total:</span>
                        <span className="text-[#d1b86a]">{calculatedZakat.toLocaleString("en-US")} USDT</span>
                      </div>

                      <PaymentModal amount={BigInt(Math.floor(calculatedZakat * 1000000))} type="zakat-maal" title="Zakat Maal Payment">
                        <Button
                          className="w-full bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] glow-shadow"
                          disabled={calculatedZakat === 0}
                        >
                          <Wallet className="h-4 w-4 mr-2" />
                          Pay Zakat with Smart Contract
                        </Button>
                      </PaymentModal>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="fitrah">
                <Card className="bg-[#0f2419] border-[#14532d]">
                  <CardHeader>
                    <CardTitle className="text-[#f0fdf4]">Zakat Fitrah</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-[#14532d]/30 rounded-lg border border-[#d1b86a]/30">
                      <div className="text-center">
                        <p className="text-[#f0fdf4]/70 mb-2">Zakat Fitrah per person:</p>
                        <p className="text-3xl font-bold text-[#d1b86a]">{fitrahAmount.toFixed(2)} USDT</p>
                        <p className="text-xs text-[#f0fdf4]/50 mt-1">
                          Equivalent to 2.5kg rice
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="people" className="text-[#f0fdf4]">
                        Number of People
                      </Label>
                      <Input
                        id="people"
                        type="number"
                        placeholder="Enter number of people"
                        value={peopleCount}
                        onChange={(e) => {
                          setPeopleCount(e.target.value)
                          calculateZakatFitrah(e.target.value)
                        }}
                        className="bg-[#14532d] border-[#14532d] text-[#f0fdf4] mt-2"
                      />
                    </div>

                    {peopleCount && (parseInt(peopleCount) <= 0 || isNaN(parseInt(peopleCount))) && (
                      <div className="p-4 bg-red-500/20 rounded-lg border border-red-500/30">
                        <div className="text-center">
                          <p className="text-red-200 text-sm mb-2">Invalid Number of People</p>
                          <p className="text-red-100 text-xs">
                            Please enter a valid number of people (minimum 1 person) for Zakat Fitrah calculation.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[#f0fdf4]/70">Per person:</span>
                        <span className="text-[#f0fdf4]">{fitrahAmount.toFixed(2)} USDT</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#f0fdf4]/70">Number of people:</span>
                        <span className="text-[#f0fdf4]">{peopleCount}</span>
                      </div>
                      <Separator className="bg-[#14532d]" />
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span className="text-[#f0fdf4]">Total:</span>
                        <span className="text-[#d1b86a]">{zakatFitrahTotal.toLocaleString("en-US")} USDT</span>
                      </div>

                      <div className="mt-4 p-3 bg-[#0f2419] rounded-lg border border-[#14532d]">
                        <div className="text-sm text-[#f0fdf4]/70 mb-1">Payment in USDT/USDC:</div>
                        <div className="text-lg font-semibold text-[#d1b86a]">~${zakatFitrahTotal.toFixed(2)} USDT</div>
                        <div className="text-xs text-[#f0fdf4]/50">Direct payment in USDT</div>
                      </div>

                      <PaymentModal amount={BigInt(Math.floor(zakatFitrahTotal * 1000000))} type="zakat-fitrah" title="Zakat Fitrah Payment">
                        <Button 
                          className="w-full bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] glow-shadow"
                          disabled={zakatFitrahTotal <= 0 || parseInt(peopleCount) <= 0 || isNaN(parseInt(peopleCount))}
                        >
                          <Wallet className="h-4 w-4 mr-2" />
                          Pay Zakat Fitrah
                        </Button>
                      </PaymentModal>

                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Zakat Pool Status */}
            {isConnected && (
              <Card className="bg-[#0f2419] border-[#14532d]">
                <CardHeader>
                  <CardTitle className="text-[#f0fdf4] text-sm">Zakat Pool Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[#f0fdf4]/70">Current Pool:</span>
                      <span className="text-[#d1b86a] font-semibold">{zakatPool.toLocaleString()} USDT</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#f0fdf4]/70">Nisab Threshold:</span>
                      <span className="text-[#f0fdf4]">{nisabThreshold.toLocaleString()} USDT</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#f0fdf4]/70">Zakat Rate:</span>
                      <span className="text-[#f0fdf4]">{zakatRate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#f0fdf4]/70">Fitrah Amount:</span>
                      <span className="text-[#f0fdf4]">{fitrahAmount.toFixed(2)} USDT</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-[#0f2419] border-[#14532d]">
              <CardHeader>
                <CardTitle className="text-[#f0fdf4] text-sm">Impact Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-[#14532d]/30 rounded-lg">
                    <Heart className="h-5 w-5 text-[#d1b86a] mr-3" />
                    <div>
                      <div className="text-sm font-medium text-[#f0fdf4]">Orphans</div>
                      <div className="text-xs text-[#f0fdf4]/60">Supporting orphaned children</div>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-[#14532d]/30 rounded-lg">
                    <Users className="h-5 w-5 text-[#d1b86a] mr-3" />
                    <div>
                      <div className="text-sm font-medium text-[#f0fdf4]">Refugees</div>
                      <div className="text-xs text-[#f0fdf4]/60">Helping displaced families</div>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-[#14532d]/30 rounded-lg">
                    <Home className="h-5 w-5 text-[#d1b86a] mr-3" />
                    <div>
                      <div className="text-sm font-medium text-[#f0fdf4]">Local Aid</div>
                      <div className="text-xs text-[#f0fdf4]/60">Community support programs</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0f2419] border-[#14532d]">
              <CardHeader>
                <CardTitle className="text-[#f0fdf4] text-sm">Transparency Guarantee</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Badge className="bg-[#14532d] text-[#d1b86a] mr-2">✓</Badge>
                    <span className="text-xs text-[#f0fdf4]/70">Blockchain verified</span>
                  </div>
                  <div className="flex items-center">
                    <Badge className="bg-[#14532d] text-[#d1b86a] mr-2">✓</Badge>
                    <span className="text-xs text-[#f0fdf4]/70">Real-time tracking</span>
                  </div>
                  <div className="flex items-center">
                    <Badge className="bg-[#14532d] text-[#d1b86a] mr-2">✓</Badge>
                    <span className="text-xs text-[#f0fdf4]/70">Impact reports</span>
                  </div>
                  <div className="flex items-center">
                    <Badge className="bg-[#14532d] text-[#d1b86a] mr-2">✓</Badge>
                    <span className="text-xs text-[#f0fdf4]/70">NFT certificates</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0f2419] border-[#14532d]">
              <CardHeader>
                <CardTitle className="text-[#f0fdf4] text-sm">Global Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#f0fdf4]/70">Total Donated:</span>
                    <span className="text-[#d1b86a] font-semibold">2.4B IDR</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#f0fdf4]/70">Families Helped:</span>
                    <span className="text-[#d1b86a] font-semibold">3,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#f0fdf4]/70">Active Donors:</span>
                    <span className="text-[#d1b86a] font-semibold">1,856</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
