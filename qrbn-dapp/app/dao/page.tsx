"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ExternalLink, 
  ArrowRight, 
  Users, 
  Building, 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Vote, 
  Coins, 
  FileText,
  Shield,
  Award,
  TrendingUp,
  Clock,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  Plus,
} from "lucide-react";
import { useAccount } from "wagmi";
import { useDIDIdentity } from "@/hooks/use-did-identity";
import { DAOProposal, WaqfProposal } from "@/app/types/did-types";

export default function DAOPage() {
    const { address, isConnected } = useAccount();
    const { identity, loading, canVoteInDAO, canCreateProposal, getCurrentReputation } = useDIDIdentity(address);
    const [activeTab, setActiveTab] = useState("overview");
    const [proposals, setProposals] = useState<DAOProposal[]>([]);
    const [waqfProposals, setWaqfProposals] = useState<WaqfProposal[]>([]);

    useEffect(() => {
        if (isConnected && address) {
            loadProposals();
        }
    }, [isConnected, address]);

    const loadProposals = async () => {
        // Mock data for development - multiple proposals showing different states
        const mockDAOProposals: DAOProposal[] = [
            {
                id: "prop-001",
                proposerDID: "did:tawf:0xproposer1",
                proposerReputation: 75,
                title: "Reduce Platform Nazhir Fee to 7%",
                description: "Proposal to reduce the nazhir management fee from 8% to 7% to make waqf contributions more attractive.",
                category: "PlatformParameter",
                proposalData: {
                    parameterName: "nazhirFee",
                    newValue: 7,
                    currentValue: 8,
                },
                votingStartTime: new Date("2024-12-20"),
                votingEndTime: new Date("2024-12-27"),
                approvalGates: {
                    communityGate: {
                        required: true,
                        passed: false,
                        minReputationToVote: 20,
                        quorumRequired: 30,
                        approvalThreshold: 50,
                    },
                    shariaGate: {
                        required: true,
                        passed: false,
                        councilMembersRequired: 3,
                        approvalsReceived: 0,
                    },
                },
                status: "active",
                communityVote: {
                    totalVotes: 42,
                    votesFor: 32,
                    votesAgainst: 10,
                    votesAbstain: 0,
                    totalReputationVoted: 850,
                    quorumReached: true,
                    passed: false,
                    votes: [],
                },
                executed: false,
                createdAt: new Date("2024-12-20"),
                updatedAt: new Date("2024-12-20"),
            },
            {
                id: "prop-002",
                proposerDID: "did:tawf:0xproposer2",
                proposerReputation: 85,
                title: "Add New Vendor Verification Requirements",
                description: "Proposal to require additional health certifications for all new vendor registrations to ensure animal welfare standards.",
                category: "VendorManagement",
                proposalData: {
                    requirementType: "health_certification",
                    requiredDocuments: ["veterinary_license", "animal_welfare_cert"],
                },
                votingStartTime: new Date("2024-12-18"),
                votingEndTime: new Date("2024-12-25"),
                approvalGates: {
                    communityGate: {
                        required: true,
                        passed: true,
                        minReputationToVote: 20,
                        quorumRequired: 30,
                        approvalThreshold: 50,
                    },
                    shariaGate: {
                        required: true,
                        passed: false,
                        councilMembersRequired: 3,
                        approvalsReceived: 2,
                    },
                },
                status: "sharia_review",
                communityVote: {
                    totalVotes: 58,
                    votesFor: 45,
                    votesAgainst: 13,
                    votesAbstain: 0,
                    totalReputationVoted: 1200,
                    quorumReached: true,
                    passed: true,
                    votes: [],
                },
                shariaVote: {
                    totalCouncilMembers: 3,
                    approvalsReceived: 2,
                    rejectionsReceived: 0,
                    passed: false,
                    councilVotes: [],
                },
                executed: false,
                createdAt: new Date("2024-12-18"),
                updatedAt: new Date("2024-12-22"),
            },
            {
                id: "prop-003",
                proposerDID: "did:tawf:0xproposer3",
                proposerReputation: 92,
                title: "Update Minimum Waqf Contribution Amount",
                description: "Proposal to increase minimum waqf contribution from 50 USDT to 100 USDT to ensure sustainable farm operations.",
                category: "PlatformParameter",
                proposalData: {
                    parameterName: "minWaqfContribution",
                    newValue: 100,
                    currentValue: 50,
                    unit: "USDT",
                },
                votingStartTime: new Date("2024-12-15"),
                votingEndTime: new Date("2024-12-22"),
                approvalGates: {
                    communityGate: {
                        required: true,
                        passed: true,
                        minReputationToVote: 20,
                        quorumRequired: 30,
                        approvalThreshold: 50,
                    },
                    shariaGate: {
                        required: true,
                        passed: true,
                        councilMembersRequired: 3,
                        approvalsReceived: 3,
                    },
                },
                status: "approved",
                communityVote: {
                    totalVotes: 67,
                    votesFor: 52,
                    votesAgainst: 15,
                    votesAbstain: 0,
                    totalReputationVoted: 1450,
                    quorumReached: true,
                    passed: true,
                    votes: [],
                },
                shariaVote: {
                    totalCouncilMembers: 3,
                    approvalsReceived: 3,
                    rejectionsReceived: 0,
                    passed: true,
                    councilVotes: [],
                    zkProof: "0xzkproof123...",
                },
                executed: false,
                createdAt: new Date("2024-12-15"),
                updatedAt: new Date("2024-12-22"),
            },
        ];

        setProposals(mockDAOProposals);
    };

    const reputation = getCurrentReputation();
    const canVote = canVoteInDAO(20);
    const canPropose = canCreateProposal(50);

    return (
        <div className="min-h-screen bg-tawf-sand/30 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-heading font-medium text-tawf-green mb-4">TAWF DAO Governance</h1>
                    <p className="text-tawf-ink/70 max-w-2xl mx-auto">
                        Reputation-based decentralized governance powered by TAWF DID. No tokens required—your contributions and participation determine your voting power.
                    </p>
                </div>

                {!isConnected && (
                    <Alert className="mb-8 bg-tawf-sand/30 border-tawf-gold">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-tawf-ink">
                            Connect your wallet and register your TAWF DID to participate in governance.
                        </AlertDescription>
                    </Alert>
                )}

                {/* DID Identity Card */}
                {isConnected && identity && (
                    <Card className="bg-white border-tawf-green/10 rounded-2xl mb-8">
                        <CardHeader>
                            <CardTitle className="text-tawf-ink flex items-center gap-2">
                                <Shield className="h-5 w-5 text-tawf-gold" />
                                Your TAWF DID Identity
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="flex items-center justify-center py-8">
                                    <Loader2 className="h-6 w-6 animate-spin text-tawf-gold" />
                                    <span className="ml-2 text-tawf-ink/70">Loading your identity...</span>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div className="text-center p-4 bg-tawf-sand/30 rounded-xl">
                                            <div className="text-2xl font-bold text-tawf-gold">{reputation}</div>
                                            <div className="text-sm text-tawf-ink/70">Reputation Score</div>
                                            <Progress value={reputation} className="mt-2 h-1" />
                                        </div>
                                        <div className="text-center p-4 bg-tawf-sand/30 rounded-xl">
                                            <div className="text-2xl font-bold text-tawf-gold">{identity.activityPoints}</div>
                                            <div className="text-sm text-tawf-ink/70">Activity Points</div>
                                        </div>
                                        <div className="text-center p-4 bg-tawf-sand/30 rounded-xl">
                                            <div className="flex items-center justify-center gap-2">
                                                {identity.verified ? (
                                                    <CheckCircle className="h-6 w-6 text-green-500" />
                                                ) : (
                                                    <XCircle className="h-6 w-6 text-yellow-500" />
                                                )}
                                            </div>
                                            <div className="text-sm text-tawf-ink/70 mt-2">
                                                {identity.verified ? "Verified" : "Unverified"}
                                            </div>
                                        </div>
                                        <div className="text-center p-4 bg-tawf-sand/30 rounded-xl">
                                            <div className="text-2xl font-bold text-tawf-gold">{identity.credentials.length}</div>
                                            <div className="text-sm text-tawf-ink/70">Credentials</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-tawf-sand/30 rounded-xl">
                                        <div>
                                            <p className="text-sm text-tawf-ink/70">Voting Rights</p>
                                            <p className="text-tawf-ink font-medium">
                                                {canVote ? "Eligible to vote (Reputation ≥ 20)" : "Not eligible (Need 20+ reputation)"}
                                            </p>
                                        </div>
                                        {canVote ? (
                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <XCircle className="h-5 w-5 text-red-500" />
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-tawf-sand/30 rounded-xl">
                                        <div>
                                            <p className="text-sm text-tawf-ink/70">Proposal Creation</p>
                                            <p className="text-tawf-ink font-medium">
                                                {canPropose ? "Can create proposals (Reputation ≥ 50)" : "Not eligible (Need 50+ reputation)"}
                                            </p>
                                        </div>
                                        {canPropose ? (
                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <XCircle className="h-5 w-5 text-red-500" />
                                        )}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Governance Explanation */}
                <Card className="bg-white border-tawf-green/10 rounded-2xl mb-8">
                    <CardHeader>
                        <CardTitle className="text-tawf-ink">How TAWF DID Governance Works</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-tawf-green/10 text-tawf-gold font-bold">
                                1
                            </div>
                            <div>
                                <h3 className="text-tawf-ink font-semibold mb-1">Register Your TAWF DID</h3>
                                <p className="text-tawf-ink/70 text-sm">
                                    Create your decentralized identity on-chain. Start with 10 reputation points.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-tawf-green/10 text-tawf-gold font-bold">
                                2
                            </div>
                            <div>
                                <h3 className="text-tawf-ink font-semibold mb-1">Build Your Reputation</h3>
                                <p className="text-tawf-ink/70 text-sm">
                                    Earn reputation through waqf contributions, voting, proposal creation, and community engagement.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-tawf-green/10 text-tawf-gold font-bold">
                                3
                            </div>
                            <div>
                                <h3 className="text-tawf-ink font-semibold mb-1">Community Gate (20+ Reputation)</h3>
                                <p className="text-tawf-ink/70 text-sm">
                                    Vote on proposals using your reputation score as voting power. No tokens required!
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-tawf-green/10 text-tawf-gold font-bold">
                                4
                            </div>
                            <div>
                                <h3 className="text-tawf-ink font-semibold mb-1">Sharia Council Gate (ZK Proof)</h3>
                                <p className="text-tawf-ink/70 text-sm">
                                    Proposals that pass community vote require ZK Sharia Council approval for final execution.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabs for Proposals */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3 bg-tawf-green/10">
                        <TabsTrigger value="overview" className="data-[state=active]:bg-tawf-green/10 data-[state=active]:text-tawf-ink">
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="governance" className="data-[state=active]:bg-tawf-green/10 data-[state=active]:text-tawf-ink">
                            Governance Proposals
                        </TabsTrigger>
                        <TabsTrigger value="waqf" className="data-[state=active]:bg-tawf-green/10 data-[state=active]:text-tawf-ink">
                            Waqf Proposals
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6">
                        <OverviewTab proposals={proposals} waqfProposals={waqfProposals} />
                    </TabsContent>

                    <TabsContent value="governance" className="mt-6">
                        <GovernanceProposalsTab proposals={proposals} canVote={canVote} canPropose={canPropose} />
                    </TabsContent>

                    <TabsContent value="waqf" className="mt-6">
                        <WaqfProposalsTab proposals={waqfProposals} canVote={canVote} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

// Overview Tab Component
function OverviewTab({ proposals, waqfProposals }: { proposals: DAOProposal[]; waqfProposals: WaqfProposal[] }) {
    const activeGovernance = proposals.filter((p) => p.status === "active").length;
    const activeWaqf = waqfProposals.filter((p) => p.status === "community_voting").length;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-white border-tawf-green/10 rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-tawf-ink flex items-center gap-2">
                        <Vote className="h-5 w-5 text-tawf-gold" />
                        Governance Proposals
                    </CardTitle>
                    <CardDescription className="text-tawf-ink/70">
                        Platform parameters, features, and governance decisions
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-tawf-ink/70">Active Proposals</span>
                            <span className="text-2xl font-bold text-tawf-gold">{activeGovernance}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-tawf-ink/70">Total Proposals</span>
                            <span className="text-xl font-heading font-semibold text-tawf-ink">{proposals.length}</span>
                        </div>
                        <Button className="rounded-full w-full bg-tawf-green/10 hover:bg-tawf-green/20 text-tawf-ink">
                            View All Governance Proposals
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white border-tawf-green/10 rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-tawf-ink flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-tawf-gold" />
                        Waqf Proposals
                    </CardTitle>
                    <CardDescription className="text-tawf-ink/70">
                        Vendor funding requests for raising animals
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-tawf-ink/70">Active Proposals</span>
                            <span className="text-2xl font-bold text-tawf-gold">{activeWaqf}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-tawf-ink/70">Total Proposals</span>
                            <span className="text-xl font-heading font-semibold text-tawf-ink">{waqfProposals.length}</span>
                        </div>
                        <Button className="rounded-full w-full bg-tawf-green/10 hover:bg-tawf-green/20 text-tawf-ink">
                            View All Waqf Proposals
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// Governance Proposals Tab
function GovernanceProposalsTab({ proposals, canVote, canPropose }: { proposals: DAOProposal[]; canVote: boolean; canPropose: boolean }) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl md:text-3xl font-heading font-medium text-tawf-green">Platform Governance</h2>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="rounded-full" disabled={!canPropose} className="bg-tawf-green/10 hover:bg-tawf-green/20 text-tawf-ink">
                            <Plus className="h-4 w-4 mr-2" />
                            Create Proposal
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white border-tawf-green/10 text-tawf-ink">
                        <DialogHeader>
                            <DialogTitle>Create Governance Proposal</DialogTitle>
                            <DialogDescription className="text-tawf-ink/70">
                                Submit a proposal for community and Sharia Council review
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <Label className="text-tawf-ink">Category</Label>
                                <Select>
                                    <SelectTrigger className="bg-tawf-green/10 border-tawf-green/10 text-tawf-ink">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-tawf-green/10 rounded-2xl">
                                        <SelectItem value="protocol">Protocol Change</SelectItem>
                                        <SelectItem value="campaign">Campaign</SelectItem>
                                        <SelectItem value="farm-approval">Farm Approval</SelectItem>
                                        <SelectItem value="vendor-approval">Vendor Approval</SelectItem>
                                        <SelectItem value="parameter-change">Parameter Change</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label className="text-tawf-ink">Title</Label>
                                <Input className="bg-tawf-green/10 border-tawf-green/10 text-tawf-ink" placeholder="Proposal title" />
                            </div>
                            <div>
                                <Label className="text-tawf-ink">Description</Label>
                                <Textarea className="bg-tawf-green/10 border-tawf-green/10 text-tawf-ink" rows={4} placeholder="Detailed description" />
                            </div>
                            <Button className="rounded-full w-full bg-tawf-green/10 hover:bg-tawf-green/10 text-tawf-ink">
                                Submit Proposal
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {proposals.length === 0 ? (
                <Card className="bg-white border-tawf-green/10 rounded-2xl">
                    <CardContent className="py-12 text-center">
                        <p className="text-tawf-ink/70">No active proposals</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {proposals.map((proposal) => (
                        <ProposalCard key={proposal.id} proposal={proposal} canVote={canVote} />
                    ))}
                </div>
            )}
        </div>
    );
}

// Waqf Proposals Tab
function WaqfProposalsTab({ proposals, canVote }: { proposals: WaqfProposal[]; canVote: boolean }) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-heading font-medium text-tawf-green">Vendor Waqf Requests</h2>

            <Alert className="bg-tawf-sand/30 border-tawf-gold">
                <AlertDescription className="text-tawf-ink/70">
                    Vendors request waqf funding to raise animals. Each proposal requires approval from both the Community DAO and ZK Sharia Council.
                </AlertDescription>
            </Alert>

            <Card className="bg-white border-tawf-green/10 rounded-2xl">
                <CardContent className="py-12 text-center">
                    <p className="text-tawf-ink/70">No waqf proposals yet</p>
                </CardContent>
            </Card>
        </div>
    );
}

// Proposal Card Component
function ProposalCard({ proposal, canVote }: { proposal: DAOProposal; canVote: boolean }) {
    const totalVotes = (proposal.communityVote?.votesFor ?? 0) + (proposal.communityVote?.votesAgainst ?? 0);
    const votePercentage = totalVotes > 0 ? Math.round(((proposal.communityVote?.votesFor ?? 0) / totalVotes) * 100) : 0;

    const getStatusBadge = (status: DAOProposal["status"]) => {
        const statusConfig: Record<string, { color: string; label: string }> = {
            "draft": { color: "bg-gray-600", label: "Draft" },
            "active": { color: "bg-blue-600", label: "Active Voting" },
            "community_approved": { color: "bg-green-600", label: "Community Approved" },
            "community_rejected": { color: "bg-red-600", label: "Community Rejected" },
            "sharia_review": { color: "bg-yellow-600", label: "Sharia Review" },
            "sharia_approved": { color: "bg-green-600", label: "Sharia Approved" },
            "sharia_rejected": { color: "bg-red-600", label: "Sharia Rejected" },
            "approved": { color: "bg-green-700", label: "Fully Approved" },
            "rejected": { color: "bg-red-700", label: "Rejected" },
            "executed": { color: "bg-purple-600", label: "Executed" },
            "expired": { color: "bg-gray-500", label: "Expired" },
            "cancelled": { color: "bg-gray-600", label: "Cancelled" },
        };

        const config = statusConfig[status] || { color: "bg-gray-600", label: status };
        return <Badge className={`${config.color} text-white`}>{config.label}</Badge>;
    };

    return (
        <Card className="bg-white border-tawf-green/10 hover:border-tawf-gold/50 transition-colors">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="text-tawf-ink mb-2">{proposal.title}</CardTitle>
                        <CardDescription className="text-tawf-ink/70">{proposal.description}</CardDescription>
                    </div>
                    {getStatusBadge(proposal.status)}
                </div>
                <div className="flex items-center gap-4 mt-4 text-sm text-tawf-ink/70">
                    <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        {proposal.category}
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Ends: {new Date(proposal.votingEndTime).toLocaleDateString()}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Approval Gates */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-tawf-sand/30 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-tawf-ink/70">Community Gate</span>
                            {proposal.approvalGates.communityGate.passed ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : proposal.communityVote && !proposal.communityVote.passed ? (
                                <XCircle className="h-4 w-4 text-red-500" />
                            ) : (
                                <Clock className="h-4 w-4 text-yellow-500" />
                            )}
                        </div>
                        <Progress value={votePercentage} className="h-2 mb-2" />
                        <div className="text-xs text-tawf-ink/70">
                            {proposal.communityVote?.votesFor ?? 0} for / {proposal.communityVote?.votesAgainst ?? 0} against
                        </div>
                    </div>

                    <div className="p-3 bg-tawf-sand/30 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-tawf-ink/70">Sharia Gate</span>
                            {proposal.approvalGates.shariaGate.passed ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : proposal.shariaVote && !proposal.shariaVote.passed ? (
                                <XCircle className="h-4 w-4 text-red-500" />
                            ) : (
                                <Clock className="h-4 w-4 text-yellow-500" />
                            )}
                        </div>
                        <div className="text-xs text-tawf-ink/70">
                            {proposal.approvalGates.shariaGate.approvalsReceived} / {proposal.approvalGates.shariaGate.councilMembersRequired} approvals
                        </div>
                    </div>
                </div>

                {/* Voting Buttons */}
                {proposal.status === "active" && (
                    <div className="flex gap-2">
                        <Button className="rounded-full" disabled={!canVote} className="flex-1 bg-green-700 hover:bg-green-600 text-white">
                            <ThumbsUp className="h-4 w-4 mr-2" />
                            Vote For
                        </Button>
                        <Button className="rounded-full" disabled={!canVote} className="flex-1 bg-red-700 hover:bg-red-600 text-white">
                            <ThumbsDown className="h-4 w-4 mr-2" />
                            Vote Against
                        </Button>
                    </div>
                )}

                <Button variant="outline" className="rounded-full w-full border-tawf-green/10 hover:bg-tawf-green/10 text-tawf-ink">
                    View Details
                </Button>
            </CardContent>
        </Card>
    );
}
