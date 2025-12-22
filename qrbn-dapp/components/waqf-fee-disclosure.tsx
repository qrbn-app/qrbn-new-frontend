"use client";

import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {   DollarSign, 
  Shield, 
  TrendingUp, 
  Building, 
  FileCheck, 
  Eye, 
  Award,
  Info
} from "lucide-react";

interface WaqfFeeDisclosureProps {
  variant?: "full" | "compact" | "inline";
  className?: string;
}

/**
 * Waqf Fee Disclosure Component
 * Displays transparent fee structure for Sharia compliance
 * Based on Indonesian Islamic finance regulations
 */
export function WaqfFeeDisclosure({ variant = "full", className = "" }: WaqfFeeDisclosureProps) {
  if (variant === "inline") {
    return (
      <div className={`bg-[#14532d]/20 border border-[#14532d] rounded-lg p-4 ${className}`}>
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-[#d1b86a] shrink-0 mt-0.5" />
          <div className="space-y-2 text-sm">
            <p className="text-[#f0fdf4] font-medium">Fee Transparency</p>
            <p className="text-[#f0fdf4]/70">
              All contributions include transparent fees: <strong>Nazhir management (5-10%)</strong> for farm operations and coordination, 
              plus <strong>service fees (~$6 USDT)</strong> for platform tech, verification, NFT certificates, and monitoring. 
              Fees are clearly separated from the waqf corpus per Islamic finance principles.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <Card className={`bg-[#0f2419] border-[#14532d] ${className}`}>
        <CardHeader>
          <CardTitle className="text-[#f0fdf4] text-lg flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#d1b86a]" />
            Fee Structure
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <div className="flex items-start gap-3">
              <Building className="h-4 w-4 text-[#d1b86a] shrink-0 mt-1" />
              <div>
                <p className="text-[#f0fdf4] font-medium text-sm">Nazhir Management Fee: 5-10%</p>
                <p className="text-[#f0fdf4]/60 text-xs">Farm operations, coordination, reporting</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <DollarSign className="h-4 w-4 text-[#d1b86a] shrink-0 mt-1" />
              <div>
                <p className="text-[#f0fdf4] font-medium text-sm">Service Fees: ~$6 USDT</p>
                <p className="text-[#f0fdf4]/60 text-xs">Platform, verification, NFT, monitoring</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#14532d]/30 rounded-lg p-3">
            <p className="text-[#d1b86a] text-xs font-medium">✓ Shariah Compliant</p>
            <p className="text-[#f0fdf4]/60 text-xs mt-1">
              All fees are disclosed upfront and separated from waqf corpus
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Full variant (default)
  return (
    <Card className={`bg-[#0f2419] border-[#14532d] ${className}`}>
      <CardHeader>
        <CardTitle className="text-[#f0fdf4] flex items-center gap-2">
          <Shield className="h-6 w-6 text-[#d1b86a]" />
          Transparent Fee Structure
        </CardTitle>
        <p className="text-[#f0fdf4]/70 text-sm mt-2">
          Complete breakdown of all fees and charges. QRBN.app follows Indonesian Islamic finance regulations 
          with full transparency and Sharia compliance.
        </p>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="space-y-3">
          {/* Management Fees (Ujrah/Nazhir) */}
          <AccordionItem 
            value="management-fees" 
            className="border-[#14532d] bg-[#14532d]/20 rounded-lg px-4"
          >
            <AccordionTrigger className="text-[#f0fdf4] hover:text-[#d1b86a]">
              <div className="flex items-center gap-3">
                <Building className="h-5 w-5 text-[#d1b86a]" />
                <div className="text-left">
                  <div className="font-semibold">Management Fees (Ujrah / Nazhir)</div>
                  <div className="text-xs text-[#f0fdf4]/60 font-normal">5-10% of contribution • Indonesian standard</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-[#f0fdf4]/70 pt-4 space-y-3">
              <p className="text-sm">
                The <strong>Nazhir</strong> (waqf manager) is entitled to compensation for managing the waqf property. 
                This is explicitly allowed in both classical and modern Islamic jurisprudence (fiqh).
              </p>
              
              <div className="bg-[#0f2419] rounded-lg p-3 space-y-2 text-sm">
                <p className="text-[#d1b86a] font-medium">What the Nazhir fee covers:</p>
                <ul className="space-y-1 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#d1b86a]">•</span>
                    <span>Acting as waqf manager and fiduciary</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#d1b86a]">•</span>
                    <span>Operating and maintaining the farm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#d1b86a]">•</span>
                    <span>Coordinating slaughter and meat distribution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#d1b86a]">•</span>
                    <span>Reporting, auditing, and compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#d1b86a]">•</span>
                    <span>Administrative and operational overhead</span>
                  </li>
                </ul>
              </div>

              <div className="border-l-2 border-[#d1b86a] pl-3 text-sm">
                <p className="text-[#f0fdf4] font-medium">Indonesian Regulation:</p>
                <p className="text-[#f0fdf4]/70 mt-1">
                  In Indonesia, Nazhir is allowed up to a <strong>regulated percentage</strong> of waqf returns or budget. 
                  Typically <strong>5-10%</strong>, with some jurisdictions permitting up to <strong>20%</strong> depending on 
                  the complexity of the role and services provided.
                </p>
              </div>

              <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                ✓ Shariah Compliant • Ujrah (Service Fee) Principle
              </Badge>
            </AccordionContent>
          </AccordionItem>

          {/* Service Fees */}
          <AccordionItem 
            value="service-fees" 
            className="border-[#14532d] bg-[#14532d]/20 rounded-lg px-4"
          >
            <AccordionTrigger className="text-[#f0fdf4] hover:text-[#d1b86a]">
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-[#d1b86a]" />
                <div className="text-left">
                  <div className="font-semibold">Platform Service Fees</div>
                  <div className="text-xs text-[#f0fdf4]/60 font-normal">Fixed transparent costs</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-[#f0fdf4]/70 pt-4 space-y-3">
              <p className="text-sm">
                Platform service fees are <strong>fixed costs</strong> that cover technology infrastructure, 
                verification processes, and operational services. These are clearly disclosed and 
                <strong> not tied to waqf ownership</strong>.
              </p>

              <div className="bg-[#0f2419] rounded-lg p-3 space-y-2">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#f0fdf4]/70">Platform Tech:</span>
                    <span className="text-[#d1b86a] font-medium">$2.50 USDT</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#f0fdf4]/70">Verification:</span>
                    <span className="text-[#d1b86a] font-medium">$1.00 USDT</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#f0fdf4]/70">NFT Certificate:</span>
                    <span className="text-[#d1b86a] font-medium">$1.50 USDT</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#f0fdf4]/70">Monitoring:</span>
                    <span className="text-[#d1b86a] font-medium">$1.00 USDT</span>
                  </div>
                </div>
                <Separator className="bg-[#14532d]" />
                <div className="flex items-center justify-between text-sm font-medium">
                  <span className="text-[#f0fdf4]">Total Service Fees:</span>
                  <span className="text-[#d1b86a]">$6.00 USDT</span>
                </div>
              </div>

              <div className="border-l-2 border-[#d1b86a] pl-3 text-sm">
                <p className="text-[#f0fdf4] font-medium">Key Principle:</p>
                <p className="text-[#f0fdf4]/70 mt-1">
                  Service fees must be <strong>clearly disclosed</strong> and <strong>not tied to waqf ownership</strong>. 
                  These cover actual costs of operation and are transparent to all contributors.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge className="bg-[#14532d] text-[#d1b86a] border-[#d1b86a]/30" variant="outline">
                  <FileCheck className="h-3 w-3 mr-1" />
                  Fixed Pricing
                </Badge>
                <Badge className="bg-[#14532d] text-[#d1b86a] border-[#d1b86a]/30" variant="outline">
                  <Eye className="h-3 w-3 mr-1" />
                  Fully Transparent
                </Badge>
                <Badge className="bg-[#14532d] text-[#d1b86a] border-[#d1b86a]/30" variant="outline">
                  <Award className="h-3 w-3 mr-1" />
                  Cost-Based
                </Badge>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Non-Waqf Revenue */}
          <AccordionItem 
            value="non-waqf-revenue" 
            className="border-[#14532d] bg-[#14532d]/20 rounded-lg px-4"
          >
            <AccordionTrigger className="text-[#f0fdf4] hover:text-[#d1b86a]">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-[#d1b86a]" />
                <div className="text-left">
                  <div className="font-semibold">Non-Waqf Platform Revenue</div>
                  <div className="text-xs text-[#f0fdf4]/60 font-normal">Separate from waqf corpus</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-[#f0fdf4]/70 pt-4 space-y-3">
              <p className="text-sm">
                <strong>Very important for QRBN:</strong> The platform earns revenue from activities 
                <strong> outside the waqf corpus</strong>. These revenue streams are completely separate 
                from waqf contributions and do not affect the endowment.
              </p>

              <div className="bg-[#0f2419] rounded-lg p-3 space-y-2 text-sm">
                <p className="text-[#d1b86a] font-medium">Platform revenue sources:</p>
                <ul className="space-y-1 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#d1b86a]">•</span>
                    <span><strong>Marketplace fees</strong> from qurban buyers (separate from waqf)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#d1b86a]">•</span>
                    <span><strong>Premium verification</strong> services for farms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#d1b86a]">•</span>
                    <span><strong>Corporate qurban programs</strong> and institutional services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#d1b86a]">•</span>
                    <span><strong>Data and reporting services</strong> for analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#d1b86a]">•</span>
                    <span><strong>Future: Sukuk structuring</strong> and Islamic finance products</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <p className="text-green-400 text-sm font-medium">✓ Shariah Compliant Business Model</p>
                <p className="text-[#f0fdf4]/70 text-xs mt-2">
                  All platform revenue is earned from <strong>non-waqf activities</strong> and does not 
                  affect the permanent endowment corpus. This follows Islamic principles of separating 
                  waqf assets from operational business activities.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Separator className="bg-[#14532d] my-6" />

        {/* Summary Footer */}
        <div className="bg-[#14532d]/30 rounded-lg p-4 space-y-3">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-[#d1b86a] shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-[#f0fdf4] font-medium text-sm">Our Commitment to Transparency</p>
              <p className="text-[#f0fdf4]/70 text-xs">
                Every contribution shows a complete fee breakdown before confirmation. All fees are justified 
                by actual services provided, comply with Indonesian Islamic finance regulations, and are 
                reviewed by our Sharia advisory board. Your waqf contribution remains protected as permanent endowment.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge className="bg-green-500/20 text-green-400 border-green-400/30 text-xs">
              Indonesian Regulation Compliant
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-400/30 text-xs">
              Sharia Board Approved
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-400/30 text-xs">
              Full Transparency
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
