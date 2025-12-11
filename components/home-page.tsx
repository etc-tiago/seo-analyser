"use client"

import { useI18n } from "@/components/language-provider"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Sparkles, TrendingUp } from "lucide-react"
import { useState } from "react"

export function HomePage() {
  const [url, setUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const { language, t } = useI18n()

  const handleAnalyze = async () => {
    if (!url) return

    setIsAnalyzing(true)
    localStorage.setItem("analyzing-url", url)

    setTimeout(() => {
      window.location.href = `/analyze?lang=${language}`
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="size-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-xl">{t.nav.brand}</span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Button variant="ghost">{t.nav.signIn}</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
              {t.home.heroTitle} <span className="text-primary">{t.home.heroHighlight}</span> {t.home.heroSuffix}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto">{t.home.heroSubtitle}</p>
          </div>

          <Card className="max-w-2xl mx-auto shadow-xl border-2">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    type="url"
                    placeholder={t.home.urlPlaceholder}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                    className="pl-10 h-12 text-base"
                  />
                </div>
                <Button size="lg" onClick={handleAnalyze} disabled={isAnalyzing || !url} className="h-12 px-8">
                  {isAnalyzing ? t.home.analyzing : t.home.analyzeCta}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 pt-12">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Search className="size-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{t.home.features.verification.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {t.home.features.verification.description}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="size-12 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
                  <Sparkles className="size-6 text-accent" />
                </div>
                <CardTitle className="text-xl">{t.home.features.ai.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{t.home.features.ai.description}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-chart-3/50 transition-colors">
              <CardHeader>
                <div className="size-12 rounded-lg bg-chart-3/10 flex items-center justify-center mb-2">
                  <TrendingUp className="size-6 text-chart-3" />
                </div>
                <CardTitle className="text-xl">{t.home.features.cpc.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{t.home.features.cpc.description}</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-12 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">{t.home.stats.increase.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{t.home.stats.increase.label}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">{t.home.stats.analyzed.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{t.home.stats.analyzed.label}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-chart-3">{t.home.stats.success.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{t.home.stats.success.label}</div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t mt-24 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>{t.home.footer}</p>
        </div>
      </footer>
    </div>
  )
}
