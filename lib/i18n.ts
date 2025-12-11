export type Locale = "en" | "pt-BR" | "es"

export const locales: Locale[] = ["en", "pt-BR", "es"]

export type Translations = (typeof translations)["en"]

export const translations = {
  en: {
    seo: {
      homeTitle: "AdSense CPC Optimizer | AI Keyword Analysis",
      homeDescription: "Analyze your URL and get AI keyword recommendations to improve Google AdSense CPC.",
      analyzeTitle: "URL Analysis Results | AdSense CPC Optimizer",
      analyzeDescription: "See CPC optimization scores, keyword opportunities, and AI recommendations for your URL.",
    },
    nav: {
      brand: "AdSense CPC Optimizer",
      signIn: "Sign In",
      backToHome: "Back to Home",
    },
    home: {
      heroTitle: "Maximize Your AdSense Revenue with",
      heroHighlight: "AI-Powered",
      heroSuffix: "Keyword Analysis",
      heroSubtitle: "Verify your URLs and get expert keyword recommendations to boost your Google AdSense CPC rates.",
      urlPlaceholder: "https://yourwebsite.com",
      analyzeCta: "Analyze URL",
      analyzing: "Analyzing...",
      features: {
        verification: {
          title: "URL Verification",
          description: "Instant analysis of your URL structure, content quality, and AdSense compatibility.",
        },
        ai: {
          title: "AI Keyword Analysis",
          description: "Advanced AI identifies high-value keywords to optimize your content for better CPC.",
        },
        cpc: {
          title: "CPC Recommendations",
          description: "Get actionable insights to increase your cost-per-click rates and revenue.",
        },
      },
      stats: {
        increase: { value: "+45%", label: "Avg CPC Increase" },
        analyzed: { value: "10K+", label: "URLs Analyzed" },
        success: { value: "98%", label: "Success Rate" },
      },
      footer: "© 2025 AdSense CPC Optimizer. Powered by AI.",
    },
    analyze: {
      errors: {
        missingUrl: "No URL provided for analysis",
      },
      loading: {
        title: "Analyzing Your URL",
        description: "Please wait while our AI analyzes your content...",
        stages: {
          fetch: "Fetching webpage content...",
          analyze: "Analyzing content and extracting keywords...",
          calculate: "AI is calculating CPC potential...",
          recommend: "Generating expert recommendations...",
        },
      },
      results: {
        headerTitle: "Analysis Complete",
        overallScore: "Overall CPC Optimization Score",
        potentialPrefix: "Your site has",
        potentialExcellent: "excellent",
        potentialGood: "good",
        potentialModerate: "moderate",
        potentialSuffix: "potential for CPC improvement",
        cpcIncreasePrefix: "With our AI-recommended optimizations, you could increase your AdSense CPC by up to",
        contentQuality: "Content Quality Assessment",
        contentScore: "Content Score",
        strengths: "Strengths",
        improvements: "Areas for Improvement",
        tabs: {
          current: "Current Keywords",
          opportunities: "High-Value Opportunities",
          competitive: "Competitive Keywords",
        },
        tabDescriptions: {
          current: "Keywords currently present in your content",
          opportunities: "Keywords with high CPC potential for your niche",
          competitive: "High commercial intent keywords from competitors",
        },
        clusters: {
          title: "Semantic Keyword Clusters",
          description: "Related keyword groups to target together",
        },
        recommendations: {
          title: "AI Expert Recommendations",
          description: "Actionable steps to improve your AdSense CPC",
        },
        back: "Back to Home",
      },
      footer: "© 2025 AdSense CPC Optimizer. Powered by AI.",
    },
    buttons: {
      back: "Back to Home",
    },
    language: {
      label: "Language",
      options: {
        en: "English",
        "pt-BR": "Português (Brasil)",
        es: "Español",
      },
    },
  },
  "pt-BR": {
    seo: {
      homeTitle: "AdSense CPC Optimizer | Análise de Palavras-chave com IA",
      homeDescription: "Analise sua URL e receba recomendações de palavras-chave com IA para melhorar o CPC do Google AdSense.",
      analyzeTitle: "Resultados da Análise da URL | AdSense CPC Optimizer",
      analyzeDescription: "Veja pontuação de otimização, oportunidades de CPC e recomendações de IA para sua URL.",
    },
    nav: {
      brand: "AdSense CPC Optimizer",
      signIn: "Entrar",
      backToHome: "Voltar para a Home",
    },
    home: {
      heroTitle: "Maximize sua receita do AdSense com",
      heroHighlight: "análise de IA",
      heroSuffix: "de palavras-chave",
      heroSubtitle: "Verifique suas URLs e receba recomendações especializadas de palavras-chave para aumentar o CPC do Google AdSense.",
      urlPlaceholder: "https://seusite.com",
      analyzeCta: "Analisar URL",
      analyzing: "Analisando...",
      features: {
        verification: {
          title: "Verificação de URL",
          description: "Análise instantânea da estrutura da URL, qualidade do conteúdo e compatibilidade com AdSense.",
        },
        ai: {
          title: "Análise de Palavras-chave com IA",
          description: "IA avançada identifica palavras-chave de alto valor para otimizar o conteúdo e melhorar o CPC.",
        },
        cpc: {
          title: "Recomendações de CPC",
          description: "Obtenha insights acionáveis para aumentar suas taxas de custo por clique e receita.",
        },
      },
      stats: {
        increase: { value: "+45%", label: "Aumento médio de CPC" },
        analyzed: { value: "10K+", label: "URLs analisadas" },
        success: { value: "98%", label: "Taxa de sucesso" },
      },
      footer: "© 2025 AdSense CPC Optimizer. Impulsionado por IA.",
    },
    analyze: {
      errors: {
        missingUrl: "Nenhuma URL fornecida para análise",
      },
      loading: {
        title: "Analisando sua URL",
        description: "Aguarde enquanto nossa IA analisa seu conteúdo...",
        stages: {
          fetch: "Buscando o conteúdo da página...",
          analyze: "Analisando o conteúdo e extraindo palavras-chave...",
          calculate: "A IA está calculando o potencial de CPC...",
          recommend: "Gerando recomendações especializadas...",
        },
      },
      results: {
        headerTitle: "Análise concluída",
        overallScore: "Pontuação geral de otimização de CPC",
        potentialPrefix: "Seu site tem",
        potentialExcellent: "excelente",
        potentialGood: "boa",
        potentialModerate: "média",
        potentialSuffix: "potencial de melhoria de CPC",
        cpcIncreasePrefix: "Com nossas otimizações recomendadas pela IA, você pode aumentar o CPC do AdSense em até",
        contentQuality: "Avaliação de qualidade do conteúdo",
        contentScore: "Pontuação do conteúdo",
        strengths: "Pontos fortes",
        improvements: "Áreas para melhorar",
        tabs: {
          current: "Palavras-chave atuais",
          opportunities: "Oportunidades de alto valor",
          competitive: "Palavras-chave competitivas",
        },
        tabDescriptions: {
          current: "Palavras-chave já presentes no seu conteúdo",
          opportunities: "Palavras-chave com alto potencial de CPC para seu nicho",
          competitive: "Palavras-chave de alta intenção comercial de concorrentes",
        },
        clusters: {
          title: "Clusters semânticos de palavras-chave",
          description: "Grupos relacionados de palavras-chave para atacar em conjunto",
        },
        recommendations: {
          title: "Recomendações especialistas da IA",
          description: "Passos acionáveis para melhorar o CPC do AdSense",
        },
        back: "Voltar para a Home",
      },
      footer: "© 2025 AdSense CPC Optimizer. Impulsionado por IA.",
    },
    buttons: {
      back: "Voltar para a Home",
    },
    language: {
      label: "Idioma",
      options: {
        en: "English",
        "pt-BR": "Português (Brasil)",
        es: "Español",
      },
    },
  },
  es: {
    seo: {
      homeTitle: "AdSense CPC Optimizer | Análisis de palabras clave con IA",
      homeDescription: "Analiza tu URL y recibe recomendaciones de palabras clave con IA para mejorar el CPC de Google AdSense.",
      analyzeTitle: "Resultados de análisis de URL | AdSense CPC Optimizer",
      analyzeDescription: "Consulta puntajes de optimización, oportunidades de CPC y recomendaciones de IA para tu URL.",
    },
    nav: {
      brand: "AdSense CPC Optimizer",
      signIn: "Iniciar sesión",
      backToHome: "Volver al inicio",
    },
    home: {
      heroTitle: "Maximiza tus ingresos de AdSense con",
      heroHighlight: "análisis impulsado por IA",
      heroSuffix: "de palabras clave",
      heroSubtitle: "Verifica tus URLs y obtén recomendaciones expertas de palabras clave para aumentar el CPC de Google AdSense.",
      urlPlaceholder: "https://tusitio.com",
      analyzeCta: "Analizar URL",
      analyzing: "Analizando...",
      features: {
        verification: {
          title: "Verificación de URL",
          description: "Análisis instantáneo de la estructura de la URL, calidad del contenido y compatibilidad con AdSense.",
        },
        ai: {
          title: "Análisis de palabras clave con IA",
          description: "IA avanzada identifica palabras clave de alto valor para optimizar tu contenido y mejorar el CPC.",
        },
        cpc: {
          title: "Recomendaciones de CPC",
          description: "Obtén insights accionables para aumentar tus tasas de costo por clic y los ingresos.",
        },
      },
      stats: {
        increase: { value: "+45%", label: "Aumento promedio de CPC" },
        analyzed: { value: "10K+", label: "URLs analizadas" },
        success: { value: "98%", label: "Tasa de éxito" },
      },
      footer: "© 2025 AdSense CPC Optimizer. Impulsado por IA.",
    },
    analyze: {
      errors: {
        missingUrl: "No se proporcionó URL para el análisis",
      },
      loading: {
        title: "Analizando tu URL",
        description: "Espera mientras nuestra IA analiza tu contenido...",
        stages: {
          fetch: "Obteniendo el contenido de la página...",
          analyze: "Analizando el contenido y extrayendo palabras clave...",
          calculate: "La IA está calculando el potencial de CPC...",
          recommend: "Generando recomendaciones expertas...",
        },
      },
      results: {
        headerTitle: "Análisis completado",
        overallScore: "Puntaje general de optimización de CPC",
        potentialPrefix: "Tu sitio tiene",
        potentialExcellent: "excelente",
        potentialGood: "buen",
        potentialModerate: "potencial moderado",
        potentialSuffix: "potencial de mejora de CPC",
        cpcIncreasePrefix: "Con las optimizaciones recomendadas por la IA, puedes aumentar el CPC de AdSense hasta",
        contentQuality: "Evaluación de la calidad del contenido",
        contentScore: "Puntaje del contenido",
        strengths: "Fortalezas",
        improvements: "Áreas de mejora",
        tabs: {
          current: "Palabras clave actuales",
          opportunities: "Oportunidades de alto valor",
          competitive: "Palabras clave competitivas",
        },
        tabDescriptions: {
          current: "Palabras clave presentes en tu contenido",
          opportunities: "Palabras clave con alto potencial de CPC para tu nicho",
          competitive: "Palabras clave de alta intención comercial de competidores",
        },
        clusters: {
          title: "Clusters semánticos de palabras clave",
          description: "Grupos de palabras clave relacionadas para atacar juntas",
        },
        recommendations: {
          title: "Recomendaciones expertas de IA",
          description: "Pasos accionables para mejorar tu CPC de AdSense",
        },
        back: "Volver al inicio",
      },
      footer: "© 2025 AdSense CPC Optimizer. Impulsado por IA.",
    },
    buttons: {
      back: "Volver al inicio",
    },
    language: {
      label: "Idioma",
      options: {
        en: "English",
        "pt-BR": "Português (Brasil)",
        es: "Español",
      },
    },
  },
} satisfies Record<Locale, any>

export const isLocale = (value: string | null | undefined): value is Locale =>
  Boolean(value && locales.includes(value as Locale))

export const getDefaultLocale = (): Locale => {
  if (typeof window === "undefined") return "en"
  const stored = window.localStorage.getItem("language")
  if (isLocale(stored)) return stored

  const navigatorLang = window.navigator.language
  if (navigatorLang.startsWith("pt")) return "pt-BR"
  if (navigatorLang.startsWith("es")) return "es"
  return "en"
}
