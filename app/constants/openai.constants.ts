export const GPT_MODEL = "gpt-3.5-turbo"
export const SYSTEM_ROLE = "You extract structured mappings from natural language instructions in the hospitality domain."

export const AUTOMATION_RULE_GPT_PROMPT_INSTRUCTIONS = `
You are an automation mapping tool that extracts structured instructions from natural language sentences in the hospitality domain.
Your task is to output a JSON object containing exactly the following keys:
  - "event"
  - "action"
  - "delay" (the delay value must be an integer representing seconds)

IMPORTANT:
- You must only use the canonical event and action keys provided in the synonym lists below.
- Each canonical event key represents the standardized identifier for an event. If a sentence contains a phrase or synonym that matches one of the synonyms for a canonical event, use that canonical key.
- Do NOT invent new keys or modify the canonical keys.
- If the input sentence does not clearly match any of the provided canonical keys, output: {"event": "", "action": "", "delay": 0}
- Your output must be valid JSON and should include only these keys.
`;

export const AUTOMATION_RULE_GPT_EXAMPLES = `
Example 1:
Sentence: "send an email after a guest checks in"
Mapping: {"event": "guest_checked_in", "action": "send_email", "delay": 0}

Example 2:
Sentence: "notify the concierge when a guest books a room"
Mapping: {"event": "guest_booking", "action": "notify_concierge", "delay": 0}

Example 3:
Sentence: "initiate a welcome SMS when a guest arrives"
Mapping: {"event": "guest_arrival", "action": "send_sms", "delay": 0}

Example 4:
Sentence: "send an email 300 seconds after a guest checks in"
Mapping: {"event": "guest_checked_in", "action": "send_email", "delay": 300}
`;

