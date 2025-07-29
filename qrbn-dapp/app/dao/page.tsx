"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, ArrowRight } from "lucide-react"

export default function DAOPage() {
  useEffect(() => {
    // Redirect to Tally after a short delay
    const timer = setTimeout(() => {
      window.location.href = "https://www.tally.xyz/gov/qrbn"
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen islamic-pattern py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#f0fdf4] mb-4">Redirecting to QRBN DAO</h1>
          <p className="text-[#f0fdf4]/70">Taking you to our governance platform on Tally...</p>
        </div>

        <Card className="bg-[#0f2419] border-[#14532d] max-w-md mx-auto">
          <CardContent className="p-8">
            <div className="flex justify-center mb-4">
              <ArrowRight className="h-12 w-12 text-[#d1b86a] animate-pulse" />
            </div>
            <p className="text-[#f0fdf4] mb-6">
              You're being redirected to our DAO governance platform powered by Tally.
            </p>
            <Button
              onClick={() => window.open("https://www.tally.xyz/gov/qrbn", "_blank")}
              className="bg-[#14532d] hover:bg-[#1a3a1f] text-[#f0fdf4] glow-shadow"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Go to QRBN DAO on Tally
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
