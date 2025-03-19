import { ActionMap } from "@/types/schedule.types";

export interface ActionsSlice {
    actions: ActionMap;
    setActions: (actions: ActionMap) => void;
    fetchActions: () => Promise<void>;
}

export const createActionsSlice = (set: any, get: any): ActionsSlice => ({
    actions: {} as ActionMap,
    setActions: (actions: ActionMap) => set({ actions }),
    fetchActions: async () => {
        try {
            const res = await fetch("/api/actions");
            const data = (await res.json()) as ActionMap;
            set({ actions: data ?? {} });
        } catch (err) {
            console.error("❌ Error fetching actions:", err);
            set({ actions: {} });
        }
    },
});
