import { ACTIONS } from '@/constants/actions.constants';
import { EVENTS } from '@/constants/events.constants';
import { AUTOMATION_RULE_GPT_EXAMPLES, AUTOMATION_RULE_GPT_PROMPT_INSTRUCTIONS } from "@/constants/openai.constants";

const eventKeys = Object.keys(EVENTS);
const actionKeys = Object.keys(ACTIONS);

export const automationRulePromptBuilder = (sentence: string) =>
    `
    ${AUTOMATION_RULE_GPT_PROMPT_INSTRUCTIONS}
    
    Event Keys:
    - ${eventKeys.join('\n    - ')}

    Action Keys:
    - ${actionKeys.join('\n    - ')}

    Examples:
    ${AUTOMATION_RULE_GPT_EXAMPLES}

    Now, extract the mapping for the following sentence.
    Sentence: "${sentence}"
    Output the result in valid JSON format with keys "event", "action", and "delay".
  `;
