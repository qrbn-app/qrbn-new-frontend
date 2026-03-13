"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Wallet, Award, Users, Star, MapPin, ScrollText, Sparkles } from "lucide-react";
import { PaymentModal } from "@/components/payment-modal";
import { useReadContract } from "@/hooks/use-read-contracts";
import { useCurrency } from "@/components/providers/currency-provider";
import { cn, displayTokenPrice, isAnimalSold } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const steps = [
  { id: 1, title: "Choose Qurban Type", completed: true },
  { id: 2, title: "Select Animal", completed: true },
  { id: 3, title: "Payment", completed: false },
];

const dummyFeatures = ["Shariah certified", "Health verified", "Local sourced", "1/7 share", "Budget-friendly"];

export default function QurbanPage() {
  const [selectedAnimal, setSelectedAnimal] = useState<bigint>();
  const [selectedCategory, setSelectedCategory] = useState<"goats" | "cows">("goats");
  const { formatCurrency, convertToSelectedCurrency } = useCurrency();
  const { data: qurbanAnimals, isLoading } = useReadContract((contracts) => ({
    queryKey: ["qurbanAnimals"],
    queryFn: () => contracts?.getQurbanAnimals(),
  }));

  const getSelectedAnimalData = () => {
    return qurbanAnimals?.[selectedCategory].find((animal) => animal.id === selectedAnimal);
  };
  const selectedAnimalData = useMemo(getSelectedAnimalData, [qurbanAnimals, selectedAnimal]);

  return (
    <div className="min-h-screen bg-tawf-sand py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm uppercase tracking-widest text-tawf-gold font-medium">Eid al-Adha Sacrifice</span>
          <h1 className="text-4xl md:text-5xl font-heading font-medium mt-4 mb-4 text-tawf-green">
            Qurban Donation
          </h1>
          <p className="text-tawf-muted max-w-2xl mx-auto">
            Choose your animal with complete transparency and detailed information. Receive NFT certificate as proof.
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.completed ? "bg-tawf-green" : "bg-tawf-muted/20"
                  }`}>
                    {step.completed ? (
                      <CheckCircle className="h-5 w-5 text-tawf-sand" />
                    ) : (
                      <Circle className="h-5 w-5 text-tawf-muted" />
                    )}
                  </div>
                  <span className={`ml-3 text-sm font-medium ${
                    step.completed ? "text-tawf-green" : "text-tawf-muted"
                  }`}>{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-20 h-0.5 mx-4 ${step.completed ? "bg-tawf-green" : "bg-tawf-muted/20"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Animal Selection */}
          <div className="lg:col-span-3">
            {/* Category Tabs */}
            <div className="flex space-x-4 mb-8">
              <Button
                onClick={() => setSelectedCategory("goats")}
                variant={selectedCategory === "goats" ? "default" : "outline"}
                className={
                  selectedCategory === "goats"
                    ? "rounded-full"
                    : "rounded-full border-tawf-green/20 text-tawf-ink hover:bg-tawf-green/10 bg-white"
                }
              >
                🐐 Goats (Full Sacrifice)
              </Button>
              <Button
                onClick={() => setSelectedCategory("cows")}
                variant={selectedCategory === "cows" ? "default" : "outline"}
                className={
                  selectedCategory === "cows"
                    ? "rounded-full"
                    : "rounded-full border-tawf-green/20 text-tawf-ink hover:bg-tawf-green/10 bg-white"
                }
              >
                🐄 Cows (1/7 Share)
              </Button>
            </div>

            {/* Animal Grid */}
            {isLoading ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {Array.from({ length: 6 }).map((_, idx) => {
                  return <Skeleton key={idx} className="w-full h-[400px]" />;
                })}
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {qurbanAnimals?.[selectedCategory].map((animal) => (
                    <Card
                      key={animal.id}
                      className={cn(`cursor-pointer transition-all duration-300`, {
                        "border-tawf-gold bg-tawf-gold/5 shadow-lg": selectedAnimal === animal.id,
                        "border-tawf-green/10 bg-white hover:border-tawf-gold/30 hover:shadow-md": selectedAnimal !== animal.id,
                        "pointer-events-none opacity-60": isAnimalSold(animal.status),
                      })}
                      onClick={() => !isAnimalSold(animal.status) && setSelectedAnimal(animal.id)}
                    >
                      <CardContent className="p-5">
                        <div className="aspect-video mb-4 rounded-2xl overflow-hidden relative">
                          <img
                            src={animal.image || "/placeholder.svg"}
                            alt={animal.name}
                            className="w-full h-full object-cover"
                          />
                          {isAnimalSold(animal.status) && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
                              <span className="text-tawf-gold font-heading font-bold text-lg">Sold</span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-heading font-semibold text-tawf-green">{animal.name}</h3>
                            <Badge className="bg-tawf-green/10 text-tawf-green border-0">Excellent</Badge>
                          </div>

                          <div className="text-2xl font-heading font-bold text-tawf-gold">
                            {formatCurrency(
                              convertToSelectedCurrency(parseFloat(displayTokenPrice(animal.pricePerShare)))
                            )}
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center text-tawf-muted">
                              <MapPin className="h-3 w-3 mr-1" />
                              {animal.location}
                            </div>
                            <div className="flex items-center text-tawf-muted">
                              <ScrollText className="h-3 w-3 mr-1" />
                              {animal.totalShares - animal.availableShares} / {animal.totalShares} share
                              {animal.totalShares > 1 ? "s" : ""} sold
                            </div>
                            <div className="text-tawf-muted">
                              Age: {animal.age} • Weight: {animal.weight}
                            </div>
                          </div>

                          <p className="text-xs text-tawf-muted line-clamp-2">{animal.description}</p>

                          <div className="flex flex-wrap gap-1">
                            {dummyFeatures.slice(0, 2).map((feature, index) => (
                              <Badge key={index} variant="secondary" className="bg-tawf-green/10 text-tawf-green border-0 text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {dummyFeatures.length > 2 && (
                              <Badge variant="secondary" className="bg-tawf-green/10 text-tawf-green border-0 text-xs">
                                +{dummyFeatures.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Selected Animal Details */}
                {selectedAnimalData ? (
                  <Card className="border-tawf-green/10 bg-white">
                    <CardHeader>
                      <CardTitle className="text-tawf-green font-heading">Selected Animal Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <img
                            src={selectedAnimalData?.image || "/placeholder.svg"}
                            alt={selectedAnimalData?.name}
                            className="w-full aspect-video object-cover rounded-2xl mb-4"
                          />
                        </div>

                        <div className="space-y-5">
                          <div>
                            <h3 className="text-xl font-heading font-semibold text-tawf-green mb-2">{selectedAnimalData?.name}</h3>
                            <p className="text-tawf-muted text-sm">{selectedAnimalData?.description}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-tawf-sand/50 rounded-xl p-3">
                              <span className="text-tawf-muted text-xs block mb-1">Condition</span>
                              <div className="font-heading font-medium text-tawf-green">Excellent</div>
                            </div>
                            <div className="bg-tawf-sand/50 rounded-xl p-3">
                              <span className="text-tawf-muted text-xs block mb-1">Age</span>
                              <div className="font-heading font-medium text-tawf-ink">{selectedAnimalData?.age}</div>
                            </div>
                            <div className="bg-tawf-sand/50 rounded-xl p-3">
                              <span className="text-tawf-muted text-xs block mb-1">Weight</span>
                              <div className="font-heading font-medium text-tawf-ink">{selectedAnimalData?.weight}</div>
                            </div>
                            <div className="bg-tawf-sand/50 rounded-xl p-3">
                              <span className="text-tawf-muted text-xs block mb-1">Location</span>
                              <div className="font-heading font-medium text-tawf-ink">{selectedAnimalData?.location}</div>
                            </div>
                          </div>

                          <div>
                            <span className="text-tawf-muted text-sm block mb-2">Features:</span>
                            <div className="flex flex-wrap gap-2">
                              {dummyFeatures.map((feature, index) => (
                                <Badge key={index} className="bg-tawf-green/10 text-tawf-green border-0">
                                  <Star className="h-3 w-3 mr-1 fill-current" />
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="h-px bg-tawf-green/10 my-6" />

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-tawf-muted mb-1">Total Amount</div>
                          <div className="text-2xl font-heading font-bold text-tawf-gold">
                            {formatCurrency(
                              convertToSelectedCurrency(parseFloat(displayTokenPrice(selectedAnimalData.pricePerShare)))
                            )}
                          </div>
                        </div>

                        <PaymentModal
                          amount={selectedAnimalData.pricePerShare}
                          type="qurban"
                          animalId={selectedAnimalData.id}
                          title={`Qurban - ${selectedAnimalData.name}`}
                        >
                          <Button className="rounded-full px-8">
                            <Wallet className="h-4 w-4 mr-2" />
                            Buy (1 share)
                          </Button>
                        </PaymentModal>
                      </div>
                    </CardContent>
                  </Card>
                ) : null}
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* NFT Certificate Preview */}
            <Card className="border-tawf-green/10 bg-white">
              <CardHeader>
                <CardTitle className="text-tawf-green font-heading text-sm flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-tawf-gold" />
                  NFT Certificate Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-tawf-green to-tawf-greenLight rounded-2xl p-6 border border-tawf-gold/20">
                  <div className="text-center h-full flex flex-col justify-center">
                    <Award className="h-14 w-14 text-tawf-gold mx-auto mb-3" />
                    <div className="text-xs text-tawf-sand/70 mb-2 uppercase tracking-wider">QRBN Certificate</div>
                    <div className="text-lg font-heading font-semibold text-tawf-gold">Qurban 2025</div>
                    <div className="text-xs text-tawf-sand/50 mt-4">Will be minted upon completion</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Impact */}
            <Card className="border-tawf-green/10 bg-white">
              <CardHeader>
                <CardTitle className="text-tawf-green font-heading text-sm flex items-center gap-2">
                  <Users className="h-4 w-4 text-tawf-gold" />
                  Community Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-tawf-green/10 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-tawf-green" />
                    </div>
                    <div>
                      <div className="text-xl font-heading font-bold text-tawf-green">1,247</div>
                      <div className="text-xs text-tawf-muted">families helped</div>
                    </div>
                  </div>
                  <p className="text-sm text-tawf-muted leading-relaxed">
                    Your contribution will help provide meat to families in need during Eid al-Adha
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
