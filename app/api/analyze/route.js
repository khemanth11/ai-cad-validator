// ===== BACKEND API: /api/analyze =====
// This runs on the SERVER (not in the browser)
// The frontend calls this to get AI analysis

import { generateAIReport } from '../../lib/groqClient';

export async function POST(request) {
    try {
        const { validationResults } = await request.json();

        if (!validationResults) {
            return Response.json(
                { error: 'No validation results provided' },
                { status: 400 }
            );
        }

        const aiReport = await generateAIReport(validationResults);

        return Response.json({
            success: true,
            report: aiReport,
            generatedAt: new Date().toISOString(),
        });
    } catch (error) {
        console.error('AI Analysis Error:', error);
        return Response.json(
            { error: 'Failed to generate AI report' },
            { status: 500 }
        );
    }
}