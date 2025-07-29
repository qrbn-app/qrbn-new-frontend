"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Circle, Wallet, Award, Users, Star, MapPin } from "lucide-react"
import { PaymentModal } from "@/components/payment-modal"

const steps = [
  { id: 1, title: "Choose Qurban Type", completed: true },
  { id: 2, title: "Select Animal", completed: true },
  { id: 3, title: "Payment", completed: false },
]

const qurbanAnimals = {
  goats: [
    {
      id: "goat-premium",
      name: "Premium Goat",
      type: "goat",
      price: 200,
      image: "/placeholder.svg?height=200&width=300",
      condition: "Excellent",
      age: "2-3 years",
      weight: "35-40 kg",
      location: "Certified Farm - Indonesia",
      description: "Premium quality goat, well-fed and healthy. Perfect for Qurban sacrifice.",
      features: ["Shariah certified", "Health verified", "Premium feed", "Regular vet checkups"],
    },
    {
      id: "goat-standard",
      name: "Standard Goat",
      type: "goat",
      price: 167,
      image: "/placeholder.svg?height=200&width=300",
      condition: "Good",
      age: "1.5-2 years",
      weight: "30-35 kg",
      location: "Local Farm - Indonesia",
      description: "Healthy goat meeting all Shariah requirements for Qurban sacrifice.",
      features: ["Shariah certified", "Health verified", "Quality feed", "Local sourced"],
    },
    {
      id: "goat-economy",
      name: "Economy Goat",
      type: "goat",
      price: 140,
      image: "/placeholder.svg?height=200&width=300",
      condition: "Good",
      age: "1-1.5 years",
      weight: "25-30 kg",
      location: "Village Farm - Indonesia",
      description: "Young healthy goat, perfect for those seeking affordable Qurban option.",
      features: ["Shariah certified", "Health verified", "Village sourced", "Affordable option"],
    },
  ],
  cows: [
    {
      id: "cow-premium",
      name: "Premium Cow Share",
      type: "cow",
      price: 100,
      image: "/placeholder.svg?height=200&width=300",
      condition: "Excellent",
      age: "3-4 years",
      weight: "400-500 kg",
      location: "Premium Ranch - Indonesia",
      description: "Share in premium cow sacrifice. High-quality cattle from certified ranch.",
      features: ["Shariah certified", "Premium breed", "Grain-fed", "1/7 share", "Large portions"],
    },
    {
      id: "cow-standard",
      name: "Standard Cow Share",
      type: "cow",
      price: 80,
      image: "/placeholder.svg?height=200&width=300",
      condition: "Good",
      age: "2-3 years",
      weight: "350-400 kg",
      location: "Certified Farm - Indonesia",
      description: "Share in healthy cow sacrifice meeting all Islamic requirements.",
      features: ["Shariah certified", "Health verified", "Quality feed", "1/7 share"],
    },
    {
      id: "cow-economy",
      name: "Economy Cow Share",
      type: "cow",
      price: 65,
      image: "/placeholder.svg?height=200&width=300",
      condition: "Good",
      age: "2 years",
      weight: "300-350 kg",
      location: "Local Farm - Indonesia",
      description: "Affordable cow share option while maintaining Shariah compliance.",
      features: ["Shariah certified", "Health verified", "Local sourced", "1/7 share", "Budget-friendly"],
    },
  ],
}

export default function QurbanPage() {
  const [selectedAnimal, setSelectedAnimal] = useState<string>("goat-standard")
  const [selectedCategory, setSelectedCategory] = useState<"goats" | "cows">("goats")

  const getSelectedAnimalData = () => {
    const allAnimals = [...qurbanAnimals.goats, ...qurbanAnimals.cows]
    return allAnimals.find((animal) => animal.id === selectedAnimal) || qurbanAnimals.goats[1]
  }

  const selectedAnimalData = getSelectedAnimalData()

  return (
    <div className="min-h-screen islamic-pattern py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#f0fdf4] mb-4">Qurban Donation</h1>
          <p className="text-[#f0fdf4]/70">Choose your animal with complete transparency and detailed information</p>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  {step.completed ? (
                    <CheckCircle className="h-8 w-8 text-[#d1b86a]" />
                  ) : (
                    <Circle className="h-8 w-8 text-[#f0fdf4]/40" />
                  )}
                  <span className={`ml-2 ${step.completed ? "text-[#d1b86a]" : "text-[#f0fdf4]/40"}`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${step.completed ? "bg-[#d1b86a]" : "bg-[#f0fdf4]/20"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Animal Selection */}
          <div className="lg:col-span-3">
            {/* Category Tabs */}
            <div className="flex space-x-4 mb-6">
              <Button
                onClick={() => setSelectedCategory("goats")}
                variant={selectedCategory === "goats" ? "default" : "outline"}
                className={
                  selectedCategory === "goats"
                    ? "bg-[#14532d] text-[#d1b86a]"
                    : "border-[#14532d] text-[#f0fdf4] hover:bg-[#14532d]/20 bg-transparent"
                }
              >
                🐐 Goats (Full Sacrifice)
              </Button>
              <Button
                onClick={() => setSelectedCategory("cows")}
                variant={selectedCategory === "cows" ? "default" : "outline"}
                className={
                  selectedCategory === "cows"
                    ? "bg-[#14532d] text-[#d1b86a]"
                    : "border-[#14532d] text-[#f0fdf4] hover:bg-[#14532d]/20 bg-transparent"
                }
              >
                🐄 Cows (1/7 Share)
              </Button>
            </div>

            {/* Animal Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {qurbanAnimals[selectedCategory].map((animal) => (
                <Card
                  key={animal.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedAnimal === animal.id
                      ? "border-[#d1b86a] bg-[#d1b86a]/10 glow-shadow"
                      : "bg-[#0f2419] border-[#14532d] hover:border-[#d1b86a]/50"
                  }`}
                  onClick={() => setSelectedAnimal(animal.id)}
                >
                  <CardContent className="p-4">
                    <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                      <img
                        src={animal.image || "/placeholder.svg"}
                        alt={animal.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-[#f0fdf4]">{animal.name}</h3>
                        <Badge className="bg-[#14532d] text-[#d1b86a]">{animal.condition}</Badge>
                      </div>

                      <div className="text-2xl font-bold text-[#d1b86a]">{animal.price} USDT</div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-[#f0fdf4]/70">
                          <MapPin className="h-3 w-3 mr-1" />
                          {animal.location}
                        </div>
                        <div className="text-[#f0fdf4]/70">
                          Age: {animal.age} • Weight: {animal.weight}
                        </div>
                      </div>

                      <p className="text-xs text-[#f0fdf4]/60">{animal.description}</p>

                      <div className="flex flex-wrap gap-1">
                        {animal.features.slice(0, 2).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="bg-[#14532d]/50 text-[#d1b86a] text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {animal.features.length > 2 && (
                          <Badge variant="secondary" className="bg-[#14532d]/50 text-[#d1b86a] text-xs">
                            +{animal.features.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Selected Animal Details */}
            <Card className="bg-[#0f2419] border-[#14532d]">
              <CardHeader>
                <CardTitle className="text-[#f0fdf4]">Selected Animal Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={selectedAnimalData.image || "/placeholder.svg"}
                      alt={selectedAnimalData.name}
                      className="w-full aspect-video object-cover rounded-lg mb-4"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#f0fdf4] mb-2">{selectedAnimalData.name}</h3>
                      <p className="text-[#f0fdf4]/70">{selectedAnimalData.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-[#f0fdf4]/70">Condition:</span>
                        <div className="font-medium text-[#f0fdf4]">{selectedAnimalData.condition}</div>
                      </div>
                      <div>
                        <span className="text-[#f0fdf4]/70">Age:</span>
                        <div className="font-medium text-[#f0fdf4]">{selectedAnimalData.age}</div>
                      </div>
                      <div>
                        <span className="text-[#f0fdf4]/70">Weight:</span>
                        <div className="font-medium text-[#f0fdf4]">{selectedAnimalData.weight}</div>
                      </div>
                      <div>
                        <span className="text-[#f0fdf4]/70">Location:</span>
                        <div className="font-medium text-[#f0fdf4]">{selectedAnimalData.location}</div>
                      </div>
                    </div>

                    <div>
                      <span className="text-[#f0fdf4]/70 text-sm">Features:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedAnimalData.features.map((feature, index) => (
                          <Badge key={index} className="bg-[#14532d] text-[#d1b86a]">
                            <Star className="h-3 w-3 mr-1" />
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-[#14532d] my-6" />

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-[#f0fdf4]/70">Total Amount:</div>
                    <div className="text-2xl font-bold text-[#d1b86a]">{selectedAnimalData.price} USDT</div>
                  </div>

                  <PaymentModal
                    amount={selectedAnimalData.price}
                    type="qurban"
                    title={`Qurban - ${selectedAnimalData.name}`}
                  >
                    <Button className="bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] glow-shadow px-8">
                      <Wallet className="h-4 w-4 mr-2" />
                      Pay with Smart Contract
                    </Button>
                  </PaymentModal>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-[#0f2419] border-[#14532d]">
              <CardHeader>
                <CardTitle className="text-[#f0fdf4] text-sm">Progress Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#f0fdf4]/70">Payment</span>
                      <span className="text-[#d1b86a]">0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Circle className="h-4 w-4 text-[#f0fdf4]/40 mr-2" />
                      <span className="text-[#f0fdf4]/40">Payment Pending</span>
                    </div>
                    <div className="flex items-center">
                      <Circle className="h-4 w-4 text-[#f0fdf4]/40 mr-2" />
                      <span className="text-[#f0fdf4]/40">Awaiting Proof</span>
                    </div>
                    <div className="flex items-center">
                      <Circle className="h-4 w-4 text-[#f0fdf4]/40 mr-2" />
                      <span className="text-[#f0fdf4]/40">NFT Issued</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0f2419] border-[#14532d]">
              <CardHeader>
                <CardTitle className="text-[#f0fdf4] text-sm">NFT Certificate Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-[#14532d] to-[#0f2419] rounded-lg p-4 border border-[#d1b86a]/30">
                  <div className="text-center h-full flex flex-col justify-center">
                    <Award className="h-12 w-12 text-[#d1b86a] mx-auto mb-2 crescent-shadow" />
                    <div className="text-xs text-[#f0fdf4]/70 mb-1">QRBN Certificate</div>
                    <div className="text-sm font-semibold text-[#d1b86a]">Qurban 2024</div>
                    <div className="text-xs text-[#f0fdf4]/50 mt-2">Will be minted upon completion</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0f2419] border-[#14532d]">
              <CardHeader>
                <CardTitle className="text-[#f0fdf4] text-sm">Community Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-[#d1b86a] mr-2" />
                    <span className="text-[#f0fdf4]/70">1,247 families helped</span>
                  </div>
                  <div className="text-xs text-[#f0fdf4]/50">
                    Your contribution will help provide meat to families in need during Eid al-Adha
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
