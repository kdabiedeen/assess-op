import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 📌 **POST /api/rules** → Create a new rule
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event, action, delay } = body;

    // Validate request body
    if (!event || !action || delay < 0 ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (typeof delay !== "number" || delay < 0) {
      return NextResponse.json({ error: "Invalid delay (must be a non-negative number)" }, { status: 400 });
    }

    const newRule = await prisma.rule.upsert({
        where: {
          event_action: { event, action },
        },
        update: { delay },
        create: { event, action, delay },
      });

    console.log(`✅ Rule Created: ${event} -> ${action} with delay ${delay} sec`);

    return NextResponse.json(newRule, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating rule:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const rules = await prisma.rule.findMany();
    return NextResponse.json(rules, { status: 200 });
  } catch (error) {
    console.error("❌ Database Error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
    try {
      // Extract the rule ID from query parameters
      const { searchParams } = new URL(req.url);
      const idParam = searchParams.get("id");
      if (!idParam) {
        return NextResponse.json({ error: "Missing rule id" }, { status: 400 });
      }

      const id = parseInt(idParam, 10);
      if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid rule id" }, { status: 400 });
      }
  
      // Delete the rule
      const deletedRule = await prisma.rule.delete({
        where: { id },
      });
  
      return NextResponse.json(deletedRule, { status: 200 });
    } catch (error) {
      console.error("❌ Error deleting rule:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }