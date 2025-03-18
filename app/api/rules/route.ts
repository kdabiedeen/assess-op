import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event, action, delay } = body;

    // Validate request body
    if (!event || !action || delay < 0 ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newOrUpdatedRule = await prisma.rule.upsert({
        where: {
          event_action: { event, action },
        },
        update: { delay },
        create: { event, action, delay },
      });

    console.log(`✅ Rule Created: ${event} -> ${action} with delay ${delay} sec`);

    return NextResponse.json(newOrUpdatedRule, { status: 201 });
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

function validateId(idParam: string | null): number | null {
  if (!idParam) return null;
  const id = parseInt(idParam, 10);
  return isNaN(id) ? null : id;
}

export async function DELETE(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const idParam = searchParams.get("id");
      const id = validateId(idParam);

      if (id === null) {
        return NextResponse.json({ error: "Invalid or missing rule id" }, { status: 400 });
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
