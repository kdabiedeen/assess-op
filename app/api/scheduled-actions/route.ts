import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {  scheduleAction, triggerImmediateAction } from "@/services/scheduler.service";

// 📌 **POST /api/scheduled-actions** → Schedule actions when an event occurs
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event } = body;

    if (!event) {
      return NextResponse.json({ error: "Missing required field: event" }, { status: 400 });
    }

    // Fetch all rules matching the event
    const rules = await prisma.rule.findMany({
      where: { event },
    });

    console.log('Searching for rules ');
    if (rules.length === 0) {
      return NextResponse.json({ error: "No matching rules found" }, { status: 404 });
    }
    console.log('Found rules ', rules);

    // Array to collect the results for each rule execution
    const results = [];

    // Loop over each rule and schedule or trigger immediately based on delay
    for (const rule of rules) {
      if (rule.delay === 0) {
        // Immediate execution
        await triggerImmediateAction(event, rule.action);
        results.push({ event, action: rule.action, executed: true });
      } else {
        // Schedule the action to be executed later
        await scheduleAction(event, rule.action);
        results.push({ event, action: rule.action, scheduled: true });
      }
    }

    return NextResponse.json({ scheduledActions: results }, { status: 201 });
  } catch (error) {
    console.error("Error scheduling actions:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const scheduledActions = await prisma.scheduledAction.findMany({
      where: { executed: false }
    });
    return NextResponse.json(scheduledActions, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}