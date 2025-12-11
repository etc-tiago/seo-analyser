"use client"

import { getDefaultLocale, isLocale, type Locale, locales, type Translations, translations } from "@/lib/i18n"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

type I18nContextValue = {
  language: Locale
  setLanguage: (locale: Locale) => void
  t: Translations
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [language, setLanguageState] = useState<Locale>(() => getDefaultLocale())

  // Sync language with URL param if present
  useEffect(() => {
    const langParam = searchParams?.get("lang")
    if (isLocale(langParam) && langParam !== language) {
      setLanguageState(langParam)
    }
  }, [searchParams, language])

  const setLanguage = (locale: Locale) => {
    setLanguageState(locale)
    if (typeof window !== "undefined") {
      window.localStorage.setItem("language", locale)
      document.documentElement.lang = locale
    }

    // Update the query param to keep SEO friendly links per language
    const params = new URLSearchParams(searchParams?.toString())
    params.set("lang", locale)
    router.push(`${pathname}?${params.toString()}`)
  }

  // Keep <html lang> in sync
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language
    }
  }, [language])

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage,
      t: translations[language],
    }),
    [language],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export const useI18n = () => {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within a LanguageProvider")
  }
  return context
}

export const languageOptions = locales
