"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Building2, 
  User, 
  FileText, 
  Plus,
  TrendingUp,
  Award,
  MapPin,
  Calendar,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  ShoppingCart,
  DollarSign,
  Package,
  BarChart3,
} from "lucide-react";
import { useDIDIdentity } from "@/hooks/use-did-identity";
import { useDIDRegistration } from "@/hooks/use-did-registration";
import { VendorDIDData, RegisteredFarm, AnimalRegistryEntry, WaqfProposal, LifecycleStage } from "@/app/types/did-types";

export default function VendorDashboard() {
  const { address, isConnected } = useAccount();
  const { fetchVendorIdentity, loading: identityLoading } = useDIDIdentity(address);
  const { registerVendor, requestFarmRegistration, registering } = useDIDRegistration();
  
  const [vendorData, setVendorData] = useState<VendorDIDData | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (address) {
      fetchVendorIdentity().then(setVendorData);
    }
  }, [address, fetchVendorIdentity]);

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Vendor Dashboard</CardTitle>
            <CardDescription>Connect your wallet to access vendor features</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please connect your wallet to view your vendor dashboard.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (identityLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading vendor data...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!vendorData) {
    return <VendorRegistrationFlow address={address!} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Vendor Dashboard</h1>
        <p className="text-muted-foreground">Manage your farms, animals, and waqf proposals</p>
      </div>

      {/* DID Verification Status */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                {vendorData.businessInfo.businessName}
              </CardTitle>
              <CardDescription className="mt-1">
                DID: {vendorData.did}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {vendorData.verified ? (
                <Badge variant="default" className="gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Verified
                </Badge>
              ) : (
                <Badge variant="secondary" className="gap-1">
                  <Clock className="h-3 w-3" />
                  Pending Verification
                </Badge>
              )}
              <Badge variant="outline">
                Reputation: {vendorData.reputationScore}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MetricCard
              icon={<TrendingUp className="h-4 w-4" />}
              label="Rating"
              value={`${vendorData.vendorMetrics.rating}/5.0`}
              subtext={`${vendorData.vendorMetrics.totalReviews} reviews`}
            />
            <MetricCard
              icon={<Award className="h-4 w-4" />}
              label="Animals Sold"
              value={vendorData.vendorMetrics.totalAnimalsSold.toString()}
              subtext="Total lifetime"
            />
            <MetricCard
              icon={<CheckCircle2 className="h-4 w-4" />}
              label="Waqf Approved"
              value={vendorData.vendorMetrics.totalWaqfProposalsApproved.toString()}
              subtext={`${vendorData.vendorMetrics.totalWaqfProposalsRejected} rejected`}
            />
            <MetricCard
              icon={<Clock className="h-4 w-4" />}
              label="Response Time"
              value={`${vendorData.vendorMetrics.averageResponseTime}h`}
              subtext="Average"
            />
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="farms">Farms ({vendorData.farms.length})</TabsTrigger>
          <TabsTrigger value="animals">Animal Registry</TabsTrigger>
          <TabsTrigger value="marketplace">My Listings</TabsTrigger>
          <TabsTrigger value="proposals">Waqf Proposals</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <OverviewTab vendorData={vendorData} />
        </TabsContent>

        <TabsContent value="farms" className="mt-6">
          <FarmsTab farms={vendorData.farms} />
        </TabsContent>

        <TabsContent value="animals" className="mt-6">
          <AnimalsTab vendorDID={vendorData.did} />
        </TabsContent>

        <TabsContent value="marketplace" className="mt-6">
          <MarketplaceListingsTab vendorDID={vendorData.did} />
        </TabsContent>

        <TabsContent value="proposals" className="mt-6">
          <ProposalsTab vendorDID={vendorData.did} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Vendor Registration Flow Component
function VendorRegistrationFlow({ address }: { address: `0x${string}` }) {
  const [step, setStep] = useState(1);
  const { registerVendor, registering } = useDIDRegistration();

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Become a Verified Vendor</CardTitle>
          <CardDescription>
            Register your farm business to access vendor features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You need a verified TAWF DID to become a vendor. Complete the registration process to get started.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">DID Registration</h3>
                <p className="text-sm text-muted-foreground">Create your decentralized identity</p>
              </div>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>

            <Separator />

            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Business Verification</h3>
                <p className="text-sm text-muted-foreground">Submit business documents for verification</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Farm Registration</h3>
                <p className="text-sm text-muted-foreground">Register your farm locations</p>
              </div>
            </div>
          </div>

          <Button className="w-full" size="lg">
            Start Vendor Registration
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Overview Tab
function OverviewTab({ vendorData }: { vendorData: VendorDIDData }) {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground">Business Name</Label>
              <p className="font-medium">{vendorData.businessInfo.businessName}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Business Type</Label>
              <p className="font-medium capitalize">{vendorData.businessInfo.businessType}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Registration Number</Label>
              <p className="font-medium">{vendorData.businessInfo.registrationNumber}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Contact</Label>
              <p className="font-medium">{vendorData.businessInfo.email}</p>
            </div>
          </div>
          <Separator />
          <div>
            <Label className="text-muted-foreground">Address</Label>
            <p className="font-medium">
              {vendorData.businessInfo.businessAddress.street}, {vendorData.businessInfo.businessAddress.city},{" "}
              {vendorData.businessInfo.businessAddress.province} {vendorData.businessInfo.businessAddress.postalCode}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Credentials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <CredentialItem
              name="Business License"
              status="verified"
              issuedAt={vendorData.vendorCredentials.businessLicense.issuedAt}
            />
            {vendorData.vendorCredentials.halalCertification && (
              <CredentialItem
                name="Halal Certification"
                status="verified"
                issuedAt={vendorData.vendorCredentials.halalCertification.issuedAt}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Farms Tab
function FarmsTab({ farms }: { farms: RegisteredFarm[] }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Registered Farms</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Register New Farm
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register New Farm</DialogTitle>
              <DialogDescription>
                Add a new farm location to your vendor profile
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Farm Name</Label>
                <Input placeholder="e.g., Peternakan Berkah Malang" />
              </div>
              <div>
                <Label>Location</Label>
                <Input placeholder="City, Province" />
              </div>
              <div>
                <Label>Farm Size (hectares)</Label>
                <Input type="number" placeholder="10" />
              </div>
              <div>
                <Label>Animal Capacity</Label>
                <Input type="number" placeholder="200" />
              </div>
              <Button className="w-full">Submit for Verification</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {farms.map((farm) => (
          <Card key={farm.farmId}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {farm.farmName}
                    {farm.verified && (
                      <Badge variant="default" className="gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <MapPin className="h-3 w-3" />
                    {farm.location}
                  </CardDescription>
                </div>
                <Badge variant={farm.status === "active" ? "default" : "secondary"}>
                  {farm.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-muted-foreground">Total Animals</Label>
                  <p className="text-2xl font-bold">{farm.totalAnimals}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Waqf Received</Label>
                  <p className="text-2xl font-bold">Rp {(farm.totalWaqfReceived / 1000000).toFixed(1)}M</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Registered</Label>
                  <p className="text-sm">{new Date(farm.registeredAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
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
        ))}
      </div>
    </div>
  );
}

// Animals Tab
function AnimalsTab({ vendorDID }: { vendorDID: string }) {
  // Mock animal data with marketplace status
  const mockAnimals: (AnimalRegistryEntry & { marketplaceStatus?: "not_listed" | "listed" | "reserved" | "sold"; marketplacePrice?: number })[] = [
    {
      id: "animal-001",
      tagId: "KMB-2024-001",
      species: "kambing",
      breed: "Etawa",
      age: 18,
      weight: 45,
      gender: "jantan",
      healthStatus: {
        status: "healthy",
        lastCheckup: new Date("2024-12-15"),
      },
      healthRecords: [],
      farmId: "farm-001",
      vendorDID,
      lifecycle: {
        raising: {
          startDate: new Date("2023-06-20"),
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
      registeredAt: new Date("2023-06-20"),
      updatedAt: new Date("2024-12-01"),
      waqfFunded: true,
      waqfProposalId: "prop-001",
      marketplaceStatus: "listed",
      marketplacePrice: 350,
    },
    {
      id: "animal-002",
      tagId: "SPI-2024-005",
      species: "sapi",
      breed: "Limosin",
      age: 36,
      weight: 520,
      gender: "betina",
      healthStatus: {
        status: "healthy",
        lastCheckup: new Date("2024-12-10"),
      },
      healthRecords: [],
      farmId: "farm-001",
      vendorDID,
      lifecycle: {
        raising: {
          startDate: new Date("2022-01-05"),
          expectedReadyDate: new Date("2024-11-15"),
        },
        ready: {
          date: new Date("2024-11-15"),
        },
      },
      currentStage: "ready",
      halalCompliant: true,
      images: [],
      documents: [],
      registeredAt: new Date("2022-01-05"),
      updatedAt: new Date("2024-11-15"),
      waqfFunded: true,
      waqfProposalId: "prop-002",
      marketplaceStatus: "reserved",
      marketplacePrice: 2800,
    },
    {
      id: "animal-003",
      tagId: "KMB-2024-012",
      species: "kambing",
      breed: "Boer",
      age: 16,
      weight: 38,
      gender: "jantan",
      healthStatus: {
        status: "healthy",
        lastCheckup: new Date("2024-12-18"),
      },
      healthRecords: [],
      farmId: "farm-001",
      vendorDID,
      lifecycle: {
        raising: {
          startDate: new Date("2023-08-25"),
          expectedReadyDate: new Date("2024-12-15"),
        },
        ready: {
          date: new Date("2024-12-15"),
        },
      },
      currentStage: "ready",
      halalCompliant: true,
      images: [],
      documents: [],
      registeredAt: new Date("2023-08-25"),
      updatedAt: new Date("2024-12-15"),
      waqfFunded: false,
      marketplaceStatus: "not_listed",
    },
  ];

  const getMarketplaceBadge = (status?: string) => {
    if (!status || status === "not_listed") {
      return (
        <Badge variant="outline" className="gap-1">
          <Package className="h-3 w-3" />
          Not Listed
        </Badge>
      );
    }
    const config = {
      listed: { className: "bg-blue-600 text-white", icon: <ShoppingCart className="h-3 w-3" />, label: "On Marketplace" },
      reserved: { className: "bg-yellow-600 text-white", icon: <Clock className="h-3 w-3" />, label: "Reserved" },
      sold: { className: "bg-green-600 text-white", icon: <CheckCircle2 className="h-3 w-3" />, label: "Sold" },
    };
    const cfg = config[status as keyof typeof config];
    return (
      <Badge className={`gap-1 ${cfg.className}`}>
        {cfg.icon}
        {cfg.label}
      </Badge>
    );
  };

  const getLifecycleBadge = (status: string) => {
    const config = {
      raising: { variant: "secondary" as const, label: "Raising" },
      ready: { variant: "default" as const, label: "Ready" },
      listed: { variant: "default" as const, label: "Listed" },
      sold: { variant: "outline" as const, label: "Sold" },
      sacrificed: { variant: "outline" as const, label: "Sacrificed" },
    };
    return <Badge variant={config[status as keyof typeof config]?.variant || "secondary"}>{config[status as keyof typeof config]?.label || status}</Badge>;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Animal Registry</h2>
          <p className="text-muted-foreground">Track all animals with marketplace integration</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Register Animal
        </Button>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Animals with &quot;ready&quot; status can be listed in the marketplace. Track lifecycle from raising to sale.
        </AlertDescription>
      </Alert>

      {mockAnimals.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No animals registered yet</p>
            <Button className="mt-4">Register Your First Animal</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {mockAnimals.map((animal) => (
            <Card key={animal.id} className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-lg">
                        {animal.species === "kambing" ? "Kambing" : animal.species === "sapi" ? "Sapi" : "Domba"}{" "}
                        {animal.breed}
                      </CardTitle>
                      {getLifecycleBadge(animal.currentStage)}
                      {getMarketplaceBadge(animal.marketplaceStatus)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        Tag: {animal.tagId}
                      </span>
                      <span>{animal.weight}kg</span>
                      <span>{animal.age} months</span>
                      {animal.marketplacePrice && (
                        <span className="font-semibold text-foreground">${animal.marketplacePrice} USDT</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {animal.currentStage === "ready" && animal.marketplaceStatus === "not_listed" && (
                      <Button size="sm" variant="default">
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        List to Marketplace
                      </Button>
                    )}
                    {animal.marketplaceStatus === "listed" && (
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View Listing
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <Label className="text-muted-foreground">Health Status</Label>
                    <p className="font-medium capitalize">{animal.healthStatus.status}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Farm ID</Label>
                    <p className="font-medium">{animal.farmId}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Registered</Label>
                    <p className="font-medium">{animal.registeredAt.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Waqf Funded</Label>
                    <p className="font-medium">
                      {animal.waqfFunded ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Yes
                        </span>
                      ) : (
                        <span className="text-muted-foreground">No</span>
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}\n        </div>
      )}
    </div>
  );
}

// Marketplace Listings Tab
function MarketplaceListingsTab({ vendorDID }: { vendorDID: string }) {
  // Mock marketplace listings data
  const [listings, setListings] = useState([
    {
      id: "listing-001",
      animalId: "animal-001",
      tagId: "KMB-2024-001",
      species: "kambing" as const,
      breed: "Etawa",
      weight: 45,
      age: 18,
      price: 350,
      status: "listed" as const,
      listedDate: new Date("2024-12-15"),
      views: 24,
      interested: 3,
    },
    {
      id: "listing-002",
      animalId: "animal-002",
      tagId: "SPI-2024-005",
      species: "sapi" as const,
      breed: "Limosin",
      weight: 520,
      age: 36,
      price: 2800,
      status: "reserved" as const,
      listedDate: new Date("2024-12-10"),
      reservedDate: new Date("2024-12-20"),
      views: 45,
      interested: 8,
      customerDID: "did:tawf:0xcustomer1",
    },
    {
      id: "listing-003",
      animalId: "animal-003",
      tagId: "KMB-2024-008",
      species: "kambing" as const,
      breed: "Boer",
      weight: 52,
      age: 20,
      price: 400,
      status: "sold" as const,
      listedDate: new Date("2024-11-28"),
      soldDate: new Date("2024-12-18"),
      views: 67,
      interested: 12,
      customerDID: "did:tawf:0xcustomer2",
      revenue: 400,
    },
  ]);

  const totalRevenue = listings
    .filter(l => l.status === "sold")
    .reduce((sum, l) => sum + (l.revenue || 0), 0);
  const activeListings = listings.filter(l => l.status === "listed").length;
  const reservedListings = listings.filter(l => l.status === "reserved").length;
  const totalSold = listings.filter(l => l.status === "sold").length;

  const getStatusBadge = (status: "listed" | "reserved" | "sold") => {
    const config = {
      listed: { variant: "default" as const, label: "Active", className: "bg-blue-600" },
      reserved: { variant: "secondary" as const, label: "Reserved", className: "bg-yellow-600" },
      sold: { variant: "outline" as const, label: "Sold", className: "bg-green-600 text-white" },
    };
    return (
      <Badge variant={config[status].variant} className={config[status].className}>
        {config[status].label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">My Marketplace Listings</h2>
          <p className="text-muted-foreground">Manage your animals listed in the Qurban marketplace</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              List New Animal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>List Animal to Marketplace</DialogTitle>
              <DialogDescription>
                Select an animal from your registry to list in the Qurban marketplace
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Only animals with &quot;ready&quot; status can be listed. Go to Animal Registry to prepare animals.
                </AlertDescription>
              </Alert>
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground mb-4">
                  This feature requires integration with your animal registry
                </p>
                <Button variant="outline">Go to Animal Registry</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Listings</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
              {activeListings}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Available for purchase</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Reserved</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Clock className="h-6 w-6 text-yellow-600" />
              {reservedListings}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Pending confirmation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Sold</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              {totalSold}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-emerald-600" />
              ${totalRevenue}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">USDT earned</p>
          </CardContent>
        </Card>
      </div>

      {/* Listings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Listings</CardTitle>
          <CardDescription>Track performance and manage your marketplace animals</CardDescription>
        </CardHeader>
        <CardContent>
          {listings.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">No animals listed yet</p>
              <Button>List Your First Animal</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">
                          {listing.species === "kambing" ? "Kambing" : listing.species === "sapi" ? "Sapi" : "Domba"}{" "}
                          {listing.breed}
                        </h3>
                        {getStatusBadge(listing.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          Tag: {listing.tagId}
                        </span>
                        <span>{listing.weight}kg</span>
                        <span>{listing.age} months</span>
                        <span className="font-semibold text-foreground">${listing.price} USDT</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {listing.status === "listed" && (
                        <>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit Price
                          </Button>
                          <Button variant="outline" size="sm">
                            <XCircle className="h-3 w-3 mr-1" />
                            Unlist
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>

                  {/* Performance Stats */}
                  <div className="flex items-center gap-6 pt-3 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Views:</span>
                      <span className="font-medium">{listing.views}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Interested:</span>
                      <span className="font-medium">{listing.interested}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Listed:</span>
                      <span className="font-medium">{listing.listedDate.toLocaleDateString()}</span>
                    </div>
                    {listing.status === "reserved" && listing.reservedDate && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-yellow-600" />
                        <span className="text-muted-foreground">Reserved:</span>
                        <span className="font-medium">{listing.reservedDate.toLocaleDateString()}</span>
                      </div>
                    )}
                    {listing.status === "sold" && listing.soldDate && (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-muted-foreground">Sold:</span>
                        <span className="font-medium">{listing.soldDate.toLocaleDateString()}</span>
                        <span className="ml-2 font-semibold text-green-600">${listing.revenue} USDT</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Listing Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />
              <span>Animals with health certificates get 3x more views</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />
              <span>Include clear photos and detailed descriptions to increase interest</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />
              <span>Competitive pricing based on weight and breed attracts more buyers</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />
              <span>Respond quickly to inquiries to improve your vendor rating</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

// Proposals Tab
function ProposalsTab({ vendorDID }: { vendorDID: string }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Waqf Proposals</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Proposal
        </Button>
      </div>

      <Alert>
        <AlertDescription>
          Submit waqf proposals to request funding for raising animals. Proposals go through dual-gate approval:
          Community DAO vote + ZK Sharia Council review.
        </AlertDescription>
      </Alert>

      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">No proposals yet</p>
          <Button className="mt-4">Create Your First Proposal</Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper Components
function MetricCard({ icon, label, value, subtext }: { icon: React.ReactNode; label: string; value: string; subtext: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 bg-muted rounded-lg">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground">{subtext}</p>
      </div>
    </div>
  );
}

function CredentialItem({ name, status, issuedAt }: { name: string; status: string; issuedAt: Date }) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center gap-3">
        <FileText className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">
            Issued: {new Date(issuedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <Badge variant="default" className="gap-1">
        <CheckCircle2 className="h-3 w-3" />
        {status}
      </Badge>
    </div>
  );
}
