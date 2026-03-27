// ===== GROQ AI CLIENT =====
// Connects to Groq API for AI-powered analysis
// Groq uses Llama/Mixtral models with ultra-fast inference

import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

// Generate AI analysis report from validation results
export async function generateAIReport(validationResults) {
    const prompt = `You are a CAD Design Validation AI Expert. Analyze these validation results and provide a professional engineering report.

VALIDATION RESULTS:
- Total Components: ${validationResults.totalComponents}
- Total Issues: ${validationResults.totalIssues}  
- Errors: ${validationResults.errors}
- Warnings: ${validationResults.warnings}
- Pass Rate: ${validationResults.passed ? '100%' : Math.round(((validationResults.totalComponents - validationResults.totalIssues) / validationResults.totalComponents) * 100) + '%'}

DETAILED ISSUES:
${validationResults.issues.map((issue, i) =>
        `${i + 1}. [${issue.severity.toUpperCase()}] ${issue.type} - ${issue.component}: ${issue.message}`
    ).join('\n')}

Please provide:
1. **Executive Summary** (2-3 sentences overview)
2. **Critical Findings** (list the most important issues)
3. **Risk Assessment** (Low/Medium/High with explanation)
4. **Recommendations** (specific actionable steps to fix issues)
5. **Compliance Score** (percentage with brief explanation)

Format the response in clean markdown.`;

    const response = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.3,
        max_tokens: 1024,
    });

    return response.choices[0]?.message?.content || 'Unable to generate report.';
}