import { HomePage } from "@/components/home-page"
import { isLocale, translations } from "@/lib/i18n"
import type { Metadata } from "next"

export async function generateMetadata(props: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const resolved = await props.searchParams
  const langParam = resolved?.lang
  const lang = isLocale(langParam) ? langParam : "en"
  const seo = translations[lang].seo

  return {
    title: seo.homeTitle,
    description: seo.homeDescription,
    alternates: {
      languages: {
        en: "/?lang=en",
        "pt-BR": "/?lang=pt-BR",
        es: "/?lang=es",
      },
    },
  }
}

export default function Home() {
  return <HomePage />
}
