import { NextRequest, NextResponse } from 'next/server';
import { updateOpenAiClient } from "@/clients/openai.client";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { key } = body;

        if (!key || typeof key !== 'string') {
            return NextResponse.json(
                { error: "Missing or invalid 'key' in request body." },
                { status: 400 }
            );
        }

        await updateOpenAiClient(key);

        return NextResponse.json(
            { message: 'GPT key saved successfully.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('❌ Error saving GPT key:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
