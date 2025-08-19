"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Award, AlertTriangle, Send, Loader2, Eye } from "lucide-react";
import { formatIPFSUrl, truncateAddress } from "@/lib/utils";

interface NFTMetadata {
	name: string;
	description: string;
	image: string;
	external_url?: string;
	attributes: Array<{
		trait_type: string;
		value: string | number;
	}>;
}

interface NFTCertificateCardProps {
	title?: string;
	date?: string;
	type?: string;
	tokenId?: string;
	ipfsUrl?: string;
}

export function NFTCertificateCard({ title, date, type, tokenId, ipfsUrl }: NFTCertificateCardProps) {
	const [reportText, setReportText] = useState("");
	const [isReporting, setIsReporting] = useState(false);
	const [reportSubmitted, setReportSubmitted] = useState(false);
	const [nftMetadata, setNftMetadata] = useState<NFTMetadata | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (ipfsUrl) {
			fetchNFTMetadata(ipfsUrl);
		}
	}, [ipfsUrl]);

	const fetchNFTMetadata = async (url: string) => {
		setIsLoading(true);
		setError(null);

		try {
			const formattedUrl = formatIPFSUrl(url);
			const response = await fetch(formattedUrl);
			if (!response.ok) {
				throw new Error(`Failed to fetch NFT metadata: ${response.statusText}`);
			}

			const metadata: NFTMetadata = await response.json();
			// Format image URL if it's an IPFS URL
			if (metadata.image) {
				metadata.image = formatIPFSUrl(metadata.image);
			}
			setNftMetadata(metadata);
		} catch (err) {
			console.error("Error fetching NFT metadata:", err);
			setError(err instanceof Error ? err.message : "Failed to load NFT metadata");
		} finally {
			setIsLoading(false);
		}
	};

	const handleReportAnomaly = async () => {
		setIsReporting(true);

		// Mock API call
		await new Promise((resolve) => setTimeout(resolve, 2000));

		setReportSubmitted(true);
		setIsReporting(false);
		setReportText("");
	};

	// Use metadata if available, fallback to props
	const displayTitle = nftMetadata?.name || title || "NFT Certificate";
	const displayType =
		nftMetadata?.attributes?.find((attr) => attr.trait_type === "Type of Zakat" || attr.trait_type === "Animal")?.value?.toString() ||
		type ||
		"Certificate";

	const amount = nftMetadata?.attributes?.find((attr) => attr.trait_type === "Amount" || attr.trait_type === "Price")?.value?.toString();

	const location = nftMetadata?.attributes?.find((attr) => attr.trait_type === "Location")?.value?.toString();

	const quality = nftMetadata?.attributes?.find((attr) => attr.trait_type === "Quality")?.value?.toString();

	const shareSize = nftMetadata?.attributes?.find((attr) => attr.trait_type === "Share Size")?.value?.toString();

	return (
		<Card className="bg-[#0f2419] border-[#14532d]">
			<CardContent className="p-6">
				<div className="aspect-square bg-gradient-to-br from-[#14532d] to-[#0f2419] rounded-lg p-4 border border-[#d1b86a]/30 mb-4 relative overflow-hidden">
					{isLoading ? (
						<div className="text-center h-full flex flex-col justify-center">
							<Loader2 className="h-12 w-12 text-[#d1b86a] mx-auto mb-2 animate-spin" />
							<div className="text-xs text-[#f0fdf4]/70">Loading NFT...</div>
						</div>
					) : error ? (
						<div className="text-center h-full flex flex-col justify-center">
							<AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-2" />
							<div className="text-xs text-[#f0fdf4]/70 mb-1">Failed to load</div>
							<div className="text-xs text-red-400">{error}</div>
						</div>
					) : nftMetadata?.image ? (
						<>
							<img
								src={nftMetadata.image}
								alt={displayTitle}
								className="w-full h-full object-cover rounded-lg"
								onError={(e) => {
									// Fallback to default icon if image fails to load
									const target = e.target as HTMLImageElement;
									target.style.display = "none";
									const fallback = target.nextElementSibling as HTMLElement;
									if (fallback) fallback.style.display = "flex";
								}}
							/>
							<div className="text-center h-full flex-col justify-center absolute inset-0 bg-gradient-to-br from-[#14532d] to-[#0f2419] hidden">
								<Award className="h-12 w-12 text-[#d1b86a] mx-auto mb-2 crescent-shadow" />
								<div className="text-xs text-[#f0fdf4]/70 mb-1">QRBN Certificate</div>
								<div className="text-sm font-semibold text-[#d1b86a]">{displayTitle}</div>
								<div className="text-xs text-[#f0fdf4]/50 mt-2">{date}</div>
								{tokenId && <div className="text-xs text-[#f0fdf4]/40 mt-1">#{tokenId}</div>}
							</div>
						</>
					) : (
						<div className="text-center h-full flex flex-col justify-center">
							<Award className="h-12 w-12 text-[#d1b86a] mx-auto mb-2 crescent-shadow" />
							<div className="text-xs text-[#f0fdf4]/70 mb-1">QRBN Certificate</div>
							<div className="text-sm font-semibold text-[#d1b86a]">{displayTitle}</div>
							<div className="text-xs text-[#f0fdf4]/50 mt-2">{date}</div>
							{tokenId && <div className="text-xs text-[#f0fdf4]/40 mt-1">#{tokenId}</div>}
						</div>
					)}
				</div>

				{/* NFT Details */}
				{nftMetadata && (
					<div className="mb-4 space-y-2">
						<div className="text-sm font-medium text-[#f0fdf4] line-clamp-2">{nftMetadata.name}</div>
						{amount && <div className="text-xs text-[#d1b86a] font-semibold">{amount}</div>}
						<div className="flex flex-wrap gap-1">
							{quality && (
								<Badge variant="outline" className="text-xs border-[#d1b86a]/30 text-[#d1b86a]">
									{quality}
								</Badge>
							)}
							{shareSize && (
								<Badge variant="outline" className="text-xs border-[#d1b86a]/30 text-[#d1b86a]">
									{shareSize}
								</Badge>
							)}
							{location && (
								<Badge variant="outline" className="text-xs border-[#d1b86a]/30 text-[#f0fdf4]/70">
									{location}
								</Badge>
							)}
						</div>
					</div>
				)}

				<div className="flex items-center justify-between">
					<Badge className="bg-[#14532d] text-[#d1b86a]">{displayType}</Badge>

					<div className="flex gap-2">
						{/* View Details Dialog */}
						{nftMetadata && (
							<Dialog>
								<DialogTrigger asChild>
									<Button
										size="sm"
										variant="outline"
										className="border-[#14532d] text-[#f0fdf4] hover:bg-[#14532d]/20 bg-transparent"
									>
										<Eye className="h-3 w-3 mr-1" />
										View
									</Button>
								</DialogTrigger>
								<DialogContent className="bg-[#0f2419] border-[#14532d] text-[#f0fdf4] max-w-2xl max-h-[80vh] overflow-y-auto">
									<DialogHeader>
										<DialogTitle className="text-[#f0fdf4]">{nftMetadata.name}</DialogTitle>
									</DialogHeader>

									<div className="space-y-6">
										{/* NFT Image */}
										{nftMetadata.image && (
											<div className="aspect-square max-w-sm mx-auto bg-gradient-to-br from-[#14532d] to-[#0f2419] rounded-lg overflow-hidden border border-[#d1b86a]/30">
												<img src={nftMetadata.image} alt={nftMetadata.name} className="w-full h-full object-cover" />
											</div>
										)}

										{/* Description */}
										<div>
											<h4 className="text-[#d1b86a] font-semibold mb-2">Description</h4>
											<p className="text-[#f0fdf4]/80 text-sm leading-relaxed">{nftMetadata.description}</p>
										</div>

										{/* Attributes */}
										<div>
											<h4 className="text-[#d1b86a] font-semibold mb-3">Attributes</h4>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
												{nftMetadata.attributes.map((attr, index) => (
													<div key={index} className="bg-[#14532d]/30 rounded-lg p-3 border border-[#14532d]">
														<div className="text-[#f0fdf4]/60 text-xs mb-1">{attr.trait_type}</div>
														<div className="text-[#f0fdf4] font-medium">
															{attr.trait_type.toLowerCase().includes("wallet") &&
															typeof attr.value === "string" &&
															attr.value.startsWith("0x")
																? truncateAddress(attr.value)
																: attr.value}
														</div>
													</div>
												))}
											</div>
										</div>

										{/* External Link */}
										{nftMetadata.external_url && (
											<div>
												<Button asChild className="w-full bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4]">
													<a href={nftMetadata.external_url} target="_blank" rel="noopener noreferrer">
														View on QRBN App
													</a>
												</Button>
											</div>
										)}
									</div>
								</DialogContent>
							</Dialog>
						)}

						{/* Report Anomaly Dialog */}
						<Dialog>
							<DialogTrigger asChild>
								<Button size="sm" variant="outline" className="border-[#14532d] text-[#f0fdf4] hover:bg-[#14532d]/20 bg-transparent">
									<AlertTriangle className="h-3 w-3 mr-1" />
									Report
								</Button>
							</DialogTrigger>
							<DialogContent className="bg-[#0f2419] border-[#14532d] text-[#f0fdf4]">
								<DialogHeader>
									<DialogTitle className="text-[#f0fdf4]">Report Anomaly</DialogTitle>
								</DialogHeader>

								{!reportSubmitted ? (
									<div className="space-y-4">
										<div>
											<Label className="text-[#f0fdf4] mb-2 block">
												Describe the anomaly or issue with this NFT certificate:
											</Label>
											<Textarea
												placeholder="Please describe any issues, discrepancies, or concerns about this certificate..."
												value={reportText}
												onChange={(e) => setReportText(e.target.value)}
												className="bg-[#14532d] border-[#14532d] text-[#f0fdf4] min-h-[100px]"
											/>
										</div>

										<div className="text-xs text-[#f0fdf4]/60 space-y-1">
											<div>• Report any discrepancies in donation amounts</div>
											<div>• Flag suspicious or fraudulent certificates</div>
											<div>• Report technical issues with NFT metadata</div>
										</div>

										<Button
											onClick={handleReportAnomaly}
											disabled={!reportText.trim() || isReporting}
											className="w-full bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4]"
										>
											{isReporting ? (
												"Submitting..."
											) : (
												<>
													<Send className="h-4 w-4 mr-2" />
													Submit Report
												</>
											)}
										</Button>
									</div>
								) : (
									<div className="text-center py-6">
										<div className="text-[#d1b86a] mb-2">✓ Report Submitted</div>
										<div className="text-sm text-[#f0fdf4]/70">
											Thank you for your report. Our team will investigate this issue.
										</div>
									</div>
								)}
							</DialogContent>
						</Dialog>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
