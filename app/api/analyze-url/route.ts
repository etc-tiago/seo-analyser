import { type NextRequest, NextResponse } from "next/server"
import { OpenAI } from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Validate URL format
    try {
      new URL(url)
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
    }

    // Fetch the webpage content
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AdSenseCPCOptimizer/1.0)",
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch URL content" }, { status: 400 })
    }

    const html = await response.text()

    // Extract text content from HTML (simple extraction)
    const textContent = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 8000) // Limit content length

    // Use AI to analyze the content and suggest keywords
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert Google AdSense optimization specialist. Analyze the content and provide keyword recommendations to improve CPC (Cost Per Click) rates.",
        },
        {
          role: "user",
          content: `URL: ${url}
Content: ${textContent}

Please provide a comprehensive analysis in the following JSON format:
{
  "score": <number between 0-100>,
  "currentKeywords": [list of 8-12 keywords currently present in the content],
  "highValueKeywords": [list of 8-12 high-CPC keywords relevant to this content niche],
  "recommendations": [list of 5-7 specific actionable recommendations],
  "estimatedCPCIncrease": <percentage as number>,
  "contentQuality": {
    "score": <number 0-100>,
    "strengths": [list of 2-3 strengths],
    "improvements": [list of 2-3 areas for improvement]
  },
  "competitiveKeywords": [list of 6-8 competitor keywords with high commercial intent],
  "semanticClusters": [list of 4-6 keyword clusters with their theme]
}

Focus on:
1. High commercial intent keywords
2. Long-tail keyword opportunities
3. Semantic relevance to existing content
4. CPC potential in the niche
5. Competition level analysis`,
        },
      ],
    })

    // Parse AI response
    const completionText = completion.choices[0]?.message?.content ?? ""
    const cleanedText = completionText
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/g, "")
      .trim()

    let analysis
    try {
      const start = cleanedText.indexOf("{")
      const end = cleanedText.lastIndexOf("}")
      const jsonSlice = start !== -1 && end !== -1 ? cleanedText.slice(start, end + 1) : cleanedText
      analysis = JSON.parse(jsonSlice)
    } catch (parseErr) {
      console.error("[v0] JSON parse error:", parseErr, cleanedText)
      return NextResponse.json({ error: "AI response parse error" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      url,
      analysis,
      analyzedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Analysis error:", error)
    return NextResponse.json(
      {
        error: "Failed to analyze URL",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
