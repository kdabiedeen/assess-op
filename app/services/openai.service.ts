import { automationRulePromptBuilder } from "@/utils/automationRulePromptBuilder.utils";
import { getOpenAiClient } from "@/clients/openai.client";
import { GPT_MODEL, SYSTEM_ROLE } from "@/constants/openai.constants";
import { EVENTS } from "@/constants/events.constants";
import { ACTIONS } from "@/constants/actions.constants";

export interface GPTResult {
    event?: string;
    action?: string;
    delay?: number;
    error?: string;
    output?: string;
}

export async function extractAutomationRuleDataFromUserInput(sentence: string): Promise<GPTResult> {
    const prompt = automationRulePromptBuilder(sentence);
    const client = await getOpenAiClient();

    try {
        const response = await client.chat.completions.create({
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
            let result: GPTResult;
            result = Array.isArray(parsed) ? parsed[0] : parsed;

            // Validate action key; mark as "N/A" if it's undefined or not in ACTIONS.
            if (!result.action || !ACTIONS[result.action]) {
                result.action = "N/A";
            }

            // Validate event key; mark as "N/A" if it's undefined or not in EVENTS.
            if (!result.event || !EVENTS[result.event]) {
                result.event = "N/A";
            }

            return result;
        } catch (jsonError) {
            return { error: "Failed to parse JSON output", output };
        }
    } catch (error: any) {
        return { error: error.message || "An error occurred during the API call." };
    }
}
