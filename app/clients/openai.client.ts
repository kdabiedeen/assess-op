import OpenAI from "openai";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Fetches the latest API key from the database (or falls back to the environment variable)
 * and returns a newly initialized OpenAI client.
 */
export const getOpenAiClient = async () => {
    const record = await prisma.openAIKey.findUnique({ where: { id: 1 } });
    const apiKey = record?.key || process.env.OPENAI_API_KEY;
    return new OpenAI({ apiKey: apiKey! });
};

/**
 * Updates the API key in the database and returns a new OpenAI client initialized with the new key.
 */
export const updateOpenAiClient = async (newApiKey: string) => {
    await prisma.openAIKey.upsert({
        where: { id: 1 }, // always using a fixed record id
        update: { key: newApiKey },
        create: { key: newApiKey },
    });
    return new OpenAI({ apiKey: newApiKey });
};
