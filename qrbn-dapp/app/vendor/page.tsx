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
} from "lucide-react";
import { useDIDIdentity } from "@/hooks/use-did-identity";
import { useDIDRegistration } from "@/hooks/use-did-registration";
import { VendorDIDData, RegisteredFarm, AnimalRegistryEntry, WaqfProposal } from "@/app/types/did-types";

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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="farms">Farms ({vendorData.farms.length})</TabsTrigger>
          <TabsTrigger value="animals">Animal Registry</TabsTrigger>
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
  // Mock animal data
  const mockAnimals: AnimalRegistryEntry[] = [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Animal Registry</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Register Animal
        </Button>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Animal registry allows you to track each animal with unique tag IDs. This ensures transparency and traceability
          for waqf-funded animals.
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
          {/* Animal cards would go here */}
        </div>
      )}
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
