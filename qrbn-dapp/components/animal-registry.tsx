"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  AlertCircle,
  Activity,
  Calendar,
  Weight,
  Tag,
  Heart,
  TrendingUp,
  FileText,
  Upload,
} from "lucide-react";
import { AnimalRegistryEntry, LifecycleStage, HealthStatus } from "@/app/types/did-types";

interface AnimalRegistryProps {
  vendorDID: string;
  farmId?: string;
}

export function AnimalRegistry({ vendorDID, farmId }: AnimalRegistryProps) {
  const [animals, setAnimals] = useState<AnimalRegistryEntry[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalRegistryEntry | null>(null);
  const [filterStage, setFilterStage] = useState<LifecycleStage | "all">("all");

  // Mock data for demonstration
  const mockAnimals: AnimalRegistryEntry[] = [
    {
      id: "animal-001",
      tagId: "KMB-001-2024",
      species: "kambing",
      breed: "Etawa",
      age: 18,
      weight: 45,
      gender: "jantan",
      healthStatus: {
        status: "healthy",
        lastCheckup: new Date("2024-12-15"),
        nextCheckup: new Date("2025-01-15"),
        notes: "Excellent condition",
      },
      healthRecords: [],
      farmId: farmId || "farm-001",
      vendorDID,
      lifecycle: {
        raising: {
          startDate: new Date("2023-06-01"),
          expectedReadyDate: new Date("2024-12-01"),
        },
        ready: {
          date: new Date("2024-12-01"),
        },
      },
      currentStage: "ready",
      halalCompliant: true,
      images: [],
      documents: [],
      registeredAt: new Date("2023-06-01"),
      updatedAt: new Date("2024-12-15"),
      waqfFunded: true,
      waqfProposalId: "prop-waqf-001",
      waqfAmount: 5000000,
    },
  ];

  const filteredAnimals = filterStage === "all" 
    ? mockAnimals 
    : mockAnimals.filter((a) => a.currentStage === filterStage);

  const getStageColor = (stage: LifecycleStage) => {
    const colors = {
      raising: "bg-blue-600",
      ready: "bg-green-600",
      listed: "bg-yellow-600",
      sold: "bg-purple-600",
      sacrificed: "bg-gray-600",
      deceased: "bg-red-600",
    };
    return colors[stage] || "bg-gray-600";
  };

  const getHealthColor = (status: HealthStatus["status"]) => {
    const colors = {
      healthy: "text-green-500",
      sick: "text-red-500",
      quarantine: "text-orange-500",
      recovering: "text-yellow-500",
    };
    return colors[status] || "text-gray-500";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Animal Registry</h2>
          <p className="text-muted-foreground">
            Track and manage your animals with on-chain transparency
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Register Animal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Register New Animal</DialogTitle>
              <DialogDescription>
                Add a new animal to the on-chain registry with unique tag ID
              </DialogDescription>
            </DialogHeader>
            <RegisterAnimalForm vendorDID={vendorDID} farmId={farmId} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Animals</p>
                <p className="text-2xl font-bold">{mockAnimals.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ready for Market</p>
                <p className="text-2xl font-bold">
                  {mockAnimals.filter((a) => a.currentStage === "ready").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Raising</p>
                <p className="text-2xl font-bold">
                  {mockAnimals.filter((a) => a.currentStage === "raising").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Heart className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Waqf Funded</p>
                <p className="text-2xl font-bold">
                  {mockAnimals.filter((a) => a.waqfFunded).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Label>Filter by Stage:</Label>
            <Select value={filterStage} onValueChange={(value) => setFilterStage(value as LifecycleStage | "all")}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="raising">Raising</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="listed">Listed</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="sacrificed">Sacrificed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Animal Cards */}
      <div className="grid gap-4">
        {filteredAnimals.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No animals found</p>
              <Button className="mt-4">Register Your First Animal</Button>
            </CardContent>
          </Card>
        ) : (
          filteredAnimals.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              onSelect={() => setSelectedAnimal(animal)}
            />
          ))
        )}
      </div>

      {/* Animal Details Dialog */}
      {selectedAnimal && (
        <Dialog open={!!selectedAnimal} onOpenChange={() => setSelectedAnimal(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Animal Details: {selectedAnimal.tagId}</DialogTitle>
            </DialogHeader>
            <AnimalDetails animal={selectedAnimal} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// Animal Card Component
function AnimalCard({ animal, onSelect }: { animal: AnimalRegistryEntry; onSelect: () => void }) {
  const getStageColor = (stage: LifecycleStage) => {
    const colors = {
      raising: "bg-blue-600",
      ready: "bg-green-600",
      listed: "bg-yellow-600",
      sold: "bg-purple-600",
      sacrificed: "bg-gray-600",
      deceased: "bg-red-600",
    };
    return colors[stage] || "bg-gray-600";
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              {animal.tagId}
            </CardTitle>
            <CardDescription className="mt-1">
              {animal.species.charAt(0).toUpperCase() + animal.species.slice(1)} - {animal.breed}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2">
            <Badge className={`${getStageColor(animal.currentStage)} text-white`}>
              {animal.currentStage}
            </Badge>
            {animal.waqfFunded && (
              <Badge variant="outline" className="border-purple-500 text-purple-500">
                Waqf Funded
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label className="text-muted-foreground">Age</Label>
            <p className="font-medium">{animal.age} months</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Weight</Label>
            <p className="font-medium">{animal.weight} kg</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Gender</Label>
            <p className="font-medium capitalize">{animal.gender}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Health</Label>
            <p className="font-medium capitalize">{animal.healthStatus.status}</p>
          </div>
        </div>

        <Separator />

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onSelect} className="flex-1">
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Register Animal Form
function RegisterAnimalForm({ vendorDID, farmId }: { vendorDID: string; farmId?: string }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Tag ID *</Label>
          <Input placeholder="e.g., KMB-001-2024" />
        </div>
        <div>
          <Label>Species *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select species" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kambing">Kambing</SelectItem>
              <SelectItem value="sapi">Sapi</SelectItem>
              <SelectItem value="domba">Domba</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Breed *</Label>
          <Input placeholder="e.g., Etawa" />
        </div>
        <div>
          <Label>Gender *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jantan">Jantan (Male)</SelectItem>
              <SelectItem value="betina">Betina (Female)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Age (months) *</Label>
          <Input type="number" placeholder="e.g., 12" />
        </div>
        <div>
          <Label>Weight (kg) *</Label>
          <Input type="number" placeholder="e.g., 35" />
        </div>
      </div>

      <div>
        <Label>Photos (optional)</Label>
        <div className="border-2 border-dashed rounded-lg p-4 text-center">
          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Click to upload animal photos</p>
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          This will create an on-chain record. Make sure all information is accurate.
        </AlertDescription>
      </Alert>

      <Button className="w-full">Register Animal</Button>
    </div>
  );
}

// Animal Details Component
function AnimalDetails({ animal }: { animal: AnimalRegistryEntry }) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="health">Health Records</TabsTrigger>
        <TabsTrigger value="lifecycle">Lifecycle</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground">Tag ID</Label>
              <p className="font-medium">{animal.tagId}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Species</Label>
              <p className="font-medium capitalize">{animal.species}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Breed</Label>
              <p className="font-medium">{animal.breed}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Gender</Label>
              <p className="font-medium capitalize">{animal.gender}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Age</Label>
              <p className="font-medium">{animal.age} months</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Weight</Label>
              <p className="font-medium">{animal.weight} kg</p>
            </div>
          </CardContent>
        </Card>

        {animal.waqfFunded && (
          <Card>
            <CardHeader>
              <CardTitle>Waqf Funding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Funded Amount</span>
                <span className="font-medium">Rp {(animal.waqfAmount! / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Proposal ID</span>
                <span className="font-medium">{animal.waqfProposalId}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="health" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Current Health Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge variant={animal.healthStatus.status === "healthy" ? "default" : "destructive"}>
                {animal.healthStatus.status}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Checkup</span>
              <span>{new Date(animal.healthStatus.lastCheckup).toLocaleDateString()}</span>
            </div>
            {animal.healthStatus.nextCheckup && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Next Checkup</span>
                <span>{new Date(animal.healthStatus.nextCheckup).toLocaleDateString()}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health History</CardTitle>
          </CardHeader>
          <CardContent>
            {animal.healthRecords.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No health records yet</p>
            ) : (
              <div className="space-y-3">
                {animal.healthRecords.map((record) => (
                  <div key={record.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <Badge>{record.type}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(record.date).toLocaleDateString()}
                      </span>
                    </div>
                    {record.diagnosis && <p className="text-sm mt-2">{record.diagnosis}</p>}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="lifecycle" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Lifecycle Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {animal.lifecycle.raising && (
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-medium">Raising Started</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(animal.lifecycle.raising.startDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
              {animal.lifecycle.ready && (
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-medium">Ready for Market</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(animal.lifecycle.ready.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
