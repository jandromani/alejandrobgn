"use client"

import { Suspense } from "react"
import { Download, MessageCircle, ExternalLink, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { downloadVCard, ALEJANDRO_CONTACT } from "@/utils/vcard"
import { openGmail, openWhatsApp, openCalendlyExternal, trackEvent } from "@/utils/contact"
import Link from "next/link"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

const VALUE_PROPS = [
  "Production AI agents with cost control and observability",
  "Enterprise data: reliable answers via RAG / eRAG pipelines",
  "Agentic platforms that can be deployed, measured, and governed",
]

function MeetPageContent() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const utmSource = searchParams?.get("utm_source")
    const utmMedium = searchParams?.get("utm_medium")
    const utmCampaign = searchParams?.get("utm_campaign")

    if (utmSource || utmMedium || utmCampaign) {
      trackEvent("page_view", "meet_page")
    }
  }, [searchParams])

  const handleDownloadVCard = () => {
    downloadVCard(ALEJANDRO_CONTACT)
    trackEvent("vcard_download", "meet_page")
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container max-w-5xl mx-auto">
        {/* Back button */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-border shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl text-foreground">
                Book a private session (30 min)
              </CardTitle>
              <p className="text-muted-foreground text-lg mt-3">Pick a time and we talk. No email back-and-forth.</p>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Value Props */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-foreground">What I can help with</h3>
                {VALUE_PROPS.map((prop, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <p className="text-foreground leading-relaxed">{prop}</p>
                  </motion.div>
                ))}
              </div>

              {/* Calendly Embed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-lg overflow-hidden border border-border"
              >
                <div className="aspect-video md:aspect-auto md:h-[600px]">
                  <iframe
                    src="https://calendly.com/alejandrobgn/30min?embed_domain=alejandrobgn.vercel.app&embed_type=Inline"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Book a meeting with Alejandro"
                    className="bg-background"
                  />
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-foreground">Other ways to connect</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    onClick={handleDownloadVCard}
                    variant="outline"
                    className="border-border hover:bg-muted bg-transparent"
                    size="lg"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Save contact (vCard)
                  </Button>

                  <Button
                    onClick={openWhatsApp}
                    variant="outline"
                    className="border-border hover:bg-muted bg-transparent"
                    size="lg"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>

                  <Button
                    onClick={openGmail}
                    variant="outline"
                    className="border-border hover:bg-muted bg-transparent"
                    size="lg"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                    </svg>
                    Open in Gmail
                  </Button>

                  <Button
                    onClick={openCalendlyExternal}
                    variant="outline"
                    className="border-border hover:bg-muted bg-transparent sm:col-span-2"
                    size="lg"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Calendly in new tab
                  </Button>
                </div>
              </motion.div>

              {/* Fallback notice */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="p-4 rounded-lg bg-muted border border-border"
              >
                <p className="text-sm text-muted-foreground text-center">
                  Calendar not loading?{" "}
                  <a
                    href="https://calendly.com/alejandrobgn/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:underline font-medium"
                  >
                    Open Calendly directly
                  </a>
                </p>
              </motion.div>

              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center pt-4 border-t border-border"
              >
                <p className="text-sm text-muted-foreground">
                  Web:{" "}
                  <a href={ALEJANDRO_CONTACT.website} className="text-foreground hover:underline">
                    {ALEJANDRO_CONTACT.website}
                  </a>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default function MeetPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto" />
            <p className="mt-4 text-muted-foreground">Loading...</p>
          </div>
        </div>
      }
    >
      <MeetPageContent />
    </Suspense>
  )
}
