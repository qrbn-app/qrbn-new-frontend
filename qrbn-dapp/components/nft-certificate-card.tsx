"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Award, AlertTriangle, Send } from "lucide-react"

interface NFTCertificateCardProps {
  title: string
  date: string
  type: string
  tokenId?: string
}

export function NFTCertificateCard({ title, date, type, tokenId }: NFTCertificateCardProps) {
  const [reportText, setReportText] = useState("")
  const [isReporting, setIsReporting] = useState(false)
  const [reportSubmitted, setReportSubmitted] = useState(false)

  const handleReportAnomaly = async () => {
    setIsReporting(true)

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setReportSubmitted(true)
    setIsReporting(false)
    setReportText("")
  }

  return (
    <Card className="bg-[#0f2419] border-[#14532d]">
      <CardContent className="p-6">
        <div className="aspect-square bg-gradient-to-br from-[#14532d] to-[#0f2419] rounded-lg p-4 border border-[#d1b86a]/30 mb-4">
          <div className="text-center h-full flex flex-col justify-center">
            <Award className="h-12 w-12 text-[#d1b86a] mx-auto mb-2 crescent-shadow" />
            <div className="text-xs text-[#f0fdf4]/70 mb-1">QRBN Certificate</div>
            <div className="text-sm font-semibold text-[#d1b86a]">{title}</div>
            <div className="text-xs text-[#f0fdf4]/50 mt-2">{date}</div>
            {tokenId && <div className="text-xs text-[#f0fdf4]/40 mt-1">#{tokenId}</div>}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge className="bg-[#14532d] text-[#d1b86a]">{type}</Badge>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="border-[#14532d] text-[#f0fdf4] hover:bg-[#14532d]/20 bg-transparent"
              >
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
      </CardContent>
    </Card>
  )
}
