import { automationRulePromptBuilder } from "@/utils/automationRulePromptBuilder.utils";
import { openAiClient, } from "@/clients/openai.client";
import { GPT_MODEL, SYSTEM_ROLE } from "@/constants/openai.constants";

export interface GPTResult {
  event?: string;
  action?: string;
  delay?: number;
  error?: string;
  output?: string;
}

export async function extractAutomationRuleDataFromUserInput(sentence: string): Promise<GPTResult> {
  const prompt = automationRulePromptBuilder(sentence);

  try {
    const response = await openAiClient.chat.completions.create({
      model: GPT_MODEL,
      messages: [
        { role: "system", content: SYSTEM_ROLE },
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
      let mapping: GPTResult;
      mapping = Array.isArray(parsed) ? parsed[0] : parsed;
      return mapping;
    } catch (jsonError) {
      return { error: "Failed to parse JSON output", output };
    }
  } catch (error: any) {
    return { error: error.message || "An error occurred during the API call." };
  }
}
