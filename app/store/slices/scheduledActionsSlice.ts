import { ScheduledAction } from "@/types/schedule.types";

export interface ScheduledActionsSlice {
    scheduledActions: ScheduledAction[];
    setScheduledActions: (scheduledActions: ScheduledAction[]) => void;
    fetchScheduledActions: () => Promise<void>;
}

export const createScheduledActionsSlice = (set: any, get: any): ScheduledActionsSlice => ({
    scheduledActions: [] as ScheduledAction[],
    setScheduledActions: (scheduledActions: ScheduledAction[]) => set({ scheduledActions }),
    fetchScheduledActions: async () => {
        try {
            const res = await fetch("/api/scheduled-actions");
            const data = (await res.json()) as ScheduledAction[];
            set({ scheduledActions: data ?? [] });
        } catch (err) {
            console.error("❌ Error fetching scheduled actions:", err);
            set({ scheduledActions: [] });
        }
    },
});
