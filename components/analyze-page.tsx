"use client"

import { useI18n } from "@/components/language-provider"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { AnalysisResult } from "@/lib/types"
import {
  AlertCircle,
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  DollarSign,
  Lightbulb,
  Sparkles,
  Target,
  TrendingUp,
  XCircle,
} from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function AnalyzePageClient() {
  const [url, setUrl] = useState("")
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState<"loading" | "complete" | "error">("loading")
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState("")
  const { t, language } = useI18n()
  const searchParams = useSearchParams()

  useEffect(() => {
    const storedUrl = localStorage.getItem("analyzing-url")
    if (!storedUrl) {
      setStage("error")
      setError(t.analyze.errors.missingUrl)
      return
    }

    setUrl(storedUrl)
    analyzeUrl(storedUrl)
  }, [t.analyze.errors.missingUrl])

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

  const currentLangParam = searchParams?.get("lang") || language
  const langQuery = `?lang=${currentLangParam}`

  if (stage === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <Card className="max-w-2xl w-full mx-4">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2 text-destructive">
              <AlertCircle className="size-6" />
              {t.analyze.results.headerTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <Link href={`/${langQuery}`} className="inline-block mt-4">
              <span className="text-sm text-primary hover:underline">← {t.analyze.results.back}</span>
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
              {t.analyze.loading.title}
            </CardTitle>
            <CardDescription>{t.analyze.loading.description}</CardDescription>
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
                {progress < 30 && t.analyze.loading.stages.fetch}
                {progress >= 30 && progress < 60 && t.analyze.loading.stages.analyze}
                {progress >= 60 && progress < 90 && t.analyze.loading.stages.calculate}
                {progress >= 90 && t.analyze.loading.stages.recommend}
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

  return <AnalysisResults data={analysisData} languageQuery={langQuery} />
}

function AnalysisResults({ data, languageQuery }: { data: AnalysisResult; languageQuery: string }) {
  const { url, analysis } = data
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/${languageQuery}`} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
            <ArrowLeft className="size-4" />
            {t.analyze.results.back}
          </Link>
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="size-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-xl">{t.nav.brand}</span>
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t.analyze.results.headerTitle}</h1>
            <p className="text-muted-foreground break-all">{url}</p>
          </div>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">{t.analyze.results.overallScore}</CardTitle>
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
                    {t.analyze.results.potentialPrefix}{" "}
                    <span className="font-semibold text-primary">
                      {analysis.score >= 80
                        ? t.analyze.results.potentialExcellent
                        : analysis.score >= 60
                          ? t.analyze.results.potentialGood
                          : t.analyze.results.potentialModerate}
                    </span>{" "}
                    {t.analyze.results.potentialSuffix}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t.analyze.results.cpcIncreasePrefix}{" "}
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
                {t.analyze.results.contentQuality}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t.analyze.results.contentScore}</span>
                  <span className="text-sm font-bold">{analysis.contentQuality.score}/100</span>
                </div>
                <Progress value={analysis.contentQuality.score} className="h-2" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-accent" />
                    {t.analyze.results.strengths}
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
                    {t.analyze.results.improvements}
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
              <TabsTrigger value="current">{t.analyze.results.tabs.current}</TabsTrigger>
              <TabsTrigger value="opportunities">{t.analyze.results.tabs.opportunities}</TabsTrigger>
              <TabsTrigger value="competitive">{t.analyze.results.tabs.competitive}</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="size-5 text-primary" />
                    {t.analyze.results.tabs.current}
                  </CardTitle>
                  <CardDescription>{t.analyze.results.tabDescriptions.current}</CardDescription>
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
                    {t.analyze.results.tabs.opportunities}
                  </CardTitle>
                  <CardDescription>{t.analyze.results.tabDescriptions.opportunities}</CardDescription>
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
                    {t.analyze.results.tabs.competitive}
                  </CardTitle>
                  <CardDescription>{t.analyze.results.tabDescriptions.competitive}</CardDescription>
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
                {t.analyze.results.clusters.title}
              </CardTitle>
              <CardDescription>{t.analyze.results.clusters.description}</CardDescription>
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
                {t.analyze.results.recommendations.title}
              </CardTitle>
              <CardDescription>{t.analyze.results.recommendations.description}</CardDescription>
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
          <p>{t.analyze.footer}</p>
        </div>
      </footer>
    </div>
  )
}
