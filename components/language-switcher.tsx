"use client"

import { languageOptions, useI18n } from "@/components/language-provider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { translations } from "@/lib/i18n"

export function LanguageSwitcher() {
  const { language, setLanguage } = useI18n()
  const labels = translations[language].language.options

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as typeof language)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={labels[language]} />
      </SelectTrigger>
      <SelectContent>
        {languageOptions.map((option) => (
          <SelectItem key={option} value={option}>
            {labels[option]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
