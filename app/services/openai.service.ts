// openai.service.ts

import OpenAI from "openai";
import { actions } from '@/utils/actions.constants';
import { events } from '@/utils/events.constants';

// Initialize the OpenAI client with your API key.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is set in your environment
});

export interface MappingResult {
  event?: string;
  action?: string;
  delay?: number;
  error?: string;
  output?: string;
}

const eventKeys = Object.keys(events);
const actionKeys = Object.keys(actions);

/**
 * isSingleSentence
 * Checks if the input text is a single sentence by splitting on common sentence-ending punctuation.
 * @param text - The input text to check.
 * @returns True if only one sentence is detected, false otherwise.
 */
function isSingleSentence(text: string): boolean {
  // Split on punctuation followed by whitespace.
  const sentences = text.trim().split(/(?<=[.!?])\s+/);
  // Filter out empty strings and check if exactly one sentence exists.
  return sentences.filter(Boolean).length === 1;
}

/**
 * mapSentenceToKeys
 * Extracts event, action keys, and a delay in seconds from a natural language sentence
 * using OpenAI's GPT-3.5-turbo. Only one sentence input is allowed.
 *
 * @param sentence - The input sentence from the hospitality domain.
 * @returns A promise that resolves with the mapping result.
 */
export async function mapSentenceToKeys(sentence: string): Promise<MappingResult> {
  if (!isSingleSentence(sentence)) {
    return { error: "Input must be a single sentence." };
  }

  const prompt = `
    You are given a natural language sentence from the hospitality domain.
    Extract the event, action keys, and a delay in seconds from the sentence based on the following mappings.

    Event Keys:
    - ${eventKeys.join('\n    - ')}

    Action Keys:
    - ${actionKeys.join('\n    - ')}

    Examples:

    1.
    Sentence: "send an email after a guest check in"
    Mapping: {"event": "guest_checkin", "action": "send_email", "delay": 0}

    2.
    Sentence: "notify the concierge when a guest books a room"
    Mapping: {"event": "guest_booking", "action": "notify_concierge", "delay": 0}

    3.
    Sentence: "initiate a welcome SMS on guest arrival"
    Mapping: {"event": "guest_arrival", "action": "send_sms_welcome", "delay": 0}

    4.
    Sentence: "send an email 300 seconds after a guest check in"
    Mapping: {"event": "guest_checkin", "action": "send_email", "delay": 300}

    Now, extract the mapping for the following sentence.
    Sentence: "${sentence}"
    Output the result in valid JSON format with keys "event", "action", and "delay".
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You extract structured mappings from natural language instructions in the hospitality domain." },
        { role: "user", content: prompt },
      ],
      temperature: 0,
    });

    const output = response.choices[0].message?.content;
    if (!output) {
      return { error: "No output received from OpenAI API." };
    }

    try {
      const parsed = JSON.parse(output);
      // If the result is an array, take only the first mapping.
      const mapping: MappingResult = Array.isArray(parsed) ? parsed[0] : parsed;
      return mapping;
    } catch (jsonError) {
      return { error: "Failed to parse JSON output", output };
    }
  } catch (error: any) {
    return { error: error.message || "An error occurred during the API call." };
  }
}
