import OpenAI from "openai";

let openAiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const getOpenAiClient = () => openAiClient;

export const updateOpenAiClient = (newApiKey: string) => {
    openAiClient = new OpenAI({
        apiKey: newApiKey,
    });
};
