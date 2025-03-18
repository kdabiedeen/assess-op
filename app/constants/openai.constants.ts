export const GPT_MODEL = "gpt-3.5-turbo"
export const SYSTEM_ROLE = "You extract structured mappings from natural language instructions in the hospitality domain."

export const AUTOMATION_RULE_GPT_EXAMPLES = `
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
`;

export const AUTOMATION_RULE_GPT_PROMPT_INSTRUCTIONS = `
You are given a natural language sentence from the hospitality domain.
Extract the mapping with the keys "event", "action", and "delay" in seconds.
IMPORTANT:
- Only use the event and action keys provided in the lists below.
- Do NOT invent or modify keys. If the sentence does not match any of the provided keys exactly, return a valid JSON with empty strings for "event" and "action", and 0 for "delay".
`;
