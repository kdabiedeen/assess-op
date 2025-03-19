import { PrismaClient } from "@prisma/client";
import { executeScheduledAction, executeImmediateAction } from "./executor.service";

const prisma = new PrismaClient();
const scheduledQueue = new Map<number, NodeJS.Timeout>(); // Store active timeouts

/**
 * Schedules an action based on the rule's delay.
 * Computes `completionTime = now() + delay` and schedules execution.
 */
export const scheduleAction = async (event: string, action: string) => {
    try {
        // Fetch the rule from the Rule table using the composite unique key.
        const rule = await prisma.rule.findUnique({
            where: { event_action: { event, action } },
        });

        if (!rule) {
            console.error(`❌ No rule found for event: ${event}, action: ${action}`);
            return;
        }

        const delayMs = rule.delay * 1000; // Convert delay (in seconds) to milliseconds
        const completionTime = new Date(Date.now() + delayMs);

        // Create a new scheduled action in the database.
        const scheduledAction = await prisma.scheduledAction.create({
            data: {
                event,
                action,
                executed: false,
                completionTime, // Computed dynamically
            },
        });

        console.log(
            `📅 Scheduled: ${event} -> ${action} in ${rule.delay} seconds (at ${completionTime.toLocaleString()})`
        );

        // Schedule the action using setTimeout if there is a delay.
        if (delayMs > 0) {
            const timeoutId = setTimeout(() => executeScheduledAction(scheduledAction.id), delayMs);
            scheduledQueue.set(scheduledAction.id, timeoutId);
        } else {
            // If no delay, execute immediately.
            await executeScheduledAction(scheduledAction.id);
        }
    } catch (error) {
        console.error("❌ Error in scheduleAction:", error);
    }
};

/**
 * Immediately executes an action.
 * Saves it in the database with executed = true and then logs the execution.
 */
export const triggerImmediateAction = async (event: string, action: string) => {
    try {
        console.log(`⚡ Triggering Immediate Action: ${action}`);

        const executionTime = new Date();

        // Save the immediate action execution in the database.
        await prisma.scheduledAction.create({
            data: {
                event,
                action,
                executed: true, // Mark as executed immediately
                completionTime: executionTime,
            },
        });

        // Execute the action immediately.
        await executeImmediateAction(action);

        console.log(`✅ [Immediate] Action ${action} saved & executed at ${executionTime.toLocaleString()}`);
    } catch (error) {
        console.error("❌ Error in triggerImmediateAction:", error);
    }
};

/**
 * Recovers unexecuted actions on startup.
 * Re-schedules actions that were missed during a restart.
 */
export const recoverScheduledActions = async () => {
    try {
        const pendingActions = await prisma.scheduledAction.findMany({
            where: { executed: false },
        });

        for (const action of pendingActions) {
            const remainingTime = new Date(action.completionTime).getTime() - Date.now();

            if (remainingTime > 0) {
                console.log(
                    `🔄 Rescheduling: ${action.event} -> ${action.action} in ${Math.round(remainingTime / 1000)} seconds`
                );
                const timeoutId = setTimeout(() => executeScheduledAction(action.id), remainingTime);
                scheduledQueue.set(action.id, timeoutId);
            } else {
                await executeScheduledAction(action.id);
            }
        }
    } catch (error) {
        console.error("❌ Error in recoverScheduledActions:", error);
    }
};

// Recover scheduled actions on startup.
recoverScheduledActions();
