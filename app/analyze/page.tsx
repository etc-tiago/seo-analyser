import { AnalyzePageClient } from "@/components/analyze-page"
import { isLocale, translations } from "@/lib/i18n"
import type { Metadata } from "next"

export async function generateMetadata({ searchParams }: { searchParams?: { lang?: string } }): Promise<Metadata> {
  const langParam = searchParams?.lang
  const lang = isLocale(langParam) ? langParam : "en"
  const seo = translations[lang].seo

  return {
    title: seo.analyzeTitle,
    description: seo.analyzeDescription,
    alternates: {
      languages: {
        en: "/analyze?lang=en",
        "pt-BR": "/analyze?lang=pt-BR",
        es: "/analyze?lang=es",
      },
    },
  }
}

export default function AnalyzePage() {
  return <AnalyzePageClient />
}
