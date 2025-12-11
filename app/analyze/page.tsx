"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Sparkles,
  AlertCircle,
  TrendingUp,
  Target,
  Lightbulb,
  CheckCircle2,
  XCircle,
  DollarSign,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import type { AnalysisResult } from "@/lib/types"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AnalyzePage() {
  const [url, setUrl] = useState("")
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState<"loading" | "complete" | "error">("loading")
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const storedUrl = localStorage.getItem("analyzing-url")
    if (!storedUrl) {
      setStage("error")
      setError("No URL provided for analysis")
      return
    }

    setUrl(storedUrl)
    analyzeUrl(storedUrl)
  }, [])

  const analyzeUrl = async (urlToAnalyze: string) => {
    try {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 3
        })
      }, 100)

      const response = await fetch("/api/analyze-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: urlToAnalyze }),
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to analyze URL")
      }

      const data: AnalysisResult = await response.json()
      setAnalysisData(data)
      setProgress(100)

      setTimeout(() => {
        setStage("complete")
      }, 500)
    } catch (err) {
      console.error("[v0] Analysis error:", err)
      setStage("error")
      setError(err instanceof Error ? err.message : "Failed to analyze URL")
    }
  }

  if (stage === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <Card className="max-w-2xl w-full mx-4">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2 text-destructive">
              <AlertCircle className="size-6" />
              Analysis Failed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <Link href="/" className="inline-block mt-4">
              <span className="text-sm text-primary hover:underline">← Back to Home</span>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (stage === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <Card className="max-w-2xl w-full mx-4">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Sparkles className="size-6 text-primary animate-pulse" />
              Analyzing Your URL
            </CardTitle>
            <CardDescription>Please wait while our AI analyzes your content...</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground truncate max-w-md">{url}</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-primary animate-pulse" />
                {progress < 30 && "Fetching webpage content..."}
                {progress >= 30 && progress < 60 && "Analyzing content and extracting keywords..."}
                {progress >= 60 && progress < 90 && "AI is calculating CPC potential..."}
                {progress >= 90 && "Generating expert recommendations..."}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!analysisData) {
    return null
  }

  return <AnalysisResults data={analysisData} />
}

function AnalysisResults({ data }: { data: AnalysisResult }) {
  const { url, analysis } = data

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="size-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-xl">AdSense CPC Optimizer</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analysis Complete</h1>
            <p className="text-muted-foreground break-all">{url}</p>
          </div>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Overall CPC Optimization Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative size-32 shrink-0">
                  <svg className="size-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="52"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-muted"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="52"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 52}`}
                      strokeDashoffset={`${2 * Math.PI * 52 * (1 - analysis.score / 100)}`}
                      className="text-primary"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">{analysis.score}</span>
                  </div>
                </div>
                <div className="flex-1 space-y-2 text-center md:text-left">
                  <p className="text-lg">
                    Your site has{" "}
                    <span className="font-semibold text-primary">
                      {analysis.score >= 80 ? "excellent" : analysis.score >= 60 ? "good" : "moderate"}
                    </span>{" "}
                    potential for CPC improvement
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    With our AI-recommended optimizations, you could increase your AdSense CPC by up to{" "}
                    <span className="font-semibold text-accent">{analysis.estimatedCPCIncrease}%</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="size-5 text-primary" />
                Content Quality Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Content Score</span>
                  <span className="text-sm font-bold">{analysis.contentQuality.score}/100</span>
                </div>
                <Progress value={analysis.contentQuality.score} className="h-2" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-accent" />
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {analysis.contentQuality.strengths.map((strength, i) => (
                      <li key={i} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                        <span className="text-accent mt-0.5">•</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <XCircle className="size-4 text-destructive" />
                    Areas for Improvement
                  </h4>
                  <ul className="space-y-2">
                    {analysis.contentQuality.improvements.map((improvement, i) => (
                      <li key={i} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                        <span className="text-destructive mt-0.5">•</span>
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="current">Current Keywords</TabsTrigger>
              <TabsTrigger value="opportunities">High-Value Opportunities</TabsTrigger>
              <TabsTrigger value="competitive">Competitive Keywords</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="size-5 text-primary" />
                    Current Keywords Found
                  </CardTitle>
                  <CardDescription>Keywords currently present in your content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {analysis.currentKeywords.map((keyword, i) => (
                      <Badge key={i} variant="secondary" className="px-3 py-1.5">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="opportunities" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="size-5 text-accent" />
                    High-Value Keyword Opportunities
                  </CardTitle>
                  <CardDescription>Keywords with high CPC potential for your niche</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {analysis.highValueKeywords.map((keyword, i) => (
                      <Badge key={i} variant="default" className="px-3 py-1.5 bg-accent hover:bg-accent/90">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="competitive" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="size-5 text-chart-3" />
                    Competitive Keywords
                  </CardTitle>
                  <CardDescription>High commercial intent keywords from competitors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {analysis.competitiveKeywords.map((keyword, i) => (
                      <Badge key={i} variant="outline" className="px-3 py-1.5 border-chart-3 text-chart-3">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="size-5 text-primary" />
                Semantic Keyword Clusters
              </CardTitle>
              <CardDescription>Related keyword groups to target together</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {analysis.semanticClusters.map((cluster, i) => (
                  <Card key={i} className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-semibold">{cluster.theme}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1.5">
                        {cluster.keywords.map((keyword, j) => (
                          <Badge key={j} variant="secondary" className="text-xs px-2 py-0.5">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Lightbulb className="size-6 text-primary" />
                AI Expert Recommendations
              </CardTitle>
              <CardDescription>Actionable steps to improve your AdSense CPC</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {analysis.recommendations.map((recommendation, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex-shrink-0 flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed pt-1.5">{recommendation}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 AdSense CPC Optimizer. Powered by AI.</p>
        </div>
      </footer>
    </div>
  )
}
