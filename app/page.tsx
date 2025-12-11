"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, TrendingUp, Sparkles } from "lucide-react"

export default function Home() {
  const [url, setUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = async () => {
    if (!url) return

    setIsAnalyzing(true)
    // Store URL for analysis
    localStorage.setItem("analyzing-url", url)

    // Simulate analysis initiation
    setTimeout(() => {
      window.location.href = "/analyze"
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="size-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-xl">AdSense CPC Optimizer</span>
          </div>
          <Button variant="ghost">Sign In</Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
              Maximize Your AdSense Revenue with <span className="text-primary">AI-Powered</span> Keyword Analysis
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Verify your URLs and get expert keyword recommendations to boost your Google AdSense CPC rates
            </p>
          </div>

          {/* URL Input */}
          <Card className="max-w-2xl mx-auto shadow-xl border-2">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                    className="pl-10 h-12 text-base"
                  />
                </div>
                <Button size="lg" onClick={handleAnalyze} disabled={isAnalyzing || !url} className="h-12 px-8">
                  {isAnalyzing ? "Analyzing..." : "Analyze URL"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 pt-12">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Search className="size-6 text-primary" />
                </div>
                <CardTitle className="text-xl">URL Verification</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Instant analysis of your URL structure, content quality, and AdSense compatibility
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="size-12 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
                  <Sparkles className="size-6 text-accent" />
                </div>
                <CardTitle className="text-xl">AI Keyword Analysis</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Advanced AI identifies high-value keywords to optimize your content for better CPC
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-chart-3/50 transition-colors">
              <CardHeader>
                <div className="size-12 rounded-lg bg-chart-3/10 flex items-center justify-center mb-2">
                  <TrendingUp className="size-6 text-chart-3" />
                </div>
                <CardTitle className="text-xl">CPC Recommendations</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Get actionable insights to increase your cost-per-click rates and revenue
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 pt-12 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">+45%</div>
              <div className="text-sm text-muted-foreground mt-1">Avg CPC Increase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">10K+</div>
              <div className="text-sm text-muted-foreground mt-1">URLs Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-chart-3">98%</div>
              <div className="text-sm text-muted-foreground mt-1">Success Rate</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-24 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 AdSense CPC Optimizer. Powered by AI.</p>
        </div>
      </footer>
    </div>
  )
}
