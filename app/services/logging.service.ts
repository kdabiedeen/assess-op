import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const logMessage = async (message: string) => {
  try {
    await prisma.log.create({
      data: { message },
    });
  } catch (error) {
    console.error("❌ Error creating log entry:", error);
  }
};

