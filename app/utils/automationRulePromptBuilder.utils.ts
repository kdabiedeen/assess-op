import { ACTION_SYNONYMS } from '@/constants/actions.constants';
import { EVENT_SYNONYMS } from '@/constants/events.constants';
import { AUTOMATION_RULE_GPT_EXAMPLES, AUTOMATION_RULE_GPT_PROMPT_INSTRUCTIONS } from "@/constants/openai.constants";

// Format the event synonyms for the prompt.
const eventSynonymsDisplay = Object.entries(EVENT_SYNONYMS)
    .map(([canonical, synonyms]) => `- ${canonical}: ${synonyms.join(', ')}`)
    .join('\n');

// Format the action synonyms for the prompt.
const actionSynonymsDisplay = Object.entries(ACTION_SYNONYMS)
    .map(([canonical, synonyms]) => `- ${canonical}: ${synonyms.join(', ')}`)
    .join('\n');

export const automationRulePromptBuilder = (sentence: string) => `
    ${AUTOMATION_RULE_GPT_PROMPT_INSTRUCTIONS}
    
    Return only the following keys: "event", "action", and "delay".
    
    Event Synonyms:
    ${eventSynonymsDisplay}
    
    Action Synonyms:
    ${actionSynonymsDisplay}
    
    Examples:
    ${AUTOMATION_RULE_GPT_EXAMPLES}
    
    Now, extract the mapping for the following sentence.
    Sentence: "${sentence}"
    Output the result in valid JSON format with keys "event", "action", and "delay".
`;
