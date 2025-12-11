export interface KeywordAnalysis {
  score: number
  currentKeywords: string[]
  highValueKeywords: string[]
  recommendations: string[]
  estimatedCPCIncrease: number
  contentQuality: {
    score: number
    strengths: string[]
    improvements: string[]
  }
  competitiveKeywords: string[]
  semanticClusters: Array<{
    theme: string
    keywords: string[]
  }>
}

export interface AnalysisResult {
  success: boolean
  url: string
  analysis: KeywordAnalysis
  analyzedAt: string
}
