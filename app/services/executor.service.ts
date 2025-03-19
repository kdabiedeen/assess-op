import { PrismaClient } from "@prisma/client";
import { logMessage } from "./logging.service";
import { ACTIONS } from "@/constants/actions.constants";

const prisma = new PrismaClient();

export const executeScheduledAction = async (actionId: number) => {
    try {
        const action = await prisma.scheduledAction.findUnique({
            where: { id: actionId },
        });

        if (!action || action.executed) {
            const msg = `Scheduled Action ID ${actionId} not found or already executed.`;
            console.log(msg);
            return;
        }

        const executionTime = new Date().toLocaleString();
        const friendlyActionName = ACTIONS[action.action] || action.action;
        const execMsg = `⏱️ [Scheduled] Executing Action: **${friendlyActionName}** | Time: ${executionTime}`;
        console.log(execMsg);

        // Mark the action as executed in the database
        await prisma.scheduledAction.update({
            where: { id: actionId },
            data: { executed: true },
        });

        const markMsg = `✅ [Scheduled] Action **${friendlyActionName}** Executed!.`;
        console.log(markMsg);
        await logMessage(markMsg);
    } catch (error) {
        const errMsg = `❌ Error in executeScheduledAction: ${error}`;
        console.error(errMsg);
    }
};

/**
 * Executes an action immediately without scheduling.
 * Simply logs the execution.
 */
export const executeImmediateAction = async (action: string) => {
    try {
        const executionTime = new Date().toLocaleString();
        const friendlyActionName = ACTIONS[action] || action
        const msg = `⚡ [Immediate] Executing Action: ${friendlyActionName} | Time: ${executionTime}`;
        await logMessage(msg);
        // No database changes are made for immediate actions.
    } catch (error) {
        const errMsg = `❌ Error in executeImmediateAction: ${error}`;
        console.error(errMsg);
    }
};

/**
 * Finds due scheduled actions and executes them.
 */
export const processScheduledActions = async () => {
    try {
        const now = new Date();

        // identify all scheduled actions that are due
        const dueActions = await prisma.scheduledAction.findMany({
            where: {
                executed: false,
                completionTime: { lte: now },
            },
        });

        if (dueActions.length === 0) {
            const msg = "⏳ No scheduled actions ready for execution.";
            console.log(msg);
            return;
        }

        for (const action of dueActions) {
            await executeScheduledAction(action.id);
        }
    } catch (error) {
        const errMsg = `❌ Error in processScheduledActions: ${error}`;
        console.error(errMsg);
    }
};

/**
 * Starts the executor service that periodically checks for scheduled actions.
 */
export const startExecutorService = () => {
    const msg = "🔄 Executor service started. Checking for scheduled actions...";
    console.log(msg);
    setInterval(processScheduledActions, 5000); // Check every 5 seconds
};

// Start the executor service when this module loads
startExecutorService();
