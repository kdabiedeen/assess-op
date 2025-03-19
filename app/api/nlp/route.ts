import { NextRequest, NextResponse } from 'next/server';
import { extractAutomationRuleDataFromUserInput } from '@/services/openai.service'; // Adjust the path as needed

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { sentence } = body;

        if (!sentence) {
            return NextResponse.json(
                { error: "Missing or invalid 'sentence' in request body." },
                { status: 400 }
            );
        }

        const automationRuleData = await extractAutomationRuleDataFromUserInput(sentence);

        return NextResponse.json(automationRuleData, { status: 200 });
    } catch (error) {
        console.error("❌ Error processing sentence:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
