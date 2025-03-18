// app/api/nlp/process/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { mapSentenceToKeys } from '@/services/openai.service'; // Adjust the path as needed

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

    // Process the sentence using the mapping service.
    // TODO: Questionable Naming 
    const mapping = await mapSentenceToKeys(sentence);

    return NextResponse.json(mapping, { status: 200 });
  } catch (error) {
    console.error("❌ Error processing sentence:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
