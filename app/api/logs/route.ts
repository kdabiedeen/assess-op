import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const logs = await prisma.log.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5,
        });

        return NextResponse.json(logs, { status: 200 });
    } catch (error) {
        console.error("❌ Error fetching logs:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        // Deletes all logs in the log table
        const result = await prisma.log.deleteMany();
        return NextResponse.json(
            { message: "All logs deleted successfully", deletedCount: result.count },
            { status: 200 }
        );
    } catch (error) {
        console.error("❌ Error deleting logs:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

